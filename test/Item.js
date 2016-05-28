'use es6';

import {expect} from 'chai';

import Item from '../src/data/Item';

describe('Item data model object', function() {
  it('creates default item', function() {
    const defaultItem = new Item();

    expect(defaultItem.name).to.equal('');
    expect(defaultItem.price).to.equal('');
    expect(defaultItem.description).to.equal('');
  });

  it('creates custom item', function() {
    const customName = 'jae';
    const customPrice = 'bae';
    const customDescription = 'bradley';
    const customItem = new Item({
      name: customName,
      price: customPrice,
      description: customDescription,
    });

    expect(customItem.name).to.equal(customName);
    expect(customItem.price).to.equal(customPrice);
    expect(customItem.description).to.equal(customDescription);
  });
})