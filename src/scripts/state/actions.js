import {nextIndex} from './query';
import {addItem, removeItem, assoc} from '../util';

export const goTo = page => state =>
  assoc('page', page, state);

export const addSentence = state => {
  const sentence     = state.newSentence;
  if (!sentence || sentence === '') return state;
  const newSentences = addItem(sentence, state.sentences);
  const newState     = assoc('sentences', newSentences, state);
  return assoc('newSentence', undefined, newState);
};

export const nextSentenceIndex = state =>
  assoc('currentSentence', nextIndex(state.sentences, state.currentSentence), state);

export const removeCurrent = state => {
  const c = state.currentSentence;
  const s = state.randomSentences[c];
  const n = assoc('sentences', removeItem(s, state.sentences), state);
  return nextSentenceIndex(n);
};

export const changeNewSentence = s => state =>
  assoc('newSentence', s, state);
