import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import MonthWeekDays from '../MonthWeekDays';
import MonthWeekEvents from '../MonthWeekEvents';
import styles from './index.less';

export default class MonthWeek extends StoreComponent {

  componentWillReceiveProps (nextProps) {
    this.updateState(nextProps);
  }

  shouldComponentUpdate (nextProps, nextState) {
    const props = this.props;
    const state = this.state;

    return (
      props.date !== nextProps.date ||
      props.hideWeekends !== nextProps.hideWeekends ||
      props.weekends !== nextProps.weekends ||
      state.isVisible !== nextState.isVisible ||
      state.visibleMonth !== nextState.visibleMonth
    );
  }

  transformState (props, context) {
    const isVisible = (
      context.store.isVisibleDate(props.date)
    );

    const {
      visibleMonth,
      speedScrollY
    } = context.store.getState();

    return {
      isVisible,
      visibleMonth,
      speedScrollY,
    };
  }

  handleVisible () {
    this.updateState();
  }

  render () {
    const { date, hideWeekends } = this.props;
    const content = do {
      if (this.state.isVisible) {
        [
          <MonthWeekDays
            date={date}
            hideWeekends={hideWeekends} />,

          <MonthWeekEvents
            date={date}
            hideWeekends={hideWeekends} />
        ];
      } else {
        null;
      }
    };

    return (
      <div className={styles.MonthWeek}>
        {content}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
MonthWeek.propTypes = {
  date: PropTypes.number,
  hideWeekends: PropTypes.bool,
  weekends: PropTypes.string,
};
/* @endif */

MonthWeek.defaultProps = {
  date: 0,
  hideWeekends: false,
  weekends: '',
};
