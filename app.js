(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":2,"./lib/keys.js":3}],2:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],3:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],4:[function(require,module,exports){
/**
 * Module dependencies.
 */

var index = require('indexof');

/**
 * Whitespace regexp.
 */

var whitespaceRe = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

module.exports = classes;
module.exports.add = add;
module.exports.contains = has;
module.exports.has = has;
module.exports.toggle = toggle;
module.exports.remove = remove;
module.exports.removeMatching = removeMatching;

function classes (el) {
  if (el.classList) {
    return el.classList;
  }

  var str = el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(whitespaceRe);
  if ('' === arr[0]) arr.shift();
  return arr;
}

function add (el, name) {
  // classList
  if (el.classList) {
    el.classList.add(name);
    return;
  }

  // fallback
  var arr = classes(el);
  var i = index(arr, name);
  if (!~i) arr.push(name);
  el.className = arr.join(' ');
}

function has (el, name) {
  return el.classList
    ? el.classList.contains(name)
    : !! ~index(classes(el), name);
}

function remove (el, name) {
  if ('[object RegExp]' == toString.call(name)) {
    return removeMatching(el, name);
  }

  // classList
  if (el.classList) {
    el.classList.remove(name);
    return;
  }

  // fallback
  var arr = classes(el);
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  el.className = arr.join(' ');
}

function removeMatching (el, re, ref) {
  var arr = Array.prototype.slice.call(classes(el));
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      remove(el, arr[i]);
    }
  }
}

function toggle (el, name) {
  // classList
  if (el.classList) {
    return el.classList.toggle(name);
  }

  // fallback
  if (has(el, name)) {
    remove(el, name);
  } else {
    add(el, name);
  }
}

},{"indexof":5}],5:[function(require,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _stateState = require('../state/state');

var State = _interopRequireWildcard(_stateState);

var _stateActions = require('../state/actions');

var start = function start(getHappy, writeNew) {
  getHappy.addEventListener('click', function () {
    return State.update((0, _stateActions.goTo)('sentence-page'));
  });
  writeNew.addEventListener('click', function () {
    return State.update((0, _stateActions.goTo)('write-page'));
  });
};
exports.start = start;

},{"../state/actions":10,"../state/state":13}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _stateState = require('../state/state');

var State = _interopRequireWildcard(_stateState);

var _stateActions = require('../state/actions');

var _stateQuery = require('../state/query');

var _util = require('../util');

var start = function start(home, next, text) {
  State.listen((0, _util.prop)('page'), function (n, p) {
    if (n === 'sentence-page') {
      var state = State.current();
      text.innerHTML = (0, _stateQuery.currentRandomSentence)(state);
    }
  });

  State.listen((0, _util.prop)('currentSentence'), function (n, p) {
    var s = State.current().randomSentences[n];
    _domClasses2['default'].remove(text, 'visible');
    _domClasses2['default'].add(text, 'invisible');
    setTimeout(function () {
      text.innerHTML = s;
      _domClasses2['default'].remove(text, 'invisible');
      _domClasses2['default'].add(text, 'visible');
    }, 350);
  });

  home.addEventListener('click', function () {
    return State.update((0, _stateActions.goTo)('home'));
  });
  next.addEventListener('click', function () {
    return State.update(_stateActions.nextSentenceIndex);
  });
};
exports.start = start;

},{"../state/actions":10,"../state/query":12,"../state/state":13,"../util":14,"dom-classes":4}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _stateState = require('../state/state');

var State = _interopRequireWildcard(_stateState);

var _stateActions = require('../state/actions');

var _stateFillRandom = require('../state/fill-random');

var _util = require('../util');

var start = function start(input, add) {
  State.listen((0, _util.prop)('page'), function (n, p) {
    if (n === 'write-page') {
      input.value = '';
    }
  });
  input.addEventListener('change', function () {
    var n = input.value;
    State.update((0, _stateActions.changeNewSentence)(n));
  });
  add.addEventListener('click', function () {
    var state = State.update(_stateActions.addSentence);
    var sentences = state.sentences;
    State.update((0, _stateFillRandom.genRandomSentences)(sentences));
    State.update((0, _stateActions.goTo)('home'));
  });
};
exports.start = start;

},{"../state/actions":10,"../state/fill-random":11,"../state/state":13,"../util":14}],9:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _stateState = require('./state/state');

var State = _interopRequireWildcard(_stateState);

var _controllersHomeController = require('./controllers/home-controller');

var HomeController = _interopRequireWildcard(_controllersHomeController);

var _controllersSentencePageController = require('./controllers/sentence-page-controller');

var SentencePageController = _interopRequireWildcard(_controllersSentencePageController);

var _controllersWritePageController = require('./controllers/write-page-controller');

var WritePageController = _interopRequireWildcard(_controllersWritePageController);

var _stateFillRandom = require('./state/fill-random');

var _util = require('./util');

var _stateActions = require('./state/actions');

var pages = {
  'loading-page': document.getElementById('loading-page'),
  'home': document.getElementById('home'),
  'sentence-page': document.getElementById('sentence-page'),
  'write-page': document.getElementById('write-page')
};

// generate random sentences
var initialSentences = State.current().sentences;
State.update((0, _stateFillRandom.genRandomSentences)(initialSentences));

// controllers
var getHappy = document.getElementById('get-happy');
var newSentence = document.getElementById('new-sentence');
HomeController.start(getHappy, newSentence);

