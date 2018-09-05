// @flow
import _cloneDeep from 'lodash.clonedeep';
import _get from 'lodash.get';
import _set from 'lodash.set';

import {
  AMOUNT,
  KEY,
  RANGE,
} from './constants';
import {
  getRegexMatch,
  sortByPathLength
} from './utils';

export default function createAmounts(_template: Template, settings: Settings): Template {
  let template = _template;

  Object.entries(settings)
    .map(([key, value]) => [String(key), String(value)])
    .filter(([path, option]) => option.match(AMOUNT) || option.match(RANGE))
    .map(([path, option]) => [path, getAmountFromOption(option)])
    .sort(sortByPathLength)
    .forEach(([path, amount]) => {
      template = applyAmountSetting(template, path, amount);
    });

  return template;
}

export function applyAmountSetting(_template: Template, path: string, amount: number): Template {
  const template: Template = _cloneDeep(_template);

  const amountable: Amountable = _get(template, path);
  const [key, element] = Object.entries(amountable)[0];
  const amountedElement = amountable instanceof Array ? [] : {};

  for (let i = 0; i < amount; i++) {
    const clonedElement = _cloneDeep(element);
    if (amountedElement instanceof Array) {
      amountedElement.push(clonedElement);

    } else {
      const updatedKey = key.replace('$KEY', `$KEY${i}`);
      amountedElement[updatedKey] = clonedElement;
    }
  }

  _set(template, path, amountedElement);

  return template;
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
