import { StoreComponent } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import { ASCROLL } from '../../constant';
import classnames from 'classnames';
import InfiniteListItem from '../InfiniteListItem';
import styles from './index.less';

export default class InfiniteList extends StoreComponent {

  transformState (props, context) {
    const {
      listRange,
      SAXISX,
      scrollAnimation,
      scrollDirection,
      scrollX,
      scrollY,
      speedScrollX,
      speedScrollY,
      updated,
    } = context.store.getState();

    return {
      listRange,
      SAXISX,
      scrollAnimation,
      scrollDirection,
      scrollX,
      scrollY,
      speedScrollX,
      speedScrollY,
      updated,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    const state = this.state;

    return (
      state.updated !== nextState.updated ||
      state.listRange !== nextState.listRange ||
      state.scrollAnimation !== nextState.scrollAnimation ||
      (state.SAXISX && (
        state.scrollX !== nextState.scrollX ||
        state.speedScrollX !== nextState.speedScrollX
      )) ||
      (!state.SAXISX && (
        state.scrollY !== nextState.scrollY ||
        state.speedScrollY !== nextState.speedScrollY
      ))
    );
  }

  componentDidUpdate (prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);

    if (this.state.scrollAnimation === ASCROLL.STOP) {
      this.context.store.update({
        scrollAnimation: ASCROLL.OFF
      });
    }
  }

  getItems () {
    const store = this.context.store;
    const { listRange, updated, SAXISX } = this.state;
    const items = [];

    let offset = -(listRange);

    while (offset <= listRange) {
      const isVisible = store.isVisibleOffset(offset);

      items.push(
        <InfiniteListItem
          key={offset}
          isVisible={isVisible}
          offset={offset}
          saxisx={SAXISX}
          updated={updated}
          getItemElement={this.props.getItemElement} />
      );

      offset++;
    }

    return items;
  }

  render () {
    const {
      SAXISX,
      scrollAnimation,
      scrollX,
      scrollY,
      speedScrollX,
      speedScrollY,
    } = this.state;

    const style = do {
      if (SAXISX) {
        `transform: translateX(${scrollX}px);`;
      } else {
        `transform: translateY(${scrollY}px);`;
      }
    };

    const classes = classnames({
      [ styles.InfiniteList_Content ]: true,
      [ styles.InfiniteList_Content__animation ]: scrollAnimation === ASCROLL.ON,
      [ styles.InfiniteList_Content__scrolling ]: SAXISX ?
        speedScrollX !== 0 :
        speedScrollY !== 0,
    });

    return (
      <div className={styles.InfiniteList}>
        <div className={classes} style={style}>
          {this.getItems()}
        </div>
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
InfiniteList.propTypes = {
  getItemElement: PropTypes.func,
};
/* @endif */

InfiniteList.defaultProps = {
  getItemElement: () => null,
};
