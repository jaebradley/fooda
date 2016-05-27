'use es6';

import cheerio from 'cheerio';
import {Map} from 'immutable';

import Item from '../data/Item';
import Menu from '../data/Menu';

export default class FoodaHtmlParser {
  static parse(html) {
    const vendors = FoodaHtmlParser.generateVendors(html);
    const menus = [];
    vendors.map(vendor => menus.push(FoodaHtmlParser.generateMenu(html, vendor)));
    console.log(menus);
    return menus;
  }

  static getTextValues(lookupKey, html) {
    const $ = cheerio.load(html);
    const values = [];
    $(lookupKey).each(function(index, element) {
      values.push($(this).text().trim());
    });
    return values;
  }

  static generateVendors(html) {
    const $ = cheerio.load(html);
    const vendors = [];
    $('div[class=restaurant-banner]').map((index, element) => (vendors.push(element.attribs['data-vendor_name'])));
    return vendors;
  }

  static generateMenu(html, vendor) {
    const categoriesMap = new Map({
      combinations: 'Combinations',
      desserts: 'Desserts',
      entrees: 'Entrees',
      salads: 'Salads',
      sides: 'Sides',
      sidesAndDessert: 'Sides & Dessert',
    });
    const menu = {vendor: vendor};
    categoriesMap.keySeq().toArray().map(category => (menu[category] = (FoodaHtmlParser.generateItems(html, vendor, categoriesMap.get(category)))));
    return new Menu(menu);
  }

  static generateItems(html, vendor, category) {
    const nameParseValue = `div[class=item--no-photo][data-vendor_name="${vendor}"][data-category="${category}"] div[class=item__name]`;
    const priceParseValue = `div[class=item--no-photo][data-vendor_name="${vendor}"][data-category="${category}"]  div[class=item__price]`;
    const descriptionParseValue = `div[class=item--no-photo][data-vendor_name="${vendor}"][data-category="${category}"]  div[class=item__desc__text]`;
    const names = FoodaHtmlParser.getTextValues(nameParseValue, html);
    const prices = FoodaHtmlParser.getTextValues(priceParseValue, html);
    const descriptions = FoodaHtmlParser.getTextValues(descriptionParseValue, html);
    const items = [];
    for (let index = 0; index < names.length; index++) {
      items.push(new Item({
        name: names[index],
        price: prices[index],
        description: descriptions[index],
      }));
    }
    return items;
  }
}