var homeSentence = document.getElementById('back-home');
var nextSentence = document.getElementById('next-sentence');
var sentenceText = document.getElementById('sentence');
SentencePageController.start(homeSentence, nextSentence, sentenceText);

var inputSentence = document.getElementById('input-sentence');
var addSentence = document.getElementById('add-sentence');
WritePageController.start(inputSentence, addSentence);

// routing
State.listen((0, _util.prop)('page'), function (n, p) {
  window.history.pushState(null, null, n);
  _domClasses2['default'].remove(pages[p], 'inside');
  _domClasses2['default'].add(pages[n], 'inside');
});
window.onpopstate = function () {
  var p = window.location.pathname.substring(1);
  var c = State.current().page;
  if (p && p !== '' && p !== c) {
    State.update((0, _stateActions.goTo)(p));
  }
};

// scripts are loaded, show home page
setTimeout(function () {
  State.update((0, _stateActions.goTo)('home'));
}, 500);

// debug log
State.listen(function (x) {
  return x;
}, function (x) {
  return console.log('STATE', JSON.stringify(x, null, '  '));
});

},{"./controllers/home-controller":6,"./controllers/sentence-page-controller":7,"./controllers/write-page-controller":8,"./state/actions":10,"./state/fill-random":11,"./state/state":13,"./util":14,"dom-classes":4}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _query = require('./query');

var _util = require('../util');

var goTo = function goTo(page) {
  return function (state) {
    return (0, _util.assoc)('page', page, state);
  };
};

exports.goTo = goTo;
var addSentence = function addSentence(state) {
  var sentence = state.newSentence;
  var newSentences = (0, _util.addItem)(sentence, state.sentences);
  var newState = (0, _util.assoc)('sentences', newSentences, state);
  return (0, _util.assoc)('newSentence', undefined, newState);
};

exports.addSentence = addSentence;
var removeSentence = function removeSentence(id) {
  return function (state) {
    var idEquals = function idEquals(item) {
      return item.id !== id;
    };
    var newSentences = state.sentences.filter(idEquals);
    var newState = (0, _util.assoc)('sentences', newSentences, state);
    return newState;
  };
};

exports.removeSentence = removeSentence;
var nextSentenceIndex = function nextSentenceIndex(state) {
  return (0, _util.assoc)('currentSentence', (0, _query.nextIndex)(state.sentences, state.currentSentence), state);
};

exports.nextSentenceIndex = nextSentenceIndex;
var changeNewSentence = function changeNewSentence(s) {
  return function (state) {
    return (0, _util.assoc)('newSentence', s, state);
  };
};
exports.changeNewSentence = changeNewSentence;

},{"../util":14,"./query":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _util = require('../util');

var fisherYates = function fisherYates(a) {
  var array = (0, _util.clone)(a);
  var count = array.length,
      randomnumber = undefined,
      temp = undefined;
  while (count) {
    randomnumber = Math.random() * count-- | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp;
  }
  return array;
};

exports.fisherYates = fisherYates;
var genRandomSentences = function genRandomSentences(sentences) {
  return function (state) {
    var c = (0, _util.assoc)('currentSentence', 0);
    var r = (0, _util.assoc)('randomSentences', fisherYates(sentences));
    return r(c(state));
  };
};
exports.genRandomSentences = genRandomSentences;

},{"../util":14}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nextIndex = function nextIndex(array, index) {
  var newIndex = index + 1;
  if (newIndex < array.length) {
    return newIndex;
  } else {
    return 0;
  }
};

exports.nextIndex = nextIndex;
var currentRandomSentence = function currentRandomSentence(state) {
  return state.randomSentences[state.currentSentence];
};
exports.currentRandomSentence = currentRandomSentence;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var state = {
  page: 'loading-page',
  sentences: ["Lembra da Pretinha!", "Lembra do Cotinho!"],
  currentSentence: 0,
  randomSentences: [],
  newSentence: ''
};

var listeners = [];

var current = function current() {
  return state;
};

exports.current = current;
var listen = function listen(listenTo, cb) {
  var listener = {
    listenTo: listenTo,
    cb: cb
  };
  listeners.push(listener);
};

exports.listen = listen;
var callListener = function callListener(currentState, newState) {
  return function (listener) {
    var previousListenTo = listener.listenTo(currentState);
    var newListenTo = listener.listenTo(newState);
    if (!(0, _deepEqual2['default'])(previousListenTo, newListenTo)) {
      listener.cb(newListenTo, previousListenTo);
    }
  };
};

var update = function update(f) {
  var newState = f(state);
  if (!(0, _deepEqual2['default'])(state, newState)) {
    listeners.forEach(callListener(state, newState));
    state = newState;
  }
  return state;
};
exports.update = update;

},{"deep-equal":1}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clone = function clone(o) {
  return JSON.parse(JSON.stringify(o));
};

exports.clone = clone;
var addItem = function addItem(i, array) {
  var c = clone(array);
  c.push(i);
  return c;
};

exports.addItem = addItem;
var assoc = function assoc(prop, v, obj) {
  if (!obj) {
    return function (o) {
      return assoc(prop, v, o);
    };
  }
  var c = clone(obj);
  c[prop] = v;
  return c;
};

exports.assoc = assoc;
var prop = function prop(p) {
  return function (obj) {
    return obj[p];
  };
};
exports.prop = prop;

},{}]},{},[9]);
