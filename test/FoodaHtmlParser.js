'use es6';

import {expect} from 'chai';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

import FoodaHtmlParser from '../src/parsers/FoodaHtmlParser';
import MenuType from '../src/data/MenuType';
import Item from '../src/data/Item';
import Menu from '../src/data/Menu';

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

  it('test generate items', function() {
    const expectedItems = [
      new Item({
        name: 'Saag Paneer (V)',
        price: '$7.48',
        description: 'Spinach and homemade cottage cheese, prepared with a touch of onions and fresh tomatoes; served with long-grain basmati rice',
      }),
      new Item({
        name: 'Chana Masala (V)',
        price: '$7.48',
        description: 'Garbanzo beans sautéed with onions, fresh tomatoes, and spices; served with long-grain basmati rice',
      }),
      new Item({
        name: 'Vegetable Korma (V)',
        price: '$7.48',
        description: 'Garden vegetables in a creamy sauce with cashew nuts and raisins; served with long-grain basmati rice',
      }),
      new Item({
        name: 'Chicken Tikka Masala',
        price: '$8.41',
        description: 'Roasted boneless chicken cooked in a creamy tomato sauce with exotic spices served with long-grain basmati rice',
      }),
      new Item({
        name: "Chef's Special Entrée",
        price: '$8.41',
        description: 'Rotating selection of classic Indian specialties served with long-grain basmati rice',
      }),
    ];
    const items = parser.generateItems($, 'Curry House', 'Entrees');
    expect(items).to.eql(expectedItems);
  });
})
