'use es6';

import emoji from 'node-emoji';

import FoodaClient from '../clients/FoodaClient';
import MenuTableCreator from '../tables/MenuTableCreator';
import LocationOption from '../data/LocationOption';
import LocationValue from '../data/LocationValue';

export default class MenuCommand {
  constructor() {
    this.client = new FoodaClient();
    this.menuTableCreator = new MenuTableCreator();
    this.sadEmoji = emoji.get('cry');
  }

  run(location) {
    let locationValue;
    switch (location.toUpperCase()) {
      case LocationOption.HUBSPOT:
      case LocationOption.DAVENPORT:
        locationValue = LocationValue.DAVENPORT;
        break;

      default:
        console.log(`Don't know what location ${location} is`);
        break;
    }

    if (locationValue !== null) {
      this.client
          .fetch(locationValue)
          .then((function(menus) {
            if (menus.length > 0) {
              menus.map(menu => console.log(this.menuTableCreator.create(menu)));
            } else {
              console.log(`No Fooda...sorry ${this.sadEmoji} ${this.sadEmoji} ${this.sadEmoji}`);
            }
          }).bind(this));
    }
  }
}