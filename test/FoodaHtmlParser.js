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

  const curryHouseEntrees = [
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

  const curryHouseCombinations = [
    new Item({
      name: 'Vegetarian Combo',
      price: '$8.41',
      description: 'Your choice of any two vegetarian entrees, served with long-grain basmati rice',
    }),
    new Item({
      name: 'Curry House Combo',
      price: '$9.35',
      description: 'Your choice of any two entrées one meat one vegetarian, served with long-grain basmati rice',
    }),
  ];

  const curryHouseSides = [
    new Item({
      name: 'Basmati Rice',
      price: '$1.87',
      description: 'Traditional, long-grain white rice',
    }),
    new Item({
      name: 'Naan',
      price: '$1.87',
      description: 'Indian bread made fresh daily in our tandoor oven',
    }),
    new Item({
      name: 'Vegetable Samosa (1)',
      price: '$1.87',
      description: 'Crispy turnover filled with seasoned potatoes and green peas',
    })
  ];

  const curryHouseDesserts = [
    new Item({
      name: 'Kheer',
      price: '$1.87',
      description: 'Homemade rice pudding flavored with cardamom, served chilled',
    }),
  ];

  const mexicaliEntrees = [
    new Item({
      name: 'Burrito Bowl',
      price: '$8.41',
      description: 'Black beans, rice, choice of meat or veggie, sour cream, pico de gallo tomato salsa, and shredded jack cheese with your choice of protein:Spicy rojo chicken- grilled with a habanero red chile sauce, Pulled Chile Colorado Pork, Seasonal veggies (GF',
    }),
    new Item({
      name: 'Add guacamole or extra protein $1.87',
      price: '',
      description: ''
    }),
  ];

  const mexicaliSalads = [
    new Item({
      name: 'Taco Salad',
      price: '$8.41',
      description: 'Romaine lettuce, corn tortilla chips, choice of meat or veggie, sour cream, pico de gallo tomato salsa, and shredded jack cheese',
    }),
  ];

  const mexicaliSidesAndDessert = [
    new Item({
      name: 'Chips',
      price: '$1.87',
      description: 'Homemade corn tortilla chips',
    }),
    new Item({
      name: 'Chips and Guacamole',
      price: '$3.74',
      description: 'Homemade corn tortilla chips served with handmade guacamole',
    }),
    new Item({
      name: 'Chips and Salsa',
      price: '$3.27',
      description: 'Homemade corn tortilla chips served with a chunky tomato salsa',
    }),
  ];

  const mexicaliDesserts = [
    new Item({
      name: 'Stoneground Taza Chocolate Disk',
      price: '$4.67',
      description: 'Organic dark Mexican style chocolate discs bursting with bright tastes and bold textures',
    }),
  ];

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
    const items = parser.generateItems($, 'Curry House', 'Entrees');
    expect(items).to.eql(curryHouseEntrees);
  });

  it('test generate menu', function() {
    const expectedMenuParameters = {vendor: 'Curry House'};
    expectedMenuParameters[MenuType.COMBINATIONS] = curryHouseCombinations;
    expectedMenuParameters[MenuType.DESSERTS] = curryHouseDesserts;
    expectedMenuParameters[MenuType.ENTREES] = curryHouseEntrees;
    expectedMenuParameters[MenuType.SALADS] = [];
    expectedMenuParameters[MenuType.SIDES] = curryHouseSides;
    expectedMenuParameters[MenuType.SIDES_AND_DESSERT] = [];
    const expectedMenu = new Menu(expectedMenuParameters);
    expect(parser.generateMenu($, 'Curry House')).to.eql(expectedMenu);
  });
})
