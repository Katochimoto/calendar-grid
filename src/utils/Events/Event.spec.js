import { assert } from 'chai';
import Event from './Event';

describe('utils/Events/Event', function () {
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
  });

  afterEach(function () {
    this.events = undefined;
  });

  describe('first', function () {
    it('должен вернуть первое событие в цепочке', function () {
      const event = this.events[5].first();
      assert.strictEqual(event.get('dateBegin'), this.events[0].get('dateBegin'));
    });
  });

  describe('last', function () {
    it('должен вернуть последнее событие в цепочке', function () {
      const event = this.events[5].last();
      assert.strictEqual(event.get('dateBegin'), this.events[this.events.length - 1].get('dateBegin'));
    });
  });

  describe('firstByInterval', function () {
    it('должен найти первое событие в интервале (поиск вперед)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[0].firstByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateBegin);
    });

    it('должен найти первое событие в интервале (поиск назад)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[this.events.length - 1].firstByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateBegin);
    });

    it('должен найти первое событие в интервале (начальное событие в интервале)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[17].firstByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateBegin);
    });

    it('должен найти первое событие в интервале (интервал начинается раньше)', function () {
      const dateBegin = 20170520;
      const dateEnd = 20170620;
      const event = this.events[17].firstByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), this.events[0].get('dateBegin'));
    });

    it('должен найти первое событие в интервале (интервал начинается раньше, поиск назад)', function () {
      const dateBegin = 20170520;
      const dateEnd = 20170620;
      const event = this.events[this.events.length - 1].firstByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), this.events[0].get('dateBegin'));
    });
  });

  describe('lastByInterval', function () {
    it('должен найти последнее событие в интервале (поиск вперед)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[0].lastByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateEnd);
    });

    it('должен найти последнее событие в интервале (поиск назад)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[this.events.length - 1].lastByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateEnd);
    });

    it('должен найти последнее событие в интервале (начальное событие в интервале)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[17].lastByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateEnd);
    });

    it('должен найти последнее событие в интервале (интервал заканчивается позже)', function () {
      const dateBegin = 20170620;
      const dateEnd = 20170720;
      const event = this.events[0].lastByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), this.events[this.events.length - 1].get('dateBegin'));
    });

    it('должен найти последнее событие в интервале (интервал заканчивается позже, поиск назад)', function () {
      const dateBegin = 20170620;
      const dateEnd = 20170720;
      const event = this.events[this.events.length - 1].lastByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), this.events[this.events.length - 1].get('dateBegin'));
    });
  });

  describe('prevByInterval', function () {
    it('должен вернуть событие перед началом интервала (поиск сначала)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[0].prevByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateBegin - 1);
    });

    it('должен вернуть событие перед началом интервала (поиск сконца)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[this.events.length - 1].prevByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateBegin - 1);
    });

    it('должен вернуть поcледнее значение, если интервал больше всех событий', function () {
      const dateBegin = 20170715;
      const dateEnd = 20170720;
      const event = this.events[0].prevByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), this.events[this.events.length - 1].get('dateBegin'));
    });

    it('должен вернуть null, если интервал меньше всех событий', function () {
      const dateBegin = 20170515;
      const dateEnd = 20170520;
      const event = this.events[0].prevByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event, null);
    });

    it('должен вернуть null, если все события в интервале', function () {
      const dateBegin = 20170515;
      const dateEnd = 20170720;
      const event = this.events[0].prevByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event, null);
    });
  });

  describe('nextByInterval', function () {
    it('должен вернуть событие после конца интервала (поиск сначала)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[0].nextByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateEnd + 1);
    });

    it('должен вернуть событие после конца интервала (поиск сконца)', function () {
      const dateBegin = 20170615;
      const dateEnd = 20170620;
      const event = this.events[this.events.length - 1].nextByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), dateEnd + 1);
    });

    it('должен вернуть первое значение, если интервал меньше всех событий', function () {
      const dateBegin = 20170515;
      const dateEnd = 20170520;
      const event = this.events[0].nextByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event.get('dateBegin'), this.events[0].get('dateBegin'));
    });

    it('должен вернуть null, если интервал больше всех событий', function () {
      const dateBegin = 20170715;
      const dateEnd = 20170720;
      const event = this.events[0].nextByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event, null);
    });

    it('должен вернуть null, если все события в интервале', function () {
      const dateBegin = 20170515;
      const dateEnd = 20170720;
      const event = this.events[0].nextByInterval([dateBegin, dateEnd]);
      assert.strictEqual(event, null);
    });
  });
});
