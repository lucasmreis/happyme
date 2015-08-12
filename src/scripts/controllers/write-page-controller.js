import * as State from '../state/state';

import {goTo, changeNewSentence, addSentence} from '../state/actions';
import {genRandomSentences} from '../state/fill-random';

import {prop} from '../util';

export const start = (input, add) => {
  State.listen(prop('page'), (n, p) => {
    if (n === 'write-page') {
      input.value = '';
    }
  });
  input.addEventListener('change', () => {
    const n = input.value;
    State.update(changeNewSentence(n));
  });
  add.addEventListener('click', () => {
    const state     = State.update(addSentence);
    const sentences = state.sentences;
    State.update(genRandomSentences(sentences));
    State.update(goTo('home'));
  });
};