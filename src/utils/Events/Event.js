// @flow

import EventEmitter from '../EventEmitter';

const F_ID = 'id';
const F_UPDATED = 'updated';
const F_DATE_BEGIN = 'dateBegin';
const F_DATE_END = 'dateEnd';

export default class Event extends EventEmitter {
  _data: ?Object;
  _next: ?Event;
  _prev: ?Event;

  constructor (data: {[id:string]: any}) {
    super();
    this._data = data;
    this._next = null;
    this._prev = null;
  }

  destroy () {
    super.destroy();
    this._data = null;
    this._next = null;
    this._prev = null;
  }

  get(name: string): any {
    return this._data && this._data[ name ];
  }

  getId (): string {
    return this.get(F_ID);
  }

  next (): ?Event {
    return this._next;
  }

  prev (): ?Event {
    return this._prev;
  }

  setPrevNext (prev: ?Event, next: ?Event): Event {
    this._prev = prev;
    this._next = next;
    return this;
  }

  setNext (next: ?Event): Event {
    this._next = next;
    return this;
  }

  setPrev (prev: ?Event): Event {
    this._prev = prev;
    return this;
  }

  valueOf (): any {
    return this.get(F_UPDATED);
  }

  toString (): string {
    return String(this.valueOf() || '');
  }

  compareBeginInInterval (interval: number[]): number {
    const dateBegin = interval[0]
    const dateEnd = interval[1] || dateBegin;
    const evtDateBegin = this.get(F_DATE_BEGIN);

    return do {
      if (evtDateBegin < dateBegin) {
        -1;
      } else if (evtDateBegin > dateEnd) {
        1;
      } else {
        0;
      }
    };
  }

  isBeginInInterval (interval: number[]): boolean {
    return this.compareBeginInInterval(interval) === 0;
  }

  first (): ?Event {
    let item;
    let current = this;

    do {
      item = current;
      current = current.prev();
    } while (current);

    return item || null;
  }

  last (): ?Event {
    let item;
    let current = this;

    do {
      item = current;
      current = current.next();
    } while (current);

    return item || null;
  }

  firstByInterval (interval: number[]): ?Event {
    let item;
    let toFirst = true;
    let current = this;

    while (current && !item) {
      const compare = current.compareBeginInInterval(interval);

      if (compare === -1) {
        current = current.next();
        toFirst = false;
      } else if (compare === 1) {
        current = current.prev();
        toFirst = true;
      } else if (toFirst) {
        const prev = current.prev();
        if (prev) {
          current = prev;
        } else {
          item = current;
        }
      } else {
        item = current;
      }
    }

    return item || null;
  }

  lastByInterval (interval: number[]): ?Event {
    let item;
    let toLast = true;
    let current = this;

    while (current && !item) {
      const compare = current.compareBeginInInterval(interval);

      if (compare === -1) {
        current = current.next();
        toLast = true;
      } else if (compare === 1) {
        current = current.prev();
        toLast = false;
      } else if (toLast) {
        const next = current.next();
        if (next) {
          current = next;
        } else {
          item = current;
        }
      } else {
        item = current;
      }
    }

    return item || null;
  }

  prevByInterval (interval: number[]): ?Event {
    let item = this.firstByInterval(interval);
    item = item && item.prev();

    if (!item) {
      const last = this.last();
      if (last && last.compareBeginInInterval(interval) === -1) {
        item = last;
      }
    }
    
    return item;
  }

  nextByInterval (interval: number[]): ?Event {
    let item = this.lastByInterval(interval);
    item = item && item.next();

    if (!item) {
      const first = this.first();
      if (first && first.compareBeginInInterval(interval) === 1) {
        item = first;
      }
    }
    
    return item;
  }
}
