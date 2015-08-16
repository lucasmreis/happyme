import {prop} from '../util';
import equals from 'deep-equal';

import {save, load} from './storage';

let state = {
  page: 'loading-page',
  sentences: load(),
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

listen(prop('sentences'), save);