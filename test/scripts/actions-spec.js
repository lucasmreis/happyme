import {goTo, addSentence, removeCurrent} from '../../src/scripts/state/actions';

describe('actions', () => {
  it('goTo', () => {
    const a = {
      page: 'one'
    };
    const b = {
      page: 'another'
    };
    expect(goTo('another')(a)).to.deep.equal(b);
  });

  it('addSentence', () => {
    const a = {
      sentences: [1, 2, 3],
      newSentence: 4
    };
    const b = {
      sentences: [1, 2, 3, 4],
      newSentence: undefined
    };

    const c = {
      sentences: [1, 2, 3],
      newSentence: ''
    };
    const d = {
      sentences: [1, 2, 3]
    }

    expect(addSentence(a)).to.deep.equal(b);
    expect(addSentence(c)).to.deep.equal(c);
    expect(addSentence(d)).to.deep.equal(d);
  });

  it('removeCurrent', () => {
    const a = {
      sentences: ['a', 'b', 'c'],
      randomSentences: ['b', 'a', 'c'],
      currentSentence: 0
    };
    const b = {
      sentences: ['a', 'c'],
      randomSentences: ['any', 'array'],
      currentSentence: 1
    };
    const removed = removeCurrent(a);
    expect(removed.sentences).to.deep.equal(b.sentences);
    expect(removed.currentSentence).to.equal(b.currentSentence);
  });
});
