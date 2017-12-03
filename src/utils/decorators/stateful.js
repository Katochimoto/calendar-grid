export default function stateful (component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  component.prototype.componentDidUpdate = componentDidUpdate;
  component.prototype.transformState = transformState;
  component.prototype.updateState = updateState;
}

function shouldComponentUpdate () {
  return false;
}

function componentDidUpdate () {
  this._lockSetState = false;

  if (this._shouldUpdateState) {
    this.updateState();
  }
}

function transformState (/* props, context */) {
  return {};
}

function updateState (newProps = this.props) {
  if (this._lockSetState) {
    this._shouldUpdateState = true;
    return;
  }

  this._shouldUpdateState = false;

  const newState = this.transformState(newProps, this.context);

  if (this.shouldComponentUpdate(newProps, newState)) {
    this._lockSetState = true;
    this.setState(newState);

  } else {
    this._lockSetState = false;
  }
}
