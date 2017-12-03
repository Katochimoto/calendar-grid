import styles from './index.less';

export default function MonthWeekDay ({
  date,
  isCurrentDate,
  isWeekend,
  monthDate,
  trbl,
}, {
  datetime,
  store,
}) {

  const isFirstDay = monthDate === 1;

  const classes = [
    true          && styles.MonthWeekDay,
    isWeekend     && styles.MonthWeekDay__weekend || '',
    isCurrentDate && styles.MonthWeekDay__current || '',
    trbl          && styles[`MonthWeekDay__trbl${trbl}`] || ''
  ].join(' ');

  const monthName = do {
    if (isFirstDay) {
      (
        <span className={styles.MonthWeekDay_Month}>
          {datetime.monthNameGenShort(date)}
        </span>
      );
    } else {
      null;
    }
  };

  return (
    <div className={classes}>
      <span className={styles.MonthWeekDay_DateTitle}>
        <span className={styles.MonthWeekDay_Date}>
          {monthDate}
        </span>
        {monthName}
      </span>
    </div>
  );
}
