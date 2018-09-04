import faker from 'faker';

export default function buildState(template, seed) {
  if (seed) {
    faker.seed(seed);
  }

  return Object.entries(template).reduce((acc, [key, value]) => {
    const fakerPath = value.split('.');
    acc[key] = faker[fakerPath[0]][fakerPath[1]]();
    return acc;
  }, {});
}
