import hash from 'hash-string';
import classes from 'dom-classes';

import * as State from './state';
import * as HomeController from './home-controller';

import {prop} from './util';
import {addSentence, removeSentence} from './actions';
import {randomSentence} from './query';

let loadingPage  = document.getElementById('loading-page');
let homePage     = document.getElementById('home');
let sentencePage = document.getElementById('sentence-page');

let getHappy     = document.getElementById('get-happy');
let newSentence  = document.getElementById('new-sentence');

HomeController.start(getHappy, newSentence);

// scripts are loaded, show home page
setTimeout(function() {
  classes.remove(loadingPage, 'inside');
  classes.add(homePage, 'inside');
}, 500);

State.listen(x => x, x => console.log('STATE', x));
