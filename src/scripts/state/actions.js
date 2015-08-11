import {nextIndex} from './query';
import {addItem, assoc} from '../util';

export const goTo = page => state =>
  assoc('page', page, state);

export const addSentence = idGenerator => text => state => {
  const id           = idGenerator(text);
  const sentence     = {id: id, text: text};
  const newSentences = addItem(sentence, state.sentences);
  const newState     = assoc('sentences', newSentences, state);
  return newState;
};

export const removeSentence = id => state => {
  const idEquals     = item => item.id !== id;
  const newSentences = state.sentences.filter(idEquals);
  const newState     = assoc('sentences', newSentences, state);
  return newState;
};

export const nextSentenceIndex = state =>
  assoc('currentSentence', nextIndex(state.sentences, state.currentSentence), state);