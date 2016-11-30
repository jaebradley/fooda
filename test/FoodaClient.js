'use es6';

import {expect} from 'chai';

import FoodaClient from '../src/clients/FoodaClient';
import Menu from '../src/data/Menu';
import Item from '../src/data/Item';
import MenuType from '../src/data/MenuType';
import FoodaHtmlParser from '../src/parsers/FoodaHtmlParser';
import Location from '../src/data/Location';

describe('Fooda client', function() {

  it('tests base url', function() {
    expect(FoodaClient.getBaseUrl()).to.equal('https://app.fooda.com');
  });

  it('tests url generator', function() {
    expect(FoodaClient.generateUrl(Location.DAVENPORT)).to.equal('https://app.fooda.com/accounts/1729/popup/menu_page/P0069614/items');
  });

  it('tests data fetching', function() {
    return FoodaClient.fetch(Location.DAVENPORT)
                      .then(response => console.log(response));
  })
})
