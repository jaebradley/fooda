'use es6';

import {Enum} from 'enumify';

import LocationEndpoint from './LocationEndpoint';

export default class Location extends Enum {
};

Location.initEnum({
  DAVENPORT: {
    endpoint: LocationEndpoint.DAVENPORT,
  },
  HUBSPOT: {
    endpoint: LocationEndpoint.DAVENPORT,
  },
});
