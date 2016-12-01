'use es6';

import cheerio from 'cheerio';
import {List} from 'immutable';

export default class RestaurantsUrlParser {
  static getRestaurantUrlsClass() {
    return "a.myfooda-event__restaurant";
  }

  static parse(html) {
    let $ = cheerio.load(html);
    return List($(RestaurantsUrlParser.getRestaurantUrlsClass()).map((index, element) => element.attribs['href']));
  }
}
