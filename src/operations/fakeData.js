// @flow
import faker from 'faker';

type TranslateValue = string | Array<any> | Object;

export default function fillFakeData(template: Template, seed: number): Template {
  if (seed) {
    faker.seed(seed);
  }

  const translatedTemplate = translateValue(template);

  if (translatedTemplate instanceof Object) {
    return translatedTemplate;
  }

  return {};
}

function translateValue(value: TranslateValue): TranslateValue {
  if (typeof value === 'string') {
    const [domain, method, arg] = value.split('.');
    if (domain && method) {
      const fakerArg = isNaN(arg) ? arg : parseInt(arg, 10);
      return faker[domain][method](fakerArg);
    }
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
