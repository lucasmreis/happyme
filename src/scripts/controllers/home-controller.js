import * as State from '../state/state';

import {goTo} from '../state/actions';

export const start = (getHappy, writeNew) => {
  getHappy.addEventListener('click', () => State.update(goTo('sentence-page')));
  writeNew.addEventListener('click', () => State.update(goTo('write-page')));
};