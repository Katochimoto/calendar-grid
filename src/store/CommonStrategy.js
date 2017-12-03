import StoreStrategy from '../utils/StoreStrategy';
import mixin from '../utils/decorators/mixin';

import stateGrid from './state/grid';
import stateInfinite from './state/infinite';

import { createGrid, ctorGrid } from './decorators/strategyGrid';
import { createGridDay, ctorGridDay } from './decorators/strategyGridDay';
import { createGridMonth, ctorGridMonth } from './decorators/strategyGridMonth';
import { createInfinite, ctorInfinite } from './decorators/strategyInfinite';
import { createInfiniteX, ctorInfiniteX } from './decorators/strategyInfiniteX';
import { createInfiniteY, ctorInfiniteY } from './decorators/strategyInfiniteY';

const defaultState = {
  ...stateGrid,
  ...stateInfinite
};

@mixin([
  createGrid(),
  createGridDay(),
  createInfinite(),
  createInfiniteX()
])
export class GridDayStrategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
    ctorGrid.call(this);
    ctorGridDay.call(this);
    ctorInfinite.call(this);
    ctorInfiniteX.call(this);
  }
}

@mixin([
  createGrid(),
  createGridMonth(),
  createInfinite(),
  createInfiniteY()
])
export class GridMonthStrategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
    ctorGrid.call(this);
    ctorGridMonth.call(this);
    ctorInfinite.call(this);
    ctorInfiniteY.call(this);
  }
}
