import { assert } from 'chai';
import { offsetOnWorksDay, parseDate, formatDate } from './date';

describe('utils/date', function () {
  describe('formatDate', function () {
    [
      [
        new Date(2017, 2, 30, 0, 0, 0, 0),
        20170330
      ]
    ].forEach(item => {
      it(`${JSON.stringify(item[0])} === ${item[1]}`, function () {
        assert.equal(formatDate(item[0]), item[1]);
      });
    });
  });

  describe('parseDate', function () {
    [
      [
        20170330,
        new Date(2017, 2, 30, 0, 0, 0, 0)
      ],
      [
        20170330.123456,
        new Date(2017, 2, 30, 0, 0, 0, 0)
      ]
    ].forEach(item => {
      it(`${JSON.stringify(item[0])} === ${item[1]}`, function () {
        assert.equal(parseDate(item[0]).toString(), item[1].toString());
      });
    });
  });

  describe('offsetOnWorksDay', function () {
    [
      [
        [20170330, 1],
        20170331
      ],
      [
        [20170331, 1, { 0: 0, 6: 1 }],
        20170403
      ],
      [
        [20170401, 7, { 0: 0, 6: 1 }],
        20170411
      ],
      [
        [20170406, 4, { 0: 0, 6: 1 }],
        20170412
      ],
      [
        [20170406, 4],
        20170410
      ],
      [
        [20170406, 4, { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }],
        20170410
      ],
      [
        [20170402, -4],
        20170329
      ],
      [
        [20170402, -4, { 0: 0, 6: 1 }],
        20170328
      ],
      [
        [20170402, -7, { 0: 0, 6: 1 }],
        20170323
      ],
    ].forEach(item => {
      it(`${JSON.stringify(item[0])} === ${item[1]}`, function () {
        assert.equal(offsetOnWorksDay.apply(null, item[0]), item[1]);
      });
    })
  });
});
