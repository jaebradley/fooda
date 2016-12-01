'use es6';

import {expect} from 'chai';
import {List} from 'immutable';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

import RestaurantsUrlParser from '../src/parsers/RestaurantsUrlParser';

describe('Restaurants Urls Html Parser', function() {
  let sampleHtml = fs.readFileSync(path.join(__dirname, './html/restaurants.html'));
  let $ = cheerio.load(sampleHtml);

  it('tests sample html', function() {
    let expectedUrls = List.of(
      "http://app.fooda.com/accounts/1729/popup/menu_page/P0069876/items?filterable%5Bvendor_name%5D=Sunset+Grill",
      "http://app.fooda.com/accounts/1729/popup/menu_page/P0069876/items?filterable%5Bvendor_name%5D=Curry+House");
    let restaurantUrls = RestaurantsUrlParser.parse(sampleHtml);
    expect(restaurantUrls.toJS()).to.eql(expectedUrls.toJS());
  });
});
