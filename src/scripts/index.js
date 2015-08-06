import hash from 'hash-string';
import classes from 'dom-classes';
import * as State from './state';

import {prop} from './util';
import {addSentence, removeSentence} from './actions';
import {randomSentence} from './query';

let homePage     = document.getElementById('home');
let sentencePage = document.getElementById('sentence-page');

let getHappy     = document.getElementById('get-happy');
let sentence     = document.getElementById('sentence');

getHappy.onclick = () => sentence.innerHTML = randomSentence(State.current()).text;
