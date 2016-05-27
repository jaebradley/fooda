'use es6';

import rp from 'request-promise';
import Q from 'q';
import FoodaHtmlParser from '../parsers/FoodaHtmlParser';

export default class FoodaClient {
  constructor() {
    this.baseUrl = 'https://app.fooda.com';
  }

  generateUrl(location) {
    return `${this.baseUrl}/${location}`;
  }

  fetch(location) {
    const url = this.generateUrl(location);
    return rp( { uri: url } )
      .then(html => FoodaHtmlParser.parse(html))
      .catch(err => console.log(err));
  }
}
