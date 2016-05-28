'use es6';

import {expect} from 'chai';

import FoodaClient from '../src/clients/FoodaClient';
import Menu from '../src/data/Menu';
import Item from '../src/data/Item';
import MenuType from '../src/data/MenuType';

describe('Fooda client', function() {
  const client = new FoodaClient();

  it('tests constructor', function() {
    expect(client.baseUrl).to.equal('https://app.fooda.com');
    expect(client.parser).to.be.a('foodahtmlparser');
  });

  it('tests url generator', function() {
    expect(client.generateUrl('jaebaebae')).to.equal('https://app.fooda.com/jaebaebae');
  });

  it('tests data fetching', function() {
    // hmmm is there a way to fix the information that's returned?
  })
})
