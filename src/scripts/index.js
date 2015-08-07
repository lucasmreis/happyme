import hash from 'hash-string';
import classes from 'dom-classes';

import * as State from './state';
import * as HomeController from './home-controller';
import * as SentencePageController from './sentence-page-controller';

import {prop} from './util';
import {goTo, addSentence, removeSentence} from './actions';
import {randomSentence} from './query';

const pages = {
  'loading-page':  document.getElementById('loading-page'),
  'home':          document.getElementById('home'),
  'sentence-page': document.getElementById('sentence-page'),
  'write-page':    document.getElementById('write-page')
};

let getHappy     = document.getElementById('get-happy');
let newSentence  = document.getElementById('new-sentence');
HomeController.start(getHappy, newSentence);

let homeSentence = document.getElementById('back-home');
SentencePageController.start(homeSentence);

// routing
State.listen(prop('page'), (n, p) => {
  window.history.pushState(null, null, n);
  classes.remove(pages[p], 'inside');
  classes.add(pages[n], 'inside');
});
window.onpopstate = function() {
  const p = window.location.pathname.substring(1);
  const c = State.current().page;
  if (p && p !== '' && p !== c) {
    State.update(goTo(p));
  }
};

// scripts are loaded, show home page
setTimeout(function() {
  State.update(goTo('home'));
}, 500);

State.listen(x => x, x => console.log('STATE', JSON.stringify(x, null, '  ')));
