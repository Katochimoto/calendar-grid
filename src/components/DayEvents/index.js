import { EventsComponent } from '../../utils/Component';
import { getColumn } from '../../utils/array';
import { HOURMS } from '../../utils/date';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import DayEvent from '../DayEvent';
import DayEventFolded from '../DayEventFolded';

import styles from './index.less';

export default class DayEvents extends EventsComponent {

  transformState (props, context) {
    const interval = this.getInterval(props);
    const eventsIterator = context.events.getByInterval(interval);
    const { INTERVALS } = context.store.getState();

    return {
      eventsIterator,
      INTERVALS
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.date !== nextProps.date ||
      this.props.hoursOfDay !== nextProps.hoursOfDay ||
      this.state.eventsIterator !== nextState.eventsIterator
    );
  }

  getInterval (props = this.props) {
    return [ props.date ];
  }

  getItems () {
    const items = [];
    const events = this.state.eventsIterator;

    const store = this.context.store;
    const date = this.props.date;
    const INTERVALS = this.state.INTERVALS;
    const eventsFolded = {};
    const eventsColumn = {};
    let columns = [];
    let columnsTimeMax = 0;

    const ilen = INTERVALS.length;

    let result;
    while ((result = events.next()) && !result.done) {
      const event = result.value;
      const eventId = event.getId();
      const timeEnd = event.get('timeEnd');
      const timeBegin = event.get('timeBegin');

      for (let j = 0; j < ilen; j++) {
        const interval = INTERVALS[j];
        const intervalBegin = interval[0];
        const intervalEnd = interval[1];
        const intervalFolded = interval[2];
        const intervalKey = `${date}-${intervalBegin}-${intervalEnd}`;

        if (timeEnd <= intervalBegin || timeBegin >= intervalEnd) {
          continue;
        }

        if (intervalFolded) {
          if (intervalKey in eventsFolded) {
            eventsFolded[ intervalKey ].push(event);

          } else {
            eventsFolded[ intervalKey ] = [ event ];

            items.push({
              folded: true,
              key: intervalKey,
              top: store.timeToRate(intervalBegin - 1),
              events: eventsFolded[ intervalKey ]
            });
          }

        } else {
          if (timeBegin > columnsTimeMax) {
            columns = [];
          }

          if (timeEnd > columnsTimeMax) {
            columnsTimeMax = timeEnd;
          }

          const column = (eventId in eventsColumn) ?
            eventsColumn[ eventId ] :
            getColumn(timeBegin, columns);

          columns[ column ] = timeEnd;
          eventsColumn[ eventId ] = column;

          items.push({
            key: `${intervalKey}-${eventId}`,
            top: store.timeToRate(Math.max(timeBegin, intervalBegin)),
            bottom: 100 - store.timeToRate(Math.min(timeEnd, intervalEnd - 1)),
            column: column,
            columns: columns,
            event: event
          });
        }
      }
    }

    for (let i = 0, len = items.length; i < len; i++) {
      const item = items[i];

      if (item.folded) {
        items[i] = (
          <DayEventFolded
            key={item.key}
            top={item.top}
            events={item.events} />
        );

      } else {
        const clen = item.columns.length;
        const left = 100 - 100 * (clen - item.column) / clen;
        const right = 100 - (left + 100 / clen);

        items[i] = (
          <DayEvent
            key={item.key}
            left={left}
            right={right}
            top={item.top}
            bottom={item.bottom}
            event={item.event} />
        );
      }
    }

    return items;
  }

  render () {
    return (
      <div className={styles.DayEvents}>
        {this.getItems()}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
DayEvents.propTypes = {
  date: PropTypes.number,
  hoursOfDay: PropTypes.string
};
/* @endif */
