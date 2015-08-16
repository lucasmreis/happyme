import classes from 'dom-classes';

import * as State from './state/state';
import * as HomeController from './controllers/home-controller';
import * as SentencePageController from './controllers/sentence-page-controller';
import * as WritePageController from './controllers/write-page-controller';

import {genRandomSentences} from './state/fill-random';

import {prop} from './util';
import {goTo} from './state/actions';

const pages = {
  'loading-page':  document.getElementById('loading-page'),
  'home':          document.getElementById('home'),
  'sentence-page': document.getElementById('sentence-page'),
  'write-page':    document.getElementById('write-page')
};

// generate random sentences
const initialSentences = State.current().sentences;
State.update(genRandomSentences(initialSentences));

// controllers
let getHappy    = document.getElementById('get-happy');
let newSentence = document.getElementById('new-sentence');
HomeController.start(getHappy, newSentence);

let homeSentence   = document.getElementById('back-home');
let nextSentence   = document.getElementById('next-sentence');
let removeSentence = document.getElementById('remove-sentence');
let sentenceText   = document.getElementById('sentence');
SentencePageController.start(homeSentence, nextSentence, removeSentence, sentenceText);

let inputSentence = document.getElementById('input-sentence');
let addSentence   = document.getElementById('add-sentence');
WritePageController.start(inputSentence, addSentence);

// routing
State.listen(prop('page'), (n, p) => {
  window.location.hash = '/' + n;
  classes.remove(pages[p], 'inside');
  classes.add(pages[n], 'inside');
});
window.addEventListener('hashchange', () => {
  const p = window.location.hash.slice(2);
  const c = State.current().page;
  if (p && p !== '' && p !== c) {
    State.update(goTo(p));
  }
});

// scripts are loaded, show home page
setTimeout(function() {
  State.update(goTo('home'));
}, 500);

// debug log
State.listen(x => x, x => console.log('STATE', JSON.stringify(x, null, '  ')));


