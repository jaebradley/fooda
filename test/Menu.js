'use es6';

import {expect} from 'chai';

import Menu from '../src/data/Menu';
import Item from '../src/data/Item';
import MenuType from '../src/data/MenuType';

describe('Menu data model object', function() {

    const customName = 'jae';
    const customPrice = 'bae';
    const customDescription = 'bradley';
    const customItem = new Item({
      name: customName,
      price: customPrice,
      description: customDescription,
    });

    const customVendorName = 'jae';
    const customCombinations = [customItem];
    const customDesserts = [customItem, customItem];
    const customEntrees = [customItem, customItem, customItem];
    const customSalads = [customItem, customItem, customItem, customItem];
    const customSides = [customItem, customItem, customItem, customItem, customItem];;
    const customSidesAndDessert = [customItem, customItem, customItem, customItem, customItem];

  it('creates default menu', function() {
    const defaultMenu = new Menu();

    expect(defaultMenu.vendor).to.equal('');
    expect(defaultMenu.get(MenuType.COMBINATIONS)).to.eql([]);
    expect(defaultMenu.get(MenuType.DESSERTS)).to.eql([]);
    expect(defaultMenu.get(MenuType.ENTREES)).to.eql([]);
    expect(defaultMenu.get(MenuType.SALADS)).to.eql([]);
    expect(defaultMenu.get(MenuType.SIDES)).to.eql([]);
    expect(defaultMenu.get(MenuType.SIDES_AND_DESSERT)).to.eql([]);
  });

  it('creates custom menu', function() {
    
    const customMenuProperties = { vendor: customVendorName };
    customMenuProperties[MenuType.COMBINATIONS] = customCombinations;
    customMenuProperties[MenuType.DESSERTS] = customDesserts;
    customMenuProperties[MenuType.ENTREES] = customEntrees;
    customMenuProperties[MenuType.SALADS] = customSalads;
    customMenuProperties[MenuType.SIDES] = customSides;
    customMenuProperties[MenuType.SIDES_AND_DESSERT] = customSidesAndDessert;

    const customMenu = new Menu(customMenuProperties);
    expect(customMenu.vendor).to.equal(customVendorName);
    expect(customMenu.get(MenuType.COMBINATIONS)).to.eql(customCombinations);
    expect(customMenu.get(MenuType.DESSERTS)).to.eql(customDesserts);
    expect(customMenu.get(MenuType.ENTREES)).to.eql(customEntrees);
    expect(customMenu.get(MenuType.SALADS)).to.eql(customSalads);
    expect(customMenu.get(MenuType.SIDES)).to.eql(customSides);
    expect(customMenu.get(MenuType.SIDES_AND_DESSERT)).to.eql(customSidesAndDessert);
  });
})