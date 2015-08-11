import {clone, assoc} from '../util';

export const fisherYates = a => {
  let array = clone(a);
  let count = array.length,
    randomnumber,
    temp;
  while (count) {
    randomnumber = Math.random() * count-- | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp
  }
  return array;
};

export const genRandomSentences = sentences => state => {
  const c = assoc('currentSentence', 0);
  const r = assoc('randomSentences', fisherYates(sentences));
  return r(c(state));
};