'use es6';

import {Record} from 'immutable';

const defaults = {
  name: '',
  price: '',
  description: '',
}

export default class Item extends Record(defaults) {};