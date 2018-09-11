// @flow
import { KEY } from '../constants';
import { getRegexMatch } from '../utils';

export default function applyKeys(template: Template): Template {
  if (template instanceof Array) {
    return template.map(t => applyKeys(t));
  }

  if (template instanceof Object) {
    Object.entries(template).forEach(([key, value]) => {
      if (value instanceof Object) {
        const match = getRegexMatch(key, KEY);

        if (!!match) {
          const newKey = value[match];
          template[newKey] = value;

          delete template[key];

        } else {
          template[key] = applyKeys(value);
        }
      }
    })
  }

  return template;
}
