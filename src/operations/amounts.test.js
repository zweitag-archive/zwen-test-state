import createAmounts, {
  applyAmounts,
  applyAmountSetting,
  getAmountFromOption,
} from './amounts';

describe('operations/amounts', () => {
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
        'people.friends.pets': '$AMOUNT(2)',
        'words': '$AMOUNT(2)',
      };

      const result = createAmounts(template, settings);
      const allPeople = Object.entries(result.people);

      expect(allPeople.length).toBeGreaterThan(3);
      expect(allPeople.length).toBeLessThan(5);

      expect(result.people['$KEY0(_id)'].friends['$KEY(_id)'].pets).toHaveLength(2);

      expect(result.words).toHaveLength(2);

    });
  });

  describe('applyAmounts', () => {
    it('should apply the amount setting to the current template if the segments are empty', () => {
      const template = ['name.firstName'];
      const segments = [];
      const amount = 2;

      const result = applyAmounts(template, segments, amount);

      expect(result).toHaveLength(2);
    });

    it('should apply amounts to flat nestings', () => {
      const template = {
        people: ['name.firstName'],
      };
      const segments = ['people'];
      const amount = 2;

      const result = applyAmounts(template, segments, amount);

      expect(result).toHaveProperty('people');
      expect(result.people).toHaveLength(2);
    });

    it('should apply amounts to flat nestings with unkown length', () => {
      const template = {
        firstKey: {
          people: ['name.firstName'],
        },
      };
      const segments = ['people'];
      const amount = 2;

      const result = applyAmounts(template, segments, amount);

      expect(result.firstKey.people).toHaveLength(2);
    });

    it('should apply amounts to deep object nestings with unkown length', () => {
      const template = {
        people: {
          Bob: {
            friends: {
              Peter: {
                pets: ['name.firstName'],
              },
            },
          },
        },
      };
      const segments = ['people', 'friends', 'pets'];
      const amount = 2;

      const result = applyAmounts(template, segments, amount);

      expect(result.people.Bob.friends.Peter.pets).toHaveLength(2);
    });

    it('should apply amounts to deep array nestings with unkown length', () => {
      const template = {
        people: {
          Bob: {
            friends: [{
              pets: ['name.firstName'],
            }],
          },
        },
      };
      const segments = ['people', 'friends', 'pets'];
      const amount = 2;

      const result = applyAmounts(template, segments, amount);

      expect(result.people.Bob.friends[0].pets).toHaveLength(2);
    });

    it('should not look deeper than one level if the key does not exist', () => {
      const template = {
        people: {
          Bob: {
            schoolFriends: {
              Peter: {
                pets: ['name.firstName'],
              },
            },
          }
        },
      };
      const segments = ['people', 'pets'];
      const amount = 2;

      const result = applyAmounts(template, segments, amount);

      expect(result.people.Bob.schoolFriends.Peter.pets).not.toHaveLength(2);
    });
  });

  describe('applyAmountSetting', () => {
    it('should create the correct amount of elements in an array', () => {
      const template = ['name.firstName'];

      const result = applyAmountSetting(template, 3);

      expect(result).toHaveLength(3);
      expect(result[0]).toBe('name.firstName');
      expect(result[1]).toBe('name.firstName');
      expect(result[2]).toBe('name.firstName');
    });

    it('should create the correct amount of elements in an object', () => {
      const template = {
        '$KEY(_id)': {
          _id: 'random.id',
          name: 'name.firstName'
        },
      };

      const result = applyAmountSetting(template, 3);

      expect(Object.entries(result)).toHaveLength(3);
      expect(result).toHaveProperty('$KEY0(_id)');
      expect(result).toHaveProperty('$KEY1(_id)');
      expect(result).toHaveProperty('$KEY2(_id)');
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
});
