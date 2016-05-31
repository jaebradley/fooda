'use es6';

import Table from 'cli-table2';
import emoji from 'node-emoji';
import colors from 'colors';

import MenuType from '../data/MenuType';
import DietaryRestrictions from '../data/DietaryRestrictions';

export default class MenuTableCreator {
  constructor() {
    this.priceEmoji = emoji.get('money_with_wings');
    this.memoEmoji = emoji.get('memo');
    this.colWidths = [20, 10, 50];
    this.menuTypeOrder = [
      MenuType.ENTREES,
      MenuType.COMBINATIONS,
      MenuType.DESSERTS,
      MenuType.SALADS,
      MenuType.SIDES,
      MenuType.SIDES_AND_DESSERT,
    ];
    this.footer = ['Vegetarian'.green, 'Gluten Free'.yellow, 'Vegetarian & Gluten Free'.magenta];
  }

  generateHeader(vendor) {
    return [vendor, this.priceEmoji, this.memoEmoji];
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
    }
  }

  create(menu) {
    const table = new Table({head: this.generateHeader(menu.vendor), colWidths: this.colWidths, wordWrap: true});
    this.menuTypeOrder.map(function(menuType) {
      let items = menu.get(menuType);
      items.map(item => table.push(this.generateFormattedRow(item.name, item.price, item.description, item.labels)));
    });
    table.push(this.footer);
    return table.toString();
  }
};