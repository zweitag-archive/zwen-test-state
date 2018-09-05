// @flow
import _get from 'lodash.get';
import _set from 'lodash.set';

import {
  AMOUNT,
  RANGE,
} from './constants';

export default function createAmounts(template: Template, settings: Settings) {
  // Supress flow because of https://github.com/facebook/flow/issues/2221
  // $FlowFixMe
  const amountSettings: Array<string[]> = Object.entries(settings)
  // $FlowFixMe
    .filter(([path, option]) => option.startsWith(AMOUNT) || option.startsWith(RANGE));

  amountSettings.forEach(([path, option]) => {
    const amountable: Amountable = _get(template, path);
    const amount: number = parseInt(option.replace(AMOUNT, ''), 10);

    if (amountable instanceof Array) {
      const amountedElement = [];
      const elementToCopy = amountable[0];

      for (let i = 0; i < amount; i++) {
        amountedElement.push(elementToCopy);
      }
      _set(template, path, amountedElement);
    }
  });

  return template;
}
