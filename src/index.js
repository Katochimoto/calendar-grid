import { Component } from './utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from './utils/Component';
/* @endif */

import CalendarGrid from './components/CalendarGrid';

import CommonStore from './store/CommonStore';
import Datetime from './utils/Datetime';
import Events from './utils/Events';
import EventsStrategy from './utils/Events/Strategy';

import styles from './index.less';

export class Calendar extends Component {
  constructor (props, context) {
    super(props, context);

    this._store = new CommonStore();
    this._datetime = new Datetime();
    this._events = new Events(new EventsStrategy({
      upload: props.upload,
      update: props.update,
    }));

    /* @if NODE_ENV=='development' **
    window.store = this._store;
    /* @endif */
  }

  getChildContext () {
    return {
      datetime: this._datetime,
      events: this._events,
      store: this._store,
    };
  }

  componentWillReceiveProps ({ upload, update }) {
    if (
      upload !== this.props.upload ||
      update !== this.props.update
    ) {
      this._events.setStrategy(new EventsStrategy({
        upload,
        update,
      }));
    }

    // this._store.update(nextProps);
  }

  componentWillUnmount () {
    this._datetime.destroy();
    this._events.destroy();
    this._store.destroy();
  }

  render () {
    return (
      <div className={styles.Calendar}>
        <CalendarGrid />
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
Calendar.childContextTypes = {
  datetime: PropTypes.instanceOf(Datetime),
  events: PropTypes.instanceOf(Events),
  store: PropTypes.instanceOf(CommonStore),
};

Calendar.propTypes = {
  upload: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};
/* @endif */

Calendar.defaultProps = {};
