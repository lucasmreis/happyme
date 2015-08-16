import classes from 'dom-classes';

import * as State from '../state/state';

import {goTo, nextSentenceIndex, removeCurrent} from '../state/actions';
import {currentRandomSentence} from '../state/query';
import {genRandomSentences} from '../state/fill-random';

import {prop} from '../util';

const updateText = textElement => () => {
  const c = State.current();
  const r = currentRandomSentence(c);
  classes.remove(textElement, 'visible');
  classes.add(textElement, 'invisible');
  setTimeout(() => {
    textElement.innerHTML = r;
    classes.remove(textElement, 'invisible');
    classes.add(textElement, 'visible');
  }, 350);
}

export const start = (home, next, remove, text) => {
  State.listen(prop('page'), (n, p) => {
    if (n === 'sentence-page') {
      const state = State.current();
      text.innerHTML = currentRandomSentence(state);
    }
  });

  State.listen(prop('currentSentence'), updateText(text));

  home.addEventListener('click', () => State.update(goTo('home')));
  next.addEventListener('click', () => State.update(nextSentenceIndex));
  remove.addEventListener('click', () => {
    const state     = State.update(removeCurrent);
    const sentences = state.sentences;
    State.update(genRandomSentences(sentences));
    updateText(text)();
  });
};