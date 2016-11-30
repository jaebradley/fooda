'use es6';

import {Enum} from 'enumify';

import emoji from 'node-emoji';

export default class MenuType extends Enum {};

MenuType.initEnum({
  COMBINATIONS: {
    value: 'combinations',
    display: 'Combinations',
    emoji: `${emoji.get('hamburger')} ${emoji.get('fries')} ${emoji.get('beer')}`,
  },
  DESSERTS: {
    value: 'desserts',
    display: 'Desserts',
    emoji: emoji.get('cake'),
  },
  ENTREES: {
    value: 'entrees',
    display: 'Entrees',
    emoji: emoji.get('pizza'),
  },
  SANDWICHES: {
    value: 'sandwiches',
    display: 'Sandwiches',
    emoji: emoji.get('hamburger'),
  },
  SALADS: {
    value: 'salads',
    display: 'Salads',
    emoji: `${emoji.get('herb')} ${emoji.get('tomato')}`
  },
  SIDES: {
    value: 'sides',
    display: 'Sides',
    emoji: emoji.get('fries'),
  },
  SIDES_AND_DESSERT: {
    value: 'sidesAndDessert',
    display: 'Sides And Dessert',
    emoji: `${emoji.get('fries')} ${emoji.get('cake')}`,
  },
});
