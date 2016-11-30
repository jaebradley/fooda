'use es6';

import {List} from 'immutable';
import Table from 'cli-table2';
import emoji from 'node-emoji';
import colors from 'colors';

import MenuType from '../data/MenuType';
import DietaryRestrictions from '../data/DietaryRestrictions';

export default class MenuTableCreator {

  static getColumnWidths() {
    return [null, 10, 50];
  }

  static getPriceEmoji() {
    return emoji.get('moneybag');
  }

  static getMemoEmoji() {
    return emoji.get('memo');
  }

  static getFooter() {
    return [{colSpan: 3, content: `${'Vegetarian'.green}\n${'Gluten Free'.yellow}\n${'Vegetarian & Gluten Free'.magenta}`}];
  }

  static getMenuOrder() {
    return List.of(
      MenuType.ENTREES,
      MenuType.COMBINATIONS,
      MenuType.SANDWICHES,
      MenuType.SALADS,
      MenuType.SIDES,
      MenuType.SIDES_AND_DESSERT,
      MenuType.DESSERTS,
    );
  }

  static generateHeader(vendor, date) {
    return [`${vendor} (${date})`, MenuTableCreator.getPriceEmoji(), MenuTableCreator.getMemoEmoji()];
  }

  static generateMenuTypeHeader(menuType) {
    return [{content: `${menuType.display.toUpperCase().cyan} ${menuType.emoji}`, colSpan: 3}];
  }

  static generateFormattedRow(name, price, description, labels) {
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

  static create(menu) {
    let table = new Table({
        head: MenuTableCreator.generateHeader(menu.vendor, menu.date),
        colWidths: MenuTableCreator.getColumnWidths(),
        wordWrap: true,
    });
    MenuTableCreator.getMenuOrder().forEach((function(menuType) {
      let items = menu.get(menuType.name);
      if (items.size > 0) {
        table.push(MenuTableCreator.generateMenuTypeHeader(menuType));
      }
      items.forEach(item => table.push(MenuTableCreator.generateFormattedRow(item.name, item.price, item.description, item.labels)));
    }).bind(this));
    table.push(MenuTableCreator.getFooter());
    return table.toString();
  }
};
