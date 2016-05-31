'use es6';

import Table from 'cli-table2';
import emoji from 'node-emoji';

import MenuType from '../data/MenuType';

export default class MenuTableCreator {
  constructor() {
    this.priceEmoji = emoji.get('money_with_wings');
    this.memoEmoji = emoji.get('memo');
    this.colWidths = [20, 10, 50];
    this.menuTypeOrder = [
      MenuType.ENTREES,
      MenuType.COMBINATIONS,
      MenuType.SANDWICHES,
      MenuType.SALADS,
      MenuType.SIDES,
      MenuType.SIDES_AND_DESSERT,
      MenuType.DESSERTS,
    ];
  }

  generateHeader(vendor, date) {
    return [`${vendor} (${date})`, this.priceEmoji, this.memoEmoji];
  }

  create(menu) {
    const table = new Table({head: this.generateHeader(menu.vendor, menu.date), colWidths: this.colWidths, wordWrap: true});
    this.menuTypeOrder.map(function(menuType) {
      let items = menu.get(menuType);
      items.map(item => table.push([item.name, item.price, item.description]));
    });
    return table.toString();
  }
};