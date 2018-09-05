import { AMOUNT } from './constants';
import * as utils from './utils';

describe('getRegexMatch', () => {
  it('should return the contents of a capture group', () => {
    const regex = AMOUNT;
    const str = '$AMOUNT(365)';

    const result = utils.getRegexMatch(str, regex);

    expect(result).toBe('365');
  });
});

describe('sortByPathLength', () => {
  it('should return >0 if the first path is longer', () => {
    const a = ['a.b.c'];
    const b = ['a.b'];

    const result = utils.sortByPathLength(a, b);

    expect(result).toBeGreaterThan(0);
  });

  it('should return <0 if the first path is shorter', () => {
    const a = ['a.b.c'];
    const b = ['a.b.c.d'];

    const result = utils.sortByPathLength(a, b);

    expect(result).toBeLessThan(0);
  });
});
