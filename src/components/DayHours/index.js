/**
 *
 */

import { StoreComponent } from '../../utils/Component';

import styles from './index.less';

export default class DayHours extends StoreComponent {

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.hoursOfDay !== nextState.hoursOfDay
    );
  }

  transformState (props, context) {
    const { hoursOfDay, HOURS_LIST } = context.store.getState();
    return { hoursOfDay, HOURS_LIST };
  }

  getItems () {
    const HOURS_LIST = this.state.HOURS_LIST;

    if (!HOURS_LIST) {
      return null;
    }

    const datetime = this.context.datetime;
    const items = [];

    for (let i = 0, len = HOURS_LIST.length; i < len; i++) {
      const hour = HOURS_LIST[ i ];

      items.push(
        <div key={hour}
          className={styles.DayHours_Item}
          data-hour={datetime.gridDaysHourTitle(hour)} />
      );
    }

    const hour = HOURS_LIST[ 0 ];

    items.push(
      <div key={`next-${hour}`}
        className={styles.DayHours_Item}
        data-hour={datetime.gridDaysHourTitle(hour)} />
    );

    return items;
  }

  render () {
    return (
      <div className={styles.DayHours}>
        {this.getItems()}
      </div>
    );
  }
}
