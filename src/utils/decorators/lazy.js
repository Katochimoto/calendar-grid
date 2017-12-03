import context from '../../context';

const CALLBACKS = [];

export function lazy (target, key, descriptor) {
  return _lazyDecorator(context.setImmediate, target, key, descriptor);
}

export function idle (target, key, descriptor) {
  return _lazyDecorator(context.requestIdleCallback, target, key, descriptor);
}

export function raf (target, key, descriptor) {
  return _lazyDecorator(context.requestAnimationFrame, target, key, descriptor);
}

export function qlazy (callback) {
  if (!CALLBACKS.length) {
    context.setTimeout(_qlazyRun, 200);
  }

  callback.cancel = () => _qlazyCancel(callback);
  CALLBACKS.push(callback);
  return callback;
}

function _qlazyCancel (callback) {
  let i = 0;
  while (i < CALLBACKS.length) {
    if (CALLBACKS[i] === callback) {
      CALLBACKS.splice(i, 1);

    } else {
      i++;
    }
  }
}

function _qlazyRun () {
  let task;
  while ((task = CALLBACKS.shift())) {
    task();
  }
}

function _lazyDecorator (flazy, target, key, descriptor) {
  const callback = descriptor.value;
  callback._args = [];

  const _lazyRun = function () {
    const saveArgs = callback._args;
    callback._timer = 0;
    callback._args = [];
    callback.call(this, saveArgs);
  };

  descriptor.value = function (...args) {
    args.length && callback._args.push(args);

    if (!callback._timer) {
      const that = this;
      callback._timer = flazy(function _lazy () {
        _lazyRun.call(that);
      });
    }
  };

  descriptor.value.displayName = key;

  return descriptor;
}
