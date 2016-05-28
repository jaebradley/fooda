'use es6';

import {expect} from 'chai';
import emoji from 'node-emoji';

import MenuTableCreator from '../src/tables/MenuTableCreator';
import MenuType from '../src/data/MenuType';
import Menu from '../src/data/Menu';
import Item from '../src/data/Item';

describe('Menu table creator', function() {
  const tableCreator = new MenuTableCreator();
  const expectedPriceEmoji = emoji.get('money_with_wings');
  const expectedMemoEmoji = emoji.get('memo');
  const expectedColWidths = [20, 10, 50];

  const menuItem = new Item({
    name: 'jae',
    price: 'bae',
    description: 'bradley',
  });

  const menuOptions = {vendor: 'dumbledore'};
  menuOptions[MenuType.ENTREES] = [menuItem];
  menuOptions[MenuType.COMBINATIONS] = [menuItem];
  menuOptions[MenuType.DESSERTS] = [menuItem];
  menuOptions[MenuType.SALADS] = [menuItem];
  menuOptions[MenuType.SIDES] = [menuItem];
  menuOptions[MenuType.SIDES_AND_DESSERT] = [menuItem];
  const menu = new Menu(menuOptions);

  it('tests constructor', function() {
    expect(tableCreator.priceEmoji).to.equal(expectedPriceEmoji);
    expect(tableCreator.memoEmoji).to.equal(expectedMemoEmoji);
    expect(tableCreator.colWidths).to.eql(expectedColWidths);
    expect(tableCreator.menuTypeOrder).to.eql([
      MenuType.ENTREES,
      MenuType.COMBINATIONS,
      MenuType.DESSERTS,
      MenuType.SALADS,
      MenuType.SIDES,
      MenuType.SIDES_AND_DESSERT,
    ]);
  });

  it('tests header generation', function() {
    const expectedHeader = ['jae', expectedPriceEmoji, expectedMemoEmoji];
    expect(tableCreator.generateHeader('jae')).to.eql(expectedHeader);
  });

  it('tests table creation', function() {
    expect(tableCreator.create(new Menu())).to.equal('\u001b[90m┌────────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m                    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 💸        \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 📝                                                \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m└────────────────────\u001b[39m\u001b[90m┴──────────\u001b[39m\u001b[90m┴──────────────────────────────────────────────────┘\u001b[39m');
    expect(tableCreator.create(menu)).to.equal('\u001b[90m┌────────────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m dumbledore         \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 💸        \u001b[39m\u001b[90m│\u001b[39m\u001b[31m 📝                                                \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├────────────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae                \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├────────────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae                \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├────────────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae                \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├────────────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae                \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├────────────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae                \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m├────────────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼──────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae                \u001b[90m│\u001b[39m bae      \u001b[90m│\u001b[39m bradley                                          \u001b[90m│\u001b[39m\n\u001b[90m└────────────────────\u001b[39m\u001b[90m┴──────────\u001b[39m\u001b[90m┴──────────────────────────────────────────────────┘\u001b[39m');
  });
});