// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"pBGv":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"juYr":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
var define;
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{"process":"pBGv"}],"PZ9L":[function(require,module,exports) {
var define;
/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

},{}],"BQvw":[function(require,module,exports) {
var global = arguments[3];
/**
 * EvEmitter v2.0.0
 * Lil' event emitter
 * MIT License
 */

( function( global, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

function EvEmitter() {}

let proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // set events hash
  let events = this._events = this._events || {};
  // set listeners array
  let listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( !listeners.includes( listener ) ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  let onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  let index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice( 0 );
  args = args || [];
  // once stuff
  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( let listener of listeners ) {
    let isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
  return this;
};

return EvEmitter;

} ) );

},{}],"SpQD":[function(require,module,exports) {
var define;
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

},{}],"PmK6":[function(require,module,exports) {
var global = arguments[3];
/**
 * Fizzy UI utils v3.0.0
 * MIT license
 */

( function( global, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory( global );
  } else {
    // browser global
    global.fizzyUIUtils = factory( global );
  }

}( this, function factory( global ) {

let utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  return Object.assign( a, b );
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  // use object if already an array
  if ( Array.isArray( obj ) ) return obj;

  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) return [];

  let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  // convert nodeList to array
  if ( isArrayLike ) return [ ...obj ];

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  let index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( elem.matches( selector ) ) return elem;
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );

  return elems
    // check that elem is an actual element
    .filter( ( elem ) => elem instanceof HTMLElement )
    .reduce( ( ffElems, elem ) => {
      // add elem if no selector
      if ( !selector ) {
        ffElems.push( elem );
        return ffElems;
      }
      // filter & find items if we have a selector
      // filter
      if ( elem.matches( selector ) ) {
        ffElems.push( elem );
      }
      // find children
      let childElems = elem.querySelectorAll( selector );
      // concat childElems to filterFound array
      ffElems = ffElems.concat( ...childElems );
      return ffElems;
    }, [] );
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  let method = _class.prototype[ methodName ];
  let timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    clearTimeout( this[ timeoutName ] );

    let args = arguments;
    this[ timeoutName ] = setTimeout( () => {
      method.apply( this, args );
      delete this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( onDocReady ) {
  let readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( onDocReady );
  } else {
    document.addEventListener( 'DOMContentLoaded', onDocReady );
  }
};

// ----- htmlInit ----- //

// http://bit.ly/3oYLusc
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  } ).toLowerCase();
};

let console = global.console;

// allow user to initialize classes via [data-namespace] or .js-namespace class
// htmlInit( Widget, 'widgetName' )
// options are parsed from data-namespace-options
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    let dashedNamespace = utils.toDashed( namespace );
    let dataAttr = 'data-' + dashedNamespace;
    let dataAttrElems = document.querySelectorAll( `[${dataAttr}]` );
    let jQuery = global.jQuery;

    [ ...dataAttrElems ].forEach( ( elem ) => {
      let attr = elem.getAttribute( dataAttr );
      let options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( `Error parsing ${dataAttr} on ${elem.className}: ${error}` );
        }
        return;
      }
      // initialize
      let instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    } );

  } );
};

// -----  ----- //

return utils;

} ) );

},{}],"ElFt":[function(require,module,exports) {
var define;
var global = arguments[3];
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

},{}],"wQ9p":[function(require,module,exports) {
var define;
/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

},{"desandro-matches-selector":"PZ9L"}],"molc":[function(require,module,exports) {
var define;
/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( [
        'ev-emitter/ev-emitter',
        'get-size/get-size'
      ],
      factory
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property',
  transitionDelay: transitionProperty + 'Delay'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseFloat( xValue );
  var y = parseFloat( yValue );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  if ( xValue.indexOf('%') != -1 ) {
    x = ( x / 100 ) * layoutSize.width;
  }
  if ( yValue.indexOf('%') != -1 ) {
    y = ( y / 100 ) * layoutSize.height;
  }
  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var didNotMove = x == this.position.x && y == this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseFloat( x );
  this.position.y = parseFloat( y );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // munge number to millisecond, to match stagger
  var duration = this.layout.options.transitionDuration;
  duration = typeof duration == 'number' ? duration + 'ms' : duration;
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: duration,
    transitionDelay: this.staggerDelay || 0
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: '',
  transitionDelay: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- stagger ----- //

proto.stagger = function( delay ) {
  delay = isNaN( delay ) ? 0 : delay;
  this.staggerDelay = delay + 'ms';
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

},{"ev-emitter":"ElFt","get-size":"SpQD"}],"k1dT":[function(require,module,exports) {
var define;
/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( [
        'ev-emitter/ev-emitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  this.updateStagger();
  queue.forEach( function( obj, i ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant, i );
  }, this );
};

// set stagger from option in milliseconds number
proto.updateStagger = function() {
  var stagger = this.options.stagger;
  if ( stagger === null || stagger === undefined ) {
    this.stagger = 0;
    return;
  }
  this.stagger = getMilliseconds( stagger );
  return this.stagger;
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant, i ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.stagger( i * this.stagger );
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  var stagger = this.updateStagger();
  items.forEach( function( item, i ) {
    item.stagger( i * stagger );
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- helpers ----- //

// how many milliseconds are in each unit
var msUnits = {
  ms: 1,
  s: 1000
};

// munge time-like parameter into millisecond number
// '0.4s' -> 40
function getMilliseconds( time ) {
  if ( typeof time == 'number' ) {
    return time;
  }
  var matches = time.match( /(^\d*\.?\d*)(\w*)/ );
  var num = matches && matches[1];
  var unit = matches && matches[2];
  if ( !num.length ) {
    return 0;
  }
  num = parseFloat( num );
  var mult = msUnits[ unit ] || 1;
  return num * mult;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));

},{"ev-emitter":"ElFt","get-size":"SpQD","fizzy-ui-utils":"wQ9p","./item":"molc"}],"yKV9":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Locomotive Scroll */
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).LocomotiveScroll = e();
}(this, function () {
  "use strict";

  function s(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function n(t, e) {
    for (var i = 0; i < e.length; i++) {
      var s = e[i];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
    }
  }

  function o(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t;
  }

  function e(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      t && (s = s.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, s);
    }

    return i;
  }

  function i(n) {
    for (var t = 1; t < arguments.length; t++) {
      var o = null != arguments[t] ? arguments[t] : {};
      t % 2 ? e(Object(o), !0).forEach(function (t) {
        var e, i, s;
        e = n, s = o[i = t], i in e ? Object.defineProperty(e, i, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[i] = s;
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : e(Object(o)).forEach(function (t) {
        Object.defineProperty(n, t, Object.getOwnPropertyDescriptor(o, t));
      });
    }

    return n;
  }

  function l(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), e && a(t, e);
  }

  function r(t) {
    return (r = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }

  function a(t, e) {
    return (a = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function c(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }

  function h(t, e) {
    return !e || "object" != _typeof(e) && "function" != typeof e ? c(t) : e;
  }

  function u(t, e, i) {
    return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, i) {
      var s = function (t, e) {
        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = r(t));) {
          ;
        }

        return t;
      }(t, e);

      if (s) {
        var n = Object.getOwnPropertyDescriptor(s, e);
        return n.get ? n.get.call(i) : n.value;
      }
    })(t, e, i || t);
  }

  function p(t) {
    return function (t) {
      if (Array.isArray(t)) {
        for (var e = 0, i = new Array(t.length); e < t.length; e++) {
          i[e] = t[e];
        }

        return i;
      }
    }(t) || function (t) {
      if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
    }(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  var f = {
    el: document,
    elMobile: document,
    name: "scroll",
    offset: [0, 0],
    repeat: !1,
    smooth: !1,
    smoothMobile: !1,
    direction: "vertical",
    inertia: 1,
    class: "is-inview",
    scrollbarClass: "c-scrollbar",
    scrollingClass: "has-scroll-scrolling",
    draggingClass: "has-scroll-dragging",
    smoothClass: "has-scroll-smooth",
    initClass: "has-scroll-init",
    getSpeed: !1,
    getDirection: !1,
    firefoxMultiplier: 50,
    touchMultiplier: 2
  },
      d = function () {
    function e() {
      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      s(this, e), window.scrollTo(0, 0), Object.assign(this, f, t), this.namespace = "locomotive", this.html = document.documentElement, this.windowHeight = window.innerHeight, this.windowMiddle = this.windowHeight / 2, this.els = [], this.listeners = {}, this.hasScrollTicking = !1, this.hasCallEventSet = !1, this.checkScroll = this.checkScroll.bind(this), this.checkResize = this.checkResize.bind(this), this.checkEvent = this.checkEvent.bind(this), this.instance = {
        scroll: {
          x: 0,
          y: 0
        },
        limit: this.html.offsetHeight
      }, this.getDirection && (this.instance.direction = null), this.getDirection && (this.instance.speed = 0), this.html.classList.add(this.initClass), window.addEventListener("resize", this.checkResize, !1);
    }

    return o(e, [{
      key: "init",
      value: function value() {
        this.initEvents();
      }
    }, {
      key: "checkScroll",
      value: function value() {
        this.dispatchScroll();
      }
    }, {
      key: "checkResize",
      value: function value() {
        var t = this;
        this.resizeTick || (this.resizeTick = !0, requestAnimationFrame(function () {
          t.resize(), t.resizeTick = !1;
        }));
      }
    }, {
      key: "resize",
      value: function value() {}
    }, {
      key: "initEvents",
      value: function value() {
        var e = this;
        this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]")), this.setScrollTo = this.setScrollTo.bind(this), this.scrollToEls.forEach(function (t) {
          t.addEventListener("click", e.setScrollTo, !1);
        });
      }
    }, {
      key: "setScrollTo",
      value: function value(t) {
        t.preventDefault(), this.scrollTo(t.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t.currentTarget.getAttribute("href"), t.currentTarget.getAttribute("data-".concat(this.name, "-offset")));
      }
    }, {
      key: "addElements",
      value: function value() {}
    }, {
      key: "detectElements",
      value: function value(i) {
        var s = this,
            n = this.instance.scroll.y,
            o = n + this.windowHeight;
        this.els.forEach(function (t, e) {
          !t || t.inView && !i || o >= t.top && n < t.bottom && s.setInView(t, e), t && t.inView && (o < t.top || n > t.bottom) && s.setOutOfView(t, e);
        }), this.els = this.els.filter(function (t, e) {
          return null !== t;
        }), this.hasScrollTicking = !1;
      }
    }, {
      key: "setInView",
      value: function value(t, e) {
        this.els[e].inView = !0, t.el.classList.add(t.class), t.call && this.hasCallEventSet && (this.dispatchCall(t, "enter"), t.repeat || (this.els[e].call = !1)), t.repeat || t.speed || t.sticky || (!t.call || t.call && this.hasCallEventSet) && (this.els[e] = null);
      }
    }, {
      key: "setOutOfView",
      value: function value(t, e) {
        (t.repeat || void 0 !== t.speed) && (this.els[e].inView = !1), t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"), t.repeat && t.el.classList.remove(t.class);
      }
    }, {
      key: "dispatchCall",
      value: function value(t, e) {
        this.callWay = e, this.callValue = t.call.split(",").map(function (t) {
          return t.trim();
        }), this.callObj = t, 1 == this.callValue.length && (this.callValue = this.callValue[0]);
        var i = new Event(this.namespace + "call");
        this.el.dispatchEvent(i);
      }
    }, {
      key: "dispatchScroll",
      value: function value() {
        var t = new Event(this.namespace + "scroll");
        this.el.dispatchEvent(t);
      }
    }, {
      key: "setEvents",
      value: function value(t, e) {
        this.listeners[t] || (this.listeners[t] = []);
        var i = this.listeners[t];
        i.push(e), 1 === i.length && this.el.addEventListener(this.namespace + t, this.checkEvent, !1), "call" === t && (this.hasCallEventSet = !0, this.detectElements(!0));
      }
    }, {
      key: "unsetEvents",
      value: function value(t, e) {
        if (this.listeners[t]) {
          var i = this.listeners[t],
              s = i.indexOf(e);
          s < 0 || (i.splice(s, 1), 0 === i.index && this.el.removeEventListener(this.namespace + t, this.checkEvent, !1));
        }
      }
    }, {
      key: "checkEvent",
      value: function value(t) {
        var e = this,
            i = t.type.replace(this.namespace, ""),
            s = this.listeners[i];
        s && 0 !== s.length && s.forEach(function (t) {
          switch (i) {
            case "scroll":
              return t(e.instance);

            case "call":
              return t(e.callValue, e.callWay, e.callObj);

            default:
              return t();
          }
        });
      }
    }, {
      key: "startScroll",
      value: function value() {}
    }, {
      key: "stopScroll",
      value: function value() {}
    }, {
      key: "setScroll",
      value: function value(t, e) {
        this.instance.scroll = {
          x: 0,
          y: 0
        };
      }
    }, {
      key: "destroy",
      value: function value() {
        var e = this;
        window.removeEventListener("resize", this.checkResize, !1), Object.keys(this.listeners).forEach(function (t) {
          e.el.removeEventListener(e.namespace + t, e.checkEvent, !1);
        }), this.listeners = {}, this.scrollToEls.forEach(function (t) {
          t.removeEventListener("click", e.setScrollTo, !1);
        });
      }
    }]), e;
  }(),
      y = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

  function t(t, e) {
    return t(e = {
      exports: {}
    }, e.exports), e.exports;
  }

  var v = t(function (t, e) {
    t.exports = {
      polyfill: function polyfill() {
        var a = window,
            c = document;

        if (!("scrollBehavior" in c.documentElement.style && !0 !== a.__forceSmoothScrollPolyfill__)) {
          var t,
              e = a.HTMLElement || a.Element,
              l = 468,
              h = {
            scroll: a.scroll || a.scrollTo,
            scrollBy: a.scrollBy,
            elementScroll: e.prototype.scroll || f,
            scrollIntoView: e.prototype.scrollIntoView
          },
              u = a.performance && a.performance.now ? a.performance.now.bind(a.performance) : Date.now,
              i = (t = a.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(t) ? 1 : 0);
          a.scroll = a.scrollTo = function () {
            void 0 !== arguments[0] && (!0 !== s(arguments[0]) ? r.call(a, c.body, void 0 !== arguments[0].left ? ~~arguments[0].left : a.scrollX || a.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : a.scrollY || a.pageYOffset) : h.scroll.call(a, void 0 !== arguments[0].left ? arguments[0].left : "object" != _typeof(arguments[0]) ? arguments[0] : a.scrollX || a.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : a.scrollY || a.pageYOffset));
          }, a.scrollBy = function () {
            void 0 !== arguments[0] && (s(arguments[0]) ? h.scrollBy.call(a, void 0 !== arguments[0].left ? arguments[0].left : "object" != _typeof(arguments[0]) ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : r.call(a, c.body, ~~arguments[0].left + (a.scrollX || a.pageXOffset), ~~arguments[0].top + (a.scrollY || a.pageYOffset)));
          }, e.prototype.scroll = e.prototype.scrollTo = function () {
            if (void 0 !== arguments[0]) if (!0 !== s(arguments[0])) {
              var t = arguments[0].left,
                  e = arguments[0].top;
              r.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e);
            } else {
              if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
              h.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != _typeof(arguments[0]) ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop);
            }
          }, e.prototype.scrollBy = function () {
            void 0 !== arguments[0] && (!0 !== s(arguments[0]) ? this.scroll({
              left: ~~arguments[0].left + this.scrollLeft,
              top: ~~arguments[0].top + this.scrollTop,
              behavior: arguments[0].behavior
            }) : h.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop));
          }, e.prototype.scrollIntoView = function () {
            if (!0 !== s(arguments[0])) {
              var t = function (t) {
                for (; t !== c.body && !1 === (i = n(e = t, "Y") && o(e, "Y"), s = n(e, "X") && o(e, "X"), i || s);) {
                  t = t.parentNode || t.host;
                }

                var e, i, s;
                return t;
              }(this),
                  e = t.getBoundingClientRect(),
                  i = this.getBoundingClientRect();

              t !== c.body ? (r.call(this, t, t.scrollLeft + i.left - e.left, t.scrollTop + i.top - e.top), "fixed" !== a.getComputedStyle(t).position && a.scrollBy({
                left: e.left,
                top: e.top,
                behavior: "smooth"
              })) : a.scrollBy({
                left: i.left,
                top: i.top,
                behavior: "smooth"
              });
            } else h.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
          };
        }

        function f(t, e) {
          this.scrollLeft = t, this.scrollTop = e;
        }

        function s(t) {
          if (null === t || "object" != _typeof(t) || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
          if ("object" == _typeof(t) && "smooth" === t.behavior) return !1;
          throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.");
        }

        function n(t, e) {
          return "Y" === e ? t.clientHeight + i < t.scrollHeight : "X" === e ? t.clientWidth + i < t.scrollWidth : void 0;
        }

        function o(t, e) {
          var i = a.getComputedStyle(t, null)["overflow" + e];
          return "auto" === i || "scroll" === i;
        }

        function d(t) {
          var e,
              i,
              s,
              n,
              o = (u() - t.startTime) / l;
          n = o = 1 < o ? 1 : o, e = .5 * (1 - Math.cos(Math.PI * n)), i = t.startX + (t.x - t.startX) * e, s = t.startY + (t.y - t.startY) * e, t.method.call(t.scrollable, i, s), i === t.x && s === t.y || a.requestAnimationFrame(d.bind(a, t));
        }

        function r(t, e, i) {
          var s,
              n,
              o,
              l,
              r = u();
          l = t === c.body ? (n = (s = a).scrollX || a.pageXOffset, o = a.scrollY || a.pageYOffset, h.scroll) : (n = (s = t).scrollLeft, o = t.scrollTop, f), d({
            scrollable: s,
            method: l,
            startTime: r,
            startX: n,
            startY: o,
            x: e,
            y: i
          });
        }
      }
    };
  }),
      m = (v.polyfill, function (t) {
    function i() {
      var t,
          e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      return s(this, i), t = h(this, r(i).call(this, e)), window.addEventListener("scroll", t.checkScroll, !1), v.polyfill(), t;
    }

    return l(i, d), o(i, [{
      key: "init",
      value: function value() {
        this.instance.scroll.y = window.pageYOffset, this.addElements(), this.detectElements(), u(r(i.prototype), "init", this).call(this);
      }
    }, {
      key: "checkScroll",
      value: function value() {
        var t = this;
        u(r(i.prototype), "checkScroll", this).call(this), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.timestamp = Date.now()), this.instance.scroll.y = window.pageYOffset, this.els.length && (this.hasScrollTicking || (requestAnimationFrame(function () {
          t.detectElements();
        }), this.hasScrollTicking = !0));
      }
    }, {
      key: "addDirection",
      value: function value() {
        window.pageYOffset > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : window.pageYOffset < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up");
      }
    }, {
      key: "addSpeed",
      value: function value() {
        window.pageYOffset != this.instance.scroll.y ? this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / (Date.now() - this.timestamp) : this.instance.speed = 0;
      }
    }, {
      key: "resize",
      value: function value() {
        this.els.length && (this.windowHeight = window.innerHeight, this.updateElements());
      }
    }, {
      key: "addElements",
      value: function value() {
        var h = this;
        this.els = [], this.el.querySelectorAll("[data-" + this.name + "]").forEach(function (t, e) {
          var i = t.dataset[h.name + "Class"] || h.class,
              s = t.getBoundingClientRect().top + h.instance.scroll.y,
              n = s + t.offsetHeight,
              o = "string" == typeof t.dataset[h.name + "Offset"] ? t.dataset[h.name + "Offset"].split(",") : h.offset,
              l = t.dataset[h.name + "Repeat"],
              r = t.dataset[h.name + "Call"];
          l = "false" != l && (null != l || h.repeat);
          var a = h.getRelativeOffset(o),
              c = {
            el: t,
            id: e,
            class: i,
            top: s + a[0],
            bottom: n - a[1],
            offset: o,
            repeat: l,
            inView: !1,
            call: r
          };
          h.els.push(c);
        });
      }
    }, {
      key: "updateElements",
      value: function value() {
        var o = this;
        this.els.forEach(function (t, e) {
          var i = t.el.getBoundingClientRect().top + o.instance.scroll.y,
              s = i + t.el.offsetHeight,
              n = o.getRelativeOffset(t.offset);
          o.els[e].top = i + n[0], o.els[e].bottom = s - n[1];
        }), this.hasScrollTicking = !1;
      }
    }, {
      key: "getRelativeOffset",
      value: function value(t) {
        var e = [0, 0];
        if (t) for (var i = 0; i < t.length; i++) {
          "string" == typeof t[i] ? t[i].includes("%") ? e[i] = parseInt(t[i].replace("%", "") * this.windowHeight / 100) : e[i] = parseInt(t[i]) : e[i] = t[i];
        }
        return e;
      }
    }, {
      key: "scrollTo",
      value: function value(t, e) {
        var i,
            s = e ? parseInt(e) : 0;

        if ("string" == typeof t) {
          if ("top" === t) i = this.html;else if ("bottom" === t) i = this.html.offsetHeight - window.innerHeight;else if (!(i = document.querySelector(t))) return;
        } else if ("number" == typeof t) i = parseInt(t);else {
          if (!t || !t.tagName) return void console.warn("`targetOption` parameter is not valid");
          i = t;
        }

        s = "number" != typeof i ? i.getBoundingClientRect().top + s + this.instance.scroll.y : i + s, window.scrollTo({
          top: s,
          behavior: "smooth"
        });
      }
    }, {
      key: "update",
      value: function value() {
        this.addElements(), this.detectElements();
      }
    }, {
      key: "destroy",
      value: function value() {
        u(r(i.prototype), "destroy", this).call(this), window.removeEventListener("scroll", this.checkScroll, !1);
      }
    }]), i;
  }()),
      g = Object.getOwnPropertySymbols,
      w = Object.prototype.hasOwnProperty,
      b = Object.prototype.propertyIsEnumerable;
  var S = function () {
    try {
      if (!Object.assign) return !1;
      var t = new String("abc");
      if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;

      for (var e = {}, i = 0; i < 10; i++) {
        e["_" + String.fromCharCode(i)] = i;
      }

      if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
        return e[t];
      }).join("")) return !1;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function (t) {
        s[t] = t;
      }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, s)).join("");
    } catch (t) {
      return !1;
    }
  }() ? Object.assign : function (t, e) {
    for (var i, s, n = function (t) {
      if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
      return Object(t);
    }(t), o = 1; o < arguments.length; o++) {
      for (var l in i = Object(arguments[o])) {
        w.call(i, l) && (n[l] = i[l]);
      }

      if (g) {
        s = g(i);

        for (var r = 0; r < s.length; r++) {
          b.call(i, s[r]) && (n[s[r]] = i[s[r]]);
        }
      }
    }

    return n;
  };

  function k() {}

  k.prototype = {
    on: function on(t, e, i) {
      var s = this.e || (this.e = {});
      return (s[t] || (s[t] = [])).push({
        fn: e,
        ctx: i
      }), this;
    },
    once: function once(t, e, i) {
      var s = this;

      function n() {
        s.off(t, n), e.apply(i, arguments);
      }

      return n._ = e, this.on(t, n, i);
    },
    emit: function emit(t) {
      for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), s = 0, n = i.length; s < n; s++) {
        i[s].fn.apply(i[s].ctx, e);
      }

      return this;
    },
    off: function off(t, e) {
      var i = this.e || (this.e = {}),
          s = i[t],
          n = [];
      if (s && e) for (var o = 0, l = s.length; o < l; o++) {
        s[o].fn !== e && s[o].fn._ !== e && n.push(s[o]);
      }
      return n.length ? i[t] = n : delete i[t], this;
    }
  };
  var T = k,
      E = t(function (t, e) {
    (function () {
      (null !== e ? e : this).Lethargy = function () {
        function t(t, e, i, s) {
          this.stability = null != t ? Math.abs(t) : 8, this.sensitivity = null != e ? 1 + Math.abs(e) : 100, this.tolerance = null != i ? 1 + Math.abs(i) : 1.1, this.delay = null != s ? s : 150, this.lastUpDeltas = function () {
            var t, e, i;

            for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--) {
              i.push(null);
            }

            return i;
          }.call(this), this.lastDownDeltas = function () {
            var t, e, i;

            for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--) {
              i.push(null);
            }

            return i;
          }.call(this), this.deltasTimestamp = function () {
            var t, e, i;

            for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : e <= t; 1 <= e ? t++ : t--) {
              i.push(null);
            }

            return i;
          }.call(this);
        }

        return t.prototype.check = function (t) {
          var e;
          return null != (t = t.originalEvent || t).wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), 0 < e ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1));
        }, t.prototype.isInertia = function (t) {
          var e, i, s, n, o, l, r;
          return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (s = e.slice(0, this.stability), i = e.slice(this.stability, 2 * this.stability), r = s.reduce(function (t, e) {
            return t + e;
          }), o = i.reduce(function (t, e) {
            return t + e;
          }), l = r / s.length, n = o / i.length, Math.abs(l) < Math.abs(n * this.tolerance) && this.sensitivity < Math.abs(n) && t);
        }, t.prototype.showLastUpDeltas = function () {
          return this.lastUpDeltas;
        }, t.prototype.showLastDownDeltas = function () {
          return this.lastDownDeltas;
        }, t;
      }();
    }).call(y);
  }),
      O = {
    hasWheelEvent: "onwheel" in document,
    hasMouseWheelEvent: "onmousewheel" in document,
    hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
    hasTouchWin: navigator.msMaxTouchPoints && 1 < navigator.msMaxTouchPoints,
    hasPointer: !!window.navigator.msPointerEnabled,
    hasKeyDown: "onkeydown" in document,
    isFirefox: -1 < navigator.userAgent.indexOf("Firefox")
  },
      D = Object.prototype.toString,
      L = Object.prototype.hasOwnProperty;

  function _(t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  }

  var M = E.Lethargy,
      x = "virtualscroll",
      C = P,
      j = 37,
      H = 38,
      B = 39,
      Y = 40,
      A = 32;

  function P(t) {
    !function (t) {
      if (!t) return console.warn("bindAll requires at least one argument.");
      var e = Array.prototype.slice.call(arguments, 1);
      if (0 === e.length) for (var i in t) {
        L.call(t, i) && "function" == typeof t[i] && "[object Function]" == D.call(t[i]) && e.push(i);
      }

      for (var s = 0; s < e.length; s++) {
        var n = e[s];
        t[n] = _(t[n], t);
      }
    }(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"), this.el = window, t && t.el && (this.el = t.el, delete t.el), this.options = S({
      mouseMultiplier: 1,
      touchMultiplier: 2,
      firefoxMultiplier: 15,
      keyStep: 120,
      preventTouch: !1,
      unpreventTouchClass: "vs-touchmove-allowed",
      limitInertia: !1,
      useKeyboard: !0,
      useTouch: !0
    }, t), this.options.limitInertia && (this._lethargy = new M()), this._emitter = new T(), this._event = {
      y: 0,
      x: 0,
      deltaX: 0,
      deltaY: 0
    }, this.touchStartX = null, this.touchStartY = null, this.bodyTouchAction = null, void 0 !== this.options.passive && (this.listenerOptions = {
      passive: this.options.passive
    });
  }

  function X(t, e, i) {
    return (1 - i) * t + i * e;
  }

  function R(t) {
    var e = {};

    if (window.getComputedStyle) {
      var i = getComputedStyle(t),
          s = i.transform || i.webkitTransform || i.mozTransform,
          n = s.match(/^matrix3d\((.+)\)$/);
      return n ? (e.x = n ? parseFloat(n[1].split(", ")[12]) : 0, e.y = n ? parseFloat(n[1].split(", ")[13]) : 0) : (n = s.match(/^matrix\((.+)\)$/), e.x = n ? parseFloat(n[1].split(", ")[4]) : 0, e.y = n ? parseFloat(n[1].split(", ")[5]) : 0), e;
    }
  }

  function I(t) {
    for (var e = []; t && t !== document; t = t.parentNode) {
      e.push(t);
    }

    return e;
  }

  P.prototype._notify = function (t) {
    var e = this._event;
    e.x += e.deltaX, e.y += e.deltaY, this._emitter.emit(x, {
      x: e.x,
      y: e.y,
      deltaX: e.deltaX,
      deltaY: e.deltaY,
      originalEvent: t
    });
  }, P.prototype._onWheel = function (t) {
    var e = this.options;

    if (!this._lethargy || !1 !== this._lethargy.check(t)) {
      var i = this._event;
      i.deltaX = t.wheelDeltaX || -1 * t.deltaX, i.deltaY = t.wheelDeltaY || -1 * t.deltaY, O.isFirefox && 1 == t.deltaMode && (i.deltaX *= e.firefoxMultiplier, i.deltaY *= e.firefoxMultiplier), i.deltaX *= e.mouseMultiplier, i.deltaY *= e.mouseMultiplier, this._notify(t);
    }
  }, P.prototype._onMouseWheel = function (t) {
    if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
      var e = this._event;
      e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, this._notify(t);
    }
  }, P.prototype._onTouchStart = function (t) {
    var e = t.targetTouches ? t.targetTouches[0] : t;
    this.touchStartX = e.pageX, this.touchStartY = e.pageY;
  }, P.prototype._onTouchMove = function (t) {
    var e = this.options;
    e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
    var i = this._event,
        s = t.targetTouches ? t.targetTouches[0] : t;
    i.deltaX = (s.pageX - this.touchStartX) * e.touchMultiplier, i.deltaY = (s.pageY - this.touchStartY) * e.touchMultiplier, this.touchStartX = s.pageX, this.touchStartY = s.pageY, this._notify(t);
  }, P.prototype._onKeyDown = function (t) {
    var e = this._event;
    e.deltaX = e.deltaY = 0;
    var i = window.innerHeight - 40;

    switch (t.keyCode) {
      case j:
      case H:
        e.deltaY = this.options.keyStep;
        break;

      case B:
      case Y:
        e.deltaY = -this.options.keyStep;
        break;

      case t.shiftKey:
        e.deltaY = i;
        break;

      case A:
        e.deltaY = -i;
        break;

      default:
        return;
    }

    this._notify(t);
  }, P.prototype._bind = function () {
    O.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions), O.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), O.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), O.hasPointer && O.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.el.addEventListener("MSPointerDown", this._onTouchStart, !0), this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)), O.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown);
  }, P.prototype._unbind = function () {
    O.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel), O.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel), O.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)), O.hasPointer && O.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)), O.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown);
  }, P.prototype.on = function (t, e) {
    this._emitter.on(x, t, e);

    var i = this._emitter.e;
    i && i[x] && 1 === i[x].length && this._bind();
  }, P.prototype.off = function (t, e) {
    this._emitter.off(x, t, e);

    var i = this._emitter.e;
    (!i[x] || i[x].length <= 0) && this._unbind();
  }, P.prototype.reset = function () {
    var t = this._event;
    t.x = 0, t.y = 0;
  }, P.prototype.destroy = function () {
    this._emitter.off(), this._unbind();
  };
  var V = 4,
      F = 1e-7,
      W = 10,
      q = "function" == typeof Float32Array;

  function K(t, e) {
    return 1 - 3 * e + 3 * t;
  }

  function z(t, e) {
    return 3 * e - 6 * t;
  }

  function N(t) {
    return 3 * t;
  }

  function U(t, e, i) {
    return ((K(e, i) * t + z(e, i)) * t + N(e)) * t;
  }

  function $(t, e, i) {
    return 3 * K(e, i) * t * t + 2 * z(e, i) * t + N(e);
  }

  function G(t) {
    return t;
  }

  var J = function J(o, e, l, i) {
    if (!(0 <= o && o <= 1 && 0 <= l && l <= 1)) throw new Error("bezier x values must be in [0, 1] range");
    if (o === e && l === i) return G;

    for (var r = q ? new Float32Array(11) : new Array(11), t = 0; t < 11; ++t) {
      r[t] = U(.1 * t, o, l);
    }

    function s(t) {
      for (var e = 0, i = 1; 10 !== i && r[i] <= t; ++i) {
        e += .1;
      }

      var s = e + .1 * ((t - r[--i]) / (r[i + 1] - r[i])),
          n = $(s, o, l);
      return .001 <= n ? function (t, e, i, s) {
        for (var n = 0; n < V; ++n) {
          var o = $(e, i, s);
          if (0 === o) return e;
          e -= (U(e, i, s) - t) / o;
        }

        return e;
      }(t, s, o, l) : 0 === n ? s : function (t, e, i, s, n) {
        for (var o, l, r = 0; 0 < (o = U(l = e + (i - e) / 2, s, n) - t) ? i = l : e = l, Math.abs(o) > F && ++r < W;) {
          ;
        }

        return l;
      }(t, e, e + .1, o, l);
    }

    return function (t) {
      return 0 === t ? 0 : 1 === t ? 1 : U(s(t), e, i);
    };
  },
      Q = 38,
      Z = 40,
      tt = 32,
      et = 9,
      it = 33,
      st = 34,
      nt = 36,
      ot = 35,
      lt = function (t) {
    function n() {
      var t,
          e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      return s(this, n), (t = h(this, r(n).call(this, e))).inertia = .1 * t.inertia, t.isScrolling = !1, t.isDraggingScrollbar = !1, t.isTicking = !1, t.hasScrollTicking = !1, t.parallaxElements = [], t.stop = !1, t.checkKey = t.checkKey.bind(c(t)), window.addEventListener("keydown", t.checkKey, !1), t;
    }

    return l(n, d), o(n, [{
      key: "init",
      value: function value() {
        var e = this;
        this.html.classList.add(this.smoothClass), this.instance = i({
          delta: {
            x: 0,
            y: 0
          }
        }, this.instance), this.vs = new C({
          el: this.el,
          mouseMultiplier: -1 < navigator.platform.indexOf("Win") ? 1 : .4,
          firefoxMultiplier: this.firefoxMultiplier,
          touchMultiplier: this.touchMultiplier,
          useKeyboard: !1,
          passive: !0
        }), this.vs.on(function (t) {
          e.stop || (e.isTicking || e.isDraggingScrollbar || (requestAnimationFrame(function () {
            e.isScrolling || e.startScrolling(), e.updateDelta(t);
          }), e.isTicking = !0), e.isTicking = !1);
        }), this.setScrollLimit(), this.initScrollBar(), this.addSections(), this.addElements(), this.detectElements(), this.transformElements(!0), this.checkScroll(!0), u(r(n.prototype), "init", this).call(this);
      }
    }, {
      key: "setScrollLimit",
      value: function value() {
        this.instance.limit = this.el.offsetHeight - this.windowHeight;
      }
    }, {
      key: "startScrolling",
      value: function value() {
        this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass);
      }
    }, {
      key: "stopScrolling",
      value: function value() {
        this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf), this.scrollToRaf = null), this.isScrolling = !1, this.instance.scroll.y = Math.round(this.instance.scroll.y), this.html.classList.remove(this.scrollingClass);
      }
    }, {
      key: "checkKey",
      value: function value(t) {
        var e = this;
        if (this.stop) t.keyCode == et && requestAnimationFrame(function () {
          e.html.scrollTop = 0, document.body.scrollTop = 0;
        });else {
          switch (t.keyCode) {
            case et:
              requestAnimationFrame(function () {
                e.html.scrollTop = 0, document.body.scrollTop = 0, e.scrollTo(document.activeElement, -window.innerHeight / 2);
              });
              break;

            case Q:
              this.instance.delta.y -= 240;
              break;

            case Z:
              this.instance.delta.y += 240;
              break;

            case it:
              this.instance.delta.y -= window.innerHeight;
              break;

            case st:
              this.instance.delta.y += window.innerHeight;
              break;

            case nt:
              this.instance.delta.y -= this.instance.limit;
              break;

            case ot:
              this.instance.delta.y += this.instance.limit;
              break;

            case tt:
              document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || (t.shiftKey ? this.instance.delta.y -= window.innerHeight : this.instance.delta.y += window.innerHeight);
              break;

            default:
              return;
          }

          this.instance.delta.y < 0 && (this.instance.delta.y = 0), this.instance.delta.y > this.instance.limit && (this.instance.delta.y = this.instance.limit), this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass);
        }
      }
    }, {
      key: "checkScroll",
      value: function value() {
        var t = this;

        if (0 < arguments.length && void 0 !== arguments[0] && arguments[0] || this.isScrolling || this.isDraggingScrollbar) {
          this.hasScrollTicking || (requestAnimationFrame(function () {
            return t.checkScroll();
          }), this.hasScrollTicking = !0);
          var e = Math.abs(this.instance.delta.y - this.instance.scroll.y);
          !this.animatingScroll && (e < .5 && 0 != this.instance.delta.y || e < .5 && 0 == this.instance.delta.y) && this.stopScrolling(), this.updateScroll();

          for (var i = this.sections.length - 1; 0 <= i; i--) {
            this.sections[i].persistent || this.instance.scroll.y > this.sections[i].offset && this.instance.scroll.y < this.sections[i].limit ? (this.transform(this.sections[i].el, 0, -this.instance.scroll.y), this.sections[i].inView || (this.sections[i].inView = !0, this.sections[i].el.style.opacity = 1, this.sections[i].el.style.pointerEvents = "all", this.sections[i].el.setAttribute("data-".concat(this.name, "-section-inview"), ""))) : (this.sections[i].inView && (this.sections[i].inView = !1, this.sections[i].el.style.opacity = 0, this.sections[i].el.style.pointerEvents = "none", this.sections[i].el.removeAttribute("data-".concat(this.name, "-section-inview"))), this.transform(this.sections[i].el, 0, 0));
          }

          this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.timestamp = Date.now()), this.detectElements(), this.transformElements();
          var s = this.instance.scroll.y / this.instance.limit * this.scrollBarLimit;
          this.transform(this.scrollbarThumb, 0, s), u(r(n.prototype), "checkScroll", this).call(this), this.hasScrollTicking = !1;
        }
      }
    }, {
      key: "resize",
      value: function value() {
        this.windowHeight = window.innerHeight, this.windowMiddle = this.windowHeight / 2, this.update();
      }
    }, {
      key: "updateDelta",
      value: function value(t) {
        this.instance.delta.y -= t.deltaY, this.instance.delta.y < 0 && (this.instance.delta.y = 0), this.instance.delta.y > this.instance.limit && (this.instance.delta.y = this.instance.limit);
      }
    }, {
      key: "updateScroll",
      value: function value(t) {
        this.isScrolling || this.isDraggingScrollbar ? this.instance.scroll.y = X(this.instance.scroll.y, this.instance.delta.y, this.inertia) : this.instance.scroll.y > this.instance.limit ? this.setScroll(this.instance.scroll.x, this.instance.limit) : this.instance.scroll.y < 0 ? this.setScroll(this.instance.scroll.x, 0) : this.setScroll(this.instance.scroll.x, this.instance.delta.y);
      }
    }, {
      key: "addDirection",
      value: function value() {
        this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up");
      }
    }, {
      key: "addSpeed",
      value: function value() {
        this.instance.delta.y != this.instance.scroll.y ? this.instance.speed = (this.instance.delta.y - this.instance.scroll.y) / (Date.now() - this.timestamp) : this.instance.speed = 0;
      }
    }, {
      key: "initScrollBar",
      value: function value() {
        this.scrollbar = document.createElement("span"), this.scrollbarThumb = document.createElement("span"), this.scrollbar.classList.add("".concat(this.scrollbarClass)), this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")), this.scrollbar.append(this.scrollbarThumb), document.body.append(this.scrollbar), this.scrollbarHeight = this.scrollbar.getBoundingClientRect().height, this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit + this.scrollbarHeight), "px"), this.scrollBarLimit = this.scrollbarHeight - this.scrollbarThumb.getBoundingClientRect().height, this.getScrollBar = this.getScrollBar.bind(this), this.releaseScrollBar = this.releaseScrollBar.bind(this), this.moveScrollBar = this.moveScrollBar.bind(this), this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar), window.addEventListener("mouseup", this.releaseScrollBar), window.addEventListener("mousemove", this.moveScrollBar);
      }
    }, {
      key: "reinitScrollBar",
      value: function value() {
        this.scrollbarHeight = this.scrollbar.getBoundingClientRect().height, this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit + this.scrollbarHeight), "px"), this.scrollBarLimit = this.scrollbarHeight - this.scrollbarThumb.getBoundingClientRect().height;
      }
    }, {
      key: "destroyScrollBar",
      value: function value() {
        this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar), window.removeEventListener("mouseup", this.releaseScrollBar), window.removeEventListener("mousemove", this.moveScrollBar), this.scrollbar.remove();
      }
    }, {
      key: "getScrollBar",
      value: function value(t) {
        this.isDraggingScrollbar = !0, this.checkScroll(), this.html.classList.remove(this.scrollingClass), this.html.classList.add(this.draggingClass);
      }
    }, {
      key: "releaseScrollBar",
      value: function value(t) {
        this.isDraggingScrollbar = !1, this.html.classList.add(this.scrollingClass), this.html.classList.remove(this.draggingClass);
      }
    }, {
      key: "moveScrollBar",
      value: function value(e) {
        var i = this;
        !this.isTicking && this.isDraggingScrollbar && (requestAnimationFrame(function () {
          var t = 100 * e.clientY / i.scrollbarHeight * i.instance.limit / 100;
          0 < t && t < i.instance.limit && (i.instance.delta.y = t);
        }), this.isTicking = !0), this.isTicking = !1;
      }
    }, {
      key: "addElements",
      value: function value() {
        var k = this;
        this.els = [], this.parallaxElements = [], this.sections.forEach(function (t, S) {
          k.sections[S].el.querySelectorAll("[data-".concat(k.name, "]")).forEach(function (t, e) {
            var i,
                s,
                n = t.dataset[k.name + "Class"] || k.class,
                o = t.dataset[k.name + "Repeat"],
                l = t.dataset[k.name + "Call"],
                r = t.dataset[k.name + "Position"],
                a = t.dataset[k.name + "Delay"],
                c = t.dataset[k.name + "Direction"],
                h = "string" == typeof t.dataset[k.name + "Sticky"],
                u = !!t.dataset[k.name + "Speed"] && parseFloat(t.dataset[k.name + "Speed"]) / 10,
                f = "string" == typeof t.dataset[k.name + "Offset"] ? t.dataset[k.name + "Offset"].split(",") : k.offset,
                d = t.dataset[k.name + "Target"];
            s = void 0 !== d ? document.querySelector("".concat(d)) : t;
            var p = (i = k.sections[S].inView ? s.getBoundingClientRect().top + k.instance.scroll.y - R(s).y : s.getBoundingClientRect().top - R(k.sections[S].el).y - R(s).y) + s.offsetHeight,
                y = (p - i) / 2 + i;

            if (h) {
              var v = t.getBoundingClientRect().top,
                  m = v - i;
              i += window.innerHeight, y = ((p = v + s.offsetHeight - t.offsetHeight - m) - i) / 2 + i;
            }

            o = "false" != o && (null != o || k.repeat);
            var g = [0, 0];
            if (f) for (var w = 0; w < f.length; w++) {
              "string" == typeof f[w] ? f[w].includes("%") ? g[w] = parseInt(f[w].replace("%", "") * k.windowHeight / 100) : g[w] = parseInt(f[w]) : g[w] = f[w];
            }
            var b = {
              el: t,
              id: e,
              class: n,
              top: i + g[0],
              middle: y,
              bottom: p - g[1],
              offset: f,
              repeat: o,
              inView: !1,
              call: l,
              speed: u,
              delay: a,
              position: r,
              target: s,
              direction: c,
              sticky: h
            };
            k.els.push(b), (!1 !== u || h) && k.parallaxElements.push(b);
          });
        });
      }
    }, {
      key: "addSections",
      value: function value() {
        var o = this;
        this.sections = [];
        var t = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
        0 === t.length && (t = [this.el]), t.forEach(function (t, e) {
          var i = t.getBoundingClientRect().top - 1.5 * window.innerHeight - R(t).y,
              s = i + t.getBoundingClientRect().height + 2 * window.innerHeight,
              n = {
            el: t,
            offset: i,
            limit: s,
            inView: !1,
            persistent: "string" == typeof t.dataset[o.name + "Persistent"]
          };
          o.sections[e] = n;
        });
      }
    }, {
      key: "transform",
      value: function value(t, e, i, s) {
        var n;

        if (s) {
          var o = R(t),
              l = X(o.x, e, s),
              r = X(o.y, i, s);
          n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(l, ",").concat(r, ",0,1)");
        } else n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(e, ",").concat(i, ",0,1)");

        t.style.webkitTransform = n, t.style.msTransform = n, t.style.transform = n;
      }
    }, {
      key: "transformElements",
      value: function value(s) {
        var n = this,
            o = this.instance.scroll.y + this.windowHeight,
            l = this.instance.scroll.y + this.windowMiddle;
        this.parallaxElements.forEach(function (t, e) {
          var i = !1;
          if (s && (i = 0), t.inView) switch (t.position) {
            case "top":
              i = n.instance.scroll.y * -t.speed;
              break;

            case "elementTop":
              i = (o - t.top) * -t.speed;
              break;

            case "bottom":
              i = (n.instance.limit - o + n.windowHeight) * t.speed;
              break;

            default:
              i = (l - t.middle) * -t.speed;
          }
          t.sticky && (i = t.inView ? n.instance.scroll.y - t.top + window.innerHeight : n.instance.scroll.y < t.top - window.innerHeight && n.instance.scroll.y < t.top - window.innerHeight / 2 ? 0 : n.instance.scroll.y > t.bottom && n.instance.scroll.y > t.bottom + 100 && t.bottom - t.top + window.innerHeight), !1 !== i && ("horizontal" === t.direction ? n.transform(t.el, i, 0, !s && t.delay) : n.transform(t.el, 0, i, !s && t.delay));
        });
      }
    }, {
      key: "scrollTo",
      value: function value(t, e) {
        var i,
            s = this,
            n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1e3,
            o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : [.25, 0, .35, 1],
            l = e ? parseInt(e) : 0;

        if (o = J.apply(void 0, p(o)), "string" == typeof t) {
          if ("top" === t) i = 0;else if ("bottom" === t) i = this.instance.limit;else if (!(i = document.querySelector(t))) return;
        } else if ("number" == typeof t) i = parseInt(t);else {
          if (!t || !t.tagName) return void console.warn("`targetOption` parameter is not valid");
          i = t;
        }

        if ("number" != typeof i) {
          if (!I(i).includes(this.el)) return;
          var r = i.getBoundingClientRect().top,
              a = I(i).find(function (e) {
            return s.sections.find(function (t) {
              return t.el == e;
            });
          }),
              c = 0;
          a && (c = R(a).y), l = r + l - c;
        } else l = i + l;

        var h = parseFloat(this.instance.delta.y),
            u = Math.max(0, Math.min(l, this.instance.limit)) - h,
            f = function f(t) {
          s.instance.delta.y = h + u * t;
        };

        this.animatingScroll = !0, this.stopScrolling(), this.startScrolling();
        var d = Date.now();
        !function t() {
          var e = (Date.now() - d) / n;
          1 < e ? (f(1), s.animatingScroll = !1) : (s.scrollToRaf = requestAnimationFrame(t), f(o(e)));
        }();
      }
    }, {
      key: "update",
      value: function value() {
        this.setScrollLimit(), this.addSections(), this.addElements(), this.detectElements(), this.updateScroll(), this.transformElements(!0), this.reinitScrollBar(), this.checkScroll(!0);
      }
    }, {
      key: "startScroll",
      value: function value() {
        this.stop = !1;
      }
    }, {
      key: "stopScroll",
      value: function value() {
        this.stop = !0;
      }
    }, {
      key: "setScroll",
      value: function value(t, e) {
        this.instance = i({}, this.instance, {
          scroll: {
            x: t,
            y: e
          },
          delta: {
            x: t,
            y: e
          },
          speed: 0
        });
      }
    }, {
      key: "destroy",
      value: function value() {
        u(r(n.prototype), "destroy", this).call(this), this.stopScrolling(), this.html.classList.remove(this.smoothClass), this.vs.destroy(), this.destroyScrollBar(), window.removeEventListener("keydown", this.checkKey, !1);
      }
    }]), n;
  }();

  return function () {
    function e() {
      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      s(this, e), this.options = t, Object.assign(this, f, t), this.init();
    }

    return o(e, [{
      key: "init",
      value: function value() {
        if (this.smoothMobile || (this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints), !0 !== this.smooth || this.isMobile ? this.scroll = new m(this.options) : this.scroll = new lt(this.options), this.scroll.init(), window.location.hash) {
          var t = window.location.hash.slice(1, window.location.hash.length),
              e = document.getElementById(t);
          e && this.scroll.scrollTo(e);
        }
      }
    }, {
      key: "update",
      value: function value() {
        this.scroll.update();
      }
    }, {
      key: "start",
      value: function value() {
        this.scroll.startScroll();
      }
    }, {
      key: "stop",
      value: function value() {
        this.scroll.stopScroll();
      }
    }, {
      key: "scrollTo",
      value: function value(t, e, i, s) {
        this.scroll.scrollTo(t, e, i, s);
      }
    }, {
      key: "setScroll",
      value: function value(t, e) {
        this.scroll.setScroll(t, e);
      }
    }, {
      key: "on",
      value: function value(t, e) {
        this.scroll.setEvents(t, e);
      }
    }, {
      key: "off",
      value: function value(t, e) {
        this.scroll.unsetEvents(t, e);
      }
    }, {
      key: "destroy",
      value: function value() {
        this.scroll.destroy();
      }
    }]), e;
  }();
});
/* Smooth Scrollbar */

!function (t, n) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Scrollbar = n() : t.Scrollbar = n();
}(window, function () {
  return function (t) {
    var n = {};

    function e(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }

    return e.m = t, e.c = n, e.d = function (t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: r
      });
    }, e.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, e.t = function (t, n) {
      if (1 & n && (t = e(t)), 8 & n) return t;
      if (4 & n && "object" == _typeof(t) && t && t.__esModule) return t;
      var r = Object.create(null);
      if (e.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & n && "string" != typeof t) for (var o in t) {
        e.d(r, o, function (n) {
          return t[n];
        }.bind(null, o));
      }
      return r;
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return e.d(n, "a", n), n;
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e.p = "", e(e.s = 58);
  }([function (t, n, e) {
    var r = e(25)("wks"),
        o = e(16),
        i = e(2).Symbol,
        u = "function" == typeof i;
    (t.exports = function (t) {
      return r[t] || (r[t] = u && i[t] || (u ? i : o)("Symbol." + t));
    }).store = r;
  }, function (t, n) {
    t.exports = function (t) {
      return "object" == _typeof(t) ? null !== t : "function" == typeof t;
    };
  }, function (t, n) {
    var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = e);
  }, function (t, n) {
    var e = t.exports = {
      version: "2.6.9"
    };
    "number" == typeof __e && (__e = e);
  }, function (t, n, e) {
    t.exports = !e(13)(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, function (t, n, e) {
    var r = e(2),
        o = e(3),
        i = e(11),
        u = e(6),
        c = e(10),
        s = function s(t, n, e) {
      var a,
          f,
          l,
          p,
          h = t & s.F,
          d = t & s.G,
          v = t & s.S,
          y = t & s.P,
          m = t & s.B,
          g = d ? r : v ? r[n] || (r[n] = {}) : (r[n] || {}).prototype,
          b = d ? o : o[n] || (o[n] = {}),
          x = b.prototype || (b.prototype = {});

      for (a in d && (e = n), e) {
        l = ((f = !h && g && void 0 !== g[a]) ? g : e)[a], p = m && f ? c(l, r) : y && "function" == typeof l ? c(Function.call, l) : l, g && u(g, a, l, t & s.U), b[a] != l && i(b, a, p), y && x[a] != l && (x[a] = l);
      }
    };

    r.core = o, s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s;
  }, function (t, n, e) {
    var r = e(2),
        o = e(11),
        i = e(9),
        u = e(16)("src"),
        c = e(60),
        s = ("" + c).split("toString");
    e(3).inspectSource = function (t) {
      return c.call(t);
    }, (t.exports = function (t, n, e, c) {
      var a = "function" == typeof e;
      a && (i(e, "name") || o(e, "name", n)), t[n] !== e && (a && (i(e, u) || o(e, u, t[n] ? "" + t[n] : s.join(String(n)))), t === r ? t[n] = e : c ? t[n] ? t[n] = e : o(t, n, e) : (delete t[n], o(t, n, e)));
    })(Function.prototype, "toString", function () {
      return "function" == typeof this && this[u] || c.call(this);
    });
  }, function (t, n, e) {
    var r = e(8),
        o = e(41),
        i = e(43),
        u = Object.defineProperty;
    n.f = e(4) ? Object.defineProperty : function (t, n, e) {
      if (r(t), n = i(n, !0), r(e), o) try {
        return u(t, n, e);
      } catch (t) {}
      if ("get" in e || "set" in e) throw TypeError("Accessors not supported!");
      return "value" in e && (t[n] = e.value), t;
    };
  }, function (t, n, e) {
    var r = e(1);

    t.exports = function (t) {
      if (!r(t)) throw TypeError(t + " is not an object!");
      return t;
    };
  }, function (t, n) {
    var e = {}.hasOwnProperty;

    t.exports = function (t, n) {
      return e.call(t, n);
    };
  }, function (t, n, e) {
    var r = e(44);

    t.exports = function (t, n, e) {
      if (r(t), void 0 === n) return t;

      switch (e) {
        case 1:
          return function (e) {
            return t.call(n, e);
          };

        case 2:
          return function (e, r) {
            return t.call(n, e, r);
          };

        case 3:
          return function (e, r, o) {
            return t.call(n, e, r, o);
          };
      }

      return function () {
        return t.apply(n, arguments);
      };
    };
  }, function (t, n, e) {
    var r = e(7),
        o = e(17);
    t.exports = e(4) ? function (t, n, e) {
      return r.f(t, n, o(1, e));
    } : function (t, n, e) {
      return t[n] = e, t;
    };
  }, function (t, n, e) {
    var r = e(1);

    t.exports = function (t, n) {
      if (!r(t) || t._t !== n) throw TypeError("Incompatible receiver, " + n + " required!");
      return t;
    };
  }, function (t, n) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  }, function (t, n) {
    t.exports = {};
  }, function (t, n, e) {
    var r = e(10),
        o = e(49),
        i = e(50),
        u = e(8),
        c = e(19),
        s = e(51),
        a = {},
        f = {};
    (n = t.exports = function (t, n, e, l, p) {
      var h,
          d,
          v,
          y,
          m = p ? function () {
        return t;
      } : s(t),
          g = r(e, l, n ? 2 : 1),
          b = 0;
      if ("function" != typeof m) throw TypeError(t + " is not iterable!");

      if (i(m)) {
        for (h = c(t.length); h > b; b++) {
          if ((y = n ? g(u(d = t[b])[0], d[1]) : g(t[b])) === a || y === f) return y;
        }
      } else for (v = m.call(t); !(d = v.next()).done;) {
        if ((y = o(v, g, d.value, n)) === a || y === f) return y;
      }
    }).BREAK = a, n.RETURN = f;
  }, function (t, n) {
    var e = 0,
        r = Math.random();

    t.exports = function (t) {
      return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + r).toString(36));
    };
  }, function (t, n) {
    t.exports = function (t, n) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: n
      };
    };
  }, function (t, n, e) {
    var r = e(31),
        o = e(28);

    t.exports = function (t) {
      return r(o(t));
    };
  }, function (t, n, e) {
    var r = e(27),
        o = Math.min;

    t.exports = function (t) {
      return t > 0 ? o(r(t), 9007199254740991) : 0;
    };
  }, function (t, n, e) {
    var r = e(28);

    t.exports = function (t) {
      return Object(r(t));
    };
  }, function (t, n, e) {
    var r = e(16)("meta"),
        o = e(1),
        i = e(9),
        u = e(7).f,
        c = 0,
        s = Object.isExtensible || function () {
      return !0;
    },
        a = !e(13)(function () {
      return s(Object.preventExtensions({}));
    }),
        f = function f(t) {
      u(t, r, {
        value: {
          i: "O" + ++c,
          w: {}
        }
      });
    },
        l = t.exports = {
      KEY: r,
      NEED: !1,
      fastKey: function fastKey(t, n) {
        if (!o(t)) return "symbol" == _typeof(t) ? t : ("string" == typeof t ? "S" : "P") + t;

        if (!i(t, r)) {
          if (!s(t)) return "F";
          if (!n) return "E";
          f(t);
        }

        return t[r].i;
      },
      getWeak: function getWeak(t, n) {
        if (!i(t, r)) {
          if (!s(t)) return !0;
          if (!n) return !1;
          f(t);
        }

        return t[r].w;
      },
      onFreeze: function onFreeze(t) {
        return a && l.NEED && s(t) && !i(t, r) && f(t), t;
      }
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(23),
        o = {};
    o[e(0)("toStringTag")] = "z", o + "" != "[object z]" && e(6)(Object.prototype, "toString", function () {
      return "[object " + r(this) + "]";
    }, !0);
  }, function (t, n, e) {
    var r = e(24),
        o = e(0)("toStringTag"),
        i = "Arguments" == r(function () {
      return arguments;
    }());

    t.exports = function (t) {
      var n, e, u;
      return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (e = function (t, n) {
        try {
          return t[n];
        } catch (t) {}
      }(n = Object(t), o)) ? e : i ? r(n) : "Object" == (u = r(n)) && "function" == typeof n.callee ? "Arguments" : u;
    };
  }, function (t, n) {
    var e = {}.toString;

    t.exports = function (t) {
      return e.call(t).slice(8, -1);
    };
  }, function (t, n, e) {
    var r = e(3),
        o = e(2),
        i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
    (t.exports = function (t, n) {
      return i[t] || (i[t] = void 0 !== n ? n : {});
    })("versions", []).push({
      version: r.version,
      mode: e(40) ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    });
  }, function (t, n, e) {
    "use strict";

    var r = e(61)(!0);
    e(29)(String, "String", function (t) {
      this._t = String(t), this._i = 0;
    }, function () {
      var t,
          n = this._t,
          e = this._i;
      return e >= n.length ? {
        value: void 0,
        done: !0
      } : (t = r(n, e), this._i += t.length, {
        value: t,
        done: !1
      });
    });
  }, function (t, n) {
    var e = Math.ceil,
        r = Math.floor;

    t.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t);
    };
  }, function (t, n) {
    t.exports = function (t) {
      if (null == t) throw TypeError("Can't call method on  " + t);
      return t;
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(40),
        o = e(5),
        i = e(6),
        u = e(11),
        c = e(14),
        s = e(62),
        a = e(33),
        f = e(68),
        l = e(0)("iterator"),
        p = !([].keys && "next" in [].keys()),
        h = function h() {
      return this;
    };

    t.exports = function (t, n, e, d, v, y, m) {
      s(e, n, d);

      var g,
          b,
          x,
          _ = function _(t) {
        if (!p && t in O) return O[t];

        switch (t) {
          case "keys":
          case "values":
            return function () {
              return new e(this, t);
            };
        }

        return function () {
          return new e(this, t);
        };
      },
          w = n + " Iterator",
          S = "values" == v,
          E = !1,
          O = t.prototype,
          T = O[l] || O["@@iterator"] || v && O[v],
          A = T || _(v),
          M = v ? S ? _("entries") : A : void 0,
          P = "Array" == n && O.entries || T;

      if (P && (x = f(P.call(new t()))) !== Object.prototype && x.next && (a(x, w, !0), r || "function" == typeof x[l] || u(x, l, h)), S && T && "values" !== T.name && (E = !0, A = function A() {
        return T.call(this);
      }), r && !m || !p && !E && O[l] || u(O, l, A), c[n] = A, c[w] = h, v) if (g = {
        values: S ? A : _("values"),
        keys: y ? A : _("keys"),
        entries: M
      }, m) for (b in g) {
        b in O || i(O, b, g[b]);
      } else o(o.P + o.F * (p || E), n, g);
      return g;
    };
  }, function (t, n, e) {
    var r = e(64),
        o = e(46);

    t.exports = Object.keys || function (t) {
      return r(t, o);
    };
  }, function (t, n, e) {
    var r = e(24);
    t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
      return "String" == r(t) ? t.split("") : Object(t);
    };
  }, function (t, n, e) {
    var r = e(25)("keys"),
        o = e(16);

    t.exports = function (t) {
      return r[t] || (r[t] = o(t));
    };
  }, function (t, n, e) {
    var r = e(7).f,
        o = e(9),
        i = e(0)("toStringTag");

    t.exports = function (t, n, e) {
      t && !o(t = e ? t : t.prototype, i) && r(t, i, {
        configurable: !0,
        value: n
      });
    };
  }, function (t, n, e) {
    for (var r = e(69), o = e(30), i = e(6), u = e(2), c = e(11), s = e(14), a = e(0), f = a("iterator"), l = a("toStringTag"), p = s.Array, h = {
      CSSRuleList: !0,
      CSSStyleDeclaration: !1,
      CSSValueList: !1,
      ClientRectList: !1,
      DOMRectList: !1,
      DOMStringList: !1,
      DOMTokenList: !0,
      DataTransferItemList: !1,
      FileList: !1,
      HTMLAllCollection: !1,
      HTMLCollection: !1,
      HTMLFormElement: !1,
      HTMLSelectElement: !1,
      MediaList: !0,
      MimeTypeArray: !1,
      NamedNodeMap: !1,
      NodeList: !0,
      PaintRequestList: !1,
      Plugin: !1,
      PluginArray: !1,
      SVGLengthList: !1,
      SVGNumberList: !1,
      SVGPathSegList: !1,
      SVGPointList: !1,
      SVGStringList: !1,
      SVGTransformList: !1,
      SourceBufferList: !1,
      StyleSheetList: !0,
      TextTrackCueList: !1,
      TextTrackList: !1,
      TouchList: !1
    }, d = o(h), v = 0; v < d.length; v++) {
      var y,
          m = d[v],
          g = h[m],
          b = u[m],
          x = b && b.prototype;
      if (x && (x[f] || c(x, f, p), x[l] || c(x, l, m), s[m] = p, g)) for (y in r) {
        x[y] || i(x, y, r[y], !0);
      }
    }
  }, function (t, n, e) {
    var r = e(6);

    t.exports = function (t, n, e) {
      for (var o in n) {
        r(t, o, n[o], e);
      }

      return t;
    };
  }, function (t, n) {
    t.exports = function (t, n, e, r) {
      if (!(t instanceof n) || void 0 !== r && r in t) throw TypeError(e + ": incorrect invocation!");
      return t;
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(2),
        o = e(5),
        i = e(6),
        u = e(35),
        c = e(21),
        s = e(15),
        a = e(36),
        f = e(1),
        l = e(13),
        p = e(52),
        h = e(33),
        d = e(73);

    t.exports = function (t, n, e, v, y, m) {
      var g = r[t],
          b = g,
          x = y ? "set" : "add",
          _ = b && b.prototype,
          w = {},
          S = function S(t) {
        var n = _[t];
        i(_, t, "delete" == t ? function (t) {
          return !(m && !f(t)) && n.call(this, 0 === t ? 0 : t);
        } : "has" == t ? function (t) {
          return !(m && !f(t)) && n.call(this, 0 === t ? 0 : t);
        } : "get" == t ? function (t) {
          return m && !f(t) ? void 0 : n.call(this, 0 === t ? 0 : t);
        } : "add" == t ? function (t) {
          return n.call(this, 0 === t ? 0 : t), this;
        } : function (t, e) {
          return n.call(this, 0 === t ? 0 : t, e), this;
        });
      };

      if ("function" == typeof b && (m || _.forEach && !l(function () {
        new b().entries().next();
      }))) {
        var E = new b(),
            O = E[x](m ? {} : -0, 1) != E,
            T = l(function () {
          E.has(1);
        }),
            A = p(function (t) {
          new b(t);
        }),
            M = !m && l(function () {
          for (var t = new b(), n = 5; n--;) {
            t[x](n, n);
          }

          return !t.has(-0);
        });
        A || ((b = n(function (n, e) {
          a(n, b, t);
          var r = d(new g(), n, b);
          return null != e && s(e, y, r[x], r), r;
        })).prototype = _, _.constructor = b), (T || M) && (S("delete"), S("has"), y && S("get")), (M || O) && S(x), m && _.clear && delete _.clear;
      } else b = v.getConstructor(n, t, y, x), u(b.prototype, e), c.NEED = !0;

      return h(b, t), w[t] = b, o(o.G + o.W + o.F * (b != g), w), m || v.setStrong(b, t, y), b;
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(5);

    t.exports = function (t) {
      r(r.S, t, {
        of: function of() {
          for (var t = arguments.length, n = new Array(t); t--;) {
            n[t] = arguments[t];
          }

          return new this(n);
        }
      });
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(5),
        o = e(44),
        i = e(10),
        u = e(15);

    t.exports = function (t) {
      r(r.S, t, {
        from: function from(t) {
          var n,
              e,
              r,
              c,
              s = arguments[1];
          return o(this), (n = void 0 !== s) && o(s), null == t ? new this() : (e = [], n ? (r = 0, c = i(s, arguments[2], 2), u(t, !1, function (t) {
            e.push(c(t, r++));
          })) : u(t, !1, e.push, e), new this(e));
        }
      });
    };
  }, function (t, n) {
    t.exports = !1;
  }, function (t, n, e) {
    t.exports = !e(4) && !e(13)(function () {
      return 7 != Object.defineProperty(e(42)("div"), "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, function (t, n, e) {
    var r = e(1),
        o = e(2).document,
        i = r(o) && r(o.createElement);

    t.exports = function (t) {
      return i ? o.createElement(t) : {};
    };
  }, function (t, n, e) {
    var r = e(1);

    t.exports = function (t, n) {
      if (!r(t)) return t;
      var e, o;
      if (n && "function" == typeof (e = t.toString) && !r(o = e.call(t))) return o;
      if ("function" == typeof (e = t.valueOf) && !r(o = e.call(t))) return o;
      if (!n && "function" == typeof (e = t.toString) && !r(o = e.call(t))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  }, function (t, n) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");
      return t;
    };
  }, function (t, n, e) {
    var r = e(8),
        o = e(63),
        i = e(46),
        u = e(32)("IE_PROTO"),
        c = function c() {},
        _s = function s() {
      var t,
          n = e(42)("iframe"),
          r = i.length;

      for (n.style.display = "none", e(67).appendChild(n), n.src = "javascript:", (t = n.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), _s = t.F; r--;) {
        delete _s.prototype[i[r]];
      }

      return _s();
    };

    t.exports = Object.create || function (t, n) {
      var e;
      return null !== t ? (c.prototype = r(t), e = new c(), c.prototype = null, e[u] = t) : e = _s(), void 0 === n ? e : o(e, n);
    };
  }, function (t, n) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (t, n) {
    t.exports = function (t, n) {
      return {
        value: n,
        done: !!t
      };
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(7).f,
        o = e(45),
        i = e(35),
        u = e(10),
        c = e(36),
        s = e(15),
        a = e(29),
        f = e(47),
        l = e(72),
        p = e(4),
        h = e(21).fastKey,
        d = e(12),
        v = p ? "_s" : "size",
        y = function y(t, n) {
      var e,
          r = h(n);
      if ("F" !== r) return t._i[r];

      for (e = t._f; e; e = e.n) {
        if (e.k == n) return e;
      }
    };

    t.exports = {
      getConstructor: function getConstructor(t, n, e, a) {
        var f = t(function (t, r) {
          c(t, f, n, "_i"), t._t = n, t._i = o(null), t._f = void 0, t._l = void 0, t[v] = 0, null != r && s(r, e, t[a], t);
        });
        return i(f.prototype, {
          clear: function clear() {
            for (var t = d(this, n), e = t._i, r = t._f; r; r = r.n) {
              r.r = !0, r.p && (r.p = r.p.n = void 0), delete e[r.i];
            }

            t._f = t._l = void 0, t[v] = 0;
          },
          delete: function _delete(t) {
            var e = d(this, n),
                r = y(e, t);

            if (r) {
              var o = r.n,
                  i = r.p;
              delete e._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), e._f == r && (e._f = o), e._l == r && (e._l = i), e[v]--;
            }

            return !!r;
          },
          forEach: function forEach(t) {
            d(this, n);

            for (var e, r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3); e = e ? e.n : this._f;) {
              for (r(e.v, e.k, this); e && e.r;) {
                e = e.p;
              }
            }
          },
          has: function has(t) {
            return !!y(d(this, n), t);
          }
        }), p && r(f.prototype, "size", {
          get: function get() {
            return d(this, n)[v];
          }
        }), f;
      },
      def: function def(t, n, e) {
        var r,
            o,
            i = y(t, n);
        return i ? i.v = e : (t._l = i = {
          i: o = h(n, !0),
          k: n,
          v: e,
          p: r = t._l,
          n: void 0,
          r: !1
        }, t._f || (t._f = i), r && (r.n = i), t[v]++, "F" !== o && (t._i[o] = i)), t;
      },
      getEntry: y,
      setStrong: function setStrong(t, n, e) {
        a(t, n, function (t, e) {
          this._t = d(t, n), this._k = e, this._l = void 0;
        }, function () {
          for (var t = this._k, n = this._l; n && n.r;) {
            n = n.p;
          }

          return this._t && (this._l = n = n ? n.n : this._t._f) ? f(0, "keys" == t ? n.k : "values" == t ? n.v : [n.k, n.v]) : (this._t = void 0, f(1));
        }, e ? "entries" : "values", !e, !0), l(n);
      }
    };
  }, function (t, n, e) {
    var r = e(8);

    t.exports = function (t, n, e, o) {
      try {
        return o ? n(r(e)[0], e[1]) : n(e);
      } catch (n) {
        var i = t.return;
        throw void 0 !== i && r(i.call(t)), n;
      }
    };
  }, function (t, n, e) {
    var r = e(14),
        o = e(0)("iterator"),
        i = Array.prototype;

    t.exports = function (t) {
      return void 0 !== t && (r.Array === t || i[o] === t);
    };
  }, function (t, n, e) {
    var r = e(23),
        o = e(0)("iterator"),
        i = e(14);

    t.exports = e(3).getIteratorMethod = function (t) {
      if (null != t) return t[o] || t["@@iterator"] || i[r(t)];
    };
  }, function (t, n, e) {
    var r = e(0)("iterator"),
        o = !1;

    try {
      var i = [7][r]();
      i.return = function () {
        o = !0;
      }, Array.from(i, function () {
        throw 2;
      });
    } catch (t) {}

    t.exports = function (t, n) {
      if (!n && !o) return !1;
      var e = !1;

      try {
        var i = [7],
            u = i[r]();
        u.next = function () {
          return {
            done: e = !0
          };
        }, i[r] = function () {
          return u;
        }, t(i);
      } catch (t) {}

      return e;
    };
  }, function (t, n) {
    n.f = {}.propertyIsEnumerable;
  }, function (t, n, e) {
    var r = e(23),
        o = e(77);

    t.exports = function (t) {
      return function () {
        if (r(this) != t) throw TypeError(t + "#toJSON isn't generic");
        return o(this);
      };
    };
  }, function (t, n, e) {
    var r = e(10),
        o = e(31),
        i = e(20),
        u = e(19),
        c = e(87);

    t.exports = function (t, n) {
      var e = 1 == t,
          s = 2 == t,
          a = 3 == t,
          f = 4 == t,
          l = 6 == t,
          p = 5 == t || l,
          h = n || c;
      return function (n, c, d) {
        for (var v, y, m = i(n), g = o(m), b = r(c, d, 3), x = u(g.length), _ = 0, w = e ? h(n, x) : s ? h(n, 0) : void 0; x > _; _++) {
          if ((p || _ in g) && (y = b(v = g[_], _, m), t)) if (e) w[_] = y;else if (y) switch (t) {
            case 3:
              return !0;

            case 5:
              return v;

            case 6:
              return _;

            case 2:
              w.push(v);
          } else if (f) return !1;
        }

        return l ? -1 : a || f ? f : w;
      };
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(4),
        o = e(30),
        i = e(90),
        u = e(53),
        c = e(20),
        s = e(31),
        a = Object.assign;
    t.exports = !a || e(13)(function () {
      var t = {},
          n = {},
          e = Symbol(),
          r = "abcdefghijklmnopqrst";
      return t[e] = 7, r.split("").forEach(function (t) {
        n[t] = t;
      }), 7 != a({}, t)[e] || Object.keys(a({}, n)).join("") != r;
    }) ? function (t, n) {
      for (var e = c(t), a = arguments.length, f = 1, l = i.f, p = u.f; a > f;) {
        for (var h, d = s(arguments[f++]), v = l ? o(d).concat(l(d)) : o(d), y = v.length, m = 0; y > m;) {
          h = v[m++], r && !p.call(d, h) || (e[h] = d[h]);
        }
      }

      return e;
    } : a;
  }, function (t, n, e) {
    "use strict";

    (function (t) {
      var e = "object" == _typeof(t) && t && t.Object === Object && t;
      n.a = e;
    }).call(this, e(99));
  }, function (t, n, e) {
    t.exports = e(100);
  }, function (t, n, e) {
    e(22), e(26), e(34), e(71), e(76), e(78), e(79), t.exports = e(3).Map;
  }, function (t, n, e) {
    t.exports = e(25)("native-function-to-string", Function.toString);
  }, function (t, n, e) {
    var r = e(27),
        o = e(28);

    t.exports = function (t) {
      return function (n, e) {
        var i,
            u,
            c = String(o(n)),
            s = r(e),
            a = c.length;
        return s < 0 || s >= a ? t ? "" : void 0 : (i = c.charCodeAt(s)) < 55296 || i > 56319 || s + 1 === a || (u = c.charCodeAt(s + 1)) < 56320 || u > 57343 ? t ? c.charAt(s) : i : t ? c.slice(s, s + 2) : u - 56320 + (i - 55296 << 10) + 65536;
      };
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(45),
        o = e(17),
        i = e(33),
        u = {};
    e(11)(u, e(0)("iterator"), function () {
      return this;
    }), t.exports = function (t, n, e) {
      t.prototype = r(u, {
        next: o(1, e)
      }), i(t, n + " Iterator");
    };
  }, function (t, n, e) {
    var r = e(7),
        o = e(8),
        i = e(30);
    t.exports = e(4) ? Object.defineProperties : function (t, n) {
      o(t);

      for (var e, u = i(n), c = u.length, s = 0; c > s;) {
        r.f(t, e = u[s++], n[e]);
      }

      return t;
    };
  }, function (t, n, e) {
    var r = e(9),
        o = e(18),
        i = e(65)(!1),
        u = e(32)("IE_PROTO");

    t.exports = function (t, n) {
      var e,
          c = o(t),
          s = 0,
          a = [];

      for (e in c) {
        e != u && r(c, e) && a.push(e);
      }

      for (; n.length > s;) {
        r(c, e = n[s++]) && (~i(a, e) || a.push(e));
      }

      return a;
    };
  }, function (t, n, e) {
    var r = e(18),
        o = e(19),
        i = e(66);

    t.exports = function (t) {
      return function (n, e, u) {
        var c,
            s = r(n),
            a = o(s.length),
            f = i(u, a);

        if (t && e != e) {
          for (; a > f;) {
            if ((c = s[f++]) != c) return !0;
          }
        } else for (; a > f; f++) {
          if ((t || f in s) && s[f] === e) return t || f || 0;
        }

        return !t && -1;
      };
    };
  }, function (t, n, e) {
    var r = e(27),
        o = Math.max,
        i = Math.min;

    t.exports = function (t, n) {
      return (t = r(t)) < 0 ? o(t + n, 0) : i(t, n);
    };
  }, function (t, n, e) {
    var r = e(2).document;
    t.exports = r && r.documentElement;
  }, function (t, n, e) {
    var r = e(9),
        o = e(20),
        i = e(32)("IE_PROTO"),
        u = Object.prototype;

    t.exports = Object.getPrototypeOf || function (t) {
      return t = o(t), r(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null;
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(70),
        o = e(47),
        i = e(14),
        u = e(18);
    t.exports = e(29)(Array, "Array", function (t, n) {
      this._t = u(t), this._i = 0, this._k = n;
    }, function () {
      var t = this._t,
          n = this._k,
          e = this._i++;
      return !t || e >= t.length ? (this._t = void 0, o(1)) : o(0, "keys" == n ? e : "values" == n ? t[e] : [e, t[e]]);
    }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");
  }, function (t, n, e) {
    var r = e(0)("unscopables"),
        o = Array.prototype;
    null == o[r] && e(11)(o, r, {}), t.exports = function (t) {
      o[r][t] = !0;
    };
  }, function (t, n, e) {
    "use strict";

    var r = e(48),
        o = e(12);
    t.exports = e(37)("Map", function (t) {
      return function () {
        return t(this, arguments.length > 0 ? arguments[0] : void 0);
      };
    }, {
      get: function get(t) {
        var n = r.getEntry(o(this, "Map"), t);
        return n && n.v;
      },
      set: function set(t, n) {
        return r.def(o(this, "Map"), 0 === t ? 0 : t, n);
      }
    }, r, !0);
  }, function (t, n, e) {
    "use strict";

    var r = e(2),
        o = e(7),
        i = e(4),
        u = e(0)("species");

    t.exports = function (t) {
      var n = r[t];
      i && n && !n[u] && o.f(n, u, {
        configurable: !0,
        get: function get() {
          return this;
        }
      });
    };
  }, function (t, n, e) {
    var r = e(1),
        o = e(74).set;

    t.exports = function (t, n, e) {
      var i,
          u = n.constructor;
      return u !== e && "function" == typeof u && (i = u.prototype) !== e.prototype && r(i) && o && o(t, i), t;
    };
  }, function (t, n, e) {
    var r = e(1),
        o = e(8),
        i = function i(t, n) {
      if (o(t), !r(n) && null !== n) throw TypeError(n + ": can't set as prototype!");
    };

    t.exports = {
      set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, n, r) {
        try {
          (r = e(10)(Function.call, e(75).f(Object.prototype, "__proto__").set, 2))(t, []), n = !(t instanceof Array);
        } catch (t) {
          n = !0;
        }

        return function (t, e) {
          return i(t, e), n ? t.__proto__ = e : r(t, e), t;
        };
      }({}, !1) : void 0),
      check: i
    };
  }, function (t, n, e) {
    var r = e(53),
        o = e(17),
        i = e(18),
        u = e(43),
        c = e(9),
        s = e(41),
        a = Object.getOwnPropertyDescriptor;
    n.f = e(4) ? a : function (t, n) {
      if (t = i(t), n = u(n, !0), s) try {
        return a(t, n);
      } catch (t) {}
      if (c(t, n)) return o(!r.f.call(t, n), t[n]);
    };
  }, function (t, n, e) {
    var r = e(5);
    r(r.P + r.R, "Map", {
      toJSON: e(54)("Map")
    });
  }, function (t, n, e) {
    var r = e(15);

    t.exports = function (t, n) {
      var e = [];
      return r(t, !1, e.push, e, n), e;
    };
  }, function (t, n, e) {
    e(38)("Map");
  }, function (t, n, e) {
    e(39)("Map");
  }, function (t, n, e) {
    e(22), e(26), e(34), e(81), e(82), e(83), e(84), t.exports = e(3).Set;
  }, function (t, n, e) {
    "use strict";

    var r = e(48),
        o = e(12);
    t.exports = e(37)("Set", function (t) {
      return function () {
        return t(this, arguments.length > 0 ? arguments[0] : void 0);
      };
    }, {
      add: function add(t) {
        return r.def(o(this, "Set"), t = 0 === t ? 0 : t, t);
      }
    }, r);
  }, function (t, n, e) {
    var r = e(5);
    r(r.P + r.R, "Set", {
      toJSON: e(54)("Set")
    });
  }, function (t, n, e) {
    e(38)("Set");
  }, function (t, n, e) {
    e(39)("Set");
  }, function (t, n, e) {
    e(22), e(34), e(86), e(92), e(93), t.exports = e(3).WeakMap;
  }, function (t, n, e) {
    "use strict";

    var r,
        o = e(2),
        i = e(55)(0),
        u = e(6),
        c = e(21),
        s = e(56),
        a = e(91),
        f = e(1),
        l = e(12),
        p = e(12),
        h = !o.ActiveXObject && "ActiveXObject" in o,
        d = c.getWeak,
        v = Object.isExtensible,
        y = a.ufstore,
        m = function m(t) {
      return function () {
        return t(this, arguments.length > 0 ? arguments[0] : void 0);
      };
    },
        g = {
      get: function get(t) {
        if (f(t)) {
          var n = d(t);
          return !0 === n ? y(l(this, "WeakMap")).get(t) : n ? n[this._i] : void 0;
        }
      },
      set: function set(t, n) {
        return a.def(l(this, "WeakMap"), t, n);
      }
    },
        b = t.exports = e(37)("WeakMap", m, g, a, !0, !0);

    p && h && (s((r = a.getConstructor(m, "WeakMap")).prototype, g), c.NEED = !0, i(["delete", "has", "get", "set"], function (t) {
      var n = b.prototype,
          e = n[t];
      u(n, t, function (n, o) {
        if (f(n) && !v(n)) {
          this._f || (this._f = new r());

          var i = this._f[t](n, o);

          return "set" == t ? this : i;
        }

        return e.call(this, n, o);
      });
    }));
  }, function (t, n, e) {
    var r = e(88);

    t.exports = function (t, n) {
      return new (r(t))(n);
    };
  }, function (t, n, e) {
    var r = e(1),
        o = e(89),
        i = e(0)("species");

    t.exports = function (t) {
      var n;
      return o(t) && ("function" != typeof (n = t.constructor) || n !== Array && !o(n.prototype) || (n = void 0), r(n) && null === (n = n[i]) && (n = void 0)), void 0 === n ? Array : n;
    };
  }, function (t, n, e) {
    var r = e(24);

    t.exports = Array.isArray || function (t) {
      return "Array" == r(t);
    };
  }, function (t, n) {
    n.f = Object.getOwnPropertySymbols;
  }, function (t, n, e) {
    "use strict";

    var r = e(35),
        o = e(21).getWeak,
        i = e(8),
        u = e(1),
        c = e(36),
        s = e(15),
        a = e(55),
        f = e(9),
        l = e(12),
        p = a(5),
        h = a(6),
        d = 0,
        v = function v(t) {
      return t._l || (t._l = new y());
    },
        y = function y() {
      this.a = [];
    },
        m = function m(t, n) {
      return p(t.a, function (t) {
        return t[0] === n;
      });
    };

    y.prototype = {
      get: function get(t) {
        var n = m(this, t);
        if (n) return n[1];
      },
      has: function has(t) {
        return !!m(this, t);
      },
      set: function set(t, n) {
        var e = m(this, t);
        e ? e[1] = n : this.a.push([t, n]);
      },
      delete: function _delete(t) {
        var n = h(this.a, function (n) {
          return n[0] === t;
        });
        return ~n && this.a.splice(n, 1), !!~n;
      }
    }, t.exports = {
      getConstructor: function getConstructor(t, n, e, i) {
        var a = t(function (t, r) {
          c(t, a, n, "_i"), t._t = n, t._i = d++, t._l = void 0, null != r && s(r, e, t[i], t);
        });
        return r(a.prototype, {
          delete: function _delete(t) {
            if (!u(t)) return !1;
            var e = o(t);
            return !0 === e ? v(l(this, n)).delete(t) : e && f(e, this._i) && delete e[this._i];
          },
          has: function has(t) {
            if (!u(t)) return !1;
            var e = o(t);
            return !0 === e ? v(l(this, n)).has(t) : e && f(e, this._i);
          }
        }), a;
      },
      def: function def(t, n, e) {
        var r = o(i(n), !0);
        return !0 === r ? v(t).set(n, e) : r[t._i] = e, t;
      },
      ufstore: v
    };
  }, function (t, n, e) {
    e(38)("WeakMap");
  }, function (t, n, e) {
    e(39)("WeakMap");
  }, function (t, n, e) {
    e(26), e(95), t.exports = e(3).Array.from;
  }, function (t, n, e) {
    "use strict";

    var r = e(10),
        o = e(5),
        i = e(20),
        u = e(49),
        c = e(50),
        s = e(19),
        a = e(96),
        f = e(51);
    o(o.S + o.F * !e(52)(function (t) {
      Array.from(t);
    }), "Array", {
      from: function from(t) {
        var n,
            e,
            o,
            l,
            p = i(t),
            h = "function" == typeof this ? this : Array,
            d = arguments.length,
            v = d > 1 ? arguments[1] : void 0,
            y = void 0 !== v,
            m = 0,
            g = f(p);
        if (y && (v = r(v, d > 2 ? arguments[2] : void 0, 2)), null == g || h == Array && c(g)) for (e = new h(n = s(p.length)); n > m; m++) {
          a(e, m, y ? v(p[m], m) : p[m]);
        } else for (l = g.call(p), e = new h(); !(o = l.next()).done; m++) {
          a(e, m, y ? u(l, v, [o.value, m], !0) : o.value);
        }
        return e.length = m, e;
      }
    });
  }, function (t, n, e) {
    "use strict";

    var r = e(7),
        o = e(17);

    t.exports = function (t, n, e) {
      n in t ? r.f(t, n, o(0, e)) : t[n] = e;
    };
  }, function (t, n, e) {
    e(98), t.exports = e(3).Object.assign;
  }, function (t, n, e) {
    var r = e(5);
    r(r.S + r.F, "Object", {
      assign: e(56)
    });
  }, function (t, n) {
    var e;

    e = function () {
      return this;
    }();

    try {
      e = e || new Function("return this")();
    } catch (t) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (e = window);
    }

    t.exports = e;
  }, function (t, n, e) {
    "use strict";

    e.r(n);
    var r = {};
    e.r(r), e.d(r, "keyboardHandler", function () {
      return et;
    }), e.d(r, "mouseHandler", function () {
      return rt;
    }), e.d(r, "resizeHandler", function () {
      return ot;
    }), e.d(r, "selectHandler", function () {
      return it;
    }), e.d(r, "touchHandler", function () {
      return ut;
    }), e.d(r, "wheelHandler", function () {
      return ct;
    });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var _o = function o(t, n) {
      return (_o = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, n) {
        t.__proto__ = n;
      } || function (t, n) {
        for (var e in n) {
          n.hasOwnProperty(e) && (t[e] = n[e]);
        }
      })(t, n);
    },
        _i = function i() {
      return (_i = Object.assign || function (t) {
        for (var n, e = 1, r = arguments.length; e < r; e++) {
          for (var o in n = arguments[e]) {
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
          }
        }

        return t;
      }).apply(this, arguments);
    };

    function u(t, n, e, r) {
      var o,
          i = arguments.length,
          u = i < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, e) : r;
      if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) u = Reflect.decorate(t, n, e, r);else for (var c = t.length - 1; c >= 0; c--) {
        (o = t[c]) && (u = (i < 3 ? o(u) : i > 3 ? o(n, e, u) : o(n, e)) || u);
      }
      return i > 3 && u && Object.defineProperty(n, e, u), u;
    }

    e(59), e(80), e(85), e(94), e(97);

    var c = function c(t) {
      var n = _typeof(t);

      return null != t && ("object" == n || "function" == n);
    },
        s = e(57),
        a = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
        f = s.a || a || Function("return this")(),
        l = f.Symbol,
        p = Object.prototype,
        h = p.hasOwnProperty,
        d = p.toString,
        v = l ? l.toStringTag : void 0,
        y = Object.prototype.toString,
        m = l ? l.toStringTag : void 0,
        g = function g(t) {
      return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : m && m in Object(t) ? function (t) {
        var n = h.call(t, v),
            e = t[v];

        try {
          t[v] = void 0;
          var r = !0;
        } catch (t) {}

        var o = d.call(t);
        return r && (n ? t[v] = e : delete t[v]), o;
      }(t) : function (t) {
        return y.call(t);
      }(t);
    },
        b = /^\s+|\s+$/g,
        x = /^[-+]0x[0-9a-f]+$/i,
        _ = /^0b[01]+$/i,
        w = /^0o[0-7]+$/i,
        S = parseInt,
        E = function E(t) {
      if ("number" == typeof t) return t;
      if (function (t) {
        return "symbol" == _typeof(t) || function (t) {
          return null != t && "object" == _typeof(t);
        }(t) && "[object Symbol]" == g(t);
      }(t)) return NaN;

      if (c(t)) {
        var n = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = c(n) ? n + "" : n;
      }

      if ("string" != typeof t) return 0 === t ? t : +t;
      t = t.replace(b, "");

      var e = _.test(t);

      return e || w.test(t) ? S(t.slice(2), e ? 2 : 8) : x.test(t) ? NaN : +t;
    },
        O = function O(t, n, e) {
      return void 0 === e && (e = n, n = void 0), void 0 !== e && (e = (e = E(e)) == e ? e : 0), void 0 !== n && (n = (n = E(n)) == n ? n : 0), function (t, n, e) {
        return t == t && (void 0 !== e && (t = t <= e ? t : e), void 0 !== n && (t = t >= n ? t : n)), t;
      }(E(t), n, e);
    };

    function T(t, n) {
      return void 0 === t && (t = -1 / 0), void 0 === n && (n = 1 / 0), function (e, r) {
        var o = "_" + r;
        Object.defineProperty(e, r, {
          get: function get() {
            return this[o];
          },
          set: function set(e) {
            Object.defineProperty(this, o, {
              value: O(e, t, n),
              enumerable: !1,
              writable: !0,
              configurable: !0
            });
          },
          enumerable: !0,
          configurable: !0
        });
      };
    }

    function A(t, n) {
      var e = "_" + n;
      Object.defineProperty(t, n, {
        get: function get() {
          return this[e];
        },
        set: function set(t) {
          Object.defineProperty(this, e, {
            value: !!t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          });
        },
        enumerable: !0,
        configurable: !0
      });
    }

    var M = function M() {
      return f.Date.now();
    },
        P = Math.max,
        j = Math.min,
        k = function k(t, n, e) {
      var r,
          o,
          i,
          u,
          s,
          a,
          f = 0,
          l = !1,
          p = !1,
          h = !0;
      if ("function" != typeof t) throw new TypeError("Expected a function");

      function d(n) {
        var e = r,
            i = o;
        return r = o = void 0, f = n, u = t.apply(i, e);
      }

      function v(t) {
        var e = t - a;
        return void 0 === a || e >= n || e < 0 || p && t - f >= i;
      }

      function y() {
        var t = M();
        if (v(t)) return m(t);
        s = setTimeout(y, function (t) {
          var e = n - (t - a);
          return p ? j(e, i - (t - f)) : e;
        }(t));
      }

      function m(t) {
        return s = void 0, h && r ? d(t) : (r = o = void 0, u);
      }

      function g() {
        var t = M(),
            e = v(t);

        if (r = arguments, o = this, a = t, e) {
          if (void 0 === s) return function (t) {
            return f = t, s = setTimeout(y, n), l ? d(t) : u;
          }(a);
          if (p) return clearTimeout(s), s = setTimeout(y, n), d(a);
        }

        return void 0 === s && (s = setTimeout(y, n)), u;
      }

      return n = E(n) || 0, c(e) && (l = !!e.leading, i = (p = "maxWait" in e) ? P(E(e.maxWait) || 0, n) : i, h = "trailing" in e ? !!e.trailing : h), g.cancel = function () {
        void 0 !== s && clearTimeout(s), f = 0, r = a = o = s = void 0;
      }, g.flush = function () {
        return void 0 === s ? u : m(M());
      }, g;
    };

    function D() {
      for (var t = [], n = 0; n < arguments.length; n++) {
        t[n] = arguments[n];
      }

      return function (n, e, r) {
        var o = r.value;
        return {
          get: function get() {
            return this.hasOwnProperty(e) || Object.defineProperty(this, e, {
              value: k.apply(void 0, function () {
                for (var t = 0, n = 0, e = arguments.length; n < e; n++) {
                  t += arguments[n].length;
                }

                var r = Array(t),
                    o = 0;

                for (n = 0; n < e; n++) {
                  for (var i = arguments[n], u = 0, c = i.length; u < c; u++, o++) {
                    r[o] = i[u];
                  }
                }

                return r;
              }([o], t))
            }), this[e];
          }
        };
      };
    }

    var L,
        N = function () {
      function t(t) {
        var n = this;
        void 0 === t && (t = {}), this.damping = .1, this.thumbMinSize = 20, this.renderByPixels = !0, this.alwaysShowTracks = !1, this.continuousScrolling = !0, this.delegateTo = null, this.plugins = {}, Object.keys(t).forEach(function (e) {
          n[e] = t[e];
        });
      }

      return Object.defineProperty(t.prototype, "wheelEventTarget", {
        get: function get() {
          return this.delegateTo;
        },
        set: function set(t) {
          console.warn("[smooth-scrollbar]: `options.wheelEventTarget` is deprecated and will be removed in the future, use `options.delegateTo` instead."), this.delegateTo = t;
        },
        enumerable: !0,
        configurable: !0
      }), u([T(0, 1)], t.prototype, "damping", void 0), u([T(0, 1 / 0)], t.prototype, "thumbMinSize", void 0), u([A], t.prototype, "renderByPixels", void 0), u([A], t.prototype, "alwaysShowTracks", void 0), u([A], t.prototype, "continuousScrolling", void 0), t;
    }(),
        z = new WeakMap();

    function C() {
      if (void 0 !== L) return L;
      var t = !1;

      try {
        var n = function n() {},
            e = Object.defineProperty({}, "passive", {
          get: function get() {
            t = !0;
          }
        });

        window.addEventListener("testPassive", n, e), window.removeEventListener("testPassive", n, e);
      } catch (t) {}

      return L = !!t && {
        passive: !1
      };
    }

    function R(t) {
      var n = z.get(t) || [];
      return z.set(t, n), function (t, e, r) {
        function o(t) {
          t.defaultPrevented || r(t);
        }

        e.split(/\s+/g).forEach(function (e) {
          n.push({
            elem: t,
            eventName: e,
            handler: o
          }), t.addEventListener(e, o, C());
        });
      };
    }

    function F(t) {
      var n = function (t) {
        return t.touches ? t.touches[t.touches.length - 1] : t;
      }(t);

      return {
        x: n.clientX,
        y: n.clientY
      };
    }

    function I(t, n) {
      return void 0 === n && (n = []), n.some(function (n) {
        return t === n;
      });
    }

    var W = ["webkit", "moz", "ms", "o"],
        H = new RegExp("^-(?!(?:" + W.join("|") + ")-)");

    function B(t, n) {
      n = function (t) {
        var n = {};
        return Object.keys(t).forEach(function (e) {
          if (H.test(e)) {
            var r = t[e];
            e = e.replace(/^-/, ""), n[e] = r, W.forEach(function (t) {
              n["-" + t + "-" + e] = r;
            });
          } else n[e] = t[e];
        }), n;
      }(n), Object.keys(n).forEach(function (e) {
        var r = e.replace(/^-/, "").replace(/-([a-z])/g, function (t, n) {
          return n.toUpperCase();
        });
        t.style[r] = n[e];
      });
    }

    var G,
        X = function () {
      function t(t) {
        this.updateTime = Date.now(), this.delta = {
          x: 0,
          y: 0
        }, this.velocity = {
          x: 0,
          y: 0
        }, this.lastPosition = {
          x: 0,
          y: 0
        }, this.lastPosition = F(t);
      }

      return t.prototype.update = function (t) {
        var n = this.velocity,
            e = this.updateTime,
            r = this.lastPosition,
            o = Date.now(),
            i = F(t),
            u = {
          x: -(i.x - r.x),
          y: -(i.y - r.y)
        },
            c = o - e || 16,
            s = u.x / c * 16,
            a = u.y / c * 16;
        n.x = .9 * s + .1 * n.x, n.y = .9 * a + .1 * n.y, this.delta = u, this.updateTime = o, this.lastPosition = i;
      }, t;
    }(),
        V = function () {
      function t() {
        this._touchList = {};
      }

      return Object.defineProperty(t.prototype, "_primitiveValue", {
        get: function get() {
          return {
            x: 0,
            y: 0
          };
        },
        enumerable: !0,
        configurable: !0
      }), t.prototype.isActive = function () {
        return void 0 !== this._activeTouchID;
      }, t.prototype.getDelta = function () {
        var t = this._getActiveTracker();

        return t ? _i({}, t.delta) : this._primitiveValue;
      }, t.prototype.getVelocity = function () {
        var t = this._getActiveTracker();

        return t ? _i({}, t.velocity) : this._primitiveValue;
      }, t.prototype.track = function (t) {
        var n = this,
            e = t.targetTouches;
        return Array.from(e).forEach(function (t) {
          n._add(t);
        }), this._touchList;
      }, t.prototype.update = function (t) {
        var n = this,
            e = t.touches,
            r = t.changedTouches;
        return Array.from(e).forEach(function (t) {
          n._renew(t);
        }), this._setActiveID(r), this._touchList;
      }, t.prototype.release = function (t) {
        var n = this;
        delete this._activeTouchID, Array.from(t.changedTouches).forEach(function (t) {
          n._delete(t);
        });
      }, t.prototype._add = function (t) {
        if (!this._has(t)) {
          var n = new X(t);
          this._touchList[t.identifier] = n;
        }
      }, t.prototype._renew = function (t) {
        this._has(t) && this._touchList[t.identifier].update(t);
      }, t.prototype._delete = function (t) {
        delete this._touchList[t.identifier];
      }, t.prototype._has = function (t) {
        return this._touchList.hasOwnProperty(t.identifier);
      }, t.prototype._setActiveID = function (t) {
        this._activeTouchID = t[t.length - 1].identifier;
      }, t.prototype._getActiveTracker = function () {
        return this._touchList[this._activeTouchID];
      }, t;
    }();

    !function (t) {
      t.X = "x", t.Y = "y";
    }(G || (G = {}));

    var U = function () {
      function t(t, n) {
        void 0 === n && (n = 0), this._direction = t, this._minSize = n, this.element = document.createElement("div"), this.displaySize = 0, this.realSize = 0, this.offset = 0, this.element.className = "scrollbar-thumb scrollbar-thumb-" + t;
      }

      return t.prototype.attachTo = function (t) {
        t.appendChild(this.element);
      }, t.prototype.update = function (t, n, e) {
        this.realSize = Math.min(n / e, 1) * n, this.displaySize = Math.max(this.realSize, this._minSize), this.offset = t / e * (n + (this.realSize - this.displaySize)), B(this.element, this._getStyle());
      }, t.prototype._getStyle = function () {
        switch (this._direction) {
          case G.X:
            return {
              width: this.displaySize + "px",
              "-transform": "translate3d(" + this.offset + "px, 0, 0)"
            };

          case G.Y:
            return {
              height: this.displaySize + "px",
              "-transform": "translate3d(0, " + this.offset + "px, 0)"
            };

          default:
            return null;
        }
      }, t;
    }(),
        Y = function () {
      function t(t, n) {
        void 0 === n && (n = 0), this.element = document.createElement("div"), this._isShown = !1, this.element.className = "scrollbar-track scrollbar-track-" + t, this.thumb = new U(t, n), this.thumb.attachTo(this.element);
      }

      return t.prototype.attachTo = function (t) {
        t.appendChild(this.element);
      }, t.prototype.show = function () {
        this._isShown || (this._isShown = !0, this.element.classList.add("show"));
      }, t.prototype.hide = function () {
        this._isShown && (this._isShown = !1, this.element.classList.remove("show"));
      }, t.prototype.update = function (t, n, e) {
        B(this.element, {
          display: e <= n ? "none" : "block"
        }), this.thumb.update(t, n, e);
      }, t;
    }(),
        q = function () {
      function t(t) {
        this._scrollbar = t;
        var n = t.options.thumbMinSize;
        this.xAxis = new Y(G.X, n), this.yAxis = new Y(G.Y, n), this.xAxis.attachTo(t.containerEl), this.yAxis.attachTo(t.containerEl), t.options.alwaysShowTracks && (this.xAxis.show(), this.yAxis.show());
      }

      return t.prototype.update = function () {
        var t = this._scrollbar,
            n = t.size,
            e = t.offset;
        this.xAxis.update(e.x, n.container.width, n.content.width), this.yAxis.update(e.y, n.container.height, n.content.height);
      }, t.prototype.autoHideOnIdle = function () {
        this._scrollbar.options.alwaysShowTracks || (this.xAxis.hide(), this.yAxis.hide());
      }, u([D(300)], t.prototype, "autoHideOnIdle", null), t;
    }(),
        K = new WeakMap();

    function $(t) {
      return Math.pow(t - 1, 3) + 1;
    }

    var J,
        Q,
        Z,
        tt = function () {
      function t(t, n) {
        var e = this.constructor;
        this.scrollbar = t, this.name = e.pluginName, this.options = _i(_i({}, e.defaultOptions), n);
      }

      return t.prototype.onInit = function () {}, t.prototype.onDestroy = function () {}, t.prototype.onUpdate = function () {}, t.prototype.onRender = function (t) {}, t.prototype.transformDelta = function (t, n) {
        return _i({}, t);
      }, t.pluginName = "", t.defaultOptions = {}, t;
    }(),
        nt = {
      order: new Set(),
      constructors: {}
    };

    function et(t) {
      var n = R(t),
          e = t.containerEl;
      n(e, "keydown", function (n) {
        var r = document.activeElement;

        if ((r === e || e.contains(r)) && !function (t) {
          return !("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName && !t.isContentEditable) && !t.disabled;
        }(r)) {
          var o = function (t, n) {
            var e = t.size,
                r = t.limit,
                o = t.offset;

            switch (n) {
              case J.TAB:
                return function (t) {
                  requestAnimationFrame(function () {
                    t.scrollIntoView(document.activeElement, {
                      offsetTop: t.size.container.height / 2,
                      onlyScrollIfNeeded: !0
                    });
                  });
                }(t);

              case J.SPACE:
                return [0, 200];

              case J.PAGE_UP:
                return [0, 40 - e.container.height];

              case J.PAGE_DOWN:
                return [0, e.container.height - 40];

              case J.END:
                return [0, r.y - o.y];

              case J.HOME:
                return [0, -o.y];

              case J.LEFT:
                return [-40, 0];

              case J.UP:
                return [0, -40];

              case J.RIGHT:
                return [40, 0];

              case J.DOWN:
                return [0, 40];

              default:
                return null;
            }
          }(t, n.keyCode || n.which);

          if (o) {
            var i = o[0],
                u = o[1];
            t.addTransformableMomentum(i, u, n, function (e) {
              e ? n.preventDefault() : (t.containerEl.blur(), t.parent && t.parent.containerEl.focus());
            });
          }
        }
      });
    }

    function rt(t) {
      var n,
          e,
          r,
          o,
          i,
          u = R(t),
          c = t.containerEl,
          s = t.track,
          a = s.xAxis,
          f = s.yAxis;

      function l(n, e) {
        var r = t.size;
        return n === Q.X ? e / (r.container.width + (a.thumb.realSize - a.thumb.displaySize)) * r.content.width : n === Q.Y ? e / (r.container.height + (f.thumb.realSize - f.thumb.displaySize)) * r.content.height : 0;
      }

      function p(t) {
        return I(t, [a.element, a.thumb.element]) ? Q.X : I(t, [f.element, f.thumb.element]) ? Q.Y : void 0;
      }

      u(c, "click", function (n) {
        if (!e && I(n.target, [a.element, f.element])) {
          var r = n.target,
              o = p(r),
              i = r.getBoundingClientRect(),
              u = F(n),
              c = t.offset,
              s = t.limit;

          if (o === Q.X) {
            var h = u.x - i.left - a.thumb.displaySize / 2;
            t.setMomentum(O(l(o, h) - c.x, -c.x, s.x - c.x), 0);
          }

          o === Q.Y && (h = u.y - i.top - f.thumb.displaySize / 2, t.setMomentum(0, O(l(o, h) - c.y, -c.y, s.y - c.y)));
        }
      }), u(c, "mousedown", function (e) {
        if (I(e.target, [a.thumb.element, f.thumb.element])) {
          n = !0;
          var u = e.target,
              s = F(e),
              l = u.getBoundingClientRect();
          o = p(u), r = {
            x: s.x - l.left,
            y: s.y - l.top
          }, i = c.getBoundingClientRect(), B(t.containerEl, {
            "-user-select": "none"
          });
        }
      }), u(window, "mousemove", function (u) {
        if (n) {
          e = !0;
          var c = t.offset,
              s = F(u);

          if (o === Q.X) {
            var a = s.x - r.x - i.left;
            t.setPosition(l(o, a), c.y);
          }

          o === Q.Y && (a = s.y - r.y - i.top, t.setPosition(c.x, l(o, a)));
        }
      }), u(window, "mouseup blur", function () {
        n = e = !1, B(t.containerEl, {
          "-user-select": ""
        });
      });
    }

    function ot(t) {
      R(t)(window, "resize", k(t.update.bind(t), 300));
    }

    function it(t) {
      var n,
          e = R(t),
          r = t.containerEl,
          o = t.contentEl,
          i = t.offset,
          u = t.limit,
          c = !1;
      e(window, "mousemove", function (e) {
        c && (cancelAnimationFrame(n), function e(r) {
          var o = r.x,
              c = r.y;
          (o || c) && (t.setMomentum(O(i.x + o, 0, u.x) - i.x, O(i.y + c, 0, u.y) - i.y), n = requestAnimationFrame(function () {
            e({
              x: o,
              y: c
            });
          }));
        }(function (t, n) {
          var e = t.bounding,
              r = e.top,
              o = e.right,
              i = e.bottom,
              u = e.left,
              c = F(n),
              s = c.x,
              a = c.y,
              f = {
            x: 0,
            y: 0
          };
          return 0 === s && 0 === a ? f : (s > o - 20 ? f.x = s - o + 20 : s < u + 20 && (f.x = s - u - 20), a > i - 20 ? f.y = a - i + 20 : a < r + 20 && (f.y = a - r - 20), f.x *= 2, f.y *= 2, f);
        }(t, e)));
      }), e(o, "selectstart", function (t) {
        t.stopPropagation(), cancelAnimationFrame(n), c = !0;
      }), e(window, "mouseup blur", function () {
        cancelAnimationFrame(n), c = !1;
      }), e(r, "scroll", function (t) {
        t.preventDefault(), r.scrollTop = r.scrollLeft = 0;
      });
    }

    function ut(t) {
      var n,
          e = /Android/.test(navigator.userAgent) ? 3 : 2,
          r = t.options.delegateTo || t.containerEl,
          o = new V(),
          i = R(t),
          u = 0;
      i(r, "touchstart", function (e) {
        o.track(e), t.setMomentum(0, 0), 0 === u && (n = t.options.damping, t.options.damping = Math.max(n, .5)), u++;
      }), i(r, "touchmove", function (n) {
        if (!Z || Z === t) {
          o.update(n);
          var e = o.getDelta(),
              r = e.x,
              i = e.y;
          t.addTransformableMomentum(r, i, n, function (e) {
            e && (n.preventDefault(), Z = t);
          });
        }
      }), i(r, "touchcancel touchend", function (r) {
        var i = o.getVelocity(),
            c = {
          x: 0,
          y: 0
        };
        Object.keys(i).forEach(function (t) {
          var r = i[t] / n;
          c[t] = Math.abs(r) < 50 ? 0 : r * e;
        }), t.addTransformableMomentum(c.x, c.y, r), 0 == --u && (t.options.damping = n), o.release(r), Z = null;
      });
    }

    function ct(t) {
      R(t)(t.options.delegateTo || t.containerEl, "onwheel" in window || document.implementation.hasFeature("Events.wheel", "3.0") ? "wheel" : "mousewheel", function (n) {
        var e = function (t) {
          if ("deltaX" in t) {
            var n = ft(t.deltaMode);
            return {
              x: t.deltaX / st.STANDARD * n,
              y: t.deltaY / st.STANDARD * n
            };
          }

          return "wheelDeltaX" in t ? {
            x: t.wheelDeltaX / st.OTHERS,
            y: t.wheelDeltaY / st.OTHERS
          } : {
            x: 0,
            y: t.wheelDelta / st.OTHERS
          };
        }(n),
            r = e.x,
            o = e.y;

        t.addTransformableMomentum(r, o, n, function (t) {
          t && n.preventDefault();
        });
      });
    }

    !function (t) {
      t[t.TAB = 9] = "TAB", t[t.SPACE = 32] = "SPACE", t[t.PAGE_UP = 33] = "PAGE_UP", t[t.PAGE_DOWN = 34] = "PAGE_DOWN", t[t.END = 35] = "END", t[t.HOME = 36] = "HOME", t[t.LEFT = 37] = "LEFT", t[t.UP = 38] = "UP", t[t.RIGHT = 39] = "RIGHT", t[t.DOWN = 40] = "DOWN";
    }(J || (J = {})), function (t) {
      t[t.X = 0] = "X", t[t.Y = 1] = "Y";
    }(Q || (Q = {}));

    var st = {
      STANDARD: 1,
      OTHERS: -3
    },
        at = [1, 28, 500],
        ft = function ft(t) {
      return at[t] || at[0];
    },
        lt = new Map(),
        pt = function () {
      function t(t, n) {
        var e = this;
        this.offset = {
          x: 0,
          y: 0
        }, this.limit = {
          x: 1 / 0,
          y: 1 / 0
        }, this.bounding = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }, this._plugins = [], this._momentum = {
          x: 0,
          y: 0
        }, this._listeners = new Set(), this.containerEl = t;
        var r = this.contentEl = document.createElement("div");
        this.options = new N(n), t.setAttribute("data-scrollbar", "true"), t.setAttribute("tabindex", "-1"), B(t, {
          overflow: "hidden",
          outline: "none"
        }), window.navigator.msPointerEnabled && (t.style.msTouchAction = "none"), r.className = "scroll-content", Array.from(t.childNodes).forEach(function (t) {
          r.appendChild(t);
        }), t.appendChild(r), this.track = new q(this), this.size = this.getSize(), this._plugins = function (t, n) {
          return Array.from(nt.order).filter(function (t) {
            return !1 !== n[t];
          }).map(function (e) {
            var r = new (0, nt.constructors[e])(t, n[e]);
            return n[e] = r.options, r;
          });
        }(this, this.options.plugins);
        var o = t.scrollLeft,
            i = t.scrollTop;
        t.scrollLeft = t.scrollTop = 0, this.setPosition(o, i, {
          withoutCallbacks: !0
        });
        var u = window,
            c = u.MutationObserver || u.WebKitMutationObserver || u.MozMutationObserver;
        "function" == typeof c && (this._observer = new c(function () {
          e.update();
        }), this._observer.observe(r, {
          subtree: !0,
          childList: !0
        })), lt.set(t, this), requestAnimationFrame(function () {
          e._init();
        });
      }

      return Object.defineProperty(t.prototype, "parent", {
        get: function get() {
          for (var t = this.containerEl.parentElement; t;) {
            var n = lt.get(t);
            if (n) return n;
            t = t.parentElement;
          }

          return null;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(t.prototype, "scrollTop", {
        get: function get() {
          return this.offset.y;
        },
        set: function set(t) {
          this.setPosition(this.scrollLeft, t);
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(t.prototype, "scrollLeft", {
        get: function get() {
          return this.offset.x;
        },
        set: function set(t) {
          this.setPosition(t, this.scrollTop);
        },
        enumerable: !0,
        configurable: !0
      }), t.prototype.getSize = function () {
        return function (t) {
          var n = t.containerEl,
              e = t.contentEl;
          return {
            container: {
              width: n.clientWidth,
              height: n.clientHeight
            },
            content: {
              width: e.offsetWidth - e.clientWidth + e.scrollWidth,
              height: e.offsetHeight - e.clientHeight + e.scrollHeight
            }
          };
        }(this);
      }, t.prototype.update = function () {
        !function (t) {
          var n = t.getSize(),
              e = {
            x: Math.max(n.content.width - n.container.width, 0),
            y: Math.max(n.content.height - n.container.height, 0)
          },
              r = t.containerEl.getBoundingClientRect(),
              o = {
            top: Math.max(r.top, 0),
            right: Math.min(r.right, window.innerWidth),
            bottom: Math.min(r.bottom, window.innerHeight),
            left: Math.max(r.left, 0)
          };
          t.size = n, t.limit = e, t.bounding = o, t.track.update(), t.setPosition();
        }(this), this._plugins.forEach(function (t) {
          t.onUpdate();
        });
      }, t.prototype.isVisible = function (t) {
        return function (t, n) {
          var e = t.bounding,
              r = n.getBoundingClientRect(),
              o = Math.max(e.top, r.top),
              i = Math.max(e.left, r.left),
              u = Math.min(e.right, r.right);
          return o < Math.min(e.bottom, r.bottom) && i < u;
        }(this, t);
      }, t.prototype.setPosition = function (t, n, e) {
        var r = this;
        void 0 === t && (t = this.offset.x), void 0 === n && (n = this.offset.y), void 0 === e && (e = {});

        var o = function (t, n, e) {
          var r = t.options,
              o = t.offset,
              u = t.limit,
              c = t.track,
              s = t.contentEl;
          return r.renderByPixels && (n = Math.round(n), e = Math.round(e)), n = O(n, 0, u.x), e = O(e, 0, u.y), n !== o.x && c.xAxis.show(), e !== o.y && c.yAxis.show(), r.alwaysShowTracks || c.autoHideOnIdle(), n === o.x && e === o.y ? null : (o.x = n, o.y = e, B(s, {
            "-transform": "translate3d(" + -n + "px, " + -e + "px, 0)"
          }), c.update(), {
            offset: _i({}, o),
            limit: _i({}, u)
          });
        }(this, t, n);

        o && !e.withoutCallbacks && this._listeners.forEach(function (t) {
          t.call(r, o);
        });
      }, t.prototype.scrollTo = function (t, n, e, r) {
        void 0 === t && (t = this.offset.x), void 0 === n && (n = this.offset.y), void 0 === e && (e = 0), void 0 === r && (r = {}), function (t, n, e, r, o) {
          void 0 === r && (r = 0);
          var i = void 0 === o ? {} : o,
              u = i.easing,
              c = void 0 === u ? $ : u,
              s = i.callback,
              a = t.options,
              f = t.offset,
              l = t.limit;
          a.renderByPixels && (n = Math.round(n), e = Math.round(e));
          var p = f.x,
              h = f.y,
              d = O(n, 0, l.x) - p,
              v = O(e, 0, l.y) - h,
              y = Date.now();
          cancelAnimationFrame(K.get(t)), function n() {
            var e = Date.now() - y,
                o = r ? c(Math.min(e / r, 1)) : 1;
            if (t.setPosition(p + d * o, h + v * o), e >= r) "function" == typeof s && s.call(t);else {
              var i = requestAnimationFrame(n);
              K.set(t, i);
            }
          }();
        }(this, t, n, e, r);
      }, t.prototype.scrollIntoView = function (t, n) {
        void 0 === n && (n = {}), function (t, n, e) {
          var r = void 0 === e ? {} : e,
              o = r.alignToTop,
              i = void 0 === o || o,
              u = r.onlyScrollIfNeeded,
              c = void 0 !== u && u,
              s = r.offsetTop,
              a = void 0 === s ? 0 : s,
              f = r.offsetLeft,
              l = void 0 === f ? 0 : f,
              p = r.offsetBottom,
              h = void 0 === p ? 0 : p,
              d = t.containerEl,
              v = t.bounding,
              y = t.offset,
              m = t.limit;

          if (n && d.contains(n)) {
            var g = n.getBoundingClientRect();

            if (!c || !t.isVisible(n)) {
              var b = i ? g.top - v.top - a : g.bottom - v.bottom + h;
              t.setMomentum(g.left - v.left - l, O(b, -y.y, m.y - y.y));
            }
          }
        }(this, t, n);
      }, t.prototype.addListener = function (t) {
        if ("function" != typeof t) throw new TypeError("[smooth-scrollbar] scrolling listener should be a function");

        this._listeners.add(t);
      }, t.prototype.removeListener = function (t) {
        this._listeners.delete(t);
      }, t.prototype.addTransformableMomentum = function (t, n, e, r) {
        this._updateDebounced();

        var o = this._plugins.reduce(function (t, n) {
          return n.transformDelta(t, e) || t;
        }, {
          x: t,
          y: n
        }),
            i = !this._shouldPropagateMomentum(o.x, o.y);

        i && this.addMomentum(o.x, o.y), r && r.call(this, i);
      }, t.prototype.addMomentum = function (t, n) {
        this.setMomentum(this._momentum.x + t, this._momentum.y + n);
      }, t.prototype.setMomentum = function (t, n) {
        0 === this.limit.x && (t = 0), 0 === this.limit.y && (n = 0), this.options.renderByPixels && (t = Math.round(t), n = Math.round(n)), this._momentum.x = t, this._momentum.y = n;
      }, t.prototype.updatePluginOptions = function (t, n) {
        this._plugins.forEach(function (e) {
          e.name === t && Object.assign(e.options, n);
        });
      }, t.prototype.destroy = function () {
        var t = this.containerEl,
            n = this.contentEl;
        !function (t) {
          var n = z.get(t);
          n && (n.forEach(function (t) {
            var n = t.elem,
                e = t.eventName,
                r = t.handler;
            n.removeEventListener(e, r, C());
          }), z.delete(t));
        }(this), this._listeners.clear(), this.setMomentum(0, 0), cancelAnimationFrame(this._renderID), this._observer && this._observer.disconnect(), lt.delete(this.containerEl);

        for (var e = Array.from(n.childNodes); t.firstChild;) {
          t.removeChild(t.firstChild);
        }

        e.forEach(function (n) {
          t.appendChild(n);
        }), B(t, {
          overflow: ""
        }), t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, this._plugins.forEach(function (t) {
          t.onDestroy();
        }), this._plugins.length = 0;
      }, t.prototype._init = function () {
        var t = this;
        this.update(), Object.keys(r).forEach(function (n) {
          r[n](t);
        }), this._plugins.forEach(function (t) {
          t.onInit();
        }), this._render();
      }, t.prototype._updateDebounced = function () {
        this.update();
      }, t.prototype._shouldPropagateMomentum = function (t, n) {
        void 0 === t && (t = 0), void 0 === n && (n = 0);
        var e = this.options,
            r = this.offset,
            o = this.limit;
        if (!e.continuousScrolling) return !1;
        0 === o.x && 0 === o.y && this._updateDebounced();
        var i = O(t + r.x, 0, o.x),
            u = O(n + r.y, 0, o.y),
            c = !0;
        return (c = (c = c && i === r.x) && u === r.y) && (r.x === o.x || 0 === r.x || r.y === o.y || 0 === r.y);
      }, t.prototype._render = function () {
        var t = this._momentum;

        if (t.x || t.y) {
          var n = this._nextTick("x"),
              e = this._nextTick("y");

          t.x = n.momentum, t.y = e.momentum, this.setPosition(n.position, e.position);
        }

        var r = _i({}, this._momentum);

        this._plugins.forEach(function (t) {
          t.onRender(r);
        }), this._renderID = requestAnimationFrame(this._render.bind(this));
      }, t.prototype._nextTick = function (t) {
        var n = this.options,
            e = this.offset,
            r = this._momentum,
            o = e[t],
            i = r[t];
        if (Math.abs(i) <= .1) return {
          momentum: 0,
          position: o + i
        };
        var u = i * (1 - n.damping);
        return n.renderByPixels && (u |= 0), {
          momentum: u,
          position: o + i - u
        };
      }, u([D(100, {
        leading: !0
      })], t.prototype, "_updateDebounced", null), t;
    }(),
        ht = "\n[data-scrollbar] {\n  display: block;\n  position: relative;\n}\n\n.scroll-content {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n\n.scrollbar-track {\n  position: absolute;\n  opacity: 0;\n  z-index: 1;\n  background: rgba(222, 222, 222, .75);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: opacity 0.5s 0.5s ease-out;\n          transition: opacity 0.5s 0.5s ease-out;\n}\n.scrollbar-track.show,\n.scrollbar-track:hover {\n  opacity: 1;\n  -webkit-transition-delay: 0s;\n          transition-delay: 0s;\n}\n\n.scrollbar-track-x {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 8px;\n}\n.scrollbar-track-y {\n  top: 0;\n  right: 0;\n  width: 8px;\n  height: 100%;\n}\n.scrollbar-thumb {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 8px;\n  height: 8px;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 4px;\n}\n",
        dt = "smooth-scrollbar-style",
        vt = !1;

    function yt() {
      if (!vt && "undefined" != typeof window) {
        var t = document.createElement("style");
        t.id = dt, t.textContent = ht, document.head && document.head.appendChild(t), vt = !0;
      }
    }

    e.d(n, "ScrollbarPlugin", function () {
      return tt;
    });
    /*!
     * cast `I.Scrollbar` to `Scrollbar` to avoid error
     *
     * `I.Scrollbar` is not assignable to `Scrollbar`:
     *     "privateProp" is missing in `I.Scrollbar`
     *
     * @see https://github.com/Microsoft/TypeScript/issues/2672
     */

    var mt = function (t) {
      function n() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return function (t, n) {
        function e() {
          this.constructor = t;
        }

        _o(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, new e());
      }(n, t), n.init = function (t, n) {
        if (!t || 1 !== t.nodeType) throw new TypeError("expect element to be DOM Element, but got " + t);
        return yt(), lt.has(t) ? lt.get(t) : new pt(t, n);
      }, n.initAll = function (t) {
        return Array.from(document.querySelectorAll("[data-scrollbar]"), function (e) {
          return n.init(e, t);
        });
      }, n.has = function (t) {
        return lt.has(t);
      }, n.get = function (t) {
        return lt.get(t);
      }, n.getAll = function () {
        return Array.from(lt.values());
      }, n.destroy = function (t) {
        var n = lt.get(t);
        n && n.destroy();
      }, n.destroyAll = function () {
        lt.forEach(function (t) {
          t.destroy();
        });
      }, n.use = function () {
        for (var t = [], n = 0; n < arguments.length; n++) {
          t[n] = arguments[n];
        }

        return function () {
          for (var t = [], n = 0; n < arguments.length; n++) {
            t[n] = arguments[n];
          }

          t.forEach(function (t) {
            var n = t.pluginName;
            if (!n) throw new TypeError("plugin name is required");
            nt.order.add(n), nt.constructors[n] = t;
          });
        }.apply(void 0, t);
      }, n.attachStyle = function () {
        return yt();
      }, n.detachStyle = function () {
        return function () {
          if (vt && "undefined" != typeof window) {
            var t = document.getElementById(dt);
            t && t.parentNode && (t.parentNode.removeChild(t), vt = !1);
          }
        }();
      }, n.version = "8.5.0", n.ScrollbarPlugin = tt, n;
    }(pt);

    n.default = mt;
  }]).default;
});
/* Swiper Slider */

/**
 * Swiper 4.5.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 13, 2019
 */

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t();
}(this, function () {
  "use strict";

  var f = "undefined" == typeof document ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: ""
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {}
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        }
      };
    },
    location: {
      hash: ""
    }
  } : document,
      ee = "undefined" == typeof window ? {
    document: f,
    navigator: {
      userAgent: ""
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return "";
        }
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {}
  } : window,
      l = function l(e) {
    for (var t = 0; t < e.length; t += 1) {
      this[t] = e[t];
    }

    return this.length = e.length, this;
  };

  function I(e, t) {
    var a = [],
        i = 0;
    if (e && !t && e instanceof l) return e;
    if (e) if ("string" == typeof e) {
      var s,
          r,
          n = e.trim();

      if (0 <= n.indexOf("<") && 0 <= n.indexOf(">")) {
        var o = "div";

        for (0 === n.indexOf("<li") && (o = "ul"), 0 === n.indexOf("<tr") && (o = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"), 0 === n.indexOf("<tbody") && (o = "table"), 0 === n.indexOf("<option") && (o = "select"), (r = f.createElement(o)).innerHTML = n, i = 0; i < r.childNodes.length; i += 1) {
          a.push(r.childNodes[i]);
        }
      } else for (s = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || f).querySelectorAll(e.trim()) : [f.getElementById(e.trim().split("#")[1])], i = 0; i < s.length; i += 1) {
        s[i] && a.push(s[i]);
      }
    } else if (e.nodeType || e === ee || e === f) a.push(e);else if (0 < e.length && e[0].nodeType) for (i = 0; i < e.length; i += 1) {
      a.push(e[i]);
    }
    return new l(a);
  }

  function r(e) {
    for (var t = [], a = 0; a < e.length; a += 1) {
      -1 === t.indexOf(e[a]) && t.push(e[a]);
    }

    return t;
  }

  I.fn = l.prototype, I.Class = l, I.Dom7 = l;
  var t = {
    addClass: function addClass(e) {
      if (void 0 === e) return this;

      for (var t = e.split(" "), a = 0; a < t.length; a += 1) {
        for (var i = 0; i < this.length; i += 1) {
          void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.add(t[a]);
        }
      }

      return this;
    },
    removeClass: function removeClass(e) {
      for (var t = e.split(" "), a = 0; a < t.length; a += 1) {
        for (var i = 0; i < this.length; i += 1) {
          void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.remove(t[a]);
        }
      }

      return this;
    },
    hasClass: function hasClass(e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function toggleClass(e) {
      for (var t = e.split(" "), a = 0; a < t.length; a += 1) {
        for (var i = 0; i < this.length; i += 1) {
          void 0 !== this[i] && void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
        }
      }

      return this;
    },
    attr: function attr(e, t) {
      var a = arguments;
      if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;

      for (var i = 0; i < this.length; i += 1) {
        if (2 === a.length) this[i].setAttribute(e, t);else for (var s in e) {
          this[i][s] = e[s], this[i].setAttribute(s, e[s]);
        }
      }

      return this;
    },
    removeAttr: function removeAttr(e) {
      for (var t = 0; t < this.length; t += 1) {
        this[t].removeAttribute(e);
      }

      return this;
    },
    data: function data(e, t) {
      var a;

      if (void 0 !== t) {
        for (var i = 0; i < this.length; i += 1) {
          (a = this[i]).dom7ElementDataStorage || (a.dom7ElementDataStorage = {}), a.dom7ElementDataStorage[e] = t;
        }

        return this;
      }

      if (a = this[0]) {
        if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage) return a.dom7ElementDataStorage[e];
        var s = a.getAttribute("data-" + e);
        return s || void 0;
      }
    },
    transform: function transform(e) {
      for (var t = 0; t < this.length; t += 1) {
        var a = this[t].style;
        a.webkitTransform = e, a.transform = e;
      }

      return this;
    },
    transition: function transition(e) {
      "string" != typeof e && (e += "ms");

      for (var t = 0; t < this.length; t += 1) {
        var a = this[t].style;
        a.webkitTransitionDuration = e, a.transitionDuration = e;
      }

      return this;
    },
    on: function on() {
      for (var e, t = [], a = arguments.length; a--;) {
        t[a] = arguments[a];
      }

      var i = t[0],
          r = t[1],
          n = t[2],
          s = t[3];

      function o(e) {
        var t = e.target;

        if (t) {
          var a = e.target.dom7EventData || [];
          if (a.indexOf(e) < 0 && a.unshift(e), I(t).is(r)) n.apply(t, a);else for (var i = I(t).parents(), s = 0; s < i.length; s += 1) {
            I(i[s]).is(r) && n.apply(i[s], a);
          }
        }
      }

      function l(e) {
        var t = e && e.target && e.target.dom7EventData || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }

      "function" == typeof t[1] && (i = (e = t)[0], n = e[1], s = e[2], r = void 0), s = s || !1;

      for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
        var u = this[c];
        if (r) for (d = 0; d < p.length; d += 1) {
          var h = p[d];
          u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []), u.dom7LiveListeners[h].push({
            listener: n,
            proxyListener: o
          }), u.addEventListener(h, o, s);
        } else for (d = 0; d < p.length; d += 1) {
          var v = p[d];
          u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[v] || (u.dom7Listeners[v] = []), u.dom7Listeners[v].push({
            listener: n,
            proxyListener: l
          }), u.addEventListener(v, l, s);
        }
      }

      return this;
    },
    off: function off() {
      for (var e, t = [], a = arguments.length; a--;) {
        t[a] = arguments[a];
      }

      var i = t[0],
          s = t[1],
          r = t[2],
          n = t[3];
      "function" == typeof t[1] && (i = (e = t)[0], r = e[1], n = e[2], s = void 0), n = n || !1;

      for (var o = i.split(" "), l = 0; l < o.length; l += 1) {
        for (var d = o[l], p = 0; p < this.length; p += 1) {
          var c = this[p],
              u = void 0;
          if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length) for (var h = u.length - 1; 0 <= h; h -= 1) {
            var v = u[h];
            r && v.listener === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1));
          }
        }
      }

      return this;
    },
    trigger: function trigger() {
      for (var e = [], t = arguments.length; t--;) {
        e[t] = arguments[t];
      }

      for (var a = e[0].split(" "), i = e[1], s = 0; s < a.length; s += 1) {
        for (var r = a[s], n = 0; n < this.length; n += 1) {
          var o = this[n],
              l = void 0;

          try {
            l = new ee.CustomEvent(r, {
              detail: i,
              bubbles: !0,
              cancelable: !0
            });
          } catch (e) {
            (l = f.createEvent("Event")).initEvent(r, !0, !0), l.detail = i;
          }

          o.dom7EventData = e.filter(function (e, t) {
            return 0 < t;
          }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData;
        }
      }

      return this;
    },
    transitionEnd: function transitionEnd(t) {
      var a,
          i = ["webkitTransitionEnd", "transitionend"],
          s = this;

      function r(e) {
        if (e.target === this) for (t.call(this, e), a = 0; a < i.length; a += 1) {
          s.off(i[a], r);
        }
      }

      if (t) for (a = 0; a < i.length; a += 1) {
        s.on(i[a], r);
      }
      return this;
    },
    outerWidth: function outerWidth(e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"));
        }

        return this[0].offsetWidth;
      }

      return null;
    },
    outerHeight: function outerHeight(e) {
      if (0 < this.length) {
        if (e) {
          var t = this.styles();
          return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"));
        }

        return this[0].offsetHeight;
      }

      return null;
    },
    offset: function offset() {
      if (0 < this.length) {
        var e = this[0],
            t = e.getBoundingClientRect(),
            a = f.body,
            i = e.clientTop || a.clientTop || 0,
            s = e.clientLeft || a.clientLeft || 0,
            r = e === ee ? ee.scrollY : e.scrollTop,
            n = e === ee ? ee.scrollX : e.scrollLeft;
        return {
          top: t.top + r - i,
          left: t.left + n - s
        };
      }

      return null;
    },
    css: function css(e, t) {
      var a;

      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (a = 0; a < this.length; a += 1) {
            for (var i in e) {
              this[a].style[i] = e[i];
            }
          }

          return this;
        }

        if (this[0]) return ee.getComputedStyle(this[0], null).getPropertyValue(e);
      }

      if (2 !== arguments.length || "string" != typeof e) return this;

      for (a = 0; a < this.length; a += 1) {
        this[a].style[e] = t;
      }

      return this;
    },
    each: function each(e) {
      if (!e) return this;

      for (var t = 0; t < this.length; t += 1) {
        if (!1 === e.call(this[t], t, this[t])) return this;
      }

      return this;
    },
    html: function html(e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;

      for (var t = 0; t < this.length; t += 1) {
        this[t].innerHTML = e;
      }

      return this;
    },
    text: function text(e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;

      for (var t = 0; t < this.length; t += 1) {
        this[t].textContent = e;
      }

      return this;
    },
    is: function is(e) {
      var t,
          a,
          i = this[0];
      if (!i || void 0 === e) return !1;

      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);

        for (t = I(e), a = 0; a < t.length; a += 1) {
          if (t[a] === i) return !0;
        }

        return !1;
      }

      if (e === f) return i === f;
      if (e === ee) return i === ee;

      if (e.nodeType || e instanceof l) {
        for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1) {
          if (t[a] === i) return !0;
        }

        return !1;
      }

      return !1;
    },
    index: function index() {
      var e,
          t = this[0];

      if (t) {
        for (e = 0; null !== (t = t.previousSibling);) {
          1 === t.nodeType && (e += 1);
        }

        return e;
      }
    },
    eq: function eq(e) {
      if (void 0 === e) return this;
      var t,
          a = this.length;
      return new l(a - 1 < e ? [] : e < 0 ? (t = a + e) < 0 ? [] : [this[t]] : [this[e]]);
    },
    append: function append() {
      for (var e, t = [], a = arguments.length; a--;) {
        t[a] = arguments[a];
      }

      for (var i = 0; i < t.length; i += 1) {
        e = t[i];

        for (var s = 0; s < this.length; s += 1) {
          if ("string" == typeof e) {
            var r = f.createElement("div");

            for (r.innerHTML = e; r.firstChild;) {
              this[s].appendChild(r.firstChild);
            }
          } else if (e instanceof l) for (var n = 0; n < e.length; n += 1) {
            this[s].appendChild(e[n]);
          } else this[s].appendChild(e);
        }
      }

      return this;
    },
    prepend: function prepend(e) {
      var t, a;

      for (t = 0; t < this.length; t += 1) {
        if ("string" == typeof e) {
          var i = f.createElement("div");

          for (i.innerHTML = e, a = i.childNodes.length - 1; 0 <= a; a -= 1) {
            this[t].insertBefore(i.childNodes[a], this[t].childNodes[0]);
          }
        } else if (e instanceof l) for (a = 0; a < e.length; a += 1) {
          this[t].insertBefore(e[a], this[t].childNodes[0]);
        } else this[t].insertBefore(e, this[t].childNodes[0]);
      }

      return this;
    },
    next: function next(e) {
      return 0 < this.length ? e ? this[0].nextElementSibling && I(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([]);
    },
    nextAll: function nextAll(e) {
      var t = [],
          a = this[0];
      if (!a) return new l([]);

      for (; a.nextElementSibling;) {
        var i = a.nextElementSibling;
        e ? I(i).is(e) && t.push(i) : t.push(i), a = i;
      }

      return new l(t);
    },
    prev: function prev(e) {
      if (0 < this.length) {
        var t = this[0];
        return e ? t.previousElementSibling && I(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([]);
      }

      return new l([]);
    },
    prevAll: function prevAll(e) {
      var t = [],
          a = this[0];
      if (!a) return new l([]);

      for (; a.previousElementSibling;) {
        var i = a.previousElementSibling;
        e ? I(i).is(e) && t.push(i) : t.push(i), a = i;
      }

      return new l(t);
    },
    parent: function parent(e) {
      for (var t = [], a = 0; a < this.length; a += 1) {
        null !== this[a].parentNode && (e ? I(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
      }

      return I(r(t));
    },
    parents: function parents(e) {
      for (var t = [], a = 0; a < this.length; a += 1) {
        for (var i = this[a].parentNode; i;) {
          e ? I(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
        }
      }

      return I(r(t));
    },
    closest: function closest(e) {
      var t = this;
      return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function find(e) {
      for (var t = [], a = 0; a < this.length; a += 1) {
        for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) {
          t.push(i[s]);
        }
      }

      return new l(t);
    },
    children: function children(e) {
      for (var t = [], a = 0; a < this.length; a += 1) {
        for (var i = this[a].childNodes, s = 0; s < i.length; s += 1) {
          e ? 1 === i[s].nodeType && I(i[s]).is(e) && t.push(i[s]) : 1 === i[s].nodeType && t.push(i[s]);
        }
      }

      return new l(r(t));
    },
    remove: function remove() {
      for (var e = 0; e < this.length; e += 1) {
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      }

      return this;
    },
    add: function add() {
      for (var e = [], t = arguments.length; t--;) {
        e[t] = arguments[t];
      }

      var a, i;

      for (a = 0; a < e.length; a += 1) {
        var s = I(e[a]);

        for (i = 0; i < s.length; i += 1) {
          this[this.length] = s[i], this.length += 1;
        }
      }

      return this;
    },
    styles: function styles() {
      return this[0] ? ee.getComputedStyle(this[0], null) : {};
    }
  };
  Object.keys(t).forEach(function (e) {
    I.fn[e] = I.fn[e] || t[e];
  });

  function e(e) {
    void 0 === e && (e = {});
    var t = this;
    t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
      t.on(e, t.params.on[e]);
    });
  }

  var a,
      i,
      s,
      n,
      te = {
    deleteProps: function deleteProps(e) {
      var t = e;
      Object.keys(t).forEach(function (e) {
        try {
          t[e] = null;
        } catch (e) {}

        try {
          delete t[e];
        } catch (e) {}
      });
    },
    nextTick: function nextTick(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(e, t) {
      var a, i, s;
      void 0 === t && (t = "x");
      var r = ee.getComputedStyle(e, null);
      return ee.WebKitCSSMatrix ? (6 < (i = r.transform || r.webkitTransform).split(",").length && (i = i.split(", ").map(function (e) {
        return e.replace(",", ".");
      }).join(", ")), s = new ee.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = ee.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = ee.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0;
    },
    parseUrlQuery: function parseUrlQuery(e) {
      var t,
          a,
          i,
          s,
          r = {},
          n = e || ee.location.href;
      if ("string" == typeof n && n.length) for (s = (a = (n = -1 < n.indexOf("?") ? n.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
        return "" !== e;
      })).length, t = 0; t < s; t += 1) {
        i = a[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(i[0])] = void 0 === i[1] ? void 0 : decodeURIComponent(i[1]) || "";
      }
      return r;
    },
    isObject: function isObject(e) {
      return "object" == _typeof(e) && null !== e && e.constructor && e.constructor === Object;
    },
    extend: function extend() {
      for (var e = [], t = arguments.length; t--;) {
        e[t] = arguments[t];
      }

      for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
        var s = e[i];
        if (null != s) for (var r = Object.keys(Object(s)), n = 0, o = r.length; n < o; n += 1) {
          var l = r[n],
              d = Object.getOwnPropertyDescriptor(s, l);
          void 0 !== d && d.enumerable && (te.isObject(a[l]) && te.isObject(s[l]) ? te.extend(a[l], s[l]) : !te.isObject(a[l]) && te.isObject(s[l]) ? (a[l] = {}, te.extend(a[l], s[l])) : a[l] = s[l]);
        }
      }

      return a;
    }
  },
      ae = (s = f.createElement("div"), {
    touch: ee.Modernizr && !0 === ee.Modernizr.touch || !!(0 < ee.navigator.maxTouchPoints || "ontouchstart" in ee || ee.DocumentTouch && f instanceof ee.DocumentTouch),
    pointerEvents: !!(ee.navigator.pointerEnabled || ee.PointerEvent || "maxTouchPoints" in ee.navigator && 0 < ee.navigator.maxTouchPoints),
    prefixedPointerEvents: !!ee.navigator.msPointerEnabled,
    transition: (i = s.style, "transition" in i || "webkitTransition" in i || "MozTransition" in i),
    transforms3d: ee.Modernizr && !0 === ee.Modernizr.csstransforms3d || (a = s.style, "webkitPerspective" in a || "MozPerspective" in a || "OPerspective" in a || "MsPerspective" in a || "perspective" in a),
    flexbox: function () {
      for (var e = s.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a += 1) {
        if (t[a] in e) return !0;
      }

      return !1;
    }(),
    observer: "MutationObserver" in ee || "WebkitMutationObserver" in ee,
    passiveListener: function () {
      var e = !1;

      try {
        var t = Object.defineProperty({}, "passive", {
          get: function get() {
            e = !0;
          }
        });
        ee.addEventListener("testPassiveListener", null, t);
      } catch (e) {}

      return e;
    }(),
    gestures: "ongesturestart" in ee
  }),
      ie = {
    isIE: !!ee.navigator.userAgent.match(/Trident/g) || !!ee.navigator.userAgent.match(/MSIE/g),
    isEdge: !!ee.navigator.userAgent.match(/Edge/g),
    isSafari: (n = ee.navigator.userAgent.toLowerCase(), 0 <= n.indexOf("safari") && n.indexOf("chrome") < 0 && n.indexOf("android") < 0),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ee.navigator.userAgent)
  },
      o = {
    components: {
      configurable: !0
    }
  };
  e.prototype.on = function (e, t, a) {
    var i = this;
    if ("function" != typeof t) return i;
    var s = a ? "unshift" : "push";
    return e.split(" ").forEach(function (e) {
      i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t);
    }), i;
  }, e.prototype.once = function (a, i, e) {
    var s = this;
    if ("function" != typeof i) return s;

    function r() {
      for (var e = [], t = arguments.length; t--;) {
        e[t] = arguments[t];
      }

      i.apply(s, e), s.off(a, r), r.f7proxy && delete r.f7proxy;
    }

    return r.f7proxy = i, s.on(a, r, e);
  }, e.prototype.off = function (e, i) {
    var s = this;
    return s.eventsListeners && e.split(" ").forEach(function (a) {
      void 0 === i ? s.eventsListeners[a] = [] : s.eventsListeners[a] && s.eventsListeners[a].length && s.eventsListeners[a].forEach(function (e, t) {
        (e === i || e.f7proxy && e.f7proxy === i) && s.eventsListeners[a].splice(t, 1);
      });
    }), s;
  }, e.prototype.emit = function () {
    for (var e = [], t = arguments.length; t--;) {
      e[t] = arguments[t];
    }

    var a,
        i,
        s,
        r = this;
    return r.eventsListeners && (s = "string" == typeof e[0] || Array.isArray(e[0]) ? (a = e[0], i = e.slice(1, e.length), r) : (a = e[0].events, i = e[0].data, e[0].context || r), (Array.isArray(a) ? a : a.split(" ")).forEach(function (e) {
      if (r.eventsListeners && r.eventsListeners[e]) {
        var t = [];
        r.eventsListeners[e].forEach(function (e) {
          t.push(e);
        }), t.forEach(function (e) {
          e.apply(s, i);
        });
      }
    })), r;
  }, e.prototype.useModulesParams = function (a) {
    var i = this;
    i.modules && Object.keys(i.modules).forEach(function (e) {
      var t = i.modules[e];
      t.params && te.extend(a, t.params);
    });
  }, e.prototype.useModules = function (i) {
    void 0 === i && (i = {});
    var s = this;
    s.modules && Object.keys(s.modules).forEach(function (e) {
      var a = s.modules[e],
          t = i[e] || {};
      a.instance && Object.keys(a.instance).forEach(function (e) {
        var t = a.instance[e];
        s[e] = "function" == typeof t ? t.bind(s) : t;
      }), a.on && s.on && Object.keys(a.on).forEach(function (e) {
        s.on(e, a.on[e]);
      }), a.create && a.create.bind(s)(t);
    });
  }, o.components.set = function (e) {
    this.use && this.use(e);
  }, e.installModule = function (t) {
    for (var e = [], a = arguments.length - 1; 0 < a--;) {
      e[a] = arguments[a + 1];
    }

    var i = this;
    i.prototype.modules || (i.prototype.modules = {});
    var s = t.name || Object.keys(i.prototype.modules).length + "_" + te.now();
    return (i.prototype.modules[s] = t).proto && Object.keys(t.proto).forEach(function (e) {
      i.prototype[e] = t.proto[e];
    }), t.static && Object.keys(t.static).forEach(function (e) {
      i[e] = t.static[e];
    }), t.install && t.install.apply(i, e), i;
  }, e.use = function (e) {
    for (var t = [], a = arguments.length - 1; 0 < a--;) {
      t[a] = arguments[a + 1];
    }

    var i = this;
    return Array.isArray(e) ? (e.forEach(function (e) {
      return i.installModule(e);
    }), i) : i.installModule.apply(i, [e].concat(t));
  }, Object.defineProperties(e, o);
  var d = {
    updateSize: function updateSize() {
      var e,
          t,
          a = this,
          i = a.$el;
      e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), te.extend(a, {
        width: e,
        height: t,
        size: a.isHorizontal() ? e : t
      }));
    },
    updateSlides: function updateSlides() {
      var e = this,
          t = e.params,
          a = e.$wrapperEl,
          i = e.size,
          s = e.rtlTranslate,
          r = e.wrongRTL,
          n = e.virtual && t.virtual.enabled,
          o = n ? e.virtual.slides.length : e.slides.length,
          l = a.children("." + e.params.slideClass),
          d = n ? e.virtual.slides.length : l.length,
          p = [],
          c = [],
          u = [],
          h = t.slidesOffsetBefore;
      "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
      var v = t.slidesOffsetAfter;
      "function" == typeof v && (v = t.slidesOffsetAfter.call(e));
      var f = e.snapGrid.length,
          m = e.snapGrid.length,
          g = t.spaceBetween,
          b = -h,
          w = 0,
          y = 0;

      if (void 0 !== i) {
        var x, T;
        "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * i), e.virtualSize = -g, s ? l.css({
          marginLeft: "",
          marginTop: ""
        }) : l.css({
          marginRight: "",
          marginBottom: ""
        }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));

        for (var E, S = t.slidesPerColumn, C = x / S, M = Math.floor(d / t.slidesPerColumn), P = 0; P < d; P += 1) {
          T = 0;
          var k = l.eq(P);

          if (1 < t.slidesPerColumn) {
            var z = void 0,
                $ = void 0,
                I = void 0;

            if ("column" === t.slidesPerColumnFill || "row" === t.slidesPerColumnFill && 1 < t.slidesPerGroup) {
              if ("column" === t.slidesPerColumnFill) I = P - ($ = Math.floor(P / S)) * S, (M < $ || $ === M && I === S - 1) && S <= (I += 1) && (I = 0, $ += 1);else {
                var L = Math.floor(P / t.slidesPerGroup);
                $ = P - (I = Math.floor(P / t.slidesPerView) - L * t.slidesPerColumn) * t.slidesPerView - L * t.slidesPerView;
              }
              z = $ + I * x / S, k.css({
                "-webkit-box-ordinal-group": z,
                "-moz-box-ordinal-group": z,
                "-ms-flex-order": z,
                "-webkit-order": z,
                order: z
              });
            } else $ = P - (I = Math.floor(P / C)) * C;

            k.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== I && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", $).attr("data-swiper-row", I);
          }

          if ("none" !== k.css("display")) {
            if ("auto" === t.slidesPerView) {
              var D = ee.getComputedStyle(k[0], null),
                  O = k[0].style.transform,
                  A = k[0].style.webkitTransform;
              if (O && (k[0].style.transform = "none"), A && (k[0].style.webkitTransform = "none"), t.roundLengths) T = e.isHorizontal() ? k.outerWidth(!0) : k.outerHeight(!0);else if (e.isHorizontal()) {
                var H = parseFloat(D.getPropertyValue("width")),
                    G = parseFloat(D.getPropertyValue("padding-left")),
                    N = parseFloat(D.getPropertyValue("padding-right")),
                    B = parseFloat(D.getPropertyValue("margin-left")),
                    X = parseFloat(D.getPropertyValue("margin-right")),
                    V = D.getPropertyValue("box-sizing");
                T = V && "border-box" === V && !ie.isIE ? H + B + X : H + G + N + B + X;
              } else {
                var Y = parseFloat(D.getPropertyValue("height")),
                    F = parseFloat(D.getPropertyValue("padding-top")),
                    R = parseFloat(D.getPropertyValue("padding-bottom")),
                    q = parseFloat(D.getPropertyValue("margin-top")),
                    W = parseFloat(D.getPropertyValue("margin-bottom")),
                    j = D.getPropertyValue("box-sizing");
                T = j && "border-box" === j && !ie.isIE ? Y + q + W : Y + F + R + q + W;
              }
              O && (k[0].style.transform = O), A && (k[0].style.webkitTransform = A), t.roundLengths && (T = Math.floor(T));
            } else T = (i - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), l[P] && (e.isHorizontal() ? l[P].style.width = T + "px" : l[P].style.height = T + "px");

            l[P] && (l[P].swiperSlideSize = T), u.push(T), t.centeredSlides ? (b = b + T / 2 + w / 2 + g, 0 === w && 0 !== P && (b = b - i / 2 - g), 0 === P && (b = b - i / 2 - g), Math.abs(b) < .001 && (b = 0), t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b)) : (t.roundLengths && (b = Math.floor(b)), y % t.slidesPerGroup == 0 && p.push(b), c.push(b), b = b + T + g), e.virtualSize += T + g, w = T, y += 1;
          }
        }

        if (e.virtualSize = Math.max(e.virtualSize, i) + v, s && r && ("slide" === t.effect || "coverflow" === t.effect) && a.css({
          width: e.virtualSize + t.spaceBetween + "px"
        }), ae.flexbox && !t.setWrapperSize || (e.isHorizontal() ? a.css({
          width: e.virtualSize + t.spaceBetween + "px"
        }) : a.css({
          height: e.virtualSize + t.spaceBetween + "px"
        })), 1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? a.css({
          width: e.virtualSize + t.spaceBetween + "px"
        }) : a.css({
          height: e.virtualSize + t.spaceBetween + "px"
        }), t.centeredSlides)) {
          E = [];

          for (var U = 0; U < p.length; U += 1) {
            var K = p[U];
            t.roundLengths && (K = Math.floor(K)), p[U] < e.virtualSize + p[0] && E.push(K);
          }

          p = E;
        }

        if (!t.centeredSlides) {
          E = [];

          for (var _ = 0; _ < p.length; _ += 1) {
            var Z = p[_];
            t.roundLengths && (Z = Math.floor(Z)), p[_] <= e.virtualSize - i && E.push(Z);
          }

          p = E, 1 < Math.floor(e.virtualSize - i) - Math.floor(p[p.length - 1]) && p.push(e.virtualSize - i);
        }

        if (0 === p.length && (p = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? s ? l.css({
          marginLeft: g + "px"
        }) : l.css({
          marginRight: g + "px"
        }) : l.css({
          marginBottom: g + "px"
        })), t.centerInsufficientSlides) {
          var Q = 0;

          if (u.forEach(function (e) {
            Q += e + (t.spaceBetween ? t.spaceBetween : 0);
          }), (Q -= t.spaceBetween) < i) {
            var J = (i - Q) / 2;
            p.forEach(function (e, t) {
              p[t] = e - J;
            }), c.forEach(function (e, t) {
              c[t] = e + J;
            });
          }
        }

        te.extend(e, {
          slides: l,
          snapGrid: p,
          slidesGrid: c,
          slidesSizesGrid: u
        }), d !== o && e.emit("slidesLengthChange"), p.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), c.length !== m && e.emit("slidesGridLengthChange"), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset();
      }
    },
    updateAutoHeight: function updateAutoHeight(e) {
      var t,
          a = this,
          i = [],
          s = 0;
      if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView) for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
        var r = a.activeIndex + t;
        if (r > a.slides.length) break;
        i.push(a.slides.eq(r)[0]);
      } else i.push(a.slides.eq(a.activeIndex)[0]);

      for (t = 0; t < i.length; t += 1) {
        if (void 0 !== i[t]) {
          var n = i[t].offsetHeight;
          s = s < n ? n : s;
        }
      }

      s && a.$wrapperEl.css("height", s + "px");
    },
    updateSlidesOffset: function updateSlidesOffset() {
      for (var e = this.slides, t = 0; t < e.length; t += 1) {
        e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop;
      }
    },
    updateSlidesProgress: function updateSlidesProgress(e) {
      void 0 === e && (e = this && this.translate || 0);
      var t = this,
          a = t.params,
          i = t.slides,
          s = t.rtlTranslate;

      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        var r = -e;
        s && (r = e), i.removeClass(a.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];

        for (var n = 0; n < i.length; n += 1) {
          var o = i[n],
              l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);

          if (a.watchSlidesVisibility) {
            var d = -(r - o.swiperSlideOffset),
                p = d + t.slidesSizesGrid[n];
            (0 <= d && d < t.size - 1 || 1 < p && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(n), i.eq(n).addClass(a.slideVisibleClass));
          }

          o.progress = s ? -l : l;
        }

        t.visibleSlides = I(t.visibleSlides);
      }
    },
    updateProgress: function updateProgress(e) {
      void 0 === e && (e = this && this.translate || 0);
      var t = this,
          a = t.params,
          i = t.maxTranslate() - t.minTranslate(),
          s = t.progress,
          r = t.isBeginning,
          n = t.isEnd,
          o = r,
          l = n;
      n = 0 == i ? r = !(s = 0) : (r = (s = (e - t.minTranslate()) / i) <= 0, 1 <= s), te.extend(t, {
        progress: s,
        isBeginning: r,
        isEnd: n
      }), (a.watchSlidesProgress || a.watchSlidesVisibility) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !l && t.emit("reachEnd toEdge"), (o && !r || l && !n) && t.emit("fromEdge"), t.emit("progress", s);
    },
    updateSlidesClasses: function updateSlidesClasses() {
      var e,
          t = this,
          a = t.slides,
          i = t.params,
          s = t.$wrapperEl,
          r = t.activeIndex,
          n = t.realIndex,
          o = t.virtual && i.virtual.enabled;
      a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
      var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
      var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
      i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass));
    },
    updateActiveIndex: function updateActiveIndex(e) {
      var t,
          a = this,
          i = a.rtlTranslate ? a.translate : -a.translate,
          s = a.slidesGrid,
          r = a.snapGrid,
          n = a.params,
          o = a.activeIndex,
          l = a.realIndex,
          d = a.snapIndex,
          p = e;

      if (void 0 === p) {
        for (var c = 0; c < s.length; c += 1) {
          void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
        }

        n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0);
      }

      if ((t = 0 <= r.indexOf(i) ? r.indexOf(i) : Math.floor(p / n.slidesPerGroup)) >= r.length && (t = r.length - 1), p !== o) {
        var u = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
        te.extend(a, {
          snapIndex: t,
          realIndex: u,
          previousIndex: o,
          activeIndex: p
        }), a.emit("activeIndexChange"), a.emit("snapIndexChange"), l !== u && a.emit("realIndexChange"), (a.initialized || a.runCallbacksOnInit) && a.emit("slideChange");
      } else t !== d && (a.snapIndex = t, a.emit("snapIndexChange"));
    },
    updateClickedSlide: function updateClickedSlide(e) {
      var t = this,
          a = t.params,
          i = I(e.target).closest("." + a.slideClass)[0],
          s = !1;
      if (i) for (var r = 0; r < t.slides.length; r += 1) {
        t.slides[r] === i && (s = !0);
      }
      if (!i || !s) return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
      t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(I(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = I(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
    }
  };
  var p = {
    getTranslate: function getTranslate(e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      var t = this.params,
          a = this.rtlTranslate,
          i = this.translate,
          s = this.$wrapperEl;
      if (t.virtualTranslate) return a ? -i : i;
      var r = te.getTranslate(s[0], e);
      return a && (r = -r), r || 0;
    },
    setTranslate: function setTranslate(e, t) {
      var a = this,
          i = a.rtlTranslate,
          s = a.params,
          r = a.$wrapperEl,
          n = a.progress,
          o = 0,
          l = 0;
      a.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.virtualTranslate || (ae.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : l;
      var d = a.maxTranslate() - a.minTranslate();
      (0 == d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e), a.emit("setTranslate", a.translate, t);
    },
    minTranslate: function minTranslate() {
      return -this.snapGrid[0];
    },
    maxTranslate: function maxTranslate() {
      return -this.snapGrid[this.snapGrid.length - 1];
    }
  };
  var c = {
    setTransition: function setTransition(e, t) {
      this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
    },
    transitionStart: function transitionStart(e, t) {
      void 0 === e && (e = !0);
      var a = this,
          i = a.activeIndex,
          s = a.params,
          r = a.previousIndex;
      s.autoHeight && a.updateAutoHeight();
      var n = t;

      if (n = n || (r < i ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) {
        if ("reset" === n) return void a.emit("slideResetTransitionStart");
        a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart");
      }
    },
    transitionEnd: function transitionEnd(e, t) {
      void 0 === e && (e = !0);
      var a = this,
          i = a.activeIndex,
          s = a.previousIndex;
      a.animating = !1, a.setTransition(0);
      var r = t;

      if (r = r || (s < i ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) {
        if ("reset" === r) return void a.emit("slideResetTransitionEnd");
        a.emit("slideChangeTransitionEnd"), "next" === r ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd");
      }
    }
  };
  var u = {
    slideTo: function slideTo(e, t, a, i) {
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
      var s = this,
          r = e;
      r < 0 && (r = 0);
      var n = s.params,
          o = s.snapGrid,
          l = s.slidesGrid,
          d = s.previousIndex,
          p = s.activeIndex,
          c = s.rtlTranslate;
      if (s.animating && n.preventInteractionOnTransition) return !1;
      var u = Math.floor(r / n.slidesPerGroup);
      u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && a && s.emit("beforeSlideChangeStart");
      var h,
          v = -o[u];
      if (s.updateProgress(v), n.normalizeSlideIndex) for (var f = 0; f < l.length; f += 1) {
        -Math.floor(100 * v) >= Math.floor(100 * l[f]) && (r = f);
      }

      if (s.initialized && r !== p) {
        if (!s.allowSlideNext && v < s.translate && v < s.minTranslate()) return !1;
        if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== r) return !1;
      }

      return h = p < r ? "next" : r < p ? "prev" : "reset", c && -v === s.translate || !c && v === s.translate ? (s.updateActiveIndex(r), n.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== n.effect && s.setTranslate(v), "reset" !== h && (s.transitionStart(a, h), s.transitionEnd(a, h)), !1) : (0 !== t && ae.transition ? (s.setTransition(t), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function (e) {
        s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(a, h));
      }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))) : (s.setTransition(0), s.setTranslate(v), s.updateActiveIndex(r), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(a, h), s.transitionEnd(a, h)), !0);
    },
    slideToLoop: function slideToLoop(e, t, a, i) {
      void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
      var s = e;
      return this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i);
    },
    slideNext: function slideNext(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
          s = i.params,
          r = i.animating;
      return s.loop ? !r && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a);
    },
    slidePrev: function slidePrev(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
          s = i.params,
          r = i.animating,
          n = i.snapGrid,
          o = i.slidesGrid,
          l = i.rtlTranslate;

      if (s.loop) {
        if (r) return !1;
        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft;
      }

      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }

      var p,
          c = d(l ? i.translate : -i.translate),
          u = n.map(function (e) {
        return d(e);
      }),
          h = (o.map(function (e) {
        return d(e);
      }), n[u.indexOf(c)], n[u.indexOf(c) - 1]);
      return void 0 !== h && (p = o.indexOf(h)) < 0 && (p = i.activeIndex - 1), i.slideTo(p, e, t, a);
    },
    slideReset: function slideReset(e, t, a) {
      return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a);
    },
    slideToClosest: function slideToClosest(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var i = this,
          s = i.activeIndex,
          r = Math.floor(s / i.params.slidesPerGroup);

      if (r < i.snapGrid.length - 1) {
        var n = i.rtlTranslate ? i.translate : -i.translate,
            o = i.snapGrid[r];
        (i.snapGrid[r + 1] - o) / 2 < n - o && (s = i.params.slidesPerGroup);
      }

      return i.slideTo(s, e, t, a);
    },
    slideToClickedSlide: function slideToClickedSlide() {
      var e,
          t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView,
          r = t.clickedIndex;

      if (a.loop) {
        if (t.animating) return;
        e = parseInt(I(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), te.nextTick(function () {
          t.slideTo(r);
        })) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), te.nextTick(function () {
          t.slideTo(r);
        })) : t.slideTo(r);
      } else t.slideTo(r);
    }
  };
  var h = {
    loopCreate: function loopCreate() {
      var i = this,
          e = i.params,
          t = i.$wrapperEl;
      t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
      var s = t.children("." + e.slideClass);

      if (e.loopFillGroupWithBlank) {
        var a = e.slidesPerGroup - s.length % e.slidesPerGroup;

        if (a !== e.slidesPerGroup) {
          for (var r = 0; r < a; r += 1) {
            var n = I(f.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
            t.append(n);
          }

          s = t.children("." + e.slideClass);
        }
      }

      "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = s.length), i.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), i.loopedSlides += e.loopAdditionalSlides, i.loopedSlides > s.length && (i.loopedSlides = s.length);
      var o = [],
          l = [];
      s.each(function (e, t) {
        var a = I(t);
        e < i.loopedSlides && l.push(t), e < s.length && e >= s.length - i.loopedSlides && o.push(t), a.attr("data-swiper-slide-index", e);
      });

      for (var d = 0; d < l.length; d += 1) {
        t.append(I(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
      }

      for (var p = o.length - 1; 0 <= p; p -= 1) {
        t.prepend(I(o[p].cloneNode(!0)).addClass(e.slideDuplicateClass));
      }
    },
    loopFix: function loopFix() {
      var e,
          t = this,
          a = t.params,
          i = t.activeIndex,
          s = t.slides,
          r = t.loopedSlides,
          n = t.allowSlidePrev,
          o = t.allowSlideNext,
          l = t.snapGrid,
          d = t.rtlTranslate;
      t.allowSlidePrev = !0, t.allowSlideNext = !0;
      var p = -l[i] - t.getTranslate();
      if (i < r) e = s.length - 3 * r + i, e += r, t.slideTo(e, 0, !1, !0) && 0 != p && t.setTranslate((d ? -t.translate : t.translate) - p);else if ("auto" === a.slidesPerView && 2 * r <= i || i >= s.length - r) {
        e = -s.length + i + r, e += r, t.slideTo(e, 0, !1, !0) && 0 != p && t.setTranslate((d ? -t.translate : t.translate) - p);
      }
      t.allowSlidePrev = n, t.allowSlideNext = o;
    },
    loopDestroy: function loopDestroy() {
      var e = this.$wrapperEl,
          t = this.params,
          a = this.slides;
      e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), a.removeAttr("data-swiper-slide-index");
    }
  };
  var v = {
    setGrabCursor: function setGrabCursor(e) {
      if (!(ae.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
        var t = this.el;
        t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab";
      }
    },
    unsetGrabCursor: function unsetGrabCursor() {
      ae.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "");
    }
  };

  var m = {
    appendSlide: function appendSlide(e) {
      var t = this,
          a = t.$wrapperEl,
          i = t.params;
      if (i.loop && t.loopDestroy(), "object" == _typeof(e) && "length" in e) for (var s = 0; s < e.length; s += 1) {
        e[s] && a.append(e[s]);
      } else a.append(e);
      i.loop && t.loopCreate(), i.observer && ae.observer || t.update();
    },
    prependSlide: function prependSlide(e) {
      var t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = t.activeIndex;
      a.loop && t.loopDestroy();
      var r = s + 1;

      if ("object" == _typeof(e) && "length" in e) {
        for (var n = 0; n < e.length; n += 1) {
          e[n] && i.prepend(e[n]);
        }

        r = s + e.length;
      } else i.prepend(e);

      a.loop && t.loopCreate(), a.observer && ae.observer || t.update(), t.slideTo(r, 0, !1);
    },
    addSlide: function addSlide(e, t) {
      var a = this,
          i = a.$wrapperEl,
          s = a.params,
          r = a.activeIndex;
      s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass));
      var n = a.slides.length;
      if (e <= 0) a.prependSlide(t);else if (n <= e) a.appendSlide(t);else {
        for (var o = e < r ? r + 1 : r, l = [], d = n - 1; e <= d; d -= 1) {
          var p = a.slides.eq(d);
          p.remove(), l.unshift(p);
        }

        if ("object" == _typeof(t) && "length" in t) {
          for (var c = 0; c < t.length; c += 1) {
            t[c] && i.append(t[c]);
          }

          o = e < r ? r + t.length : r;
        } else i.append(t);

        for (var u = 0; u < l.length; u += 1) {
          i.append(l[u]);
        }

        s.loop && a.loopCreate(), s.observer && ae.observer || a.update(), s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1);
      }
    },
    removeSlide: function removeSlide(e) {
      var t = this,
          a = t.params,
          i = t.$wrapperEl,
          s = t.activeIndex;
      a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass));
      var r,
          n = s;

      if ("object" == _typeof(e) && "length" in e) {
        for (var o = 0; o < e.length; o += 1) {
          r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
        }

        n = Math.max(n, 0);
      } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);

      a.loop && t.loopCreate(), a.observer && ae.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
    },
    removeAllSlides: function removeAllSlides() {
      for (var e = [], t = 0; t < this.slides.length; t += 1) {
        e.push(t);
      }

      this.removeSlide(e);
    }
  },
      g = function () {
    var e = ee.navigator.userAgent,
        t = {
      ios: !1,
      android: !1,
      androidChrome: !1,
      desktop: !1,
      windows: !1,
      iphone: !1,
      ipod: !1,
      ipad: !1,
      cordova: ee.cordova || ee.phonegap,
      phonegap: ee.cordova || ee.phonegap
    },
        a = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
        i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        s = e.match(/(iPad).*OS\s([\d_]+)/),
        r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        n = !s && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);

    if (a && (t.os = "windows", t.osVersion = a[2], t.windows = !0), i && !a && (t.os = "android", t.osVersion = i[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), (s || n || r) && (t.os = "ios", t.ios = !0), n && !r && (t.osVersion = n[2].replace(/_/g, "."), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, "."), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (n || s || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) {
      var o = t.osVersion.split("."),
          l = f.querySelector('meta[name="viewport"]');
      t.minimalUi = !t.webView && (r || n) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui");
    }

    return t.pixelRatio = ee.devicePixelRatio || 1, t;
  }();

  function b() {
    var e = this,
        t = e.params,
        a = e.el;

    if (!a || 0 !== a.offsetWidth) {
      t.breakpoints && e.setBreakpoint();
      var i = e.allowSlideNext,
          s = e.allowSlidePrev,
          r = e.snapGrid;

      if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
        var n = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
        e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight();
      } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);

      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
  }

  var w = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "container",
    initialSlide: 0,
    speed: 300,
    preventInteractionOnTransition: !1,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    freeMode: !1,
    freeModeMomentum: !0,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: !0,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: !1,
    freeModeMinimumVelocity: .02,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsInverse: !1,
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: "column",
    slidesPerGroup: 1,
    centeredSlides: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !1,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !0,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    watchSlidesVisibility: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-container-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0
  },
      y = {
    update: d,
    translate: p,
    transition: c,
    slide: u,
    loop: h,
    grabCursor: v,
    manipulation: m,
    events: {
      attachEvents: function attachEvents() {
        var e = this,
            t = e.params,
            a = e.touchEvents,
            i = e.el,
            s = e.wrapperEl;
        e.onTouchStart = function (e) {
          var t = this,
              a = t.touchEventsData,
              i = t.params,
              s = t.touches;

          if (!t.animating || !i.preventInteractionOnTransition) {
            var r = e;
            if (r.originalEvent && (r = r.originalEvent), a.isTouchEvent = "touchstart" === r.type, (a.isTouchEvent || !("which" in r) || 3 !== r.which) && !(!a.isTouchEvent && "button" in r && 0 < r.button || a.isTouched && a.isMoved)) if (i.noSwiping && I(r.target).closest(i.noSwipingSelector ? i.noSwipingSelector : "." + i.noSwipingClass)[0]) t.allowClick = !0;else if (!i.swipeHandler || I(r).closest(i.swipeHandler)[0]) {
              s.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, s.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
              var n = s.currentX,
                  o = s.currentY,
                  l = i.edgeSwipeDetection || i.iOSEdgeSwipeDetection,
                  d = i.edgeSwipeThreshold || i.iOSEdgeSwipeThreshold;

              if (!l || !(n <= d || n >= ee.screen.width - d)) {
                if (te.extend(a, {
                  isTouched: !0,
                  isMoved: !1,
                  allowTouchCallbacks: !0,
                  isScrolling: void 0,
                  startMoving: void 0
                }), s.startX = n, s.startY = o, a.touchStartTime = te.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < i.threshold && (a.allowThresholdMove = !1), "touchstart" !== r.type) {
                  var p = !0;
                  I(r.target).is(a.formElements) && (p = !1), f.activeElement && I(f.activeElement).is(a.formElements) && f.activeElement !== r.target && f.activeElement.blur();
                  var c = p && t.allowTouchMove && i.touchStartPreventDefault;
                  (i.touchStartForcePreventDefault || c) && r.preventDefault();
                }

                t.emit("touchStart", r);
              }
            }
          }
        }.bind(e), e.onTouchMove = function (e) {
          var t = this,
              a = t.touchEventsData,
              i = t.params,
              s = t.touches,
              r = t.rtlTranslate,
              n = e;

          if (n.originalEvent && (n = n.originalEvent), a.isTouched) {
            if (!a.isTouchEvent || "mousemove" !== n.type) {
              var o = "touchmove" === n.type ? n.targetTouches[0].pageX : n.pageX,
                  l = "touchmove" === n.type ? n.targetTouches[0].pageY : n.pageY;
              if (n.preventedByNestedSwiper) return s.startX = o, void (s.startY = l);
              if (!t.allowTouchMove) return t.allowClick = !1, void (a.isTouched && (te.extend(s, {
                startX: o,
                startY: l,
                currentX: o,
                currentY: l
              }), a.touchStartTime = te.now()));
              if (a.isTouchEvent && i.touchReleaseOnEdges && !i.loop) if (t.isVertical()) {
                if (l < s.startY && t.translate <= t.maxTranslate() || l > s.startY && t.translate >= t.minTranslate()) return a.isTouched = !1, void (a.isMoved = !1);
              } else if (o < s.startX && t.translate <= t.maxTranslate() || o > s.startX && t.translate >= t.minTranslate()) return;
              if (a.isTouchEvent && f.activeElement && n.target === f.activeElement && I(n.target).is(a.formElements)) return a.isMoved = !0, void (t.allowClick = !1);

              if (a.allowTouchCallbacks && t.emit("touchMove", n), !(n.targetTouches && 1 < n.targetTouches.length)) {
                s.currentX = o, s.currentY = l;
                var d = s.currentX - s.startX,
                    p = s.currentY - s.startY;

                if (!(t.params.threshold && Math.sqrt(Math.pow(d, 2) + Math.pow(p, 2)) < t.params.threshold)) {
                  var c;
                  if (void 0 === a.isScrolling) t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= d * d + p * p && (c = 180 * Math.atan2(Math.abs(p), Math.abs(d)) / Math.PI, a.isScrolling = t.isHorizontal() ? c > i.touchAngle : 90 - c > i.touchAngle);
                  if (a.isScrolling && t.emit("touchMoveOpposite", n), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1;else if (a.startMoving) {
                    t.allowClick = !1, n.preventDefault(), i.touchMoveStopPropagation && !i.nested && n.stopPropagation(), a.isMoved || (i.loop && t.loopFix(), a.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !i.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", n)), t.emit("sliderMove", n), a.isMoved = !0;
                    var u = t.isHorizontal() ? d : p;
                    s.diff = u, u *= i.touchRatio, r && (u = -u), t.swipeDirection = 0 < u ? "prev" : "next", a.currentTranslate = u + a.startTranslate;
                    var h = !0,
                        v = i.resistanceRatio;

                    if (i.touchReleaseOnEdges && (v = 0), 0 < u && a.currentTranslate > t.minTranslate() ? (h = !1, i.resistance && (a.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + a.startTranslate + u, v))) : u < 0 && a.currentTranslate < t.maxTranslate() && (h = !1, i.resistance && (a.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - a.startTranslate - u, v))), h && (n.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), 0 < i.threshold) {
                      if (!(Math.abs(u) > i.threshold || a.allowThresholdMove)) return void (a.currentTranslate = a.startTranslate);
                      if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void (s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY);
                    }

                    i.followFinger && ((i.freeMode || i.watchSlidesProgress || i.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && (0 === a.velocities.length && a.velocities.push({
                      position: s[t.isHorizontal() ? "startX" : "startY"],
                      time: a.touchStartTime
                    }), a.velocities.push({
                      position: s[t.isHorizontal() ? "currentX" : "currentY"],
                      time: te.now()
                    })), t.updateProgress(a.currentTranslate), t.setTranslate(a.currentTranslate));
                  }
                }
              }
            }
          } else a.startMoving && a.isScrolling && t.emit("touchMoveOpposite", n);
        }.bind(e), e.onTouchEnd = function (e) {
          var t = this,
              a = t.touchEventsData,
              i = t.params,
              s = t.touches,
              r = t.rtlTranslate,
              n = t.$wrapperEl,
              o = t.slidesGrid,
              l = t.snapGrid,
              d = e;
          if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void (a.startMoving = !1);
          i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
          var p,
              c = te.now(),
              u = c - a.touchStartTime;
          if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), u < 300 && 300 < c - a.lastClickTime && (a.clickTimeout && clearTimeout(a.clickTimeout), a.clickTimeout = te.nextTick(function () {
            t && !t.destroyed && t.emit("click", d);
          }, 300)), u < 300 && c - a.lastClickTime < 300 && (a.clickTimeout && clearTimeout(a.clickTimeout), t.emit("doubleTap", d))), a.lastClickTime = te.now(), te.nextTick(function () {
            t.destroyed || (t.allowClick = !0);
          }), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void (a.startMoving = !1);

          if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, i.freeMode) {
            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (p > -t.maxTranslate()) return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));

            if (i.freeModeMomentum) {
              if (1 < a.velocities.length) {
                var h = a.velocities.pop(),
                    v = a.velocities.pop(),
                    f = h.position - v.position,
                    m = h.time - v.time;
                t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (150 < m || 300 < te.now() - h.time) && (t.velocity = 0);
              } else t.velocity = 0;

              t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
              var g = 1e3 * i.freeModeMomentumRatio,
                  b = t.velocity * g,
                  w = t.translate + b;
              r && (w = -w);
              var y,
                  x,
                  T = !1,
                  E = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
              if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E), y = t.maxTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (x = !0);else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E), y = t.minTranslate(), T = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (x = !0);else if (i.freeModeSticky) {
                for (var S, C = 0; C < l.length; C += 1) {
                  if (l[C] > -w) {
                    S = C;
                    break;
                  }
                }

                w = -(w = Math.abs(l[S] - w) < Math.abs(l[S - 1] - w) || "next" === t.swipeDirection ? l[S] : l[S - 1]);
              }
              if (x && t.once("transitionEnd", function () {
                t.loopFix();
              }), 0 !== t.velocity) g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity);else if (i.freeModeSticky) return void t.slideToClosest();
              i.freeModeMomentumBounce && T ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function () {
                t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), t.setTranslate(y), n.transitionEnd(function () {
                  t && !t.destroyed && t.transitionEnd();
                }));
              })) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function () {
                t && !t.destroyed && t.transitionEnd();
              }))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses();
            } else if (i.freeModeSticky) return void t.slideToClosest();

            (!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
          } else {
            for (var M = 0, P = t.slidesSizesGrid[0], k = 0; k < o.length; k += i.slidesPerGroup) {
              void 0 !== o[k + i.slidesPerGroup] ? p >= o[k] && p < o[k + i.slidesPerGroup] && (P = o[(M = k) + i.slidesPerGroup] - o[k]) : p >= o[k] && (M = k, P = o[o.length - 1] - o[o.length - 2]);
            }

            var z = (p - o[M]) / P;

            if (u > i.longSwipesMs) {
              if (!i.longSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection && (z >= i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (z > 1 - i.longSwipesRatio ? t.slideTo(M + i.slidesPerGroup) : t.slideTo(M));
            } else {
              if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection && t.slideTo(M + i.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M);
            }
          }
        }.bind(e), e.onClick = function (e) {
          this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
        }.bind(e);
        var r = "container" === t.touchEventsTarget ? i : s,
            n = !!t.nested;

        if (ae.touch || !ae.pointerEvents && !ae.prefixedPointerEvents) {
          if (ae.touch) {
            var o = !("touchstart" !== a.start || !ae.passiveListener || !t.passiveListeners) && {
              passive: !0,
              capture: !1
            };
            r.addEventListener(a.start, e.onTouchStart, o), r.addEventListener(a.move, e.onTouchMove, ae.passiveListener ? {
              passive: !1,
              capture: n
            } : n), r.addEventListener(a.end, e.onTouchEnd, o);
          }

          (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !ae.touch && g.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), f.addEventListener("mousemove", e.onTouchMove, n), f.addEventListener("mouseup", e.onTouchEnd, !1));
        } else r.addEventListener(a.start, e.onTouchStart, !1), f.addEventListener(a.move, e.onTouchMove, n), f.addEventListener(a.end, e.onTouchEnd, !1);

        (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), e.on(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b, !0);
      },
      detachEvents: function detachEvents() {
        var e = this,
            t = e.params,
            a = e.touchEvents,
            i = e.el,
            s = e.wrapperEl,
            r = "container" === t.touchEventsTarget ? i : s,
            n = !!t.nested;

        if (ae.touch || !ae.pointerEvents && !ae.prefixedPointerEvents) {
          if (ae.touch) {
            var o = !("onTouchStart" !== a.start || !ae.passiveListener || !t.passiveListeners) && {
              passive: !0,
              capture: !1
            };
            r.removeEventListener(a.start, e.onTouchStart, o), r.removeEventListener(a.move, e.onTouchMove, n), r.removeEventListener(a.end, e.onTouchEnd, o);
          }

          (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !ae.touch && g.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1), f.removeEventListener("mousemove", e.onTouchMove, n), f.removeEventListener("mouseup", e.onTouchEnd, !1));
        } else r.removeEventListener(a.start, e.onTouchStart, !1), f.removeEventListener(a.move, e.onTouchMove, n), f.removeEventListener(a.end, e.onTouchEnd, !1);

        (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0), e.off(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", b);
      }
    },
    breakpoints: {
      setBreakpoint: function setBreakpoint() {
        var e = this,
            t = e.activeIndex,
            a = e.initialized,
            i = e.loopedSlides;
        void 0 === i && (i = 0);
        var s = e.params,
            r = s.breakpoints;

        if (r && (!r || 0 !== Object.keys(r).length)) {
          var n = e.getBreakpoint(r);

          if (n && e.currentBreakpoint !== n) {
            var o = n in r ? r[n] : void 0;
            o && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function (e) {
              var t = o[e];
              void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto");
            });
            var l = o || e.originalParams,
                d = l.direction && l.direction !== s.direction,
                p = s.loop && (l.slidesPerView !== s.slidesPerView || d);
            d && a && e.changeDirection(), te.extend(e.params, l), te.extend(e, {
              allowTouchMove: e.params.allowTouchMove,
              allowSlideNext: e.params.allowSlideNext,
              allowSlidePrev: e.params.allowSlidePrev
            }), e.currentBreakpoint = n, p && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", l);
          }
        }
      },
      getBreakpoint: function getBreakpoint(e) {
        if (e) {
          var t = !1,
              a = [];
          Object.keys(e).forEach(function (e) {
            a.push(e);
          }), a.sort(function (e, t) {
            return parseInt(e, 10) - parseInt(t, 10);
          });

          for (var i = 0; i < a.length; i += 1) {
            var s = a[i];
            this.params.breakpointsInverse ? s <= ee.innerWidth && (t = s) : s >= ee.innerWidth && !t && (t = s);
          }

          return t || "max";
        }
      }
    },
    checkOverflow: {
      checkOverflow: function checkOverflow() {
        var e = this,
            t = e.isLocked;
        e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update());
      }
    },
    classes: {
      addClasses: function addClasses() {
        var t = this.classNames,
            a = this.params,
            e = this.rtl,
            i = this.$el,
            s = [];
        s.push("initialized"), s.push(a.direction), a.freeMode && s.push("free-mode"), ae.flexbox || s.push("no-flexbox"), a.autoHeight && s.push("autoheight"), e && s.push("rtl"), 1 < a.slidesPerColumn && s.push("multirow"), g.android && s.push("android"), g.ios && s.push("ios"), (ie.isIE || ie.isEdge) && (ae.pointerEvents || ae.prefixedPointerEvents) && s.push("wp8-" + a.direction), s.forEach(function (e) {
          t.push(a.containerModifierClass + e);
        }), i.addClass(t.join(" "));
      },
      removeClasses: function removeClasses() {
        var e = this.$el,
            t = this.classNames;
        e.removeClass(t.join(" "));
      }
    },
    images: {
      loadImage: function loadImage(e, t, a, i, s, r) {
        var n;

        function o() {
          r && r();
        }

        e.complete && s ? o() : t ? ((n = new ee.Image()).onload = o, n.onerror = o, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : o();
      },
      preloadImages: function preloadImages() {
        var e = this;

        function t() {
          null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
        }

        e.imagesToLoad = e.$el.find("img");

        for (var a = 0; a < e.imagesToLoad.length; a += 1) {
          var i = e.imagesToLoad[a];
          e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t);
        }
      }
    }
  },
      x = {},
      T = function (u) {
    function h() {
      for (var e, t, s, a = [], i = arguments.length; i--;) {
        a[i] = arguments[i];
      }

      s = (s = 1 === a.length && a[0].constructor && a[0].constructor === Object ? a[0] : (t = (e = a)[0], e[1])) || {}, s = te.extend({}, s), t && !s.el && (s.el = t), u.call(this, s), Object.keys(y).forEach(function (t) {
        Object.keys(y[t]).forEach(function (e) {
          h.prototype[e] || (h.prototype[e] = y[t][e]);
        });
      });
      var r = this;
      void 0 === r.modules && (r.modules = {}), Object.keys(r.modules).forEach(function (e) {
        var t = r.modules[e];

        if (t.params) {
          var a = Object.keys(t.params)[0],
              i = t.params[a];
          if ("object" != _typeof(i) || null === i) return;
          if (!(a in s && "enabled" in i)) return;
          !0 === s[a] && (s[a] = {
            enabled: !0
          }), "object" != _typeof(s[a]) || "enabled" in s[a] || (s[a].enabled = !0), s[a] || (s[a] = {
            enabled: !1
          });
        }
      });
      var n = te.extend({}, w);
      r.useModulesParams(n), r.params = te.extend({}, n, x, s), r.originalParams = te.extend({}, r.params), r.passedParams = te.extend({}, s);
      var o = (r.$ = I)(r.params.el);

      if (t = o[0]) {
        if (1 < o.length) {
          var l = [];
          return o.each(function (e, t) {
            var a = te.extend({}, s, {
              el: t
            });
            l.push(new h(a));
          }), l;
        }

        t.swiper = r, o.data("swiper", r);
        var d,
            p,
            c = o.children("." + r.params.wrapperClass);
        return te.extend(r, {
          $el: o,
          el: t,
          $wrapperEl: c,
          wrapperEl: c[0],
          classNames: [],
          slides: I(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: function isHorizontal() {
            return "horizontal" === r.params.direction;
          },
          isVertical: function isVertical() {
            return "vertical" === r.params.direction;
          },
          rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
          rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
          wrongRTL: "-webkit-box" === c.css("display"),
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: r.params.allowSlideNext,
          allowSlidePrev: r.params.allowSlidePrev,
          touchEvents: (d = ["touchstart", "touchmove", "touchend"], p = ["mousedown", "mousemove", "mouseup"], ae.pointerEvents ? p = ["pointerdown", "pointermove", "pointerup"] : ae.prefixedPointerEvents && (p = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), r.touchEventsTouch = {
            start: d[0],
            move: d[1],
            end: d[2]
          }, r.touchEventsDesktop = {
            start: p[0],
            move: p[1],
            end: p[2]
          }, ae.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            formElements: "input, select, option, textarea, button, video",
            lastClickTime: te.now(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0
          },
          allowClick: !0,
          allowTouchMove: r.params.allowTouchMove,
          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          },
          imagesToLoad: [],
          imagesLoaded: 0
        }), r.useModules(), r.params.init && r.init(), r;
      }
    }

    u && (h.__proto__ = u);
    var e = {
      extendedDefaults: {
        configurable: !0
      },
      defaults: {
        configurable: !0
      },
      Class: {
        configurable: !0
      },
      $: {
        configurable: !0
      }
    };
    return ((h.prototype = Object.create(u && u.prototype)).constructor = h).prototype.slidesPerViewDynamic = function () {
      var e = this,
          t = e.params,
          a = e.slides,
          i = e.slidesGrid,
          s = e.size,
          r = e.activeIndex,
          n = 1;

      if (t.centeredSlides) {
        for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) {
          a[d] && !o && (n += 1, s < (l += a[d].swiperSlideSize) && (o = !0));
        }

        for (var p = r - 1; 0 <= p; p -= 1) {
          a[p] && !o && (n += 1, s < (l += a[p].swiperSlideSize) && (o = !0));
        }
      } else for (var c = r + 1; c < a.length; c += 1) {
        i[c] - i[r] < s && (n += 1);
      }

      return n;
    }, h.prototype.update = function () {
      var a = this;

      if (a && !a.destroyed) {
        var e = a.snapGrid,
            t = a.params;
        t.breakpoints && a.setBreakpoint(), a.updateSize(), a.updateSlides(), a.updateProgress(), a.updateSlidesClasses(), a.params.freeMode ? (i(), a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || i(), t.watchOverflow && e !== a.snapGrid && a.checkOverflow(), a.emit("update");
      }

      function i() {
        var e = a.rtlTranslate ? -1 * a.translate : a.translate,
            t = Math.min(Math.max(e, a.maxTranslate()), a.minTranslate());
        a.setTranslate(t), a.updateActiveIndex(), a.updateSlidesClasses();
      }
    }, h.prototype.changeDirection = function (a, e) {
      void 0 === e && (e = !0);
      var t = this,
          i = t.params.direction;
      return (a = a || ("horizontal" === i ? "vertical" : "horizontal")) === i || "horizontal" !== a && "vertical" !== a || (t.$el.removeClass("" + t.params.containerModifierClass + i + " wp8-" + i).addClass("" + t.params.containerModifierClass + a), (ie.isIE || ie.isEdge) && (ae.pointerEvents || ae.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + a), t.params.direction = a, t.slides.each(function (e, t) {
        "vertical" === a ? t.style.width = "" : t.style.height = "";
      }), t.emit("changeDirection"), e && t.update()), t;
    }, h.prototype.init = function () {
      var e = this;
      e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"));
    }, h.prototype.destroy = function (e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      var a = this,
          i = a.params,
          s = a.$el,
          r = a.$wrapperEl,
          n = a.slides;
      return void 0 === a.params || a.destroyed || (a.emit("beforeDestroy"), a.initialized = !1, a.detachEvents(), i.loop && a.loopDestroy(), t && (a.removeClasses(), s.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), a.emit("destroy"), Object.keys(a.eventsListeners).forEach(function (e) {
        a.off(e);
      }), !1 !== e && (a.$el[0].swiper = null, a.$el.data("swiper", null), te.deleteProps(a)), a.destroyed = !0), null;
    }, h.extendDefaults = function (e) {
      te.extend(x, e);
    }, e.extendedDefaults.get = function () {
      return x;
    }, e.defaults.get = function () {
      return w;
    }, e.Class.get = function () {
      return u;
    }, e.$.get = function () {
      return I;
    }, Object.defineProperties(h, e), h;
  }(e),
      E = {
    name: "device",
    proto: {
      device: g
    },
    static: {
      device: g
    }
  },
      S = {
    name: "support",
    proto: {
      support: ae
    },
    static: {
      support: ae
    }
  },
      C = {
    name: "browser",
    proto: {
      browser: ie
    },
    static: {
      browser: ie
    }
  },
      M = {
    name: "resize",
    create: function create() {
      var e = this;
      te.extend(e, {
        resize: {
          resizeHandler: function resizeHandler() {
            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"));
          },
          orientationChangeHandler: function orientationChangeHandler() {
            e && !e.destroyed && e.initialized && e.emit("orientationchange");
          }
        }
      });
    },
    on: {
      init: function init() {
        ee.addEventListener("resize", this.resize.resizeHandler), ee.addEventListener("orientationchange", this.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        ee.removeEventListener("resize", this.resize.resizeHandler), ee.removeEventListener("orientationchange", this.resize.orientationChangeHandler);
      }
    }
  },
      P = {
    func: ee.MutationObserver || ee.WebkitMutationObserver,
    attach: function attach(e, t) {
      void 0 === t && (t = {});
      var a = this,
          i = new P.func(function (e) {
        if (1 !== e.length) {
          var t = function t() {
            a.emit("observerUpdate", e[0]);
          };

          ee.requestAnimationFrame ? ee.requestAnimationFrame(t) : ee.setTimeout(t, 0);
        } else a.emit("observerUpdate", e[0]);
      });
      i.observe(e, {
        attributes: void 0 === t.attributes || t.attributes,
        childList: void 0 === t.childList || t.childList,
        characterData: void 0 === t.characterData || t.characterData
      }), a.observer.observers.push(i);
    },
    init: function init() {
      var e = this;

      if (ae.observer && e.params.observer) {
        if (e.params.observeParents) for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) {
          e.observer.attach(t[a]);
        }
        e.observer.attach(e.$el[0], {
          childList: e.params.observeSlideChildren
        }), e.observer.attach(e.$wrapperEl[0], {
          attributes: !1
        });
      }
    },
    destroy: function destroy() {
      this.observer.observers.forEach(function (e) {
        e.disconnect();
      }), this.observer.observers = [];
    }
  },
      k = {
    name: "observer",
    params: {
      observer: !1,
      observeParents: !1,
      observeSlideChildren: !1
    },
    create: function create() {
      te.extend(this, {
        observer: {
          init: P.init.bind(this),
          attach: P.attach.bind(this),
          destroy: P.destroy.bind(this),
          observers: []
        }
      });
    },
    on: {
      init: function init() {
        this.observer.init();
      },
      destroy: function destroy() {
        this.observer.destroy();
      }
    }
  },
      z = {
    update: function update(e) {
      var t = this,
          a = t.params,
          i = a.slidesPerView,
          s = a.slidesPerGroup,
          r = a.centeredSlides,
          n = t.params.virtual,
          o = n.addSlidesBefore,
          l = n.addSlidesAfter,
          d = t.virtual,
          p = d.from,
          c = d.to,
          u = d.slides,
          h = d.slidesGrid,
          v = d.renderSlide,
          f = d.offset;
      t.updateActiveIndex();
      var m,
          g,
          b,
          w = t.activeIndex || 0;
      m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", b = r ? (g = Math.floor(i / 2) + s + o, Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o, s + l);
      var y = Math.max((w || 0) - b, 0),
          x = Math.min((w || 0) + g, u.length - 1),
          T = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);

      function E() {
        t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load();
      }

      if (te.extend(t.virtual, {
        from: y,
        to: x,
        offset: T,
        slidesGrid: t.slidesGrid
      }), p === y && c === x && !e) return t.slidesGrid !== h && T !== f && t.slides.css(m, T + "px"), void t.updateProgress();
      if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
        offset: T,
        from: y,
        to: x,
        slides: function () {
          for (var e = [], t = y; t <= x; t += 1) {
            e.push(u[t]);
          }

          return e;
        }()
      }), void E();
      var S = [],
          C = [];
      if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();else for (var M = p; M <= c; M += 1) {
        (M < y || x < M) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + M + '"]').remove();
      }

      for (var P = 0; P < u.length; P += 1) {
        y <= P && P <= x && (void 0 === c || e ? C.push(P) : (c < P && C.push(P), P < p && S.push(P)));
      }

      C.forEach(function (e) {
        t.$wrapperEl.append(v(u[e], e));
      }), S.sort(function (e, t) {
        return t - e;
      }).forEach(function (e) {
        t.$wrapperEl.prepend(v(u[e], e));
      }), t.$wrapperEl.children(".swiper-slide").css(m, T + "px"), E();
    },
    renderSlide: function renderSlide(e, t) {
      var a = this,
          i = a.params.virtual;
      if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
      var s = i.renderSlide ? I(i.renderSlide.call(a, e, t)) : I('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
      return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s;
    },
    appendSlide: function appendSlide(e) {
      if ("object" == _typeof(e) && "length" in e) for (var t = 0; t < e.length; t += 1) {
        e[t] && this.virtual.slides.push(e[t]);
      } else this.virtual.slides.push(e);
      this.virtual.update(!0);
    },
    prependSlide: function prependSlide(e) {
      var t = this,
          a = t.activeIndex,
          i = a + 1,
          s = 1;

      if (Array.isArray(e)) {
        for (var r = 0; r < e.length; r += 1) {
          e[r] && t.virtual.slides.unshift(e[r]);
        }

        i = a + e.length, s = e.length;
      } else t.virtual.slides.unshift(e);

      if (t.params.virtual.cache) {
        var n = t.virtual.cache,
            o = {};
        Object.keys(n).forEach(function (e) {
          o[parseInt(e, 10) + s] = n[e];
        }), t.virtual.cache = o;
      }

      t.virtual.update(!0), t.slideTo(i, 0);
    },
    removeSlide: function removeSlide(e) {
      var t = this;

      if (null != e) {
        var a = t.activeIndex;
        if (Array.isArray(e)) for (var i = e.length - 1; 0 <= i; i -= 1) {
          t.virtual.slides.splice(e[i], 1), t.params.virtual.cache && delete t.virtual.cache[e[i]], e[i] < a && (a -= 1), a = Math.max(a, 0);
        } else t.virtual.slides.splice(e, 1), t.params.virtual.cache && delete t.virtual.cache[e], e < a && (a -= 1), a = Math.max(a, 0);
        t.virtual.update(!0), t.slideTo(a, 0);
      }
    },
    removeAllSlides: function removeAllSlides() {
      var e = this;
      e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), e.slideTo(0, 0);
    }
  },
      $ = {
    name: "virtual",
    params: {
      virtual: {
        enabled: !1,
        slides: [],
        cache: !0,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    },
    create: function create() {
      var e = this;
      te.extend(e, {
        virtual: {
          update: z.update.bind(e),
          appendSlide: z.appendSlide.bind(e),
          prependSlide: z.prependSlide.bind(e),
          removeSlide: z.removeSlide.bind(e),
          removeAllSlides: z.removeAllSlides.bind(e),
          renderSlide: z.renderSlide.bind(e),
          slides: e.params.virtual.slides,
          cache: {}
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var e = this;

        if (e.params.virtual.enabled) {
          e.classNames.push(e.params.containerModifierClass + "virtual");
          var t = {
            watchSlidesProgress: !0
          };
          te.extend(e.params, t), te.extend(e.originalParams, t), e.params.initialSlide || e.virtual.update();
        }
      },
      setTranslate: function setTranslate() {
        this.params.virtual.enabled && this.virtual.update();
      }
    }
  },
      L = {
    handle: function handle(e) {
      var t = this,
          a = t.rtlTranslate,
          i = e;
      i.originalEvent && (i = i.originalEvent);
      var s = i.keyCode || i.charCode;
      if (!t.allowSlideNext && (t.isHorizontal() && 39 === s || t.isVertical() && 40 === s || 34 === s)) return !1;
      if (!t.allowSlidePrev && (t.isHorizontal() && 37 === s || t.isVertical() && 38 === s || 33 === s)) return !1;

      if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || f.activeElement && f.activeElement.nodeName && ("input" === f.activeElement.nodeName.toLowerCase() || "textarea" === f.activeElement.nodeName.toLowerCase()))) {
        if (t.params.keyboard.onlyInViewport && (33 === s || 34 === s || 37 === s || 39 === s || 38 === s || 40 === s)) {
          var r = !1;
          if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
          var n = ee.innerWidth,
              o = ee.innerHeight,
              l = t.$el.offset();
          a && (l.left -= t.$el[0].scrollLeft);

          for (var d = [[l.left, l.top], [l.left + t.width, l.top], [l.left, l.top + t.height], [l.left + t.width, l.top + t.height]], p = 0; p < d.length; p += 1) {
            var c = d[p];
            0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= o && (r = !0);
          }

          if (!r) return;
        }

        t.isHorizontal() ? (33 !== s && 34 !== s && 37 !== s && 39 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (34 !== s && 39 !== s || a) && (33 !== s && 37 !== s || !a) || t.slideNext(), (33 !== s && 37 !== s || a) && (34 !== s && 39 !== s || !a) || t.slidePrev()) : (33 !== s && 34 !== s && 38 !== s && 40 !== s || (i.preventDefault ? i.preventDefault() : i.returnValue = !1), 34 !== s && 40 !== s || t.slideNext(), 33 !== s && 38 !== s || t.slidePrev()), t.emit("keyPress", s);
      }
    },
    enable: function enable() {
      this.keyboard.enabled || (I(f).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0);
    },
    disable: function disable() {
      this.keyboard.enabled && (I(f).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1);
    }
  },
      D = {
    name: "keyboard",
    params: {
      keyboard: {
        enabled: !1,
        onlyInViewport: !0
      }
    },
    create: function create() {
      te.extend(this, {
        keyboard: {
          enabled: !1,
          enable: L.enable.bind(this),
          disable: L.disable.bind(this),
          handle: L.handle.bind(this)
        }
      });
    },
    on: {
      init: function init() {
        this.params.keyboard.enabled && this.keyboard.enable();
      },
      destroy: function destroy() {
        this.keyboard.enabled && this.keyboard.disable();
      }
    }
  };

  var O = {
    lastScrollTime: te.now(),
    event: -1 < ee.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function () {
      var e = "onwheel",
          t = (e in f);

      if (!t) {
        var a = f.createElement("div");
        a.setAttribute(e, "return;"), t = "function" == typeof a[e];
      }

      return !t && f.implementation && f.implementation.hasFeature && !0 !== f.implementation.hasFeature("", "") && (t = f.implementation.hasFeature("Events.wheel", "3.0")), t;
    }() ? "wheel" : "mousewheel",
    normalize: function normalize(e) {
      var t = 0,
          a = 0,
          i = 0,
          s = 0;
      return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
        spinX: t,
        spinY: a,
        pixelX: i,
        pixelY: s
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      this.mouseEntered = !0;
    },
    handleMouseLeave: function handleMouseLeave() {
      this.mouseEntered = !1;
    },
    handle: function handle(e) {
      var t = e,
          a = this,
          i = a.params.mousewheel;
      if (!a.mouseEntered && !i.releaseOnEdges) return !0;
      t.originalEvent && (t = t.originalEvent);
      var s = 0,
          r = a.rtlTranslate ? -1 : 1,
          n = O.normalize(t);
      if (i.forceToAxis) {
        if (a.isHorizontal()) {
          if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
          s = n.pixelX * r;
        } else {
          if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
          s = n.pixelY;
        }
      } else s = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * r : -n.pixelY;
      if (0 === s) return !0;

      if (i.invert && (s = -s), a.params.freeMode) {
        a.params.loop && a.loopFix();
        var o = a.getTranslate() + s * i.sensitivity,
            l = a.isBeginning,
            d = a.isEnd;
        if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), a.setTransition(0), a.setTranslate(o), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!l && a.isBeginning || !d && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky && (clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = te.nextTick(function () {
          a.slideToClosest();
        }, 300)), a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), o === a.minTranslate() || o === a.maxTranslate()) return !0;
      } else {
        if (60 < te.now() - a.mousewheel.lastScrollTime) if (s < 0) {
          if (a.isEnd && !a.params.loop || a.animating) {
            if (i.releaseOnEdges) return !0;
          } else a.slideNext(), a.emit("scroll", t);
        } else if (a.isBeginning && !a.params.loop || a.animating) {
          if (i.releaseOnEdges) return !0;
        } else a.slidePrev(), a.emit("scroll", t);
        a.mousewheel.lastScrollTime = new ee.Date().getTime();
      }

      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1;
    },
    enable: function enable() {
      var e = this;
      if (!O.event) return !1;
      if (e.mousewheel.enabled) return !1;
      var t = e.$el;
      return "container" !== e.params.mousewheel.eventsTarged && (t = I(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(O.event, e.mousewheel.handle), e.mousewheel.enabled = !0;
    },
    disable: function disable() {
      var e = this;
      if (!O.event) return !1;
      if (!e.mousewheel.enabled) return !1;
      var t = e.$el;
      return "container" !== e.params.mousewheel.eventsTarged && (t = I(e.params.mousewheel.eventsTarged)), t.off(O.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1);
    }
  },
      A = {
    update: function update() {
      var e = this,
          t = e.params.navigation;

      if (!e.params.loop) {
        var a = e.navigation,
            i = a.$nextEl,
            s = a.$prevEl;
        s && 0 < s.length && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && 0 < i.length && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass));
      }
    },
    onPrevClick: function onPrevClick(e) {
      e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext();
    },
    init: function init() {
      var e,
          t,
          a = this,
          i = a.params.navigation;
      (i.nextEl || i.prevEl) && (i.nextEl && (e = I(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && 1 < e.length && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = I(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && 1 < t.length && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && 0 < e.length && e.on("click", a.navigation.onNextClick), t && 0 < t.length && t.on("click", a.navigation.onPrevClick), te.extend(a.navigation, {
        $nextEl: e,
        nextEl: e && e[0],
        $prevEl: t,
        prevEl: t && t[0]
      }));
    },
    destroy: function destroy() {
      var e = this,
          t = e.navigation,
          a = t.$nextEl,
          i = t.$prevEl;
      a && a.length && (a.off("click", e.navigation.onNextClick), a.removeClass(e.params.navigation.disabledClass)), i && i.length && (i.off("click", e.navigation.onPrevClick), i.removeClass(e.params.navigation.disabledClass));
    }
  },
      H = {
    update: function update() {
      var e = this,
          t = e.rtl,
          s = e.params.pagination;

      if (s.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
        var r,
            a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            i = e.pagination.$el,
            n = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;

        if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > a - 1 - 2 * e.loopedSlides && (r -= a - 2 * e.loopedSlides), n - 1 < r && (r -= n), r < 0 && "bullets" !== e.params.paginationType && (r = n + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === s.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
          var o,
              l,
              d,
              p = e.pagination.bullets;
          if (s.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), i.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (s.dynamicMainBullets + 4) + "px"), 1 < s.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, e.pagination.dynamicBulletIndex > s.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = s.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = r - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, s.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(s.bulletActiveClass + " " + s.bulletActiveClass + "-next " + s.bulletActiveClass + "-next-next " + s.bulletActiveClass + "-prev " + s.bulletActiveClass + "-prev-prev " + s.bulletActiveClass + "-main"), 1 < i.length) p.each(function (e, t) {
            var a = I(t),
                i = a.index();
            i === r && a.addClass(s.bulletActiveClass), s.dynamicBullets && (o <= i && i <= l && a.addClass(s.bulletActiveClass + "-main"), i === o && a.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), i === l && a.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next"));
          });else if (p.eq(r).addClass(s.bulletActiveClass), s.dynamicBullets) {
            for (var c = p.eq(o), u = p.eq(l), h = o; h <= l; h += 1) {
              p.eq(h).addClass(s.bulletActiveClass + "-main");
            }

            c.prev().addClass(s.bulletActiveClass + "-prev").prev().addClass(s.bulletActiveClass + "-prev-prev"), u.next().addClass(s.bulletActiveClass + "-next").next().addClass(s.bulletActiveClass + "-next-next");
          }

          if (s.dynamicBullets) {
            var v = Math.min(p.length, s.dynamicMainBullets + 4),
                f = (e.pagination.bulletSize * v - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                m = t ? "right" : "left";
            p.css(e.isHorizontal() ? m : "top", f + "px");
          }
        }

        if ("fraction" === s.type && (i.find("." + s.currentClass).text(s.formatFractionCurrent(r + 1)), i.find("." + s.totalClass).text(s.formatFractionTotal(n))), "progressbar" === s.type) {
          var g;
          g = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
          var b = (r + 1) / n,
              w = 1,
              y = 1;
          "horizontal" === g ? w = b : y = b, i.find("." + s.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(e.params.speed);
        }

        "custom" === s.type && s.renderCustom ? (i.html(s.renderCustom(e, r + 1, n)), e.emit("paginationRender", e, i[0])) : e.emit("paginationUpdate", e, i[0]), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](s.lockClass);
      }
    },
    render: function render() {
      var e = this,
          t = e.params.pagination;

      if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
        var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            i = e.pagination.$el,
            s = "";

        if ("bullets" === t.type) {
          for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1) {
            t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
          }

          i.html(s), e.pagination.bullets = i.find("." + t.bulletClass);
        }

        "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0]);
      }
    },
    init: function init() {
      var a = this,
          e = a.params.pagination;

      if (e.el) {
        var t = I(e.el);
        0 !== t.length && (a.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === a.$el.find(e.el).length && (t = a.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), a.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function (e) {
          e.preventDefault();
          var t = I(this).index() * a.params.slidesPerGroup;
          a.params.loop && (t += a.loopedSlides), a.slideTo(t);
        }), te.extend(a.pagination, {
          $el: t,
          el: t[0]
        }));
      }
    },
    destroy: function destroy() {
      var e = this,
          t = e.params.pagination;

      if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
        var a = e.pagination.$el;
        a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass);
      }
    }
  },
      G = {
    setTranslate: function setTranslate() {
      var e = this;

      if (e.params.scrollbar.el && e.scrollbar.el) {
        var t = e.scrollbar,
            a = e.rtlTranslate,
            i = e.progress,
            s = t.dragSize,
            r = t.trackSize,
            n = t.$dragEl,
            o = t.$el,
            l = e.params.scrollbar,
            d = s,
            p = (r - s) * i;
        a ? 0 < (p = -p) ? (d = s - p, p = 0) : r < -p + s && (d = r + p) : p < 0 ? (d = s + p, p = 0) : r < p + s && (d = r - p), e.isHorizontal() ? (ae.transforms3d ? n.transform("translate3d(" + p + "px, 0, 0)") : n.transform("translateX(" + p + "px)"), n[0].style.width = d + "px") : (ae.transforms3d ? n.transform("translate3d(0px, " + p + "px, 0)") : n.transform("translateY(" + p + "px)"), n[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function () {
          o[0].style.opacity = 0, o.transition(400);
        }, 1e3));
      }
    },
    setTransition: function setTransition(e) {
      this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e);
    },
    updateSize: function updateSize() {
      var e = this;

      if (e.params.scrollbar.el && e.scrollbar.el) {
        var t = e.scrollbar,
            a = t.$dragEl,
            i = t.$el;
        a[0].style.width = "", a[0].style.height = "";
        var s,
            r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            n = e.size / e.virtualSize,
            o = n * (r / e.size);
        s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = 1 <= n ? "none" : "", e.params.scrollbar.hide && (i[0].style.opacity = 0), te.extend(t, {
          trackSize: r,
          divider: n,
          moveDivider: o,
          dragSize: s
        }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass);
      }
    },
    getPointerPosition: function getPointerPosition(e) {
      return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY;
    },
    setDragPosition: function setDragPosition(e) {
      var t,
          a = this,
          i = a.scrollbar,
          s = a.rtlTranslate,
          r = i.$el,
          n = i.dragSize,
          o = i.trackSize,
          l = i.dragStartPos;
      t = (i.getPointerPosition(e) - r.offset()[a.isHorizontal() ? "left" : "top"] - (null !== l ? l : n / 2)) / (o - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
      var d = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
      a.updateProgress(d), a.setTranslate(d), a.updateActiveIndex(), a.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar,
          s = t.$wrapperEl,
          r = i.$el,
          n = i.$dragEl;
      t.scrollbar.isTouched = !0, t.scrollbar.dragStartPos = e.target === n[0] || e.target === n ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.emit("scrollbarDragStart", e);
    },
    onDragMove: function onDragMove(e) {
      var t = this.scrollbar,
          a = this.$wrapperEl,
          i = t.$el,
          s = t.$dragEl;
      this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), a.transition(0), i.transition(0), s.transition(0), this.emit("scrollbarDragMove", e));
    },
    onDragEnd: function onDragEnd(e) {
      var t = this,
          a = t.params.scrollbar,
          i = t.scrollbar.$el;
      t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = te.nextTick(function () {
        i.css("opacity", 0), i.transition(400);
      }, 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest());
    },
    enableDraggable: function enableDraggable() {
      var e = this;

      if (e.params.scrollbar.el) {
        var t = e.scrollbar,
            a = e.touchEventsTouch,
            i = e.touchEventsDesktop,
            s = e.params,
            r = t.$el[0],
            n = !(!ae.passiveListener || !s.passiveListeners) && {
          passive: !1,
          capture: !1
        },
            o = !(!ae.passiveListener || !s.passiveListeners) && {
          passive: !0,
          capture: !1
        };
        ae.touch ? (r.addEventListener(a.start, e.scrollbar.onDragStart, n), r.addEventListener(a.move, e.scrollbar.onDragMove, n), r.addEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.addEventListener(i.start, e.scrollbar.onDragStart, n), f.addEventListener(i.move, e.scrollbar.onDragMove, n), f.addEventListener(i.end, e.scrollbar.onDragEnd, o));
      }
    },
    disableDraggable: function disableDraggable() {
      var e = this;

      if (e.params.scrollbar.el) {
        var t = e.scrollbar,
            a = e.touchEventsTouch,
            i = e.touchEventsDesktop,
            s = e.params,
            r = t.$el[0],
            n = !(!ae.passiveListener || !s.passiveListeners) && {
          passive: !1,
          capture: !1
        },
            o = !(!ae.passiveListener || !s.passiveListeners) && {
          passive: !0,
          capture: !1
        };
        ae.touch ? (r.removeEventListener(a.start, e.scrollbar.onDragStart, n), r.removeEventListener(a.move, e.scrollbar.onDragMove, n), r.removeEventListener(a.end, e.scrollbar.onDragEnd, o)) : (r.removeEventListener(i.start, e.scrollbar.onDragStart, n), f.removeEventListener(i.move, e.scrollbar.onDragMove, n), f.removeEventListener(i.end, e.scrollbar.onDragEnd, o));
      }
    },
    init: function init() {
      var e = this;

      if (e.params.scrollbar.el) {
        var t = e.scrollbar,
            a = e.$el,
            i = e.params.scrollbar,
            s = I(i.el);
        e.params.uniqueNavElements && "string" == typeof i.el && 1 < s.length && 1 === a.find(i.el).length && (s = a.find(i.el));
        var r = s.find("." + e.params.scrollbar.dragClass);
        0 === r.length && (r = I('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), te.extend(t, {
          $el: s,
          el: s[0],
          $dragEl: r,
          dragEl: r[0]
        }), i.draggable && t.enableDraggable();
      }
    },
    destroy: function destroy() {
      this.scrollbar.disableDraggable();
    }
  },
      N = {
    setTransform: function setTransform(e, t) {
      var a = this.rtl,
          i = I(e),
          s = a ? -1 : 1,
          r = i.attr("data-swiper-parallax") || "0",
          n = i.attr("data-swiper-parallax-x"),
          o = i.attr("data-swiper-parallax-y"),
          l = i.attr("data-swiper-parallax-scale"),
          d = i.attr("data-swiper-parallax-opacity");

      if (n || o ? (n = n || "0", o = o || "0") : this.isHorizontal() ? (n = r, o = "0") : (o = r, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
        var p = d - (d - 1) * (1 - Math.abs(t));
        i[0].style.opacity = p;
      }

      if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)");else {
        var c = l - (l - 1) * (1 - Math.abs(t));
        i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")");
      }
    },
    setTranslate: function setTranslate() {
      var i = this,
          e = i.$el,
          t = i.slides,
          s = i.progress,
          r = i.snapGrid;
      e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (e, t) {
        i.parallax.setTransform(t, s);
      }), t.each(function (e, t) {
        var a = t.progress;
        1 < i.params.slidesPerGroup && "auto" !== i.params.slidesPerView && (a += Math.ceil(e / 2) - s * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), I(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (e, t) {
          i.parallax.setTransform(t, a);
        });
      });
    },
    setTransition: function setTransition(s) {
      void 0 === s && (s = this.params.speed);
      this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function (e, t) {
        var a = I(t),
            i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || s;
        0 === s && (i = 0), a.transition(i);
      });
    }
  },
      B = {
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) return 1;
      var t = e.targetTouches[0].pageX,
          a = e.targetTouches[0].pageY,
          i = e.targetTouches[1].pageX,
          s = e.targetTouches[1].pageY;
      return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2));
    },
    onGestureStart: function onGestureStart(e) {
      var t = this,
          a = t.params.zoom,
          i = t.zoom,
          s = i.gesture;

      if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !ae.gestures) {
        if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
        i.fakeGestureTouched = !0, s.scaleStart = B.getDistanceBetweenTouches(e);
      }

      s.$slideEl && s.$slideEl.length || (s.$slideEl = I(e.target).closest(".swiper-slide"), 0 === s.$slideEl.length && (s.$slideEl = t.slides.eq(t.activeIndex)), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass), s.maxRatio = s.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio, 0 !== s.$imageWrapEl.length) ? (s.$imageEl.transition(0), t.zoom.isScaling = !0) : s.$imageEl = void 0;
    },
    onGestureChange: function onGestureChange(e) {
      var t = this.params.zoom,
          a = this.zoom,
          i = a.gesture;

      if (!ae.gestures) {
        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
        a.fakeGestureMoved = !0, i.scaleMove = B.getDistanceBetweenTouches(e);
      }

      i.$imageEl && 0 !== i.$imageEl.length && (a.scale = ae.gestures ? e.scale * a.currentScale : i.scaleMove / i.scaleStart * a.currentScale, a.scale > i.maxRatio && (a.scale = i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, .5)), a.scale < t.minRatio && (a.scale = t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, .5)), i.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"));
    },
    onGestureEnd: function onGestureEnd(e) {
      var t = this.params.zoom,
          a = this.zoom,
          i = a.gesture;

      if (!ae.gestures) {
        if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
        if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !g.android) return;
        a.fakeGestureTouched = !1, a.fakeGestureMoved = !1;
      }

      i.$imageEl && 0 !== i.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio), i.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (i.$slideEl = void 0));
    },
    onTouchStart: function onTouchStart(e) {
      var t = this.zoom,
          a = t.gesture,
          i = t.image;
      a.$imageEl && 0 !== a.$imageEl.length && (i.isTouched || (g.android && e.preventDefault(), i.isTouched = !0, i.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, i.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY));
    },
    onTouchMove: function onTouchMove(e) {
      var t = this,
          a = t.zoom,
          i = a.gesture,
          s = a.image,
          r = a.velocity;

      if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
        s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = te.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = te.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
        var n = s.width * a.scale,
            o = s.height * a.scale;

        if (!(n < i.slideWidth && o < i.slideHeight)) {
          if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
            if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1);
            if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1);
          }

          e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)");
        }
      }
    },
    onTouchEnd: function onTouchEnd() {
      var e = this.zoom,
          t = e.gesture,
          a = e.image,
          i = e.velocity;

      if (t.$imageEl && 0 !== t.$imageEl.length) {
        if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void (a.isMoved = !1);
        a.isTouched = !1, a.isMoved = !1;
        var s = 300,
            r = 300,
            n = i.x * s,
            o = a.currentX + n,
            l = i.y * r,
            d = a.currentY + l;
        0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
        var p = Math.max(s, r);
        a.currentX = o, a.currentY = d;
        var c = a.width * e.scale,
            u = a.height * e.scale;
        a.minX = Math.min(t.slideWidth / 2 - c / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - u / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)");
      }
    },
    onTransitionEnd: function onTransitionEnd() {
      var e = this.zoom,
          t = e.gesture;
      t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0);
    },
    toggle: function toggle(e) {
      var t = this.zoom;
      t.scale && 1 !== t.scale ? t.out() : t.in(e);
    },
    in: function _in(e) {
      var t,
          a,
          i,
          s,
          r,
          n,
          o,
          l,
          d,
          p,
          c,
          u,
          h,
          v,
          f,
          m,
          g = this,
          b = g.zoom,
          w = g.params.zoom,
          y = b.gesture,
          x = b.image;
      y.$slideEl || (y.$slideEl = g.clickedSlide ? I(g.clickedSlide) : g.slides.eq(g.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length && (y.$slideEl.addClass("" + w.zoomedSlideClass), a = void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (f = y.$slideEl[0].offsetWidth, m = y.$slideEl[0].offsetHeight, i = y.$slideEl.offset().left + f / 2 - t, s = y.$slideEl.offset().top + m / 2 - a, o = y.$imageEl[0].offsetWidth, l = y.$imageEl[0].offsetHeight, d = o * b.scale, p = l * b.scale, h = -(c = Math.min(f / 2 - d / 2, 0)), v = -(u = Math.min(m / 2 - p / 2, 0)), (r = i * b.scale) < c && (r = c), h < r && (r = h), (n = s * b.scale) < u && (n = u), v < n && (n = v)) : n = r = 0, y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"));
    },
    out: function out() {
      var e = this,
          t = e.zoom,
          a = e.params.zoom,
          i = t.gesture;
      i.$slideEl || (i.$slideEl = e.clickedSlide ? I(e.clickedSlide) : e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0);
    },
    enable: function enable() {
      var e = this,
          t = e.zoom;

      if (!t.enabled) {
        t.enabled = !0;
        var a = !("touchstart" !== e.touchEvents.start || !ae.passiveListener || !e.params.passiveListeners) && {
          passive: !0,
          capture: !1
        };
        ae.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove);
      }
    },
    disable: function disable() {
      var e = this,
          t = e.zoom;

      if (t.enabled) {
        e.zoom.enabled = !1;
        var a = !("touchstart" !== e.touchEvents.start || !ae.passiveListener || !e.params.passiveListeners) && {
          passive: !0,
          capture: !1
        };
        ae.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, a)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, a), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, a), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, a)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove);
      }
    }
  },
      X = {
    loadInSlide: function loadInSlide(e, l) {
      void 0 === l && (l = !0);
      var d = this,
          p = d.params.lazy;

      if (void 0 !== e && 0 !== d.slides.length) {
        var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e),
            t = c.find("." + p.elementClass + ":not(." + p.loadedClass + "):not(." + p.loadingClass + ")");
        !c.hasClass(p.elementClass) || c.hasClass(p.loadedClass) || c.hasClass(p.loadingClass) || (t = t.add(c[0])), 0 !== t.length && t.each(function (e, t) {
          var i = I(t);
          i.addClass(p.loadingClass);
          var s = i.attr("data-background"),
              r = i.attr("data-src"),
              n = i.attr("data-srcset"),
              o = i.attr("data-sizes");
          d.loadImage(i[0], r || s, n, o, !1, function () {
            if (null != d && d && (!d || d.params) && !d.destroyed) {
              if (s ? (i.css("background-image", 'url("' + s + '")'), i.removeAttr("data-background")) : (n && (i.attr("srcset", n), i.removeAttr("data-srcset")), o && (i.attr("sizes", o), i.removeAttr("data-sizes")), r && (i.attr("src", r), i.removeAttr("data-src"))), i.addClass(p.loadedClass).removeClass(p.loadingClass), c.find("." + p.preloaderClass).remove(), d.params.loop && l) {
                var e = c.attr("data-swiper-slide-index");

                if (c.hasClass(d.params.slideDuplicateClass)) {
                  var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                  d.lazy.loadInSlide(t.index(), !1);
                } else {
                  var a = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                  d.lazy.loadInSlide(a.index(), !1);
                }
              }

              d.emit("lazyImageReady", c[0], i[0]);
            }
          }), d.emit("lazyImageLoad", c[0], i[0]);
        });
      }
    },
    load: function load() {
      var i = this,
          t = i.$wrapperEl,
          a = i.params,
          s = i.slides,
          e = i.activeIndex,
          r = i.virtual && a.virtual.enabled,
          n = a.lazy,
          o = a.slidesPerView;

      function l(e) {
        if (r) {
          if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0;
        } else if (s[e]) return !0;

        return !1;
      }

      function d(e) {
        return r ? I(e).attr("data-swiper-slide-index") : I(e).index();
      }

      if ("auto" === o && (o = 0), i.lazy.initialImageLoaded || (i.lazy.initialImageLoaded = !0), i.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each(function (e, t) {
        var a = r ? I(t).attr("data-swiper-slide-index") : I(t).index();
        i.lazy.loadInSlide(a);
      });else if (1 < o) for (var p = e; p < e + o; p += 1) {
        l(p) && i.lazy.loadInSlide(p);
      } else i.lazy.loadInSlide(e);
      if (n.loadPrevNext) if (1 < o || n.loadPrevNextAmount && 1 < n.loadPrevNextAmount) {
        for (var c = n.loadPrevNextAmount, u = o, h = Math.min(e + u + Math.max(c, u), s.length), v = Math.max(e - Math.max(u, c), 0), f = e + o; f < h; f += 1) {
          l(f) && i.lazy.loadInSlide(f);
        }

        for (var m = v; m < e; m += 1) {
          l(m) && i.lazy.loadInSlide(m);
        }
      } else {
        var g = t.children("." + a.slideNextClass);
        0 < g.length && i.lazy.loadInSlide(d(g));
        var b = t.children("." + a.slidePrevClass);
        0 < b.length && i.lazy.loadInSlide(d(b));
      }
    }
  },
      V = {
    LinearSpline: function LinearSpline(e, t) {
      var a,
          i,
          s,
          r,
          n,
          o = function o(e, t) {
        for (i = -1, a = e.length; 1 < a - i;) {
          e[s = a + i >> 1] <= t ? i = s : a = s;
        }

        return a;
      };

      return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
        return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0;
      }, this;
    },
    getInterpolateFunction: function getInterpolateFunction(e) {
      var t = this;
      t.controller.spline || (t.controller.spline = t.params.loop ? new V.LinearSpline(t.slidesGrid, e.slidesGrid) : new V.LinearSpline(t.snapGrid, e.snapGrid));
    },
    setTranslate: function setTranslate(e, t) {
      var a,
          i,
          s = this,
          r = s.controller.control;

      function n(e) {
        var t = s.rtlTranslate ? -s.translate : s.translate;
        "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses();
      }

      if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) {
        r[o] !== t && r[o] instanceof T && n(r[o]);
      } else r instanceof T && t !== r && n(r);
    },
    setTransition: function setTransition(t, e) {
      var a,
          i = this,
          s = i.controller.control;

      function r(e) {
        e.setTransition(t, i), 0 !== t && (e.transitionStart(), e.params.autoHeight && te.nextTick(function () {
          e.updateAutoHeight();
        }), e.$wrapperEl.transitionEnd(function () {
          s && (e.params.loop && "slide" === i.params.controller.by && e.loopFix(), e.transitionEnd());
        }));
      }

      if (Array.isArray(s)) for (a = 0; a < s.length; a += 1) {
        s[a] !== e && s[a] instanceof T && r(s[a]);
      } else s instanceof T && e !== s && r(s);
    }
  },
      Y = {
    makeElFocusable: function makeElFocusable(e) {
      return e.attr("tabIndex", "0"), e;
    },
    addElRole: function addElRole(e, t) {
      return e.attr("role", t), e;
    },
    addElLabel: function addElLabel(e, t) {
      return e.attr("aria-label", t), e;
    },
    disableEl: function disableEl(e) {
      return e.attr("aria-disabled", !0), e;
    },
    enableEl: function enableEl(e) {
      return e.attr("aria-disabled", !1), e;
    },
    onEnterKey: function onEnterKey(e) {
      var t = this,
          a = t.params.a11y;

      if (13 === e.keyCode) {
        var i = I(e.target);
        t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass) && i[0].click();
      }
    },
    notify: function notify(e) {
      var t = this.a11y.liveRegion;
      0 !== t.length && (t.html(""), t.html(e));
    },
    updateNavigation: function updateNavigation() {
      var e = this;

      if (!e.params.loop) {
        var t = e.navigation,
            a = t.$nextEl,
            i = t.$prevEl;
        i && 0 < i.length && (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)), a && 0 < a.length && (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a));
      }
    },
    updatePagination: function updatePagination() {
      var i = this,
          s = i.params.a11y;
      i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.bullets.each(function (e, t) {
        var a = I(t);
        i.a11y.makeElFocusable(a), i.a11y.addElRole(a, "button"), i.a11y.addElLabel(a, s.paginationBulletMessage.replace(/{{index}}/, a.index() + 1));
      });
    },
    init: function init() {
      var e = this;
      e.$el.append(e.a11y.liveRegion);
      var t,
          a,
          i = e.params.a11y;
      e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, i.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), a && (e.a11y.makeElFocusable(a), e.a11y.addElRole(a, "button"), e.a11y.addElLabel(a, i.prevSlideMessage), a.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey);
    },
    destroy: function destroy() {
      var e,
          t,
          a = this;
      a.a11y.liveRegion && 0 < a.a11y.liveRegion.length && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass, a.a11y.onEnterKey);
    }
  },
      F = {
    init: function init() {
      var e = this;

      if (e.params.history) {
        if (!ee.history || !ee.history.pushState) return e.params.history.enabled = !1, void (e.params.hashNavigation.enabled = !0);
        var t = e.history;
        t.initialized = !0, t.paths = F.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || ee.addEventListener("popstate", e.history.setHistoryPopState));
      }
    },
    destroy: function destroy() {
      this.params.history.replaceState || ee.removeEventListener("popstate", this.history.setHistoryPopState);
    },
    setHistoryPopState: function setHistoryPopState() {
      this.history.paths = F.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1);
    },
    getPathValues: function getPathValues() {
      var e = ee.location.pathname.slice(1).split("/").filter(function (e) {
        return "" !== e;
      }),
          t = e.length;
      return {
        key: e[t - 2],
        value: e[t - 1]
      };
    },
    setHistory: function setHistory(e, t) {
      if (this.history.initialized && this.params.history.enabled) {
        var a = this.slides.eq(t),
            i = F.slugify(a.attr("data-history"));
        ee.location.pathname.includes(e) || (i = e + "/" + i);
        var s = ee.history.state;
        s && s.value === i || (this.params.history.replaceState ? ee.history.replaceState({
          value: i
        }, null, i) : ee.history.pushState({
          value: i
        }, null, i));
      }
    },
    slugify: function slugify(e) {
      return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    },
    scrollToSlide: function scrollToSlide(e, t, a) {
      var i = this;
      if (t) for (var s = 0, r = i.slides.length; s < r; s += 1) {
        var n = i.slides.eq(s);

        if (F.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
          var o = n.index();
          i.slideTo(o, e, a);
        }
      } else i.slideTo(0, e, a);
    }
  },
      R = {
    onHashCange: function onHashCange() {
      var e = this,
          t = f.location.hash.replace("#", "");

      if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
        var a = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index();
        if (void 0 === a) return;
        e.slideTo(a);
      }
    },
    setHash: function setHash() {
      var e = this;
      if (e.hashNavigation.initialized && e.params.hashNavigation.enabled) if (e.params.hashNavigation.replaceState && ee.history && ee.history.replaceState) ee.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");else {
        var t = e.slides.eq(e.activeIndex),
            a = t.attr("data-hash") || t.attr("data-history");
        f.location.hash = a || "";
      }
    },
    init: function init() {
      var e = this;

      if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
        e.hashNavigation.initialized = !0;
        var t = f.location.hash.replace("#", "");
        if (t) for (var a = 0, i = e.slides.length; a < i; a += 1) {
          var s = e.slides.eq(a);

          if ((s.attr("data-hash") || s.attr("data-history")) === t && !s.hasClass(e.params.slideDuplicateClass)) {
            var r = s.index();
            e.slideTo(r, 0, e.params.runCallbacksOnInit, !0);
          }
        }
        e.params.hashNavigation.watchState && I(ee).on("hashchange", e.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      this.params.hashNavigation.watchState && I(ee).off("hashchange", this.hashNavigation.onHashCange);
    }
  },
      q = {
    run: function run() {
      var e = this,
          t = e.slides.eq(e.activeIndex),
          a = e.params.autoplay.delay;
      t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = te.nextTick(function () {
        e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
      }, a);
    },
    start: function start() {
      var e = this;
      return void 0 === e.autoplay.timeout && !e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0);
    },
    stop: function stop() {
      var e = this;
      return !!e.autoplay.running && void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0);
    },
    pause: function pause(e) {
      var t = this;
      t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())));
    }
  },
      W = {
    setTranslate: function setTranslate() {
      for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
        var i = e.slides.eq(a),
            s = -i[0].swiperSlideOffset;
        e.params.virtualTranslate || (s -= e.translate);
        var r = 0;
        e.isHorizontal() || (r = s, s = 0);
        var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
        i.css({
          opacity: n
        }).transform("translate3d(" + s + "px, " + r + "px, 0px)");
      }
    },
    setTransition: function setTransition(e) {
      var a = this,
          t = a.slides,
          i = a.$wrapperEl;

      if (t.transition(e), a.params.virtualTranslate && 0 !== e) {
        var s = !1;
        t.transitionEnd(function () {
          if (!s && a && !a.destroyed) {
            s = !0, a.animating = !1;

            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) {
              i.trigger(e[t]);
            }
          }
        });
      }
    }
  },
      j = {
    setTranslate: function setTranslate() {
      var e,
          t = this,
          a = t.$el,
          i = t.$wrapperEl,
          s = t.slides,
          r = t.width,
          n = t.height,
          o = t.rtlTranslate,
          l = t.size,
          d = t.params.cubeEffect,
          p = t.isHorizontal(),
          c = t.virtual && t.params.virtual.enabled,
          u = 0;
      d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = I('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
        height: r + "px"
      })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = I('<div class="swiper-cube-shadow"></div>'), a.append(e)));

      for (var h = 0; h < s.length; h += 1) {
        var v = s.eq(h),
            f = h;
        c && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
        var m = 90 * f,
            g = Math.floor(m / 360);
        o && (m = -m, g = Math.floor(-m / 360));
        var b = Math.max(Math.min(v[0].progress, 1), -1),
            w = 0,
            y = 0,
            x = 0;
        f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), p || (y = w, w = 0);
        var T = "rotateX(" + (p ? 0 : -m) + "deg) rotateY(" + (p ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";

        if (b <= 1 && -1 < b && (u = 90 * f + 90 * b, o && (u = 90 * -f - 90 * b)), v.transform(T), d.slideShadows) {
          var E = p ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
              S = p ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
          0 === E.length && (E = I('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = I('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0));
        }
      }

      if (i.css({
        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
        "transform-origin": "50% 50% -" + l / 2 + "px"
      }), d.shadow) if (p) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");else {
        var C = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
            M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
            P = d.shadowScale,
            k = d.shadowScale / M,
            z = d.shadowOffset;
        e.transform("scale3d(" + P + ", 1, " + k + ") translate3d(0px, " + (n / 2 + z) + "px, " + -n / 2 / k + "px) rotateX(-90deg)");
      }
      var $ = ie.isSafari || ie.isUiWebView ? -l / 2 : 0;
      i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (t.isHorizontal() ? 0 : u) + "deg) rotateY(" + (t.isHorizontal() ? -u : 0) + "deg)");
    },
    setTransition: function setTransition(e) {
      var t = this.$el;
      this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e);
    }
  },
      U = {
    setTranslate: function setTranslate() {
      for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
        var s = t.eq(i),
            r = s[0].progress;
        e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
        var n = -180 * r,
            o = 0,
            l = -s[0].swiperSlideOffset,
            d = 0;

        if (e.isHorizontal() ? a && (n = -n) : (d = l, o = -n, n = l = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
          var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
              c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
          0 === p.length && (p = I('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === c.length && (c = I('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), p.length && (p[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0));
        }

        s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
      }
    },
    setTransition: function setTransition(e) {
      var a = this,
          t = a.slides,
          i = a.activeIndex,
          s = a.$wrapperEl;

      if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), a.params.virtualTranslate && 0 !== e) {
        var r = !1;
        t.eq(i).transitionEnd(function () {
          if (!r && a && !a.destroyed) {
            r = !0, a.animating = !1;

            for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) {
              s.trigger(e[t]);
            }
          }
        });
      }
    }
  },
      K = {
    setTranslate: function setTranslate() {
      for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.$wrapperEl, r = e.slidesSizesGrid, n = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : a / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, h = i.length; u < h; u += 1) {
        var v = i.eq(u),
            f = r[u],
            m = (d - v[0].swiperSlideOffset - f / 2) / f * n.modifier,
            g = o ? p * m : 0,
            b = o ? 0 : p * m,
            w = -c * Math.abs(m),
            y = o ? 0 : n.stretch * m,
            x = o ? n.stretch * m : 0;
        Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(b) < .001 && (b = 0);
        var T = "translate3d(" + x + "px," + y + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg)";

        if (v.transform(T), v[0].style.zIndex = 1 - Math.abs(Math.round(m)), n.slideShadows) {
          var E = o ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
              S = o ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
          0 === E.length && (E = I('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = I('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = 0 < m ? m : 0), S.length && (S[0].style.opacity = 0 < -m ? -m : 0);
        }
      }

      (ae.pointerEvents || ae.prefixedPointerEvents) && (s[0].style.perspectiveOrigin = d + "px 50%");
    },
    setTransition: function setTransition(e) {
      this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
    }
  },
      _ = {
    init: function init() {
      var e = this,
          t = e.params.thumbs,
          a = e.constructor;
      t.swiper instanceof a ? (e.thumbs.swiper = t.swiper, te.extend(e.thumbs.swiper.originalParams, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), te.extend(e.thumbs.swiper.params, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      })) : te.isObject(t.swiper) && (e.thumbs.swiper = new a(te.extend({}, t.swiper, {
        watchSlidesVisibility: !0,
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick);
    },
    onThumbClick: function onThumbClick() {
      var e = this,
          t = e.thumbs.swiper;

      if (t) {
        var a = t.clickedIndex,
            i = t.clickedSlide;

        if (!(i && I(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
          var s;

          if (s = t.params.loop ? parseInt(I(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a, e.params.loop) {
            var r = e.activeIndex;
            e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, r = e.activeIndex);
            var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                o = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
            s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n;
          }

          e.slideTo(s);
        }
      }
    },
    update: function update(e) {
      var t = this,
          a = t.thumbs.swiper;

      if (a) {
        var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView;

        if (t.realIndex !== a.realIndex) {
          var s,
              r = a.activeIndex;

          if (a.params.loop) {
            a.slides.eq(r).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, r = a.activeIndex);
            var n = a.slides.eq(r).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                o = a.slides.eq(r).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
            s = void 0 === n ? o : void 0 === o ? n : o - r == r - n ? r : o - r < r - n ? o : n;
          } else s = t.realIndex;

          a.visibleSlidesIndexes && a.visibleSlidesIndexes.indexOf(s) < 0 && (a.params.centeredSlides ? s = r < s ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : r < s && (s = s - i + 1), a.slideTo(s, e ? 0 : void 0));
        }

        var l = 1,
            d = t.params.thumbs.slideThumbActiveClass;
        if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView), a.slides.removeClass(d), a.params.loop || a.params.virtual) for (var p = 0; p < l; p += 1) {
          a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + p) + '"]').addClass(d);
        } else for (var c = 0; c < l; c += 1) {
          a.slides.eq(t.realIndex + c).addClass(d);
        }
      }
    }
  },
      Z = [E, S, C, M, k, $, D, {
    name: "mousewheel",
    params: {
      mousewheel: {
        enabled: !1,
        releaseOnEdges: !1,
        invert: !1,
        forceToAxis: !1,
        sensitivity: 1,
        eventsTarged: "container"
      }
    },
    create: function create() {
      var e = this;
      te.extend(e, {
        mousewheel: {
          enabled: !1,
          enable: O.enable.bind(e),
          disable: O.disable.bind(e),
          handle: O.handle.bind(e),
          handleMouseEnter: O.handleMouseEnter.bind(e),
          handleMouseLeave: O.handleMouseLeave.bind(e),
          lastScrollTime: te.now()
        }
      });
    },
    on: {
      init: function init() {
        this.params.mousewheel.enabled && this.mousewheel.enable();
      },
      destroy: function destroy() {
        this.mousewheel.enabled && this.mousewheel.disable();
      }
    }
  }, {
    name: "navigation",
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock"
      }
    },
    create: function create() {
      var e = this;
      te.extend(e, {
        navigation: {
          init: A.init.bind(e),
          update: A.update.bind(e),
          destroy: A.destroy.bind(e),
          onNextClick: A.onNextClick.bind(e),
          onPrevClick: A.onPrevClick.bind(e)
        }
      });
    },
    on: {
      init: function init() {
        this.navigation.init(), this.navigation.update();
      },
      toEdge: function toEdge() {
        this.navigation.update();
      },
      fromEdge: function fromEdge() {
        this.navigation.update();
      },
      destroy: function destroy() {
        this.navigation.destroy();
      },
      click: function click(e) {
        var t,
            a = this,
            i = a.navigation,
            s = i.$nextEl,
            r = i.$prevEl;
        !a.params.navigation.hideOnClick || I(e.target).is(r) || I(e.target).is(s) || (s ? t = s.hasClass(a.params.navigation.hiddenClass) : r && (t = r.hasClass(a.params.navigation.hiddenClass)), !0 === t ? a.emit("navigationShow", a) : a.emit("navigationHide", a), s && s.toggleClass(a.params.navigation.hiddenClass), r && r.toggleClass(a.params.navigation.hiddenClass));
      }
    }
  }, {
    name: "pagination",
    params: {
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: function formatFractionCurrent(e) {
          return e;
        },
        formatFractionTotal: function formatFractionTotal(e) {
          return e;
        },
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        modifierClass: "swiper-pagination-",
        currentClass: "swiper-pagination-current",
        totalClass: "swiper-pagination-total",
        hiddenClass: "swiper-pagination-hidden",
        progressbarFillClass: "swiper-pagination-progressbar-fill",
        progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
        clickableClass: "swiper-pagination-clickable",
        lockClass: "swiper-pagination-lock"
      }
    },
    create: function create() {
      var e = this;
      te.extend(e, {
        pagination: {
          init: H.init.bind(e),
          render: H.render.bind(e),
          update: H.update.bind(e),
          destroy: H.destroy.bind(e),
          dynamicBulletIndex: 0
        }
      });
    },
    on: {
      init: function init() {
        this.pagination.init(), this.pagination.render(), this.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update();
      },
      snapIndexChange: function snapIndexChange() {
        this.params.loop || this.pagination.update();
      },
      slidesLengthChange: function slidesLengthChange() {
        this.params.loop && (this.pagination.render(), this.pagination.update());
      },
      snapGridLengthChange: function snapGridLengthChange() {
        this.params.loop || (this.pagination.render(), this.pagination.update());
      },
      destroy: function destroy() {
        this.pagination.destroy();
      },
      click: function click(e) {
        var t = this;
        t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !I(e.target).hasClass(t.params.pagination.bulletClass) && (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit("paginationShow", t) : t.emit("paginationHide", t), t.pagination.$el.toggleClass(t.params.pagination.hiddenClass));
      }
    }
  }, {
    name: "scrollbar",
    params: {
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag"
      }
    },
    create: function create() {
      var e = this;
      te.extend(e, {
        scrollbar: {
          init: G.init.bind(e),
          destroy: G.destroy.bind(e),
          updateSize: G.updateSize.bind(e),
          setTranslate: G.setTranslate.bind(e),
          setTransition: G.setTransition.bind(e),
          enableDraggable: G.enableDraggable.bind(e),
          disableDraggable: G.disableDraggable.bind(e),
          setDragPosition: G.setDragPosition.bind(e),
          getPointerPosition: G.getPointerPosition.bind(e),
          onDragStart: G.onDragStart.bind(e),
          onDragMove: G.onDragMove.bind(e),
          onDragEnd: G.onDragEnd.bind(e),
          isTouched: !1,
          timeout: null,
          dragTimeout: null
        }
      });
    },
    on: {
      init: function init() {
        this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate();
      },
      update: function update() {
        this.scrollbar.updateSize();
      },
      resize: function resize() {
        this.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        this.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        this.scrollbar.setTranslate();
      },
      setTransition: function setTransition(e) {
        this.scrollbar.setTransition(e);
      },
      destroy: function destroy() {
        this.scrollbar.destroy();
      }
    }
  }, {
    name: "parallax",
    params: {
      parallax: {
        enabled: !1
      }
    },
    create: function create() {
      te.extend(this, {
        parallax: {
          setTransform: N.setTransform.bind(this),
          setTranslate: N.setTranslate.bind(this),
          setTransition: N.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0);
      },
      init: function init() {
        this.params.parallax.enabled && this.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        this.params.parallax.enabled && this.parallax.setTranslate();
      },
      setTransition: function setTransition(e) {
        this.params.parallax.enabled && this.parallax.setTransition(e);
      }
    }
  }, {
    name: "zoom",
    params: {
      zoom: {
        enabled: !1,
        maxRatio: 3,
        minRatio: 1,
        toggle: !0,
        containerClass: "swiper-zoom-container",
        zoomedSlideClass: "swiper-slide-zoomed"
      }
    },
    create: function create() {
      var i = this,
          t = {
        enabled: !1,
        scale: 1,
        currentScale: 1,
        isScaling: !1,
        gesture: {
          $slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          $imageEl: void 0,
          $imageWrapEl: void 0,
          maxRatio: 3
        },
        image: {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {}
        },
        velocity: {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0
        }
      };
      "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (e) {
        t[e] = B[e].bind(i);
      }), te.extend(i, {
        zoom: t
      });
      var s = 1;
      Object.defineProperty(i.zoom, "scale", {
        get: function get() {
          return s;
        },
        set: function set(e) {
          if (s !== e) {
            var t = i.zoom.gesture.$imageEl ? i.zoom.gesture.$imageEl[0] : void 0,
                a = i.zoom.gesture.$slideEl ? i.zoom.gesture.$slideEl[0] : void 0;
            i.emit("zoomChange", e, t, a);
          }

          s = e;
        }
      });
    },
    on: {
      init: function init() {
        this.params.zoom.enabled && this.zoom.enable();
      },
      destroy: function destroy() {
        this.zoom.disable();
      },
      touchStart: function touchStart(e) {
        this.zoom.enabled && this.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        this.zoom.enabled && this.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e);
      },
      transitionEnd: function transitionEnd() {
        this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd();
      }
    }
  }, {
    name: "lazy",
    params: {
      lazy: {
        enabled: !1,
        loadPrevNext: !1,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: !1,
        elementClass: "swiper-lazy",
        loadingClass: "swiper-lazy-loading",
        loadedClass: "swiper-lazy-loaded",
        preloaderClass: "swiper-lazy-preloader"
      }
    },
    create: function create() {
      te.extend(this, {
        lazy: {
          initialImageLoaded: !1,
          load: X.load.bind(this),
          loadInSlide: X.loadInSlide.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1);
      },
      init: function init() {
        this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load();
      },
      scroll: function scroll() {
        this.params.freeMode && !this.params.freeModeSticky && this.lazy.load();
      },
      resize: function resize() {
        this.params.lazy.enabled && this.lazy.load();
      },
      scrollbarDragMove: function scrollbarDragMove() {
        this.params.lazy.enabled && this.lazy.load();
      },
      transitionStart: function transitionStart() {
        var e = this;
        e.params.lazy.enabled && (!e.params.lazy.loadOnTransitionStart && (e.params.lazy.loadOnTransitionStart || e.lazy.initialImageLoaded) || e.lazy.load());
      },
      transitionEnd: function transitionEnd() {
        this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load();
      }
    }
  }, {
    name: "controller",
    params: {
      controller: {
        control: void 0,
        inverse: !1,
        by: "slide"
      }
    },
    create: function create() {
      var e = this;
      te.extend(e, {
        controller: {
          control: e.params.controller.control,
          getInterpolateFunction: V.getInterpolateFunction.bind(e),
          setTranslate: V.setTranslate.bind(e),
          setTransition: V.setTransition.bind(e)
        }
      });
    },
    on: {
      update: function update() {
        this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
      },
      resize: function resize() {
        this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
      },
      observerUpdate: function observerUpdate() {
        this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
      },
      setTranslate: function setTranslate(e, t) {
        this.controller.control && this.controller.setTranslate(e, t);
      },
      setTransition: function setTransition(e, t) {
        this.controller.control && this.controller.setTransition(e, t);
      }
    }
  }, {
    name: "a11y",
    params: {
      a11y: {
        enabled: !0,
        notificationClass: "swiper-notification",
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}"
      }
    },
    create: function create() {
      var t = this;
      te.extend(t, {
        a11y: {
          liveRegion: I('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
        }
      }), Object.keys(Y).forEach(function (e) {
        t.a11y[e] = Y[e].bind(t);
      });
    },
    on: {
      init: function init() {
        this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation());
      },
      toEdge: function toEdge() {
        this.params.a11y.enabled && this.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        this.params.a11y.enabled && this.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        this.params.a11y.enabled && this.a11y.updatePagination();
      },
      destroy: function destroy() {
        this.params.a11y.enabled && this.a11y.destroy();
      }
    }
  }, {
    name: "history",
    params: {
      history: {
        enabled: !1,
        replaceState: !1,
        key: "slides"
      }
    },
    create: function create() {
      var e = this;
      te.extend(e, {
        history: {
          init: F.init.bind(e),
          setHistory: F.setHistory.bind(e),
          setHistoryPopState: F.setHistoryPopState.bind(e),
          scrollToSlide: F.scrollToSlide.bind(e),
          destroy: F.destroy.bind(e)
        }
      });
    },
    on: {
      init: function init() {
        this.params.history.enabled && this.history.init();
      },
      destroy: function destroy() {
        this.params.history.enabled && this.history.destroy();
      },
      transitionEnd: function transitionEnd() {
        this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex);
      }
    }
  }, {
    name: "hash-navigation",
    params: {
      hashNavigation: {
        enabled: !1,
        replaceState: !1,
        watchState: !1
      }
    },
    create: function create() {
      var e = this;
      te.extend(e, {
        hashNavigation: {
          initialized: !1,
          init: R.init.bind(e),
          destroy: R.destroy.bind(e),
          setHash: R.setHash.bind(e),
          onHashCange: R.onHashCange.bind(e)
        }
      });
    },
    on: {
      init: function init() {
        this.params.hashNavigation.enabled && this.hashNavigation.init();
      },
      destroy: function destroy() {
        this.params.hashNavigation.enabled && this.hashNavigation.destroy();
      },
      transitionEnd: function transitionEnd() {
        this.hashNavigation.initialized && this.hashNavigation.setHash();
      }
    }
  }, {
    name: "autoplay",
    params: {
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !0,
        stopOnLastSlide: !1,
        reverseDirection: !1
      }
    },
    create: function create() {
      var t = this;
      te.extend(t, {
        autoplay: {
          running: !1,
          paused: !1,
          run: q.run.bind(t),
          start: q.start.bind(t),
          stop: q.stop.bind(t),
          pause: q.pause.bind(t),
          onTransitionEnd: function onTransitionEnd(e) {
            t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
          }
        }
      });
    },
    on: {
      init: function init() {
        this.params.autoplay.enabled && this.autoplay.start();
      },
      beforeTransitionStart: function beforeTransitionStart(e, t) {
        this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop());
      },
      sliderFirstMove: function sliderFirstMove() {
        this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause());
      },
      destroy: function destroy() {
        this.autoplay.running && this.autoplay.stop();
      }
    }
  }, {
    name: "effect-fade",
    params: {
      fadeEffect: {
        crossFade: !1
      }
    },
    create: function create() {
      te.extend(this, {
        fadeEffect: {
          setTranslate: W.setTranslate.bind(this),
          setTransition: W.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var e = this;

        if ("fade" === e.params.effect) {
          e.classNames.push(e.params.containerModifierClass + "fade");
          var t = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !0
          };
          te.extend(e.params, t), te.extend(e.originalParams, t);
        }
      },
      setTranslate: function setTranslate() {
        "fade" === this.params.effect && this.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(e) {
        "fade" === this.params.effect && this.fadeEffect.setTransition(e);
      }
    }
  }, {
    name: "effect-cube",
    params: {
      cubeEffect: {
        slideShadows: !0,
        shadow: !0,
        shadowOffset: 20,
        shadowScale: .94
      }
    },
    create: function create() {
      te.extend(this, {
        cubeEffect: {
          setTranslate: j.setTranslate.bind(this),
          setTransition: j.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var e = this;

        if ("cube" === e.params.effect) {
          e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
          var t = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0
          };
          te.extend(e.params, t), te.extend(e.originalParams, t);
        }
      },
      setTranslate: function setTranslate() {
        "cube" === this.params.effect && this.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(e) {
        "cube" === this.params.effect && this.cubeEffect.setTransition(e);
      }
    }
  }, {
    name: "effect-flip",
    params: {
      flipEffect: {
        slideShadows: !0,
        limitRotation: !0
      }
    },
    create: function create() {
      te.extend(this, {
        flipEffect: {
          setTranslate: U.setTranslate.bind(this),
          setTransition: U.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var e = this;

        if ("flip" === e.params.effect) {
          e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
          var t = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !0
          };
          te.extend(e.params, t), te.extend(e.originalParams, t);
        }
      },
      setTranslate: function setTranslate() {
        "flip" === this.params.effect && this.flipEffect.setTranslate();
      },
      setTransition: function setTransition(e) {
        "flip" === this.params.effect && this.flipEffect.setTransition(e);
      }
    }
  }, {
    name: "effect-coverflow",
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: !0
      }
    },
    create: function create() {
      te.extend(this, {
        coverflowEffect: {
          setTranslate: K.setTranslate.bind(this),
          setTransition: K.setTransition.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var e = this;
        "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0);
      },
      setTranslate: function setTranslate() {
        "coverflow" === this.params.effect && this.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(e) {
        "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e);
      }
    }
  }, {
    name: "thumbs",
    params: {
      thumbs: {
        swiper: null,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-container-thumbs"
      }
    },
    create: function create() {
      te.extend(this, {
        thumbs: {
          swiper: null,
          init: _.init.bind(this),
          update: _.update.bind(this),
          onThumbClick: _.onThumbClick.bind(this)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var e = this.params.thumbs;
        e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
      },
      slideChange: function slideChange() {
        this.thumbs.swiper && this.thumbs.update();
      },
      update: function update() {
        this.thumbs.swiper && this.thumbs.update();
      },
      resize: function resize() {
        this.thumbs.swiper && this.thumbs.update();
      },
      observerUpdate: function observerUpdate() {
        this.thumbs.swiper && this.thumbs.update();
      },
      setTransition: function setTransition(e) {
        var t = this.thumbs.swiper;
        t && t.setTransition(e);
      },
      beforeDestroy: function beforeDestroy() {
        var e = this.thumbs.swiper;
        e && this.thumbs.swiperCreated && e && e.destroy();
      }
    }
  }];
  return void 0 === T.use && (T.use = T.Class.use, T.installModule = T.Class.installModule), T.use(Z), T;
});
/* Plyr */

"object" == (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) && function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : (e = e || self).Plyr = t();
}(this, function () {
  "use strict";

  function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function t(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  function n(e, n, i) {
    return n && t(e.prototype, n), i && t(e, i), e;
  }

  function i(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function a(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      var n = [],
          i = !0,
          a = !1,
          s = void 0;

      try {
        for (var r, o = e[Symbol.iterator](); !(i = (r = o.next()).done) && (n.push(r.value), !t || n.length !== t); i = !0) {
          ;
        }
      } catch (e) {
        a = !0, s = e;
      } finally {
        try {
          i || null == o.return || o.return();
        } finally {
          if (a) throw s;
        }
      }

      return n;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }

  function s(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = new Array(e.length); t < e.length; t++) {
          n[t] = e[t];
        }

        return n;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  var r = {
    addCSS: !0,
    thumbWidth: 15,
    watch: !0
  };

  var o = function o(e) {
    return null != e ? e.constructor : null;
  },
      l = function l(e, t) {
    return Boolean(e && t && e instanceof t);
  },
      c = function c(e) {
    return null == e;
  },
      u = function u(e) {
    return o(e) === Object;
  },
      d = function d(e) {
    return o(e) === String;
  },
      h = function h(e) {
    return Array.isArray(e);
  },
      m = function m(e) {
    return l(e, NodeList);
  },
      p = {
    nullOrUndefined: c,
    object: u,
    number: function number(e) {
      return o(e) === Number && !Number.isNaN(e);
    },
    string: d,
    boolean: function boolean(e) {
      return o(e) === Boolean;
    },
    function: function _function(e) {
      return o(e) === Function;
    },
    array: h,
    nodeList: m,
    element: function element(e) {
      return l(e, Element);
    },
    event: function event(e) {
      return l(e, Event);
    },
    empty: function empty(e) {
      return c(e) || (d(e) || h(e) || m(e)) && !e.length || u(e) && !Object.keys(e).length;
    }
  };

  function f(e, t) {
    if (t < 1) {
      var n = (i = "".concat(t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)) ? Math.max(0, (i[1] ? i[1].length : 0) - (i[2] ? +i[2] : 0)) : 0;
      return parseFloat(e.toFixed(n));
    }

    var i;
    return Math.round(e / t) * t;
  }

  var g,
      y,
      v,
      b = function () {
    function t(n, i) {
      e(this, t), p.element(n) ? this.element = n : p.string(n) && (this.element = document.querySelector(n)), p.element(this.element) && p.empty(this.element.rangeTouch) && (this.config = Object.assign({}, r, i), this.init());
    }

    return n(t, [{
      key: "init",
      value: function value() {
        t.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
      }
    }, {
      key: "destroy",
      value: function value() {
        t.enabled && (this.listeners(!1), this.element.rangeTouch = null);
      }
    }, {
      key: "listeners",
      value: function value(e) {
        var t = this,
            n = e ? "addEventListener" : "removeEventListener";
        ["touchstart", "touchmove", "touchend"].forEach(function (e) {
          t.element[n](e, function (e) {
            return t.set(e);
          }, !1);
        });
      }
    }, {
      key: "get",
      value: function value(e) {
        if (!t.enabled || !p.event(e)) return null;
        var n,
            i = e.target,
            a = e.changedTouches[0],
            s = parseFloat(i.getAttribute("min")) || 0,
            r = parseFloat(i.getAttribute("max")) || 100,
            o = parseFloat(i.getAttribute("step")) || 1,
            l = r - s,
            c = i.getBoundingClientRect(),
            u = 100 / c.width * (this.config.thumbWidth / 2) / 100;
        return (n = 100 / c.width * (a.clientX - c.left)) < 0 ? n = 0 : n > 100 && (n = 100), n < 50 ? n -= (100 - 2 * n) * u : n > 50 && (n += 2 * (n - 50) * u), s + f(l * (n / 100), o);
      }
    }, {
      key: "set",
      value: function value(e) {
        t.enabled && p.event(e) && !e.target.disabled && (e.preventDefault(), e.target.value = this.get(e), function (e, t) {
          if (e && t) {
            var n = new Event(t);
            e.dispatchEvent(n);
          }
        }(e.target, "touchend" === e.type ? "change" : "input"));
      }
    }], [{
      key: "setup",
      value: function value(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = null;
        if (p.empty(e) || p.string(e) ? i = Array.from(document.querySelectorAll(p.string(e) ? e : 'input[type="range"]')) : p.element(e) ? i = [e] : p.nodeList(e) ? i = Array.from(e) : p.array(e) && (i = e.filter(p.element)), p.empty(i)) return null;
        var a = Object.assign({}, r, n);
        p.string(e) && a.watch && new MutationObserver(function (n) {
          Array.from(n).forEach(function (n) {
            Array.from(n.addedNodes).forEach(function (n) {
              if (p.element(n) && function () {
                return Array.from(document.querySelectorAll(i)).includes(this);
              }.call(n, i = e)) {
                var i;
                new t(n, a);
              }
            });
          });
        }).observe(document.body, {
          childList: !0,
          subtree: !0
        });
        return i.map(function (e) {
          return new t(e, n);
        });
      }
    }, {
      key: "enabled",
      get: function get() {
        return "ontouchstart" in document.documentElement;
      }
    }]), t;
  }(),
      k = function k(e) {
    return null != e ? e.constructor : null;
  },
      w = function w(e, t) {
    return Boolean(e && t && e instanceof t);
  },
      T = function T(e) {
    return null == e;
  },
      C = function C(e) {
    return k(e) === Object;
  },
      A = function A(e) {
    return k(e) === String;
  },
      E = function E(e) {
    return Array.isArray(e);
  },
      S = function S(e) {
    return w(e, NodeList);
  },
      P = function P(e) {
    return T(e) || (A(e) || E(e) || S(e)) && !e.length || C(e) && !Object.keys(e).length;
  },
      N = {
    nullOrUndefined: T,
    object: C,
    number: function number(e) {
      return k(e) === Number && !Number.isNaN(e);
    },
    string: A,
    boolean: function boolean(e) {
      return k(e) === Boolean;
    },
    function: function _function(e) {
      return k(e) === Function;
    },
    array: E,
    weakMap: function weakMap(e) {
      return w(e, WeakMap);
    },
    nodeList: S,
    element: function element(e) {
      return w(e, Element);
    },
    textNode: function textNode(e) {
      return k(e) === Text;
    },
    event: function event(e) {
      return w(e, Event);
    },
    keyboardEvent: function keyboardEvent(e) {
      return w(e, KeyboardEvent);
    },
    cue: function cue(e) {
      return w(e, window.TextTrackCue) || w(e, window.VTTCue);
    },
    track: function track(e) {
      return w(e, TextTrack) || !T(e) && A(e.kind);
    },
    promise: function promise(e) {
      return w(e, Promise);
    },
    url: function url(e) {
      if (w(e, window.URL)) return !0;
      if (!A(e)) return !1;
      var t = e;
      e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));

      try {
        return !P(new URL(t).hostname);
      } catch (e) {
        return !1;
      }
    },
    empty: P
  },
      M = (g = document.createElement("span"), y = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend",
    transition: "transitionend"
  }, v = Object.keys(y).find(function (e) {
    return void 0 !== g.style[e];
  }), !!N.string(v) && y[v]);

  function x(e, t) {
    setTimeout(function () {
      try {
        e.hidden = !0, e.offsetHeight, e.hidden = !1;
      } catch (e) {}
    }, t);
  }

  var L = {
    isIE: !!document.documentMode,
    isEdge: window.navigator.userAgent.includes("Edge"),
    isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
    isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
    isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
  },
      I = function () {
    var e = !1;

    try {
      var t = Object.defineProperty({}, "passive", {
        get: function get() {
          return e = !0, null;
        }
      });
      window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
    } catch (e) {}

    return e;
  }();

  function _(e, t, n) {
    var i = this,
        a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
        s = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
        r = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];

    if (e && "addEventListener" in e && !N.empty(t) && N.function(n)) {
      var o = t.split(" "),
          l = r;
      I && (l = {
        passive: s,
        capture: r
      }), o.forEach(function (t) {
        i && i.eventListeners && a && i.eventListeners.push({
          element: e,
          type: t,
          callback: n,
          options: l
        }), e[a ? "addEventListener" : "removeEventListener"](t, n, l);
      });
    }
  }

  function O(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 ? arguments[2] : void 0,
        i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];

    _.call(this, e, t, n, !0, i, a);
  }

  function j(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 ? arguments[2] : void 0,
        i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];

    _.call(this, e, t, n, !1, i, a);
  }

  function q(e) {
    var t = this,
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        i = arguments.length > 2 ? arguments[2] : void 0,
        a = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
        s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];

    _.call(this, e, n, function r() {
      j(e, n, r, a, s);

      for (var o = arguments.length, l = new Array(o), c = 0; c < o; c++) {
        l[c] = arguments[c];
      }

      i.apply(t, l);
    }, !0, a, s);
  }

  function H(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};

    if (N.element(e) && !N.empty(t)) {
      var a = new CustomEvent(t, {
        bubbles: n,
        detail: Object.assign({}, i, {
          plyr: this
        })
      });
      e.dispatchEvent(a);
    }
  }

  function D(e, t) {
    return t.split(".").reduce(function (e, t) {
      return e && e[t];
    }, e);
  }

  function F() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) {
      n[a - 1] = arguments[a];
    }

    if (!n.length) return e;
    var s = n.shift();
    return N.object(s) ? (Object.keys(s).forEach(function (t) {
      N.object(s[t]) ? (Object.keys(e).includes(t) || Object.assign(e, i({}, t, {})), F(e[t], s[t])) : Object.assign(e, i({}, t, s[t]));
    }), F.apply(void 0, [e].concat(n))) : e;
  }

  function R(e, t) {
    var n = e.length ? e : [e];
    Array.from(n).reverse().forEach(function (e, n) {
      var i = n > 0 ? t.cloneNode(!0) : t,
          a = e.parentNode,
          s = e.nextSibling;
      i.appendChild(e), s ? a.insertBefore(i, s) : a.appendChild(i);
    });
  }

  function V(e, t) {
    N.element(e) && !N.empty(t) && Object.entries(t).filter(function (e) {
      var t = a(e, 2)[1];
      return !N.nullOrUndefined(t);
    }).forEach(function (t) {
      var n = a(t, 2),
          i = n[0],
          s = n[1];
      return e.setAttribute(i, s);
    });
  }

  function B(e, t, n) {
    var i = document.createElement(e);
    return N.object(t) && V(i, t), N.string(n) && (i.innerText = n), i;
  }

  function U(e, t, n, i) {
    N.element(t) && t.appendChild(B(e, n, i));
  }

  function W(e) {
    N.nodeList(e) || N.array(e) ? Array.from(e).forEach(W) : N.element(e) && N.element(e.parentNode) && e.parentNode.removeChild(e);
  }

  function z(e) {
    if (N.element(e)) for (var t = e.childNodes.length; t > 0;) {
      e.removeChild(e.lastChild), t -= 1;
    }
  }

  function K(e, t) {
    return N.element(t) && N.element(t.parentNode) && N.element(e) ? (t.parentNode.replaceChild(e, t), e) : null;
  }

  function Y(e, t) {
    if (!N.string(e) || N.empty(e)) return {};
    var n = {},
        i = F({}, t);
    return e.split(",").forEach(function (e) {
      var t = e.trim(),
          s = t.replace(".", ""),
          r = t.replace(/[[\]]/g, "").split("="),
          o = a(r, 1)[0],
          l = r.length > 1 ? r[1].replace(/["']/g, "") : "";

      switch (t.charAt(0)) {
        case ".":
          N.string(i.class) ? n.class = "".concat(i.class, " ").concat(s) : n.class = s;
          break;

        case "#":
          n.id = t.replace("#", "");
          break;

        case "[":
          n[o] = l;
      }
    }), F(i, n);
  }

  function Q(e, t) {
    if (N.element(e)) {
      var n = t;
      N.boolean(n) || (n = !e.hidden), e.hidden = n;
    }
  }

  function X(e, t, n) {
    if (N.nodeList(e)) return Array.from(e).map(function (e) {
      return X(e, t, n);
    });

    if (N.element(e)) {
      var i = "toggle";
      return void 0 !== n && (i = n ? "add" : "remove"), e.classList[i](t), e.classList.contains(t);
    }

    return !1;
  }

  function J(e, t) {
    return N.element(e) && e.classList.contains(t);
  }

  function $(e, t) {
    return function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }.call(e, t);
  }

  function G(e) {
    return this.elements.container.querySelectorAll(e);
  }

  function Z(e) {
    return this.elements.container.querySelector(e);
  }

  function ee() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    N.element(e) && (e.focus({
      preventScroll: !0
    }), t && X(e, this.config.classNames.tabFocus));
  }

  var te,
      ne = {
    "audio/ogg": "vorbis",
    "audio/wav": "1",
    "video/webm": "vp8, vorbis",
    "video/mp4": "avc1.42E01E, mp4a.40.2",
    "video/ogg": "theora"
  },
      ie = {
    audio: "canPlayType" in document.createElement("audio"),
    video: "canPlayType" in document.createElement("video"),
    check: function check(e, t, n) {
      var i = L.isIPhone && n && ie.playsinline,
          a = ie[e] || "html5" !== t;
      return {
        api: a,
        ui: a && ie.rangeInput && ("video" !== e || !L.isIPhone || i)
      };
    },
    pip: !(L.isIPhone || !N.function(B("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || B("video").disablePictureInPicture)),
    airplay: N.function(window.WebKitPlaybackTargetAvailabilityEvent),
    playsinline: "playsInline" in document.createElement("video"),
    mime: function mime(e) {
      if (N.empty(e)) return !1;
      var t = a(e.split("/"), 1)[0],
          n = e;
      if (!this.isHTML5 || t !== this.type) return !1;
      Object.keys(ne).includes(n) && (n += '; codecs="'.concat(ne[e], '"'));

      try {
        return Boolean(n && this.media.canPlayType(n).replace(/no/, ""));
      } catch (e) {
        return !1;
      }
    },
    textTracks: "textTracks" in document.createElement("video"),
    rangeInput: (te = document.createElement("input"), te.type = "range", "range" === te.type),
    touch: "ontouchstart" in document.documentElement,
    transitions: !1 !== M,
    reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
  };

  function ae(e) {
    return !!(N.array(e) || N.string(e) && e.includes(":")) && (N.array(e) ? e : e.split(":")).map(Number).every(N.number);
  }

  function se(e) {
    if (!N.array(e) || !e.every(N.number)) return null;

    var t = a(e, 2),
        n = t[0],
        i = t[1],
        s = function e(t, n) {
      return 0 === n ? t : e(n, t % n);
    }(n, i);

    return [n / s, i / s];
  }

  function re(e) {
    var t = function t(e) {
      return ae(e) ? e.split(":").map(Number) : null;
    },
        n = t(e);

    if (null === n && (n = t(this.config.ratio)), null === n && !N.empty(this.embed) && N.array(this.embed.ratio) && (n = this.embed.ratio), null === n && this.isHTML5) {
      var i = this.media;
      n = se([i.videoWidth, i.videoHeight]);
    }

    return n;
  }

  function oe(e) {
    if (!this.isVideo) return {};
    var t = re.call(this, e),
        n = a(N.array(t) ? t : [0, 0], 2),
        i = 100 / n[0] * n[1];

    if (this.elements.wrapper.style.paddingBottom = "".concat(i, "%"), this.isVimeo && this.supported.ui) {
      var s = (240 - i) / 4.8;
      this.media.style.transform = "translateY(-".concat(s, "%)");
    } else this.isHTML5 && this.elements.wrapper.classList.toggle(this.config.classNames.videoFixedRatio, null !== t);

    return {
      padding: i,
      ratio: t
    };
  }

  var le = {
    getSources: function getSources() {
      var e = this;
      return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(function (t) {
        var n = t.getAttribute("type");
        return !!N.empty(n) || ie.mime.call(e, n);
      }) : [];
    },
    getQualityOptions: function getQualityOptions() {
      return le.getSources.call(this).map(function (e) {
        return Number(e.getAttribute("size"));
      }).filter(Boolean);
    },
    extend: function extend() {
      if (this.isHTML5) {
        var e = this;
        N.empty(this.config.ratio) || oe.call(e), Object.defineProperty(e.media, "quality", {
          get: function get() {
            var t = le.getSources.call(e).find(function (t) {
              return t.getAttribute("src") === e.source;
            });
            return t && Number(t.getAttribute("size"));
          },
          set: function set(t) {
            var n = le.getSources.call(e).find(function (e) {
              return Number(e.getAttribute("size")) === t;
            });

            if (n) {
              var i = e.media,
                  a = i.currentTime,
                  s = i.paused,
                  r = i.preload,
                  o = i.readyState;
              e.media.src = n.getAttribute("src"), ("none" !== r || o) && (e.once("loadedmetadata", function () {
                e.currentTime = a, s || e.play();
              }), e.media.load()), H.call(e, e.media, "qualitychange", !1, {
                quality: t
              });
            }
          }
        });
      }
    },
    cancelRequests: function cancelRequests() {
      this.isHTML5 && (W(le.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
    }
  };

  function ce(e) {
    return N.array(e) ? e.filter(function (t, n) {
      return e.indexOf(t) === n;
    }) : e;
  }

  function ue(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {
      n[i - 1] = arguments[i];
    }

    return N.empty(e) ? e : e.toString().replace(/{(\d+)}/g, function (e, t) {
      return n[t].toString();
    });
  }

  function de() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"), "g"), n.toString());
  }

  function he() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/\w\S*/g, function (e) {
      return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
    });
  }

  function me() {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
    return (e = function () {
      var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
      return e = de(e, "-", " "), e = de(e, "_", " "), de(e = he(e), " ", "");
    }(e)).charAt(0).toLowerCase() + e.slice(1);
  }

  function pe(e) {
    var t = document.createElement("div");
    return t.appendChild(e), t.innerHTML;
  }

  var fe = {
    pip: "PIP",
    airplay: "AirPlay",
    html5: "HTML5",
    vimeo: "Vimeo",
    youtube: "YouTube"
  },
      ge = function ge() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (N.empty(e) || N.empty(t)) return "";
    var n = D(t.i18n, e);
    if (N.empty(n)) return Object.keys(fe).includes(e) ? fe[e] : "";
    var i = {
      "{seektime}": t.seekTime,
      "{title}": t.title
    };
    return Object.entries(i).forEach(function (e) {
      var t = a(e, 2),
          i = t[0],
          s = t[1];
      n = de(n, i, s);
    }), n;
  },
      ye = function () {
    function t(n) {
      e(this, t), this.enabled = n.config.storage.enabled, this.key = n.config.storage.key;
    }

    return n(t, [{
      key: "get",
      value: function value(e) {
        if (!t.supported || !this.enabled) return null;
        var n = window.localStorage.getItem(this.key);
        if (N.empty(n)) return null;
        var i = JSON.parse(n);
        return N.string(e) && e.length ? i[e] : i;
      }
    }, {
      key: "set",
      value: function value(e) {
        if (t.supported && this.enabled && N.object(e)) {
          var n = this.get();
          N.empty(n) && (n = {}), F(n, e), window.localStorage.setItem(this.key, JSON.stringify(n));
        }
      }
    }], [{
      key: "supported",
      get: function get() {
        try {
          if (!("localStorage" in window)) return !1;
          return window.localStorage.setItem("___test", "___test"), window.localStorage.removeItem("___test"), !0;
        } catch (e) {
          return !1;
        }
      }
    }]), t;
  }();

  function ve(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
    return new Promise(function (n, i) {
      try {
        var a = new XMLHttpRequest();
        if (!("withCredentials" in a)) return;
        a.addEventListener("load", function () {
          if ("text" === t) try {
            n(JSON.parse(a.responseText));
          } catch (e) {
            n(a.responseText);
          } else n(a.response);
        }), a.addEventListener("error", function () {
          throw new Error(a.status);
        }), a.open("GET", e, !0), a.responseType = t, a.send();
      } catch (e) {
        i(e);
      }
    });
  }

  function be(e, t) {
    if (N.string(e)) {
      var n = N.string(t),
          i = function i() {
        return null !== document.getElementById(t);
      },
          a = function a(e, t) {
        e.innerHTML = t, n && i() || document.body.insertAdjacentElement("afterbegin", e);
      };

      if (!n || !i()) {
        var s = ye.supported,
            r = document.createElement("div");

        if (r.setAttribute("hidden", ""), n && r.setAttribute("id", t), s) {
          var o = window.localStorage.getItem("".concat("cache", "-").concat(t));

          if (null !== o) {
            var l = JSON.parse(o);
            a(r, l.content);
          }
        }

        ve(e).then(function (e) {
          N.empty(e) || (s && window.localStorage.setItem("".concat("cache", "-").concat(t), JSON.stringify({
            content: e
          })), a(r, e));
        }).catch(function () {});
      }
    }
  }

  var ke = function ke(e) {
    return Math.trunc(e / 60 / 60 % 60, 10);
  },
      we = function we(e) {
    return Math.trunc(e / 60 % 60, 10);
  },
      Te = function Te(e) {
    return Math.trunc(e % 60, 10);
  };

  function Ce() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (!N.number(e)) return Ce(null, t, n);

    var i = function i(e) {
      return "0".concat(e).slice(-2);
    },
        a = ke(e),
        s = we(e),
        r = Te(e);

    return a = t || a > 0 ? "".concat(a, ":") : "", "".concat(n && e > 0 ? "-" : "").concat(a).concat(i(s), ":").concat(i(r));
  }

  var Ae = {
    getIconUrl: function getIconUrl() {
      var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || L.isIE && !window.svg4everybody;
      return {
        url: this.config.iconUrl,
        cors: e
      };
    },
    findElements: function findElements() {
      try {
        return this.elements.controls = Z.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
          play: G.call(this, this.config.selectors.buttons.play),
          pause: Z.call(this, this.config.selectors.buttons.pause),
          restart: Z.call(this, this.config.selectors.buttons.restart),
          rewind: Z.call(this, this.config.selectors.buttons.rewind),
          fastForward: Z.call(this, this.config.selectors.buttons.fastForward),
          mute: Z.call(this, this.config.selectors.buttons.mute),
          pip: Z.call(this, this.config.selectors.buttons.pip),
          airplay: Z.call(this, this.config.selectors.buttons.airplay),
          settings: Z.call(this, this.config.selectors.buttons.settings),
          captions: Z.call(this, this.config.selectors.buttons.captions),
          fullscreen: Z.call(this, this.config.selectors.buttons.fullscreen)
        }, this.elements.progress = Z.call(this, this.config.selectors.progress), this.elements.inputs = {
          seek: Z.call(this, this.config.selectors.inputs.seek),
          volume: Z.call(this, this.config.selectors.inputs.volume)
        }, this.elements.display = {
          buffer: Z.call(this, this.config.selectors.display.buffer),
          currentTime: Z.call(this, this.config.selectors.display.currentTime),
          duration: Z.call(this, this.config.selectors.display.duration)
        }, N.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0;
      } catch (e) {
        return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1;
      }
    },
    createIcon: function createIcon(e, t) {
      var n = Ae.getIconUrl.call(this),
          i = "".concat(n.cors ? "" : n.url, "#").concat(this.config.iconPrefix),
          a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      V(a, F(t, {
        role: "presentation",
        focusable: "false"
      }));
      var s = document.createElementNS("http://www.w3.org/2000/svg", "use"),
          r = "".concat(i, "-").concat(e);
      return "href" in s && s.setAttributeNS("http://www.w3.org/1999/xlink", "href", r), s.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r), a.appendChild(s), a;
    },
    createLabel: function createLabel(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = ge(e, this.config);
      return B("span", Object.assign({}, t, {
        class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
      }), n);
    },
    createBadge: function createBadge(e) {
      if (N.empty(e)) return null;
      var t = B("span", {
        class: this.config.classNames.menu.value
      });
      return t.appendChild(B("span", {
        class: this.config.classNames.menu.badge
      }, e)), t;
    },
    createButton: function createButton(e, t) {
      var n = this,
          i = F({}, t),
          a = me(e),
          s = {
        element: "button",
        toggle: !1,
        label: null,
        icon: null,
        labelPressed: null,
        iconPressed: null
      };

      switch (["element", "icon", "label"].forEach(function (e) {
        Object.keys(i).includes(e) && (s[e] = i[e], delete i[e]);
      }), "button" !== s.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(function (e) {
        return e === n.config.classNames.control;
      }) || F(i, {
        class: "".concat(i.class, " ").concat(this.config.classNames.control)
      }) : i.class = this.config.classNames.control, e) {
        case "play":
          s.toggle = !0, s.label = "play", s.labelPressed = "pause", s.icon = "play", s.iconPressed = "pause";
          break;

        case "mute":
          s.toggle = !0, s.label = "mute", s.labelPressed = "unmute", s.icon = "volume", s.iconPressed = "muted";
          break;

        case "captions":
          s.toggle = !0, s.label = "enableCaptions", s.labelPressed = "disableCaptions", s.icon = "captions-off", s.iconPressed = "captions-on";
          break;

        case "fullscreen":
          s.toggle = !0, s.label = "enterFullscreen", s.labelPressed = "exitFullscreen", s.icon = "enter-fullscreen", s.iconPressed = "exit-fullscreen";
          break;

        case "play-large":
          i.class += " ".concat(this.config.classNames.control, "--overlaid"), a = "play", s.label = "play", s.icon = "play";
          break;

        default:
          N.empty(s.label) && (s.label = a), N.empty(s.icon) && (s.icon = e);
      }

      var r = B(s.element);
      return s.toggle ? (r.appendChild(Ae.createIcon.call(this, s.iconPressed, {
        class: "icon--pressed"
      })), r.appendChild(Ae.createIcon.call(this, s.icon, {
        class: "icon--not-pressed"
      })), r.appendChild(Ae.createLabel.call(this, s.labelPressed, {
        class: "label--pressed"
      })), r.appendChild(Ae.createLabel.call(this, s.label, {
        class: "label--not-pressed"
      }))) : (r.appendChild(Ae.createIcon.call(this, s.icon)), r.appendChild(Ae.createLabel.call(this, s.label))), F(i, Y(this.config.selectors.buttons[a], i)), V(r, i), "play" === a ? (N.array(this.elements.buttons[a]) || (this.elements.buttons[a] = []), this.elements.buttons[a].push(r)) : this.elements.buttons[a] = r, r;
    },
    createRange: function createRange(e, t) {
      var n = B("input", F(Y(this.config.selectors.inputs[e]), {
        type: "range",
        min: 0,
        max: 100,
        step: .01,
        value: 0,
        autocomplete: "off",
        role: "slider",
        "aria-label": ge(e, this.config),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": 0
      }, t));
      return this.elements.inputs[e] = n, Ae.updateRangeFill.call(this, n), b.setup(n), n;
    },
    createProgress: function createProgress(e, t) {
      var n = B("progress", F(Y(this.config.selectors.display[e]), {
        min: 0,
        max: 100,
        value: 0,
        role: "progressbar",
        "aria-hidden": !0
      }, t));

      if ("volume" !== e) {
        n.appendChild(B("span", null, "0"));
        var i = {
          played: "played",
          buffer: "buffered"
        }[e],
            a = i ? ge(i, this.config) : "";
        n.innerText = "% ".concat(a.toLowerCase());
      }

      return this.elements.display[e] = n, n;
    },
    createTime: function createTime(e, t) {
      var n = Y(this.config.selectors.display[e], t),
          i = B("div", F(n, {
        class: "".concat(n.class ? n.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
        "aria-label": ge(e, this.config)
      }), "00:00");
      return this.elements.display[e] = i, i;
    },
    bindMenuItemShortcuts: function bindMenuItemShortcuts(e, t) {
      var n = this;
      O(e, "keydown keyup", function (i) {
        if ([32, 38, 39, 40].includes(i.which) && (i.preventDefault(), i.stopPropagation(), "keydown" !== i.type)) {
          var a,
              s = $(e, '[role="menuitemradio"]');
          if (!s && [32, 39].includes(i.which)) Ae.showMenuPanel.call(n, t, !0);else 32 !== i.which && (40 === i.which || s && 39 === i.which ? (a = e.nextElementSibling, N.element(a) || (a = e.parentNode.firstElementChild)) : (a = e.previousElementSibling, N.element(a) || (a = e.parentNode.lastElementChild)), ee.call(n, a, !0));
        }
      }, !1), O(e, "keyup", function (e) {
        13 === e.which && Ae.focusFirstMenuItem.call(n, null, !0);
      });
    },
    createMenuItem: function createMenuItem(e) {
      var t = this,
          n = e.value,
          i = e.list,
          a = e.type,
          s = e.title,
          r = e.badge,
          o = void 0 === r ? null : r,
          l = e.checked,
          c = void 0 !== l && l,
          u = Y(this.config.selectors.inputs[a]),
          d = B("button", F(u, {
        type: "button",
        role: "menuitemradio",
        class: "".concat(this.config.classNames.control, " ").concat(u.class ? u.class : "").trim(),
        "aria-checked": c,
        value: n
      })),
          h = B("span");
      h.innerHTML = s, N.element(o) && h.appendChild(o), d.appendChild(h), Object.defineProperty(d, "checked", {
        enumerable: !0,
        get: function get() {
          return "true" === d.getAttribute("aria-checked");
        },
        set: function set(e) {
          e && Array.from(d.parentNode.children).filter(function (e) {
            return $(e, '[role="menuitemradio"]');
          }).forEach(function (e) {
            return e.setAttribute("aria-checked", "false");
          }), d.setAttribute("aria-checked", e ? "true" : "false");
        }
      }), this.listeners.bind(d, "click keyup", function (e) {
        if (!N.keyboardEvent(e) || 32 === e.which) {
          switch (e.preventDefault(), e.stopPropagation(), d.checked = !0, a) {
            case "language":
              t.currentTrack = Number(n);
              break;

            case "quality":
              t.quality = n;
              break;

            case "speed":
              t.speed = parseFloat(n);
          }

          Ae.showMenuPanel.call(t, "home", N.keyboardEvent(e));
        }
      }, a, !1), Ae.bindMenuItemShortcuts.call(this, d, a), i.appendChild(d);
    },
    formatTime: function formatTime() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      return N.number(e) ? Ce(e, ke(this.duration) > 0, t) : e;
    },
    updateTimeDisplay: function updateTimeDisplay() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      N.element(e) && N.number(t) && (e.innerText = Ae.formatTime(t, n));
    },
    updateVolume: function updateVolume() {
      this.supported.ui && (N.element(this.elements.inputs.volume) && Ae.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), N.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
    },
    setRange: function setRange(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      N.element(e) && (e.value = t, Ae.updateRangeFill.call(this, e));
    },
    updateProgress: function updateProgress(e) {
      var t = this;

      if (this.supported.ui && N.event(e)) {
        var n,
            i,
            a = 0;
        if (e) switch (e.type) {
          case "timeupdate":
          case "seeking":
          case "seeked":
            n = this.currentTime, i = this.duration, a = 0 === n || 0 === i || Number.isNaN(n) || Number.isNaN(i) ? 0 : (n / i * 100).toFixed(2), "timeupdate" === e.type && Ae.setRange.call(this, this.elements.inputs.seek, a);
            break;

          case "playing":
          case "progress":
            !function (e, n) {
              var i = N.number(n) ? n : 0,
                  a = N.element(e) ? e : t.elements.display.buffer;

              if (N.element(a)) {
                a.value = i;
                var s = a.getElementsByTagName("span")[0];
                N.element(s) && (s.childNodes[0].nodeValue = i);
              }
            }(this.elements.display.buffer, 100 * this.buffered);
        }
      }
    },
    updateRangeFill: function updateRangeFill(e) {
      var t = N.event(e) ? e.target : e;

      if (N.element(t) && "range" === t.getAttribute("type")) {
        if ($(t, this.config.selectors.inputs.seek)) {
          t.setAttribute("aria-valuenow", this.currentTime);
          var n = Ae.formatTime(this.currentTime),
              i = Ae.formatTime(this.duration),
              a = ge("seekLabel", this.config);
          t.setAttribute("aria-valuetext", a.replace("{currentTime}", n).replace("{duration}", i));
        } else if ($(t, this.config.selectors.inputs.volume)) {
          var s = 100 * t.value;
          t.setAttribute("aria-valuenow", s), t.setAttribute("aria-valuetext", "".concat(s.toFixed(1), "%"));
        } else t.setAttribute("aria-valuenow", t.value);

        L.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%"));
      }
    },
    updateSeekTooltip: function updateSeekTooltip(e) {
      var t = this;

      if (this.config.tooltips.seek && N.element(this.elements.inputs.seek) && N.element(this.elements.display.seekTooltip) && 0 !== this.duration) {
        var n = "".concat(this.config.classNames.tooltip, "--visible"),
            i = function i(e) {
          return X(t.elements.display.seekTooltip, n, e);
        };

        if (this.touch) i(!1);else {
          var a = 0,
              s = this.elements.progress.getBoundingClientRect();
          if (N.event(e)) a = 100 / s.width * (e.pageX - s.left);else {
            if (!J(this.elements.display.seekTooltip, n)) return;
            a = parseFloat(this.elements.display.seekTooltip.style.left, 10);
          }
          a < 0 ? a = 0 : a > 100 && (a = 100), Ae.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * a), this.elements.display.seekTooltip.style.left = "".concat(a, "%"), N.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type);
        }
      }
    },
    timeUpdate: function timeUpdate(e) {
      var t = !N.element(this.elements.display.duration) && this.config.invertTime;
      Ae.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || Ae.updateProgress.call(this, e);
    },
    durationUpdate: function durationUpdate() {
      if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
        if (this.duration >= Math.pow(2, 32)) return Q(this.elements.display.currentTime, !0), void Q(this.elements.progress, !0);
        N.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
        var e = N.element(this.elements.display.duration);
        !e && this.config.displayDuration && this.paused && Ae.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && Ae.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), Ae.updateSeekTooltip.call(this);
      }
    },
    toggleMenuButton: function toggleMenuButton(e, t) {
      Q(this.elements.settings.buttons[e], !t);
    },
    updateSetting: function updateSetting(e, t, n) {
      var i = this.elements.settings.panels[e],
          a = null,
          s = t;
      if ("captions" === e) a = this.currentTrack;else {
        if (a = N.empty(n) ? this[e] : n, N.empty(a) && (a = this.config[e].default), !N.empty(this.options[e]) && !this.options[e].includes(a)) return void this.debug.warn("Unsupported value of '".concat(a, "' for ").concat(e));
        if (!this.config[e].options.includes(a)) return void this.debug.warn("Disabled value of '".concat(a, "' for ").concat(e));
      }

      if (N.element(s) || (s = i && i.querySelector('[role="menu"]')), N.element(s)) {
        this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = Ae.getLabel.call(this, e, a);
        var r = s && s.querySelector('[value="'.concat(a, '"]'));
        N.element(r) && (r.checked = !0);
      }
    },
    getLabel: function getLabel(e, t) {
      switch (e) {
        case "speed":
          return 1 === t ? ge("normal", this.config) : "".concat(t, "&times;");

        case "quality":
          if (N.number(t)) {
            var n = ge("qualityLabel.".concat(t), this.config);
            return n.length ? n : "".concat(t, "p");
          }

          return he(t);

        case "captions":
          return Pe.getLabel.call(this);

        default:
          return null;
      }
    },
    setQualityMenu: function setQualityMenu(e) {
      var t = this;

      if (N.element(this.elements.settings.panels.quality)) {
        var n = this.elements.settings.panels.quality.querySelector('[role="menu"]');
        N.array(e) && (this.options.quality = ce(e).filter(function (e) {
          return t.config.quality.options.includes(e);
        }));
        var i = !N.empty(this.options.quality) && this.options.quality.length > 1;

        if (Ae.toggleMenuButton.call(this, "quality", i), z(n), Ae.checkMenu.call(this), i) {
          var a = function a(e) {
            var n = ge("qualityBadge.".concat(e), t.config);
            return n.length ? Ae.createBadge.call(t, n) : null;
          };

          this.options.quality.sort(function (e, n) {
            var i = t.config.quality.options;
            return i.indexOf(e) > i.indexOf(n) ? 1 : -1;
          }).forEach(function (e) {
            Ae.createMenuItem.call(t, {
              value: e,
              list: n,
              type: "quality",
              title: Ae.getLabel.call(t, "quality", e),
              badge: a(e)
            });
          }), Ae.updateSetting.call(this, "quality", n);
        }
      }
    },
    setCaptionsMenu: function setCaptionsMenu() {
      var e = this;

      if (N.element(this.elements.settings.panels.captions)) {
        var t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
            n = Pe.getTracks.call(this),
            i = Boolean(n.length);

        if (Ae.toggleMenuButton.call(this, "captions", i), z(t), Ae.checkMenu.call(this), i) {
          var a = n.map(function (n, i) {
            return {
              value: i,
              checked: e.captions.toggled && e.currentTrack === i,
              title: Pe.getLabel.call(e, n),
              badge: n.language && Ae.createBadge.call(e, n.language.toUpperCase()),
              list: t,
              type: "language"
            };
          });
          a.unshift({
            value: -1,
            checked: !this.captions.toggled,
            title: ge("disabled", this.config),
            list: t,
            type: "language"
          }), a.forEach(Ae.createMenuItem.bind(this)), Ae.updateSetting.call(this, "captions", t);
        }
      }
    },
    setSpeedMenu: function setSpeedMenu(e) {
      var t = this;

      if (N.element(this.elements.settings.panels.speed)) {
        var n = this.elements.settings.panels.speed.querySelector('[role="menu"]');
        N.array(e) ? this.options.speed = e : (this.isHTML5 || this.isVimeo) && (this.options.speed = [.5, .75, 1, 1.25, 1.5, 1.75, 2]), this.options.speed = this.options.speed.filter(function (e) {
          return t.config.speed.options.includes(e);
        });
        var i = !N.empty(this.options.speed) && this.options.speed.length > 1;
        Ae.toggleMenuButton.call(this, "speed", i), z(n), Ae.checkMenu.call(this), i && (this.options.speed.forEach(function (e) {
          Ae.createMenuItem.call(t, {
            value: e,
            list: n,
            type: "speed",
            title: Ae.getLabel.call(t, "speed", e)
          });
        }), Ae.updateSetting.call(this, "speed", n));
      }
    },
    checkMenu: function checkMenu() {
      var e = this.elements.settings.buttons,
          t = !N.empty(e) && Object.values(e).some(function (e) {
        return !e.hidden;
      });
      Q(this.elements.settings.menu, !t);
    },
    focusFirstMenuItem: function focusFirstMenuItem(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];

      if (!this.elements.settings.popup.hidden) {
        var n = e;
        N.element(n) || (n = Object.values(this.elements.settings.panels).find(function (e) {
          return !e.hidden;
        }));
        var i = n.querySelector('[role^="menuitem"]');
        ee.call(this, i, t);
      }
    },
    toggleMenu: function toggleMenu(e) {
      var t = this.elements.settings.popup,
          n = this.elements.buttons.settings;

      if (N.element(t) && N.element(n)) {
        var i = t.hidden,
            a = i;
        if (N.boolean(e)) a = e;else if (N.keyboardEvent(e) && 27 === e.which) a = !1;else if (N.event(e)) {
          var s = N.function(e.composedPath) ? e.composedPath()[0] : e.target,
              r = t.contains(s);
          if (r || !r && e.target !== n && a) return;
        }
        n.setAttribute("aria-expanded", a), Q(t, !a), X(this.elements.container, this.config.classNames.menu.open, a), a && N.keyboardEvent(e) ? Ae.focusFirstMenuItem.call(this, null, !0) : a || i || ee.call(this, n, N.keyboardEvent(e));
      }
    },
    getMenuSize: function getMenuSize(e) {
      var t = e.cloneNode(!0);
      t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
      var n = t.scrollWidth,
          i = t.scrollHeight;
      return W(t), {
        width: n,
        height: i
      };
    },
    showMenuPanel: function showMenuPanel() {
      var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          i = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(t));

      if (N.element(i)) {
        var a = i.parentNode,
            s = Array.from(a.children).find(function (e) {
          return !e.hidden;
        });

        if (ie.transitions && !ie.reducedMotion) {
          a.style.width = "".concat(s.scrollWidth, "px"), a.style.height = "".concat(s.scrollHeight, "px");
          var r = Ae.getMenuSize.call(this, i);
          O.call(this, a, M, function t(n) {
            n.target === a && ["width", "height"].includes(n.propertyName) && (a.style.width = "", a.style.height = "", j.call(e, a, M, t));
          }), a.style.width = "".concat(r.width, "px"), a.style.height = "".concat(r.height, "px");
        }

        Q(s, !0), Q(i, !1), Ae.focusFirstMenuItem.call(this, i, n);
      }
    },
    setDownloadUrl: function setDownloadUrl() {
      var e = this.elements.buttons.download;
      N.element(e) && e.setAttribute("href", this.download);
    },
    create: function create(e) {
      var t = this,
          n = Ae.bindMenuItemShortcuts,
          i = Ae.createButton,
          a = Ae.createProgress,
          s = Ae.createRange,
          r = Ae.createTime,
          o = Ae.setQualityMenu,
          l = Ae.setSpeedMenu,
          c = Ae.showMenuPanel;
      this.elements.controls = null, this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
      var u = B("div", Y(this.config.selectors.controls.wrapper));
      this.elements.controls = u;
      var d = {
        class: "plyr__controls__item"
      };
      return ce(this.config.controls).forEach(function (o) {
        if ("restart" === o && u.appendChild(i.call(t, "restart", d)), "rewind" === o && u.appendChild(i.call(t, "rewind", d)), "play" === o && u.appendChild(i.call(t, "play", d)), "fast-forward" === o && u.appendChild(i.call(t, "fast-forward", d)), "progress" === o) {
          var l = B("div", {
            class: "".concat(d.class, " plyr__progress__container")
          }),
              h = B("div", Y(t.config.selectors.progress));

          if (h.appendChild(s.call(t, "seek", {
            id: "plyr-seek-".concat(e.id)
          })), h.appendChild(a.call(t, "buffer")), t.config.tooltips.seek) {
            var m = B("span", {
              class: t.config.classNames.tooltip
            }, "00:00");
            h.appendChild(m), t.elements.display.seekTooltip = m;
          }

          t.elements.progress = h, l.appendChild(t.elements.progress), u.appendChild(l);
        }

        if ("current-time" === o && u.appendChild(r.call(t, "currentTime", d)), "duration" === o && u.appendChild(r.call(t, "duration", d)), "mute" === o || "volume" === o) {
          var p = t.elements.volume;

          if (N.element(p) && u.contains(p) || (p = B("div", F({}, d, {
            class: "".concat(d.class, " plyr__volume").trim()
          })), t.elements.volume = p, u.appendChild(p)), "mute" === o && p.appendChild(i.call(t, "mute")), "volume" === o) {
            var f = {
              max: 1,
              step: .05,
              value: t.config.volume
            };
            p.appendChild(s.call(t, "volume", F(f, {
              id: "plyr-volume-".concat(e.id)
            })));
          }
        }

        if ("captions" === o && u.appendChild(i.call(t, "captions", d)), "settings" === o && !N.empty(t.config.settings)) {
          var g = B("div", F({}, d, {
            class: "".concat(d.class, " plyr__menu").trim(),
            hidden: ""
          }));
          g.appendChild(i.call(t, "settings", {
            "aria-haspopup": !0,
            "aria-controls": "plyr-settings-".concat(e.id),
            "aria-expanded": !1
          }));
          var y = B("div", {
            class: "plyr__menu__container",
            id: "plyr-settings-".concat(e.id),
            hidden: ""
          }),
              v = B("div"),
              b = B("div", {
            id: "plyr-settings-".concat(e.id, "-home")
          }),
              k = B("div", {
            role: "menu"
          });
          b.appendChild(k), v.appendChild(b), t.elements.settings.panels.home = b, t.config.settings.forEach(function (i) {
            var a = B("button", F(Y(t.config.selectors.buttons.settings), {
              type: "button",
              class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--forward"),
              role: "menuitem",
              "aria-haspopup": !0,
              hidden: ""
            }));
            n.call(t, a, i), O(a, "click", function () {
              c.call(t, i, !1);
            });
            var s = B("span", null, ge(i, t.config)),
                r = B("span", {
              class: t.config.classNames.menu.value
            });
            r.innerHTML = e[i], s.appendChild(r), a.appendChild(s), k.appendChild(a);
            var o = B("div", {
              id: "plyr-settings-".concat(e.id, "-").concat(i),
              hidden: ""
            }),
                l = B("button", {
              type: "button",
              class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--back")
            });
            l.appendChild(B("span", {
              "aria-hidden": !0
            }, ge(i, t.config))), l.appendChild(B("span", {
              class: t.config.classNames.hidden
            }, ge("menuBack", t.config))), O(o, "keydown", function (e) {
              37 === e.which && (e.preventDefault(), e.stopPropagation(), c.call(t, "home", !0));
            }, !1), O(l, "click", function () {
              c.call(t, "home", !1);
            }), o.appendChild(l), o.appendChild(B("div", {
              role: "menu"
            })), v.appendChild(o), t.elements.settings.buttons[i] = a, t.elements.settings.panels[i] = o;
          }), y.appendChild(v), g.appendChild(y), u.appendChild(g), t.elements.settings.popup = y, t.elements.settings.menu = g;
        }

        if ("pip" === o && ie.pip && u.appendChild(i.call(t, "pip", d)), "airplay" === o && ie.airplay && u.appendChild(i.call(t, "airplay", d)), "download" === o) {
          var w = F({}, d, {
            element: "a",
            href: t.download,
            target: "_blank"
          }),
              T = t.config.urls.download;
          !N.url(T) && t.isEmbed && F(w, {
            icon: "logo-".concat(t.provider),
            label: t.provider
          }), u.appendChild(i.call(t, "download", w));
        }

        "fullscreen" === o && u.appendChild(i.call(t, "fullscreen", d));
      }), this.isHTML5 && o.call(this, le.getQualityOptions.call(this)), l.call(this), u;
    },
    inject: function inject() {
      var e = this;

      if (this.config.loadSprite) {
        var t = Ae.getIconUrl.call(this);
        t.cors && be(t.url, "sprite-plyr");
      }

      this.id = Math.floor(1e4 * Math.random());
      var n = null;
      this.elements.controls = null;
      var i = {
        id: this.id,
        seektime: this.config.seekTime,
        title: this.config.title
      },
          s = !0;
      N.function(this.config.controls) && (this.config.controls = this.config.controls.call(this, i)), this.config.controls || (this.config.controls = []), N.element(this.config.controls) || N.string(this.config.controls) ? n = this.config.controls : (n = Ae.create.call(this, {
        id: this.id,
        seektime: this.config.seekTime,
        speed: this.speed,
        quality: this.quality,
        captions: Pe.getLabel.call(this)
      }), s = !1);

      var r,
          o = function o(e) {
        var t = e;
        return Object.entries(i).forEach(function (e) {
          var n = a(e, 2),
              i = n[0],
              s = n[1];
          t = de(t, "{".concat(i, "}"), s);
        }), t;
      };

      if (s && (N.string(this.config.controls) ? n = o(n) : N.element(n) && (n.innerHTML = o(n.innerHTML))), N.string(this.config.selectors.controls.container) && (r = document.querySelector(this.config.selectors.controls.container)), N.element(r) || (r = this.elements.container), r[N.element(n) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", n), N.element(this.elements.controls) || Ae.findElements.call(this), !N.empty(this.elements.buttons)) {
        var l = function l(t) {
          var n = e.config.classNames.controlPressed;
          Object.defineProperty(t, "pressed", {
            enumerable: !0,
            get: function get() {
              return J(t, n);
            },
            set: function set() {
              var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              X(t, n, e);
            }
          });
        };

        Object.values(this.elements.buttons).filter(Boolean).forEach(function (e) {
          N.array(e) || N.nodeList(e) ? Array.from(e).filter(Boolean).forEach(l) : l(e);
        });
      }

      if (L.isEdge && x(r), this.config.tooltips.controls) {
        var c = this.config,
            u = c.classNames,
            d = c.selectors,
            h = "".concat(d.controls.wrapper, " ").concat(d.labels, " .").concat(u.hidden),
            m = G.call(this, h);
        Array.from(m).forEach(function (t) {
          X(t, e.config.classNames.hidden, !1), X(t, e.config.classNames.tooltip, !0);
        });
      }
    }
  };

  function Ee(e) {
    var t = e;

    if (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) {
      var n = document.createElement("a");
      n.href = t, t = n.href;
    }

    try {
      return new URL(t);
    } catch (e) {
      return null;
    }
  }

  function Se(e) {
    var t = new URLSearchParams();
    return N.object(e) && Object.entries(e).forEach(function (e) {
      var n = a(e, 2),
          i = n[0],
          s = n[1];
      t.set(i, s);
    }), t;
  }

  var Pe = {
    setup: function setup() {
      if (this.supported.ui) if (!this.isVideo || this.isYouTube || this.isHTML5 && !ie.textTracks) N.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Ae.setCaptionsMenu.call(this);else {
        if (N.element(this.elements.captions) || (this.elements.captions = B("div", Y(this.config.selectors.captions)), function (e, t) {
          N.element(e) && N.element(t) && t.parentNode.insertBefore(e, t.nextSibling);
        }(this.elements.captions, this.elements.wrapper)), L.isIE && window.URL) {
          var e = this.media.querySelectorAll("track");
          Array.from(e).forEach(function (e) {
            var t = e.getAttribute("src"),
                n = Ee(t);
            null !== n && n.hostname !== window.location.href.hostname && ["http:", "https:"].includes(n.protocol) && ve(t, "blob").then(function (t) {
              e.setAttribute("src", window.URL.createObjectURL(t));
            }).catch(function () {
              W(e);
            });
          });
        }

        var t = ce((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(function (e) {
          return e.split("-")[0];
        })),
            n = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
        if ("auto" === n) n = a(t, 1)[0];
        var i = this.storage.get("captions");

        if (N.boolean(i) || (i = this.config.captions.active), Object.assign(this.captions, {
          toggled: !1,
          active: i,
          language: n,
          languages: t
        }), this.isHTML5) {
          var s = this.config.captions.update ? "addtrack removetrack" : "removetrack";
          O.call(this, this.media.textTracks, s, Pe.update.bind(this));
        }

        setTimeout(Pe.update.bind(this), 0);
      }
    },
    update: function update() {
      var e = this,
          t = Pe.getTracks.call(this, !0),
          n = this.captions,
          i = n.active,
          a = n.language,
          s = n.meta,
          r = n.currentTrackNode,
          o = Boolean(t.find(function (e) {
        return e.language === a;
      }));
      this.isHTML5 && this.isVideo && t.filter(function (e) {
        return !s.get(e);
      }).forEach(function (t) {
        e.debug.log("Track added", t), s.set(t, {
          default: "showing" === t.mode
        }), t.mode = "hidden", O.call(e, t, "cuechange", function () {
          return Pe.updateCues.call(e);
        });
      }), (o && this.language !== a || !t.includes(r)) && (Pe.setLanguage.call(this, a), Pe.toggle.call(this, i && o)), X(this.elements.container, this.config.classNames.captions.enabled, !N.empty(t)), (this.config.controls || []).includes("settings") && this.config.settings.includes("captions") && Ae.setCaptionsMenu.call(this);
    },
    toggle: function toggle(e) {
      var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];

      if (this.supported.ui) {
        var n = this.captions.toggled,
            i = this.config.classNames.captions.active,
            a = N.nullOrUndefined(e) ? !n : e;

        if (a !== n) {
          if (t || (this.captions.active = a, this.storage.set({
            captions: a
          })), !this.language && a && !t) {
            var r = Pe.getTracks.call(this),
                o = Pe.findTrack.call(this, [this.captions.language].concat(s(this.captions.languages)), !0);
            return this.captions.language = o.language, void Pe.set.call(this, r.indexOf(o));
          }

          this.elements.buttons.captions && (this.elements.buttons.captions.pressed = a), X(this.elements.container, i, a), this.captions.toggled = a, Ae.updateSetting.call(this, "captions"), H.call(this, this.media, a ? "captionsenabled" : "captionsdisabled");
        }
      }
    },
    set: function set(e) {
      var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
          n = Pe.getTracks.call(this);
      if (-1 !== e) {
        if (N.number(e)) {
          if (e in n) {
            if (this.captions.currentTrack !== e) {
              this.captions.currentTrack = e;
              var i = n[e],
                  a = (i || {}).language;
              this.captions.currentTrackNode = i, Ae.updateSetting.call(this, "captions"), t || (this.captions.language = a, this.storage.set({
                language: a
              })), this.isVimeo && this.embed.enableTextTrack(a), H.call(this, this.media, "languagechange");
            }

            Pe.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && Pe.updateCues.call(this);
          } else this.debug.warn("Track not found", e);
        } else this.debug.warn("Invalid caption argument", e);
      } else Pe.toggle.call(this, !1, t);
    },
    setLanguage: function setLanguage(e) {
      var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];

      if (N.string(e)) {
        var n = e.toLowerCase();
        this.captions.language = n;
        var i = Pe.getTracks.call(this),
            a = Pe.findTrack.call(this, [n]);
        Pe.set.call(this, i.indexOf(a), t);
      } else this.debug.warn("Invalid language argument", e);
    },
    getTracks: function getTracks() {
      var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      return Array.from((this.media || {}).textTracks || []).filter(function (n) {
        return !e.isHTML5 || t || e.captions.meta.has(n);
      }).filter(function (e) {
        return ["captions", "subtitles"].includes(e.kind);
      });
    },
    findTrack: function findTrack(e) {
      var t,
          n = this,
          i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          a = Pe.getTracks.call(this),
          s = function s(e) {
        return Number((n.captions.meta.get(e) || {}).default);
      },
          r = Array.from(a).sort(function (e, t) {
        return s(t) - s(e);
      });

      return e.every(function (e) {
        return !(t = r.find(function (t) {
          return t.language === e;
        }));
      }), t || (i ? r[0] : void 0);
    },
    getCurrentTrack: function getCurrentTrack() {
      return Pe.getTracks.call(this)[this.currentTrack];
    },
    getLabel: function getLabel(e) {
      var t = e;
      return !N.track(t) && ie.textTracks && this.captions.toggled && (t = Pe.getCurrentTrack.call(this)), N.track(t) ? N.empty(t.label) ? N.empty(t.language) ? ge("enabled", this.config) : e.language.toUpperCase() : t.label : ge("disabled", this.config);
    },
    updateCues: function updateCues(e) {
      if (this.supported.ui) if (N.element(this.elements.captions)) {
        if (N.nullOrUndefined(e) || Array.isArray(e)) {
          var t = e;

          if (!t) {
            var n = Pe.getCurrentTrack.call(this);
            t = Array.from((n || {}).activeCues || []).map(function (e) {
              return e.getCueAsHTML();
            }).map(pe);
          }

          var i = t.map(function (e) {
            return e.trim();
          }).join("\n");

          if (i !== this.elements.captions.innerHTML) {
            z(this.elements.captions);
            var a = B("span", Y(this.config.selectors.caption));
            a.innerHTML = i, this.elements.captions.appendChild(a), H.call(this, this.media, "cuechange");
          }
        } else this.debug.warn("updateCues: Invalid input", e);
      } else this.debug.warn("No captions element to render to");
    }
  },
      Ne = {
    enabled: !0,
    title: "",
    debug: !1,
    autoplay: !1,
    autopause: !0,
    playsinline: !0,
    seekTime: 10,
    volume: 1,
    muted: !1,
    duration: null,
    displayDuration: !0,
    invertTime: !0,
    toggleInvert: !0,
    ratio: null,
    clickToPlay: !0,
    hideControls: !0,
    resetOnEnd: !1,
    disableContextMenu: !0,
    loadSprite: !0,
    iconPrefix: "plyr",
    iconUrl: "https://cdn.plyr.io/3.5.6/plyr.svg",
    blankVideo: "https://cdn.plyr.io/static/blank.mp4",
    quality: {
      default: 576,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
    },
    loop: {
      active: !1
    },
    speed: {
      selected: 1,
      options: [.5, .75, 1, 1.25, 1.5, 1.75, 2]
    },
    keyboard: {
      focused: !0,
      global: !1
    },
    tooltips: {
      controls: !1,
      seek: !0
    },
    captions: {
      active: !1,
      language: "auto",
      update: !1
    },
    fullscreen: {
      enabled: !0,
      fallback: !0,
      iosNative: !1
    },
    storage: {
      enabled: !0,
      key: "plyr"
    },
    controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
    settings: ["captions", "quality", "speed"],
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime}s",
      play: "Play",
      pause: "Pause",
      fastForward: "Forward {seektime}s",
      seek: "Seek",
      seekLabel: "{currentTime} of {duration}",
      played: "Played",
      buffered: "Buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      mute: "Mute",
      unmute: "Unmute",
      enableCaptions: "Enable captions",
      disableCaptions: "Disable captions",
      download: "Download",
      enterFullscreen: "Enter fullscreen",
      exitFullscreen: "Exit fullscreen",
      frameTitle: "Player for {title}",
      captions: "Captions",
      settings: "Settings",
      menuBack: "Go back to previous menu",
      speed: "Speed",
      normal: "Normal",
      quality: "Quality",
      loop: "Loop",
      start: "Start",
      end: "End",
      all: "All",
      reset: "Reset",
      disabled: "Disabled",
      enabled: "Enabled",
      advertisement: "Ad",
      qualityBadge: {
        2160: "4K",
        1440: "HD",
        1080: "HD",
        720: "HD",
        576: "SD",
        480: "SD"
      }
    },
    urls: {
      download: null,
      vimeo: {
        sdk: "https://player.vimeo.com/api/player.js",
        iframe: "https://player.vimeo.com/video/{0}?{1}",
        api: "https://vimeo.com/api/v2/video/{0}.json"
      },
      youtube: {
        sdk: "https://www.youtube.com/iframe_api",
        api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
      },
      googleIMA: {
        sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
      }
    },
    listeners: {
      seek: null,
      play: null,
      pause: null,
      restart: null,
      rewind: null,
      fastForward: null,
      mute: null,
      volume: null,
      captions: null,
      download: null,
      fullscreen: null,
      pip: null,
      airplay: null,
      speed: null,
      quality: null,
      loop: null,
      language: null
    },
    events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
    selectors: {
      editable: "input, textarea, select, [contenteditable]",
      container: ".plyr",
      controls: {
        container: null,
        wrapper: ".plyr__controls"
      },
      labels: "[data-plyr]",
      buttons: {
        play: '[data-plyr="play"]',
        pause: '[data-plyr="pause"]',
        restart: '[data-plyr="restart"]',
        rewind: '[data-plyr="rewind"]',
        fastForward: '[data-plyr="fast-forward"]',
        mute: '[data-plyr="mute"]',
        captions: '[data-plyr="captions"]',
        download: '[data-plyr="download"]',
        fullscreen: '[data-plyr="fullscreen"]',
        pip: '[data-plyr="pip"]',
        airplay: '[data-plyr="airplay"]',
        settings: '[data-plyr="settings"]',
        loop: '[data-plyr="loop"]'
      },
      inputs: {
        seek: '[data-plyr="seek"]',
        volume: '[data-plyr="volume"]',
        speed: '[data-plyr="speed"]',
        language: '[data-plyr="language"]',
        quality: '[data-plyr="quality"]'
      },
      display: {
        currentTime: ".plyr__time--current",
        duration: ".plyr__time--duration",
        buffer: ".plyr__progress__buffer",
        loop: ".plyr__progress__loop",
        volume: ".plyr__volume--display"
      },
      progress: ".plyr__progress",
      captions: ".plyr__captions",
      caption: ".plyr__caption"
    },
    classNames: {
      type: "plyr--{0}",
      provider: "plyr--{0}",
      video: "plyr__video-wrapper",
      embed: "plyr__video-embed",
      videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
      embedContainer: "plyr__video-embed__container",
      poster: "plyr__poster",
      posterEnabled: "plyr__poster-enabled",
      ads: "plyr__ads",
      control: "plyr__control",
      controlPressed: "plyr__control--pressed",
      playing: "plyr--playing",
      paused: "plyr--paused",
      stopped: "plyr--stopped",
      loading: "plyr--loading",
      hover: "plyr--hover",
      tooltip: "plyr__tooltip",
      cues: "plyr__cues",
      hidden: "plyr__sr-only",
      hideControls: "plyr--hide-controls",
      isIos: "plyr--is-ios",
      isTouch: "plyr--is-touch",
      uiSupported: "plyr--full-ui",
      noTransition: "plyr--no-transition",
      display: {
        time: "plyr__time"
      },
      menu: {
        value: "plyr__menu__value",
        badge: "plyr__badge",
        open: "plyr--menu-open"
      },
      captions: {
        enabled: "plyr--captions-enabled",
        active: "plyr--captions-active"
      },
      fullscreen: {
        enabled: "plyr--fullscreen-enabled",
        fallback: "plyr--fullscreen-fallback"
      },
      pip: {
        supported: "plyr--pip-supported",
        active: "plyr--pip-active"
      },
      airplay: {
        supported: "plyr--airplay-supported",
        active: "plyr--airplay-active"
      },
      tabFocus: "plyr__tab-focus",
      previewThumbnails: {
        thumbContainer: "plyr__preview-thumb",
        thumbContainerShown: "plyr__preview-thumb--is-shown",
        imageContainer: "plyr__preview-thumb__image-container",
        timeContainer: "plyr__preview-thumb__time-container",
        scrubbingContainer: "plyr__preview-scrubbing",
        scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
      }
    },
    attributes: {
      embed: {
        provider: "data-plyr-provider",
        id: "data-plyr-embed-id"
      }
    },
    ads: {
      enabled: !1,
      publisherId: "",
      tagUrl: ""
    },
    previewThumbnails: {
      enabled: !1,
      src: ""
    },
    vimeo: {
      byline: !1,
      portrait: !1,
      title: !1,
      speed: !0,
      transparent: !1
    },
    youtube: {
      noCookie: !1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1
    }
  },
      Me = "picture-in-picture",
      xe = "inline",
      Le = {
    html5: "html5",
    youtube: "youtube",
    vimeo: "vimeo"
  },
      Ie = {
    audio: "audio",
    video: "video"
  };

  var _e = function _e() {},
      Oe = function () {
    function t() {
      var n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      e(this, t), this.enabled = window.console && n, this.enabled && this.log("Debugging enabled");
    }

    return n(t, [{
      key: "log",
      get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.log, console) : _e;
      }
    }, {
      key: "warn",
      get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.warn, console) : _e;
      }
    }, {
      key: "error",
      get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.error, console) : _e;
      }
    }]), t;
  }();

  function je() {
    if (this.enabled) {
      var e = this.player.elements.buttons.fullscreen;
      N.element(e) && (e.pressed = this.active), H.call(this.player, this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0), L.isIos || function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];

        if (N.element(e)) {
          var n = G.call(this, "button:not(:disabled), input:not(:disabled), [tabindex]"),
              i = n[0],
              a = n[n.length - 1];

          _.call(this, this.elements.container, "keydown", function (e) {
            if ("Tab" === e.key && 9 === e.keyCode) {
              var t = document.activeElement;
              t !== a || e.shiftKey ? t === i && e.shiftKey && (a.focus(), e.preventDefault()) : (i.focus(), e.preventDefault());
            }
          }, t, !1);
        }
      }.call(this.player, this.target, this.active);
    }
  }

  function qe() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

    if (e ? this.scrollPosition = {
      x: window.scrollX || 0,
      y: window.scrollY || 0
    } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", X(this.target, this.player.config.classNames.fullscreen.fallback, e), L.isIos) {
      var t = document.head.querySelector('meta[name="viewport"]'),
          n = "viewport-fit=cover";
      t || (t = document.createElement("meta")).setAttribute("name", "viewport");
      var i = N.string(t.content) && t.content.includes(n);
      e ? (this.cleanupViewport = !i, i || (t.content += ",".concat(n))) : this.cleanupViewport && (t.content = t.content.split(",").filter(function (e) {
        return e.trim() !== n;
      }).join(","));
    }

    je.call(this);
  }

  var He = function () {
    function t(n) {
      var i = this;
      e(this, t), this.player = n, this.prefix = t.prefix, this.property = t.property, this.scrollPosition = {
        x: 0,
        y: 0
      }, this.forceFallback = "force" === n.config.fullscreen.fallback, O.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), function () {
        je.call(i);
      }), O.call(this.player, this.player.elements.container, "dblclick", function (e) {
        N.element(i.player.elements.controls) && i.player.elements.controls.contains(e.target) || i.toggle();
      }), this.update();
    }

    return n(t, [{
      key: "update",
      value: function value() {
        var e;
        this.enabled ? (e = this.forceFallback ? "Fallback (forced)" : t.native ? "Native" : "Fallback", this.player.debug.log("".concat(e, " fullscreen enabled"))) : this.player.debug.log("Fullscreen not supported and fallback disabled");
        X(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
      }
    }, {
      key: "enter",
      value: function value() {
        this.enabled && (L.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : !t.native || this.forceFallback ? qe.call(this, !0) : this.prefix ? N.empty(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen());
      }
    }, {
      key: "exit",
      value: function value() {
        if (this.enabled) if (L.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), this.player.play();else if (!t.native || this.forceFallback) qe.call(this, !1);else if (this.prefix) {
          if (!N.empty(this.prefix)) {
            var e = "moz" === this.prefix ? "Cancel" : "Exit";
            document["".concat(this.prefix).concat(e).concat(this.property)]();
          }
        } else (document.cancelFullScreen || document.exitFullscreen).call(document);
      }
    }, {
      key: "toggle",
      value: function value() {
        this.active ? this.exit() : this.enter();
      }
    }, {
      key: "usingNative",
      get: function get() {
        return t.native && !this.forceFallback;
      }
    }, {
      key: "enabled",
      get: function get() {
        return (t.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
      }
    }, {
      key: "active",
      get: function get() {
        return !!this.enabled && (!t.native || this.forceFallback ? J(this.target, this.player.config.classNames.fullscreen.fallback) : (this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement) === this.target);
      }
    }, {
      key: "target",
      get: function get() {
        return L.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container;
      }
    }], [{
      key: "native",
      get: function get() {
        return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
      }
    }, {
      key: "prefix",
      get: function get() {
        if (N.function(document.exitFullscreen)) return "";
        var e = "";
        return ["webkit", "moz", "ms"].some(function (t) {
          return !(!N.function(document["".concat(t, "ExitFullscreen")]) && !N.function(document["".concat(t, "CancelFullScreen")])) && (e = t, !0);
        }), e;
      }
    }, {
      key: "property",
      get: function get() {
        return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
      }
    }]), t;
  }();

  function De(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    return new Promise(function (n, i) {
      var a = new Image(),
          s = function s() {
        delete a.onload, delete a.onerror, (a.naturalWidth >= t ? n : i)(a);
      };

      Object.assign(a, {
        onload: s,
        onerror: s,
        src: e
      });
    });
  }

  var Fe = {
    addStyleHook: function addStyleHook() {
      X(this.elements.container, this.config.selectors.container.replace(".", ""), !0), X(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
    },
    toggleNativeControls: function toggleNativeControls() {
      arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
    },
    build: function build() {
      var e = this;
      if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void Fe.toggleNativeControls.call(this, !0);
      N.element(this.elements.controls) || (Ae.inject.call(this), this.listeners.controls()), Fe.toggleNativeControls.call(this), this.isHTML5 && Pe.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, Ae.updateVolume.call(this), Ae.timeUpdate.call(this), Fe.checkPlaying.call(this), X(this.elements.container, this.config.classNames.pip.supported, ie.pip && this.isHTML5 && this.isVideo), X(this.elements.container, this.config.classNames.airplay.supported, ie.airplay && this.isHTML5), X(this.elements.container, this.config.classNames.isIos, L.isIos), X(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(function () {
        H.call(e, e.media, "ready");
      }, 0), Fe.setTitle.call(this), this.poster && Fe.setPoster.call(this, this.poster, !1).catch(function () {}), this.config.duration && Ae.durationUpdate.call(this);
    },
    setTitle: function setTitle() {
      var e = ge("play", this.config);

      if (N.string(this.config.title) && !N.empty(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(function (t) {
        t.setAttribute("aria-label", e);
      }), this.isEmbed) {
        var t = Z.call(this, "iframe");
        if (!N.element(t)) return;
        var n = N.empty(this.config.title) ? "video" : this.config.title,
            i = ge("frameTitle", this.config);
        t.setAttribute("title", i.replace("{title}", n));
      }
    },
    togglePoster: function togglePoster(e) {
      X(this.elements.container, this.config.classNames.posterEnabled, e);
    },
    setPoster: function setPoster(e) {
      var t = this;
      return arguments.length > 1 && void 0 !== arguments[1] && !arguments[1] || !this.poster ? (this.media.setAttribute("poster", e), function () {
        var e = this;
        return new Promise(function (t) {
          return e.ready ? setTimeout(t, 0) : O.call(e, e.elements.container, "ready", t);
        }).then(function () {});
      }.call(this).then(function () {
        return De(e);
      }).catch(function (n) {
        throw e === t.poster && Fe.togglePoster.call(t, !1), n;
      }).then(function () {
        if (e !== t.poster) throw new Error("setPoster cancelled by later call to setPoster");
      }).then(function () {
        return Object.assign(t.elements.poster.style, {
          backgroundImage: "url('".concat(e, "')"),
          backgroundSize: ""
        }), Fe.togglePoster.call(t, !0), e;
      })) : Promise.reject(new Error("Poster already set"));
    },
    checkPlaying: function checkPlaying(e) {
      var t = this;
      X(this.elements.container, this.config.classNames.playing, this.playing), X(this.elements.container, this.config.classNames.paused, this.paused), X(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function (e) {
        Object.assign(e, {
          pressed: t.playing
        });
      }), N.event(e) && "timeupdate" === e.type || Fe.toggleControls.call(this);
    },
    checkLoading: function checkLoading(e) {
      var t = this;
      this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function () {
        X(t.elements.container, t.config.classNames.loading, t.loading), Fe.toggleControls.call(t);
      }, this.loading ? 250 : 0);
    },
    toggleControls: function toggleControls(e) {
      var t = this.elements.controls;

      if (t && this.config.hideControls) {
        var n = this.touch && this.lastSeekTime + 2e3 > Date.now();
        this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || n));
      }
    }
  },
      Re = function () {
    function t(n) {
      e(this, t), this.player = n, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
    }

    return n(t, [{
      key: "handleKey",
      value: function value(e) {
        var t = this.player,
            n = t.elements,
            i = e.keyCode ? e.keyCode : e.which,
            a = "keydown" === e.type,
            s = a && i === this.lastKey;

        if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && N.number(i)) {
          if (a) {
            var r = document.activeElement;

            if (N.element(r)) {
              var o = t.config.selectors.editable;
              if (r !== n.inputs.seek && $(r, o)) return;
              if (32 === e.which && $(r, 'button, [role^="menuitem"]')) return;
            }

            switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(i) && (e.preventDefault(), e.stopPropagation()), i) {
              case 48:
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
                s || (t.currentTime = t.duration / 10 * (i - 48));
                break;

              case 32:
              case 75:
                s || t.togglePlay();
                break;

              case 38:
                t.increaseVolume(.1);
                break;

              case 40:
                t.decreaseVolume(.1);
                break;

              case 77:
                s || (t.muted = !t.muted);
                break;

              case 39:
                t.forward();
                break;

              case 37:
                t.rewind();
                break;

              case 70:
                t.fullscreen.toggle();
                break;

              case 67:
                s || t.toggleCaptions();
                break;

              case 76:
                t.loop = !t.loop;
            }

            27 === i && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = i;
          } else this.lastKey = null;
        }
      }
    }, {
      key: "toggleMenu",
      value: function value(e) {
        Ae.toggleMenu.call(this.player, e);
      }
    }, {
      key: "firstTouch",
      value: function value() {
        var e = this.player,
            t = e.elements;
        e.touch = !0, X(t.container, e.config.classNames.isTouch, !0);
      }
    }, {
      key: "setTabFocus",
      value: function value(e) {
        var t = this.player,
            n = t.elements;

        if (clearTimeout(this.focusTimer), "keydown" !== e.type || 9 === e.which) {
          "keydown" === e.type && (this.lastKeyDown = e.timeStamp);
          var i,
              a = e.timeStamp - this.lastKeyDown <= 20;
          if ("focus" !== e.type || a) i = t.config.classNames.tabFocus, X(G.call(t, ".".concat(i)), i, !1), this.focusTimer = setTimeout(function () {
            var e = document.activeElement;
            n.container.contains(e) && X(document.activeElement, t.config.classNames.tabFocus, !0);
          }, 10);
        }
      }
    }, {
      key: "global",
      value: function value() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
            t = this.player;
        t.config.keyboard.global && _.call(t, window, "keydown keyup", this.handleKey, e, !1), _.call(t, document.body, "click", this.toggleMenu, e), q.call(t, document.body, "touchstart", this.firstTouch), _.call(t, document.body, "keydown focus blur", this.setTabFocus, e, !1, !0);
      }
    }, {
      key: "container",
      value: function value() {
        var e = this.player,
            t = e.config,
            n = e.elements,
            i = e.timers;
        !t.keyboard.global && t.keyboard.focused && O.call(e, n.container, "keydown keyup", this.handleKey, !1), O.call(e, n.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function (t) {
          var a = n.controls;
          a && "enterfullscreen" === t.type && (a.pressed = !1, a.hover = !1);
          var s = 0;
          ["touchstart", "touchmove", "mousemove"].includes(t.type) && (Fe.toggleControls.call(e, !0), s = e.touch ? 3e3 : 2e3), clearTimeout(i.controls), i.controls = setTimeout(function () {
            return Fe.toggleControls.call(e, !1);
          }, s);
        });

        var s = function s(t) {
          if (!t) return oe.call(e);
          var i = n.container.getBoundingClientRect(),
              a = i.width,
              s = i.height;
          return oe.call(e, "".concat(a, ":").concat(s));
        },
            r = function r() {
          clearTimeout(i.resized), i.resized = setTimeout(s, 50);
        };

        O.call(e, n.container, "enterfullscreen exitfullscreen", function (t) {
          var i = e.fullscreen,
              o = i.target,
              l = i.usingNative;

          if (o === n.container && (e.isEmbed || !N.empty(e.config.ratio))) {
            var c = "enterfullscreen" === t.type,
                u = s(c);
            u.padding;
            !function (t, n, i) {
              if (e.isVimeo) {
                var s = e.elements.wrapper.firstChild,
                    r = a(t, 2)[1],
                    o = a(re.call(e), 2),
                    l = o[0],
                    c = o[1];
                s.style.maxWidth = i ? "".concat(r / c * l, "px") : null, s.style.margin = i ? "0 auto" : null;
              }
            }(u.ratio, 0, c), l || (c ? O.call(e, window, "resize", r) : j.call(e, window, "resize", r));
          }
        });
      }
    }, {
      key: "media",
      value: function value() {
        var e = this,
            t = this.player,
            n = t.elements;

        if (O.call(t, t.media, "timeupdate seeking seeked", function (e) {
          return Ae.timeUpdate.call(t, e);
        }), O.call(t, t.media, "durationchange loadeddata loadedmetadata", function (e) {
          return Ae.durationUpdate.call(t, e);
        }), O.call(t, t.media, "canplay loadeddata", function () {
          Q(n.volume, !t.hasAudio), Q(n.buttons.mute, !t.hasAudio);
        }), O.call(t, t.media, "ended", function () {
          t.isHTML5 && t.isVideo && t.config.resetOnEnd && t.restart();
        }), O.call(t, t.media, "progress playing seeking seeked", function (e) {
          return Ae.updateProgress.call(t, e);
        }), O.call(t, t.media, "volumechange", function (e) {
          return Ae.updateVolume.call(t, e);
        }), O.call(t, t.media, "playing play pause ended emptied timeupdate", function (e) {
          return Fe.checkPlaying.call(t, e);
        }), O.call(t, t.media, "waiting canplay seeked playing", function (e) {
          return Fe.checkLoading.call(t, e);
        }), t.supported.ui && t.config.clickToPlay && !t.isAudio) {
          var i = Z.call(t, ".".concat(t.config.classNames.video));
          if (!N.element(i)) return;
          O.call(t, n.container, "click", function (a) {
            ([n.container, i].includes(a.target) || i.contains(a.target)) && (t.touch && t.config.hideControls || (t.ended ? (e.proxy(a, t.restart, "restart"), e.proxy(a, t.play, "play")) : e.proxy(a, t.togglePlay, "play")));
          });
        }

        t.supported.ui && t.config.disableContextMenu && O.call(t, n.wrapper, "contextmenu", function (e) {
          e.preventDefault();
        }, !1), O.call(t, t.media, "volumechange", function () {
          t.storage.set({
            volume: t.volume,
            muted: t.muted
          });
        }), O.call(t, t.media, "ratechange", function () {
          Ae.updateSetting.call(t, "speed"), t.storage.set({
            speed: t.speed
          });
        }), O.call(t, t.media, "qualitychange", function (e) {
          Ae.updateSetting.call(t, "quality", null, e.detail.quality);
        }), O.call(t, t.media, "ready qualitychange", function () {
          Ae.setDownloadUrl.call(t);
        });
        var a = t.config.events.concat(["keyup", "keydown"]).join(" ");
        O.call(t, t.media, a, function (e) {
          var i = e.detail,
              a = void 0 === i ? {} : i;
          "error" === e.type && (a = t.media.error), H.call(t, n.container, e.type, !0, a);
        });
      }
    }, {
      key: "proxy",
      value: function value(e, t, n) {
        var i = this.player,
            a = i.config.listeners[n],
            s = !0;
        N.function(a) && (s = a.call(i, e)), s && N.function(t) && t.call(i, e);
      }
    }, {
      key: "bind",
      value: function value(e, t, n, i) {
        var a = this,
            s = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
            r = this.player,
            o = r.config.listeners[i],
            l = N.function(o);
        O.call(r, e, t, function (e) {
          return a.proxy(e, n, i);
        }, s && !l);
      }
    }, {
      key: "controls",
      value: function value() {
        var e = this,
            t = this.player,
            n = t.elements,
            i = L.isIE ? "change" : "input";

        if (n.buttons.play && Array.from(n.buttons.play).forEach(function (n) {
          e.bind(n, "click", t.togglePlay, "play");
        }), this.bind(n.buttons.restart, "click", t.restart, "restart"), this.bind(n.buttons.rewind, "click", t.rewind, "rewind"), this.bind(n.buttons.fastForward, "click", t.forward, "fastForward"), this.bind(n.buttons.mute, "click", function () {
          t.muted = !t.muted;
        }, "mute"), this.bind(n.buttons.captions, "click", function () {
          return t.toggleCaptions();
        }), this.bind(n.buttons.download, "click", function () {
          H.call(t, t.media, "download");
        }, "download"), this.bind(n.buttons.fullscreen, "click", function () {
          t.fullscreen.toggle();
        }, "fullscreen"), this.bind(n.buttons.pip, "click", function () {
          t.pip = "toggle";
        }, "pip"), this.bind(n.buttons.airplay, "click", t.airplay, "airplay"), this.bind(n.buttons.settings, "click", function (e) {
          e.stopPropagation(), Ae.toggleMenu.call(t, e);
        }), this.bind(n.buttons.settings, "keyup", function (e) {
          var n = e.which;
          [13, 32].includes(n) && (13 !== n ? (e.preventDefault(), e.stopPropagation(), Ae.toggleMenu.call(t, e)) : Ae.focusFirstMenuItem.call(t, null, !0));
        }, null, !1), this.bind(n.settings.menu, "keydown", function (e) {
          27 === e.which && Ae.toggleMenu.call(t, e);
        }), this.bind(n.inputs.seek, "mousedown mousemove", function (e) {
          var t = n.progress.getBoundingClientRect(),
              i = 100 / t.width * (e.pageX - t.left);
          e.currentTarget.setAttribute("seek-value", i);
        }), this.bind(n.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function (e) {
          var n = e.currentTarget,
              i = e.keyCode ? e.keyCode : e.which;

          if (!N.keyboardEvent(e) || 39 === i || 37 === i) {
            t.lastSeekTime = Date.now();
            var a = n.hasAttribute("play-on-seeked"),
                s = ["mouseup", "touchend", "keyup"].includes(e.type);
            a && s ? (n.removeAttribute("play-on-seeked"), t.play()) : !s && t.playing && (n.setAttribute("play-on-seeked", ""), t.pause());
          }
        }), L.isIos) {
          var s = G.call(t, 'input[type="range"]');
          Array.from(s).forEach(function (t) {
            return e.bind(t, i, function (e) {
              return x(e.target);
            });
          });
        }

        this.bind(n.inputs.seek, i, function (e) {
          var n = e.currentTarget,
              i = n.getAttribute("seek-value");
          N.empty(i) && (i = n.value), n.removeAttribute("seek-value"), t.currentTime = i / n.max * t.duration;
        }, "seek"), this.bind(n.progress, "mouseenter mouseleave mousemove", function (e) {
          return Ae.updateSeekTooltip.call(t, e);
        }), this.bind(n.progress, "mousemove touchmove", function (e) {
          var n = t.previewThumbnails;
          n && n.loaded && n.startMove(e);
        }), this.bind(n.progress, "mouseleave click", function () {
          var e = t.previewThumbnails;
          e && e.loaded && e.endMove(!1, !0);
        }), this.bind(n.progress, "mousedown touchstart", function (e) {
          var n = t.previewThumbnails;
          n && n.loaded && n.startScrubbing(e);
        }), this.bind(n.progress, "mouseup touchend", function (e) {
          var n = t.previewThumbnails;
          n && n.loaded && n.endScrubbing(e);
        }), L.isWebkit && Array.from(G.call(t, 'input[type="range"]')).forEach(function (n) {
          e.bind(n, "input", function (e) {
            return Ae.updateRangeFill.call(t, e.target);
          });
        }), t.config.toggleInvert && !N.element(n.display.duration) && this.bind(n.display.currentTime, "click", function () {
          0 !== t.currentTime && (t.config.invertTime = !t.config.invertTime, Ae.timeUpdate.call(t));
        }), this.bind(n.inputs.volume, i, function (e) {
          t.volume = e.target.value;
        }, "volume"), this.bind(n.controls, "mouseenter mouseleave", function (e) {
          n.controls.hover = !t.touch && "mouseenter" === e.type;
        }), this.bind(n.controls, "mousedown mouseup touchstart touchend touchcancel", function (e) {
          n.controls.pressed = ["mousedown", "touchstart"].includes(e.type);
        }), this.bind(n.controls, "focusin", function () {
          var i = t.config,
              a = t.timers;
          X(n.controls, i.classNames.noTransition, !0), Fe.toggleControls.call(t, !0), setTimeout(function () {
            X(n.controls, i.classNames.noTransition, !1);
          }, 0);
          var s = e.touch ? 3e3 : 4e3;
          clearTimeout(a.controls), a.controls = setTimeout(function () {
            return Fe.toggleControls.call(t, !1);
          }, s);
        }), this.bind(n.inputs.volume, "wheel", function (e) {
          var n = e.webkitDirectionInvertedFromDevice,
              i = a([e.deltaX, -e.deltaY].map(function (e) {
            return n ? -e : e;
          }), 2),
              s = i[0],
              r = i[1],
              o = Math.sign(Math.abs(s) > Math.abs(r) ? s : r);
          t.increaseVolume(o / 50);
          var l = t.media.volume;
          (1 === o && l < 1 || -1 === o && l > 0) && e.preventDefault();
        }, "volume", !1);
      }
    }]), t;
  }();

  "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

  var Ve = function (e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
  }(function (e, t) {
    e.exports = function () {
      var e = function e() {},
          t = {},
          n = {},
          i = {};

      function a(e, t) {
        if (e) {
          var a = i[e];
          if (n[e] = t, a) for (; a.length;) {
            a[0](e, t), a.splice(0, 1);
          }
        }
      }

      function s(t, n) {
        t.call && (t = {
          success: t
        }), n.length ? (t.error || e)(n) : (t.success || e)(t);
      }

      function r(t, n, i, a) {
        var s,
            o,
            l = document,
            c = i.async,
            u = (i.numRetries || 0) + 1,
            d = i.before || e,
            h = t.replace(/^(css|img)!/, "");
        a = a || 0, /(^css!|\.css$)/.test(t) ? ((o = l.createElement("link")).rel = "stylesheet", o.href = h, (s = "hideFocus" in o) && o.relList && (s = 0, o.rel = "preload", o.as = "style")) : /(^img!|\.(png|gif|jpg|svg)$)/.test(t) ? (o = l.createElement("img")).src = h : ((o = l.createElement("script")).src = t, o.async = void 0 === c || c), o.onload = o.onerror = o.onbeforeload = function (e) {
          var l = e.type[0];
          if (s) try {
            o.sheet.cssText.length || (l = "e");
          } catch (e) {
            18 != e.code && (l = "e");
          }

          if ("e" == l) {
            if ((a += 1) < u) return r(t, n, i, a);
          } else if ("preload" == o.rel && "style" == o.as) return o.rel = "stylesheet";

          n(t, l, e.defaultPrevented);
        }, !1 !== d(t, o) && l.head.appendChild(o);
      }

      function o(e, n, i) {
        var o, l;

        if (n && n.trim && (o = n), l = (o ? i : n) || {}, o) {
          if (o in t) throw "LoadJS";
          t[o] = !0;
        }

        function c(t, n) {
          !function (e, t, n) {
            var i,
                a,
                s = (e = e.push ? e : [e]).length,
                o = s,
                l = [];

            for (i = function i(e, n, _i2) {
              if ("e" == n && l.push(e), "b" == n) {
                if (!_i2) return;
                l.push(e);
              }

              --s || t(l);
            }, a = 0; a < o; a++) {
              r(e[a], i, n);
            }
          }(e, function (e) {
            s(l, e), t && s({
              success: t,
              error: n
            }, e), a(o, e);
          }, l);
        }

        if (l.returnPromise) return new Promise(c);
        c();
      }

      return o.ready = function (e, t) {
        return function (e, t) {
          e = e.push ? e : [e];
          var a,
              s,
              r,
              o = [],
              l = e.length,
              c = l;

          for (a = function a(e, n) {
            n.length && o.push(e), --c || t(o);
          }; l--;) {
            s = e[l], (r = n[s]) ? a(s, r) : (i[s] = i[s] || []).push(a);
          }
        }(e, function (e) {
          s(t, e);
        }), o;
      }, o.done = function (e) {
        a(e, []);
      }, o.reset = function () {
        t = {}, n = {}, i = {};
      }, o.isDefined = function (e) {
        return e in t;
      }, o;
    }();
  });

  function Be(e) {
    return new Promise(function (t, n) {
      Ve(e, {
        success: t,
        error: n
      });
    });
  }

  function Ue(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, H.call(this, this.media, e ? "play" : "pause"));
  }

  var We = {
    setup: function setup() {
      var e = this;
      X(this.elements.wrapper, this.config.classNames.embed, !0), oe.call(this), N.object(window.Vimeo) ? We.ready.call(this) : Be(this.config.urls.vimeo.sdk).then(function () {
        We.ready.call(e);
      }).catch(function (t) {
        e.debug.warn("Vimeo SDK (player.js) failed to load", t);
      });
    },
    ready: function ready() {
      var e = this,
          t = this,
          n = t.config.vimeo,
          i = Se(F({}, {
        loop: t.config.loop.active,
        autoplay: t.autoplay,
        muted: t.muted,
        gesture: "media",
        playsinline: !this.config.fullscreen.iosNative
      }, n)),
          s = t.media.getAttribute("src");
      N.empty(s) && (s = t.media.getAttribute(t.config.attributes.embed.id));
      var r,
          o = (r = s, N.empty(r) ? null : N.number(Number(r)) ? r : r.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : r),
          l = B("iframe"),
          c = ue(t.config.urls.vimeo.iframe, o, i);
      l.setAttribute("src", c), l.setAttribute("allowfullscreen", ""), l.setAttribute("allowtransparency", ""), l.setAttribute("allow", "autoplay");
      var u = B("div", {
        poster: t.poster,
        class: t.config.classNames.embedContainer
      });
      u.appendChild(l), t.media = K(u, t.media), ve(ue(t.config.urls.vimeo.api, o), "json").then(function (e) {
        if (!N.empty(e)) {
          var n = new URL(e[0].thumbnail_large);
          n.pathname = "".concat(n.pathname.split("_")[0], ".jpg"), Fe.setPoster.call(t, n.href).catch(function () {});
        }
      }), t.embed = new window.Vimeo.Player(l, {
        autopause: t.config.autopause,
        muted: t.muted
      }), t.media.paused = !0, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function () {
        return Ue.call(t, !0), t.embed.play();
      }, t.media.pause = function () {
        return Ue.call(t, !1), t.embed.pause();
      }, t.media.stop = function () {
        t.pause(), t.currentTime = 0;
      };
      var d = t.media.currentTime;
      Object.defineProperty(t.media, "currentTime", {
        get: function get() {
          return d;
        },
        set: function set(e) {
          var n = t.embed,
              i = t.media,
              a = t.paused,
              s = t.volume,
              r = a && !n.hasPlayed;
          i.seeking = !0, H.call(t, i, "seeking"), Promise.resolve(r && n.setVolume(0)).then(function () {
            return n.setCurrentTime(e);
          }).then(function () {
            return r && n.pause();
          }).then(function () {
            return r && n.setVolume(s);
          }).catch(function () {});
        }
      });
      var h = t.config.speed.selected;
      Object.defineProperty(t.media, "playbackRate", {
        get: function get() {
          return h;
        },
        set: function set(e) {
          t.embed.setPlaybackRate(e).then(function () {
            h = e, H.call(t, t.media, "ratechange");
          }).catch(function (e) {
            "Error" === e.name && Ae.setSpeedMenu.call(t, []);
          });
        }
      });
      var m = t.config.volume;
      Object.defineProperty(t.media, "volume", {
        get: function get() {
          return m;
        },
        set: function set(e) {
          t.embed.setVolume(e).then(function () {
            m = e, H.call(t, t.media, "volumechange");
          });
        }
      });
      var p = t.config.muted;
      Object.defineProperty(t.media, "muted", {
        get: function get() {
          return p;
        },
        set: function set(e) {
          var n = !!N.boolean(e) && e;
          t.embed.setVolume(n ? 0 : t.config.volume).then(function () {
            p = n, H.call(t, t.media, "volumechange");
          });
        }
      });
      var f,
          g = t.config.loop;
      Object.defineProperty(t.media, "loop", {
        get: function get() {
          return g;
        },
        set: function set(e) {
          var n = N.boolean(e) ? e : t.config.loop.active;
          t.embed.setLoop(n).then(function () {
            g = n;
          });
        }
      }), t.embed.getVideoUrl().then(function (e) {
        f = e, Ae.setDownloadUrl.call(t);
      }).catch(function (t) {
        e.debug.warn(t);
      }), Object.defineProperty(t.media, "currentSrc", {
        get: function get() {
          return f;
        }
      }), Object.defineProperty(t.media, "ended", {
        get: function get() {
          return t.currentTime === t.duration;
        }
      }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then(function (n) {
        var i = a(n, 2),
            s = i[0],
            r = i[1];
        t.embed.ratio = [s, r], oe.call(e);
      }), t.embed.setAutopause(t.config.autopause).then(function (e) {
        t.config.autopause = e;
      }), t.embed.getVideoTitle().then(function (n) {
        t.config.title = n, Fe.setTitle.call(e);
      }), t.embed.getCurrentTime().then(function (e) {
        d = e, H.call(t, t.media, "timeupdate");
      }), t.embed.getDuration().then(function (e) {
        t.media.duration = e, H.call(t, t.media, "durationchange");
      }), t.embed.getTextTracks().then(function (e) {
        t.media.textTracks = e, Pe.setup.call(t);
      }), t.embed.on("cuechange", function (e) {
        var n = e.cues,
            i = (void 0 === n ? [] : n).map(function (e) {
          return function (e) {
            var t = document.createDocumentFragment(),
                n = document.createElement("div");
            return t.appendChild(n), n.innerHTML = e, t.firstChild.innerText;
          }(e.text);
        });
        Pe.updateCues.call(t, i);
      }), t.embed.on("loaded", function () {
        (t.embed.getPaused().then(function (e) {
          Ue.call(t, !e), e || H.call(t, t.media, "playing");
        }), N.element(t.embed.element) && t.supported.ui) && t.embed.element.setAttribute("tabindex", -1);
      }), t.embed.on("play", function () {
        Ue.call(t, !0), H.call(t, t.media, "playing");
      }), t.embed.on("pause", function () {
        Ue.call(t, !1);
      }), t.embed.on("timeupdate", function (e) {
        t.media.seeking = !1, d = e.seconds, H.call(t, t.media, "timeupdate");
      }), t.embed.on("progress", function (e) {
        t.media.buffered = e.percent, H.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && H.call(t, t.media, "canplaythrough"), t.embed.getDuration().then(function (e) {
          e !== t.media.duration && (t.media.duration = e, H.call(t, t.media, "durationchange"));
        });
      }), t.embed.on("seeked", function () {
        t.media.seeking = !1, H.call(t, t.media, "seeked");
      }), t.embed.on("ended", function () {
        t.media.paused = !0, H.call(t, t.media, "ended");
      }), t.embed.on("error", function (e) {
        t.media.error = e, H.call(t, t.media, "error");
      }), setTimeout(function () {
        return Fe.build.call(t);
      }, 0);
    }
  };

  function ze(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, H.call(this, this.media, e ? "play" : "pause"));
  }

  function Ke(e) {
    return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
  }

  var Ye = {
    setup: function setup() {
      var e = this;
      if (X(this.elements.wrapper, this.config.classNames.embed, !0), N.object(window.YT) && N.function(window.YT.Player)) Ye.ready.call(this);else {
        var t = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
          N.function(t) && t(), Ye.ready.call(e);
        }, Be(this.config.urls.youtube.sdk).catch(function (t) {
          e.debug.warn("YouTube API failed to load", t);
        });
      }
    },
    getTitle: function getTitle(e) {
      var t = this;
      ve(ue(this.config.urls.youtube.api, e)).then(function (e) {
        if (N.object(e)) {
          var n = e.title,
              i = e.height,
              a = e.width;
          t.config.title = n, Fe.setTitle.call(t), t.embed.ratio = [a, i];
        }

        oe.call(t);
      }).catch(function () {
        oe.call(t);
      });
    },
    ready: function ready() {
      var e = this,
          t = e.media && e.media.getAttribute("id");

      if (N.empty(t) || !t.startsWith("youtube-")) {
        var n = e.media.getAttribute("src");
        N.empty(n) && (n = e.media.getAttribute(this.config.attributes.embed.id));
        var i,
            a,
            s = (i = n, N.empty(i) ? null : i.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : i),
            r = (a = e.provider, "".concat(a, "-").concat(Math.floor(1e4 * Math.random()))),
            o = B("div", {
          id: r,
          poster: e.poster
        });
        e.media = K(o, e.media);

        var l = function l(e) {
          return "https://i.ytimg.com/vi/".concat(s, "/").concat(e, "default.jpg");
        };

        De(l("maxres"), 121).catch(function () {
          return De(l("sd"), 121);
        }).catch(function () {
          return De(l("hq"));
        }).then(function (t) {
          return Fe.setPoster.call(e, t.src);
        }).then(function (t) {
          t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
        }).catch(function () {});
        var c = e.config.youtube;
        e.embed = new window.YT.Player(r, {
          videoId: s,
          host: Ke(c),
          playerVars: F({}, {
            autoplay: e.config.autoplay ? 1 : 0,
            hl: e.config.hl,
            controls: e.supported.ui ? 0 : 1,
            disablekb: 1,
            playsinline: e.config.fullscreen.iosNative ? 0 : 1,
            cc_load_policy: e.captions.active ? 1 : 0,
            cc_lang_pref: e.config.captions.language,
            widget_referrer: window ? window.location.href : null
          }, c),
          events: {
            onError: function onError(t) {
              if (!e.media.error) {
                var n = t.data,
                    i = {
                  2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                  5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                  100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                  101: "The owner of the requested video does not allow it to be played in embedded players.",
                  150: "The owner of the requested video does not allow it to be played in embedded players."
                }[n] || "An unknown error occured";
                e.media.error = {
                  code: n,
                  message: i
                }, H.call(e, e.media, "error");
              }
            },
            onPlaybackRateChange: function onPlaybackRateChange(t) {
              var n = t.target;
              e.media.playbackRate = n.getPlaybackRate(), H.call(e, e.media, "ratechange");
            },
            onReady: function onReady(t) {
              if (!N.function(e.media.play)) {
                var n = t.target;
                Ye.getTitle.call(e, s), e.media.play = function () {
                  ze.call(e, !0), n.playVideo();
                }, e.media.pause = function () {
                  ze.call(e, !1), n.pauseVideo();
                }, e.media.stop = function () {
                  n.stopVideo();
                }, e.media.duration = n.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                  get: function get() {
                    return Number(n.getCurrentTime());
                  },
                  set: function set(t) {
                    e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, H.call(e, e.media, "seeking"), n.seekTo(t);
                  }
                }), Object.defineProperty(e.media, "playbackRate", {
                  get: function get() {
                    return n.getPlaybackRate();
                  },
                  set: function set(e) {
                    n.setPlaybackRate(e);
                  }
                });
                var i = e.config.volume;
                Object.defineProperty(e.media, "volume", {
                  get: function get() {
                    return i;
                  },
                  set: function set(t) {
                    i = t, n.setVolume(100 * i), H.call(e, e.media, "volumechange");
                  }
                });
                var a = e.config.muted;
                Object.defineProperty(e.media, "muted", {
                  get: function get() {
                    return a;
                  },
                  set: function set(t) {
                    var i = N.boolean(t) ? t : a;
                    a = i, n[i ? "mute" : "unMute"](), H.call(e, e.media, "volumechange");
                  }
                }), Object.defineProperty(e.media, "currentSrc", {
                  get: function get() {
                    return n.getVideoUrl();
                  }
                }), Object.defineProperty(e.media, "ended", {
                  get: function get() {
                    return e.currentTime === e.duration;
                  }
                }), e.options.speed = n.getAvailablePlaybackRates(), e.supported.ui && e.media.setAttribute("tabindex", -1), H.call(e, e.media, "timeupdate"), H.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function () {
                  e.media.buffered = n.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && H.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), H.call(e, e.media, "canplaythrough"));
                }, 200), setTimeout(function () {
                  return Fe.build.call(e);
                }, 50);
              }
            },
            onStateChange: function onStateChange(t) {
              var n = t.target;

              switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(t.data) && (e.media.seeking = !1, H.call(e, e.media, "seeked")), t.data) {
                case -1:
                  H.call(e, e.media, "timeupdate"), e.media.buffered = n.getVideoLoadedFraction(), H.call(e, e.media, "progress");
                  break;

                case 0:
                  ze.call(e, !1), e.media.loop ? (n.stopVideo(), n.playVideo()) : H.call(e, e.media, "ended");
                  break;

                case 1:
                  e.config.autoplay || !e.media.paused || e.embed.hasPlayed ? (ze.call(e, !0), H.call(e, e.media, "playing"), e.timers.playing = setInterval(function () {
                    H.call(e, e.media, "timeupdate");
                  }, 50), e.media.duration !== n.getDuration() && (e.media.duration = n.getDuration(), H.call(e, e.media, "durationchange"))) : e.media.pause();
                  break;

                case 2:
                  e.muted || e.embed.unMute(), ze.call(e, !1);
              }

              H.call(e, e.elements.container, "statechange", !1, {
                code: t.data
              });
            }
          }
        });
      }
    }
  },
      Qe = {
    setup: function setup() {
      this.media ? (X(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), X(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && X(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = B("div", {
        class: this.config.classNames.video
      }), R(this.media, this.elements.wrapper), this.elements.poster = B("div", {
        class: this.config.classNames.poster
      }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? le.extend.call(this) : this.isYouTube ? Ye.setup.call(this) : this.isVimeo && We.setup.call(this)) : this.debug.warn("No media element found!");
    }
  },
      Xe = function () {
    function t(n) {
      var i = this;
      e(this, t), this.player = n, this.config = n.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
        container: null,
        displayContainer: null
      }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function (e, t) {
        i.on("loaded", e), i.on("error", t);
      }), this.load();
    }

    return n(t, [{
      key: "load",
      value: function value() {
        var e = this;
        this.enabled && (N.object(window.google) && N.object(window.google.ima) ? this.ready() : Be(this.player.config.urls.googleIMA.sdk).then(function () {
          e.ready();
        }).catch(function () {
          e.trigger("error", new Error("Google IMA SDK failed to load"));
        }));
      }
    }, {
      key: "ready",
      value: function value() {
        var e,
            t = this;
        this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function () {
          t.clearSafetyTimer("onAdsManagerLoaded()");
        }), this.listeners(), this.setupIMA();
      }
    }, {
      key: "setupIMA",
      value: function value() {
        this.elements.container = B("div", {
          class: this.player.config.classNames.ads
        }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.requestAds();
      }
    }, {
      key: "requestAds",
      value: function value() {
        var e = this,
            t = this.player.elements.container;

        try {
          this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (t) {
            return e.onAdsManagerLoaded(t);
          }, !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (t) {
            return e.onAdError(t);
          }, !1);
          var n = new google.ima.AdsRequest();
          n.adTagUrl = this.tagUrl, n.linearAdSlotWidth = t.offsetWidth, n.linearAdSlotHeight = t.offsetHeight, n.nonLinearAdSlotWidth = t.offsetWidth, n.nonLinearAdSlotHeight = t.offsetHeight, n.forceNonLinearFullSlot = !1, n.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(n);
        } catch (e) {
          this.onAdError(e);
        }
      }
    }, {
      key: "pollCountdown",
      value: function value() {
        var e = this;
        if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
        this.countdownTimer = setInterval(function () {
          var t = Ce(Math.max(e.manager.getRemainingTime(), 0)),
              n = "".concat(ge("advertisement", e.player.config), " - ").concat(t);
          e.elements.container.setAttribute("data-badge-text", n);
        }, 100);
      }
    }, {
      key: "onAdsManagerLoaded",
      value: function value(e) {
        var t = this;

        if (this.enabled) {
          var n = new google.ima.AdsRenderingSettings();
          n.restoreCustomPlaybackStateOnAdBreakComplete = !0, n.enablePreloading = !0, this.manager = e.getAdsManager(this.player, n), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
            return t.onAdError(e);
          }), Object.keys(google.ima.AdEvent.Type).forEach(function (e) {
            t.manager.addEventListener(google.ima.AdEvent.Type[e], function (e) {
              return t.onAdEvent(e);
            });
          }), this.trigger("loaded");
        }
      }
    }, {
      key: "addCuePoints",
      value: function value() {
        var e = this;
        N.empty(this.cuePoints) || this.cuePoints.forEach(function (t) {
          if (0 !== t && -1 !== t && t < e.player.duration) {
            var n = e.player.elements.progress;

            if (N.element(n)) {
              var i = 100 / e.player.duration * t,
                  a = B("span", {
                class: e.player.config.classNames.cues
              });
              a.style.left = "".concat(i.toString(), "%"), n.appendChild(a);
            }
          }
        });
      }
    }, {
      key: "onAdEvent",
      value: function value(e) {
        var t = this,
            n = this.player.elements.container,
            i = e.getAd(),
            a = e.getAdData();

        switch (function (e) {
          H.call(t.player, t.player.media, "ads".concat(e.replace(/_/g, "").toLowerCase()));
        }(e.type), e.type) {
          case google.ima.AdEvent.Type.LOADED:
            this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = n.offsetWidth, i.height = n.offsetHeight);
            break;

          case google.ima.AdEvent.Type.STARTED:
            this.manager.setVolume(this.player.volume);
            break;

          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            this.loadAds();
            break;

          case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            this.pauseContent();
            break;

          case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            this.pollCountdown(), this.resumeContent();
            break;

          case google.ima.AdEvent.Type.LOG:
            a.adError && this.player.debug.warn("Non-fatal ad error: ".concat(a.adError.getMessage()));
        }
      }
    }, {
      key: "onAdError",
      value: function value(e) {
        this.cancel(), this.player.debug.warn("Ads error", e);
      }
    }, {
      key: "listeners",
      value: function value() {
        var e,
            t = this,
            n = this.player.elements.container;
        this.player.on("canplay", function () {
          t.addCuePoints();
        }), this.player.on("ended", function () {
          t.loader.contentComplete();
        }), this.player.on("timeupdate", function () {
          e = t.player.currentTime;
        }), this.player.on("seeked", function () {
          var n = t.player.currentTime;
          N.empty(t.cuePoints) || t.cuePoints.forEach(function (i, a) {
            e < i && i < n && (t.manager.discardAdBreak(), t.cuePoints.splice(a, 1));
          });
        }), window.addEventListener("resize", function () {
          t.manager && t.manager.resize(n.offsetWidth, n.offsetHeight, google.ima.ViewMode.NORMAL);
        });
      }
    }, {
      key: "play",
      value: function value() {
        var e = this,
            t = this.player.elements.container;
        this.managerPromise || this.resumeContent(), this.managerPromise.then(function () {
          e.manager.setVolume(e.player.volume), e.elements.displayContainer.initialize();

          try {
            e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0;
          } catch (t) {
            e.onAdError(t);
          }
        }).catch(function () {});
      }
    }, {
      key: "resumeContent",
      value: function value() {
        this.elements.container.style.zIndex = "", this.playing = !1, this.player.media.play();
      }
    }, {
      key: "pauseContent",
      value: function value() {
        this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause();
      }
    }, {
      key: "cancel",
      value: function value() {
        this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
      }
    }, {
      key: "loadAds",
      value: function value() {
        var e = this;
        this.managerPromise.then(function () {
          e.manager && e.manager.destroy(), e.managerPromise = new Promise(function (t) {
            e.on("loaded", t), e.player.debug.log(e.manager);
          }), e.requestAds();
        }).catch(function () {});
      }
    }, {
      key: "trigger",
      value: function value(e) {
        for (var t = this, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) {
          i[a - 1] = arguments[a];
        }

        var s = this.events[e];
        N.array(s) && s.forEach(function (e) {
          N.function(e) && e.apply(t, i);
        });
      }
    }, {
      key: "on",
      value: function value(e, t) {
        return N.array(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this;
      }
    }, {
      key: "startSafetyTimer",
      value: function value(e, t) {
        var n = this;
        this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout(function () {
          n.cancel(), n.clearSafetyTimer("startSafetyTimer()");
        }, e);
      }
    }, {
      key: "clearSafetyTimer",
      value: function value(e) {
        N.nullOrUndefined(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null);
      }
    }, {
      key: "enabled",
      get: function get() {
        var e = this.config;
        return this.player.isHTML5 && this.player.isVideo && e.enabled && (!N.empty(e.publisherId) || N.url(e.tagUrl));
      }
    }, {
      key: "tagUrl",
      get: function get() {
        var e = this.config;
        if (N.url(e.tagUrl)) return e.tagUrl;
        var t = {
          AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
          AV_CHANNELID: "5a0458dc28a06145e4519d21",
          AV_URL: window.location.hostname,
          cb: Date.now(),
          AV_WIDTH: 640,
          AV_HEIGHT: 480,
          AV_CDIM2: this.publisherId
        };
        return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(Se(t));
      }
    }]), t;
  }(),
      Je = function () {
    function t(n) {
      e(this, t), this.player = n, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
        thumb: {},
        scrubbing: {}
      }, this.load();
    }

    return n(t, [{
      key: "load",
      value: function value() {
        var e = this;
        this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(function () {
          e.enabled && (e.render(), e.determineContainerAutoSizing(), e.loaded = !0);
        });
      }
    }, {
      key: "getThumbnails",
      value: function value() {
        var e = this;
        return new Promise(function (t) {
          var n = e.player.config.previewThumbnails.src;
          if (N.empty(n)) throw new Error("Missing previewThumbnails.src config attribute");
          var i = (N.string(n) ? [n] : n).map(function (t) {
            return e.getThumbnail(t);
          });
          Promise.all(i).then(function () {
            e.thumbnails.sort(function (e, t) {
              return e.height - t.height;
            }), e.player.debug.log("Preview thumbnails", e.thumbnails), t();
          });
        });
      }
    }, {
      key: "getThumbnail",
      value: function value(e) {
        var t = this;
        return new Promise(function (n) {
          ve(e).then(function (i) {
            var s,
                r,
                o = {
              frames: (s = i, r = [], s.split(/\r\n\r\n|\n\n|\r\r/).forEach(function (e) {
                var t = {};
                e.split(/\r\n|\n|\r/).forEach(function (e) {
                  if (N.number(t.startTime)) {
                    if (!N.empty(e.trim()) && N.empty(t.text)) {
                      var n = e.trim().split("#xywh="),
                          i = a(n, 1);

                      if (t.text = i[0], n[1]) {
                        var s = a(n[1].split(","), 4);
                        t.x = s[0], t.y = s[1], t.w = s[2], t.h = s[3];
                      }
                    }
                  } else {
                    var r = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
                    r && (t.startTime = 60 * Number(r[1] || 0) * 60 + 60 * Number(r[2]) + Number(r[3]) + Number("0.".concat(r[4])), t.endTime = 60 * Number(r[6] || 0) * 60 + 60 * Number(r[7]) + Number(r[8]) + Number("0.".concat(r[9])));
                  }
                }), t.text && r.push(t);
              }), r),
              height: null,
              urlPrefix: ""
            };
            o.frames[0].text.startsWith("/") || o.frames[0].text.startsWith("http://") || o.frames[0].text.startsWith("https://") || (o.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
            var l = new Image();
            l.onload = function () {
              o.height = l.naturalHeight, o.width = l.naturalWidth, t.thumbnails.push(o), n();
            }, l.src = o.urlPrefix + o.frames[0].text;
          });
        });
      }
    }, {
      key: "startMove",
      value: function value(e) {
        if (this.loaded && N.event(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
          if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);else {
            var t = this.player.elements.progress.getBoundingClientRect(),
                n = 100 / t.width * (e.pageX - t.left);
            this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Ce(this.seekTime);
          }
          this.showImageAtCurrentTime();
        }
      }
    }, {
      key: "endMove",
      value: function value() {
        this.toggleThumbContainer(!1, !0);
      }
    }, {
      key: "startScrubbing",
      value: function value(e) {
        !1 !== e.button && 0 !== e.button || (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()));
      }
    }, {
      key: "endScrubbing",
      value: function value() {
        var e = this;
        this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : q.call(this.player, this.player.media, "timeupdate", function () {
          e.mouseDown || e.toggleScrubbingContainer(!1);
        });
      }
    }, {
      key: "listeners",
      value: function value() {
        var e = this;
        this.player.on("play", function () {
          e.toggleThumbContainer(!1, !0);
        }), this.player.on("seeked", function () {
          e.toggleThumbContainer(!1);
        }), this.player.on("timeupdate", function () {
          e.lastTime = e.player.media.currentTime;
        });
      }
    }, {
      key: "render",
      value: function value() {
        this.elements.thumb.container = B("div", {
          class: this.player.config.classNames.previewThumbnails.thumbContainer
        }), this.elements.thumb.imageContainer = B("div", {
          class: this.player.config.classNames.previewThumbnails.imageContainer
        }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
        var e = B("div", {
          class: this.player.config.classNames.previewThumbnails.timeContainer
        });
        this.elements.thumb.time = B("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), N.element(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = B("div", {
          class: this.player.config.classNames.previewThumbnails.scrubbingContainer
        }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
      }
    }, {
      key: "showImageAtCurrentTime",
      value: function value() {
        var e = this;
        this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
        var t = this.thumbnails[0].frames.findIndex(function (t) {
          return e.seekTime >= t.startTime && e.seekTime <= t.endTime;
        }),
            n = t >= 0,
            i = 0;
        this.mouseDown || this.toggleThumbContainer(n), n && (this.thumbnails.forEach(function (n, a) {
          e.loadedImages.includes(n.frames[t].text) && (i = a);
        }), t !== this.showingThumb && (this.showingThumb = t, this.loadImage(i)));
      }
    }, {
      key: "loadImage",
      value: function value() {
        var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            n = this.showingThumb,
            i = this.thumbnails[t],
            a = i.urlPrefix,
            s = i.frames[n],
            r = i.frames[n].text,
            o = a + r;
        if (this.currentImageElement && this.currentImageElement.dataset.filename === r) this.showImage(this.currentImageElement, s, t, n, r, !1), this.currentImageElement.dataset.index = n, this.removeOldImages(this.currentImageElement);else {
          this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
          var l = new Image();
          l.src = o, l.dataset.index = n, l.dataset.filename = r, this.showingThumbFilename = r, this.player.debug.log("Loading image: ".concat(o)), l.onload = function () {
            return e.showImage(l, s, t, n, r, !0);
          }, this.loadingImage = l, this.removeOldImages(l);
        }
      }
    }, {
      key: "showImage",
      value: function value(e, t, n, i, a) {
        var s = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5];
        this.player.debug.log("Showing thumb: ".concat(a, ". num: ").concat(i, ". qual: ").concat(n, ". newimg: ").concat(s)), this.setImageSizeAndOffset(e, t), s && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(a) || this.loadedImages.push(a)), this.preloadNearby(i, !0).then(this.preloadNearby(i, !1)).then(this.getHigherQuality(n, e, t, a));
      }
    }, {
      key: "removeOldImages",
      value: function value(e) {
        var t = this;
        Array.from(this.currentImageContainer.children).forEach(function (n) {
          if ("img" === n.tagName.toLowerCase()) {
            var i = t.usingSprites ? 500 : 1e3;

            if (n.dataset.index !== e.dataset.index && !n.dataset.deleting) {
              n.dataset.deleting = !0;
              var a = t.currentImageContainer;
              setTimeout(function () {
                a.removeChild(n), t.player.debug.log("Removing thumb: ".concat(n.dataset.filename));
              }, i);
            }
          }
        });
      }
    }, {
      key: "preloadNearby",
      value: function value(e) {
        var t = this,
            n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return new Promise(function (i) {
          setTimeout(function () {
            var a = t.thumbnails[0].frames[e].text;

            if (t.showingThumbFilename === a) {
              var s;
              s = n ? t.thumbnails[0].frames.slice(e) : t.thumbnails[0].frames.slice(0, e).reverse();
              var r = !1;
              s.forEach(function (e) {
                var n = e.text;

                if (n !== a && !t.loadedImages.includes(n)) {
                  r = !0, t.player.debug.log("Preloading thumb filename: ".concat(n));
                  var s = t.thumbnails[0].urlPrefix + n,
                      o = new Image();
                  o.src = s, o.onload = function () {
                    t.player.debug.log("Preloaded thumb filename: ".concat(n)), t.loadedImages.includes(n) || t.loadedImages.push(n), i();
                  };
                }
              }), r || i();
            }
          }, 300);
        });
      }
    }, {
      key: "getHigherQuality",
      value: function value(e, t, n, i) {
        var a = this;

        if (e < this.thumbnails.length - 1) {
          var s = t.naturalHeight;
          this.usingSprites && (s = n.h), s < this.thumbContainerHeight && setTimeout(function () {
            a.showingThumbFilename === i && (a.player.debug.log("Showing higher quality thumb for: ".concat(i)), a.loadImage(e + 1));
          }, 300);
        }
      }
    }, {
      key: "toggleThumbContainer",
      value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = this.player.config.classNames.previewThumbnails.thumbContainerShown;
        this.elements.thumb.container.classList.toggle(n, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null);
      }
    }, {
      key: "toggleScrubbingContainer",
      value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
        this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null);
      }
    }, {
      key: "determineContainerAutoSizing",
      value: function value() {
        this.elements.thumb.imageContainer.clientHeight > 20 && (this.sizeSpecifiedInCSS = !0);
      }
    }, {
      key: "setThumbContainerSizeAndPos",
      value: function value() {
        if (!this.sizeSpecifiedInCSS) {
          var e = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
          this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(e, "px");
        }

        this.setThumbContainerPos();
      }
    }, {
      key: "setThumbContainerPos",
      value: function value() {
        var e = this.player.elements.progress.getBoundingClientRect(),
            t = this.player.elements.container.getBoundingClientRect(),
            n = this.elements.thumb.container,
            i = t.left - e.left + 10,
            a = t.right - e.left - n.clientWidth - 10,
            s = this.mousePosX - e.left - n.clientWidth / 2;
        s < i && (s = i), s > a && (s = a), n.style.left = "".concat(s, "px");
      }
    }, {
      key: "setScrubbingContainerSize",
      value: function value() {
        this.elements.scrubbing.container.style.width = "".concat(this.player.media.clientWidth, "px"), this.elements.scrubbing.container.style.height = "".concat(this.player.media.clientWidth / this.thumbAspectRatio, "px");
      }
    }, {
      key: "setImageSizeAndOffset",
      value: function value(e, t) {
        if (this.usingSprites) {
          var n = this.thumbContainerHeight / t.h;
          e.style.height = "".concat(Math.floor(e.naturalHeight * n), "px"), e.style.width = "".concat(Math.floor(e.naturalWidth * n), "px"), e.style.left = "-".concat(t.x * n, "px"), e.style.top = "-".concat(t.y * n, "px");
        }
      }
    }, {
      key: "enabled",
      get: function get() {
        return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
      }
    }, {
      key: "currentImageContainer",
      get: function get() {
        return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
      }
    }, {
      key: "usingSprites",
      get: function get() {
        return Object.keys(this.thumbnails[0].frames[0]).includes("w");
      }
    }, {
      key: "thumbAspectRatio",
      get: function get() {
        return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
      }
    }, {
      key: "thumbContainerHeight",
      get: function get() {
        return this.mouseDown ? Math.floor(this.player.media.clientWidth / this.thumbAspectRatio) : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
      }
    }, {
      key: "currentImageElement",
      get: function get() {
        return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
      },
      set: function set(e) {
        this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
      }
    }]), t;
  }(),
      $e = {
    insertElements: function insertElements(e, t) {
      var n = this;
      N.string(t) ? U(e, this.media, {
        src: t
      }) : N.array(t) && t.forEach(function (t) {
        U(e, n.media, t);
      });
    },
    change: function change(e) {
      var t = this;
      D(e, "sources.length") ? (le.cancelRequests.call(this), this.destroy.call(this, function () {
        t.options.quality = [], W(t.media), t.media = null, N.element(t.elements.container) && t.elements.container.removeAttribute("class");
        var n = e.sources,
            i = e.type,
            s = a(n, 1)[0],
            r = s.provider,
            o = void 0 === r ? Le.html5 : r,
            l = s.src,
            c = "html5" === o ? i : "div",
            u = "html5" === o ? {} : {
          src: l
        };
        Object.assign(t, {
          provider: o,
          type: i,
          supported: ie.check(i, o, t.config.playsinline),
          media: B(c, u)
        }), t.elements.container.appendChild(t.media), N.boolean(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), N.empty(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), Fe.addStyleHook.call(t), t.isHTML5 && $e.insertElements.call(t, "source", n), t.config.title = e.title, Qe.setup.call(t), t.isHTML5 && Object.keys(e).includes("tracks") && $e.insertElements.call(t, "track", e.tracks), (t.isHTML5 || t.isEmbed && !t.supported.ui) && Fe.build.call(t), t.isHTML5 && t.media.load(), t.previewThumbnails && t.previewThumbnails.load(), t.fullscreen.update();
      }, !0)) : this.debug.warn("Invalid source format");
    }
  };

  var Ge,
      Ze = function () {
    function t(n, i) {
      var a = this;
      if (e(this, t), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = ie.touch, this.media = n, N.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || N.nodeList(this.media) || N.array(this.media)) && (this.media = this.media[0]), this.config = F({}, Ne, t.defaults, i || {}, function () {
        try {
          return JSON.parse(a.media.getAttribute("data-plyr-config"));
        } catch (e) {
          return {};
        }
      }()), this.elements = {
        container: null,
        captions: null,
        buttons: {},
        display: {},
        progress: {},
        inputs: {},
        settings: {
          popup: null,
          menu: null,
          panels: {},
          buttons: {}
        }
      }, this.captions = {
        active: null,
        currentTrack: -1,
        meta: new WeakMap()
      }, this.fullscreen = {
        active: !1
      }, this.options = {
        speed: [],
        quality: []
      }, this.debug = new Oe(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", ie), !N.nullOrUndefined(this.media) && N.element(this.media)) {
        if (this.media.plyr) this.debug.warn("Target already setup");else if (this.config.enabled) {
          if (ie.check().api) {
            var s = this.media.cloneNode(!0);
            s.autoplay = !1, this.elements.original = s;
            var r = this.media.tagName.toLowerCase(),
                o = null,
                l = null;

            switch (r) {
              case "div":
                if (o = this.media.querySelector("iframe"), N.element(o)) {
                  if (l = Ee(o.getAttribute("src")), this.provider = function (e) {
                    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? Le.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? Le.vimeo : null;
                  }(l.toString()), this.elements.container = this.media, this.media = o, this.elements.container.className = "", l.search.length) {
                    var c = ["1", "true"];
                    c.includes(l.searchParams.get("autoplay")) && (this.config.autoplay = !0), c.includes(l.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = c.includes(l.searchParams.get("playsinline")), this.config.youtube.hl = l.searchParams.get("hl")) : this.config.playsinline = !0;
                  }
                } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);

                if (N.empty(this.provider) || !Object.keys(Le).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                this.type = Ie.video;
                break;

              case "video":
              case "audio":
                this.type = r, this.provider = Le.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                break;

              default:
                return void this.debug.error("Setup failed: unsupported type");
            }

            this.supported = ie.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Re(this), this.storage = new ye(this), this.media.plyr = this, N.element(this.elements.container) || (this.elements.container = B("div", {
              tabindex: 0
            }), R(this.media, this.elements.container)), Fe.addStyleHook.call(this), Qe.setup.call(this), this.config.debug && O.call(this, this.elements.container, this.config.events.join(" "), function (e) {
              a.debug.log("event: ".concat(e.type));
            }), (this.isHTML5 || this.isEmbed && !this.supported.ui) && Fe.build.call(this), this.listeners.container(), this.listeners.global(), this.fullscreen = new He(this), this.config.ads.enabled && (this.ads = new Xe(this)), this.isHTML5 && this.config.autoplay && setTimeout(function () {
              return a.play();
            }, 10), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new Je(this))) : this.debug.error("Setup failed: no support");
          } else this.debug.error("Setup failed: no support");
        } else this.debug.error("Setup failed: disabled by config");
      } else this.debug.error("Setup failed: no suitable element passed");
    }

    return n(t, [{
      key: "play",
      value: function value() {
        var e = this;
        return N.function(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(function () {
          return e.ads.play();
        }).catch(function () {
          return e.media.play();
        }), this.media.play()) : null;
      }
    }, {
      key: "pause",
      value: function value() {
        this.playing && N.function(this.media.pause) && this.media.pause();
      }
    }, {
      key: "togglePlay",
      value: function value(e) {
        (N.boolean(e) ? e : !this.playing) ? this.play() : this.pause();
      }
    }, {
      key: "stop",
      value: function value() {
        this.isHTML5 ? (this.pause(), this.restart()) : N.function(this.media.stop) && this.media.stop();
      }
    }, {
      key: "restart",
      value: function value() {
        this.currentTime = 0;
      }
    }, {
      key: "rewind",
      value: function value(e) {
        this.currentTime = this.currentTime - (N.number(e) ? e : this.config.seekTime);
      }
    }, {
      key: "forward",
      value: function value(e) {
        this.currentTime = this.currentTime + (N.number(e) ? e : this.config.seekTime);
      }
    }, {
      key: "increaseVolume",
      value: function value(e) {
        var t = this.media.muted ? 0 : this.volume;
        this.volume = t + (N.number(e) ? e : 0);
      }
    }, {
      key: "decreaseVolume",
      value: function value(e) {
        this.increaseVolume(-e);
      }
    }, {
      key: "toggleCaptions",
      value: function value(e) {
        Pe.toggle.call(this, e, !1);
      }
    }, {
      key: "airplay",
      value: function value() {
        ie.airplay && this.media.webkitShowPlaybackTargetPicker();
      }
    }, {
      key: "toggleControls",
      value: function value(e) {
        if (this.supported.ui && !this.isAudio) {
          var t = J(this.elements.container, this.config.classNames.hideControls),
              n = void 0 === e ? void 0 : !e,
              i = X(this.elements.container, this.config.classNames.hideControls, n);

          if (i && this.config.controls.includes("settings") && !N.empty(this.config.settings) && Ae.toggleMenu.call(this, !1), i !== t) {
            var a = i ? "controlshidden" : "controlsshown";
            H.call(this, this.media, a);
          }

          return !i;
        }

        return !1;
      }
    }, {
      key: "on",
      value: function value(e, t) {
        O.call(this, this.elements.container, e, t);
      }
    }, {
      key: "once",
      value: function value(e, t) {
        q.call(this, this.elements.container, e, t);
      }
    }, {
      key: "off",
      value: function value(e, t) {
        j(this.elements.container, e, t);
      }
    }, {
      key: "destroy",
      value: function value(e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];

        if (this.ready) {
          var i = function i() {
            document.body.style.overflow = "", t.embed = null, n ? (Object.keys(t.elements).length && (W(t.elements.buttons.play), W(t.elements.captions), W(t.elements.controls), W(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), N.function(e) && e()) : (function () {
              this && this.eventListeners && (this.eventListeners.forEach(function (e) {
                var t = e.element,
                    n = e.type,
                    i = e.callback,
                    a = e.options;
                t.removeEventListener(n, i, a);
              }), this.eventListeners = []);
            }.call(t), K(t.elements.original, t.elements.container), H.call(t, t.elements.original, "destroyed", !0), N.function(e) && e.call(t.elements.original), t.ready = !1, setTimeout(function () {
              t.elements = null, t.media = null;
            }, 200));
          };

          this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (Fe.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && N.function(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200));
        }
      }
    }, {
      key: "supports",
      value: function value(e) {
        return ie.mime.call(this, e);
      }
    }, {
      key: "isHTML5",
      get: function get() {
        return this.provider === Le.html5;
      }
    }, {
      key: "isEmbed",
      get: function get() {
        return this.isYouTube || this.isVimeo;
      }
    }, {
      key: "isYouTube",
      get: function get() {
        return this.provider === Le.youtube;
      }
    }, {
      key: "isVimeo",
      get: function get() {
        return this.provider === Le.vimeo;
      }
    }, {
      key: "isVideo",
      get: function get() {
        return this.type === Ie.video;
      }
    }, {
      key: "isAudio",
      get: function get() {
        return this.type === Ie.audio;
      }
    }, {
      key: "playing",
      get: function get() {
        return Boolean(this.ready && !this.paused && !this.ended);
      }
    }, {
      key: "paused",
      get: function get() {
        return Boolean(this.media.paused);
      }
    }, {
      key: "stopped",
      get: function get() {
        return Boolean(this.paused && 0 === this.currentTime);
      }
    }, {
      key: "ended",
      get: function get() {
        return Boolean(this.media.ended);
      }
    }, {
      key: "currentTime",
      set: function set(e) {
        if (this.duration) {
          var t = N.number(e) && e > 0;
          this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"));
        }
      },
      get: function get() {
        return Number(this.media.currentTime);
      }
    }, {
      key: "buffered",
      get: function get() {
        var e = this.media.buffered;
        return N.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
      }
    }, {
      key: "seeking",
      get: function get() {
        return Boolean(this.media.seeking);
      }
    }, {
      key: "duration",
      get: function get() {
        var e = parseFloat(this.config.duration),
            t = (this.media || {}).duration,
            n = N.number(t) && t !== 1 / 0 ? t : 0;
        return e || n;
      }
    }, {
      key: "volume",
      set: function set(e) {
        var t = e;
        N.string(t) && (t = Number(t)), N.number(t) || (t = this.storage.get("volume")), N.number(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !N.empty(e) && this.muted && t > 0 && (this.muted = !1);
      },
      get: function get() {
        return Number(this.media.volume);
      }
    }, {
      key: "muted",
      set: function set(e) {
        var t = e;
        N.boolean(t) || (t = this.storage.get("muted")), N.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
      },
      get: function get() {
        return Boolean(this.media.muted);
      }
    }, {
      key: "hasAudio",
      get: function get() {
        return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
      }
    }, {
      key: "speed",
      set: function set(e) {
        var t = this,
            n = null;
        N.number(e) && (n = e), N.number(n) || (n = this.storage.get("speed")), N.number(n) || (n = this.config.speed.selected);
        var i = this.minimumSpeed,
            a = this.maximumSpeed;
        n = function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 255;
          return Math.min(Math.max(e, t), n);
        }(n, i, a), this.config.speed.selected = n, setTimeout(function () {
          t.media.playbackRate = n;
        }, 0);
      },
      get: function get() {
        return Number(this.media.playbackRate);
      }
    }, {
      key: "minimumSpeed",
      get: function get() {
        return this.isYouTube ? Math.min.apply(Math, s(this.options.speed)) : this.isVimeo ? .5 : .0625;
      }
    }, {
      key: "maximumSpeed",
      get: function get() {
        return this.isYouTube ? Math.max.apply(Math, s(this.options.speed)) : this.isVimeo ? 2 : 16;
      }
    }, {
      key: "quality",
      set: function set(e) {
        var t = this.config.quality,
            n = this.options.quality;

        if (n.length) {
          var i = [!N.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(N.number),
              a = !0;

          if (!n.includes(i)) {
            var s = function (e, t) {
              return N.array(e) && e.length ? e.reduce(function (e, n) {
                return Math.abs(n - t) < Math.abs(e - t) ? n : e;
              }) : null;
            }(n, i);

            this.debug.warn("Unsupported quality option: ".concat(i, ", using ").concat(s, " instead")), i = s, a = !1;
          }

          t.selected = i, this.media.quality = i, a && this.storage.set({
            quality: i
          });
        }
      },
      get: function get() {
        return this.media.quality;
      }
    }, {
      key: "loop",
      set: function set(e) {
        var t = N.boolean(e) ? e : this.config.loop.active;
        this.config.loop.active = t, this.media.loop = t;
      },
      get: function get() {
        return Boolean(this.media.loop);
      }
    }, {
      key: "source",
      set: function set(e) {
        $e.change.call(this, e);
      },
      get: function get() {
        return this.media.currentSrc;
      }
    }, {
      key: "download",
      get: function get() {
        var e = this.config.urls.download;
        return N.url(e) ? e : this.source;
      },
      set: function set(e) {
        N.url(e) && (this.config.urls.download = e, Ae.setDownloadUrl.call(this));
      }
    }, {
      key: "poster",
      set: function set(e) {
        this.isVideo ? Fe.setPoster.call(this, e, !1).catch(function () {}) : this.debug.warn("Poster can only be set for video");
      },
      get: function get() {
        return this.isVideo ? this.media.getAttribute("poster") : null;
      }
    }, {
      key: "ratio",
      get: function get() {
        if (!this.isVideo) return null;
        var e = se(re.call(this));
        return N.array(e) ? e.join(":") : e;
      },
      set: function set(e) {
        this.isVideo ? N.string(e) && ae(e) ? (this.config.ratio = e, oe.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video");
      }
    }, {
      key: "autoplay",
      set: function set(e) {
        var t = N.boolean(e) ? e : this.config.autoplay;
        this.config.autoplay = t;
      },
      get: function get() {
        return Boolean(this.config.autoplay);
      }
    }, {
      key: "currentTrack",
      set: function set(e) {
        Pe.set.call(this, e, !1);
      },
      get: function get() {
        var e = this.captions,
            t = e.toggled,
            n = e.currentTrack;
        return t ? n : -1;
      }
    }, {
      key: "language",
      set: function set(e) {
        Pe.setLanguage.call(this, e, !1);
      },
      get: function get() {
        return (Pe.getCurrentTrack.call(this) || {}).language;
      }
    }, {
      key: "pip",
      set: function set(e) {
        if (ie.pip) {
          var t = N.boolean(e) ? e : !this.pip;
          N.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? Me : xe), N.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
        }
      },
      get: function get() {
        return ie.pip ? N.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Me : null;
      }
    }], [{
      key: "supported",
      value: function value(e, t, n) {
        return ie.check(e, t, n);
      }
    }, {
      key: "loadSprite",
      value: function value(e, t) {
        return be(e, t);
      }
    }, {
      key: "setup",
      value: function value(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = null;
        return N.string(e) ? i = Array.from(document.querySelectorAll(e)) : N.nodeList(e) ? i = Array.from(e) : N.array(e) && (i = e.filter(N.element)), N.empty(i) ? null : i.map(function (e) {
          return new t(e, n);
        });
      }
    }]), t;
  }();

  return Ze.defaults = (Ge = Ne, JSON.parse(JSON.stringify(Ge))), Ze;
});
/* Magnific Popup */

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */

!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : window.jQuery || window.Zepto);
}(function (a) {
  var b,
      c,
      d,
      e,
      f,
      g,
      h = "Close",
      i = "BeforeClose",
      j = "AfterClose",
      k = "BeforeAppend",
      l = "MarkupParse",
      m = "Open",
      n = "Change",
      o = "mfp",
      p = "." + o,
      q = "mfp-ready",
      r = "mfp-removing",
      s = "mfp-prevent-close",
      t = function t() {},
      u = !!window.jQuery,
      v = a(window),
      w = function w(a, c) {
    b.ev.on(o + a + p, c);
  },
      x = function x(b, c, d, e) {
    var f = document.createElement("div");
    return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f;
  },
      y = function y(c, d) {
    b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
  },
      z = function z(c) {
    return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn;
  },
      A = function A() {
    a.magnificPopup.instance || (b = new t(), b.init(), a.magnificPopup.instance = b);
  },
      B = function B() {
    var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
    if (void 0 !== a.transition) return !0;

    for (; b.length;) {
      if (b.pop() + "Transition" in a) return !0;
    }

    return !1;
  };

  t.prototype = {
    constructor: t,
    init: function init() {
      var c = navigator.appVersion;
      b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {};
    },
    open: function open(c) {
      var e;

      if (c.isObj === !1) {
        b.items = c.items.toArray(), b.index = 0;
        var g,
            h = c.items;

        for (e = 0; e < h.length; e++) {
          if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
            b.index = e;
            break;
          }
        }
      } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;

      if (b.isOpen) return void b.updateItemHTML();
      b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function () {
        b.close();
      }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function (a) {
        b._checkIfClose(a.target) && b.close();
      }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;

      for (e = 0; e < i.length; e++) {
        var j = i[e];
        j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b);
      }

      y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function (a, b, c, d) {
        c.close_replaceWith = z(d.type);
      }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
        overflow: b.st.overflowY,
        overflowX: "hidden",
        overflowY: b.st.overflowY
      }) : b.wrap.css({
        top: v.scrollTop(),
        position: "absolute"
      }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
        height: d.height(),
        position: "absolute"
      }), b.st.enableEscapeKey && d.on("keyup" + p, function (a) {
        27 === a.keyCode && b.close();
      }), v.on("resize" + p, function () {
        b.updateSize();
      }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
      var k = b.wH = v.height(),
          n = {};

      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();

        o && (n.marginRight = o);
      }

      b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
      var r = b.st.mainClass;
      return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function () {
        b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn);
      }, 16), b.isOpen = !0, b.updateSize(k), y(m), c;
    },
    close: function close() {
      b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function () {
        b._close();
      }, b.st.removalDelay)) : b._close());
    },
    _close: function _close() {
      y(h);
      var c = r + " " + q + " ";

      if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
        var e = {
          marginRight: ""
        };
        b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e);
      }

      d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j);
    },
    updateSize: function updateSize(a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
            d = window.innerHeight * c;
        b.wrap.css("height", d), b.wH = d;
      } else b.wH = a || v.height();

      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function updateItemHTML() {
      var c = b.items[b.index];
      b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
      var d = c.type;

      if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0;
      }

      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
      b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange");
    },
    appendContent: function appendContent(a, c) {
      b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content);
    },
    parseEl: function parseEl(c) {
      var d,
          e = b.items[c];

      if (e.tagName ? e = {
        el: a(e)
      } : (d = e.type, e = {
        data: e,
        src: e.src
      }), e.el) {
        for (var f = b.types, g = 0; g < f.length; g++) {
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        }

        e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"));
      }

      return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c];
    },
    addGroup: function addGroup(a, c) {
      var d = function d(_d) {
        _d.mfpEl = this, b._openClick(_d, a, c);
      };

      c || (c = {});
      var e = "click.magnificPopup";
      c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)));
    },
    _openClick: function _openClick(c, d, e) {
      var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;

      if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
        var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
        if (g) if (a.isFunction(g)) {
          if (!g.call(b)) return !0;
        } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e);
      }
    },
    updateStatus: function updateStatus(a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
        var e = {
          status: a,
          text: d
        };
        y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function (a) {
          a.stopImmediatePropagation();
        }), b.container.addClass("mfp-s-" + a), c = a;
      }
    },
    _checkIfClose: function _checkIfClose(c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
            e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;

        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;

        return !1;
      }
    },
    _addClassToMFP: function _addClassToMFP(a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function _removeClassFromMFP(a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function _hasScrollBar(a) {
      return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height());
    },
    _setFocus: function _setFocus() {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function _onFocusIn(c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1);
    },
    _parseMarkup: function _parseMarkup(b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function (c, d) {
        if (void 0 === d || d === !1) return !0;

        if (e = c.split("_"), e.length > 1) {
          var f = b.find(p + "-" + e[0]);

          if (f.length > 0) {
            var g = e[1];
            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d);
          }
        } else b.find(p + "-" + c).html(d);
      });
    },
    _getScrollbarSize: function _getScrollbarSize() {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a);
      }

      return b.scrollbarSize;
    }
  }, a.magnificPopup = {
    instance: null,
    proto: t.prototype,
    modules: [],
    open: function open(b, c) {
      return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b);
    },
    close: function close() {
      return a.magnificPopup.instance && a.magnificPopup.instance.close();
    },
    registerModule: function registerModule(b, c) {
      c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b);
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, a.fn.magnificPopup = function (c) {
    A();
    var d = a(this);
    if ("string" == typeof c) {
      if ("open" === c) {
        var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
        f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
          mfpEl: e
        }, d, f);
      } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
    } else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
    return d;
  };

  var C,
      D,
      E,
      F = "inline",
      G = function G() {
    E && (D.after(E.addClass(C)).detach(), E = null);
  };

  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function initInline() {
        b.types.push(F), w(h + "." + F, function () {
          G();
        });
      },
      getInline: function getInline(c, d) {
        if (G(), c.src) {
          var e = b.st.inline,
              f = a(c.src);

          if (f.length) {
            var g = f[0].parentNode;
            g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), f = a("<div>");

          return c.inlineElement = f, f;
        }

        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      }
    }
  });

  var H,
      I = "ajax",
      J = function J() {
    H && a(document.body).removeClass(H);
  },
      K = function K() {
    J(), b.req && b.req.abort();
  };

  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function initAjax() {
        b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K);
      },
      getAjax: function getAjax(c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend({
          url: c.src,
          success: function success(d, e, f) {
            var g = {
              data: d,
              xhr: f
            };
            y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function () {
              b.wrap.addClass(q);
            }, 16), b.updateStatus("ready"), y("AjaxContentAdded");
          },
          error: function error() {
            J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
          }
        }, b.st.ajax.settings);
        return b.req = a.ajax(d), "";
      }
    }
  });

  var L,
      M = function M(c) {
    if (c.data && void 0 !== c.data.title) return c.data.title;
    var d = b.st.image.titleSrc;

    if (d) {
      if (a.isFunction(d)) return d.call(b, c);
      if (c.el) return c.el.attr(d) || "";
    }

    return "";
  };

  a.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function initImage() {
        var c = b.st.image,
            d = ".image";
        b.types.push("image"), w(m + d, function () {
          "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor);
        }), w(h + d, function () {
          c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p);
        }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function resizeImage() {
        var a = b.currItem;

        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function _onImageHasSize(a) {
        a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1));
      },
      findImageSize: function findImageSize(a) {
        var c = 0,
            d = a.img[0],
            e = function e(f) {
          L && clearInterval(L), L = setInterval(function () {
            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)));
          }, f);
        };

        e(1);
      },
      getImage: function getImage(c, d) {
        var e = 0,
            f = function f() {
          c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()));
        },
            g = function g() {
          c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0);
        },
            h = b.st.image,
            i = d.find(".mfp-img");

        if (i.length) {
          var j = document.createElement("img");
          j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1);
        }

        return b._parseMarkup(d, {
          title: M(c),
          img_replaceWith: c.img
        }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d);
      }
    }
  });

  var N,
      O = function O() {
    return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N;
  };

  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function opener(a) {
        return a.is("img") ? a : a.find("img");
      }
    },
    proto: {
      initZoom: function initZoom() {
        var a,
            c = b.st.zoom,
            d = ".zoom";

        if (c.enabled && b.supportsTransition) {
          var e,
              f,
              g = c.duration,
              j = function j(a) {
            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
              position: "fixed",
              zIndex: 9999,
              left: 0,
              top: 0,
              "-webkit-backface-visibility": "hidden"
            },
                f = "transition";
            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b;
          },
              k = function k() {
            b.content.css("visibility", "visible");
          };

          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
              f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function () {
                f.css(b._getOffset(!0)), e = setTimeout(function () {
                  k(), setTimeout(function () {
                    f.remove(), a = f = null, y("ZoomAnimationEnded");
                  }, 16);
                }, g);
              }, 16);
            }
          }), w(i + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.st.removalDelay = g, !a) {
                if (a = b._getItemToZoom(), !a) return;
                f = j(a);
              }

              f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function () {
                f.css(b._getOffset());
              }, 16);
            }
          }), w(h + d, function () {
            b._allowZoom() && (k(), f && f.remove(), a = null);
          });
        }
      },
      _allowZoom: function _allowZoom() {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function _getItemToZoom() {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function _getOffset(c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
            f = parseInt(d.css("padding-top"), 10),
            g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
        };
        return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h;
      }
    }
  });

  var P = "iframe",
      Q = "//about:blank",
      R = function R(a) {
    if (b.currTemplate[P]) {
      var c = b.currTemplate[P].find("iframe");
      c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"));
    }
  };

  a.magnificPopup.registerModule(P, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function initIframe() {
        b.types.push(P), w("BeforeChange", function (a, b, c) {
          b !== c && (b === P ? R() : c === P && R(!0));
        }), w(h + "." + P, function () {
          R();
        });
      },
      getIframe: function getIframe(c, d) {
        var e = c.src,
            f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0;
        });
        var g = {};
        return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d;
      }
    }
  });

  var S = function S(a) {
    var c = b.items.length;
    return a > c - 1 ? a - c : 0 > a ? c + a : a;
  },
      T = function T(a, b, c) {
    return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
  };

  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function initGallery() {
        var c = b.st.gallery,
            e = ".mfp-gallery";
        return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function () {
          c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function () {
            return b.items.length > 1 ? (b.next(), !1) : void 0;
          }), d.on("keydown" + e, function (a) {
            37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
          });
        }), w("UpdateStatus" + e, function (a, c) {
          c.text && (c.text = T(c.text, b.currItem.index, b.items.length));
        }), w(l + e, function (a, d, e, f) {
          var g = b.items.length;
          e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
        }), w("BuildControls" + e, function () {
          if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
            var d = c.arrowMarkup,
                e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
            e.click(function () {
              b.prev();
            }), f.click(function () {
              b.next();
            }), b.container.append(e.add(f));
          }
        }), w(n + e, function () {
          b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function () {
            b.preloadNearbyImages(), b._preloadTimeout = null;
          }, 16);
        }), void w(h + e, function () {
          d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null;
        })) : !1;
      },
      next: function next() {
        b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML();
      },
      prev: function prev() {
        b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML();
      },
      goTo: function goTo(a) {
        b.direction = a >= b.index, b.index = a, b.updateItemHTML();
      },
      preloadNearbyImages: function preloadNearbyImages() {
        var a,
            c = b.st.gallery.preload,
            d = Math.min(c[0], b.items.length),
            e = Math.min(c[1], b.items.length);

        for (a = 1; a <= (b.direction ? e : d); a++) {
          b._preloadItem(b.index + a);
        }

        for (a = 1; a <= (b.direction ? d : e); a++) {
          b._preloadItem(b.index - a);
        }
      },
      _preloadItem: function _preloadItem(c) {
        if (c = S(c), !b.items[c].preloaded) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
            d.hasSize = !0;
          }).on("error.mfploader", function () {
            d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d);
          }).attr("src", d.src)), d.preloaded = !0;
        }
      }
    }
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function replaceSrc(a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1
    },
    proto: {
      initRetina: function initRetina() {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
              c = a.ratio;
          c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function (a, b) {
            b.img.css({
              "max-width": b.img[0].naturalWidth / c,
              width: "100%"
            });
          }), w("ElementParse." + U, function (b, d) {
            d.src = a.replaceSrc(d, c);
          }));
        }
      }
    }
  }), A();
});
/* Jquery Marquee */

/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */

(function (f) {
  f.fn.marquee = function (x) {
    return this.each(function () {
      var a = f.extend({}, f.fn.marquee.defaults, x),
          b = f(this),
          c,
          t,
          e = 3,
          y = "animation-play-state",
          p = !1,
          E = function E(a, b, c) {
        for (var e = ["webkit", "moz", "MS", "o", ""], d = 0; d < e.length; d++) {
          e[d] || (b = b.toLowerCase()), a.addEventListener(e[d] + b, c, !1);
        }
      },
          F = function F(a) {
        var b = [],
            c;

        for (c in a) {
          a.hasOwnProperty(c) && b.push(c + ":" + a[c]);
        }

        b.push();
        return "{" + b.join(",") + "}";
      },
          l = {
        pause: function pause() {
          p && a.allowCss3Support ? c.css(y, "paused") : f.fn.pause && c.pause();
          b.data("runningStatus", "paused");
          b.trigger("paused");
        },
        resume: function resume() {
          p && a.allowCss3Support ? c.css(y, "running") : f.fn.resume && c.resume();
          b.data("runningStatus", "resumed");
          b.trigger("resumed");
        },
        toggle: function toggle() {
          l["resumed" == b.data("runningStatus") ? "pause" : "resume"]();
        },
        destroy: function destroy() {
          clearTimeout(b.timer);
          b.find("*").addBack().unbind();
          b.html(b.find(".js-marquee:first").html());
        }
      };

      if ("string" === typeof x) f.isFunction(l[x]) && (c || (c = b.find(".js-marquee-wrapper")), !0 === b.data("css3AnimationIsSupported") && (p = !0), l[x]());else {
        var u;
        f.each(a, function (c, d) {
          u = b.attr("data-" + c);

          if ("undefined" !== typeof u) {
            switch (u) {
              case "true":
                u = !0;
                break;

              case "false":
                u = !1;
            }

            a[c] = u;
          }
        });
        a.speed && (a.duration = parseInt(b.width(), 10) / a.speed * 1E3);
        var v = "up" == a.direction || "down" == a.direction;
        a.gap = a.duplicated ? parseInt(a.gap) : 0;
        b.wrapInner('<div class="js-marquee"></div>');
        var h = b.find(".js-marquee").css({
          "margin-right": a.gap,
          "float": "left"
        });
        a.duplicated && h.clone(!0).appendTo(b);
        b.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
        c = b.find(".js-marquee-wrapper");

        if (v) {
          var k = b.height();
          c.removeAttr("style");
          b.height(k);
          b.find(".js-marquee").css({
            "float": "none",
            "margin-bottom": a.gap,
            "margin-right": 0
          });
          a.duplicated && b.find(".js-marquee:last").css({
            "margin-bottom": 0
          });
          var q = b.find(".js-marquee:first").height() + a.gap;
          a.startVisible && !a.duplicated ? (a._completeDuration = (parseInt(q, 10) + parseInt(k, 10)) / parseInt(k, 10) * a.duration, a.duration *= parseInt(q, 10) / parseInt(k, 10)) : a.duration *= (parseInt(q, 10) + parseInt(k, 10)) / parseInt(k, 10);
        } else {
          var m = b.find(".js-marquee:first").width() + a.gap;
          var n = b.width();
          a.startVisible && !a.duplicated ? (a._completeDuration = (parseInt(m, 10) + parseInt(n, 10)) / parseInt(n, 10) * a.duration, a.duration *= parseInt(m, 10) / parseInt(n, 10)) : a.duration *= (parseInt(m, 10) + parseInt(n, 10)) / parseInt(n, 10);
        }

        a.duplicated && (a.duration /= 2);

        if (a.allowCss3Support) {
          h = document.body || document.createElement("div");
          var g = "marqueeAnimation-" + Math.floor(1E7 * Math.random()),
              A = ["Webkit", "Moz", "O", "ms", "Khtml"],
              B = "animation",
              d = "",
              r = "";
          h.style.animation && (r = "@keyframes " + g + " ", p = !0);
          if (!1 === p) for (var z = 0; z < A.length; z++) {
            if (void 0 !== h.style[A[z] + "AnimationName"]) {
              h = "-" + A[z].toLowerCase() + "-";
              B = h + B;
              y = h + y;
              r = "@" + h + "keyframes " + g + " ";
              p = !0;
              break;
            }
          }
          p && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s infinite " + a.css3easing, b.data("css3AnimationIsSupported", !0));
        }

        var C = function C() {
          c.css("transform", "translateY(" + ("up" == a.direction ? k + "px" : "-" + q + "px") + ")");
        },
            D = function D() {
          c.css("transform", "translateX(" + ("left" == a.direction ? n + "px" : "-" + m + "px") + ")");
        };

        a.duplicated ? (v ? a.startVisible ? c.css("transform", "translateY(0)") : c.css("transform", "translateY(" + ("up" == a.direction ? k + "px" : "-" + (2 * q - a.gap) + "px") + ")") : a.startVisible ? c.css("transform", "translateX(0)") : c.css("transform", "translateX(" + ("left" == a.direction ? n + "px" : "-" + (2 * m - a.gap) + "px") + ")"), a.startVisible || (e = 1)) : a.startVisible ? e = 2 : v ? C() : D();

        var w = function w() {
          a.duplicated && (1 === e ? (a._originalDuration = a.duration, a.duration = v ? "up" == a.direction ? a.duration + k / (q / a.duration) : 2 * a.duration : "left" == a.direction ? a.duration + n / (m / a.duration) : 2 * a.duration, d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing), e++) : 2 === e && (a.duration = a._originalDuration, d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), e++));
          v ? a.duplicated ? (2 < e && c.css("transform", "translateY(" + ("up" == a.direction ? 0 : "-" + q + "px") + ")"), t = {
            transform: "translateY(" + ("up" == a.direction ? "-" + q + "px" : 0) + ")"
          }) : a.startVisible ? 2 === e ? (d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing), t = {
            transform: "translateY(" + ("up" == a.direction ? "-" + q + "px" : k + "px") + ")"
          }, e++) : 3 === e && (a.duration = a._completeDuration, d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), C()) : (C(), t = {
            transform: "translateY(" + ("up" == a.direction ? "-" + c.height() + "px" : k + "px") + ")"
          }) : a.duplicated ? (2 < e && c.css("transform", "translateX(" + ("left" == a.direction ? 0 : "-" + m + "px") + ")"), t = {
            transform: "translateX(" + ("left" == a.direction ? "-" + m + "px" : 0) + ")"
          }) : a.startVisible ? 2 === e ? (d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing), t = {
            transform: "translateX(" + ("left" == a.direction ? "-" + m + "px" : n + "px") + ")"
          }, e++) : 3 === e && (a.duration = a._completeDuration, d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), D()) : (D(), t = {
            transform: "translateX(" + ("left" == a.direction ? "-" + m + "px" : n + "px") + ")"
          });
          b.trigger("beforeStarting");

          if (p) {
            c.css(B, d);
            var h = r + " { 100%  " + F(t) + "}",
                l = c.find("style");
            0 !== l.length ? l.filter(":last").html(h) : f("head").append("<style>" + h + "</style>");
            E(c[0], "AnimationIteration", function () {
              b.trigger("finished");
            });
            E(c[0], "AnimationEnd", function () {
              w();
              b.trigger("finished");
            });
          } else c.animate(t, a.duration, a.easing, function () {
            b.trigger("finished");
            a.pauseOnCycle ? b.timer = setTimeout(w, a.delayBeforeStart) : w();
          });

          b.data("runningStatus", "resumed");
        };

        b.bind("pause", l.pause);
        b.bind("resume", l.resume);
        a.pauseOnHover && (b.bind("mouseenter", l.pause), b.bind("mouseleave", l.resume));
        p && a.allowCss3Support ? w() : b.timer = setTimeout(w, a.delayBeforeStart);
      }
    });
  };

  f.fn.marquee.defaults = {
    allowCss3Support: !0,
    css3easing: "linear",
    easing: "linear",
    delayBeforeStart: 1E3,
    direction: "left",
    duplicated: !1,
    duration: 5E3,
    gap: 20,
    pauseOnCycle: !1,
    pauseOnHover: !1,
    startVisible: !1
  };
})(jQuery);
/* Masonry JS */

/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */


!function (t, e) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
    return e(t, i);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function (t, e) {
  "use strict";

  function i(i, r, a) {
    function h(t, e, n) {
      var o,
          r = "$()." + i + '("' + e + '")';
      return t.each(function (t, h) {
        var u = a.data(h, i);
        if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
        var d = u[e];
        if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
        var l = d.apply(u, n);
        o = void 0 === o ? l : o;
      }), void 0 !== o ? o : t;
    }

    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o));
      });
    }

    a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function (t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
    }), a.fn[i] = function (t) {
      if ("string" == typeof t) {
        var e = o.call(arguments, 1);
        return h(this, t, e);
      }

      return u(this, t), this;
    }, n(a));
  }

  function n(t) {
    !t || t && t.bridget || (t.bridget = i);
  }

  var o = Array.prototype.slice,
      r = t.console,
      s = "undefined" == typeof r ? function () {} : function (t) {
    r.error(t);
  };
  return n(e || t.jQuery), i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function () {
  function t() {}

  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
          n = i[t] = i[t] || [];
      return -1 == n.indexOf(e) && n.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
          n = i[t] = i[t] || {};
      return n[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      var n = i.indexOf(e);
      return -1 != n && i.splice(n, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      i = i.slice(0), e = e || [];

      for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
        var r = i[o],
            s = n && n[r];
        s && (this.off(t, r), delete n[r]), r.apply(this, e);
      }

      return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.getSize = e();
}(window, function () {
  "use strict";

  function t(t) {
    var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
    return i && e;
  }

  function e() {}

  function i() {
    for (var t = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    }, e = 0; u > e; e++) {
      var i = h[e];
      t[i] = 0;
    }

    return t;
  }

  function n(t) {
    var e = getComputedStyle(t);
    return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
  }

  function o() {
    if (!d) {
      d = !0;
      var e = document.createElement("div");
      e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
      var i = document.body || document.documentElement;
      i.appendChild(e);
      var o = n(e);
      s = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = s, i.removeChild(e);
    }
  }

  function r(e) {
    if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == _typeof(e) && e.nodeType) {
      var r = n(e);
      if ("none" == r.display) return i();
      var a = {};
      a.width = e.offsetWidth, a.height = e.offsetHeight;

      for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
        var c = h[l],
            f = r[c],
            m = parseFloat(f);
        a[c] = isNaN(m) ? 0 : m;
      }

      var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          E = d && s,
          b = t(r.width);

      b !== !1 && (a.width = b + (E ? 0 : p + _));
      var x = t(r.height);
      return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a;
    }
  }

  var s,
      a = "undefined" == typeof console ? e : function (t) {
    console.error(t);
  },
      h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      u = h.length,
      d = !1;
  return r;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
  "use strict";

  var t = function () {
    var t = window.Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";

    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var n = e[i],
          o = n + "MatchesSelector";
      if (t[o]) return o;
    }
  }();

  return function (e, i) {
    return e[t](i);
  };
}), function (t, e) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
    return e(t, i);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function (t, e) {
  var i = {};
  i.extend = function (t, e) {
    for (var i in e) {
      t[i] = e[i];
    }

    return t;
  }, i.modulo = function (t, e) {
    return (t % e + e) % e;
  };
  var n = Array.prototype.slice;
  i.makeArray = function (t) {
    if (Array.isArray(t)) return t;
    if (null === t || void 0 === t) return [];
    var e = "object" == _typeof(t) && "number" == typeof t.length;
    return e ? n.call(t) : [t];
  }, i.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    -1 != i && t.splice(i, 1);
  }, i.getParent = function (t, i) {
    for (; t.parentNode && t != document.body;) {
      if (t = t.parentNode, e(t, i)) return t;
    }
  }, i.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.filterFindElements = function (t, n) {
    t = i.makeArray(t);
    var o = [];
    return t.forEach(function (t) {
      if (t instanceof HTMLElement) {
        if (!n) return void o.push(t);
        e(t, n) && o.push(t);

        for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) {
          o.push(i[r]);
        }
      }
    }), o;
  }, i.debounceMethod = function (t, e, i) {
    i = i || 100;
    var n = t.prototype[e],
        o = e + "Timeout";

    t.prototype[e] = function () {
      var t = this[o];
      clearTimeout(t);
      var e = arguments,
          r = this;
      this[o] = setTimeout(function () {
        n.apply(r, e), delete r[o];
      }, i);
    };
  }, i.docReady = function (t) {
    var e = document.readyState;
    "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, i.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i;
    }).toLowerCase();
  };
  var o = t.console;
  return i.htmlInit = function (e, n) {
    i.docReady(function () {
      var r = i.toDashed(n),
          s = "data-" + r,
          a = document.querySelectorAll("[" + s + "]"),
          h = document.querySelectorAll(".js-" + r),
          u = i.makeArray(a).concat(i.makeArray(h)),
          d = s + "-options",
          l = t.jQuery;
      u.forEach(function (t) {
        var i,
            r = t.getAttribute(s) || t.getAttribute(d);

        try {
          i = r && JSON.parse(r);
        } catch (a) {
          return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + a));
        }

        var h = new e(t, i);
        l && l.data(t, n, h);
      });
    });
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize));
}(window, function (t, e) {
  "use strict";

  function i(t) {
    for (var e in t) {
      return !1;
    }

    return e = null, !0;
  }

  function n(t, e) {
    t && (this.element = t, this.layout = e, this.position = {
      x: 0,
      y: 0
    }, this._create());
  }

  function o(t) {
    return t.replace(/([A-Z])/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }

  var r = document.documentElement.style,
      s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
      h = {
    WebkitTransition: "webkitTransitionEnd",
    transition: "transitionend"
  }[s],
      u = {
    transform: a,
    transition: s,
    transitionDuration: s + "Duration",
    transitionProperty: s + "Property",
    transitionDelay: s + "Delay"
  },
      d = n.prototype = Object.create(t.prototype);
  d.constructor = n, d._create = function () {
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    }, this.css({
      position: "absolute"
    });
  }, d.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, d.getSize = function () {
    this.size = e(this.element);
  }, d.css = function (t) {
    var e = this.element.style;

    for (var i in t) {
      var n = u[i] || i;
      e[n] = t[i];
    }
  }, d.getPosition = function () {
    var t = getComputedStyle(this.element),
        e = this.layout._getOption("originLeft"),
        i = this.layout._getOption("originTop"),
        n = t[e ? "left" : "right"],
        o = t[i ? "top" : "bottom"],
        r = parseFloat(n),
        s = parseFloat(o),
        a = this.layout.size;

    -1 != n.indexOf("%") && (r = r / 100 * a.width), -1 != o.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= e ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s;
  }, d.layoutPosition = function () {
    var t = this.layout.size,
        e = {},
        i = this.layout._getOption("originLeft"),
        n = this.layout._getOption("originTop"),
        o = i ? "paddingLeft" : "paddingRight",
        r = i ? "left" : "right",
        s = i ? "right" : "left",
        a = this.position.x + t[o];

    e[r] = this.getXValue(a), e[s] = "";
    var h = n ? "paddingTop" : "paddingBottom",
        u = n ? "top" : "bottom",
        d = n ? "bottom" : "top",
        l = this.position.y + t[h];
    e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]);
  }, d.getXValue = function (t) {
    var e = this.layout._getOption("horizontal");

    return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
  }, d.getYValue = function (t) {
    var e = this.layout._getOption("horizontal");

    return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
  }, d._transitionTo = function (t, e) {
    this.getPosition();
    var i = this.position.x,
        n = this.position.y,
        o = t == this.position.x && e == this.position.y;
    if (this.setPosition(t, e), o && !this.isTransitioning) return void this.layoutPosition();
    var r = t - i,
        s = e - n,
        a = {};
    a.transform = this.getTranslate(r, s), this.transition({
      to: a,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: !0
    });
  }, d.getTranslate = function (t, e) {
    var i = this.layout._getOption("originLeft"),
        n = this.layout._getOption("originTop");

    return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)";
  }, d.goTo = function (t, e) {
    this.setPosition(t, e), this.layoutPosition();
  }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
    this.position.x = parseFloat(t), this.position.y = parseFloat(e);
  }, d._nonTransition = function (t) {
    this.css(t.to), t.isCleaning && this._removeStyles(t.to);

    for (var e in t.onTransitionEnd) {
      t.onTransitionEnd[e].call(this);
    }
  }, d.transition = function (t) {
    if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
    var e = this._transn;

    for (var i in t.onTransitionEnd) {
      e.onEnd[i] = t.onTransitionEnd[i];
    }

    for (i in t.to) {
      e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
    }

    if (t.from) {
      this.css(t.from);
      var n = this.element.offsetHeight;
      n = null;
    }

    this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
  };
  var l = "opacity," + o(a);
  d.enableTransition = function () {
    if (!this.isTransitioning) {
      var t = this.layout.options.transitionDuration;
      t = "number" == typeof t ? t + "ms" : t, this.css({
        transitionProperty: l,
        transitionDuration: t,
        transitionDelay: this.staggerDelay || 0
      }), this.element.addEventListener(h, this, !1);
    }
  }, d.onwebkitTransitionEnd = function (t) {
    this.ontransitionend(t);
  }, d.onotransitionend = function (t) {
    this.ontransitionend(t);
  };
  var c = {
    "-webkit-transform": "transform"
  };
  d.ontransitionend = function (t) {
    if (t.target === this.element) {
      var e = this._transn,
          n = c[t.propertyName] || t.propertyName;

      if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
        var o = e.onEnd[n];
        o.call(this), delete e.onEnd[n];
      }

      this.emitEvent("transitionEnd", [this]);
    }
  }, d.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1;
  }, d._removeStyles = function (t) {
    var e = {};

    for (var i in t) {
      e[i] = "";
    }

    this.css(e);
  };
  var f = {
    transitionProperty: "",
    transitionDuration: "",
    transitionDelay: ""
  };
  return d.removeTransitionStyles = function () {
    this.css(f);
  }, d.stagger = function (t) {
    t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
  }, d.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({
      display: ""
    }), this.emitEvent("remove", [this]);
  }, d.remove = function () {
    return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
      this.removeElem();
    }), void this.hide()) : void this.removeElem();
  }, d.reveal = function () {
    delete this.isHidden, this.css({
      display: ""
    });
    var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("visibleStyle");
    e[i] = this.onRevealTransitionEnd, this.transition({
      from: t.hiddenStyle,
      to: t.visibleStyle,
      isCleaning: !0,
      onTransitionEnd: e
    });
  }, d.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal");
  }, d.getHideRevealTransitionEndProperty = function (t) {
    var e = this.layout.options[t];
    if (e.opacity) return "opacity";

    for (var i in e) {
      return i;
    }
  }, d.hide = function () {
    this.isHidden = !0, this.css({
      display: ""
    });
    var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("hiddenStyle");
    e[i] = this.onHideTransitionEnd, this.transition({
      from: t.visibleStyle,
      to: t.hiddenStyle,
      isCleaning: !0,
      onTransitionEnd: e
    });
  }, d.onHideTransitionEnd = function () {
    this.isHidden && (this.css({
      display: "none"
    }), this.emitEvent("hide"));
  }, d.destroy = function () {
    this.css({
      position: "",
      left: "",
      right: "",
      top: "",
      bottom: "",
      transition: "",
      transform: ""
    });
  }, n;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) {
    return e(t, i, n, o, r);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
}(window, function (t, e, i, n, o) {
  "use strict";

  function r(t, e) {
    var i = n.getQueryElement(t);
    if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
    this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
    var o = ++l;
    this.element.outlayerGUID = o, c[o] = this, this._create();

    var r = this._getOption("initLayout");

    r && this.layout();
  }

  function s(t) {
    function e() {
      t.apply(this, arguments);
    }

    return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
  }

  function a(t) {
    if ("number" == typeof t) return t;
    var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];
    if (!i.length) return 0;
    i = parseFloat(i);
    var o = m[n] || 1;
    return i * o;
  }

  var h = t.console,
      u = t.jQuery,
      d = function d() {},
      l = 0,
      c = {};

  r.namespace = "outlayer", r.Item = o, r.defaults = {
    containerStyle: {
      position: "relative"
    },
    initLayout: !0,
    originLeft: !0,
    originTop: !0,
    resize: !0,
    resizeContainer: !0,
    transitionDuration: "0.4s",
    hiddenStyle: {
      opacity: 0,
      transform: "scale(0.001)"
    },
    visibleStyle: {
      opacity: 1,
      transform: "scale(1)"
    }
  };
  var f = r.prototype;
  n.extend(f, e.prototype), f.option = function (t) {
    n.extend(this.options, t);
  }, f._getOption = function (t) {
    var e = this.constructor.compatOptions[t];
    return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
  }, r.compatOptions = {
    initLayout: "isInitLayout",
    horizontal: "isHorizontal",
    layoutInstant: "isLayoutInstant",
    originLeft: "isOriginLeft",
    originTop: "isOriginTop",
    resize: "isResizeBound",
    resizeContainer: "isResizingContainer"
  }, f._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);

    var t = this._getOption("resize");

    t && this.bindResize();
  }, f.reloadItems = function () {
    this.items = this._itemize(this.element.children);
  }, f._itemize = function (t) {
    for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
      var r = e[o],
          s = new i(r, this);
      n.push(s);
    }

    return n;
  }, f._filterFindItemElements = function (t) {
    return n.filterFindElements(t, this.options.itemSelector);
  }, f.getItemElements = function () {
    return this.items.map(function (t) {
      return t.element;
    });
  }, f.layout = function () {
    this._resetLayout(), this._manageStamps();

    var t = this._getOption("layoutInstant"),
        e = void 0 !== t ? t : !this._isLayoutInited;

    this.layoutItems(this.items, e), this._isLayoutInited = !0;
  }, f._init = f.layout, f._resetLayout = function () {
    this.getSize();
  }, f.getSize = function () {
    this.size = i(this.element);
  }, f._getMeasurement = function (t, e) {
    var n,
        o = this.options[t];
    o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0;
  }, f.layoutItems = function (t, e) {
    t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
  }, f._getItemsForLayout = function (t) {
    return t.filter(function (t) {
      return !t.isIgnored;
    });
  }, f._layoutItems = function (t, e) {
    if (this._emitCompleteOnItems("layout", t), t && t.length) {
      var i = [];
      t.forEach(function (t) {
        var n = this._getItemLayoutPosition(t);

        n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n);
      }, this), this._processLayoutQueue(i);
    }
  }, f._getItemLayoutPosition = function () {
    return {
      x: 0,
      y: 0
    };
  }, f._processLayoutQueue = function (t) {
    this.updateStagger(), t.forEach(function (t, e) {
      this._positionItem(t.item, t.x, t.y, t.isInstant, e);
    }, this);
  }, f.updateStagger = function () {
    var t = this.options.stagger;
    return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger);
  }, f._positionItem = function (t, e, i, n, o) {
    n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
  }, f._postLayout = function () {
    this.resizeContainer();
  }, f.resizeContainer = function () {
    var t = this._getOption("resizeContainer");

    if (t) {
      var e = this._getContainerSize();

      e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
    }
  }, f._getContainerSize = d, f._setContainerMeasure = function (t, e) {
    if (void 0 !== t) {
      var i = this.size;
      i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
    }
  }, f._emitCompleteOnItems = function (t, e) {
    function i() {
      o.dispatchEvent(t + "Complete", null, [e]);
    }

    function n() {
      s++, s == r && i();
    }

    var o = this,
        r = e.length;
    if (!e || !r) return void i();
    var s = 0;
    e.forEach(function (e) {
      e.once(t, n);
    });
  }, f.dispatchEvent = function (t, e, i) {
    var n = e ? [e].concat(i) : i;
    if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) {
      var o = u.Event(e);
      o.type = t, this.$element.trigger(o, i);
    } else this.$element.trigger(t, i);
  }, f.ignore = function (t) {
    var e = this.getItem(t);
    e && (e.isIgnored = !0);
  }, f.unignore = function (t) {
    var e = this.getItem(t);
    e && delete e.isIgnored;
  }, f.stamp = function (t) {
    t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
  }, f.unstamp = function (t) {
    t = this._find(t), t && t.forEach(function (t) {
      n.removeFrom(this.stamps, t), this.unignore(t);
    }, this);
  }, f._find = function (t) {
    return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0;
  }, f._manageStamps = function () {
    this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
  }, f._getBoundingRect = function () {
    var t = this.element.getBoundingClientRect(),
        e = this.size;
    this._boundingRect = {
      left: t.left + e.paddingLeft + e.borderLeftWidth,
      top: t.top + e.paddingTop + e.borderTopWidth,
      right: t.right - (e.paddingRight + e.borderRightWidth),
      bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
    };
  }, f._manageStamp = d, f._getElementOffset = function (t) {
    var e = t.getBoundingClientRect(),
        n = this._boundingRect,
        o = i(t),
        r = {
      left: e.left - n.left - o.marginLeft,
      top: e.top - n.top - o.marginTop,
      right: n.right - e.right - o.marginRight,
      bottom: n.bottom - e.bottom - o.marginBottom
    };
    return r;
  }, f.handleEvent = n.handleEvent, f.bindResize = function () {
    t.addEventListener("resize", this), this.isResizeBound = !0;
  }, f.unbindResize = function () {
    t.removeEventListener("resize", this), this.isResizeBound = !1;
  }, f.onresize = function () {
    this.resize();
  }, n.debounceMethod(r, "onresize", 100), f.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout();
  }, f.needsResizeLayout = function () {
    var t = i(this.element),
        e = this.size && t;
    return e && t.innerWidth !== this.size.innerWidth;
  }, f.addItems = function (t) {
    var e = this._itemize(t);

    return e.length && (this.items = this.items.concat(e)), e;
  }, f.appended = function (t) {
    var e = this.addItems(t);
    e.length && (this.layoutItems(e, !0), this.reveal(e));
  }, f.prepended = function (t) {
    var e = this._itemize(t);

    if (e.length) {
      var i = this.items.slice(0);
      this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
    }
  }, f.reveal = function (t) {
    if (this._emitCompleteOnItems("reveal", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.reveal();
      });
    }
  }, f.hide = function (t) {
    if (this._emitCompleteOnItems("hide", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.hide();
      });
    }
  }, f.revealItemElements = function (t) {
    var e = this.getItems(t);
    this.reveal(e);
  }, f.hideItemElements = function (t) {
    var e = this.getItems(t);
    this.hide(e);
  }, f.getItem = function (t) {
    for (var e = 0; e < this.items.length; e++) {
      var i = this.items[e];
      if (i.element == t) return i;
    }
  }, f.getItems = function (t) {
    t = n.makeArray(t);
    var e = [];
    return t.forEach(function (t) {
      var i = this.getItem(t);
      i && e.push(i);
    }, this), e;
  }, f.remove = function (t) {
    var e = this.getItems(t);
    this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
      t.remove(), n.removeFrom(this.items, t);
    }, this);
  }, f.destroy = function () {
    var t = this.element.style;
    t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
      t.destroy();
    }), this.unbindResize();
    var e = this.element.outlayerGUID;
    delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace);
  }, r.data = function (t) {
    t = n.getQueryElement(t);
    var e = t && t.outlayerGUID;
    return e && c[e];
  }, r.create = function (t, e) {
    var i = s(r);
    return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i;
  };
  var m = {
    ms: 1,
    s: 1e3
  };
  return r.Item = o, r;
}), function (t, e) {
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
}(window, function (t, e) {
  var i = t.create("masonry");
  i.compatOptions.fitWidth = "isFitWidth";
  var n = i.prototype;
  return n._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];

    for (var t = 0; t < this.cols; t++) {
      this.colYs.push(0);
    }

    this.maxY = 0, this.horizontalColIndex = 0;
  }, n.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var t = this.items[0],
          i = t && t.element;
      this.columnWidth = i && e(i).outerWidth || this.containerWidth;
    }

    var n = this.columnWidth += this.gutter,
        o = this.containerWidth + this.gutter,
        r = o / n,
        s = n - o % n,
        a = s && 1 > s ? "round" : "floor";
    r = Math[a](r), this.cols = Math.max(r, 1);
  }, n.getContainerWidth = function () {
    var t = this._getOption("fitWidth"),
        i = t ? this.element.parentNode : this.element,
        n = e(i);

    this.containerWidth = n && n.innerWidth;
  }, n._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth % this.columnWidth,
        i = e && 1 > e ? "round" : "ceil",
        n = Math[i](t.size.outerWidth / this.columnWidth);
    n = Math.min(n, this.cols);

    for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = {
      x: this.columnWidth * r.col,
      y: r.y
    }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++) {
      this.colYs[u] = a;
    }

    return s;
  }, n._getTopColPosition = function (t) {
    var e = this._getTopColGroup(t),
        i = Math.min.apply(Math, e);

    return {
      col: e.indexOf(i),
      y: i
    };
  }, n._getTopColGroup = function (t) {
    if (2 > t) return this.colYs;

    for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
      e[n] = this._getColGroupY(n, t);
    }

    return e;
  }, n._getColGroupY = function (t, e) {
    if (2 > e) return this.colYs[t];
    var i = this.colYs.slice(t, t + e);
    return Math.max.apply(Math, i);
  }, n._getHorizontalColPosition = function (t, e) {
    var i = this.horizontalColIndex % this.cols,
        n = t > 1 && i + t > this.cols;
    i = n ? 0 : i;
    var o = e.size.outerWidth && e.size.outerHeight;
    return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, {
      col: i,
      y: this._getColGroupY(i, t)
    };
  }, n._manageStamp = function (t) {
    var i = e(t),
        n = this._getElementOffset(t),
        o = this._getOption("originLeft"),
        r = o ? n.left : n.right,
        s = r + i.outerWidth,
        a = Math.floor(r / this.columnWidth);

    a = Math.max(0, a);
    var h = Math.floor(s / this.columnWidth);
    h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);

    for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) {
      this.colYs[l] = Math.max(d, this.colYs[l]);
    }
  }, n._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var t = {
      height: this.maxY
    };
    return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
  }, n._getContainerFitWidth = function () {
    for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) {
      t++;
    }

    return (this.cols - t) * this.columnWidth - this.gutter;
  }, n.needsResizeLayout = function () {
    var t = this.containerWidth;
    return this.getContainerWidth(), t != this.containerWidth;
  }, i;
});
/* Anime JS */

/*
 * anime.js v3.2.0
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

!function (n, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : n.anime = e();
}(this, function () {
  "use strict";

  var n = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: "normal",
    autoplay: !0,
    timelineOffset: 0
  },
      e = {
    duration: 1e3,
    delay: 0,
    endDelay: 0,
    easing: "easeOutElastic(1, .5)",
    round: 0
  },
      r = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"],
      t = {
    CSS: {},
    springs: {}
  };

  function a(n, e, r) {
    return Math.min(Math.max(n, e), r);
  }

  function o(n, e) {
    return n.indexOf(e) > -1;
  }

  function u(n, e) {
    return n.apply(null, e);
  }

  var i = {
    arr: function arr(n) {
      return Array.isArray(n);
    },
    obj: function obj(n) {
      return o(Object.prototype.toString.call(n), "Object");
    },
    pth: function pth(n) {
      return i.obj(n) && n.hasOwnProperty("totalLength");
    },
    svg: function svg(n) {
      return n instanceof SVGElement;
    },
    inp: function inp(n) {
      return n instanceof HTMLInputElement;
    },
    dom: function dom(n) {
      return n.nodeType || i.svg(n);
    },
    str: function str(n) {
      return "string" == typeof n;
    },
    fnc: function fnc(n) {
      return "function" == typeof n;
    },
    und: function und(n) {
      return void 0 === n;
    },
    hex: function hex(n) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n);
    },
    rgb: function rgb(n) {
      return /^rgb/.test(n);
    },
    hsl: function hsl(n) {
      return /^hsl/.test(n);
    },
    col: function col(n) {
      return i.hex(n) || i.rgb(n) || i.hsl(n);
    },
    key: function key(r) {
      return !n.hasOwnProperty(r) && !e.hasOwnProperty(r) && "targets" !== r && "keyframes" !== r;
    }
  };

  function c(n) {
    var e = /\(([^)]+)\)/.exec(n);
    return e ? e[1].split(",").map(function (n) {
      return parseFloat(n);
    }) : [];
  }

  function s(n, e) {
    var r = c(n),
        o = a(i.und(r[0]) ? 1 : r[0], .1, 100),
        u = a(i.und(r[1]) ? 100 : r[1], .1, 100),
        s = a(i.und(r[2]) ? 10 : r[2], .1, 100),
        f = a(i.und(r[3]) ? 0 : r[3], .1, 100),
        l = Math.sqrt(u / o),
        d = s / (2 * Math.sqrt(u * o)),
        p = d < 1 ? l * Math.sqrt(1 - d * d) : 0,
        h = 1,
        v = d < 1 ? (d * l - f) / p : -f + l;

    function g(n) {
      var r = e ? e * n / 1e3 : n;
      return r = d < 1 ? Math.exp(-r * d * l) * (h * Math.cos(p * r) + v * Math.sin(p * r)) : (h + v * r) * Math.exp(-r * l), 0 === n || 1 === n ? n : 1 - r;
    }

    return e ? g : function () {
      var e = t.springs[n];
      if (e) return e;

      for (var r = 0, a = 0;;) {
        if (1 === g(r += 1 / 6)) {
          if (++a >= 16) break;
        } else a = 0;
      }

      var o = r * (1 / 6) * 1e3;
      return t.springs[n] = o, o;
    };
  }

  function f(n) {
    return void 0 === n && (n = 10), function (e) {
      return Math.ceil(a(e, 1e-6, 1) * n) * (1 / n);
    };
  }

  var l,
      d,
      p = function () {
    var n = 11,
        e = 1 / (n - 1);

    function r(n, e) {
      return 1 - 3 * e + 3 * n;
    }

    function t(n, e) {
      return 3 * e - 6 * n;
    }

    function a(n) {
      return 3 * n;
    }

    function o(n, e, o) {
      return ((r(e, o) * n + t(e, o)) * n + a(e)) * n;
    }

    function u(n, e, o) {
      return 3 * r(e, o) * n * n + 2 * t(e, o) * n + a(e);
    }

    return function (r, t, a, i) {
      if (0 <= r && r <= 1 && 0 <= a && a <= 1) {
        var c = new Float32Array(n);
        if (r !== t || a !== i) for (var s = 0; s < n; ++s) {
          c[s] = o(s * e, r, a);
        }
        return function (n) {
          return r === t && a === i ? n : 0 === n || 1 === n ? n : o(f(n), t, i);
        };
      }

      function f(t) {
        for (var i = 0, s = 1, f = n - 1; s !== f && c[s] <= t; ++s) {
          i += e;
        }

        var l = i + (t - c[--s]) / (c[s + 1] - c[s]) * e,
            d = u(l, r, a);
        return d >= .001 ? function (n, e, r, t) {
          for (var a = 0; a < 4; ++a) {
            var i = u(e, r, t);
            if (0 === i) return e;
            e -= (o(e, r, t) - n) / i;
          }

          return e;
        }(t, l, r, a) : 0 === d ? l : function (n, e, r, t, a) {
          for (var u, i, c = 0; (u = o(i = e + (r - e) / 2, t, a) - n) > 0 ? r = i : e = i, Math.abs(u) > 1e-7 && ++c < 10;) {
            ;
          }

          return i;
        }(t, i, i + e, r, a);
      }
    };
  }(),
      h = (l = {
    linear: function linear() {
      return function (n) {
        return n;
      };
    }
  }, d = {
    Sine: function Sine() {
      return function (n) {
        return 1 - Math.cos(n * Math.PI / 2);
      };
    },
    Circ: function Circ() {
      return function (n) {
        return 1 - Math.sqrt(1 - n * n);
      };
    },
    Back: function Back() {
      return function (n) {
        return n * n * (3 * n - 2);
      };
    },
    Bounce: function Bounce() {
      return function (n) {
        for (var e, r = 4; n < ((e = Math.pow(2, --r)) - 1) / 11;) {
          ;
        }

        return 1 / Math.pow(4, 3 - r) - 7.5625 * Math.pow((3 * e - 2) / 22 - n, 2);
      };
    },
    Elastic: function Elastic(n, e) {
      void 0 === n && (n = 1), void 0 === e && (e = .5);
      var r = a(n, 1, 10),
          t = a(e, .1, 2);
      return function (n) {
        return 0 === n || 1 === n ? n : -r * Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1 - t / (2 * Math.PI) * Math.asin(1 / r)) * (2 * Math.PI) / t);
      };
    }
  }, ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function (n, e) {
    d[n] = function () {
      return function (n) {
        return Math.pow(n, e + 2);
      };
    };
  }), Object.keys(d).forEach(function (n) {
    var e = d[n];
    l["easeIn" + n] = e, l["easeOut" + n] = function (n, r) {
      return function (t) {
        return 1 - e(n, r)(1 - t);
      };
    }, l["easeInOut" + n] = function (n, r) {
      return function (t) {
        return t < .5 ? e(n, r)(2 * t) / 2 : 1 - e(n, r)(-2 * t + 2) / 2;
      };
    };
  }), l);

  function v(n, e) {
    if (i.fnc(n)) return n;
    var r = n.split("(")[0],
        t = h[r],
        a = c(n);

    switch (r) {
      case "spring":
        return s(n, e);

      case "cubicBezier":
        return u(p, a);

      case "steps":
        return u(f, a);

      default:
        return u(t, a);
    }
  }

  function g(n) {
    try {
      return document.querySelectorAll(n);
    } catch (n) {
      return;
    }
  }

  function m(n, e) {
    for (var r = n.length, t = arguments.length >= 2 ? arguments[1] : void 0, a = [], o = 0; o < r; o++) {
      if (o in n) {
        var u = n[o];
        e.call(t, u, o, n) && a.push(u);
      }
    }

    return a;
  }

  function y(n) {
    return n.reduce(function (n, e) {
      return n.concat(i.arr(e) ? y(e) : e);
    }, []);
  }

  function b(n) {
    return i.arr(n) ? n : (i.str(n) && (n = g(n) || n), n instanceof NodeList || n instanceof HTMLCollection ? [].slice.call(n) : [n]);
  }

  function x(n, e) {
    return n.some(function (n) {
      return n === e;
    });
  }

  function M(n) {
    var e = {};

    for (var r in n) {
      e[r] = n[r];
    }

    return e;
  }

  function w(n, e) {
    var r = M(n);

    for (var t in n) {
      r[t] = e.hasOwnProperty(t) ? e[t] : n[t];
    }

    return r;
  }

  function k(n, e) {
    var r = M(n);

    for (var t in e) {
      r[t] = i.und(n[t]) ? e[t] : n[t];
    }

    return r;
  }

  function O(n) {
    return i.rgb(n) ? (r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e = n)) ? "rgba(" + r[1] + ",1)" : e : i.hex(n) ? (t = n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (n, e, r, t) {
      return e + e + r + r + t + t;
    }), a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t), "rgba(" + parseInt(a[1], 16) + "," + parseInt(a[2], 16) + "," + parseInt(a[3], 16) + ",1)") : i.hsl(n) ? function (n) {
      var e,
          r,
          t,
          a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),
          o = parseInt(a[1], 10) / 360,
          u = parseInt(a[2], 10) / 100,
          i = parseInt(a[3], 10) / 100,
          c = a[4] || 1;

      function s(n, e, r) {
        return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? n + 6 * (e - n) * r : r < .5 ? e : r < 2 / 3 ? n + (e - n) * (2 / 3 - r) * 6 : n;
      }

      if (0 == u) e = r = t = i;else {
        var f = i < .5 ? i * (1 + u) : i + u - i * u,
            l = 2 * i - f;
        e = s(l, f, o + 1 / 3), r = s(l, f, o), t = s(l, f, o - 1 / 3);
      }
      return "rgba(" + 255 * e + "," + 255 * r + "," + 255 * t + "," + c + ")";
    }(n) : void 0;
    var e, r, t, a;
  }

  function C(n) {
    var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n);
    if (e) return e[1];
  }

  function B(n, e) {
    return i.fnc(n) ? n(e.target, e.id, e.total) : n;
  }

  function P(n, e) {
    return n.getAttribute(e);
  }

  function I(n, e, r) {
    if (x([r, "deg", "rad", "turn"], C(e))) return e;
    var a = t.CSS[e + r];
    if (!i.und(a)) return a;
    var o = document.createElement(n.tagName),
        u = n.parentNode && n.parentNode !== document ? n.parentNode : document.body;
    u.appendChild(o), o.style.position = "absolute", o.style.width = 100 + r;
    var c = 100 / o.offsetWidth;
    u.removeChild(o);
    var s = c * parseFloat(e);
    return t.CSS[e + r] = s, s;
  }

  function T(n, e, r) {
    if (e in n.style) {
      var t = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
          a = n.style[e] || getComputedStyle(n).getPropertyValue(t) || "0";
      return r ? I(n, a, r) : a;
    }
  }

  function D(n, e) {
    return i.dom(n) && !i.inp(n) && (P(n, e) || i.svg(n) && n[e]) ? "attribute" : i.dom(n) && x(r, e) ? "transform" : i.dom(n) && "transform" !== e && T(n, e) ? "css" : null != n[e] ? "object" : void 0;
  }

  function E(n) {
    if (i.dom(n)) {
      for (var e, r = n.style.transform || "", t = /(\w+)\(([^)]*)\)/g, a = new Map(); e = t.exec(r);) {
        a.set(e[1], e[2]);
      }

      return a;
    }
  }

  function F(n, e, r, t) {
    var a,
        u = o(e, "scale") ? 1 : 0 + (o(a = e, "translate") || "perspective" === a ? "px" : o(a, "rotate") || o(a, "skew") ? "deg" : void 0),
        i = E(n).get(e) || u;
    return r && (r.transforms.list.set(e, i), r.transforms.last = e), t ? I(n, i, t) : i;
  }

  function N(n, e, r, t) {
    switch (D(n, e)) {
      case "transform":
        return F(n, e, t, r);

      case "css":
        return T(n, e, r);

      case "attribute":
        return P(n, e);

      default:
        return n[e] || 0;
    }
  }

  function A(n, e) {
    var r = /^(\*=|\+=|-=)/.exec(n);
    if (!r) return n;
    var t = C(n) || 0,
        a = parseFloat(e),
        o = parseFloat(n.replace(r[0], ""));

    switch (r[0][0]) {
      case "+":
        return a + o + t;

      case "-":
        return a - o + t;

      case "*":
        return a * o + t;
    }
  }

  function L(n, e) {
    if (i.col(n)) return O(n);
    if (/\s/g.test(n)) return n;
    var r = C(n),
        t = r ? n.substr(0, n.length - r.length) : n;
    return e ? t + e : t;
  }

  function j(n, e) {
    return Math.sqrt(Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2));
  }

  function S(n) {
    for (var e, r = n.points, t = 0, a = 0; a < r.numberOfItems; a++) {
      var o = r.getItem(a);
      a > 0 && (t += j(e, o)), e = o;
    }

    return t;
  }

  function q(n) {
    if (n.getTotalLength) return n.getTotalLength();

    switch (n.tagName.toLowerCase()) {
      case "circle":
        return o = n, 2 * Math.PI * P(o, "r");

      case "rect":
        return 2 * P(a = n, "width") + 2 * P(a, "height");

      case "line":
        return j({
          x: P(t = n, "x1"),
          y: P(t, "y1")
        }, {
          x: P(t, "x2"),
          y: P(t, "y2")
        });

      case "polyline":
        return S(n);

      case "polygon":
        return r = (e = n).points, S(e) + j(r.getItem(r.numberOfItems - 1), r.getItem(0));
    }

    var e, r, t, a, o;
  }

  function $(n, e) {
    var r = e || {},
        t = r.el || function (n) {
      for (var e = n.parentNode; i.svg(e) && i.svg(e.parentNode);) {
        e = e.parentNode;
      }

      return e;
    }(n),
        a = t.getBoundingClientRect(),
        o = P(t, "viewBox"),
        u = a.width,
        c = a.height,
        s = r.viewBox || (o ? o.split(" ") : [0, 0, u, c]);

    return {
      el: t,
      viewBox: s,
      x: s[0] / 1,
      y: s[1] / 1,
      w: u / s[2],
      h: c / s[3]
    };
  }

  function X(n, e) {
    function r(r) {
      void 0 === r && (r = 0);
      var t = e + r >= 1 ? e + r : 0;
      return n.el.getPointAtLength(t);
    }

    var t = $(n.el, n.svg),
        a = r(),
        o = r(-1),
        u = r(1);

    switch (n.property) {
      case "x":
        return (a.x - t.x) * t.w;

      case "y":
        return (a.y - t.y) * t.h;

      case "angle":
        return 180 * Math.atan2(u.y - o.y, u.x - o.x) / Math.PI;
    }
  }

  function Y(n, e) {
    var r = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
        t = L(i.pth(n) ? n.totalLength : n, e) + "";
    return {
      original: t,
      numbers: t.match(r) ? t.match(r).map(Number) : [0],
      strings: i.str(n) || e ? t.split(r) : []
    };
  }

  function Z(n) {
    return m(n ? y(i.arr(n) ? n.map(b) : b(n)) : [], function (n, e, r) {
      return r.indexOf(n) === e;
    });
  }

  function Q(n) {
    var e = Z(n);
    return e.map(function (n, r) {
      return {
        target: n,
        id: r,
        total: e.length,
        transforms: {
          list: E(n)
        }
      };
    });
  }

  function V(n, e) {
    var r = M(e);

    if (/^spring/.test(r.easing) && (r.duration = s(r.easing)), i.arr(n)) {
      var t = n.length;
      2 === t && !i.obj(n[0]) ? n = {
        value: n
      } : i.fnc(e.duration) || (r.duration = e.duration / t);
    }

    var a = i.arr(n) ? n : [n];
    return a.map(function (n, r) {
      var t = i.obj(n) && !i.pth(n) ? n : {
        value: n
      };
      return i.und(t.delay) && (t.delay = r ? 0 : e.delay), i.und(t.endDelay) && (t.endDelay = r === a.length - 1 ? e.endDelay : 0), t;
    }).map(function (n) {
      return k(n, r);
    });
  }

  function z(n, e) {
    var r = [],
        t = e.keyframes;

    for (var a in t && (e = k(function (n) {
      for (var e = m(y(n.map(function (n) {
        return Object.keys(n);
      })), function (n) {
        return i.key(n);
      }).reduce(function (n, e) {
        return n.indexOf(e) < 0 && n.push(e), n;
      }, []), r = {}, t = function t(_t) {
        var a = e[_t];
        r[a] = n.map(function (n) {
          var e = {};

          for (var r in n) {
            i.key(r) ? r == a && (e.value = n[r]) : e[r] = n[r];
          }

          return e;
        });
      }, a = 0; a < e.length; a++) {
        t(a);
      }

      return r;
    }(t), e)), e) {
      i.key(a) && r.push({
        name: a,
        tweens: V(e[a], n)
      });
    }

    return r;
  }

  function H(n, e) {
    var r;
    return n.tweens.map(function (t) {
      var a = function (n, e) {
        var r = {};

        for (var t in n) {
          var a = B(n[t], e);
          i.arr(a) && 1 === (a = a.map(function (n) {
            return B(n, e);
          })).length && (a = a[0]), r[t] = a;
        }

        return r.duration = parseFloat(r.duration), r.delay = parseFloat(r.delay), r;
      }(t, e),
          o = a.value,
          u = i.arr(o) ? o[1] : o,
          c = C(u),
          s = N(e.target, n.name, c, e),
          f = r ? r.to.original : s,
          l = i.arr(o) ? o[0] : f,
          d = C(l) || C(s),
          p = c || d;

      return i.und(u) && (u = f), a.from = Y(l, p), a.to = Y(A(u, l), p), a.start = r ? r.end : 0, a.end = a.start + a.delay + a.duration + a.endDelay, a.easing = v(a.easing, a.duration), a.isPath = i.pth(o), a.isColor = i.col(a.from.original), a.isColor && (a.round = 1), r = a, a;
    });
  }

  var G = {
    css: function css(n, e, r) {
      return n.style[e] = r;
    },
    attribute: function attribute(n, e, r) {
      return n.setAttribute(e, r);
    },
    object: function object(n, e, r) {
      return n[e] = r;
    },
    transform: function transform(n, e, r, t, a) {
      if (t.list.set(e, r), e === t.last || a) {
        var o = "";
        t.list.forEach(function (n, e) {
          o += e + "(" + n + ") ";
        }), n.style.transform = o;
      }
    }
  };

  function R(n, e) {
    Q(n).forEach(function (n) {
      for (var r in e) {
        var t = B(e[r], n),
            a = n.target,
            o = C(t),
            u = N(a, r, o, n),
            i = A(L(t, o || C(u)), u),
            c = D(a, r);
        G[c](a, r, i, n.transforms, !0);
      }
    });
  }

  function W(n, e) {
    return m(y(n.map(function (n) {
      return e.map(function (e) {
        return function (n, e) {
          var r = D(n.target, e.name);

          if (r) {
            var t = H(e, n),
                a = t[t.length - 1];
            return {
              type: r,
              property: e.name,
              animatable: n,
              tweens: t,
              duration: a.end,
              delay: t[0].delay,
              endDelay: a.endDelay
            };
          }
        }(n, e);
      });
    })), function (n) {
      return !i.und(n);
    });
  }

  function J(n, e) {
    var r = n.length,
        t = function t(n) {
      return n.timelineOffset ? n.timelineOffset : 0;
    },
        a = {};

    return a.duration = r ? Math.max.apply(Math, n.map(function (n) {
      return t(n) + n.duration;
    })) : e.duration, a.delay = r ? Math.min.apply(Math, n.map(function (n) {
      return t(n) + n.delay;
    })) : e.delay, a.endDelay = r ? a.duration - Math.max.apply(Math, n.map(function (n) {
      return t(n) + n.duration - n.endDelay;
    })) : e.endDelay, a;
  }

  var K = 0;

  var U,
      _ = [],
      nn = [],
      en = function () {
    function n() {
      U = requestAnimationFrame(e);
    }

    function e(e) {
      var r = _.length;

      if (r) {
        for (var t = 0; t < r;) {
          var a = _[t];

          if (a.paused) {
            var o = _.indexOf(a);

            o > -1 && (_.splice(o, 1), r = _.length);
          } else a.tick(e);

          t++;
        }

        n();
      } else U = cancelAnimationFrame(U);
    }

    return n;
  }();

  function rn(r) {
    void 0 === r && (r = {});
    var t,
        o = 0,
        u = 0,
        i = 0,
        c = 0,
        s = null;

    function f(n) {
      var e = window.Promise && new Promise(function (n) {
        return s = n;
      });
      return n.finished = e, e;
    }

    var l,
        d,
        p,
        h,
        v,
        g,
        y,
        b,
        x = (d = w(n, l = r), p = w(e, l), h = z(p, l), v = Q(l.targets), g = W(v, h), y = J(g, p), b = K, K++, k(d, {
      id: b,
      children: [],
      animatables: v,
      animations: g,
      duration: y.duration,
      delay: y.delay,
      endDelay: y.endDelay
    }));
    f(x);

    function M() {
      var n = x.direction;
      "alternate" !== n && (x.direction = "normal" !== n ? "normal" : "reverse"), x.reversed = !x.reversed, t.forEach(function (n) {
        return n.reversed = x.reversed;
      });
    }

    function O(n) {
      return x.reversed ? x.duration - n : n;
    }

    function C() {
      o = 0, u = O(x.currentTime) * (1 / rn.speed);
    }

    function B(n, e) {
      e && e.seek(n - e.timelineOffset);
    }

    function P(n) {
      for (var e = 0, r = x.animations, t = r.length; e < t;) {
        var o = r[e],
            u = o.animatable,
            i = o.tweens,
            c = i.length - 1,
            s = i[c];
        c && (s = m(i, function (e) {
          return n < e.end;
        })[0] || s);

        for (var f = a(n - s.start - s.delay, 0, s.duration) / s.duration, l = isNaN(f) ? 1 : s.easing(f), d = s.to.strings, p = s.round, h = [], v = s.to.numbers.length, g = void 0, y = 0; y < v; y++) {
          var b = void 0,
              M = s.to.numbers[y],
              w = s.from.numbers[y] || 0;
          b = s.isPath ? X(s.value, l * M) : w + l * (M - w), p && (s.isColor && y > 2 || (b = Math.round(b * p) / p)), h.push(b);
        }

        var k = d.length;

        if (k) {
          g = d[0];

          for (var O = 0; O < k; O++) {
            d[O];
            var C = d[O + 1],
                B = h[O];
            isNaN(B) || (g += C ? B + C : B + " ");
          }
        } else g = h[0];

        G[o.type](u.target, o.property, g, u.transforms), o.currentValue = g, e++;
      }
    }

    function I(n) {
      x[n] && !x.passThrough && x[n](x);
    }

    function T(n) {
      var e = x.duration,
          r = x.delay,
          l = e - x.endDelay,
          d = O(n);
      x.progress = a(d / e * 100, 0, 100), x.reversePlayback = d < x.currentTime, t && function (n) {
        if (x.reversePlayback) for (var e = c; e--;) {
          B(n, t[e]);
        } else for (var r = 0; r < c; r++) {
          B(n, t[r]);
        }
      }(d), !x.began && x.currentTime > 0 && (x.began = !0, I("begin")), !x.loopBegan && x.currentTime > 0 && (x.loopBegan = !0, I("loopBegin")), d <= r && 0 !== x.currentTime && P(0), (d >= l && x.currentTime !== e || !e) && P(e), d > r && d < l ? (x.changeBegan || (x.changeBegan = !0, x.changeCompleted = !1, I("changeBegin")), I("change"), P(d)) : x.changeBegan && (x.changeCompleted = !0, x.changeBegan = !1, I("changeComplete")), x.currentTime = a(d, 0, e), x.began && I("update"), n >= e && (u = 0, x.remaining && !0 !== x.remaining && x.remaining--, x.remaining ? (o = i, I("loopComplete"), x.loopBegan = !1, "alternate" === x.direction && M()) : (x.paused = !0, x.completed || (x.completed = !0, I("loopComplete"), I("complete"), !x.passThrough && "Promise" in window && (s(), f(x)))));
    }

    return x.reset = function () {
      var n = x.direction;
      x.passThrough = !1, x.currentTime = 0, x.progress = 0, x.paused = !0, x.began = !1, x.loopBegan = !1, x.changeBegan = !1, x.completed = !1, x.changeCompleted = !1, x.reversePlayback = !1, x.reversed = "reverse" === n, x.remaining = x.loop, t = x.children;

      for (var e = c = t.length; e--;) {
        x.children[e].reset();
      }

      (x.reversed && !0 !== x.loop || "alternate" === n && 1 === x.loop) && x.remaining++, P(x.reversed ? x.duration : 0);
    }, x.set = function (n, e) {
      return R(n, e), x;
    }, x.tick = function (n) {
      i = n, o || (o = i), T((i + (u - o)) * rn.speed);
    }, x.seek = function (n) {
      T(O(n));
    }, x.pause = function () {
      x.paused = !0, C();
    }, x.play = function () {
      x.paused && (x.completed && x.reset(), x.paused = !1, _.push(x), C(), U || en());
    }, x.reverse = function () {
      M(), x.completed = !x.reversed, C();
    }, x.restart = function () {
      x.reset(), x.play();
    }, x.reset(), x.autoplay && x.play(), x;
  }

  function tn(n, e) {
    for (var r = e.length; r--;) {
      x(n, e[r].animatable.target) && e.splice(r, 1);
    }
  }

  return "undefined" != typeof document && document.addEventListener("visibilitychange", function () {
    document.hidden ? (_.forEach(function (n) {
      return n.pause();
    }), nn = _.slice(0), rn.running = _ = []) : nn.forEach(function (n) {
      return n.play();
    });
  }), rn.version = "3.2.0", rn.speed = 1, rn.running = _, rn.remove = function (n) {
    for (var e = Z(n), r = _.length; r--;) {
      var t = _[r],
          a = t.animations,
          o = t.children;
      tn(e, a);

      for (var u = o.length; u--;) {
        var i = o[u],
            c = i.animations;
        tn(e, c), c.length || i.children.length || o.splice(u, 1);
      }

      a.length || o.length || t.pause();
    }
  }, rn.get = N, rn.set = R, rn.convertPx = I, rn.path = function (n, e) {
    var r = i.str(n) ? g(n)[0] : n,
        t = e || 100;
    return function (n) {
      return {
        property: n,
        el: r,
        svg: $(r),
        totalLength: q(r) * (t / 100)
      };
    };
  }, rn.setDashoffset = function (n) {
    var e = q(n);
    return n.setAttribute("stroke-dasharray", e), e;
  }, rn.stagger = function (n, e) {
    void 0 === e && (e = {});
    var r = e.direction || "normal",
        t = e.easing ? v(e.easing) : null,
        a = e.grid,
        o = e.axis,
        u = e.from || 0,
        c = "first" === u,
        s = "center" === u,
        f = "last" === u,
        l = i.arr(n),
        d = l ? parseFloat(n[0]) : parseFloat(n),
        p = l ? parseFloat(n[1]) : 0,
        h = C(l ? n[1] : n) || 0,
        g = e.start || 0 + (l ? d : 0),
        m = [],
        y = 0;
    return function (n, e, i) {
      if (c && (u = 0), s && (u = (i - 1) / 2), f && (u = i - 1), !m.length) {
        for (var v = 0; v < i; v++) {
          if (a) {
            var b = s ? (a[0] - 1) / 2 : u % a[0],
                x = s ? (a[1] - 1) / 2 : Math.floor(u / a[0]),
                M = b - v % a[0],
                w = x - Math.floor(v / a[0]),
                k = Math.sqrt(M * M + w * w);
            "x" === o && (k = -M), "y" === o && (k = -w), m.push(k);
          } else m.push(Math.abs(u - v));

          y = Math.max.apply(Math, m);
        }

        t && (m = m.map(function (n) {
          return t(n / y) * y;
        })), "reverse" === r && (m = m.map(function (n) {
          return o ? n < 0 ? -1 * n : -n : Math.abs(y - n);
        }));
      }

      return g + (l ? (p - d) / y : d) * (Math.round(100 * m[e]) / 100) + h;
    };
  }, rn.timeline = function (n) {
    void 0 === n && (n = {});
    var r = rn(n);
    return r.duration = 0, r.add = function (t, a) {
      var o = _.indexOf(r),
          u = r.children;

      function c(n) {
        n.passThrough = !0;
      }

      o > -1 && _.splice(o, 1);

      for (var s = 0; s < u.length; s++) {
        c(u[s]);
      }

      var f = k(t, w(e, n));
      f.targets = f.targets || n.targets;
      var l = r.duration;
      f.autoplay = !1, f.direction = r.direction, f.timelineOffset = i.und(a) ? l : A(a, l), c(r), r.seek(f.timelineOffset);
      var d = rn(f);
      c(d), u.push(d);
      var p = J(u, n);
      return r.delay = p.delay, r.endDelay = p.endDelay, r.duration = p.duration, r.seek(0), r.reset(), r.autoplay && r.play(), r;
    }, r;
  }, rn.easing = v, rn.penner = h, rn.random = function (n, e) {
    return Math.floor(Math.random() * (e - n + 1)) + n;
  }, rn;
});
/* Jquery Splitlines */

/**
 * Splits new lines of text into separate divs
 *
 * ### Options:
 * - `width` string The width of the box. By default, it tries to use the
 *	 element's width. If you don't define a width, there's no way to split it
 *	 by lines!
 *	- `tag` string The tag to wrap the lines in
 *	- `keepHtml` boolean Whether or not to try and preserve the html within
 *	 the element. Default is true
 *
 *	@param options object The options object
 *	@license MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

(function ($) {
  /**
   * Creates a temporary clone
   *
   * @param element element The element to clone
   */
  function _createTemp(element) {
    return element.clone().css({
      position: 'absolute'
    });
  }

  ;
  /**
   * Splits contents into words, keeping their original Html tag. Note that this
   * tags *each* word with the tag it was found in, so when the wrapping begins
   * the tags stay intact. This may have an effect on your styles (say, if you have
   * margin, each word will inherit those styles).
   *
   * @param node contents The contents
   */

  function _splitHtmlWords(contents) {
    var words = [];
    var splitContent;

    for (var c = 0; c < contents.length; c++) {
      if (contents[c].nodeName === 'BR') {
        words.push('<br>');
        continue;
      }

      if (contents[c].nodeType == 3) {
        splitContent = _splitWords(contents[c].textContent || contents[c].toString());
      } else {
        var tag = $(contents[c]).clone();
        splitContent = _splitHtmlWords(tag.contents());

        for (var t = 0; t < splitContent.length; t++) {
          tag.empty();
          splitContent[t] = tag.html(splitContent[t]).wrap('<p></p>').parent().html();
        }
      }

      for (var w = 0; w < splitContent.length; w++) {
        if (splitContent[w] === '') {
          continue;
        }

        words.push(splitContent[w]);
      }
    }

    return words;
  }

  ;
  /**
   * Splits words by spaces
   *
   * @param string text The text to split
   */

  function _splitWords(text) {
    return text.split(/\s+/);
  }
  /**
   * Formats html with tags and wrappers.
   *
   * @param tag
   * @param html content wrapped by the tag
   * @param index Current line index
   */


  function _markupContent(tag, html, index) {
    // wrap in a temp div so .html() gives us the tags we specify
    tag = '<div class="stop">' + tag; // find the deepest child, add html, then find the parent

    var $outer = $(tag).find('*:not(:has("*"))').html(html).closest('.stop').slice(-1); // jQuery does not support setting CSS vars until 3.2, so manually set them
    // $outer.children().each(function (i, element) {
    // 	element.style.setProperty('--line-index', index);
    // });

    return $outer.html();
  }
  /**
   * The jQuery plugin function. See the top of this file for information on the
   * options
   */


  $.fn.splitLines = function (options) {
    var settings = {
      width: 'auto',
      tag: '<div>',
      wrap: '',
      keepHtml: true
    };

    if (options) {
      $.extend(settings, options);
    }

    var newHtml = _createTemp(this);

    var contents = this.contents();
    var text = this.text();
    this.append(newHtml);
    newHtml.text('42');
    var maxHeight = newHtml.height() + 2;
    newHtml.empty();

    var tempLine = _createTemp(newHtml);

    var width = settings.width;

    if (settings.width === 'auto') {
      width = this[0].offsetWidth;
    }

    tempLine.width(width);
    this.append(tempLine);
    var words = settings.keepHtml ? _splitHtmlWords(contents) : _splitWords(text);
    var prev;
    var lineCount = 0;

    for (var w = 0; w < words.length; w++) {
      var html = tempLine.html();
      tempLine.html(html + words[w] + ' ');

      if (tempLine.html() == prev) {
        // repeating word, it will never fit so just use it instead of failing
        prev = '';
        newHtml.append(_markupContent(settings.tag, tempLine.html(), lineCount));
        tempLine.html('');
        continue;
      }

      if (tempLine.height() > maxHeight) {
        prev = tempLine.html();
        tempLine.html(html);
        newHtml.append(_markupContent(settings.tag, tempLine.html(), lineCount));
        tempLine.html('');
        w--;
        lineCount++;
      }
    }

    newHtml.append(_markupContent(settings.tag, tempLine.html(), lineCount));
    this.html(newHtml.html());
  };
})(jQuery);
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


!function (e, t) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.EvEmitter = t();
}("undefined" != typeof window ? window : this, function () {
  function e() {}

  var t = e.prototype;
  return t.on = function (e, t) {
    if (e && t) {
      var i = this._events = this._events || {},
          n = i[e] = i[e] || [];
      return n.indexOf(t) == -1 && n.push(t), this;
    }
  }, t.once = function (e, t) {
    if (e && t) {
      this.on(e, t);
      var i = this._onceEvents = this._onceEvents || {},
          n = i[e] = i[e] || {};
      return n[t] = !0, this;
    }
  }, t.off = function (e, t) {
    var i = this._events && this._events[e];

    if (i && i.length) {
      var n = i.indexOf(t);
      return n != -1 && i.splice(n, 1), this;
    }
  }, t.emitEvent = function (e, t) {
    var i = this._events && this._events[e];

    if (i && i.length) {
      i = i.slice(0), t = t || [];

      for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
        var r = i[o],
            s = n && n[r];
        s && (this.off(e, r), delete n[r]), r.apply(this, t);
      }

      return this;
    }
  }, t.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, e;
}), function (e, t) {
  "use strict";

  "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
    return t(e, i);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter);
}("undefined" != typeof window ? window : this, function (e, t) {
  function i(e, t) {
    for (var i in t) {
      e[i] = t[i];
    }

    return e;
  }

  function n(e) {
    if (Array.isArray(e)) return e;
    var t = "object" == _typeof(e) && "number" == typeof e.length;
    return t ? d.call(e) : [e];
  }

  function o(e, t, r) {
    if (!(this instanceof o)) return new o(e, t, r);
    var s = e;
    return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred()), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e));
  }

  function r(e) {
    this.img = e;
  }

  function s(e, t) {
    this.url = e, this.element = t, this.img = new Image();
  }

  var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;
  o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  }, o.prototype.addElementImages = function (e) {
    "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
    var t = e.nodeType;

    if (t && u[t]) {
      for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var o = i[n];
        this.addImage(o);
      }

      if ("string" == typeof this.options.background) {
        var r = e.querySelectorAll(this.options.background);

        for (n = 0; n < r.length; n++) {
          var s = r[n];
          this.addElementBackgroundImages(s);
        }
      }
    }
  };
  var u = {
    1: !0,
    9: !0,
    11: !0
  };
  return o.prototype.addElementBackgroundImages = function (e) {
    var t = getComputedStyle(e);
    if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
      var o = n && n[2];
      o && this.addBackground(o, e), n = i.exec(t.backgroundImage);
    }
  }, o.prototype.addImage = function (e) {
    var t = new r(e);
    this.images.push(t);
  }, o.prototype.addBackground = function (e, t) {
    var i = new s(e, t);
    this.images.push(i);
  }, o.prototype.check = function () {
    function e(e, i, n) {
      setTimeout(function () {
        t.progress(e, i, n);
      });
    }

    var t = this;
    return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
      t.once("progress", e), t.check();
    }) : void this.complete();
  }, o.prototype.progress = function (e, t, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t);
  }, o.prototype.complete = function () {
    var e = this.hasAnyBroken ? "fail" : "done";

    if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var t = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[t](this);
    }
  }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
    var e = this.getIsImageComplete();
    return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src));
  }, r.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, r.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emitEvent("progress", [this, this.img, t]);
  }, r.prototype.handleEvent = function (e) {
    var t = "on" + e.type;
    this[t] && this[t](e);
  }, r.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, r.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, r.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
    var e = this.getIsImageComplete();
    e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, s.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emitEvent("progress", [this, this.element, t]);
  }, o.makeJQueryPlugin = function (t) {
    t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
      var i = new o(this, e, t);
      return i.jqDeferred.promise(h(this));
    });
  }, o.makeJQueryPlugin(), o;
});
},{"jquery":"juYr","desandro-matches-selector":"PZ9L","ev-emitter":"BQvw","get-size":"SpQD","fizzy-ui-utils":"PmK6","outlayer":"k1dT"}]},{},["yKV9"], null)