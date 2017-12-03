// @flow

import { HOURMS } from '../utils/date';

export function toObject (
  value: number[]
): {[id:number]: number} {
  const data: {[id:number]: number} = {};

  for (let i = 0, len = value.length; i < len; i++) {
     data[ value[ i ] ] = i;
  }

  return data;
}

export function createIntervals (
  list: number[],
  ms: boolean = true
): Array<[number, number, number]> {
  let intervals: Array<[number, number, number]> = [];
  let common: {[id:number]: [number, number]} = {};
  let work: {[id:number]: [number, number]} = {};
  let prev = -2;
  let start = 0;
  let j = 0;

  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i];
    if ((item - prev) > 1) {
      start = item;
    }
    work[start] = [ item, 0 ];
    prev = item;
  }

  for (let i in work) {
    i = Number(i);
    if (i !== j) {
      common[j] = [ i - 1, 1 ];
    }
    common[i] = work[i];
    j = work[i][0] + 1;
  }

  if (j <= 23) {
    common[j] = [ 23, 1 ];
  }

  if (ms) {
    for (let i in common) {
      i = Number(i);
      intervals.push([ i * HOURMS, (common[i][0] + 1) * HOURMS, common[i][1] ]);
    }

  } else {
    for (let i in common) {
      i = Number(i);
      intervals.push([ i, common[i][0] + 1, common[i][1] ]);
    }
  }

  return intervals;
}

export function getColumn (time: number, columns: number[]): number {
  for (let i = 0; i < 6; i++) {
    if (columns[i] <= time) {
      return i;
    }
  }

  return columns.length;
}
