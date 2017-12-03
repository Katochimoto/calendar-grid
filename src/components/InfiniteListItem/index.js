import { Component } from '../../utils/Component';
/* @if NODE_ENV=='development' **
import { PropTypes } from '../../utils/Component';
/* @endif */

import classnames from 'classnames';
import styles from './index.less';

export default class InfiniteListItem extends Component {
  shouldComponentUpdate (nextProps) {
    const props = this.props;
    return (
      props.isVisible !== nextProps.isVisible ||
      props.offset !== nextProps.offset ||
      props.updated !== nextProps.updated
    );
  }

  render () {
    const {
      getItemElement,
      isVisible,
      offset,
      saxisx,
    } = this.props;

    const classes = classnames({
      [ styles.InfiniteListItem ]: true,
      [ styles.InfiniteListItem__axisX ]: saxisx,
    });

    return (
      <div className={classes}>
        {isVisible ? getItemElement(offset) : null}
      </div>
    );
  }
}

/* @if NODE_ENV=='development' **
InfiniteListItem.propTypes = {
  getItemElement: PropTypes.func,
  isVisible: PropTypes.bool,
  offset: PropTypes.number,
  saxisx: PropTypes.bool,
  updated: PropTypes.number,
};
/* @endif */

InfiniteListItem.defaultProps = {
  getItemElement: () => null,
  isVisible: false,
  offset: 0,
  saxisx: 0,
  updated: 0,
};
