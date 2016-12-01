'use es6';

import {expect} from 'chai';
import {List} from 'immutable';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

import MenuParser from '../src/parsers/MenuParser';
import MenuType from '../src/data/MenuType';
import Item from '../src/data/Item';
import Menu from '../src/data/Menu';

describe('Fooda Html Parser', function() {
  let sampleHtml = fs.readFileSync(path.join(__dirname, './html/fooda.html'));
  let $ = cheerio.load(sampleHtml);
  let testLookupKey = 'div[class=item--no-photo][data-vendor_name="Curry House"][data-category="Entrees"] div[class=item__name]';

  let curryHouseEntrees = List.of(
    new Item({
      name: 'Saag Paneer (V)',
      price: '$7.48',
      description: 'Spinach and homemade cottage cheese, prepared with a touch of onions and fresh tomatoes; served with long-grain basmati rice',
      labels: List.of('Vegetarian', 'Gluten-Free'),
    }),
    new Item({
      name: 'Chana Masala (V)',
      price: '$7.48',
      description: 'Garbanzo beans sautéed with onions, fresh tomatoes, and spices; served with long-grain basmati rice',
      labels: List.of('Vegetarian', 'Gluten-Free'),
    }),
    new Item({
      name: 'Vegetable Korma (V)',
      price: '$7.48',
      description: 'Garden vegetables in a creamy sauce with cashew nuts and raisins; served with long-grain basmati rice',
      labels: List.of('Vegetarian', 'Gluten-Free'),
    }),
    new Item({
      name: 'Chicken Tikka Masala',
      price: '$8.41',
      description: 'Roasted boneless chicken cooked in a creamy tomato sauce with exotic spices served with long-grain basmati rice',
      labels: List.of('Gluten-Free'),
    }),
    new Item({
      name: "Chef's Special Entrée",
      price: '$8.41',
      description: 'Rotating selection of classic Indian specialties served with long-grain basmati rice',
      labels: List.of('Gluten-Free'),
    }),
  );

  let curryHouseCombinations = List.of(
    new Item({
      name: 'Vegetarian Combo',
      price: '$8.41',
      description: 'Your choice of any two vegetarian entrees, served with long-grain basmati rice',
      labels: List.of('Vegetarian'),
    }),
    new Item({
      name: 'Curry House Combo',
      price: '$9.35',
      description: 'Your choice of any two entrées one meat one vegetarian, served with long-grain basmati rice',
      labels: List.of(),
    }),
  );

  let curryHouseSides = List.of(
    new Item({
      name: 'Basmati Rice',
      price: '$1.87',
      description: 'Traditional, long-grain white rice',
      labels: List.of('Gluten-Free'),
    }),
    new Item({
      name: 'Naan',
      price: '$1.87',
      description: 'Indian bread made fresh daily in our tandoor oven',
      labels: List.of(),
    }),
    new Item({
      name: 'Vegetable Samosa (1)',
      price: '$1.87',
      description: 'Crispy turnover filled with seasoned potatoes and green peas',
      labels: List.of(),
    })
  );

  let curryHouseDesserts = List.of(
    new Item({
      name: 'Kheer',
      price: '$1.87',
      description: 'Homemade rice pudding flavored with cardamom, served chilled',
      labels: List.of(),
    }),
  );

  let mexicaliEntrees = List.of(
    new Item({
      name: 'Burrito Bowl',
      price: '$8.41',
      description: 'Black beans, rice, choice of meat or veggie, sour cream, pico de gallo tomato salsa, and shredded jack cheese with your choice of protein:Spicy rojo chicken- grilled with a habanero red chile sauce, Pulled Chile Colorado Pork, Seasonal veggies (GF',
      labels: List.of(),
    }),
    new Item({
      name: 'Add guacamole or extra protein $1.87',
      price: '',
      description: '',
      labels: List.of(),
    }),
  );

  let mexicaliSalads = List.of(
    new Item({
      name: 'Taco Salad',
      price: '$8.41',
      description: 'Romaine lettuce, corn tortilla chips, choice of meat or veggie, sour cream, pico de gallo tomato salsa, and shredded jack cheese',
      labels: List.of('Gluten-Free'),
    }),
  );

  let mexicaliSidesAndDessert = List.of(
    new Item({
      name: 'Chips',
      price: '$1.87',
      description: 'Homemade corn tortilla chips',
      labels: List.of('Vegetarian', 'Gluten-Free'),
    }),
    new Item({
      name: 'Chips and Guacamole',
      price: '$3.74',
      description: 'Homemade corn tortilla chips served with handmade guacamole',
      labels: List.of('Vegetarian', 'Gluten-Free'),
    }),
    new Item({
      name: 'Chips and Salsa',
      price: '$3.27',
      description: 'Homemade corn tortilla chips served with a chunky tomato salsa',
      labels: List.of('Vegetarian', 'Gluten-Free'),
    }),
  );

  const mexicaliDesserts = List.of(
    new Item({
      name: 'Stoneground Taza Chocolate Disk',
      price: '$4.67',
      description: 'Organic dark Mexican style chocolate discs bursting with bright tastes and bold textures',
      labels: List.of('Vegetarian', 'Gluten-Free'),
    }),
  );

  let expectedCurryHouseMenuParameters = {vendor: 'Curry House', 'date': 'popup today, May 27'};
  expectedCurryHouseMenuParameters[MenuType.COMBINATIONS.name] = curryHouseCombinations;
  expectedCurryHouseMenuParameters[MenuType.DESSERTS.name] = curryHouseDesserts;
  expectedCurryHouseMenuParameters[MenuType.ENTREES.name] = curryHouseEntrees;
  expectedCurryHouseMenuParameters[MenuType.SANDWICHES.name] = List.of();
  expectedCurryHouseMenuParameters[MenuType.SALADS.name] = List.of();
  expectedCurryHouseMenuParameters[MenuType.SIDES.name] = curryHouseSides;
  expectedCurryHouseMenuParameters[MenuType.SIDES_AND_DESSERT.name] = List.of();
  let expectedCurryHouseMenu = new Menu(expectedCurryHouseMenuParameters);

  let expectedMexicaliMenuParameters = {vendor: 'MexiCali Burrito Co.' , 'date': 'popup today, May 27'};
  expectedMexicaliMenuParameters[MenuType.COMBINATIONS.name] = List.of();
  expectedMexicaliMenuParameters[MenuType.DESSERTS.name] = mexicaliDesserts;
  expectedMexicaliMenuParameters[MenuType.ENTREES.name] = mexicaliEntrees;
  expectedMexicaliMenuParameters[MenuType.SANDWICHES.name] = List.of();
  expectedMexicaliMenuParameters[MenuType.SALADS.name] = mexicaliSalads;
  expectedMexicaliMenuParameters[MenuType.SIDES.name] = List.of();
  expectedMexicaliMenuParameters[MenuType.SIDES_AND_DESSERT.name] = mexicaliSidesAndDessert;
  let expectedMexicaliMenu = new Menu(expectedMexicaliMenuParameters);

  const expectedMenus = List.of(expectedCurryHouseMenu, expectedMexicaliMenu);

  it('test vendor generation', function() {
    let vendors = MenuParser.generateVendors($);
    expect(vendors.size).to.equal(2);
    expect(vendors.get(0)).to.equal('Curry House');
    expect(vendors.get(1)).to.equal('MexiCali Burrito Co.');
  });

  it('test get text values', function() {
    let expectedEntrees = List.of(
      'Saag Paneer (V)',
      'Chana Masala (V)',
      'Vegetable Korma (V)',
      'Chicken Tikka Masala',
      "Chef's Special Entrée",
    );
    let entrees = MenuParser.getTextValues($, testLookupKey);
    expect(entrees).to.eql(expectedEntrees);
  });

  it('test generate items', function() {
    let items = MenuParser.generateItems($, 'Curry House', 'Entrees');
    expect(items.toJS()).to.eql(curryHouseEntrees.toJS());
  });

  it('test generate menu', function() {
    expect(MenuParser.generateMenu($, 'Curry House').toJS()).to.eql(expectedCurryHouseMenu.toJS());
  });

  it('test parse', function() {
    expect(MenuParser.parse(sampleHtml).toJS()).to.eql(expectedMenus.toJS());
  });
})
