// @flow

export const HOURMS = 60 * 60 * 1000;

export const DAYMS = HOURMS * 24;

export const WEEKDAYS = 7;

/**
 * Формирование объекта даты из числового представления.
 * @param {number} date
 * @returns {Date}
 */
export function parseDate (date: number): Date {
  const _ = date / 100 ^ 0;
  const y = date / 10000 ^ 0;
  const m = (_ - 100 * y) - 1;
  const d = date - _ * 100;
  return new Date(y, m, d, 0, 0, 0, 0);
}

/**
 * Формирование числового представления даты из объекта.
 * @param {Date} date
 * @returns {number}
 */
export function formatDate (date: Date): number {
  return (
    (date.getFullYear() * 10000) +
    ((date.getMonth() + 1) * 100) +
    date.getDate()
  );
}

/**
 * Смещение даты на количество дней.
 * @param {number} date
 * @param {number} offset
 * @returns {number}
 */
export function offsetOnDay (
  date: number,
  offset: number
): number {
  const d = parseDate(date);
  d.setDate(d.getDate() + offset);
  return formatDate(d);
}

/**
 * Смещение даты на количество рабочих дней.
 * Результат не может приходится на выходной.
 * Смещение начинается с первого рабочего дня, если переданное выходной.
 * Выходные игнорируются, если вся неделя не рабочая.
 * @param {number} date
 * @param {number} offset количество рабочих дней
 * @param {Object.<string, number>} weekends объект выходных дней недели
 * @returns {number}
 */
export function offsetOnWorksDay (
  date: number,
  offset: number,
  weekends: {[id:string|number]: number} = {}
): number {
  const d = parseDate(date);
  let len = Object.keys(weekends).length;

  if (len > 0 && len < WEEKDAYS) {
    const sig = offset < 0 ? -1 : 1;
    offset = Math.abs(offset);

    let idx = 0;
    while (idx < offset) {
      d.setDate(d.getDate() + sig);
      if (!(d.getDay() in weekends)) {
        idx++;
      }
    }

  } else {
    d.setDate(d.getDate() + offset);
  }

  return formatDate(d);
}

/**
 * День недели.
 * @param {number} date
 * @returns {number}
 */
export function getDay (date: number): number {
  return parseDate(date).getDay();
}

export function getDate (date: number): number {
  const _ = date / 100 ^ 0;
  return date - _ * 100;
}

/**
 * Первый день месяца.
 * @param {number} date
 * @returns {number}
 */
export function getMonthDate (date: number): number {
  const d = parseDate(date);
  d.setDate(1);
  return formatDate(d);
}

export function equalToMonth (date1: number, date2: number): boolean {
  const y1 = date1 / 10000 ^ 0;
  const m1 = ((date1 / 100 ^ 0) - 100 * y1) - 1;
  const y2 = date2 / 10000 ^ 0;
  const m2 = ((date2 / 100 ^ 0) - 100 * y2) - 1;

  return (
    y1 === y2 &&
    m1 === m2
  );
}

export function mergeIntervals(intervals: Array<number[]>): ?number[] {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  for (let i = 0, len = intervals.length; i < len; i++) {
    let interval = intervals[i];

    if (Array.isArray(interval[0])) {
      interval = mergeIntervals(interval);
    }

    if (!interval) {
      continue;
    }

    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;

    if (dateBegin < min) {
      min = dateBegin;
    }

    if (dateEnd > max) {
      max = dateEnd;
    }
  }

  return (min === Number.MAX_VALUE || max === Number.MIN_VALUE) ?
    null :
    [ min, max ];
}
