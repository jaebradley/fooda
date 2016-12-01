'use es6';

import {expect} from 'chai';

import FoodaClient from '../src/clients/FoodaClient';
import Location from '../src/data/Location';

describe('Fooda client', function() {

  it('tests base url', function() {
    expect(FoodaClient.getBaseUrl()).to.equal('https://app.fooda.com');
  });

  it('tests url generator', function() {
    expect(FoodaClient.generateUrl(Location.DAVENPORT)).to.equal('https://app.fooda.com/davenport');
  });

  it('tests cookie generator', function() {
    expect(FoodaClient.generateCookie(Location.DAVENPORT)).to.equal('%7B%22entity%22%3A%22account%22%2C%22id%22%3A%22davenport%22%7D');
  });

  it('tests data fetching', function() {
    return FoodaClient.fetch(Location.DAVENPORT)
                      .then(response => console.log(response));
  })
})
