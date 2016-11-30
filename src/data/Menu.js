'use es6';

import {List, Record} from 'immutable';
import MenuType from './MenuType';

const defaults = { vendor: '', date: ''};
defaults[MenuType.COMBINATIONS.name] = List();
defaults[MenuType.DESSERTS.name] = List();
defaults[MenuType.ENTREES.name] = List();
defaults[MenuType.SANDWICHES.name] = List();
defaults[MenuType.SALADS.name] = List();
defaults[MenuType.SIDES.name] = List();
defaults[MenuType.SIDES_AND_DESSERT.name] = List();

export default class Menu extends Record(defaults) {};
