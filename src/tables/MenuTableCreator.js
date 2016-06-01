'use es6';

import Table from 'cli-table2';
import emoji from 'node-emoji';
import colors from 'colors';

import MenuType from '../data/MenuType';
import DietaryRestrictions from '../data/DietaryRestrictions';

export default class MenuTableCreator {
  constructor() {
    this.priceEmoji = emoji.get('moneybag');
    this.memoEmoji = emoji.get('memo');
    this.cookieEmoji = emoji.get('cake');
    this.friesEmoji = emoji.get('fries');
    this.hamburgerEmoji = emoji.get('hamburger');
    this.herbEmoji = emoji.get('herb');
    this.tomatoEmoji = emoji.get('tomato');
    this.beerEmoji = emoji.get('beer');
    this.pizzaEmoji = emoji.get('pizza');
    this.colWidths = [null, 10, 50];
    this.menuTypeOrder = [
      MenuType.ENTREES,
      MenuType.COMBINATIONS,
      MenuType.SANDWICHES,
      MenuType.SALADS,
      MenuType.SIDES,
      MenuType.SIDES_AND_DESSERT,
      MenuType.DESSERTS,
    ];
    this.footer = [{colSpan: 3, content: `${'Vegetarian'.green}\n${'Gluten Free'.yellow}\n${'Vegetarian & Gluten Free'.magenta}`}];
  }

  generateHeader(vendor, date) {
    return [`${vendor} (${date})`, this.priceEmoji, this.memoEmoji];
  }

  generateMenuTypeHeader(menuType) {
    const formattedMenuType = menuType.toUpperCase().cyan;
    let menuTypeEmoji = this.pizzaEmoji;
    switch (menuType) {
      case MenuType.DESSERTS:
        menuTypeEmoji = this.cookieEmoji;
        break;
      case MenuType.SIDES_AND_DESSERT:
        menuTypeEmoji = `${this.cookieEmoji} ${this.friesEmoji}`;
        break;
      case MenuType.SIDES:
        menuTypeEmoji = this.friesEmoji;
        break;
      case MenuType.SALADS:
        menuTypeEmoji = `${this.herbEmoji} ${this.tomatoEmoji}`;
        break;
      case MenuType.SANDWICHES:
        menuTypeEmoji = this.hamburgerEmoji;
        break;
      case MenuType.COMBINATIONS:
        menuTypeEmoji = `${this.hamburgerEmoji} ${this.friesEmoji} ${this.beerEmoji}`;
        break;
      case MenuType.ENTREES:
        menuTypeEmoji = this.pizzaEmoji;
        break;
      default:
        menuTypeEmoji = this.pizzaEmoji;
        break;
    }

    return [{content: `${formattedMenuType} ${menuTypeEmoji}`, colSpan: 3}];
  }

  generateFormattedRow(name, price, description, labels) {

    if (labels.indexOf(DietaryRestrictions.VEGETARIAN) > -1 && labels.indexOf(DietaryRestrictions.GLUTEN_FREE) > -1) {
      return [name.magenta, price.magenta, description.magenta];
    } else if (labels.indexOf(DietaryRestrictions.VEGETARIAN) > -1) {
      return [name.green, price.green, description.green];
    } else if (labels.indexOf(DietaryRestrictions.GLUTEN_FREE) > -1) {
      return [name.yellow, price.yellow, description.yellow];
    } else {
      return [name, price, description];
    };
  }

  create(menu) {
    const table = new Table({head: this.generateHeader(menu.vendor, menu.date), colWidths: this.colWidths, wordWrap: true,});
    this.menuTypeOrder.map((function(menuType) {
      let items = menu.get(menuType);
      if (items.length > 0) {
        table.push(this.generateMenuTypeHeader(menuType));
      }
      items.map(item => table.push(this.generateFormattedRow(item.name, item.price, item.description, item.labels)));
    }).bind(this));
    table.push(this.footer);
    return table.toString();
  }
};