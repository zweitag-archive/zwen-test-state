import {
  AMOUNT,
  RANGE,
} from './constants';

import createAmounts from './createAmounts';

describe('createAmounts', () => {
  it('should create the correct amount of elements in an array', () => {
    const template = {
      names: ['name.firstName'],
    };
    const settings = {
      'names': `${AMOUNT} 3`,
    };

    const result = createAmounts(template, settings);

    expect(result.names).toHaveLength(3);
    expect(result.names[0]).toBe('name.firstName');
    expect(result.names[1]).toBe('name.firstName');
    expect(result.names[2]).toBe('name.firstName');
  });

  it('should create the correct amount of elements in an object', () => {
    const template = {
      people: {
        '$KEY: _id': {
          _id: 'random.id',
          name: 'name.firstName'
        },
      },
    };
    const settings = {
      'people': `${AMOUNT} 3`,
    };

    const result = createAmounts(template, settings);

    expect(Object.entries(result.people)).toHaveLength(3);
    expect(result.people).toHaveProperty('$KEY0: _id');
    expect(result.people).toHaveProperty('$KEY1: _id');
    expect(result.people).toHaveProperty('$KEY2: _id');
  });
});
