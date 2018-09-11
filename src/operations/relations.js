// @flow
import { REL } from '../constants';
import { getRegexMatch } from '../utils';

type RelationValue = string | Array<any> | Object;

export default function setRelations(template: Template): Template {
  function applyRelation(value: RelationValue): RelationValue {
    if (typeof value === 'string') {
      const match = getRegexMatch(value, REL);

      if (!!match) {
        const relation = template[match];

        if (relation instanceof Object) {
          const relationKeys = Object.keys(relation);
          const keyIndex = Math.floor(relationKeys.length * Math.random());
          return relationKeys[keyIndex];
        }
        return value;
      }
    }

    if (value instanceof Array) {
      return value.map((subValue: Template) => applyRelation(subValue));
    }

    if (value instanceof Object) {
      return Object.keys(value).reduce((acc, key: string) => {
        acc[key] = applyRelation(value[key]);
        return acc;
      }, {});
    }

    return value;
  }
  const templateWithRelations = applyRelation(template);

  if (templateWithRelations instanceof Object) {
    return templateWithRelations;
  }

  return {};
}
