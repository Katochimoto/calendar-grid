// @flow

import Store from '../utils/Store';
import StoreStrategy from '../utils/StoreStrategy';
import { GridDayStrategy, GridMonthStrategy } from './CommonStrategy';

export default class CommonStore extends Store {
  constructor (strategy: StoreStrategy) {
    super(strategy || (new GridDayStrategy: StoreStrategy));
  }

  switchStrategyGridDay () {
    const state = { ...this.getState() };
    state.scrollY = undefined;
    state.scrollX = undefined;
    this.setStrategy(new GridDayStrategy(state));
  }

  switchStrategyGridMonth () {
    const state = { ...this.getState() };
    state.scrollY = undefined;
    state.scrollX = undefined;
    this.setStrategy(new GridMonthStrategy(state));
  }

  // -------------------------------------------------------------
  gridDateOffset (date: number, offset: number): number {
    return this._strategy.gridDateOffset(date, offset);
  }

  gridDateItemOffset (date: number, offset: number): number {
    return this._strategy.gridDateItemOffset(date, offset);
  }

  timeToRate (time: number): number {
    return this._strategy.timeToRate(time);
  }

  checkWeekend (date: number): boolean {
    return this._strategy.checkWeekend(date);
  }
  // -------------------------------------------------------------


  // -------------------------------------------------------------
  forceUpdated () {
    if (this._strategy.forceUpdated()) {
      this.emitChange();
    }
  }

  updateScrollByWheel (deltaX: number, deltaY: number) {
    if (this._strategy.updateScrollByWheel(deltaX, deltaY)) {
      this.emitChange();
    }
  }

  isVisibleOffset (offset: number): boolean {
    return this._strategy.isVisibleOffset(offset);
  }

  getVisibleRange () {
    return this._strategy.getVisibleRange();
  }
  // -------------------------------------------------------------

  // -------------------------------------------------------------
  /**
   * @param {number} date
   * @returns {number} процент видимости даты
   */
  checkVisibleDate (date: number): number {
    return this._strategy.checkVisibleDate(date);
  }

  isVisibleDate (date: number): boolean {
    return this._strategy.isVisibleDate(date);
  }

  isCurrentMonthDate (date: number): boolean {
    return this._strategy.isCurrentMonthDate(date);
  }
  // -------------------------------------------------------------
}
