import context from '../../context';

const ONSTOP = Symbol('wheel-stop');
const ONSTOPSUCCESS = Symbol('wheel-stop-success');
const ONUPDATE = Symbol('wheel-update');
const ONWHEEL = Symbol('wheel-callback');
const STIMER = Symbol('wheel-stop-timer');
const STIMERSUCCESS = Symbol('wheel-stop-timer-success');
const WHEELSTART = Symbol('wheel-start');
const WHEELX = Symbol('wheel-delta-x');
const WHEELY = Symbol('wheel-delta-y');
const WTIMER = Symbol('wheel-timer');

let passiveSupported = false;
try {
  const options = Object.defineProperty({}, 'passive', {
    get: function() {
      passiveSupported = true;
    }
  });

  context.addEventListener('test', null, options);
} catch(err) {}

const doc = context.document;
const wheelEventName = do {
  if (doc) {
    if ('onwheel' in doc.createElement('div')) {
      'wheel';
    } else if (doc.onmousewheel !== undefined) {
      'mousewheel';
    } else {
      'DOMMouseScroll';
    }
  } else {
    'wheel';
  }
};

const wheelEventOptions = passiveSupported ?
  { passive: true } :
  false;

const onWheel = wrapWheelCallback(function _onWheel (event) {
  if (!passiveSupported) {
    event.preventDefault();
  }

  const timer = this[ WTIMER ];

  if (!this[ WHEELSTART ]) {
    this[ WHEELSTART ] = true;
    this.handleWheelStart && this.handleWheelStart();
  }

  this[ WHEELX ] = event.deltaX + (timer ? this[ WHEELX ] : 0);
  this[ WHEELY ] = event.deltaY + (timer ? this[ WHEELY ] : 0);

  if (!timer) {
    //this[ WTIMER ] = context.requestAnimationFrame(() => {
    this[ WTIMER ] = context.requestAnimationFrame(this[ ONUPDATE ]);
    //});
  }
});

const onWheelUpdate = function _onWheelUpdate () {
  this.handleWheel && this.handleWheel(this[ WHEELX ], this[ WHEELY ]);
  this[ WTIMER ] = 0;
  this[ STIMER ] = context.requestAnimationFrame(this[ ONSTOP ]);
};

const onWheelStop = function _onWheelStop () {
  if (this[ STIMERSUCCESS ]) {
    context.clearTimeout(this[ STIMERSUCCESS ]);
    this[ STIMERSUCCESS ] = 0;
  }

  if (!this[ WTIMER ]) {
    this[ STIMERSUCCESS ] = context.setTimeout(this[ ONSTOPSUCCESS ], 150);
  }
};

const onWheelStopSuccess = function _onWheelStopSuccess () {
  this[ STIMERSUCCESS ] = 0;
  if (!this[ WTIMER ]) {
    this[ WHEELSTART ] = false;
    this.handleWheelStop && this.handleWheelStop();
  }
};

export default function wheel (component) {
  const proto = component.prototype;
  const didMount = proto.componentDidMount;
  const willUnmount = proto.componentWillUnmount;

  proto.componentDidMount = function () {
    didMount && didMount.call(this);

    this[ ONWHEEL ] = onWheel.bind(this);
    this[ ONUPDATE ] = onWheelUpdate.bind(this);
    this[ ONSTOP ] = onWheelStop.bind(this);
    this[ ONSTOPSUCCESS ] = onWheelStopSuccess.bind(this);

    this._rootNode.addEventListener(wheelEventName, this[ ONWHEEL ], wheelEventOptions);
  };

  proto.componentWillUnmount = function () {
    willUnmount && willUnmount.call(this);

    this[ WHEELSTART ] = false;

    this._rootNode.removeEventListener(wheelEventName, this[ ONWHEEL ], wheelEventOptions);

    if (this[ WTIMER ]) {
      context.cancelAnimationFrame(this[ WTIMER ]);
      this[ WTIMER ] = 0;
    }

    if (this[ STIMER ]) {
      context.cancelAnimationFrame(this[ STIMER ]);
      this[ STIMER ] = 0;
    }

    if (this[ STIMERSUCCESS ]) {
      context.clearTimeout(this[ STIMERSUCCESS ]);
      this[ STIMERSUCCESS ] = 0;
    }
  };
}

function wrapWheelCallback (callback) {
  if (wheelEventName === 'wheel') {
    return callback;
  }

  return function (originalEvent) {
    if (!originalEvent) {
      originalEvent = context.event;
    }

    const event = {
      originalEvent: originalEvent,
      target: originalEvent.target || originalEvent.srcElement,
      type: 'wheel',
      deltaMode: 1,
      deltaX: 0,
      deltaY: 0,
      deltaZ: 0,
      clientX: originalEvent.clientX,
      clientY: originalEvent.clientY,
      preventDefault: function () {
        if (originalEvent.preventDefault) {
          originalEvent.preventDefault();

        } else {
          originalEvent.returnValue = false;
        }
      },
      stopPropagation: function () {
        if (originalEvent.stopPropagation) {
          originalEvent.stopPropagation();
        }
      },
      stopImmediatePropagation: function () {
        if (originalEvent.stopImmediatePropagation) {
          originalEvent.stopImmediatePropagation();
        }
      }
    };

    if (wheelEventName === 'mousewheel') {
      event.deltaY = - 1/40 * originalEvent.wheelDelta;

      if (originalEvent.wheelDeltaX) {
        event.deltaX = - 1/40 * originalEvent.wheelDeltaX
      }

    } else {
      event.deltaY = originalEvent.detail;
    }

    return callback(event);
  };
}
