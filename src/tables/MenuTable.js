'use es6';

import Table from 'cli-table2';
import emoji from 'node-emoji';

export default class MenuTable {
  constructor() {}

  static create(menu) {
    const header = [menu.vendor, emoji.get('money_with_wings'), emoji.get('memo')];
    const table = new Table({head: header, colWidths: [20, 10, 50], wordWrap: true});
    const menuTypeOrder = [
      'combinations',
      'desserts',
      'entrees',
      'salads',
      'sides',
      'sidesAndDessert',
    ];
    menuTypeOrder.map(function(menuType) {
      let items = menu.get(menuType);
      items.map(item => table.push([item.name, item.price, item.description]));
    });
    return table.toString();
  }
};