import {addItem, assoc} from './util';

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