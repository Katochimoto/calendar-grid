import { StoreComponent } from '../../utils/Component';

import DayHeader from '../DayHeader';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

export default class GridDaysHeader extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState (props, context) {
    const { gridDaysItemSize, currentDate } = context.store.getState();
    return { gridDaysItemSize, currentDate };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.currentDate !== nextState.currentDate
    );
  }

  getItemElement (offset) {
    const {
      currentDate,
      gridDaysItemSize,
    } = this.state;

    const date = this.context.store.gridDateItemOffset(currentDate, offset);

    return (
      <GridDaysItem
        date={date}
        ItemComponent={DayHeader}
        itemSize={gridDaysItemSize} />
    );
  }

  render () {
    return (
      <div className={styles.GridDaysHeader}>
        <div className={styles.GridDaysHeader_Content}>
          <InfiniteList
            getItemElement={this.getItemElement} />
        </div>
      </div>
    );
  }
}
