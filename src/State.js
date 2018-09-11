// @flow
import _cloneDeep from 'lodash.clonedeep';

import applyKeys from './operations/keys';
import createAmounts from './operations/amounts';
import fillFakeData from './operations/fakeData';

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

  getTestCase(name: string): Template {
    return this.testCases[name] || {};
  }

  addTestCase(name: string, settings: Settings) {
    let caseState: Template = _cloneDeep(this.template);
    caseState = createAmounts(caseState, settings);
    caseState = fillFakeData(caseState, this.seed);
    caseState = applyKeys(caseState);

    this.testCases[name] = caseState;
  }
}
