'use es6';

import emoji from 'node-emoji';

import FoodaClient from '../clients/FoodaClient';
import MenuTableCreator from '../tables/MenuTableCreator';
import FoodaHtmlParser from '../parsers/FoodaHtmlParser';
import Location from '../data/Location';

export default class MenuCommand {
  static getSadEmoji() {
    return emoji.get('cry');
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
      return FoodaClient.fetch(locationValue)
                        .then(response => FoodaHtmlParser.parse(response))
                        .then((function(menus) {
                          if (menus.length > 0) {
                            menus.map(menu => console.log(MenuTableCreator.create(menu)));
                          } else {
                            console.log(`No Fooda...sorry ${MenuCommand.getSadEmoji()} ${MenuCommand.getSadEmoji()} ${MenuCommand.getSadEmoji()}`);
                          }
                        }).bind(this));
    }
  }
}
