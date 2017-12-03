export default function mutable (watched) {
  return function (component) {
    const proto = component.prototype;
    const didMount = proto.componentDidMount;
    const willUnmount = proto.componentWillUnmount;

    proto.componentDidMount = function () {
      didMount && didMount.call(this);
      this.context[ watched ].addChangeListener(this.updateState, this);
    };

    proto.componentWillUnmount = function () {
      willUnmount && willUnmount.call(this);
      this.context[ watched ].removeChangeListener(this.updateState, this);
    };
  }
}
