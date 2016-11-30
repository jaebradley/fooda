'use es6';

import {expect} from 'chai';
import emoji from 'node-emoji';
import colors from 'colors';

import MenuTableCreator from '../src/tables/MenuTableCreator';
import MenuType from '../src/data/MenuType';
import Menu from '../src/data/Menu';
import Item from '../src/data/Item';
import DietaryRestrictions from '../src/data/DietaryRestrictions';

describe('Menu table creator', function() {
  const tableCreator = new MenuTableCreator();
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
  const sidesAndDessertHeader = 'SIDESANDDESSERT'.cyan;
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

  const menuOptions = {vendor: 'dumbledore', date: 'dies'};
  menuOptions[MenuType.ENTREES] = [menuItem];
  menuOptions[MenuType.COMBINATIONS] = [menuItem];
  menuOptions[MenuType.DESSERTS] = [menuItem];
  menuOptions[MenuType.SALADS] = [menuItem];
  menuOptions[MenuType.SIDES] = [menuItem];
  menuOptions[MenuType.SIDES_AND_DESSERT] = [menuItem];
  const menu = new Menu(menuOptions);

  it('tests header generation', function() {
    const expectedHeader = ['jae (bradley)', expectedPriceEmoji, expectedMemoEmoji];
    expect(tableCreator.generateHeader('jae', 'bradley')).to.eql(expectedHeader);
  });

  it('tests menu type header generation', function() {
    const expectedDessertsHeader = [{content: `${dessertsHeader} ${expectedDessertEmoji}`, colSpan: 3}];
    const expectedSidesAndDessertHeader = [{content: `${sidesAndDessertHeader} ${expectedFriesEmoji} ${expectedDessertEmoji}`, colSpan: 3}];
    const expectedSidesHeader = [{content: `${sidesHeader} ${expectedFriesEmoji}`, colSpan: 3}];
    const expectedSaladsHeader = [{content: `${saladsHeader} ${expectedHerbEmoji} ${expectedTomatoEmoji}`, colSpan: 3}];
    const expectedSandwichesHeader = [{content: `${sandwichesHeader} ${expectedHamburgerEmoji}`, colSpan: 3}];
    const expectedCombinationsHeader = [{content: `${combinationsHeader} ${expectedHamburgerEmoji} ${expectedFriesEmoji} ${expectedBeerEmoji}`, colSpan: 3}];
    const expectedEntreesHeader = [{content: `${entreesHeader} ${expectedPizzaEmoji}`, colSpan: 3}];
    expect(tableCreator.generateMenuTypeHeader(MenuType.DESSERTS)).to.eql(expectedDessertsHeader);
    expect(tableCreator.generateMenuTypeHeader(MenuType.SIDES_AND_DESSERT)).to.eql(expectedSidesAndDessertHeader);
    expect(tableCreator.generateMenuTypeHeader(MenuType.SIDES)).to.eql(expectedSidesHeader);
    expect(tableCreator.generateMenuTypeHeader(MenuType.SALADS)).to.eql(expectedSaladsHeader);
    expect(tableCreator.generateMenuTypeHeader(MenuType.SANDWICHES)).to.eql(expectedSandwichesHeader);
    expect(tableCreator.generateMenuTypeHeader(MenuType.COMBINATIONS)).to.eql(expectedCombinationsHeader);
    expect(tableCreator.generateMenuTypeHeader(MenuType.ENTREES)).to.eql(expectedEntreesHeader);
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
    expect(tableCreator.generateFormattedRow(testName, testPrice, testDescription, testEmptyLabels)).to.eql(expectedNeitherRow);
    expect(tableCreator.generateFormattedRow(testName, testPrice, testDescription, testVegetarianLabels)).to.eql(expectedVegetarianRow);
    expect(tableCreator.generateFormattedRow(testName, testPrice, testDescription, testGlutenFreeLabels)).to.eql(expectedGlutenFreeRow);
    expect(tableCreator.generateFormattedRow(testName, testPrice, testDescription, testBothLables)).to.eql(expectedBothRow);
  });

  it('tests table creation', function() {
    expect(tableCreator.create(new Menu())).to.equal('\u001b[90m┌─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m  () \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 💰        \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 📝                                                \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[32mVegetarian\u001b[39m                                                        \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[33mGluten Free\u001b[39m                                                       \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[35mVegetarian & Gluten Free\u001b[39m                                          \u001b[90m│\u001b[39m\n\u001b[90m└───────────────────────────────────────────────────────────────────┘\u001b[39m');
    expect(tableCreator.create(menu)).to.equal('\u001b[90m┌─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m du… \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 💰        \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 📝                                                \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m (d… \u001b[39m\u001b[90m│\u001b[39m\u001b[31m          \u001b[39m\u001b[90m│\u001b[39m\u001b[31m                                                  \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mENTREES\u001b[39m                                                           \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m 🍕                                                                 \u001b[90m│\u001b[39m\n\u001b[90m├─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mCOMBINATIONS\u001b[39m                                                      \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m 🍔 🍟                                                               \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m 🍺                                                                 \u001b[90m│\u001b[39m\n\u001b[90m├─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mSALADS\u001b[39m                                                            \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m 🌿 🍅                                                               \u001b[90m│\u001b[39m\n\u001b[90m├─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mSIDES\u001b[39m                                                             \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m 🍟                                                                 \u001b[90m│\u001b[39m\n\u001b[90m├─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mSIDESANDDESSERT\u001b[39m                                                   \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m 🍰 🍟                                                               \u001b[90m│\u001b[39m\n\u001b[90m├─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[36mDESSERTS\u001b[39m                                                          \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m 🍰                                                                 \u001b[90m│\u001b[39m\n\u001b[90m├─────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├─────┴──────────┴──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m \u001b[32mVegetarian\u001b[39m                                                        \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[33mGluten\u001b[39m                                                            \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[33mFree\u001b[39m                                                              \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[35mVegetarian\u001b[39m                                                        \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[35m&\u001b[39m                                                                 \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[35mGluten\u001b[39m                                                            \u001b[90m│\u001b[39m\n\u001b[90m│\u001b[39m \u001b[35mFree\u001b[39m                                                              \u001b[90m│\u001b[39m\n\u001b[90m└───────────────────────────────────────────────────────────────────┘\u001b[39m');
  });
});
