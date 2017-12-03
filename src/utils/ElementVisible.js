import context from '../context';

const THRESHOLD = 0.05;
const CAN_USE_INTERSECTION = (
  typeof context.WeakMap === 'function' &&
  typeof context.IntersectionObserver === 'function'
);

export default class ElementVisible {

  initialize (root) {
    if (!CAN_USE_INTERSECTION) {
      return;
    }

    this.destroy();
    this._visibles = new context.WeakMap();
    this._callbacks = new context.WeakMap();
    this._observer = new context.IntersectionObserver(::this._callback, {
      root: root,
      threshold: [ THRESHOLD ],
    });
    this._observer.POLL_INTERVAL = 100;
  }

  destroy () {
    this._visibles = undefined;
    this._callbacks = undefined;
    if (this._observer) {
      this._observer.disconnect();
      this._observer = undefined;
    }
  }

  observe (element, callback) {
    if (this._callbacks) {
      this._callbacks.set(element, callback);
    }

    if (this._observer) {
      this._observer.observe(element);
    }
  }

  unobserve (element) {
    if (this._visibles) {
      this._visibles.delete(element);
    }

    if (this._callbacks) {
      this._callbacks.delete(element);
    }

    if (this._observer) {
      this._observer.unobserve(element);
    }
  }

  check (element) {
    if (!CAN_USE_INTERSECTION) {
      return true;
    }

    return this._visibles && this._visibles.get(element) || false;
  }

  _callback (changes) {
    if (!this._callbacks) {
      return;
    }

    for (let i = 0, len = changes.length; i < len; i++) {
      const item = changes[i];
      const callback = this._callbacks.get(item.target);

      if (!callback) {
        continue;
      }

      const isVisible = checkVisible(
        item.boundingClientRect,
        item.intersectionRect
      );

      this._visibles.set(item.target, isVisible);
      callback(isVisible);
    }
  }
}

function checkVisible (cr, ir) {
  return ((ir.width * ir.height) / (cr.width * cr.height) >= THRESHOLD);
}
