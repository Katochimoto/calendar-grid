// @flow

import EventEmitter from './EventEmitter';
import StoreStrategy from './StoreStrategy';

export default class Store extends EventEmitter {
  _strategy: StoreStrategy;

  constructor (strategy: StoreStrategy) {
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

  setStrategy (strategy: StoreStrategy) {
    this._setStrategy(strategy);
    // this.emitChange();
  }

  getState () {
    return this._strategy.state;
  }

  update (data: {[id:string]: any}) {
    if (this._strategy.update(data)) {
      this.emitChange();
    }
  }

  _setStrategy (strategy: StoreStrategy) {
    if (this._strategy) {
      this._strategy.destroy();
    }

    this._strategy = strategy;
  }
}
