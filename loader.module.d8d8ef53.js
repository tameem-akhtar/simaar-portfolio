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
})({"SevE":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (e, t) {
  "use strict";

  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e);
  } : t(e);
}("undefined" != typeof window ? window : this, function (C, e) {
  "use strict";

  var t = [],
      r = Object.getPrototypeOf,
      s = t.slice,
      g = t.flat ? function (e) {
    return t.flat.call(e);
  } : function (e) {
    return t.concat.apply([], e);
  },
      u = t.push,
      i = t.indexOf,
      n = {},
      o = n.toString,
      v = n.hasOwnProperty,
      a = v.toString,
      l = a.call(Object),
      y = {},
      m = function m(e) {
    return "function" == typeof e && "number" != typeof e.nodeType;
  },
      x = function x(e) {
    return null != e && e === e.window;
  },
      E = C.document,
      c = {
    type: !0,
    src: !0,
    nonce: !0,
    noModule: !0
  };

  function b(e, t, n) {
    var r,
        i,
        o = (n = n || E).createElement("script");
    if (o.text = e, t) for (r in c) {
      (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
    }
    n.head.appendChild(o).parentNode.removeChild(o);
  }

  function w(e) {
    return null == e ? e + "" : "object" == _typeof(e) || "function" == typeof e ? n[o.call(e)] || "object" : _typeof(e);
  }

  var f = "3.5.1",
      S = function S(e, t) {
    return new S.fn.init(e, t);
  };

  function p(e) {
    var t = !!e && "length" in e && e.length,
        n = w(e);
    return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
  }

  S.fn = S.prototype = {
    jquery: f,
    constructor: S,
    length: 0,
    toArray: function toArray() {
      return s.call(this);
    },
    get: function get(e) {
      return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function pushStack(e) {
      var t = S.merge(this.constructor(), e);
      return t.prevObject = this, t;
    },
    each: function each(e) {
      return S.each(this, e);
    },
    map: function map(n) {
      return this.pushStack(S.map(this, function (e, t) {
        return n.call(e, t, e);
      }));
    },
    slice: function slice() {
      return this.pushStack(s.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    even: function even() {
      return this.pushStack(S.grep(this, function (e, t) {
        return (t + 1) % 2;
      }));
    },
    odd: function odd() {
      return this.pushStack(S.grep(this, function (e, t) {
        return t % 2;
      }));
    },
    eq: function eq(e) {
      var t = this.length,
          n = +e + (e < 0 ? t : 0);
      return this.pushStack(0 <= n && n < t ? [this[n]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    push: u,
    sort: t.sort,
    splice: t.splice
  }, S.extend = S.fn.extend = function () {
    var e,
        t,
        n,
        r,
        i,
        o,
        a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        l = !1;

    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == _typeof(a) || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
      if (null != (e = arguments[s])) for (t in e) {
        r = e[t], "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}, i = !1, a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
      }
    }

    return a;
  }, S.extend({
    expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function error(e) {
      throw new Error(e);
    },
    noop: function noop() {},
    isPlainObject: function isPlainObject(e) {
      var t, n;
      return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l);
    },
    isEmptyObject: function isEmptyObject(e) {
      var t;

      for (t in e) {
        return !1;
      }

      return !0;
    },
    globalEval: function globalEval(e, t, n) {
      b(e, {
        nonce: t && t.nonce
      }, n);
    },
    each: function each(e, t) {
      var n,
          r = 0;

      if (p(e)) {
        for (n = e.length; r < n; r++) {
          if (!1 === t.call(e[r], r, e[r])) break;
        }
      } else for (r in e) {
        if (!1 === t.call(e[r], r, e[r])) break;
      }

      return e;
    },
    makeArray: function makeArray(e, t) {
      var n = t || [];
      return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n;
    },
    inArray: function inArray(e, t, n) {
      return null == t ? -1 : i.call(t, e, n);
    },
    merge: function merge(e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n; r++) {
        e[i++] = t[r];
      }

      return e.length = i, e;
    },
    grep: function grep(e, t, n) {
      for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) {
        !t(e[i], i) !== a && r.push(e[i]);
      }

      return r;
    },
    map: function map(e, t, n) {
      var r,
          i,
          o = 0,
          a = [];
      if (p(e)) for (r = e.length; o < r; o++) {
        null != (i = t(e[o], o, n)) && a.push(i);
      } else for (o in e) {
        null != (i = t(e[o], o, n)) && a.push(i);
      }
      return g(a);
    },
    guid: 1,
    support: y
  }), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    n["[object " + t + "]"] = t.toLowerCase();
  });

  var d = function (n) {
    var e,
        d,
        b,
        o,
        i,
        h,
        f,
        g,
        w,
        u,
        l,
        T,
        C,
        a,
        E,
        v,
        s,
        c,
        y,
        S = "sizzle" + 1 * new Date(),
        p = n.document,
        k = 0,
        r = 0,
        m = ue(),
        x = ue(),
        A = ue(),
        N = ue(),
        D = function D(e, t) {
      return e === t && (l = !0), 0;
    },
        j = {}.hasOwnProperty,
        t = [],
        q = t.pop,
        L = t.push,
        H = t.push,
        O = t.slice,
        P = function P(e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        if (e[n] === t) return n;
      }

      return -1;
    },
        R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        M = "[\\x20\\t\\r\\n\\f]",
        I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]",
        F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
        B = new RegExp(M + "+", "g"),
        $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
        _ = new RegExp("^" + M + "*," + M + "*"),
        z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
        U = new RegExp(M + "|>"),
        X = new RegExp(F),
        V = new RegExp("^" + I + "$"),
        G = {
      ID: new RegExp("^#(" + I + ")"),
      CLASS: new RegExp("^\\.(" + I + ")"),
      TAG: new RegExp("^(" + I + "|[*])"),
      ATTR: new RegExp("^" + W),
      PSEUDO: new RegExp("^" + F),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + R + ")$", "i"),
      needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
    },
        Y = /HTML$/i,
        Q = /^(?:input|select|textarea|button)$/i,
        J = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ee = /[+~]/,
        te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"),
        ne = function ne(e, t) {
      var n = "0x" + e.slice(1) - 65536;
      return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
    },
        re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ie = function ie(e, t) {
      return t ? "\0" === e ? "\uFFFD" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
    },
        oe = function oe() {
      T();
    },
        ae = be(function (e) {
      return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
    }, {
      dir: "parentNode",
      next: "legend"
    });

    try {
      H.apply(t = O.call(p.childNodes), p.childNodes), t[p.childNodes.length].nodeType;
    } catch (e) {
      H = {
        apply: t.length ? function (e, t) {
          L.apply(e, O.call(t));
        } : function (e, t) {
          var n = e.length,
              r = 0;

          while (e[n++] = t[r++]) {
            ;
          }

          e.length = n - 1;
        }
      };
    }

    function se(t, e, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = e && e.ownerDocument,
          p = e ? e.nodeType : 9;
      if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;

      if (!r && (T(e), e = e || C, E)) {
        if (11 !== p && (u = Z.exec(t))) if (i = u[1]) {
          if (9 === p) {
            if (!(a = e.getElementById(i))) return n;
            if (a.id === i) return n.push(a), n;
          } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n;
        } else {
          if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
          if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), n;
        }

        if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
          if (c = t, f = e, 1 === p && (U.test(t) || z.test(t))) {
            (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)), o = (l = h(t)).length;

            while (o--) {
              l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
            }

            c = l.join(",");
          }

          try {
            return H.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            N(t, !0);
          } finally {
            s === S && e.removeAttribute("id");
          }
        }
      }

      return g(t.replace($, "$1"), e, n, r);
    }

    function ue() {
      var r = [];
      return function e(t, n) {
        return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n;
      };
    }

    function le(e) {
      return e[S] = !0, e;
    }

    function ce(e) {
      var t = C.createElement("fieldset");

      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }

    function fe(e, t) {
      var n = e.split("|"),
          r = n.length;

      while (r--) {
        b.attrHandle[n[r]] = t;
      }
    }

    function pe(e, t) {
      var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
      if (r) return r;
      if (n) while (n = n.nextSibling) {
        if (n === t) return -1;
      }
      return e ? 1 : -1;
    }

    function de(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }

    function he(n) {
      return function (e) {
        var t = e.nodeName.toLowerCase();
        return ("input" === t || "button" === t) && e.type === n;
      };
    }

    function ge(t) {
      return function (e) {
        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t;
      };
    }

    function ve(a) {
      return le(function (o) {
        return o = +o, le(function (e, t) {
          var n,
              r = a([], e.length, o),
              i = r.length;

          while (i--) {
            e[n = r[i]] && (e[n] = !(t[n] = e[n]));
          }
        });
      });
    }

    function ye(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }

    for (e in d = se.support = {}, i = se.isXML = function (e) {
      var t = e.namespaceURI,
          n = (e.ownerDocument || e).documentElement;
      return !Y.test(t || n && n.nodeName || "HTML");
    }, T = se.setDocument = function (e) {
      var t,
          n,
          r = e ? e.ownerDocument || e : p;
      return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), d.scope = ce(function (e) {
        return a.appendChild(e).appendChild(C.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
      }), d.attributes = ce(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), d.getElementsByTagName = ce(function (e) {
        return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length;
      }), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce(function (e) {
        return a.appendChild(e).id = S, !C.getElementsByName || !C.getElementsByName(S).length;
      }), d.getById ? (b.filter.ID = function (e) {
        var t = e.replace(te, ne);
        return function (e) {
          return e.getAttribute("id") === t;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && E) {
          var n = t.getElementById(e);
          return n ? [n] : [];
        }
      }) : (b.filter.ID = function (e) {
        var n = e.replace(te, ne);
        return function (e) {
          var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
          return t && t.value === n;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && E) {
          var n,
              r,
              i,
              o = t.getElementById(e);

          if (o) {
            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            i = t.getElementsByName(e), r = 0;

            while (o = i[r++]) {
              if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            }
          }

          return [];
        }
      }), b.find.TAG = d.getElementsByTagName ? function (e, t) {
        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0;
      } : function (e, t) {
        var n,
            r = [],
            i = 0,
            o = t.getElementsByTagName(e);

        if ("*" === e) {
          while (n = o[i++]) {
            1 === n.nodeType && r.push(n);
          }

          return r;
        }

        return o;
      }, b.find.CLASS = d.getElementsByClassName && function (e, t) {
        if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e);
      }, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce(function (e) {
        var t;
        a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), (t = C.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]");
      }), ce(function (e) {
        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
        var t = C.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:");
      })), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function (e) {
        d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", F);
      }), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
      } : function (e, t) {
        if (t) while (t = t.parentNode) {
          if (t === e) return !0;
        }
        return !1;
      }, D = t ? function (e, t) {
        if (e === t) return l = !0, 0;
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1);
      } : function (e, t) {
        if (e === t) return l = !0, 0;
        var n,
            r = 0,
            i = e.parentNode,
            o = t.parentNode,
            a = [e],
            s = [t];
        if (!i || !o) return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
        if (i === o) return pe(e, t);
        n = e;

        while (n = n.parentNode) {
          a.unshift(n);
        }

        n = t;

        while (n = n.parentNode) {
          s.unshift(n);
        }

        while (a[r] === s[r]) {
          r++;
        }

        return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0;
      }), C;
    }, se.matches = function (e, t) {
      return se(e, null, null, t);
    }, se.matchesSelector = function (e, t) {
      if (T(e), d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try {
        var n = c.call(e, t);
        if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
      } catch (e) {
        N(t, !0);
      }
      return 0 < se(t, C, null, [e]).length;
    }, se.contains = function (e, t) {
      return (e.ownerDocument || e) != C && T(e), y(e, t);
    }, se.attr = function (e, t) {
      (e.ownerDocument || e) != C && T(e);
      var n = b.attrHandle[t.toLowerCase()],
          r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
      return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }, se.escape = function (e) {
      return (e + "").replace(re, ie);
    }, se.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, se.uniqueSort = function (e) {
      var t,
          n = [],
          r = 0,
          i = 0;

      if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(D), l) {
        while (t = e[i++]) {
          t === e[i] && (r = n.push(i));
        }

        while (r--) {
          e.splice(n[r], 1);
        }
      }

      return u = null, e;
    }, o = se.getText = function (e) {
      var t,
          n = "",
          r = 0,
          i = e.nodeType;

      if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ("string" == typeof e.textContent) return e.textContent;

          for (e = e.firstChild; e; e = e.nextSibling) {
            n += o(e);
          }
        } else if (3 === i || 4 === i) return e.nodeValue;
      } else while (t = e[r++]) {
        n += o(t);
      }

      return n;
    }, (b = se.selectors = {
      cacheLength: 50,
      createPseudo: le,
      match: G,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function ATTR(e) {
          return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        },
        CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e;
        },
        PSEUDO: function PSEUDO(e) {
          var t,
              n = !e[6] && e[2];
          return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        }
      },
      filter: {
        TAG: function TAG(e) {
          var t = e.replace(te, ne).toLowerCase();
          return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        },
        CLASS: function CLASS(e) {
          var t = m[e + " "];
          return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function (e) {
            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(n, r, i) {
          return function (e) {
            var t = se.attr(e, n);
            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"));
          };
        },
        CHILD: function CHILD(h, e, t, g, v) {
          var y = "nth" !== h.slice(0, 3),
              m = "last" !== h.slice(-4),
              x = "of-type" === e;
          return 1 === g && 0 === v ? function (e) {
            return !!e.parentNode;
          } : function (e, t, n) {
            var r,
                i,
                o,
                a,
                s,
                u,
                l = y !== m ? "nextSibling" : "previousSibling",
                c = e.parentNode,
                f = x && e.nodeName.toLowerCase(),
                p = !n && !x,
                d = !1;

            if (c) {
              if (y) {
                while (l) {
                  a = e;

                  while (a = a[l]) {
                    if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                  }

                  u = l = "only" === h && !u && "nextSibling";
                }

                return !0;
              }

              if (u = [m ? c.firstChild : c.lastChild], m && p) {
                d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2], a = s && c.childNodes[s];

                while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) {
                  if (1 === a.nodeType && ++d && a === e) {
                    i[h] = [k, s, d];
                    break;
                  }
                }
              } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]), !1 === d) while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) {
                if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]), a === e)) break;
              }

              return (d -= v) === g || d % g == 0 && 0 <= d / g;
            }
          };
        },
        PSEUDO: function PSEUDO(e, o) {
          var t,
              a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
          return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function (e, t) {
            var n,
                r = a(e, o),
                i = r.length;

            while (i--) {
              e[n = P(e, r[i])] = !(t[n] = r[i]);
            }
          }) : function (e) {
            return a(e, 0, t);
          }) : a;
        }
      },
      pseudos: {
        not: le(function (e) {
          var r = [],
              i = [],
              s = f(e.replace($, "$1"));
          return s[S] ? le(function (e, t, n, r) {
            var i,
                o = s(e, null, r, []),
                a = e.length;

            while (a--) {
              (i = o[a]) && (e[a] = !(t[a] = i));
            }
          }) : function (e, t, n) {
            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop();
          };
        }),
        has: le(function (t) {
          return function (e) {
            return 0 < se(t, e).length;
          };
        }),
        contains: le(function (t) {
          return t = t.replace(te, ne), function (e) {
            return -1 < (e.textContent || o(e)).indexOf(t);
          };
        }),
        lang: le(function (n) {
          return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(), function (e) {
            var t;

            do {
              if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
            } while ((e = e.parentNode) && 1 === e.nodeType);

            return !1;
          };
        }),
        target: function target(e) {
          var t = n.location && n.location.hash;
          return t && t.slice(1) === e.id;
        },
        root: function root(e) {
          return e === a;
        },
        focus: function focus(e) {
          return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        },
        enabled: ge(!1),
        disabled: ge(!0),
        checked: function checked(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected;
        },
        selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeType < 6) return !1;
          }

          return !0;
        },
        parent: function parent(e) {
          return !b.pseudos.empty(e);
        },
        header: function header(e) {
          return J.test(e.nodeName);
        },
        input: function input(e) {
          return Q.test(e.nodeName);
        },
        button: function button(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t;
        },
        text: function text(e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
        },
        first: ve(function () {
          return [0];
        }),
        last: ve(function (e, t) {
          return [t - 1];
        }),
        eq: ve(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: ve(function (e, t) {
          for (var n = 0; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        odd: ve(function (e, t) {
          for (var n = 1; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        lt: ve(function (e, t, n) {
          for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) {
            e.push(r);
          }

          return e;
        }),
        gt: ve(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) {
            e.push(r);
          }

          return e;
        })
      }
    }).pseudos.nth = b.pseudos.eq, {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      b.pseudos[e] = de(e);
    }

    for (e in {
      submit: !0,
      reset: !0
    }) {
      b.pseudos[e] = he(e);
    }

    function me() {}

    function xe(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) {
        r += e[t].value;
      }

      return r;
    }

    function be(s, e, t) {
      var u = e.dir,
          l = e.next,
          c = l || u,
          f = t && "parentNode" === c,
          p = r++;
      return e.first ? function (e, t, n) {
        while (e = e[u]) {
          if (1 === e.nodeType || f) return s(e, t, n);
        }

        return !1;
      } : function (e, t, n) {
        var r,
            i,
            o,
            a = [k, p];

        if (n) {
          while (e = e[u]) {
            if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
          }
        } else while (e = e[u]) {
          if (1 === e.nodeType || f) if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e;else {
            if ((r = i[c]) && r[0] === k && r[1] === p) return a[2] = r[2];
            if ((i[c] = a)[2] = s(e, t, n)) return !0;
          }
        }

        return !1;
      };
    }

    function we(i) {
      return 1 < i.length ? function (e, t, n) {
        var r = i.length;

        while (r--) {
          if (!i[r](e, t, n)) return !1;
        }

        return !0;
      } : i[0];
    }

    function Te(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
        (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
      }

      return a;
    }

    function Ce(d, h, g, v, y, e) {
      return v && !v[S] && (v = Ce(v)), y && !y[S] && (y = Ce(y, e)), le(function (e, t, n, r) {
        var i,
            o,
            a,
            s = [],
            u = [],
            l = t.length,
            c = e || function (e, t, n) {
          for (var r = 0, i = t.length; r < i; r++) {
            se(e, t[r], n);
          }

          return n;
        }(h || "*", n.nodeType ? [n] : n, []),
            f = !d || !e && h ? c : Te(c, s, d, n, r),
            p = g ? y || (e ? d : l || v) ? [] : t : f;

        if (g && g(f, p, n, r), v) {
          i = Te(p, u), v(i, [], n, r), o = i.length;

          while (o--) {
            (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
          }
        }

        if (e) {
          if (y || d) {
            if (y) {
              i = [], o = p.length;

              while (o--) {
                (a = p[o]) && i.push(f[o] = a);
              }

              y(null, p = [], i, r);
            }

            o = p.length;

            while (o--) {
              (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a));
            }
          }
        } else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p);
      });
    }

    function Ee(e) {
      for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function (e) {
        return e === i;
      }, a, !0), l = be(function (e) {
        return -1 < P(i, e);
      }, a, !0), c = [function (e, t, n) {
        var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
        return i = null, r;
      }]; s < r; s++) {
        if (t = b.relative[e[s].type]) c = [be(we(c), t)];else {
          if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
            for (n = ++s; n < r; n++) {
              if (b.relative[e[n].type]) break;
            }

            return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
              value: " " === e[s - 2].type ? "*" : ""
            })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e));
          }

          c.push(t);
        }
      }

      return we(c);
    }

    return me.prototype = b.filters = b.pseudos, b.setFilters = new me(), h = se.tokenize = function (e, t) {
      var n,
          r,
          i,
          o,
          a,
          s,
          u,
          l = x[e + " "];
      if (l) return t ? 0 : l.slice(0);
      a = e, s = [], u = b.preFilter;

      while (a) {
        for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
          value: n,
          type: r[0].replace($, " ")
        }), a = a.slice(n.length)), b.filter) {
          !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
            value: n,
            type: o,
            matches: r
          }), a = a.slice(n.length));
        }

        if (!n) break;
      }

      return t ? a.length : a ? se.error(e) : x(e, s).slice(0);
    }, f = se.compile = function (e, t) {
      var n,
          v,
          y,
          m,
          x,
          r,
          i = [],
          o = [],
          a = A[e + " "];

      if (!a) {
        t || (t = h(e)), n = t.length;

        while (n--) {
          (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
        }

        (a = A(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function r(e, t, n, _r, i) {
          var o,
              a,
              s,
              u = 0,
              l = "0",
              c = e && [],
              f = [],
              p = w,
              d = e || x && b.find.TAG("*", i),
              h = k += null == p ? 1 : Math.random() || .1,
              g = d.length;

          for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
            if (x && o) {
              a = 0, t || o.ownerDocument == C || (T(o), n = !E);

              while (s = v[a++]) {
                if (s(o, t || C, n)) {
                  _r.push(o);

                  break;
                }
              }

              i && (k = h);
            }

            m && ((o = !s && o) && u--, e && c.push(o));
          }

          if (u += l, m && l !== u) {
            a = 0;

            while (s = y[a++]) {
              s(c, f, t, n);
            }

            if (e) {
              if (0 < u) while (l--) {
                c[l] || f[l] || (f[l] = q.call(_r));
              }
              f = Te(f);
            }

            H.apply(_r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(_r);
          }

          return i && (k = h, w = p), c;
        }, m ? le(r) : r))).selector = e;
      }

      return a;
    }, g = se.select = function (e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l = "function" == typeof e && e,
          c = !r && h(e = l.selector || e);

      if (n = n || [], 1 === c.length) {
        if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
          if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n;
          l && (t = t.parentNode), e = e.slice(o.shift().value.length);
        }

        i = G.needsContext.test(e) ? 0 : o.length;

        while (i--) {
          if (a = o[i], b.relative[s = a.type]) break;

          if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
            if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n;
            break;
          }
        }
      }

      return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n;
    }, d.sortStable = S.split("").sort(D).join("") === S, d.detectDuplicates = !!l, T(), d.sortDetached = ce(function (e) {
      return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
    }), ce(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
    }) || fe("type|href|height|width", function (e, t, n) {
      if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }), d.attributes && ce(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
    }) || fe("value", function (e, t, n) {
      if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
    }), ce(function (e) {
      return null == e.getAttribute("disabled");
    }) || fe(R, function (e, t, n) {
      var r;
      if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }), se;
  }(C);

  S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape;

  var h = function h(e, t, n) {
    var r = [],
        i = void 0 !== n;

    while ((e = e[t]) && 9 !== e.nodeType) {
      if (1 === e.nodeType) {
        if (i && S(e).is(n)) break;
        r.push(e);
      }
    }

    return r;
  },
      T = function T(e, t) {
    for (var n = []; e; e = e.nextSibling) {
      1 === e.nodeType && e !== t && n.push(e);
    }

    return n;
  },
      k = S.expr.match.needsContext;

  function A(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }

  var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

  function D(e, n, r) {
    return m(n) ? S.grep(e, function (e, t) {
      return !!n.call(e, t, e) !== r;
    }) : n.nodeType ? S.grep(e, function (e) {
      return e === n !== r;
    }) : "string" != typeof n ? S.grep(e, function (e) {
      return -1 < i.call(n, e) !== r;
    }) : S.filter(n, e, r);
  }

  S.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, S.fn.extend({
    find: function find(e) {
      var t,
          n,
          r = this.length,
          i = this;
      if ("string" != typeof e) return this.pushStack(S(e).filter(function () {
        for (t = 0; t < r; t++) {
          if (S.contains(i[t], this)) return !0;
        }
      }));

      for (n = this.pushStack([]), t = 0; t < r; t++) {
        S.find(e, i[t], n);
      }

      return 1 < r ? S.uniqueSort(n) : n;
    },
    filter: function filter(e) {
      return this.pushStack(D(this, e || [], !1));
    },
    not: function not(e) {
      return this.pushStack(D(this, e || [], !0));
    },
    is: function is(e) {
      return !!D(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length;
    }
  });
  var j,
      q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (S.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;

    if (n = n || j, "string" == typeof e) {
      if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);

      if (r[1]) {
        if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), N.test(r[1]) && S.isPlainObject(t)) for (r in t) {
          m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        }
        return this;
      }

      return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this;
    }

    return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this);
  }).prototype = S.fn, j = S(E);
  var L = /^(?:parents|prev(?:Until|All))/,
      H = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };

  function O(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType) {
      ;
    }

    return e;
  }

  S.fn.extend({
    has: function has(e) {
      var t = S(e, this),
          n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) {
          if (S.contains(this, t[e])) return !0;
        }
      });
    },
    closest: function closest(e, t) {
      var n,
          r = 0,
          i = this.length,
          o = [],
          a = "string" != typeof e && S(e);
      if (!k.test(e)) for (; r < i; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
            o.push(n);
            break;
          }
        }
      }
      return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
    },
    index: function index(e) {
      return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function add(e, t) {
      return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
    },
    addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  }), S.each({
    parent: function parent(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null;
    },
    parents: function parents(e) {
      return h(e, "parentNode");
    },
    parentsUntil: function parentsUntil(e, t, n) {
      return h(e, "parentNode", n);
    },
    next: function next(e) {
      return O(e, "nextSibling");
    },
    prev: function prev(e) {
      return O(e, "previousSibling");
    },
    nextAll: function nextAll(e) {
      return h(e, "nextSibling");
    },
    prevAll: function prevAll(e) {
      return h(e, "previousSibling");
    },
    nextUntil: function nextUntil(e, t, n) {
      return h(e, "nextSibling", n);
    },
    prevUntil: function prevUntil(e, t, n) {
      return h(e, "previousSibling", n);
    },
    siblings: function siblings(e) {
      return T((e.parentNode || {}).firstChild, e);
    },
    children: function children(e) {
      return T(e.firstChild);
    },
    contents: function contents(e) {
      return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e), S.merge([], e.childNodes));
    }
  }, function (r, i) {
    S.fn[r] = function (e, t) {
      var n = S.map(this, i, e);
      return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()), this.pushStack(n);
    };
  });
  var P = /[^\x20\t\r\n\f]+/g;

  function R(e) {
    return e;
  }

  function M(e) {
    throw e;
  }

  function I(e, t, n, r) {
    var i;

    try {
      e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }

  S.Callbacks = function (r) {
    var e, n;
    r = "string" == typeof r ? (e = r, n = {}, S.each(e.match(P) || [], function (e, t) {
      n[t] = !0;
    }), n) : S.extend({}, r);

    var i,
        t,
        o,
        a,
        s = [],
        u = [],
        l = -1,
        c = function c() {
      for (a = a || r.once, o = i = !0; u.length; l = -1) {
        t = u.shift();

        while (++l < s.length) {
          !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1);
        }
      }

      r.memory || (t = !1), i = !1, a && (s = t ? [] : "");
    },
        f = {
      add: function add() {
        return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
          S.each(e, function (e, t) {
            m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t);
          });
        }(arguments), t && !i && c()), this;
      },
      remove: function remove() {
        return S.each(arguments, function (e, t) {
          var n;

          while (-1 < (n = S.inArray(t, s, n))) {
            s.splice(n, 1), n <= l && l--;
          }
        }), this;
      },
      has: function has(e) {
        return e ? -1 < S.inArray(e, s) : 0 < s.length;
      },
      empty: function empty() {
        return s && (s = []), this;
      },
      disable: function disable() {
        return a = u = [], s = t = "", this;
      },
      disabled: function disabled() {
        return !s;
      },
      lock: function lock() {
        return a = u = [], t || i || (s = t = ""), this;
      },
      locked: function locked() {
        return !!a;
      },
      fireWith: function fireWith(e, t) {
        return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this;
      },
      fire: function fire() {
        return f.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!o;
      }
    };

    return f;
  }, S.extend({
    Deferred: function Deferred(e) {
      var o = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]],
          i = "pending",
          a = {
        state: function state() {
          return i;
        },
        always: function always() {
          return s.done(arguments).fail(arguments), this;
        },
        "catch": function _catch(e) {
          return a.then(null, e);
        },
        pipe: function pipe() {
          var i = arguments;
          return S.Deferred(function (r) {
            S.each(o, function (e, t) {
              var n = m(i[t[4]]) && i[t[4]];
              s[t[1]](function () {
                var e = n && n.apply(this, arguments);
                e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments);
              });
            }), i = null;
          }).promise();
        },
        then: function then(t, n, r) {
          var u = 0;

          function l(i, o, a, s) {
            return function () {
              var n = this,
                  r = arguments,
                  e = function e() {
                var e, t;

                if (!(i < u)) {
                  if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                  t = e && ("object" == _typeof(e) || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++, t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0, r = [e]), (s || o.resolveWith)(n, r));
                }
              },
                  t = s ? e : function () {
                try {
                  e();
                } catch (e) {
                  S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== M && (n = void 0, r = [e]), o.rejectWith(n, r));
                }
              };

              i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), C.setTimeout(t));
            };
          }

          return S.Deferred(function (e) {
            o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : R)), o[2][3].add(l(0, e, m(n) ? n : M));
          }).promise();
        },
        promise: function promise(e) {
          return null != e ? S.extend(e, a) : a;
        }
      },
          s = {};
      return S.each(o, function (e, t) {
        var n = t[2],
            r = t[5];
        a[t[1]] = n.add, r && n.add(function () {
          i = r;
        }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function () {
          return s[t[0] + "With"](this === s ? void 0 : this, arguments), this;
        }, s[t[0] + "With"] = n.fireWith;
      }), a.promise(s), e && e.call(s, s), s;
    },
    when: function when(e) {
      var n = arguments.length,
          t = n,
          r = Array(t),
          i = s.call(arguments),
          o = S.Deferred(),
          a = function a(t) {
        return function (e) {
          r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i);
        };
      };

      if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then();

      while (t--) {
        I(i[t], a(t), o.reject);
      }

      return o.promise();
    }
  });
  var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  S.Deferred.exceptionHook = function (e, t) {
    C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }, S.readyException = function (e) {
    C.setTimeout(function () {
      throw e;
    });
  };
  var F = S.Deferred();

  function B() {
    E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), S.ready();
  }

  S.fn.ready = function (e) {
    return F.then(e)["catch"](function (e) {
      S.readyException(e);
    }), this;
  }, S.extend({
    isReady: !1,
    readyWait: 1,
    ready: function ready(e) {
      (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S]);
    }
  }), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B));

  var $ = function $(e, t, n, r, i, o, a) {
    var s = 0,
        u = e.length,
        l = null == n;
    if ("object" === w(n)) for (s in i = !0, n) {
      $(e, t, s, n[s], !0, o, a);
    } else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
      return l.call(S(e), n);
    })), t)) for (; s < u; s++) {
      t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
    }
    return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
  },
      _ = /^-ms-/,
      z = /-([a-z])/g;

  function U(e, t) {
    return t.toUpperCase();
  }

  function X(e) {
    return e.replace(_, "ms-").replace(z, U);
  }

  var V = function V(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };

  function G() {
    this.expando = S.expando + G.uid++;
  }

  G.uid = 1, G.prototype = {
    cache: function cache(e) {
      var t = e[this.expando];
      return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
        value: t,
        configurable: !0
      }))), t;
    },
    set: function set(e, t, n) {
      var r,
          i = this.cache(e);
      if ("string" == typeof t) i[X(t)] = n;else for (r in t) {
        i[X(r)] = t[r];
      }
      return i;
    },
    get: function get(e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)];
    },
    access: function access(e, t, n) {
      return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
    },
    remove: function remove(e, t) {
      var n,
          r = e[this.expando];

      if (void 0 !== r) {
        if (void 0 !== t) {
          n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in r ? [t] : t.match(P) || []).length;

          while (n--) {
            delete r[t[n]];
          }
        }

        (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
      }
    },
    hasData: function hasData(e) {
      var t = e[this.expando];
      return void 0 !== t && !S.isEmptyObject(t);
    }
  };
  var Y = new G(),
      Q = new G(),
      J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      K = /[A-Z]/g;

  function Z(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
      try {
        n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i);
      } catch (e) {}

      Q.set(e, t, n);
    } else n = void 0;
    return n;
  }

  S.extend({
    hasData: function hasData(e) {
      return Q.hasData(e) || Y.hasData(e);
    },
    data: function data(e, t, n) {
      return Q.access(e, t, n);
    },
    removeData: function removeData(e, t) {
      Q.remove(e, t);
    },
    _data: function _data(e, t, n) {
      return Y.access(e, t, n);
    },
    _removeData: function _removeData(e, t) {
      Y.remove(e, t);
    }
  }), S.fn.extend({
    data: function data(n, e) {
      var t,
          r,
          i,
          o = this[0],
          a = o && o.attributes;

      if (void 0 === n) {
        if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
          t = a.length;

          while (t--) {
            a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)), Z(o, r, i[r]));
          }

          Y.set(o, "hasDataAttrs", !0);
        }

        return i;
      }

      return "object" == _typeof(n) ? this.each(function () {
        Q.set(this, n);
      }) : $(this, function (e) {
        var t;
        if (o && void 0 === e) return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
        this.each(function () {
          Q.set(this, n, e);
        });
      }, null, e, 1 < arguments.length, null, !0);
    },
    removeData: function removeData(e) {
      return this.each(function () {
        Q.remove(this, e);
      });
    }
  }), S.extend({
    queue: function queue(e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)), r || [];
    },
    dequeue: function dequeue(e, t) {
      t = t || "fx";

      var n = S.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = S._queueHooks(e, t);

      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
        S.dequeue(e, t);
      }, o)), !r && o && o.empty.fire();
    },
    _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";
      return Y.get(e, n) || Y.access(e, n, {
        empty: S.Callbacks("once memory").add(function () {
          Y.remove(e, [t + "queue", n]);
        })
      });
    }
  }), S.fn.extend({
    queue: function queue(t, n) {
      var e = 2;
      return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function () {
        var e = S.queue(this, t, n);
        S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t);
      });
    },
    dequeue: function dequeue(e) {
      return this.each(function () {
        S.dequeue(this, e);
      });
    },
    clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    },
    promise: function promise(e, t) {
      var n,
          r = 1,
          i = S.Deferred(),
          o = this,
          a = this.length,
          s = function s() {
        --r || i.resolveWith(o, [o]);
      };

      "string" != typeof e && (t = e, e = void 0), e = e || "fx";

      while (a--) {
        (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
      }

      return s(), i.promise(t);
    }
  });

  var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
      ne = ["Top", "Right", "Bottom", "Left"],
      re = E.documentElement,
      ie = function ie(e) {
    return S.contains(e.ownerDocument, e);
  },
      oe = {
    composed: !0
  };

  re.getRootNode && (ie = function ie(e) {
    return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument;
  });

  var ae = function ae(e, t) {
    return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display");
  };

  function se(e, t, n, r) {
    var i,
        o,
        a = 20,
        s = r ? function () {
      return r.cur();
    } : function () {
      return S.css(e, t, "");
    },
        u = s(),
        l = n && n[3] || (S.cssNumber[t] ? "" : "px"),
        c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));

    if (c && c[3] !== l) {
      u /= 2, l = l || c[3], c = +u || 1;

      while (a--) {
        S.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
      }

      c *= 2, S.style(e, t, c + l), n = n || [];
    }

    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
  }

  var ue = {};

  function le(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++) {
      (r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)), u = S.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ue[s] = u)))) : "none" !== n && (l[c] = "none", Y.set(r, "display", n)));
    }

    for (c = 0; c < f; c++) {
      null != l[c] && (e[c].style.display = l[c]);
    }

    return e;
  }

  S.fn.extend({
    show: function show() {
      return le(this, !0);
    },
    hide: function hide() {
      return le(this);
    },
    toggle: function toggle(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        ae(this) ? S(this).show() : S(this).hide();
      });
    }
  });
  var ce,
      fe,
      pe = /^(?:checkbox|radio)$/i,
      de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      he = /^$|^module$|\/(?:java|ecma)script/i;
  ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", y.option = !!ce.lastChild;
  var ge = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };

  function ve(e, t) {
    var n;
    return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? S.merge([e], n) : n;
  }

  function ye(e, t) {
    for (var n = 0, r = e.length; n < r; n++) {
      Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"));
    }
  }

  ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
  var me = /<|&#?\w+;/;

  function xe(e, t, n, r, i) {
    for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) {
      if ((o = e[d]) || 0 === o) if ("object" === w(o)) S.merge(p, o.nodeType ? [o] : o);else if (me.test(o)) {
        a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2], c = u[0];

        while (c--) {
          a = a.lastChild;
        }

        S.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
      } else p.push(t.createTextNode(o));
    }

    f.textContent = "", d = 0;

    while (o = p[d++]) {
      if (r && -1 < S.inArray(o, r)) i && i.push(o);else if (l = ie(o), a = ve(f.appendChild(o), "script"), l && ye(a), n) {
        c = 0;

        while (o = a[c++]) {
          he.test(o.type || "") && n.push(o);
        }
      }
    }

    return f;
  }

  var be = /^key/,
      we = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Te = /^([^.]*)(?:\.(.+)|)/;

  function Ce() {
    return !0;
  }

  function Ee() {
    return !1;
  }

  function Se(e, t) {
    return e === function () {
      try {
        return E.activeElement;
      } catch (e) {}
    }() == ("focus" === t);
  }

  function ke(e, t, n, r, i, o) {
    var a, s;

    if ("object" == _typeof(t)) {
      for (s in "string" != typeof n && (r = r || n, n = void 0), t) {
        ke(e, s, n, r, t[s], o);
      }

      return e;
    }

    if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Ee;else if (!i) return e;
    return 1 === o && (a = i, (i = function i(e) {
      return S().off(e), a.apply(this, arguments);
    }).guid = a.guid || (a.guid = S.guid++)), e.each(function () {
      S.event.add(this, t, i, r, n);
    });
  }

  function Ae(e, i, o) {
    o ? (Y.set(e, i, !1), S.event.add(e, i, {
      namespace: !1,
      handler: function handler(e) {
        var t,
            n,
            r = Y.get(this, i);

        if (1 & e.isTrigger && this[i]) {
          if (r.length) (S.event.special[i] || {}).delegateType && e.stopPropagation();else if (r = s.call(arguments), Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n.value;
        } else r.length && (Y.set(this, i, {
          value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
        }), e.stopImmediatePropagation());
      }
    })) : void 0 === Y.get(e, i) && S.event.add(e, i, Ce);
  }

  S.event = {
    global: {},
    add: function add(t, e, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Y.get(t);

      if (V(t)) {
        n.handler && (n = (o = n).handler, i = o.selector), i && S.find.matchesSelector(re, i), n.guid || (n.guid = S.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function (e) {
          return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0;
        }), l = (e = (e || "").match(P) || [""]).length;

        while (l--) {
          d = g = (s = Te.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = S.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = S.event.special[d] || {}, c = S.extend({
            type: d,
            origType: g,
            data: r,
            handler: n,
            guid: n.guid,
            selector: i,
            needsContext: i && S.expr.match.needsContext.test(i),
            namespace: h.join(".")
          }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), S.event.global[d] = !0);
        }
      }
    },
    remove: function remove(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Y.hasData(e) && Y.get(e);

      if (v && (u = v.events)) {
        l = (t = (t || "").match(P) || [""]).length;

        while (l--) {
          if (d = g = (s = Te.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
            f = S.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;

            while (o--) {
              c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
            }

            a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle), delete u[d]);
          } else for (d in u) {
            S.event.remove(e, d + t[l], n, r, !0);
          }
        }

        S.isEmptyObject(u) && Y.remove(e, "handle events");
      }
    },
    dispatch: function dispatch(e) {
      var t,
          n,
          r,
          i,
          o,
          a,
          s = new Array(arguments.length),
          u = S.event.fix(e),
          l = (Y.get(this, "events") || Object.create(null))[u.type] || [],
          c = S.event.special[u.type] || {};

      for (s[0] = u, t = 1; t < arguments.length; t++) {
        s[t] = arguments[t];
      }

      if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
        a = S.event.handlers.call(this, u, l), t = 0;

        while ((i = a[t++]) && !u.isPropagationStopped()) {
          u.currentTarget = i.elem, n = 0;

          while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) {
            u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
          }
        }

        return c.postDispatch && c.postDispatch.call(this, u), u.result;
      }
    },
    handlers: function handlers(e, t) {
      var n,
          r,
          i,
          o,
          a,
          s = [],
          u = t.delegateCount,
          l = e.target;
      if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (; l !== this; l = l.parentNode || this) {
        if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
          for (o = [], a = {}, n = 0; n < u; n++) {
            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length), a[i] && o.push(r);
          }

          o.length && s.push({
            elem: l,
            handlers: o
          });
        }
      }
      return l = this, u < t.length && s.push({
        elem: l,
        handlers: t.slice(u)
      }), s;
    },
    addProp: function addProp(t, e) {
      Object.defineProperty(S.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: m(e) ? function () {
          if (this.originalEvent) return e(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[t];
        },
        set: function set(e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e
          });
        }
      });
    },
    fix: function fix(e) {
      return e[S.expando] ? e : new S.Event(e);
    },
    special: {
      load: {
        noBubble: !0
      },
      click: {
        setup: function setup(e) {
          var t = this || e;
          return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click", Ce), !1;
        },
        trigger: function trigger(e) {
          var t = this || e;
          return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click"), !0;
        },
        _default: function _default(e) {
          var t = e.target;
          return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        }
      }
    }
  }, S.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  }, S.Event = function (e, t) {
    if (!(this instanceof S.Event)) return new S.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ce : Ee, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0;
  }, S.Event.prototype = {
    constructor: S.Event,
    isDefaultPrevented: Ee,
    isPropagationStopped: Ee,
    isImmediatePropagationStopped: Ee,
    isSimulated: !1,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = Ce, e && !this.isSimulated && e.preventDefault();
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = Ce, e && !this.isSimulated && e.stopPropagation();
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = Ce, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
    }
  }, S.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    "char": !0,
    code: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: function which(e) {
      var t = e.button;
      return null == e.which && be.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && we.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
    }
  }, S.event.addProp), S.each({
    focus: "focusin",
    blur: "focusout"
  }, function (e, t) {
    S.event.special[e] = {
      setup: function setup() {
        return Ae(this, e, Se), !1;
      },
      trigger: function trigger() {
        return Ae(this, e), !0;
      },
      delegateType: t
    };
  }), S.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, i) {
    S.event.special[e] = {
      delegateType: i,
      bindType: i,
      handle: function handle(e) {
        var t,
            n = e.relatedTarget,
            r = e.handleObj;
        return n && (n === this || S.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t;
      }
    };
  }), S.fn.extend({
    on: function on(e, t, n, r) {
      return ke(this, e, t, n, r);
    },
    one: function one(e, t, n, r) {
      return ke(this, e, t, n, r, 1);
    },
    off: function off(e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;

      if ("object" == _typeof(e)) {
        for (i in e) {
          this.off(i, t, e[i]);
        }

        return this;
      }

      return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Ee), this.each(function () {
        S.event.remove(this, e, n, t);
      });
    }
  });
  var Ne = /<script|<style|<link/i,
      De = /checked\s*(?:[^=]|=\s*.checked.)/i,
      je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  function qe(e, t) {
    return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e;
  }

  function Le(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
  }

  function He(e) {
    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
  }

  function Oe(e, t) {
    var n, r, i, o, a, s;

    if (1 === t.nodeType) {
      if (Y.hasData(e) && (s = Y.get(e).events)) for (i in Y.remove(t, "handle events"), s) {
        for (n = 0, r = s[i].length; n < r; n++) {
          S.event.add(t, i, s[i][n]);
        }
      }
      Q.hasData(e) && (o = Q.access(e), a = S.extend({}, o), Q.set(t, a));
    }
  }

  function Pe(n, r, i, o) {
    r = g(r);
    var e,
        t,
        a,
        s,
        u,
        l,
        c = 0,
        f = n.length,
        p = f - 1,
        d = r[0],
        h = m(d);
    if (h || 1 < f && "string" == typeof d && !y.checkClone && De.test(d)) return n.each(function (e) {
      var t = n.eq(e);
      h && (r[0] = d.call(this, e, t.html())), Pe(t, r, i, o);
    });

    if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
      for (s = (a = S.map(ve(e, "script"), Le)).length; c < f; c++) {
        u = e, c !== p && (u = S.clone(u, !0, !0), s && S.merge(a, ve(u, "script"))), i.call(n[c], u, c);
      }

      if (s) for (l = a[a.length - 1].ownerDocument, S.map(a, He), c = 0; c < s; c++) {
        u = a[c], he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
          nonce: u.nonce || u.getAttribute("nonce")
        }, l) : b(u.textContent.replace(je, ""), u, l));
      }
    }

    return n;
  }

  function Re(e, t, n) {
    for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
      n || 1 !== r.nodeType || S.cleanData(ve(r)), r.parentNode && (n && ie(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
    }

    return e;
  }

  S.extend({
    htmlPrefilter: function htmlPrefilter(e) {
      return e;
    },
    clone: function clone(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c = e.cloneNode(!0),
          f = ie(e);
      if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e))) for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++) {
        s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
      }
      if (t) if (n) for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++) {
        Oe(o[r], a[r]);
      } else Oe(e, c);
      return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c;
    },
    cleanData: function cleanData(e) {
      for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++) {
        if (V(n)) {
          if (t = n[Y.expando]) {
            if (t.events) for (r in t.events) {
              i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
            }
            n[Y.expando] = void 0;
          }

          n[Q.expando] && (n[Q.expando] = void 0);
        }
      }
    }
  }), S.fn.extend({
    detach: function detach(e) {
      return Re(this, e, !0);
    },
    remove: function remove(e) {
      return Re(this, e);
    },
    text: function text(e) {
      return $(this, function (e) {
        return void 0 === e ? S.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
        });
      }, null, e, arguments.length);
    },
    append: function append() {
      return Pe(this, arguments, function (e) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e).appendChild(e);
      });
    },
    prepend: function prepend() {
      return Pe(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = qe(this, e);
          t.insertBefore(e, t.firstChild);
        }
      });
    },
    before: function before() {
      return Pe(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    },
    after: function after() {
      return Pe(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    },
    empty: function empty() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        1 === e.nodeType && (S.cleanData(ve(e, !1)), e.textContent = "");
      }

      return this;
    },
    clone: function clone(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return S.clone(this, e, t);
      });
    },
    html: function html(e) {
      return $(this, function (e) {
        var t = this[0] || {},
            n = 0,
            r = this.length;
        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;

        if ("string" == typeof e && !Ne.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = S.htmlPrefilter(e);

          try {
            for (; n < r; n++) {
              1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)), t.innerHTML = e);
            }

            t = 0;
          } catch (e) {}
        }

        t && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function replaceWith() {
      var n = [];
      return Pe(this, arguments, function (e) {
        var t = this.parentNode;
        S.inArray(this, n) < 0 && (S.cleanData(ve(this)), t && t.replaceChild(e, this));
      }, n);
    }
  }), S.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, a) {
    S.fn[e] = function (e) {
      for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++) {
        t = o === i ? this : this.clone(!0), S(r[o])[a](t), u.apply(n, t.get());
      }

      return this.pushStack(n);
    };
  });

  var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
      Ie = function Ie(e) {
    var t = e.ownerDocument.defaultView;
    return t && t.opener || (t = C), t.getComputedStyle(e);
  },
      We = function We(e, t, n) {
    var r,
        i,
        o = {};

    for (i in t) {
      o[i] = e.style[i], e.style[i] = t[i];
    }

    for (i in r = n.call(e), t) {
      e.style[i] = o[i];
    }

    return r;
  },
      Fe = new RegExp(ne.join("|"), "i");

  function Be(e, t, n) {
    var r,
        i,
        o,
        a,
        s = e.style;
    return (n = n || Ie(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)), !y.pixelBoxStyles() && Me.test(a) && Fe.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
  }

  function $e(e, t) {
    return {
      get: function get() {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      }
    };
  }

  !function () {
    function e() {
      if (l) {
        u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(u).appendChild(l);
        var e = C.getComputedStyle(l);
        n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), re.removeChild(u), l = null;
      }
    }

    function t(e) {
      return Math.round(parseFloat(e));
    }

    var n,
        r,
        i,
        o,
        a,
        s,
        u = E.createElement("div"),
        l = E.createElement("div");
    l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l.style.backgroundClip, S.extend(y, {
      boxSizingReliable: function boxSizingReliable() {
        return e(), r;
      },
      pixelBoxStyles: function pixelBoxStyles() {
        return e(), o;
      },
      pixelPosition: function pixelPosition() {
        return e(), n;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        return e(), s;
      },
      scrollboxSize: function scrollboxSize() {
        return e(), i;
      },
      reliableTrDimensions: function reliableTrDimensions() {
        var e, t, n, r;
        return null == a && (e = E.createElement("table"), t = E.createElement("tr"), n = E.createElement("div"), e.style.cssText = "position:absolute;left:-11111px", t.style.height = "1px", n.style.height = "9px", re.appendChild(e).appendChild(t).appendChild(n), r = C.getComputedStyle(t), a = 3 < parseInt(r.height), re.removeChild(e)), a;
      }
    }));
  }();
  var _e = ["Webkit", "Moz", "ms"],
      ze = E.createElement("div").style,
      Ue = {};

  function Xe(e) {
    var t = S.cssProps[e] || Ue[e];
    return t || (e in ze ? e : Ue[e] = function (e) {
      var t = e[0].toUpperCase() + e.slice(1),
          n = _e.length;

      while (n--) {
        if ((e = _e[n] + t) in ze) return e;
      }
    }(e) || e);
  }

  var Ve = /^(none|table(?!-c[ea]).+)/,
      Ge = /^--/,
      Ye = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      Qe = {
    letterSpacing: "0",
    fontWeight: "400"
  };

  function Je(e, t, n) {
    var r = te.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }

  function Ke(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
        s = 0,
        u = 0;
    if (n === (r ? "border" : "content")) return 0;

    for (; a < 4; a += 2) {
      "margin" === n && (u += S.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
    }

    return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u;
  }

  function Ze(e, t, n) {
    var r = Ie(e),
        i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r),
        o = i,
        a = Be(e, t, r),
        s = "offset" + t[0].toUpperCase() + t.slice(1);

    if (Me.test(a)) {
      if (!n) return a;
      a = "auto";
    }

    return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Ke(e, t, n || (i ? "border" : "content"), o, r, a) + "px";
  }

  function et(e, t, n, r, i) {
    return new et.prototype.init(e, t, n, r, i);
  }

  S.extend({
    cssHooks: {
      opacity: {
        get: function get(e, t) {
          if (t) {
            var n = Be(e, "opacity");
            return "" === n ? "1" : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {},
    style: function style(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
            o,
            a,
            s = X(t),
            u = Ge.test(t),
            l = e.style;
        if (u || (t = Xe(s)), a = S.cssHooks[t] || S.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        "string" === (o = _typeof(n)) && (i = te.exec(n)) && i[1] && (n = se(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
      }
    },
    css: function css(e, t, n, r) {
      var i,
          o,
          a,
          s = X(t);
      return Ge.test(t) || (t = Xe(s)), (a = S.cssHooks[t] || S.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Be(e, t, r)), "normal" === i && t in Qe && (i = Qe[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
    }
  }), S.each(["height", "width"], function (e, u) {
    S.cssHooks[u] = {
      get: function get(e, t, n) {
        if (t) return !Ve.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ze(e, u, n) : We(e, Ye, function () {
          return Ze(e, u, n);
        });
      },
      set: function set(e, t, n) {
        var r,
            i = Ie(e),
            o = !y.scrollboxSize() && "absolute" === i.position,
            a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i),
            s = n ? Ke(e, u, n, a, i) : 0;
        return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Ke(e, u, "border", !1, i) - .5)), s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = S.css(e, u)), Je(0, t, s);
      }
    };
  }), S.cssHooks.marginLeft = $e(y.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(Be(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
      marginLeft: 0
    }, function () {
      return e.getBoundingClientRect().left;
    })) + "px";
  }), S.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (i, o) {
    S.cssHooks[i + o] = {
      expand: function expand(e) {
        for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) {
          n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
        }

        return n;
      }
    }, "margin" !== i && (S.cssHooks[i + o].set = Je);
  }), S.fn.extend({
    css: function css(e, t) {
      return $(this, function (e, t, n) {
        var r,
            i,
            o = {},
            a = 0;

        if (Array.isArray(t)) {
          for (r = Ie(e), i = t.length; a < i; a++) {
            o[t[a]] = S.css(e, t[a], !1, r);
          }

          return o;
        }

        return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
      }, e, t, 1 < arguments.length);
    }
  }), ((S.Tween = et).prototype = {
    constructor: et,
    init: function init(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (S.cssNumber[n] ? "" : "px");
    },
    cur: function cur() {
      var e = et.propHooks[this.prop];
      return e && e.get ? e.get(this) : et.propHooks._default.get(this);
    },
    run: function run(e) {
      var t,
          n = et.propHooks[this.prop];
      return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : et.propHooks._default.set(this), this;
    }
  }).init.prototype = et.prototype, (et.propHooks = {
    _default: {
      get: function get(e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
      },
      set: function set(e) {
        S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[Xe(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit);
      }
    }
  }).scrollTop = et.propHooks.scrollLeft = {
    set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    }
  }, S.easing = {
    linear: function linear(e) {
      return e;
    },
    swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    },
    _default: "swing"
  }, S.fx = et.prototype.init, S.fx.step = {};
  var tt,
      nt,
      rt,
      it,
      ot = /^(?:toggle|show|hide)$/,
      at = /queueHooks$/;

  function st() {
    nt && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(st) : C.setTimeout(st, S.fx.interval), S.fx.tick());
  }

  function ut() {
    return C.setTimeout(function () {
      tt = void 0;
    }), tt = Date.now();
  }

  function lt(e, t) {
    var n,
        r = 0,
        i = {
      height: e
    };

    for (t = t ? 1 : 0; r < 4; r += 2 - t) {
      i["margin" + (n = ne[r])] = i["padding" + n] = e;
    }

    return t && (i.opacity = i.width = e), i;
  }

  function ct(e, t, n) {
    for (var r, i = (ft.tweeners[t] || []).concat(ft.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
      if (r = i[o].call(n, t, e)) return r;
    }
  }

  function ft(o, e, t) {
    var n,
        a,
        r = 0,
        i = ft.prefilters.length,
        s = S.Deferred().always(function () {
      delete u.elem;
    }),
        u = function u() {
      if (a) return !1;

      for (var e = tt || ut(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) {
        l.tweens[r].run(n);
      }

      return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1);
    },
        l = s.promise({
      elem: o,
      props: S.extend({}, e),
      opts: S.extend(!0, {
        specialEasing: {},
        easing: S.easing._default
      }, t),
      originalProperties: e,
      originalOptions: t,
      startTime: tt || ut(),
      duration: t.duration,
      tweens: [],
      createTween: function createTween(e, t) {
        var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
        return l.tweens.push(n), n;
      },
      stop: function stop(e) {
        var t = 0,
            n = e ? l.tweens.length : 0;
        if (a) return this;

        for (a = !0; t < n; t++) {
          l.tweens[t].run(1);
        }

        return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this;
      }
    }),
        c = l.props;

    for (!function (e, t) {
      var n, r, i, o, a;

      for (n in e) {
        if (i = t[r = X(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = S.cssHooks[r]) && ("expand" in a)) for (n in o = a.expand(o), delete e[r], o) {
          (n in e) || (e[n] = o[n], t[n] = i);
        } else t[r] = i;
      }
    }(c, l.opts.specialEasing); r < i; r++) {
      if (n = ft.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
    }

    return S.map(c, ct, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), S.fx.timer(S.extend(u, {
      elem: o,
      anim: l,
      queue: l.opts.queue
    })), l;
  }

  S.Animation = S.extend(ft, {
    tweeners: {
      "*": [function (e, t) {
        var n = this.createTween(e, t);
        return se(n.elem, e, te.exec(t), n), n;
      }]
    },
    tweener: function tweener(e, t) {
      m(e) ? (t = e, e = ["*"]) : e = e.match(P);

      for (var n, r = 0, i = e.length; r < i; r++) {
        n = e[r], ft.tweeners[n] = ft.tweeners[n] || [], ft.tweeners[n].unshift(t);
      }
    },
    prefilters: [function (e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = "width" in t || "height" in t,
          p = this,
          d = {},
          h = e.style,
          g = e.nodeType && ae(e),
          v = Y.get(e, "fxshow");

      for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
        a.unqueued || s();
      }), a.unqueued++, p.always(function () {
        p.always(function () {
          a.unqueued--, S.queue(e, "fx").length || a.empty.fire();
        });
      })), t) {
        if (i = t[r], ot.test(i)) {
          if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
            if ("show" !== i || !v || void 0 === v[r]) continue;
            g = !0;
          }

          d[r] = v && v[r] || S.style(e, r);
        }
      }

      if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d)) for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0), l = e.style.display || l, c = S.css(e, "display"), le([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function () {
        h.display = l;
      }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      })), u = !1, d) {
        u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
          display: l
        }), o && (v.hidden = !g), g && le([e], !0), p.done(function () {
          for (r in g || le([e]), Y.remove(e, "fxshow"), d) {
            S.style(e, r, d[r]);
          }
        })), u = ct(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0));
      }
    }],
    prefilter: function prefilter(e, t) {
      t ? ft.prefilters.unshift(e) : ft.prefilters.push(e);
    }
  }), S.speed = function (e, t, n) {
    var r = e && "object" == _typeof(e) ? S.extend({}, e) : {
      complete: n || !n && t || m(e) && e,
      duration: e,
      easing: n && t || t && !m(t) && t
    };
    return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue);
    }, r;
  }, S.fn.extend({
    fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(ae).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, r);
    },
    animate: function animate(t, e, n, r) {
      var i = S.isEmptyObject(t),
          o = S.speed(e, n, r),
          a = function a() {
        var e = ft(this, S.extend({}, t), o);
        (i || Y.get(this, "finish")) && e.stop(!0);
      };

      return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
    },
    stop: function stop(i, e, o) {
      var a = function a(e) {
        var t = e.stop;
        delete e.stop, t(o);
      };

      return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function () {
        var e = !0,
            t = null != i && i + "queueHooks",
            n = S.timers,
            r = Y.get(this);
        if (t) r[t] && r[t].stop && a(r[t]);else for (t in r) {
          r[t] && r[t].stop && at.test(t) && a(r[t]);
        }

        for (t = n.length; t--;) {
          n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
        }

        !e && o || S.dequeue(this, i);
      });
    },
    finish: function finish(a) {
      return !1 !== a && (a = a || "fx"), this.each(function () {
        var e,
            t = Y.get(this),
            n = t[a + "queue"],
            r = t[a + "queueHooks"],
            i = S.timers,
            o = n ? n.length : 0;

        for (t.finish = !0, S.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) {
          i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
        }

        for (e = 0; e < o; e++) {
          n[e] && n[e].finish && n[e].finish.call(this);
        }

        delete t.finish;
      });
    }
  }), S.each(["toggle", "show", "hide"], function (e, r) {
    var i = S.fn[r];

    S.fn[r] = function (e, t, n) {
      return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(lt(r, !0), e, t, n);
    };
  }), S.each({
    slideDown: lt("show"),
    slideUp: lt("hide"),
    slideToggle: lt("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (e, r) {
    S.fn[e] = function (e, t, n) {
      return this.animate(r, e, t, n);
    };
  }), S.timers = [], S.fx.tick = function () {
    var e,
        t = 0,
        n = S.timers;

    for (tt = Date.now(); t < n.length; t++) {
      (e = n[t])() || n[t] !== e || n.splice(t--, 1);
    }

    n.length || S.fx.stop(), tt = void 0;
  }, S.fx.timer = function (e) {
    S.timers.push(e), S.fx.start();
  }, S.fx.interval = 13, S.fx.start = function () {
    nt || (nt = !0, st());
  }, S.fx.stop = function () {
    nt = null;
  }, S.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, S.fn.delay = function (r, e) {
    return r = S.fx && S.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) {
      var n = C.setTimeout(e, r);

      t.stop = function () {
        C.clearTimeout(n);
      };
    });
  }, rt = E.createElement("input"), it = E.createElement("select").appendChild(E.createElement("option")), rt.type = "checkbox", y.checkOn = "" !== rt.value, y.optSelected = it.selected, (rt = E.createElement("input")).value = "t", rt.type = "radio", y.radioValue = "t" === rt.value;
  var pt,
      dt = S.expr.attrHandle;
  S.fn.extend({
    attr: function attr(e, t) {
      return $(this, S.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function removeAttr(e) {
      return this.each(function () {
        S.removeAttr(this, e);
      });
    }
  }), S.extend({
    attr: function attr(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? pt : void 0)), void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r);
    },
    attrHooks: {
      type: {
        set: function set(e, t) {
          if (!y.radioValue && "radio" === t && A(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t;
          }
        }
      }
    },
    removeAttr: function removeAttr(e, t) {
      var n,
          r = 0,
          i = t && t.match(P);
      if (i && 1 === e.nodeType) while (n = i[r++]) {
        e.removeAttribute(n);
      }
    }
  }), pt = {
    set: function set(e, t, n) {
      return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
    }
  }, S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var a = dt[t] || S.find.attr;

    dt[t] = function (e, t, n) {
      var r,
          i,
          o = t.toLowerCase();
      return n || (i = dt[o], dt[o] = r, r = null != a(e, t, n) ? o : null, dt[o] = i), r;
    };
  });
  var ht = /^(?:input|select|textarea|button)$/i,
      gt = /^(?:a|area)$/i;

  function vt(e) {
    return (e.match(P) || []).join(" ");
  }

  function yt(e) {
    return e.getAttribute && e.getAttribute("class") || "";
  }

  function mt(e) {
    return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || [];
  }

  S.fn.extend({
    prop: function prop(e, t) {
      return $(this, S.prop, e, t, 1 < arguments.length);
    },
    removeProp: function removeProp(e) {
      return this.each(function () {
        delete this[S.propFix[e] || e];
      });
    }
  }), S.extend({
    prop: function prop(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t, i = S.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
    },
    propHooks: {
      tabIndex: {
        get: function get(e) {
          var t = S.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : ht.test(e.nodeName) || gt.test(e.nodeName) && e.href ? 0 : -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), y.optSelected || (S.propHooks.selected = {
    get: function get(e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null;
    },
    set: function set(e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    }
  }), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    S.propFix[this.toLowerCase()] = this;
  }), S.fn.extend({
    addClass: function addClass(t) {
      var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (m(t)) return this.each(function (e) {
        S(this).addClass(t.call(this, e, yt(this)));
      });
      if ((e = mt(t)).length) while (n = this[u++]) {
        if (i = yt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
          a = 0;

          while (o = e[a++]) {
            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
          }

          i !== (s = vt(r)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    removeClass: function removeClass(t) {
      var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (m(t)) return this.each(function (e) {
        S(this).removeClass(t.call(this, e, yt(this)));
      });
      if (!arguments.length) return this.attr("class", "");
      if ((e = mt(t)).length) while (n = this[u++]) {
        if (i = yt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
          a = 0;

          while (o = e[a++]) {
            while (-1 < r.indexOf(" " + o + " ")) {
              r = r.replace(" " + o + " ", " ");
            }
          }

          i !== (s = vt(r)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    toggleClass: function toggleClass(i, t) {
      var o = _typeof(i),
          a = "string" === o || Array.isArray(i);

      return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function (e) {
        S(this).toggleClass(i.call(this, e, yt(this), t), t);
      }) : this.each(function () {
        var e, t, n, r;

        if (a) {
          t = 0, n = S(this), r = mt(i);

          while (e = r[t++]) {
            n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
          }
        } else void 0 !== i && "boolean" !== o || ((e = yt(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""));
      });
    },
    hasClass: function hasClass(e) {
      var t,
          n,
          r = 0;
      t = " " + e + " ";

      while (n = this[r++]) {
        if (1 === n.nodeType && -1 < (" " + vt(yt(n)) + " ").indexOf(t)) return !0;
      }

      return !1;
    }
  });
  var xt = /\r/g;
  S.fn.extend({
    val: function val(n) {
      var r,
          e,
          i,
          t = this[0];
      return arguments.length ? (i = m(n), this.each(function (e) {
        var t;
        1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function (e) {
          return null == e ? "" : e + "";
        })), (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t));
      })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(xt, "") : null == e ? "" : e : void 0;
    }
  }), S.extend({
    valHooks: {
      option: {
        get: function get(e) {
          var t = S.find.attr(e, "value");
          return null != t ? t : vt(S.text(e));
        }
      },
      select: {
        get: function get(e) {
          var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;

          for (r = o < 0 ? u : a ? o : 0; r < u; r++) {
            if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
              if (t = S(n).val(), a) return t;
              s.push(t);
            }
          }

          return s;
        },
        set: function set(e, t) {
          var n,
              r,
              i = e.options,
              o = S.makeArray(t),
              a = i.length;

          while (a--) {
            ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
          }

          return n || (e.selectedIndex = -1), o;
        }
      }
    }
  }), S.each(["radio", "checkbox"], function () {
    S.valHooks[this] = {
      set: function set(e, t) {
        if (Array.isArray(t)) return e.checked = -1 < S.inArray(S(e).val(), t);
      }
    }, y.checkOn || (S.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  }), y.focusin = "onfocusin" in C;

  var bt = /^(?:focusinfocus|focusoutblur)$/,
      wt = function wt(e) {
    e.stopPropagation();
  };

  S.extend(S.event, {
    trigger: function trigger(e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f,
          p = [n || E],
          d = v.call(e, "type") ? e.type : e,
          h = v.call(e, "namespace") ? e.namespace.split(".") : [];

      if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !bt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[S.expando] ? e : new S.Event(d, "object" == _typeof(e) && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : S.makeArray(t, [e]), c = S.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
        if (!r && !c.noBubble && !x(n)) {
          for (s = c.delegateType || d, bt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) {
            p.push(o), a = o;
          }

          a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C);
        }

        i = 0;

        while ((o = p[i++]) && !e.isPropagationStopped()) {
          f = o, e.type = 1 < i ? s : c.bindType || d, (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
        }

        return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), S.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, wt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, wt), S.event.triggered = void 0, a && (n[u] = a)), e.result;
      }
    },
    simulate: function simulate(e, t, n) {
      var r = S.extend(new S.Event(), n, {
        type: e,
        isSimulated: !0
      });
      S.event.trigger(r, null, t);
    }
  }), S.fn.extend({
    trigger: function trigger(e, t) {
      return this.each(function () {
        S.event.trigger(e, t, this);
      });
    },
    triggerHandler: function triggerHandler(e, t) {
      var n = this[0];
      if (n) return S.event.trigger(e, t, n, !0);
    }
  }), y.focusin || S.each({
    focus: "focusin",
    blur: "focusout"
  }, function (n, r) {
    var i = function i(e) {
      S.event.simulate(r, e.target, S.event.fix(e));
    };

    S.event.special[r] = {
      setup: function setup() {
        var e = this.ownerDocument || this.document || this,
            t = Y.access(e, r);
        t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1);
      },
      teardown: function teardown() {
        var e = this.ownerDocument || this.document || this,
            t = Y.access(e, r) - 1;
        t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r));
      }
    };
  });
  var Tt = C.location,
      Ct = {
    guid: Date.now()
  },
      Et = /\?/;

  S.parseXML = function (e) {
    var t;
    if (!e || "string" != typeof e) return null;

    try {
      t = new C.DOMParser().parseFromString(e, "text/xml");
    } catch (e) {
      t = void 0;
    }

    return t && !t.getElementsByTagName("parsererror").length || S.error("Invalid XML: " + e), t;
  };

  var St = /\[\]$/,
      kt = /\r?\n/g,
      At = /^(?:submit|button|image|reset|file)$/i,
      Nt = /^(?:input|select|textarea|keygen)/i;

  function Dt(n, e, r, i) {
    var t;
    if (Array.isArray(e)) S.each(e, function (e, t) {
      r || St.test(n) ? i(n, t) : Dt(n + "[" + ("object" == _typeof(t) && null != t ? e : "") + "]", t, r, i);
    });else if (r || "object" !== w(e)) i(n, e);else for (t in e) {
      Dt(n + "[" + t + "]", e[t], r, i);
    }
  }

  S.param = function (e, t) {
    var n,
        r = [],
        i = function i(e, t) {
      var n = m(t) ? t() : t;
      r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
    };

    if (null == e) return "";
    if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, function () {
      i(this.name, this.value);
    });else for (n in e) {
      Dt(n, e[n], t, i);
    }
    return r.join("&");
  }, S.fn.extend({
    serialize: function serialize() {
      return S.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        var e = S.prop(this, "elements");
        return e ? S.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;
        return this.name && !S(this).is(":disabled") && Nt.test(this.nodeName) && !At.test(e) && (this.checked || !pe.test(e));
      }).map(function (e, t) {
        var n = S(this).val();
        return null == n ? null : Array.isArray(n) ? S.map(n, function (e) {
          return {
            name: t.name,
            value: e.replace(kt, "\r\n")
          };
        }) : {
          name: t.name,
          value: n.replace(kt, "\r\n")
        };
      }).get();
    }
  });
  var jt = /%20/g,
      qt = /#.*$/,
      Lt = /([?&])_=[^&]*/,
      Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Ot = /^(?:GET|HEAD)$/,
      Pt = /^\/\//,
      Rt = {},
      Mt = {},
      It = "*/".concat("*"),
      Wt = E.createElement("a");

  function Ft(o) {
    return function (e, t) {
      "string" != typeof e && (t = e, e = "*");
      var n,
          r = 0,
          i = e.toLowerCase().match(P) || [];
      if (m(t)) while (n = i[r++]) {
        "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
      }
    };
  }

  function Bt(t, i, o, a) {
    var s = {},
        u = t === Mt;

    function l(e) {
      var r;
      return s[e] = !0, S.each(t[e] || [], function (e, t) {
        var n = t(i, o, a);
        return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1);
      }), r;
    }

    return l(i.dataTypes[0]) || !s["*"] && l("*");
  }

  function $t(e, t) {
    var n,
        r,
        i = S.ajaxSettings.flatOptions || {};

    for (n in t) {
      void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    }

    return r && S.extend(!0, e, r), e;
  }

  Wt.href = Tt.href, S.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Tt.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": It,
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
      converters: {
        "* text": String,
        "text html": !0,
        "text json": JSON.parse,
        "text xml": S.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ajaxSetup(e, t) {
      return t ? $t($t(e, S.ajaxSettings), t) : $t(S.ajaxSettings, e);
    },
    ajaxPrefilter: Ft(Rt),
    ajaxTransport: Ft(Mt),
    ajax: function ajax(e, t) {
      "object" == _typeof(e) && (t = e, e = void 0), t = t || {};
      var c,
          f,
          p,
          n,
          d,
          r,
          h,
          g,
          i,
          o,
          v = S.ajaxSetup({}, t),
          y = v.context || v,
          m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event,
          x = S.Deferred(),
          b = S.Callbacks("once memory"),
          w = v.statusCode || {},
          a = {},
          s = {},
          u = "canceled",
          T = {
        readyState: 0,
        getResponseHeader: function getResponseHeader(e) {
          var t;

          if (h) {
            if (!n) {
              n = {};

              while (t = Ht.exec(p)) {
                n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
              }
            }

            t = n[e.toLowerCase() + " "];
          }

          return null == t ? null : t.join(", ");
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return h ? p : null;
        },
        setRequestHeader: function setRequestHeader(e, t) {
          return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this;
        },
        overrideMimeType: function overrideMimeType(e) {
          return null == h && (v.mimeType = e), this;
        },
        statusCode: function statusCode(e) {
          var t;
          if (e) if (h) T.always(e[T.status]);else for (t in e) {
            w[t] = [w[t], e[t]];
          }
          return this;
        },
        abort: function abort(e) {
          var t = e || u;
          return c && c.abort(t), l(0, t), this;
        }
      };

      if (x.promise(T), v.url = ((e || v.url || Tt.href) + "").replace(Pt, Tt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""], null == v.crossDomain) {
        r = E.createElement("a");

        try {
          r.href = v.url, r.href = r.href, v.crossDomain = Wt.protocol + "//" + Wt.host != r.protocol + "//" + r.host;
        } catch (e) {
          v.crossDomain = !0;
        }
      }

      if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), Bt(Rt, v, t, T), h) return T;

      for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Ot.test(v.type), f = v.url.replace(qt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(jt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (Et.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(Lt, "$1"), o = (Et.test(f) ? "&" : "?") + "_=" + Ct.guid++ + o), v.url = f + o), v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]), S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + It + "; q=0.01" : "") : v.accepts["*"]), v.headers) {
        T.setRequestHeader(i, v.headers[i]);
      }

      if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();

      if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Bt(Mt, v, t, T)) {
        if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
        v.async && 0 < v.timeout && (d = C.setTimeout(function () {
          T.abort("timeout");
        }, v.timeout));

        try {
          h = !1, c.send(a, l);
        } catch (e) {
          if (h) throw e;
          l(-1, e);
        }
      } else l(-1, "No Transport");

      function l(e, t, n, r) {
        var i,
            o,
            a,
            s,
            u,
            l = t;
        h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function (e, t, n) {
          var r,
              i,
              o,
              a,
              s = e.contents,
              u = e.dataTypes;

          while ("*" === u[0]) {
            u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
          }

          if (r) for (i in s) {
            if (s[i] && s[i].test(r)) {
              u.unshift(i);
              break;
            }
          }
          if (u[0] in n) o = u[0];else {
            for (i in n) {
              if (!u[0] || e.converters[i + " " + u[0]]) {
                o = i;
                break;
              }

              a || (a = i);
            }

            o = o || a;
          }
          if (o) return o !== u[0] && u.unshift(o), n[o];
        }(v, T, n)), !i && -1 < S.inArray("script", v.dataTypes) && (v.converters["text script"] = function () {}), s = function (e, t, n, r) {
          var i,
              o,
              a,
              s,
              u,
              l = {},
              c = e.dataTypes.slice();
          if (c[1]) for (a in e.converters) {
            l[a.toLowerCase()] = e.converters[a];
          }
          o = c.shift();

          while (o) {
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
              if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                  !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                  break;
                }
              }
              if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
                t = a(t);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: a ? e : "No conversion from " + u + " to " + o
                };
              }
            }
          }

          return {
            state: "success",
            data: t
          };
        }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (S.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --S.active || S.event.trigger("ajaxStop")));
      }

      return T;
    },
    getJSON: function getJSON(e, t, n) {
      return S.get(e, t, n, "json");
    },
    getScript: function getScript(e, t) {
      return S.get(e, void 0, t, "script");
    }
  }), S.each(["get", "post"], function (e, i) {
    S[i] = function (e, t, n, r) {
      return m(t) && (r = r || n, n = t, t = void 0), S.ajax(S.extend({
        url: e,
        type: i,
        dataType: r,
        data: t,
        success: n
      }, S.isPlainObject(e) && e));
    };
  }), S.ajaxPrefilter(function (e) {
    var t;

    for (t in e.headers) {
      "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
    }
  }), S._evalUrl = function (e, t, n) {
    return S.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      converters: {
        "text script": function textScript() {}
      },
      dataFilter: function dataFilter(e) {
        S.globalEval(e, t, n);
      }
    });
  }, S.fn.extend({
    wrapAll: function wrapAll(e) {
      var t;
      return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        var e = this;

        while (e.firstElementChild) {
          e = e.firstElementChild;
        }

        return e;
      }).append(this)), this;
    },
    wrapInner: function wrapInner(n) {
      return m(n) ? this.each(function (e) {
        S(this).wrapInner(n.call(this, e));
      }) : this.each(function () {
        var e = S(this),
            t = e.contents();
        t.length ? t.wrapAll(n) : e.append(n);
      });
    },
    wrap: function wrap(t) {
      var n = m(t);
      return this.each(function (e) {
        S(this).wrapAll(n ? t.call(this, e) : t);
      });
    },
    unwrap: function unwrap(e) {
      return this.parent(e).not("body").each(function () {
        S(this).replaceWith(this.childNodes);
      }), this;
    }
  }), S.expr.pseudos.hidden = function (e) {
    return !S.expr.pseudos.visible(e);
  }, S.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, S.ajaxSettings.xhr = function () {
    try {
      return new C.XMLHttpRequest();
    } catch (e) {}
  };
  var _t = {
    0: 200,
    1223: 204
  },
      zt = S.ajaxSettings.xhr();
  y.cors = !!zt && "withCredentials" in zt, y.ajax = zt = !!zt, S.ajaxTransport(function (i) {
    var _o, a;

    if (y.cors || zt && !i.crossDomain) return {
      send: function send(e, t) {
        var n,
            r = i.xhr();
        if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields) for (n in i.xhrFields) {
          r[n] = i.xhrFields[n];
        }

        for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) {
          r.setRequestHeader(n, e[n]);
        }

        _o = function o(e) {
          return function () {
            _o && (_o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(_t[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
              binary: r.response
            } : {
              text: r.responseText
            }, r.getAllResponseHeaders()));
          };
        }, r.onload = _o(), a = r.onerror = r.ontimeout = _o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function () {
          4 === r.readyState && C.setTimeout(function () {
            _o && a();
          });
        }, _o = _o("abort");

        try {
          r.send(i.hasContent && i.data || null);
        } catch (e) {
          if (_o) throw e;
        }
      },
      abort: function abort() {
        _o && _o();
      }
    };
  }), S.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1);
  }), S.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(e) {
        return S.globalEval(e), e;
      }
    }
  }), S.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
  }), S.ajaxTransport("script", function (n) {
    var r, _i;

    if (n.crossDomain || n.scriptAttrs) return {
      send: function send(e, t) {
        r = S("<script>").attr(n.scriptAttrs || {}).prop({
          charset: n.scriptCharset,
          src: n.url
        }).on("load error", _i = function i(e) {
          r.remove(), _i = null, e && t("error" === e.type ? 404 : 200, e.type);
        }), E.head.appendChild(r[0]);
      },
      abort: function abort() {
        _i && _i();
      }
    };
  });
  var Ut,
      Xt = [],
      Vt = /(=)\?(?=&|$)|\?\?/;
  S.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var e = Xt.pop() || S.expando + "_" + Ct.guid++;
      return this[e] = !0, e;
    }
  }), S.ajaxPrefilter("json jsonp", function (e, t, n) {
    var r,
        i,
        o,
        a = !1 !== e.jsonp && (Vt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(e.data) && "data");
    if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Vt, "$1" + r) : !1 !== e.jsonp && (e.url += (Et.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
      return o || S.error(r + " was not called"), o[0];
    }, e.dataTypes[0] = "json", i = C[r], C[r] = function () {
      o = arguments;
    }, n.always(function () {
      void 0 === i ? S(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Xt.push(r)), o && m(i) && i(o[0]), o = i = void 0;
    }), "script";
  }), y.createHTMLDocument = ((Ut = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ut.childNodes.length), S.parseHTML = function (e, t, n) {
    return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(r)) : t = E), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o), o && o.length && S(o).remove(), S.merge([], i.childNodes)));
    var r, i, o;
  }, S.fn.load = function (e, t, n) {
    var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
    return -1 < s && (r = vt(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == _typeof(t) && (i = "POST"), 0 < a.length && S.ajax({
      url: e,
      type: i || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e]);
      });
    }), this;
  }, S.expr.pseudos.animated = function (t) {
    return S.grep(S.timers, function (e) {
      return t === e.elem;
    }).length;
  }, S.offset = {
    setOffset: function setOffset(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l = S.css(e, "position"),
          c = S(e),
          f = {};
      "static" === l && (e.style.position = "relative"), s = c.offset(), o = S.css(e, "top"), u = S.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : ("number" == typeof f.top && (f.top += "px"), "number" == typeof f.left && (f.left += "px"), c.css(f));
    }
  }, S.fn.extend({
    offset: function offset(t) {
      if (arguments.length) return void 0 === t ? this : this.each(function (e) {
        S.offset.setOffset(this, t, e);
      });
      var e,
          n,
          r = this[0];
      return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
        top: e.top + n.pageYOffset,
        left: e.left + n.pageXOffset
      }) : {
        top: 0,
        left: 0
      } : void 0;
    },
    position: function position() {
      if (this[0]) {
        var e,
            t,
            n,
            r = this[0],
            i = {
          top: 0,
          left: 0
        };
        if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect();else {
          t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;

          while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position")) {
            e = e.parentNode;
          }

          e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0), i.left += S.css(e, "borderLeftWidth", !0));
        }
        return {
          top: t.top - i.top - S.css(r, "marginTop", !0),
          left: t.left - i.left - S.css(r, "marginLeft", !0)
        };
      }
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var e = this.offsetParent;

        while (e && "static" === S.css(e, "position")) {
          e = e.offsetParent;
        }

        return e || re;
      });
    }
  }), S.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (t, i) {
    var o = "pageYOffset" === i;

    S.fn[t] = function (e) {
      return $(this, function (e, t, n) {
        var r;
        if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
        r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n;
      }, t, e, arguments.length);
    };
  }), S.each(["top", "left"], function (e, n) {
    S.cssHooks[n] = $e(y.pixelPosition, function (e, t) {
      if (t) return t = Be(e, n), Me.test(t) ? S(e).position()[n] + "px" : t;
    });
  }), S.each({
    Height: "height",
    Width: "width"
  }, function (a, s) {
    S.each({
      padding: "inner" + a,
      content: s,
      "": "outer" + a
    }, function (r, o) {
      S.fn[o] = function (e, t) {
        var n = arguments.length && (r || "boolean" != typeof e),
            i = r || (!0 === e || !0 === t ? "margin" : "border");
        return $(this, function (e, t, n) {
          var r;
          return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i);
        }, s, n ? e : void 0, n);
      };
    });
  }), S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    S.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), S.fn.extend({
    bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function unbind(e, t) {
      return this.off(e, null, t);
    },
    delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    },
    undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    },
    hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }
  }), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
    S.fn[n] = function (e, t) {
      return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
    };
  });
  var Gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  S.proxy = function (e, t) {
    var n, r, i;
    if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function i() {
      return e.apply(t || this, r.concat(s.call(arguments)));
    }).guid = e.guid = e.guid || S.guid++, i;
  }, S.holdReady = function (e) {
    e ? S.readyWait++ : S.ready(!0);
  }, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function (e) {
    var t = S.type(e);
    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
  }, S.trim = function (e) {
    return null == e ? "" : (e + "").replace(Gt, "");
  }, "function" == typeof define && define.amd && define("jquery", [], function () {
    return S;
  });
  var Yt = C.jQuery,
      Qt = C.$;
  return S.noConflict = function (e) {
    return C.$ === S && (C.$ = Qt), e && C.jQuery === S && (C.jQuery = Yt), S;
  }, "undefined" == typeof e && (C.jQuery = C.$ = S), S;
});
},{}],"UExJ":[function(require,module,exports) {
/*
 * anime.js v3.2.1
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */
'use strict'; // Defaults

var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
};
var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
};
var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective', 'matrix', 'matrix3d']; // Caching

var cache = {
  CSS: {},
  springs: {}
}; // Utils

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

function applyArguments(func, args) {
  return func.apply(null, args);
}

var is = {
  arr: function arr(a) {
    return Array.isArray(a);
  },
  obj: function obj(a) {
    return stringContains(Object.prototype.toString.call(a), 'Object');
  },
  pth: function pth(a) {
    return is.obj(a) && a.hasOwnProperty('totalLength');
  },
  svg: function svg(a) {
    return a instanceof SVGElement;
  },
  inp: function inp(a) {
    return a instanceof HTMLInputElement;
  },
  dom: function dom(a) {
    return a.nodeType || is.svg(a);
  },
  str: function str(a) {
    return typeof a === 'string';
  },
  fnc: function fnc(a) {
    return typeof a === 'function';
  },
  und: function und(a) {
    return typeof a === 'undefined';
  },
  nil: function nil(a) {
    return is.und(a) || a === null;
  },
  hex: function hex(a) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
  },
  rgb: function rgb(a) {
    return /^rgb/.test(a);
  },
  hsl: function hsl(a) {
    return /^hsl/.test(a);
  },
  col: function col(a) {
    return is.hex(a) || is.rgb(a) || is.hsl(a);
  },
  key: function key(a) {
    return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes';
  }
}; // Easings

function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(function (p) {
    return parseFloat(p);
  }) : [];
} // Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js


function spring(string, duration) {
  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
  var velocity = minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    var progress = duration ? duration * t / 1000 : t;

    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }

    if (t === 0 || t === 1) {
      return t;
    }

    return 1 - progress;
  }

  function getDuration() {
    var cached = cache.springs[string];

    if (cached) {
      return cached;
    }

    var frame = 1 / 6;
    var elapsed = 0;
    var rest = 0;

    while (true) {
      elapsed += frame;

      if (solver(elapsed) === 1) {
        rest++;

        if (rest >= 16) {
          break;
        }
      } else {
        rest = 0;
      }
    }

    var duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }

  return duration ? solver : getDuration;
} // Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function


function steps(steps) {
  if (steps === void 0) steps = 10;
  return function (t) {
    return Math.ceil(minMax(t, 0.000001, 1) * steps) * (1 / steps);
  };
} // BezierEasing https://github.com/gre/bezier-easing


var bezier = function () {
  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }

  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }

  function C(aA1) {
    return 3.0 * aA1;
  }

  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX,
        currentT,
        i = 0;

    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;

      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);

    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);

      if (currentSlope === 0.0) {
        return aGuessT;
      }

      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }

    return aGuessT;
  }

  function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      return;
    }

    var sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {
      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }

    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) {
        return x;
      }

      if (x === 0 || x === 1) {
        return x;
      }

      return calcBezier(getTForX(x), mY1, mY2);
    };
  }

  return bezier;
}();

var penner = function () {
  // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)
  var eases = {
    linear: function linear() {
      return function (t) {
        return t;
      };
    }
  };
  var functionEasings = {
    Sine: function Sine() {
      return function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
      };
    },
    Circ: function Circ() {
      return function (t) {
        return 1 - Math.sqrt(1 - t * t);
      };
    },
    Back: function Back() {
      return function (t) {
        return t * t * (3 * t - 2);
      };
    },
    Bounce: function Bounce() {
      return function (t) {
        var pow2,
            b = 4;

        while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) {}

        return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
      };
    },
    Elastic: function Elastic(amplitude, period) {
      if (amplitude === void 0) amplitude = 1;
      if (period === void 0) period = .5;
      var a = minMax(amplitude, 1, 10);
      var p = minMax(period, .1, 2);
      return function (t) {
        return t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
      };
    }
  };
  var baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
  baseEasings.forEach(function (name, i) {
    functionEasings[name] = function () {
      return function (t) {
        return Math.pow(t, i + 2);
      };
    };
  });
  Object.keys(functionEasings).forEach(function (name) {
    var easeIn = functionEasings[name];
    eases['easeIn' + name] = easeIn;

    eases['easeOut' + name] = function (a, b) {
      return function (t) {
        return 1 - easeIn(a, b)(1 - t);
      };
    };

    eases['easeInOut' + name] = function (a, b) {
      return function (t) {
        return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
      };
    };

    eases['easeOutIn' + name] = function (a, b) {
      return function (t) {
        return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
      };
    };
  });
  return eases;
}();

function parseEasings(easing, duration) {
  if (is.fnc(easing)) {
    return easing;
  }

  var name = easing.split('(')[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);

  switch (name) {
    case 'spring':
      return spring(easing, duration);

    case 'cubicBezier':
      return applyArguments(bezier, args);

    case 'steps':
      return applyArguments(steps, args);

    default:
      return applyArguments(ease, args);
  }
} // Strings


function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch (e) {
    return;
  }
} // Arrays


function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];

  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];

      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }

  return result;
}

function flattenArray(arr) {
  return arr.reduce(function (a, b) {
    return a.concat(is.arr(b) ? flattenArray(b) : b);
  }, []);
}

function toArray(o) {
  if (is.arr(o)) {
    return o;
  }

  if (is.str(o)) {
    o = selectString(o) || o;
  }

  if (o instanceof NodeList || o instanceof HTMLCollection) {
    return [].slice.call(o);
  }

  return [o];
}

function arrayContains(arr, val) {
  return arr.some(function (a) {
    return a === val;
  });
} // Objects


function cloneObject(o) {
  var clone = {};

  for (var p in o) {
    clone[p] = o[p];
  }

  return clone;
}

function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);

  for (var p in o1) {
    o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
  }

  return o;
}

function mergeObjects(o1, o2) {
  var o = cloneObject(o1);

  for (var p in o2) {
    o[p] = is.und(o1[p]) ? o2[p] : o1[p];
  }

  return o;
} // Colors


function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
}

function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return "rgba(" + r + "," + g + "," + b + ",1)";
}

function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;

  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }

    if (t > 1) {
      t -= 1;
    }

    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }

    if (t < 1 / 2) {
      return q;
    }

    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }

    return p;
  }

  var r, g, b;

  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
}

function colorToRgb(val) {
  if (is.rgb(val)) {
    return rgbToRgba(val);
  }

  if (is.hex(val)) {
    return hexToRgba(val);
  }

  if (is.hsl(val)) {
    return hslToRgba(val);
  }
} // Units


function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);

  if (split) {
    return split[1];
  }
}

function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') {
    return 'px';
  }

  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) {
    return 'deg';
  }
} // Values


function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) {
    return val;
  }

  return val(animatable.target, animatable.id, animatable.total);
}

function getAttribute(el, prop) {
  return el.getAttribute(prop);
}

function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);

  if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) {
    return value;
  }

  var cached = cache.CSS[value + unit];

  if (!is.und(cached)) {
    return cached;
  }

  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = 'absolute';
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}

function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}

function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
    return 'attribute';
  }

  if (is.dom(el) && arrayContains(validTransforms, prop)) {
    return 'transform';
  }

  if (is.dom(el) && prop !== 'transform' && getCSSValue(el, prop)) {
    return 'css';
  }

  if (el[prop] != null) {
    return 'object';
  }
}

function getElementTransforms(el) {
  if (!is.dom(el)) {
    return;
  }

  var str = el.style.transform || '';
  var reg = /(\w+)\(([^)]*)\)/g;
  var transforms = new Map();
  var m;

  while (m = reg.exec(str)) {
    transforms.set(m[1], m[2]);
  }

  return transforms;
}

function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;

  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }

  return unit ? convertPxToUnit(el, value, unit) : value;
}

function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform':
      return getTransformValue(target, propName, animatable, unit);

    case 'css':
      return getCSSValue(target, propName, unit);

    case 'attribute':
      return getAttribute(target, propName);

    default:
      return target[propName] || 0;
  }
}

function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);

  if (!operator) {
    return to;
  }

  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));

  switch (operator[0][0]) {
    case '+':
      return x + y + u;

    case '-':
      return x - y + u;

    case '*':
      return x * y + u;
  }
}

function validateValue(val, unit) {
  if (is.col(val)) {
    return colorToRgb(val);
  }

  if (/\s/g.test(val)) {
    return val;
  }

  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;

  if (unit) {
    return unitLess + unit;
  }

  return unitLess;
} // getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744


function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}

function getRectLength(el) {
  return getAttribute(el, 'width') * 2 + getAttribute(el, 'height') * 2;
}

function getLineLength(el) {
  return getDistance({
    x: getAttribute(el, 'x1'),
    y: getAttribute(el, 'y1')
  }, {
    x: getAttribute(el, 'x2'),
    y: getAttribute(el, 'y2')
  });
}

function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;

  for (var i = 0; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);

    if (i > 0) {
      totalLength += getDistance(previousPos, currentPos);
    }

    previousPos = currentPos;
  }

  return totalLength;
}

function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
} // Path animation


function getTotalLength(el) {
  if (el.getTotalLength) {
    return el.getTotalLength();
  }

  switch (el.tagName.toLowerCase()) {
    case 'circle':
      return getCircleLength(el);

    case 'rect':
      return getRectLength(el);

    case 'line':
      return getLineLength(el);

    case 'polyline':
      return getPolylineLength(el);

    case 'polygon':
      return getPolygonLength(el);
  }
}

function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
} // Motion path


function getParentSvgEl(el) {
  var parentEl = el.parentNode;

  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) {
      break;
    }

    parentEl = parentEl.parentNode;
  }

  return parentEl;
}

function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  };
}

function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function (property) {
    return {
      property: property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    };
  };
}

function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    if (offset === void 0) offset = 0;
    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }

  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(+1);
  var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
  var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;

  switch (path.property) {
    case 'x':
      return (p.x - svg.x) * scaleX;

    case 'y':
      return (p.y - svg.y) * scaleY;

    case 'angle':
      return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
} // Decompose value


function decomposeValue(val, unit) {
  // const rgx = /-?\d*\.?\d+/g; // handles basic numbers
  // const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation

  var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + '';
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: is.str(val) || unit ? value.split(rgx) : []
  };
} // Animatables


function parseTargets(targets) {
  var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
  return filterArray(targetsArray, function (item, pos, self) {
    return self.indexOf(item) === pos;
  });
}

function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function (t, i) {
    return {
      target: t,
      id: i,
      total: parsed.length,
      transforms: {
        list: getElementTransforms(t)
      }
    };
  });
} // Properties


function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings); // Override duration if easing is a spring

  if (/^spring/.test(settings.easing)) {
    settings.duration = spring(settings.easing);
  }

  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = l === 2 && !is.obj(prop[0]);

    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) {
        settings.duration = tweenSettings.duration / l;
      }
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {
        value: prop
      };
    }
  }

  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function (v, i) {
    var obj = is.obj(v) && !is.pth(v) ? v : {
      value: v
    }; // Default delay value should only be applied to the first tween

    if (is.und(obj.delay)) {
      obj.delay = !i ? tweenSettings.delay : 0;
    } // Default endDelay value should only be applied to the last tween


    if (is.und(obj.endDelay)) {
      obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
    }

    return obj;
  }).map(function (k) {
    return mergeObjects(k, settings);
  });
}

function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function (key) {
    return Object.keys(key);
  })), function (p) {
    return is.key(p);
  }).reduce(function (a, b) {
    if (a.indexOf(b) < 0) {
      a.push(b);
    }

    return a;
  }, []);
  var properties = {};

  var loop = function loop(i) {
    var propName = propertyNames[i];
    properties[propName] = keyframes.map(function (key) {
      var newKey = {};

      for (var p in key) {
        if (is.key(p)) {
          if (p == propName) {
            newKey.value = key[p];
          }
        } else {
          newKey[p] = key[p];
        }
      }

      return newKey;
    });
  };

  for (var i = 0; i < propertyNames.length; i++) {
    loop(i);
  }

  return properties;
}

function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;

  if (keyframes) {
    params = mergeObjects(flattenKeyframes(keyframes), params);
  }

  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }

  return properties;
} // Tweens


function normalizeTweenValues(tween, animatable) {
  var t = {};

  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);

    if (is.arr(value)) {
      value = value.map(function (v) {
        return getFunctionValue(v, animatable);
      });

      if (value.length === 1) {
        value = value[0];
      }
    }

    t[p] = value;
  }

  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}

function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function (t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;

    if (is.und(to)) {
      to = previousValue;
    }

    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);

    if (tween.isColor) {
      tween.round = 1;
    }

    previousTween = tween;
    return tween;
  });
} // Tween progress


var setProgressValue = {
  css: function css(t, p, v) {
    return t.style[p] = v;
  },
  attribute: function attribute(t, p, v) {
    return t.setAttribute(p, v);
  },
  object: function object(t, p, v) {
    return t[p] = v;
  },
  transform: function transform(t, p, v, transforms, manual) {
    transforms.list.set(p, v);

    if (p === transforms.last || manual) {
      var str = '';
      transforms.list.forEach(function (value, prop) {
        str += prop + "(" + value + ") ";
      });
      t.style.transform = str;
    }
  }
}; // Set Value helper

function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function (animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
} // Animations


function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);

  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    };
  }
}

function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function (animatable) {
    return properties.map(function (prop) {
      return createAnimation(animatable, prop);
    });
  })), function (a) {
    return !is.und(a);
  });
} // Create Instance


function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;

  var getTlOffset = function getTlOffset(anim) {
    return anim.timelineOffset ? anim.timelineOffset : 0;
  };

  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) {
    return getTlOffset(anim) + anim.duration;
  })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) {
    return getTlOffset(anim) + anim.delay;
  })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) {
    return getTlOffset(anim) + anim.duration - anim.endDelay;
  })) : tweenSettings.endDelay;
  return timings;
}

var instanceID = 0;

function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
} // Core


var activeInstances = [];

var engine = function () {
  var raf;

  function play() {
    if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
      raf = requestAnimationFrame(step);
    }
  }

  function step(t) {
    // memo on algorithm issue:
    // dangerous iteration over mutable `activeInstances`
    // (that collection may be updated from within callbacks of `tick`-ed animation instances)
    var activeInstancesLength = activeInstances.length;
    var i = 0;

    while (i < activeInstancesLength) {
      var activeInstance = activeInstances[i];

      if (!activeInstance.paused) {
        activeInstance.tick(t);
        i++;
      } else {
        activeInstances.splice(i, 1);
        activeInstancesLength--;
      }
    }

    raf = i > 0 ? requestAnimationFrame(step) : undefined;
  }

  function handleVisibilityChange() {
    if (!anime.suspendWhenDocumentHidden) {
      return;
    }

    if (isDocumentHidden()) {
      // suspend ticks
      raf = cancelAnimationFrame(raf);
    } else {
      // is back to active tab
      // first adjust animations to consider the time that ticks were suspended
      activeInstances.forEach(function (instance) {
        return instance._onDocumentVisibility();
      });
      engine();
    }
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  return play;
}();

function isDocumentHidden() {
  return !!document && document.hidden;
} // Public Instance


function anime(params) {
  if (params === void 0) params = {};
  var startTime = 0,
      lastTime = 0,
      now = 0;
  var children,
      childrenLength = 0;
  var resolve = null;

  function makePromise(instance) {
    var promise = window.Promise && new Promise(function (_resolve) {
      return resolve = _resolve;
    });
    instance.finished = promise;
    return promise;
  }

  var instance = createNewInstance(params);
  var promise = makePromise(instance);

  function toggleInstanceDirection() {
    var direction = instance.direction;

    if (direction !== 'alternate') {
      instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
    }

    instance.reversed = !instance.reversed;
    children.forEach(function (child) {
      return child.reversed = instance.reversed;
    });
  }

  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }

  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }

  function seekChild(time, child) {
    if (child) {
      child.seek(time - child.timelineOffset);
    }
  }

  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) {
        seekChild(time, children[i]);
      }
    } else {
      for (var i$1 = childrenLength; i$1--;) {
        seekChild(time, children[i$1]);
      }
    }
  }

  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;

    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength]; // Only check for keyframes if there is more than one tween

      if (tweenLength) {
        tween = filterArray(tweens, function (t) {
          return insTime < t.end;
        })[0] || tween;
      }

      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = void 0;

      for (var n = 0; n < toNumbersLength; n++) {
        var value = void 0;
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;

        if (!tween.isPath) {
          value = fromNumber + eased * (toNumber - fromNumber);
        } else {
          value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
        }

        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }

        numbers.push(value);
      } // Manual Array.reduce for better performances


      var stringsLength = strings.length;

      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];

        for (var s = 0; s < stringsLength; s++) {
          var a = strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];

          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + ' ';
            } else {
              progress += n$1 + b;
            }
          }
        }
      }

      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }

  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) {
      instance[cb](instance);
    }
  }

  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }

  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax(insTime / insDuration * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;

    if (children) {
      syncInstanceChildren(insTime);
    }

    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback('begin');
    }

    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback('loopBegin');
    }

    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }

    if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
      setAnimationsProgress(insDuration);
    }

    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback('changeBegin');
      }

      setCallback('change');
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback('changeComplete');
      }
    }

    instance.currentTime = minMax(insTime, 0, insDuration);

    if (instance.began) {
      setCallback('update');
    }

    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();

      if (!instance.remaining) {
        instance.paused = true;

        if (!instance.completed) {
          instance.completed = true;
          setCallback('loopComplete');
          setCallback('complete');

          if (!instance.passThrough && 'Promise' in window) {
            resolve();
            promise = makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback('loopComplete');
        instance.loopBegan = false;

        if (instance.direction === 'alternate') {
          toggleInstanceDirection();
        }
      }
    }
  }

  instance.reset = function () {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === 'reverse';
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;

    for (var i = childrenLength; i--;) {
      instance.children[i].reset();
    }

    if (instance.reversed && instance.loop !== true || direction === 'alternate' && instance.loop === 1) {
      instance.remaining++;
    }

    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  }; // internal method (for engine) to adjust animation timings before restoring engine ticks (rAF)


  instance._onDocumentVisibility = resetTime; // Set Value helper

  instance.set = function (targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };

  instance.tick = function (t) {
    now = t;

    if (!startTime) {
      startTime = now;
    }

    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };

  instance.seek = function (time) {
    setInstanceProgress(adjustTime(time));
  };

  instance.pause = function () {
    instance.paused = true;
    resetTime();
  };

  instance.play = function () {
    if (!instance.paused) {
      return;
    }

    if (instance.completed) {
      instance.reset();
    }

    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    engine();
  };

  instance.reverse = function () {
    toggleInstanceDirection();
    instance.completed = instance.reversed ? false : true;
    resetTime();
  };

  instance.restart = function () {
    instance.reset();
    instance.play();
  };

  instance.remove = function (targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  };

  instance.reset();

  if (instance.autoplay) {
    instance.play();
  }

  return instance;
} // Remove targets from animation


function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--;) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}

function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations;
  var children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);

  for (var c = children.length; c--;) {
    var child = children[c];
    var childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations);

    if (!childAnimations.length && !child.children.length) {
      children.splice(c, 1);
    }
  }

  if (!animations.length && !children.length) {
    instance.pause();
  }
}

function removeTargetsFromActiveInstances(targets) {
  var targetsArray = parseTargets(targets);

  for (var i = activeInstances.length; i--;) {
    var instance = activeInstances[i];
    removeTargetsFromInstance(targetsArray, instance);
  }
} // Stagger helpers


function stagger(val, params) {
  if (params === void 0) params = {};
  var direction = params.direction || 'normal';
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === 'first';
  var fromCenter = fromIndex === 'center';
  var fromLast = fromIndex === 'last';
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    if (fromFirst) {
      fromIndex = 0;
    }

    if (fromCenter) {
      fromIndex = (t - 1) / 2;
    }

    if (fromLast) {
      fromIndex = t - 1;
    }

    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          var toX = index % grid[0];
          var toY = Math.floor(index / grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (axis === 'x') {
            value = -distanceX;
          }

          if (axis === 'y') {
            value = -distanceY;
          }

          values.push(value);
        }

        maxValue = Math.max.apply(Math, values);
      }

      if (easing) {
        values = values.map(function (val) {
          return easing(val / maxValue) * maxValue;
        });
      }

      if (direction === 'reverse') {
        values = values.map(function (val) {
          return axis ? val < 0 ? val * -1 : -val : Math.abs(maxValue - val);
        });
      }
    }

    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
  };
} // Timeline


function timeline(params) {
  if (params === void 0) params = {};
  var tl = anime(params);
  tl.duration = 0;

  tl.add = function (instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;

    if (tlIndex > -1) {
      activeInstances.splice(tlIndex, 1);
    }

    function passThrough(ins) {
      ins.passThrough = true;
    }

    for (var i = 0; i < children.length; i++) {
      passThrough(children[i]);
    }

    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();

    if (tl.autoplay) {
      tl.play();
    }

    return tl;
  };

  return tl;
}

anime.version = '3.2.1';
anime.speed = 1; // TODO:#review: naming, documentation

anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;

anime.random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = anime;
},{}],"RzoI":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).LocomotiveScroll = e();
}(this, function () {
  "use strict";

  function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function e(t, e) {
    for (var i = 0; i < e.length; i++) {
      var s = e[i];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
    }
  }

  function i(t, i, s) {
    return i && e(t.prototype, i), s && e(t, s), t;
  }

  function s(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = i, t;
  }

  function n(t, e) {
    var i = Object.keys(t);

    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(t);
      e && (s = s.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), i.push.apply(i, s);
    }

    return i;
  }

  function o(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = null != arguments[e] ? arguments[e] : {};
      e % 2 ? n(Object(i), !0).forEach(function (e) {
        s(t, e, i[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
      });
    }

    return t;
  }

  function r(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), e && a(t, e);
  }

  function l(t) {
    return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
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

  function d(t) {
    var e = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (t) {
        return !1;
      }
    }();

    return function () {
      var i,
          s = l(t);

      if (e) {
        var n = l(this).constructor;
        i = Reflect.construct(s, arguments, n);
      } else i = s.apply(this, arguments);

      return h(this, i);
    };
  }

  function u(t, e, i) {
    return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, i) {
      var s = function (t, e) {
        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = l(t));) {
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

  function f(t, e) {
    return function (t) {
      if (Array.isArray(t)) return t;
    }(t) || function (t, e) {
      if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
      var i = [],
          s = !0,
          n = !1,
          o = void 0;

      try {
        for (var r, l = t[Symbol.iterator](); !(s = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); s = !0) {
          ;
        }
      } catch (t) {
        n = !0, o = t;
      } finally {
        try {
          s || null == l.return || l.return();
        } finally {
          if (n) throw o;
        }
      }

      return i;
    }(t, e) || m(t, e) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function p(t) {
    return function (t) {
      if (Array.isArray(t)) return v(t);
    }(t) || function (t) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
    }(t) || m(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function m(t, e) {
    if (t) {
      if ("string" == typeof t) return v(t, e);
      var i = Object.prototype.toString.call(t).slice(8, -1);
      return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? v(t, e) : void 0;
    }
  }

  function v(t, e) {
    (null == e || e > t.length) && (e = t.length);

    for (var i = 0, s = new Array(e); i < e; i++) {
      s[i] = t[i];
    }

    return s;
  }

  var y = {
    el: document,
    name: "scroll",
    offset: [0, 0],
    repeat: !1,
    smooth: !1,
    initPosition: {
      x: 0,
      y: 0
    },
    direction: "vertical",
    gestureDirection: "vertical",
    reloadOnContextChange: !1,
    lerp: .1,
    class: "is-inview",
    scrollbarContainer: !1,
    scrollbarClass: "c-scrollbar",
    scrollingClass: "has-scroll-scrolling",
    draggingClass: "has-scroll-dragging",
    smoothClass: "has-scroll-smooth",
    initClass: "has-scroll-init",
    getSpeed: !1,
    getDirection: !1,
    scrollFromAnywhere: !1,
    multiplier: 1,
    firefoxMultiplier: 50,
    touchMultiplier: 2,
    resetNativeScroll: !0,
    tablet: {
      smooth: !1,
      direction: "vertical",
      gestureDirection: "vertical",
      breakpoint: 1024
    },
    smartphone: {
      smooth: !1,
      direction: "vertical",
      gestureDirection: "vertical"
    }
  },
      b = function () {
    function e() {
      var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e), Object.assign(this, y, i), this.smartphone = y.smartphone, i.smartphone && Object.assign(this.smartphone, i.smartphone), this.tablet = y.tablet, i.tablet && Object.assign(this.tablet, i.tablet), this.namespace = "locomotive", this.html = document.documentElement, this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.windowMiddle = {
        x: this.windowWidth / 2,
        y: this.windowHeight / 2
      }, this.els = {}, this.currentElements = {}, this.listeners = {}, this.hasScrollTicking = !1, this.hasCallEventSet = !1, this.checkScroll = this.checkScroll.bind(this), this.checkResize = this.checkResize.bind(this), this.checkEvent = this.checkEvent.bind(this), this.instance = {
        scroll: {
          x: 0,
          y: 0
        },
        limit: {
          x: this.html.offsetWidth,
          y: this.html.offsetHeight
        },
        currentElements: this.currentElements
      }, this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop", this.isMobile && (this.direction = this[this.context].direction), "horizontal" === this.direction ? this.directionAxis = "x" : this.directionAxis = "y", this.getDirection && (this.instance.direction = null), this.getDirection && (this.instance.speed = 0), this.html.classList.add(this.initClass), window.addEventListener("resize", this.checkResize, !1);
    }

    return i(e, [{
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
      key: "checkContext",
      value: function value() {
        if (this.reloadOnContextChange) {
          this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint, this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint;
          var t = this.context;
          if (this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop", t != this.context) ("desktop" == t ? this.smooth : this[t].smooth) != ("desktop" == this.context ? this.smooth : this[this.context].smooth) && window.location.reload();
        }
      }
    }, {
      key: "initEvents",
      value: function value() {
        var t = this;
        this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]")), this.setScrollTo = this.setScrollTo.bind(this), this.scrollToEls.forEach(function (e) {
          e.addEventListener("click", t.setScrollTo, !1);
        });
      }
    }, {
      key: "setScrollTo",
      value: function value(t) {
        t.preventDefault(), this.scrollTo(t.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t.currentTarget.getAttribute("href"), {
          offset: t.currentTarget.getAttribute("data-".concat(this.name, "-offset"))
        });
      }
    }, {
      key: "addElements",
      value: function value() {}
    }, {
      key: "detectElements",
      value: function value(t) {
        var e = this,
            i = this.instance.scroll.y,
            s = i + this.windowHeight,
            n = this.instance.scroll.x,
            o = n + this.windowWidth;
        Object.entries(this.els).forEach(function (r) {
          var l = f(r, 2),
              a = l[0],
              c = l[1];
          if (!c || c.inView && !t || ("horizontal" === e.direction ? o >= c.left && n < c.right && e.setInView(c, a) : s >= c.top && i < c.bottom && e.setInView(c, a)), c && c.inView) if ("horizontal" === e.direction) {
            var h = c.right - c.left;
            c.progress = (e.instance.scroll.x - (c.left - e.windowWidth)) / (h + e.windowWidth), (o < c.left || n > c.right) && e.setOutOfView(c, a);
          } else {
            var d = c.bottom - c.top;
            c.progress = (e.instance.scroll.y - (c.top - e.windowHeight)) / (d + e.windowHeight), (s < c.top || i > c.bottom) && e.setOutOfView(c, a);
          }
        }), this.hasScrollTicking = !1;
      }
    }, {
      key: "setInView",
      value: function value(t, e) {
        this.els[e].inView = !0, t.el.classList.add(t.class), this.currentElements[e] = t, t.call && this.hasCallEventSet && (this.dispatchCall(t, "enter"), t.repeat || (this.els[e].call = !1));
      }
    }, {
      key: "setOutOfView",
      value: function value(t, e) {
        var i = this;
        this.els[e].inView = !1, Object.keys(this.currentElements).forEach(function (t) {
          t === e && delete i.currentElements[t];
        }), t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"), t.repeat && t.el.classList.remove(t.class);
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
        var t = this;
        window.removeEventListener("resize", this.checkResize, !1), Object.keys(this.listeners).forEach(function (e) {
          t.el.removeEventListener(t.namespace + e, t.checkEvent, !1);
        }), this.listeners = {}, this.scrollToEls.forEach(function (e) {
          e.removeEventListener("click", t.setScrollTo, !1);
        }), this.html.classList.remove(this.initClass);
      }
    }]), e;
  }(),
      g = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

  function w(t, e) {
    return t(e = {
      exports: {}
    }, e.exports), e.exports;
  }

  var x = w(function (t, e) {
    t.exports = {
      polyfill: function polyfill() {
        var t = window,
            e = document;

        if (!("scrollBehavior" in e.documentElement.style) || !0 === t.__forceSmoothScrollPolyfill__) {
          var i,
              s = t.HTMLElement || t.Element,
              n = {
            scroll: t.scroll || t.scrollTo,
            scrollBy: t.scrollBy,
            elementScroll: s.prototype.scroll || l,
            scrollIntoView: s.prototype.scrollIntoView
          },
              o = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now,
              r = (i = t.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(i) ? 1 : 0);
          t.scroll = t.scrollTo = function () {
            void 0 !== arguments[0] && (!0 !== a(arguments[0]) ? p.call(t, e.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset) : n.scroll.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != _typeof(arguments[0]) ? arguments[0] : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset));
          }, t.scrollBy = function () {
            void 0 !== arguments[0] && (a(arguments[0]) ? n.scrollBy.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != _typeof(arguments[0]) ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : p.call(t, e.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset)));
          }, s.prototype.scroll = s.prototype.scrollTo = function () {
            if (void 0 !== arguments[0]) if (!0 !== a(arguments[0])) {
              var t = arguments[0].left,
                  e = arguments[0].top;
              p.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e);
            } else {
              if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
              n.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != _typeof(arguments[0]) ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop);
            }
          }, s.prototype.scrollBy = function () {
            void 0 !== arguments[0] && (!0 !== a(arguments[0]) ? this.scroll({
              left: ~~arguments[0].left + this.scrollLeft,
              top: ~~arguments[0].top + this.scrollTop,
              behavior: arguments[0].behavior
            }) : n.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop));
          }, s.prototype.scrollIntoView = function () {
            if (!0 !== a(arguments[0])) {
              var i = u(this),
                  s = i.getBoundingClientRect(),
                  o = this.getBoundingClientRect();
              i !== e.body ? (p.call(this, i, i.scrollLeft + o.left - s.left, i.scrollTop + o.top - s.top), "fixed" !== t.getComputedStyle(i).position && t.scrollBy({
                left: s.left,
                top: s.top,
                behavior: "smooth"
              })) : t.scrollBy({
                left: o.left,
                top: o.top,
                behavior: "smooth"
              });
            } else n.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
          };
        }

        function l(t, e) {
          this.scrollLeft = t, this.scrollTop = e;
        }

        function a(t) {
          if (null === t || "object" != _typeof(t) || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
          if ("object" == _typeof(t) && "smooth" === t.behavior) return !1;
          throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.");
        }

        function c(t, e) {
          return "Y" === e ? t.clientHeight + r < t.scrollHeight : "X" === e ? t.clientWidth + r < t.scrollWidth : void 0;
        }

        function h(e, i) {
          var s = t.getComputedStyle(e, null)["overflow" + i];
          return "auto" === s || "scroll" === s;
        }

        function d(t) {
          var e = c(t, "Y") && h(t, "Y"),
              i = c(t, "X") && h(t, "X");
          return e || i;
        }

        function u(t) {
          for (; t !== e.body && !1 === d(t);) {
            t = t.parentNode || t.host;
          }

          return t;
        }

        function f(e) {
          var i,
              s,
              n,
              r,
              l = (o() - e.startTime) / 468;
          r = l = l > 1 ? 1 : l, i = .5 * (1 - Math.cos(Math.PI * r)), s = e.startX + (e.x - e.startX) * i, n = e.startY + (e.y - e.startY) * i, e.method.call(e.scrollable, s, n), s === e.x && n === e.y || t.requestAnimationFrame(f.bind(t, e));
        }

        function p(i, s, r) {
          var a,
              c,
              h,
              d,
              u = o();
          i === e.body ? (a = t, c = t.scrollX || t.pageXOffset, h = t.scrollY || t.pageYOffset, d = n.scroll) : (a = i, c = i.scrollLeft, h = i.scrollTop, d = l), f({
            scrollable: a,
            method: d,
            startTime: u,
            startX: c,
            startY: h,
            x: s,
            y: r
          });
        }
      }
    };
  }),
      S = (x.polyfill, function (e) {
    r(n, e);
    var s = d(n);

    function n() {
      var e,
          i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return t(this, n), (e = s.call(this, i)).resetNativeScroll && (history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0)), window.addEventListener("scroll", e.checkScroll, !1), void 0 === window.smoothscrollPolyfill && (window.smoothscrollPolyfill = x, window.smoothscrollPolyfill.polyfill()), e;
    }

    return i(n, [{
      key: "init",
      value: function value() {
        this.instance.scroll.y = window.pageYOffset, this.addElements(), this.detectElements(), u(l(n.prototype), "init", this).call(this);
      }
    }, {
      key: "checkScroll",
      value: function value() {
        var t = this;
        u(l(n.prototype), "checkScroll", this).call(this), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.speedTs = Date.now()), this.instance.scroll.y = window.pageYOffset, Object.entries(this.els).length && (this.hasScrollTicking || (requestAnimationFrame(function () {
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
        window.pageYOffset != this.instance.scroll.y ? this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0;
      }
    }, {
      key: "resize",
      value: function value() {
        Object.entries(this.els).length && (this.windowHeight = window.innerHeight, this.updateElements());
      }
    }, {
      key: "addElements",
      value: function value() {
        var t = this;
        this.els = {}, this.el.querySelectorAll("[data-" + this.name + "]").forEach(function (e, i) {
          e.getBoundingClientRect();
          var s,
              n,
              o,
              r = e.dataset[t.name + "Class"] || t.class,
              l = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : i,
              a = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset,
              c = e.dataset[t.name + "Repeat"],
              h = e.dataset[t.name + "Call"],
              d = e.dataset[t.name + "Target"],
              u = (o = void 0 !== d ? document.querySelector("".concat(d)) : e).getBoundingClientRect();
          s = u.top + t.instance.scroll.y, n = u.left + t.instance.scroll.x;
          var f = s + o.offsetHeight,
              p = n + o.offsetWidth;
          c = "false" != c && (null != c || t.repeat);
          var m = t.getRelativeOffset(a),
              v = {
            el: e,
            targetEl: o,
            id: l,
            class: r,
            top: s += m[0],
            bottom: f -= m[1],
            left: n,
            right: p,
            offset: a,
            progress: 0,
            repeat: c,
            inView: !1,
            call: h
          };
          t.els[l] = v, e.classList.contains(r) && t.setInView(t.els[l], l);
        });
      }
    }, {
      key: "updateElements",
      value: function value() {
        var t = this;
        Object.entries(this.els).forEach(function (e) {
          var i = f(e, 2),
              s = i[0],
              n = i[1],
              o = n.targetEl.getBoundingClientRect().top + t.instance.scroll.y,
              r = o + n.targetEl.offsetHeight,
              l = t.getRelativeOffset(n.offset);
          t.els[s].top = o + l[0], t.els[s].bottom = r - l[1];
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
      value: function value(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = parseInt(e.offset) || 0,
            s = !!e.callback && e.callback;

        if ("string" == typeof t) {
          if ("top" === t) t = this.html;else if ("bottom" === t) t = this.html.offsetHeight - window.innerHeight;else if (!(t = document.querySelector(t))) return;
        } else if ("number" == typeof t) t = parseInt(t);else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid");

        i = "number" != typeof t ? t.getBoundingClientRect().top + i + this.instance.scroll.y : t + i;

        var n = function n() {
          return parseInt(window.pageYOffset) === parseInt(i);
        };

        if (s) {
          if (n()) return void s();

          var o = function t() {
            n() && (window.removeEventListener("scroll", t), s());
          };

          window.addEventListener("scroll", o);
        }

        window.scrollTo({
          top: i,
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
        u(l(n.prototype), "destroy", this).call(this), window.removeEventListener("scroll", this.checkScroll, !1);
      }
    }]), n;
  }(b)),
      k = Object.getOwnPropertySymbols,
      T = Object.prototype.hasOwnProperty,
      E = Object.prototype.propertyIsEnumerable;

  function A(t) {
    if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(t);
  }

  var O = function () {
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
    for (var i, s, n = A(t), o = 1; o < arguments.length; o++) {
      for (var r in i = Object(arguments[o])) {
        T.call(i, r) && (n[r] = i[r]);
      }

      if (k) {
        s = k(i);

        for (var l = 0; l < s.length; l++) {
          E.call(i, s[l]) && (n[s[l]] = i[s[l]]);
        }
      }
    }

    return n;
  };

  function D() {}

  D.prototype = {
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
      if (s && e) for (var o = 0, r = s.length; o < r; o++) {
        s[o].fn !== e && s[o].fn._ !== e && n.push(s[o]);
      }
      return n.length ? i[t] = n : delete i[t], this;
    }
  };
  var C = D,
      L = w(function (t, e) {
    (function () {
      (null !== e ? e : this).Lethargy = function () {
        function t(t, e, i, s) {
          this.stability = null != t ? Math.abs(t) : 8, this.sensitivity = null != e ? 1 + Math.abs(e) : 100, this.tolerance = null != i ? 1 + Math.abs(i) : 1.1, this.delay = null != s ? s : 150, this.lastUpDeltas = function () {
            var t, e, i;

            for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) {
              i.push(null);
            }

            return i;
          }.call(this), this.lastDownDeltas = function () {
            var t, e, i;

            for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) {
              i.push(null);
            }

            return i;
          }.call(this), this.deltasTimestamp = function () {
            var t, e, i;

            for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) {
              i.push(null);
            }

            return i;
          }.call(this);
        }

        return t.prototype.check = function (t) {
          var e;
          return null != (t = t.originalEvent || t).wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), e > 0 ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1));
        }, t.prototype.isInertia = function (t) {
          var e, i, s, n, o, r, l;
          return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (s = e.slice(0, this.stability), i = e.slice(this.stability, 2 * this.stability), l = s.reduce(function (t, e) {
            return t + e;
          }), o = i.reduce(function (t, e) {
            return t + e;
          }), r = l / s.length, n = o / i.length, Math.abs(r) < Math.abs(n * this.tolerance) && this.sensitivity < Math.abs(n) && t);
        }, t.prototype.showLastUpDeltas = function () {
          return this.lastUpDeltas;
        }, t.prototype.showLastDownDeltas = function () {
          return this.lastDownDeltas;
        }, t;
      }();
    }).call(g);
  }),
      M = {
    hasWheelEvent: "onwheel" in document,
    hasMouseWheelEvent: "onmousewheel" in document,
    hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch,
    hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
    hasPointer: !!window.navigator.msPointerEnabled,
    hasKeyDown: "onkeydown" in document,
    isFirefox: navigator.userAgent.indexOf("Firefox") > -1
  },
      j = Object.prototype.toString,
      _ = Object.prototype.hasOwnProperty;

  function B(t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  }

  var W = L.Lethargy,
      H = "virtualscroll",
      R = V,
      P = 37,
      Y = 38,
      I = 39,
      z = 40,
      X = 32;

  function V(t) {
    !function (t) {
      if (!t) return console.warn("bindAll requires at least one argument.");
      var e = Array.prototype.slice.call(arguments, 1);
      if (0 === e.length) for (var i in t) {
        _.call(t, i) && "function" == typeof t[i] && "[object Function]" == j.call(t[i]) && e.push(i);
      }

      for (var s = 0; s < e.length; s++) {
        var n = e[s];
        t[n] = B(t[n], t);
      }
    }(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"), this.el = window, t && t.el && (this.el = t.el, delete t.el), this.options = O({
      mouseMultiplier: 1,
      touchMultiplier: 2,
      firefoxMultiplier: 15,
      keyStep: 120,
      preventTouch: !1,
      unpreventTouchClass: "vs-touchmove-allowed",
      limitInertia: !1,
      useKeyboard: !0,
      useTouch: !0
    }, t), this.options.limitInertia && (this._lethargy = new W()), this._emitter = new C(), this._event = {
      y: 0,
      x: 0,
      deltaX: 0,
      deltaY: 0
    }, this.touchStartX = null, this.touchStartY = null, this.bodyTouchAction = null, void 0 !== this.options.passive && (this.listenerOptions = {
      passive: this.options.passive
    });
  }

  function F(t, e, i) {
    return (1 - i) * t + i * e;
  }

  function q(t) {
    var e = {};

    if (window.getComputedStyle) {
      var i = getComputedStyle(t),
          s = i.transform || i.webkitTransform || i.mozTransform,
          n = s.match(/^matrix3d\((.+)\)$/);
      return n ? (e.x = n ? parseFloat(n[1].split(", ")[12]) : 0, e.y = n ? parseFloat(n[1].split(", ")[13]) : 0) : (n = s.match(/^matrix\((.+)\)$/), e.x = n ? parseFloat(n[1].split(", ")[4]) : 0, e.y = n ? parseFloat(n[1].split(", ")[5]) : 0), e;
    }
  }

  function K(t) {
    for (var e = []; t && t !== document; t = t.parentNode) {
      e.push(t);
    }

    return e;
  }

  V.prototype._notify = function (t) {
    var e = this._event;
    e.x += e.deltaX, e.y += e.deltaY, this._emitter.emit(H, {
      x: e.x,
      y: e.y,
      deltaX: e.deltaX,
      deltaY: e.deltaY,
      originalEvent: t
    });
  }, V.prototype._onWheel = function (t) {
    var e = this.options;

    if (!this._lethargy || !1 !== this._lethargy.check(t)) {
      var i = this._event;
      i.deltaX = t.wheelDeltaX || -1 * t.deltaX, i.deltaY = t.wheelDeltaY || -1 * t.deltaY, M.isFirefox && 1 == t.deltaMode && (i.deltaX *= e.firefoxMultiplier, i.deltaY *= e.firefoxMultiplier), i.deltaX *= e.mouseMultiplier, i.deltaY *= e.mouseMultiplier, this._notify(t);
    }
  }, V.prototype._onMouseWheel = function (t) {
    if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
      var e = this._event;
      e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, this._notify(t);
    }
  }, V.prototype._onTouchStart = function (t) {
    var e = t.targetTouches ? t.targetTouches[0] : t;
    this.touchStartX = e.pageX, this.touchStartY = e.pageY;
  }, V.prototype._onTouchMove = function (t) {
    var e = this.options;
    e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
    var i = this._event,
        s = t.targetTouches ? t.targetTouches[0] : t;
    i.deltaX = (s.pageX - this.touchStartX) * e.touchMultiplier, i.deltaY = (s.pageY - this.touchStartY) * e.touchMultiplier, this.touchStartX = s.pageX, this.touchStartY = s.pageY, this._notify(t);
  }, V.prototype._onKeyDown = function (t) {
    var e = this._event;
    e.deltaX = e.deltaY = 0;
    var i = window.innerHeight - 40;

    switch (t.keyCode) {
      case P:
      case Y:
        e.deltaY = this.options.keyStep;
        break;

      case I:
      case z:
        e.deltaY = -this.options.keyStep;
        break;

      case t.shiftKey:
        e.deltaY = i;
        break;

      case X:
        e.deltaY = -i;
        break;

      default:
        return;
    }

    this._notify(t);
  }, V.prototype._bind = function () {
    M.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions), M.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), M.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), M.hasPointer && M.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.el.addEventListener("MSPointerDown", this._onTouchStart, !0), this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)), M.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown);
  }, V.prototype._unbind = function () {
    M.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel), M.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel), M.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)), M.hasPointer && M.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)), M.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown);
  }, V.prototype.on = function (t, e) {
    this._emitter.on(H, t, e);

    var i = this._emitter.e;
    i && i[H] && 1 === i[H].length && this._bind();
  }, V.prototype.off = function (t, e) {
    this._emitter.off(H, t, e);

    var i = this._emitter.e;
    (!i[H] || i[H].length <= 0) && this._unbind();
  }, V.prototype.reset = function () {
    var t = this._event;
    t.x = 0, t.y = 0;
  }, V.prototype.destroy = function () {
    this._emitter.off(), this._unbind();
  };
  var N = "function" == typeof Float32Array;

  function U(t, e) {
    return 1 - 3 * e + 3 * t;
  }

  function $(t, e) {
    return 3 * e - 6 * t;
  }

  function G(t) {
    return 3 * t;
  }

  function J(t, e, i) {
    return ((U(e, i) * t + $(e, i)) * t + G(e)) * t;
  }

  function Q(t, e, i) {
    return 3 * U(e, i) * t * t + 2 * $(e, i) * t + G(e);
  }

  function Z(t) {
    return t;
  }

  var tt = function tt(t, e, i, s) {
    if (!(0 <= t && t <= 1 && 0 <= i && i <= 1)) throw new Error("bezier x values must be in [0, 1] range");
    if (t === e && i === s) return Z;

    for (var n = N ? new Float32Array(11) : new Array(11), o = 0; o < 11; ++o) {
      n[o] = J(.1 * o, t, i);
    }

    function r(e) {
      for (var s = 0, o = 1; 10 !== o && n[o] <= e; ++o) {
        s += .1;
      }

      --o;
      var r = s + .1 * ((e - n[o]) / (n[o + 1] - n[o])),
          l = Q(r, t, i);
      return l >= .001 ? function (t, e, i, s) {
        for (var n = 0; n < 4; ++n) {
          var o = Q(e, i, s);
          if (0 === o) return e;
          e -= (J(e, i, s) - t) / o;
        }

        return e;
      }(e, r, t, i) : 0 === l ? r : function (t, e, i, s, n) {
        var o,
            r,
            l = 0;

        do {
          (o = J(r = e + (i - e) / 2, s, n) - t) > 0 ? i = r : e = r;
        } while (Math.abs(o) > 1e-7 && ++l < 10);

        return r;
      }(e, s, s + .1, t, i);
    }

    return function (t) {
      return 0 === t ? 0 : 1 === t ? 1 : J(r(t), e, s);
    };
  },
      et = 38,
      it = 40,
      st = 32,
      nt = 9,
      ot = 33,
      rt = 34,
      lt = 36,
      at = 35,
      ct = function (e) {
    r(n, e);
    var s = d(n);

    function n() {
      var e,
          i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return t(this, n), history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0), (e = s.call(this, i)).inertia && (e.lerp = .1 * e.inertia), e.isScrolling = !1, e.isDraggingScrollbar = !1, e.isTicking = !1, e.hasScrollTicking = !1, e.parallaxElements = {}, e.stop = !1, e.scrollbarContainer = i.scrollbarContainer, e.checkKey = e.checkKey.bind(c(e)), window.addEventListener("keydown", e.checkKey, !1), e;
    }

    return i(n, [{
      key: "init",
      value: function value() {
        var t = this;
        this.html.classList.add(this.smoothClass), this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction), this.instance = o({
          delta: {
            x: this.initPosition.x,
            y: this.initPosition.y
          },
          scroll: {
            x: this.initPosition.x,
            y: this.initPosition.y
          }
        }, this.instance), this.vs = new R({
          el: this.scrollFromAnywhere ? document : this.el,
          mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : .4,
          firefoxMultiplier: this.firefoxMultiplier,
          touchMultiplier: this.touchMultiplier,
          useKeyboard: !1,
          passive: !0
        }), this.vs.on(function (e) {
          t.stop || t.isDraggingScrollbar || requestAnimationFrame(function () {
            t.updateDelta(e), t.isScrolling || t.startScrolling();
          });
        }), this.setScrollLimit(), this.initScrollBar(), this.addSections(), this.addElements(), this.checkScroll(!0), this.transformElements(!0, !0), u(l(n.prototype), "init", this).call(this);
      }
    }, {
      key: "setScrollLimit",
      value: function value() {
        if (this.instance.limit.y = this.el.offsetHeight - this.windowHeight, "horizontal" === this.direction) {
          for (var t = 0, e = this.el.children, i = 0; i < e.length; i++) {
            t += e[i].offsetWidth;
          }

          this.instance.limit.x = t - this.windowWidth;
        }
      }
    }, {
      key: "startScrolling",
      value: function value() {
        this.startScrollTs = Date.now(), this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass);
      }
    }, {
      key: "stopScrolling",
      value: function value() {
        cancelAnimationFrame(this.checkScrollRaf), this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf), this.scrollToRaf = null), this.isScrolling = !1, this.instance.scroll.y = Math.round(this.instance.scroll.y), this.html.classList.remove(this.scrollingClass);
      }
    }, {
      key: "checkKey",
      value: function value(t) {
        var e = this;
        if (this.stop) t.keyCode == nt && requestAnimationFrame(function () {
          e.html.scrollTop = 0, document.body.scrollTop = 0, e.html.scrollLeft = 0, document.body.scrollLeft = 0;
        });else {
          switch (t.keyCode) {
            case nt:
              requestAnimationFrame(function () {
                e.html.scrollTop = 0, document.body.scrollTop = 0, e.html.scrollLeft = 0, document.body.scrollLeft = 0, e.scrollTo(document.activeElement, {
                  offset: -window.innerHeight / 2
                });
              });
              break;

            case et:
              this.instance.delta[this.directionAxis] -= 240;
              break;

            case it:
              this.instance.delta[this.directionAxis] += 240;
              break;

            case ot:
              this.instance.delta[this.directionAxis] -= window.innerHeight;
              break;

            case rt:
              this.instance.delta[this.directionAxis] += window.innerHeight;
              break;

            case lt:
              this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
              break;

            case at:
              this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
              break;

            case st:
              document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || (t.shiftKey ? this.instance.delta[this.directionAxis] -= window.innerHeight : this.instance.delta[this.directionAxis] += window.innerHeight);
              break;

            default:
              return;
          }

          this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0), this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]), this.stopScrolling(), this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass);
        }
      }
    }, {
      key: "checkScroll",
      value: function value() {
        var t = this,
            e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];

        if (e || this.isScrolling || this.isDraggingScrollbar) {
          this.hasScrollTicking || (this.checkScrollRaf = requestAnimationFrame(function () {
            return t.checkScroll();
          }), this.hasScrollTicking = !0), this.updateScroll();
          var i = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]),
              s = Date.now() - this.startScrollTs;

          if (!this.animatingScroll && s > 100 && (i < .5 && 0 != this.instance.delta[this.directionAxis] || i < .5 && 0 == this.instance.delta[this.directionAxis]) && this.stopScrolling(), Object.entries(this.sections).forEach(function (i) {
            var s = f(i, 2),
                n = (s[0], s[1]);
            n.persistent || t.instance.scroll[t.directionAxis] > n.offset[t.directionAxis] && t.instance.scroll[t.directionAxis] < n.limit[t.directionAxis] ? ("horizontal" === t.direction ? t.transform(n.el, -t.instance.scroll[t.directionAxis], 0) : t.transform(n.el, 0, -t.instance.scroll[t.directionAxis]), n.inView || (n.inView = !0, n.el.style.opacity = 1, n.el.style.pointerEvents = "all", n.el.setAttribute("data-".concat(t.name, "-section-inview"), ""))) : ((n.inView || e) && (n.inView = !1, n.el.style.opacity = 0, n.el.style.pointerEvents = "none", n.el.removeAttribute("data-".concat(t.name, "-section-inview"))), t.transform(n.el, 0, 0));
          }), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.speedTs = Date.now()), this.detectElements(), this.transformElements(), this.hasScrollbar) {
            var o = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis];
            "horizontal" === this.direction ? this.transform(this.scrollbarThumb, o, 0) : this.transform(this.scrollbarThumb, 0, o);
          }

          u(l(n.prototype), "checkScroll", this).call(this), this.hasScrollTicking = !1;
        }
      }
    }, {
      key: "resize",
      value: function value() {
        this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.checkContext(), this.windowMiddle = {
          x: this.windowWidth / 2,
          y: this.windowHeight / 2
        }, this.update();
      }
    }, {
      key: "updateDelta",
      value: function value(t) {
        var e,
            i = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
        e = "both" === i ? t.deltaX + t.deltaY : "vertical" === i ? t.deltaY : "horizontal" === i ? t.deltaX : t.deltaY, this.instance.delta[this.directionAxis] -= e * this.multiplier, this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0), this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]);
      }
    }, {
      key: "updateScroll",
      value: function value(t) {
        this.isScrolling || this.isDraggingScrollbar ? this.instance.scroll[this.directionAxis] = F(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp) : this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis] ? this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]) : this.instance.scroll.y < 0 ? this.setScroll(this.instance.scroll[this.directionAxis], 0) : this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
      }
    }, {
      key: "addDirection",
      value: function value() {
        this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up"), this.instance.delta.x > this.instance.scroll.x ? "right" !== this.instance.direction && (this.instance.direction = "right") : this.instance.delta.x < this.instance.scroll.x && "left" !== this.instance.direction && (this.instance.direction = "left");
      }
    }, {
      key: "addSpeed",
      value: function value() {
        this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis] ? this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0;
      }
    }, {
      key: "initScrollBar",
      value: function value() {
        if (this.scrollbar = document.createElement("span"), this.scrollbarThumb = document.createElement("span"), this.scrollbar.classList.add("".concat(this.scrollbarClass)), this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")), this.scrollbar.append(this.scrollbarThumb), this.scrollbarContainer ? this.scrollbarContainer.append(this.scrollbar) : document.body.append(this.scrollbar), this.getScrollBar = this.getScrollBar.bind(this), this.releaseScrollBar = this.releaseScrollBar.bind(this), this.moveScrollBar = this.moveScrollBar.bind(this), this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar), window.addEventListener("mouseup", this.releaseScrollBar), window.addEventListener("mousemove", this.moveScrollBar), this.hasScrollbar = !1, "horizontal" == this.direction) {
          if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
        } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;

        this.hasScrollbar = !0, this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarWidth = this.scrollbarBCR.width, "horizontal" === this.direction ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"), this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(), this.scrollBarLimit = {
          x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
          y: this.scrollbarHeight - this.scrollbarThumbBCR.height
        };
      }
    }, {
      key: "reinitScrollBar",
      value: function value() {
        if (this.hasScrollbar = !1, "horizontal" == this.direction) {
          if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
        } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;

        this.hasScrollbar = !0, this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarWidth = this.scrollbarBCR.width, "horizontal" === this.direction ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"), this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(), this.scrollBarLimit = {
          x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
          y: this.scrollbarHeight - this.scrollbarThumbBCR.height
        };
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
      value: function value(t) {
        var e = this;
        this.isDraggingScrollbar && requestAnimationFrame(function () {
          var i = 100 * (t.clientX - e.scrollbarBCR.left) / e.scrollbarWidth * e.instance.limit.x / 100,
              s = 100 * (t.clientY - e.scrollbarBCR.top) / e.scrollbarHeight * e.instance.limit.y / 100;
          s > 0 && s < e.instance.limit.y && (e.instance.delta.y = s), i > 0 && i < e.instance.limit.x && (e.instance.delta.x = i);
        });
      }
    }, {
      key: "addElements",
      value: function value() {
        var t = this;
        this.els = {}, this.parallaxElements = {}, this.el.querySelectorAll("[data-".concat(this.name, "]")).forEach(function (e, i) {
          var s,
              n,
              o,
              r = K(e),
              l = Object.entries(t.sections).map(function (t) {
            var e = f(t, 2);
            e[0];
            return e[1];
          }).find(function (t) {
            return r.includes(t.el);
          }),
              a = e.dataset[t.name + "Class"] || t.class,
              c = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "el" + i,
              h = e.dataset[t.name + "Repeat"],
              d = e.dataset[t.name + "Call"],
              u = e.dataset[t.name + "Position"],
              p = e.dataset[t.name + "Delay"],
              m = e.dataset[t.name + "Direction"],
              v = "string" == typeof e.dataset[t.name + "Sticky"],
              y = !!e.dataset[t.name + "Speed"] && parseFloat(e.dataset[t.name + "Speed"]) / 10,
              b = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset,
              g = e.dataset[t.name + "Target"],
              w = (o = void 0 !== g ? document.querySelector("".concat(g)) : e).getBoundingClientRect();
          null === l || l.inView ? (s = w.top + t.instance.scroll.y - q(o).y, n = w.left + t.instance.scroll.x - q(o).x) : (s = w.top - q(l.el).y - q(o).y, n = w.left - q(l.el).x - q(o).x);
          var x = s + o.offsetHeight,
              S = n + o.offsetWidth,
              k = {
            x: (S - n) / 2 + n,
            y: (x - s) / 2 + s
          };

          if (v) {
            var T = e.getBoundingClientRect(),
                E = T.top,
                A = T.left,
                O = {
              x: A - n,
              y: E - s
            };
            s += window.innerHeight, n += window.innerWidth, x = E + o.offsetHeight - e.offsetHeight - O[t.directionAxis], k = {
              x: ((S = A + o.offsetWidth - e.offsetWidth - O[t.directionAxis]) - n) / 2 + n,
              y: (x - s) / 2 + s
            };
          }

          h = "false" != h && (null != h || t.repeat);
          var D = [0, 0];
          if (b) if ("horizontal" === t.direction) {
            for (var C = 0; C < b.length; C++) {
              "string" == typeof b[C] ? b[C].includes("%") ? D[C] = parseInt(b[C].replace("%", "") * t.windowWidth / 100) : D[C] = parseInt(b[C]) : D[C] = b[C];
            }

            n += D[0], S -= D[1];
          } else {
            for (C = 0; C < b.length; C++) {
              "string" == typeof b[C] ? b[C].includes("%") ? D[C] = parseInt(b[C].replace("%", "") * t.windowHeight / 100) : D[C] = parseInt(b[C]) : D[C] = b[C];
            }

            s += D[0], x -= D[1];
          }
          var L = {
            el: e,
            id: c,
            class: a,
            section: l,
            top: s,
            middle: k,
            bottom: x,
            left: n,
            right: S,
            offset: b,
            progress: 0,
            repeat: h,
            inView: !1,
            call: d,
            speed: y,
            delay: p,
            position: u,
            target: o,
            direction: m,
            sticky: v
          };
          t.els[c] = L, e.classList.contains(a) && t.setInView(t.els[c], c), (!1 !== y || v) && (t.parallaxElements[c] = L);
        });
      }
    }, {
      key: "addSections",
      value: function value() {
        var t = this;
        this.sections = {};
        var e = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
        0 === e.length && (e = [this.el]), e.forEach(function (e, i) {
          var s = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "section" + i,
              n = e.getBoundingClientRect(),
              o = {
            x: n.left - 1.5 * window.innerWidth - q(e).x,
            y: n.top - 1.5 * window.innerHeight - q(e).y
          },
              r = {
            x: o.x + n.width + 2 * window.innerWidth,
            y: o.y + n.height + 2 * window.innerHeight
          },
              l = "string" == typeof e.dataset[t.name + "Persistent"];
          e.setAttribute("data-scroll-section-id", s);
          var a = {
            el: e,
            offset: o,
            limit: r,
            inView: !1,
            persistent: l,
            id: s
          };
          t.sections[s] = a;
        });
      }
    }, {
      key: "transform",
      value: function value(t, e, i, s) {
        var n;

        if (s) {
          var o = q(t),
              r = F(o.x, e, s),
              l = F(o.y, i, s);
          n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(r, ",").concat(l, ",0,1)");
        } else n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(e, ",").concat(i, ",0,1)");

        t.style.webkitTransform = n, t.style.msTransform = n, t.style.transform = n;
      }
    }, {
      key: "transformElements",
      value: function value(t) {
        var e = this,
            i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            s = this.instance.scroll.x + this.windowWidth,
            n = this.instance.scroll.y + this.windowHeight,
            o = {
          x: this.instance.scroll.x + this.windowMiddle.x,
          y: this.instance.scroll.y + this.windowMiddle.y
        };
        Object.entries(this.parallaxElements).forEach(function (r) {
          var l = f(r, 2),
              a = (l[0], l[1]),
              c = !1;
          if (t && (c = 0), a.inView || i) switch (a.position) {
            case "top":
              c = e.instance.scroll[e.directionAxis] * -a.speed;
              break;

            case "elementTop":
              c = (n - a.top) * -a.speed;
              break;

            case "bottom":
              c = (e.instance.limit[e.directionAxis] - n + e.windowHeight) * a.speed;
              break;

            case "left":
              c = e.instance.scroll[e.directionAxis] * -a.speed;
              break;

            case "elementLeft":
              c = (s - a.left) * -a.speed;
              break;

            case "right":
              c = (e.instance.limit[e.directionAxis] - s + e.windowHeight) * a.speed;
              break;

            default:
              c = (o[e.directionAxis] - a.middle[e.directionAxis]) * -a.speed;
          }
          a.sticky && (c = a.inView ? "horizontal" === e.direction ? e.instance.scroll.x - a.left + window.innerWidth : e.instance.scroll.y - a.top + window.innerHeight : "horizontal" === e.direction ? e.instance.scroll.x < a.left - window.innerWidth && e.instance.scroll.x < a.left - window.innerWidth / 2 ? 0 : e.instance.scroll.x > a.right && e.instance.scroll.x > a.right + 100 && a.right - a.left + window.innerWidth : e.instance.scroll.y < a.top - window.innerHeight && e.instance.scroll.y < a.top - window.innerHeight / 2 ? 0 : e.instance.scroll.y > a.bottom && e.instance.scroll.y > a.bottom + 100 && a.bottom - a.top + window.innerHeight), !1 !== c && ("horizontal" === a.direction || "horizontal" === e.direction && "vertical" !== a.direction ? e.transform(a.el, c, 0, !t && a.delay) : e.transform(a.el, 0, c, !t && a.delay));
        });
      }
    }, {
      key: "scrollTo",
      value: function value(t) {
        var e = this,
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            s = parseInt(i.offset) || 0,
            n = isNaN(parseInt(i.duration)) ? 1e3 : parseInt(i.duration),
            o = i.easing || [.25, 0, .35, 1],
            r = !!i.disableLerp,
            l = !!i.callback && i.callback;

        if (o = tt.apply(void 0, p(o)), "string" == typeof t) {
          if ("top" === t) t = 0;else if ("bottom" === t) t = this.instance.limit.y;else if ("left" === t) t = 0;else if ("right" === t) t = this.instance.limit.x;else if (!(t = document.querySelector(t))) return;
        } else if ("number" == typeof t) t = parseInt(t);else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid");

        if ("number" != typeof t) {
          var a = K(t).includes(this.el);
          if (!a) return;
          var c = t.getBoundingClientRect(),
              h = c.top,
              d = c.left,
              u = K(t),
              m = u.find(function (t) {
            return Object.entries(e.sections).map(function (t) {
              var e = f(t, 2);
              e[0];
              return e[1];
            }).find(function (e) {
              return e.el == t;
            });
          }),
              v = 0;
          v = m ? q(m)[this.directionAxis] : -this.instance.scroll[this.directionAxis], s = "horizontal" === this.direction ? d + s - v : h + s - v;
        } else s = t + s;

        var y = parseFloat(this.instance.delta[this.directionAxis]),
            b = Math.max(0, Math.min(s, this.instance.limit[this.directionAxis])),
            g = b - y,
            w = function w(t) {
          r ? "horizontal" === e.direction ? e.setScroll(y + g * t, e.instance.delta.y) : e.setScroll(e.instance.delta.x, y + g * t) : e.instance.delta[e.directionAxis] = y + g * t;
        };

        this.animatingScroll = !0, this.stopScrolling(), this.startScrolling();

        var x = Date.now(),
            S = function t() {
          var i = (Date.now() - x) / n;
          i > 1 ? (w(1), e.animatingScroll = !1, 0 == n && e.update(), l && l()) : (e.scrollToRaf = requestAnimationFrame(t), w(o(i)));
        };

        S();
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
        this.instance = o(o({}, this.instance), {}, {
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
        u(l(n.prototype), "destroy", this).call(this), this.stopScrolling(), this.html.classList.remove(this.smoothClass), this.vs.destroy(), this.destroyScrollBar(), window.removeEventListener("keydown", this.checkKey, !1);
      }
    }]), n;
  }(b);

  return function () {
    function e() {
      var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, e), this.options = i, Object.assign(this, y, i), this.smartphone = y.smartphone, i.smartphone && Object.assign(this.smartphone, i.smartphone), this.tablet = y.tablet, i.tablet && Object.assign(this.tablet, i.tablet), this.smooth || "horizontal" != this.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible"), this.tablet.smooth || "horizontal" != this.tablet.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)"), this.smartphone.smooth || "horizontal" != this.smartphone.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"), this.init();
    }

    return i(e, [{
      key: "init",
      value: function value() {
        if (this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint, this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint, this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet ? this.scroll = new ct(this.options) : this.scroll = new S(this.options), this.scroll.init(), window.location.hash) {
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
      value: function value(t, e) {
        this.scroll.scrollTo(t, e);
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
},{}],"tja2":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Scrollbar = e() : t.Scrollbar = e();
}(this, function () {
  return function (t) {
    var e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      var o = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }

    return n.m = t, n.c = e, n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: r
      });
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var o in t) {
        n.d(r, o, function (e) {
          return t[e];
        }.bind(null, o));
      }
      return r;
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 67);
  }([function (t, e, n) {
    (function (e) {
      var n = function n(t) {
        return t && t.Math == Math && t;
      };

      t.exports = n("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) && globalThis) || n("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window) || n("object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self) || n("object" == _typeof(e) && e) || Function("return this")();
    }).call(this, n(43));
  }, function (t, e, n) {
    var r = n(0),
        o = n(51),
        i = n(3),
        u = n(29),
        c = n(56),
        a = n(76),
        s = o("wks"),
        f = r.Symbol,
        l = a ? f : f && f.withoutSetter || u;

    t.exports = function (t) {
      return i(s, t) || (c && i(f, t) ? s[t] = f[t] : s[t] = l("Symbol." + t)), s[t];
    };
  }, function (t, e) {
    t.exports = function (t) {
      return "object" == _typeof(t) ? null !== t : "function" == typeof t;
    };
  }, function (t, e) {
    var n = {}.hasOwnProperty;

    t.exports = function (t, e) {
      return n.call(t, e);
    };
  }, function (t, e) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  }, function (t, e, n) {
    var r = n(6),
        o = n(46),
        i = n(7),
        u = n(25),
        c = Object.defineProperty;
    e.f = r ? c : function (t, e, n) {
      if (i(t), e = u(e, !0), i(n), o) try {
        return c(t, e, n);
      } catch (t) {}
      if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
      return "value" in n && (t[e] = n.value), t;
    };
  }, function (t, e, n) {
    var r = n(4);
    t.exports = !r(function () {
      return 7 != Object.defineProperty({}, 1, {
        get: function get() {
          return 7;
        }
      })[1];
    });
  }, function (t, e, n) {
    var r = n(2);

    t.exports = function (t) {
      if (!r(t)) throw TypeError(String(t) + " is not an object");
      return t;
    };
  }, function (t, e, n) {
    var r = n(6),
        o = n(5),
        i = n(14);
    t.exports = r ? function (t, e, n) {
      return o.f(t, e, i(1, n));
    } : function (t, e, n) {
      return t[e] = n, t;
    };
  }, function (t, e, n) {
    var r,
        o,
        i,
        u = n(50),
        c = n(0),
        a = n(2),
        s = n(8),
        f = n(3),
        l = n(27),
        p = n(16),
        h = c.WeakMap;

    if (u) {
      var d = new h(),
          v = d.get,
          y = d.has,
          m = d.set;
      r = function r(t, e) {
        return m.call(d, t, e), e;
      }, o = function o(t) {
        return v.call(d, t) || {};
      }, i = function i(t) {
        return y.call(d, t);
      };
    } else {
      var g = l("state");
      p[g] = !0, r = function r(t, e) {
        return s(t, g, e), e;
      }, o = function o(t) {
        return f(t, g) ? t[g] : {};
      }, i = function i(t) {
        return f(t, g);
      };
    }

    t.exports = {
      set: r,
      get: o,
      has: i,
      enforce: function enforce(t) {
        return i(t) ? o(t) : r(t, {});
      },
      getterFor: function getterFor(t) {
        return function (e) {
          var n;
          if (!a(e) || (n = o(e)).type !== t) throw TypeError("Incompatible receiver, " + t + " required");
          return n;
        };
      }
    };
  }, function (t, e, n) {
    var r = n(0);
    t.exports = r;
  }, function (t, e, n) {
    var r = n(0),
        o = n(8),
        i = n(3),
        u = n(26),
        c = n(48),
        a = n(9),
        s = a.get,
        f = a.enforce,
        l = String(String).split("String");
    (t.exports = function (t, e, n, c) {
      var a = !!c && !!c.unsafe,
          s = !!c && !!c.enumerable,
          p = !!c && !!c.noTargetGet;
      "function" == typeof n && ("string" != typeof e || i(n, "name") || o(n, "name", e), f(n).source = l.join("string" == typeof e ? e : "")), t !== r ? (a ? !p && t[e] && (s = !0) : delete t[e], s ? t[e] = n : o(t, e, n)) : s ? t[e] = n : u(e, n);
    })(Function.prototype, "toString", function () {
      return "function" == typeof this && s(this).source || c(this);
    });
  }, function (t, e) {
    t.exports = {};
  }, function (t, e, n) {
    var r = n(0),
        o = n(44).f,
        i = n(8),
        u = n(11),
        c = n(26),
        a = n(70),
        s = n(54);

    t.exports = function (t, e) {
      var n,
          f,
          l,
          p,
          h,
          d = t.target,
          v = t.global,
          y = t.stat;
      if (n = v ? r : y ? r[d] || c(d, {}) : (r[d] || {}).prototype) for (f in e) {
        if (p = e[f], l = t.noTargetGet ? (h = o(n, f)) && h.value : n[f], !s(v ? f : d + (y ? "." : "#") + f, t.forced) && void 0 !== l) {
          if (_typeof(p) == _typeof(l)) continue;
          a(p, l);
        }

        (t.sham || l && l.sham) && i(p, "sham", !0), u(n, f, p, t);
      }
    };
  }, function (t, e) {
    t.exports = function (t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e
      };
    };
  }, function (t, e, n) {
    var r = n(22),
        o = n(24);

    t.exports = function (t) {
      return r(o(t));
    };
  }, function (t, e) {
    t.exports = {};
  }, function (t, e, n) {
    var r = n(31),
        o = Math.min;

    t.exports = function (t) {
      return t > 0 ? o(r(t), 9007199254740991) : 0;
    };
  }, function (t, e, n) {
    var r = n(16),
        o = n(2),
        i = n(3),
        u = n(5).f,
        c = n(29),
        a = n(75),
        s = c("meta"),
        f = 0,
        l = Object.isExtensible || function () {
      return !0;
    },
        p = function p(t) {
      u(t, s, {
        value: {
          objectID: "O" + ++f,
          weakData: {}
        }
      });
    },
        h = t.exports = {
      REQUIRED: !1,
      fastKey: function fastKey(t, e) {
        if (!o(t)) return "symbol" == _typeof(t) ? t : ("string" == typeof t ? "S" : "P") + t;

        if (!i(t, s)) {
          if (!l(t)) return "F";
          if (!e) return "E";
          p(t);
        }

        return t[s].objectID;
      },
      getWeakData: function getWeakData(t, e) {
        if (!i(t, s)) {
          if (!l(t)) return !0;
          if (!e) return !1;
          p(t);
        }

        return t[s].weakData;
      },
      onFreeze: function onFreeze(t) {
        return a && h.REQUIRED && l(t) && !i(t, s) && p(t), t;
      }
    };

    r[s] = !0;
  }, function (t, e, n) {
    var r = n(77);

    t.exports = function (t, e, n) {
      if (r(t), void 0 === e) return t;

      switch (n) {
        case 0:
          return function () {
            return t.call(e);
          };

        case 1:
          return function (n) {
            return t.call(e, n);
          };

        case 2:
          return function (n, r) {
            return t.call(e, n, r);
          };

        case 3:
          return function (n, r, o) {
            return t.call(e, n, r, o);
          };
      }

      return function () {
        return t.apply(e, arguments);
      };
    };
  }, function (t, e, n) {
    var r = n(24);

    t.exports = function (t) {
      return Object(r(t));
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(13),
        o = n(0),
        i = n(54),
        u = n(11),
        c = n(18),
        a = n(33),
        s = n(35),
        f = n(2),
        l = n(4),
        p = n(60),
        h = n(36),
        d = n(78);

    t.exports = function (t, e, n) {
      var v = -1 !== t.indexOf("Map"),
          y = -1 !== t.indexOf("Weak"),
          m = v ? "set" : "add",
          g = o[t],
          b = g && g.prototype,
          x = g,
          w = {},
          S = function S(t) {
        var e = b[t];
        u(b, t, "add" == t ? function (t) {
          return e.call(this, 0 === t ? 0 : t), this;
        } : "delete" == t ? function (t) {
          return !(y && !f(t)) && e.call(this, 0 === t ? 0 : t);
        } : "get" == t ? function (t) {
          return y && !f(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
        } : "has" == t ? function (t) {
          return !(y && !f(t)) && e.call(this, 0 === t ? 0 : t);
        } : function (t, n) {
          return e.call(this, 0 === t ? 0 : t, n), this;
        });
      };

      if (i(t, "function" != typeof g || !(y || b.forEach && !l(function () {
        new g().entries().next();
      })))) x = n.getConstructor(e, t, v, m), c.REQUIRED = !0;else if (i(t, !0)) {
        var O = new x(),
            _ = O[m](y ? {} : -0, 1) != O,
            E = l(function () {
          O.has(1);
        }),
            T = p(function (t) {
          new g(t);
        }),
            A = !y && l(function () {
          for (var t = new g(), e = 5; e--;) {
            t[m](e, e);
          }

          return !t.has(-0);
        });

        T || ((x = e(function (e, n) {
          s(e, x, t);
          var r = d(new g(), e, x);
          return null != n && a(n, r[m], r, v), r;
        })).prototype = b, b.constructor = x), (E || A) && (S("delete"), S("has"), v && S("get")), (A || _) && S(m), y && b.clear && delete b.clear;
      }
      return w[t] = x, r({
        global: !0,
        forced: x != g
      }, w), h(x, t), y || n.setStrong(x, t, v), x;
    };
  }, function (t, e, n) {
    var r = n(4),
        o = n(23),
        i = "".split;
    t.exports = r(function () {
      return !Object("z").propertyIsEnumerable(0);
    }) ? function (t) {
      return "String" == o(t) ? i.call(t, "") : Object(t);
    } : Object;
  }, function (t, e) {
    var n = {}.toString;

    t.exports = function (t) {
      return n.call(t).slice(8, -1);
    };
  }, function (t, e) {
    t.exports = function (t) {
      if (null == t) throw TypeError("Can't call method on " + t);
      return t;
    };
  }, function (t, e, n) {
    var r = n(2);

    t.exports = function (t, e) {
      if (!r(t)) return t;
      var n, o;
      if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;
      if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o;
      if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  }, function (t, e, n) {
    var r = n(0),
        o = n(8);

    t.exports = function (t, e) {
      try {
        o(r, t, e);
      } catch (n) {
        r[t] = e;
      }

      return e;
    };
  }, function (t, e, n) {
    var r = n(51),
        o = n(29),
        i = r("keys");

    t.exports = function (t) {
      return i[t] || (i[t] = o(t));
    };
  }, function (t, e) {
    t.exports = !1;
  }, function (t, e) {
    var n = 0,
        r = Math.random();

    t.exports = function (t) {
      return "Symbol(" + String(void 0 === t ? "" : t) + ")_" + (++n + r).toString(36);
    };
  }, function (t, e, n) {
    var r = n(10),
        o = n(0),
        i = function i(t) {
      return "function" == typeof t ? t : void 0;
    };

    t.exports = function (t, e) {
      return arguments.length < 2 ? i(r[t]) || i(o[t]) : r[t] && r[t][e] || o[t] && o[t][e];
    };
  }, function (t, e) {
    var n = Math.ceil,
        r = Math.floor;

    t.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t);
    };
  }, function (t, e) {
    t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  }, function (t, e, n) {
    var r = n(7),
        o = n(55),
        i = n(17),
        u = n(19),
        c = n(57),
        a = n(59),
        s = function s(t, e) {
      this.stopped = t, this.result = e;
    };

    (t.exports = function (t, e, n, f, l) {
      var p,
          h,
          d,
          v,
          y,
          m,
          g,
          b = u(e, n, f ? 2 : 1);
      if (l) p = t;else {
        if ("function" != typeof (h = c(t))) throw TypeError("Target is not iterable");

        if (o(h)) {
          for (d = 0, v = i(t.length); v > d; d++) {
            if ((y = f ? b(r(g = t[d])[0], g[1]) : b(t[d])) && y instanceof s) return y;
          }

          return new s(!1);
        }

        p = h.call(t);
      }

      for (m = p.next; !(g = m.call(p)).done;) {
        if ("object" == _typeof(y = a(p, b, g.value, f)) && y && y instanceof s) return y;
      }

      return new s(!1);
    }).stop = function (t) {
      return new s(!0, t);
    };
  }, function (t, e, n) {
    var r = {};
    r[n(1)("toStringTag")] = "z", t.exports = "[object z]" === String(r);
  }, function (t, e) {
    t.exports = function (t, e, n) {
      if (!(t instanceof e)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
      return t;
    };
  }, function (t, e, n) {
    var r = n(5).f,
        o = n(3),
        i = n(1)("toStringTag");

    t.exports = function (t, e, n) {
      t && !o(t = n ? t : t.prototype, i) && r(t, i, {
        configurable: !0,
        value: e
      });
    };
  }, function (t, e, n) {
    var r,
        o = n(7),
        i = n(80),
        u = n(32),
        c = n(16),
        a = n(81),
        s = n(47),
        f = n(27)("IE_PROTO"),
        l = function l() {},
        p = function p(t) {
      return "<script>" + t + "<\/script>";
    },
        _h = function h() {
      try {
        r = document.domain && new ActiveXObject("htmlfile");
      } catch (t) {}

      _h = r ? function (t) {
        t.write(p("")), t.close();
        var e = t.parentWindow.Object;
        return t = null, e;
      }(r) : function () {
        var t,
            e = s("iframe");
        return e.style.display = "none", a.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write(p("document.F=Object")), t.close(), t.F;
      }();

      for (var t = u.length; t--;) {
        delete _h.prototype[u[t]];
      }

      return _h();
    };

    c[f] = !0, t.exports = Object.create || function (t, e) {
      var n;
      return null !== t ? (l.prototype = o(t), n = new l(), l.prototype = null, n[f] = t) : n = _h(), void 0 === e ? n : i(n, e);
    };
  }, function (t, e, n) {
    var r = n(11);

    t.exports = function (t, e, n) {
      for (var o in e) {
        r(t, o, e[o], n);
      }

      return t;
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(13),
        o = n(82),
        i = n(65),
        u = n(61),
        c = n(36),
        a = n(8),
        s = n(11),
        f = n(1),
        l = n(28),
        p = n(12),
        h = n(64),
        d = h.IteratorPrototype,
        v = h.BUGGY_SAFARI_ITERATORS,
        y = f("iterator"),
        m = function m() {
      return this;
    };

    t.exports = function (t, e, n, f, h, g, b) {
      o(n, e, f);

      var x,
          w,
          S,
          O = function O(t) {
        if (t === h && j) return j;
        if (!v && t in T) return T[t];

        switch (t) {
          case "keys":
          case "values":
          case "entries":
            return function () {
              return new n(this, t);
            };
        }

        return function () {
          return new n(this);
        };
      },
          _ = e + " Iterator",
          E = !1,
          T = t.prototype,
          A = T[y] || T["@@iterator"] || h && T[h],
          j = !v && A || O(h),
          P = "Array" == e && T.entries || A;

      if (P && (x = i(P.call(new t())), d !== Object.prototype && x.next && (l || i(x) === d || (u ? u(x, d) : "function" != typeof x[y] && a(x, y, m)), c(x, _, !0, !0), l && (p[_] = m))), "values" == h && A && "values" !== A.name && (E = !0, j = function j() {
        return A.call(this);
      }), l && !b || T[y] === j || a(T, y, j), p[e] = j, h) if (w = {
        values: O("values"),
        keys: g ? j : O("keys"),
        entries: O("entries")
      }, b) for (S in w) {
        !v && !E && S in T || s(T, S, w[S]);
      } else r({
        target: e,
        proto: !0,
        forced: v || E
      }, w);
      return w;
    };
  }, function (t, e, n) {
    var r = n(34),
        o = n(11),
        i = n(85);
    r || o(Object.prototype, "toString", i, {
      unsafe: !0
    });
  }, function (t, e, n) {
    "use strict";

    var r = n(86).charAt,
        o = n(9),
        i = n(39),
        u = o.set,
        c = o.getterFor("String Iterator");
    i(String, "String", function (t) {
      u(this, {
        type: "String Iterator",
        string: String(t),
        index: 0
      });
    }, function () {
      var t,
          e = c(this),
          n = e.string,
          o = e.index;
      return o >= n.length ? {
        value: void 0,
        done: !0
      } : (t = r(n, o), e.index += t.length, {
        value: t,
        done: !1
      });
    });
  }, function (t, e, n) {
    var r = n(0),
        o = n(87),
        i = n(88),
        u = n(8),
        c = n(1),
        a = c("iterator"),
        s = c("toStringTag"),
        f = i.values;

    for (var l in o) {
      var p = r[l],
          h = p && p.prototype;

      if (h) {
        if (h[a] !== f) try {
          u(h, a, f);
        } catch (t) {
          h[a] = f;
        }
        if (h[s] || u(h, s, l), o[l]) for (var d in i) {
          if (h[d] !== i[d]) try {
            u(h, d, i[d]);
          } catch (t) {
            h[d] = i[d];
          }
        }
      }
    }
  }, function (t, e) {
    var n;

    n = function () {
      return this;
    }();

    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
    }

    t.exports = n;
  }, function (t, e, n) {
    var r = n(6),
        o = n(45),
        i = n(14),
        u = n(15),
        c = n(25),
        a = n(3),
        s = n(46),
        f = Object.getOwnPropertyDescriptor;
    e.f = r ? f : function (t, e) {
      if (t = u(t), e = c(e, !0), s) try {
        return f(t, e);
      } catch (t) {}
      if (a(t, e)) return i(!o.f.call(t, e), t[e]);
    };
  }, function (t, e, n) {
    "use strict";

    var r = {}.propertyIsEnumerable,
        o = Object.getOwnPropertyDescriptor,
        i = o && !r.call({
      1: 2
    }, 1);
    e.f = i ? function (t) {
      var e = o(this, t);
      return !!e && e.enumerable;
    } : r;
  }, function (t, e, n) {
    var r = n(6),
        o = n(4),
        i = n(47);
    t.exports = !r && !o(function () {
      return 7 != Object.defineProperty(i("div"), "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, function (t, e, n) {
    var r = n(0),
        o = n(2),
        i = r.document,
        u = o(i) && o(i.createElement);

    t.exports = function (t) {
      return u ? i.createElement(t) : {};
    };
  }, function (t, e, n) {
    var r = n(49),
        o = Function.toString;
    "function" != typeof r.inspectSource && (r.inspectSource = function (t) {
      return o.call(t);
    }), t.exports = r.inspectSource;
  }, function (t, e, n) {
    var r = n(0),
        o = n(26),
        i = r["__core-js_shared__"] || o("__core-js_shared__", {});
    t.exports = i;
  }, function (t, e, n) {
    var r = n(0),
        o = n(48),
        i = r.WeakMap;
    t.exports = "function" == typeof i && /native code/.test(o(i));
  }, function (t, e, n) {
    var r = n(28),
        o = n(49);
    (t.exports = function (t, e) {
      return o[t] || (o[t] = void 0 !== e ? e : {});
    })("versions", []).push({
      version: "3.6.4",
      mode: r ? "pure" : "global",
      copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
    });
  }, function (t, e, n) {
    var r = n(3),
        o = n(15),
        i = n(73).indexOf,
        u = n(16);

    t.exports = function (t, e) {
      var n,
          c = o(t),
          a = 0,
          s = [];

      for (n in c) {
        !r(u, n) && r(c, n) && s.push(n);
      }

      for (; e.length > a;) {
        r(c, n = e[a++]) && (~i(s, n) || s.push(n));
      }

      return s;
    };
  }, function (t, e) {
    e.f = Object.getOwnPropertySymbols;
  }, function (t, e, n) {
    var r = n(4),
        o = /#|\.prototype\./,
        i = function i(t, e) {
      var n = c[u(t)];
      return n == s || n != a && ("function" == typeof e ? r(e) : !!e);
    },
        u = i.normalize = function (t) {
      return String(t).replace(o, ".").toLowerCase();
    },
        c = i.data = {},
        a = i.NATIVE = "N",
        s = i.POLYFILL = "P";

    t.exports = i;
  }, function (t, e, n) {
    var r = n(1),
        o = n(12),
        i = r("iterator"),
        u = Array.prototype;

    t.exports = function (t) {
      return void 0 !== t && (o.Array === t || u[i] === t);
    };
  }, function (t, e, n) {
    var r = n(4);
    t.exports = !!Object.getOwnPropertySymbols && !r(function () {
      return !String(Symbol());
    });
  }, function (t, e, n) {
    var r = n(58),
        o = n(12),
        i = n(1)("iterator");

    t.exports = function (t) {
      if (null != t) return t[i] || t["@@iterator"] || o[r(t)];
    };
  }, function (t, e, n) {
    var r = n(34),
        o = n(23),
        i = n(1)("toStringTag"),
        u = "Arguments" == o(function () {
      return arguments;
    }());
    t.exports = r ? o : function (t) {
      var e, n, r;
      return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function (t, e) {
        try {
          return t[e];
        } catch (t) {}
      }(e = Object(t), i)) ? n : u ? o(e) : "Object" == (r = o(e)) && "function" == typeof e.callee ? "Arguments" : r;
    };
  }, function (t, e, n) {
    var r = n(7);

    t.exports = function (t, e, n, o) {
      try {
        return o ? e(r(n)[0], n[1]) : e(n);
      } catch (e) {
        var i = t.return;
        throw void 0 !== i && r(i.call(t)), e;
      }
    };
  }, function (t, e, n) {
    var r = n(1)("iterator"),
        o = !1;

    try {
      var i = 0,
          u = {
        next: function next() {
          return {
            done: !!i++
          };
        },
        return: function _return() {
          o = !0;
        }
      };
      u[r] = function () {
        return this;
      }, Array.from(u, function () {
        throw 2;
      });
    } catch (t) {}

    t.exports = function (t, e) {
      if (!e && !o) return !1;
      var n = !1;

      try {
        var i = {};
        i[r] = function () {
          return {
            next: function next() {
              return {
                done: n = !0
              };
            }
          };
        }, t(i);
      } catch (t) {}

      return n;
    };
  }, function (t, e, n) {
    var r = n(7),
        o = n(79);
    t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
      var t,
          e = !1,
          n = {};

      try {
        (t = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), e = n instanceof Array;
      } catch (t) {}

      return function (n, i) {
        return r(n), o(i), e ? t.call(n, i) : n.__proto__ = i, n;
      };
    }() : void 0);
  }, function (t, e, n) {
    "use strict";

    var r = n(5).f,
        o = n(37),
        i = n(38),
        u = n(19),
        c = n(35),
        a = n(33),
        s = n(39),
        f = n(84),
        l = n(6),
        p = n(18).fastKey,
        h = n(9),
        d = h.set,
        v = h.getterFor;
    t.exports = {
      getConstructor: function getConstructor(t, e, n, s) {
        var f = t(function (t, r) {
          c(t, f, e), d(t, {
            type: e,
            index: o(null),
            first: void 0,
            last: void 0,
            size: 0
          }), l || (t.size = 0), null != r && a(r, t[s], t, n);
        }),
            h = v(e),
            y = function y(t, e, n) {
          var r,
              o,
              i = h(t),
              u = m(t, e);
          return u ? u.value = n : (i.last = u = {
            index: o = p(e, !0),
            key: e,
            value: n,
            previous: r = i.last,
            next: void 0,
            removed: !1
          }, i.first || (i.first = u), r && (r.next = u), l ? i.size++ : t.size++, "F" !== o && (i.index[o] = u)), t;
        },
            m = function m(t, e) {
          var n,
              r = h(t),
              o = p(e);
          if ("F" !== o) return r.index[o];

          for (n = r.first; n; n = n.next) {
            if (n.key == e) return n;
          }
        };

        return i(f.prototype, {
          clear: function clear() {
            for (var t = h(this), e = t.index, n = t.first; n;) {
              n.removed = !0, n.previous && (n.previous = n.previous.next = void 0), delete e[n.index], n = n.next;
            }

            t.first = t.last = void 0, l ? t.size = 0 : this.size = 0;
          },
          delete: function _delete(t) {
            var e = h(this),
                n = m(this, t);

            if (n) {
              var r = n.next,
                  o = n.previous;
              delete e.index[n.index], n.removed = !0, o && (o.next = r), r && (r.previous = o), e.first == n && (e.first = r), e.last == n && (e.last = o), l ? e.size-- : this.size--;
            }

            return !!n;
          },
          forEach: function forEach(t) {
            for (var e, n = h(this), r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3); e = e ? e.next : n.first;) {
              for (r(e.value, e.key, this); e && e.removed;) {
                e = e.previous;
              }
            }
          },
          has: function has(t) {
            return !!m(this, t);
          }
        }), i(f.prototype, n ? {
          get: function get(t) {
            var e = m(this, t);
            return e && e.value;
          },
          set: function set(t, e) {
            return y(this, 0 === t ? 0 : t, e);
          }
        } : {
          add: function add(t) {
            return y(this, t = 0 === t ? 0 : t, t);
          }
        }), l && r(f.prototype, "size", {
          get: function get() {
            return h(this).size;
          }
        }), f;
      },
      setStrong: function setStrong(t, e, n) {
        var r = e + " Iterator",
            o = v(e),
            i = v(r);
        s(t, e, function (t, e) {
          d(this, {
            type: r,
            target: t,
            state: o(t),
            kind: e,
            last: void 0
          });
        }, function () {
          for (var t = i(this), e = t.kind, n = t.last; n && n.removed;) {
            n = n.previous;
          }

          return t.target && (t.last = n = n ? n.next : t.state.first) ? "keys" == e ? {
            value: n.key,
            done: !1
          } : "values" == e ? {
            value: n.value,
            done: !1
          } : {
            value: [n.key, n.value],
            done: !1
          } : (t.target = void 0, {
            value: void 0,
            done: !0
          });
        }, n ? "entries" : "values", !n, !0), f(e);
      }
    };
  }, function (t, e, n) {
    var r = n(52),
        o = n(32);

    t.exports = Object.keys || function (t) {
      return r(t, o);
    };
  }, function (t, e, n) {
    "use strict";

    var r,
        o,
        i,
        u = n(65),
        c = n(8),
        a = n(3),
        s = n(1),
        f = n(28),
        l = s("iterator"),
        p = !1;
    [].keys && ("next" in (i = [].keys()) ? (o = u(u(i))) !== Object.prototype && (r = o) : p = !0), null == r && (r = {}), f || a(r, l) || c(r, l, function () {
      return this;
    }), t.exports = {
      IteratorPrototype: r,
      BUGGY_SAFARI_ITERATORS: p
    };
  }, function (t, e, n) {
    var r = n(3),
        o = n(20),
        i = n(27),
        u = n(83),
        c = i("IE_PROTO"),
        a = Object.prototype;
    t.exports = u ? Object.getPrototypeOf : function (t) {
      return t = o(t), r(t, c) ? t[c] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null;
    };
  }, function (t, e, n) {
    "use strict";

    (function (t) {
      var n = "object" == _typeof(t) && t && t.Object === Object && t;
      e.a = n;
    }).call(this, n(43));
  }, function (t, e, n) {
    t.exports = n(105);
  }, function (t, e, n) {
    n(69), n(40), n(41), n(42);
    var r = n(10);
    t.exports = r.Map;
  }, function (t, e, n) {
    "use strict";

    var r = n(21),
        o = n(62);
    t.exports = r("Map", function (t) {
      return function () {
        return t(this, arguments.length ? arguments[0] : void 0);
      };
    }, o);
  }, function (t, e, n) {
    var r = n(3),
        o = n(71),
        i = n(44),
        u = n(5);

    t.exports = function (t, e) {
      for (var n = o(e), c = u.f, a = i.f, s = 0; s < n.length; s++) {
        var f = n[s];
        r(t, f) || c(t, f, a(e, f));
      }
    };
  }, function (t, e, n) {
    var r = n(30),
        o = n(72),
        i = n(53),
        u = n(7);

    t.exports = r("Reflect", "ownKeys") || function (t) {
      var e = o.f(u(t)),
          n = i.f;
      return n ? e.concat(n(t)) : e;
    };
  }, function (t, e, n) {
    var r = n(52),
        o = n(32).concat("length", "prototype");

    e.f = Object.getOwnPropertyNames || function (t) {
      return r(t, o);
    };
  }, function (t, e, n) {
    var r = n(15),
        o = n(17),
        i = n(74),
        u = function u(t) {
      return function (e, n, u) {
        var c,
            a = r(e),
            s = o(a.length),
            f = i(u, s);

        if (t && n != n) {
          for (; s > f;) {
            if ((c = a[f++]) != c) return !0;
          }
        } else for (; s > f; f++) {
          if ((t || f in a) && a[f] === n) return t || f || 0;
        }

        return !t && -1;
      };
    };

    t.exports = {
      includes: u(!0),
      indexOf: u(!1)
    };
  }, function (t, e, n) {
    var r = n(31),
        o = Math.max,
        i = Math.min;

    t.exports = function (t, e) {
      var n = r(t);
      return n < 0 ? o(n + e, 0) : i(n, e);
    };
  }, function (t, e, n) {
    var r = n(4);
    t.exports = !r(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    });
  }, function (t, e, n) {
    var r = n(56);
    t.exports = r && !Symbol.sham && "symbol" == _typeof(Symbol.iterator);
  }, function (t, e) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(String(t) + " is not a function");
      return t;
    };
  }, function (t, e, n) {
    var r = n(2),
        o = n(61);

    t.exports = function (t, e, n) {
      var i, u;
      return o && "function" == typeof (i = e.constructor) && i !== n && r(u = i.prototype) && u !== n.prototype && o(t, u), t;
    };
  }, function (t, e, n) {
    var r = n(2);

    t.exports = function (t) {
      if (!r(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype");
      return t;
    };
  }, function (t, e, n) {
    var r = n(6),
        o = n(5),
        i = n(7),
        u = n(63);
    t.exports = r ? Object.defineProperties : function (t, e) {
      i(t);

      for (var n, r = u(e), c = r.length, a = 0; c > a;) {
        o.f(t, n = r[a++], e[n]);
      }

      return t;
    };
  }, function (t, e, n) {
    var r = n(30);
    t.exports = r("document", "documentElement");
  }, function (t, e, n) {
    "use strict";

    var r = n(64).IteratorPrototype,
        o = n(37),
        i = n(14),
        u = n(36),
        c = n(12),
        a = function a() {
      return this;
    };

    t.exports = function (t, e, n) {
      var s = e + " Iterator";
      return t.prototype = o(r, {
        next: i(1, n)
      }), u(t, s, !1, !0), c[s] = a, t;
    };
  }, function (t, e, n) {
    var r = n(4);
    t.exports = !r(function () {
      function t() {}

      return t.prototype.constructor = null, Object.getPrototypeOf(new t()) !== t.prototype;
    });
  }, function (t, e, n) {
    "use strict";

    var r = n(30),
        o = n(5),
        i = n(1),
        u = n(6),
        c = i("species");

    t.exports = function (t) {
      var e = r(t),
          n = o.f;
      u && e && !e[c] && n(e, c, {
        configurable: !0,
        get: function get() {
          return this;
        }
      });
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(34),
        o = n(58);
    t.exports = r ? {}.toString : function () {
      return "[object " + o(this) + "]";
    };
  }, function (t, e, n) {
    var r = n(31),
        o = n(24),
        i = function i(t) {
      return function (e, n) {
        var i,
            u,
            c = String(o(e)),
            a = r(n),
            s = c.length;
        return a < 0 || a >= s ? t ? "" : void 0 : (i = c.charCodeAt(a)) < 55296 || i > 56319 || a + 1 === s || (u = c.charCodeAt(a + 1)) < 56320 || u > 57343 ? t ? c.charAt(a) : i : t ? c.slice(a, a + 2) : u - 56320 + (i - 55296 << 10) + 65536;
      };
    };

    t.exports = {
      codeAt: i(!1),
      charAt: i(!0)
    };
  }, function (t, e) {
    t.exports = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(15),
        o = n(89),
        i = n(12),
        u = n(9),
        c = n(39),
        a = u.set,
        s = u.getterFor("Array Iterator");
    t.exports = c(Array, "Array", function (t, e) {
      a(this, {
        type: "Array Iterator",
        target: r(t),
        index: 0,
        kind: e
      });
    }, function () {
      var t = s(this),
          e = t.target,
          n = t.kind,
          r = t.index++;
      return !e || r >= e.length ? (t.target = void 0, {
        value: void 0,
        done: !0
      }) : "keys" == n ? {
        value: r,
        done: !1
      } : "values" == n ? {
        value: e[r],
        done: !1
      } : {
        value: [r, e[r]],
        done: !1
      };
    }, "values"), i.Arguments = i.Array, o("keys"), o("values"), o("entries");
  }, function (t, e, n) {
    var r = n(1),
        o = n(37),
        i = n(5),
        u = r("unscopables"),
        c = Array.prototype;
    null == c[u] && i.f(c, u, {
      configurable: !0,
      value: o(null)
    }), t.exports = function (t) {
      c[u][t] = !0;
    };
  }, function (t, e, n) {
    n(91), n(40), n(41), n(42);
    var r = n(10);
    t.exports = r.Set;
  }, function (t, e, n) {
    "use strict";

    var r = n(21),
        o = n(62);
    t.exports = r("Set", function (t) {
      return function () {
        return t(this, arguments.length ? arguments[0] : void 0);
      };
    }, o);
  }, function (t, e, n) {
    n(40), n(93), n(42);
    var r = n(10);
    t.exports = r.WeakMap;
  }, function (t, e, n) {
    "use strict";

    var r,
        o = n(0),
        i = n(38),
        u = n(18),
        c = n(21),
        a = n(94),
        s = n(2),
        f = n(9).enforce,
        l = n(50),
        p = !o.ActiveXObject && "ActiveXObject" in o,
        h = Object.isExtensible,
        d = function d(t) {
      return function () {
        return t(this, arguments.length ? arguments[0] : void 0);
      };
    },
        v = t.exports = c("WeakMap", d, a);

    if (l && p) {
      r = a.getConstructor(d, "WeakMap", !0), u.REQUIRED = !0;
      var y = v.prototype,
          m = y.delete,
          g = y.has,
          b = y.get,
          x = y.set;
      i(y, {
        delete: function _delete(t) {
          if (s(t) && !h(t)) {
            var e = f(this);
            return e.frozen || (e.frozen = new r()), m.call(this, t) || e.frozen.delete(t);
          }

          return m.call(this, t);
        },
        has: function has(t) {
          if (s(t) && !h(t)) {
            var e = f(this);
            return e.frozen || (e.frozen = new r()), g.call(this, t) || e.frozen.has(t);
          }

          return g.call(this, t);
        },
        get: function get(t) {
          if (s(t) && !h(t)) {
            var e = f(this);
            return e.frozen || (e.frozen = new r()), g.call(this, t) ? b.call(this, t) : e.frozen.get(t);
          }

          return b.call(this, t);
        },
        set: function set(t, e) {
          if (s(t) && !h(t)) {
            var n = f(this);
            n.frozen || (n.frozen = new r()), g.call(this, t) ? x.call(this, t, e) : n.frozen.set(t, e);
          } else x.call(this, t, e);

          return this;
        }
      });
    }
  }, function (t, e, n) {
    "use strict";

    var r = n(38),
        o = n(18).getWeakData,
        i = n(7),
        u = n(2),
        c = n(35),
        a = n(33),
        s = n(95),
        f = n(3),
        l = n(9),
        p = l.set,
        h = l.getterFor,
        d = s.find,
        v = s.findIndex,
        y = 0,
        m = function m(t) {
      return t.frozen || (t.frozen = new g());
    },
        g = function g() {
      this.entries = [];
    },
        b = function b(t, e) {
      return d(t.entries, function (t) {
        return t[0] === e;
      });
    };

    g.prototype = {
      get: function get(t) {
        var e = b(this, t);
        if (e) return e[1];
      },
      has: function has(t) {
        return !!b(this, t);
      },
      set: function set(t, e) {
        var n = b(this, t);
        n ? n[1] = e : this.entries.push([t, e]);
      },
      delete: function _delete(t) {
        var e = v(this.entries, function (e) {
          return e[0] === t;
        });
        return ~e && this.entries.splice(e, 1), !!~e;
      }
    }, t.exports = {
      getConstructor: function getConstructor(t, e, n, s) {
        var l = t(function (t, r) {
          c(t, l, e), p(t, {
            type: e,
            id: y++,
            frozen: void 0
          }), null != r && a(r, t[s], t, n);
        }),
            d = h(e),
            v = function v(t, e, n) {
          var r = d(t),
              u = o(i(e), !0);
          return !0 === u ? m(r).set(e, n) : u[r.id] = n, t;
        };

        return r(l.prototype, {
          delete: function _delete(t) {
            var e = d(this);
            if (!u(t)) return !1;
            var n = o(t);
            return !0 === n ? m(e).delete(t) : n && f(n, e.id) && delete n[e.id];
          },
          has: function has(t) {
            var e = d(this);
            if (!u(t)) return !1;
            var n = o(t);
            return !0 === n ? m(e).has(t) : n && f(n, e.id);
          }
        }), r(l.prototype, n ? {
          get: function get(t) {
            var e = d(this);

            if (u(t)) {
              var n = o(t);
              return !0 === n ? m(e).get(t) : n ? n[e.id] : void 0;
            }
          },
          set: function set(t, e) {
            return v(this, t, e);
          }
        } : {
          add: function add(t) {
            return v(this, t, !0);
          }
        }), l;
      }
    };
  }, function (t, e, n) {
    var r = n(19),
        o = n(22),
        i = n(20),
        u = n(17),
        c = n(96),
        a = [].push,
        s = function s(t) {
      var e = 1 == t,
          n = 2 == t,
          s = 3 == t,
          f = 4 == t,
          l = 6 == t,
          p = 5 == t || l;
      return function (h, d, v, y) {
        for (var m, g, b = i(h), x = o(b), w = r(d, v, 3), S = u(x.length), O = 0, _ = y || c, E = e ? _(h, S) : n ? _(h, 0) : void 0; S > O; O++) {
          if ((p || O in x) && (g = w(m = x[O], O, b), t)) if (e) E[O] = g;else if (g) switch (t) {
            case 3:
              return !0;

            case 5:
              return m;

            case 6:
              return O;

            case 2:
              a.call(E, m);
          } else if (f) return !1;
        }

        return l ? -1 : s || f ? f : E;
      };
    };

    t.exports = {
      forEach: s(0),
      map: s(1),
      filter: s(2),
      some: s(3),
      every: s(4),
      find: s(5),
      findIndex: s(6)
    };
  }, function (t, e, n) {
    var r = n(2),
        o = n(97),
        i = n(1)("species");

    t.exports = function (t, e) {
      var n;
      return o(t) && ("function" != typeof (n = t.constructor) || n !== Array && !o(n.prototype) ? r(n) && null === (n = n[i]) && (n = void 0) : n = void 0), new (void 0 === n ? Array : n)(0 === e ? 0 : e);
    };
  }, function (t, e, n) {
    var r = n(23);

    t.exports = Array.isArray || function (t) {
      return "Array" == r(t);
    };
  }, function (t, e, n) {
    n(41), n(99);
    var r = n(10);
    t.exports = r.Array.from;
  }, function (t, e, n) {
    var r = n(13),
        o = n(100);
    r({
      target: "Array",
      stat: !0,
      forced: !n(60)(function (t) {
        Array.from(t);
      })
    }, {
      from: o
    });
  }, function (t, e, n) {
    "use strict";

    var r = n(19),
        o = n(20),
        i = n(59),
        u = n(55),
        c = n(17),
        a = n(101),
        s = n(57);

    t.exports = function (t) {
      var e,
          n,
          f,
          l,
          p,
          h,
          d = o(t),
          v = "function" == typeof this ? this : Array,
          y = arguments.length,
          m = y > 1 ? arguments[1] : void 0,
          g = void 0 !== m,
          b = s(d),
          x = 0;
      if (g && (m = r(m, y > 2 ? arguments[2] : void 0, 2)), null == b || v == Array && u(b)) for (n = new v(e = c(d.length)); e > x; x++) {
        h = g ? m(d[x], x) : d[x], a(n, x, h);
      } else for (p = (l = b.call(d)).next, n = new v(); !(f = p.call(l)).done; x++) {
        h = g ? i(l, m, [f.value, x], !0) : f.value, a(n, x, h);
      }
      return n.length = x, n;
    };
  }, function (t, e, n) {
    "use strict";

    var r = n(25),
        o = n(5),
        i = n(14);

    t.exports = function (t, e, n) {
      var u = r(e);
      u in t ? o.f(t, u, i(0, n)) : t[u] = n;
    };
  }, function (t, e, n) {
    n(103);
    var r = n(10);
    t.exports = r.Object.assign;
  }, function (t, e, n) {
    var r = n(13),
        o = n(104);
    r({
      target: "Object",
      stat: !0,
      forced: Object.assign !== o
    }, {
      assign: o
    });
  }, function (t, e, n) {
    "use strict";

    var r = n(6),
        o = n(4),
        i = n(63),
        u = n(53),
        c = n(45),
        a = n(20),
        s = n(22),
        f = Object.assign,
        l = Object.defineProperty;
    t.exports = !f || o(function () {
      if (r && 1 !== f({
        b: 1
      }, f(l({}, "a", {
        enumerable: !0,
        get: function get() {
          l(this, "b", {
            value: 3,
            enumerable: !1
          });
        }
      }), {
        b: 2
      })).b) return !0;
      var t = {},
          e = {},
          n = Symbol();
      return t[n] = 7, "abcdefghijklmnopqrst".split("").forEach(function (t) {
        e[t] = t;
      }), 7 != f({}, t)[n] || "abcdefghijklmnopqrst" != i(f({}, e)).join("");
    }) ? function (t, e) {
      for (var n = a(t), o = arguments.length, f = 1, l = u.f, p = c.f; o > f;) {
        for (var h, d = s(arguments[f++]), v = l ? i(d).concat(l(d)) : i(d), y = v.length, m = 0; y > m;) {
          h = v[m++], r && !p.call(d, h) || (n[h] = d[h]);
        }
      }

      return n;
    } : f;
  }, function (t, e, n) {
    "use strict";

    n.r(e);
    var r = {};
    n.r(r), n.d(r, "keyboardHandler", function () {
      return ot;
    }), n.d(r, "mouseHandler", function () {
      return it;
    }), n.d(r, "resizeHandler", function () {
      return ut;
    }), n.d(r, "selectHandler", function () {
      return ct;
    }), n.d(r, "touchHandler", function () {
      return at;
    }), n.d(r, "wheelHandler", function () {
      return st;
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

    var _o = function o(t, e) {
      return (_o = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (t, e) {
        t.__proto__ = e;
      } || function (t, e) {
        for (var n in e) {
          e.hasOwnProperty(n) && (t[n] = e[n]);
        }
      })(t, e);
    },
        _i = function i() {
      return (_i = Object.assign || function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++) {
          for (var o in e = arguments[n]) {
            Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          }
        }

        return t;
      }).apply(this, arguments);
    };

    function u(t, e, n, r) {
      var o,
          i = arguments.length,
          u = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
      if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) u = Reflect.decorate(t, e, n, r);else for (var c = t.length - 1; c >= 0; c--) {
        (o = t[c]) && (u = (i < 3 ? o(u) : i > 3 ? o(e, n, u) : o(e, n)) || u);
      }
      return i > 3 && u && Object.defineProperty(e, n, u), u;
    }

    n(68), n(90), n(92), n(98), n(102);

    var c = /\s/,
        a = /^\s+/,
        s = function s(t) {
      return t ? t.slice(0, function (t) {
        for (var e = t.length; e-- && c.test(t.charAt(e));) {
          ;
        }

        return e;
      }(t) + 1).replace(a, "") : t;
    },
        f = function f(t) {
      var e = _typeof(t);

      return null != t && ("object" == e || "function" == e);
    },
        l = n(66),
        p = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
        h = l.a || p || Function("return this")(),
        d = h.Symbol,
        v = Object.prototype,
        y = v.hasOwnProperty,
        m = v.toString,
        g = d ? d.toStringTag : void 0,
        b = Object.prototype.toString,
        x = d ? d.toStringTag : void 0,
        w = function w(t) {
      return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : x && x in Object(t) ? function (t) {
        var e = y.call(t, g),
            n = t[g];

        try {
          t[g] = void 0;
          var r = !0;
        } catch (t) {}

        var o = m.call(t);
        return r && (e ? t[g] = n : delete t[g]), o;
      }(t) : function (t) {
        return b.call(t);
      }(t);
    },
        S = /^[-+]0x[0-9a-f]+$/i,
        O = /^0b[01]+$/i,
        _ = /^0o[0-7]+$/i,
        E = parseInt,
        T = function T(t) {
      if ("number" == typeof t) return t;
      if (function (t) {
        return "symbol" == _typeof(t) || function (t) {
          return null != t && "object" == _typeof(t);
        }(t) && "[object Symbol]" == w(t);
      }(t)) return NaN;

      if (f(t)) {
        var e = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = f(e) ? e + "" : e;
      }

      if ("string" != typeof t) return 0 === t ? t : +t;
      t = s(t);
      var n = O.test(t);
      return n || _.test(t) ? E(t.slice(2), n ? 2 : 8) : S.test(t) ? NaN : +t;
    },
        A = function A(t, e, n) {
      return void 0 === n && (n = e, e = void 0), void 0 !== n && (n = (n = T(n)) == n ? n : 0), void 0 !== e && (e = (e = T(e)) == e ? e : 0), function (t, e, n) {
        return t == t && (void 0 !== n && (t = t <= n ? t : n), void 0 !== e && (t = t >= e ? t : e)), t;
      }(T(t), e, n);
    };

    function j(t, e) {
      return void 0 === t && (t = -1 / 0), void 0 === e && (e = 1 / 0), function (n, r) {
        var o = "_" + r;
        Object.defineProperty(n, r, {
          get: function get() {
            return this[o];
          },
          set: function set(n) {
            Object.defineProperty(this, o, {
              value: A(n, t, e),
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

    function P(t, e) {
      var n = "_" + e;
      Object.defineProperty(t, e, {
        get: function get() {
          return this[n];
        },
        set: function set(t) {
          Object.defineProperty(this, n, {
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
      return h.Date.now();
    },
        k = Math.max,
        z = Math.min,
        D = function D(t, e, n) {
      var r,
          o,
          i,
          u,
          c,
          a,
          s = 0,
          l = !1,
          p = !1,
          h = !0;
      if ("function" != typeof t) throw new TypeError("Expected a function");

      function d(e) {
        var n = r,
            i = o;
        return r = o = void 0, s = e, u = t.apply(i, n);
      }

      function v(t) {
        var n = t - a;
        return void 0 === a || n >= e || n < 0 || p && t - s >= i;
      }

      function y() {
        var t = M();
        if (v(t)) return m(t);
        c = setTimeout(y, function (t) {
          var n = e - (t - a);
          return p ? z(n, i - (t - s)) : n;
        }(t));
      }

      function m(t) {
        return c = void 0, h && r ? d(t) : (r = o = void 0, u);
      }

      function g() {
        var t = M(),
            n = v(t);

        if (r = arguments, o = this, a = t, n) {
          if (void 0 === c) return function (t) {
            return s = t, c = setTimeout(y, e), l ? d(t) : u;
          }(a);
          if (p) return clearTimeout(c), c = setTimeout(y, e), d(a);
        }

        return void 0 === c && (c = setTimeout(y, e)), u;
      }

      return e = T(e) || 0, f(n) && (l = !!n.leading, i = (p = "maxWait" in n) ? k(T(n.maxWait) || 0, e) : i, h = "trailing" in n ? !!n.trailing : h), g.cancel = function () {
        void 0 !== c && clearTimeout(c), s = 0, r = a = o = c = void 0;
      }, g.flush = function () {
        return void 0 === c ? u : m(M());
      }, g;
    };

    function L() {
      for (var t = [], e = 0; e < arguments.length; e++) {
        t[e] = arguments[e];
      }

      return function (e, n, r) {
        var o = r.value;
        return {
          get: function get() {
            return this.hasOwnProperty(n) || Object.defineProperty(this, n, {
              value: D.apply(void 0, function () {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++) {
                  t += arguments[e].length;
                }

                var r = Array(t),
                    o = 0;

                for (e = 0; e < n; e++) {
                  for (var i = arguments[e], u = 0, c = i.length; u < c; u++, o++) {
                    r[o] = i[u];
                  }
                }

                return r;
              }([o], t))
            }), this[n];
          }
        };
      };
    }

    var I,
        N = function () {
      function t(t) {
        var e = this;
        void 0 === t && (t = {}), this.damping = .1, this.thumbMinSize = 20, this.renderByPixels = !0, this.alwaysShowTracks = !1, this.continuousScrolling = !0, this.delegateTo = null, this.plugins = {}, Object.keys(t).forEach(function (n) {
          e[n] = t[n];
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
      }), u([j(0, 1)], t.prototype, "damping", void 0), u([j(0, 1 / 0)], t.prototype, "thumbMinSize", void 0), u([P], t.prototype, "renderByPixels", void 0), u([P], t.prototype, "alwaysShowTracks", void 0), u([P], t.prototype, "continuousScrolling", void 0), t;
    }(),
        C = new WeakMap();

    function R() {
      if (void 0 !== I) return I;
      var t = !1;

      try {
        var e = function e() {},
            n = Object.defineProperty({}, "passive", {
          get: function get() {
            t = !0;
          }
        });

        window.addEventListener("testPassive", e, n), window.removeEventListener("testPassive", e, n);
      } catch (t) {}

      return I = !!t && {
        passive: !1
      };
    }

    function F(t) {
      var e = C.get(t) || [];
      return C.set(t, e), function (t, n, r) {
        function o(t) {
          t.defaultPrevented || r(t);
        }

        n.split(/\s+/g).forEach(function (n) {
          e.push({
            elem: t,
            eventName: n,
            handler: o
          }), t.addEventListener(n, o, R());
        });
      };
    }

    function H(t) {
      var e = function (t) {
        return t.touches ? t.touches[t.touches.length - 1] : t;
      }(t);

      return {
        x: e.clientX,
        y: e.clientY
      };
    }

    function W(t, e) {
      return void 0 === e && (e = []), e.some(function (e) {
        return t === e;
      });
    }

    var G = ["webkit", "moz", "ms", "o"],
        B = new RegExp("^-(?!(?:" + G.join("|") + ")-)");

    function U(t, e) {
      e = function (t) {
        var e = {};
        return Object.keys(t).forEach(function (n) {
          if (B.test(n)) {
            var r = t[n];
            n = n.replace(/^-/, ""), e[n] = r, G.forEach(function (t) {
              e["-" + t + "-" + n] = r;
            });
          } else e[n] = t[n];
        }), e;
      }(e), Object.keys(e).forEach(function (n) {
        var r = n.replace(/^-/, "").replace(/-([a-z])/g, function (t, e) {
          return e.toUpperCase();
        });
        t.style[r] = e[n];
      });
    }

    var X,
        V = function () {
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
        }, this.lastPosition = H(t);
      }

      return t.prototype.update = function (t) {
        var e = this.velocity,
            n = this.updateTime,
            r = this.lastPosition,
            o = Date.now(),
            i = H(t),
            u = {
          x: -(i.x - r.x),
          y: -(i.y - r.y)
        },
            c = o - n || 16,
            a = u.x / c * 16,
            s = u.y / c * 16;
        e.x = .9 * a + .1 * e.x, e.y = .9 * s + .1 * e.y, this.delta = u, this.updateTime = o, this.lastPosition = i;
      }, t;
    }(),
        Y = function () {
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
        var e = this,
            n = t.targetTouches;
        return Array.from(n).forEach(function (t) {
          e._add(t);
        }), this._touchList;
      }, t.prototype.update = function (t) {
        var e = this,
            n = t.touches,
            r = t.changedTouches;
        return Array.from(n).forEach(function (t) {
          e._renew(t);
        }), this._setActiveID(r), this._touchList;
      }, t.prototype.release = function (t) {
        var e = this;
        delete this._activeTouchID, Array.from(t.changedTouches).forEach(function (t) {
          e._delete(t);
        });
      }, t.prototype._add = function (t) {
        if (!this._has(t)) {
          var e = new V(t);
          this._touchList[t.identifier] = e;
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
    }(X || (X = {}));

    var q = function () {
      function t(t, e) {
        void 0 === e && (e = 0), this._direction = t, this._minSize = e, this.element = document.createElement("div"), this.displaySize = 0, this.realSize = 0, this.offset = 0, this.element.className = "scrollbar-thumb scrollbar-thumb-" + t;
      }

      return t.prototype.attachTo = function (t) {
        t.appendChild(this.element);
      }, t.prototype.update = function (t, e, n) {
        this.realSize = Math.min(e / n, 1) * e, this.displaySize = Math.max(this.realSize, this._minSize), this.offset = t / n * (e + (this.realSize - this.displaySize)), U(this.element, this._getStyle());
      }, t.prototype._getStyle = function () {
        switch (this._direction) {
          case X.X:
            return {
              width: this.displaySize + "px",
              "-transform": "translate3d(" + this.offset + "px, 0, 0)"
            };

          case X.Y:
            return {
              height: this.displaySize + "px",
              "-transform": "translate3d(0, " + this.offset + "px, 0)"
            };

          default:
            return null;
        }
      }, t;
    }(),
        K = function () {
      function t(t, e) {
        void 0 === e && (e = 0), this.element = document.createElement("div"), this._isShown = !1, this.element.className = "scrollbar-track scrollbar-track-" + t, this.thumb = new q(t, e), this.thumb.attachTo(this.element);
      }

      return t.prototype.attachTo = function (t) {
        t.appendChild(this.element);
      }, t.prototype.show = function () {
        this._isShown || (this._isShown = !0, this.element.classList.add("show"));
      }, t.prototype.hide = function () {
        this._isShown && (this._isShown = !1, this.element.classList.remove("show"));
      }, t.prototype.update = function (t, e, n) {
        U(this.element, {
          display: n <= e ? "none" : "block"
        }), this.thumb.update(t, e, n);
      }, t;
    }(),
        Q = function () {
      function t(t) {
        this._scrollbar = t;
        var e = t.options.thumbMinSize;
        this.xAxis = new K(X.X, e), this.yAxis = new K(X.Y, e), this.xAxis.attachTo(t.containerEl), this.yAxis.attachTo(t.containerEl), t.options.alwaysShowTracks && (this.xAxis.show(), this.yAxis.show());
      }

      return t.prototype.update = function () {
        var t = this._scrollbar,
            e = t.size,
            n = t.offset;
        this.xAxis.update(n.x, e.container.width, e.content.width), this.yAxis.update(n.y, e.container.height, e.content.height);
      }, t.prototype.autoHideOnIdle = function () {
        this._scrollbar.options.alwaysShowTracks || (this.xAxis.hide(), this.yAxis.hide());
      }, u([L(300)], t.prototype, "autoHideOnIdle", null), t;
    }(),
        $ = new WeakMap();

    function J(t) {
      return Math.pow(t - 1, 3) + 1;
    }

    var Z,
        tt,
        et,
        nt = function () {
      function t(t, e) {
        var n = this.constructor;
        this.scrollbar = t, this.name = n.pluginName, this.options = _i(_i({}, n.defaultOptions), e);
      }

      return t.prototype.onInit = function () {}, t.prototype.onDestroy = function () {}, t.prototype.onUpdate = function () {}, t.prototype.onRender = function (t) {}, t.prototype.transformDelta = function (t, e) {
        return _i({}, t);
      }, t.pluginName = "", t.defaultOptions = {}, t;
    }(),
        rt = {
      order: new Set(),
      constructors: {}
    };

    function ot(t) {
      var e = F(t),
          n = t.containerEl;
      e(n, "keydown", function (e) {
        var r = document.activeElement;

        if ((r === n || n.contains(r)) && !function (t) {
          return !("INPUT" !== t.tagName && "SELECT" !== t.tagName && "TEXTAREA" !== t.tagName && !t.isContentEditable) && !t.disabled;
        }(r)) {
          var o = function (t, e) {
            var n = t.size,
                r = t.limit,
                o = t.offset;

            switch (e) {
              case Z.TAB:
                return function (t) {
                  requestAnimationFrame(function () {
                    t.scrollIntoView(document.activeElement, {
                      offsetTop: t.size.container.height / 2,
                      onlyScrollIfNeeded: !0
                    });
                  });
                }(t);

              case Z.SPACE:
                return [0, 200];

              case Z.PAGE_UP:
                return [0, 40 - n.container.height];

              case Z.PAGE_DOWN:
                return [0, n.container.height - 40];

              case Z.END:
                return [0, r.y - o.y];

              case Z.HOME:
                return [0, -o.y];

              case Z.LEFT:
                return [-40, 0];

              case Z.UP:
                return [0, -40];

              case Z.RIGHT:
                return [40, 0];

              case Z.DOWN:
                return [0, 40];

              default:
                return null;
            }
          }(t, e.keyCode || e.which);

          if (o) {
            var i = o[0],
                u = o[1];
            t.addTransformableMomentum(i, u, e, function (n) {
              n ? e.preventDefault() : (t.containerEl.blur(), t.parent && t.parent.containerEl.focus());
            });
          }
        }
      });
    }

    function it(t) {
      var e,
          n,
          r,
          o,
          i,
          u = F(t),
          c = t.containerEl,
          a = t.track,
          s = a.xAxis,
          f = a.yAxis;

      function l(e, n) {
        var r = t.size;
        return e === tt.X ? n / (r.container.width + (s.thumb.realSize - s.thumb.displaySize)) * r.content.width : e === tt.Y ? n / (r.container.height + (f.thumb.realSize - f.thumb.displaySize)) * r.content.height : 0;
      }

      function p(t) {
        return W(t, [s.element, s.thumb.element]) ? tt.X : W(t, [f.element, f.thumb.element]) ? tt.Y : void 0;
      }

      u(c, "click", function (e) {
        if (!n && W(e.target, [s.element, f.element])) {
          var r = e.target,
              o = p(r),
              i = r.getBoundingClientRect(),
              u = H(e),
              c = t.offset,
              a = t.limit;

          if (o === tt.X) {
            var h = u.x - i.left - s.thumb.displaySize / 2;
            t.setMomentum(A(l(o, h) - c.x, -c.x, a.x - c.x), 0);
          }

          o === tt.Y && (h = u.y - i.top - f.thumb.displaySize / 2, t.setMomentum(0, A(l(o, h) - c.y, -c.y, a.y - c.y)));
        }
      }), u(c, "mousedown", function (n) {
        if (W(n.target, [s.thumb.element, f.thumb.element])) {
          e = !0;
          var u = n.target,
              a = H(n),
              l = u.getBoundingClientRect();
          o = p(u), r = {
            x: a.x - l.left,
            y: a.y - l.top
          }, i = c.getBoundingClientRect(), U(t.containerEl, {
            "-user-select": "none"
          });
        }
      }), u(window, "mousemove", function (u) {
        if (e) {
          n = !0;
          var c = t.offset,
              a = H(u);

          if (o === tt.X) {
            var s = a.x - r.x - i.left;
            t.setPosition(l(o, s), c.y);
          }

          o === tt.Y && (s = a.y - r.y - i.top, t.setPosition(c.x, l(o, s)));
        }
      }), u(window, "mouseup blur", function () {
        e = n = !1, U(t.containerEl, {
          "-user-select": ""
        });
      });
    }

    function ut(t) {
      F(t)(window, "resize", D(t.update.bind(t), 300));
    }

    function ct(t) {
      var e,
          n = F(t),
          r = t.containerEl,
          o = t.contentEl,
          i = t.offset,
          u = t.limit,
          c = !1;
      n(window, "mousemove", function (n) {
        c && (cancelAnimationFrame(e), function n(r) {
          var o = r.x,
              c = r.y;
          (o || c) && (t.setMomentum(A(i.x + o, 0, u.x) - i.x, A(i.y + c, 0, u.y) - i.y), e = requestAnimationFrame(function () {
            n({
              x: o,
              y: c
            });
          }));
        }(function (t, e) {
          var n = t.bounding,
              r = n.top,
              o = n.right,
              i = n.bottom,
              u = n.left,
              c = H(e),
              a = c.x,
              s = c.y,
              f = {
            x: 0,
            y: 0
          };
          return 0 === a && 0 === s || (a > o - 20 ? f.x = a - o + 20 : a < u + 20 && (f.x = a - u - 20), s > i - 20 ? f.y = s - i + 20 : s < r + 20 && (f.y = s - r - 20), f.x *= 2, f.y *= 2), f;
        }(t, n)));
      }), n(o, "selectstart", function (t) {
        t.stopPropagation(), cancelAnimationFrame(e), c = !0;
      }), n(window, "mouseup blur", function () {
        cancelAnimationFrame(e), c = !1;
      }), n(r, "scroll", function (t) {
        t.preventDefault(), r.scrollTop = r.scrollLeft = 0;
      });
    }

    function at(t) {
      var e,
          n = /Android/.test(navigator.userAgent) ? 3 : 2,
          r = t.options.delegateTo || t.containerEl,
          o = new Y(),
          i = F(t),
          u = 0;
      i(r, "touchstart", function (n) {
        o.track(n), t.setMomentum(0, 0), 0 === u && (e = t.options.damping, t.options.damping = Math.max(e, .5)), u++;
      }), i(r, "touchmove", function (e) {
        if (!et || et === t) {
          o.update(e);
          var n = o.getDelta(),
              r = n.x,
              i = n.y;
          t.addTransformableMomentum(r, i, e, function (n) {
            n && e.cancelable && (e.preventDefault(), et = t);
          });
        }
      }), i(r, "touchcancel touchend", function (r) {
        var i = o.getVelocity(),
            c = {
          x: 0,
          y: 0
        };
        Object.keys(i).forEach(function (t) {
          var r = i[t] / e;
          c[t] = Math.abs(r) < 50 ? 0 : r * n;
        }), t.addTransformableMomentum(c.x, c.y, r), 0 == --u && (t.options.damping = e), o.release(r), et = null;
      });
    }

    function st(t) {
      F(t)(t.options.delegateTo || t.containerEl, "onwheel" in window || document.implementation.hasFeature("Events.wheel", "3.0") ? "wheel" : "mousewheel", function (e) {
        var n = function (t) {
          if ("deltaX" in t) {
            var e = pt(t.deltaMode);
            return {
              x: t.deltaX / ft.STANDARD * e,
              y: t.deltaY / ft.STANDARD * e
            };
          }

          return "wheelDeltaX" in t ? {
            x: t.wheelDeltaX / ft.OTHERS,
            y: t.wheelDeltaY / ft.OTHERS
          } : {
            x: 0,
            y: t.wheelDelta / ft.OTHERS
          };
        }(e),
            r = n.x,
            o = n.y;

        t.addTransformableMomentum(r, o, e, function (t) {
          t && e.preventDefault();
        });
      });
    }

    !function (t) {
      t[t.TAB = 9] = "TAB", t[t.SPACE = 32] = "SPACE", t[t.PAGE_UP = 33] = "PAGE_UP", t[t.PAGE_DOWN = 34] = "PAGE_DOWN", t[t.END = 35] = "END", t[t.HOME = 36] = "HOME", t[t.LEFT = 37] = "LEFT", t[t.UP = 38] = "UP", t[t.RIGHT = 39] = "RIGHT", t[t.DOWN = 40] = "DOWN";
    }(Z || (Z = {})), function (t) {
      t[t.X = 0] = "X", t[t.Y = 1] = "Y";
    }(tt || (tt = {}));

    var ft = {
      STANDARD: 1,
      OTHERS: -3
    },
        lt = [1, 28, 500],
        pt = function pt(t) {
      return lt[t] || lt[0];
    },
        ht = new Map(),
        dt = function () {
      function t(t, e) {
        var n = this;
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
        this.options = new N(e), t.setAttribute("data-scrollbar", "true"), t.setAttribute("tabindex", "-1"), U(t, {
          overflow: "hidden",
          outline: "none"
        }), window.navigator.msPointerEnabled && (t.style.msTouchAction = "none"), r.className = "scroll-content", Array.from(t.childNodes).forEach(function (t) {
          r.appendChild(t);
        }), t.appendChild(r), this.track = new Q(this), this.size = this.getSize(), this._plugins = function (t, e) {
          return Array.from(rt.order).filter(function (t) {
            return !1 !== e[t];
          }).map(function (n) {
            var r = new (0, rt.constructors[n])(t, e[n]);
            return e[n] = r.options, r;
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
          n.update();
        }), this._observer.observe(r, {
          subtree: !0,
          childList: !0
        })), ht.set(t, this), requestAnimationFrame(function () {
          n._init();
        });
      }

      return Object.defineProperty(t.prototype, "parent", {
        get: function get() {
          for (var t = this.containerEl.parentElement; t;) {
            var e = ht.get(t);
            if (e) return e;
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
          var e = t.containerEl,
              n = t.contentEl;
          return {
            container: {
              width: e.clientWidth,
              height: e.clientHeight
            },
            content: {
              width: n.offsetWidth - n.clientWidth + n.scrollWidth,
              height: n.offsetHeight - n.clientHeight + n.scrollHeight
            }
          };
        }(this);
      }, t.prototype.update = function () {
        !function (t) {
          var e = t.getSize(),
              n = {
            x: Math.max(e.content.width - e.container.width, 0),
            y: Math.max(e.content.height - e.container.height, 0)
          },
              r = t.containerEl.getBoundingClientRect(),
              o = {
            top: Math.max(r.top, 0),
            right: Math.min(r.right, window.innerWidth),
            bottom: Math.min(r.bottom, window.innerHeight),
            left: Math.max(r.left, 0)
          };
          t.size = e, t.limit = n, t.bounding = o, t.track.update(), t.setPosition();
        }(this), this._plugins.forEach(function (t) {
          t.onUpdate();
        });
      }, t.prototype.isVisible = function (t) {
        return function (t, e) {
          var n = t.bounding,
              r = e.getBoundingClientRect(),
              o = Math.max(n.top, r.top),
              i = Math.max(n.left, r.left),
              u = Math.min(n.right, r.right);
          return o < Math.min(n.bottom, r.bottom) && i < u;
        }(this, t);
      }, t.prototype.setPosition = function (t, e, n) {
        var r = this;
        void 0 === t && (t = this.offset.x), void 0 === e && (e = this.offset.y), void 0 === n && (n = {});

        var o = function (t, e, n) {
          var r = t.options,
              o = t.offset,
              u = t.limit,
              c = t.track,
              a = t.contentEl;
          return r.renderByPixels && (e = Math.round(e), n = Math.round(n)), e = A(e, 0, u.x), n = A(n, 0, u.y), e !== o.x && c.xAxis.show(), n !== o.y && c.yAxis.show(), r.alwaysShowTracks || c.autoHideOnIdle(), e === o.x && n === o.y ? null : (o.x = e, o.y = n, U(a, {
            "-transform": "translate3d(" + -e + "px, " + -n + "px, 0)"
          }), c.update(), {
            offset: _i({}, o),
            limit: _i({}, u)
          });
        }(this, t, e);

        o && !n.withoutCallbacks && this._listeners.forEach(function (t) {
          t.call(r, o);
        });
      }, t.prototype.scrollTo = function (t, e, n, r) {
        void 0 === t && (t = this.offset.x), void 0 === e && (e = this.offset.y), void 0 === n && (n = 0), void 0 === r && (r = {}), function (t, e, n, r, o) {
          void 0 === r && (r = 0);
          var i = void 0 === o ? {} : o,
              u = i.easing,
              c = void 0 === u ? J : u,
              a = i.callback,
              s = t.options,
              f = t.offset,
              l = t.limit;
          s.renderByPixels && (e = Math.round(e), n = Math.round(n));
          var p = f.x,
              h = f.y,
              d = A(e, 0, l.x) - p,
              v = A(n, 0, l.y) - h,
              y = Date.now();
          cancelAnimationFrame($.get(t)), function e() {
            var n = Date.now() - y,
                o = r ? c(Math.min(n / r, 1)) : 1;
            if (t.setPosition(p + d * o, h + v * o), n >= r) "function" == typeof a && a.call(t);else {
              var i = requestAnimationFrame(e);
              $.set(t, i);
            }
          }();
        }(this, t, e, n, r);
      }, t.prototype.scrollIntoView = function (t, e) {
        void 0 === e && (e = {}), function (t, e, n) {
          var r = void 0 === n ? {} : n,
              o = r.alignToTop,
              i = void 0 === o || o,
              u = r.onlyScrollIfNeeded,
              c = void 0 !== u && u,
              a = r.offsetTop,
              s = void 0 === a ? 0 : a,
              f = r.offsetLeft,
              l = void 0 === f ? 0 : f,
              p = r.offsetBottom,
              h = void 0 === p ? 0 : p,
              d = t.containerEl,
              v = t.bounding,
              y = t.offset,
              m = t.limit;

          if (e && d.contains(e)) {
            var g = e.getBoundingClientRect();

            if (!c || !t.isVisible(e)) {
              var b = i ? g.top - v.top - s : g.bottom - v.bottom + h;
              t.setMomentum(g.left - v.left - l, A(b, -y.y, m.y - y.y));
            }
          }
        }(this, t, e);
      }, t.prototype.addListener = function (t) {
        if ("function" != typeof t) throw new TypeError("[smooth-scrollbar] scrolling listener should be a function");

        this._listeners.add(t);
      }, t.prototype.removeListener = function (t) {
        this._listeners.delete(t);
      }, t.prototype.addTransformableMomentum = function (t, e, n, r) {
        this._updateDebounced();

        var o = this._plugins.reduce(function (t, e) {
          return e.transformDelta(t, n) || t;
        }, {
          x: t,
          y: e
        }),
            i = !this._shouldPropagateMomentum(o.x, o.y);

        i && this.addMomentum(o.x, o.y), r && r.call(this, i);
      }, t.prototype.addMomentum = function (t, e) {
        this.setMomentum(this._momentum.x + t, this._momentum.y + e);
      }, t.prototype.setMomentum = function (t, e) {
        0 === this.limit.x && (t = 0), 0 === this.limit.y && (e = 0), this.options.renderByPixels && (t = Math.round(t), e = Math.round(e)), this._momentum.x = t, this._momentum.y = e;
      }, t.prototype.updatePluginOptions = function (t, e) {
        this._plugins.forEach(function (n) {
          n.name === t && Object.assign(n.options, e);
        });
      }, t.prototype.destroy = function () {
        var t = this.containerEl,
            e = this.contentEl;
        !function (t) {
          var e = C.get(t);
          e && (e.forEach(function (t) {
            var e = t.elem,
                n = t.eventName,
                r = t.handler;
            e.removeEventListener(n, r, R());
          }), C.delete(t));
        }(this), this._listeners.clear(), this.setMomentum(0, 0), cancelAnimationFrame(this._renderID), this._observer && this._observer.disconnect(), ht.delete(this.containerEl);

        for (var n = Array.from(e.childNodes); t.firstChild;) {
          t.removeChild(t.firstChild);
        }

        n.forEach(function (e) {
          t.appendChild(e);
        }), U(t, {
          overflow: ""
        }), t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, this._plugins.forEach(function (t) {
          t.onDestroy();
        }), this._plugins.length = 0;
      }, t.prototype._init = function () {
        var t = this;
        this.update(), Object.keys(r).forEach(function (e) {
          r[e](t);
        }), this._plugins.forEach(function (t) {
          t.onInit();
        }), this._render();
      }, t.prototype._updateDebounced = function () {
        this.update();
      }, t.prototype._shouldPropagateMomentum = function (t, e) {
        void 0 === t && (t = 0), void 0 === e && (e = 0);
        var n = this.options,
            r = this.offset,
            o = this.limit;
        if (!n.continuousScrolling) return !1;
        0 === o.x && 0 === o.y && this._updateDebounced();
        var i = A(t + r.x, 0, o.x),
            u = A(e + r.y, 0, o.y),
            c = !0;
        return (c = (c = c && i === r.x) && u === r.y) && (r.x === o.x || 0 === r.x || r.y === o.y || 0 === r.y);
      }, t.prototype._render = function () {
        var t = this._momentum;

        if (t.x || t.y) {
          var e = this._nextTick("x"),
              n = this._nextTick("y");

          t.x = e.momentum, t.y = n.momentum, this.setPosition(e.position, n.position);
        }

        var r = _i({}, this._momentum);

        this._plugins.forEach(function (t) {
          t.onRender(r);
        }), this._renderID = requestAnimationFrame(this._render.bind(this));
      }, t.prototype._nextTick = function (t) {
        var e = this.options,
            n = this.offset,
            r = this._momentum,
            o = n[t],
            i = r[t];
        if (Math.abs(i) <= .1) return {
          momentum: 0,
          position: o + i
        };
        var u = i * (1 - e.damping);
        return e.renderByPixels && (u |= 0), {
          momentum: u,
          position: o + i - u
        };
      }, u([L(100, {
        leading: !0
      })], t.prototype, "_updateDebounced", null), t;
    }(),
        vt = "smooth-scrollbar-style",
        yt = !1;

    function mt() {
      if (!yt && "undefined" != typeof window) {
        var t = document.createElement("style");
        t.id = vt, t.textContent = "\n[data-scrollbar] {\n  display: block;\n  position: relative;\n}\n\n.scroll-content {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n\n.scrollbar-track {\n  position: absolute;\n  opacity: 0;\n  z-index: 1;\n  background: rgba(222, 222, 222, .75);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transition: opacity 0.5s 0.5s ease-out;\n          transition: opacity 0.5s 0.5s ease-out;\n}\n.scrollbar-track.show,\n.scrollbar-track:hover {\n  opacity: 1;\n  -webkit-transition-delay: 0s;\n          transition-delay: 0s;\n}\n\n.scrollbar-track-x {\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 8px;\n}\n.scrollbar-track-y {\n  top: 0;\n  right: 0;\n  width: 8px;\n  height: 100%;\n}\n.scrollbar-thumb {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 8px;\n  height: 8px;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 4px;\n}\n", document.head && document.head.appendChild(t), yt = !0;
      }
    }

    n.d(e, "ScrollbarPlugin", function () {
      return nt;
    });
    /*!
     * cast `I.Scrollbar` to `Scrollbar` to avoid error
     *
     * `I.Scrollbar` is not assignable to `Scrollbar`:
     *     "privateProp" is missing in `I.Scrollbar`
     *
     * @see https://github.com/Microsoft/TypeScript/issues/2672
     */

    var gt = function (t) {
      function e() {
        return null !== t && t.apply(this, arguments) || this;
      }

      return function (t, e) {
        function n() {
          this.constructor = t;
        }

        _o(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
      }(e, t), e.init = function (t, e) {
        if (!t || 1 !== t.nodeType) throw new TypeError("expect element to be DOM Element, but got " + t);
        return mt(), ht.has(t) ? ht.get(t) : new dt(t, e);
      }, e.initAll = function (t) {
        return Array.from(document.querySelectorAll("[data-scrollbar]"), function (n) {
          return e.init(n, t);
        });
      }, e.has = function (t) {
        return ht.has(t);
      }, e.get = function (t) {
        return ht.get(t);
      }, e.getAll = function () {
        return Array.from(ht.values());
      }, e.destroy = function (t) {
        var e = ht.get(t);
        e && e.destroy();
      }, e.destroyAll = function () {
        ht.forEach(function (t) {
          t.destroy();
        });
      }, e.use = function () {
        for (var t = [], e = 0; e < arguments.length; e++) {
          t[e] = arguments[e];
        }

        return function () {
          for (var t = [], e = 0; e < arguments.length; e++) {
            t[e] = arguments[e];
          }

          t.forEach(function (t) {
            var e = t.pluginName;
            if (!e) throw new TypeError("plugin name is required");
            rt.order.add(e), rt.constructors[e] = t;
          });
        }.apply(void 0, t);
      }, e.attachStyle = function () {
        return mt();
      }, e.detachStyle = function () {
        return function () {
          if (yt && "undefined" != typeof window) {
            var t = document.getElementById(vt);
            t && t.parentNode && (t.parentNode.removeChild(t), yt = !1);
          }
        }();
      }, e.version = "8.6.1", e.ScrollbarPlugin = nt, e;
    }(dt);

    e.default = gt;
  }]).default;
});
},{}],"aKHH":[function(require,module,exports) {
var define;
var global = arguments[3];
var _excluded = ["premium", "referrerPolicy"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

"object" == (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) && function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Plyr = t();
}(this, function () {
  "use strict";

  function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function t(e, t) {
    for (var i = 0; i < t.length; i++) {
      var s = t[i];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
    }
  }

  function i(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = i, e;
  }

  function s(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      t && (s = s.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, s);
    }

    return i;
  }

  function n(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? s(Object(n), !0).forEach(function (t) {
        i(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }

    return e;
  }

  var a = {
    addCSS: !0,
    thumbWidth: 15,
    watch: !0
  };

  function l(e, t) {
    return function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }.call(e, t);
  }

  var o = function o(e) {
    return null != e ? e.constructor : null;
  },
      r = function r(e, t) {
    return !!(e && t && e instanceof t);
  },
      c = function c(e) {
    return null == e;
  },
      h = function h(e) {
    return o(e) === Object;
  },
      u = function u(e) {
    return o(e) === String;
  },
      d = function d(e) {
    return Array.isArray(e);
  },
      m = function m(e) {
    return r(e, NodeList);
  },
      p = u,
      g = d,
      f = m,
      b = function b(e) {
    return r(e, Element);
  },
      y = function y(e) {
    return r(e, Event);
  },
      v = function v(e) {
    return c(e) || (u(e) || d(e) || m(e)) && !e.length || h(e) && !Object.keys(e).length;
  };

  function w(e, t) {
    if (1 > t) {
      var i = function (e) {
        var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
      }(t);

      return parseFloat(e.toFixed(i));
    }

    return Math.round(e / t) * t;
  }

  var T = function () {
    function e(t, i) {
      (function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      })(this, e), b(t) ? this.element = t : p(t) && (this.element = document.querySelector(t)), b(this.element) && v(this.element.rangeTouch) && (this.config = n({}, a, {}, i), this.init());
    }

    return function (e, i, s) {
      i && t(e.prototype, i), s && t(e, s);
    }(e, [{
      key: "init",
      value: function value() {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
      }
    }, {
      key: "destroy",
      value: function value() {
        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
      }
    }, {
      key: "listeners",
      value: function value(e) {
        var t = this,
            i = e ? "addEventListener" : "removeEventListener";
        ["touchstart", "touchmove", "touchend"].forEach(function (e) {
          t.element[i](e, function (e) {
            return t.set(e);
          }, !1);
        });
      }
    }, {
      key: "get",
      value: function value(t) {
        if (!e.enabled || !y(t)) return null;
        var i,
            s = t.target,
            n = t.changedTouches[0],
            a = parseFloat(s.getAttribute("min")) || 0,
            l = parseFloat(s.getAttribute("max")) || 100,
            o = parseFloat(s.getAttribute("step")) || 1,
            r = s.getBoundingClientRect(),
            c = 100 / r.width * (this.config.thumbWidth / 2) / 100;
        return 0 > (i = 100 / r.width * (n.clientX - r.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), a + w(i / 100 * (l - a), o);
      }
    }, {
      key: "set",
      value: function value(t) {
        e.enabled && y(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function (e, t) {
          if (e && t) {
            var i = new Event(t, {
              bubbles: !0
            });
            e.dispatchEvent(i);
          }
        }(t.target, "touchend" === t.type ? "change" : "input"));
      }
    }], [{
      key: "setup",
      value: function value(t) {
        var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            s = null;
        if (v(t) || p(t) ? s = Array.from(document.querySelectorAll(p(t) ? t : 'input[type="range"]')) : b(t) ? s = [t] : f(t) ? s = Array.from(t) : g(t) && (s = t.filter(b)), v(s)) return null;
        var o = n({}, a, {}, i);

        if (p(t) && o.watch) {
          var r = new MutationObserver(function (i) {
            Array.from(i).forEach(function (i) {
              Array.from(i.addedNodes).forEach(function (i) {
                b(i) && l(i, t) && new e(i, o);
              });
            });
          });
          r.observe(document.body, {
            childList: !0,
            subtree: !0
          });
        }

        return s.map(function (t) {
          return new e(t, i);
        });
      }
    }, {
      key: "enabled",
      get: function get() {
        return "ontouchstart" in document.documentElement;
      }
    }]), e;
  }();

  var k = function k(e) {
    return null != e ? e.constructor : null;
  },
      C = function C(e, t) {
    return Boolean(e && t && e instanceof t);
  },
      A = function A(e) {
    return null == e;
  },
      S = function S(e) {
    return k(e) === Object;
  },
      E = function E(e) {
    return k(e) === String;
  },
      P = function P(e) {
    return k(e) === Function;
  },
      N = function N(e) {
    return Array.isArray(e);
  },
      x = function x(e) {
    return C(e, NodeList);
  },
      M = function M(e) {
    return A(e) || (E(e) || N(e) || x(e)) && !e.length || S(e) && !Object.keys(e).length;
  };

  var I = A,
      L = S,
      $ = function $(e) {
    return k(e) === Number && !Number.isNaN(e);
  },
      _ = E,
      O = function O(e) {
    return k(e) === Boolean;
  },
      q = P,
      j = N,
      D = x,
      H = function H(e) {
    return null !== e && "object" == _typeof(e) && 1 === e.nodeType && "object" == _typeof(e.style) && "object" == _typeof(e.ownerDocument);
  },
      F = function F(e) {
    return C(e, Event);
  },
      R = function R(e) {
    return C(e, KeyboardEvent);
  },
      V = function V(e) {
    return C(e, TextTrack) || !A(e) && E(e.kind);
  },
      B = function B(e) {
    return C(e, Promise) && P(e.then);
  },
      U = function U(e) {
    if (C(e, window.URL)) return !0;
    if (!E(e)) return !1;
    var t = e;
    e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));

    try {
      return !M(new URL(t).hostname);
    } catch (e) {
      return !1;
    }
  },
      W = M;

  var z = function () {
    var e = document.createElement("span"),
        t = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    },
        i = Object.keys(t).find(function (t) {
      return void 0 !== e.style[t];
    });
    return !!_(i) && t[i];
  }();

  function K(e, t) {
    setTimeout(function () {
      try {
        e.hidden = !0, e.offsetHeight, e.hidden = !1;
      } catch (e) {}
    }, t);
  }

  var Y = {
    isIE: Boolean(window.document.documentMode),
    isEdge: window.navigator.userAgent.includes("Edge"),
    isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
    isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
    isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
  };

  function Q(e, t) {
    return t.split(".").reduce(function (e, t) {
      return e && e[t];
    }, e);
  }

  function X() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      t[_key - 1] = arguments[_key];
    }

    if (!t.length) return e;
    var i = t.shift();
    return L(i) ? (Object.keys(i).forEach(function (t) {
      L(i[t]) ? (Object.keys(e).includes(t) || Object.assign(e, _defineProperty({}, t, {})), X(e[t], i[t])) : Object.assign(e, _defineProperty({}, t, i[t]));
    }), X.apply(void 0, [e].concat(t))) : e;
  }

  function J(e, t) {
    var i = e.length ? e : [e];
    Array.from(i).reverse().forEach(function (e, i) {
      var s = i > 0 ? t.cloneNode(!0) : t,
          n = e.parentNode,
          a = e.nextSibling;
      s.appendChild(e), a ? n.insertBefore(s, a) : n.appendChild(s);
    });
  }

  function G(e, t) {
    H(e) && !W(t) && Object.entries(t).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          e = _ref2[1];

      return !I(e);
    }).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          t = _ref4[0],
          i = _ref4[1];

      return e.setAttribute(t, i);
    });
  }

  function Z(e, t, i) {
    var s = document.createElement(e);
    return L(t) && G(s, t), _(i) && (s.innerText = i), s;
  }

  function ee(e, t, i, s) {
    H(t) && t.appendChild(Z(e, i, s));
  }

  function te(e) {
    D(e) || j(e) ? Array.from(e).forEach(te) : H(e) && H(e.parentNode) && e.parentNode.removeChild(e);
  }

  function ie(e) {
    if (!H(e)) return;
    var t = e.childNodes.length;

    for (; t > 0;) {
      e.removeChild(e.lastChild), t -= 1;
    }
  }

  function se(e, t) {
    return H(t) && H(t.parentNode) && H(e) ? (t.parentNode.replaceChild(e, t), e) : null;
  }

  function ne(e, t) {
    if (!_(e) || W(e)) return {};
    var i = {},
        s = X({}, t);
    return e.split(",").forEach(function (e) {
      var t = e.trim(),
          n = t.replace(".", ""),
          a = t.replace(/[[\]]/g, "").split("="),
          _a = _slicedToArray(a, 1),
          l = _a[0],
          o = a.length > 1 ? a[1].replace(/["']/g, "") : "";

      switch (t.charAt(0)) {
        case ".":
          _(s.class) ? i.class = "".concat(s.class, " ").concat(n) : i.class = n;
          break;

        case "#":
          i.id = t.replace("#", "");
          break;

        case "[":
          i[l] = o;
      }
    }), X(s, i);
  }

  function ae(e, t) {
    if (!H(e)) return;
    var i = t;
    O(i) || (i = !e.hidden), e.hidden = i;
  }

  function le(e, t, i) {
    if (D(e)) return Array.from(e).map(function (e) {
      return le(e, t, i);
    });

    if (H(e)) {
      var _s2 = "toggle";
      return void 0 !== i && (_s2 = i ? "add" : "remove"), e.classList[_s2](t), e.classList.contains(t);
    }

    return !1;
  }

  function oe(e, t) {
    return H(e) && e.classList.contains(t);
  }

  function re(e, t) {
    var _Element = Element,
        i = _Element.prototype;
    return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
      return Array.from(document.querySelectorAll(t)).includes(this);
    }).call(e, t);
  }

  function ce(e) {
    return this.elements.container.querySelectorAll(e);
  }

  function he(e) {
    return this.elements.container.querySelector(e);
  }

  function ue() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    H(e) && (e.focus({
      preventScroll: !0
    }), t && le(e, this.config.classNames.tabFocus));
  }

  var de = {
    "audio/ogg": "vorbis",
    "audio/wav": "1",
    "video/webm": "vp8, vorbis",
    "video/mp4": "avc1.42E01E, mp4a.40.2",
    "video/ogg": "theora"
  },
      me = {
    audio: "canPlayType" in document.createElement("audio"),
    video: "canPlayType" in document.createElement("video"),
    check: function check(e, t, i) {
      var s = Y.isIPhone && i && me.playsinline,
          n = me[e] || "html5" !== t;
      return {
        api: n,
        ui: n && me.rangeInput && ("video" !== e || !Y.isIPhone || s)
      };
    },
    pip: !(Y.isIPhone || !q(Z("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || Z("video").disablePictureInPicture)),
    airplay: q(window.WebKitPlaybackTargetAvailabilityEvent),
    playsinline: "playsInline" in document.createElement("video"),
    mime: function mime(e) {
      if (W(e)) return !1;

      var _e$split = e.split("/"),
          _e$split2 = _slicedToArray(_e$split, 1),
          t = _e$split2[0];

      var i = e;
      if (!this.isHTML5 || t !== this.type) return !1;
      Object.keys(de).includes(i) && (i += "; codecs=\"".concat(de[e], "\""));

      try {
        return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
      } catch (e) {
        return !1;
      }
    },
    textTracks: "textTracks" in document.createElement("video"),
    rangeInput: function () {
      var e = document.createElement("input");
      return e.type = "range", "range" === e.type;
    }(),
    touch: "ontouchstart" in document.documentElement,
    transitions: !1 !== z,
    reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
  },
      pe = function () {
    var e = !1;

    try {
      var _t = Object.defineProperty({}, "passive", {
        get: function get() {
          return e = !0, null;
        }
      });

      window.addEventListener("test", null, _t), window.removeEventListener("test", null, _t);
    } catch (e) {}

    return e;
  }();

  function ge(e, t, i) {
    var _this = this;

    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
    var a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !1;
    if (!e || !("addEventListener" in e) || W(t) || !q(i)) return;
    var l = t.split(" ");
    var o = a;
    pe && (o = {
      passive: n,
      capture: a
    }), l.forEach(function (t) {
      _this && _this.eventListeners && s && _this.eventListeners.push({
        element: e,
        type: t,
        callback: i,
        options: o
      }), e[s ? "addEventListener" : "removeEventListener"](t, i, o);
    });
  }

  function fe(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 ? arguments[2] : undefined;
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
    ge.call(this, e, t, i, !0, s, n);
  }

  function be(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 ? arguments[2] : undefined;
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
    ge.call(this, e, t, i, !1, s, n);
  }

  function ye(e) {
    var _this2 = this;

    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 ? arguments[2] : undefined;
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
    var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;

    var a = function a() {
      for (var _len2 = arguments.length, l = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        l[_key2] = arguments[_key2];
      }

      be(e, t, a, s, n), i.apply(_this2, l);
    };

    ge.call(this, e, t, a, !0, s, n);
  }

  function ve(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (!H(e) || W(t)) return;
    var n = new CustomEvent(t, {
      bubbles: i,
      detail: _objectSpread(_objectSpread({}, s), {}, {
        plyr: this
      })
    });
    e.dispatchEvent(n);
  }

  function we() {
    this && this.eventListeners && (this.eventListeners.forEach(function (e) {
      var t = e.element,
          i = e.type,
          s = e.callback,
          n = e.options;
      t.removeEventListener(i, s, n);
    }), this.eventListeners = []);
  }

  function Te() {
    var _this3 = this;

    return new Promise(function (e) {
      return _this3.ready ? setTimeout(e, 0) : fe.call(_this3, _this3.elements.container, "ready", e);
    }).then(function () {});
  }

  function ke(e) {
    B(e) && e.then(null, function () {});
  }

  function Ce(e) {
    if (!(j(e) || _(e) && e.includes(":"))) return !1;
    return (j(e) ? e : e.split(":")).map(Number).every($);
  }

  function Ae(e) {
    if (!j(e) || !e.every($)) return null;

    var _e2 = _slicedToArray(e, 2),
        t = _e2[0],
        i = _e2[1],
        s = function s(e, t) {
      return 0 === t ? e : s(t, e % t);
    },
        n = s(t, i);

    return [t / n, i / n];
  }

  function Se(e) {
    var _this$embed;

    var t = function t(e) {
      return Ce(e) ? e.split(":").map(Number) : null;
    };

    var i = t(e);

    if (null === i && (i = t(this.config.ratio)), null === i && !W(this.embed) && j(this.embed.ratio) && (_this$embed = this.embed, i = _this$embed.ratio, _this$embed), null === i && this.isHTML5) {
      var _this$media = this.media,
          _e3 = _this$media.videoWidth,
          _t2 = _this$media.videoHeight;
      i = Ae([_e3, _t2]);
    }

    return i;
  }

  function Ee(e) {
    if (!this.isVideo) return {};

    var t = this.elements.wrapper,
        i = Se.call(this, e),
        _ref5 = j(i) ? i : [0, 0],
        _ref6 = _slicedToArray(_ref5, 2),
        s = _ref6[0],
        n = _ref6[1],
        a = 100 / s * n;

    if (t.style.paddingBottom = "".concat(a, "%"), this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
      var _e4 = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
          _i2 = (_e4 - a) / (_e4 / 50);

      this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = "translateY(-".concat(_i2, "%)");
    } else this.isHTML5 && t.classList.toggle(this.config.classNames.videoFixedRatio, null !== i);

    return {
      padding: a,
      ratio: i
    };
  }

  var Pe = {
    getSources: function getSources() {
      var _this4 = this;

      if (!this.isHTML5) return [];
      return Array.from(this.media.querySelectorAll("source")).filter(function (e) {
        var t = e.getAttribute("type");
        return !!W(t) || me.mime.call(_this4, t);
      });
    },
    getQualityOptions: function getQualityOptions() {
      return this.config.quality.forced ? this.config.quality.options : Pe.getSources.call(this).map(function (e) {
        return Number(e.getAttribute("size"));
      }).filter(Boolean);
    },
    setup: function setup() {
      if (!this.isHTML5) return;
      var e = this;
      e.options.speed = e.config.speed.options, W(this.config.ratio) || Ee.call(e), Object.defineProperty(e.media, "quality", {
        get: function get() {
          var t = Pe.getSources.call(e).find(function (t) {
            return t.getAttribute("src") === e.source;
          });
          return t && Number(t.getAttribute("size"));
        },
        set: function set(t) {
          if (e.quality !== t) {
            if (e.config.quality.forced && q(e.config.quality.onChange)) e.config.quality.onChange(t);else {
              var _i3 = Pe.getSources.call(e).find(function (e) {
                return Number(e.getAttribute("size")) === t;
              });

              if (!_i3) return;
              var _e$media = e.media,
                  _s3 = _e$media.currentTime,
                  _n2 = _e$media.paused,
                  _a2 = _e$media.preload,
                  _l = _e$media.readyState,
                  _o = _e$media.playbackRate;
              e.media.src = _i3.getAttribute("src"), ("none" !== _a2 || _l) && (e.once("loadedmetadata", function () {
                e.speed = _o, e.currentTime = _s3, _n2 || ke(e.play());
              }), e.media.load());
            }
            ve.call(e, e.media, "qualitychange", !1, {
              quality: t
            });
          }
        }
      });
    },
    cancelRequests: function cancelRequests() {
      this.isHTML5 && (te(Pe.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
    }
  };

  function Ne(e) {
    return j(e) ? e.filter(function (t, i) {
      return e.indexOf(t) === i;
    }) : e;
  }

  function xe(e) {
    for (var _len3 = arguments.length, t = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      t[_key3 - 1] = arguments[_key3];
    }

    return W(e) ? e : e.toString().replace(/{(\d+)}/g, function (e, i) {
      return t[i].toString();
    });
  }

  var Me = function Me() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString());
  },
      Ie = function Ie() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return e.toString().replace(/\w\S*/g, function (e) {
      return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
    });
  };

  function Le() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var t = e.toString();
    return t = function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var t = e.toString();
      return t = Me(t, "-", " "), t = Me(t, "_", " "), t = Ie(t), Me(t, " ", "");
    }(t), t.charAt(0).toLowerCase() + t.slice(1);
  }

  function $e(e) {
    var t = document.createElement("div");
    return t.appendChild(e), t.innerHTML;
  }

  var _e = {
    pip: "PIP",
    airplay: "AirPlay",
    html5: "HTML5",
    vimeo: "Vimeo",
    youtube: "YouTube"
  },
      Oe = {
    get: function get() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (W(e) || W(t)) return "";
      var i = Q(t.i18n, e);
      if (W(i)) return Object.keys(_e).includes(e) ? _e[e] : "";
      var s = {
        "{seektime}": t.seekTime,
        "{title}": t.title
      };
      return Object.entries(s).forEach(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            e = _ref8[0],
            t = _ref8[1];

        i = Me(i, e, t);
      }), i;
    }
  };

  var qe = /*#__PURE__*/function () {
    function qe(t) {
      var _this5 = this;

      _classCallCheck(this, qe);

      e(this, "get", function (e) {
        if (!qe.supported || !_this5.enabled) return null;
        var t = window.localStorage.getItem(_this5.key);
        if (W(t)) return null;
        var i = JSON.parse(t);
        return _(e) && e.length ? i[e] : i;
      }), e(this, "set", function (e) {
        if (!qe.supported || !_this5.enabled) return;
        if (!L(e)) return;

        var t = _this5.get();

        W(t) && (t = {}), X(t, e), window.localStorage.setItem(_this5.key, JSON.stringify(t));
      }), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key;
    }

    _createClass(qe, null, [{
      key: "supported",
      get: function get() {
        try {
          if (!("localStorage" in window)) return !1;
          var _e5 = "___test";
          return window.localStorage.setItem(_e5, _e5), window.localStorage.removeItem(_e5), !0;
        } catch (e) {
          return !1;
        }
      }
    }]);

    return qe;
  }();

  function je(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "text";
    return new Promise(function (i, s) {
      try {
        var _s4 = new XMLHttpRequest();

        if (!("withCredentials" in _s4)) return;
        _s4.addEventListener("load", function () {
          if ("text" === t) try {
            i(JSON.parse(_s4.responseText));
          } catch (e) {
            i(_s4.responseText);
          } else i(_s4.response);
        }), _s4.addEventListener("error", function () {
          throw new Error(_s4.status);
        }), _s4.open("GET", e, !0), _s4.responseType = t, _s4.send();
      } catch (e) {
        s(e);
      }
    });
  }

  function De(e, t) {
    if (!_(e)) return;

    var i = _(t);

    var s = !1;

    var n = function n() {
      return null !== document.getElementById(t);
    },
        a = function a(e, t) {
      e.innerHTML = t, i && n() || document.body.insertAdjacentElement("afterbegin", e);
    };

    if (!i || !n()) {
      var _n3 = qe.supported,
          _l2 = document.createElement("div");

      if (_l2.setAttribute("hidden", ""), i && _l2.setAttribute("id", t), _n3) {
        var _e6 = window.localStorage.getItem("cache-".concat(t));

        if (s = null !== _e6, s) {
          var _t3 = JSON.parse(_e6);

          a(_l2, _t3.content);
        }
      }

      je(e).then(function (e) {
        W(e) || (_n3 && window.localStorage.setItem("cache-".concat(t), JSON.stringify({
          content: e
        })), a(_l2, e));
      }).catch(function () {});
    }
  }

  var He = function He(e) {
    return Math.trunc(e / 60 / 60 % 60, 10);
  };

  function Fe() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    if (!$(e)) return Fe(void 0, t, i);

    var s = function s(e) {
      return "0".concat(e).slice(-2);
    };

    var n = He(e);
    var a = (l = e, Math.trunc(l / 60 % 60, 10));
    var l;

    var o = function (e) {
      return Math.trunc(e % 60, 10);
    }(e);

    return n = t || n > 0 ? "".concat(n, ":") : "", "".concat(i && e > 0 ? "-" : "").concat(n).concat(s(a), ":").concat(s(o));
  }

  var Re = {
    getIconUrl: function getIconUrl() {
      var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || Y.isIE && !window.svg4everybody;
      return {
        url: this.config.iconUrl,
        cors: e
      };
    },
    findElements: function findElements() {
      try {
        return this.elements.controls = he.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
          play: ce.call(this, this.config.selectors.buttons.play),
          pause: he.call(this, this.config.selectors.buttons.pause),
          restart: he.call(this, this.config.selectors.buttons.restart),
          rewind: he.call(this, this.config.selectors.buttons.rewind),
          fastForward: he.call(this, this.config.selectors.buttons.fastForward),
          mute: he.call(this, this.config.selectors.buttons.mute),
          pip: he.call(this, this.config.selectors.buttons.pip),
          airplay: he.call(this, this.config.selectors.buttons.airplay),
          settings: he.call(this, this.config.selectors.buttons.settings),
          captions: he.call(this, this.config.selectors.buttons.captions),
          fullscreen: he.call(this, this.config.selectors.buttons.fullscreen)
        }, this.elements.progress = he.call(this, this.config.selectors.progress), this.elements.inputs = {
          seek: he.call(this, this.config.selectors.inputs.seek),
          volume: he.call(this, this.config.selectors.inputs.volume)
        }, this.elements.display = {
          buffer: he.call(this, this.config.selectors.display.buffer),
          currentTime: he.call(this, this.config.selectors.display.currentTime),
          duration: he.call(this, this.config.selectors.display.duration)
        }, H(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0;
      } catch (e) {
        return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1;
      }
    },
    createIcon: function createIcon(e, t) {
      var i = "http://www.w3.org/2000/svg",
          s = Re.getIconUrl.call(this),
          n = "".concat(s.cors ? "" : s.url, "#").concat(this.config.iconPrefix),
          a = document.createElementNS(i, "svg");
      G(a, X(t, {
        "aria-hidden": "true",
        focusable: "false"
      }));
      var l = document.createElementNS(i, "use"),
          o = "".concat(n, "-").concat(e);
      return "href" in l && l.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), a.appendChild(l), a;
    },
    createLabel: function createLabel(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i = Oe.get(e, this.config);
      return Z("span", _objectSpread(_objectSpread({}, t), {}, {
        class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
      }), i);
    },
    createBadge: function createBadge(e) {
      if (W(e)) return null;
      var t = Z("span", {
        class: this.config.classNames.menu.value
      });
      return t.appendChild(Z("span", {
        class: this.config.classNames.menu.badge
      }, e)), t;
    },
    createButton: function createButton(e, t) {
      var _this6 = this;

      var i = X({}, t);
      var s = Le(e);
      var n = {
        element: "button",
        toggle: !1,
        label: null,
        icon: null,
        labelPressed: null,
        iconPressed: null
      };

      switch (["element", "icon", "label"].forEach(function (e) {
        Object.keys(i).includes(e) && (n[e] = i[e], delete i[e]);
      }), "button" !== n.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some(function (e) {
        return e === _this6.config.classNames.control;
      }) || X(i, {
        class: "".concat(i.class, " ").concat(this.config.classNames.control)
      }) : i.class = this.config.classNames.control, e) {
        case "play":
          n.toggle = !0, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
          break;

        case "mute":
          n.toggle = !0, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
          break;

        case "captions":
          n.toggle = !0, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
          break;

        case "fullscreen":
          n.toggle = !0, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
          break;

        case "play-large":
          i.class += " ".concat(this.config.classNames.control, "--overlaid"), s = "play", n.label = "play", n.icon = "play";
          break;

        default:
          W(n.label) && (n.label = s), W(n.icon) && (n.icon = e);
      }

      var a = Z(n.element);
      return n.toggle ? (a.appendChild(Re.createIcon.call(this, n.iconPressed, {
        class: "icon--pressed"
      })), a.appendChild(Re.createIcon.call(this, n.icon, {
        class: "icon--not-pressed"
      })), a.appendChild(Re.createLabel.call(this, n.labelPressed, {
        class: "label--pressed"
      })), a.appendChild(Re.createLabel.call(this, n.label, {
        class: "label--not-pressed"
      }))) : (a.appendChild(Re.createIcon.call(this, n.icon)), a.appendChild(Re.createLabel.call(this, n.label))), X(i, ne(this.config.selectors.buttons[s], i)), G(a, i), "play" === s ? (j(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(a)) : this.elements.buttons[s] = a, a;
    },
    createRange: function createRange(e, t) {
      var i = Z("input", X(ne(this.config.selectors.inputs[e]), {
        type: "range",
        min: 0,
        max: 100,
        step: .01,
        value: 0,
        autocomplete: "off",
        role: "slider",
        "aria-label": Oe.get(e, this.config),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": 0
      }, t));
      return this.elements.inputs[e] = i, Re.updateRangeFill.call(this, i), T.setup(i), i;
    },
    createProgress: function createProgress(e, t) {
      var i = Z("progress", X(ne(this.config.selectors.display[e]), {
        min: 0,
        max: 100,
        value: 0,
        role: "progressbar",
        "aria-hidden": !0
      }, t));

      if ("volume" !== e) {
        i.appendChild(Z("span", null, "0"));

        var _t4 = {
          played: "played",
          buffer: "buffered"
        }[e],
            _s5 = _t4 ? Oe.get(_t4, this.config) : "";

        i.innerText = "% ".concat(_s5.toLowerCase());
      }

      return this.elements.display[e] = i, i;
    },
    createTime: function createTime(e, t) {
      var i = ne(this.config.selectors.display[e], t),
          s = Z("div", X(i, {
        class: "".concat(i.class ? i.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
        "aria-label": Oe.get(e, this.config)
      }), "00:00");
      return this.elements.display[e] = s, s;
    },
    bindMenuItemShortcuts: function bindMenuItemShortcuts(e, t) {
      var _this7 = this;

      fe.call(this, e, "keydown keyup", function (i) {
        if (![32, 38, 39, 40].includes(i.which)) return;
        if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type) return;
        var s = re(e, '[role="menuitemradio"]');
        if (!s && [32, 39].includes(i.which)) Re.showMenuPanel.call(_this7, t, !0);else {
          var _t5;

          32 !== i.which && (40 === i.which || s && 39 === i.which ? (_t5 = e.nextElementSibling, H(_t5) || (_t5 = e.parentNode.firstElementChild)) : (_t5 = e.previousElementSibling, H(_t5) || (_t5 = e.parentNode.lastElementChild)), ue.call(_this7, _t5, !0));
        }
      }, !1), fe.call(this, e, "keyup", function (e) {
        13 === e.which && Re.focusFirstMenuItem.call(_this7, null, !0);
      });
    },
    createMenuItem: function createMenuItem(_ref9) {
      var _this8 = this;

      var e = _ref9.value,
          t = _ref9.list,
          i = _ref9.type,
          s = _ref9.title,
          _ref9$badge = _ref9.badge,
          n = _ref9$badge === void 0 ? null : _ref9$badge,
          _ref9$checked = _ref9.checked,
          a = _ref9$checked === void 0 ? !1 : _ref9$checked;
      var l = ne(this.config.selectors.inputs[i]),
          o = Z("button", X(l, {
        type: "button",
        role: "menuitemradio",
        class: "".concat(this.config.classNames.control, " ").concat(l.class ? l.class : "").trim(),
        "aria-checked": a,
        value: e
      })),
          r = Z("span");
      r.innerHTML = s, H(n) && r.appendChild(n), o.appendChild(r), Object.defineProperty(o, "checked", {
        enumerable: !0,
        get: function get() {
          return "true" === o.getAttribute("aria-checked");
        },
        set: function set(e) {
          e && Array.from(o.parentNode.children).filter(function (e) {
            return re(e, '[role="menuitemradio"]');
          }).forEach(function (e) {
            return e.setAttribute("aria-checked", "false");
          }), o.setAttribute("aria-checked", e ? "true" : "false");
        }
      }), this.listeners.bind(o, "click keyup", function (t) {
        if (!R(t) || 32 === t.which) {
          switch (t.preventDefault(), t.stopPropagation(), o.checked = !0, i) {
            case "language":
              _this8.currentTrack = Number(e);
              break;

            case "quality":
              _this8.quality = e;
              break;

            case "speed":
              _this8.speed = parseFloat(e);
          }

          Re.showMenuPanel.call(_this8, "home", R(t));
        }
      }, i, !1), Re.bindMenuItemShortcuts.call(this, o, i), t.appendChild(o);
    },
    formatTime: function formatTime() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (!$(e)) return e;
      return Fe(e, He(this.duration) > 0, t);
    },
    updateTimeDisplay: function updateTimeDisplay() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      H(e) && $(t) && (e.innerText = Re.formatTime(t, i));
    },
    updateVolume: function updateVolume() {
      this.supported.ui && (H(this.elements.inputs.volume) && Re.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), H(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
    },
    setRange: function setRange(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      H(e) && (e.value = t, Re.updateRangeFill.call(this, e));
    },
    updateProgress: function updateProgress(e) {
      var _this9 = this;

      if (!this.supported.ui || !F(e)) return;
      var t = 0;

      var i = function i(e, t) {
        var i = $(t) ? t : 0,
            s = H(e) ? e : _this9.elements.display.buffer;

        if (H(s)) {
          s.value = i;
          var _e7 = s.getElementsByTagName("span")[0];
          H(_e7) && (_e7.childNodes[0].nodeValue = i);
        }
      };

      if (e) switch (e.type) {
        case "timeupdate":
        case "seeking":
        case "seeked":
          s = this.currentTime, n = this.duration, t = 0 === s || 0 === n || Number.isNaN(s) || Number.isNaN(n) ? 0 : (s / n * 100).toFixed(2), "timeupdate" === e.type && Re.setRange.call(this, this.elements.inputs.seek, t);
          break;

        case "playing":
        case "progress":
          i(this.elements.display.buffer, 100 * this.buffered);
      }
      var s, n;
    },
    updateRangeFill: function updateRangeFill(e) {
      var t = F(e) ? e.target : e;

      if (H(t) && "range" === t.getAttribute("type")) {
        if (re(t, this.config.selectors.inputs.seek)) {
          t.setAttribute("aria-valuenow", this.currentTime);

          var _e8 = Re.formatTime(this.currentTime),
              _i4 = Re.formatTime(this.duration),
              _s6 = Oe.get("seekLabel", this.config);

          t.setAttribute("aria-valuetext", _s6.replace("{currentTime}", _e8).replace("{duration}", _i4));
        } else if (re(t, this.config.selectors.inputs.volume)) {
          var _e9 = 100 * t.value;

          t.setAttribute("aria-valuenow", _e9), t.setAttribute("aria-valuetext", "".concat(_e9.toFixed(1), "%"));
        } else t.setAttribute("aria-valuenow", t.value);

        Y.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%");
      }
    },
    updateSeekTooltip: function updateSeekTooltip(e) {
      var _this10 = this;

      if (!this.config.tooltips.seek || !H(this.elements.inputs.seek) || !H(this.elements.display.seekTooltip) || 0 === this.duration) return;

      var t = "".concat(this.config.classNames.tooltip, "--visible"),
          i = function i(e) {
        return le(_this10.elements.display.seekTooltip, t, e);
      };

      if (this.touch) return void i(!1);
      var s = 0;
      var n = this.elements.progress.getBoundingClientRect();
      if (F(e)) s = 100 / n.width * (e.pageX - n.left);else {
        if (!oe(this.elements.display.seekTooltip, t)) return;
        s = parseFloat(this.elements.display.seekTooltip.style.left, 10);
      }
      s < 0 ? s = 0 : s > 100 && (s = 100), Re.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * s), this.elements.display.seekTooltip.style.left = "".concat(s, "%"), F(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type);
    },
    timeUpdate: function timeUpdate(e) {
      var t = !H(this.elements.display.duration) && this.config.invertTime;
      Re.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || Re.updateProgress.call(this, e);
    },
    durationUpdate: function durationUpdate() {
      if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
      if (this.duration >= Math.pow(2, 32)) return ae(this.elements.display.currentTime, !0), void ae(this.elements.progress, !0);
      H(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
      var e = H(this.elements.display.duration);
      !e && this.config.displayDuration && this.paused && Re.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && Re.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), Re.updateSeekTooltip.call(this);
    },
    toggleMenuButton: function toggleMenuButton(e, t) {
      ae(this.elements.settings.buttons[e], !t);
    },
    updateSetting: function updateSetting(e, t, i) {
      var s = this.elements.settings.panels[e];
      var n = null,
          a = t;
      if ("captions" === e) n = this.currentTrack;else {
        if (n = W(i) ? this[e] : i, W(n) && (n = this.config[e].default), !W(this.options[e]) && !this.options[e].includes(n)) return void this.debug.warn("Unsupported value of '".concat(n, "' for ").concat(e));
        if (!this.config[e].options.includes(n)) return void this.debug.warn("Disabled value of '".concat(n, "' for ").concat(e));
      }
      if (H(a) || (a = s && s.querySelector('[role="menu"]')), !H(a)) return;
      this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = Re.getLabel.call(this, e, n);
      var l = a && a.querySelector("[value=\"".concat(n, "\"]"));
      H(l) && (l.checked = !0);
    },
    getLabel: function getLabel(e, t) {
      switch (e) {
        case "speed":
          return 1 === t ? Oe.get("normal", this.config) : "".concat(t, "&times;");

        case "quality":
          if ($(t)) {
            var _e10 = Oe.get("qualityLabel.".concat(t), this.config);

            return _e10.length ? _e10 : "".concat(t, "p");
          }

          return Ie(t);

        case "captions":
          return Ue.getLabel.call(this);

        default:
          return null;
      }
    },
    setQualityMenu: function setQualityMenu(e) {
      var _this11 = this;

      if (!H(this.elements.settings.panels.quality)) return;
      var t = "quality",
          i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
      j(e) && (this.options.quality = Ne(e).filter(function (e) {
        return _this11.config.quality.options.includes(e);
      }));
      var s = !W(this.options.quality) && this.options.quality.length > 1;
      if (Re.toggleMenuButton.call(this, t, s), ie(i), Re.checkMenu.call(this), !s) return;

      var n = function n(e) {
        var t = Oe.get("qualityBadge.".concat(e), _this11.config);
        return t.length ? Re.createBadge.call(_this11, t) : null;
      };

      this.options.quality.sort(function (e, t) {
        var i = _this11.config.quality.options;
        return i.indexOf(e) > i.indexOf(t) ? 1 : -1;
      }).forEach(function (e) {
        Re.createMenuItem.call(_this11, {
          value: e,
          list: i,
          type: t,
          title: Re.getLabel.call(_this11, "quality", e),
          badge: n(e)
        });
      }), Re.updateSetting.call(this, t, i);
    },
    setCaptionsMenu: function setCaptionsMenu() {
      var _this12 = this;

      if (!H(this.elements.settings.panels.captions)) return;
      var e = "captions",
          t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
          i = Ue.getTracks.call(this),
          s = Boolean(i.length);
      if (Re.toggleMenuButton.call(this, e, s), ie(t), Re.checkMenu.call(this), !s) return;
      var n = i.map(function (e, i) {
        return {
          value: i,
          checked: _this12.captions.toggled && _this12.currentTrack === i,
          title: Ue.getLabel.call(_this12, e),
          badge: e.language && Re.createBadge.call(_this12, e.language.toUpperCase()),
          list: t,
          type: "language"
        };
      });
      n.unshift({
        value: -1,
        checked: !this.captions.toggled,
        title: Oe.get("disabled", this.config),
        list: t,
        type: "language"
      }), n.forEach(Re.createMenuItem.bind(this)), Re.updateSetting.call(this, e, t);
    },
    setSpeedMenu: function setSpeedMenu() {
      var _this13 = this;

      if (!H(this.elements.settings.panels.speed)) return;
      var e = "speed",
          t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
      this.options.speed = this.options.speed.filter(function (e) {
        return e >= _this13.minimumSpeed && e <= _this13.maximumSpeed;
      });
      var i = !W(this.options.speed) && this.options.speed.length > 1;
      Re.toggleMenuButton.call(this, e, i), ie(t), Re.checkMenu.call(this), i && (this.options.speed.forEach(function (i) {
        Re.createMenuItem.call(_this13, {
          value: i,
          list: t,
          type: e,
          title: Re.getLabel.call(_this13, "speed", i)
        });
      }), Re.updateSetting.call(this, e, t));
    },
    checkMenu: function checkMenu() {
      var e = this.elements.settings.buttons,
          t = !W(e) && Object.values(e).some(function (e) {
        return !e.hidden;
      });
      ae(this.elements.settings.menu, !t);
    },
    focusFirstMenuItem: function focusFirstMenuItem(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      if (this.elements.settings.popup.hidden) return;
      var i = e;
      H(i) || (i = Object.values(this.elements.settings.panels).find(function (e) {
        return !e.hidden;
      }));
      var s = i.querySelector('[role^="menuitem"]');
      ue.call(this, s, t);
    },
    toggleMenu: function toggleMenu(e) {
      var t = this.elements.settings.popup,
          i = this.elements.buttons.settings;
      if (!H(t) || !H(i)) return;
      var s = t.hidden;
      var n = s;
      if (O(e)) n = e;else if (R(e) && 27 === e.which) n = !1;else if (F(e)) {
        var _s7 = q(e.composedPath) ? e.composedPath()[0] : e.target,
            _a3 = t.contains(_s7);

        if (_a3 || !_a3 && e.target !== i && n) return;
      }
      i.setAttribute("aria-expanded", n), ae(t, !n), le(this.elements.container, this.config.classNames.menu.open, n), n && R(e) ? Re.focusFirstMenuItem.call(this, null, !0) : n || s || ue.call(this, i, R(e));
    },
    getMenuSize: function getMenuSize(e) {
      var t = e.cloneNode(!0);
      t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
      var i = t.scrollWidth,
          s = t.scrollHeight;
      return te(t), {
        width: i,
        height: s
      };
    },
    showMenuPanel: function showMenuPanel() {
      var _this14 = this;

      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var i = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(e));
      if (!H(i)) return;
      var s = i.parentNode,
          n = Array.from(s.children).find(function (e) {
        return !e.hidden;
      });

      if (me.transitions && !me.reducedMotion) {
        s.style.width = "".concat(n.scrollWidth, "px"), s.style.height = "".concat(n.scrollHeight, "px");

        var _e11 = Re.getMenuSize.call(this, i),
            _t6 = function _t6(e) {
          e.target === s && ["width", "height"].includes(e.propertyName) && (s.style.width = "", s.style.height = "", be.call(_this14, s, z, _t6));
        };

        fe.call(this, s, z, _t6), s.style.width = "".concat(_e11.width, "px"), s.style.height = "".concat(_e11.height, "px");
      }

      ae(n, !0), ae(i, !1), Re.focusFirstMenuItem.call(this, i, t);
    },
    setDownloadUrl: function setDownloadUrl() {
      var e = this.elements.buttons.download;
      H(e) && e.setAttribute("href", this.download);
    },
    create: function create(e) {
      var _this15 = this;

      var t = Re.bindMenuItemShortcuts,
          i = Re.createButton,
          s = Re.createProgress,
          n = Re.createRange,
          a = Re.createTime,
          l = Re.setQualityMenu,
          o = Re.setSpeedMenu,
          r = Re.showMenuPanel;
      this.elements.controls = null, j(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
      var c = Z("div", ne(this.config.selectors.controls.wrapper));
      this.elements.controls = c;
      var h = {
        class: "plyr__controls__item"
      };
      return Ne(j(this.config.controls) ? this.config.controls : []).forEach(function (l) {
        if ("restart" === l && c.appendChild(i.call(_this15, "restart", h)), "rewind" === l && c.appendChild(i.call(_this15, "rewind", h)), "play" === l && c.appendChild(i.call(_this15, "play", h)), "fast-forward" === l && c.appendChild(i.call(_this15, "fast-forward", h)), "progress" === l) {
          var _t7 = Z("div", {
            class: "".concat(h.class, " plyr__progress__container")
          }),
              _i5 = Z("div", ne(_this15.config.selectors.progress));

          if (_i5.appendChild(n.call(_this15, "seek", {
            id: "plyr-seek-".concat(e.id)
          })), _i5.appendChild(s.call(_this15, "buffer")), _this15.config.tooltips.seek) {
            var _e12 = Z("span", {
              class: _this15.config.classNames.tooltip
            }, "00:00");

            _i5.appendChild(_e12), _this15.elements.display.seekTooltip = _e12;
          }

          _this15.elements.progress = _i5, _t7.appendChild(_this15.elements.progress), c.appendChild(_t7);
        }

        if ("current-time" === l && c.appendChild(a.call(_this15, "currentTime", h)), "duration" === l && c.appendChild(a.call(_this15, "duration", h)), "mute" === l || "volume" === l) {
          var _t8 = _this15.elements.volume;

          if (H(_t8) && c.contains(_t8) || (_t8 = Z("div", X({}, h, {
            class: "".concat(h.class, " plyr__volume").trim()
          })), _this15.elements.volume = _t8, c.appendChild(_t8)), "mute" === l && _t8.appendChild(i.call(_this15, "mute")), "volume" === l && !Y.isIos) {
            var _i6 = {
              max: 1,
              step: .05,
              value: _this15.config.volume
            };

            _t8.appendChild(n.call(_this15, "volume", X(_i6, {
              id: "plyr-volume-".concat(e.id)
            })));
          }
        }

        if ("captions" === l && c.appendChild(i.call(_this15, "captions", h)), "settings" === l && !W(_this15.config.settings)) {
          var _s8 = Z("div", X({}, h, {
            class: "".concat(h.class, " plyr__menu").trim(),
            hidden: ""
          }));

          _s8.appendChild(i.call(_this15, "settings", {
            "aria-haspopup": !0,
            "aria-controls": "plyr-settings-".concat(e.id),
            "aria-expanded": !1
          }));

          var _n4 = Z("div", {
            class: "plyr__menu__container",
            id: "plyr-settings-".concat(e.id),
            hidden: ""
          }),
              _a4 = Z("div"),
              _l3 = Z("div", {
            id: "plyr-settings-".concat(e.id, "-home")
          }),
              _o2 = Z("div", {
            role: "menu"
          });

          _l3.appendChild(_o2), _a4.appendChild(_l3), _this15.elements.settings.panels.home = _l3, _this15.config.settings.forEach(function (i) {
            var s = Z("button", X(ne(_this15.config.selectors.buttons.settings), {
              type: "button",
              class: "".concat(_this15.config.classNames.control, " ").concat(_this15.config.classNames.control, "--forward"),
              role: "menuitem",
              "aria-haspopup": !0,
              hidden: ""
            }));
            t.call(_this15, s, i), fe.call(_this15, s, "click", function () {
              r.call(_this15, i, !1);
            });
            var n = Z("span", null, Oe.get(i, _this15.config)),
                l = Z("span", {
              class: _this15.config.classNames.menu.value
            });
            l.innerHTML = e[i], n.appendChild(l), s.appendChild(n), _o2.appendChild(s);
            var c = Z("div", {
              id: "plyr-settings-".concat(e.id, "-").concat(i),
              hidden: ""
            }),
                h = Z("button", {
              type: "button",
              class: "".concat(_this15.config.classNames.control, " ").concat(_this15.config.classNames.control, "--back")
            });
            h.appendChild(Z("span", {
              "aria-hidden": !0
            }, Oe.get(i, _this15.config))), h.appendChild(Z("span", {
              class: _this15.config.classNames.hidden
            }, Oe.get("menuBack", _this15.config))), fe.call(_this15, c, "keydown", function (e) {
              37 === e.which && (e.preventDefault(), e.stopPropagation(), r.call(_this15, "home", !0));
            }, !1), fe.call(_this15, h, "click", function () {
              r.call(_this15, "home", !1);
            }), c.appendChild(h), c.appendChild(Z("div", {
              role: "menu"
            })), _a4.appendChild(c), _this15.elements.settings.buttons[i] = s, _this15.elements.settings.panels[i] = c;
          }), _n4.appendChild(_a4), _s8.appendChild(_n4), c.appendChild(_s8), _this15.elements.settings.popup = _n4, _this15.elements.settings.menu = _s8;
        }

        if ("pip" === l && me.pip && c.appendChild(i.call(_this15, "pip", h)), "airplay" === l && me.airplay && c.appendChild(i.call(_this15, "airplay", h)), "download" === l) {
          var _e13 = X({}, h, {
            element: "a",
            href: _this15.download,
            target: "_blank"
          });

          _this15.isHTML5 && (_e13.download = "");
          var _t9 = _this15.config.urls.download;
          !U(_t9) && _this15.isEmbed && X(_e13, {
            icon: "logo-".concat(_this15.provider),
            label: _this15.provider
          }), c.appendChild(i.call(_this15, "download", _e13));
        }

        "fullscreen" === l && c.appendChild(i.call(_this15, "fullscreen", h));
      }), this.isHTML5 && l.call(this, Pe.getQualityOptions.call(this)), o.call(this), c;
    },
    inject: function inject() {
      var _this16 = this;

      if (this.config.loadSprite) {
        var _e14 = Re.getIconUrl.call(this);

        _e14.cors && De(_e14.url, "sprite-plyr");
      }

      this.id = Math.floor(1e4 * Math.random());
      var e = null;
      this.elements.controls = null;
      var t = {
        id: this.id,
        seektime: this.config.seekTime,
        title: this.config.title
      };
      var i = !0;
      q(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), H(this.config.controls) || _(this.config.controls) ? e = this.config.controls : (e = Re.create.call(this, {
        id: this.id,
        seektime: this.config.seekTime,
        speed: this.speed,
        quality: this.quality,
        captions: Ue.getLabel.call(this)
      }), i = !1);
      var s;
      i && _(this.config.controls) && (e = function (e) {
        var i = e;
        return Object.entries(t).forEach(function (_ref10) {
          var _ref11 = _slicedToArray(_ref10, 2),
              e = _ref11[0],
              t = _ref11[1];

          i = Me(i, "{".concat(e, "}"), t);
        }), i;
      }(e)), _(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), H(s) || (s = this.elements.container);

      if (s[H(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), H(this.elements.controls) || Re.findElements.call(this), !W(this.elements.buttons)) {
        var _e15 = function _e15(e) {
          var t = _this16.config.classNames.controlPressed;
          Object.defineProperty(e, "pressed", {
            enumerable: !0,
            get: function get() {
              return oe(e, t);
            },
            set: function set() {
              var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
              le(e, t, i);
            }
          });
        };

        Object.values(this.elements.buttons).filter(Boolean).forEach(function (t) {
          j(t) || D(t) ? Array.from(t).filter(Boolean).forEach(_e15) : _e15(t);
        });
      }

      if (Y.isEdge && K(s), this.config.tooltips.controls) {
        var _this$config = this.config,
            _e16 = _this$config.classNames,
            _t10 = _this$config.selectors,
            _i7 = "".concat(_t10.controls.wrapper, " ").concat(_t10.labels, " .").concat(_e16.hidden),
            _s9 = ce.call(this, _i7);

        Array.from(_s9).forEach(function (e) {
          le(e, _this16.config.classNames.hidden, !1), le(e, _this16.config.classNames.tooltip, !0);
        });
      }
    }
  };

  function Ve(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    var i = e;

    if (t) {
      var _e17 = document.createElement("a");

      _e17.href = i, i = _e17.href;
    }

    try {
      return new URL(i);
    } catch (e) {
      return null;
    }
  }

  function Be(e) {
    var t = new URLSearchParams();
    return L(e) && Object.entries(e).forEach(function (_ref12) {
      var _ref13 = _slicedToArray(_ref12, 2),
          e = _ref13[0],
          i = _ref13[1];

      t.set(e, i);
    }), t;
  }

  var Ue = {
    setup: function setup() {
      var _i8, _i9, _this$config$captions;

      if (!this.supported.ui) return;
      if (!this.isVideo || this.isYouTube || this.isHTML5 && !me.textTracks) return void (j(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Re.setCaptionsMenu.call(this));
      var e, t;

      if (H(this.elements.captions) || (this.elements.captions = Z("div", ne(this.config.selectors.captions)), e = this.elements.captions, t = this.elements.wrapper, H(e) && H(t) && t.parentNode.insertBefore(e, t.nextSibling)), Y.isIE && window.URL) {
        var _e18 = this.media.querySelectorAll("track");

        Array.from(_e18).forEach(function (e) {
          var t = e.getAttribute("src"),
              i = Ve(t);
          null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && je(t, "blob").then(function (t) {
            e.setAttribute("src", window.URL.createObjectURL(t));
          }).catch(function () {
            te(e);
          });
        });
      }

      var i = Ne((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(function (e) {
        return e.split("-")[0];
      }));
      var s = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
      "auto" === s && (_i8 = i, _i9 = _slicedToArray(_i8, 1), s = _i9[0], _i8);
      var n = this.storage.get("captions");

      if (O(n) || (_this$config$captions = this.config.captions, n = _this$config$captions.active, _this$config$captions), Object.assign(this.captions, {
        toggled: !1,
        active: n,
        language: s,
        languages: i
      }), this.isHTML5) {
        var _e19 = this.config.captions.update ? "addtrack removetrack" : "removetrack";

        fe.call(this, this.media.textTracks, _e19, Ue.update.bind(this));
      }

      setTimeout(Ue.update.bind(this), 0);
    },
    update: function update() {
      var _this17 = this;

      var e = Ue.getTracks.call(this, !0),
          _this$captions = this.captions,
          t = _this$captions.active,
          i = _this$captions.language,
          s = _this$captions.meta,
          n = _this$captions.currentTrackNode,
          a = Boolean(e.find(function (e) {
        return e.language === i;
      }));
      this.isHTML5 && this.isVideo && e.filter(function (e) {
        return !s.get(e);
      }).forEach(function (e) {
        _this17.debug.log("Track added", e), s.set(e, {
          default: "showing" === e.mode
        }), "showing" === e.mode && (e.mode = "hidden"), fe.call(_this17, e, "cuechange", function () {
          return Ue.updateCues.call(_this17);
        });
      }), (a && this.language !== i || !e.includes(n)) && (Ue.setLanguage.call(this, i), Ue.toggle.call(this, t && a)), le(this.elements.container, this.config.classNames.captions.enabled, !W(e)), j(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && Re.setCaptionsMenu.call(this);
    },
    toggle: function toggle(e) {
      var _this18 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      if (!this.supported.ui) return;
      var i = this.captions.toggled,
          s = this.config.classNames.captions.active,
          n = I(e) ? !i : e;

      if (n !== i) {
        if (t || (this.captions.active = n, this.storage.set({
          captions: n
        })), !this.language && n && !t) {
          var _e20 = Ue.getTracks.call(this),
              _t11 = Ue.findTrack.call(this, [this.captions.language].concat(_toConsumableArray(this.captions.languages)), !0);

          return this.captions.language = _t11.language, void Ue.set.call(this, _e20.indexOf(_t11));
        }

        this.elements.buttons.captions && (this.elements.buttons.captions.pressed = n), le(this.elements.container, s, n), this.captions.toggled = n, Re.updateSetting.call(this, "captions"), ve.call(this, this.media, n ? "captionsenabled" : "captionsdisabled");
      }

      setTimeout(function () {
        n && _this18.captions.toggled && (_this18.captions.currentTrackNode.mode = "hidden");
      });
    },
    set: function set(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      var i = Ue.getTracks.call(this);
      if (-1 !== e) {
        if ($(e)) {
          if (e in i) {
            if (this.captions.currentTrack !== e) {
              this.captions.currentTrack = e;

              var _s10 = i[e],
                  _ref14 = _s10 || {},
                  _n5 = _ref14.language;

              this.captions.currentTrackNode = _s10, Re.updateSetting.call(this, "captions"), t || (this.captions.language = _n5, this.storage.set({
                language: _n5
              })), this.isVimeo && this.embed.enableTextTrack(_n5), ve.call(this, this.media, "languagechange");
            }

            Ue.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && Ue.updateCues.call(this);
          } else this.debug.warn("Track not found", e);
        } else this.debug.warn("Invalid caption argument", e);
      } else Ue.toggle.call(this, !1, t);
    },
    setLanguage: function setLanguage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      if (!_(e)) return void this.debug.warn("Invalid language argument", e);
      var i = e.toLowerCase();
      this.captions.language = i;
      var s = Ue.getTracks.call(this),
          n = Ue.findTrack.call(this, [i]);
      Ue.set.call(this, s.indexOf(n), t);
    },
    getTracks: function getTracks() {
      var _this19 = this;

      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      return Array.from((this.media || {}).textTracks || []).filter(function (t) {
        return !_this19.isHTML5 || e || _this19.captions.meta.has(t);
      }).filter(function (e) {
        return ["captions", "subtitles"].includes(e.kind);
      });
    },
    findTrack: function findTrack(e) {
      var _this20 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;

      var i = Ue.getTracks.call(this),
          s = function s(e) {
        return Number((_this20.captions.meta.get(e) || {}).default);
      },
          n = Array.from(i).sort(function (e, t) {
        return s(t) - s(e);
      });

      var a;
      return e.every(function (e) {
        return a = n.find(function (t) {
          return t.language === e;
        }), !a;
      }), a || (t ? n[0] : void 0);
    },
    getCurrentTrack: function getCurrentTrack() {
      return Ue.getTracks.call(this)[this.currentTrack];
    },
    getLabel: function getLabel(e) {
      var t = e;
      return !V(t) && me.textTracks && this.captions.toggled && (t = Ue.getCurrentTrack.call(this)), V(t) ? W(t.label) ? W(t.language) ? Oe.get("enabled", this.config) : e.language.toUpperCase() : t.label : Oe.get("disabled", this.config);
    },
    updateCues: function updateCues(e) {
      if (!this.supported.ui) return;
      if (!H(this.elements.captions)) return void this.debug.warn("No captions element to render to");
      if (!I(e) && !Array.isArray(e)) return void this.debug.warn("updateCues: Invalid input", e);
      var t = e;

      if (!t) {
        var _e21 = Ue.getCurrentTrack.call(this);

        t = Array.from((_e21 || {}).activeCues || []).map(function (e) {
          return e.getCueAsHTML();
        }).map($e);
      }

      var i = t.map(function (e) {
        return e.trim();
      }).join("\n");

      if (i !== this.elements.captions.innerHTML) {
        ie(this.elements.captions);

        var _e22 = Z("span", ne(this.config.selectors.caption));

        _e22.innerHTML = i, this.elements.captions.appendChild(_e22), ve.call(this, this.media, "cuechange");
      }
    }
  },
      We = {
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
    iconUrl: "https://cdn.plyr.io/3.6.5/plyr.svg",
    blankVideo: "https://cdn.plyr.io/static/blank.mp4",
    quality: {
      default: 576,
      options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      forced: !1,
      onChange: null
    },
    loop: {
      active: !1
    },
    speed: {
      selected: 1,
      options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
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
      pip: "PIP",
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
        api: "https://vimeo.com/api/oembed.json?url={0}"
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
      transparent: !1,
      customControls: !0,
      referrerPolicy: null,
      premium: !1
    },
    youtube: {
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      customControls: !0,
      noCookie: !1
    }
  },
      ze = "picture-in-picture",
      Ke = "inline",
      Ye = {
    html5: "html5",
    youtube: "youtube",
    vimeo: "vimeo"
  },
      Qe = "audio",
      Xe = "video";

  var Je = function Je() {};

  var Ge = /*#__PURE__*/function () {
    function Ge() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;

      _classCallCheck(this, Ge);

      this.enabled = window.console && e, this.enabled && this.log("Debugging enabled");
    }

    _createClass(Ge, [{
      key: "log",
      get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.log, console) : Je;
      }
    }, {
      key: "warn",
      get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.warn, console) : Je;
      }
    }, {
      key: "error",
      get: function get() {
        return this.enabled ? Function.prototype.bind.call(console.error, console) : Je;
      }
    }]);

    return Ge;
  }();

  var Ze = /*#__PURE__*/function () {
    function Ze(t) {
      var _this21 = this;

      _classCallCheck(this, Ze);

      e(this, "onChange", function () {
        if (!_this21.enabled) return;
        var e = _this21.player.elements.buttons.fullscreen;
        H(e) && (e.pressed = _this21.active);
        var t = _this21.target === _this21.player.media ? _this21.target : _this21.player.elements.container;
        ve.call(_this21.player, t, _this21.active ? "enterfullscreen" : "exitfullscreen", !0);
      }), e(this, "toggleFallback", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;

        if (e ? _this21.scrollPosition = {
          x: window.scrollX || 0,
          y: window.scrollY || 0
        } : window.scrollTo(_this21.scrollPosition.x, _this21.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", le(_this21.target, _this21.player.config.classNames.fullscreen.fallback, e), Y.isIos) {
          var _t12 = document.head.querySelector('meta[name="viewport"]');

          var _i10 = "viewport-fit=cover";
          _t12 || (_t12 = document.createElement("meta"), _t12.setAttribute("name", "viewport"));

          var _s11 = _(_t12.content) && _t12.content.includes(_i10);

          e ? (_this21.cleanupViewport = !_s11, _s11 || (_t12.content += ",".concat(_i10))) : _this21.cleanupViewport && (_t12.content = _t12.content.split(",").filter(function (e) {
            return e.trim() !== _i10;
          }).join(","));
        }

        _this21.onChange();
      }), e(this, "trapFocus", function (e) {
        if (Y.isIos || !_this21.active || "Tab" !== e.key || 9 !== e.keyCode) return;

        var t = document.activeElement,
            i = ce.call(_this21.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
            _i11 = _slicedToArray(i, 1),
            s = _i11[0],
            n = i[i.length - 1];

        t !== n || e.shiftKey ? t === s && e.shiftKey && (n.focus(), e.preventDefault()) : (s.focus(), e.preventDefault());
      }), e(this, "update", function () {
        if (_this21.enabled) {
          var _e23;

          _e23 = _this21.forceFallback ? "Fallback (forced)" : Ze.native ? "Native" : "Fallback", _this21.player.debug.log("".concat(_e23, " fullscreen enabled"));
        } else _this21.player.debug.log("Fullscreen not supported and fallback disabled");

        le(_this21.player.elements.container, _this21.player.config.classNames.fullscreen.enabled, _this21.enabled);
      }), e(this, "enter", function () {
        _this21.enabled && (Y.isIos && _this21.player.config.fullscreen.iosNative ? _this21.player.isVimeo ? _this21.player.embed.requestFullscreen() : _this21.target.webkitEnterFullscreen() : !Ze.native || _this21.forceFallback ? _this21.toggleFallback(!0) : _this21.prefix ? W(_this21.prefix) || _this21.target["".concat(_this21.prefix, "Request").concat(_this21.property)]() : _this21.target.requestFullscreen({
          navigationUI: "hide"
        }));
      }), e(this, "exit", function () {
        if (_this21.enabled) if (Y.isIos && _this21.player.config.fullscreen.iosNative) _this21.target.webkitExitFullscreen(), ke(_this21.player.play());else if (!Ze.native || _this21.forceFallback) _this21.toggleFallback(!1);else if (_this21.prefix) {
          if (!W(_this21.prefix)) {
            var _e24 = "moz" === _this21.prefix ? "Cancel" : "Exit";

            document["".concat(_this21.prefix).concat(_e24).concat(_this21.property)]();
          }
        } else (document.cancelFullScreen || document.exitFullscreen).call(document);
      }), e(this, "toggle", function () {
        _this21.active ? _this21.exit() : _this21.enter();
      }), this.player = t, this.prefix = Ze.prefix, this.property = Ze.property, this.scrollPosition = {
        x: 0,
        y: 0
      }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function (e, t) {
        var _Element2 = Element,
            i = _Element2.prototype;
        return (i.closest || function () {
          var e = this;

          do {
            if (re.matches(e, t)) return e;
            e = e.parentElement || e.parentNode;
          } while (null !== e && 1 === e.nodeType);

          return null;
        }).call(e, t);
      }(this.player.elements.container, t.config.fullscreen.container), fe.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), function () {
        _this21.onChange();
      }), fe.call(this.player, this.player.elements.container, "dblclick", function (e) {
        H(_this21.player.elements.controls) && _this21.player.elements.controls.contains(e.target) || _this21.player.listeners.proxy(e, _this21.toggle, "fullscreen");
      }), fe.call(this, this.player.elements.container, "keydown", function (e) {
        return _this21.trapFocus(e);
      }), this.update();
    }

    _createClass(Ze, [{
      key: "usingNative",
      get: function get() {
        return Ze.native && !this.forceFallback;
      }
    }, {
      key: "enabled",
      get: function get() {
        return (Ze.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
      }
    }, {
      key: "active",
      get: function get() {
        if (!this.enabled) return !1;
        if (!Ze.native || this.forceFallback) return oe(this.target, this.player.config.classNames.fullscreen.fallback);
        var e = this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement;
        return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target;
      }
    }, {
      key: "target",
      get: function get() {
        return Y.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
      }
    }], [{
      key: "native",
      get: function get() {
        return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
      }
    }, {
      key: "prefix",
      get: function get() {
        if (q(document.exitFullscreen)) return "";
        var e = "";
        return ["webkit", "moz", "ms"].some(function (t) {
          return !(!q(document["".concat(t, "ExitFullscreen")]) && !q(document["".concat(t, "CancelFullScreen")])) && (e = t, !0);
        }), e;
      }
    }, {
      key: "property",
      get: function get() {
        return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
      }
    }]);

    return Ze;
  }();

  function et(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return new Promise(function (i, s) {
      var n = new Image(),
          a = function a() {
        delete n.onload, delete n.onerror, (n.naturalWidth >= t ? i : s)(n);
      };

      Object.assign(n, {
        onload: a,
        onerror: a,
        src: e
      });
    });
  }

  var tt = {
    addStyleHook: function addStyleHook() {
      le(this.elements.container, this.config.selectors.container.replace(".", ""), !0), le(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
    },
    toggleNativeControls: function toggleNativeControls() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
    },
    build: function build() {
      var _this22 = this;

      if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void tt.toggleNativeControls.call(this, !0);
      H(this.elements.controls) || (Re.inject.call(this), this.listeners.controls()), tt.toggleNativeControls.call(this), this.isHTML5 && Ue.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, Re.updateVolume.call(this), Re.timeUpdate.call(this), tt.checkPlaying.call(this), le(this.elements.container, this.config.classNames.pip.supported, me.pip && this.isHTML5 && this.isVideo), le(this.elements.container, this.config.classNames.airplay.supported, me.airplay && this.isHTML5), le(this.elements.container, this.config.classNames.isIos, Y.isIos), le(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(function () {
        ve.call(_this22, _this22.media, "ready");
      }, 0), tt.setTitle.call(this), this.poster && tt.setPoster.call(this, this.poster, !1).catch(function () {}), this.config.duration && Re.durationUpdate.call(this);
    },
    setTitle: function setTitle() {
      var e = Oe.get("play", this.config);

      if (_(this.config.title) && !W(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(function (t) {
        t.setAttribute("aria-label", e);
      }), this.isEmbed) {
        var _e25 = he.call(this, "iframe");

        if (!H(_e25)) return;

        var _t13 = W(this.config.title) ? "video" : this.config.title,
            _i12 = Oe.get("frameTitle", this.config);

        _e25.setAttribute("title", _i12.replace("{title}", _t13));
      }
    },
    togglePoster: function togglePoster(e) {
      le(this.elements.container, this.config.classNames.posterEnabled, e);
    },
    setPoster: function setPoster(e) {
      var _this23 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), Te.call(this).then(function () {
        return et(e);
      }).catch(function (t) {
        throw e === _this23.poster && tt.togglePoster.call(_this23, !1), t;
      }).then(function () {
        if (e !== _this23.poster) throw new Error("setPoster cancelled by later call to setPoster");
      }).then(function () {
        return Object.assign(_this23.elements.poster.style, {
          backgroundImage: "url('".concat(e, "')"),
          backgroundSize: ""
        }), tt.togglePoster.call(_this23, !0), e;
      }));
    },
    checkPlaying: function checkPlaying(e) {
      var _this24 = this;

      le(this.elements.container, this.config.classNames.playing, this.playing), le(this.elements.container, this.config.classNames.paused, this.paused), le(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function (e) {
        Object.assign(e, {
          pressed: _this24.playing
        }), e.setAttribute("aria-label", Oe.get(_this24.playing ? "pause" : "play", _this24.config));
      }), F(e) && "timeupdate" === e.type || tt.toggleControls.call(this);
    },
    checkLoading: function checkLoading(e) {
      var _this25 = this;

      this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function () {
        le(_this25.elements.container, _this25.config.classNames.loading, _this25.loading), tt.toggleControls.call(_this25);
      }, this.loading ? 250 : 0);
    },
    toggleControls: function toggleControls(e) {
      var t = this.elements.controls;

      if (t && this.config.hideControls) {
        var _i13 = this.touch && this.lastSeekTime + 2e3 > Date.now();

        this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || _i13));
      }
    },
    migrateStyles: function migrateStyles() {
      var _this26 = this;

      Object.values(_objectSpread({}, this.media.style)).filter(function (e) {
        return !W(e) && _(e) && e.startsWith("--plyr");
      }).forEach(function (e) {
        _this26.elements.container.style.setProperty(e, _this26.media.style.getPropertyValue(e)), _this26.media.style.removeProperty(e);
      }), W(this.media.style) && this.media.removeAttribute("style");
    }
  };

  var it = /*#__PURE__*/function () {
    function it(t) {
      var _this27 = this;

      _classCallCheck(this, it);

      e(this, "firstTouch", function () {
        var e = _this27.player,
            t = e.elements;
        e.touch = !0, le(t.container, e.config.classNames.isTouch, !0);
      }), e(this, "setTabFocus", function (e) {
        var t = _this27.player,
            i = t.elements;
        if (clearTimeout(_this27.focusTimer), "keydown" === e.type && 9 !== e.which) return;
        "keydown" === e.type && (_this27.lastKeyDown = e.timeStamp);
        var s = e.timeStamp - _this27.lastKeyDown <= 20;
        ("focus" !== e.type || s) && (function () {
          var e = t.config.classNames.tabFocus;
          le(ce.call(t, ".".concat(e)), e, !1);
        }(), "focusout" !== e.type && (_this27.focusTimer = setTimeout(function () {
          var e = document.activeElement;
          i.container.contains(e) && le(document.activeElement, t.config.classNames.tabFocus, !0);
        }, 10)));
      }), e(this, "global", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
        var t = _this27.player;
        t.config.keyboard.global && ge.call(t, window, "keydown keyup", _this27.handleKey, e, !1), ge.call(t, document.body, "click", _this27.toggleMenu, e), ye.call(t, document.body, "touchstart", _this27.firstTouch), ge.call(t, document.body, "keydown focus blur focusout", _this27.setTabFocus, e, !1, !0);
      }), e(this, "container", function () {
        var e = _this27.player,
            t = e.config,
            i = e.elements,
            s = e.timers;
        !t.keyboard.global && t.keyboard.focused && fe.call(e, i.container, "keydown keyup", _this27.handleKey, !1), fe.call(e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function (t) {
          var n = i.controls;
          n && "enterfullscreen" === t.type && (n.pressed = !1, n.hover = !1);
          var a = 0;
          ["touchstart", "touchmove", "mousemove"].includes(t.type) && (tt.toggleControls.call(e, !0), a = e.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout(function () {
            return tt.toggleControls.call(e, !1);
          }, a);
        });

        var n = function n(t) {
          if (!t) return Ee.call(e);
          var s = i.container.getBoundingClientRect(),
              n = s.width,
              a = s.height;
          return Ee.call(e, "".concat(n, ":").concat(a));
        },
            a = function a() {
          clearTimeout(s.resized), s.resized = setTimeout(n, 50);
        };

        fe.call(e, i.container, "enterfullscreen exitfullscreen", function (t) {
          var _e$fullscreen = e.fullscreen,
              s = _e$fullscreen.target,
              l = _e$fullscreen.usingNative;
          if (s !== i.container) return;
          if (!e.isEmbed && W(e.config.ratio)) return;

          var o = "enterfullscreen" === t.type,
              _n6 = n(o),
              r = _n6.padding,
              c = _n6.ratio;

          (function (t, i, s) {
            if (!e.isVimeo || e.config.vimeo.premium) return;

            var n = e.elements.wrapper.firstChild,
                _t14 = _slicedToArray(t, 2),
                a = _t14[1],
                _Se$call = Se.call(e),
                _Se$call2 = _slicedToArray(_Se$call, 2),
                l = _Se$call2[0],
                o = _Se$call2[1];

            n.style.maxWidth = s ? a / o * l + "px" : null, n.style.margin = s ? "0 auto" : null;
          })(c, 0, o), o && setTimeout(function () {
            return K(i.container);
          }, 100), l || (o ? fe.call(e, window, "resize", a) : be.call(e, window, "resize", a));
        });
      }), e(this, "media", function () {
        var e = _this27.player,
            t = e.elements;

        if (fe.call(e, e.media, "timeupdate seeking seeked", function (t) {
          return Re.timeUpdate.call(e, t);
        }), fe.call(e, e.media, "durationchange loadeddata loadedmetadata", function (t) {
          return Re.durationUpdate.call(e, t);
        }), fe.call(e, e.media, "ended", function () {
          e.isHTML5 && e.isVideo && e.config.resetOnEnd && (e.restart(), e.pause());
        }), fe.call(e, e.media, "progress playing seeking seeked", function (t) {
          return Re.updateProgress.call(e, t);
        }), fe.call(e, e.media, "volumechange", function (t) {
          return Re.updateVolume.call(e, t);
        }), fe.call(e, e.media, "playing play pause ended emptied timeupdate", function (t) {
          return tt.checkPlaying.call(e, t);
        }), fe.call(e, e.media, "waiting canplay seeked playing", function (t) {
          return tt.checkLoading.call(e, t);
        }), e.supported.ui && e.config.clickToPlay && !e.isAudio) {
          var _i14 = he.call(e, ".".concat(e.config.classNames.video));

          if (!H(_i14)) return;
          fe.call(e, t.container, "click", function (s) {
            ([t.container, _i14].includes(s.target) || _i14.contains(s.target)) && (e.touch && e.config.hideControls || (e.ended ? (_this27.proxy(s, e.restart, "restart"), _this27.proxy(s, function () {
              ke(e.play());
            }, "play")) : _this27.proxy(s, function () {
              ke(e.togglePlay());
            }, "play")));
          });
        }

        e.supported.ui && e.config.disableContextMenu && fe.call(e, t.wrapper, "contextmenu", function (e) {
          e.preventDefault();
        }, !1), fe.call(e, e.media, "volumechange", function () {
          e.storage.set({
            volume: e.volume,
            muted: e.muted
          });
        }), fe.call(e, e.media, "ratechange", function () {
          Re.updateSetting.call(e, "speed"), e.storage.set({
            speed: e.speed
          });
        }), fe.call(e, e.media, "qualitychange", function (t) {
          Re.updateSetting.call(e, "quality", null, t.detail.quality);
        }), fe.call(e, e.media, "ready qualitychange", function () {
          Re.setDownloadUrl.call(e);
        });
        var i = e.config.events.concat(["keyup", "keydown"]).join(" ");
        fe.call(e, e.media, i, function (i) {
          var _i$detail = i.detail,
              s = _i$detail === void 0 ? {} : _i$detail;
          "error" === i.type && (s = e.media.error), ve.call(e, t.container, i.type, !0, s);
        });
      }), e(this, "proxy", function (e, t, i) {
        var s = _this27.player,
            n = s.config.listeners[i];
        var a = !0;
        q(n) && (a = n.call(s, e)), !1 !== a && q(t) && t.call(s, e);
      }), e(this, "bind", function (e, t, i, s) {
        var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !0;
        var a = _this27.player,
            l = a.config.listeners[s],
            o = q(l);
        fe.call(a, e, t, function (e) {
          return _this27.proxy(e, i, s);
        }, n && !o);
      }), e(this, "controls", function () {
        var e = _this27.player,
            t = e.elements,
            i = Y.isIE ? "change" : "input";

        if (t.buttons.play && Array.from(t.buttons.play).forEach(function (t) {
          _this27.bind(t, "click", function () {
            ke(e.togglePlay());
          }, "play");
        }), _this27.bind(t.buttons.restart, "click", e.restart, "restart"), _this27.bind(t.buttons.rewind, "click", function () {
          e.lastSeekTime = Date.now(), e.rewind();
        }, "rewind"), _this27.bind(t.buttons.fastForward, "click", function () {
          e.lastSeekTime = Date.now(), e.forward();
        }, "fastForward"), _this27.bind(t.buttons.mute, "click", function () {
          e.muted = !e.muted;
        }, "mute"), _this27.bind(t.buttons.captions, "click", function () {
          return e.toggleCaptions();
        }), _this27.bind(t.buttons.download, "click", function () {
          ve.call(e, e.media, "download");
        }, "download"), _this27.bind(t.buttons.fullscreen, "click", function () {
          e.fullscreen.toggle();
        }, "fullscreen"), _this27.bind(t.buttons.pip, "click", function () {
          e.pip = "toggle";
        }, "pip"), _this27.bind(t.buttons.airplay, "click", e.airplay, "airplay"), _this27.bind(t.buttons.settings, "click", function (t) {
          t.stopPropagation(), t.preventDefault(), Re.toggleMenu.call(e, t);
        }, null, !1), _this27.bind(t.buttons.settings, "keyup", function (t) {
          var i = t.which;
          [13, 32].includes(i) && (13 !== i ? (t.preventDefault(), t.stopPropagation(), Re.toggleMenu.call(e, t)) : Re.focusFirstMenuItem.call(e, null, !0));
        }, null, !1), _this27.bind(t.settings.menu, "keydown", function (t) {
          27 === t.which && Re.toggleMenu.call(e, t);
        }), _this27.bind(t.inputs.seek, "mousedown mousemove", function (e) {
          var i = t.progress.getBoundingClientRect(),
              s = 100 / i.width * (e.pageX - i.left);
          e.currentTarget.setAttribute("seek-value", s);
        }), _this27.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function (t) {
          var i = t.currentTarget,
              s = t.keyCode ? t.keyCode : t.which,
              n = "play-on-seeked";
          if (R(t) && 39 !== s && 37 !== s) return;
          e.lastSeekTime = Date.now();
          var a = i.hasAttribute(n),
              l = ["mouseup", "touchend", "keyup"].includes(t.type);
          a && l ? (i.removeAttribute(n), ke(e.play())) : !l && e.playing && (i.setAttribute(n, ""), e.pause());
        }), Y.isIos) {
          var _t15 = ce.call(e, 'input[type="range"]');

          Array.from(_t15).forEach(function (e) {
            return _this27.bind(e, i, function (e) {
              return K(e.target);
            });
          });
        }

        _this27.bind(t.inputs.seek, i, function (t) {
          var i = t.currentTarget;
          var s = i.getAttribute("seek-value");
          W(s) && (s = i.value), i.removeAttribute("seek-value"), e.currentTime = s / i.max * e.duration;
        }, "seek"), _this27.bind(t.progress, "mouseenter mouseleave mousemove", function (t) {
          return Re.updateSeekTooltip.call(e, t);
        }), _this27.bind(t.progress, "mousemove touchmove", function (t) {
          var i = e.previewThumbnails;
          i && i.loaded && i.startMove(t);
        }), _this27.bind(t.progress, "mouseleave touchend click", function () {
          var t = e.previewThumbnails;
          t && t.loaded && t.endMove(!1, !0);
        }), _this27.bind(t.progress, "mousedown touchstart", function (t) {
          var i = e.previewThumbnails;
          i && i.loaded && i.startScrubbing(t);
        }), _this27.bind(t.progress, "mouseup touchend", function (t) {
          var i = e.previewThumbnails;
          i && i.loaded && i.endScrubbing(t);
        }), Y.isWebkit && Array.from(ce.call(e, 'input[type="range"]')).forEach(function (t) {
          _this27.bind(t, "input", function (t) {
            return Re.updateRangeFill.call(e, t.target);
          });
        }), e.config.toggleInvert && !H(t.display.duration) && _this27.bind(t.display.currentTime, "click", function () {
          0 !== e.currentTime && (e.config.invertTime = !e.config.invertTime, Re.timeUpdate.call(e));
        }), _this27.bind(t.inputs.volume, i, function (t) {
          e.volume = t.target.value;
        }, "volume"), _this27.bind(t.controls, "mouseenter mouseleave", function (i) {
          t.controls.hover = !e.touch && "mouseenter" === i.type;
        }), t.fullscreen && Array.from(t.fullscreen.children).filter(function (e) {
          return !e.contains(t.container);
        }).forEach(function (i) {
          _this27.bind(i, "mouseenter mouseleave", function (i) {
            t.controls.hover = !e.touch && "mouseenter" === i.type;
          });
        }), _this27.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", function (e) {
          t.controls.pressed = ["mousedown", "touchstart"].includes(e.type);
        }), _this27.bind(t.controls, "focusin", function () {
          var i = e.config,
              s = e.timers;
          le(t.controls, i.classNames.noTransition, !0), tt.toggleControls.call(e, !0), setTimeout(function () {
            le(t.controls, i.classNames.noTransition, !1);
          }, 0);
          var n = _this27.touch ? 3e3 : 4e3;
          clearTimeout(s.controls), s.controls = setTimeout(function () {
            return tt.toggleControls.call(e, !1);
          }, n);
        }), _this27.bind(t.inputs.volume, "wheel", function (t) {
          var i = t.webkitDirectionInvertedFromDevice,
              _map = [t.deltaX, -t.deltaY].map(function (e) {
            return i ? -e : e;
          }),
              _map2 = _slicedToArray(_map, 2),
              s = _map2[0],
              n = _map2[1],
              a = Math.sign(Math.abs(s) > Math.abs(n) ? s : n);

          e.increaseVolume(a / 50);
          var l = e.media.volume;
          (1 === a && l < 1 || -1 === a && l > 0) && t.preventDefault();
        }, "volume", !1);
      }), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
    }

    _createClass(it, [{
      key: "handleKey",
      value: function handleKey(e) {
        var t = this.player,
            i = t.elements,
            s = e.keyCode ? e.keyCode : e.which,
            n = "keydown" === e.type,
            a = n && s === this.lastKey;
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
        if (!$(s)) return;

        if (n) {
          var _n7 = document.activeElement;

          if (H(_n7)) {
            var _s12 = t.config.selectors.editable,
                _a5 = i.inputs.seek;
            if (_n7 !== _a5 && re(_n7, _s12)) return;
            if (32 === e.which && re(_n7, 'button, [role^="menuitem"]')) return;
          }

          switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(s) && (e.preventDefault(), e.stopPropagation()), s) {
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
              a || (t.currentTime = t.duration / 10 * (s - 48));
              break;

            case 32:
            case 75:
              a || ke(t.togglePlay());
              break;

            case 38:
              t.increaseVolume(.1);
              break;

            case 40:
              t.decreaseVolume(.1);
              break;

            case 77:
              a || (t.muted = !t.muted);
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
              a || t.toggleCaptions();
              break;

            case 76:
              t.loop = !t.loop;
          }

          27 === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s;
        } else this.lastKey = null;
      }
    }, {
      key: "toggleMenu",
      value: function toggleMenu(e) {
        Re.toggleMenu.call(this.player, e);
      }
    }]);

    return it;
  }();

  "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

  var st = function (e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports;
  }(function (e, t) {
    e.exports = function () {
      var e = function e() {},
          t = {},
          i = {},
          s = {};

      function n(e, t) {
        e = e.push ? e : [e];
        var n,
            a,
            l,
            o = [],
            r = e.length,
            c = r;

        for (n = function n(e, i) {
          i.length && o.push(e), --c || t(o);
        }; r--;) {
          a = e[r], (l = i[a]) ? n(a, l) : (s[a] = s[a] || []).push(n);
        }
      }

      function a(e, t) {
        if (e) {
          var n = s[e];
          if (i[e] = t, n) for (; n.length;) {
            n[0](e, t), n.splice(0, 1);
          }
        }
      }

      function l(t, i) {
        t.call && (t = {
          success: t
        }), i.length ? (t.error || e)(i) : (t.success || e)(t);
      }

      function o(t, i, s, n) {
        var a,
            l,
            r = document,
            c = s.async,
            h = (s.numRetries || 0) + 1,
            u = s.before || e,
            d = t.replace(/[\?|#].*$/, ""),
            m = t.replace(/^(css|img)!/, "");
        n = n || 0, /(^css!|\.css$)/.test(d) ? ((l = r.createElement("link")).rel = "stylesheet", l.href = m, (a = "hideFocus" in l) && l.relList && (a = 0, l.rel = "preload", l.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d) ? (l = r.createElement("img")).src = m : ((l = r.createElement("script")).src = t, l.async = void 0 === c || c), l.onload = l.onerror = l.onbeforeload = function (e) {
          var r = e.type[0];
          if (a) try {
            l.sheet.cssText.length || (r = "e");
          } catch (e) {
            18 != e.code && (r = "e");
          }

          if ("e" == r) {
            if ((n += 1) < h) return o(t, i, s, n);
          } else if ("preload" == l.rel && "style" == l.as) return l.rel = "stylesheet";

          i(t, r, e.defaultPrevented);
        }, !1 !== u(t, l) && r.head.appendChild(l);
      }

      function r(e, t, i) {
        var s,
            n,
            a = (e = e.push ? e : [e]).length,
            l = a,
            r = [];

        for (s = function s(e, i, _s13) {
          if ("e" == i && r.push(e), "b" == i) {
            if (!_s13) return;
            r.push(e);
          }

          --a || t(r);
        }, n = 0; n < l; n++) {
          o(e[n], s, i);
        }
      }

      function c(e, i, s) {
        var n, o;

        if (i && i.trim && (n = i), o = (n ? s : i) || {}, n) {
          if (n in t) throw "LoadJS";
          t[n] = !0;
        }

        function c(t, i) {
          r(e, function (e) {
            l(o, e), t && l({
              success: t,
              error: i
            }, e), a(n, e);
          }, o);
        }

        if (o.returnPromise) return new Promise(c);
        c();
      }

      return c.ready = function (e, t) {
        return n(e, function (e) {
          l(t, e);
        }), c;
      }, c.done = function (e) {
        a(e, []);
      }, c.reset = function () {
        t = {}, i = {}, s = {};
      }, c.isDefined = function (e) {
        return e in t;
      }, c;
    }();
  });

  function nt(e) {
    return new Promise(function (t, i) {
      st(e, {
        success: t,
        error: i
      });
    });
  }

  function at(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"));
  }

  var lt = {
    setup: function setup() {
      var e = this;
      le(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, Ee.call(e), L(window.Vimeo) ? lt.ready.call(e) : nt(e.config.urls.vimeo.sdk).then(function () {
        lt.ready.call(e);
      }).catch(function (t) {
        e.debug.warn("Vimeo SDK (player.js) failed to load", t);
      });
    },
    ready: function ready() {
      var _this28 = this;

      var e = this,
          t = e.config.vimeo,
          i = t.premium,
          s = t.referrerPolicy,
          n = _objectWithoutProperties(t, _excluded);

      i && Object.assign(n, {
        controls: !1,
        sidedock: !1
      });
      var a = Be(_objectSpread({
        loop: e.config.loop.active,
        autoplay: e.autoplay,
        muted: e.muted,
        gesture: "media",
        playsinline: !this.config.fullscreen.iosNative
      }, n));
      var l = e.media.getAttribute("src");
      W(l) && (l = e.media.getAttribute(e.config.attributes.embed.id));
      var o = W(r = l) ? null : $(Number(r)) ? r : r.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : r;
      var r;
      var c = Z("iframe"),
          h = xe(e.config.urls.vimeo.iframe, o, a);
      if (c.setAttribute("src", h), c.setAttribute("allowfullscreen", ""), c.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), W(s) || c.setAttribute("referrerPolicy", s), i || !t.customControls) c.setAttribute("data-poster", e.poster), e.media = se(c, e.media);else {
        var _t16 = Z("div", {
          class: e.config.classNames.embedContainer,
          "data-poster": e.poster
        });

        _t16.appendChild(c), e.media = se(_t16, e.media);
      }
      t.customControls || je(xe(e.config.urls.vimeo.api, h)).then(function (t) {
        !W(t) && t.thumbnail_url && tt.setPoster.call(e, t.thumbnail_url).catch(function () {});
      }), e.embed = new window.Vimeo.Player(c, {
        autopause: e.config.autopause,
        muted: e.muted
      }), e.media.paused = !0, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = function () {
        return at.call(e, !0), e.embed.play();
      }, e.media.pause = function () {
        return at.call(e, !1), e.embed.pause();
      }, e.media.stop = function () {
        e.pause(), e.currentTime = 0;
      };
      var u = e.media.currentTime;
      Object.defineProperty(e.media, "currentTime", {
        get: function get() {
          return u;
        },
        set: function set(t) {
          var i = e.embed,
              s = e.media,
              n = e.paused,
              a = e.volume,
              l = n && !i.hasPlayed;
          s.seeking = !0, ve.call(e, s, "seeking"), Promise.resolve(l && i.setVolume(0)).then(function () {
            return i.setCurrentTime(t);
          }).then(function () {
            return l && i.pause();
          }).then(function () {
            return l && i.setVolume(a);
          }).catch(function () {});
        }
      });
      var d = e.config.speed.selected;
      Object.defineProperty(e.media, "playbackRate", {
        get: function get() {
          return d;
        },
        set: function set(t) {
          e.embed.setPlaybackRate(t).then(function () {
            d = t, ve.call(e, e.media, "ratechange");
          }).catch(function () {
            e.options.speed = [1];
          });
        }
      });
      var m = e.config.volume;
      Object.defineProperty(e.media, "volume", {
        get: function get() {
          return m;
        },
        set: function set(t) {
          e.embed.setVolume(t).then(function () {
            m = t, ve.call(e, e.media, "volumechange");
          });
        }
      });
      var p = e.config.muted;
      Object.defineProperty(e.media, "muted", {
        get: function get() {
          return p;
        },
        set: function set(t) {
          var i = !!O(t) && t;
          e.embed.setVolume(i ? 0 : e.config.volume).then(function () {
            p = i, ve.call(e, e.media, "volumechange");
          });
        }
      });
      var g,
          f = e.config.loop;
      Object.defineProperty(e.media, "loop", {
        get: function get() {
          return f;
        },
        set: function set(t) {
          var i = O(t) ? t : e.config.loop.active;
          e.embed.setLoop(i).then(function () {
            f = i;
          });
        }
      }), e.embed.getVideoUrl().then(function (t) {
        g = t, Re.setDownloadUrl.call(e);
      }).catch(function (e) {
        _this28.debug.warn(e);
      }), Object.defineProperty(e.media, "currentSrc", {
        get: function get() {
          return g;
        }
      }), Object.defineProperty(e.media, "ended", {
        get: function get() {
          return e.currentTime === e.duration;
        }
      }), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then(function (t) {
        var _t17 = _slicedToArray(t, 2),
            i = _t17[0],
            s = _t17[1];

        e.embed.ratio = [i, s], Ee.call(_this28);
      }), e.embed.setAutopause(e.config.autopause).then(function (t) {
        e.config.autopause = t;
      }), e.embed.getVideoTitle().then(function (t) {
        e.config.title = t, tt.setTitle.call(_this28);
      }), e.embed.getCurrentTime().then(function (t) {
        u = t, ve.call(e, e.media, "timeupdate");
      }), e.embed.getDuration().then(function (t) {
        e.media.duration = t, ve.call(e, e.media, "durationchange");
      }), e.embed.getTextTracks().then(function (t) {
        e.media.textTracks = t, Ue.setup.call(e);
      }), e.embed.on("cuechange", function (_ref15) {
        var _ref15$cues = _ref15.cues,
            t = _ref15$cues === void 0 ? [] : _ref15$cues;
        var i = t.map(function (e) {
          return function (e) {
            var t = document.createDocumentFragment(),
                i = document.createElement("div");
            return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
          }(e.text);
        });
        Ue.updateCues.call(e, i);
      }), e.embed.on("loaded", function () {
        if (e.embed.getPaused().then(function (t) {
          at.call(e, !t), t || ve.call(e, e.media, "playing");
        }), H(e.embed.element) && e.supported.ui) {
          e.embed.element.setAttribute("tabindex", -1);
        }
      }), e.embed.on("bufferstart", function () {
        ve.call(e, e.media, "waiting");
      }), e.embed.on("bufferend", function () {
        ve.call(e, e.media, "playing");
      }), e.embed.on("play", function () {
        at.call(e, !0), ve.call(e, e.media, "playing");
      }), e.embed.on("pause", function () {
        at.call(e, !1);
      }), e.embed.on("timeupdate", function (t) {
        e.media.seeking = !1, u = t.seconds, ve.call(e, e.media, "timeupdate");
      }), e.embed.on("progress", function (t) {
        e.media.buffered = t.percent, ve.call(e, e.media, "progress"), 1 === parseInt(t.percent, 10) && ve.call(e, e.media, "canplaythrough"), e.embed.getDuration().then(function (t) {
          t !== e.media.duration && (e.media.duration = t, ve.call(e, e.media, "durationchange"));
        });
      }), e.embed.on("seeked", function () {
        e.media.seeking = !1, ve.call(e, e.media, "seeked");
      }), e.embed.on("ended", function () {
        e.media.paused = !0, ve.call(e, e.media, "ended");
      }), e.embed.on("error", function (t) {
        e.media.error = t, ve.call(e, e.media, "error");
      }), t.customControls && setTimeout(function () {
        return tt.build.call(e);
      }, 0);
    }
  };

  function ot(e) {
    e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"));
  }

  function rt(e) {
    return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
  }

  var ct = {
    setup: function setup() {
      var _this29 = this;

      if (le(this.elements.wrapper, this.config.classNames.embed, !0), L(window.YT) && q(window.YT.Player)) ct.ready.call(this);else {
        var _e26 = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
          q(_e26) && _e26(), ct.ready.call(_this29);
        }, nt(this.config.urls.youtube.sdk).catch(function (e) {
          _this29.debug.warn("YouTube API failed to load", e);
        });
      }
    },
    getTitle: function getTitle(e) {
      var _this30 = this;

      je(xe(this.config.urls.youtube.api, e)).then(function (e) {
        if (L(e)) {
          var _t18 = e.title,
              _i15 = e.height,
              _s14 = e.width;
          _this30.config.title = _t18, tt.setTitle.call(_this30), _this30.embed.ratio = [_s14, _i15];
        }

        Ee.call(_this30);
      }).catch(function () {
        Ee.call(_this30);
      });
    },
    ready: function ready() {
      var e = this,
          t = e.config.youtube,
          i = e.media && e.media.getAttribute("id");
      if (!W(i) && i.startsWith("youtube-")) return;
      var s = e.media.getAttribute("src");
      W(s) && (s = e.media.getAttribute(this.config.attributes.embed.id));
      var n = W(a = s) ? null : a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : a;
      var a;
      var l = Z("div", {
        id: "".concat(e.provider, "-").concat(Math.floor(1e4 * Math.random())),
        "data-poster": t.customControls ? e.poster : void 0
      });

      if (e.media = se(l, e.media), t.customControls) {
        var _t19 = function _t19(e) {
          return "https://i.ytimg.com/vi/".concat(n, "/").concat(e, "default.jpg");
        };

        et(_t19("maxres"), 121).catch(function () {
          return et(_t19("sd"), 121);
        }).catch(function () {
          return et(_t19("hq"));
        }).then(function (t) {
          return tt.setPoster.call(e, t.src);
        }).then(function (t) {
          t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
        }).catch(function () {});
      }

      e.embed = new window.YT.Player(e.media, {
        videoId: n,
        host: rt(t),
        playerVars: X({}, {
          autoplay: e.config.autoplay ? 1 : 0,
          hl: e.config.hl,
          controls: e.supported.ui && t.customControls ? 0 : 1,
          disablekb: 1,
          playsinline: e.config.fullscreen.iosNative ? 0 : 1,
          cc_load_policy: e.captions.active ? 1 : 0,
          cc_lang_pref: e.config.captions.language,
          widget_referrer: window ? window.location.href : null
        }, t),
        events: {
          onError: function onError(t) {
            if (!e.media.error) {
              var _i16 = t.data,
                  _s15 = {
                2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                101: "The owner of the requested video does not allow it to be played in embedded players.",
                150: "The owner of the requested video does not allow it to be played in embedded players."
              }[_i16] || "An unknown error occured";

              e.media.error = {
                code: _i16,
                message: _s15
              }, ve.call(e, e.media, "error");
            }
          },
          onPlaybackRateChange: function onPlaybackRateChange(t) {
            var i = t.target;
            e.media.playbackRate = i.getPlaybackRate(), ve.call(e, e.media, "ratechange");
          },
          onReady: function onReady(i) {
            if (q(e.media.play)) return;
            var s = i.target;
            ct.getTitle.call(e, n), e.media.play = function () {
              ot.call(e, !0), s.playVideo();
            }, e.media.pause = function () {
              ot.call(e, !1), s.pauseVideo();
            }, e.media.stop = function () {
              s.stopVideo();
            }, e.media.duration = s.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
              get: function get() {
                return Number(s.getCurrentTime());
              },
              set: function set(t) {
                e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, ve.call(e, e.media, "seeking"), s.seekTo(t);
              }
            }), Object.defineProperty(e.media, "playbackRate", {
              get: function get() {
                return s.getPlaybackRate();
              },
              set: function set(e) {
                s.setPlaybackRate(e);
              }
            });
            var a = e.config.volume;
            Object.defineProperty(e.media, "volume", {
              get: function get() {
                return a;
              },
              set: function set(t) {
                a = t, s.setVolume(100 * a), ve.call(e, e.media, "volumechange");
              }
            });
            var l = e.config.muted;
            Object.defineProperty(e.media, "muted", {
              get: function get() {
                return l;
              },
              set: function set(t) {
                var i = O(t) ? t : l;
                l = i, s[i ? "mute" : "unMute"](), s.setVolume(100 * a), ve.call(e, e.media, "volumechange");
              }
            }), Object.defineProperty(e.media, "currentSrc", {
              get: function get() {
                return s.getVideoUrl();
              }
            }), Object.defineProperty(e.media, "ended", {
              get: function get() {
                return e.currentTime === e.duration;
              }
            });
            var o = s.getAvailablePlaybackRates();
            e.options.speed = o.filter(function (t) {
              return e.config.speed.options.includes(t);
            }), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), ve.call(e, e.media, "timeupdate"), ve.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function () {
              e.media.buffered = s.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && ve.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), ve.call(e, e.media, "canplaythrough"));
            }, 200), t.customControls && setTimeout(function () {
              return tt.build.call(e);
            }, 50);
          },
          onStateChange: function onStateChange(i) {
            var s = i.target;
            clearInterval(e.timers.playing);

            switch (e.media.seeking && [1, 2].includes(i.data) && (e.media.seeking = !1, ve.call(e, e.media, "seeked")), i.data) {
              case -1:
                ve.call(e, e.media, "timeupdate"), e.media.buffered = s.getVideoLoadedFraction(), ve.call(e, e.media, "progress");
                break;

              case 0:
                ot.call(e, !1), e.media.loop ? (s.stopVideo(), s.playVideo()) : ve.call(e, e.media, "ended");
                break;

              case 1:
                t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (ot.call(e, !0), ve.call(e, e.media, "playing"), e.timers.playing = setInterval(function () {
                  ve.call(e, e.media, "timeupdate");
                }, 50), e.media.duration !== s.getDuration() && (e.media.duration = s.getDuration(), ve.call(e, e.media, "durationchange")));
                break;

              case 2:
                e.muted || e.embed.unMute(), ot.call(e, !1);
                break;

              case 3:
                ve.call(e, e.media, "waiting");
            }

            ve.call(e, e.elements.container, "statechange", !1, {
              code: i.data
            });
          }
        }
      });
    }
  },
      ht = {
    setup: function setup() {
      this.media ? (le(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), le(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && le(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = Z("div", {
        class: this.config.classNames.video
      }), J(this.media, this.elements.wrapper), this.elements.poster = Z("div", {
        class: this.config.classNames.poster
      }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? Pe.setup.call(this) : this.isYouTube ? ct.setup.call(this) : this.isVimeo && lt.setup.call(this)) : this.debug.warn("No media element found!");
    }
  };

  var ut = /*#__PURE__*/function () {
    function ut(t) {
      var _this31 = this;

      _classCallCheck(this, ut);

      e(this, "load", function () {
        _this31.enabled && (L(window.google) && L(window.google.ima) ? _this31.ready() : nt(_this31.player.config.urls.googleIMA.sdk).then(function () {
          _this31.ready();
        }).catch(function () {
          _this31.trigger("error", new Error("Google IMA SDK failed to load"));
        }));
      }), e(this, "ready", function () {
        var e;
        _this31.enabled || ((e = _this31).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), _this31.startSafetyTimer(12e3, "ready()"), _this31.managerPromise.then(function () {
          _this31.clearSafetyTimer("onAdsManagerLoaded()");
        }), _this31.listeners(), _this31.setupIMA();
      }), e(this, "setupIMA", function () {
        _this31.elements.container = Z("div", {
          class: _this31.player.config.classNames.ads
        }), _this31.player.elements.container.appendChild(_this31.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(_this31.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(_this31.player.config.playsinline), _this31.elements.displayContainer = new google.ima.AdDisplayContainer(_this31.elements.container, _this31.player.media), _this31.loader = new google.ima.AdsLoader(_this31.elements.displayContainer), _this31.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (e) {
          return _this31.onAdsManagerLoaded(e);
        }, !1), _this31.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
          return _this31.onAdError(e);
        }, !1), _this31.requestAds();
      }), e(this, "requestAds", function () {
        var e = _this31.player.elements.container;

        try {
          var _t20 = new google.ima.AdsRequest();

          _t20.adTagUrl = _this31.tagUrl, _t20.linearAdSlotWidth = e.offsetWidth, _t20.linearAdSlotHeight = e.offsetHeight, _t20.nonLinearAdSlotWidth = e.offsetWidth, _t20.nonLinearAdSlotHeight = e.offsetHeight, _t20.forceNonLinearFullSlot = !1, _t20.setAdWillPlayMuted(!_this31.player.muted), _this31.loader.requestAds(_t20);
        } catch (e) {
          _this31.onAdError(e);
        }
      }), e(this, "pollCountdown", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        if (!e) return clearInterval(_this31.countdownTimer), void _this31.elements.container.removeAttribute("data-badge-text");
        _this31.countdownTimer = setInterval(function () {
          var e = Fe(Math.max(_this31.manager.getRemainingTime(), 0)),
              t = "".concat(Oe.get("advertisement", _this31.player.config), " - ").concat(e);

          _this31.elements.container.setAttribute("data-badge-text", t);
        }, 100);
      }), e(this, "onAdsManagerLoaded", function (e) {
        if (!_this31.enabled) return;
        var t = new google.ima.AdsRenderingSettings();
        t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, _this31.manager = e.getAdsManager(_this31.player, t), _this31.cuePoints = _this31.manager.getCuePoints(), _this31.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
          return _this31.onAdError(e);
        }), Object.keys(google.ima.AdEvent.Type).forEach(function (e) {
          _this31.manager.addEventListener(google.ima.AdEvent.Type[e], function (e) {
            return _this31.onAdEvent(e);
          });
        }), _this31.trigger("loaded");
      }), e(this, "addCuePoints", function () {
        W(_this31.cuePoints) || _this31.cuePoints.forEach(function (e) {
          if (0 !== e && -1 !== e && e < _this31.player.duration) {
            var _t21 = _this31.player.elements.progress;

            if (H(_t21)) {
              var _i17 = 100 / _this31.player.duration * e,
                  _s16 = Z("span", {
                class: _this31.player.config.classNames.cues
              });

              _s16.style.left = "".concat(_i17.toString(), "%"), _t21.appendChild(_s16);
            }
          }
        });
      }), e(this, "onAdEvent", function (e) {
        var t = _this31.player.elements.container,
            i = e.getAd(),
            s = e.getAdData();

        switch (function (e) {
          ve.call(_this31.player, _this31.player.media, "ads".concat(e.replace(/_/g, "").toLowerCase()));
        }(e.type), e.type) {
          case google.ima.AdEvent.Type.LOADED:
            _this31.trigger("loaded"), _this31.pollCountdown(!0), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
            break;

          case google.ima.AdEvent.Type.STARTED:
            _this31.manager.setVolume(_this31.player.volume);

            break;

          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            _this31.player.ended ? _this31.loadAds() : _this31.loader.contentComplete();
            break;

          case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            _this31.pauseContent();

            break;

          case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            _this31.pollCountdown(), _this31.resumeContent();
            break;

          case google.ima.AdEvent.Type.LOG:
            s.adError && _this31.player.debug.warn("Non-fatal ad error: ".concat(s.adError.getMessage()));
        }
      }), e(this, "onAdError", function (e) {
        _this31.cancel(), _this31.player.debug.warn("Ads error", e);
      }), e(this, "listeners", function () {
        var e = _this31.player.elements.container;
        var t;
        _this31.player.on("canplay", function () {
          _this31.addCuePoints();
        }), _this31.player.on("ended", function () {
          _this31.loader.contentComplete();
        }), _this31.player.on("timeupdate", function () {
          t = _this31.player.currentTime;
        }), _this31.player.on("seeked", function () {
          var e = _this31.player.currentTime;
          W(_this31.cuePoints) || _this31.cuePoints.forEach(function (i, s) {
            t < i && i < e && (_this31.manager.discardAdBreak(), _this31.cuePoints.splice(s, 1));
          });
        }), window.addEventListener("resize", function () {
          _this31.manager && _this31.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL);
        });
      }), e(this, "play", function () {
        var e = _this31.player.elements.container;
        _this31.managerPromise || _this31.resumeContent(), _this31.managerPromise.then(function () {
          _this31.manager.setVolume(_this31.player.volume), _this31.elements.displayContainer.initialize();

          try {
            _this31.initialized || (_this31.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), _this31.manager.start()), _this31.initialized = !0;
          } catch (e) {
            _this31.onAdError(e);
          }
        }).catch(function () {});
      }), e(this, "resumeContent", function () {
        _this31.elements.container.style.zIndex = "", _this31.playing = !1, ke(_this31.player.media.play());
      }), e(this, "pauseContent", function () {
        _this31.elements.container.style.zIndex = 3, _this31.playing = !0, _this31.player.media.pause();
      }), e(this, "cancel", function () {
        _this31.initialized && _this31.resumeContent(), _this31.trigger("error"), _this31.loadAds();
      }), e(this, "loadAds", function () {
        _this31.managerPromise.then(function () {
          _this31.manager && _this31.manager.destroy(), _this31.managerPromise = new Promise(function (e) {
            _this31.on("loaded", e), _this31.player.debug.log(_this31.manager);
          }), _this31.initialized = !1, _this31.requestAds();
        }).catch(function () {});
      }), e(this, "trigger", function (e) {
        for (var _len4 = arguments.length, t = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          t[_key4 - 1] = arguments[_key4];
        }

        var i = _this31.events[e];
        j(i) && i.forEach(function (e) {
          q(e) && e.apply(_this31, t);
        });
      }), e(this, "on", function (e, t) {
        return j(_this31.events[e]) || (_this31.events[e] = []), _this31.events[e].push(t), _this31;
      }), e(this, "startSafetyTimer", function (e, t) {
        _this31.player.debug.log("Safety timer invoked from: ".concat(t)), _this31.safetyTimer = setTimeout(function () {
          _this31.cancel(), _this31.clearSafetyTimer("startSafetyTimer()");
        }, e);
      }), e(this, "clearSafetyTimer", function (e) {
        I(_this31.safetyTimer) || (_this31.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(_this31.safetyTimer), _this31.safetyTimer = null);
      }), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
        container: null,
        displayContainer: null
      }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function (e, t) {
        _this31.on("loaded", e), _this31.on("error", t);
      }), this.load();
    }

    _createClass(ut, [{
      key: "enabled",
      get: function get() {
        var e = this.config;
        return this.player.isHTML5 && this.player.isVideo && e.enabled && (!W(e.publisherId) || U(e.tagUrl));
      }
    }, {
      key: "tagUrl",
      get: function get() {
        var e = this.config;
        if (U(e.tagUrl)) return e.tagUrl;
        return "https://go.aniview.com/api/adserver6/vast/?".concat(Be({
          AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
          AV_CHANNELID: "5a0458dc28a06145e4519d21",
          AV_URL: window.location.hostname,
          cb: Date.now(),
          AV_WIDTH: 640,
          AV_HEIGHT: 480,
          AV_CDIM2: e.publisherId
        }));
      }
    }]);

    return ut;
  }();

  var dt = function dt(e) {
    var t = [];
    return e.split(/\r\n\r\n|\n\n|\r\r/).forEach(function (e) {
      var i = {};
      e.split(/\r\n|\n|\r/).forEach(function (e) {
        if ($(i.startTime)) {
          if (!W(e.trim()) && W(i.text)) {
            var _t23, _t24, _t22$1$split, _t22$1$split2;

            var _t22 = e.trim().split("#xywh=");

            (_t23 = _t22, _t24 = _slicedToArray(_t23, 1), i.text = _t24[0], _t23), _t22[1] && (_t22$1$split = _t22[1].split(","), _t22$1$split2 = _slicedToArray(_t22$1$split, 4), i.x = _t22$1$split2[0], i.y = _t22$1$split2[1], i.w = _t22$1$split2[2], i.h = _t22$1$split2[3], _t22$1$split);
          }
        } else {
          var _t25 = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);

          _t25 && (i.startTime = 60 * Number(_t25[1] || 0) * 60 + 60 * Number(_t25[2]) + Number(_t25[3]) + Number("0.".concat(_t25[4])), i.endTime = 60 * Number(_t25[6] || 0) * 60 + 60 * Number(_t25[7]) + Number(_t25[8]) + Number("0.".concat(_t25[9])));
        }
      }), i.text && t.push(i);
    }), t;
  },
      mt = function mt(e, t) {
    var i = {};
    return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
  };

  var pt = /*#__PURE__*/function () {
    function pt(t) {
      var _this32 = this;

      _classCallCheck(this, pt);

      e(this, "load", function () {
        _this32.player.elements.display.seekTooltip && (_this32.player.elements.display.seekTooltip.hidden = _this32.enabled), _this32.enabled && _this32.getThumbnails().then(function () {
          _this32.enabled && (_this32.render(), _this32.determineContainerAutoSizing(), _this32.loaded = !0);
        });
      }), e(this, "getThumbnails", function () {
        return new Promise(function (e) {
          var t = _this32.player.config.previewThumbnails.src;
          if (W(t)) throw new Error("Missing previewThumbnails.src config attribute");

          var i = function i() {
            _this32.thumbnails.sort(function (e, t) {
              return e.height - t.height;
            }), _this32.player.debug.log("Preview thumbnails", _this32.thumbnails), e();
          };

          if (q(t)) t(function (e) {
            _this32.thumbnails = e, i();
          });else {
            var _e27 = (_(t) ? [t] : t).map(function (e) {
              return _this32.getThumbnail(e);
            });

            Promise.all(_e27).then(i);
          }
        });
      }), e(this, "getThumbnail", function (e) {
        return new Promise(function (t) {
          je(e).then(function (i) {
            var s = {
              frames: dt(i),
              height: null,
              urlPrefix: ""
            };
            s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
            var n = new Image();
            n.onload = function () {
              s.height = n.naturalHeight, s.width = n.naturalWidth, _this32.thumbnails.push(s), t();
            }, n.src = s.urlPrefix + s.frames[0].text;
          });
        });
      }), e(this, "startMove", function (e) {
        if (_this32.loaded && F(e) && ["touchmove", "mousemove"].includes(e.type) && _this32.player.media.duration) {
          if ("touchmove" === e.type) _this32.seekTime = _this32.player.media.duration * (_this32.player.elements.inputs.seek.value / 100);else {
            var _t26 = _this32.player.elements.progress.getBoundingClientRect(),
                _i18 = 100 / _t26.width * (e.pageX - _t26.left);

            _this32.seekTime = _this32.player.media.duration * (_i18 / 100), _this32.seekTime < 0 && (_this32.seekTime = 0), _this32.seekTime > _this32.player.media.duration - 1 && (_this32.seekTime = _this32.player.media.duration - 1), _this32.mousePosX = e.pageX, _this32.elements.thumb.time.innerText = Fe(_this32.seekTime);
          }

          _this32.showImageAtCurrentTime();
        }
      }), e(this, "endMove", function () {
        _this32.toggleThumbContainer(!1, !0);
      }), e(this, "startScrubbing", function (e) {
        (I(e.button) || !1 === e.button || 0 === e.button) && (_this32.mouseDown = !0, _this32.player.media.duration && (_this32.toggleScrubbingContainer(!0), _this32.toggleThumbContainer(!1, !0), _this32.showImageAtCurrentTime()));
      }), e(this, "endScrubbing", function () {
        _this32.mouseDown = !1, Math.ceil(_this32.lastTime) === Math.ceil(_this32.player.media.currentTime) ? _this32.toggleScrubbingContainer(!1) : ye.call(_this32.player, _this32.player.media, "timeupdate", function () {
          _this32.mouseDown || _this32.toggleScrubbingContainer(!1);
        });
      }), e(this, "listeners", function () {
        _this32.player.on("play", function () {
          _this32.toggleThumbContainer(!1, !0);
        }), _this32.player.on("seeked", function () {
          _this32.toggleThumbContainer(!1);
        }), _this32.player.on("timeupdate", function () {
          _this32.lastTime = _this32.player.media.currentTime;
        });
      }), e(this, "render", function () {
        _this32.elements.thumb.container = Z("div", {
          class: _this32.player.config.classNames.previewThumbnails.thumbContainer
        }), _this32.elements.thumb.imageContainer = Z("div", {
          class: _this32.player.config.classNames.previewThumbnails.imageContainer
        }), _this32.elements.thumb.container.appendChild(_this32.elements.thumb.imageContainer);
        var e = Z("div", {
          class: _this32.player.config.classNames.previewThumbnails.timeContainer
        });
        _this32.elements.thumb.time = Z("span", {}, "00:00"), e.appendChild(_this32.elements.thumb.time), _this32.elements.thumb.container.appendChild(e), H(_this32.player.elements.progress) && _this32.player.elements.progress.appendChild(_this32.elements.thumb.container), _this32.elements.scrubbing.container = Z("div", {
          class: _this32.player.config.classNames.previewThumbnails.scrubbingContainer
        }), _this32.player.elements.wrapper.appendChild(_this32.elements.scrubbing.container);
      }), e(this, "destroy", function () {
        _this32.elements.thumb.container && _this32.elements.thumb.container.remove(), _this32.elements.scrubbing.container && _this32.elements.scrubbing.container.remove();
      }), e(this, "showImageAtCurrentTime", function () {
        _this32.mouseDown ? _this32.setScrubbingContainerSize() : _this32.setThumbContainerSizeAndPos();

        var e = _this32.thumbnails[0].frames.findIndex(function (e) {
          return _this32.seekTime >= e.startTime && _this32.seekTime <= e.endTime;
        }),
            t = e >= 0;

        var i = 0;
        _this32.mouseDown || _this32.toggleThumbContainer(t), t && (_this32.thumbnails.forEach(function (t, s) {
          _this32.loadedImages.includes(t.frames[e].text) && (i = s);
        }), e !== _this32.showingThumb && (_this32.showingThumb = e, _this32.loadImage(i)));
      }), e(this, "loadImage", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var t = _this32.showingThumb,
            i = _this32.thumbnails[e],
            s = i.urlPrefix,
            n = i.frames[t],
            a = i.frames[t].text,
            l = s + a;
        if (_this32.currentImageElement && _this32.currentImageElement.dataset.filename === a) _this32.showImage(_this32.currentImageElement, n, e, t, a, !1), _this32.currentImageElement.dataset.index = t, _this32.removeOldImages(_this32.currentImageElement);else {
          _this32.loadingImage && _this32.usingSprites && (_this32.loadingImage.onload = null);

          var _i19 = new Image();

          _i19.src = l, _i19.dataset.index = t, _i19.dataset.filename = a, _this32.showingThumbFilename = a, _this32.player.debug.log("Loading image: ".concat(l)), _i19.onload = function () {
            return _this32.showImage(_i19, n, e, t, a, !0);
          }, _this32.loadingImage = _i19, _this32.removeOldImages(_i19);
        }
      }), e(this, "showImage", function (e, t, i, s, n) {
        var a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !0;
        _this32.player.debug.log("Showing thumb: ".concat(n, ". num: ").concat(s, ". qual: ").concat(i, ". newimg: ").concat(a)), _this32.setImageSizeAndOffset(e, t), a && (_this32.currentImageContainer.appendChild(e), _this32.currentImageElement = e, _this32.loadedImages.includes(n) || _this32.loadedImages.push(n)), _this32.preloadNearby(s, !0).then(_this32.preloadNearby(s, !1)).then(_this32.getHigherQuality(i, e, t, n));
      }), e(this, "removeOldImages", function (e) {
        Array.from(_this32.currentImageContainer.children).forEach(function (t) {
          if ("img" !== t.tagName.toLowerCase()) return;
          var i = _this32.usingSprites ? 500 : 1e3;

          if (t.dataset.index !== e.dataset.index && !t.dataset.deleting) {
            t.dataset.deleting = !0;
            var _e28 = _this32.currentImageContainer;
            setTimeout(function () {
              _e28.removeChild(t), _this32.player.debug.log("Removing thumb: ".concat(t.dataset.filename));
            }, i);
          }
        });
      }), e(this, "preloadNearby", function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
        return new Promise(function (i) {
          setTimeout(function () {
            var s = _this32.thumbnails[0].frames[e].text;

            if (_this32.showingThumbFilename === s) {
              var _n8;

              _n8 = t ? _this32.thumbnails[0].frames.slice(e) : _this32.thumbnails[0].frames.slice(0, e).reverse();

              var _a6 = !1;

              _n8.forEach(function (e) {
                var t = e.text;

                if (t !== s && !_this32.loadedImages.includes(t)) {
                  _a6 = !0, _this32.player.debug.log("Preloading thumb filename: ".concat(t));

                  var _e29 = _this32.thumbnails[0].urlPrefix,
                      _s17 = _e29 + t,
                      _n9 = new Image();

                  _n9.src = _s17, _n9.onload = function () {
                    _this32.player.debug.log("Preloaded thumb filename: ".concat(t)), _this32.loadedImages.includes(t) || _this32.loadedImages.push(t), i();
                  };
                }
              }), _a6 || i();
            }
          }, 300);
        });
      }), e(this, "getHigherQuality", function (e, t, i, s) {
        if (e < _this32.thumbnails.length - 1) {
          var _n10 = t.naturalHeight;
          _this32.usingSprites && (_n10 = i.h), _n10 < _this32.thumbContainerHeight && setTimeout(function () {
            _this32.showingThumbFilename === s && (_this32.player.debug.log("Showing higher quality thumb for: ".concat(s)), _this32.loadImage(e + 1));
          }, 300);
        }
      }), e(this, "toggleThumbContainer", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var i = _this32.player.config.classNames.previewThumbnails.thumbContainerShown;
        _this32.elements.thumb.container.classList.toggle(i, e), !e && t && (_this32.showingThumb = null, _this32.showingThumbFilename = null);
      }), e(this, "toggleScrubbingContainer", function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
        var t = _this32.player.config.classNames.previewThumbnails.scrubbingContainerShown;
        _this32.elements.scrubbing.container.classList.toggle(t, e), e || (_this32.showingThumb = null, _this32.showingThumbFilename = null);
      }), e(this, "determineContainerAutoSizing", function () {
        (_this32.elements.thumb.imageContainer.clientHeight > 20 || _this32.elements.thumb.imageContainer.clientWidth > 20) && (_this32.sizeSpecifiedInCSS = !0);
      }), e(this, "setThumbContainerSizeAndPos", function () {
        if (_this32.sizeSpecifiedInCSS) {
          if (_this32.elements.thumb.imageContainer.clientHeight > 20 && _this32.elements.thumb.imageContainer.clientWidth < 20) {
            var _e30 = Math.floor(_this32.elements.thumb.imageContainer.clientHeight * _this32.thumbAspectRatio);

            _this32.elements.thumb.imageContainer.style.width = "".concat(_e30, "px");
          } else if (_this32.elements.thumb.imageContainer.clientHeight < 20 && _this32.elements.thumb.imageContainer.clientWidth > 20) {
            var _e31 = Math.floor(_this32.elements.thumb.imageContainer.clientWidth / _this32.thumbAspectRatio);

            _this32.elements.thumb.imageContainer.style.height = "".concat(_e31, "px");
          }
        } else {
          var _e32 = Math.floor(_this32.thumbContainerHeight * _this32.thumbAspectRatio);

          _this32.elements.thumb.imageContainer.style.height = "".concat(_this32.thumbContainerHeight, "px"), _this32.elements.thumb.imageContainer.style.width = "".concat(_e32, "px");
        }

        _this32.setThumbContainerPos();
      }), e(this, "setThumbContainerPos", function () {
        var e = _this32.player.elements.progress.getBoundingClientRect(),
            t = _this32.player.elements.container.getBoundingClientRect(),
            i = _this32.elements.thumb.container,
            s = t.left - e.left + 10,
            n = t.right - e.left - i.clientWidth - 10;

        var a = _this32.mousePosX - e.left - i.clientWidth / 2;
        a < s && (a = s), a > n && (a = n), i.style.left = "".concat(a, "px");
      }), e(this, "setScrubbingContainerSize", function () {
        var _mt = mt(_this32.thumbAspectRatio, {
          width: _this32.player.media.clientWidth,
          height: _this32.player.media.clientHeight
        }),
            e = _mt.width,
            t = _mt.height;

        _this32.elements.scrubbing.container.style.width = "".concat(e, "px"), _this32.elements.scrubbing.container.style.height = "".concat(t, "px");
      }), e(this, "setImageSizeAndOffset", function (e, t) {
        if (!_this32.usingSprites) return;
        var i = _this32.thumbContainerHeight / t.h;
        e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = "-".concat(t.x * i, "px"), e.style.top = "-".concat(t.y * i, "px");
      }), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
        thumb: {},
        scrubbing: {}
      }, this.load();
    }

    _createClass(pt, [{
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
        if (this.mouseDown) {
          var _mt2 = mt(this.thumbAspectRatio, {
            width: this.player.media.clientWidth,
            height: this.player.media.clientHeight
          }),
              _e33 = _mt2.height;

          return _e33;
        }

        return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
      }
    }, {
      key: "currentImageElement",
      get: function get() {
        return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
      },
      set: function set(e) {
        this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
      }
    }]);

    return pt;
  }();

  var gt = {
    insertElements: function insertElements(e, t) {
      var _this33 = this;

      _(t) ? ee(e, this.media, {
        src: t
      }) : j(t) && t.forEach(function (t) {
        ee(e, _this33.media, t);
      });
    },
    change: function change(e) {
      var _this34 = this;

      Q(e, "sources.length") ? (Pe.cancelRequests.call(this), this.destroy.call(this, function () {
        _this34.options.quality = [], te(_this34.media), _this34.media = null, H(_this34.elements.container) && _this34.elements.container.removeAttribute("class");

        var t = e.sources,
            i = e.type,
            _t27 = _slicedToArray(t, 1),
            _t27$ = _t27[0],
            _t27$$provider = _t27$.provider,
            s = _t27$$provider === void 0 ? Ye.html5 : _t27$$provider,
            n = _t27$.src,
            a = "html5" === s ? i : "div",
            l = "html5" === s ? {} : {
          src: n
        };

        Object.assign(_this34, {
          provider: s,
          type: i,
          supported: me.check(i, s, _this34.config.playsinline),
          media: Z(a, l)
        }), _this34.elements.container.appendChild(_this34.media), O(e.autoplay) && (_this34.config.autoplay = e.autoplay), _this34.isHTML5 && (_this34.config.crossorigin && _this34.media.setAttribute("crossorigin", ""), _this34.config.autoplay && _this34.media.setAttribute("autoplay", ""), W(e.poster) || (_this34.poster = e.poster), _this34.config.loop.active && _this34.media.setAttribute("loop", ""), _this34.config.muted && _this34.media.setAttribute("muted", ""), _this34.config.playsinline && _this34.media.setAttribute("playsinline", "")), tt.addStyleHook.call(_this34), _this34.isHTML5 && gt.insertElements.call(_this34, "source", t), _this34.config.title = e.title, ht.setup.call(_this34), _this34.isHTML5 && Object.keys(e).includes("tracks") && gt.insertElements.call(_this34, "track", e.tracks), (_this34.isHTML5 || _this34.isEmbed && !_this34.supported.ui) && tt.build.call(_this34), _this34.isHTML5 && _this34.media.load(), W(e.previewThumbnails) || (Object.assign(_this34.config.previewThumbnails, e.previewThumbnails), _this34.previewThumbnails && _this34.previewThumbnails.loaded && (_this34.previewThumbnails.destroy(), _this34.previewThumbnails = null), _this34.config.previewThumbnails.enabled && (_this34.previewThumbnails = new pt(_this34))), _this34.fullscreen.update();
      }, !0)) : this.debug.warn("Invalid source format");
    }
  };

  var ft = /*#__PURE__*/function () {
    function ft(t, i) {
      var _this35 = this;

      _classCallCheck(this, ft);

      if (e(this, "play", function () {
        return q(_this35.media.play) ? (_this35.ads && _this35.ads.enabled && _this35.ads.managerPromise.then(function () {
          return _this35.ads.play();
        }).catch(function () {
          return ke(_this35.media.play());
        }), _this35.media.play()) : null;
      }), e(this, "pause", function () {
        return _this35.playing && q(_this35.media.pause) ? _this35.media.pause() : null;
      }), e(this, "togglePlay", function (e) {
        return (O(e) ? e : !_this35.playing) ? _this35.play() : _this35.pause();
      }), e(this, "stop", function () {
        _this35.isHTML5 ? (_this35.pause(), _this35.restart()) : q(_this35.media.stop) && _this35.media.stop();
      }), e(this, "restart", function () {
        _this35.currentTime = 0;
      }), e(this, "rewind", function (e) {
        _this35.currentTime -= $(e) ? e : _this35.config.seekTime;
      }), e(this, "forward", function (e) {
        _this35.currentTime += $(e) ? e : _this35.config.seekTime;
      }), e(this, "increaseVolume", function (e) {
        var t = _this35.media.muted ? 0 : _this35.volume;
        _this35.volume = t + ($(e) ? e : 0);
      }), e(this, "decreaseVolume", function (e) {
        _this35.increaseVolume(-e);
      }), e(this, "airplay", function () {
        me.airplay && _this35.media.webkitShowPlaybackTargetPicker();
      }), e(this, "toggleControls", function (e) {
        if (_this35.supported.ui && !_this35.isAudio) {
          var _t28 = oe(_this35.elements.container, _this35.config.classNames.hideControls),
              _i20 = void 0 === e ? void 0 : !e,
              _s18 = le(_this35.elements.container, _this35.config.classNames.hideControls, _i20);

          if (_s18 && j(_this35.config.controls) && _this35.config.controls.includes("settings") && !W(_this35.config.settings) && Re.toggleMenu.call(_this35, !1), _s18 !== _t28) {
            var _e34 = _s18 ? "controlshidden" : "controlsshown";

            ve.call(_this35, _this35.media, _e34);
          }

          return !_s18;
        }

        return !1;
      }), e(this, "on", function (e, t) {
        fe.call(_this35, _this35.elements.container, e, t);
      }), e(this, "once", function (e, t) {
        ye.call(_this35, _this35.elements.container, e, t);
      }), e(this, "off", function (e, t) {
        be(_this35.elements.container, e, t);
      }), e(this, "destroy", function (e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        if (!_this35.ready) return;

        var i = function i() {
          document.body.style.overflow = "", _this35.embed = null, t ? (Object.keys(_this35.elements).length && (te(_this35.elements.buttons.play), te(_this35.elements.captions), te(_this35.elements.controls), te(_this35.elements.wrapper), _this35.elements.buttons.play = null, _this35.elements.captions = null, _this35.elements.controls = null, _this35.elements.wrapper = null), q(e) && e()) : (we.call(_this35), Pe.cancelRequests.call(_this35), se(_this35.elements.original, _this35.elements.container), ve.call(_this35, _this35.elements.original, "destroyed", !0), q(e) && e.call(_this35.elements.original), _this35.ready = !1, setTimeout(function () {
            _this35.elements = null, _this35.media = null;
          }, 200));
        };

        _this35.stop(), clearTimeout(_this35.timers.loading), clearTimeout(_this35.timers.controls), clearTimeout(_this35.timers.resized), _this35.isHTML5 ? (tt.toggleNativeControls.call(_this35, !0), i()) : _this35.isYouTube ? (clearInterval(_this35.timers.buffering), clearInterval(_this35.timers.playing), null !== _this35.embed && q(_this35.embed.destroy) && _this35.embed.destroy(), i()) : _this35.isVimeo && (null !== _this35.embed && _this35.embed.unload().then(i), setTimeout(i, 200));
      }), e(this, "supports", function (e) {
        return me.mime.call(_this35, e);
      }), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = me.touch, this.media = t, _(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || D(this.media) || j(this.media)) && (this.media = this.media[0]), this.config = X({}, We, ft.defaults, i || {}, function () {
        try {
          return JSON.parse(_this35.media.getAttribute("data-plyr-config"));
        } catch (e) {
          return {};
        }
      }()), this.elements = {
        container: null,
        fullscreen: null,
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
      }, this.debug = new Ge(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", me), I(this.media) || !H(this.media)) return void this.debug.error("Setup failed: no suitable element passed");
      if (this.media.plyr) return void this.debug.warn("Target already setup");
      if (!this.config.enabled) return void this.debug.error("Setup failed: disabled by config");
      if (!me.check().api) return void this.debug.error("Setup failed: no support");
      var s = this.media.cloneNode(!0);
      s.autoplay = !1, this.elements.original = s;
      var n = this.media.tagName.toLowerCase();
      var a = null,
          l = null;

      switch (n) {
        case "div":
          if (a = this.media.querySelector("iframe"), H(a)) {
            if (l = Ve(a.getAttribute("src")), this.provider = function (e) {
              return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? Ye.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? Ye.vimeo : null;
            }(l.toString()), this.elements.container = this.media, this.media = a, this.elements.container.className = "", l.search.length) {
              var _e35 = ["1", "true"];
              _e35.includes(l.searchParams.get("autoplay")) && (this.config.autoplay = !0), _e35.includes(l.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = _e35.includes(l.searchParams.get("playsinline")), this.config.youtube.hl = l.searchParams.get("hl")) : this.config.playsinline = !0;
            }
          } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);

          if (W(this.provider) || !Object.values(Ye).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
          this.type = Xe;
          break;

        case "video":
        case "audio":
          this.type = n, this.provider = Ye.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
          break;

        default:
          return void this.debug.error("Setup failed: unsupported type");
      }

      this.supported = me.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new it(this), this.storage = new qe(this), this.media.plyr = this, H(this.elements.container) || (this.elements.container = Z("div", {
        tabindex: 0
      }), J(this.media, this.elements.container)), tt.migrateStyles.call(this), tt.addStyleHook.call(this), ht.setup.call(this), this.config.debug && fe.call(this, this.elements.container, this.config.events.join(" "), function (e) {
        _this35.debug.log("event: ".concat(e.type));
      }), this.fullscreen = new Ze(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && tt.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new ut(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", function () {
        return ke(_this35.play());
      }), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new pt(this))) : this.debug.error("Setup failed: no support");
    }

    _createClass(ft, [{
      key: "isHTML5",
      get: function get() {
        return this.provider === Ye.html5;
      }
    }, {
      key: "isEmbed",
      get: function get() {
        return this.isYouTube || this.isVimeo;
      }
    }, {
      key: "isYouTube",
      get: function get() {
        return this.provider === Ye.youtube;
      }
    }, {
      key: "isVimeo",
      get: function get() {
        return this.provider === Ye.vimeo;
      }
    }, {
      key: "isVideo",
      get: function get() {
        return this.type === Xe;
      }
    }, {
      key: "isAudio",
      get: function get() {
        return this.type === Qe;
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
      get: function get() {
        return Number(this.media.currentTime);
      },
      set: function set(e) {
        if (!this.duration) return;
        var t = $(e) && e > 0;
        this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"));
      }
    }, {
      key: "buffered",
      get: function get() {
        var e = this.media.buffered;
        return $(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
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
            i = $(t) && t !== 1 / 0 ? t : 0;
        return e || i;
      }
    }, {
      key: "volume",
      get: function get() {
        return Number(this.media.volume);
      },
      set: function set(e) {
        var _this$config2;

        var t = e;
        _(t) && (t = Number(t)), $(t) || (t = this.storage.get("volume")), $(t) || (_this$config2 = this.config, t = _this$config2.volume, _this$config2), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !W(e) && this.muted && t > 0 && (this.muted = !1);
      }
    }, {
      key: "muted",
      get: function get() {
        return Boolean(this.media.muted);
      },
      set: function set(e) {
        var t = e;
        O(t) || (t = this.storage.get("muted")), O(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
      }
    }, {
      key: "hasAudio",
      get: function get() {
        return !this.isHTML5 || !!this.isAudio || Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
      }
    }, {
      key: "speed",
      get: function get() {
        return Number(this.media.playbackRate);
      },
      set: function set(e) {
        var _this36 = this;

        var t = null;
        $(e) && (t = e), $(t) || (t = this.storage.get("speed")), $(t) || (t = this.config.speed.selected);
        var i = this.minimumSpeed,
            s = this.maximumSpeed;
        t = function () {
          var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
          return Math.min(Math.max(e, t), i);
        }(t, i, s), this.config.speed.selected = t, setTimeout(function () {
          _this36.media.playbackRate = t;
        }, 0);
      }
    }, {
      key: "minimumSpeed",
      get: function get() {
        return this.isYouTube ? Math.min.apply(Math, _toConsumableArray(this.options.speed)) : this.isVimeo ? .5 : .0625;
      }
    }, {
      key: "maximumSpeed",
      get: function get() {
        return this.isYouTube ? Math.max.apply(Math, _toConsumableArray(this.options.speed)) : this.isVimeo ? 2 : 16;
      }
    }, {
      key: "quality",
      get: function get() {
        return this.media.quality;
      },
      set: function set(e) {
        var t = this.config.quality,
            i = this.options.quality;
        if (!i.length) return;
        var s = [!W(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find($),
            n = !0;

        if (!i.includes(s)) {
          var _e36 = function (e, t) {
            return j(e) && e.length ? e.reduce(function (e, i) {
              return Math.abs(i - t) < Math.abs(e - t) ? i : e;
            }) : null;
          }(i, s);

          this.debug.warn("Unsupported quality option: ".concat(s, ", using ").concat(_e36, " instead")), s = _e36, n = !1;
        }

        t.selected = s, this.media.quality = s, n && this.storage.set({
          quality: s
        });
      }
    }, {
      key: "loop",
      get: function get() {
        return Boolean(this.media.loop);
      },
      set: function set(e) {
        var t = O(e) ? e : this.config.loop.active;
        this.config.loop.active = t, this.media.loop = t;
      }
    }, {
      key: "source",
      get: function get() {
        return this.media.currentSrc;
      },
      set: function set(e) {
        gt.change.call(this, e);
      }
    }, {
      key: "download",
      get: function get() {
        var e = this.config.urls.download;
        return U(e) ? e : this.source;
      },
      set: function set(e) {
        U(e) && (this.config.urls.download = e, Re.setDownloadUrl.call(this));
      }
    }, {
      key: "poster",
      get: function get() {
        return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
      },
      set: function set(e) {
        this.isVideo ? tt.setPoster.call(this, e, !1).catch(function () {}) : this.debug.warn("Poster can only be set for video");
      }
    }, {
      key: "ratio",
      get: function get() {
        if (!this.isVideo) return null;
        var e = Ae(Se.call(this));
        return j(e) ? e.join(":") : e;
      },
      set: function set(e) {
        this.isVideo ? _(e) && Ce(e) ? (this.config.ratio = e, Ee.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video");
      }
    }, {
      key: "autoplay",
      get: function get() {
        return Boolean(this.config.autoplay);
      },
      set: function set(e) {
        var t = O(e) ? e : this.config.autoplay;
        this.config.autoplay = t;
      }
    }, {
      key: "toggleCaptions",
      value: function toggleCaptions(e) {
        Ue.toggle.call(this, e, !1);
      }
    }, {
      key: "currentTrack",
      get: function get() {
        var _this$captions2 = this.captions,
            e = _this$captions2.toggled,
            t = _this$captions2.currentTrack;
        return e ? t : -1;
      },
      set: function set(e) {
        Ue.set.call(this, e, !1);
      }
    }, {
      key: "language",
      get: function get() {
        return (Ue.getCurrentTrack.call(this) || {}).language;
      },
      set: function set(e) {
        Ue.setLanguage.call(this, e, !1);
      }
    }, {
      key: "pip",
      get: function get() {
        return me.pip ? W(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === ze : null;
      },
      set: function set(e) {
        if (!me.pip) return;
        var t = O(e) ? e : !this.pip;
        q(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? ze : Ke), q(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
      }
    }], [{
      key: "supported",
      value: function supported(e, t, i) {
        return me.check(e, t, i);
      }
    }, {
      key: "loadSprite",
      value: function loadSprite(e, t) {
        return De(e, t);
      }
    }, {
      key: "setup",
      value: function setup(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var i = null;
        return _(e) ? i = Array.from(document.querySelectorAll(e)) : D(e) ? i = Array.from(e) : j(e) && (i = e.filter(H)), W(i) ? null : i.map(function (e) {
          return new ft(e, t);
        });
      }
    }]);

    return ft;
  }();

  var bt;
  return ft.defaults = (bt = We, JSON.parse(JSON.stringify(bt))), ft;
});
},{}],"ChW0":[function(require,module,exports) {
"use strict";

var _jqueryMin = _interopRequireDefault(require("./jquery.min.js"));

var _anime = _interopRequireDefault(require("./anime.js"));

var _locomotiveScrollMin = _interopRequireDefault(require("./locomotive-scroll.min.js"));

var _smoothScrollbar = _interopRequireDefault(require("./smooth-scrollbar.js"));

var _plyrMin = _interopRequireDefault(require("./plyr.min.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

globalThis.jQuery = _jqueryMin.default;
globalThis.$ = _jqueryMin.default;
globalThis.anime = _anime.default;
globalThis.LocomotiveScroll = _locomotiveScrollMin.default;
globalThis.Scrollbar = _smoothScrollbar.default;
globalThis.Plyr = _plyrMin.default;
},{"./jquery.min.js":"SevE","./anime.js":"UExJ","./locomotive-scroll.min.js":"RzoI","./smooth-scrollbar.js":"tja2","./plyr.min.js":"aKHH"}]},{},["ChW0"], null)