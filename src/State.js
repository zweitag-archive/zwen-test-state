// @flow
import _cloneDeep from 'lodash.clonedeep';

import createAmounts from './createAmounts';
import fillFakeData from './fillFakeData';

export default class State {
  template: Template
  seed: number
  testCases: {
    [key: string]: Template
  }

  constructor(template: Template, seed: number) {
    this.template = template;
    this.seed = seed;
    this.testCases = {};
  }

  addTestCase(name: string, settings: Settings) {
    const caseState: Template = _cloneDeep(this.template);
    createAmounts(caseState, settings);

    // ...
    this.testCases[name] = caseState;
  }
}
