import { assert } from 'chai';
import Strategy from './Strategy';
import Event from './Event';

describe('utils/Events/Strategy', function () {
  beforeEach(function () {
    this.events = [];

    const date = 20170600;
    for (let i = 1; i < 31; i++) {
      this.events.push(new Event({
        id: i,
        dateBegin: date + i,
        dateEnd: date + i
      }));
    }

    this.events.forEach(function (item, idx, events) {
      item.setPrevNext(
        events[idx - 1] || null,
        events[idx + 1] || null
      );
    });

    this.strategy = new Strategy();
  });

  afterEach(function () {
    this.strategy.destroy();
    this.strategy = undefined;
    this.events = undefined;
  });

  describe.only('clearByInterval', function () {
    beforeEach(function () {
      this.strategy._state = this.events;
      this.strategy._current = this.events[0];
    });

    it('должен удалить события из интервала', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.strictEqual(first.next(), last);
      assert.strictEqual(first.prev().get('dateBegin'), dateBegin - 2);
      assert.strictEqual(last.prev(), first);
      assert.strictEqual(last.next().get('dateBegin'), dateEnd + 2);
    });

    it('должен вернуть предыдущее событие начала интервала', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.strictEqual(first.get('dateBegin'), dateBegin - 1);
    });

    it('должен вернуть следующее событие конца интервала', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.strictEqual(last.get('dateBegin'), dateEnd + 1);
    });

    it('должен вернуть пустое начало, если интервал начинается раньше', function () {
      const dateBegin = 20170501;
      const dateEnd = 20170620;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.strictEqual(first, null);
    });

    it('должен вернуть пустой конец, если интервал заканчивается позже', function () {
      const dateBegin = 20170620;
      const dateEnd = 20170701;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.strictEqual(last, null);
    });

    it('должен вернуть последнее событие в данных, если интервал начинается позже', function () {
      const dateBegin = 20170701;
      const dateEnd = 20170701;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.strictEqual(first, this.events[this.events.length - 1]);
    });

    it('должен вернуть первое событие в данных, если интервал заканчивается раньше', function () {
      const dateBegin = 20170501;
      const dateEnd = 20170501;
      const [ first, last ] = this.strategy.clearByInterval([ dateBegin, dateEnd ]);
      assert.strictEqual(last, this.events[0]);
    });
  });
});
