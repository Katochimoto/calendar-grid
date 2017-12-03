import {
  offsetOnDay,
  offsetOnWorksDay,
} from '../../utils/date';

export function ctorGridDay () {

}

export function createGridDay () {
  return {
    gridDateOffset (date: number, offset: number): number {
      if (this.current.hideWeekends) {
        return offsetOnWorksDay(date, offset, this.current.WEEKENDS_SET);

      } else {
        return offsetOnDay(date, offset);
      }
    },

    gridDateItemOffset (date: number, offset: number): number {
      const dayOffset = this.current.gridDaysItemSize * offset;
      return this.gridDateOffset(date, dayOffset);
    },

    updateVisibleDate () {
      this._updateVisibleDate({
        itemSize: this.current.gridDaysItemSize,
        daysInItem: 1
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
