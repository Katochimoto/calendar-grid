/**
 *
 */

import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */
import classnames from 'classnames';

import styles from './index.less';

export default class DayHeader extends Component {

  shouldComponentUpdate (nextProps) {
    return (
      this.props.date !== nextProps.date ||
      this.props.isWeekend !== nextProps.isWeekend
    );
  }

  render () {
    const datetime = this.context.datetime;
    const { date, isWeekend } = this.props;
    const classes = classnames({
      [ styles.DayHeader ]: true,
      [ styles.DayHeader__weekend ]: isWeekend
    });

    return (
      <div className={classes}>
        <div className={styles.DayHeader_Title}>
          {datetime.gridDaysDayTitle(date)}
        </div>
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayHeader.propTypes = {
  date: PropTypes.number,
  isWeekend: PropTypes.bool,
};
/* @endif */

DayHeader.defaultProps = {
  isWeekend: false,
};
