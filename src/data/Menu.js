'use es6';

import {Record} from 'immutable';

const defaults = {
  vendor: '',
  combinations: [],
  desserts: [],
  entrees: [],
  salads: [],
  sides: [],
  sidesAndDessert: [],
}

export default class Menu extends Record(defaults) {};