import faker from 'faker';

export default function buildState(template, seed) {
  if (seed) {
    faker.seed(seed);
  }

  return translateValue(template);
}

function translateValue(value) {
  if (typeof value === 'string') {
    const [domain, method] = value.split('.');
    return faker[domain][method]();
  }

  if (value instanceof Array) {
    return value.map(subValue => translateValue(subValue));
  }

  if (value instanceof Object) {
    return Object.entries(value).reduce((acc, [key, subValue]) => {
      acc[key] = translateValue(subValue);
      return acc;
    }, {});
  }

  return value;
}
