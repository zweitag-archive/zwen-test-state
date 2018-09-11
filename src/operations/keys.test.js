import applyKeys from './keys';

describe('operations/keys', () => {
  describe('applyKeys', () => {
    it('should apply a property as key for an object', () => {
      const template = {
        people: {
          '$KEY(_id)': {
            _id: 'test',
          },
        },
      };

      const result = applyKeys(template);

      expect(result.people).toHaveProperty('test', { _id: 'test' });
    });
  });
});
