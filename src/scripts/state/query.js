export const nextIndex = (array, index) => {
  const newIndex = index + 1;
  if (newIndex < array.length) {
    return newIndex;
  } else {
    return 0;
  }
};

export const currentRandomSentence = state =>
  state.randomSentences[state.currentSentence];
