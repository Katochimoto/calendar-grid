import {
  offsetOnDay,
  WEEKDAYS,
} from '../../utils/date';

export function ctorGridMonth () {
  
}

export function createGridMonth () {
  return {
    gridDateOffset (date: number, offset: number): number {
      return offsetOnDay(date, offset * WEEKDAYS);
    },

    gridDateItemOffset (date: number, offset: number): number {
      const dayOffset = this.current.gridMonthItemSize * offset;
      return this.gridDateOffset(date, dayOffset);
    },

    updateVisibleDate () {
      this._updateVisibleDate({
        itemSize: this.current.gridMonthItemSize,
        daysInItem: 7
      });
    },

    _gridDateOffsetNext () {
      this.current.updated++;
      this.current.currentDate = this.gridDateItemOffset(
        this.current.currentDate,
        1
      );
    },

    _gridDateOffsetPrev () {
      this.current.updated++;
      this.current.currentDate = this.gridDateItemOffset(
        this.current.currentDate,
        -1
      );
    }
  };
}
