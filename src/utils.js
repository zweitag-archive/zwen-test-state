// @flow

export function sortByPathLength([pathA]: [string, any], [pathB]: [string, any]): number {
  const depthA = (pathA.match(/\./g) || []).length
  const depthB = (pathB.match(/\./g) || []).length;

  return depthA - depthB;
}
