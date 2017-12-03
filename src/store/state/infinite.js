import { ASCROLL } from '../../constant';

export default {
  SAXISX: undefined,

  updated: 0,

  /**
   * Направление скролла,
   * значение увеличивается при достижении предела справа,
   * умньшается при достижении предела слева.
   * @type {number}
   * @public
   */
  scrollDirection: 0,

  /**
   * -2 - нет анимации
   * -1 - программное прерывание анимации
   * 0 - анимация выключена
   * 1 - анимация включена
   * @type {Number}
   */
  scrollAnimation: ASCROLL.DISABLE,

  /**
   * Количество предзагружаемых заранее интервалов InfiniteList слева и справа от текущего
   * @constant {number}
   * @public
   * @readonly
   */
  listRange: 1,
  scrollHeight: 0,
  scrollWidth: 0,

  /**
   * смещение скрола по оси X = -1 * listRange * scrollWidth
   * @type {number}
   * @public
   */
  scrollX: undefined,

  /**
   * смещение скрола по оси Y
   * @type {number}
   * @public
   */
  scrollY: undefined,

  /**
   * скорость скролла по X: вправо > 0; влево < 0;
   * @type {number}
   * @public
   */
  speedScrollX: 0,

  /**
   * скорость скролла по Y: вверх > 0; вниз < 0;
   * @type {number}
   * @public
   */
  speedScrollY: 0,

  /**
   * максимальное смещение при скроле влево = -1 * scrollWidth * ( listRange * 2 )
   * @type {number}
   * @private
   * @readonly
   */
  scrollOffsetLeft: 0,

  /**
   * максимальное смещение при скроле вправо
   * @constant {number}
   * @private
   * @readonly
   */
  scrollOffsetRight: 0,

  /**
   * максимальное смещение при скроле вверх = -1 * scrollHeight
   * @type {number}
   * @private
   * @readonly
   */
  scrollOffsetTop: 0,

  /**
   * максимальное смещение при скроле вниз
   * @constant {number}
   * @private
   * @readonly
   */
  scrollOffsetBottom: 0,

  //stickyScrollX: false,   // ? залипающий скролл по X
  //stepScrollX: false,     // ? пошаговый скролл по X
  //freeScrollX: false,     // ? свободный скролл по X
  //freeScrollY: false,     // ? свободный скролл по Y

  
};
