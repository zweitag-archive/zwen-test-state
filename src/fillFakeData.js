// @flow
import faker from 'faker';

type TranslateValue = string | Array<any> | Object;

export default function fillFakeData(template: Template, seed: number) {
  if (seed) {
    faker.seed(seed);
  }

  return translateValue(template);
}

function translateValue(value: TranslateValue): TranslateValue {
  if (typeof value === 'string') {
    const [domain, method] = value.split('.');
    return faker[domain][method]();
  }

  if (value instanceof Array) {
    return value.map((subValue: TranslateValue) => translateValue(subValue));
  }

  if (value instanceof Object) {
    return Object.keys(value).reduce((acc, key: string) => {
      acc[key] = translateValue(value[key]);
      return acc;
    }, {});
  }

  return value;
}
