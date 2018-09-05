import * as utils from './utils';

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
