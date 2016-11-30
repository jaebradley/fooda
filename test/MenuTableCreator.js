'use es6';

import {expect} from 'chai';
import {List, Map} from 'immutable';
import emoji from 'node-emoji';
import colors from 'colors';

import MenuTableCreator from '../src/tables/MenuTableCreator';
import MenuType from '../src/data/MenuType';
import Menu from '../src/data/Menu';
import Item from '../src/data/Item';
import DietaryRestrictions from '../src/data/DietaryRestrictions';

describe('Menu table creator', function() {
  const expectedPriceEmoji = emoji.get('moneybag');
  const expectedMemoEmoji = emoji.get('memo');
  const expectedDessertEmoji = emoji.get('cake');
  const expectedFriesEmoji = emoji.get('fries');
  const expectedHamburgerEmoji = emoji.get('hamburger');
  const expectedHerbEmoji = emoji.get('herb');
  const expectedTomatoEmoji = emoji.get('tomato');
  const expectedBeerEmoji = emoji.get('beer');
  const expectedPizzaEmoji = emoji.get('pizza');
  const expectedColWidths = [null, 10, 50];

  const dessertsHeader = 'DESSERTS'.cyan;
  const sidesAndDessertHeader = 'SIDES AND DESSERT'.cyan;
  const sidesHeader = 'SIDES'.cyan;
  const saladsHeader = 'SALADS'.cyan;
  const sandwichesHeader = 'SANDWICHES'.cyan;
  const combinationsHeader = 'COMBINATIONS'.cyan;
  const entreesHeader = 'ENTREES'.cyan;

  const menuItem = new Item({
    name: 'jae',
    price: 'bae',
    description: 'bradley',
  });

  let menuOptions = Map({vendor: 'dumbledore', date: 'dies'});
  menuOptions = menuOptions.set(MenuType.ENTREES.name, List.of(menuItem));
  menuOptions = menuOptions.set(MenuType.COMBINATIONS.name, List.of(menuItem));
  menuOptions = menuOptions.set(MenuType.DESSERTS.name, List.of(menuItem));
  menuOptions = menuOptions.set(MenuType.SALADS.name, List.of(menuItem));
  menuOptions = menuOptions.set(MenuType.SIDES.name, List.of(menuItem));
  menuOptions = menuOptions.set(MenuType.SIDES_AND_DESSERT.name, List.of(menuItem));
  const menu = new Menu(menuOptions);

  it('tests header generation', function() {
    const expectedHeader = ['jae (bradley)', expectedPriceEmoji, expectedMemoEmoji];
    expect(MenuTableCreator.generateHeader('jae', 'bradley')).to.eql(expectedHeader);
  });

  it('tests menu type header generation', function() {
    const expectedDessertsHeader = [{content: `${dessertsHeader} ${expectedDessertEmoji}`, colSpan: 3}];
    const expectedSidesAndDessertHeader = [{content: `${sidesAndDessertHeader} ${expectedFriesEmoji} ${expectedDessertEmoji}`, colSpan: 3}];
    const expectedSidesHeader = [{content: `${sidesHeader} ${expectedFriesEmoji}`, colSpan: 3}];
    const expectedSaladsHeader = [{content: `${saladsHeader} ${expectedHerbEmoji} ${expectedTomatoEmoji}`, colSpan: 3}];
    const expectedSandwichesHeader = [{content: `${sandwichesHeader} ${expectedHamburgerEmoji}`, colSpan: 3}];
    const expectedCombinationsHeader = [{content: `${combinationsHeader} ${expectedHamburgerEmoji} ${expectedFriesEmoji} ${expectedBeerEmoji}`, colSpan: 3}];
    const expectedEntreesHeader = [{content: `${entreesHeader} ${expectedPizzaEmoji}`, colSpan: 3}];
    expect(MenuTableCreator.generateMenuTypeHeader(MenuType.DESSERTS)).to.eql(expectedDessertsHeader);
    expect(MenuTableCreator.generateMenuTypeHeader(MenuType.SIDES_AND_DESSERT)).to.eql(expectedSidesAndDessertHeader);
    expect(MenuTableCreator.generateMenuTypeHeader(MenuType.SIDES)).to.eql(expectedSidesHeader);
    expect(MenuTableCreator.generateMenuTypeHeader(MenuType.SALADS)).to.eql(expectedSaladsHeader);
    expect(MenuTableCreator.generateMenuTypeHeader(MenuType.SANDWICHES)).to.eql(expectedSandwichesHeader);
    expect(MenuTableCreator.generateMenuTypeHeader(MenuType.COMBINATIONS)).to.eql(expectedCombinationsHeader);
    expect(MenuTableCreator.generateMenuTypeHeader(MenuType.ENTREES)).to.eql(expectedEntreesHeader);
  });

  it('tests generate formatted row', function() {
    const testName = 'jae';
    const testPrice = 'bae';
    const testDescription = 'bradley';
    const testEmptyLabels = [];
    const testVegetarianLabels = [DietaryRestrictions.VEGETARIAN];
    const testGlutenFreeLabels = [DietaryRestrictions.GLUTEN_FREE];
    const testBothLables = [DietaryRestrictions.VEGETARIAN, DietaryRestrictions.GLUTEN_FREE];
    const expectedVegetarianRow = [testName.green, testPrice.green, testDescription.green];
    const expectedGlutenFreeRow = [testName.yellow, testPrice.yellow, testDescription.yellow];
    const expectedBothRow = [testName.magenta, testPrice.magenta, testDescription.magenta];
    const expectedNeitherRow = [testName, testPrice, testDescription];
    expect(MenuTableCreator.generateFormattedRow(testName, testPrice, testDescription, testEmptyLabels)).to.eql(expectedNeitherRow);
    expect(MenuTableCreator.generateFormattedRow(testName, testPrice, testDescription, testVegetarianLabels)).to.eql(expectedVegetarianRow);
    expect(MenuTableCreator.generateFormattedRow(testName, testPrice, testDescription, testGlutenFreeLabels)).to.eql(expectedGlutenFreeRow);
    expect(MenuTableCreator.generateFormattedRow(testName, testPrice, testDescription, testBothLables)).to.eql(expectedBothRow);
  });

  it('tests table creation', function() {
    // expect(MenuTableCreator.create(new Menu())).to.equal('\u001b[90m┌─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m  () \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 💰        \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 📝                                                \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[32mVegetarian\u001b[39m                                                        \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[33mGluten Free\u001b[39m                                                       \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[35mVegetarian & Gluten Free\u001b[39m                                          \u001b[90m│\u001b[39m\n\u001b[90m└───────────────────────────────────────────────────────────────────┘\u001b[39m');
    expect(MenuTableCreator.create(menu)).to.equal('\u001b[90m┌───────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m dumbledore (dies) \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 💰        \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 📝                                                \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├───────────────────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mENTREES\u001b[39m 🍕                                                                       \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae               \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mCOMBINATIONS\u001b[39m 🍔 🍟 🍺                                                              \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae               \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mSALADS\u001b[39m 🌿 🍅                                                                      \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae               \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mSIDES\u001b[39m 🍟                                                                         \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae               \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mSIDES AND DESSERT\u001b[39m 🍟 🍰                                                           \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae               \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mDESSERTS\u001b[39m 🍰                                                                      \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae               \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[32mVegetarian\u001b[39m                                                                      \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[33mGluten Free\u001b[39m                                                                     \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[35mVegetarian & Gluten Free\u001b[39m                                                        \u001b[90m│\u001b[39m\n\u001b[90m└─────────────────────────────────────────────────────────────────────────────────┘\u001b[39m');
  });
});
