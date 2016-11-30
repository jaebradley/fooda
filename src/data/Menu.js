'use es6';

import {Record} from 'immutable';
import MenuType from './MenuType';

const defaults = { vendor: '', date: ''};
defaults[MenuType.COMBINATIONS] = [];
defaults[MenuType.DESSERTS] = [];
defaults[MenuType.ENTREES] = [];
defaults[MenuType.SANDWICHES] = [];
defaults[MenuType.SALADS] = [];
defaults[MenuType.SIDES] = [];
defaults[MenuType.SIDES_AND_DESSERT] = [];

export default class Menu extends Record(defaults) {};
