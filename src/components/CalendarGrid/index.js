import { StoreComponent } from '../../utils/Component';
import { GRID } from '../../constant';

import GridDays from '../GridDays';
import GridMonth from '../GridMonth';

export default class CalendarGrid extends StoreComponent {

  transformState (props, context) {
    const {
      grid,
    } = context.store.getState();

    return {
      grid,
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.grid !== nextState.grid
    );
  }

  render () {
    const { grid } = this.state;

    return do {
      if (grid === GRID.MONTH) {
        <GridMonth />;
      } else {
        <GridDays />;
      }
    };
  }
}
