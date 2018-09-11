import State from './State';

const SEED = 321;

describe('State', () => {
  it('should transform a template to a test case', () => {
    const template = {
      people: {
        '$KEY(_id)': {
          _id: 'random.word',
          name: 'name.firstName',
          friends: ['$REL(people)'],
        },
      },
    };
    const settings = {
      'people': '$AMOUNT(3)',
      'people.friends': '$RANGE(1...2)',
    };

    const state = new State(template, SEED);
    state.addTestCase('standard', settings);

    const result = state.getTestCase('standard');

    const peopleArr = Object.entries(result.people);
    expect(peopleArr).toHaveLength(3);
    expect(peopleArr[0][0]).toBe('SAS');
    expect(peopleArr[0][1].name).toBe('Arianna');

    const friendsArr = peopleArr[0][1].friends;
    expect(friendsArr.length).toBeGreaterThan(0);
    expect(friendsArr.length).toBeLessThan(3);

    expect(Object.keys(result.people).includes(friendsArr[0])).toBe(true);
  });
});
