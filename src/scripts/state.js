import equals from 'deep-equal';

let state = {
  page: 'aaa', // 'sentence', 'add'
  sentences: [
    {id: 123, text: "Lembra da Pretinha!"},
    {id: 456, text: "Lembra do Cotinho!"}
  ]
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
    listener.cb(newListenTo);
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