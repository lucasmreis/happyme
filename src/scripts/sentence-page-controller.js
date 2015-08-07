import * as State from './state';

import {goTo} from './actions';

export const start = (home) => {
  home.addEventListener('click', () => State.update(goTo('home')));
};