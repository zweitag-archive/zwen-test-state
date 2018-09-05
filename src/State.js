import _cloneDeep from 'lodash.clonedeep';

import createAmounts from './createAmounts';
import fillFakeData from './fillFakeData';

export default class State {
  constructor(template, seed) {
    this.template = template;
    this.seed = seed;
    this.testCases = {};
  }

  addTestCase(name, settings) {
    const caseState = _cloneDeep(template);
    createAmounts(caseState, settings);

    // ...
    this.testCases[name] = caseState;
  }
}
