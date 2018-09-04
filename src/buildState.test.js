import faker from 'faker';
import buildState from './buildState';

const SEED = 321;

const reset = () => faker.seed(SEED);

describe('buildState', () => {
  it('should call the correct faker methods', () => {
    const template = {
      myName: 'name.firstName',
    };
    const result = buildState(template, SEED);

    reset();

    expect(result).toEqual({
      myName: faker.name.firstName(),
    });
  });

  it('should respect the faker sequence', () => {
    const template = {
      myName: 'name.firstName',
      yourName: 'name.firstName',
    };
    const result = buildState(template, SEED);

    reset();

    expect(result).toEqual({
      myName: faker.name.firstName(),
      yourName: faker.name.firstName(),
    });

    expect(result.myName).not.toBe(result.yourName);
  });

  it('should transform nested values', () => {
    const template = {
      data: {
        myName: 'name.firstName',
        contacts: [{
          john: {
            phone: 'phone.phoneNumber',
          },
        }],
      },
    };
    const result = buildState(template, SEED);

    reset();

    expect(result).toEqual({
      data: {
        myName: faker.name.firstName(),
        contacts: [{
          john: {
            phone: faker.phone.phoneNumber(),
          },
        }],
      },
    });
  });
});
