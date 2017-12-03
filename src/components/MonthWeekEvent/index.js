import classnames from 'classnames';

import styles from './index.less';
import gridStyles from '../../style/Grid.less';

export default function MonthWeekEvent ({
  columnEnd,
  columnStart,
  rowStart,
}) {
  const classes = classnames({
    [ styles.MonthWeekEvent ]: true,
    [ gridStyles[ `Grid_ColumnStart${columnStart}` ] ]: true,
    [ gridStyles[ `Grid_ColumnEnd${columnEnd}` ] ]: columnEnd > columnStart,
    [ gridStyles[ `Grid_RowStart${rowStart}` ] ]: true,
  });

  return (
    <div className={classes}>
      <div className={styles.MonthWeekEvent_Content}>
        event 1
      </div>
    </div>
  );
}
