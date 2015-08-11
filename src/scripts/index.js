import hash from 'hash-string';
import classes from 'dom-classes';

import * as State from './state/state';
import * as HomeController from './controllers/home-controller';
import * as SentencePageController from './controllers/sentence-page-controller';

import {genRandomSentences} from './state/fill-random';

import {prop} from './util';
import {goTo, addSentence, removeSentence} from './state/actions';

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
let nextSentence = document.getElementById('next-sentence');
let sentenceText = document.getElementById('sentence');
SentencePageController.start(homeSentence, nextSentence, sentenceText);

// generate random sentences
const initialSentences = State.current().sentences;
State.update(genRandomSentences(initialSentences));
State.listen(prop('sentences'), (n, p) => {
  State.update(genRandomSentences(n));
});

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


