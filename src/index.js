import * as State from './state';
import {addSentence, removeSentence} from './actions';
import hash from 'hash-string';

console.log(State.current());

console.log(State.update(addSentence(hash)('oi!')));

console.log(State.current());

console.log(State.update(removeSentence(456)));

console.log(State.current());