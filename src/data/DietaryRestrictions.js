'use es6';

import {Enum} from 'enumify';

export default class DietaryRestrictions extends Enum {};

DietaryRestrictions.initEnum({
  VEGETARIAN: {
    value: 'Vegetarian',
  },
  GLUTEN_FREE: {
    value: 'Gluten-Free',
  },
});
