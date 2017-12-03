import context from '../../context';

const ONRESIZE = Symbol('resize-callback');
const RTIMER = Symbol('resize-timer');

export function resize (component) {
  const proto = component.prototype;
  const didMount = proto.componentDidMount;
  const willUnmount = proto.componentWillUnmount;

  proto.componentDidMount = function () {
    didMount && didMount.call(this);
    this[ ONRESIZE ] = this.handleResize.bind(this);

    const that = this;
    this[ RTIMER ] = context.requestAnimationFrame(function _resizeMount () {
      that[ ONRESIZE ]();
      context.addEventListener('resize', that[ ONRESIZE ], false);
    });
  };

  proto.componentWillUnmount = function () {
    willUnmount && willUnmount.call(this);
    context.removeEventListener('resize', this[ ONRESIZE ], false);

    if (this[ RTIMER ]) {
      context.cancelAnimationFrame(this[ RTIMER ]);
      this[ RTIMER ] = 0;
    }
  };
}
