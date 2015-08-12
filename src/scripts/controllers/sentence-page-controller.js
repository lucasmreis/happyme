import classes from 'dom-classes';

import * as State from '../state/state';

import {goTo, nextSentenceIndex} from '../state/actions';
import {currentRandomSentence} from '../state/query';

import {prop} from '../util';

export const start = (home, next, text) => {
  State.listen(prop('page'), (n, p) => {
    if (n === 'sentence-page') {
      const state = State.current();
      text.innerHTML = currentRandomSentence(state);
    }
  });

  State.listen(prop('currentSentence'), (n, p) => {
    const s = State.current().randomSentences[n];
    classes.remove(text, 'visible');
    classes.add(text, 'invisible');
    setTimeout(() => {
      text.innerHTML = s;
      classes.remove(text, 'invisible');
      classes.add(text, 'visible');
    }, 350);

  });

  home.addEventListener('click', () => State.update(goTo('home')));
  next.addEventListener('click', () => State.update(nextSentenceIndex))
};