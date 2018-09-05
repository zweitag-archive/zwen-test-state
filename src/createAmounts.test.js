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
});
