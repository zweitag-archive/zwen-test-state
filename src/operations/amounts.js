// @flow
import _cloneDeep from 'lodash.clonedeep';
import _get from 'lodash.get';
import _set from 'lodash.set';

import {
  AMOUNT,
  RANGE,
} from '../constants';
import {
  getRegexMatch,
  sortByPathLength
} from '../utils';

type Amountable = Object | Array<any>;

export default function createAmounts(_template: Template, settings: Settings): Template {
  let template = _template;

  Object.entries(settings)
    .map(([key, value]) => [String(key), String(value)])
    .filter(([path, option]) => option.match(AMOUNT) || option.match(RANGE))
    .map(([path, option]) => [path, getAmountFromOption(option)])
    .sort(sortByPathLength)
    .forEach(([path, amount]) => {
      template = applyAmounts(template, path.split('.'), amount);
    });

  return template;
}


export function applyAmounts(
  template: Amountable,
  segments: Array<string>,
  amount: number,
  isNested?: boolean
): Amountable {
  if (segments.length === 0) {
    return applyAmountSetting(template, amount);
  }

  const next = segments[0];

  if (template instanceof Object) {
    if (template.hasOwnProperty(next)) {
      template[next] = applyAmounts(template[next], segments.slice(1), amount);

    } else if (!isNested) {
      Object.keys(template).forEach(key => {
        template[key] = applyAmounts(template[key], segments, amount, true);
      });
    }

    return template;
  }

  return template.map(t => applyAmounts(t, segments, amount, true));
}

export function applyAmountSetting(template: Amountable, amount: number): Amountable {
  const isArray = template instanceof Array;
  const newTemplate = isArray ? [] : {};
  const [key, element] = Object.entries(template)[0];

  for (let i = 0; i < amount; i++) {
    const clonedElement = _cloneDeep(element);

    if (newTemplate instanceof Array) {
      newTemplate.push(clonedElement);

    } else {
      const updatedKey = key.replace('$KEY', `$KEY${i}`);
      newTemplate[updatedKey] = clonedElement;
    }
  }

  return newTemplate;
}

export function getAmountFromOption(option: string): number {
  if (option.match(AMOUNT)) {
    return parseInt(getRegexMatch(option, AMOUNT));

  } else {
    const match = getRegexMatch(option, RANGE);
    const [max, min] = match.split('...').map(Number);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
