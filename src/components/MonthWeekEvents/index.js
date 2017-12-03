import { EventsComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */
import classnames from 'classnames';
import { WEEKDAYS } from '../../utils/date';

import MonthWeekEvent from '../MonthWeekEvent';

import styles from './index.less';
import gridStyles from '../../style/Grid.less';

export default class MonthWeekEvents extends EventsComponent {

  transformState (props, context) {
    const interval = this.getInterval(props);
    const events = context.events.getByInterval(interval);

    return {
      events
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.props.hideWeekends !== nextProps.hideWeekends
      // this.state.events !== nextState.events // вернуть после Immutable событий
    );
  }

  getInterval (props = this.props) {
    return [
      props.date,
      this.context.datetime.offsetOnDay(props.date, WEEKDAYS - 1)
    ];
  }

  getItems () {
    const items = [];
    const store = this.context.store;
    const date = this.props.date;
    const events = this.state.events;

    return items;
  }

  render () {
    const days = 7;
    const rows = 7;
    const classes = classnames({
      [ styles.MonthWeekEvents ]: true,
      [ gridStyles.Grid ]: true,
      [ gridStyles[ `Grid__columns${days}` ] ]: true,
      [ gridStyles[ `Grid__rows${rows}` ] ]: true,
    });

    return (
      <div className={classes}>
        <MonthWeekEvent
          rowStart={1}
          columnStart={1}
          columnEnd={2} />
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
MonthWeekEvents.propTypes = {
  date: PropTypes.number,
  hideWeekends: PropTypes.bool
};
/* @endif */
