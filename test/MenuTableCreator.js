'use es6';

import {expect} from 'chai';
import emoji from 'node-emoji';

import MenuTableCreator from '../src/tables/MenuTableCreator';
import MenuType from '../src/data/MenuType';

describe('Menu table creator', function() {
  const tableCreator = new MenuTableCreator();

  it('tests constructor', function() {
    expect(tableCreator.priceEmoji).to.equal(emoji.get('money_with_wings'));
    expect(tableCreator.memoEmoji).to.equal(emoji.get('memo'));
    expect(tableCreator.colWidths).to.eql([20, 10, 50]);
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

  });
});