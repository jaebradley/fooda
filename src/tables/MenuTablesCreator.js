'use es6';

import rp from 'request-promise';

import FoodaClient from '../clients/FoodaClient';
import MenuTableCreator from '../tables/MenuTableCreator';
import FoodaHtmlParser from '../parsers/FoodaHtmlParser';
import RestaurantsUrlParser from '../parsers/RestaurantsUrlParser';

export default class MenuTablesCreator {
  static create(location) {
    return FoodaClient.fetch(location)
                      .then(response => RestaurantsUrlParser.parse(response))
                      .then(urls => MenuTablesCreator.fetchMenus(urls))
                      .done();
  }

  static fetchMenus(urls) {
    if (urls.size < 1) {
      throw new TypeError('no urls');
    }

    return rp( {uri: urls.get(0)} )
      .then(html => html)
      .catch(err => console.log(err))
      .then(response => FoodaHtmlParser.parse(response))
      .then(menus => MenuTablesCreator.logMenus(menus))
      .done();
  }

  static logMenus(menus) {
    if (menus.size < 1) {
      throw new TypeError('no menus');
    }

    menus.forEach(menu => console.log(MenuTableCreator.create(menu)));
  }
}
