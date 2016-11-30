'use es6';

import {Enum} from 'enumify';

import emoji from 'node-emoji';

export default class MenuType extends Enum {};

MenuType.initEnum({
  COMBINATIONS: {
    value: 'combinations',
    emoji: `${emoji.get('hamburger')} ${emoji.get('fries')} ${emoji.get('beer')}`,
  },
  DESSERTS: {
    value: 'desserts',
    emoji: emoji.get('cake'),
  },
  ENTREES: {
    value: 'entrees',
    emoji: emoji.get('pizza'),
  },
  SANDWICHES: {
    value: 'sandwiches',
    emoji: emoji.get('hamburger'),
  },
  SALADS: {
    value: 'salads',
    emoji: `${emoji.get('herb')} ${emoji.get('tomato')}`
  },
  SIDES: {
    value: 'sides',
    emoji: emoji.get('fries'),
  },
  SIDES_AND_DESSERT: {
    value: 'sidesAndDessert',
    emoji: `${emoji.get('fries')} ${emoji.get('cake')}`,
  },
});
