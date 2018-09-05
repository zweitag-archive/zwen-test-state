// @flow

export function getRegexMatch(str: string, regex: RegExp) {
  const match = regex.exec(str);
  return match ? match[1] : '';
}

export function sortByPathLength([pathA]: [string, any], [pathB]: [string, any]): number {
  const depthA = (pathA.match(/\./g) || []).length
  const depthB = (pathB.match(/\./g) || []).length;

  return depthA - depthB;
}
