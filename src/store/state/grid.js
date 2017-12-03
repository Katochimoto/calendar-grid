import { GRID } from '../../constant';
import { HOURMS } from '../../utils/date';
import { toObject, createIntervals } from '../../utils/array';

const HOURS = '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23';
const HOURS_LIST = HOURS.split(',').map(Number);
const INTERVALS = createIntervals(HOURS_LIST);
const DAYMS = HOURS_LIST.length * HOURMS;
const GRID_HOURS = toObject(HOURS_LIST);

const WEEKENDS = '0,6';
const WEEKENDS_SET = toObject(WEEKENDS.split(',').map(Number));

export default {
  grid: GRID.DAY,
  scaleY: 200,

  //gridHeight: 0,
  //viewportHeight: 0,
  //viewportMinutesBegin: 0,
  //viewportMinutesEnd: 0,

  /**
   * Количество дней в одном элементе InfiniteList.
   * Для сетки по дням.
   * @type {number}
   * @public
   */
  gridDaysItemSize: 7,

  /**
   * Количество недель в одном элементе InfiniteList.
   * Для сетки по месяцам.
   * @type {number}
   * @public
   */
  gridMonthItemSize: 5,

  /**
   * Текущая дата
   * @type {string}
   * @public
   */
  currentDate: 20170501,

  /**
   * Рабочие часы в сутках
   * @type {string}
   * @public
   */
  hoursOfDay: HOURS,

  /**
   * Объект соответствия рабочего часа с реальным положением в сетке
   * @constant {Object.<string, number>}
   */
  GRID_HOURS: GRID_HOURS,

  HOURS_LIST: HOURS_LIST,

  /**
   * Количество миллисекунд в сутках
   * @type {number}
   * @public
   * @readonly
   */
  DAYMS: DAYMS,

  /**
   * Рабочие интервалы в сутках
   * @type {Object}
   * @public
   * @readonly
   */
  INTERVALS: INTERVALS,

  /**
   * Выходные дни недели
   * @type {string}
   * @public
   */
  weekends: WEEKENDS,

  /**
   * Объект дней недели
   * @constant {Object.<string, number>}
   */
  WEEKENDS_SET: WEEKENDS_SET,

  /**
   * Скрывать выходные
   * @type {boolean}
   * @public
   */
  hideWeekends: false,

  /**
   * Начинать неделю с дня
   * @type {number}
   * @public
   */
  beginningOfWeek: 1,

  dateFullBegin: 0,
  dateFullEnd: 0,
  datePartBegin: 0,
  datePartEnd: 0,
  visibleDay: 0,
  visibleMonth: 0,
  visibleRateBegin: 0,
  visibleRateEnd: 0,
};
