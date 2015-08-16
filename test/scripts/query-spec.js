import {nextIndex} from '../../src/scripts/state/query';

describe('query', () => {
  it('nextIndex', () => {
    const a = [0, 1, 2, 3];
    expect(nextIndex(a, 0)).to.equal(1);
    expect(nextIndex(a, 1)).to.equal(2);
    expect(nextIndex(a, 2)).to.equal(3);
    expect(nextIndex(a, 3)).to.equal(0);
  });
});