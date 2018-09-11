import setRelations from './relations';

describe('operations/relations', () => {
  describe('setRelations', () => {
    it('should set a relation', () => {
      const template = {
        people: {
          'qwe321': {
            pets: ['$REL(pets)'],
          },
        },
        pets: {
          'abc123': {
            name: 'Peter',
          },
        },
      };

      const result = setRelations(template);

      expect(result.people.qwe321).toHaveProperty('pets', ['abc123']);
    });
  });
});
