import createAmounts, {
  applyAmountSetting,
  getAmountFromOption,
} from './createAmounts';

describe('createAmounts', () => {
  it('should apply the amount settings of a complex template', () => {
    const template = {
      people: {
        '$KEY(_id)': {
          _id: 'random.id',
          name: 'name.firstName',
          friends: {
            '$KEY(_id)': {
              pets: ['name.firstName'],
            },
          },
        },
      },
      words: [{ type: 'random.word' }],
    };
    const settings = {
      'people': '$RANGE(3...5)',
      // '$EACH(people).$EACH(friends).connections': '$AMOUNT(2)',
      'words': '$AMOUNT(2)',
    };

    const result = createAmounts(template, settings);
    const allPeople = Object.entries(result.people);

    expect(allPeople.length).toBeGreaterThan(3);
    expect(allPeople.length).toBeLessThan(5);

    expect(result.words).toHaveLength(2);

  });
});

describe('applyAmountSetting', () => {
  it('should create the correct amount of elements in an array', () => {
    const template = {
      names: ['name.firstName'],
    };

    const result = applyAmountSetting(template, 'names', 3);

    expect(result.names).toHaveLength(3);
    expect(result.names[0]).toBe('name.firstName');
    expect(result.names[1]).toBe('name.firstName');
    expect(result.names[2]).toBe('name.firstName');
  });

  it('should create the correct amount of elements in an object', () => {
    const template = {
      people: {
        '$KEY(_id)': {
          _id: 'random.id',
          name: 'name.firstName'
        },
      },
    };

    const result = applyAmountSetting(template, 'people', 3);

    expect(Object.entries(result.people)).toHaveLength(3);
    expect(result.people).toHaveProperty('$KEY0(_id)');
    expect(result.people).toHaveProperty('$KEY1(_id)');
    expect(result.people).toHaveProperty('$KEY2(_id)');
  });
});

describe('getAmountFromOption', () => {
  it('should return the correct number for amounts', () => {
    const option = '$AMOUNT(3)';

    const result = getAmountFromOption(option);

    expect(result).toBe(3);
  });

  it('should return the correct number for amounts', () => {
    const option = '$RANGE(10...20)';

    const result = getAmountFromOption(option);

    expect(result).toBeGreaterThan(9);
    expect(result).toBeLessThan(21);
  });
});
