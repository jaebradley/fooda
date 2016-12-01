'use es6';

import {Enum} from 'enumify';

export default class LocationEndpoint extends Enum {};

LocationEndpoint.initEnum({
  DAVENPORT: {
    value: '/davenport',
    cookieValue: 'davenport',
  },
});
