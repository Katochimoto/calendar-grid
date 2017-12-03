import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class DayEvent extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.top !== nextProps.top ||
      this.props.bottom !== nextProps.bottom ||
      this.props.left !== nextProps.left ||
      this.props.right !== nextProps.right
    );
  }

  render () {
    const { event, top, bottom, left, right } = this.props;
    const fontSize = 0.9;
    const style = `
      font-size: ${fontSize}em;
      left: ${left}%;
      right: ${right}%;
      top: ${top}%;
      bottom: ${bottom}%;`;

    return (
      <div className={styles.DayEvent} style={style}>
        {event.title}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayEvent.propTypes = {
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  event: PropTypes.object
};
/* @endif */

DayEvent.defaultProps = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};
