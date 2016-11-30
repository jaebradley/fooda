'use es6';

import cheerio from 'cheerio';
import {List, Map} from 'immutable';

import Item from '../data/Item';
import Menu from '../data/Menu';
import MenuType from '../data/MenuType';

export default class FoodaHtmlParser {
  static getCategoriesMapping() {
    let map = Map();
    map = map.set(MenuType.COMBINATIONS, 'Combinations');
    map = map.set(MenuType.DESSERTS, 'Desserts');
    map = map.set(MenuType.ENTREES, 'Entrees');
    map = map.set(MenuType.SANDWICHES, 'Sandwiches');
    map = map.set(MenuType.SALADS, 'Salads');
    map = map.set(MenuType.SIDES, 'Sides');
    map = map.set(MenuType.SIDES_AND_DESSERT, 'Sides & Dessert');
    return map;
  }

  static getNameElementIdentifer() {
    return 'div[class=item__name]';
  }

  static getPriceElementIdentifer() {
    return 'div[class=item__price]';
  }

  static getDescriptionElementIdentifer() {
    return 'div[class=item__desc__text]';
  }

  static getLabelsElementIdentifer() {
    return 'div[class=item__labels]';
  }

  static parse(html) {
    let menus = [];
    let $ = cheerio.load(html);

    let vendors = FoodaHtmlParser.generateVendors($);
    vendors.map(vendor => menus.push(FoodaHtmlParser.generateMenu($, vendor)));
    return menus;
  }

  static getTextValues($, lookupKey) {
    return List($(lookupKey).map((index, element) => $(element).text().trim().replace(/(\r\n|\n|\r)/gm,'\n')));
  }

  static getLabels($, lookupKey) {
    let labels = List();
    $(lookupKey).each(function(index, element) {
      let text = $(element).text().trim();
      if (text !== '') {
        labels = labels.push(text.split('\n').map(value => value.trim()));
      } else {
        labels = labels.push([]);
      }
    });
    return labels;
  }

  static generateDate($) {
    return $('div[class=secondary-bar__label]').text().trim();
  }

  static generateVendors($) {
    return List($('div[class=restaurant-banner]').map((index, element) => element.attribs['data-vendor_name']));
  }

  static generateMenu($, vendor) {
    let categoriesMap = FoodaHtmlParser.getCategoriesMapping();
    let menu = Map({vendor: vendor, date: FoodaHtmlParser.generateDate($)});
    let keys = List(categoriesMap.keys());
    keys.forEach(key => menu = menu.set(key, FoodaHtmlParser.generateItems($, vendor, categoriesMap.get(key))));
    return new Menu(menu.toJS());
  }

  static generateItems($, vendor, category) {
    let baseParseValue = `div[class=item--no-photo][data-vendor_name="${vendor}"][data-category="${category}"]`;
    let nameParseValue = `${baseParseValue} ${FoodaHtmlParser.getNameElementIdentifer()}`;
    let priceParseValue = `${baseParseValue} ${FoodaHtmlParser.getPriceElementIdentifer()}`;
    let descriptionParseValue = `${baseParseValue} ${FoodaHtmlParser.getDescriptionElementIdentifer()}`;
    let labelsParseValue = `${baseParseValue} ${FoodaHtmlParser.getLabelsElementIdentifer()}`;
    let names = FoodaHtmlParser.getTextValues($, nameParseValue);
    let prices = FoodaHtmlParser.getTextValues($, priceParseValue);
    let descriptions = FoodaHtmlParser.getTextValues($, descriptionParseValue);
    let labels = FoodaHtmlParser.getLabels($, labelsParseValue);

    let items = List();
    for (let index = 0; index < names.size; index++) {
      items = items.push(new Item({
        name: names.get(index),
        price: prices.get(index),
        description: descriptions.get(index),
        labels: labels.get(index),
      }));
    }
    return items;
  }
}
