import { StoreComponent } from '../../utils/Component';
import { resize } from '../../utils/decorators/resize';

import InfiniteList from '../InfiniteList';
import GridMonthItem from '../GridMonthItem';

import styles from './index.less';

@resize
export default class GridMonthContent extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState (props, context) {
    const {
      currentDate,
      gridMonthItemSize,
    } = context.store.getState();

    return {
      currentDate,
      gridMonthItemSize,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.currentDate !== nextState.currentDate ||
      this.state.gridMonthItemSize !== nextState.gridMonthItemSize
    );
  }

  handleResize () {
    this.context.store.update(this.getRect());
  }

  getItemElement (offset) {
    const {
      currentDate,
      gridMonthItemSize,
    } = this.state;

    const date = this.context.store.gridDateItemOffset(currentDate, offset);

    return (
      <GridMonthItem
        date={date}
        itemSize={gridMonthItemSize} />
    );
  }

  getRect () {
    return {
      scrollHeight: this._contentNode.clientHeight,
      scrollWidth: 0,
    };
  }

  render () {
    return (
      <div ref={node => this._contentNode = node}
        className={styles.GridMonthContent}>

        <InfiniteList
          getItemElement={this.getItemElement} />
      </div>
    );
  }
}
