import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import styles from './index.less';

export default class DayEventFolded extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.top !== nextProps.top
    );
  }

  render () {
    return (
      <div
        style={`top: ${this.props.top}%;`}
        className={styles.DayEventFolded} />
    );
  }
}

/* @if NODE_ENV=='development' **
DayEventFolded.propTypes = {
  events: PropTypes.array,
  top: PropTypes.number
};
/* @endif */

DayEventFolded.defaultProps = {
  events: [],
  top: 0
};
