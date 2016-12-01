'use es6';

import cheerio from 'cheerio';
import {List, Map} from 'immutable';

import Item from '../data/Item';
import Menu from '../data/Menu';
import MenuType from '../data/MenuType';

export default class MenuParser {
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
    let $ = cheerio.load(html);
    return List(MenuParser.generateVendors($)
                               .map(vendor => MenuParser.generateMenu($, vendor)));
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
    let categoriesMap = MenuParser.getCategoriesMapping();
    let menu = Map({vendor: vendor, date: MenuParser.generateDate($)});
    let keys = List(categoriesMap.keys());
    keys.forEach(key => menu = menu.set(key.name, MenuParser.generateItems($, vendor, categoriesMap.get(key))));
    return new Menu(menu);
  }

  static generateItems($, vendor, category) {
    let baseParseValue = `div[class=item--no-photo][data-vendor_name="${vendor}"][data-category="${category}"]`;
    let nameParseValue = `${baseParseValue} ${MenuParser.getNameElementIdentifer()}`;
    let priceParseValue = `${baseParseValue} ${MenuParser.getPriceElementIdentifer()}`;
    let descriptionParseValue = `${baseParseValue} ${MenuParser.getDescriptionElementIdentifer()}`;
    let labelsParseValue = `${baseParseValue} ${MenuParser.getLabelsElementIdentifer()}`;
    let names = MenuParser.getTextValues($, nameParseValue);
    let prices = MenuParser.getTextValues($, priceParseValue);
    let descriptions = MenuParser.getTextValues($, descriptionParseValue);
    let labels = MenuParser.getLabels($, labelsParseValue);
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
