'use es6';

import emoji from 'node-emoji';
import {List} from 'immutable';

import MenuTablesCreator from '../tables/MenuTablesCreator';
import Location from '../data/Location';

export default class MenuCommand {
  static getSadEmoji() {
    return emoji.get('cry');
  }

  static getErrorMessage() {
    return `No Fooda...sorry ${MenuCommand.getSadEmoji()} ${MenuCommand.getSadEmoji()} ${MenuCommand.getSadEmoji()}`;
  }

  static run(location) {
    let locationValue;
    switch (location.toUpperCase()) {
      case Location.HUBSPOT.name:
      case Location.DAVENPORT.name:
        locationValue = Location.DAVENPORT;
        break;

      default:
        console.log(`Don't know what location ${location} is`);
        break;
    }

    if (locationValue !== null) {
      try {
        return MenuTablesCreator.create(locationValue);
      } catch (err) {
        console.log(MenuCommand.getErrorMessage());
      }
    }
  }
}
