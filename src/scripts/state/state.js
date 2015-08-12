import equals from 'deep-equal';

let state = {
  page: 'loading-page',
  sentences: [ "Lembra da Pretinha!", "Lembra do Cotinho!" ],
  currentSentence: 0,
  randomSentences: [],
  newSentence: ''
};

let listeners = [];

export const current = () => state;

export const listen = (listenTo, cb) => {
  const listener = {
    listenTo: listenTo,
    cb: cb
  };
  listeners.push(listener);
};

const callListener = (currentState, newState) => listener => {
  const previousListenTo = listener.listenTo(currentState);
  const newListenTo      = listener.listenTo(newState);
  if (!equals(previousListenTo, newListenTo)) {
    listener.cb(newListenTo, previousListenTo);
  }
};

export const update = f => {
  const newState = f(state);
  if (!equals(state, newState)) {
    listeners.forEach(callListener(state, newState));
    state = newState;
  }
  return state;
};