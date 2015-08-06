import * as State from './state';
import {prop} from './util';
import {addSentence, removeSentence} from './actions';
import {randomItem} from './query';
import hash from 'hash-string';

let main = document.getElementById('main');
main.innerHTML = JSON.stringify(State.current(), null, '  ');

State.listen(prop('sentences'), s =>
  main.innerHTML = JSON.stringify(s, null, '  '));

State.listen(prop('sentences'), s =>
  console.log(s));

setTimeout(function() {
  State.update(addSentence(hash)('oi!'))
}, 1000);

window.State = State;
window.addSentence = addSentence;
window.hashFn = hash;