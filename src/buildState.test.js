import faker from 'faker';
import buildState from './buildState';

const SEED = 321;

describe('buildState', () => {
  it('should call the correct faker methods', () => {
    const template = {
      myName: 'name.firstName',
    };
    const result = buildState(template, SEED);

    faker.seed(SEED);

    expect(result).toEqual({
      myName: faker.name.firstName(),
    });
  });
});
