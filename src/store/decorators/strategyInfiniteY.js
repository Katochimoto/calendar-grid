import { ASCROLL } from '../../constant';

export function ctorInfiniteY () {
  this.current.SAXISX = false;
  this.current.scrollX = 0;
}

export function createInfiniteY () {
  return {
    isVisibleOffset (offset: number): boolean {
      const { scrollY, scrollHeight, listRange, speedScrollY } = this.current;
      const min = this._getScrollYByOffset(offset);
      const max = min - scrollHeight;
      const maxOffset = scrollY / listRange;
      const minOffset = scrollY - scrollHeight * listRange;

      return scrollY !== undefined && !Boolean(
        (max > maxOffset) ||
        (max === maxOffset && speedScrollY <= 0) ||
        (min < minOffset) ||
        (min === minOffset && speedScrollY >= 0)
      );
    },

    getVisibleRange () {
      return this._getVisibleRange(
        this.current.scrollY,
        this.current.scrollHeight
      );
    },

    _getScrollYByOffset (offset: number): number {
      return (
        -1 * (offset + 1) *
        this.current.listRange *
        this.current.scrollHeight
      );
    },

    _correctScrollY () {
      const limitOffset = this._checkLimitOffset(
        this.current.scrollY,
        this.current.scrollOffsetTop,
        this.current.scrollOffsetBottom
      );

      if (!limitOffset) {
        return;
      }

      if (
        this.current.scrollAnimation === ASCROLL.ON ||
        this.current.scrollAnimation === ASCROLL.OFF
      ) {
        this.current.scrollAnimation = ASCROLL.STOP;
      }

      this.current.scrollDirection = this._correctLimitOffset(
        limitOffset,
        this.current.scrollDirection,
        1
      );

      this.current.scrollY = this._limitScrollY(this._correctLimitOffset(
        limitOffset,
        this.current.scrollY,
        this.current.scrollHeight
      ));

      switch (limitOffset) {
        case this.LIMIT_PREV:
          this._gridDateOffsetPrev();
          break;
        case this.LIMIT_NEXT:
          this._gridDateOffsetNext();
          break;
      }
    },

    _scrollHeightSetter (value) {
      const scrollHeight = this.current.scrollHeight;

      this.current.scrollHeight = value;
      // -2 потому что listRange сверху и снизу
      this.current.scrollOffsetTop = -2 * this.current.listRange * value;

      this.current.scrollY = this._limitScrollY(
        this.current.scrollY === undefined ? this._getScrollYByOffset(0) :
        scrollHeight > 0 ? this.current.scrollY * value / scrollHeight :
        0
      );

      this._correctScrollY();
      this.updateVisibleDate();
      this.isChanged = true;
    },

    _scrollWidthSetter (value) {
      const scrollWidth = this.current.scrollWidth;

      this.current.scrollWidth = value;
      this.current.scrollOffsetLeft = -1 * value;

      this.current.scrollX = this._limitScrollX(
        scrollWidth > 0 ? this.current.scrollX * value / scrollWidth :
        0
      );

      this.isChanged = true;
    },

    _scrollXSetter (value) {
      value = this._limitScrollX(value);
      if (value !== this.current.scrollX) {
        this.current.scrollX = value;
        this.isChanged = true;
      }
    },

    _scrollYSetter (value) {
      value = this._limitScrollY(value);
      if (value !== this.current.scrollY) {
        this.current.scrollY = value;
        this._correctScrollY();
        this.updateVisibleDate();
        this.isChanged = true;
      }
    },

    _listRangeSetter (value) {
      value = value | 0;
      if (value > 0 && value !== this.current.listRange) {
        this.current.listRange = value;
        this.isChanged = true;
      }
    }
  };
}
