'use es6';

import FoodaClient from '../clients/FoodaClient';
import MenuTableCreator from '../tables/MenuTableCreator';
import LocationOption from '../data/LocationOption';
import LocationValue from '../data/LocationValue';

export default class MenuCommand {
  constructor() {
    this.client = new FoodaClient();
    this.menuTableCreator = new MenuTableCreator();
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
          .then(menus => menus.map(menu => console.log(this.menuTableCreator.create(menu))));
    }
  }
}