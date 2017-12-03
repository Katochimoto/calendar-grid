// @flow

import { qlazy } from './decorators/lazy';
import EventEmitter from './EventEmitter';
import Strategy from './Events/Strategy';

export default class Events extends EventEmitter {
  _strategy: Strategy;

  /**
   * @param {Strategy} strategy
   */
  constructor (strategy: ?Strategy) {
    super();
    this._setStrategy(strategy);
  }

  destroy () {
    super.destroy();
    if (this._strategy) {
      this._strategy.destroy();
      this._strategy = undefined;
    }
  }

  setStrategy (strategy: Strategy) {
    this._setStrategy(strategy);
    // this.emitChange();
  }

  getByInterval (interval: number[]): Array<Object> {
    return this._strategy.getByInterval(interval);
  }

  uploadByInterval (interval: number[]): Function {
    return qlazy(() => this._strategy.uploadByInterval(interval));
  }

  _handleChangeStrategy () {
    this.emitChange();
  }

  _setStrategy (strategy: Strategy) {
    if (this._strategy) {
      this._strategy.destroy();
    }

    this._strategy = strategy || (new Strategy: Strategy);
    this._strategy.addChangeListener(this._handleChangeStrategy, this);
  }
}
