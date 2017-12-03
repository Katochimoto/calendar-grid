// @flow

import { getDay, parseDate, formatDate, offsetOnDay, getDate } from './date';
import Strategy from './Datetime/Strategy';

export default class Datetime {
  _strategy: Strategy;

  constructor(strategy: ?Strategy) {
    this._strategy = strategy || (new Strategy: Strategy);
  }

  destroy () {
    if (this._strategy) {
      this._strategy.destroy();
      this._strategy = null;
    }
  }

  gridDaysHourTitle (hour: number): string {
    return this._strategy.gridDaysHourTitle(hour);
  }

  gridDaysDayTitle (date: number): string {
    return this._strategy.gridDaysDayTitle(parseDate(date));
  }

  monthNameGenShort (date: number): string {
    return this._strategy.monthNameGenShort(parseDate(date));
  }

  /**
   * День недели.
   * @param {number} date
   * @returns {number}
   */
  getDay (date: number): number {
    return getDay(date);
  }

  getDate (date: number): number {
    return getDate(date);
  }

  parseDate (date: number): Date {
    return parseDate(date);
  }

  formatDate (date: Date): number {
    return formatDate(date);
  }

  offsetOnDay (date: number, offset: number): number {
    return offsetOnDay(date, offset);
  }
}
