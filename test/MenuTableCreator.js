'use es6';

import {expect} from 'chai';
import emoji from 'node-emoji';

import MenuTableCreator from '../src/tables/MenuTableCreator';
import MenuType from '../src/data/MenuType';

describe('Menu table creator', function() {
  const tableCreator = new MenuTableCreator();
  const expectedPriceEmoji = emoji.get('money_with_wings');
  const expectedMemoEmoji = emoji.get('memo');
  const expectedColWidths = [20, 10, 50];

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

  });
});