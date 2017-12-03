// @flow

const DAYS = {
  '0': 'Sun',
  '1': 'Mon',
  '2': 'Tue',
  '3': 'Wed',
  '4': 'Thu',
  '5': 'Fri',
  '6': 'Sat'
};

const MONTH_GEN = {
  '1': 'Января',
  '2': 'Февраля',
  '3': 'Марта',
  '4': 'Апреля',
  '5': 'Мая',
  '6': 'Июня',
  '7': 'Июля',
  '8': 'Августа',
  '9': 'Сентября',
  '10': 'Октября',
  '11': 'Ноября',
  '12': 'Декабря',
};

const MONTH_GEN_SHORT = {
  '1': 'Янв.',
  '2': 'Фев.',
  '3': 'Мар.',
  '4': 'Апр.',
  '5': 'Мая',
  '6': 'Июня',
  '7': 'Июля',
  '8': 'Авг.',
  '9': 'Сент.',
  '10': 'Окт.',
  '11': 'Ноя.',
  '12': 'Дек.',
};

const MONTH_GEN_SHORT_LOWER = {
  '1': 'янв',
  '2': 'фев',
  '3': 'мар',
  '4': 'апр',
  '5': 'мая',
  '6': 'июня',
  '7': 'июля',
  '8': 'авг',
  '9': 'сент',
  '10': 'окт',
  '11': 'ноя',
  '12': 'дек',
};

export default class Strategy {
  destroy () {}

  gridDaysHourTitle (hour: number): string {
    return do {
      if (hour === 0) {
        '12am';
      } else if (hour < 12) {
        `${hour}am`;
      } else if (hour == 12) {
        '12pm';
      } else {
        `${hour - 12}pm`;
      }
    };
  }

  gridDaysDayTitle (date: Date): string {
    return `${DAYS[ date.getDay() ]}, ${date.getDate()} ${MONTH_GEN_SHORT_LOWER[ date.getMonth() + 1 ]}`;
  }

  monthNameGenShort (date: Date): string {
    return MONTH_GEN_SHORT[ date.getMonth() + 1 ];
  }
}
