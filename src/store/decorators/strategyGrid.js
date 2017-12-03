// @flow

import {
  createIntervals,
  toObject,
} from '../../utils/array';

import {
  DAYMS,
  equalToMonth,
  getDay,
  getMonthDate,
  HOURMS,
  offsetOnDay,
  parseDate,
} from '../../utils/date';

import {
  GRID,
} from '../../constant';

export function ctorGrid () {

}

export function createGrid () {
  return {
    timeToRate (time: number): number {
      const hour = time / HOURMS | 0;
      const ms = time % HOURMS;
      const grid = this.current.GRID_HOURS[ hour ] * HOURMS + ms;
      return Math.round(1000 * 100 * grid / this.current.DAYMS) / 1000;
    },

    checkWeekend (date: number): boolean {
      return (getDay(date) in this.current.WEEKENDS_SET);
    },

    /**
     * @param {number} date
     * @returns {number} процент видимости даты
     */
    checkVisibleDate (date: number): number {

    },

    isVisibleDate (date: number): boolean {
      return (
        date >= this.current.datePartBegin &&
        date <= this.current.datePartEnd
      );
    },

    isCurrentMonthDate (date: number): boolean {
      return equalToMonth(this.current.visibleMonth, date);
    },

    _updateVisibleDate ({
      itemSize,
      daysInItem
    }) {

      const {
        currentDate,
        hideWeekends, // TODO
        weekends, // TODO
      } = this.current;

      const range = this.getVisibleRange();
      const startItem = range[0];
      const startRate = range[1];
      const endItem = range[2];
      const endRate = range[3];
      const itemRate = 100 / itemSize;
      const gridItemSize = itemSize * daysInItem;

      const startFullVisibleItem = startRate / itemRate | 0;
      const startRateRest = startRate === 100 ? 0 : startRate % itemRate;
      const startPartVisibleItem = startFullVisibleItem + (startRateRest ? 1 : 0);

      const endFullVisibleItem = endRate / itemRate | 0;
      const endRateRest = endRate === 100 ? 0 : endRate % itemRate;
      const endPartVisibleItem = endFullVisibleItem + (endRateRest ? 1 : 0);

      const daysFullBegin = gridItemSize + (startItem * gridItemSize) - startFullVisibleItem * daysInItem;
      const daysFullEnd = endItem * gridItemSize + endFullVisibleItem * daysInItem - 1;
      const daysPartBegin = gridItemSize + (startItem * gridItemSize) - startPartVisibleItem * daysInItem;
      const daysPartEnd = endItem * gridItemSize + endPartVisibleItem * daysInItem - 1;

      this.current.dateFullBegin = offsetOnDay(currentDate, daysFullBegin);
      this.current.dateFullEnd = offsetOnDay(currentDate, daysFullEnd);
      this.current.datePartBegin = offsetOnDay(currentDate, daysPartBegin);
      this.current.datePartEnd = offsetOnDay(currentDate, daysPartEnd);

      const d = (
        (parseDate(this.current.dateFullEnd) - parseDate(this.current.dateFullBegin)) / DAYMS
      ) / 2 | 0;

      this.current.visibleDay = this.current.dateFullBegin;
      this.current.visibleMonth = getMonthDate(offsetOnDay(this.current.dateFullBegin, d)); // TODO зависит от направления скрола
      this.current.visibleRateBegin = 100 * startRateRest / itemRate | 0;
      this.current.visibleRateEnd = 100 * endRateRest / itemRate | 0;
    },

    _hoursOfDaySetter (value: string) {
      const list = value
        .split(',')
        .map(Number)
        .filter((item: number) => (item >= 0 && item <= 23));

      list.sort((a: number, b: number) => (a - b));

      value = list.join(',');

      if (value !== this.current.hoursOfDay) {
        this.current.hoursOfDay = value;
        this.current.DAYMS = list.length * HOURMS;
        this.current.GRID_HOURS = toObject(list);
        this.current.INTERVALS = createIntervals(list);
        this.isChanged = true;
      }
    },

    _weekendsSetter (value: string) {
      const list = value
        .split(',')
        .map(Number)
        .filter((item: number) => (item >= 0 && item <= 6));

      list.sort((a: number, b: number) => (a - b));

      value = list.join(',');

      if (value !== this.current.weekends) {
        this.current.weekends = value;
        this.current.WEEKENDS_SET = toObject(list);
        this.updateVisibleDate();
        this.isChanged = true;
      }
    },

    _hideWeekendsSetter (value: boolean) {
      value = Boolean(value);
      if (value !== this.current.hideWeekends) {
        this.current.hideWeekends = value;
        this.updateVisibleDate();
        this.isChanged = true;
      }
    },

    _gridDaysItemSizeSetter (value: number) {
      value = value | 0;
      if (value > 0 && value !== this.current.gridDaysItemSize) {
        this.current.gridDaysItemSize = value;
        this.updateVisibleDate();
        this.isChanged = true;
      }
    },

    _gridMonthItemSizeSetter (value: number) {
      value = value | 0;
      if (value > 0 && value !== this.current.gridMonthItemSize) {
        this.current.gridMonthItemSize = value;
        this.updateVisibleDate();
        this.isChanged = true;
      }
    },

    _currentDateSetter (value: number) {
      value = value | 0;
      if (value > 0 && value !== this.current.currentDate) {
        this.current.currentDate = value;
        this.updateVisibleDate();
        this.isChanged = true;
      }
    },
  };
}
