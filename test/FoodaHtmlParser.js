'use es6';

import {expect} from 'chai';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

import FoodaHtmlParser from '../src/parsers/FoodaHtmlParser';
import MenuType from '../src/data/MenuType';

describe('Fooda Html Parser', function() {
  const parser = new FoodaHtmlParser();
  const sampleHtml = fs.readFileSync(path.join(__dirname, './html/fooda.html'));
  const $ = cheerio.load(sampleHtml);
  const testLookupKey = 'div[class=item--no-photo][data-vendor_name="Curry House"][data-category="Entrees"] div[class=item__name]';

  it('test constructor', function() {
    expect(parser.categoriesMap[MenuType.COMBINATIONS]).to.equal('Combinations');
    expect(parser.categoriesMap[MenuType.DESSERTS]).to.equal('Desserts');
    expect(parser.categoriesMap[MenuType.ENTREES]).to.equal('Entrees');
    expect(parser.categoriesMap[MenuType.SALADS]).to.equal('Salads');
    expect(parser.categoriesMap[MenuType.SIDES]).to.equal('Sides');
    expect(parser.categoriesMap[MenuType.SIDES_AND_DESSERT]).to.equal('Sides & Dessert');
  });

  it('test vendor generation', function() {
    const vendors = parser.generateVendors($);
    expect(vendors.length).to.equal(2);
    expect(vendors[0]).to.equal('Curry House');
    expect(vendors[1]).to.equal('MexiCali Burrito Co.');
  });

  it('test get text values', function() {
    const expectedEntrees = [
      'Saag Paneer (V)',
      'Chana Masala (V)',
      'Vegetable Korma (V)',
      'Chicken Tikka Masala',
      "Chef's Special Entrée",
    ];
    const entrees = parser.getTextValues($, testLookupKey);
    expect(entrees).to.eql(expectedEntrees);
  });
})
