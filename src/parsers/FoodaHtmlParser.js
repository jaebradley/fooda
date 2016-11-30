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
    map = map.set(MenuType.SIDES, 'Sides & Dessert');
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
    let values = List();
    $(lookupKey).each(function(index, element) {
      values.push($(this).text()
                         .trim()
                         .replace(/(\r\n|\n|\r)/gm,'\n'));
    });
    return values;
  }

  static getLabels($, lookupKey) {
    let values = List();
    $(lookupKey).each(function(index, element) {
      let text = $(this).text().trim();
      let value = (text !== '') ? text.split('\n').map(value => value.trim()) : List();
      values.push(value);
    });
    return values;
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
    keys.forEach(key => menu.set(key, FoodaHtmlParser.generateItems($, vendor, categoriesMap.get(key))));
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
    for (let index = 0; index < names.length; index++) {
      items.push(new Item({
        name: names[index],
        price: prices[index],
        description: descriptions[index],
        labels: labels[index],
      }));
    }
    return items;
  }
}
