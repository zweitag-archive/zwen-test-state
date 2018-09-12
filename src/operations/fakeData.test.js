import faker from 'faker';
import fillFakeData from './fakeData';

const SEED = 321;

const reset = () => faker.seed(SEED);

describe('operations/fakeData/fillFakeData', () => {
  it('should call the correct faker methods', () => {
    const template = {
      myName: 'name.firstName',
    };
    const result = fillFakeData(template, SEED);

    reset();

    expect(result).toEqual({
      myName: faker.name.firstName(),
    });
  });

  it('should pass on arguments', () => {
    const template = {
      myNumber: 'random.number.20',
    };
    const result = fillFakeData(template, SEED);

    reset();

    expect(result.myNumber).toBeLessThan(21);
  });

  it('should respect the faker sequence', () => {
    const template = {
      myName: 'name.firstName',
      yourName: 'name.firstName',
    };
    const result = fillFakeData(template, SEED);

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
    const result = fillFakeData(template, SEED);

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
