'use es6';

import {Enum} from 'enumify';

export default class MenuType extends Enum {};

MenuType.initEnum({
  COMBINATIONS: {
    value: 'combinations',
  },
  DESSERTS: {
    value: 'desserts',
  },
  ENTREES: {
    value: 'entrees',
  },
  SANDWICHES: {
    value: 'sandwiches',
  },
  SALADS: {
    value: 'salads',
  },
  SIDES: {
    value: 'sides',
  },
  SIDES_AND_DESSERT: {
    value: 'sidesAndDessert',
  },
});
