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
      items.map(item => table.push(this.generateFormattedRow(item.name, item.price, item.description, item.labels)));
    }).bind(this));
    table.push(this.footer);
    return table.toString();
  }
};