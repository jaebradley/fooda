'use es6';

import rp from 'request-promise';
import FoodaHtmlParser from '../parsers/FoodaHtmlParser';

export default class FoodaClient {

  static generateUrl(location) {
    return `${FoodaClient.getBaseUrl()}${location.endpoint.value}`;
  }

  static fetch(location) {
    return rp( { uri: FoodaClient.generateUrl(location) } )
      .then(html => FoodaHtmlParser.parse(html))
      .catch(err => console.log(err));
  }

  static getBaseUrl() {
    return 'https://app.fooda.com';
  }
}
