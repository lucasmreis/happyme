import {nextIndex} from './query';
import {addItem, assoc} from '../util';

export const goTo = page => state =>
  assoc('page', page, state);

export const addSentence = state => {
  const sentence     = state.newSentence;
  if (!sentence || sentence === '') {
    return state;
  }
  const newSentences = addItem(sentence, state.sentences);
  const newState     = assoc('sentences', newSentences, state);
  return assoc('newSentence', undefined, newState);
};

export const removeSentence = id => state => {
  const idEquals     = item => item.id !== id;
  const newSentences = state.sentences.filter(idEquals);
  const newState     = assoc('sentences', newSentences, state);
  return newState;
};

export const nextSentenceIndex = state =>
  assoc('currentSentence', nextIndex(state.sentences, state.currentSentence), state);

export const changeNewSentence = s => state =>
  assoc('newSentence', s, state);
