'use es6';

import moment from 'moment-timezone';
import emoji from 'node-emoji';


export default class GamesCommand {
  constructor() {
  }

  generateDateRange(timeRangeOption) {
    let startOfToday = moment().tz(this.userTimezone).startOf("day");
    let endOfToday = moment().tz(this.userTimezone).endOf("day");
    }
  }

  run(timeRangeOption) {
  }
};
