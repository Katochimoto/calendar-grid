import { StoreComponent } from '../../utils/Component';
import { resize } from '../../utils/decorators/resize';

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

@resize
export default class GridDaysContent extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState (props, context) {
    const {
      currentDate,
      gridDaysItemSize,
      scaleY,
      scrollY,
    } = context.store.getState();

    return {
      currentDate,
      gridDaysItemSize,
      scaleY,
      scrollY,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.currentDate !== nextState.currentDate ||
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.scaleY !== nextState.scaleY ||
      this.state.scrollY !== nextState.scrollY
    );
  }

  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);

    if (this.state.scaleY !== prevState.scaleY) {
      this.handleResize();
    }
  }

  handleResize () {
    this.context.store.update(this.getRect());
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
        ItemComponent={Day}
        itemSize={gridDaysItemSize} />
    );
  }

  getRect () {
    return {
      scrollHeight: this._contentNode.scrollHeight - this._contentNode.clientHeight,
      scrollWidth: this._contentScrollNode.clientWidth,
    };
  }

  render () {
    const style = `
      transform: translateY(${this.state.scrollY}px);
      height: ${this.state.scaleY}%;`;

    return (
      <div ref={node => this._contentNode = node}
        className={styles.GridDaysContent}>

        <div ref={node => this._contentScrollNode = node}
          className={styles.GridDaysContent_Scroll}
          style={style}>

          <DayHours />

          <InfiniteList
            getItemElement={this.getItemElement} />
        </div>
      </div>
    );
  }
}
