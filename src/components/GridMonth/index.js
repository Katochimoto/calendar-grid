import { Component } from '../../utils/Component';
import wheel from '../../utils/decorators/wheel';

import GridMonthContent from '../GridMonthContent';

import styles from './index.less';

@wheel
export default class GridMonth extends Component {
  constructor (props, context) {
    super(props, context);
    context.store.switchStrategyGridMonth();
  }

  handleWheel (deltaX, deltaY) {
    this.context.store.updateScrollByWheel(deltaX, deltaY);
  }

  handleWheelStop () {
    this.context.store.updateScrollByWheel(0, 0);
  }

  render () {
    return (
      <table ref={rootNode => this._rootNode = rootNode}
        className={styles.GridMonth}>

        <col width="100%" valign="top" />

        <thead>
          <tr>
            <td className={styles.GridMonth_Header}>
              1
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className={styles.GridMonth_Content}>
              <GridMonthContent />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
