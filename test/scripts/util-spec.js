import {prop, clone, assoc, addItem, removeItem} from '../../src/scripts/util';

describe('util', () => {
  it('prop', () => {
    const m = {
      a: 1,
      b: 2
    };
    expect(prop('a')(m)).to.equal(1);
    expect(prop('b')(m)).to.equal(2);
  });

  it('clone', () => {
    const a = [1, 2, 3, 4];
    const b = clone(a);
    expect(a).not.to.equal(b);
    expect(a).to.deep.equal(b);
  });

  it('assoc', () => {
    const a = {
      a: 1,
      b: 2
    };
    const b = {
      a: 1,
      b: 2,
      c: 3
    };
    const c = {
      a: 9,
      b: 2
    };
    expect(assoc('c', 3, a)).to.deep.equal(b);
    expect(assoc('a', 9, a)).to.deep.equal(c);
  });

  it('addItem', () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2, 100, 3, 4];
    expect(addItem(100, a)).to.include.members(b);
  });

  it('removeItem', () => {
    const a = [1, 2, 100, 3, 4];
    const b = [1, 2, 3, 4];
    expect(removeItem(100, a)).not.to.include(100);
    expect(removeItem(100, a)).to.include.members(b);
  });
});