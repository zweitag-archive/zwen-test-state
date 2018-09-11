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

    expect(Object.entries(result.people)).toHaveLength(3);
    expect(Object.keys(result.people)[0]).toBe('SAS');
    expect(Object.values(result.people)[0].name).toBe('Arianna');

    expect(Object.values(result.people)[0].friends.length).toBeGreaterThan(0);
    expect(Object.values(result.people)[0].friends.length).toBeLessThan(3);
  });
});
