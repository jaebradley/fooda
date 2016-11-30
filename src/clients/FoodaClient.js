'use es6';

import rp from 'request-promise';
import FoodaHtmlParser from '../parsers/FoodaHtmlParser';

export default class FoodaClient {
  constructor() {
    this.parser = new FoodaHtmlParser();
  }

  static generateUrl(location) {
    return `${FoodaClient.getBaseUrl()}${location.endpoint.value}`;
  }

  fetch(location) {
    return rp( { uri: FoodaClient.generateUrl(location) } )
      .then(html => this.parser.parse(html))
      .catch(err => console.log(err));
  }

  static getBaseUrl() {
    return 'https://app.fooda.com';
  }
}
