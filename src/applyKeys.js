// @flow
import { KEY } from './constants';

export default function applyKeys(template: Template): Template {
  if (template instanceof Array) {
    return template.map(t => applyKeys(t));
  }

  if (template instanceof Object) {
    Object.entries(template).forEach(([key, value]) => {
      if (value instanceof Object) {
        const match = key.match(KEY);

        if (match) {
          const ref = match[1];
          const newKey = value[ref] || key;

          delete template[key];

          template[newKey] = value;

        } else {
          template[key] = applyKeys(value);
        }
      }
    })
  }

  return template;
}
