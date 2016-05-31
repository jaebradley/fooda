'use es6';

import cheerio from 'cheerio';
import {Map} from 'immutable';

import Item from '../data/Item';
import Menu from '../data/Menu';
import MenuType from '../data/MenuType';

export default class FoodaHtmlParser {
  constructor() {
    this.categoriesMap = {};
    this.categoriesMap[MenuType.COMBINATIONS] = 'Combinations';
    this.categoriesMap[MenuType.DESSERTS] = 'Desserts';
    this.categoriesMap[MenuType.ENTREES] = 'Entrees';
    this.categoriesMap[MenuType.SALADS] = 'Salads';
    this.categoriesMap[MenuType.SIDES] = 'Sides';
    this.categoriesMap[MenuType.SIDES_AND_DESSERT] = 'Sides & Dessert';
    this.nameHtmlElement = 'div[class=item__name]';
    this.priceHtmlElement = 'div[class=item__price]';
    this.descriptionHtmlElement = 'div[class=item__desc__text]';
    this.labelsHtmlElement = 'div[class=item__labels]';
  }


  parse(html) {
    const menus = [];
    const $ = cheerio.load(html);

    const vendors = this.generateVendors($);
    vendors.map(vendor => menus.push(this.generateMenu($, vendor)));
    return menus;
  }

  getTextValues($, lookupKey) {
    const values = [];
    $(lookupKey).each(function(index, element) {
      values.push($(this).text().trim());
    });
    return values;
  }

  getLabels($, lookupKey) {
    const values = [];
    $(lookupKey).each(function(index, element) {
      if ($(this).text().trim() !== '') {
        values.push($(this).text().trim().split('\n').map(value => value.trim()));
      } else {
        values.push([]);
      }
    });
    return values;
  }

  generateVendors($) {
    const vendors = [];
    $('div[class=restaurant-banner]').map((index, element) => (vendors.push(element.attribs['data-vendor_name'])));
    return vendors;
  }

  generateMenu($, vendor) {
    const menu = {vendor: vendor};
    Object.keys(this.categoriesMap).map(category => (menu[category] = (this.generateItems($, vendor, this.categoriesMap[category]))));
    return new Menu(menu);
  }

  generateItems($, vendor, category) {
    const baseParseValue = `div[class=item--no-photo][data-vendor_name="${vendor}"][data-category="${category}"]`;
    const nameParseValue = `${baseParseValue} ${this.nameHtmlElement}`;
    const priceParseValue = `${baseParseValue} ${this.priceHtmlElement}`;
    const descriptionParseValue = `${baseParseValue} ${this.descriptionHtmlElement}`;
    const labelsParseValue = `${baseParseValue} ${this.labelsHtmlElement}`;
    const names = this.getTextValues($, nameParseValue);
    const prices = this.getTextValues($, priceParseValue);
    const descriptions = this.getTextValues($, descriptionParseValue);
    const labels = this.getLabels($, labelsParseValue);
    const items = [];
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