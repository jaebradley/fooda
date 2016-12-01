'use es6';

import rp from 'request-promise';
import MenuParser from '../parsers/MenuParser';

export default class FoodaClient {

  static generateUrl(location) {
    return `${FoodaClient.getBaseUrl()}${location.endpoint.value}`;
  }

  static fetch(location) {
    let j = rp.jar();
    let url = FoodaClient.generateUrl(location);
    let cookie = rp.cookie(FoodaClient.generateCookie(location));
    j.setCookie(cookie, url);
    return rp( { uri: url, simple: true, jar: j } )
      .then(html => html)
      .catch(err => console.log(err));
  }

  static getBaseUrl() {
    return 'https://app.fooda.com';
  }

  static generateCookie(location) {
    return `%7B%22entity%22%3A%22account%22%2C%22id%22%3A%22${location.endpoint.cookieValue}%22%7D`;
  }
}
