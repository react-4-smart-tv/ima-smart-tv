// Copyright 2011 Google Inc. All Rights Reserved.
(function () {
    var l,
      aa = function (a) {
        var b = 0;
        return function () {
          return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
        };
      },
      ba =
        "function" == typeof Object.defineProperties
          ? Object.defineProperty
          : function (a, b, c) {
              if (a == Array.prototype || a == Object.prototype) return a;
              a[b] = c.value;
              return a;
            },
      ca = function (a) {
        a = [
          "object" == typeof globalThis && globalThis,
          a,
          "object" == typeof window && window,
          "object" == typeof self && self,
          "object" == typeof global && global,
        ];
        for (var b = 0; b < a.length; ++b) {
          var c = a[b];
          if (c && c.Math == Math) return c;
        }
        throw Error("Cannot find global object");
      },
      da = ca(this),
      q = function (a, b) {
        if (b)
          a: {
            var c = da;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
              var e = a[d];
              if (!(e in c)) break a;
              c = c[e];
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d &&
              null != b &&
              ba(c, a, { configurable: !0, writable: !0, value: b });
          }
      };
    q("Symbol", function (a) {
      if (a) return a;
      var b = function (f, g) {
        this.g = f;
        ba(this, "description", { configurable: !0, writable: !0, value: g });
      };
      b.prototype.toString = function () {
        return this.g;
      };
      var c = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
        d = 0,
        e = function (f) {
          if (this instanceof e)
            throw new TypeError("Symbol is not a constructor");
          return new b(c + (f || "") + "_" + d++, f);
        };
      return e;
    });
    q("Symbol.iterator", function (a) {
      if (a) return a;
      a = Symbol("Symbol.iterator");
      for (
        var b =
            "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
              " "
            ),
          c = 0;
        c < b.length;
        c++
      ) {
        var d = da[b[c]];
        "function" === typeof d &&
          "function" != typeof d.prototype[a] &&
          ba(d.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
              return ea(aa(this));
            },
          });
      }
      return a;
    });
    var ea = function (a) {
        a = { next: a };
        a[Symbol.iterator] = function () {
          return this;
        };
        return a;
      },
      fa = function (a) {
        return (a.raw = a);
      },
      t = function (a) {
        var b =
          "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b) return b.call(a);
        if ("number" == typeof a.length) return { next: aa(a) };
        throw Error(String(a) + " is not an iterable or ArrayLike");
      },
      ia = function (a) {
        if (!(a instanceof Array)) {
          a = t(a);
          for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
          a = c;
        }
        return a;
      },
      ma = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      },
      na =
        "function" == typeof Object.assign
          ? Object.assign
          : function (a, b) {
              for (var c = 1; c < arguments.length; c++) {
                var d = arguments[c];
                if (d) for (var e in d) ma(d, e) && (a[e] = d[e]);
              }
              return a;
            };
    q("Object.assign", function (a) {
      return a || na;
    });
    var oa =
        "function" == typeof Object.create
          ? Object.create
          : function (a) {
              var b = function () {};
              b.prototype = a;
              return new b();
            },
      qa = (function () {
        function a() {
          function c() {}
          new c();
          Reflect.construct(c, [], function () {});
          return new c() instanceof c;
        }
        if ("undefined" != typeof Reflect && Reflect.construct) {
          if (a()) return Reflect.construct;
          var b = Reflect.construct;
          return function (c, d, e) {
            c = b(c, d);
            e && Reflect.setPrototypeOf(c, e.prototype);
            return c;
          };
        }
        return function (c, d, e) {
          void 0 === e && (e = c);
          e = oa(e.prototype || Object.prototype);
          return Function.prototype.apply.call(c, e, d) || e;
        };
      })(),
      ra;
    if ("function" == typeof Object.setPrototypeOf) ra = Object.setPrototypeOf;
    else {
      var sa;
      a: {
        var ta = { a: !0 },
          ua = {};
        try {
          ua.__proto__ = ta;
          sa = ua.a;
          break a;
        } catch (a) {}
        sa = !1;
      }
      ra = sa
        ? function (a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a;
          }
        : null;
    }
    var wa = ra,
      v = function (a, b) {
        a.prototype = oa(b.prototype);
        a.prototype.constructor = a;
        if (wa) wa(a, b);
        else
          for (var c in b)
            if ("prototype" != c)
              if (Object.defineProperties) {
                var d = Object.getOwnPropertyDescriptor(b, c);
                d && Object.defineProperty(a, c, d);
              } else a[c] = b[c];
        a.Da = b.prototype;
      },
      xa = function () {
        this.A = !1;
        this.o = null;
        this.h = void 0;
        this.g = 1;
        this.H = this.j = 0;
        this.l = null;
      },
      ya = function (a) {
        if (a.A) throw new TypeError("Generator is already running");
        a.A = !0;
      };
    xa.prototype.B = function (a) {
      this.h = a;
    };
    var za = function (a, b) {
      a.l = { Zd: b, Ff: !0 };
      a.g = a.j || a.H;
    };
    xa.prototype.return = function (a) {
      this.l = { return: a };
      this.g = this.H;
    };
    var Aa = function (a, b, c) {
        a.g = c;
        return { value: b };
      },
      Ba = function (a) {
        a.g = 0;
        a.j = 0;
      },
      Ca = function (a) {
        a.j = 0;
        var b = a.l.Zd;
        a.l = null;
        return b;
      },
      Da = function (a) {
        this.g = new xa();
        this.h = a;
      },
      Ha = function (a, b) {
        ya(a.g);
        var c = a.g.o;
        if (c)
          return Fa(
            a,
            "return" in c
              ? c["return"]
              : function (d) {
                  return { value: d, done: !0 };
                },
            b,
            a.g.return
          );
        a.g.return(b);
        return Ga(a);
      },
      Fa = function (a, b, c, d) {
        try {
          var e = b.call(a.g.o, c);
          if (!(e instanceof Object))
            throw new TypeError("Iterator result " + e + " is not an object");
          if (!e.done) return (a.g.A = !1), e;
          var f = e.value;
        } catch (g) {
          return (a.g.o = null), za(a.g, g), Ga(a);
        }
        a.g.o = null;
        d.call(a.g, f);
        return Ga(a);
      },
      Ga = function (a) {
        for (; a.g.g; )
          try {
            var b = a.h(a.g);
            if (b) return (a.g.A = !1), { value: b.value, done: !1 };
          } catch (c) {
            (a.g.h = void 0), za(a.g, c);
          }
        a.g.A = !1;
        if (a.g.l) {
          b = a.g.l;
          a.g.l = null;
          if (b.Ff) throw b.Zd;
          return { value: b.return, done: !0 };
        }
        return { value: void 0, done: !0 };
      },
      Ia = function (a) {
        this.next = function (b) {
          ya(a.g);
          a.g.o ? (b = Fa(a, a.g.o.next, b, a.g.B)) : (a.g.B(b), (b = Ga(a)));
          return b;
        };
        this.throw = function (b) {
          ya(a.g);
          a.g.o
            ? (b = Fa(a, a.g.o["throw"], b, a.g.B))
            : (za(a.g, b), (b = Ga(a)));
          return b;
        };
        this.return = function (b) {
          return Ha(a, b);
        };
        this[Symbol.iterator] = function () {
          return this;
        };
      },
      Ja = function (a) {
        function b(d) {
          return a.next(d);
        }
        function c(d) {
          return a.throw(d);
        }
        return new Promise(function (d, e) {
          function f(g) {
            g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e);
          }
          f(a.next());
        });
      },
      Ka = function (a) {
        return Ja(new Ia(new Da(a)));
      },
      Ma = function () {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
          b[c - a] = arguments[c];
        return b;
      };
    q("Reflect", function (a) {
      return a ? a : {};
    });
    q("Reflect.construct", function () {
      return qa;
    });
    q("Reflect.setPrototypeOf", function (a) {
      return a
        ? a
        : wa
        ? function (b, c) {
            try {
              return wa(b, c), !0;
            } catch (d) {
              return !1;
            }
          }
        : null;
    });
    q("Promise", function (a) {
      function b() {
        this.g = null;
      }
      function c(g) {
        return g instanceof e
          ? g
          : new e(function (h) {
              h(g);
            });
      }
      if (a) return a;
      b.prototype.h = function (g) {
        if (null == this.g) {
          this.g = [];
          var h = this;
          this.j(function () {
            h.l();
          });
        }
        this.g.push(g);
      };
      var d = da.setTimeout;
      b.prototype.j = function (g) {
        d(g, 0);
      };
      b.prototype.l = function () {
        for (; this.g && this.g.length; ) {
          var g = this.g;
          this.g = [];
          for (var h = 0; h < g.length; ++h) {
            var k = g[h];
            g[h] = null;
            try {
              k();
            } catch (n) {
              this.o(n);
            }
          }
        }
        this.g = null;
      };
      b.prototype.o = function (g) {
        this.j(function () {
          throw g;
        });
      };
      var e = function (g) {
        this.g = 0;
        this.j = void 0;
        this.h = [];
        this.B = !1;
        var h = this.o();
        try {
          g(h.resolve, h.reject);
        } catch (k) {
          h.reject(k);
        }
      };
      e.prototype.o = function () {
        function g(n) {
          return function (m) {
            k || ((k = !0), n.call(h, m));
          };
        }
        var h = this,
          k = !1;
        return { resolve: g(this.G), reject: g(this.l) };
      };
      e.prototype.G = function (g) {
        if (g === this)
          this.l(new TypeError("A Promise cannot resolve to itself"));
        else if (g instanceof e) this.J(g);
        else {
          a: switch (typeof g) {
            case "object":
              var h = null != g;
              break a;
            case "function":
              h = !0;
              break a;
            default:
              h = !1;
          }
          h ? this.F(g) : this.A(g);
        }
      };
      e.prototype.F = function (g) {
        var h = void 0;
        try {
          h = g.then;
        } catch (k) {
          this.l(k);
          return;
        }
        "function" == typeof h ? this.N(h, g) : this.A(g);
      };
      e.prototype.l = function (g) {
        this.H(2, g);
      };
      e.prototype.A = function (g) {
        this.H(1, g);
      };
      e.prototype.H = function (g, h) {
        if (0 != this.g)
          throw Error(
            "Cannot settle(" +
              g +
              ", " +
              h +
              "): Promise already settled in state" +
              this.g
          );
        this.g = g;
        this.j = h;
        2 === this.g && this.I();
        this.K();
      };
      e.prototype.I = function () {
        var g = this;
        d(function () {
          if (g.D()) {
            var h = da.console;
            "undefined" !== typeof h && h.error(g.j);
          }
        }, 1);
      };
      e.prototype.D = function () {
        if (this.B) return !1;
        var g = da.CustomEvent,
          h = da.Event,
          k = da.dispatchEvent;
        if ("undefined" === typeof k) return !0;
        "function" === typeof g
          ? (g = new g("unhandledrejection", { cancelable: !0 }))
          : "function" === typeof h
          ? (g = new h("unhandledrejection", { cancelable: !0 }))
          : ((g = da.document.createEvent("CustomEvent")),
            g.initCustomEvent("unhandledrejection", !1, !0, g));
        g.promise = this;
        g.reason = this.j;
        return k(g);
      };
      e.prototype.K = function () {
        if (null != this.h) {
          for (var g = 0; g < this.h.length; ++g) f.h(this.h[g]);
          this.h = null;
        }
      };
      var f = new b();
      e.prototype.J = function (g) {
        var h = this.o();
        g.fc(h.resolve, h.reject);
      };
      e.prototype.N = function (g, h) {
        var k = this.o();
        try {
          g.call(h, k.resolve, k.reject);
        } catch (n) {
          k.reject(n);
        }
      };
      e.prototype.then = function (g, h) {
        function k(u, r) {
          return "function" == typeof u
            ? function (x) {
                try {
                  n(u(x));
                } catch (B) {
                  m(B);
                }
              }
            : r;
        }
        var n,
          m,
          p = new e(function (u, r) {
            n = u;
            m = r;
          });
        this.fc(k(g, n), k(h, m));
        return p;
      };
      e.prototype.catch = function (g) {
        return this.then(void 0, g);
      };
      e.prototype.fc = function (g, h) {
        function k() {
          switch (n.g) {
            case 1:
              g(n.j);
              break;
            case 2:
              h(n.j);
              break;
            default:
              throw Error("Unexpected state: " + n.g);
          }
        }
        var n = this;
        null == this.h ? f.h(k) : this.h.push(k);
        this.B = !0;
      };
      e.resolve = c;
      e.reject = function (g) {
        return new e(function (h, k) {
          k(g);
        });
      };
      e.race = function (g) {
        return new e(function (h, k) {
          for (var n = t(g), m = n.next(); !m.done; m = n.next())
            c(m.value).fc(h, k);
        });
      };
      e.all = function (g) {
        var h = t(g),
          k = h.next();
        return k.done
          ? c([])
          : new e(function (n, m) {
              function p(x) {
                return function (B) {
                  u[x] = B;
                  r--;
                  0 == r && n(u);
                };
              }
              var u = [],
                r = 0;
              do
                u.push(void 0),
                  r++,
                  c(k.value).fc(p(u.length - 1), m),
                  (k = h.next());
              while (!k.done);
            });
      };
      return e;
    });
    q("Object.setPrototypeOf", function (a) {
      return a || wa;
    });
    q("Array.prototype.find", function (a) {
      return a
        ? a
        : function (b, c) {
            a: {
              var d = this;
              d instanceof String && (d = String(d));
              for (var e = d.length, f = 0; f < e; f++) {
                var g = d[f];
                if (b.call(c, g, f, d)) {
                  b = g;
                  break a;
                }
              }
              b = void 0;
            }
            return b;
          };
    });
    q("WeakMap", function (a) {
      function b() {}
      function c(k) {
        var n = typeof k;
        return ("object" === n && null !== k) || "function" === n;
      }
      function d(k) {
        if (!ma(k, f)) {
          var n = new b();
          ba(k, f, { value: n });
        }
      }
      function e(k) {
        var n = Object[k];
        n &&
          (Object[k] = function (m) {
            if (m instanceof b) return m;
            Object.isExtensible(m) && d(m);
            return n(m);
          });
      }
      if (
        (function () {
          if (!a || !Object.seal) return !1;
          try {
            var k = Object.seal({}),
              n = Object.seal({}),
              m = new a([
                [k, 2],
                [n, 3],
              ]);
            if (2 != m.get(k) || 3 != m.get(n)) return !1;
            m.delete(k);
            m.set(n, 4);
            return !m.has(k) && 4 == m.get(n);
          } catch (p) {
            return !1;
          }
        })()
      )
        return a;
      var f = "$jscomp_hidden_" + Math.random();
      e("freeze");
      e("preventExtensions");
      e("seal");
      var g = 0,
        h = function (k) {
          this.g = (g += Math.random() + 1).toString();
          if (k) {
            k = t(k);
            for (var n; !(n = k.next()).done; )
              (n = n.value), this.set(n[0], n[1]);
          }
        };
      h.prototype.set = function (k, n) {
        if (!c(k)) throw Error("Invalid WeakMap key");
        d(k);
        if (!ma(k, f)) throw Error("WeakMap key fail: " + k);
        k[f][this.g] = n;
        return this;
      };
      h.prototype.get = function (k) {
        return c(k) && ma(k, f) ? k[f][this.g] : void 0;
      };
      h.prototype.has = function (k) {
        return c(k) && ma(k, f) && ma(k[f], this.g);
      };
      h.prototype.delete = function (k) {
        return c(k) && ma(k, f) && ma(k[f], this.g) ? delete k[f][this.g] : !1;
      };
      return h;
    });
    q("Map", function (a) {
      if (
        (function () {
          if (
            !a ||
            "function" != typeof a ||
            !a.prototype.entries ||
            "function" != typeof Object.seal
          )
            return !1;
          try {
            var h = Object.seal({ x: 4 }),
              k = new a(t([[h, "s"]]));
            if (
              "s" != k.get(h) ||
              1 != k.size ||
              k.get({ x: 4 }) ||
              k.set({ x: 4 }, "t") != k ||
              2 != k.size
            )
              return !1;
            var n = k.entries(),
              m = n.next();
            if (m.done || m.value[0] != h || "s" != m.value[1]) return !1;
            m = n.next();
            return m.done ||
              4 != m.value[0].x ||
              "t" != m.value[1] ||
              !n.next().done
              ? !1
              : !0;
          } catch (p) {
            return !1;
          }
        })()
      )
        return a;
      var b = new WeakMap(),
        c = function (h) {
          this[0] = {};
          this[1] = f();
          this.size = 0;
          if (h) {
            h = t(h);
            for (var k; !(k = h.next()).done; )
              (k = k.value), this.set(k[0], k[1]);
          }
        };
      c.prototype.set = function (h, k) {
        h = 0 === h ? 0 : h;
        var n = d(this, h);
        n.list || (n.list = this[0][n.id] = []);
        n.na
          ? (n.na.value = k)
          : ((n.na = {
              next: this[1],
              Ua: this[1].Ua,
              head: this[1],
              key: h,
              value: k,
            }),
            n.list.push(n.na),
            (this[1].Ua.next = n.na),
            (this[1].Ua = n.na),
            this.size++);
        return this;
      };
      c.prototype.delete = function (h) {
        h = d(this, h);
        return h.na && h.list
          ? (h.list.splice(h.index, 1),
            h.list.length || delete this[0][h.id],
            (h.na.Ua.next = h.na.next),
            (h.na.next.Ua = h.na.Ua),
            (h.na.head = null),
            this.size--,
            !0)
          : !1;
      };
      c.prototype.clear = function () {
        this[0] = {};
        this[1] = this[1].Ua = f();
        this.size = 0;
      };
      c.prototype.has = function (h) {
        return !!d(this, h).na;
      };
      c.prototype.get = function (h) {
        return (h = d(this, h).na) && h.value;
      };
      c.prototype.entries = function () {
        return e(this, function (h) {
          return [h.key, h.value];
        });
      };
      c.prototype.keys = function () {
        return e(this, function (h) {
          return h.key;
        });
      };
      c.prototype.values = function () {
        return e(this, function (h) {
          return h.value;
        });
      };
      c.prototype.forEach = function (h, k) {
        for (var n = this.entries(), m; !(m = n.next()).done; )
          (m = m.value), h.call(k, m[1], m[0], this);
      };
      c.prototype[Symbol.iterator] = c.prototype.entries;
      var d = function (h, k) {
          var n = k && typeof k;
          "object" == n || "function" == n
            ? b.has(k)
              ? (n = b.get(k))
              : ((n = "" + ++g), b.set(k, n))
            : (n = "p_" + k);
          var m = h[0][n];
          if (m && ma(h[0], n))
            for (h = 0; h < m.length; h++) {
              var p = m[h];
              if ((k !== k && p.key !== p.key) || k === p.key)
                return { id: n, list: m, index: h, na: p };
            }
          return { id: n, list: m, index: -1, na: void 0 };
        },
        e = function (h, k) {
          var n = h[1];
          return ea(function () {
            if (n) {
              for (; n.head != h[1]; ) n = n.Ua;
              for (; n.next != n.head; )
                return (n = n.next), { done: !1, value: k(n) };
              n = null;
            }
            return { done: !0, value: void 0 };
          });
        },
        f = function () {
          var h = {};
          return (h.Ua = h.next = h.head = h);
        },
        g = 0;
      return c;
    });
    q("Math.trunc", function (a) {
      return a
        ? a
        : function (b) {
            b = Number(b);
            if (isNaN(b) || Infinity === b || -Infinity === b || 0 === b)
              return b;
            var c = Math.floor(Math.abs(b));
            return 0 > b ? -c : c;
          };
    });
    q("Object.values", function (a) {
      return a
        ? a
        : function (b) {
            var c = [],
              d;
            for (d in b) ma(b, d) && c.push(b[d]);
            return c;
          };
    });
    q("Object.is", function (a) {
      return a
        ? a
        : function (b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
          };
    });
    q("Array.prototype.includes", function (a) {
      return a
        ? a
        : function (b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
              var f = d[c];
              if (f === b || Object.is(f, b)) return !0;
            }
            return !1;
          };
    });
    var Na = function (a, b, c) {
      if (null == a)
        throw new TypeError(
          "The 'this' value for String.prototype." +
            c +
            " must not be null or undefined"
        );
      if (b instanceof RegExp)
        throw new TypeError(
          "First argument to String.prototype." +
            c +
            " must not be a regular expression"
        );
      return a + "";
    };
    q("String.prototype.includes", function (a) {
      return a
        ? a
        : function (b, c) {
            return -1 !== Na(this, b, "includes").indexOf(b, c || 0);
          };
    });
    q("Number.MAX_SAFE_INTEGER", function () {
      return 9007199254740991;
    });
    q("Number.isFinite", function (a) {
      return a
        ? a
        : function (b) {
            return "number" !== typeof b
              ? !1
              : !isNaN(b) && Infinity !== b && -Infinity !== b;
          };
    });
    q("Number.isNaN", function (a) {
      return a
        ? a
        : function (b) {
            return "number" === typeof b && isNaN(b);
          };
    });
    var Oa = function (a, b) {
      a instanceof String && (a += "");
      var c = 0,
        d = !1,
        e = {
          next: function () {
            if (!d && c < a.length) {
              var f = c++;
              return { value: b(f, a[f]), done: !1 };
            }
            d = !0;
            return { done: !0, value: void 0 };
          },
        };
      e[Symbol.iterator] = function () {
        return e;
      };
      return e;
    };
    q("Array.prototype.entries", function (a) {
      return a
        ? a
        : function () {
            return Oa(this, function (b, c) {
              return [b, c];
            });
          };
    });
    q("Array.from", function (a) {
      return a
        ? a
        : function (b, c, d) {
            c =
              null != c
                ? c
                : function (h) {
                    return h;
                  };
            var e = [],
              f =
                "undefined" != typeof Symbol &&
                Symbol.iterator &&
                b[Symbol.iterator];
            if ("function" == typeof f) {
              b = f.call(b);
              for (var g = 0; !(f = b.next()).done; )
                e.push(c.call(d, f.value, g++));
            } else
              for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
            return e;
          };
    });
    q("Array.prototype.keys", function (a) {
      return a
        ? a
        : function () {
            return Oa(this, function (b) {
              return b;
            });
          };
    });
    q("Array.prototype.values", function (a) {
      return a
        ? a
        : function () {
            return Oa(this, function (b, c) {
              return c;
            });
          };
    });
    q("Object.entries", function (a) {
      return a
        ? a
        : function (b) {
            var c = [],
              d;
            for (d in b) ma(b, d) && c.push([d, b[d]]);
            return c;
          };
    });
    q("globalThis", function (a) {
      return a || da;
    });
    q("String.prototype.startsWith", function (a) {
      return a
        ? a
        : function (b, c) {
            var d = Na(this, b, "startsWith");
            b += "";
            var e = d.length,
              f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var g = 0; g < f && c < e; ) if (d[c++] != b[g++]) return !1;
            return g >= f;
          };
    });
    q("String.prototype.repeat", function (a) {
      return a
        ? a
        : function (b) {
            var c = Na(this, null, "repeat");
            if (0 > b || 1342177279 < b)
              throw new RangeError("Invalid count value");
            b |= 0;
            for (var d = ""; b; ) if ((b & 1 && (d += c), (b >>>= 1))) c += c;
            return d;
          };
    });
    q("String.prototype.padStart", function (a) {
      return a
        ? a
        : function (b, c) {
            var d = Na(this, null, "padStart");
            b -= d.length;
            c = void 0 !== c ? String(c) : " ";
            return (
              (0 < b && c
                ? c.repeat(Math.ceil(b / c.length)).substring(0, b)
                : "") + d
            );
          };
    });
    q("Math.imul", function (a) {
      return a
        ? a
        : function (b, c) {
            b = Number(b);
            c = Number(c);
            var d = b & 65535,
              e = c & 65535;
            return (
              (d * e +
                (((((b >>> 16) & 65535) * e + d * ((c >>> 16) & 65535)) << 16) >>>
                  0)) |
              0
            );
          };
    });
    q("Object.fromEntries", function (a) {
      return a
        ? a
        : function (b) {
            var c = {};
            if (!(Symbol.iterator in b))
              throw new TypeError("" + b + " is not iterable");
            b = b[Symbol.iterator].call(b);
            for (var d = b.next(); !d.done; d = b.next()) {
              d = d.value;
              if (Object(d) !== d)
                throw new TypeError(
                  "iterable for fromEntries should yield objects"
                );
              c[d[0]] = d[1];
            }
            return c;
          };
    }); /*
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
    var Qa = Qa || {},
      w = this || self,
      y = function (a, b, c) {
        a = a.split(".");
        c = c || w;
        a[0] in c ||
          "undefined" == typeof c.execScript ||
          c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
          a.length || void 0 === b
            ? c[d] && c[d] !== Object.prototype[d]
              ? (c = c[d])
              : (c = c[d] = {})
            : (c[d] = b);
      },
      Ra = function (a, b) {
        a = a.split(".");
        b = b || w;
        for (var c = 0; c < a.length; c++)
          if (((b = b[a[c]]), null == b)) return null;
        return b;
      },
      Sa = function (a) {
        var b = typeof a;
        return "object" != b ? b : a ? (Array.isArray(a) ? "array" : b) : "null";
      },
      Ta = function (a) {
        var b = Sa(a);
        return "array" == b || ("object" == b && "number" == typeof a.length);
      },
      Ua = function (a) {
        var b = typeof a;
        return ("object" == b && null != a) || "function" == b;
      },
      Xa = function (a) {
        return (
          (Object.prototype.hasOwnProperty.call(a, Va) && a[Va]) || (a[Va] = ++Wa)
        );
      },
      Ya = function (a) {
        null !== a && "removeAttribute" in a && a.removeAttribute(Va);
        try {
          delete a[Va];
        } catch (b) {}
      },
      Va = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
      Wa = 0,
      Za = function (a, b, c) {
        return a.call.apply(a.bind, arguments);
      },
      $a = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
          var d = Array.prototype.slice.call(arguments, 2);
          return function () {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e);
          };
        }
        return function () {
          return a.apply(b, arguments);
        };
      },
      ab = function (a, b, c) {
        ab =
          Function.prototype.bind &&
          -1 != Function.prototype.bind.toString().indexOf("native code")
            ? Za
            : $a;
        return ab.apply(null, arguments);
      },
      bb = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
          var d = c.slice();
          d.push.apply(d, arguments);
          return a.apply(this, d);
        };
      },
      cb = function (a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Da = b.prototype;
        a.prototype = new c();
        a.prototype.constructor = a;
        a.Vh = function (d, e, f) {
          for (
            var g = Array(arguments.length - 2), h = 2;
            h < arguments.length;
            h++
          )
            g[h - 2] = arguments[h];
          return b.prototype[e].apply(d, g);
        };
      },
      db = function (a) {
        return a;
      };
    function eb(a, b) {
      if (Error.captureStackTrace) Error.captureStackTrace(this, eb);
      else {
        var c = Error().stack;
        c && (this.stack = c);
      }
      a && (this.message = String(a));
      void 0 !== b && (this.cause = b);
    }
    cb(eb, Error);
    eb.prototype.name = "CustomError";
    var fb;
    var gb,
      ib = "undefined" !== typeof TextEncoder;
    function jb(a) {
      w.setTimeout(function () {
        throw a;
      }, 0);
    }
    var kb = function (a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c;
      },
      lb = function (a) {
        return /^[\s\xa0]*$/.test(a);
      },
      nb = String.prototype.trim
        ? function (a) {
            return a.trim();
          }
        : function (a) {
            return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
          },
      ob = /&/g,
      pb = /</g,
      qb = />/g,
      rb = /"/g,
      sb = /'/g,
      ub = /\x00/g,
      wb = /[\x00&<>"']/,
      xb = function (a, b) {
        return -1 != a.indexOf(b);
      },
      yb = function (a, b) {
        return xb(a.toLowerCase(), b.toLowerCase());
      },
      Ab = function (a, b) {
        var c = 0;
        a = nb(String(a)).split(".");
        b = nb(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
          var f = a[e] || "",
            g = b[e] || "";
          do {
            f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
            g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
            if (0 == f[0].length && 0 == g[0].length) break;
            c =
              zb(
                0 == f[1].length ? 0 : parseInt(f[1], 10),
                0 == g[1].length ? 0 : parseInt(g[1], 10)
              ) ||
              zb(0 == f[2].length, 0 == g[2].length) ||
              zb(f[2], g[2]);
            f = f[3];
            g = g[3];
          } while (0 == c);
        }
        return c;
      },
      zb = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
      };
    var Bb,
      Cb = Ra("CLOSURE_FLAGS"),
      Db = Cb && Cb[610401301];
    Bb = null != Db ? Db : !1;
    function Eb() {
      var a = w.navigator;
      return a && (a = a.userAgent) ? a : "";
    }
    var Fb,
      Gb = w.navigator;
    Fb = Gb ? Gb.userAgentData || null : null;
    function Hb(a) {
      return Bb
        ? Fb
          ? Fb.brands.some(function (b) {
              return (b = b.brand) && xb(b, a);
            })
          : !1
        : !1;
    }
    function z(a) {
      return xb(Eb(), a);
    }
    function Ib() {
      return Bb ? !!Fb && 0 < Fb.brands.length : !1;
    }
    function Jb() {
      return Ib() ? !1 : z("Opera");
    }
    function Kb() {
      return Ib() ? !1 : z("Trident") || z("MSIE");
    }
    function Lb() {
      return z("Firefox") || z("FxiOS");
    }
    function Mb() {
      return (
        z("Safari") &&
        !(
          Nb() ||
          (Ib() ? 0 : z("Coast")) ||
          Jb() ||
          (Ib() ? 0 : z("Edge")) ||
          (Ib() ? Hb("Microsoft Edge") : z("Edg/")) ||
          (Ib() ? Hb("Opera") : z("OPR")) ||
          Lb() ||
          z("Silk") ||
          z("Android")
        )
      );
    }
    function Nb() {
      return Ib()
        ? Hb("Chromium")
        : ((z("Chrome") || z("CriOS")) && !(Ib() ? 0 : z("Edge"))) || z("Silk");
    }
    function Ob() {
      return Bb ? !!Fb && !!Fb.platform : !1;
    }
    function Pb() {
      return Ob() ? "Android" === Fb.platform : z("Android");
    }
    function Rb() {
      return z("iPhone") && !z("iPod") && !z("iPad");
    }
    function Sb() {
      return Ob() ? "macOS" === Fb.platform : z("Macintosh");
    }
    var Tb = function (a, b) {
        if ("string" === typeof a)
          return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1;
      },
      Ub = function (a, b) {
        for (
          var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
          e < c;
          e++
        )
          e in d && b.call(void 0, d[e], e, a);
      };
    function Vb(a, b) {
      for (
        var c = "string" === typeof a ? a.split("") : a, d = a.length - 1;
        0 <= d;
        --d
      )
        d in c && b.call(void 0, c[d], d, a);
    }
    var Wb = function (a, b) {
        for (
          var c = a.length,
            d = [],
            e = 0,
            f = "string" === typeof a ? a.split("") : a,
            g = 0;
          g < c;
          g++
        )
          if (g in f) {
            var h = f[g];
            b.call(void 0, h, g, a) && (d[e++] = h);
          }
        return d;
      },
      Xb = function (a, b) {
        for (
          var c = a.length,
            d = Array(c),
            e = "string" === typeof a ? a.split("") : a,
            f = 0;
          f < c;
          f++
        )
          f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d;
      },
      Yb = function (a, b, c) {
        var d = c;
        Ub(a, function (e, f) {
          d = b.call(void 0, d, e, f, a);
        });
        return d;
      },
      Zb = function (a, b) {
        for (
          var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
          e < c;
          e++
        )
          if (e in d && b.call(void 0, d[e], e, a)) return !0;
        return !1;
      };
    function $b(a, b) {
      b = ac(a, b);
      return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
    }
    function ac(a, b) {
      for (
        var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0;
        e < c;
        e++
      )
        if (e in d && b.call(void 0, d[e], e, a)) return e;
      return -1;
    }
    function bc(a, b) {
      for (
        var c = "string" === typeof a ? a.split("") : a, d = a.length - 1;
        0 <= d;
        d--
      )
        if (d in c && b.call(void 0, c[d], d, a)) return d;
      return -1;
    }
    function cc(a, b) {
      return 0 <= Tb(a, b);
    }
    function dc(a, b) {
      b = Tb(a, b);
      var c;
      (c = 0 <= b) && ec(a, b);
      return c;
    }
    function ec(a, b) {
      return 1 == Array.prototype.splice.call(a, b, 1).length;
    }
    function fc(a, b) {
      var c = 0;
      Vb(a, function (d, e) {
        b.call(void 0, d, e, a) && ec(a, e) && c++;
      });
    }
    function gc(a) {
      return Array.prototype.concat.apply([], arguments);
    }
    function hc(a) {
      var b = a.length;
      if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c;
      }
      return [];
    }
    function ic(a) {
      for (var b = 0, c = 0, d = {}; c < a.length; ) {
        var e = a[c++],
          f = Ua(e) ? "o" + Xa(e) : (typeof e).charAt(0) + e;
        Object.prototype.hasOwnProperty.call(d, f) || ((d[f] = !0), (a[b++] = e));
      }
      a.length = b;
    }
    function jc(a, b) {
      a.sort(b || kc);
    }
    function kc(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    }
    function lc(a) {
      for (var b = [], c = 0; c < a; c++) b[c] = "";
      return b;
    }
    var mc = function (a) {
      mc[" "](a);
      return a;
    };
    mc[" "] = function () {};
    var nc = function (a, b) {
        try {
          return mc(a[b]), !0;
        } catch (c) {}
        return !1;
      },
      pc = function (a) {
        var b = oc;
        return Object.prototype.hasOwnProperty.call(b, 8) ? b[8] : (b[8] = a(8));
      };
    var rc = Jb(),
      sc = Kb(),
      tc = z("Edge"),
      uc =
        z("Gecko") &&
        !(yb(Eb(), "WebKit") && !z("Edge")) &&
        !(z("Trident") || z("MSIE")) &&
        !z("Edge"),
      vc = yb(Eb(), "WebKit") && !z("Edge"),
      wc = Sb(),
      xc = Pb(),
      yc = Rb(),
      zc = z("iPad"),
      Ac = z("iPod"),
      Bc = Rb() || z("iPad") || z("iPod"),
      Cc = function () {
        var a = w.document;
        return a ? a.documentMode : void 0;
      },
      Ec;
    a: {
      var Fc = "",
        Gc = (function () {
          var a = Eb();
          if (uc) return /rv:([^\);]+)(\)|;)/.exec(a);
          if (tc) return /Edge\/([\d\.]+)/.exec(a);
          if (sc) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
          if (vc) return /WebKit\/(\S+)/.exec(a);
          if (rc) return /(?:Version)[ \/]?(\S+)/.exec(a);
        })();
      Gc && (Fc = Gc ? Gc[1] : "");
      if (sc) {
        var Hc = Cc();
        if (null != Hc && Hc > parseFloat(Fc)) {
          Ec = String(Hc);
          break a;
        }
      }
      Ec = Fc;
    }
    var Jc = Ec,
      oc = {},
      Kc = function () {
        return pc(function () {
          return 0 <= Ab(Jc, 8);
        });
      },
      Lc;
    if (w.document && sc) {
      var Mc = Cc();
      Lc = Mc ? Mc : parseInt(Jc, 10) || void 0;
    } else Lc = void 0;
    var Nc = Lc;
    var Oc = Lb(),
      Pc = z("Android") && !(Nb() || Lb() || Jb() || z("Silk")),
      Qc = Nb();
    Mb();
    var Rc = {},
      Sc = null,
      Uc = function (a, b) {
        void 0 === b && (b = 0);
        Tc();
        b = Rc[b];
        for (
          var c = Array(Math.floor(a.length / 3)), d = b[64] || "", e = 0, f = 0;
          e < a.length - 2;
          e += 3
        ) {
          var g = a[e],
            h = a[e + 1],
            k = a[e + 2],
            n = b[g >> 2];
          g = b[((g & 3) << 4) | (h >> 4)];
          h = b[((h & 15) << 2) | (k >> 6)];
          k = b[k & 63];
          c[f++] = "" + n + g + h + k;
        }
        n = 0;
        k = d;
        switch (a.length - e) {
          case 2:
            (n = a[e + 1]), (k = b[(n & 15) << 2] || d);
          case 1:
            (a = a[e]),
              (c[f] = "" + b[a >> 2] + b[((a & 3) << 4) | (n >> 4)] + k + d);
        }
        return c.join("");
      },
      Wc = function (a) {
        var b = [];
        Vc(a, function (c) {
          b.push(c);
        });
        return b;
      },
      Vc = function (a, b) {
        function c(k) {
          for (; d < a.length; ) {
            var n = a.charAt(d++),
              m = Sc[n];
            if (null != m) return m;
            if (!lb(n)) throw Error("Unknown base64 encoding at char: " + n);
          }
          return k;
        }
        Tc();
        for (var d = 0; ; ) {
          var e = c(-1),
            f = c(0),
            g = c(64),
            h = c(64);
          if (64 === h && -1 === e) break;
          b((e << 2) | (f >> 4));
          64 != g &&
            (b(((f << 4) & 240) | (g >> 2)), 64 != h && b(((g << 6) & 192) | h));
        }
      },
      Tc = function () {
        if (!Sc) {
          Sc = {};
          for (
            var a =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
                  ""
                ),
              b = ["+/=", "+/", "-_=", "-_.", "-_"],
              c = 0;
            5 > c;
            c++
          ) {
            var d = a.concat(b[c].split(""));
            Rc[c] = d;
            for (var e = 0; e < d.length; e++) {
              var f = d[e];
              void 0 === Sc[f] && (Sc[f] = e);
            }
          }
        }
      };
    var Xc = "undefined" !== typeof Uint8Array,
      Yc = !sc && "function" === typeof btoa;
    var Zc = 0,
      $c = 0,
      ad;
    function bd(a) {
      var b = 0 > a;
      a = Math.abs(a);
      var c = a >>> 0;
      a = Math.floor((a - c) / 4294967296);
      b &&
        ((c = t(cd(c, a))), (b = c.next().value), (a = c.next().value), (c = b));
      Zc = c >>> 0;
      $c = a >>> 0;
    }
    function dd(a) {
      if (16 > a.length) bd(Number(a));
      else if ("function" === typeof BigInt)
        (a = BigInt(a)),
          (Zc = Number(a & BigInt(4294967295)) >>> 0),
          ($c = Number((a >> BigInt(32)) & BigInt(4294967295)));
      else {
        var b = +("-" === a[0]);
        $c = Zc = 0;
        for (
          var c = a.length, d = 0 + b, e = ((c - b) % 6) + b;
          e <= c;
          d = e, e += 6
        )
          (d = Number(a.slice(d, e))),
            ($c *= 1e6),
            (Zc = 1e6 * Zc + d),
            4294967296 <= Zc &&
              (($c += Math.trunc(Zc / 4294967296)), ($c >>>= 0), (Zc >>>= 0));
        b &&
          ((b = t(cd(Zc, $c))),
          (a = b.next().value),
          (b = b.next().value),
          (Zc = a),
          ($c = b));
      }
    }
    function cd(a, b) {
      b = ~b;
      a ? (a = ~a + 1) : (b += 1);
      return [a, b];
    }
    var ed = function (a, b) {
        this.h = a >>> 0;
        this.g = b >>> 0;
      },
      hd = function (a) {
        if (!a) return gd || (gd = new ed(0, 0));
        if (!/^\d+$/.test(a)) return null;
        dd(a);
        return new ed(Zc, $c);
      },
      gd,
      id = function (a, b) {
        this.h = a >>> 0;
        this.g = b >>> 0;
      },
      kd = function (a) {
        if (!a) return jd || (jd = new id(0, 0));
        if (!/^-?\d+$/.test(a)) return null;
        dd(a);
        return new id(Zc, $c);
      },
      jd;
    var ld = function () {
      this.g = [];
    };
    ld.prototype.length = function () {
      return this.g.length;
    };
    ld.prototype.end = function () {
      var a = this.g;
      this.g = [];
      return a;
    };
    var md = function (a, b, c) {
        for (; 0 < c || 127 < b; )
          a.g.push((b & 127) | 128),
            (b = ((b >>> 7) | (c << 25)) >>> 0),
            (c >>>= 7);
        a.g.push(b);
      },
      nd = function (a, b) {
        for (; 127 < b; ) a.g.push((b & 127) | 128), (b >>>= 7);
        a.g.push(b);
      },
      od = function (a, b) {
        if (0 <= b) nd(a, b);
        else {
          for (var c = 0; 9 > c; c++) a.g.push((b & 127) | 128), (b >>= 7);
          a.g.push(1);
        }
      },
      pd = function (a, b) {
        a.g.push((b >>> 0) & 255);
        a.g.push((b >>> 8) & 255);
        a.g.push((b >>> 16) & 255);
        a.g.push((b >>> 24) & 255);
      };
    var qd = function () {
        this.j = [];
        this.h = 0;
        this.g = new ld();
      },
      rd = function (a, b) {
        0 !== b.length && (a.j.push(b), (a.h += b.length));
      },
      sd = function (a, b, c) {
        nd(a.g, 8 * b + c);
      };
    var td = function (a) {
      this.g = a;
    };
    function ud(a) {
      return Array.prototype.slice.call(a);
    }
    var vd =
        "function" === typeof Symbol && "symbol" === typeof Symbol()
          ? Symbol()
          : void 0,
      wd = vd
        ? function (a, b) {
            a[vd] |= b;
          }
        : function (a, b) {
            void 0 !== a.Aa
              ? (a.Aa |= b)
              : Object.defineProperties(a, {
                  Aa: {
                    value: b,
                    configurable: !0,
                    writable: !0,
                    enumerable: !1,
                  },
                });
          };
    function xd(a) {
      var b = yd(a);
      1 !== (b & 1) && (Object.isFrozen(a) && (a = ud(a)), Ad(a, b | 1));
    }
    var Bd = vd
      ? function (a, b) {
          a[vd] &= ~b;
        }
      : function (a, b) {
          void 0 !== a.Aa && (a.Aa &= ~b);
        };
    function Cd(a, b, c) {
      return c ? a | b : a & ~b;
    }
    var yd = vd
        ? function (a) {
            return a[vd] | 0;
          }
        : function (a) {
            return a.Aa | 0;
          },
      Dd = vd
        ? function (a) {
            return a[vd];
          }
        : function (a) {
            return a.Aa;
          },
      Ad = vd
        ? function (a, b) {
            a[vd] = b;
          }
        : function (a, b) {
            void 0 !== a.Aa
              ? (a.Aa = b)
              : Object.defineProperties(a, {
                  Aa: {
                    value: b,
                    configurable: !0,
                    writable: !0,
                    enumerable: !1,
                  },
                });
          };
    function Ed() {
      var a = [];
      wd(a, 1);
      return a;
    }
    function Gd(a, b) {
      Ad(b, (a | 0) & -2303);
    }
    function Hd(a, b) {
      Ad(b, (a | 34) & -2269);
    }
    function Id(a) {
      a = (a >> 12) & 1023;
      return 0 === a ? 536870912 : a;
    }
    var Jd = {};
    function Kd(a) {
      return (
        null !== a &&
        "object" === typeof a &&
        !Array.isArray(a) &&
        a.constructor === Object
      );
    }
    var Ld,
      Md,
      Nd = [];
    Ad(Nd, 55);
    Md = Object.freeze(Nd);
    function Od(a) {
      if (a & 2) throw Error();
    }
    var Pd = function (a, b) {
      a.__closure__error__context__984382 ||
        (a.__closure__error__context__984382 = {});
      a.__closure__error__context__984382.severity = b;
    };
    function Qd() {
      var a = Error();
      Pd(a, "incident");
      jb(a);
    }
    function Rd(a) {
      a = Error(a);
      Pd(a, "warning");
      return a;
    }
    function Sd(a) {
      if (null == a) return a;
      if (
        "number" === typeof a ||
        "NaN" === a ||
        "Infinity" === a ||
        "-Infinity" === a
      )
        return Number(a);
    }
    function Td(a) {
      if (null != a) {
        if ("boolean" !== typeof a)
          throw Error("Expected boolean but got " + Sa(a) + ": " + a);
        a = !!a;
      }
      return a;
    }
    function Ud(a) {
      if (null == a) return a;
      if ("boolean" === typeof a || "number" === typeof a) return !!a;
    }
    var Vd = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
    function Wd(a) {
      var b = typeof a;
      return "number" === b
        ? Number.isFinite(a)
        : "string" !== b
        ? !1
        : Vd.test(a);
    }
    function Xd(a) {
      Number.isFinite(a) || Qd();
      return a;
    }
    function Yd(a) {
      return a;
    }
    function Zd(a) {
      if ("number" !== typeof a) throw Rd("int32");
      Number.isFinite(a) || Qd();
      return a;
    }
    function $d(a) {
      return null == a ? a : Zd(a);
    }
    function ae(a) {
      if (null == a) return a;
      if ("string" === typeof a) {
        if (!a) return;
        a = +a;
      }
      if ("number" === typeof a) return a;
    }
    function be(a) {
      if (null == a) return a;
      if ("string" === typeof a) {
        if (!a) return;
        a = +a;
      }
      if ("number" === typeof a) return a;
    }
    function ce(a) {
      if (null != a) {
        if (!Wd(a)) throw Rd("int64");
        a = "string" === typeof a ? a : a;
      }
      return a;
    }
    function de(a) {
      if (null != a && "string" !== typeof a) throw Error();
      return a;
    }
    function ee(a) {
      return null == a || "string" === typeof a ? a : void 0;
    }
    function fe(a, b, c) {
      if (null != a && "object" === typeof a && a.jd === Jd) return a;
      if (Array.isArray(a)) {
        var d = yd(a),
          e = d;
        0 === e && (e |= c & 32);
        e |= c & 2;
        e !== d && Ad(a, e);
        return new b(a);
      }
    }
    var ge;
    function ie(a, b) {
      ge = b;
      a = new a(b);
      ge = void 0;
      return a;
    }
    var je, ke;
    function le(a) {
      switch (typeof a) {
        case "boolean":
          return je || (je = [0, void 0, !0]);
        case "number":
          return 0 < a
            ? void 0
            : 0 === a
            ? ke || (ke = [0, void 0])
            : [-a, void 0];
        case "string":
          return [0, a];
        case "object":
          return a;
      }
    }
    function me(a, b, c) {
      null == a && (a = ge);
      ge = void 0;
      if (null == a) {
        var d = 96;
        c ? ((a = [c]), (d |= 512)) : (a = []);
        b && (d = (d & -4190209) | ((b & 1023) << 12));
      } else {
        if (!Array.isArray(a)) throw Error();
        d = yd(a);
        if (d & 64) return a;
        d |= 64;
        if (c && ((d |= 512), c !== a[0])) throw Error();
        a: {
          c = a;
          var e = c.length;
          if (e) {
            var f = e - 1,
              g = c[f];
            if (Kd(g)) {
              d |= 256;
              b = +!!(d & 512) - 1;
              e = f - b;
              1024 <= e && (ne(c, b, g), (e = 1023));
              d = (d & -4190209) | ((e & 1023) << 12);
              break a;
            }
          }
          b &&
            ((g = +!!(d & 512) - 1),
            (b = Math.max(b, e - g)),
            1024 < b && (ne(c, g, {}), (d |= 256), (b = 1023)),
            (d = (d & -4190209) | ((b & 1023) << 12)));
        }
      }
      Ad(a, d);
      return a;
    }
    function ne(a, b, c) {
      for (var d = 1023 + b, e = a.length, f = d; f < e; f++) {
        var g = a[f];
        null != g && g !== c && (c[f - b] = g);
      }
      a.length = d + 1;
      a[d] = c;
    }
    function oe(a, b) {
      return pe(b);
    }
    function pe(a) {
      switch (typeof a) {
        case "number":
          return isFinite(a) ? a : String(a);
        case "boolean":
          return a ? 1 : 0;
        case "object":
          if (
            a &&
            !Array.isArray(a) &&
            Xc &&
            null != a &&
            a instanceof Uint8Array
          ) {
            if (Yc) {
              for (var b = "", c = 0, d = a.length - 10240; c < d; )
                b += String.fromCharCode.apply(null, a.subarray(c, (c += 10240)));
              b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
              a = btoa(b);
            } else a = Uc(a);
            return a;
          }
      }
      return a;
    }
    function qe(a, b, c) {
      a = ud(a);
      var d = a.length,
        e = b & 256 ? a[d - 1] : void 0;
      d += e ? -1 : 0;
      for (b = b & 512 ? 1 : 0; b < d; b++) a[b] = c(a[b]);
      if (e) {
        b = a[b] = {};
        for (var f in e) b[f] = c(e[f]);
      }
      return a;
    }
    function re(a, b, c, d, e, f) {
      if (null != a) {
        if (Array.isArray(a))
          a =
            e && 0 == a.length && yd(a) & 1
              ? void 0
              : f && yd(a) & 2
              ? a
              : se(a, b, c, void 0 !== d, e, f);
        else if (Kd(a)) {
          var g = {},
            h;
          for (h in a) g[h] = re(a[h], b, c, d, e, f);
          a = g;
        } else a = b(a, d);
        return a;
      }
    }
    function se(a, b, c, d, e, f) {
      var g = d || c ? yd(a) : 0;
      d = d ? !!(g & 32) : void 0;
      a = ud(a);
      for (var h = 0; h < a.length; h++) a[h] = re(a[h], b, c, d, e, f);
      c && c(g, a);
      return a;
    }
    function te(a) {
      return a.jd === Jd ? a.toJSON() : pe(a);
    }
    function ue(a, b, c) {
      c = void 0 === c ? Hd : c;
      if (null != a) {
        if (Xc && a instanceof Uint8Array) return b ? a : new Uint8Array(a);
        if (Array.isArray(a)) {
          var d = yd(a);
          if (d & 2) return a;
          b && (b = 0 === d || (!!(d & 32) && !(d & 64 || !(d & 16))));
          return b
            ? (Ad(a, (d | 34) & -5), a)
            : se(a, ue, d & 4 ? Hd : c, !0, !1, !0);
        }
        a.jd === Jd &&
          ((c = a.P),
          (d = Dd(c)),
          (a = d & 2 ? a : ie(a.constructor, ve(c, d, !0))));
        return a;
      }
    }
    function ve(a, b, c) {
      var d = c || b & 2 ? Hd : Gd,
        e = !!(b & 32);
      a = qe(a, b, function (f) {
        return ue(f, e, d);
      });
      wd(a, 32 | (c ? 2 : 0));
      return a;
    }
    function we(a) {
      var b = a.P,
        c = Dd(b);
      return c & 2 ? ie(a.constructor, ve(b, c, !1)) : a;
    }
    Object.freeze({});
    var ye = function (a, b) {
        a = a.P;
        return xe(a, Dd(a), b);
      },
      xe = function (a, b, c, d) {
        if (-1 === c) return null;
        if (c >= Id(b)) {
          if (b & 256) return a[a.length - 1][c];
        } else {
          var e = a.length;
          if (d && b & 256 && ((d = a[e - 1][c]), null != d)) return d;
          b = c + (+!!(b & 512) - 1);
          if (b < e) return a[b];
        }
      },
      Ae = function (a, b, c) {
        var d = a.P,
          e = Dd(d);
        Od(e);
        ze(d, e, b, c);
        return a;
      };
    function ze(a, b, c, d, e) {
      var f = Id(b);
      if (c >= f || e) {
        e = b;
        if (b & 256) f = a[a.length - 1];
        else {
          if (null == d) return e;
          f = a[f + (+!!(b & 512) - 1)] = {};
          e |= 256;
        }
        f[c] = d;
        e !== b && Ad(a, e);
        return e;
      }
      a[c + (+!!(b & 512) - 1)] = d;
      b & 256 && ((a = a[a.length - 1]), c in a && delete a[c]);
      return b;
    }
    function Be(a, b, c, d, e) {
      var f = b & 2,
        g = xe(a, b, c, e);
      Array.isArray(g) || (g = Md);
      var h = !(d & 2);
      d = !(d & 1);
      var k = !!(b & 32),
        n = yd(g);
      0 !== n || !k || f || h
        ? n & 1 || ((n |= 1), Ad(g, n))
        : ((n |= 33), Ad(g, n));
      f
        ? ((a = !1),
          n & 2 || (wd(g, 34), (a = !!(4 & n))),
          (d || a) && Object.freeze(g))
        : ((f = !!(2 & n) || !!(2048 & n)),
          d && f
            ? ((g = ud(g)),
              (d = 1),
              k && !h && (d |= 32),
              Ad(g, d),
              ze(a, b, c, g, e))
            : h && n & 32 && !f && Bd(g, 32));
      return g;
    }
    function Ce(a, b, c) {
      var d = void 0;
      d = void 0 === d ? 2 : d;
      a = a.P;
      var e = Dd(a);
      2 & e && (d = 1);
      var f = Be(a, e, b, 1);
      e = Dd(a);
      var g = yd(f),
        h = g,
        k = !!(2 & g),
        n = !!(4 & g),
        m = k && n;
      if (!n) {
        Object.isFrozen(f) &&
          ((f = ud(f)),
          (h = 0),
          (g = De(g, e, !1)),
          (k = !!(2 & g)),
          (e = ze(a, e, b, f)));
        for (var p = (n = 0); n < f.length; n++) {
          var u = c(f[n]);
          null != u && (f[p++] = u);
        }
        p < n && (f.length = p);
        g = Cd(g, 20, !0);
      }
      m ||
        ((c = 1 === d) && (g = Cd(g, 2, !0)),
        g !== h && Ad(f, g),
        (c || k) && Object.freeze(f));
      2 === d && k && ((f = ud(f)), (g = De(g, e, !1)), Ad(f, g), ze(a, e, b, f));
      return f;
    }
    function Ee(a, b, c, d) {
      var e = a.P,
        f = Dd(e);
      Od(f);
      if (null == c) return ze(e, f, b), a;
      var g = yd(c),
        h = g,
        k = !!(2 & g) || Object.isFrozen(c),
        n = !k && !1;
      if (!(4 & g))
        for (
          g = 21, k && ((c = ud(c)), (h = 0), (g = De(g, f, !0))), k = 0;
          k < c.length;
          k++
        )
          c[k] = d(c[k]);
      n && (g = Cd(g, 2, !0));
      g !== h && Ad(c, g);
      n && Object.freeze(c);
      ze(e, f, b, c);
      return a;
    }
    function Fe(a, b, c, d) {
      var e = a.P,
        f = Dd(e);
      Od(f);
      ze(e, f, b, ("0" === d ? 0 === Number(c) : c === d) ? void 0 : c);
      return a;
    }
    function Ge(a, b, c) {
      for (var d = 0, e = 0; e < c.length; e++) {
        var f = c[e];
        null != xe(a, b, f) && (0 !== d && (b = ze(a, b, d)), (d = f));
      }
      return d;
    }
    var He = function (a, b, c) {
      var d = void 0 === d ? !1 : d;
      var e = a.P;
      var f = Dd(e),
        g = xe(e, f, c, d);
      b = fe(g, b, f);
      b !== g && null != b && ze(e, f, c, b, d);
      e = b;
      if (null == e) return e;
      a = a.P;
      f = Dd(a);
      f & 2 || ((g = we(e)), g !== e && ((e = g), ze(a, f, c, e, d)));
      return e;
    };
    function Ie(a, b, c, d, e, f, g) {
      var h = 1 === e;
      e = 2 === e;
      f = !!f;
      var k = !!(2 & b) && e,
        n = Be(a, b, d, 3);
      b = Dd(a);
      var m = yd(n),
        p = !!(2 & m),
        u = !!(4 & m),
        r = !!(32 & m),
        x = (p && u) || !!(2048 & m);
      if (!u) {
        var B = n,
          P = b,
          ka;
        (ka = !!(2 & m)) && (P = Cd(P, 2, !0));
        for (var pa = !ka, ha = !0, vb = 0, qc = 0; vb < B.length; vb++) {
          var Ic = fe(B[vb], c, P);
          if (Ic instanceof c) {
            if (!ka) {
              var Fd = !!(yd(Ic.P) & 2);
              pa && (pa = !Fd);
              ha && (ha = Fd);
            }
            B[qc++] = Ic;
          }
        }
        qc < vb && (B.length = qc);
        m = Cd(m, 4, !0);
        m = Cd(m, 16, ha);
        m = Cd(m, 8, pa);
        Ad(B, m);
        p && !k && (Object.freeze(n), (x = !0));
      }
      c = m;
      k = !!(8 & m) || (h && !n.length);
      if (g && !k) {
        x &&
          ((n = ud(n)),
          (x = !1),
          (c = 0),
          (m = De(m, b, f)),
          (b = ze(a, b, d, n)));
        g = n;
        k = m;
        for (p = 0; p < g.length; p++)
          (B = g[p]), (m = we(B)), B !== m && (g[p] = m);
        k = Cd(k, 8, !0);
        m = k = Cd(k, 16, !g.length);
      }
      x ||
        (h
          ? (m = Cd(m, !n.length || (16 & m && (!u || r)) ? 2 : 2048, !0))
          : f || (m = Cd(m, 32, !1)),
        m !== c && Ad(n, m),
        h && (Object.freeze(n), (x = !0)));
      e && x && ((n = ud(n)), (m = De(m, b, f)), Ad(n, m), ze(a, b, d, n));
      return n;
    }
    var Je = function (a, b, c) {
        a = a.P;
        var d = Dd(a),
          e = !!(2 & d);
        return Ie(a, d, b, c, e ? 1 : 2, !1, !e);
      },
      Ke = function (a, b, c) {
        null == c && (c = void 0);
        return Ae(a, b, c);
      },
      Le = function (a, b, c) {
        var d = a.P,
          e = Dd(d);
        Od(e);
        if (null == c) return ze(d, e, b), a;
        for (
          var f = yd(c),
            g = f,
            h = !!(2 & f) || !!(2048 & f),
            k = h || Object.isFrozen(c),
            n = !k && !1,
            m = !0,
            p = !0,
            u = 0;
          u < c.length;
          u++
        ) {
          var r = c[u];
          h || ((r = !!(yd(r.P) & 2)), m && (m = !r), p && (p = r));
        }
        h ||
          ((f = Cd(f, 5, !0)),
          (f = Cd(f, 8, m)),
          (f = Cd(f, 16, p)),
          n && (f = Cd(f, p ? 2 : 2048, !0)),
          f !== g && (k && ((c = ud(c)), (f = De(f, e, !0))), Ad(c, f)),
          n && Object.freeze(c));
        ze(d, e, b, c);
        return a;
      };
    function De(a, b, c) {
      a = Cd(a, 2, !!(2 & b));
      a = Cd(a, 32, !!(32 & b) && c);
      return (a = Cd(a, 2048, !1));
    }
    var Me = function (a, b) {
        a = ye(a, b);
        var c;
        null == a
          ? (c = a)
          : Wd(a)
          ? "number" === typeof a
            ? (c = a)
            : (c = a)
          : (c = void 0);
        return c;
      },
      Ne = function (a, b) {
        return ee(ye(a, b));
      };
    function Oe(a, b) {
      return null != a ? a : b;
    }
    var Pe = function (a, b) {
        return Oe(Ud(ye(a, b)), !1);
      },
      Qe = function (a, b) {
        var c = void 0 === c ? 0 : c;
        return Oe(ae(ye(a, b)), c);
      },
      Re = function (a) {
        var b = void 0 === b ? 0 : b;
        a = be(ye(a, 1));
        return Oe(a, b);
      },
      Se = function (a, b, c) {
        var d = a.P;
        b = Ge(d, Dd(d), c) === b ? b : -1;
        return Oe(ye(a, b), 0);
      },
      Te = function (a, b, c) {
        return Ae(a, b, de(c));
      };
    var Ue = function (a, b, c) {
      this.P = me(a, b, c);
    };
    Ue.prototype.toJSON = function () {
      if (Ld) var a = Ve(this, this.P, !1);
      else (a = se(this.P, te, void 0, void 0, !1, !1)), (a = Ve(this, a, !0));
      return a;
    };
    var We = function (a) {
      Ld = !0;
      try {
        return JSON.stringify(a.toJSON(), oe);
      } finally {
        Ld = !1;
      }
    };
    Ue.prototype.jd = Jd;
    Ue.prototype.toString = function () {
      return Ve(this, this.P, !1).toString();
    };
    function Ve(a, b, c) {
      var d = a.constructor.ua,
        e = Id(Dd(c ? a.P : b)),
        f = !1;
      if (d) {
        if (!c) {
          b = ud(b);
          var g;
          if (b.length && Kd((g = b[b.length - 1])))
            for (f = 0; f < d.length; f++)
              if (d[f] >= e) {
                Object.assign((b[b.length - 1] = {}), g);
                break;
              }
          f = !0;
        }
        e = b;
        c = !c;
        g = Dd(a.P);
        a = Id(g);
        g = +!!(g & 512) - 1;
        for (var h, k, n = 0; n < d.length; n++)
          if (((k = d[n]), k < a)) {
            k += g;
            var m = e[k];
            null == m ? (e[k] = c ? Md : Ed()) : c && m !== Md && xd(m);
          } else
            h ||
              ((m = void 0),
              e.length && Kd((m = e[e.length - 1])) ? (h = m) : e.push((h = {}))),
              (m = h[k]),
              null == h[k] ? (h[k] = c ? Md : Ed()) : c && m !== Md && xd(m);
      }
      d = b.length;
      if (!d) return b;
      var p;
      if (Kd((h = b[d - 1]))) {
        a: {
          var u = h;
          e = {};
          c = !1;
          for (var r in u)
            (a = u[r]),
              Array.isArray(a) && a != a && (c = !0),
              null != a ? (e[r] = a) : (c = !0);
          if (c) {
            for (var x in e) {
              u = e;
              break a;
            }
            u = null;
          }
        }
        u != h && (p = !0);
        d--;
      }
      for (; 0 < d; d--) {
        h = b[d - 1];
        if (null != h) break;
        var B = !0;
      }
      if (!p && !B) return b;
      var P;
      f ? (P = b) : (P = Array.prototype.slice.call(b, 0, d));
      b = P;
      f && (b.length = d);
      u && b.push(u);
      return b;
    }
    var Xe = Symbol();
    function Ye(a) {
      var b = a[Xe];
      if (!b) {
        var c = Ze(a);
        b = function (d, e) {
          return $e(d, e, c);
        };
        a[Xe] = b;
      }
      return b;
    }
    var af = Symbol();
    function bf(a, b) {
      return b.g;
    }
    function cf(a, b, c) {
      var d,
        e,
        f = b.g;
      return function (g, h, k) {
        return f(g, h, k, e || (e = Ze(c).h), d || (d = Ye(c)));
      };
    }
    function Ze(a) {
      var b = a[af];
      if (b) return b;
      a: {
        b = a[af] = {};
        var c = bf,
          d = cf;
        b.h = le(a[0]);
        var e = 1;
        if (a.length > e && !(a[e] instanceof td)) {
          var f = a[e++];
          if (Array.isArray(f)) {
            b.j = f[0];
            b.g = f[1];
            break a;
          }
          b.g = f;
        }
        for (f = 0; e < a.length; ) {
          var g = a[e++],
            h = a[e];
          "number" === typeof h ? (e++, (f += h)) : f++;
          for (h = e; h < a.length && !(a[h] instanceof td); ) h++;
          if ((h -= e)) {
            var k = a,
              n = e,
              m = k[n];
            "function" == typeof m && ((m = m()), (k[n] = m));
            if (
              (k = Array.isArray(m)) &&
              !(k = df in m || af in m) &&
              (k = 0 < m.length)
            ) {
              k = m;
              n = k[0];
              var p = le(n);
              null != p && p !== n && (k[0] = p);
              k = null != p;
            }
            (m = k ? m : void 0)
              ? (e++,
                1 === h
                  ? ((g = d(f, g, m, void 0, void 0)), void 0 !== g && (b[f] = g))
                  : ((g = d(f, g, m, a[e++], void 0)),
                    void 0 !== g && (b[f] = g)))
              : ((g = c(f, g, a[e++], void 0)), void 0 !== g && (b[f] = g));
          } else (g = c(f, g, void 0, void 0)), void 0 !== g && (b[f] = g);
        }
      }
      df in a && af in a && (a.length = 0);
      return b;
    }
    var df = Symbol();
    function ef(a, b) {
      var c = a[b];
      if (c) return c;
      if ((c = a.g))
        if ((c = c[b])) {
          var d = c.Wh,
            e = c.ci.g;
          if (d) {
            var f = Ye(d),
              g = Ze(d).h;
            c = function (h, k, n) {
              return e(h, k, n, g, f);
            };
          } else c = e;
          return (a[b] = c);
        }
    }
    function $e(a, b, c) {
      for (
        var d = Dd(a),
          e = +!!(d & 512) - 1,
          f = a.length,
          g = f + (d & 256 ? -1 : 0),
          h = d & 512 ? 1 : 0;
        h < g;
        h++
      ) {
        var k = a[h];
        if (null != k) {
          var n = h - e,
            m = ef(c, n);
          m && m(b, k, n);
        }
      }
      if (d & 256) {
        a = a[f - 1];
        for (var p in a)
          (d = +p),
            Number.isNaN(d) ||
              ((e = a[p]), null != e && (f = ef(c, d)) && f(b, e, d));
      }
    }
    function ff(a) {
      return new td(a);
    }
    function gf(a, b, c) {
      a: if (null != b) {
        if (Wd(b)) {
          if ("string" === typeof b) break a;
          if ("number" === typeof b) break a;
        }
        b = void 0;
      }
      null != b &&
        ("string" === typeof b && kd(b),
        null != b &&
          (sd(a, c, 0),
          "number" === typeof b
            ? ((a = a.g), bd(b), md(a, Zc, $c))
            : ((c = kd(b)), md(a.g, c.h, c.g))));
    }
    function hf(a, b, c) {
      b = ae(b);
      null != b && null != b && (sd(a, c, 0), od(a.g, b));
    }
    function jf(a, b, c, d, e) {
      b = b instanceof Ue ? b.P : Array.isArray(b) ? me(b, d[0], d[1]) : void 0;
      if (null != b) {
        sd(a, c, 2);
        c = a.g.end();
        rd(a, c);
        c.push(a.h);
        e(b, a);
        e = c.pop();
        for (e = a.h + a.g.length() - e; 127 < e; )
          c.push((e & 127) | 128), (e >>>= 7), a.h++;
        c.push(e);
        a.h++;
      }
    }
    var kf = ff(function (a, b, c) {
        b = Sd(b);
        null != b &&
          (sd(a, c, 1),
          (a = a.g),
          (c = ad || (ad = new DataView(new ArrayBuffer(8)))),
          c.setFloat64(0, +b, !0),
          (Zc = c.getUint32(0, !0)),
          ($c = c.getUint32(4, !0)),
          pd(a, Zc),
          pd(a, $c));
      }),
      lf = ff(function (a, b, c) {
        b = Sd(b);
        null != b &&
          (sd(a, c, 5),
          (a = a.g),
          (c = ad || (ad = new DataView(new ArrayBuffer(8)))),
          c.setFloat32(0, +b, !0),
          ($c = 0),
          (Zc = c.getUint32(0, !0)),
          pd(a, Zc));
      }),
      mf = ff(gf),
      nf = ff(gf),
      of = ff(function (a, b, c) {
        a: if (null != b) {
          if (Wd(b)) {
            if ("string" === typeof b) break a;
            if ("number" === typeof b) break a;
          }
          b = void 0;
        }
        null != b &&
          ("string" === typeof b && hd(b),
          null != b &&
            (sd(a, c, 0),
            "number" === typeof b
              ? ((a = a.g), bd(b), md(a, Zc, $c))
              : ((c = hd(b)), md(a.g, c.h, c.g))));
      }),
      pf = ff(hf),
      qf = ff(hf),
      rf = ff(function (a, b, c) {
        b = Ud(b);
        null != b && (sd(a, c, 0), a.g.g.push(b ? 1 : 0));
      }),
      sf = ff(function (a, b, c) {
        b = ee(b);
        if (null != b) {
          var d = !1;
          d = void 0 === d ? !1 : d;
          if (ib) {
            if (
              d &&
              /(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(
                b
              )
            )
              throw Error("Found an unpaired surrogate");
            b = (gb || (gb = new TextEncoder())).encode(b);
          } else {
            for (
              var e = 0, f = new Uint8Array(3 * b.length), g = 0;
              g < b.length;
              g++
            ) {
              var h = b.charCodeAt(g);
              if (128 > h) f[e++] = h;
              else {
                if (2048 > h) f[e++] = (h >> 6) | 192;
                else {
                  if (55296 <= h && 57343 >= h) {
                    if (56319 >= h && g < b.length) {
                      var k = b.charCodeAt(++g);
                      if (56320 <= k && 57343 >= k) {
                        h = 1024 * (h - 55296) + k - 56320 + 65536;
                        f[e++] = (h >> 18) | 240;
                        f[e++] = ((h >> 12) & 63) | 128;
                        f[e++] = ((h >> 6) & 63) | 128;
                        f[e++] = (h & 63) | 128;
                        continue;
                      } else g--;
                    }
                    if (d) throw Error("Found an unpaired surrogate");
                    h = 65533;
                  }
                  f[e++] = (h >> 12) | 224;
                  f[e++] = ((h >> 6) & 63) | 128;
                }
                f[e++] = (h & 63) | 128;
              }
            }
            b = e === f.length ? f : f.subarray(0, e);
          }
          sd(a, c, 2);
          nd(a.g, b.length);
          rd(a, a.g.end());
          rd(a, b);
        }
      }),
      tf = ff(jf),
      uf;
    uf = new td(function (a, b, c, d, e) {
      if (Array.isArray(b))
        for (var f = 0; f < b.length; f++) jf(a, b[f], c, d, e);
    });
    var vf = ff(function (a, b, c) {
      b = ae(b);
      null != b && ((b = parseInt(b, 10)), sd(a, c, 0), od(a.g, b));
    });
    function wf(a) {
      return function () {
        var b = new qd();
        $e(this.P, b, Ze(a));
        rd(b, b.g.end());
        for (
          var c = new Uint8Array(b.h), d = b.j, e = d.length, f = 0, g = 0;
          g < e;
          g++
        ) {
          var h = d[g];
          c.set(h, f);
          f += h.length;
        }
        b.j = [c];
        return c;
      };
    }
    function xf(a) {
      return function (b) {
        if (null == b || "" == b) b = new a();
        else {
          b = JSON.parse(b);
          if (!Array.isArray(b)) throw Error(void 0);
          wd(b, 32);
          b = ie(a, b);
        }
        return b;
      };
    }
    var Af = function (a, b) {
      this.g = (a === yf && b) || "";
      this.h = zf;
    };
    Af.prototype.Ob = !0;
    Af.prototype.Lb = function () {
      return this.g;
    };
    var Bf = function (a) {
        return a instanceof Af && a.constructor === Af && a.h === zf
          ? a.g
          : "type_error:Const";
      },
      zf = {},
      yf = {};
    var Cf = function () {
      var a;
      this.g = a = void 0 === a ? {} : a;
    };
    Cf.prototype.reset = function () {
      this.g = {};
    };
    var Df = function () {},
      Ef = function (a) {
        var b = !1,
          c;
        return function () {
          b || ((c = a()), (b = !0));
          return c;
        };
      },
      Ff = function (a) {
        var b = a;
        return function () {
          if (b) {
            var c = b;
            b = null;
            c();
          }
        };
      },
      Gf = function (a) {
        var b = 0,
          c = !1,
          d = [],
          e = function () {
            b = 0;
            c && ((c = !1), f());
          },
          f = function () {
            b = w.setTimeout(e, 1e3);
            var g = d;
            d = [];
            a.apply(void 0, g);
          };
        return function (g) {
          d = arguments;
          b ? (c = !0) : f();
        };
      };
    var Hf = Ef(function () {
      var a = !1;
      try {
        var b = Object.defineProperty({}, "passive", {
          get: function () {
            a = !0;
          },
        });
        w.addEventListener("test", null, b);
      } catch (c) {}
      return a;
    });
    function If(a) {
      return a ? (a.passive && Hf() ? a : a.capture || !1) : !1;
    }
    var Jf = function (a, b, c, d) {
        return a.addEventListener ? (a.addEventListener(b, c, If(d)), !0) : !1;
      },
      Kf = function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, If());
      };
    var Lf = sc || vc;
    function Mf(a, b, c) {
      for (var d in a) b.call(c, a[d], d, a);
    }
    function Nf(a, b) {
      var c = {},
        d;
      for (d in a) b.call(void 0, a[d], d, a) && (c[d] = a[d]);
      return c;
    }
    function Of(a) {
      var b = Pf,
        c;
      for (c in b) if (!a.call(void 0, b[c], c, b)) return !1;
      return !0;
    }
    function Qf(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = a[d];
      return b;
    }
    function Rf(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = d;
      return b;
    }
    function Sf(a, b) {
      var c = Ta(b),
        d = c ? b : arguments;
      for (c = c ? 0 : 1; c < d.length; c++) {
        if (null == a) return;
        a = a[d[c]];
      }
      return a;
    }
    function Tf(a, b) {
      return null !== a && b in a;
    }
    function Uf(a, b) {
      for (var c in a) if (a[c] == b) return !0;
      return !1;
    }
    function Vf(a) {
      var b = Wf,
        c;
      for (c in b) if (a.call(void 0, b[c], c, b)) return c;
    }
    function Xf(a) {
      for (var b in a) return !1;
      return !0;
    }
    function Yf(a) {
      for (var b in a) delete a[b];
    }
    function Zf(a, b, c) {
      return null !== a && b in a ? a[b] : c;
    }
    var $f =
      "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
        " "
      );
    function ag(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < $f.length; f++)
          (c = $f[f]),
            Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    }
    var bg,
      cg = function () {
        if (void 0 === bg) {
          var a = null,
            b = w.trustedTypes;
          if (b && b.createPolicy) {
            try {
              a = b.createPolicy("goog#html", {
                createHTML: db,
                createScript: db,
                createScriptURL: db,
              });
            } catch (c) {
              w.console && w.console.error(c.message);
            }
            bg = a;
          } else bg = a;
        }
        return bg;
      };
    var dg = function (a) {
      this.g = a;
    };
    dg.prototype.toString = function () {
      return this.g + "";
    };
    dg.prototype.Ob = !0;
    dg.prototype.Lb = function () {
      return this.g.toString();
    };
    var hg = function (a, b) {
        var c = Bf(a);
        if (!eg.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
        a = c.replace(fg, function (d, e) {
          if (!Object.prototype.hasOwnProperty.call(b, e))
            throw Error(
              'Found marker, "' +
                e +
                '", in format string, "' +
                c +
                '", but no valid label mapping found in args: ' +
                JSON.stringify(b)
            );
          d = b[e];
          return d instanceof Af ? Bf(d) : encodeURIComponent(String(d));
        });
        return gg(a);
      },
      fg = /%{(\w+)}/g,
      eg = RegExp(
        "^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)",
        "i"
      ),
      ig = {},
      gg = function (a) {
        var b = cg();
        a = b ? b.createScriptURL(a) : a;
        return new dg(a, ig);
      };
    var jg = function (a) {
      this.g = a;
    };
    jg.prototype.toString = function () {
      return this.g.toString();
    };
    jg.prototype.Ob = !0;
    jg.prototype.Lb = function () {
      return this.g.toString();
    };
    var kg = {},
      lg = new jg("about:invalid#zClosurez", kg);
    var mg = {},
      ng = function (a) {
        this.g = a;
        this.Ob = !0;
      };
    ng.prototype.Lb = function () {
      return this.g;
    };
    ng.prototype.toString = function () {
      return this.g.toString();
    };
    var og = new ng("", mg);
    var pg = {},
      qg = function (a) {
        this.g = a;
        this.Ob = !0;
      };
    qg.prototype.Lb = function () {
      return this.g.toString();
    };
    qg.prototype.toString = function () {
      return this.g.toString();
    };
    var rg = function (a) {
        return a instanceof qg && a.constructor === qg
          ? a.g
          : "type_error:SafeHtml";
      },
      sg = function (a) {
        var b = cg();
        a = b ? b.createHTML(a) : a;
        return new qg(a, pg);
      };
    var tg = function (a, b) {
      this.x = void 0 !== a ? a : 0;
      this.y = void 0 !== b ? b : 0;
    };
    tg.prototype.ceil = function () {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
    };
    tg.prototype.floor = function () {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
    };
    tg.prototype.round = function () {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
    };
    var A = function (a, b) {
      this.width = a;
      this.height = b;
    };
    l = A.prototype;
    l.aspectRatio = function () {
      return this.width / this.height;
    };
    l.isEmpty = function () {
      return !(this.width * this.height);
    };
    l.ceil = function () {
      this.width = Math.ceil(this.width);
      this.height = Math.ceil(this.height);
      return this;
    };
    l.floor = function () {
      this.width = Math.floor(this.width);
      this.height = Math.floor(this.height);
      return this;
    };
    l.round = function () {
      this.width = Math.round(this.width);
      this.height = Math.round(this.height);
      return this;
    };
    var ug = function (a) {
        return decodeURIComponent(a.replace(/\+/g, " "));
      },
      vg = function (a) {
        wb.test(a) &&
          (-1 != a.indexOf("&") && (a = a.replace(ob, "&amp;")),
          -1 != a.indexOf("<") && (a = a.replace(pb, "&lt;")),
          -1 != a.indexOf(">") && (a = a.replace(qb, "&gt;")),
          -1 != a.indexOf('"') && (a = a.replace(rb, "&quot;")),
          -1 != a.indexOf("'") && (a = a.replace(sb, "&#39;")),
          -1 != a.indexOf("\x00") && (a = a.replace(ub, "&#0;")));
        return a;
      },
      wg = function (a, b) {
        a.length > b && (a = a.substring(0, b - 3) + "...");
        return a;
      },
      xg = String.prototype.repeat
        ? function (a, b) {
            return a.repeat(b);
          }
        : function (a, b) {
            return Array(b + 1).join(a);
          },
      yg = function (a) {
        return null == a ? "" : String(a);
      },
      zg = (2147483648 * Math.random()) | 0,
      Ag = function (a) {
        return String(a).replace(/\-([a-z])/g, function (b, c) {
          return c.toUpperCase();
        });
      },
      Bg = function () {
        return "googleAvInapp".replace(/([A-Z])/g, "-$1").toLowerCase();
      },
      Cg = function (a) {
        return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function (b, c, d) {
          return c + d.toUpperCase();
        });
      },
      Dg = function (a) {
        isFinite(a) && (a = String(a));
        return "string" === typeof a
          ? /^\s*-?0x/i.test(a)
            ? parseInt(a, 16)
            : parseInt(a, 10)
          : NaN;
      };
    var Gg = function (a) {
        return a ? new Eg(Fg(a)) : fb || (fb = new Eg());
      },
      Hg = function (a) {
        var b = document;
        return "string" === typeof a ? b.getElementById(a) : a;
      },
      Jg = function (a, b) {
        Mf(b, function (c, d) {
          c && "object" == typeof c && c.Ob && (c = c.Lb());
          "style" == d
            ? (a.style.cssText = c)
            : "class" == d
            ? (a.className = c)
            : "for" == d
            ? (a.htmlFor = c)
            : Ig.hasOwnProperty(d)
            ? a.setAttribute(Ig[d], c)
            : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0)
            ? a.setAttribute(d, c)
            : (a[d] = c);
        });
      },
      Ig = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width",
      },
      Lg = function (a) {
        a = a.document;
        a = Kg(a) ? a.documentElement : a.body;
        return new A(a.clientWidth, a.clientHeight);
      },
      Mg = function (a) {
        var b = a.scrollingElement
          ? a.scrollingElement
          : !vc && Kg(a)
          ? a.documentElement
          : a.body || a.documentElement;
        a = a.parentWindow || a.defaultView;
        return sc && a.pageYOffset != b.scrollTop
          ? new tg(b.scrollLeft, b.scrollTop)
          : new tg(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
      },
      C = function (a) {
        return a ? a.parentWindow || a.defaultView : window;
      },
      Pg = function (a, b, c) {
        var d = arguments,
          e = document,
          f = d[1],
          g = Ng(e, String(d[0]));
        f &&
          ("string" === typeof f
            ? (g.className = f)
            : Array.isArray(f)
            ? (g.className = f.join(" "))
            : Jg(g, f));
        2 < d.length && Og(e, g, d, 2);
        return g;
      },
      Og = function (a, b, c, d) {
        function e(h) {
          h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h);
        }
        for (; d < c.length; d++) {
          var f = c[d];
          if (!Ta(f) || (Ua(f) && 0 < f.nodeType)) e(f);
          else {
            a: {
              if (f && "number" == typeof f.length) {
                if (Ua(f)) {
                  var g =
                    "function" == typeof f.item || "string" == typeof f.item;
                  break a;
                }
                if ("function" === typeof f) {
                  g = "function" == typeof f.item;
                  break a;
                }
              }
              g = !1;
            }
            Ub(g ? hc(f) : f, e);
          }
        }
      },
      Ng = function (a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b);
      },
      Kg = function (a) {
        return "CSS1Compat" == a.compatMode;
      },
      Qg = function (a) {
        a && a.parentNode && a.parentNode.removeChild(a);
      },
      Rg = function (a) {
        var b;
        if (Lf && (b = a.parentElement)) return b;
        b = a.parentNode;
        return Ua(b) && 1 == b.nodeType ? b : null;
      },
      Sg = function (a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
          return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; ) b = b.parentNode;
        return b == a;
      },
      Fg = function (a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document;
      },
      Tg = function (a) {
        try {
          return (
            a.contentWindow || (a.contentDocument ? C(a.contentDocument) : null)
          );
        } catch (b) {}
        return null;
      },
      Ug = function (a, b) {
        a && (a = a.parentNode);
        for (var c = 0; a; ) {
          if (b(a)) return a;
          a = a.parentNode;
          c++;
        }
        return null;
      },
      Eg = function (a) {
        this.g = a || w.document || document;
      };
    Eg.prototype.getElementsByTagName = function (a, b) {
      return (b || this.g).getElementsByTagName(String(a));
    };
    Eg.prototype.appendChild = function (a, b) {
      a.appendChild(b);
    };
    Eg.prototype.append = function (a, b) {
      Og(Fg(a), a, arguments, 1);
    };
    Eg.prototype.canHaveChildren = function (a) {
      if (1 != a.nodeType) return !1;
      switch (a.tagName) {
        case "APPLET":
        case "AREA":
        case "BASE":
        case "BR":
        case "COL":
        case "COMMAND":
        case "EMBED":
        case "FRAME":
        case "HR":
        case "IMG":
        case "INPUT":
        case "IFRAME":
        case "ISINDEX":
        case "KEYGEN":
        case "LINK":
        case "NOFRAMES":
        case "NOSCRIPT":
        case "META":
        case "OBJECT":
        case "PARAM":
        case "SCRIPT":
        case "SOURCE":
        case "STYLE":
        case "TRACK":
        case "WBR":
          return !1;
      }
      return !0;
    };
    var Wg = function () {
        return Bb && Fb
          ? Fb.mobile
          : !Vg() && (z("iPod") || z("iPhone") || z("Android") || z("IEMobile"));
      },
      Vg = function () {
        return Bb && Fb
          ? !Fb.mobile && (z("iPad") || z("Android") || z("Silk"))
          : z("iPad") || (z("Android") && !z("Mobile")) || z("Silk");
      };
    var Xg = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
      ),
      Yg = function (a) {
        var b = a.match(Xg);
        a = b[1];
        var c = b[3];
        b = b[4];
        var d = "";
        a && (d += a + ":");
        c && ((d = d + "//" + c), b && (d += ":" + b));
        return d;
      },
      Zg = function (a, b) {
        if (a) {
          a = a.split("&");
          for (var c = 0; c < a.length; c++) {
            var d = a[c].indexOf("="),
              e = null;
            if (0 <= d) {
              var f = a[c].substring(0, d);
              e = a[c].substring(d + 1);
            } else f = a[c];
            b(f, e ? ug(e) : "");
          }
        }
      },
      $g = /#|$/,
      ah = function (a, b) {
        var c = a.search($g);
        a: {
          var d = 0;
          for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c; ) {
            var f = a.charCodeAt(d - 1);
            if (38 == f || 63 == f)
              if (
                ((f = a.charCodeAt(d + e)), !f || 61 == f || 38 == f || 35 == f)
              )
                break a;
            d += e + 1;
          }
          d = -1;
        }
        if (0 > d) return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c) e = c;
        d += b.length + 1;
        return ug(a.slice(d, -1 !== e ? e : 0));
      };
    var bh = function (a) {
      var b = [],
        c = [],
        d = {},
        e = function (f, g) {
          var h = g + "  ";
          try {
            if (void 0 === f) b.push("undefined");
            else if (null === f) b.push("NULL");
            else if ("string" === typeof f)
              b.push('"' + f.replace(/\n/g, "\n" + g) + '"');
            else if ("function" === typeof f)
              b.push(String(f).replace(/\n/g, "\n" + g));
            else if (Ua(f)) {
              f[Va] || c.push(f);
              var k = Xa(f);
              if (d[k]) b.push("*** reference loop detected (id=" + k + ") ***");
              else {
                d[k] = !0;
                b.push("{");
                for (var n in f)
                  "function" !== typeof f[n] &&
                    (b.push("\n"), b.push(h), b.push(n + " = "), e(f[n], h));
                b.push("\n" + g + "}");
                delete d[k];
              }
            } else b.push(f);
          } catch (m) {
            b.push("*** " + m + " ***");
          }
        };
      e(a, "");
      for (a = 0; a < c.length; a++) Ya(c[a]);
      return b.join("");
    }; /*
  
   SPDX-License-Identifier: Apache-2.0
  */
    var ch = "function" === typeof URL;
    function dh(a, b) {
      if (1 === a.nodeType) {
        var c = a.tagName;
        if ("SCRIPT" === c || "STYLE" === c) throw Error("");
      }
      a.innerHTML = rg(b);
    }
    function eh(a, b) {
      a.src =
        b instanceof dg && b.constructor === dg
          ? b.g
          : "type_error:TrustedResourceUrl";
      var c, d;
      (c = (b =
        null ==
        (d = (c = ((a.ownerDocument && a.ownerDocument.defaultView) || window)
          .document).querySelector)
          ? void 0
          : d.call(c, "script[nonce]"))
        ? b.nonce || b.getAttribute("nonce") || ""
        : "") && a.setAttribute("nonce", c);
    }
    function fh(a, b) {
      a.write(rg(b));
    }
    var gh = function (a) {
      this.Hf = a;
    };
    function hh(a) {
      return new gh(function (b) {
        return b.substr(0, a.length + 1).toLowerCase() === a + ":";
      });
    }
    var ih = [
      hh("data"),
      hh("http"),
      hh("https"),
      hh("mailto"),
      hh("ftp"),
      new gh(function (a) {
        return /^[^:]*([/?#]|$)/.test(a);
      }),
    ];
    function jh(a) {
      if ("undefined" !== typeof MediaSource && a instanceof MediaSource)
        return new jg(URL.createObjectURL(a), kg);
      var b = a.type.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i);
      if (
        2 !== (null == b ? void 0 : b.length) ||
        !(
          /^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon|heic|heif|avif|x-ms-bmp)$/i.test(
            b[1]
          ) ||
          /^video\/(?:mpeg|mp4|ogg|webm|x-matroska|quicktime|x-ms-wmv)$/i.test(
            b[1]
          ) ||
          /^audio\/(?:3gpp2|3gpp|aac|amr|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)$/i.test(
            b[1]
          ) ||
          /^font\/\w+/i.test(b[1])
        )
      )
        throw Error("");
      return new jg(URL.createObjectURL(a), kg);
    }
    var kh = function (a) {
        try {
          return !!a && null != a.location.href && nc(a, "foo");
        } catch (b) {
          return !1;
        }
      },
      mh = function (a) {
        var b = void 0 === b ? !1 : b;
        var c = void 0 === c ? w : c;
        for (var d = 0; c && 40 > d++ && ((!b && !kh(c)) || !a(c)); ) c = lh(c);
      },
      nh = function () {
        var a = window;
        mh(function (b) {
          a = b;
          return !1;
        });
        return a;
      },
      lh = function (a) {
        try {
          var b = a.parent;
          if (b && b != a) return b;
        } catch (c) {}
        return null;
      },
      oh = function () {
        var a = window;
        return kh(a.top) ? a.top : null;
      },
      ph = function () {
        if (!globalThis.crypto) return Math.random();
        try {
          var a = new Uint32Array(1);
          globalThis.crypto.getRandomValues(a);
          return a[0] / 65536 / 65536;
        } catch (b) {
          return Math.random();
        }
      },
      qh = function (a, b) {
        if (a)
          for (var c in a)
            Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a);
      },
      rh = function (a) {
        var b = a.length;
        if (0 == b) return 0;
        for (var c = 305419896, d = 0; d < b; d++)
          c ^= ((c << 5) + (c >> 2) + a.charCodeAt(d)) & 4294967295;
        return 0 < c ? c : 4294967296 + c;
      };
    function sh(a) {
      var b, c;
      return null !=
        (c = null == (b = /https?:\/\/[^\/]+/.exec(a)) ? void 0 : b[0])
        ? c
        : "";
    }
    var th = function () {
        var a = w;
        try {
          for (var b = null; b != a; b = a, a = a.parent)
            switch (a.location.protocol) {
              case "https:":
                return !0;
              case "file:":
                return !0;
              case "http:":
                return !1;
            }
        } catch (c) {}
        return !0;
      },
      uh = function (a, b) {
        try {
          return !(!a.frames || !a.frames[b]);
        } catch (c) {
          return !1;
        }
      },
      vh = function (a, b) {
        for (var c = 0; 50 > c; ++c) {
          if (uh(a, b)) return a;
          if (!(a = lh(a))) break;
        }
        return null;
      },
      wh = function (a, b) {
        b = void 0 === b ? document : b;
        return b.createElement(String(a).toLowerCase());
      },
      xh = function (a) {
        for (var b = a; a && a != a.parent; ) (a = a.parent), kh(a) && (b = a);
        return b;
      };
    var D = function (a, b, c, d) {
      this.top = a;
      this.right = b;
      this.bottom = c;
      this.left = d;
    };
    D.prototype.getWidth = function () {
      return this.right - this.left;
    };
    D.prototype.getHeight = function () {
      return this.bottom - this.top;
    };
    var yh = function (a) {
      return new D(a.top, a.right, a.bottom, a.left);
    };
    D.prototype.expand = function (a, b, c, d) {
      Ua(a)
        ? ((this.top -= a.top),
          (this.right += a.right),
          (this.bottom += a.bottom),
          (this.left -= a.left))
        : ((this.top -= a),
          (this.right += Number(b)),
          (this.bottom += Number(c)),
          (this.left -= Number(d)));
      return this;
    };
    D.prototype.ceil = function () {
      this.top = Math.ceil(this.top);
      this.right = Math.ceil(this.right);
      this.bottom = Math.ceil(this.bottom);
      this.left = Math.ceil(this.left);
      return this;
    };
    D.prototype.floor = function () {
      this.top = Math.floor(this.top);
      this.right = Math.floor(this.right);
      this.bottom = Math.floor(this.bottom);
      this.left = Math.floor(this.left);
      return this;
    };
    D.prototype.round = function () {
      this.top = Math.round(this.top);
      this.right = Math.round(this.right);
      this.bottom = Math.round(this.bottom);
      this.left = Math.round(this.left);
      return this;
    };
    var zh = function (a, b, c) {
      b instanceof tg
        ? ((a.left += b.x), (a.right += b.x), (a.top += b.y), (a.bottom += b.y))
        : ((a.left += b),
          (a.right += b),
          "number" === typeof c && ((a.top += c), (a.bottom += c)));
      return a;
    };
    var Ah = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d;
      },
      Bh = function (a) {
        return new D(a.top, a.left + a.width, a.top + a.height, a.left);
      };
    Ah.prototype.getSize = function () {
      return new A(this.width, this.height);
    };
    Ah.prototype.ceil = function () {
      this.left = Math.ceil(this.left);
      this.top = Math.ceil(this.top);
      this.width = Math.ceil(this.width);
      this.height = Math.ceil(this.height);
      return this;
    };
    Ah.prototype.floor = function () {
      this.left = Math.floor(this.left);
      this.top = Math.floor(this.top);
      this.width = Math.floor(this.width);
      this.height = Math.floor(this.height);
      return this;
    };
    Ah.prototype.round = function () {
      this.left = Math.round(this.left);
      this.top = Math.round(this.top);
      this.width = Math.round(this.width);
      this.height = Math.round(this.height);
      return this;
    };
    function Ch(a) {
      a = void 0 === a ? w : a;
      var b = a.context || a.AMP_CONTEXT_DATA;
      if (!b)
        try {
          b = a.parent.context || a.parent.AMP_CONTEXT_DATA;
        } catch (e) {}
      var c, d;
      return (null == (c = b) ? 0 : c.pageViewId) &&
        (null == (d = b) ? 0 : d.canonicalUrl)
        ? b
        : null;
    }
    var Dh = [
      "A9AxgGSwmnfgzzkyJHILUr3H8nJ/3D+57oAsL4DBt4USlng4jZ0weq+fZtHC/Qwwn6gd4QSa5DzT3OBif+kXVA0AAAB4eyJvcmlnaW4iOiJodHRwczovL2ltYXNkay5nb29nbGVhcGlzLmNvbTo0NDMiLCJmZWF0dXJlIjoiUHJpdmFjeVNhbmRib3hBZHNBUElzIiwiZXhwaXJ5IjoxNjk1MTY3OTk5LCJpc1RoaXJkUGFydHkiOnRydWV9",
      "As0hBNJ8h++fNYlkq8cTye2qDLyom8NddByiVytXGGD0YVE+2CEuTCpqXMDxdhOMILKoaiaYifwEvCRlJ/9GcQ8AAAB8eyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiV2ViVmlld1hSZXF1ZXN0ZWRXaXRoRGVwcmVjYXRpb24iLCJleHBpcnkiOjE3MTk1MzI3OTksImlzU3ViZG9tYWluIjp0cnVlfQ==",
    ];
    function Eh() {
      var a = void 0 === a ? document : a;
      var b;
      return !(
        null == (b = a.featurePolicy) ||
        !b.features().includes("attribution-reporting")
      );
    }
    var Fh = function () {
        this.S = {};
      },
      Gh = function () {
        var a = Ch(window);
        if (a) {
          if (a) {
            var b = a.pageViewId;
            a = a.clientId;
            "string" === typeof a && (b += a.replace(/\D/g, "").substr(0, 6));
          } else b = null;
          return +b;
        }
        b = xh(window);
        (a = b.google_global_correlator) ||
          (b.google_global_correlator = a =
            1 + Math.floor(Math.random() * Math.pow(2, 43)));
        return a;
      },
      Ih = function (a, b) {
        var c = Hh[7] || "google_ps_7";
        a = a.S;
        var d = a[c];
        return void 0 === d ? ((a[c] = b()), a[c]) : d;
      },
      Jh = function (a) {
        var b = Gh();
        return Ih(a, function () {
          return b;
        });
      },
      Lh = function () {
        if (Kh) var a = Kh;
        else {
          a =
            ((a = void 0 === a ? Ch() : a)
              ? kh(a.master)
                ? a.master
                : null
              : null) || window;
          var b = a.google_persistent_state_async;
          a =
            null != b &&
            "object" == typeof b &&
            null != b.S &&
            "object" == typeof b.S
              ? (Kh = b)
              : (a.google_persistent_state_async = Kh = new Fh());
        }
        return Jh(a);
      },
      Kh = null,
      Mh = {},
      Hh =
        ((Mh[8] = "google_prev_ad_formats_by_region"),
        (Mh[9] = "google_prev_ad_slotnames_by_region"),
        Mh);
    var Oh = function (a, b, c, d, e) {
      Nh(
        a,
        b,
        void 0 === c ? null : c,
        void 0 === d ? !1 : d,
        void 0 === e ? !1 : e
      );
    };
    function Nh(a, b, c, d, e) {
      e = void 0 === e ? !1 : e;
      a.google_image_requests || (a.google_image_requests = []);
      var f = wh("IMG", a.document);
      if (c || d) {
        var g = function (h) {
          c && c(h);
          d && dc(a.google_image_requests, f);
          Kf(f, "load", g);
          Kf(f, "error", g);
        };
        Jf(f, "load", g);
        Jf(f, "error", g);
      }
      e && (f.attributionSrc = "");
      f.src = b;
      a.google_image_requests.push(f);
    }
    var Qh = function (a, b) {
        var c = void 0 === c ? !1 : c;
        var d = "https://pagead2.googlesyndication.com/pagead/gen_204?id=" + b;
        qh(a, function (e, f) {
          if (e || 0 === e) d += "&" + f + "=" + encodeURIComponent("" + e);
        });
        Ph(d, c);
      },
      Ph = function (a, b) {
        var c = window;
        b = void 0 === b ? !1 : b;
        var d = void 0 === d ? !1 : d;
        c.fetch
          ? ((b = {
              keepalive: !0,
              credentials: "include",
              redirect: "follow",
              method: "get",
              mode: "no-cors",
            }),
            d &&
              ((b.mode = "cors"),
              "setAttributionReporting" in XMLHttpRequest.prototype
                ? (b.attributionReporting = {
                    eventSourceEligible: "true",
                    triggerEligible: "false",
                  })
                : (b.headers = {
                    "Attribution-Reporting-Eligible": "event-source",
                  })),
            c.fetch(a, b))
          : Oh(c, a, void 0, b, d);
      };
    var Rh = function (a, b, c) {
        c = void 0 === c ? {} : c;
        this.error = a;
        this.context = b.context;
        this.msg = b.message || "";
        this.id = b.id || "jserror";
        this.meta = c;
      },
      Sh = function (a) {
        return !!(a.error && a.meta && a.id);
      };
    function Th(a) {
      var b = Ma.apply(1, arguments);
      if (0 === b.length) return gg(a[0]);
      for (var c = a[0], d = 0; d < b.length; d++)
        c += encodeURIComponent(b[d]) + a[d + 1];
      return gg(c);
    }
    var Uh = fa(["https://pagead2.googlesyndication.com/pagead/js/err_rep.js"]),
      Vh = function () {
        var a = void 0 === a ? "jserror" : a;
        var b = void 0 === b ? 0.01 : b;
        var c = void 0 === c ? Th(Uh) : c;
        this.h = a;
        this.j = !1;
        this.g = null;
        this.o = !1;
        this.B = Math.random();
        this.l = b;
        this.A = this.Sa;
        this.H = c;
      };
    l = Vh.prototype;
    l.yd = function (a) {
      this.h = a;
    };
    l.Nc = function (a) {
      this.g = a;
    };
    l.zd = function (a) {
      this.j = a;
    };
    l.Bd = function (a) {
      this.o = a;
    };
    l.Sa = function (a, b, c, d, e) {
      c = void 0 === c ? this.l : c;
      e = void 0 === e ? this.h : e;
      if ((this.o ? this.B : Math.random()) > c) return this.j;
      Sh(b) || (b = new Rh(b, { context: a, id: e }));
      if (d || this.g) (b.meta = {}), this.g && this.g(b.meta), d && d(b.meta);
      w.google_js_errors = w.google_js_errors || [];
      w.google_js_errors.push(b);
      w.error_rep_loaded ||
        ((b = w.document),
        (a = wh("SCRIPT", b)),
        eh(a, this.H),
        (b = b.getElementsByTagName("script")[0]) &&
          b.parentNode &&
          b.parentNode.insertBefore(a, b),
        (w.error_rep_loaded = !0));
      return this.j;
    };
    l.ob = function (a, b, c) {
      try {
        return b();
      } catch (d) {
        if (!this.A(a, d, this.l, c, this.h)) throw d;
      }
    };
    l.rd = function (a, b, c, d) {
      var e = this;
      return function () {
        var f = Ma.apply(0, arguments);
        return e.ob(
          a,
          function () {
            return b.apply(c, f);
          },
          d
        );
      };
    };
    var Wh = function (a) {
        return a.prerendering
          ? 3
          : { visible: 1, hidden: 2, prerender: 3, preview: 4, unloaded: 5 }[
              a.visibilityState ||
                a.webkitVisibilityState ||
                a.mozVisibilityState ||
                ""
            ] || 0;
      },
      Xh = function (a) {
        var b;
        a.visibilityState
          ? (b = "visibilitychange")
          : a.mozVisibilityState
          ? (b = "mozvisibilitychange")
          : a.webkitVisibilityState && (b = "webkitvisibilitychange");
        return b;
      };
    var Yh = null;
    function Zh() {
      var a = void 0 === a ? w : a;
      return (a = a.performance) && a.now && a.timing
        ? Math.floor(a.now() + a.timing.navigationStart)
        : Date.now();
    }
    function $h() {
      var a = void 0 === a ? w : a;
      return (a = a.performance) && a.now ? a.now() : null;
    }
    function ai(a, b) {
      b = void 0 === b ? w : b;
      var c, d;
      return (
        (null == (c = b.performance)
          ? void 0
          : null == (d = c.timing)
          ? void 0
          : d[a]) || 0
      );
    }
    function bi() {
      var a = void 0 === a ? w : a;
      var b = Math.min(
        ai("domLoading", a) || Infinity,
        ai("domInteractive", a) || Infinity
      );
      return Infinity === b
        ? Math.max(ai("responseEnd", a), ai("navigationStart", a))
        : b;
    }
    var ci = function (a, b, c, d) {
      this.label = a;
      this.type = b;
      this.value = c;
      this.duration = void 0 === d ? 0 : d;
      this.taskId = this.slotId = void 0;
      this.uniqueId = Math.random();
    };
    var di = w.performance,
      ei = !!(di && di.mark && di.measure && di.clearMarks),
      fi = Ef(function () {
        var a;
        if ((a = ei)) {
          var b;
          if (null === Yh) {
            Yh = "";
            try {
              a = "";
              try {
                a = w.top.location.hash;
              } catch (c) {
                a = w.location.hash;
              }
              a && (Yh = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "");
            } catch (c) {}
          }
          b = Yh;
          a = !!b.indexOf && 0 <= b.indexOf("1337");
        }
        return a;
      }),
      gi = function (a, b) {
        this.A = [];
        this.g = b || w;
        var c = null;
        b &&
          ((b.google_js_reporting_queue = b.google_js_reporting_queue || []),
          (this.A = b.google_js_reporting_queue),
          (c = b.google_measure_js_timing));
        this.j = fi() || (null != c ? c : Math.random() < a);
      };
    gi.prototype.B = function () {
      this.j = !1;
      this.A != this.g.google_js_reporting_queue &&
        (fi() && Ub(this.A, hi), (this.A.length = 0));
    };
    gi.prototype.H = function (a) {
      !this.j || 2048 < this.A.length || this.A.push(a);
    };
    var hi = function (a) {
      a &&
        di &&
        fi() &&
        (di.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_start"),
        di.clearMarks("goog_" + a.label + "_" + a.uniqueId + "_end"));
    };
    gi.prototype.start = function (a, b) {
      if (!this.j) return null;
      a = new ci(a, b, $h() || Zh());
      b = "goog_" + a.label + "_" + a.uniqueId + "_start";
      di && fi() && di.mark(b);
      return a;
    };
    gi.prototype.end = function (a) {
      if (this.j && "number" === typeof a.value) {
        a.duration = ($h() || Zh()) - a.value;
        var b = "goog_" + a.label + "_" + a.uniqueId + "_end";
        di && fi() && di.mark(b);
        this.H(a);
      }
    };
    var ii = function (a) {
      a = a._google_rum_ns_ = a._google_rum_ns_ || {};
      return (a.pq = a.pq || []);
    };
    function ji(a, b, c) {
      qh(b, function (d, e) {
        var f = c && c[e];
        (!d && 0 !== d) ||
          f ||
          ((a +=
            "&" + encodeURIComponent(e) + "=" + encodeURIComponent(String(d))),
          c && (c[e] = !0));
      });
      return a;
    }
    var pi = function (a, b, c, d, e, f, g, h) {
      f = void 0 === f ? Infinity : f;
      g = void 0 === g ? !1 : g;
      gi.call(this, a, h);
      var k = this;
      this.I = b;
      this.domain = c;
      this.path = d;
      this.V = e;
      this.K = 0;
      this.l = {};
      this.G = {};
      this.aa = [];
      this.report = {};
      this.h = 0;
      this.F = [];
      this.J = f;
      this.I = b;
      this.domain = c;
      this.path = d;
      this.V = e;
      a = this.g.navigator;
      this.Z = !("csi.gstatic.com" !== this.domain || !a || !a.sendBeacon);
      (this.g.performance && this.g.performance.now) || ki(this, "dat", 1);
      a && a.deviceMemory && ki(this, "dmc", a.deviceMemory);
      this.g === this.g.top && ki(this, "top", 1);
      this.X = !g;
      this.N = function () {
        k.g.setTimeout(function () {
          li(k);
        }, 1100);
      };
      this.U = function () {
        ki(k, "uet", 2);
        for (var m = t(k.aa), p = m.next(); !p.done; p = m.next()) {
          p = p.value;
          try {
            p();
          } catch (r) {}
        }
        m = k.g;
        var u = void 0 === u ? {} : u;
        "function" === typeof window.CustomEvent
          ? (p = new CustomEvent("rum_blp", u))
          : ((p = document.createEvent("CustomEvent")),
            p.initCustomEvent("rum_blp", !!u.bubbles, !!u.cancelable, u.detail));
        m.dispatchEvent(p);
        li(k);
        null != k.l.uet && ((k.o -= 3 + k.l.uet.length + 2), delete k.l.uet);
      };
      this.ga = Gf(function () {
        li(k);
      });
      this.ba = function () {
        var m = k.g.document;
        (null != m.hidden
          ? m.hidden
          : null != m.mozHidden
          ? m.mozHidden
          : null != m.webkitHidden && m.webkitHidden) && k.ga();
      };
      this.D = this.g.setTimeout(function () {
        li(k);
      }, 5e3);
      this.o = b.length + c.length + d.length + e.length + 3;
      Ub(this.A, function (m) {
        mi(k, m);
      });
      b = ii(this.g);
      var n = function () {
        var m = Ma.apply(0, arguments)[0],
          p = m[0];
        m = m[1];
        var u = p.length + m.length + 2;
        8e3 < k.o + k.h + u && li(k);
        k.F.push([p, m]);
        k.h += u;
        ni(k);
        return 0;
      };
      Ub(b, function (m) {
        return n(m);
      });
      b.length = 0;
      b.push = n;
      ki(this, "puid", (this.K + 1).toString(36) + "~" + Date.now().toString(36));
      oi(this);
    };
    v(pi, gi);
    var oi = function (a) {
        "complete" === a.g.document.readyState
          ? a.g.setTimeout(function () {
              li(a);
            }, 0)
          : Jf(a.g, "load", a.N);
        var b = Xh(a.g.document);
        "undefined" !== typeof b && Jf(a.g, b, a.ba);
        Jf(a.g, "pagehide", a.U);
      },
      ki = function (a, b, c) {
        c = String(c);
        a.o =
          null != a.l[b]
            ? a.o + (c.length - a.l[b].length)
            : a.o + (b.length + c.length + 2);
        a.l[b] = c;
      },
      si = function (a, b, c, d, e) {
        e = void 0 === e ? "" : e;
        var f = qi(a, b, c, d, e);
        8e3 < a.o + a.h + f && (li(a), (f = b.length + c.length + 2));
        ri(a, b, c, d, e);
        a.h += f;
        ni(a);
      },
      qi = function (a, b, c, d, e) {
        return null == a.report[b]
          ? b.length + c.length + 2
          : d
          ? c.length + (void 0 === e ? "" : e).length
          : c.length - a.report[b].length;
      },
      ri = function (a, b, c, d, e) {
        a.report[b] =
          d && null != a.report[b]
            ? a.report[b] + ("" + (void 0 === e ? "" : e) + c)
            : c;
      },
      ni = function (a) {
        6e3 <= a.o + a.h && li(a);
      },
      li = function (a) {
        if (a.j && a.X) {
          try {
            a.h && (a.sendBeacon(a.report), a.K === a.J && a.B());
          } catch (b) {
            new Vh().Sa(358, b);
          }
          a.report = {};
          a.h = 0;
          a.A.length = 0;
          a.g.clearTimeout(a.D);
          a.D = 0;
        }
      },
      ti = function (a, b) {
        var c = a.I + "//" + a.domain + a.path + a.V,
          d = {};
        c = ji(c, a.l, d);
        c = ji(c, b, d);
        b = a.g;
        b.google_timing_params &&
          ((c = ji(c, b.google_timing_params, d)),
          (b.google_timing_params = void 0));
        Ub(a.F, function (e) {
          var f = t(e);
          e = f.next().value;
          f = f.next().value;
          var g = {};
          c = ji(c, ((g[e] = f), g));
        });
        a.F.length = 0;
        return c;
      };
    pi.prototype.sendBeacon = function (a) {
      this.K++;
      a = ti(this, a);
      var b = !1;
      try {
        b = !!(
          this.Z &&
          this.g.navigator &&
          this.g.navigator.sendBeacon(a, null)
        );
      } catch (c) {
        this.Z = !1;
      }
      b || Oh(this.g, a);
      ki(this, "puid", (this.K + 1).toString(36) + "~" + Date.now().toString(36));
    };
    var mi = function (a, b) {
      var c = "met." + b.type,
        d =
          "number" === typeof b.value
            ? Math.round(b.value).toString(36)
            : b.value,
        e = Math.round(b.duration);
      b =
        "" +
        b.label +
        (null != b.slotId ? "_" + b.slotId : "") +
        ("." + d) +
        (0 < e ? "_" + e.toString(36) : "") +
        (null != b.taskId ? "__" + Math.round(b.taskId).toString(36) : "");
      si(a, c, b, !0, "~");
    };
    pi.prototype.H = function (a) {
      this.j && this.K < this.J && (gi.prototype.H.call(this, a), mi(this, a));
    };
    pi.prototype.B = function () {
      gi.prototype.B.call(this);
      this.g.clearTimeout(this.D);
      this.h = this.D = 0;
      this.report = {};
      Yf(this.G);
      Yf(this.l);
      Kf(this.g, "load", this.N);
      Kf(this.g, "pagehide", this.U);
    };
    var E = function (a) {
      var b = "lb";
      if (a.lb && a.hasOwnProperty(b)) return a.lb;
      b = new a();
      return (a.lb = b);
    };
    var F = function () {
        this.g = new pi(
          1,
          "https:",
          "csi.gstatic.com",
          "/csi?v=2&s=",
          "ima",
          void 0,
          !0
        );
        var a = Lh();
        null != a && ki(this.g, "c", a);
        a = parseInt(this.g.l.c, 10) / 2;
        null != a && ki(this.g, "slotId", a);
      },
      G = function (a, b, c) {
        if (null != c) {
          a = a.g;
          var d = b + "=" + c;
          a.G[d] || (si(a, b, c, !1), 1e3 > d.length && (a.G[d] = !0));
        }
      },
      ui = function (a, b) {
        for (var c in b)
          b[c] =
            "object" === typeof b[c]
              ? encodeURIComponent(JSON.stringify(b[c]))
              : encodeURIComponent(String(b[c]));
        a = a.g;
        var d = !1;
        c = 0;
        for (var e = t(Object.keys(b)), f = e.next(); !f.done; f = e.next())
          (f = f.value),
            null != a.report[f] && (d = !0),
            (c += qi(a, f, b[f], !1));
        (8e3 < a.o + a.h + c || d) && li(a);
        d = t(Object.keys(b));
        for (f = d.next(); !f.done; f = d.next())
          (e = f.value), ri(a, e, b[e], !1);
        a.h += c;
        ni(a);
      },
      vi = function (a) {
        var b = F.g().g;
        b.j && b.H(new ci(a, 4, Zh() - 0, 0));
      };
    F.prototype.recordClick = function (a, b, c, d) {
      for (
        var e = !1, f = "notag";
        void 0 != d && d != document.documentElement;
  
      ) {
        var g = void 0,
          h = void 0;
        if (
          (null == (g = d) ? 0 : g.getAttribute("data-ck-navigates")) ||
          (null == (h = d) ? 0 : h.getAttribute("data-ck-tag"))
        ) {
          g = f = void 0;
          e =
            null !=
            (g = null == (f = d) ? void 0 : f.getAttribute("data-ck-navigates"))
              ? g
              : !1;
          h = g = void 0;
          f =
            null != (h = null == (g = d) ? void 0 : g.getAttribute("data-ck-tag"))
              ? h
              : "notag";
          break;
        }
        g = void 0;
        d = null != (g = d.parentElement) ? g : void 0;
      }
      d = this.g;
      d.j && d.H(new ci(a + "_" + b + "x" + c + "|" + e + "|" + f, 4, Zh(), 0));
    };
    F.g = function () {
      return E(F);
    };
    var wi = function (a) {
        return /^\s*$/.test(a)
          ? !1
          : /^[\],:{}\s\u2028\u2029]*$/.test(
              a
                .replace(/\\["\\\/bfnrtu]/g, "@")
                .replace(
                  /(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")
            );
      },
      xi = function (a) {
        try {
          return w.JSON.parse(a);
        } catch (b) {}
        a = String(a);
        if (wi(a))
          try {
            return eval("(" + a + ")");
          } catch (b) {}
        throw Error("Invalid JSON string: " + a);
      },
      zi = function () {
        this.g = yi;
      },
      Ai = function (a, b, c) {
        if (null == b) c.push("null");
        else {
          if ("object" == typeof b) {
            if (Array.isArray(b)) {
              var d = b;
              b = d.length;
              c.push("[");
              for (var e = "", f = 0; f < b; f++)
                c.push(e),
                  (e = d[f]),
                  Ai(a, a.g ? a.g.call(d, String(f), e) : e, c),
                  (e = ",");
              c.push("]");
              return;
            }
            if (
              b instanceof String ||
              b instanceof Number ||
              b instanceof Boolean
            )
              b = b.valueOf();
            else {
              c.push("{");
              f = "";
              for (d in b)
                Object.prototype.hasOwnProperty.call(b, d) &&
                  ((e = b[d]),
                  "function" != typeof e &&
                    (c.push(f),
                    Bi(d, c),
                    c.push(":"),
                    Ai(a, a.g ? a.g.call(b, d, e) : e, c),
                    (f = ",")));
              c.push("}");
              return;
            }
          }
          switch (typeof b) {
            case "string":
              Bi(b, c);
              break;
            case "number":
              c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
              break;
            case "boolean":
              c.push(String(b));
              break;
            case "function":
              c.push("null");
              break;
            default:
              throw Error("Unknown type: " + typeof b);
          }
        }
      },
      Ci = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\v": "\\u000b",
      },
      Di = /\uffff/.test("\uffff")
        ? /[\\"\x00-\x1f\x7f-\uffff]/g
        : /[\\"\x00-\x1f\x7f-\xff]/g,
      Bi = function (a, b) {
        b.push(
          '"',
          a.replace(Di, function (c) {
            var d = Ci[c];
            d ||
              ((d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).slice(1)),
              (Ci[c] = d));
            return d;
          }),
          '"'
        );
      };
    var Ei = function () {
        this.j = null;
        this.g = "missing-id";
        this.h = !1;
      },
      Gi = function (a) {
        var b = null;
        try {
          b = document.getElementsByClassName("lima-exp-data");
        } catch (c) {
          return Fi("missing-element", a.g), null;
        }
        if (1 < b.length) return Fi("multiple-elements", a.g), null;
        b = b[0];
        return b ? b.innerHTML : (Fi("missing-element", a.g), null);
      },
      Ii = function () {
        var a = Hi,
          b = Gi(a);
        if (null !== b)
          if (wi(b)) {
            var c = JSON.parse(b);
            b = c.experimentIds;
            var d = c.binaryIdentifier;
            c = c.adEventId;
            var e = "string" === typeof d;
            if ("string" == typeof c) {
              var f = F.g();
              null != c && ki(f.g, "qqid", c);
            }
            e && (a.g = d);
            "string" !== typeof b
              ? Fi("missing-flags", a.g)
              : (e || Fi("missing-binary-id", a.g), (a.j = b));
          } else Fi("invalid-json", a.g);
      };
    Ei.prototype.reset = function () {
      this.j = null;
      this.g = "missing-id";
    };
    var Ki = function (a, b, c, d, e) {
        this.id = a;
        this.C = b;
        this.o = c;
        this.g = !1;
        this.j = d;
        this.h = e;
        this.o && Ji(this);
      },
      H = function (a) {
        return a.g || a.o;
      },
      Ji = function (a) {
        if (a.j && a.h) {
          var b = a.j;
          b && Object.assign(a.h.g, b);
        }
      },
      Li = function () {
        this.g = [];
      },
      Mi = function () {
        this.g = new Map();
        this.h = !1;
        this.l = new Li();
        this.A = new Ki(0, 0, !1);
        this.j = [this.l];
        this.o = new Cf();
      },
      I = function (a) {
        var b = Ni;
        if (
          b.h ||
          b.g.has(a.id) ||
          (null == a.C && null == a.control) ||
          0 == a.ff
        )
          return b.A;
        var c = b.l;
        if (null != a.control)
          for (var d = t(b.j), e = d.next(); !e.done; e = d.next()) {
            if (((e = e.value), e.g.includes(a.control))) {
              c = e;
              break;
            }
          }
        else null != a.M && (c = a.M);
        d = 0;
        null != a.control ? (d = a.control.C) : null != a.C && (d = a.C);
        a = new Ki(a.id, d, !!a.bi, a.flags, b.o);
        c.g.push(a);
        b.j.includes(c) || b.j.push(c);
        b.g.set(a.id, a);
        return a;
      },
      Oi = function () {
        var a = Ni;
        return [].concat(ia(a.g.keys())).filter(function (b) {
          return H(this.g.get(b));
        }, a);
      },
      Pi = function (a) {
        var b = Ni;
        b.h || (a.g(b.j, b.g), (b.h = !0));
      };
    Mi.prototype.reset = function () {
      for (var a = t(this.g), b = a.next(); !b.done; b = a.next())
        (b = t(b.value)), b.next(), (b.next().value.g = !1);
      this.h = !1;
      this.o.reset();
    };
    var Ni = new Mi(),
      Ri = function () {
        return Qi.g
          .filter(function (a) {
            return H(a);
          })
          .map(function (a) {
            return a.id;
          });
      };
    var Si = function () {};
    Si.prototype.g = function (a) {
      a = t(a);
      for (var b = a.next(); !b.done; b = a.next()) {
        var c = 0,
          d = Math.floor(1e3 * Math.random());
        b = t(b.value.g);
        for (var e = b.next(); !e.done; e = b.next())
          if (((e = e.value), (c += e.C), d < c)) {
            e.g = !0;
            Ji(e);
            break;
          }
      }
    };
    var Ti = function (a) {
      this.P = me(a);
    };
    v(Ti, Ue);
    Ti.ua = [2, 8];
    var Ui = [3, 4, 5];
    var Vi = function (a) {
      this.P = me(a);
    };
    v(Vi, Ue);
    Vi.ua = [4];
    var Wi = function (a) {
      this.P = me(a);
    };
    v(Wi, Ue);
    Wi.ua = [5];
    var Xi = [1, 2, 3, 6, 7];
    var Yi = function (a) {
      this.P = me(a);
    };
    v(Yi, Ue);
    Yi.prototype.getId = function () {
      return Qe(this, 1);
    };
    Yi.ua = [2];
    var Zi = function (a) {
      this.P = me(a);
    };
    v(Zi, Ue);
    Zi.ua = [2];
    var $i = function (a) {
      this.P = me(a);
    };
    v($i, Ue);
    $i.ua = [2];
    var aj = function (a) {
      this.P = me(a);
    };
    v(aj, Ue);
    aj.ua = [1, 4, 2, 3];
    function bj(a, b) {
      switch (b) {
        case 1:
          return Se(a, 1, Xi);
        case 2:
          return Se(a, 2, Xi);
        case 3:
          return Se(a, 3, Xi);
        case 6:
          return Se(a, 6, Xi);
        default:
          return null;
      }
    }
    function cj(a, b) {
      if (!a) return null;
      switch (b) {
        case 1:
          return Pe(a, 1);
        case 7:
          return Oe(Ne(a, 3), "");
        case 2:
          var c = void 0 === c ? 0 : c;
          a = a.P;
          b = Dd(a);
          var d = xe(a, b, 2),
            e = Sd(d);
          null != e && e !== d && ze(a, b, 2, e);
          return Oe(e, c);
        case 3:
          return Oe(Ne(a, 3), "");
        case 6:
          return Ce(a, 4, ee);
        default:
          return null;
      }
    }
    var dj = {},
      ej = ((dj[47] = Oc), dj);
    function fj() {
      var a = gj,
        b = Je(new aj(hj), $i, 2);
      1 == b.length &&
        16 == Oe(ye(b[0], 1), 0) &&
        Je(b[0], Zi, 2).forEach(function (c) {
          var d = Re(c),
            e = He(c, Ti, 3),
            f = a[Oe(ye(c, 4), 0)];
          Je(c, Yi, 2).forEach(function (g) {
            var h = d || Qe(g, 4),
              k = g.getId(),
              n = e || He(g, Ti, 3);
            n = n ? Se(n, 3, Ui) : null;
            n = ej[n];
            g = ij(Je(g, Wi, 2));
            I({ id: k, C: h, M: f, ff: n, flags: g });
          });
        });
    }
    function ij(a) {
      if (a.length) {
        var b = {};
        a.forEach(function (c) {
          var d = c.P;
          d = Ge(d, Dd(d), Xi);
          var e = He(c, Vi, 4);
          e && ((c = bj(c, d)), (d = cj(e, d)), (b[c] = d));
        });
        return b;
      }
    }
    var jj = function (a) {
      this.h = a;
    };
    jj.prototype.g = function (a, b) {
      a = t(this.h);
      for (var c = a.next(); !c.done; c = a.next())
        if ((c = b.get(c.value))) (c.g = !0), Ji(c);
    };
    var kj = function (a, b) {
      this.h = a;
      this.j = b;
    };
    v(kj, jj);
    kj.prototype.g = function (a, b) {
      jj.prototype.g.call(this, a, b);
      var c = [];
      a = [];
      for (var d = t(this.h), e = d.next(); !e.done; e = d.next())
        (e = e.value), b.get(e) ? c.push(e) : a.push(e);
      b = c.map(String).join(",") || "0";
      a = a.map(String).join(",") || "0";
      G(F.g(), "sei", b);
      G(F.g(), "nsei", a);
      G(F.g(), "bi", this.j);
    };
    var lj = function () {
      Ei.apply(this, arguments);
    };
    v(lj, Ei);
    var Fi = function (a, b) {
      var c = F.g();
      G(c, "eee", a);
      G(c, "bi", b);
    };
    lj.g = function () {
      return E(lj);
    };
    function mj() {
      return nj
        .split(",")
        .map(function (a) {
          return parseInt(a, 10);
        })
        .filter(function (a) {
          return !isNaN(a);
        });
    }
    var Qi = new Li(),
      oj = new Li(),
      pj = new Li(),
      qj = new Li(),
      rj = new Li(),
      sj = new Li(),
      tj = new Li(),
      uj = new Li(),
      vj = new Li(),
      wj = new Li(),
      xj = new Li(),
      yj = new Li(),
      zj = new Li(),
      Aj = new Li(),
      Bj = new Li(),
      Cj = new Li(),
      Ej = new Li(),
      Fj = new Li(),
      Gj = new Li(),
      Hj = new Li(),
      Ij = new Li();
    I({ id: 45786216, C: 10 });
    I({ id: 318475490, C: 0 });
    I({ id: 324123032, C: 0 });
    I({ id: 418572103, C: 0 });
    I({ id: 420706097, C: 10 });
    I({ id: 420706098, C: 10 });
    I({ id: 21062100, C: 0 });
    I({ id: 420706105, C: 0 });
    I({ id: 420706106, C: 0 });
    I({ id: 21064018, C: 0 });
    I({ id: 21064020, C: 0 });
    I({ id: 21064022, C: 0 });
    I({ id: 21064024, C: 0 });
    I({ id: 21064075, C: 0 });
    I({ id: 21064201, C: 0 });
    I({ id: 420706142, C: 0 });
    I({ id: 21064347, C: 0 });
    I({ id: 44745813, C: 0 });
    I({ id: 44746068, C: 0 });
    I({ id: 21064565, C: 0 });
    I({ id: 21064567, C: 0 });
    I({ id: 418572006, C: 10 });
    var Jj = I({ id: 44768716, C: 10, M: xj }),
      Kj = I({ id: 44768717, C: 10, M: xj }),
      Lj = I({ id: 44787137, C: 0, M: xj }),
      Mj = I({ id: 44744588, C: 10 }),
      Nj = I({ id: 44747319, C: 10 });
    I({ id: 44740339, C: 10 });
    var Oj = I({ id: 44740340, C: 10 });
    I({ id: 44749839, C: 0 });
    var Pj = I({ id: 44749840, C: 0 });
    I({ id: 44749841, C: 0 });
    var Qj = I({ id: 44749842, C: 0 });
    I({ id: 44749843, C: 1 });
    var Rj = I({ id: 44749844, C: 1 });
    I({ id: 44749845, C: 1 });
    var Sj = I({ id: 44749846, C: 1 });
    I({ id: 44714743, C: 0 });
    I({ id: 44719216, C: 0 });
    I({ id: 44730895, C: 10 });
    I({ id: 44730896, C: 10 });
    I({ id: 44736292, C: 10 });
    I({ id: 44736293, C: 10 });
    I({ id: 44772138, C: 0, M: rj });
    I({ id: 44772139, M: rj, C: 1e3 });
    I({ id: 31061774, C: 10 });
    var Tj = I({ id: 31061775, C: 10 });
    I({ id: 44715336, C: 10 });
    I({ id: 75259410, C: 0 });
    I({ id: 75259412, C: 0 });
    I({ id: 75259413, C: 0 });
    I({ id: 44773378, C: 10, M: pj });
    var Uj = I({ id: 44773379, C: 10, M: pj });
    I({ id: 44724516, C: 0 });
    I({ id: 44726389, C: 10 });
    I({ id: 44752711, C: 50 });
    I({ id: 44752052, C: 50 });
    I({ id: 44752657, C: 50 });
    I({ id: 44781407, M: qj, C: 0 });
    I({ id: 44781408, M: qj, C: 0 });
    I({ id: 44781409, M: qj, C: 1e3 });
    I({ id: 44777647, M: sj, C: 0 });
    I({ id: 44777648, M: sj, C: 0 });
    I({ id: 44777649, M: sj, C: 1e3 });
    I({ id: 44727953, C: 0 });
    I({ id: 44782089, M: tj, C: 10 });
    I({ id: 44782090, M: tj, C: 10 });
    I({ id: 44733246, C: 10 });
    I({ id: 44750823, C: 10, M: vj });
    I({ id: 44750824, C: 10, M: vj });
    I({ id: 44794282, C: 10, M: vj });
    I({ id: 44797013, C: 10, M: vj });
    I({ id: 44797014, C: 10, M: vj });
    I({ id: 44750822, C: 10, M: vj });
    I({ id: 44737473, C: 0, M: oj });
    I({ id: 44771450, C: 0, M: oj });
    I({ id: 44751889, C: 10 });
    I({ id: 44751890, C: 10 });
    I({ id: 44752995, C: 10 });
    I({ id: 44752996, C: 10 });
    I({ id: 44762627, C: 0 });
    I({ id: 44762628, C: 0 });
    I({ id: 44801479, C: 10, M: wj });
    I({ id: 44801480, C: 10, M: wj });
    I({ id: 44752538, C: 0 });
    I({ id: 44754608, C: 10 });
    I({ id: 44754609, C: 10 });
    I({ id: 44770822, C: 10 });
    I({ id: 44770823, C: 10 });
    I({ id: 44770824, C: 10 });
    I({ id: 44770825, C: 10 });
    I({ id: 75259414, C: 0 });
    I({ id: 44731964, C: 50, M: Qi });
    I({ id: 44731965, C: 50, M: Qi });
    I({ id: 44767584, C: 0 });
    var Vj,
      Wj = (
        null == (Vj = window.document.featurePolicy)
          ? 0
          : Vj.allowedFeatures().includes("attribution-reporting")
      )
        ? 300
        : 0;
    I({ id: 44776494, C: Wj, M: yj });
    I({ id: 44776495, C: Wj, M: yj });
    var Xj,
      Yj =
        (null == (Xj = window.document.featurePolicy) ||
          Xj.allowedFeatures().includes("attribution-reporting"),
        0);
    I({ id: 44769484, C: Yj, M: zj });
    I({ id: 44769485, C: Yj, M: zj });
    I({ id: 44776384, C: 0 });
    I({ id: 44773331, C: 10 });
    I({ id: 44773332, C: 10 });
    I({ id: 44804616, C: 50, M: Cj });
    var Zj = I({ id: 44804617, C: 50, M: Cj }),
      ak = I({ id: 44804618, C: 50, M: Cj });
    I({ id: 44804613, C: 50, M: Ej });
    var bk = I({ id: 44804614, C: 50, M: Ej }),
      ck = I({ id: 44804615, C: 50, M: Ej });
    I({ id: 44806260, C: 50, M: Fj });
    var dk = I({ id: 44806261, C: 50, M: Fj }),
      ek = I({ id: 44806262, C: 50, M: Fj }),
      fk = I({ id: 44806263, C: 50, M: Fj });
    I({ id: 44803783, C: 50 });
    var gk = I({ id: 44803784, C: 50 }),
      hk = I({ id: 44803785, C: 50 });
    I({ id: 44793965, M: Ij, C: 0 });
    var ik = I({ id: 44793966, M: Ij, C: 1e3 });
    I({ id: 44787954, C: 0 });
    I({ id: 44789282, C: 0 });
    I({ id: 44792636, C: 0 });
    I({ id: 44794298, C: 0 });
    I({ id: 44803996, C: 0 });
    I({ id: 44805453, C: 0 });
    I({ id: 44804917, C: 0 });
    I({ id: 75259415, C: 0 });
    var jk = I({ id: 75259416, C: 0 });
    I({ id: 75259417, C: 0 });
    I({ id: 75259418, C: 0 });
    I({ id: 44785452, C: 10 });
    I({ id: 44785453, C: 10 });
    I({ id: 45401791, C: 0 });
    I({ id: 44797156, C: 10 });
    I({ id: 44797157, C: 10 });
    I({ id: 44795414, C: 1, M: Aj });
    var kk = I({ id: 44795415, C: 1, M: Aj }),
      lk = I({ id: 44795416, C: 1, M: Aj }),
      mk = I({ id: 44795417, C: 1, M: Aj });
    I({ id: 44805102, C: 5, M: Hj });
    var nk = I({ id: 44805103, C: 5, M: Hj }),
      ok = I({ id: 44805104, C: 5, M: Hj }),
      pk = I({ id: 44805105, C: 5, M: Hj }),
      qk = I({ id: 44805106, C: 5, M: Hj });
    I({ id: 44802172, C: 10 });
    var rk = I({ id: 44802173, C: 10 });
    I({ id: 44804290, C: 10 });
    var sk = I({ id: 44804291, C: 10 });
    I({ id: 44802073, C: 10 });
    var tk = I({ id: 44802074, C: 10 });
    I({ id: 44802401, C: 0 });
    I({ id: 44802402, C: 0 });
    I({ id: 44802463, C: 1e3, M: Bj });
    I({ id: 44805638, C: 10 });
    I({ id: 44805639, C: 10 });
    I({ id: 44805640, C: 10 });
    I({ id: 44804648, C: 10, M: Gj });
    I({ id: 44804649, C: 10, M: Gj });
    I({ id: 44806074, C: 10 });
    I({ id: 44806075, C: 10 });
    I({ id: 44806258, C: 10 });
    I({ id: 44806259, C: 10 });
    var uk = {},
      gj = ((uk[32] = Qi), (uk[35] = uj), uk);
    gj = void 0 === gj ? {} : gj;
    if (
      !/^\{+IMA_EXPERIMENT_STATE_JSPB\}+$/.test("{{IMA_EXPERIMENT_STATE_JSPB}}")
    )
      try {
        var hj = JSON.parse("{{IMA_EXPERIMENT_STATE_JSPB}}");
        hj instanceof Array && fj();
      } catch (a) {
        G(F.g(), "espe", a.message);
      }
    if ("undefined" === typeof window.v8_flag_map) {
      var Hi = lj.g();
      Hi.h || (Ii(), (Hi.h = !0));
      var nj = Hi.j,
        vk;
      Hi.h || (Ii(), (Hi.h = !0));
      vk = Hi.g;
      if (null != nj) {
        var wk = new kj(mj(), vk);
        Pi(wk);
      }
    }
    Ni.reset();
    Pi(new Si());
    var xk = function (a) {
      var b = {};
      Ub(a, function (c) {
        var d = c.g,
          e = b[d];
        b.hasOwnProperty(d)
          ? null !== e && (c.h(e) || (b[d] = null))
          : (b[d] = c);
      });
      fc(a, function (c) {
        return null === b[c.g];
      });
    };
    var yk = { NONE: 0, Cg: 1 },
      zk = { Ag: 0, xh: 1, wh: 2, yh: 3 },
      Ak = { xe: "a", Bg: "d", Ze: "v" };
    var Bk = function () {
      this.Y = 0;
      this.g = !1;
      this.h = -1;
      this.nb = !1;
      this.ra = 0;
    };
    Bk.prototype.isVisible = function () {
      return this.nb ? 0.3 <= this.Y : 0.5 <= this.Y;
    };
    var Ck = { zg: 0, Fg: 1 },
      Dk = { 668123728: 0, 668123729: 1 },
      Ek = { 44731964: 0, 44731965: 1 },
      Fk = { NONE: 0, gh: 1, Kg: 2 },
      Gk = { 480596784: 0, 480596785: 1, 21063355: 2 };
    var Hk = function () {
        this.g = null;
        this.o = !1;
        this.j = null;
      },
      Ik = function (a) {
        a.o = !0;
        return a;
      },
      Jk = function (a, b) {
        a.j &&
          Ub(b, function (c) {
            c = a.j[c];
            void 0 !== c && a.h(c);
          });
      };
    Hk.prototype.ha = function () {
      return this.g;
    };
    var Kk = function (a) {
      Hk.call(this);
      this.l = a;
    };
    v(Kk, Hk);
    Kk.prototype.h = function (a) {
      null === this.g && Uf(this.l, a) && (this.g = a);
    };
    var Lk = function () {
      Hk.call(this);
    };
    v(Lk, Hk);
    Lk.prototype.h = function (a) {
      null === this.g && "number" === typeof a && (this.g = a);
    };
    var Mk = function () {
      Hk.call(this);
    };
    v(Mk, Hk);
    Mk.prototype.h = function (a) {
      null === this.g && "string" === typeof a && (this.g = a);
    };
    var Nk = function () {
      this.g = {};
      this.j = !0;
      this.h = {};
    };
    Nk.prototype.reset = function () {
      this.g = {};
      this.j = !0;
      this.h = {};
    };
    var Ok = function (a, b, c) {
        a.g[b] || (a.g[b] = new Kk(c));
        return a.g[b];
      },
      Pk = function (a) {
        a.g.queryid || (a.g.queryid = new Mk());
      },
      Qk = function (a, b, c) {
        (a = a.g[b]) && a.h(c);
      },
      Rk = function (a, b) {
        if (Tf(a.h, b)) return a.h[b];
        if ((a = a.g[b])) return a.ha();
      },
      Sk = function (a) {
        var b = {},
          c = Nf(a.g, function (d) {
            return d.o;
          });
        Mf(
          c,
          function (d, e) {
            d =
              void 0 !== a.h[e]
                ? String(a.h[e])
                : d.o && null !== d.g
                ? String(d.g)
                : "";
            0 < d.length && (b[e] = d);
          },
          a
        );
        return b;
      },
      Tk = function (a) {
        a = Sk(a);
        var b = [];
        Mf(a, function (c, d) {
          d in Object.prototype ||
            ("undefined" != typeof c && b.push([d, ":", c].join("")));
        });
        return b;
      },
      Uk = function () {
        var a = J().T,
          b = Ri();
        a.j &&
          Ub(Qf(a.g), function (c) {
            return Jk(c, b);
          });
      };
    var Vk = function (a) {
      Ok(a, "od", yk);
      Ik(Ok(a, "opac", Ck));
      Ik(Ok(a, "sbeos", Ck));
      Ik(Ok(a, "prf", Ck));
      Ik(Ok(a, "mwt", Ck));
      Ok(a, "iogeo", Ck);
    };
    var Wk = document,
      K = window;
    var Xk = !sc && !Mb();
    var Yk = function () {
      this.g = this.fb = null;
    };
    var Zk = function () {};
    Zk.prototype.now = function () {
      return 0;
    };
    Zk.prototype.h = function () {
      return 0;
    };
    Zk.prototype.j = function () {
      return 0;
    };
    Zk.prototype.g = function () {
      return 0;
    };
    var al = function () {
      if (!$k()) throw Error();
    };
    v(al, Zk);
    var $k = function () {
      return !(!K || !K.performance);
    };
    al.prototype.now = function () {
      return $k() && K.performance.now
        ? K.performance.now()
        : Zk.prototype.now.call(this);
    };
    al.prototype.h = function () {
      return $k() && K.performance.memory
        ? K.performance.memory.totalJSHeapSize || 0
        : Zk.prototype.h.call(this);
    };
    al.prototype.j = function () {
      return $k() && K.performance.memory
        ? K.performance.memory.usedJSHeapSize || 0
        : Zk.prototype.j.call(this);
    };
    al.prototype.g = function () {
      return $k() && K.performance.memory
        ? K.performance.memory.jsHeapSizeLimit || 0
        : Zk.prototype.g.call(this);
    };
    var bl = function () {};
    bl.prototype.isVisible = function () {
      return 1 === Wh(Wk);
    };
    var cl = RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)"),
      el = function () {
        var a = (this.h = w) || w;
        this.j = a.top == a ? 1 : kh(a.top) ? 2 : 3;
        3 != this.j &&
          ((a = w.top.document),
          (this.g = a.referrer),
          Date.parse(a.lastModified));
        dl(this.h);
      },
      hl = function (a) {
        a = a || dl();
        for (
          var b = new fl(w.location.href, !1), c = null, d = a.length - 1, e = d;
          0 <= e;
          --e
        ) {
          var f = a[e];
          !c && cl.test(f.url) && (c = f);
          if (f.url && !f.fd) {
            b = f;
            break;
          }
        }
        e = null;
        f = a.length && a[d].url;
        0 != b.depth && f && (e = a[d]);
        return new gl(b, e, c);
      },
      dl = function (a) {
        var b = a || w,
          c = [],
          d = null;
        do {
          var e = b;
          if (kh(e)) {
            var f = e.location.href;
            d = (e.document && e.document.referrer) || null;
          } else (f = d), (d = null);
          c.push(new fl(f || ""));
          try {
            b = e.parent;
          } catch (g) {
            b = null;
          }
        } while (b && e != b);
        e = 0;
        for (b = c.length - 1; e <= b; ++e) c[e].depth = b - e;
        e = a || w;
        if (
          e.location &&
          e.location.ancestorOrigins &&
          e.location.ancestorOrigins.length == c.length - 1
        )
          for (a = 1; a < c.length; ++a)
            (b = c[a]),
              b.url ||
                ((b.url = e.location.ancestorOrigins[a - 1] || ""), (b.fd = !0));
        return c;
      },
      gl = function (a, b, c) {
        this.g = a;
        this.h = b;
        this.j = c;
      },
      fl = function (a, b) {
        this.url = a;
        this.fd = !!b;
        this.depth = null;
      };
    var il = function () {
        this.j = "&";
        this.h = {};
        this.o = 0;
        this.g = [];
      },
      jl = function (a, b) {
        var c = {};
        c[a] = b;
        return [c];
      },
      ll = function (a, b, c, d, e) {
        var f = [];
        qh(a, function (g, h) {
          (g = kl(g, b, c, d, e)) && f.push(h + "=" + g);
        });
        return f.join(b);
      },
      kl = function (a, b, c, d, e) {
        if (null == a) return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
          if (((d = d || 0), d < c.length)) {
            for (var f = [], g = 0; g < a.length; g++)
              f.push(kl(a[g], b, c, d + 1, e));
            return f.join(c[d]);
          }
        } else if ("object" == typeof a)
          return (
            (e = e || 0),
            2 > e ? encodeURIComponent(ll(a, b, c, d, e + 1)) : "..."
          );
        return encodeURIComponent(String(a));
      },
      ml = function (a, b, c) {
        a.g.push(b);
        a.h[b] = c;
      },
      nl = function (a, b, c, d) {
        a.g.push(b);
        a.h[b] = jl(c, d);
      },
      pl = function (a, b, c) {
        b = b + "//pagead2.googlesyndication.com" + c;
        var d = ol(a) - c.length;
        if (0 > d) return "";
        a.g.sort(function (m, p) {
          return m - p;
        });
        c = null;
        for (var e = "", f = 0; f < a.g.length; f++)
          for (var g = a.g[f], h = a.h[g], k = 0; k < h.length; k++) {
            if (!d) {
              c = null == c ? g : c;
              break;
            }
            var n = ll(h[k], a.j, ",$");
            if (n) {
              n = e + n;
              if (d >= n.length) {
                d -= n.length;
                b += n;
                e = a.j;
                break;
              }
              c = null == c ? g : c;
            }
          }
        a = "";
        null != c && (a = e + "trn=" + c);
        return b + a;
      },
      ol = function (a) {
        var b = 1,
          c;
        for (c in a.h) b = c.length > b ? c.length : b;
        return 3997 - b - a.j.length - 1;
      };
    var ql = function (a, b) {
        this.g = a;
        this.depth = b;
      },
      sl = function () {
        var a = dl(),
          b = Math.max(a.length - 1, 0),
          c = hl(a);
        a = c.g;
        var d = c.h,
          e = c.j,
          f = [];
        c = function (h, k) {
          return null == h ? k : h;
        };
        e && f.push(new ql([e.url, e.fd ? 2 : 0], c(e.depth, 1)));
        d && d != e && f.push(new ql([d.url, 2], 0));
        a.url && a != e && f.push(new ql([a.url, 0], c(a.depth, b)));
        var g = Xb(f, function (h, k) {
          return f.slice(0, f.length - k);
        });
        !a.url ||
          ((e || d) && a != e) ||
          ((d = sh(a.url)) && g.push([new ql([d, 1], c(a.depth, b))]));
        g.push([]);
        return Xb(g, function (h) {
          return rl(b, h);
        });
      };
    function rl(a, b) {
      var c = Yb(
          b,
          function (e, f) {
            return Math.max(e, f.depth);
          },
          -1
        ),
        d = lc(c + 2);
      d[0] = a;
      Ub(b, function (e) {
        return (d[e.depth + 1] = e.g);
      });
      return d;
    }
    function tl() {
      var a = void 0 === a ? sl() : a;
      return a.map(function (b) {
        return kl(b);
      });
    }
    var ul = function () {
        this.h = new bl();
        this.g = $k() ? new al() : new Zk();
      },
      wl = function () {
        vl();
        var a = K.document;
        return !!(
          a &&
          a.body &&
          a.body.getBoundingClientRect &&
          "function" === typeof K.setInterval &&
          "function" === typeof K.clearInterval &&
          "function" === typeof K.setTimeout &&
          "function" === typeof K.clearTimeout
        );
      };
    ul.prototype.setTimeout = function (a, b) {
      return K.setTimeout(a, b);
    };
    ul.prototype.clearTimeout = function (a) {
      K.clearTimeout(a);
    };
    var xl = function () {
      vl();
      return tl();
    };
    var yl = function () {},
      vl = function () {
        var a = E(yl);
        if (!a.g) {
          if (!K)
            throw Error("Context has not been set and window is undefined.");
          a.g = E(ul);
        }
        return a.g;
      };
    var zl = function (a) {
      this.P = me(a);
    };
    v(zl, Ue);
    zl.prototype.g = wf([0, kf, nf, nf, nf, qf]);
    var Al = function (a) {
        this.j = a;
        this.g = -1;
        this.h = this.o = 0;
      },
      Bl = function (a, b) {
        return function () {
          var c = Ma.apply(0, arguments);
          if (-1 < a.g) return b.apply(null, ia(c));
          try {
            return (a.g = a.j.g.now()), b.apply(null, ia(c));
          } finally {
            (a.o += a.j.g.now() - a.g), (a.g = -1), (a.h += 1);
          }
        };
      };
    var Cl = function (a, b) {
      this.h = a;
      this.j = b;
      this.g = new Al(a);
    };
    var Dl = function () {
        this.g = {};
      },
      Fl = function () {
        var a = J().flags,
          b = El;
        a = a.g[b.key];
        if ("proto" === b.valueType) {
          try {
            var c = JSON.parse(a);
            if (Array.isArray(c)) return c;
          } catch (d) {}
          return b.defaultValue;
        }
        return typeof a === typeof b.defaultValue ? a : b.defaultValue;
      };
    var Gl = { sh: 1, Ph: 2, lh: 3 };
    var Hl = function () {
      this.j = void 0;
      this.h = this.A = 0;
      this.l = -1;
      this.T = new Nk();
      Ik(Ok(this.T, "mv", Fk)).j = void 0 === Gk ? null : Gk;
      Ok(this.T, "omid", Ck);
      Ik(Ok(this.T, "epoh", Ck));
      Ik(Ok(this.T, "epph", Ck));
      Ik(Ok(this.T, "umt", Ck)).j = void 0 === Dk ? null : Dk;
      Ik(Ok(this.T, "phel", Ck));
      Ik(Ok(this.T, "phell", Ck));
      Ik(Ok(this.T, "oseid", Gl));
      var a = this.T;
      a.g.sloi || (a.g.sloi = new Lk());
      Ik(a.g.sloi);
      Ok(this.T, "mm", Ak);
      Ik(Ok(this.T, "ovms", zk));
      Ik(Ok(this.T, "xdi", Ck));
      Ik(Ok(this.T, "amp", Ck));
      Ik(Ok(this.T, "prf", Ck));
      Ik(Ok(this.T, "gtx", Ck));
      Ik(Ok(this.T, "mvp_lv", Ck));
      Ik(Ok(this.T, "ssmol", Ck)).j = void 0 === Ek ? null : Ek;
      Ik(Ok(this.T, "fmd", Ck));
      this.g = new Cl(vl(), this.T);
      this.o = !1;
      this.flags = new Dl();
    };
    Hl.prototype.qd = function (a) {
      if ("string" === typeof a && 0 != a.length) {
        var b = this.T;
        if (b.j) {
          a = a.split("&");
          for (var c = a.length - 1; 0 <= c; c--) {
            var d = a[c].split("="),
              e = decodeURIComponent(d[0]);
            1 < d.length
              ? ((d = decodeURIComponent(d[1])),
                (d = /^[0-9]+$/g.exec(d) ? parseInt(d, 10) : d))
              : (d = 1);
            (e = b.g[e]) && e.h(d);
          }
        }
      }
    };
    var J = function () {
      return E(Hl);
    };
    var Il = function (a, b, c, d, e) {
      if ((d ? a.j : Math.random()) < (e || a.g))
        try {
          if (c instanceof il) var f = c;
          else
            (f = new il()),
              qh(c, function (h, k) {
                var n = f,
                  m = n.o++;
                ml(n, m, jl(k, h));
              });
          var g = pl(f, a.h, "/pagead/gen_204?id=" + b + "&");
          g && (vl(), Oh(K, g));
        } catch (h) {}
    };
    var Ll = function () {
      var a = Jl;
      this.A = Kl;
      this.l = "jserror";
      this.j = !0;
      this.h = null;
      this.B = this.Sa;
      this.g = void 0 === a ? null : a;
      this.o = !1;
    };
    l = Ll.prototype;
    l.Nc = function (a) {
      this.h = a;
    };
    l.yd = function (a) {
      this.l = a;
    };
    l.zd = function (a) {
      this.j = a;
    };
    l.Bd = function (a) {
      this.o = a;
    };
    l.ob = function (a, b, c) {
      var d = this;
      return Bl(J().g.g, function () {
        try {
          if (d.g && d.g.j) {
            var e = d.g.start(a.toString(), 3);
            var f = b();
            d.g.end(e);
          } else f = b();
        } catch (h) {
          var g = d.j;
          try {
            hi(e), (g = d.B(a, new Ml(Nl(h)), void 0, c));
          } catch (k) {
            d.Sa(217, k);
          }
          if (!g) throw h;
        }
        return f;
      })();
    };
    l.rd = function (a, b, c, d) {
      var e = this;
      return Bl(J().g.g, function () {
        var f = Ma.apply(0, arguments);
        return e.ob(
          a,
          function () {
            return b.apply(c, f);
          },
          d
        );
      });
    };
    l.Sa = function (a, b, c, d, e) {
      e = e || this.l;
      try {
        var f = new il();
        nl(f, 1, "context", a);
        Sh(b) || (b = new Ml(Nl(b)));
        b.msg && nl(f, 2, "msg", b.msg.substring(0, 512));
        var g = b.meta || {};
        if (this.h)
          try {
            this.h(g);
          } catch (k) {}
        if (d)
          try {
            d(g);
          } catch (k) {}
        ml(f, 3, [g]);
        var h = hl();
        h.h && nl(f, 4, "top", h.h.url || "");
        ml(f, 5, [{ url: h.g.url || "" }, { url: h.g.url ? Yg(h.g.url) : "" }]);
        Il(this.A, e, f, this.o, c);
      } catch (k) {
        try {
          Il(
            this.A,
            e,
            { context: "ecmserr", rctx: a, msg: Nl(k), url: h && h.g.url },
            this.o,
            c
          );
        } catch (n) {}
      }
      return this.j;
    };
    var Nl = function (a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
          a = a.stack;
          var c = b;
          try {
            -1 == a.indexOf(c) && (a = c + "\n" + a);
            for (var d; a != d; )
              (d = a),
                (a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1"));
            b = a.replace(/\n */g, "\n");
          } catch (e) {
            b = c;
          }
        }
        return b;
      },
      Ml = function (a) {
        Rh.call(this, Error(a), { message: a });
      };
    v(Ml, Rh);
    var Kl,
      Ol,
      Jl = new gi(1, window),
      Pl = function () {
        K &&
          "undefined" != typeof K.google_measure_js_timing &&
          (K.google_measure_js_timing || Jl.B());
      };
    Kl = new (function () {
      var a = "https:";
      K && K.location && "http:" === K.location.protocol && (a = "http:");
      this.h = a;
      this.g = 0.01;
      this.j = Math.random();
    })();
    Ol = new Ll();
    K &&
      K.document &&
      ("complete" == K.document.readyState
        ? Pl()
        : Jl.j &&
          Jf(K, "load", function () {
            Pl();
          }));
    var Ql = function (a) {
        Ol.Nc(function (b) {
          Ub(a, function (c) {
            c(b);
          });
        });
      },
      Rl = function (a, b) {
        return Ol.ob(a, b);
      },
      Sl = function (a, b, c, d) {
        return Ol.rd(a, b, c, d);
      },
      Tl = function (a, b, c, d) {
        Ol.Sa(a, b, c, d);
      };
    var Ul = Date.now(),
      Vl = -1,
      Wl = -1,
      Xl,
      Yl = -1,
      Zl = !1,
      $l = function () {
        return Date.now() - Ul;
      },
      am = function () {
        var a = J().j,
          b = 0 <= Wl ? $l() - Wl : -1,
          c = Zl ? $l() - Vl : -1,
          d = 0 <= Yl ? $l() - Yl : -1;
        if (947190542 == a) return 100;
        if (79463069 == a) return 200;
        a = [2e3, 4e3];
        var e = [250, 500, 1e3];
        Tl(637, Error(), 0.001);
        var f = b;
        -1 != c && c < b && (f = c);
        for (b = 0; b < a.length; ++b)
          if (f < a[b]) {
            var g = e[b];
            break;
          }
        void 0 === g && (g = e[a.length]);
        return -1 != d && 1500 < d && 4e3 > d ? 500 : g;
      };
    var bm = function (a, b, c) {
      var d = new D(0, 0, 0, 0);
      this.time = a;
      this.volume = null;
      this.j = b;
      this.g = d;
      this.h = c;
    };
    var cm = function (a, b, c, d, e, f, g) {
      this.j = a;
      this.h = b;
      this.l = c;
      this.g = d;
      this.o = e;
      this.B = f;
      this.A = g;
    };
    cm.prototype.getTimestamp = function () {
      return this.B;
    };
    var dm = {
        currentTime: 1,
        duration: 2,
        isVpaid: 4,
        volume: 8,
        isYouTube: 16,
        isPlaying: 32,
      },
      Wf = {
        Pd: "start",
        FIRST_QUARTILE: "firstquartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdquartile",
        COMPLETE: "complete",
        ERROR: "error",
        Le: "metric",
        Od: "pause",
        Ue: "resume",
        SKIPPED: "skip",
        VIEWABLE_IMPRESSION: "viewable_impression",
        Me: "mute",
        Ye: "unmute",
        FULLSCREEN: "fullscreen",
        He: "exitfullscreen",
        Ce: "bufferstart",
        Be: "bufferfinish",
        Jd: "fully_viewable_audible_half_duration_impression",
        Nd: "measurable_impression",
        we: "abandon",
        Id: "engagedview",
        IMPRESSION: "impression",
        Ee: "creativeview",
        LOADED: "loaded",
        uh: "progress",
        tg: "close",
        ug: "collapse",
        Ne: "overlay_resize",
        Oe: "overlay_unmeasurable_impression",
        Pe: "overlay_unviewable_impression",
        Re: "overlay_viewable_immediate_impression",
        Qe: "overlay_viewable_end_of_session_impression",
        Fe: "custom_metric_viewable",
        ph: "verification_debug",
        ye: "audio_audible",
        Ae: "audio_measurable",
        ze: "audio_impression",
      },
      em = "start firstquartile midpoint thirdquartile resume loaded".split(" "),
      fm = ["start", "firstquartile", "midpoint", "thirdquartile"],
      gm = ["abandon"],
      hm = {
        Kh: -1,
        Pd: 0,
        FIRST_QUARTILE: 1,
        MIDPOINT: 2,
        THIRD_QUARTILE: 3,
        COMPLETE: 4,
        Le: 5,
        Od: 6,
        Ue: 7,
        SKIPPED: 8,
        VIEWABLE_IMPRESSION: 9,
        Me: 10,
        Ye: 11,
        FULLSCREEN: 12,
        He: 13,
        Jd: 14,
        Nd: 15,
        we: 16,
        Id: 17,
        IMPRESSION: 18,
        Ee: 19,
        LOADED: 20,
        Fe: 21,
        Ce: 22,
        Be: 23,
        ze: 27,
        Ae: 28,
        ye: 29,
      };
    var Pf = {
        ng: "addEventListener",
        Lg: "getMaxSize",
        Mg: "getScreenSize",
        Ng: "getState",
        Og: "getVersion",
        vh: "removeEventListener",
        hh: "isViewable",
      },
      im = function (a) {
        var b = a !== a.top,
          c = a.top === xh(a),
          d = -1,
          e = 0;
        if (b && c && a.top.mraid) {
          d = 3;
          var f = a.top.mraid;
        } else d = (f = a.mraid) ? (b ? (c ? 2 : 1) : 0) : -1;
        f &&
          (f.IS_GMA_SDK || (e = 2),
          Of(function (g) {
            return "function" === typeof f[g];
          }) || (e = 1));
        return { Ba: f, lc: e, Zf: d };
      };
    var jm = function () {
      var a = window.document;
      return a && "function" === typeof a.elementFromPoint;
    };
    function km(a, b, c) {
      try {
        a && (b = b.top);
        var d = b;
        a && null !== d && d != d.top && (d = d.top);
        try {
          var e = (void 0 === c ? 0 : c)
            ? new A(d.innerWidth, d.innerHeight).round()
            : Lg(d || window).round();
        } catch (m) {
          e = new A(-12245933, -12245933);
        }
        a = e;
        var f = a.height,
          g = a.width;
        if (-12245933 === g) return new D(g, g, g, g);
        var h = Mg(Gg(b.document).g),
          k = h.x,
          n = h.y;
        return new D(n, k + g, n + f, k);
      } catch (m) {
        return new D(-12245933, -12245933, -12245933, -12245933);
      }
    }
    var mm = function (a, b) {
        if ("string" === typeof b) (b = lm(a, b)) && (a.style[b] = void 0);
        else
          for (var c in b) {
            var d = a,
              e = b[c],
              f = lm(d, c);
            f && (d.style[f] = e);
          }
      },
      nm = {},
      lm = function (a, b) {
        var c = nm[b];
        if (!c) {
          var d = Ag(b);
          c = d;
          void 0 === a.style[d] &&
            ((d = (vc ? "Webkit" : uc ? "Moz" : sc ? "ms" : null) + Cg(d)),
            void 0 !== a.style[d] && (c = d));
          nm[b] = c;
        }
        return c;
      },
      om = function (a, b) {
        var c = a.style[Ag(b)];
        return "undefined" !== typeof c ? c : a.style[lm(a, b)] || "";
      },
      pm = function (a, b) {
        var c = Fg(a);
        return c.defaultView &&
          c.defaultView.getComputedStyle &&
          (a = c.defaultView.getComputedStyle(a, null))
          ? a[b] || a.getPropertyValue(b) || ""
          : "";
      },
      qm = function (a) {
        try {
          return a.getBoundingClientRect();
        } catch (b) {
          return { left: 0, top: 0, right: 0, bottom: 0 };
        }
      },
      rm = function (a) {
        var b = Fg(a),
          c = new tg(0, 0);
        var d = b ? Fg(b) : document;
        d = !sc || 9 <= Number(Nc) || Kg(Gg(d).g) ? d.documentElement : d.body;
        if (a == d) return c;
        a = qm(a);
        b = Mg(Gg(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c;
      },
      sm = function (a, b) {
        var c = new tg(0, 0),
          d = C(Fg(a));
        if (!nc(d, "parent")) return c;
        do {
          if (d == b) var e = rm(a);
          else (e = qm(a)), (e = new tg(e.left, e.top));
          c.x += e.x;
          c.y += e.y;
        } while (
          d &&
          d != b &&
          d != d.parent &&
          (a = d.frameElement) &&
          (d = d.parent)
        );
        return c;
      },
      tm = function () {
        var a = "100%";
        "number" == typeof a && (a = Math.round(a) + "px");
        return a;
      },
      vm = function (a) {
        var b = um;
        if (
          "none" !=
          (pm(a, "display") ||
            (a.currentStyle ? a.currentStyle.display : null) ||
            (a.style && a.style.display))
        )
          return b(a);
        var c = a.style,
          d = c.display,
          e = c.visibility,
          f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a;
      },
      um = function (a) {
        var b = a.offsetWidth,
          c = a.offsetHeight,
          d = vc && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect
          ? ((a = qm(a)), new A(a.right - a.left, a.bottom - a.top))
          : new A(b, c);
      },
      zm = function (a) {
        var b = Fg(a),
          c = sc && a.currentStyle;
        if (
          c &&
          Kg(Gg(b).g) &&
          "auto" != c.width &&
          "auto" != c.height &&
          !c.boxSizing
        )
          return (
            (b = wm(a, c.width, "width", "pixelWidth")),
            (a = wm(a, c.height, "height", "pixelHeight")),
            new A(b, a)
          );
        c = new A(a.offsetWidth, a.offsetHeight);
        if (sc) {
          b = xm(a, "paddingLeft");
          var d = xm(a, "paddingRight"),
            e = xm(a, "paddingTop"),
            f = xm(a, "paddingBottom");
          b = new D(e, d, f, b);
        } else
          (b = pm(a, "paddingLeft")),
            (d = pm(a, "paddingRight")),
            (e = pm(a, "paddingTop")),
            (f = pm(a, "paddingBottom")),
            (b = new D(
              parseFloat(e),
              parseFloat(d),
              parseFloat(f),
              parseFloat(b)
            ));
        !sc || 9 <= Number(Nc)
          ? ((d = pm(a, "borderLeftWidth")),
            (e = pm(a, "borderRightWidth")),
            (f = pm(a, "borderTopWidth")),
            (a = pm(a, "borderBottomWidth")),
            (a = new D(
              parseFloat(f),
              parseFloat(e),
              parseFloat(a),
              parseFloat(d)
            )))
          : ((d = ym(a, "borderLeft")),
            (e = ym(a, "borderRight")),
            (f = ym(a, "borderTop")),
            (a = ym(a, "borderBottom")),
            (a = new D(f, e, a, d)));
        return new A(
          c.width - a.left - b.left - b.right - a.right,
          c.height - a.top - b.top - b.bottom - a.bottom
        );
      },
      wm = function (a, b, c, d) {
        if (/^\d+px?$/.test(b)) return parseInt(b, 10);
        var e = a.style[c],
          f = a.runtimeStyle[c];
        a.runtimeStyle[c] = a.currentStyle[c];
        a.style[c] = b;
        b = a.style[d];
        a.style[c] = e;
        a.runtimeStyle[c] = f;
        return +b;
      },
      xm = function (a, b) {
        return (b = a.currentStyle ? a.currentStyle[b] : null)
          ? wm(a, b, "left", "pixelLeft")
          : 0;
      },
      Am = { thin: 2, medium: 4, thick: 6 },
      ym = function (a, b) {
        if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))
          return 0;
        b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
        return b in Am ? Am[b] : wm(a, b, "left", "pixelLeft");
      };
    var Bm = function (a, b) {
      b = Math.pow(10, b);
      return Math.floor(a * b) / b;
    };
    function Cm(a, b, c, d) {
      if (!a) return { value: d, done: !1 };
      d = b(d, a);
      var e = c(d, a);
      return !e && nc(a, "parentElement")
        ? Cm(Rg(a), b, c, d)
        : { done: e, value: d };
    }
    var Dm = function (a, b, c, d) {
      if (!a) return d;
      d = Cm(a, b, c, d);
      if (!d.done)
        try {
          var e = Fg(a),
            f = e && C(e);
          return Dm(f && f.frameElement, b, c, d.value);
        } catch (g) {}
      return d.value;
    };
    function Em(a) {
      var b = !sc || Kc();
      return Dm(
        a,
        function (c, d) {
          c = nc(d, "style") && d.style && om(d, "visibility");
          return { hidden: "hidden" === c, visible: b && "visible" === c };
        },
        function (c) {
          return c.hidden || c.visible;
        },
        { hidden: !1, visible: !1 }
      ).hidden;
    }
    var Fm = function (a) {
        return Dm(
          a,
          function (b, c) {
            return !(!nc(c, "style") || !c.style || "none" !== om(c, "display"));
          },
          function (b) {
            return b;
          },
          !1
        )
          ? !0
          : Em(a);
      },
      Gm = function (a) {
        return new D(a.top, a.right, a.bottom, a.left);
      },
      Hm = function (a) {
        var b = a.top || 0,
          c = a.left || 0;
        return new D(b, c + (a.width || 0), b + (a.height || 0), c);
      },
      Im = function (a) {
        return null != a && 0 <= a && 1 >= a;
      };
    function Jm() {
      var a = Eb();
      return a
        ? Zb(
            "AmazonWebAppPlatform;Android TV;Apple TV;AppleTV;BRAVIA;BeyondTV;Freebox;GoogleTV;HbbTV;LongTV;MiBOX;MiTV;NetCast.TV;Netcast;Opera TV;PANASONIC;POV_TV;SMART-TV;SMART_TV;SWTV;Smart TV;SmartTV;TV Store;UnionTV;WebOS".split(
              ";"
            ),
            function (b) {
              return yb(a, b);
            }
          ) ||
          (yb(a, "OMI/") && !yb(a, "XiaoMi/"))
          ? !0
          : yb(a, "Presto") &&
            yb(a, "Linux") &&
            !yb(a, "X11") &&
            !yb(a, "Android") &&
            !yb(a, "Mobi")
        : !1;
    }
    function Km() {
      var a = Eb();
      return (
        yb(a, "AppleTV") ||
        yb(a, "Apple TV") ||
        yb(a, "CFNetwork") ||
        yb(a, "tvOS")
      );
    }
    function Lm() {
      var a;
      (a =
        yb(Eb(), "CrKey") ||
        yb(Eb(), "PlayStation") ||
        yb(Eb(), "Roku") ||
        Jm() ||
        yb(Eb(), "Xbox") ||
        Km()) ||
        ((a = Eb()), (a = yb(a, "sdk_google_atv_x86") || yb(a, "Android TV")));
      return a;
    }
    var Nm = function () {
        this.j = !kh(K.top);
        this.B = Vg() || Wg();
        var a = dl();
        a =
          0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url
            ? ((a = a[a.length - 1].url.match(Xg)[3] || null)
                ? decodeURI(a)
                : a) || ""
            : "";
        this.domain = a;
        this.g = new D(0, 0, 0, 0);
        this.l = new A(0, 0);
        this.o = new A(0, 0);
        this.H = new D(0, 0, 0, 0);
        this.A = 0;
        this.K = !1;
        this.h = !(!K || !im(K).Ba);
        Mm(this);
      },
      Om = function (a, b) {
        b && b.screen && (a.l = new A(b.screen.width, b.screen.height));
      },
      Pm = function (a, b) {
        var c = a.g ? new A(a.g.getWidth(), a.g.getHeight()) : new A(0, 0);
        b = void 0 === b ? K : b;
        null !== b && b != b.top && (b = b.top);
        var d = 0,
          e = 0;
        try {
          var f = b.document,
            g = f.body,
            h = f.documentElement;
          if ("CSS1Compat" == f.compatMode && h.scrollHeight)
            (d = h.scrollHeight != c.height ? h.scrollHeight : h.offsetHeight),
              (e = h.scrollWidth != c.width ? h.scrollWidth : h.offsetWidth);
          else {
            var k = h.scrollHeight,
              n = h.scrollWidth,
              m = h.offsetHeight,
              p = h.offsetWidth;
            h.clientHeight != m &&
              ((k = g.scrollHeight),
              (n = g.scrollWidth),
              (m = g.offsetHeight),
              (p = g.offsetWidth));
            k > c.height
              ? k > m
                ? ((d = k), (e = n))
                : ((d = m), (e = p))
              : k < m
              ? ((d = k), (e = n))
              : ((d = m), (e = p));
          }
          var u = new A(e, d);
        } catch (r) {
          u = new A(-12245933, -12245933);
        }
        a.o = u;
      },
      Mm = function (a) {
        K &&
          K.document &&
          ((a.H = km(!1, K, a.B)), (a.g = km(!0, K, a.B)), Pm(a, K), Om(a, K));
      },
      Rm = function () {
        var a = Qm();
        if (0 < a.A || a.K) return !0;
        a = vl().h.isVisible();
        var b = 0 === Wh(Wk);
        return a || b;
      },
      Qm = function () {
        return E(Nm);
      };
    var Sm = function (a) {
      this.j = a;
      this.h = 0;
      this.g = null;
    };
    Sm.prototype.cancel = function () {
      vl().clearTimeout(this.g);
      this.g = null;
    };
    var Tm = function (a) {
      var b = vl(),
        c = J().g.g;
      a.g = b.setTimeout(
        Bl(
          c,
          Sl(143, function () {
            a.h++;
            a.j.sample();
          })
        ),
        am()
      );
    };
    var Um = function (a, b, c) {
      this.j = a;
      this.ma = void 0 === c ? "na" : c;
      this.l = [];
      this.ta = !1;
      this.o = new bm(-1, !0, this);
      this.g = this;
      this.K = b;
      this.G = this.D = !1;
      this.X = "uk";
      this.N = !1;
      this.B = !0;
    };
    Um.prototype.F = function () {
      return !1;
    };
    Um.prototype.initialize = function () {
      return (this.ta = !0);
    };
    Um.prototype.wb = function () {
      return this.g.X;
    };
    Um.prototype.Mb = function () {
      return this.g.G;
    };
    var Wm = function (a, b, c) {
      if (!a.G || (void 0 === c ? 0 : c))
        (a.G = !0), (a.X = b), (a.K = 0), a.g != a || Vm(a);
    };
    Um.prototype.getName = function () {
      return this.g.ma;
    };
    Um.prototype.Ya = function () {
      return this.g.Z();
    };
    Um.prototype.Z = function () {
      return {};
    };
    Um.prototype.Pa = function () {
      return this.g.K;
    };
    var Xm = function (a, b) {
      cc(a.l, b) || (a.l.push(b), b.yb(a.g), b.Za(a.o), b.La() && (a.D = !0));
    };
    Um.prototype.U = function () {
      var a = Qm();
      a.g = km(!0, this.j, a.B);
    };
    Um.prototype.V = function () {
      Om(Qm(), this.j);
    };
    Um.prototype.aa = function () {
      return this.o.g;
    };
    var Ym = function (a) {
      a = a.g;
      a.V();
      a.U();
      var b = Qm();
      b.H = km(!1, a.j, b.B);
      Pm(Qm(), a.j);
      a.o.g = a.aa();
    };
    Um.prototype.sample = function () {};
    Um.prototype.isActive = function () {
      return this.g.B;
    };
    var Zm = function (a) {
        a.D = a.l.length
          ? Zb(a.l, function (b) {
              return b.La();
            })
          : !1;
      },
      $m = function (a) {
        var b = hc(a.l);
        Ub(b, function (c) {
          c.Za(a.o);
        });
      },
      Vm = function (a) {
        var b = hc(a.l);
        Ub(b, function (c) {
          c.yb(a.g);
        });
        a.g != a || $m(a);
      };
    l = Um.prototype;
    l.yb = function (a) {
      var b = this.g;
      this.g = a.Pa() >= this.K ? a : this;
      b !== this.g
        ? ((this.B = this.g.B), Vm(this))
        : this.B !== this.g.B && ((this.B = this.g.B), Vm(this));
    };
    l.Za = function (a) {
      if (a.h === this.g) {
        var b = this.o,
          c = this.D;
        if ((c = a && (void 0 === c || !c || b.volume == a.volume) && b.j == a.j))
          (b = b.g),
            (c = a.g),
            (c =
              b == c
                ? !0
                : b && c
                ? b.top == c.top &&
                  b.right == c.right &&
                  b.bottom == c.bottom &&
                  b.left == c.left
                : !1);
        this.o = a;
        !c && $m(this);
      }
    };
    l.La = function () {
      return this.D;
    };
    l.W = function () {
      this.N = !0;
    };
    l.wa = function () {
      return this.N;
    };
    var an = function (a, b, c, d) {
      this.j = a;
      this.g = new D(0, 0, 0, 0);
      this.l = new D(0, 0, 0, 0);
      this.h = b;
      this.T = c;
      this.G = d;
      this.F = !1;
      this.timestamp = -1;
      this.H = new cm(b.o, this.g, new D(0, 0, 0, 0), 0, 0, $l(), 0);
    };
    l = an.prototype;
    l.Rc = function () {
      return !0;
    };
    l.Yb = function () {};
    l.W = function () {
      if (!this.wa()) {
        var a = this.h;
        dc(a.l, this);
        a.D && this.La() && Zm(a);
        this.Yb();
        this.F = !0;
      }
    };
    l.wa = function () {
      return this.F;
    };
    l.Ya = function () {
      return this.h.Ya();
    };
    l.Pa = function () {
      return this.h.Pa();
    };
    l.wb = function () {
      return this.h.wb();
    };
    l.Mb = function () {
      return this.h.Mb();
    };
    l.yb = function () {};
    l.Za = function () {
      this.Xa();
    };
    l.La = function () {
      return this.G;
    };
    var bn = function (a) {
      this.l = !1;
      this.g = a;
      this.o = function () {};
    };
    l = bn.prototype;
    l.Pa = function () {
      return this.g.Pa();
    };
    l.wb = function () {
      return this.g.wb();
    };
    l.Mb = function () {
      return this.g.Mb();
    };
    l.create = function (a, b, c) {
      var d = null;
      this.g && ((d = this.Zb(a, b, c)), Xm(this.g, d));
      return d;
    };
    l.Kd = function () {
      return this.Fb();
    };
    l.Fb = function () {
      return !1;
    };
    l.init = function (a) {
      return this.g.initialize() ? (Xm(this.g, this), (this.o = a), !0) : !1;
    };
    l.yb = function (a) {
      0 == a.Pa() && this.o(a.wb(), this);
    };
    l.Za = function () {};
    l.La = function () {
      return !1;
    };
    l.W = function () {
      this.l = !0;
    };
    l.wa = function () {
      return this.l;
    };
    l.Ya = function () {
      return {};
    };
    var cn = function (a, b, c) {
        this.j = void 0 === c ? 0 : c;
        this.h = a;
        this.g = null == b ? "" : b;
      },
      dn = function (a) {
        switch (Math.trunc(a.j)) {
          case -16:
            return -16;
          case -8:
            return -8;
          case 0:
            return 0;
          case 8:
            return 8;
          case 16:
            return 16;
          default:
            return 16;
        }
      },
      en = function (a, b) {
        return a.j < b.j
          ? !0
          : a.j > b.j
          ? !1
          : a.h < b.h
          ? !0
          : a.h > b.h
          ? !1
          : typeof a.g < typeof b.g
          ? !0
          : typeof a.g > typeof b.g
          ? !1
          : a.g < b.g;
      };
    var fn = function () {
      this.j = 0;
      this.g = [];
      this.h = !1;
    };
    fn.prototype.add = function (a, b, c) {
      ++this.j;
      a = new cn(a, b, c);
      this.g.push(new cn(a.h, a.g, a.j + this.j / 4096));
      this.h = !0;
      return this;
    };
    var gn = function (a, b) {
        Ub(b.g, function (c) {
          a.add(c.h, c.g, dn(c));
        });
      },
      hn = function (a, b) {
        var c = void 0 === c ? 0 : c;
        var d = void 0 === d ? !0 : d;
        qh(b, function (e, f) {
          (d && void 0 === e) || a.add(f, e, c);
        });
        return a;
      },
      kn = function (a) {
        var b = jn;
        a.h &&
          (jc(a.g, function (c, d) {
            return en(d, c) ? 1 : en(c, d) ? -1 : 0;
          }),
          (a.h = !1));
        return Yb(
          a.g,
          function (c, d) {
            d = b(d);
            return "" + c + ("" != c && "" != d ? "&" : "") + d;
          },
          ""
        );
      };
    var jn = function (a) {
      var b = a.h;
      a = a.g;
      return "" === a
        ? b
        : "boolean" === typeof a
        ? a
          ? b
          : ""
        : Array.isArray(a)
        ? 0 === a.length
          ? b
          : b + "=" + a.join()
        : b + "=" + (cc(["mtos", "tos", "p"], b) ? a : encodeURIComponent(a));
    };
    var ln = function (a) {
      var b = void 0 === b ? !0 : b;
      this.g = new fn();
      void 0 !== a && gn(this.g, a);
      b && this.g.add("v", "unreleased", -16);
    };
    ln.prototype.toString = function () {
      var a = "//pagead2.googlesyndication.com//pagead/gen_204",
        b = kn(this.g);
      0 < b.length && (a += "?" + b);
      return a;
    };
    var mn = function (a) {
        var b = [],
          c = [];
        Mf(a, function (d, e) {
          if (!(e in Object.prototype) && "undefined" != typeof d)
            switch (
              (Array.isArray(d) && (d = d.join(",")),
              (d = [e, "=", d].join("")),
              e)
            ) {
              case "adk":
              case "r":
              case "tt":
              case "error":
              case "mtos":
              case "tos":
              case "p":
              case "bs":
                b.unshift(d);
                break;
              case "req":
              case "url":
              case "referrer":
              case "iframe_loc":
                c.push(d);
                break;
              default:
                b.push(d);
            }
        });
        return b.concat(c);
      },
      nn = function (a) {
        a = a.toString();
        a = a.substring(0, 4e3);
        vl();
        Oh(K, a);
      };
    var on = function () {
      this.g = 0;
    };
    function pn(a) {
      a && "function" == typeof a.W && a.W();
    }
    var L = function () {
      this.K = this.K;
      this.H = this.H;
    };
    L.prototype.K = !1;
    L.prototype.wa = function () {
      return this.K;
    };
    L.prototype.W = function () {
      this.K || ((this.K = !0), this.L());
    };
    var rn = function (a, b) {
        qn(a, bb(pn, b));
      },
      qn = function (a, b) {
        a.K ? b() : (a.H || (a.H = []), a.H.push(b));
      };
    L.prototype.L = function () {
      if (this.H) for (; this.H.length; ) this.H.shift()();
    };
    var sn = function (a, b, c) {
      Ub(a.j, function (d) {
        var e = a.g;
        if (!d.g && (d.j(b, c), d.o())) {
          d.g = !0;
          var f = d.h(),
            g = new fn();
          g.add("id", "av-js");
          g.add("type", "verif");
          g.add("vtype", d.l);
          d = E(on);
          g.add("i", d.g++);
          g.add("adk", e);
          hn(g, f);
          e = new ln(g);
          nn(e);
        }
      });
    };
    var tn = function () {
        this.h = this.j = this.o = this.g = 0;
      },
      un = function (a, b, c, d) {
        b && ((a.g += c), (a.h += c), (a.o += c), (a.j = Math.max(a.j, a.o)));
        if (void 0 === d ? !b : d) a.o = 0;
      };
    var vn = [1, 0.75, 0.5, 0.3, 0],
      wn = function (a) {
        this.h = a = void 0 === a ? vn : a;
        this.g = Xb(this.h, function () {
          return new tn();
        });
      },
      yn = function (a, b) {
        return xn(
          a,
          function (c) {
            return c.g;
          },
          void 0 === b ? !0 : b
        );
      },
      An = function (a, b) {
        return zn(a, b, function (c) {
          return c.g;
        });
      },
      Bn = function (a, b) {
        return xn(
          a,
          function (c) {
            return c.j;
          },
          void 0 === b ? !0 : b
        );
      },
      Cn = function (a, b) {
        return zn(a, b, function (c) {
          return c.j;
        });
      },
      Dn = function (a, b) {
        return zn(a, b, function (c) {
          return c.h;
        });
      },
      En = function (a) {
        Ub(a.g, function (b) {
          b.h = 0;
        });
      },
      Fn = function (a, b, c, d, e, f, g) {
        g = void 0 === g ? !0 : g;
        c = f ? Math.min(b, c) : c;
        for (f = 0; f < a.h.length; f++) {
          var h = a.h[f],
            k = 0 < c && c >= h;
          h = !(0 < b && b >= h) || d;
          un(a.g[f], g && k, e, !g || h);
        }
      },
      xn = function (a, b, c) {
        a = Xb(a.g, function (d) {
          return b(d);
        });
        return c ? a : Gn(a);
      },
      zn = function (a, b, c) {
        var d = bc(a.h, function (e) {
          return b <= e;
        });
        return -1 == d ? 0 : c(a.g[d]);
      },
      Gn = function (a) {
        return Xb(a, function (b, c, d) {
          return 0 < c ? d[c] - d[c - 1] : d[c];
        });
      };
    var Hn = function () {
        this.h = new wn();
        this.X = new tn();
        this.G = this.B = -1;
        this.ga = 1e3;
        this.ba = new wn([1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]);
        this.N = this.I = -1;
      },
      In = function (a, b) {
        return Bn(a.h, void 0 === b ? !0 : b);
      };
    Hn.prototype.K = function (a, b, c, d) {
      this.B = -1 != this.B ? Math.min(this.B, b.Y) : b.Y;
      this.G = Math.max(this.G, b.Y);
      this.I = -1 != this.I ? Math.min(this.I, b.ra) : b.ra;
      this.N = Math.max(this.N, b.ra);
      Fn(this.ba, b.ra, c.ra, b.g, a, d);
      Fn(this.h, b.Y, c.Y, b.g, a, d);
      c = d || c.nb != b.nb ? c.isVisible() && b.isVisible() : c.isVisible();
      b = !b.isVisible() || b.g;
      un(this.X, c, a, b);
    };
    Hn.prototype.Ra = function () {
      return this.X.j >= this.ga;
    };
    if (Wk && Wk.URL) {
      var Jn = Wk.URL,
        Kn;
      if ((Kn = !!Jn)) {
        var Ln;
        a: {
          if (Jn) {
            var Mn = RegExp(".*[&#?]google_debug(=[^&]*)?(&.*)?$");
            try {
              var Nn = Mn.exec(decodeURIComponent(Jn));
              if (Nn) {
                Ln = Nn[1] && 1 < Nn[1].length ? Nn[1].substring(1) : "true";
                break a;
              }
            } catch (a) {}
          }
          Ln = "";
        }
        Kn = 0 < Ln.length;
      }
      Ol.zd(!Kn);
    }
    var On = function (a, b, c, d) {
      var e = void 0 === e ? !1 : e;
      c = Sl(d, c);
      Jf(a, b, c, { capture: e });
    };
    var Pn = new D(0, 0, 0, 0);
    function Qn(a, b) {
      b = Rn(b);
      return 0 === b ? 0 : Rn(a) / b;
    }
    function Rn(a) {
      return Math.max(a.bottom - a.top, 0) * Math.max(a.right - a.left, 0);
    }
    function Sn(a, b) {
      if (!a || !b) return !1;
      for (var c = 0; null !== a && 100 > c++; ) {
        if (a === b) return !0;
        try {
          if ((a = Rg(a) || a)) {
            var d = Fg(a),
              e = d && C(d),
              f = e && e.frameElement;
            f && (a = f);
          }
        } catch (g) {
          break;
        }
      }
      return !1;
    }
    function Tn(a, b, c) {
      if (!a || !b) return !1;
      b = zh(yh(a), -b.left, -b.top);
      a = (b.left + b.right) / 2;
      b = (b.top + b.bottom) / 2;
      kh(window.top) &&
        window.top &&
        window.top.document &&
        (window = window.top);
      if (!jm()) return !1;
      a = window.document.elementFromPoint(a, b);
      if (!a) return !1;
      b =
        (b = (b = Fg(c)) && b.defaultView && b.defaultView.frameElement) &&
        Sn(b, a);
      var d = a === c;
      a =
        !d &&
        a &&
        Ug(a, function (e) {
          return e === c;
        });
      return !(b || d || a);
    }
    function Un(a, b, c, d) {
      return Qm().j
        ? !1
        : 0 >= a.getWidth() || 0 >= a.getHeight()
        ? !0
        : c && d
        ? Rl(208, function () {
            return Tn(a, b, c);
          })
        : !1;
    }
    var Vn = new D(0, 0, 0, 0),
      Xn = function (a, b, c) {
        L.call(this);
        this.position = yh(Vn);
        this.Dc = this.uc();
        this.gd = -2;
        this.dg = Date.now();
        this.te = -1;
        this.xc = b;
        this.wc = null;
        this.Ib = !1;
        this.Ic = null;
        this.opacity = -1;
        this.Tf = c;
        this.eg = !1;
        this.hd = function () {};
        this.ue = function () {};
        this.sa = new Yk();
        this.sa.fb = a;
        this.sa.g = a;
        this.Qa = !1;
        this.jb = { ld: null, kd: null };
        this.qe = !0;
        this.Xb = null;
        this.zb = this.Gf = !1;
        J().A++;
        this.pa = this.bd();
        this.se = -1;
        this.ca = null;
        this.ee = this.Ef = !1;
        this.T = new Nk();
        Vk(this.T);
        Wn(this);
        1 == this.Tf ? Qk(this.T, "od", 1) : Qk(this.T, "od", 0);
      };
    v(Xn, L);
    Xn.prototype.L = function () {
      this.sa.g &&
        (this.jb.ld &&
          (Kf(this.sa.g, "mouseover", this.jb.ld), (this.jb.ld = null)),
        this.jb.kd &&
          (Kf(this.sa.g, "mouseout", this.jb.kd), (this.jb.kd = null)));
      this.Xb && this.Xb.W();
      this.ca && this.ca.W();
      delete this.Dc;
      delete this.hd;
      delete this.ue;
      delete this.sa.fb;
      delete this.sa.g;
      delete this.jb;
      delete this.Xb;
      delete this.ca;
      delete this.T;
      L.prototype.L.call(this);
    };
    Xn.prototype.kb = function () {
      return this.ca ? this.ca.g : this.position;
    };
    Xn.prototype.qd = function (a) {
      J().qd(a);
    };
    var Wn = function (a) {
      a = a.sa.fb;
      var b;
      if ((b = a && a.getAttribute))
        b = /-[a-z]/.test("googleAvInapp")
          ? !1
          : Xk && a.dataset
          ? "googleAvInapp" in a.dataset
          : a.hasAttribute
          ? a.hasAttribute("data-" + Bg())
          : !!a.getAttribute("data-" + Bg());
      b && (Qm().h = !0);
    };
    Xn.prototype.La = function () {
      return !1;
    };
    Xn.prototype.uc = function () {
      return new Hn();
    };
    Xn.prototype.oa = function () {
      return this.Dc;
    };
    var Yn = function (a, b) {
        b != a.zb && ((a.zb = b), (a = Qm()), b ? a.A++ : 0 < a.A && a.A--);
      },
      Zn = function (a, b) {
        if (a.ca) {
          if (b.getName() === a.ca.getName()) return;
          a.ca.W();
          a.ca = null;
        }
        b = b.create(a.sa.g, a.T, a.La());
        if ((b = null != b && b.Rc() ? b : null)) a.ca = b;
      },
      $n = function (a, b, c) {
        if (
          !a.wc ||
          -1 == a.xc ||
          -1 === b.getTimestamp() ||
          -1 === a.wc.getTimestamp()
        )
          return 0;
        a = b.getTimestamp() - a.wc.getTimestamp();
        return a > c ? 0 : a;
      };
    Xn.prototype.be = function (a) {
      return $n(this, a, 1e4);
    };
    var ao = function (a, b, c) {
        if (a.ca) {
          a.ca.Xa();
          var d = a.ca.H,
            e = d.j,
            f = e.g;
          if (null != d.l) {
            var g = d.h;
            a.Ic = new tg(g.left - f.left, g.top - f.top);
          }
          f = a.Oc() ? Math.max(d.g, d.o) : d.g;
          g = {};
          null !== e.volume && (g.volume = e.volume);
          e = a.be(d);
          a.wc = d;
          a.Ed(f, b, c, !1, g, e, d.A);
        }
      },
      bo = function (a) {
        if (a.Ib && a.Xb) {
          var b = 1 == Rk(a.T, "od"),
            c = Qm().g,
            d = a.Xb,
            e = a.ca ? a.ca.getName() : "ns",
            f = new A(c.getWidth(), c.getHeight());
          c = a.Oc();
          a = { bg: e, Ic: a.Ic, mg: f, Oc: c, Y: a.pa.Y, hg: b };
          if ((b = d.h)) {
            b.Xa();
            e = b.H;
            f = e.j.g;
            var g = null,
              h = null;
            null != e.l &&
              f &&
              ((g = e.h),
              (g = new tg(g.left - f.left, g.top - f.top)),
              (h = new A(f.right - f.left, f.bottom - f.top)));
            e = c ? Math.max(e.g, e.o) : e.g;
            c = { bg: b.getName(), Ic: g, mg: h, Oc: c, hg: !1, Y: e };
          } else c = null;
          c && sn(d, a, c);
        }
      };
    l = Xn.prototype;
    l.Ed = function (a, b, c, d, e, f, g) {
      this.Qa ||
        (this.Ib &&
          ((a = this.Tc(a, c, e, g)),
          (d = d && this.pa.Y >= (this.nb() ? 0.3 : 0.5)),
          this.Fd(f, a, d),
          (this.xc = b),
          0 < a.Y && -1 === this.se && (this.se = b),
          -1 == this.te && this.Ra() && (this.te = b),
          -2 == this.gd && (this.gd = Rn(this.kb()) ? a.Y : -1),
          (this.pa = a)),
        this.hd(this));
    };
    l.Fd = function (a, b, c) {
      this.oa().K(a, b, this.pa, c);
    };
    l.bd = function () {
      return new Bk();
    };
    l.Tc = function (a, b, c, d) {
      c = this.bd();
      c.g = b;
      b = vl().h;
      b = 0 === Wh(Wk) ? -1 : b.isVisible() ? 0 : 1;
      c.h = b;
      c.Y = this.Vc(a);
      c.nb = this.nb();
      c.ra = d;
      return c;
    };
    l.Vc = function (a) {
      return 0 === this.opacity && 1 === Rk(this.T, "opac") ? 0 : a;
    };
    l.nb = function () {
      return !1;
    };
    l.Oc = function () {
      return this.Ef || this.Gf;
    };
    l.va = function () {
      return 0;
    };
    l.Ra = function () {
      return this.Dc.Ra();
    };
    l.de = function () {
      var a = this.Ib;
      a = (this.ee || this.wa()) && !a;
      var b = 2 !== J().h || this.eg;
      return this.Qa || (b && a) ? 2 : this.Ra() ? 4 : 3;
    };
    l.sc = function () {
      return 0;
    };
    var co = function (a, b, c) {
      b && (a.hd = b);
      c && (a.ue = c);
    };
    var eo = function () {};
    eo.prototype.next = function () {
      return fo;
    };
    var fo = { done: !0, value: void 0 };
    eo.prototype.ub = function () {
      return this;
    };
    var go = function () {
        this.o = this.g = this.j = this.h = this.l = 0;
      },
      ho = function (a) {
        var b = {};
        b = ((b.ptlt = Date.now() - a.l), b);
        var c = a.h;
        c && (b.pnk = c);
        (c = a.j) && (b.pnc = c);
        (c = a.o) && (b.pnmm = c);
        (a = a.g) && (b.pns = a);
        return b;
      };
    var io = function () {
      Bk.call(this);
      this.fullscreen = !1;
      this.volume = void 0;
      this.paused = !1;
      this.mediaTime = -1;
    };
    v(io, Bk);
    var jo = function (a) {
      return Im(a.volume) && 0 < a.volume;
    };
    var lo = function (a, b, c, d) {
        c = void 0 === c ? !0 : c;
        d =
          void 0 === d
            ? function () {
                return !0;
              }
            : d;
        return function (e) {
          var f = e[a];
          if (Array.isArray(f) && d(e)) return ko(f, b, c);
        };
      },
      mo = function (a, b) {
        return function (c) {
          return b(c) ? c[a] : void 0;
        };
      },
      no = function (a) {
        return function (b) {
          for (var c = 0; c < a.length; c++)
            if (a[c] === b.e || (void 0 === a[c] && !b.hasOwnProperty("e")))
              return !0;
          return !1;
        };
      },
      ko = function (a, b, c) {
        return void 0 === c || c
          ? Wb(a, function (d, e) {
              return cc(b, e);
            })
          : Xb(b, function (d, e, f) {
              return a
                .slice(0 < e ? f[e - 1] + 1 : 0, d + 1)
                .reduce(function (g, h) {
                  return g + h;
                }, 0);
            });
      };
    var oo = no([void 0, 1, 2, 3, 4, 8, 16]),
      po = no([void 0, 4, 8, 16]),
      qo = {
        sv: "sv",
        v: "v",
        cb: "cb",
        e: "e",
        nas: "nas",
        msg: "msg",
        if: "if",
        sdk: "sdk",
        p: "p",
        p0: mo("p0", po),
        p1: mo("p1", po),
        p2: mo("p2", po),
        p3: mo("p3", po),
        cp: "cp",
        tos: "tos",
        mtos: "mtos",
        amtos: "amtos",
        mtos1: lo("mtos1", [0, 2, 4], !1, po),
        mtos2: lo("mtos2", [0, 2, 4], !1, po),
        mtos3: lo("mtos3", [0, 2, 4], !1, po),
        mcvt: "mcvt",
        ps: "ps",
        scs: "scs",
        bs: "bs",
        vht: "vht",
        mut: "mut",
        a: "a",
        a0: mo("a0", po),
        a1: mo("a1", po),
        a2: mo("a2", po),
        a3: mo("a3", po),
        ft: "ft",
        dft: "dft",
        at: "at",
        dat: "dat",
        as: "as",
        vpt: "vpt",
        gmm: "gmm",
        std: "std",
        efpf: "efpf",
        swf: "swf",
        nio: "nio",
        px: "px",
        nnut: "nnut",
        vmer: "vmer",
        vmmk: "vmmk",
        vmiec: "vmiec",
        nmt: "nmt",
        tcm: "tcm",
        bt: "bt",
        pst: "pst",
        vpaid: "vpaid",
        dur: "dur",
        vmtime: "vmtime",
        dtos: "dtos",
        dtoss: "dtoss",
        dvs: "dvs",
        dfvs: "dfvs",
        dvpt: "dvpt",
        fmf: "fmf",
        vds: "vds",
        is: "is",
        i0: "i0",
        i1: "i1",
        i2: "i2",
        i3: "i3",
        ic: "ic",
        cs: "cs",
        c: "c",
        c0: mo("c0", po),
        c1: mo("c1", po),
        c2: mo("c2", po),
        c3: mo("c3", po),
        mc: "mc",
        nc: "nc",
        mv: "mv",
        nv: "nv",
        qmt: mo("qmtos", oo),
        qnc: mo("qnc", oo),
        qmv: mo("qmv", oo),
        qnv: mo("qnv", oo),
        raf: "raf",
        rafc: "rafc",
        lte: "lte",
        ces: "ces",
        tth: "tth",
        femt: "femt",
        femvt: "femvt",
        emc: "emc",
        emuc: "emuc",
        emb: "emb",
        avms: "avms",
        nvat: "nvat",
        qi: "qi",
        psm: "psm",
        psv: "psv",
        psfv: "psfv",
        psa: "psa",
        pnk: "pnk",
        pnc: "pnc",
        pnmm: "pnmm",
        pns: "pns",
        ptlt: "ptlt",
        pngs: "pings",
        veid: "veid",
        ssb: "ssb",
        ss0: mo("ss0", po),
        ss1: mo("ss1", po),
        ss2: mo("ss2", po),
        ss3: mo("ss3", po),
        dc_rfl: "urlsigs",
        obd: "obd",
        omidp: "omidp",
        omidr: "omidr",
        omidv: "omidv",
        omida: "omida",
        omids: "omids",
        omidpv: "omidpv",
        omidam: "omidam",
        omidct: "omidct",
        omidia: "omidia",
        omiddc: "omiddc",
        omidlat: "omidlat",
        omiddit: "omiddit",
        nopd: "nopd",
      },
      ro = Object.assign({}, qo, {
        avid: (function (a) {
          return function () {
            return a;
          };
        })("audio"),
        avas: "avas",
        vs: "vs",
      }),
      so = {
        atos: "atos",
        avt: lo("atos", [2]),
        davs: "davs",
        dafvs: "dafvs",
        dav: "dav",
        ss: (function (a, b) {
          return function (c) {
            return void 0 === c[a] && void 0 !== b ? b : c[a];
          };
        })("ss", 0),
        t: "t",
      };
    var to = function () {
      this.h = this.g = "";
    };
    var uo = function () {},
      vo = function (a, b) {
        var c = {};
        if (void 0 !== a)
          if (null != b)
            for (var d in b) {
              var e = b[d];
              d in Object.prototype ||
                (null != e && (c[d] = "function" === typeof e ? e(a) : a[e]));
            }
          else ag(c, a);
        return kn(hn(new fn(), c));
      };
    var wo = function () {
      var a = {};
      this.h =
        ((a.vs = [1, 0]),
        (a.vw = [0, 1]),
        (a.am = [2, 2]),
        (a.a = [4, 4]),
        (a.f = [8, 8]),
        (a.bm = [16, 16]),
        (a.b = [32, 32]),
        (a.avw = [0, 64]),
        (a.avs = [64, 0]),
        (a.pv = [256, 256]),
        (a.gdr = [0, 512]),
        (a.p = [0, 1024]),
        (a.r = [0, 2048]),
        (a.m = [0, 4096]),
        (a.um = [0, 8192]),
        (a.ef = [0, 16384]),
        (a.s = [0, 32768]),
        (a.pmx = [0, 16777216]),
        (a.mut = [33554432, 33554432]),
        (a.umutb = [67108864, 67108864]),
        (a.tvoff = [134217728, 134217728]),
        a);
      this.g = {};
      for (var b in this.h) 0 < this.h[b][1] && (this.g[b] = 0);
      this.j = 0;
    };
    wo.prototype.reportEvent = function (a) {
      var b = this.h[a],
        c = b[1];
      this.j += b[0];
      0 < c && 0 == this.g[a] && (this.g[a] = 1);
    };
    var xo = function (a) {
        var b = Rf(a.h),
          c = 0,
          d;
        for (d in a.g)
          cc(b, d) && 1 == a.g[d] && ((c += a.h[d][1]), (a.g[d] = 2));
        return c;
      },
      yo = function (a) {
        var b = 0,
          c;
        for (c in a.g) {
          var d = a.g[c];
          if (1 == d || 2 == d) b += a.h[c][1];
        }
        return b;
      };
    var zo = function () {
      this.g = this.h = 0;
    };
    zo.prototype.ha = function () {
      return this.h;
    };
    var Ao = function (a, b, c) {
      32 <= b ||
        (a.g & (1 << b) && !c
          ? (a.h &= ~(1 << b))
          : a.g & (1 << b) || !c || (a.h |= 1 << b),
        (a.g |= 1 << b));
    };
    var Bo = function () {
      Hn.call(this);
      this.j = new tn();
      this.V = this.D = this.J = 0;
      this.H = -1;
      this.ma = new tn();
      this.l = new tn();
      this.g = new wn();
      this.A = this.o = -1;
      this.F = new tn();
      this.ga = 2e3;
      this.U = new zo();
      this.aa = new zo();
      this.Z = new zo();
    };
    v(Bo, Hn);
    var Co = function (a, b, c) {
      var d = a.V;
      Zl || c || -1 == a.H || (d += b - a.H);
      return d;
    };
    Bo.prototype.K = function (a, b, c, d) {
      if (!b.paused) {
        Hn.prototype.K.call(this, a, b, c, d);
        var e = jo(b) && jo(c),
          f = 0.5 <= (d ? Math.min(b.Y, c.Y) : c.Y);
        Im(b.volume) &&
          ((this.o = -1 != this.o ? Math.min(this.o, b.volume) : b.volume),
          (this.A = Math.max(this.A, b.volume)));
        f && ((this.J += a), (this.D += e ? a : 0));
        Fn(this.g, b.Y, c.Y, b.g, a, d, e);
        un(this.j, !0, a);
        un(this.l, e, a);
        un(this.F, c.fullscreen, a);
        un(this.ma, e && !f, a);
        a = Math.floor(b.mediaTime / 1e3);
        Ao(this.U, a, b.isVisible());
        Ao(this.aa, a, 1 <= b.Y);
        Ao(this.Z, a, jo(b));
      }
    };
    var Do = function () {
      this.j = !1;
    };
    Do.prototype.h = function (a) {
      this.j ||
        (this.g(a)
          ? ((a = this.K.report(this.o, a)), (this.l |= a), (a = 0 == a))
          : (a = !1),
        (this.j = a));
    };
    var Eo = function (a, b) {
      this.j = !1;
      this.o = a;
      this.K = b;
      this.l = 0;
    };
    v(Eo, Do);
    Eo.prototype.g = function () {
      return !0;
    };
    Eo.prototype.A = function () {
      return !1;
    };
    Eo.prototype.getId = function () {
      var a = this,
        b = Vf(function (c) {
          return c == a.o;
        });
      return hm[b].toString();
    };
    Eo.prototype.toString = function () {
      var a = "";
      this.A() && (a += "c");
      this.j && (a += "s");
      0 < this.l && (a += ":" + this.l);
      return this.getId() + a;
    };
    var Fo = function (a, b) {
      Eo.call(this, a, b);
      this.B = [];
    };
    v(Fo, Eo);
    Fo.prototype.h = function (a, b) {
      b = void 0 === b ? null : b;
      null != b && this.B.push(b);
      Eo.prototype.h.call(this, a);
    };
    var Go = function () {};
    var Ho = function () {};
    v(Ho, Go);
    Ho.prototype.h = function () {
      return null;
    };
    Ho.prototype.j = function () {
      return [];
    };
    var Io = function (a, b, c, d) {
      an.call(this, a, b, c, d);
    };
    v(Io, an);
    l = Io.prototype;
    l.Uc = function () {
      if (this.j) {
        var a = this.j,
          b = this.h.g.j;
        try {
          try {
            var c = Gm(a.getBoundingClientRect());
          } catch (n) {
            c = new D(0, 0, 0, 0);
          }
          var d = c.right - c.left,
            e = c.bottom - c.top,
            f = sm(a, b),
            g = f.x,
            h = f.y;
          var k = new D(
            Math.round(h),
            Math.round(g + d),
            Math.round(h + e),
            Math.round(g)
          );
        } catch (n) {
          k = yh(Pn);
        }
        this.g = k;
      }
    };
    l.Td = function () {
      this.l = this.h.o.g;
    };
    l.fe = function (a) {
      var b = 1 == Rk(this.T, "od");
      return Un(a, this.l, this.j, b);
    };
    l.Ud = function () {
      this.timestamp = $l();
    };
    l.Xa = function () {
      this.Ud();
      this.Uc();
      if (
        this.j &&
        "number" === typeof this.j.videoWidth &&
        "number" === typeof this.j.videoHeight
      ) {
        var a = this.j;
        var b = new A(a.videoWidth, a.videoHeight);
        a = this.g;
        var c = a.getWidth(),
          d = a.getHeight(),
          e = b.width;
        b = b.height;
        0 >= e ||
          0 >= b ||
          0 >= c ||
          0 >= d ||
          ((e /= b),
          (a = yh(a)),
          e > c / d
            ? ((c /= e),
              (d = (d - c) / 2),
              0 < d &&
                ((d = a.top + d),
                (a.top = Math.round(d)),
                (a.bottom = Math.round(d + c))))
            : ((d *= e),
              (c = Math.round((c - d) / 2)),
              0 < c &&
                ((c = a.left + c),
                (a.left = Math.round(c)),
                (a.right = Math.round(c + d)))));
        this.g = a;
      }
      this.Td();
      a = this.g;
      c = this.l;
      a =
        a.left <= c.right &&
        c.left <= a.right &&
        a.top <= c.bottom &&
        c.top <= a.bottom
          ? new D(
              Math.max(a.top, c.top),
              Math.min(a.right, c.right),
              Math.min(a.bottom, c.bottom),
              Math.max(a.left, c.left)
            )
          : new D(0, 0, 0, 0);
      c = a.top >= a.bottom || a.left >= a.right ? new D(0, 0, 0, 0) : a;
      a = this.h.o;
      b = e = d = 0;
      0 < (this.g.bottom - this.g.top) * (this.g.right - this.g.left) &&
        (this.fe(c)
          ? (c = new D(0, 0, 0, 0))
          : ((d = Qm().l),
            (b = new D(0, d.height, d.width, 0)),
            (d = Qn(c, this.g)),
            (e = Qn(c, Qm().g)),
            (b = Qn(c, b))));
      c =
        c.top >= c.bottom || c.left >= c.right
          ? new D(0, 0, 0, 0)
          : zh(c, -this.g.left, -this.g.top);
      Rm() || (e = d = 0);
      this.H = new cm(a, this.g, c, d, e, this.timestamp, b);
    };
    l.getName = function () {
      return this.h.getName();
    };
    var Jo = new D(0, 0, 0, 0),
      Ko = function (a, b, c) {
        an.call(this, null, a, b, c);
        this.B = a.isActive();
        this.A = 0;
      };
    v(Ko, Io);
    l = Ko.prototype;
    l.Rc = function () {
      this.o();
      return !0;
    };
    l.Za = function () {
      Io.prototype.Xa.call(this);
    };
    l.Ud = function () {};
    l.Uc = function () {};
    l.Xa = function () {
      this.o();
      Io.prototype.Xa.call(this);
    };
    l.yb = function (a) {
      a = a.isActive();
      a !== this.B &&
        (a
          ? this.o()
          : ((Qm().g = new D(0, 0, 0, 0)),
            (this.g = new D(0, 0, 0, 0)),
            (this.l = new D(0, 0, 0, 0)),
            (this.timestamp = -1)));
      this.B = a;
    };
    function Lo(a) {
      return [a.top, a.left, a.bottom, a.right];
    }
    var Mo = {},
      No =
        ((Mo.firstquartile = 0),
        (Mo.midpoint = 1),
        (Mo.thirdquartile = 2),
        (Mo.complete = 3),
        Mo),
      Oo = function (a, b, c, d, e, f) {
        f = void 0 === f ? new Ho() : f;
        Xn.call(this, b, c, d);
        this.pd = e;
        this.Yc = 0;
        this.ia = {};
        this.fa = new wo();
        this.ve = {};
        this.la = "";
        this.playerId = null;
        this.Na = !1;
        this.g = [];
        this.Ta = f.h();
        this.A = f.j();
        this.l = null;
        this.j = -1;
        this.X = this.F = void 0;
        this.I = this.G = 0;
        this.U = -1;
        this.ba = this.ga = !1;
        this.N = this.D = this.h = this.Eb = this.Fa = 0;
        new wn();
        this.V = this.Z = 0;
        this.aa = -1;
        this.ka = 0;
        this.B = Df;
        this.J = [this.uc()];
        this.sb = 2;
        this.rb = {};
        this.rb.pause = "p";
        this.rb.resume = "r";
        this.rb.skip = "s";
        this.rb.mute = "m";
        this.rb.unmute = "um";
        this.rb.exitfullscreen = "ef";
        this.o = null;
        this.ma = this.Ea = !1;
      };
    v(Oo, Xn);
    Oo.prototype.La = function () {
      return !0;
    };
    var Po = function (a) {
        a.ee = !0;
        0 != a.ka && (a.ka = 3);
      },
      Qo = function (a) {
        return void 0 === a ? a : Number(a) ? Bm(a, 3) : 0;
      };
    l = Oo.prototype;
    l.be = function (a) {
      return $n(this, a, Math.max(1e4, this.j / 3));
    };
    l.Ed = function (a, b, c, d, e, f, g) {
      var h = this,
        k = this.B(this) || {};
      ag(k, e);
      this.j = k.duration || this.j;
      this.F = k.isVpaid || this.F;
      this.X = k.isYouTube || this.X;
      vl();
      this.ma = !1;
      e = Ro(this, b);
      1 === So(this) && (f = e);
      Xn.prototype.Ed.call(this, a, b, c, d, k, f, g);
      this.Ta &&
        this.Ta.j &&
        Ub(this.A, function (n) {
          n.h(h);
        });
    };
    l.Fd = function (a, b, c) {
      Xn.prototype.Fd.call(this, a, b, c);
      To(this).K(a, b, this.pa, c);
      this.ba = jo(this.pa) && jo(b);
      -1 == this.U && this.ga && (this.U = this.oa().j.g);
      this.fa.j = 0;
      a = this.Ra();
      b.isVisible() && this.fa.reportEvent("vs");
      a && this.fa.reportEvent("vw");
      Im(b.volume) && this.fa.reportEvent("am");
      jo(b) ? this.fa.reportEvent("a") : this.fa.reportEvent("mut");
      this.zb && this.fa.reportEvent("f");
      -1 != b.h &&
        (this.fa.reportEvent("bm"),
        1 == b.h &&
          (this.fa.reportEvent("b"), jo(b) && this.fa.reportEvent("umutb")));
      jo(b) && b.isVisible() && this.fa.reportEvent("avs");
      this.ba && a && this.fa.reportEvent("avw");
      0 < b.Y && this.fa.reportEvent("pv");
      Uo(this, this.oa().j.g, !0) && this.fa.reportEvent("gdr");
      2e3 <= Cn(this.oa().h, 1) && this.fa.reportEvent("pmx");
      this.ma && this.fa.reportEvent("tvoff");
    };
    l.uc = function () {
      return new Bo();
    };
    l.oa = function () {
      return this.Dc;
    };
    var To = function (a, b) {
      return a.J[null != b && b < a.J.length ? b : a.J.length - 1];
    };
    Oo.prototype.bd = function () {
      return new io();
    };
    Oo.prototype.Tc = function (a, b, c, d) {
      a = Xn.prototype.Tc.call(this, a, b, c, void 0 === d ? -1 : d);
      a.fullscreen = this.zb;
      a.paused = 2 == this.ka;
      a.volume = c.volume;
      Im(a.volume) ||
        (this.Fa++, (b = this.pa), Im(b.volume) && (a.volume = b.volume));
      c = c.currentTime;
      a.mediaTime = void 0 !== c && 0 <= c ? c : -1;
      return a;
    };
    var So = function (a) {
        var b = !!Rk(J().T, "umt");
        return a.F || (!b && !a.X) ? 0 : 1;
      },
      Ro = function (a, b) {
        2 == a.ka
          ? (b = 0)
          : -1 == a.xc
          ? (b = 0)
          : ((b -= a.xc), (b = b > Math.max(1e4, a.j / 3) ? 0 : b));
        var c = a.B(a) || {};
        c = void 0 !== c.currentTime ? c.currentTime : a.G;
        var d = c - a.G,
          e = 0;
        0 <= d
          ? ((a.I += b), (a.V += Math.max(b - d, 0)), (e = Math.min(d, a.I)))
          : (a.Z += Math.abs(d));
        0 != d && (a.I = 0);
        -1 == a.aa && 0 < d && (a.aa = 0 <= Yl ? $l() - Yl : -1);
        a.G = c;
        return e;
      };
    Oo.prototype.Vc = function (a) {
      return Qm(), this.zb ? 1 : Xn.prototype.Vc.call(this, a);
    };
    Oo.prototype.va = function () {
      return 1;
    };
    Oo.prototype.getDuration = function () {
      return this.j;
    };
    var Vo = function (a, b) {
        Zb(a.A, function (c) {
          return c.o == b.o;
        }) || a.A.push(b);
      },
      Wo = function (a) {
        var b = An(a.oa().g, 1);
        return Uo(a, b);
      },
      Uo = function (a, b, c) {
        return 15e3 <= b
          ? !0
          : a.ga
          ? (void 0 === c ? 0 : c)
            ? !0
            : 0 < a.j
            ? b >= a.j / 2
            : 0 < a.U
            ? b >= a.U
            : !1
          : !1;
      },
      Xo = function (a) {
        var b = {},
          c = Qm();
        b.insideIframe = c.j;
        b.unmeasurable = a.Qa;
        b.position = a.kb();
        b.exposure = a.pa.Y;
        b.documentSize = c.o;
        b.viewportSize = new A(c.g.getWidth(), c.g.getHeight());
        null != a.o && (b.presenceData = a.o);
        b.screenShare = a.pa.ra;
        return b;
      },
      Yo = function (a) {
        var b = Bm(a.pa.Y, 2),
          c = a.fa.j,
          d = a.pa,
          e = To(a),
          f = Qo(e.o),
          g = Qo(e.A),
          h = Qo(d.volume),
          k = Bm(e.B, 2),
          n = Bm(e.G, 2),
          m = Bm(d.Y, 2),
          p = Bm(e.I, 2),
          u = Bm(e.N, 2);
        d = Bm(d.ra, 2);
        a = yh(a.kb());
        a.round();
        e = In(e, !1);
        return {
          lg: b,
          Pb: c,
          Ec: f,
          Ac: g,
          Gb: h,
          Fc: k,
          Bc: n,
          Y: m,
          Gc: p,
          Cc: u,
          ra: d,
          position: a,
          Hc: e,
        };
      },
      $o = function (a, b) {
        Zo(a.g, b, function () {
          return {
            lg: 0,
            Pb: void 0,
            Ec: -1,
            Ac: -1,
            Gb: -1,
            Fc: -1,
            Bc: -1,
            Y: -1,
            Gc: -1,
            Cc: -1,
            ra: -1,
            position: void 0,
            Hc: [],
          };
        });
        a.g[b] = Yo(a);
      },
      Zo = function (a, b, c) {
        for (var d = a.length; d < b + 1; ) a.push(c()), d++;
      },
      cp = function (a, b, c) {
        var d = a.ve[b];
        if (null != d) return d;
        d = ap(a, b);
        var e = Vf(function (f) {
          return f == b;
        });
        a = bp(a, d, d, c, No[Wf[e]]);
        "fully_viewable_audible_half_duration_impression" == b && (a.std = "csm");
        return a;
      },
      dp = function (a, b, c) {
        var d = [b];
        if (a != b || c != b) d.unshift(a), d.push(c);
        return d;
      },
      bp = function (a, b, c, d, e) {
        if (a.Qa) return { if: 0, vs: 0 };
        var f = yh(a.kb());
        f.round();
        var g = Qm(),
          h = J(),
          k = a.oa(),
          n = a.ca ? a.ca.getName() : "ns",
          m = {};
        m["if"] = g.j ? 1 : void 0;
        m.sdk = a.l ? a.l : void 0;
        m.t = a.dg;
        m.p = [f.top, f.left, f.bottom, f.right];
        m.tos = yn(k.h, !1);
        m.mtos = In(k);
        m.mcvt = k.X.j;
        m.ps = void 0;
        m.vht = Co(k, $l(), 2 == a.ka);
        m.mut = k.ma.j;
        m.a = Qo(a.pa.volume);
        m.mv = Qo(k.A);
        m.fs = a.zb ? 1 : 0;
        m.ft = k.F.g;
        m.at = k.l.g;
        m.as = 0 < k.o ? 1 : 0;
        m.atos = yn(k.g);
        m.ssb = yn(k.ba, !1);
        m.amtos = Bn(k.g, !1);
        m.uac = a.Fa;
        m.vpt = k.j.g;
        "nio" == n && ((m.nio = 1), (m.avms = "nio"));
        m.gmm = "4";
        m.gdr = Uo(a, k.j.g, !0) ? 1 : 0;
        m.efpf = a.sb;
        if ("gsv" == n || "nis" == n) (f = a.ca), 0 < f.A && (m.nnut = f.A);
        m.tcm = So(a);
        m.nmt = a.Z;
        m.bt = a.V;
        m.pst = a.aa;
        m.vpaid = a.F;
        m.dur = a.j;
        m.vmtime = a.G;
        m.is = a.fa.j;
        1 <= a.g.length &&
          ((m.i0 = a.g[0].Pb),
          (m.a0 = [a.g[0].Gb]),
          (m.c0 = [a.g[0].Y]),
          (m.ss0 = [a.g[0].ra]),
          (f = a.g[0].position),
          (m.p0 = f ? Lo(f) : void 0));
        2 <= a.g.length &&
          ((m.i1 = a.g[1].Pb),
          (m.a1 = dp(a.g[1].Ec, a.g[1].Gb, a.g[1].Ac)),
          (m.c1 = dp(a.g[1].Fc, a.g[1].Y, a.g[1].Bc)),
          (m.ss1 = dp(a.g[1].Gc, a.g[1].ra, a.g[1].Cc)),
          (f = a.g[1].position),
          (m.p1 = f ? Lo(f) : void 0),
          (m.mtos1 = a.g[1].Hc));
        3 <= a.g.length &&
          ((m.i2 = a.g[2].Pb),
          (m.a2 = dp(a.g[2].Ec, a.g[2].Gb, a.g[2].Ac)),
          (m.c2 = dp(a.g[2].Fc, a.g[2].Y, a.g[2].Bc)),
          (m.ss2 = dp(a.g[2].Gc, a.g[2].ra, a.g[2].Cc)),
          (f = a.g[2].position),
          (m.p2 = f ? Lo(f) : void 0),
          (m.mtos2 = a.g[2].Hc));
        4 <= a.g.length &&
          ((m.i3 = a.g[3].Pb),
          (m.a3 = dp(a.g[3].Ec, a.g[3].Gb, a.g[3].Ac)),
          (m.c3 = dp(a.g[3].Fc, a.g[3].Y, a.g[3].Bc)),
          (m.ss3 = dp(a.g[3].Gc, a.g[3].ra, a.g[3].Cc)),
          (f = a.g[3].position),
          (m.p3 = f ? Lo(f) : void 0),
          (m.mtos3 = a.g[3].Hc));
        m.cs = yo(a.fa);
        b &&
          ((m.ic = xo(a.fa)),
          (m.dvpt = k.j.h),
          (m.dvs = Dn(k.h, 0.5)),
          (m.dfvs = Dn(k.h, 1)),
          (m.davs = Dn(k.g, 0.5)),
          (m.dafvs = Dn(k.g, 1)),
          c && ((k.j.h = 0), En(k.h), En(k.g)),
          a.Ra() &&
            ((m.dtos = k.J),
            (m.dav = k.D),
            (m.dtoss = a.Yc + 1),
            c && ((k.J = 0), (k.D = 0), a.Yc++)),
          (m.dat = k.l.h),
          (m.dft = k.F.h),
          c && ((k.l.h = 0), (k.F.h = 0)));
        m.ps = [g.o.width, g.o.height];
        m.bs = [g.g.getWidth(), g.g.getHeight()];
        m.scs = [g.l.width, g.l.height];
        m.dom = g.domain;
        a.Eb && (m.vds = a.Eb);
        if (0 < a.A.length || a.Ta)
          (b = hc(a.A)),
            a.Ta && b.push(a.Ta),
            (m.pings = Xb(b, function (p) {
              return p.toString();
            }));
        b = Xb(
          Wb(a.A, function (p) {
            return p.A();
          }),
          function (p) {
            return p.getId();
          }
        );
        ic(b);
        m.ces = b;
        a.h && (m.vmer = a.h);
        a.D && (m.vmmk = a.D);
        a.N && (m.vmiec = a.N);
        m.avms = a.ca ? a.ca.getName() : "ns";
        a.ca && ag(m, a.ca.Ya());
        d
          ? ((m.c = Bm(a.pa.Y, 2)), (m.ss = Bm(a.pa.ra, 2)))
          : (m.tth = $l() - Xl);
        m.mc = Bm(k.G, 2);
        m.nc = Bm(k.B, 2);
        m.mv = Qo(k.A);
        m.nv = Qo(k.o);
        m.lte = Bm(a.gd, 2);
        d = To(a, e);
        In(k);
        m.qmtos = In(d);
        m.qnc = Bm(d.B, 2);
        m.qmv = Qo(d.A);
        m.qnv = Qo(d.o);
        m.qas = 0 < d.o ? 1 : 0;
        m.qi = a.la;
        m.avms || (m.avms = "geo");
        m.psm = k.U.g;
        m.psv = k.U.ha();
        m.psfv = k.aa.ha();
        m.psa = k.Z.ha();
        h = Tk(h.T);
        h.length && (m.veid = h);
        a.o && ag(m, ho(a.o));
        m.avas = a.sc();
        m.vs = a.de();
        return m;
      },
      ap = function (a, b) {
        if (cc(gm, b)) return !0;
        var c = a.ia[b];
        return void 0 !== c ? ((a.ia[b] = !0), !c) : !1;
      };
    Oo.prototype.de = function () {
      return this.Qa ? 2 : Wo(this) ? 5 : this.Ra() ? 4 : 3;
    };
    Oo.prototype.sc = function () {
      return this.Ea ? (2e3 <= this.oa().l.j ? 4 : 3) : 2;
    };
    var ep = Date.now(),
      hp = function () {
        this.g = {};
        var a = C();
        fp(this, a, document);
        var b = gp();
        try {
          if ("1" == b) {
            for (var c = a.parent; c != a.top; c = c.parent)
              fp(this, c, c.document);
            fp(this, a.top, a.top.document);
          }
        } catch (d) {}
      },
      gp = function () {
        var a = document.documentElement;
        try {
          if (!kh(C().top)) return "2";
          var b = [],
            c = C(a.ownerDocument);
          for (a = c; a != c.top; a = a.parent)
            if (a.frameElement) b.push(a.frameElement);
            else break;
          return b && 0 != b.length ? "1" : "0";
        } catch (d) {
          return "2";
        }
      },
      fp = function (a, b, c) {
        On(
          c,
          "mousedown",
          function () {
            return ip(a);
          },
          301
        );
        On(
          b,
          "scroll",
          function () {
            return jp(a);
          },
          302
        );
        On(
          c,
          "touchmove",
          function () {
            return kp(a);
          },
          303
        );
        On(
          c,
          "mousemove",
          function () {
            return lp(a);
          },
          304
        );
        On(
          c,
          "keydown",
          function () {
            return mp(a);
          },
          305
        );
      },
      ip = function (a) {
        Mf(a.g, function (b) {
          1e5 < b.j || ++b.j;
        });
      },
      jp = function (a) {
        Mf(a.g, function (b) {
          1e5 < b.g || ++b.g;
        });
      },
      kp = function (a) {
        Mf(a.g, function (b) {
          1e5 < b.g || ++b.g;
        });
      },
      mp = function (a) {
        Mf(a.g, function (b) {
          1e5 < b.h || ++b.h;
        });
      },
      lp = function (a) {
        Mf(a.g, function (b) {
          1e5 < b.o || ++b.o;
        });
      };
    var np = function () {
        this.g = [];
        this.h = [];
      },
      op = function (a, b) {
        return $b(a.g, function (c) {
          return c.la == b;
        });
      },
      pp = function (a, b) {
        return b
          ? $b(a.g, function (c) {
              return c.sa.fb == b;
            })
          : null;
      },
      qp = function (a, b) {
        return $b(a.h, function (c) {
          return 2 == c.va() && c.la == b;
        });
      },
      sp = function () {
        var a = rp;
        return 0 == a.g.length ? a.h : 0 == a.h.length ? a.g : gc(a.h, a.g);
      };
    np.prototype.reset = function () {
      this.g = [];
      this.h = [];
    };
    var tp = function (a, b) {
        a = 1 == b.va() ? a.g : a.h;
        var c = ac(a, function (d) {
          return d == b;
        });
        return -1 != c ? (a.splice(c, 1), b.ca && b.ca.Yb(), b.W(), !0) : !1;
      },
      up = function (a) {
        var b = rp;
        if (tp(b, a)) {
          switch (a.va()) {
            case 0:
              var c = function () {
                return null;
              };
            case 2:
              c = function () {
                return qp(b, a.la);
              };
              break;
            case 1:
              c = function () {
                return op(b, a.la);
              };
          }
          for (var d = c(); d; d = c()) tp(b, d);
        }
      },
      vp = function (a) {
        var b = rp;
        a = Wb(a, function (c) {
          return !pp(b, c.sa.fb);
        });
        b.g.push.apply(b.g, ia(a));
      },
      wp = function (a) {
        var b = [];
        Ub(a, function (c) {
          Zb(rp.g, function (d) {
            return d.sa.fb === c.sa.fb && d.la === c.la;
          }) || (rp.g.push(c), b.push(c));
        });
      },
      rp = E(np);
    var xp = function () {
        this.g = this.h = null;
      },
      yp = function (a, b) {
        if (null == a.h) return !1;
        var c = function (d, e) {
          b(d, e);
        };
        a.g = $b(a.h, function (d) {
          return null != d && d.Kd();
        });
        a.g && (a.g.init(c) ? Ym(a.g.g) : b(a.g.g.wb(), a.g));
        return null != a.g;
      };
    var Ap = function (a) {
      a = zp(a);
      bn.call(this, a.length ? a[a.length - 1] : new Um(K, 0));
      this.j = a;
      this.h = null;
    };
    v(Ap, bn);
    l = Ap.prototype;
    l.getName = function () {
      return (this.h ? this.h : this.g).getName();
    };
    l.Ya = function () {
      return (this.h ? this.h : this.g).Ya();
    };
    l.Pa = function () {
      return (this.h ? this.h : this.g).Pa();
    };
    l.init = function (a) {
      var b = !1;
      Ub(this.j, function (c) {
        c.initialize() && (b = !0);
      });
      b && ((this.o = a), Xm(this.g, this));
      return b;
    };
    l.W = function () {
      Ub(this.j, function (a) {
        a.W();
      });
      bn.prototype.W.call(this);
    };
    l.Kd = function () {
      return Zb(this.j, function (a) {
        return a.F();
      });
    };
    l.Fb = function () {
      return Zb(this.j, function (a) {
        return a.F();
      });
    };
    l.Zb = function (a, b, c) {
      return new Io(a, this.g, b, c);
    };
    l.Za = function (a) {
      this.h = a.h;
    };
    var zp = function (a) {
      if (!a.length) return [];
      a = Wb(a, function (c) {
        return null != c && c.F();
      });
      for (var b = 1; b < a.length; b++) Xm(a[b - 1], a[b]);
      return a;
    };
    var Bp = { threshold: [0, 0.3, 0.5, 0.75, 1] },
      Cp = function (a, b, c, d) {
        an.call(this, a, b, c, d);
        this.D = this.K = this.A = this.B = this.o = null;
      };
    v(Cp, Io);
    Cp.prototype.Rc = function () {
      var a = this;
      this.D || (this.D = $l());
      if (
        Rl(298, function () {
          return Dp(a);
        })
      )
        return !0;
      Wm(this.h, "msf");
      return !1;
    };
    Cp.prototype.Yb = function () {
      if (this.o && this.j)
        try {
          this.o.unobserve(this.j),
            this.B
              ? (this.B.unobserve(this.j), (this.B = null))
              : this.A && (this.A.disconnect(), (this.A = null));
        } catch (a) {}
    };
    var Ep = function (a) {
        return a.o && a.o.takeRecords ? a.o.takeRecords() : [];
      },
      Dp = function (a) {
        if (!a.j) return !1;
        var b = a.j,
          c = a.h.g.j,
          d = J().g.g;
        a.o = new c.IntersectionObserver(
          Bl(d, function (e) {
            return Fp(a, e);
          }),
          Bp
        );
        d = Bl(d, function () {
          a.o.unobserve(b);
          a.o.observe(b);
          Fp(a, Ep(a));
        });
        c.ResizeObserver
          ? ((a.B = new c.ResizeObserver(d)), a.B.observe(b))
          : c.MutationObserver &&
            ((a.A = new w.MutationObserver(d)),
            a.A.observe(b, {
              attributes: !0,
              childList: !0,
              characterData: !0,
              subtree: !0,
            }));
        a.o.observe(b);
        Fp(a, Ep(a));
        return !0;
      },
      Fp = function (a, b) {
        try {
          if (b.length) {
            a.K || (a.K = $l());
            var c = Gp(b),
              d = sm(a.j, a.h.g.j),
              e = d.x,
              f = d.y;
            a.g = new D(
              Math.round(f),
              Math.round(e) + c.boundingClientRect.width,
              Math.round(f) + c.boundingClientRect.height,
              Math.round(e)
            );
            var g = Gm(c.intersectionRect);
            a.l = zh(g, a.g.left - g.left, a.g.top - g.top);
          }
        } catch (h) {
          a.Yb(), Tl(299, h);
        }
      },
      Gp = function (a) {
        return Yb(
          a,
          function (b, c) {
            return b.time > c.time ? b : c;
          },
          a[0]
        );
      };
    l = Cp.prototype;
    l.Xa = function () {
      var a = Ep(this);
      0 < a.length && Fp(this, a);
      Io.prototype.Xa.call(this);
    };
    l.Uc = function () {};
    l.fe = function () {
      return !1;
    };
    l.Td = function () {};
    l.Ya = function () {
      var a = {};
      return Object.assign(
        this.h.Ya(),
        ((a.niot_obs = this.D), (a.niot_cbk = this.K), a)
      );
    };
    l.getName = function () {
      return "nio";
    };
    var Hp = function (a) {
      a = void 0 === a ? K : a;
      bn.call(this, new Um(a, 2));
    };
    v(Hp, bn);
    Hp.prototype.getName = function () {
      return "nio";
    };
    Hp.prototype.Fb = function () {
      return !Qm().h && null != this.g.g.j.IntersectionObserver;
    };
    Hp.prototype.Zb = function (a, b, c) {
      return new Cp(a, this.g, b, c);
    };
    var Jp = function () {
      var a = Ip();
      Um.call(this, K.top, a, "geo");
    };
    v(Jp, Um);
    Jp.prototype.aa = function () {
      return Qm().g;
    };
    Jp.prototype.F = function () {
      var a = Ip();
      this.K !== a &&
        (this.g != this && a > this.g.K && ((this.g = this), Vm(this)),
        (this.K = a));
      return 2 == a;
    };
    var Ip = function () {
      J();
      var a = Qm();
      return a.j || a.h ? 0 : 2;
    };
    var Kp = function () {};
    var Lp = function () {
        this.done = !1;
        this.g = {
          af: 0,
          Qd: 0,
          ei: 0,
          Yd: 0,
          ed: -1,
          hf: 0,
          gf: 0,
          jf: 0,
          ag: 0,
        };
        this.l = null;
        this.A = !1;
        this.j = null;
        this.B = 0;
        this.h = new Sm(this);
      },
      Op = function () {
        var a = Mp;
        a.A ||
          ((a.A = !0),
          Np(a, function () {
            return a.o.apply(a, ia(Ma.apply(0, arguments)));
          }),
          a.o());
      };
    Lp.prototype.sample = function () {
      Pp(this, sp(), !1);
    };
    var Qp = function () {
        E(Kp);
        var a = E(xp);
        null != a.g && a.g.g ? Ym(a.g.g) : Mm(Qm());
      },
      Pp = function (a, b, c) {
        if (!a.done && (a.h.cancel(), 0 != b.length)) {
          a.j = null;
          try {
            Qp();
            var d = $l();
            J().l = d;
            if (null != E(xp).g)
              for (var e = 0; e < b.length; e++) ao(b[e], d, c);
            for (d = 0; d < b.length; d++) bo(b[d]);
            ++a.g.Yd;
          } finally {
            c
              ? Ub(b, function (f) {
                  f.pa.Y = 0;
                })
              : Tm(a.h);
          }
        }
      },
      Np = function (a, b) {
        if (!a.l) {
          b = Sl(142, b);
          vl();
          var c = Xh(Wk);
          c && Jf(Wk, c, b, { capture: !1 }) && (a.l = b);
        }
      };
    Lp.prototype.o = function () {
      var a = Rm(),
        b = $l();
      a
        ? (Zl ||
            ((Vl = b),
            Ub(rp.g, function (c) {
              var d = c.oa();
              d.V = Co(d, b, 1 != c.ka);
            })),
          (Zl = !0))
        : ((this.B = Rp(this, b)),
          (Zl = !1),
          (Xl = b),
          Ub(rp.g, function (c) {
            c.Ib && (c.oa().H = b);
          }));
      Pp(this, sp(), !a);
    };
    var Sp = function () {
        var a = E(xp);
        if (null != a.g) {
          var b = a.g;
          Ub(sp(), function (c) {
            return Zn(c, b);
          });
        }
      },
      Rp = function (a, b) {
        a = a.B;
        Zl && (a += b - Vl);
        return a;
      },
      Tp = function (a) {
        a =
          void 0 === a
            ? function () {
                return {};
              }
            : a;
        Ol.yd("av-js");
        Kl.g = 0.01;
        Ql([
          function (b) {
            var c = J(),
              d = {};
            d = ((d.bin = c.h), (d.type = "error"), d);
            c = Sk(c.T);
            if (!Mp.j) {
              var e = Mp,
                f = K.document,
                g = 0 <= Wl ? $l() - Wl : -1,
                h = $l();
              -1 == e.g.ed && (g = h);
              var k = Qm(),
                n = J(),
                m = Sk(n.T),
                p = sp();
              try {
                if (0 < p.length) {
                  var u = k.g;
                  u && (m.bs = [u.getWidth(), u.getHeight()]);
                  var r = k.o;
                  r && (m.ps = [r.width, r.height]);
                  K.screen && (m.scs = [K.screen.width, K.screen.height]);
                } else
                  (m.url = encodeURIComponent(K.location.href.substring(0, 512))),
                    f.referrer &&
                      (m.referrer = encodeURIComponent(
                        f.referrer.substring(0, 512)
                      ));
                m.tt = g;
                m.pt = Wl;
                m.bin = n.h;
                void 0 !== K.google_osd_load_pub_page_exp &&
                  (m.olpp = K.google_osd_load_pub_page_exp);
                m.deb = [
                  1,
                  e.g.af,
                  e.g.Qd,
                  e.g.Yd,
                  e.g.ed,
                  0,
                  e.h.h,
                  e.g.hf,
                  e.g.gf,
                  e.g.jf,
                  e.g.ag,
                  -1,
                ].join(";");
                m.tvt = Rp(e, h);
                k.h && (m.inapp = 1);
                if (null !== K && K != K.top) {
                  0 < p.length &&
                    (m.iframe_loc = encodeURIComponent(
                      K.location.href.substring(0, 512)
                    ));
                  var x = k.H;
                  m.is = [x.getWidth(), x.getHeight()];
                }
              } catch (P) {
                m.error = 1;
              }
              Mp.j = m;
            }
            r = Mp.j;
            u = {};
            for (var B in r) u[B] = r[B];
            B = J().g;
            if (1 == Rk(B.j, "prf")) {
              r = new zl();
              x = B.g;
              e = 0;
              -1 < x.g && (e = x.j.g.now() - x.g);
              x = x.o + e;
              if (null != x && "number" !== typeof x)
                throw Error(
                  "Value of float/double field must be a number, found " +
                    typeof x +
                    ": " +
                    x
                );
              r = Fe(r, 1, x, 0);
              x = B.g;
              r = Fe(r, 5, $d(-1 < x.g ? x.h + 1 : x.h), 0);
              r = Fe(r, 2, ce(B.h.g.j()), "0");
              r = Fe(r, 3, ce(B.h.g.h()), "0");
              B = Fe(r, 4, ce(B.h.g.g()), "0");
              r = {};
              B = ((r.pf = Uc(B.g())), r);
            } else B = {};
            ag(u, B);
            ag(b, d, c, u, a());
          },
        ]);
      },
      Mp = E(Lp);
    var Up = null,
      Vp = "",
      Wp = !1,
      Xp = function () {
        var a = Up || K;
        if (!a) return "";
        var b = [];
        if (!a.location || !a.location.href) return "";
        b.push("url=" + encodeURIComponent(a.location.href.substring(0, 512)));
        a.document &&
          a.document.referrer &&
          b.push(
            "referrer=" +
              encodeURIComponent(a.document.referrer.substring(0, 512))
          );
        return b.join("&");
      };
    function Yp() {
      var a =
          "av.default_js_unreleased_RCxx".match(/_(\d{8})_RC\d+$/) ||
          "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+_\d+$/) ||
          "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+\.\d+$/) ||
          "av.default_js_unreleased_RCxx".match(/_(\d{8})_\d+_RC\d+$/),
        b;
      if (2 == (null == (b = a) ? void 0 : b.length)) return a[1];
      a = "av.default_js_unreleased_RCxx".match(
        /.*_(\d{2})\.(\d{4})\.\d+_RC\d+$/
      );
      var c;
      return 3 == (null == (c = a) ? void 0 : c.length)
        ? "20" + a[1] + a[2]
        : null;
    }
    var Zp = function () {
        return "ima_html5_sdk".includes("ima_html5_sdk")
          ? { Ga: "ima", Ha: null }
          : "ima_html5_sdk".includes("ima_native_sdk")
          ? { Ga: "nima", Ha: null }
          : "ima_html5_sdk".includes("admob-native-video-javascript")
          ? { Ga: "an", Ha: null }
          : "av.default_js_unreleased_RCxx".includes("cast_js_sdk")
          ? { Ga: "cast", Ha: Yp() }
          : "av.default_js_unreleased_RCxx".includes("youtube.player.web")
          ? { Ga: "yw", Ha: Yp() }
          : "av.default_js_unreleased_RCxx".includes("outstream_web_client")
          ? { Ga: "out", Ha: Yp() }
          : "av.default_js_unreleased_RCxx".includes("drx_rewarded_web")
          ? { Ga: "r", Ha: Yp() }
          : "av.default_js_unreleased_RCxx".includes("gam_native_web_video")
          ? { Ga: "n", Ha: Yp() }
          : "av.default_js_unreleased_RCxx".includes("admob_interstitial_video")
          ? { Ga: "int", Ha: Yp() }
          : { Ga: "j", Ha: null };
      },
      $p = Zp().Ga,
      aq = Zp().Ha;
    var cq = function (a, b) {
        var c = { sv: "958" };
        null !== aq && (c.v = aq);
        c.cb = $p;
        c.nas = rp.g.length;
        c.msg = a;
        void 0 !== b && (a = bq(b)) && (c.e = hm[a]);
        return c;
      },
      dq = function (a) {
        return 0 == a.lastIndexOf("custom_metric_viewable", 0);
      },
      bq = function (a) {
        var b = dq(a) ? "custom_metric_viewable" : a.toLowerCase();
        return Vf(function (c) {
          return c == b;
        });
      };
    var eq = { Gg: "visible", pg: "audible", Eh: "time", Gh: "timetype" },
      fq = {
        visible: function (a) {
          return /^(100|[0-9]{1,2})$/.test(a);
        },
        audible: function (a) {
          return "0" == a || "1" == a;
        },
        timetype: function (a) {
          return "mtos" == a || "tos" == a;
        },
        time: function (a) {
          return /^(100|[0-9]{1,2})%$/.test(a) || /^([0-9])+ms$/.test(a);
        },
      },
      gq = function () {
        this.g = void 0;
        this.h = !1;
        this.j = 0;
        this.o = -1;
        this.l = "tos";
      },
      hq = function (a) {
        try {
          var b = a.split(",");
          return b.length > Rf(eq).length
            ? null
            : Yb(
                b,
                function (c, d) {
                  d = d.toLowerCase().split("=");
                  if (2 != d.length || void 0 === fq[d[0]] || !fq[d[0]](d[1]))
                    throw Error("Entry (" + d[0] + ", " + d[1] + ") is invalid.");
                  c[d[0]] = d[1];
                  return c;
                },
                {}
              );
        } catch (c) {
          return null;
        }
      },
      iq = function (a, b) {
        if (void 0 == a.g) return 0;
        switch (a.l) {
          case "mtos":
            return a.h ? Cn(b.g, a.g) : Cn(b.h, a.g);
          case "tos":
            return a.h ? An(b.g, a.g) : An(b.h, a.g);
        }
        return 0;
      };
    var jq = function (a, b, c, d) {
      Eo.call(this, b, d);
      this.B = a;
      this.H = c;
    };
    v(jq, Eo);
    jq.prototype.getId = function () {
      return this.B;
    };
    jq.prototype.A = function () {
      return !0;
    };
    jq.prototype.g = function (a) {
      var b = a.oa(),
        c = a.getDuration();
      return Zb(this.H, function (d) {
        if (void 0 != d.g) var e = iq(d, b);
        else
          b: {
            switch (d.l) {
              case "mtos":
                e = d.h ? b.l.j : b.j.g;
                break b;
              case "tos":
                e = d.h ? b.l.g : b.j.g;
                break b;
            }
            e = 0;
          }
        0 == e
          ? (d = !1)
          : ((d = -1 != d.j ? d.j : void 0 !== c && 0 < c ? d.o * c : -1),
            (d = -1 != d && e >= d));
        return d;
      });
    };
    var kq = function () {};
    v(kq, uo);
    kq.prototype.g = function (a) {
      var b = new to();
      b.g = vo(a, qo);
      b.h = vo(a, so);
      return b;
    };
    var lq = function (a) {
      Eo.call(this, "fully_viewable_audible_half_duration_impression", a);
    };
    v(lq, Eo);
    lq.prototype.g = function (a) {
      return Wo(a);
    };
    var mq = function (a) {
      this.g = a;
    };
    v(mq, Go);
    var nq = function (a, b) {
      Eo.call(this, a, b);
    };
    v(nq, Eo);
    nq.prototype.g = function (a) {
      return a.oa().Ra();
    };
    var oq = function (a) {
      Fo.call(this, "measurable_impression", a);
    };
    v(oq, Fo);
    oq.prototype.g = function (a) {
      var b = cc(this.B, Rk(J().T, "ovms"));
      return !a.Qa && (0 != a.ka || b);
    };
    var pq = function () {
      mq.apply(this, arguments);
    };
    v(pq, mq);
    pq.prototype.h = function () {
      return new oq(this.g);
    };
    pq.prototype.j = function () {
      return [new nq("viewable_impression", this.g), new lq(this.g)];
    };
    var qq = function (a, b, c) {
      Ko.call(this, a, b, c);
    };
    v(qq, Ko);
    qq.prototype.o = function () {
      var a = Ra("ima.admob.getViewability"),
        b = Rk(this.T, "queryid");
      "function" === typeof a && b && a(b);
    };
    qq.prototype.getName = function () {
      return "gsv";
    };
    var rq = function (a) {
      a = void 0 === a ? K : a;
      bn.call(this, new Um(a, 2));
    };
    v(rq, bn);
    rq.prototype.getName = function () {
      return "gsv";
    };
    rq.prototype.Fb = function () {
      var a = Qm();
      J();
      return a.h && !1;
    };
    rq.prototype.Zb = function (a, b, c) {
      return new qq(this.g, b, c);
    };
    var sq = function (a, b, c) {
      Ko.call(this, a, b, c);
    };
    v(sq, Ko);
    sq.prototype.o = function () {
      var a = this,
        b = Ra("ima.bridge.getNativeViewability"),
        c = Rk(this.T, "queryid");
      "function" === typeof b &&
        c &&
        b(c, function (d) {
          Xf(d) && a.A++;
          var e = d.opt_nativeViewVisibleBounds || {},
            f = d.opt_nativeViewHidden;
          a.g = Hm(d.opt_nativeViewBounds || {});
          var g = a.h.o;
          g.g = f ? yh(Jo) : Hm(e);
          a.timestamp = d.opt_nativeTime || -1;
          Qm().g = g.g;
          d = d.opt_nativeVolume;
          void 0 !== d && (g.volume = d);
        });
    };
    sq.prototype.getName = function () {
      return "nis";
    };
    var tq = function (a) {
      a = void 0 === a ? K : a;
      bn.call(this, new Um(a, 2));
    };
    v(tq, bn);
    tq.prototype.getName = function () {
      return "nis";
    };
    tq.prototype.Fb = function () {
      var a = Qm();
      J();
      return a.h && !1;
    };
    tq.prototype.Zb = function (a, b, c) {
      return new sq(this.g, b, c);
    };
    var uq = function () {
      Um.call(this, K, 2, "mraid");
      this.ga = 0;
      this.I = this.J = !1;
      this.H = null;
      this.h = im(this.j);
      this.o.g = new D(0, 0, 0, 0);
      this.ba = !1;
    };
    v(uq, Um);
    uq.prototype.F = function () {
      return null != this.h.Ba;
    };
    uq.prototype.Z = function () {
      var a = {};
      this.ga && (a.mraid = this.ga);
      this.J && (a.mlc = 1);
      a.mtop = this.h.Zf;
      this.H && (a.mse = this.H);
      this.ba && (a.msc = 1);
      a.mcp = this.h.lc;
      return a;
    };
    uq.prototype.A = function (a) {
      var b = Ma.apply(1, arguments);
      try {
        return this.h.Ba[a].apply(this.h.Ba, b);
      } catch (c) {
        Tl(538, c, 0.01, function (d) {
          d.method = a;
        });
      }
    };
    var vq = function (a, b, c) {
      a.A("addEventListener", b, c);
    };
    uq.prototype.initialize = function () {
      var a = this;
      if (this.ta) return !this.Mb();
      this.ta = !0;
      if (2 === this.h.lc) return (this.H = "ng"), Wm(this, "w"), !1;
      if (1 === this.h.lc) return (this.H = "mm"), Wm(this, "w"), !1;
      Qm().K = !0;
      this.j.document.readyState && "complete" == this.j.document.readyState
        ? wq(this)
        : On(
            this.j,
            "load",
            function () {
              vl().setTimeout(
                Sl(292, function () {
                  return wq(a);
                }),
                100
              );
            },
            292
          );
      return !0;
    };
    var wq = function (a) {
        J().o = !!a.A("isViewable");
        vq(a, "viewableChange", xq);
        "loading" === a.A("getState") ? vq(a, "ready", yq) : zq(a);
      },
      zq = function (a) {
        "string" === typeof a.h.Ba.AFMA_LIDAR
          ? ((a.J = !0), Aq(a))
          : ((a.h.lc = 3), (a.H = "nc"), Wm(a, "w"));
      },
      Aq = function (a) {
        a.I = !1;
        var b = 1 == Rk(J().T, "rmmt"),
          c = !!a.A("isViewable");
        (b ? !c : 1) &&
          vl().setTimeout(
            Sl(524, function () {
              a.I || (Bq(a), Tl(540, Error()), (a.H = "mt"), Wm(a, "w"));
            }),
            500
          );
        Cq(a);
        vq(a, a.h.Ba.AFMA_LIDAR, Dq);
      },
      Cq = function (a) {
        var b = 1 == Rk(J().T, "sneio"),
          c = void 0 !== a.h.Ba.AFMA_LIDAR_EXP_1,
          d = void 0 !== a.h.Ba.AFMA_LIDAR_EXP_2;
        (b = b && d) && (a.h.Ba.AFMA_LIDAR_EXP_2 = !0);
        c && (a.h.Ba.AFMA_LIDAR_EXP_1 = !b);
      },
      Bq = function (a) {
        a.A("removeEventListener", a.h.Ba.AFMA_LIDAR, Dq);
        a.J = !1;
      };
    uq.prototype.U = function () {
      var a = Qm(),
        b = Eq(this, "getMaxSize");
      a.g = new D(0, b.width, b.height, 0);
    };
    uq.prototype.V = function () {
      Qm().l = Eq(this, "getScreenSize");
    };
    var Eq = function (a, b) {
      if ("loading" === a.A("getState")) return new A(-1, -1);
      b = a.A(b);
      if (!b) return new A(-1, -1);
      a = parseInt(b.width, 10);
      b = parseInt(b.height, 10);
      return isNaN(a) || isNaN(b) ? new A(-1, -1) : new A(a, b);
    };
    uq.prototype.W = function () {
      Bq(this);
      Um.prototype.W.call(this);
    };
    var yq = function () {
        try {
          var a = E(uq);
          a.A("removeEventListener", "ready", yq);
          zq(a);
        } catch (b) {
          Tl(541, b);
        }
      },
      Dq = function (a, b) {
        try {
          var c = E(uq);
          c.I = !0;
          var d = a
            ? new D(a.y, a.x + a.width, a.y + a.height, a.x)
            : new D(0, 0, 0, 0);
          var e = $l(),
            f = Rm();
          var g = new bm(e, f, c);
          g.g = d;
          g.volume = b;
          c.Za(g);
        } catch (h) {
          Tl(542, h);
        }
      },
      xq = function (a) {
        var b = J(),
          c = E(uq);
        a && !b.o && ((b.o = !0), (c.ba = !0), c.H && Wm(c, "w", !0));
      };
    var El = new (function (a, b) {
      this.key = a;
      this.defaultValue = void 0 === b ? !1 : b;
      this.valueType = "boolean";
    })("45378663");
    var Gq = function () {
      this.j = this.ta = !1;
      this.g = this.h = null;
      var a = {};
      this.J =
        ((a.start = this.Bf),
        (a.firstquartile = this.wf),
        (a.midpoint = this.yf),
        (a.thirdquartile = this.Cf),
        (a.complete = this.tf),
        (a.error = this.uf),
        (a.pause = this.od),
        (a.resume = this.pe),
        (a.skip = this.Af),
        (a.viewable_impression = this.Ia),
        (a.mute = this.Db),
        (a.unmute = this.Db),
        (a.fullscreen = this.xf),
        (a.exitfullscreen = this.vf),
        (a.fully_viewable_audible_half_duration_impression = this.Ia),
        (a.measurable_impression = this.Ia),
        (a.abandon = this.od),
        (a.engagedview = this.Ia),
        (a.impression = this.Ia),
        (a.creativeview = this.Ia),
        (a.progress = this.Db),
        (a.custom_metric_viewable = this.Ia),
        (a.bufferstart = this.od),
        (a.bufferfinish = this.pe),
        (a.audio_measurable = this.Ia),
        (a.audio_audible = this.Ia),
        a);
      a = {};
      this.U =
        ((a.overlay_resize = this.zf),
        (a.abandon = this.dd),
        (a.close = this.dd),
        (a.collapse = this.dd),
        (a.overlay_unmeasurable_impression = function (b) {
          return cp(b, "overlay_unmeasurable_impression", Rm());
        }),
        (a.overlay_viewable_immediate_impression = function (b) {
          return cp(b, "overlay_viewable_immediate_impression", Rm());
        }),
        (a.overlay_unviewable_impression = function (b) {
          return cp(b, "overlay_unviewable_impression", Rm());
        }),
        (a.overlay_viewable_end_of_session_impression = function (b) {
          return cp(b, "overlay_viewable_end_of_session_impression", Rm());
        }),
        a);
      J().h = 3;
      Fq(this);
    };
    Gq.prototype.l = function (a) {
      Yn(a, !1);
      up(a);
    };
    Gq.prototype.H = function () {};
    var Hq = function (a, b, c, d) {
      a = a.A(null, d, !0, b);
      a.l = c;
      vp([a]);
      return a;
    };
    Gq.prototype.A = function (a, b, c, d) {
      var e = this;
      a = new Oo(K, a, c ? b : -1, 7, this.Wc(), this.Xd());
      a.la = d;
      Pk(a.T);
      Qk(a.T, "queryid", a.la);
      a.qd("");
      co(
        a,
        function () {
          return e.I.apply(e, ia(Ma.apply(0, arguments)));
        },
        function () {
          return e.N.apply(e, ia(Ma.apply(0, arguments)));
        }
      );
      (d = E(xp).g) && Zn(a, d);
      a.sa.fb && E(Kp);
      return a;
    };
    var Iq = function (a, b, c) {
        xk(b);
        var d = a.g;
        Ub(b, function (e) {
          var f = Xb(e.j, function (g) {
            var h = hq(g);
            if (null == h) g = null;
            else if (
              ((g = new gq()),
              null != h.visible && (g.g = h.visible / 100),
              null != h.audible && (g.h = 1 == h.audible),
              null != h.time)
            ) {
              var k = "mtos" == h.timetype ? "mtos" : "tos",
                n = kb(h.time, "%") ? "%" : "ms";
              h = parseInt(h.time, 10);
              "%" == n && (h /= 100);
              "ms" == n ? ((g.j = h), (g.o = -1)) : ((g.j = -1), (g.o = h));
              g.l = void 0 === k ? "tos" : k;
            }
            return g;
          });
          Zb(f, function (g) {
            return null == g;
          }) || Vo(c, new jq(e.id, e.g, f, d));
        });
      },
      Jq = function () {
        var a = [],
          b = J();
        a.push(E(Jp));
        Rk(b.T, "mvp_lv") && a.push(E(uq));
        b = [new rq(), new tq()];
        b.push(new Ap(a));
        b.push(new Hp(K));
        return b;
      },
      Lq = function (a) {
        if (!a.ta) {
          a.ta = !0;
          try {
            var b = $l(),
              c = J(),
              d = Qm();
            Wl = b;
            c.j = 79463069;
            "o" !== a.h && (Up = xh(K));
            if (wl()) {
              Mp.g.Qd = 0;
              Mp.g.ed = $l() - b;
              var e = Jq(),
                f = E(xp);
              f.h = e;
              yp(f, function () {
                Kq();
              })
                ? Mp.done || (Sp(), Xm(f.g.g, a), Op())
                : d.j
                ? Kq()
                : Op();
            } else Wp = !0;
          } catch (g) {
            throw (rp.reset(), g);
          }
        }
      },
      Mq = function (a) {
        Mp.h.cancel();
        Vp = a;
        Mp.done = !0;
      },
      Nq = function (a) {
        if (a.h) return a.h;
        var b = E(xp).g;
        if (b)
          switch (b.getName()) {
            case "nis":
              a.h = "n";
              break;
            case "gsv":
              a.h = "m";
          }
        a.h || (a.h = "h");
        return a.h;
      },
      Oq = function (a, b, c) {
        if (null == a.g) return (b.Eb |= 4), !1;
        a = a.g.report(c, b);
        b.Eb |= a;
        return 0 == a;
      };
    Gq.prototype.yb = function (a) {
      switch (a.Pa()) {
        case 0:
          if ((a = E(xp).g)) (a = a.g), dc(a.l, this), a.D && this.La() && Zm(a);
          Kq();
          break;
        case 2:
          Op();
      }
    };
    Gq.prototype.Za = function () {};
    Gq.prototype.La = function () {
      return !1;
    };
    var Kq = function () {
      var a = [new Hp(K)],
        b = E(xp);
      b.h = a;
      yp(b, function () {
        Mq("i");
      })
        ? Mp.done || (Sp(), Op())
        : Mq("i");
    };
    Gq.prototype.N = function (a, b) {
      a.Qa = !0;
      switch (a.va()) {
        case 1:
          Pq(a, b);
          break;
        case 2:
          this.td(a);
      }
      this.xd(a);
    };
    var Pq = function (a, b) {
      if (!a.Na) {
        var c = cp(a, "start", Rm());
        c = a.pd.g(c).g;
        var d = { id: "lidarv" };
        d.r = b;
        d.sv = "958";
        null !== aq && (d.v = aq);
        Zg(c, function (e, f) {
          return (d[e] = "mtos" == e || "tos" == e ? f : encodeURIComponent(f));
        });
        b = Xp();
        Zg(b, function (e, f) {
          return (d[e] = encodeURIComponent(f));
        });
        b =
          "//pagead2.googlesyndication.com/pagead/gen_204?" + kn(hn(new fn(), d));
        nn(b);
        a.Na = !0;
      }
    };
    l = Gq.prototype;
    l.Bf = function (a) {
      var b = a.B(a);
      b && ((b = b.volume), (a.Ea = Im(b) && 0 < b));
      $o(a, 0);
      return cp(a, "start", Rm());
    };
    l.Db = function (a, b, c) {
      Pp(Mp, [a], !Rm());
      return this.Ia(a, b, c);
    };
    l.Ia = function (a, b, c) {
      return cp(a, c, Rm());
    };
    l.wf = function (a) {
      return Qq(a, "firstquartile", 1);
    };
    l.yf = function (a) {
      a.ga = !0;
      return Qq(a, "midpoint", 2);
    };
    l.Cf = function (a) {
      return Qq(a, "thirdquartile", 3);
    };
    l.tf = function (a) {
      var b = Qq(a, "complete", 4);
      Po(a);
      return b;
    };
    l.uf = function (a) {
      a.ka = 3;
      return cp(a, "error", Rm());
    };
    var Qq = function (a, b, c) {
      Pp(Mp, [a], !Rm());
      $o(a, c);
      4 != c && Zo(a.J, c, a.uc);
      return cp(a, b, Rm());
    };
    l = Gq.prototype;
    l.pe = function (a, b, c) {
      b = Rm();
      2 != a.ka || b || (a.oa().H = $l());
      Pp(Mp, [a], !b);
      2 == a.ka && (a.ka = 1);
      return cp(a, c, b);
    };
    l.Af = function (a, b) {
      b = this.Db(a, b || {}, "skip");
      Po(a);
      return b;
    };
    l.xf = function (a, b) {
      Yn(a, !0);
      return this.Db(a, b || {}, "fullscreen");
    };
    l.vf = function (a, b) {
      Yn(a, !1);
      return this.Db(a, b || {}, "exitfullscreen");
    };
    l.od = function (a, b, c) {
      b = a.oa();
      b.V = Co(b, $l(), 1 != a.ka);
      Pp(Mp, [a], !Rm());
      1 == a.ka && (a.ka = 2);
      return cp(a, c, Rm());
    };
    l.zf = function (a) {
      Pp(Mp, [a], !Rm());
      return a.h();
    };
    l.dd = function (a) {
      Pp(Mp, [a], !Rm());
      this.ne(a);
      Po(a);
      return a.h();
    };
    var Fq = function (a) {
        Tp(function () {
          var b = Rq();
          null != a.h && (b.sdk = a.h);
          var c = E(xp);
          null != c.g && (b.avms = c.g.getName());
          return b;
        });
      },
      Sq = function (a, b, c, d) {
        var e = pp(rp, c);
        null !== e && e.la !== b && (a.l(e), (e = null));
        e ||
          ((b = a.A(c, $l(), !1, b)),
          0 == rp.h.length && (J().j = 79463069),
          wp([b]),
          (e = b),
          (e.l = Nq(a)),
          d && (e.playerId = d));
        return e;
      };
    Gq.prototype.I = function () {};
    var Uq = function (a, b) {
      b.D = 0;
      for (var c in dm) null == a[c] && (b.D |= dm[c]);
      Tq(a, "currentTime");
      Tq(a, "duration");
    };
    l = Gq.prototype;
    l.td = function () {};
    l.ne = function () {};
    l.Ld = function () {};
    l.xd = function () {};
    l.Xc = function () {};
    l.Xd = function () {
      this.g || (this.g = this.Xc());
      return null == this.g || this.j ? new Ho() : new pq(this.g);
    };
    l.Wc = function () {
      return new kq();
    };
    var Tq = function (a, b) {
        var c = a[b];
        void 0 !== c && 0 < c && (a[b] = Math.floor(1e3 * c));
      },
      Rq = function () {
        var a = Qm(),
          b = {},
          c = {},
          d = {};
        return Object.assign(
          {},
          ((b.sv = "958"), b),
          null !== aq && ((c.v = aq), c),
          ((d["if"] = a.j ? "1" : "0"), (d.nas = String(rp.g.length)), d)
        );
      };
    var Vq = function (a) {
      Eo.call(this, "audio_audible", a);
    };
    v(Vq, Eo);
    Vq.prototype.g = function (a) {
      return 4 == a.sc();
    };
    var Wq = function (a) {
      Fo.call(this, "audio_measurable", a);
    };
    v(Wq, Fo);
    Wq.prototype.g = function (a) {
      a = a.sc();
      return 3 == a || 4 == a;
    };
    var Xq = function () {
      mq.apply(this, arguments);
    };
    v(Xq, mq);
    Xq.prototype.h = function () {
      return new Wq(this.g);
    };
    Xq.prototype.j = function () {
      return [new Vq(this.g)];
    };
    var Yq = function () {};
    v(Yq, uo);
    Yq.prototype.g = function (a) {
      a &&
        (28 === a.e && (a = Object.assign({}, a, { avas: 3 })),
        4 === a.vs || 5 === a.vs) &&
        (a = Object.assign({}, a, { vs: 3 }));
      var b = new to();
      b.g = vo(a, ro);
      b.h = vo(a, so);
      return b;
    };
    var Zq = function (a) {
      this.h = a;
    };
    Zq.prototype.report = function (a, b) {
      var c = this.g(b);
      if ("function" === typeof c) {
        var d = {};
        var e = {};
        d = Object.assign(
          {},
          null !== aq && ((d.v = aq), d),
          ((e.sv = "958"), (e.cb = $p), (e.e = $q(a)), e)
        );
        e = cp(b, a, Rm());
        ag(d, e);
        b.ve[a] = e;
        d = 2 == b.va() ? mn(d).join("&") : b.pd.g(d).g;
        try {
          return c(b.la, d, a), 0;
        } catch (f) {
          return 2;
        }
      } else return 1;
    };
    var $q = function (a) {
      var b = dq(a) ? "custom_metric_viewable" : a;
      a = Vf(function (c) {
        return c == b;
      });
      return hm[a];
    };
    Zq.prototype.g = function () {
      return Ra(this.h);
    };
    var ar = function (a, b) {
      this.h = a;
      this.j = b;
    };
    v(ar, Zq);
    ar.prototype.g = function (a) {
      if (!a.playerId) return Zq.prototype.g.call(this, a);
      if (this.j[a.playerId]) return function () {};
      Tl(393, Error());
      return null;
    };
    var br = function () {
      Gq.call(this);
      this.D = void 0;
      this.F = null;
      this.K = !1;
      this.o = {};
      this.G = 0;
      this.B = "ACTIVE_VIEW_TRAFFIC_TYPE_UNSPECIFIED";
    };
    v(br, Gq);
    br.prototype.H = function (a, b) {
      var c = this,
        d = E(xp);
      if (null != d.g)
        switch (d.g.getName()) {
          case "nis":
            var e = cr(this, a, b);
            break;
          case "gsv":
            e = dr(this, a, b);
            break;
          case "exc":
            e = er(this, a);
        }
      e ||
        (b.opt_overlayAdElement
          ? (e = void 0)
          : b.opt_adElement && (e = Sq(this, a, b.opt_adElement, b.opt_osdId)));
      e &&
        1 == e.va() &&
        (e.B == Df &&
          (e.B = function (f) {
            return c.Ld(f);
          }),
        fr(this, e, b));
      return e;
    };
    var fr = function (a, b, c) {
      c = c.opt_configurable_tracking_events;
      null != a.g && Array.isArray(c) && Iq(a, c, b);
    };
    br.prototype.Ld = function (a) {
      a.h = 0;
      a.N = 0;
      if ("h" == a.l || "n" == a.l) {
        var b;
        J();
        if (a.playerId && gr(this)) {
          var c = this.o[a.playerId];
          c
            ? (b = function (e) {
                return hr(c, e);
              })
            : null !== c && Tl(379, Error());
        } else b = Ra("ima.common.getVideoMetadata");
        if ("function" === typeof b)
          try {
            var d = b(a.la);
          } catch (e) {
            a.h |= 4;
          }
        else a.h |= 2;
      } else if ("b" == a.l)
        if (((b = Ra("ytads.bulleit.getVideoMetadata")), "function" === typeof b))
          try {
            d = b(a.la);
          } catch (e) {
            a.h |= 4;
          }
        else a.h |= 2;
      else if ("ml" == a.l)
        if (((b = Ra("ima.common.getVideoMetadata")), "function" === typeof b))
          try {
            d = b(a.la);
          } catch (e) {
            a.h |= 4;
          }
        else a.h |= 2;
      else a.h |= 1;
      a.h ||
        (void 0 === d
          ? (a.h |= 8)
          : null === d
          ? (a.h |= 16)
          : Xf(d)
          ? (a.h |= 32)
          : null != d.errorCode && ((a.N = d.errorCode), (a.h |= 64)));
      null == d && (d = {});
      Uq(d, a);
      Im(d.volume) && Im(this.D) && (d.volume *= this.D);
      return d;
    };
    var dr = function (a, b, c) {
        var d = op(rp, b);
        d ||
          ((d = c.opt_nativeTime || -1),
          (d = Hq(a, b, Nq(a), d)),
          c.opt_osdId && (d.playerId = c.opt_osdId));
        return d;
      },
      cr = function (a, b, c) {
        var d = op(rp, b);
        d || (d = Hq(a, b, "n", c.opt_nativeTime || -1));
        return d;
      },
      er = function (a, b) {
        var c = op(rp, b);
        c || (c = Hq(a, b, "h", -1));
        return c;
      };
    br.prototype.Xc = function () {
      if (gr(this))
        return new ar("ima.common.triggerExternalActivityEvent", this.o);
      var a = ir(this);
      return null != a ? new Zq(a) : null;
    };
    var ir = function (a) {
      J();
      switch (Nq(a)) {
        case "b":
          return "ytads.bulleit.triggerExternalActivityEvent";
        case "n":
          return "ima.bridge.triggerExternalActivityEvent";
        case "h":
        case "m":
        case "ml":
          return "ima.common.triggerExternalActivityEvent";
      }
      return null;
    };
    br.prototype.td = function (a) {
      !a.g &&
        a.Qa &&
        Oq(this, a, "overlay_unmeasurable_impression") &&
        (a.g = !0);
    };
    br.prototype.ne = function (a) {
      a.qe &&
        (a.Ra()
          ? Oq(this, a, "overlay_viewable_end_of_session_impression")
          : Oq(this, a, "overlay_unviewable_impression"),
        (a.qe = !1));
    };
    var jr = function (a, b, c, d) {
      c = void 0 === c ? {} : c;
      var e = {};
      ag(e, { opt_adElement: void 0, opt_fullscreen: void 0 }, c);
      var f = a.H(b, c);
      c = f ? f.pd : a.Wc();
      if (e.opt_bounds) return c.g(cq("ol", d));
      if (void 0 !== d)
        if (void 0 !== bq(d))
          if (Wp) a = cq("ue", d);
          else if ((Lq(a), "i" == Vp)) (a = cq("i", d)), (a["if"] = 0);
          else if ((b = a.H(b, e))) {
            b: {
              "i" == Vp && ((b.Qa = !0), a.xd(b));
              f = e.opt_fullscreen;
              void 0 !== f && Yn(b, !!f);
              var g;
              if ((f = !Qm().h && !Lm())) vl(), (f = 0 === Wh(Wk));
              if ((g = f)) {
                switch (b.va()) {
                  case 1:
                    Pq(b, "pv");
                    break;
                  case 2:
                    a.td(b);
                }
                Mq("pv");
              }
              f = d.toLowerCase();
              if ((g = !g))
                c: {
                  if (Rk(J().T, "ssmol") && ((g = a.j), "loaded" === f)) break c;
                  g = cc(em, f);
                }
              if (g && 0 == b.ka) {
                "i" != Vp && (Mp.done = !1);
                g = void 0 !== e ? e.opt_nativeTime : void 0;
                Yl = g = "number" === typeof g ? g : $l();
                b.Ib = !0;
                var h = Rm();
                b.ka = 1;
                b.ia = {};
                b.ia.start = !1;
                b.ia.firstquartile = !1;
                b.ia.midpoint = !1;
                b.ia.thirdquartile = !1;
                b.ia.complete = !1;
                b.ia.resume = !1;
                b.ia.pause = !1;
                b.ia.skip = !1;
                b.ia.mute = !1;
                b.ia.unmute = !1;
                b.ia.viewable_impression = !1;
                b.ia.measurable_impression = !1;
                b.ia.fully_viewable_audible_half_duration_impression = !1;
                b.ia.fullscreen = !1;
                b.ia.exitfullscreen = !1;
                b.Yc = 0;
                h || (b.oa().H = g);
                Pp(Mp, [b], !h);
              }
              (g = b.rb[f]) && b.fa.reportEvent(g);
              Rk(J().T, "fmd") || (cc(fm, f) && b.Ta && b.Ta.h(b, null));
              switch (b.va()) {
                case 1:
                  var k = dq(f) ? a.J.custom_metric_viewable : a.J[f];
                  break;
                case 2:
                  k = a.U[f];
              }
              if (
                k &&
                ((d = k.call(a, b, e, d)),
                Rk(J().T, "fmd") && cc(fm, f) && b.Ta && b.Ta.h(b, null),
                void 0 !== d)
              ) {
                e = cq(void 0, f);
                ag(e, d);
                d = e;
                break b;
              }
              d = void 0;
            }
            3 == b.ka && a.l(b);
            a = d;
          } else a = cq("nf", d);
        else a = void 0;
      else
        Wp
          ? (a = cq("ue"))
          : f
          ? ((a = cq()), ag(a, bp(f, !0, !1, !1)))
          : (a = cq("nf"));
      return "string" === typeof a ? c.g() : c.g(a);
    };
    br.prototype.I = function (a) {
      this.j && 1 == a.va() && kr(this, a);
    };
    br.prototype.xd = function (a) {
      this.j && 1 == a.va() && kr(this, a);
    };
    var kr = function (a, b) {
        var c;
        if (b.playerId && gr(a)) {
          var d = a.o[b.playerId];
          d
            ? (c = function (f, g) {
                lr(d, f, g);
              })
            : null !== d && Tl(379, Error());
        } else c = Ra("ima.common.triggerViewabilityMeasurementUpdate");
        if ("function" === typeof c) {
          var e = Xo(b);
          e.nativeVolume = a.D;
          c(b.la, e);
        }
      },
      mr = function (a, b, c) {
        a.o[b] = c;
      },
      gr = function (a) {
        return (J(), "h" != Nq(a) && "m" != Nq(a)) ? !1 : 0 != a.G;
      };
    br.prototype.A = function (a, b, c, d) {
      if (Fl()) {
        var e = Rk(J().T, "mm"),
          f = {};
        (e = ((f[Ak.xe] = "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO"),
        (f[Ak.Ze] = "ACTIVE_VIEW_TRAFFIC_TYPE_VIDEO"),
        f)[e]) &&
          e &&
          (this.B = e);
        "ACTIVE_VIEW_TRAFFIC_TYPE_UNSPECIFIED" === this.B && Tl(1044, Error());
      }
      a = Gq.prototype.A.call(this, a, b, c, d);
      this.K &&
        ((b = this.F),
        null == a.o && (a.o = new go()),
        (b.g[a.la] = a.o),
        (a.o.l = ep));
      return a;
    };
    br.prototype.l = function (a) {
      a && 1 == a.va() && this.K && delete this.F.g[a.la];
      return Gq.prototype.l.call(this, a);
    };
    br.prototype.Xd = function () {
      this.g || (this.g = this.Xc());
      return null == this.g || this.j
        ? new Ho()
        : "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO" === this.B
        ? new Xq(this.g)
        : new pq(this.g);
    };
    br.prototype.Wc = function () {
      return "ACTIVE_VIEW_TRAFFIC_TYPE_AUDIO" === this.B ? new Yq() : new kq();
    };
    var nr = function (a) {
        var b = {};
        return (b.viewability = a.g), (b.googleViewability = a.h), b;
      },
      or = function (a, b, c) {
        c = void 0 === c ? {} : c;
        a = jr(E(br), b, c, a);
        return nr(a);
      },
      pr = Sl(193, or, void 0, Rq);
    y("Goog_AdSense_Lidar_sendVastEvent", pr);
    var qr = Sl(194, function (a, b) {
      b = void 0 === b ? {} : b;
      a = jr(E(br), a, b);
      return nr(a);
    });
    y("Goog_AdSense_Lidar_getViewability", qr);
    var rr = Sl(195, function () {
      return xl();
    });
    y("Goog_AdSense_Lidar_getUrlSignalsArray", rr);
    var sr = Sl(196, function () {
      return JSON.stringify(xl());
    });
    y("Goog_AdSense_Lidar_getUrlSignalsList", sr);
    w.console &&
      "function" === typeof w.console.log &&
      ab(w.console.log, w.console);
    var tr = function (a) {
      for (var b = [], c = (a = C(a.ownerDocument)); c != a.top; c = c.parent)
        if (c.frameElement) b.push(c.frameElement);
        else break;
      return b;
    };
    var ur = function (a, b) {
      this.type = a;
      this.currentTarget = this.target = b;
      this.defaultPrevented = this.h = !1;
    };
    ur.prototype.stopPropagation = function () {
      this.h = !0;
    };
    ur.prototype.preventDefault = function () {
      this.defaultPrevented = !0;
    };
    var vr = (function () {
      if (!w.addEventListener || !Object.defineProperty) return !1;
      var a = !1,
        b = Object.defineProperty({}, "passive", {
          get: function () {
            a = !0;
          },
        });
      try {
        var c = function () {};
        w.addEventListener("test", c, b);
        w.removeEventListener("test", c, b);
      } catch (d) {}
      return a;
    })();
    var wr = function (a, b) {
      ur.call(this, a ? a.type : "");
      this.relatedTarget = this.currentTarget = this.target = null;
      this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
      this.key = "";
      this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
      this.state = null;
      this.pointerId = 0;
      this.pointerType = "";
      this.g = null;
      a && this.init(a, b);
    };
    cb(wr, ur);
    var xr = { 2: "touch", 3: "pen", 4: "mouse" };
    wr.prototype.init = function (a, b) {
      var c = (this.type = a.type),
        d =
          a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : null;
      this.target = a.target || a.srcElement;
      this.currentTarget = b;
      (b = a.relatedTarget)
        ? uc && (nc(b, "nodeName") || (b = null))
        : "mouseover" == c
        ? (b = a.fromElement)
        : "mouseout" == c && (b = a.toElement);
      this.relatedTarget = b;
      d
        ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
          (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
          (this.screenX = d.screenX || 0),
          (this.screenY = d.screenY || 0))
        : ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0));
      this.button = a.button;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType =
        "string" === typeof a.pointerType
          ? a.pointerType
          : xr[a.pointerType] || "";
      this.state = a.state;
      this.g = a;
      a.defaultPrevented && wr.Da.preventDefault.call(this);
    };
    wr.prototype.stopPropagation = function () {
      wr.Da.stopPropagation.call(this);
      this.g.stopPropagation
        ? this.g.stopPropagation()
        : (this.g.cancelBubble = !0);
    };
    wr.prototype.preventDefault = function () {
      wr.Da.preventDefault.call(this);
      var a = this.g;
      a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
    };
    var yr = "closure_listenable_" + ((1e6 * Math.random()) | 0),
      zr = function (a) {
        return !(!a || !a[yr]);
      };
    var Ar = 0;
    var Br = function (a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.vc = e;
        this.key = ++Ar;
        this.Vb = this.ec = !1;
      },
      Cr = function (a) {
        a.Vb = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.vc = null;
      };
    var Dr = function (a) {
      this.src = a;
      this.g = {};
      this.h = 0;
    };
    Dr.prototype.add = function (a, b, c, d, e) {
      var f = a.toString();
      a = this.g[f];
      a || ((a = this.g[f] = []), this.h++);
      var g = Er(a, b, d, e);
      -1 < g
        ? ((b = a[g]), c || (b.ec = !1))
        : ((b = new Br(b, this.src, f, !!d, e)), (b.ec = c), a.push(b));
      return b;
    };
    Dr.prototype.remove = function (a, b, c, d) {
      a = a.toString();
      if (!(a in this.g)) return !1;
      var e = this.g[a];
      b = Er(e, b, c, d);
      return -1 < b
        ? (Cr(e[b]), ec(e, b), 0 == e.length && (delete this.g[a], this.h--), !0)
        : !1;
    };
    var Fr = function (a, b) {
      var c = b.type;
      c in a.g &&
        dc(a.g[c], b) &&
        (Cr(b), 0 == a.g[c].length && (delete a.g[c], a.h--));
    };
    Dr.prototype.Kb = function (a, b, c, d) {
      a = this.g[a.toString()];
      var e = -1;
      a && (e = Er(a, b, c, d));
      return -1 < e ? a[e] : null;
    };
    var Er = function (a, b, c, d) {
      for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.Vb && f.listener == b && f.capture == !!c && f.vc == d) return e;
      }
      return -1;
    };
    var Gr = "closure_lm_" + ((1e6 * Math.random()) | 0),
      Hr = {},
      Ir = 0,
      Kr = function (a, b, c, d, e) {
        if (d && d.once) return Jr(a, b, c, d, e);
        if (Array.isArray(b)) {
          for (var f = 0; f < b.length; f++) Kr(a, b[f], c, d, e);
          return null;
        }
        c = Lr(c);
        return zr(a)
          ? a.O(b, c, Ua(d) ? !!d.capture : !!d, e)
          : Mr(a, b, c, !1, d, e);
      },
      Mr = function (a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = Ua(e) ? !!e.capture : !!e,
          h = Nr(a);
        h || (a[Gr] = h = new Dr(a));
        c = h.add(b, c, d, g, f);
        if (c.proxy) return c;
        d = Or();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
          vr || (e = g),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(Pr(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        Ir++;
        return c;
      },
      Or = function () {
        var a = Qr,
          b = function (c) {
            return a.call(b.src, b.listener, c);
          };
        return b;
      },
      Jr = function (a, b, c, d, e) {
        if (Array.isArray(b)) {
          for (var f = 0; f < b.length; f++) Jr(a, b[f], c, d, e);
          return null;
        }
        c = Lr(c);
        return zr(a)
          ? a.Qb(b, c, Ua(d) ? !!d.capture : !!d, e)
          : Mr(a, b, c, !0, d, e);
      },
      Rr = function (a, b, c, d, e) {
        if (Array.isArray(b))
          for (var f = 0; f < b.length; f++) Rr(a, b[f], c, d, e);
        else
          (d = Ua(d) ? !!d.capture : !!d),
            (c = Lr(c)),
            zr(a)
              ? a.qb(b, c, d, e)
              : a && (a = Nr(a)) && (b = a.Kb(b, c, d, e)) && Sr(b);
      },
      Sr = function (a) {
        if ("number" !== typeof a && a && !a.Vb) {
          var b = a.src;
          if (zr(b)) Fr(b.o, a);
          else {
            var c = a.type,
              d = a.proxy;
            b.removeEventListener
              ? b.removeEventListener(c, d, a.capture)
              : b.detachEvent
              ? b.detachEvent(Pr(c), d)
              : b.addListener && b.removeListener && b.removeListener(d);
            Ir--;
            (c = Nr(b))
              ? (Fr(c, a), 0 == c.h && ((c.src = null), (b[Gr] = null)))
              : Cr(a);
          }
        }
      },
      Pr = function (a) {
        return a in Hr ? Hr[a] : (Hr[a] = "on" + a);
      },
      Qr = function (a, b) {
        if (a.Vb) a = !0;
        else {
          b = new wr(b, this);
          var c = a.listener,
            d = a.vc || a.src;
          a.ec && Sr(a);
          a = c.call(d, b);
        }
        return a;
      },
      Nr = function (a) {
        a = a[Gr];
        return a instanceof Dr ? a : null;
      },
      Tr = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0),
      Lr = function (a) {
        if ("function" === typeof a) return a;
        a[Tr] ||
          (a[Tr] = function (b) {
            return a.handleEvent(b);
          });
        return a[Tr];
      };
    var M = function () {
      L.call(this);
      this.o = new Dr(this);
      this.sb = this;
      this.ga = null;
    };
    cb(M, L);
    M.prototype[yr] = !0;
    l = M.prototype;
    l.addEventListener = function (a, b, c, d) {
      Kr(this, a, b, c, d);
    };
    l.removeEventListener = function (a, b, c, d) {
      Rr(this, a, b, c, d);
    };
    l.dispatchEvent = function (a) {
      var b,
        c = this.ga;
      if (c) for (b = []; c; c = c.ga) b.push(c);
      c = this.sb;
      var d = a.type || a;
      if ("string" === typeof a) a = new ur(a, c);
      else if (a instanceof ur) a.target = a.target || c;
      else {
        var e = a;
        a = new ur(d, c);
        ag(a, e);
      }
      e = !0;
      if (b)
        for (var f = b.length - 1; !a.h && 0 <= f; f--) {
          var g = (a.currentTarget = b[f]);
          e = Ur(g, d, !0, a) && e;
        }
      a.h ||
        ((g = a.currentTarget = c),
        (e = Ur(g, d, !0, a) && e),
        a.h || (e = Ur(g, d, !1, a) && e));
      if (b)
        for (f = 0; !a.h && f < b.length; f++)
          (g = a.currentTarget = b[f]), (e = Ur(g, d, !1, a) && e);
      return e;
    };
    l.L = function () {
      M.Da.L.call(this);
      if (this.o) {
        var a = this.o,
          b = 0,
          c;
        for (c in a.g) {
          for (var d = a.g[c], e = 0; e < d.length; e++) ++b, Cr(d[e]);
          delete a.g[c];
          a.h--;
        }
      }
      this.ga = null;
    };
    l.O = function (a, b, c, d) {
      return this.o.add(String(a), b, !1, c, d);
    };
    l.Qb = function (a, b, c, d) {
      return this.o.add(String(a), b, !0, c, d);
    };
    l.qb = function (a, b, c, d) {
      this.o.remove(String(a), b, c, d);
    };
    var Ur = function (a, b, c, d) {
      b = a.o.g[String(b)];
      if (!b) return !0;
      b = b.concat();
      for (var e = !0, f = 0; f < b.length; ++f) {
        var g = b[f];
        if (g && !g.Vb && g.capture == c) {
          var h = g.listener,
            k = g.vc || g.src;
          g.ec && Fr(a.o, g);
          e = !1 !== h.call(k, d) && e;
        }
      }
      return e && !d.defaultPrevented;
    };
    M.prototype.Kb = function (a, b, c, d) {
      return this.o.Kb(String(a), b, c, d);
    };
    var Vr = function (a, b) {
      this.j = a;
      this.o = b;
      this.h = 0;
      this.g = null;
    };
    Vr.prototype.get = function () {
      if (0 < this.h) {
        this.h--;
        var a = this.g;
        this.g = a.next;
        a.next = null;
      } else a = this.j();
      return a;
    };
    var Wr = function (a, b) {
      a.o(b);
      100 > a.h && (a.h++, (b.next = a.g), (a.g = b));
    };
    var Xr,
      Yr = function () {
        var a = w.MessageChannel;
        "undefined" === typeof a &&
          "undefined" !== typeof window &&
          window.postMessage &&
          window.addEventListener &&
          !z("Presto") &&
          (a = function () {
            var e = Ng(document, "IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var g = "callImmediate" + Math.random(),
              h =
                "file:" == f.location.protocol
                  ? "*"
                  : f.location.protocol + "//" + f.location.host;
            e = ab(function (k) {
              if (("*" == h || k.origin == h) && k.data == g)
                this.port1.onmessage();
            }, this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
              postMessage: function () {
                f.postMessage(g, h);
              },
            };
          });
        if ("undefined" !== typeof a && !Kb()) {
          var b = new a(),
            c = {},
            d = c;
          b.port1.onmessage = function () {
            if (void 0 !== c.next) {
              c = c.next;
              var e = c.Vd;
              c.Vd = null;
              e();
            }
          };
          return function (e) {
            d.next = { Vd: e };
            d = d.next;
            b.port2.postMessage(0);
          };
        }
        return function (e) {
          w.setTimeout(e, 0);
        };
      };
    var Zr = function () {
      this.h = this.g = null;
    };
    Zr.prototype.add = function (a, b) {
      var c = $r.get();
      c.set(a, b);
      this.h ? (this.h.next = c) : (this.g = c);
      this.h = c;
    };
    Zr.prototype.remove = function () {
      var a = null;
      this.g &&
        ((a = this.g),
        (this.g = this.g.next),
        this.g || (this.h = null),
        (a.next = null));
      return a;
    };
    var $r = new Vr(
        function () {
          return new as();
        },
        function (a) {
          return a.reset();
        }
      ),
      as = function () {
        this.next = this.g = this.h = null;
      };
    as.prototype.set = function (a, b) {
      this.h = a;
      this.g = b;
      this.next = null;
    };
    as.prototype.reset = function () {
      this.next = this.g = this.h = null;
    };
    var bs,
      cs = !1,
      ds = new Zr(),
      fs = function (a, b) {
        bs || es();
        cs || (bs(), (cs = !0));
        ds.add(a, b);
      },
      es = function () {
        if (w.Promise && w.Promise.resolve) {
          var a = w.Promise.resolve(void 0);
          bs = function () {
            a.then(gs);
          };
        } else
          bs = function () {
            var b = gs;
            "function" !== typeof w.setImmediate ||
            (w.Window &&
              w.Window.prototype &&
              (Ib() || !z("Edge")) &&
              w.Window.prototype.setImmediate == w.setImmediate)
              ? (Xr || (Xr = Yr()), Xr(b))
              : w.setImmediate(b);
          };
      },
      gs = function () {
        for (var a; (a = ds.remove()); ) {
          try {
            a.h.call(a.g);
          } catch (b) {
            jb(b);
          }
          Wr($r, a);
        }
        cs = !1;
      };
    var hs = function (a) {
      if (!a) return !1;
      try {
        return !!a.$goog_Thenable;
      } catch (b) {
        return !1;
      }
    };
    var js = function (a) {
        this.g = 0;
        this.B = void 0;
        this.o = this.h = this.j = null;
        this.l = this.A = !1;
        if (a != Df)
          try {
            var b = this;
            a.call(
              void 0,
              function (c) {
                is(b, 2, c);
              },
              function (c) {
                is(b, 3, c);
              }
            );
          } catch (c) {
            is(this, 3, c);
          }
      },
      ks = function () {
        this.next = this.context = this.h = this.j = this.g = null;
        this.o = !1;
      };
    ks.prototype.reset = function () {
      this.context = this.h = this.j = this.g = null;
      this.o = !1;
    };
    var ls = new Vr(
        function () {
          return new ks();
        },
        function (a) {
          a.reset();
        }
      ),
      ms = function (a, b, c) {
        var d = ls.get();
        d.j = a;
        d.h = b;
        d.context = c;
        return d;
      };
    js.prototype.then = function (a, b, c) {
      return ns(
        this,
        "function" === typeof a ? a : null,
        "function" === typeof b ? b : null,
        c
      );
    };
    js.prototype.$goog_Thenable = !0;
    js.prototype.H = function (a, b) {
      return ns(this, null, a, b);
    };
    js.prototype.catch = js.prototype.H;
    js.prototype.cancel = function (a) {
      if (0 == this.g) {
        var b = new os(a);
        fs(function () {
          ps(this, b);
        }, this);
      }
    };
    var ps = function (a, b) {
        if (0 == a.g)
          if (a.j) {
            var c = a.j;
            if (c.h) {
              for (
                var d = 0, e = null, f = null, g = c.h;
                g && (g.o || (d++, g.g == a && (e = g), !(e && 1 < d)));
                g = g.next
              )
                e || (f = g);
              e &&
                (0 == c.g && 1 == d
                  ? ps(c, b)
                  : (f
                      ? ((d = f),
                        d.next == c.o && (c.o = d),
                        (d.next = d.next.next))
                      : qs(c),
                    rs(c, e, 3, b)));
            }
            a.j = null;
          } else is(a, 3, b);
      },
      us = function (a, b) {
        a.h || (2 != a.g && 3 != a.g) || ts(a);
        a.o ? (a.o.next = b) : (a.h = b);
        a.o = b;
      },
      ns = function (a, b, c, d) {
        var e = ms(null, null, null);
        e.g = new js(function (f, g) {
          e.j = b
            ? function (h) {
                try {
                  var k = b.call(d, h);
                  f(k);
                } catch (n) {
                  g(n);
                }
              }
            : f;
          e.h = c
            ? function (h) {
                try {
                  var k = c.call(d, h);
                  void 0 === k && h instanceof os ? g(h) : f(k);
                } catch (n) {
                  g(n);
                }
              }
            : g;
        });
        e.g.j = a;
        us(a, e);
        return e.g;
      };
    js.prototype.D = function (a) {
      this.g = 0;
      is(this, 2, a);
    };
    js.prototype.F = function (a) {
      this.g = 0;
      is(this, 3, a);
    };
    var is = function (a, b, c) {
        if (0 == a.g) {
          a === c &&
            ((b = 3), (c = new TypeError("Promise cannot resolve to itself")));
          a.g = 1;
          a: {
            var d = c,
              e = a.D,
              f = a.F;
            if (d instanceof js) {
              us(d, ms(e || Df, f || null, a));
              var g = !0;
            } else if (hs(d)) d.then(e, f, a), (g = !0);
            else {
              if (Ua(d))
                try {
                  var h = d.then;
                  if ("function" === typeof h) {
                    vs(d, h, e, f, a);
                    g = !0;
                    break a;
                  }
                } catch (k) {
                  f.call(a, k);
                  g = !0;
                  break a;
                }
              g = !1;
            }
          }
          g ||
            ((a.B = c),
            (a.g = b),
            (a.j = null),
            ts(a),
            3 != b || c instanceof os || ws(a, c));
        }
      },
      vs = function (a, b, c, d, e) {
        var f = !1,
          g = function (k) {
            f || ((f = !0), c.call(e, k));
          },
          h = function (k) {
            f || ((f = !0), d.call(e, k));
          };
        try {
          b.call(a, g, h);
        } catch (k) {
          h(k);
        }
      },
      ts = function (a) {
        a.A || ((a.A = !0), fs(a.K, a));
      },
      qs = function (a) {
        var b = null;
        a.h && ((b = a.h), (a.h = b.next), (b.next = null));
        a.h || (a.o = null);
        return b;
      };
    js.prototype.K = function () {
      for (var a; (a = qs(this)); ) rs(this, a, this.g, this.B);
      this.A = !1;
    };
    var rs = function (a, b, c, d) {
        if (3 == c && b.h && !b.o) for (; a && a.l; a = a.j) a.l = !1;
        if (b.g) (b.g.j = null), xs(b, c, d);
        else
          try {
            b.o ? b.j.call(b.context) : xs(b, c, d);
          } catch (e) {
            ys.call(null, e);
          }
        Wr(ls, b);
      },
      xs = function (a, b, c) {
        2 == b ? a.j.call(a.context, c) : a.h && a.h.call(a.context, c);
      },
      ws = function (a, b) {
        a.l = !0;
        fs(function () {
          a.l && ys.call(null, b);
        });
      },
      ys = jb,
      os = function (a) {
        eb.call(this, a);
      };
    cb(os, eb);
    os.prototype.name = "cancel";
    var zs = function (a, b) {
      M.call(this);
      this.h = a || 1;
      this.g = b || w;
      this.j = ab(this.cg, this);
      this.l = Date.now();
    };
    cb(zs, M);
    l = zs.prototype;
    l.enabled = !1;
    l.Ma = null;
    l.cg = function () {
      if (this.enabled) {
        var a = Date.now() - this.l;
        0 < a && a < 0.8 * this.h
          ? (this.Ma = this.g.setTimeout(this.j, this.h - a))
          : (this.Ma && (this.g.clearTimeout(this.Ma), (this.Ma = null)),
            this.dispatchEvent("tick"),
            this.enabled && (this.stop(), this.start()));
      }
    };
    l.start = function () {
      this.enabled = !0;
      this.Ma ||
        ((this.Ma = this.g.setTimeout(this.j, this.h)), (this.l = Date.now()));
    };
    l.stop = function () {
      this.enabled = !1;
      this.Ma && (this.g.clearTimeout(this.Ma), (this.Ma = null));
    };
    l.L = function () {
      zs.Da.L.call(this);
      this.stop();
      delete this.g;
    };
    var As = function (a, b, c) {
        if ("function" === typeof a) c && (a = ab(a, c));
        else if (a && "function" == typeof a.handleEvent)
          a = ab(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : w.setTimeout(a, b || 0);
      },
      Bs = function (a) {
        var b = null;
        return new js(function (c, d) {
          b = As(function () {
            c("0");
          }, a);
          -1 == b && d(Error("Failed to schedule timer."));
        }).H(function (c) {
          w.clearTimeout(b);
          throw c;
        });
      };
    var Cs = function () {
      return Math.round(Date.now() / 1e3);
    };
    var Ds = function () {
      this.g = {};
      return this;
    };
    Ds.prototype.remove = function (a) {
      var b = this.g;
      a in b && delete b[a];
    };
    Ds.prototype.set = function (a, b) {
      this.g[a] = b;
    };
    var Es = function (a, b) {
      a.g.eb = Zf(a.g, "eb", 0) | b;
    };
    Ds.prototype.get = function (a) {
      return Zf(this.g, a, null);
    };
    var Fs = null,
      Gs = function () {
        this.g = {};
        this.h = 0;
      },
      Hs = function () {
        Fs || (Fs = new Gs());
        return Fs;
      },
      Is = function (a, b) {
        a.g[b.getName()] = b;
      },
      Js = function (a, b) {
        this.o = a;
        this.j = !0;
        this.g = b;
      };
    Js.prototype.getName = function () {
      return this.o;
    };
    Js.prototype.ha = function () {
      return this.g;
    };
    Js.prototype.h = function () {
      return String(this.g);
    };
    var Ks = function (a, b) {
      Js.call(this, String(a), b);
      this.l = a;
      this.g = !!b;
    };
    v(Ks, Js);
    Ks.prototype.h = function () {
      return this.g ? "1" : "0";
    };
    var Ls = function (a, b) {
      Js.call(this, a, b);
    };
    v(Ls, Js);
    Ls.prototype.h = function () {
      return this.g
        ? Math.round(this.g.top) +
            "." +
            Math.round(this.g.left) +
            "." +
            (Math.round(this.g.top) + Math.round(this.g.height)) +
            "." +
            (Math.round(this.g.left) + Math.round(this.g.width))
        : "";
    };
    var Ms = function (a) {
      if (a.match(/^-?[0-9]+\.-?[0-9]+\.-?[0-9]+\.-?[0-9]+$/)) {
        a = a.split(".");
        var b = Number(a[0]),
          c = Number(a[1]);
        return new Ls("", new Ah(c, b, Number(a[3]) - c, Number(a[2]) - b));
      }
      return new Ls("", new Ah(0, 0, 0, 0));
    };
    var Ns = function (a) {
        var b = new Ah(
            -Number.MAX_VALUE / 2,
            -Number.MAX_VALUE / 2,
            Number.MAX_VALUE,
            Number.MAX_VALUE
          ),
          c = new Ah(0, 0, 0, 0);
        if (!a || 0 == a.length) return c;
        for (var d = 0; d < a.length; d++) {
          a: {
            var e = b;
            var f = a[d],
              g = Math.max(e.left, f.left),
              h = Math.min(e.left + e.width, f.left + f.width);
            if (g <= h) {
              var k = Math.max(e.top, f.top);
              f = Math.min(e.top + e.height, f.top + f.height);
              if (k <= f) {
                e.left = g;
                e.top = k;
                e.width = h - g;
                e.height = f - k;
                e = !0;
                break a;
              }
            }
            e = !1;
          }
          if (!e) return c;
        }
        return b;
      },
      Os = function (a, b) {
        var c = a.getBoundingClientRect();
        a = sm(a, b);
        return new Ah(
          Math.round(a.x),
          Math.round(a.y),
          Math.round(c.right - c.left),
          Math.round(c.bottom - c.top)
        );
      },
      Ps = function (a, b, c) {
        if (b && c) {
          a: {
            var d = Math.max(b.left, c.left);
            var e = Math.min(b.left + b.width, c.left + c.width);
            if (d <= e) {
              var f = Math.max(b.top, c.top),
                g = Math.min(b.top + b.height, c.top + c.height);
              if (f <= g) {
                d = new Ah(d, f, e - d, g - f);
                break a;
              }
            }
            d = null;
          }
          e = d ? d.height * d.width : 0;
          f = d ? b.height * b.width : 0;
          d = d && f ? Math.round((e / f) * 100) : 0;
          Is(a, new Js("vp", d));
          d && 0 < d
            ? ((e = Bh(b)), (f = Bh(c)), (e = e.top >= f.top && e.top < f.bottom))
            : (e = !1);
          Is(a, new Ks(512, e));
          d && 0 < d
            ? ((e = Bh(b)),
              (f = Bh(c)),
              (e = e.bottom <= f.bottom && e.bottom > f.top))
            : (e = !1);
          Is(a, new Ks(1024, e));
          d && 0 < d
            ? ((e = Bh(b)),
              (f = Bh(c)),
              (e = e.left >= f.left && e.left < f.right))
            : (e = !1);
          Is(a, new Ks(2048, e));
          d && 0 < d
            ? ((b = Bh(b)),
              (c = Bh(c)),
              (c = b.right <= c.right && b.right > c.left))
            : (c = !1);
          Is(a, new Ks(4096, c));
        }
      };
    var Qs = function (a, b) {
      var c = 0;
      Sf(C(), "ima", "video", "client", "tagged") && (c = 1);
      var d = null;
      a && (d = a());
      if (d) {
        a = Hs();
        a.g = {};
        var e = new Ks(32, !0);
        e.j = !1;
        Is(a, e);
        e = C().document;
        e =
          e.visibilityState ||
          e.webkitVisibilityState ||
          e.mozVisibilityState ||
          e.msVisibilityState ||
          "";
        Is(
          a,
          new Ks(
            64,
            "hidden" != e.toLowerCase().substring(e.length - 6) ? !0 : !1
          )
        );
        try {
          var f = C().top;
          try {
            var g = !!f.location.href || "" === f.location.href;
          } catch (m) {
            g = !1;
          }
          if (g) {
            var h = tr(d);
            var k = h && 0 != h.length ? "1" : "0";
          } else k = "2";
        } catch (m) {
          k = "2";
        }
        Is(a, new Ks(256, "2" == k));
        Is(a, new Ks(128, "1" == k));
        h = g = C().top;
        "2" == k && (h = C());
        f = Os(d, h);
        Is(a, new Ls("er", f));
        try {
          var n = h.document && !h.document.body ? null : Lg(h || window);
        } catch (m) {
          n = null;
        }
        n
          ? ((h = Mg(Gg(h.document).g)),
            Is(a, new Ks(16384, !!h)),
            (n = h ? new Ah(h.x, h.y, n.width, n.height) : null))
          : (n = null);
        Is(a, new Ls("vi", n));
        if (n && "1" == k) {
          k = tr(d);
          d = [];
          for (h = 0; h < k.length; h++) (e = Os(k[h], g)) && d.push(e);
          d.push(n);
          n = Ns(d);
        }
        Ps(a, f, n);
        a.h && Is(a, new Js("ts", Cs() - a.h));
        a.h = Cs();
      } else (a = Hs()), (a.g = {}), (a.h = Cs()), Is(a, new Ks(32, !1));
      this.j = a;
      this.g = new Ds();
      this.g.set("ve", 4);
      c && Es(this.g, 1);
      Sf(C(), "ima", "video", "client", "crossdomainTag") && Es(this.g, 4);
      Sf(C(), "ima", "video", "client", "sdkTag") && Es(this.g, 8);
      Sf(C(), "ima", "video", "client", "jsTag") && Es(this.g, 2);
      b && Zf(b, "fullscreen", !1) && Es(this.g, 16);
      this.h = b = null;
      if (c && ((c = Sf(C(), "ima", "video", "client")), c.getEData)) {
        this.h = c.getEData();
        if ((c = Sf(C(), "ima", "video", "client", "getLastSnapshotFromTop")))
          if ((a = c()))
            this.h.extendWithDataFromTopIframe(
              a.tagstamp,
              a.playstamp,
              a.lactstamp
            ),
              (c = this.j),
              (b = a.er),
              (a = a.vi),
              b &&
                a &&
                ((b = Ms(b).ha()),
                (a = Ms(a).ha()),
                (k = null),
                Zf(c.g, "er", null) &&
                  ((k = Zf(c.g, "er", null).ha()),
                  (k.top += b.top),
                  (k.left += b.left),
                  Is(c, new Ls("er", k))),
                Zf(c.g, "vi", null) &&
                  ((n = Zf(c.g, "vi", null).ha()),
                  (n.top += b.top),
                  (n.left += b.left),
                  (d = []),
                  d.push(n),
                  d.push(b),
                  d.push(a),
                  (b = Ns(d)),
                  Ps(c, k, b),
                  Is(c, new Ls("vi", a))));
        a: {
          if (this.h) {
            if (this.h.getTagLoadTimestamp) {
              b = this.h.getTagLoadTimestamp();
              break a;
            }
            if (this.h.getTimeSinceTagLoadSeconds) {
              b = this.h.getTimeSinceTagLoadSeconds();
              break a;
            }
          }
          b = null;
        }
      }
      c = this.g;
      a =
        window.performance &&
        window.performance.timing &&
        window.performance.timing.domLoading &&
        0 < window.performance.timing.domLoading
          ? Math.round(window.performance.timing.domLoading / 1e3)
          : null;
      c.set.call(c, "td", Cs() - (null != a ? a : null != b ? b : Cs()));
    };
    var Rs = new zs(200),
      Ss = function (a, b) {
        try {
          var c = new Qs(a, b);
          a = [];
          var d = Number(c.g.get("eb"));
          c.g.remove("eb");
          var e,
            f = c.g;
          b = [];
          for (var g in f.g) b.push(g + f.g[g]);
          (e = b.join("_")) && a.push(e);
          if (c.h) {
            var h = c.h.serialize();
            h && a.push(h);
          }
          var k,
            n = c.j;
          e = d;
          f = [];
          e || (e = 0);
          for (var m in n.g) {
            var p = n.g[m];
            if (p instanceof Ks) p.ha() && (e |= p.l);
            else {
              var u = n.g[m],
                r = u.j ? u.h() : "";
              r && f.push(m + r);
            }
          }
          f.push("eb" + String(e));
          (k = f.join("_")) && a.push(k);
          c.g.set("eb", d);
          return a.join("_");
        } catch (x) {
          return "tle;" + wg(x.name, 12) + ";" + wg(x.message, 40);
        }
      },
      Ts = function (a, b) {
        Kr(Rs, "tick", function () {
          var c = Ss(b);
          a(c);
        });
        Rs.start();
        Rs.dispatchEvent("tick");
      };
    var Us = function (a) {
      this.P = me(a);
    };
    v(Us, Ue);
    var Vs = function (a) {
        var b = new Us();
        return Ae(b, 1, null == a ? a : Xd(a));
      },
      Ws = [0, vf];
    var Xs = function (a) {
      this.P = me(a);
    };
    v(Xs, Ue);
    var Ys = function (a) {
        var b = new Xs();
        return Te(b, 1, a);
      },
      Zs = function (a) {
        var b = window.Date.now();
        b = Number.isFinite(b) ? Math.round(b) : 0;
        return Ae(a, 3, ce(b));
      };
    Xs.prototype.getError = function () {
      return He(this, Us, 10);
    };
    Xs.prototype.gb = function (a) {
      return Ke(this, 10, a);
    };
    var $s = xf(Xs),
      at = [0, sf, sf, mf, pf, pf, pf, mf, lf, rf, tf, Ws, rf];
    var bt = [0, of, of, of];
    var ct = [0, tf, 2, bt, tf, bt, sf, sf, rf, tf, [0, vf, 4, sf], mf];
    var dt = function (a) {
      this.P = me(a);
    };
    v(dt, Ue);
    dt.ua = [1, 2];
    dt.prototype.g = wf([0, uf, ct, uf, at]);
    var et = function (a) {
      this.P = me(a);
    };
    v(et, Ue);
    et.prototype.ha = function () {
      return Ne(this, 1);
    };
    et.prototype.getVersion = function () {
      return ye(this, 5);
    };
    var ft = xf(et);
    var it = function () {
      var a = gt;
      this.l = ht;
      this.A = "jserror";
      this.o = !0;
      this.g = void 0 === a ? null : a;
      this.h = null;
      this.j = !1;
      this.B = this.Sa;
    };
    l = it.prototype;
    l.Nc = function (a) {
      this.h = a;
    };
    l.yd = function (a) {
      this.A = a;
    };
    l.zd = function (a) {
      this.o = a;
    };
    l.Bd = function (a) {
      this.j = a;
    };
    l.ob = function (a, b, c) {
      try {
        if (this.g && this.g.j) {
          var d = this.g.start(a.toString(), 3);
          var e = b();
          this.g.end(d);
        } else e = b();
      } catch (h) {
        b = this.o;
        try {
          hi(d), (b = this.B(a, new Rh(h, { message: jt(h) }), void 0, c));
        } catch (k) {
          this.Sa(217, k);
        }
        if (b) {
          var f, g;
          null == (f = window.console) || null == (g = f.error) || g.call(f, h);
        } else throw h;
      }
      return e;
    };
    l.rd = function (a, b, c, d) {
      var e = this;
      return function () {
        var f = Ma.apply(0, arguments);
        return e.ob(
          a,
          function () {
            return b.apply(c, f);
          },
          d
        );
      };
    };
    l.Sa = function (a, b, c, d, e) {
      e = e || this.A;
      try {
        var f = new il();
        nl(f, 1, "context", a);
        Sh(b) || (b = new Rh(b, { message: jt(b) }));
        b.msg && nl(f, 2, "msg", b.msg.substring(0, 512));
        var g = b.meta || {};
        if (this.h)
          try {
            this.h(g);
          } catch (k) {}
        if (d)
          try {
            d(g);
          } catch (k) {}
        ml(f, 3, [g]);
        var h = hl();
        h.h && nl(f, 4, "top", h.h.url || "");
        ml(f, 5, [{ url: h.g.url || "" }, { url: h.g.url ? Yg(h.g.url) : "" }]);
        kt(this.l, e, f, this.j, c);
      } catch (k) {
        try {
          kt(
            this.l,
            e,
            { context: "ecmserr", rctx: a, msg: jt(k), url: h && h.g.url },
            this.j,
            c
          );
        } catch (n) {}
      }
      return this.o;
    };
    var jt = function (a) {
      var b = a.toString();
      a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
      a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
      if (a.stack) {
        a = a.stack;
        var c = b;
        try {
          -1 == a.indexOf(c) && (a = c + "\n" + a);
          for (var d; a != d; )
            (d = a),
              (a = a.replace(
                RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"),
                "$1"
              ));
          b = a.replace(RegExp("\n *", "g"), "\n");
        } catch (e) {
          b = c;
        }
      }
      return b;
    };
    var lt = function () {};
    var mt = function () {
        this.g = Math.random();
      },
      nt = function () {
        var a = ht,
          b = window.google_srt;
        0 <= b && 1 >= b && (a.g = b);
      },
      kt = function (a, b, c, d, e) {
        if (((void 0 === d ? 0 : d) ? a.g : Math.random()) < (e || 0.01))
          try {
            if (c instanceof il) var f = c;
            else
              (f = new il()),
                qh(c, function (h, k) {
                  var n = f,
                    m = n.o++;
                  ml(n, m, jl(k, h));
                });
            var g = pl(f, "https:", "/pagead/gen_204?id=" + b + "&");
            g && Oh(w, g);
          } catch (h) {}
      };
    var ht,
      ot,
      gt = new gi(1, window);
    (function (a) {
      ht = null != a ? a : new mt();
      "number" !== typeof window.google_srt &&
        (window.google_srt = Math.random());
      nt();
      ot = new it();
      ot.Nc(function () {});
      ot.Bd(!0);
      "complete" == window.document.readyState
        ? window.google_measure_js_timing || gt.B()
        : gt.j &&
          Jf(window, "load", function () {
            window.google_measure_js_timing || gt.B();
          });
    })();
    var pt = new Date().getTime();
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (
      a,
      b
    ) {
      return a + b;
    });
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (a, b) {
      return a + b;
    });
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (
      a,
      b
    ) {
      return a + b;
    });
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].reduce(function (a, b) {
      return a + b;
    });
    var qt = function (a) {
      this.P = me(a);
    };
    v(qt, Ue);
    qt.ua = [3];
    var rt = function (a) {
      this.P = me(a);
    };
    v(rt, Ue);
    var tt = function (a, b) {
        return Ee(a, 1, b, Xd);
      },
      ut = function (a, b) {
        return Ee(a, 2, b, Xd);
      },
      vt = function (a, b) {
        return Ee(a, 3, b, Zd);
      },
      wt = function (a, b) {
        Ee(a, 4, b, Zd);
      };
    rt.ua = [1, 2, 3, 4];
    var xt = function (a) {
      this.P = me(a);
    };
    v(xt, Ue);
    var yt = function (a) {
      this.P = me(a);
    };
    v(yt, Ue);
    yt.prototype.getVersion = function () {
      return Qe(this, 1);
    };
    var zt = function (a, b) {
        return Fe(a, 1, $d(b), 0);
      },
      At = function (a, b) {
        return Ke(a, 2, b);
      },
      Bt = function (a, b) {
        return Ke(a, 3, b);
      },
      Ct = function (a, b) {
        return Fe(a, 4, $d(b), 0);
      },
      Dt = function (a, b) {
        return Fe(a, 5, $d(b), 0);
      },
      Et = function (a, b) {
        return Fe(a, 6, $d(b), 0);
      },
      Ft = function (a, b) {
        return Fe(a, 7, de(b), "");
      },
      Gt = function (a, b) {
        return Fe(a, 8, $d(b), 0);
      },
      Ht = function (a, b) {
        return Fe(a, 9, $d(b), 0);
      },
      It = function (a, b) {
        return Fe(a, 10, Td(b), !1);
      },
      Jt = function (a, b) {
        return Fe(a, 11, Td(b), !1);
      },
      Kt = function (a, b) {
        return Ee(a, 12, b, Xd);
      },
      Lt = function (a, b) {
        return Ee(a, 13, b, Xd);
      },
      Mt = function (a, b) {
        return Ee(a, 14, b, Xd);
      },
      Nt = function (a, b) {
        return Fe(a, 15, Td(b), !1);
      },
      Ot = function (a, b) {
        return Fe(a, 16, de(b), "");
      },
      Pt = function (a, b) {
        return Ee(a, 17, b, Zd);
      },
      Qt = function (a, b) {
        return Ee(a, 18, b, Zd);
      },
      Rt = function (a, b) {
        return Le(a, 19, b);
      };
    yt.ua = [12, 13, 14, 17, 18, 19];
    var St = function (a) {
      this.P = me(a);
    };
    v(St, Ue);
    var Tt = "a".charCodeAt(),
      Ut = Qf({
        Zg: 0,
        Yg: 1,
        Vg: 2,
        Qg: 3,
        Wg: 4,
        Rg: 5,
        Xg: 6,
        Tg: 7,
        Ug: 8,
        Pg: 9,
        Sg: 10,
        ah: 11,
      }),
      Vt = Qf({ eh: 0, fh: 1, bh: 2 });
    var Wt = function (a) {
        if (/[^01]/.test(a))
          throw Error("Input bitstring " + a + " is malformed!");
        this.h = a;
        this.g = 0;
      },
      Yt = function (a) {
        a = Xt(a, 36);
        var b = new xt();
        b = Fe(b, 1, ce(Math.floor(a / 10)), "0");
        return Fe(b, 2, $d((a % 10) * 1e8), 0);
      },
      Zt = function (a) {
        return (
          String.fromCharCode(Tt + Xt(a, 6)) + String.fromCharCode(Tt + Xt(a, 6))
        );
      },
      bu = function (a) {
        var b = Xt(a, 16);
        return !0 === !!Xt(a, 1)
          ? ((a = $t(a)),
            a.forEach(function (c) {
              if (c > b)
                throw Error("ID " + c + " is past MaxVendorId " + b + "!");
            }),
            a)
          : au(a, b);
      },
      cu = function (a) {
        for (var b = [], c = Xt(a, 12); c--; ) {
          var d = Xt(a, 6),
            e = Xt(a, 2),
            f = $t(a),
            g = b,
            h = g.push,
            k = new qt();
          d = Fe(k, 1, null == d ? d : Xd(d), 0);
          e = Fe(d, 2, null == e ? e : Xd(e), 0);
          f = Ee(e, 3, f, Zd);
          h.call(g, f);
        }
        return b;
      },
      $t = function (a) {
        for (var b = Xt(a, 12), c = []; b--; ) {
          var d = !0 === !!Xt(a, 1),
            e = Xt(a, 16);
          if (d) for (d = Xt(a, 16); e <= d; e++) c.push(e);
          else c.push(e);
        }
        c.sort(function (f, g) {
          return f - g;
        });
        return c;
      },
      au = function (a, b, c) {
        for (var d = [], e = 0; e < b; e++)
          if (Xt(a, 1)) {
            var f = e + 1;
            if (c && -1 === c.indexOf(f))
              throw Error("ID: " + f + " is outside of allowed values!");
            d.push(f);
          }
        return d;
      },
      Xt = function (a, b) {
        if (a.g + b > a.h.length)
          throw Error("Requested length " + b + " is past end of string.");
        var c = a.h.substring(a.g, a.g + b);
        a.g += b;
        return parseInt(c, 2);
      };
    Wt.prototype.skip = function (a) {
      this.g += a;
    };
    var du = function (a) {
      try {
        var b = Wc(a)
            .map(function (f) {
              return f.toString(2).padStart(8, "0");
            })
            .join(""),
          c = new Wt(b);
        if (3 !== Xt(c, 3)) return null;
        var d = ut(tt(new rt(), au(c, 24, Ut)), au(c, 24, Ut)),
          e = Xt(c, 6);
        0 !== e && wt(vt(d, au(c, e)), au(c, e));
        return d;
      } catch (f) {
        return null;
      }
    };
    var eu = function (a) {
      try {
        var b = Wc(a)
            .map(function (d) {
              return d.toString(2).padStart(8, "0");
            })
            .join(""),
          c = new Wt(b);
        return Rt(
          Qt(
            Pt(
              Ot(
                Nt(
                  Mt(
                    Lt(
                      Kt(
                        Jt(
                          It(
                            Ht(
                              Gt(
                                Ft(
                                  Et(
                                    Dt(
                                      Ct(
                                        Bt(
                                          At(zt(new yt(), Xt(c, 6)), Yt(c)),
                                          Yt(c)
                                        ),
                                        Xt(c, 12)
                                      ),
                                      Xt(c, 12)
                                    ),
                                    Xt(c, 6)
                                  ),
                                  Zt(c)
                                ),
                                Xt(c, 12)
                              ),
                              Xt(c, 6)
                            ),
                            !!Xt(c, 1)
                          ),
                          !!Xt(c, 1)
                        ),
                        au(c, 12, Vt)
                      ),
                      au(c, 24, Ut)
                    ),
                    au(c, 24, Ut)
                  ),
                  !!Xt(c, 1)
                ),
                Zt(c)
              ),
              bu(c)
            ),
            bu(c)
          ),
          cu(c)
        );
      } catch (d) {
        return null;
      }
    };
    var gu = function (a) {
        if (!a) return null;
        var b = a.split(".");
        if (4 < b.length) return null;
        a = eu(b[0]);
        if (!a) return null;
        var c = new St();
        a = Ke(c, 1, a);
        b.shift();
        b = t(b);
        for (c = b.next(); !c.done; c = b.next())
          switch (((c = c.value), fu(c))) {
            case 1:
            case 2:
              break;
            case 3:
              c = du(c);
              if (!c) return null;
              Ke(a, 2, c);
              break;
            default:
              return null;
          }
        return a;
      },
      fu = function (a) {
        try {
          var b = Wc(a)
            .map(function (c) {
              return c.toString(2).padStart(8, "0");
            })
            .join("");
          return Xt(new Wt(b), 3);
        } catch (c) {
          return -1;
        }
      };
    var hu = function (a, b) {
      var c = {};
      if (Array.isArray(b) && 0 !== b.length) {
        b = t(b);
        for (var d = b.next(); !d.done; d = b.next())
          (d = d.value), (c[d] = -1 !== a.indexOf(d));
      } else for (a = t(a), d = a.next(); !d.done; d = a.next()) c[d.value] = !0;
      delete c[0];
      return c;
    };
    var iu = function (a) {
        this.g = a;
        this.defaultValue = !1;
      },
      ju = function (a) {
        var b = void 0 === b ? [] : b;
        this.g = a;
        this.defaultValue = b;
      };
    var ku = new (function (a, b) {
        this.g = a;
        this.defaultValue = void 0 === b ? 0 : b;
      })(494575051),
      lu = new ju(489560439),
      mu = new ju(505762507),
      nu = new iu(471855283),
      ou = new iu(465118388);
    var pu = function (a) {
      this.P = me(a);
    };
    v(pu, Ue);
    var qu = function (a) {
      var b = new pu(),
        c = b.P,
        d = yd(c);
      Od(Dd(b.P));
      b = Be(c, d, 1, 2, !1);
      if (Array.isArray(a)) for (c = 0; c < a.length; c++) b.push(Xd(a[c]));
      else
        for (a = t(a), c = a.next(); !c.done; c = a.next()) b.push(Xd(c.value));
    };
    pu.ua = [1];
    var ru = /^((market|itms|intent|itms-appss):\/\/)/i;
    var tu = "ad_type vpos mridx pos vad_type videoad_start_delay".split(" ");
    var uu = function (a) {
      var b = a.Wa,
        c = a.height,
        d = a.width,
        e = void 0 === a.Ca ? !1 : a.Ca;
      this.ib = a.ib;
      this.Wa = b;
      this.height = c;
      this.width = d;
      this.Ca = e;
    };
    uu.prototype.getHeight = function () {
      return this.height;
    };
    uu.prototype.getWidth = function () {
      return this.width;
    };
    var vu = function (a) {
      var b = a.kg,
        c = a.cf,
        d = a.jg,
        e = a.bf;
      uu.call(this, {
        ib: a.ib,
        Wa: a.Wa,
        height: a.height,
        width: a.width,
        Ca: void 0 === a.Ca ? !1 : a.Ca,
      });
      this.o = b;
      this.h = c;
      this.j = d;
      this.g = e;
    };
    v(vu, uu);
    var wu = function (a) {
      var b = a.If;
      uu.call(this, {
        ib: a.ib,
        Wa: a.Wa,
        height: a.height,
        width: a.width,
        Ca: void 0 === a.Ca ? !1 : a.Ca,
      });
      this.g = b;
    };
    v(wu, uu);
    wu.prototype.getMediaUrl = function () {
      return this.g;
    };
    function xu(a) {
      return new (Function.prototype.bind.apply(
        a,
        [null].concat(ia(Ma.apply(1, arguments)))
      ))();
    }
    var yu = function (a, b, c, d) {
      L.call(this);
      this.F = b;
      this.D = c;
      this.B = d;
      this.l = new Map();
      this.G = 0;
      this.o = new Map();
      this.A = new Map();
      this.j = void 0;
      this.h = a;
    };
    v(yu, L);
    yu.prototype.L = function () {
      delete this.g;
      this.l.clear();
      this.o.clear();
      this.A.clear();
      this.j && (Kf(this.h, "message", this.j), delete this.j);
      delete this.h;
      delete this.B;
      L.prototype.L.call(this);
    };
    var zu = function (a) {
        if (a.g) return a.g;
        a.D && a.D(a.h) ? (a.g = a.h) : (a.g = vh(a.h, a.F));
        var b;
        return null != (b = a.g) ? b : null;
      },
      Bu = function (a, b, c) {
        if (zu(a))
          if (a.g === a.h) (b = a.l.get(b)) && b(a.g, c);
          else {
            var d = a.o.get(b);
            if (d && d.Sb) {
              Au(a);
              var e = ++a.G;
              a.A.set(e, { Bb: d.Bb, kf: d.zc(c), Sf: "addEventListener" === b });
              a.g.postMessage(d.Sb(c, e), "*");
            }
          }
      },
      Au = function (a) {
        a.j ||
          ((a.j = function (b) {
            try {
              var c = a.B ? a.B(b) : void 0;
              if (c) {
                var d = c.ke,
                  e = a.A.get(d);
                if (e) {
                  e.Sf || a.A.delete(d);
                  var f;
                  null == (f = e.Bb) || f.call(e, e.kf, c.payload);
                }
              }
            } catch (g) {}
          }),
          Jf(a.h, "message", a.j));
      };
    var Cu = function (a, b) {
        b = b.listener;
        (a = (0, a.__gpp)("addEventListener", b)) && b(a, !0);
      },
      Du = function (a, b) {
        (0, a.__gpp)("removeEventListener", b.listener, b.listenerId);
      },
      Eu = function (a, b) {
        (0, a.__gpp)(
          "getSection",
          function (c) {
            b.callback({ qc: null != c ? c : void 0, rc: c ? void 0 : 4 });
          },
          b.apiPrefix
        );
      },
      Fu = {
        zc: function (a) {
          return a.listener;
        },
        Sb: function (a, b) {
          a = {};
          return (
            (a.__gppCall = {
              callId: b,
              command: "addEventListener",
              version: "1.1",
            }),
            a
          );
        },
        Bb: function (a, b) {
          b = b.__gppReturn;
          a(b.returnValue, b.success);
        },
      },
      Gu = {
        zc: function (a) {
          return a.listener;
        },
        Sb: function (a, b) {
          var c = {};
          return (
            (c.__gppCall = {
              callId: b,
              command: "removeEventListener",
              version: "1.1",
              parameter: a.listenerId,
            }),
            c
          );
        },
        Bb: function (a, b) {
          b = b.__gppReturn;
          var c = b.returnValue.data;
          null == a || a(c, b.success);
        },
      },
      Hu = {
        zc: function (a) {
          return a.callback;
        },
        Sb: function (a, b) {
          var c = {};
          return (
            (c.__gppCall = {
              callId: b,
              command: "getSection",
              version: "1.1",
              parameter: a.apiPrefix,
            }),
            c
          );
        },
        Bb: function (a, b) {
          b = b.__gppReturn;
          var c;
          a({
            qc: null != (c = b.returnValue) ? c : void 0,
            rc: b.success ? void 0 : 2,
          });
        },
      };
    function Iu(a) {
      var b = {};
      "string" === typeof a.data ? (b = JSON.parse(a.data)) : (b = a.data);
      return { payload: b, ke: b.__gppReturn.callId };
    }
    var Ju = function (a, b) {
      b = void 0 === b ? {} : b;
      L.call(this);
      this.caller = new yu(
        a,
        "__gppLocator",
        function (d) {
          return "function" === typeof d.__gpp;
        },
        Iu
      );
      this.caller.l.set("addEventListener", Cu);
      this.caller.o.set("addEventListener", Fu);
      this.caller.l.set("removeEventListener", Du);
      this.caller.o.set("removeEventListener", Gu);
      this.caller.l.set("getDataWithCallback", Eu);
      this.caller.o.set("getDataWithCallback", Hu);
      var c;
      this.timeoutMs = null != (c = b.timeoutMs) ? c : 500;
    };
    v(Ju, L);
    Ju.prototype.L = function () {
      this.caller.W();
      L.prototype.L.call(this);
    };
    Ju.prototype.addEventListener = function (a) {
      var b = this,
        c = Ff(function () {
          a(Ku, !0);
        }),
        d =
          -1 === this.timeoutMs
            ? void 0
            : setTimeout(function () {
                c();
              }, this.timeoutMs);
      Bu(this.caller, "addEventListener", {
        listener: function (e, f) {
          clearTimeout(d);
          try {
            var g;
            void 0 === (null == (g = e.pingData) ? void 0 : g.gppVersion) ||
            "1" === e.pingData.gppVersion ||
            "1.0" === e.pingData.gppVersion
              ? (b.removeEventListener(e.listenerId), a(Lu, !0))
              : a(e, f);
          } catch (h) {
            a(Mu, !0);
          }
        },
      });
    };
    Ju.prototype.removeEventListener = function (a) {
      Bu(this.caller, "removeEventListener", { listenerId: a });
    };
    var Lu = {
        eventName: "signalStatus",
        data: "ready",
        pingData: { internalErrorState: 1 },
        listenerId: -1,
      },
      Mu = {
        eventName: "signalStatus",
        data: "ready",
        pingData: { gppString: "GPP_STRING_UNAVAILABLE", internalErrorState: 2 },
        listenerId: -1,
      },
      Ku = {
        eventName: "signalStatus",
        data: "ready",
        pingData: { gppString: "GPP_TIME_OUT", internalErrorState: 3 },
        listenerId: -1,
      };
    var Nu = function (a) {
        void 0 !== a.addtlConsent &&
          "string" !== typeof a.addtlConsent &&
          (a.addtlConsent = void 0);
        void 0 !== a.gdprApplies &&
          "boolean" !== typeof a.gdprApplies &&
          (a.gdprApplies = void 0);
        return (void 0 !== a.tcString && "string" !== typeof a.tcString) ||
          (void 0 !== a.listenerId && "number" !== typeof a.listenerId)
          ? 2
          : a.cmpStatus && "error" !== a.cmpStatus
          ? 0
          : 3;
      },
      Ou = function (a, b) {
        b = void 0 === b ? {} : b;
        L.call(this);
        this.h = a;
        this.g = null;
        this.A = {};
        this.B = 0;
        var c;
        this.o = null != (c = b.timeoutMs) ? c : 500;
        var d;
        this.l = null != (d = b.Xh) ? d : !1;
        this.j = null;
      };
    v(Ou, L);
    Ou.prototype.L = function () {
      this.A = {};
      this.j && (Kf(this.h, "message", this.j), delete this.j);
      delete this.A;
      delete this.h;
      delete this.g;
      L.prototype.L.call(this);
    };
    var Qu = function (a) {
        return "function" === typeof a.h.__tcfapi || null != Pu(a);
      },
      Tu = function (a, b) {
        var c = { internalErrorState: 0, internalBlockOnErrors: a.l },
          d = Ff(function () {
            return b(c);
          }),
          e = 0;
        -1 !== a.o &&
          (e = setTimeout(function () {
            e = 0;
            c.tcString = "tcunavailable";
            c.internalErrorState = 1;
            d();
          }, a.o));
        Ru(a, "addEventListener", function (f) {
          f &&
            ((c = f),
            (c.internalErrorState = Nu(c)),
            (c.internalBlockOnErrors = a.l),
            Su(c)
              ? (0 != c.internalErrorState && (c.tcString = "tcunavailable"),
                Ru(a, "removeEventListener", null, c.listenerId),
                (f = e) && clearTimeout(f),
                d())
              : ("error" === c.cmpStatus || 0 !== c.internalErrorState) &&
                (f = e) &&
                clearTimeout(f));
        });
      };
    Ou.prototype.addEventListener = function (a) {
      var b = this,
        c = { internalBlockOnErrors: this.l },
        d = Ff(function () {
          return a(c);
        }),
        e = 0;
      -1 !== this.o &&
        (e = setTimeout(function () {
          c.tcString = "tcunavailable";
          c.internalErrorState = 1;
          d();
        }, this.o));
      var f = function (g, h) {
        clearTimeout(e);
        g
          ? ((c = g),
            (c.internalErrorState = Nu(c)),
            (c.internalBlockOnErrors = b.l),
            (h && 0 === c.internalErrorState) ||
              ((c.tcString = "tcunavailable"), h || (c.internalErrorState = 3)))
          : ((c.tcString = "tcunavailable"), (c.internalErrorState = 3));
        a(c);
      };
      try {
        Ru(this, "addEventListener", f);
      } catch (g) {
        (c.tcString = "tcunavailable"),
          (c.internalErrorState = 3),
          e && (clearTimeout(e), (e = 0)),
          d();
      }
    };
    Ou.prototype.removeEventListener = function (a) {
      a && a.listenerId && Ru(this, "removeEventListener", null, a.listenerId);
    };
    var Ru = function (a, b, c, d) {
        c || (c = function () {});
        if ("function" === typeof a.h.__tcfapi) (a = a.h.__tcfapi), a(b, 2, c, d);
        else if (Pu(a)) {
          Uu(a);
          var e = ++a.B;
          a.A[e] = c;
          a.g &&
            ((c = {}),
            a.g.postMessage(
              ((c.__tcfapiCall = {
                command: b,
                version: 2,
                callId: e,
                parameter: d,
              }),
              c),
              "*"
            ));
        } else c({}, !1);
      },
      Pu = function (a) {
        if (a.g) return a.g;
        a.g = vh(a.h, "__tcfapiLocator");
        return a.g;
      },
      Uu = function (a) {
        a.j ||
          ((a.j = function (b) {
            try {
              var c = ("string" === typeof b.data ? JSON.parse(b.data) : b.data)
                .__tcfapiReturn;
              a.A[c.callId](c.returnValue, c.success);
            } catch (d) {}
          }),
          Jf(a.h, "message", a.j));
      },
      Su = function (a) {
        if (!1 === a.gdprApplies) return !0;
        void 0 === a.internalErrorState && (a.internalErrorState = Nu(a));
        return "error" === a.cmpStatus || 0 !== a.internalErrorState
          ? a.internalBlockOnErrors
            ? (Qh({ e: String(a.internalErrorState) }, "tcfe"), !1)
            : !0
          : "loaded" !== a.cmpStatus ||
            ("tcloaded" !== a.eventStatus &&
              "useractioncomplete" !== a.eventStatus)
          ? !1
          : !0;
      };
    qu([1, 8, 10, 11, 12, 2, 3, 4, 5]);
    qu([1, 6, 7, 8, 9, 10, 11, 12, 2, 3, 4, 5]);
    qu([1, 6, 7, 8, 9, 10, 11, 12, 2, 3, 4, 5]);
    new pu();
    var N = function (a, b) {
      this.g = this.A = this.o = "";
      this.H = null;
      this.K = this.h = "";
      this.l = !1;
      var c;
      a instanceof N
        ? ((this.l = void 0 !== b ? b : a.l),
          Vu(this, a.o),
          (this.A = a.A),
          (this.g = a.g),
          Wu(this, a.H),
          (this.h = a.h),
          Xu(this, Yu(a.j)),
          (this.K = a.D()))
        : a && (c = String(a).match(Xg))
        ? ((this.l = !!b),
          Vu(this, c[1] || "", !0),
          (this.A = Zu(c[2] || "")),
          (this.g = Zu(c[3] || "", !0)),
          Wu(this, c[4]),
          (this.h = Zu(c[5] || "", !0)),
          Xu(this, c[6] || "", !0),
          (this.K = Zu(c[7] || "")))
        : ((this.l = !!b), (this.j = new $u(null, this.l)));
    };
    N.prototype.toString = function () {
      var a = [],
        b = this.o;
      b && a.push(av(b, bv, !0), ":");
      var c = this.g;
      if (c || "file" == b)
        a.push("//"),
          (b = this.A) && a.push(av(b, bv, !0), "@"),
          a.push(
            encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")
          ),
          (c = this.H),
          null != c && a.push(":", String(c));
      if ((c = this.h))
        this.g && "/" != c.charAt(0) && a.push("/"),
          a.push(av(c, "/" == c.charAt(0) ? cv : dv, !0));
      (c = this.j.toString()) && a.push("?", c);
      (c = this.D()) && a.push("#", av(c, ev));
      return a.join("");
    };
    N.prototype.resolve = function (a) {
      var b = this.F(),
        c = !!a.o;
      c ? Vu(b, a.o) : (c = !!a.A);
      c ? (b.A = a.A) : (c = !!a.g);
      c ? (b.g = a.g) : (c = null != a.H);
      var d = a.h;
      if (c) Wu(b, a.H);
      else if ((c = !!a.h)) {
        if ("/" != d.charAt(0))
          if (this.g && !this.h) d = "/" + d;
          else {
            var e = b.h.lastIndexOf("/");
            -1 != e && (d = b.h.slice(0, e + 1) + d);
          }
        e = d;
        if (".." == e || "." == e) d = "";
        else if (xb(e, "./") || xb(e, "/.")) {
          d = 0 == e.lastIndexOf("/", 0);
          e = e.split("/");
          for (var f = [], g = 0; g < e.length; ) {
            var h = e[g++];
            "." == h
              ? d && g == e.length && f.push("")
              : ".." == h
              ? ((1 < f.length || (1 == f.length && "" != f[0])) && f.pop(),
                d && g == e.length && f.push(""))
              : (f.push(h), (d = !0));
          }
          d = f.join("/");
        } else d = e;
      }
      c ? (b.h = d) : (c = "" !== a.j.toString());
      c ? Xu(b, Yu(a.j)) : (c = !!a.K);
      c && (b.K = a.D());
      return b;
    };
    N.prototype.F = function () {
      return new N(this);
    };
    var Vu = function (a, b, c) {
        a.o = c ? Zu(b, !0) : b;
        a.o && (a.o = a.o.replace(/:$/, ""));
      },
      Wu = function (a, b) {
        if (b) {
          b = Number(b);
          if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
          a.H = b;
        } else a.H = null;
      },
      Xu = function (a, b, c) {
        b instanceof $u
          ? ((a.j = b), fv(a.j, a.l))
          : (c || (b = av(b, gv)), (a.j = new $u(b, a.l)));
      },
      hv = function (a, b, c) {
        a.j.set(b, c);
        return a;
      };
    N.prototype.D = function () {
      return this.K;
    };
    var iv = function (a) {
        return a instanceof N ? a.F() : new N(a, void 0);
      },
      Zu = function (a, b) {
        return a
          ? b
            ? decodeURI(a.replace(/%25/g, "%2525"))
            : decodeURIComponent(a)
          : "";
      },
      av = function (a, b, c) {
        return "string" === typeof a
          ? ((a = encodeURI(a).replace(b, jv)),
            c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            a)
          : null;
      },
      jv = function (a) {
        a = a.charCodeAt(0);
        return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
      },
      bv = /[#\/\?@]/g,
      dv = /[#\?:]/g,
      cv = /[#\?]/g,
      gv = /[#\?@]/g,
      ev = /#/g,
      $u = function (a, b) {
        this.h = this.g = null;
        this.j = a || null;
        this.o = !!b;
      },
      kv = function (a) {
        a.g ||
          ((a.g = new Map()),
          (a.h = 0),
          a.j &&
            Zg(a.j, function (b, c) {
              a.add(ug(b), c);
            }));
      };
    $u.prototype.add = function (a, b) {
      kv(this);
      this.j = null;
      a = lv(this, a);
      var c = this.g.get(a);
      c || this.g.set(a, (c = []));
      c.push(b);
      this.h += 1;
      return this;
    };
    $u.prototype.remove = function (a) {
      kv(this);
      a = lv(this, a);
      return this.g.has(a)
        ? ((this.j = null), (this.h -= this.g.get(a).length), this.g.delete(a))
        : !1;
    };
    $u.prototype.clear = function () {
      this.g = this.j = null;
      this.h = 0;
    };
    $u.prototype.isEmpty = function () {
      kv(this);
      return 0 == this.h;
    };
    var mv = function (a, b) {
      kv(a);
      b = lv(a, b);
      return a.g.has(b);
    };
    l = $u.prototype;
    l.forEach = function (a, b) {
      kv(this);
      this.g.forEach(function (c, d) {
        c.forEach(function (e) {
          a.call(b, e, d, this);
        }, this);
      }, this);
    };
    l.tc = function () {
      kv(this);
      for (
        var a = Array.from(this.g.values()),
          b = Array.from(this.g.keys()),
          c = [],
          d = 0;
        d < b.length;
        d++
      )
        for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
      return c;
    };
    l.xb = function (a) {
      kv(this);
      var b = [];
      if ("string" === typeof a)
        mv(this, a) && (b = b.concat(this.g.get(lv(this, a))));
      else {
        a = Array.from(this.g.values());
        for (var c = 0; c < a.length; c++) b = b.concat(a[c]);
      }
      return b;
    };
    l.set = function (a, b) {
      kv(this);
      this.j = null;
      a = lv(this, a);
      mv(this, a) && (this.h -= this.g.get(a).length);
      this.g.set(a, [b]);
      this.h += 1;
      return this;
    };
    l.get = function (a, b) {
      if (!a) return b;
      a = this.xb(a);
      return 0 < a.length ? String(a[0]) : b;
    };
    l.toString = function () {
      if (this.j) return this.j;
      if (!this.g) return "";
      for (var a = [], b = Array.from(this.g.keys()), c = 0; c < b.length; c++) {
        var d = b[c],
          e = encodeURIComponent(String(d));
        d = this.xb(d);
        for (var f = 0; f < d.length; f++) {
          var g = e;
          "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
          a.push(g);
        }
      }
      return (this.j = a.join("&"));
    };
    var Yu = function (a) {
        var b = new $u();
        b.j = a.j;
        a.g && ((b.g = new Map(a.g)), (b.h = a.h));
        return b;
      },
      lv = function (a, b) {
        b = String(b);
        a.o && (b = b.toLowerCase());
        return b;
      },
      fv = function (a, b) {
        b &&
          !a.o &&
          (kv(a),
          (a.j = null),
          a.g.forEach(function (c, d) {
            var e = d.toLowerCase();
            d != e &&
              (this.remove(d),
              this.remove(e),
              0 < c.length &&
                ((this.j = null),
                this.g.set(lv(this, e), hc(c)),
                (this.h += c.length)));
          }, a));
        a.o = b;
      };
    var nv,
      ov,
      pv,
      qv = function () {
        return w.navigator ? w.navigator.userAgent : "";
      },
      rv =
        xb(qv(), "(iPad") ||
        xb(qv(), "(Macintosh") ||
        xb(qv(), "(iPod") ||
        xb(qv(), "(iPhone");
    var tv =
        "ad.doubleclick.net bid.g.doubleclick.net ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(
          " "
        ),
      uv = ["c.googlesyndication.com"];
    function vv(a, b) {
      b = void 0 === b ? window.location.protocol : b;
      var c = !1;
      null == a ||
      !a.startsWith("http") ||
      (null == a ? 0 : a.startsWith("https"))
        ? (c = !1)
        : wv(a, uv)
        ? (c = !1)
        : b.includes("https") && wv(a, tv) && (c = !0);
      return c
        ? ((a = new N(a)), G(F.g(), "htp", "1"), Vu(a, "https"), a.toString())
        : a;
    }
    function xv(a) {
      if (!a) return !1;
      try {
        var b = "string" === typeof a ? new N(a) : a;
        return "gcache" == b.o && !!b.j.get("url");
      } catch (c) {
        return !1;
      }
    }
    function yv(a) {
      try {
        var b = "string" === typeof a ? new N(a) : a;
        if (xv(b)) {
          var c = b.j.get("url");
          return "undefined" === typeof c ? null : c;
        }
      } catch (d) {}
      return null;
    }
    function wv(a, b) {
      return new RegExp(
        "^https?://([a-z0-9-]{1,63}\\.)*(" +
          b.join("|").replace(/\./g, "\\.") +
          ")(:[0-9]+)?([/?#]|$)",
        "i"
      ).test(a);
    }
    function zv(a) {
      a = new N(a);
      var b = a.g;
      if ("http" != a.o && "https" != a.o) a = !1;
      else if (-1 == b.indexOf(".") || b.match(/^[\.0-9]*$/)) a = !1;
      else
        a: {
          try {
            ug(a.toString());
          } catch (c) {
            a = !1;
            break a;
          }
          a = !0;
        }
      return a;
    }
    var Av = -1;
    function Bv(a, b) {
      b = null != b ? b : "";
      sc && (b = "");
      if (!lb(yg(a))) {
        var c = a instanceof jg || !ru.test(a) ? a : new jg(a, kg);
        if (c instanceof jg) var d = c;
        else {
          d = void 0 === d ? ih : d;
          a: if (((d = void 0 === d ? ih : d), !(a instanceof jg))) {
            for (c = 0; c < d.length; ++c) {
              var e = d[c];
              if (e instanceof gh && e.Hf(a)) {
                a = new jg(a, kg);
                break a;
              }
            }
            a = void 0;
          }
          d = a || lg;
        }
        a = window;
        if (d instanceof jg)
          var f =
            d instanceof jg && d.constructor === jg ? d.g : "type_error:SafeUrl";
        else {
          b: if (ch) {
            try {
              f = new URL(d);
            } catch (g) {
              f = "https:";
              break b;
            }
            f = f.protocol;
          } else
            c: {
              f = document.createElement("a");
              try {
                f.href = d;
              } catch (g) {
                f = void 0;
                break c;
              }
              f = f.protocol;
              f = ":" === f || "" === f ? "https:" : f;
            }
          f = "javascript:" !== f ? d : void 0;
        }
        void 0 !== f && a.open(f, "_blank", b);
      }
    }
    var Cv = /OS (\S+) like/,
      Dv = /Android ([\d\.]+)/;
    function Ev(a, b) {
      a = (a = a.exec(Eb())) ? a[1] : "";
      a = a.replace(/_/g, ".");
      return 0 <= Ab(a, b);
    }
    var Fv = function () {
        return zc || (wc && "ontouchstart" in document.documentElement);
      },
      Gv = function (a) {
        return Bc && Ev(Cv, a);
      },
      Hv = function (a) {
        return (a = void 0 === a ? null : a) &&
          "function" === typeof a.getAttribute
          ? a.getAttribute("playsinline")
            ? !0
            : !1
          : !1;
      };
    var Iv = function (a) {
      M.call(this);
      this.h = a;
      this.l = this.A = !1;
      this.B = this.D = 0;
      this.g = new zs(1e3);
      rn(this, this.g);
      Kr(this.g, "tick", this.F, !1, this);
      Kr(this.h, "pause", this.j, !1, this);
      Kr(this.h, "playing", this.j, !1, this);
      Kr(this.h, "ended", this.j, !1, this);
      Kr(this.h, "timeupdate", this.j, !1, this);
    };
    v(Iv, M);
    var Jv = function (a) {
      var b;
      return null != (b = a.h.currentTime) ? b : a.h.getCurrentTime();
    };
    Iv.prototype.j = function (a) {
      switch (a.type) {
        case "playing":
          Kv(this);
          break;
        case "pause":
        case "ended":
          this.g.enabled && this.g.stop();
          break;
        case "timeupdate":
          !this.A && 0 < Jv(this) && ((this.A = !0), Kv(this));
      }
    };
    var Kv = function (a) {
      !a.g.enabled &&
        a.A &&
        ((a.D = 1e3 * Jv(a)), (a.B = Date.now()), (a.l = !1), a.g.start());
    };
    Iv.prototype.F = function () {
      var a = Date.now(),
        b = a - this.B,
        c = 1e3 * Jv(this);
      c - this.D < 0.5 * b
        ? this.l || ((this.l = !0), this.dispatchEvent("playbackStalled"))
        : (this.l = !1);
      this.D = c;
      this.B = a;
    };
    var Lv =
        "://secure-...imrworldwide.com/ ://cdn.imrworldwide.com/ ://aksecure.imrworldwide.com/ ://[^.]*.moatads.com ://youtube[0-9]+.moatpixel.com ://pm.adsafeprotected.com/youtube ://pm.test-adsafeprotected.com/youtube ://e[0-9]+.yt.srs.doubleverify.com www.google.com/pagead/xsul www.youtube.com/pagead/slav".split(
          " "
        ),
      Mv = /\bocr\b/;
    function Nv(a) {
      if (lb(yg(a)) || (sc && 2048 < a.length)) return !1;
      try {
        if (new N(a).D().match(Mv)) return !0;
      } catch (b) {}
      return (
        null !=
        Lv.find(function (b) {
          return null != a.match(b);
        })
      );
    }
    var Ov = new Map(),
      Pv = function () {
        this.h = this.g = null;
      };
    function Qv(a, b, c, d) {
      var e = vm(a);
      b.width <= e.width && b.height <= e.height
        ? (Rv(d), c(e))
        : ((e = setTimeout(function () {
            return Qv(a, b, c, d);
          }, 200)),
          (d.h = e));
    }
    function Sv(a, b) {
      b = void 0 === b ? new A(1, 1) : b;
      var c = new Pv(),
        d = new Promise(function (e) {
          var f = vm(a);
          if (b.width <= f.width && b.height <= f.height) return e(f);
          "ResizeObserver" in window
            ? ((f = new ResizeObserver(function (g) {
                window.requestAnimationFrame(function () {
                  for (
                    var h = new A(0, 0), k = t(g), n = k.next();
                    !n.done;
                    n = k.next()
                  )
                    if (
                      ((n = n.value),
                      n.contentBoxSize
                        ? ((n = Array.isArray(n.contentBoxSize)
                            ? n.contentBoxSize[0]
                            : n.contentBoxSize),
                          (h.width = Math.floor(n.inlineSize)),
                          (h.height = Math.floor(n.blockSize)))
                        : ((h.width = Math.floor(n.contentRect.width)),
                          (h.height = Math.floor(n.contentRect.height))),
                      b.width <= h.width && b.height <= h.height)
                    )
                      return Rv(c), e(h);
                });
              })),
              (c.g = f),
              f.observe(a))
            : Qv(a, b, e, c);
        });
      Ov.set(d, c);
      return d;
    }
    function Rv(a) {
      a.h && window.clearTimeout(a.h);
      a.g && (a.g.disconnect(), (a.g = null));
    }
    function Tv(a, b) {
      return lb(b) ? !1 : new RegExp(a).test(b);
    }
    function Uv(a) {
      var b = {};
      a.split(",").forEach(function (c) {
        var d = c.split("=");
        2 == d.length &&
          ((c = nb(d[0])), (d = nb(d[1])), 0 < c.length && (b[c] = d));
      });
      return b;
    }
    function Vv(a) {
      var b =
        "af am ar_eg ar_sa ar_xb ar be bg bn ca cs da de_at de_cn de el en_au en_ca en_gb en_ie en_in en_sg en_xa en_xc en_za en es_419 es_ar es_bo es_cl es_co es_cr es_do es_ec es_gt es_hn es_mx es_ni es_pa es_pe es_pr es_py es_sv es_us es_uy es_ve es et eu fa fi fil fr_ca fr_ch fr gl gsw gu he hi hr hu id in is it iw ja kn ko ln lo lt lv ml mo mr ms nb ne nl no pl pt_br pt_pt pt ro ru sk sl sr_latn sr sv sw ta te th tl tr uk ur vi zh_cn zh_hk zh_tw zh zu".split(
          " "
        );
      if (!a) return null;
      a = a.toLowerCase().replace("-", "_");
      if (b.includes(a)) return a;
      a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "";
      return b.includes(a) ? a : null;
    }
    var Wv = function () {
      this.g = Date.now();
    };
    Wv.prototype.reset = function () {
      this.g = Date.now();
    };
    var Xv = function (a) {
      a = a.g + 5e3 - Date.now();
      return 0 < a ? a : 0;
    };
    var Yv = function (a, b) {
      this.url = a;
      this.g = void 0 === b ? null : b;
    };
    var Zv = function (a) {
      switch (a) {
        case 0:
          return "No Error";
        case 1:
          return "Access denied to content document";
        case 2:
          return "File not found";
        case 3:
          return "Firefox silently errored";
        case 4:
          return "Application custom error";
        case 5:
          return "An exception occurred";
        case 6:
          return "Http response at 400 or 500 level";
        case 7:
          return "Request was aborted";
        case 8:
          return "Request timed out";
        case 9:
          return "The resource is not available offline";
        default:
          return "Unrecognized error code";
      }
    };
    var $v = function (a) {
      var b = Error.call(this, a);
      this.message = b.message;
      "stack" in b && (this.stack = b.stack);
      this.errorCode = a;
    };
    v($v, Error);
    var aw = function () {
        if (!sc) return !1;
        try {
          return new ActiveXObject("MSXML2.DOMDocument"), !0;
        } catch (a) {
          return !1;
        }
      },
      bw = sc && aw();
    var cw = function (a) {
      L.call(this);
      this.o = a;
      this.h = {};
    };
    cb(cw, L);
    var dw = [];
    cw.prototype.O = function (a, b, c, d) {
      return ew(this, a, b, c, d);
    };
    var ew = function (a, b, c, d, e, f) {
      Array.isArray(c) || (c && (dw[0] = c.toString()), (c = dw));
      for (var g = 0; g < c.length; g++) {
        var h = Kr(b, c[g], d || a.handleEvent, e || !1, f || a.o || a);
        if (!h) break;
        a.h[h.key] = h;
      }
      return a;
    };
    cw.prototype.Qb = function (a, b, c, d) {
      return fw(this, a, b, c, d);
    };
    var fw = function (a, b, c, d, e, f) {
      if (Array.isArray(c))
        for (var g = 0; g < c.length; g++) fw(a, b, c[g], d, e, f);
      else {
        b = Jr(b, c, d || a.handleEvent, e, f || a.o || a);
        if (!b) return a;
        a.h[b.key] = b;
      }
      return a;
    };
    cw.prototype.qb = function (a, b, c, d, e) {
      if (Array.isArray(b))
        for (var f = 0; f < b.length; f++) this.qb(a, b[f], c, d, e);
      else
        (c = c || this.handleEvent),
          (d = Ua(d) ? !!d.capture : !!d),
          (e = e || this.o || this),
          (c = Lr(c)),
          (d = !!d),
          (b = zr(a)
            ? a.Kb(b, c, d, e)
            : a
            ? (a = Nr(a))
              ? a.Kb(b, c, d, e)
              : null
            : null),
          b && (Sr(b), delete this.h[b.key]);
    };
    var gw = function (a) {
      Mf(
        a.h,
        function (b, c) {
          this.h.hasOwnProperty(c) && Sr(b);
        },
        a
      );
      a.h = {};
    };
    cw.prototype.L = function () {
      cw.Da.L.call(this);
      gw(this);
    };
    cw.prototype.handleEvent = function () {
      throw Error("EventHandler.handleEvent not implemented");
    };
    var hw = function () {};
    hw.prototype.g = null;
    var jw = function (a) {
      var b;
      (b = a.g) || ((b = {}), iw(a) && ((b[0] = !0), (b[1] = !0)), (b = a.g = b));
      return b;
    };
    var kw,
      lw = function () {};
    cb(lw, hw);
    var mw = function (a) {
        return (a = iw(a)) ? new ActiveXObject(a) : new XMLHttpRequest();
      },
      iw = function (a) {
        if (
          !a.h &&
          "undefined" == typeof XMLHttpRequest &&
          "undefined" != typeof ActiveXObject
        ) {
          for (
            var b = [
                "MSXML2.XMLHTTP.6.0",
                "MSXML2.XMLHTTP.3.0",
                "MSXML2.XMLHTTP",
                "Microsoft.XMLHTTP",
              ],
              c = 0;
            c < b.length;
            c++
          ) {
            var d = b[c];
            try {
              return new ActiveXObject(d), (a.h = d);
            } catch (e) {}
          }
          throw Error(
            "Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"
          );
        }
        return a.h;
      };
    kw = new lw();
    var nw = function (a) {
      M.call(this);
      this.headers = new Map();
      this.G = a || null;
      this.h = !1;
      this.F = this.g = null;
      this.N = "";
      this.l = 0;
      this.j = this.J = this.A = this.I = !1;
      this.D = 0;
      this.B = null;
      this.Z = "";
      this.U = this.V = !1;
    };
    cb(nw, M);
    var ow = /^https?$/i,
      pw = ["POST", "PUT"],
      uw = function (a, b, c, d) {
        if (a.g)
          throw Error(
            "[goog.net.XhrIo] Object is active with another request=" +
              a.N +
              "; newUri=" +
              b
          );
        c = c ? c.toUpperCase() : "GET";
        a.N = b;
        a.l = 0;
        a.I = !1;
        a.h = !0;
        a.g = a.G ? mw(a.G) : mw(kw);
        a.F = a.G ? jw(a.G) : jw(kw);
        a.g.onreadystatechange = ab(a.X, a);
        try {
          (a.J = !0), a.g.open(c, String(b), !0), (a.J = !1);
        } catch (g) {
          qw(a);
          return;
        }
        b = d || "";
        d = new Map(a.headers);
        var e = Array.from(d.keys()).find(function (g) {
            return "content-type" == g.toLowerCase();
          }),
          f = w.FormData && b instanceof w.FormData;
        !cc(pw, c) ||
          e ||
          f ||
          d.set(
            "Content-Type",
            "application/x-www-form-urlencoded;charset=utf-8"
          );
        c = t(d);
        for (d = c.next(); !d.done; d = c.next())
          (e = t(d.value)),
            (d = e.next().value),
            (e = e.next().value),
            a.g.setRequestHeader(d, e);
        a.Z && (a.g.responseType = a.Z);
        "withCredentials" in a.g &&
          a.g.withCredentials !== a.V &&
          (a.g.withCredentials = a.V);
        try {
          rw(a),
            0 < a.D &&
              ((a.U = tw(a.g)),
              a.U
                ? ((a.g.timeout = a.D), (a.g.ontimeout = ab(a.aa, a)))
                : (a.B = As(a.aa, a.D, a))),
            (a.A = !0),
            a.g.send(b),
            (a.A = !1);
        } catch (g) {
          qw(a);
        }
      },
      tw = function (a) {
        return sc && "number" === typeof a.timeout && void 0 !== a.ontimeout;
      };
    nw.prototype.aa = function () {
      "undefined" != typeof Qa &&
        this.g &&
        ((this.l = 8), this.dispatchEvent("timeout"), this.abort(8));
    };
    var qw = function (a) {
        a.h = !1;
        a.g && ((a.j = !0), a.g.abort(), (a.j = !1));
        a.l = 5;
        vw(a);
        ww(a);
      },
      vw = function (a) {
        a.I ||
          ((a.I = !0), a.dispatchEvent("complete"), a.dispatchEvent("error"));
      };
    nw.prototype.abort = function (a) {
      this.g &&
        this.h &&
        ((this.h = !1),
        (this.j = !0),
        this.g.abort(),
        (this.j = !1),
        (this.l = a || 7),
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        ww(this));
    };
    nw.prototype.L = function () {
      this.g &&
        (this.h && ((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1)),
        ww(this, !0));
      nw.Da.L.call(this);
    };
    nw.prototype.X = function () {
      this.wa() || (this.J || this.A || this.j ? xw(this) : this.ba());
    };
    nw.prototype.ba = function () {
      xw(this);
    };
    var xw = function (a) {
        if (
          a.h &&
          "undefined" != typeof Qa &&
          (!a.F[1] || 4 != yw(a) || 2 != zw(a))
        )
          if (a.A && 4 == yw(a)) As(a.X, 0, a);
          else if ((a.dispatchEvent("readystatechange"), 4 == yw(a))) {
            a.h = !1;
            try {
              var b = zw(a);
              a: switch (b) {
                case 200:
                case 201:
                case 202:
                case 204:
                case 206:
                case 304:
                case 1223:
                  var c = !0;
                  break a;
                default:
                  c = !1;
              }
              var d;
              if (!(d = c)) {
                var e;
                if ((e = 0 === b)) {
                  var f = String(a.N).match(Xg)[1] || null;
                  !f &&
                    w.self &&
                    w.self.location &&
                    (f = w.self.location.protocol.slice(0, -1));
                  e = !ow.test(f ? f.toLowerCase() : "");
                }
                d = e;
              }
              d
                ? (a.dispatchEvent("complete"), a.dispatchEvent("success"))
                : ((a.l = 6), vw(a));
            } finally {
              ww(a);
            }
          }
      },
      ww = function (a, b) {
        if (a.g) {
          rw(a);
          var c = a.g,
            d = a.F[0] ? function () {} : null;
          a.g = null;
          a.F = null;
          b || a.dispatchEvent("ready");
          try {
            c.onreadystatechange = d;
          } catch (e) {}
        }
      },
      rw = function (a) {
        a.g && a.U && (a.g.ontimeout = null);
        a.B && (w.clearTimeout(a.B), (a.B = null));
      };
    nw.prototype.isActive = function () {
      return !!this.g;
    };
    var yw = function (a) {
        return a.g ? a.g.readyState : 0;
      },
      zw = function (a) {
        try {
          return 2 < yw(a) ? a.g.status : -1;
        } catch (b) {
          return -1;
        }
      },
      Aw = function (a) {
        if (a.g) {
          a: {
            a = a.g.responseText;
            if (w.JSON)
              try {
                var b = w.JSON.parse(a);
                break a;
              } catch (c) {}
            b = xi(a);
          }
          return b;
        }
      };
    var Bw = function () {};
    Bw.prototype.get = function (a) {
      return Cw({
        url: a.url,
        timeout: a.timeout,
        withCredentials: void 0 === a.withCredentials ? !0 : a.withCredentials,
        method: "GET",
        headers: void 0 === a.headers ? {} : a.headers,
      });
    };
    var Cw = function (a) {
        var b = a.url,
          c = a.timeout,
          d = a.withCredentials,
          e = a.method,
          f = void 0 === a.content ? void 0 : a.content,
          g = void 0 === a.headers ? {} : a.headers;
        return Dw({
          url: b,
          timeout: c,
          withCredentials: d,
          method: e,
          content: f,
          headers: g,
        }).then(
          function (h) {
            return Promise.resolve(h);
          },
          function (h) {
            return h instanceof Error && 6 == h.message && d
              ? Dw({
                  url: b,
                  timeout: c,
                  withCredentials: !d,
                  method: e,
                  content: f,
                  headers: g,
                })
              : Promise.reject(h);
          }
        );
      },
      Dw = function (a) {
        var b = a.url,
          c = a.timeout,
          d = a.withCredentials,
          e = a.method,
          f = void 0 === a.content ? void 0 : a.content;
        a = void 0 === a.headers ? {} : a.headers;
        var g = new nw();
        g.V = d;
        g.D = Math.max(0, Xv(c));
        for (var h in a) g.headers.set(h, a[h]);
        var k = new cw();
        return new Promise(function (n, m) {
          k.Qb(g, "success", function () {
            a: {
              if (Km())
                try {
                  Aw(g);
                  var p = "application/json";
                  break a;
                } catch (x) {
                  p = "application/xml";
                  break a;
                }
              g.g && 4 == yw(g)
                ? ((p = g.g.getResponseHeader("Content-Type")),
                  (p = null === p ? void 0 : p))
                : (p = void 0);
              p = p || "";
            }
            if (-1 != p.indexOf("application/json")) n(Aw(g) || {});
            else {
              try {
                var u = g.g ? g.g.responseXML : null;
              } catch (x) {
                u = null;
              }
              if (null == u) {
                try {
                  var r = g.g ? g.g.responseText : "";
                } catch (x) {
                  r = "";
                }
                u = r;
                if ("undefined" != typeof DOMParser)
                  (r = new DOMParser()),
                    (u = sg(u)),
                    (u = r.parseFromString(rg(u), "application/xml"));
                else if (bw) {
                  r = new ActiveXObject("MSXML2.DOMDocument");
                  r.resolveExternals = !1;
                  r.validateOnParse = !1;
                  try {
                    r.setProperty("ProhibitDTD", !0),
                      r.setProperty("MaxXMLSize", 2048),
                      r.setProperty("MaxElementDepth", 256);
                  } catch (x) {}
                  r.loadXML(u);
                  u = r;
                } else
                  throw Error(
                    "Your browser does not support loading xml documents"
                  );
              }
              n(u);
            }
            k.W();
            g.W();
          });
          k.Qb(g, ["error", "timeout"], function () {
            m(new $v(g.l, zw(g)));
            k.W();
            g.W();
          });
          uw(g, vv(b), e, f);
        });
      };
    y("google.javascript.ads.imalib.common.UrlLoader", Bw);
    var Hw = function (a, b, c, d, e) {
        c = void 0 === c ? !1 : c;
        e = void 0 === e ? null : e;
        try {
          if (
            ((b = (void 0 === d ? 0 : d) ? vv(b, "https") : vv(b)),
            (c = c || Nv(b)),
            a.h || null != e)
          )
            Ew(a, b, c, e);
          else {
            var f = Eh() ? e : null;
            Km() ? Fw(b) : Gw(a, b, c, f);
          }
        } catch (g) {}
      },
      Iw = function (a, b) {
        var c = { keepalive: !0, method: "get", redirect: "follow" };
        a && (c.referrerPolicy = "no-referrer");
        b
          ? "setAttributionReporting" in XMLHttpRequest.prototype
            ? (c.attributionReporting = {
                eventSourceEligible: !0,
                triggerEligible: !1,
              })
            : (c.headers = { "Attribution-Reporting-Eligible": "event-source" })
          : (c.mode = "no-cors");
        return c;
      },
      Ew = function (a, b, c, d) {
        d = void 0 === d ? null : d;
        G(F.g(), "faa", "1");
        var e = Eh();
        fetch(b, Iw(c, "" === d && e))
          .then(function () {
            G(F.g(), "fas", "1");
          })
          .catch(function () {
            G(F.g(), "faf", "1");
            a.h = !1;
            var f = d;
            f = Eh() ? f : null;
            Km() ? Fw(b) : Gw(a, b, c, f);
          });
        e && d && fetch(d, Iw(c, !0));
      },
      Gw = function (a, b, c, d) {
        var e = new Image(),
          f = (a.j++).toString();
        a.g.set(f, e);
        e.onload = e.onerror = function () {
          a.g.delete(f);
        };
        c && (e.referrerPolicy = "no-referrer");
        null != d && (e.attributionSrc = d);
        e.src = b;
      },
      Fw = function (a) {
        new Bw().get({ url: a, timeout: new Wv() });
      };
    var Lw = {
      AUTOPLAY_DISALLOWED: "autoplayDisallowed",
      qg: "beginFullscreen",
      rg: "canPlay",
      sg: "canPlayThrough",
      CLICK: "click",
      DURATION_CHANGE: "durationChange",
      Dg: "end",
      Eg: "endFullscreen",
      ERROR: "error",
      Ig: "focusSkipButton",
      Ke: "loadStart",
      LOADED: "loaded",
      ih: "mediaLoadTimeout",
      jh: "mediaPlaybackTimeout",
      Od: "pause",
      qh: "play",
      rh: "playing",
      zh: "seeked",
      Ah: "seeking",
      Bh: "skip",
      Ve: "skipShown",
      Ch: "stalled",
      Pd: "start",
      Hh: "timeUpdate",
      Fh: "timedMetadata",
      Qh: "volumeChange",
      Rh: "waiting",
      Sh: "windowFocusChanged",
      Jg: "fullyLoaded",
    };
    var Mw = function () {
      M.apply(this, arguments);
    };
    v(Mw, M);
    Mw.prototype.B = function () {
      return !1;
    };
    Mw.prototype.F = function () {
      return -1;
    };
    Mw.prototype.G = function () {};
    var O = {},
      Nw =
        ((O[18] = -1),
        (O[22] = -1),
        (O[43] = 350),
        (O[44] = 350),
        (O[45] = 350),
        (O[59] = -1),
        (O[133] = 350),
        (O[134] = 350),
        (O[135] = 350),
        (O[136] = 350),
        (O[139] = 50),
        (O[140] = 50),
        (O[141] = 50),
        (O[160] = 350),
        (O[242] = 150),
        (O[243] = 150),
        (O[244] = 150),
        (O[245] = 150),
        (O[247] = 150),
        (O[249] = 50),
        (O[250] = 50),
        (O[251] = 50),
        (O[278] = 150),
        (O[342] = -1),
        (O[343] = -1),
        (O[344] = -1),
        (O[345] = -1),
        (O[346] = -1),
        (O[347] = -1),
        (O[396] = -1),
        (O[398] = -1),
        O),
      Q = {},
      Ow =
        ((Q[18] = !1),
        (Q[22] = !1),
        (Q[43] = !0),
        (Q[44] = !0),
        (Q[45] = !0),
        (Q[59] = !1),
        (Q[133] = !0),
        (Q[134] = !0),
        (Q[135] = !0),
        (Q[136] = !0),
        (Q[139] = !0),
        (Q[140] = !0),
        (Q[141] = !0),
        (Q[160] = !0),
        (Q[242] = !0),
        (Q[243] = !0),
        (Q[244] = !0),
        (Q[245] = !0),
        (Q[247] = !0),
        (Q[249] = !0),
        (Q[250] = !0),
        (Q[251] = !0),
        (Q[278] = !0),
        (Q[342] = !1),
        (Q[343] = !1),
        (Q[344] = !1),
        (Q[345] = !1),
        (Q[346] = !1),
        (Q[347] = !1),
        (Q[396] = !0),
        (Q[398] = !0),
        Q),
      S = {},
      Pw =
        ((S[18] = "video/mp4"),
        (S[22] = "video/mp4"),
        (S[43] = "video/webm"),
        (S[44] = "video/webm"),
        (S[45] = "video/webm"),
        (S[59] = "video/mp4"),
        (S[133] = "video/mp4"),
        (S[134] = "video/mp4"),
        (S[135] = "video/mp4"),
        (S[136] = "video/mp4"),
        (S[139] = "audio/mp4"),
        (S[140] = "audio/mp4"),
        (S[141] = "audio/mp4"),
        (S[160] = "video/mp4"),
        (S[242] = "video/webm"),
        (S[243] = "video/webm"),
        (S[244] = "video/webm"),
        (S[245] = "video/webm"),
        (S[247] = "video/webm"),
        (S[249] = "audio/webm"),
        (S[250] = "audio/webm"),
        (S[251] = "audio/webm"),
        (S[278] = "video/webm"),
        (S[342] = "video/mp4"),
        (S[343] = "video/mp4"),
        (S[344] = "video/mp4"),
        (S[345] = "video/mp4"),
        (S[346] = "video/mp4"),
        (S[347] = "video/mp4"),
        (S[396] = "video/mp4"),
        (S[398] = "video/mp4"),
        S),
      T = {},
      Qw =
        ((T[18] = "avc1.42001E, mp4a.40.2"),
        (T[22] = "avc1.64001F, mp4a.40.2"),
        (T[43] = "vp8, vorbis"),
        (T[44] = "vp8, vorbis"),
        (T[45] = "vp8, vorbis"),
        (T[59] = "avc1.4D001F, mp4a.40.2"),
        (T[133] = "avc1.4D401E"),
        (T[134] = "avc1.4D401E"),
        (T[135] = "avc1.4D401E"),
        (T[136] = "avc1.4D401E"),
        (T[139] = "mp4a.40.2"),
        (T[140] = "mp4a.40.2"),
        (T[141] = "mp4a.40.2"),
        (T[160] = "avc1.4D401E"),
        (T[242] = "vp9"),
        (T[243] = "vp9"),
        (T[244] = "vp9"),
        (T[245] = "vp9"),
        (T[247] = "vp9"),
        (T[249] = "opus"),
        (T[250] = "opus"),
        (T[251] = "opus"),
        (T[278] = "vp9"),
        (T[342] = "avc1.42E01E, mp4a.40.2"),
        (T[343] = "avc1.42E01E, mp4a.40.2"),
        (T[344] = "avc1.42E01E, mp4a.40.2"),
        (T[345] = "avc1.42E01E, mp4a.40.2"),
        (T[346] = "avc1.42E01E, mp4a.40.2"),
        (T[347] = "avc1.4D001F, mp4a.40.2"),
        (T[396] = "av01.0.05M.08"),
        (T[398] = "av01.0.05M.08"),
        T);
    var Sw = function (a) {
        this.uri = a;
        this.g = Rw(a);
      },
      Rw = function (a) {
        return new Map(
          a.h.split("/").reduce(function (b, c, d, e) {
            d % 2 && b.set(e[d - 1], c);
            return b;
          }, new Map())
        );
      };
    Sw.prototype.getId = function () {
      return Tw(this, "id");
    };
    var Tw = function (a, b) {
      var c = a.uri.j.get(b);
      return c ? c : (a = a.g.get(b)) ? a : null;
    };
    var Uw = RegExp("/itag/(\\d+)/");
    function Vw(a) {
      var b = Number(ah(a, "itag"));
      return b ? b : (a = a.match(Uw)) && 2 === a.length ? Number(a[1]) : null;
    }
    function Ww(a) {
      var b = Pw[a];
      a = Qw[a];
      b
        ? ((b = yg(b).toLowerCase()),
          (b = a ? b + '; codecs="' + yg(a) + '"' : b))
        : (b = "");
      return b;
    }
    function Xw(a, b) {
      if ("function" === typeof CustomEvent)
        return new CustomEvent(a, { detail: b });
      var c = document.createEvent("CustomEvent");
      c.initCustomEvent(a, !1, !0, b);
      return c;
    }
    var Yw = ["doubleclick.net"];
    function Zw() {
      if (Rb() || z("iPad") || z("iPod")) return !1;
      if (Pb()) {
        if (void 0 === pv) {
          a: {
            if (void 0 === nv) {
              if (rv) {
                var a = xb(qv(), "Safari");
                var b = new N(window.location.href).j.xb("js");
                b: {
                  if (
                    (b = b.length ? b[0] : "") &&
                    0 == b.lastIndexOf("afma-", 0)
                  ) {
                    var c = b.lastIndexOf("v");
                    if (
                      -1 < c &&
                      (b = b
                        .substr(c + 1)
                        .match(/^(\d+\.\d+\.\d+|^\d+\.\d+|^\d+)(-.*)?$/))
                    ) {
                      b = b[1];
                      break b;
                    }
                  }
                  b = "0.0.0";
                }
                if (!a || "0.0.0" !== b) {
                  a = nv = !0;
                  break a;
                }
              }
              nv = !1;
            }
            a = nv;
          }
          a ||
            (void 0 === ov && (ov = xb(qv(), "afma-sdk-a") ? !0 : !1), (a = ov));
          pv = a;
        }
        return pv ? !0 : Vg() ? !1 : $w();
      }
      a =
        Sb() ||
        (Ob() ? "Linux" === Fb.platform : z("Linux")) ||
        (Ob() ? "Windows" === Fb.platform : z("Windows")) ||
        (Ob() ? "Chrome OS" === Fb.platform : z("CrOS"));
      return (H(Oj) || H(Mj) || H(Nj)) && a && Nb() ? $w() : !1;
    }
    function $w() {
      var a = !1,
        b = new N(window.location.href).g;
      Yw.forEach(function (c) {
        b.includes(c) && (a = !0);
      });
      return a;
    }
    var ax,
      dx = function (a, b, c) {
        if ("number" === typeof a) var d = { name: bx(a) };
        else (d = a), (a = cx(a.name));
        this.code = a;
        this.g = d;
        b = "Error " + b + ": " + this.getName();
        c && (b += ", " + c);
        eb.call(this, b);
      };
    cb(dx, eb);
    dx.prototype.getName = function () {
      return this.g.name || "";
    };
    var ex = {
        Xe: 1,
        nh: 2,
        NOT_FOUND_ERR: 3,
        De: 4,
        Ge: 5,
        oh: 6,
        We: 7,
        ABORT_ERR: 8,
        Te: 9,
        Jh: 10,
        TIMEOUT_ERR: 11,
        Se: 12,
        INVALID_ACCESS_ERR: 13,
        INVALID_STATE_ERR: 14,
      },
      fx = (w.g || w.h || ex).Xe,
      gx = (w.g || w.h || ex).NOT_FOUND_ERR,
      hx = (w.g || w.h || ex).De,
      ix = (w.g || w.h || ex).Ge,
      jx = (w.g || w.h || ex).We,
      kx = (w.g || w.h || ex).ABORT_ERR,
      lx = (w.g || w.h || ex).Te,
      mx = (w.g || w.h || ex).TIMEOUT_ERR,
      nx = (w.g || w.h || ex).Se,
      ox = (w.DOMException || ex).INVALID_ACCESS_ERR,
      px = (w.DOMException || ex).INVALID_STATE_ERR,
      cx = function (a) {
        switch (a) {
          case "UnknownError":
            return fx;
          case "NotFoundError":
            return gx;
          case "ConstraintError":
            return hx;
          case "DataError":
            return ix;
          case "TransactionInactiveError":
            return jx;
          case "AbortError":
            return kx;
          case "ReadOnlyError":
            return lx;
          case "TimeoutError":
            return mx;
          case "QuotaExceededError":
            return nx;
          case "InvalidAccessError":
            return ox;
          case "InvalidStateError":
            return px;
          default:
            return fx;
        }
      },
      bx = function (a) {
        switch (a) {
          case fx:
            return "UnknownError";
          case gx:
            return "NotFoundError";
          case hx:
            return "ConstraintError";
          case ix:
            return "DataError";
          case jx:
            return "TransactionInactiveError";
          case kx:
            return "AbortError";
          case lx:
            return "ReadOnlyError";
          case mx:
            return "TimeoutError";
          case nx:
            return "QuotaExceededError";
          case ox:
            return "InvalidAccessError";
          case px:
            return "InvalidStateError";
          default:
            return "UnknownError";
        }
      },
      qx = function (a, b) {
        return "error" in a
          ? new dx(a.error, b)
          : new dx({ name: "UnknownError" }, b);
      },
      rx = function (a, b) {
        return "name" in a
          ? new dx(a, b + ": " + a.message)
          : new dx({ name: "UnknownError" }, b);
      };
    var sx = function (a) {
        this.g = a;
      },
      tx = w.IDBKeyRange || w.webkitIDBKeyRange;
    function ux() {} /*
  
   Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: MIT
  */
    var vx = function (a, b) {
      this.l = [];
      this.G = a;
      this.F = b || null;
      this.o = this.j = !1;
      this.h = void 0;
      this.K = this.I = this.B = !1;
      this.A = 0;
      this.g = null;
      this.H = 0;
    };
    cb(vx, ux);
    vx.prototype.cancel = function (a) {
      if (this.j) this.h instanceof vx && this.h.cancel();
      else {
        if (this.g) {
          var b = this.g;
          delete this.g;
          a ? b.cancel(a) : (b.H--, 0 >= b.H && b.cancel());
        }
        this.G ? this.G.call(this.F, this) : (this.K = !0);
        this.j || wx(this, new xx(this));
      }
    };
    vx.prototype.D = function (a, b) {
      this.B = !1;
      yx(this, a, b);
    };
    var yx = function (a, b, c) {
        a.j = !0;
        a.h = c;
        a.o = !b;
        zx(a);
      },
      Bx = function (a) {
        if (a.j) {
          if (!a.K) throw new Ax(a);
          a.K = !1;
        }
      };
    vx.prototype.callback = function (a) {
      Bx(this);
      yx(this, !0, a);
    };
    var wx = function (a, b) {
      Bx(a);
      yx(a, !1, b);
    };
    vx.prototype.Sc = function (a) {
      return Cx(this, a, null);
    };
    var Cx = function (a, b, c, d) {
      a.l.push([b, c, d]);
      a.j && zx(a);
      return a;
    };
    vx.prototype.then = function (a, b, c) {
      var d,
        e,
        f = new js(function (g, h) {
          e = g;
          d = h;
        });
      Cx(
        this,
        e,
        function (g) {
          g instanceof xx ? f.cancel() : d(g);
          return Dx;
        },
        this
      );
      return f.then(a, b, c);
    };
    vx.prototype.$goog_Thenable = !0;
    var Ex = function (a) {
        return Zb(a.l, function (b) {
          return "function" === typeof b[1];
        });
      },
      Dx = {},
      zx = function (a) {
        if (a.A && a.j && Ex(a)) {
          var b = a.A,
            c = Fx[b];
          c && (w.clearTimeout(c.g), delete Fx[b]);
          a.A = 0;
        }
        a.g && (a.g.H--, delete a.g);
        b = a.h;
        for (var d = (c = !1); a.l.length && !a.B; ) {
          var e = a.l.shift(),
            f = e[0],
            g = e[1];
          e = e[2];
          if ((f = a.o ? g : f))
            try {
              var h = f.call(e || a.F, b);
              h === Dx && (h = void 0);
              void 0 !== h &&
                ((a.o = a.o && (h == b || h instanceof Error)), (a.h = b = h));
              if (
                hs(b) ||
                ("function" === typeof w.Promise && b instanceof w.Promise)
              )
                (d = !0), (a.B = !0);
            } catch (k) {
              (b = k), (a.o = !0), Ex(a) || (c = !0);
            }
        }
        a.h = b;
        d &&
          ((h = ab(a.D, a, !0)),
          (d = ab(a.D, a, !1)),
          b instanceof vx ? (Cx(b, h, d), (b.I = !0)) : b.then(h, d));
        c && ((b = new Gx(b)), (Fx[b.g] = b), (a.A = b.g));
      },
      Ax = function () {
        eb.call(this);
      };
    cb(Ax, eb);
    Ax.prototype.message = "Deferred has already fired";
    Ax.prototype.name = "AlreadyCalledError";
    var xx = function () {
      eb.call(this);
    };
    cb(xx, eb);
    xx.prototype.message = "Deferred was canceled";
    xx.prototype.name = "CanceledError";
    var Gx = function (a) {
      this.g = w.setTimeout(ab(this.j, this), 0);
      this.h = a;
    };
    Gx.prototype.j = function () {
      delete Fx[this.g];
      throw this.h;
    };
    var Fx = {};
    var Hx = function () {
      M.call(this);
    };
    cb(Hx, M);
    Hx.prototype.g = null;
    Hx.prototype.next = function (a) {
      if (a) this.g["continue"](a);
      else this.g["continue"]();
    };
    Hx.prototype.remove = function () {
      var a = new vx();
      try {
        var b = this.g["delete"]();
      } catch (c) {
        return wx(a, rx(c, "deleting via cursor")), a;
      }
      b.onsuccess = function () {
        a.callback();
      };
      b.onerror = function (c) {
        wx(a, qx(c.target, "deleting via cursor"));
      };
      return a;
    };
    Hx.prototype.ha = function () {
      return this.g.value;
    };
    var Ix = function (a, b) {
      var c = new Hx();
      try {
        var d = a.openCursor(b ? b.g : null);
      } catch (e) {
        throw (c.W(), rx(e, a.name));
      }
      d.onsuccess = function (e) {
        c.g = e.target.result || null;
        c.g ? c.dispatchEvent("n") : c.dispatchEvent("c");
      };
      d.onerror = function () {
        c.dispatchEvent("e");
      };
      return c;
    };
    var Jx = function (a) {
      this.g = a;
    };
    Jx.prototype.getName = function () {
      return this.g.name;
    };
    var Kx = function (a, b, c) {
      var d = new vx();
      try {
        var e = a.g.get(c);
      } catch (f) {
        return (b += " with key " + bh(c)), wx(d, rx(f, b)), d;
      }
      e.onsuccess = function (f) {
        d.callback(f.target.result);
      };
      e.onerror = function (f) {
        b += " with key " + bh(c);
        wx(d, qx(f.target, b));
      };
      return d;
    };
    Jx.prototype.get = function (a) {
      return Kx(this, "getting from index " + this.getName(), a);
    };
    var Lx = function (a, b) {
      return Ix(a.g, b);
    };
    var Mx = function (a) {
      this.g = a;
    };
    Mx.prototype.getName = function () {
      return this.g.name;
    };
    var Nx = function (a, b, c, d, e) {
        var f = new vx();
        try {
          var g = e ? a.g[b](d, e) : a.g[b](d);
        } catch (h) {
          return (
            (c += bh(d)), e && (c += ", with key " + bh(e)), wx(f, rx(h, c)), f
          );
        }
        g.onsuccess = function (h) {
          f.callback(h.target.result);
        };
        g.onerror = function (h) {
          c += bh(d);
          e && (c += ", with key " + bh(e));
          wx(f, qx(h.target, c));
        };
        return f;
      },
      Ox = function (a, b) {
        return Nx(a, "put", "putting into " + a.getName() + " with value", b);
      };
    Mx.prototype.add = function (a, b) {
      return Nx(
        this,
        "add",
        "adding into " + this.getName() + " with value ",
        a,
        b
      );
    };
    Mx.prototype.remove = function (a) {
      var b = new vx();
      try {
        var c = this.g["delete"](a instanceof sx ? a.g : a);
      } catch (e) {
        return (
          (c = "removing from " + this.getName() + " with key " + bh(a)),
          wx(b, rx(e, c)),
          b
        );
      }
      c.onsuccess = function () {
        b.callback();
      };
      var d = this;
      c.onerror = function (e) {
        var f = "removing from " + d.getName() + " with key " + bh(a);
        wx(b, qx(e.target, f));
      };
      return b;
    };
    Mx.prototype.get = function (a) {
      var b = new vx();
      try {
        var c = this.g.get(a);
      } catch (e) {
        return (
          (c = "getting from " + this.getName() + " with key " + bh(a)),
          wx(b, rx(e, c)),
          b
        );
      }
      c.onsuccess = function (e) {
        b.callback(e.target.result);
      };
      var d = this;
      c.onerror = function (e) {
        var f = "getting from " + d.getName() + " with key " + bh(a);
        wx(b, qx(e.target, f));
      };
      return b;
    };
    Mx.prototype.clear = function () {
      var a = "clearing store " + this.getName(),
        b = new vx();
      try {
        var c = this.g.clear();
      } catch (d) {
        return wx(b, rx(d, a)), b;
      }
      c.onsuccess = function () {
        b.callback();
      };
      c.onerror = function (d) {
        wx(b, qx(d.target, a));
      };
      return b;
    };
    var Px = function (a) {
      try {
        return new Jx(a.g.index("timestamp"));
      } catch (b) {
        throw rx(b, "getting index timestamp");
      }
    };
    var Qx = function (a, b) {
      M.call(this);
      this.g = a;
      this.j = b;
      this.h = new cw(this);
      this.h.O(this.g, "complete", ab(this.dispatchEvent, this, "complete"));
      this.h.O(this.g, "abort", ab(this.dispatchEvent, this, "abort"));
      this.h.O(this.g, "error", this.Ie);
    };
    cb(Qx, M);
    l = Qx.prototype;
    l.Ie = function (a) {
      a.target instanceof dx
        ? this.dispatchEvent({ type: "error", target: a.target })
        : this.dispatchEvent({
            type: "error",
            target: qx(a.target, "in transaction"),
          });
    };
    l.objectStore = function (a) {
      try {
        return new Mx(this.g.objectStore(a));
      } catch (b) {
        throw rx(b, "getting object store " + a);
      }
    };
    l.commit = function (a) {
      if (this.g.commit || !a)
        try {
          this.g.commit();
        } catch (b) {
          throw rx(b, "cannot commit the transaction");
        }
    };
    l.wait = function () {
      var a = new vx();
      Jr(this, "complete", ab(a.callback, a));
      var b = Jr(this, "abort", function () {
        Sr(c);
        wx(a, new dx(kx, "waiting for transaction to complete"));
      });
      var c = Jr(this, "error", function (e) {
        Sr(b);
        wx(a, e.target);
      });
      var d = this.j;
      return a.Sc(function () {
        return d;
      });
    };
    l.abort = function () {
      this.g.abort();
    };
    l.L = function () {
      Qx.Da.L.call(this);
      this.h.W();
    };
    var Rx = function (a) {
      M.call(this);
      this.g = a;
      this.h = new cw(this);
      this.h.O(this.g, "abort", ab(this.dispatchEvent, this, "abort"));
      this.h.O(this.g, "error", this.Je);
      this.h.O(this.g, "versionchange", this.lf);
      this.h.O(this.g, "close", ab(this.dispatchEvent, this, "close"));
    };
    cb(Rx, M);
    l = Rx.prototype;
    l.md = !0;
    l.Je = function (a) {
      a = (a = a.target) && a.error;
      this.dispatchEvent({ type: "error", errorCode: a && a.severity });
    };
    l.lf = function (a) {
      this.dispatchEvent(new Sx(a.oldVersion, a.newVersion));
    };
    l.close = function () {
      this.md && (this.g.close(), (this.md = !1));
    };
    l.getName = function () {
      return this.g.name;
    };
    l.getVersion = function () {
      return Number(this.g.version);
    };
    var Tx = function (a) {
      var b = ["MediaSourceVideoChunk"];
      try {
        var c = a.g.transaction(b, "readwrite");
        return new Qx(c, a);
      } catch (d) {
        throw rx(d, "creating transaction");
      }
    };
    Rx.prototype.L = function () {
      Rx.Da.L.call(this);
      this.h.W();
    };
    var Sx = function (a, b) {
      ur.call(this, "versionchange");
      this.oldVersion = a;
      this.newVersion = b;
    };
    cb(Sx, ur);
    var Ux = function (a) {
      var b = new vx();
      void 0 == ax &&
        (ax =
          w.indexedDB || w.mozIndexedDB || w.webkitIndexedDB || w.moz_indexedDB);
      var c = ax.open("VideoChunkPersistentStorage", 6);
      c.onsuccess = function (d) {
        d = new Rx(d.target.result);
        b.callback(d);
      };
      c.onerror = function (d) {
        wx(b, qx(d.target, "opening database VideoChunkPersistentStorage"));
      };
      c.onupgradeneeded = function (d) {
        if (a) {
          var e = new Rx(d.target.result);
          a(
            new Sx(d.oldVersion, d.newVersion),
            e,
            new Qx(d.target.transaction, e)
          );
        }
      };
      c.onblocked = function () {};
      return b;
    };
    var Vx = function () {
      M.call(this);
      this.g = null;
    };
    v(Vx, M);
    Vx.prototype.initialize = function () {
      var a = this;
      return Promise.resolve(Ux(this.h)).then(
        function (b) {
          return (a.g = b);
        },
        function (b) {
          G(F.g(), "codf", b.message);
        }
      );
    };
    var Wx = function (a) {
      return null !== a.g && a.g.md;
    };
    Vx.prototype.close = function () {
      var a = this;
      return new Promise(function (b) {
        Xx(a, b);
      })
        .then(function () {
          return Yx();
        })
        .then(function () {
          a.g.close();
        });
    };
    var Yx = function () {
        var a;
        return (null == (a = navigator.storage) ? 0 : a.estimate)
          ? navigator.storage.estimate().then(function (b) {
              G(F.g(), "csue", String(b.usage));
            })
          : Promise.resolve(void 0);
      },
      by = function (a, b) {
        return (b = Zx(b)) ? $x(a, ay(b), b.yc) : Promise.resolve(null);
      },
      dy = function (a, b, c, d) {
        if ((c = Zx(c))) {
          var e = c.Cd;
          cy(a, {
            Yh: ay(c),
            Cd: e,
            Zc: e + b.byteLength - 1,
            yc: c.yc,
            timestamp: new Date(Date.now()),
            xa: d,
            Ab: c.Ab,
            video: b,
          });
        } else Promise.resolve(void 0);
      };
    Vx.prototype.h = function (a, b) {
      if (b.g.objectStoreNames.contains("MediaSourceVideoChunk"))
        try {
          b.g.deleteObjectStore("MediaSourceVideoChunk");
        } catch (d) {
          throw rx(d, "deleting object store MediaSourceVideoChunk");
        }
      a = { keyPath: "cacheId" };
      try {
        var c = new Mx(b.g.createObjectStore("MediaSourceVideoChunk", a));
      } catch (d) {
        throw rx(d, "creating object store MediaSourceVideoChunk");
      }
      b = { unique: !1 };
      try {
        c.g.createIndex("timestamp", "timestamp", b);
      } catch (d) {
        throw rx(d, "creating new index timestamp with key path timestamp");
      }
    };
    var Xx = function (a, b) {
        var c = new Date(Date.now());
        c.setDate(c.getDate() - 30);
        c = new sx(tx.upperBound(c, void 0));
        var d = Lx(Px(Tx(a.g).objectStore("MediaSourceVideoChunk")), c),
          e = d.O("n", function () {
            d.remove();
            d.next();
          });
        Jr(d, "c", function () {
          Sr(e);
          b();
        });
      },
      Zx = function (a) {
        var b = new Sw(a);
        a = b.getId();
        var c = Tw(b, "itag"),
          d = Tw(b, "source"),
          e = Tw(b, "lmt");
        (b = b.uri.j.get("range"))
          ? ((b = b.split("-")[0]),
            (b = !b || isNaN(Number(b)) ? null : Number(b)))
          : (b = null);
        var f = [];
        a
          ? c
            ? d
              ? e
                ? null === b && f.push("startIndex")
                : f.push("lmt")
              : f.push("source")
            : f.push("itag")
          : f.push("videoId");
        return 0 < f.length
          ? (G(F.g(), "civp", f.join("-")), null)
          : { ig: a, Ab: c, source: d, yc: e, Cd: b + 0 };
      },
      ay = function (a) {
        for (
          var b = [a.ig, a.source, a.Cd].join(), c = 0, d = 0;
          d < b.length;
          d++
        )
          c = (Math.imul(31, c) + b.charCodeAt(d)) | 0;
        return c.toString() + "," + a.Ab;
      },
      $x = function (a, b, c) {
        var d = Tx(a.g).objectStore("MediaSourceVideoChunk");
        return Promise.resolve(d.get(b)).then(
          function (e) {
            if (!e) return G(F.g(), "cenf", "1"), null;
            if (e.yc !== c)
              return (
                G(F.g(), "cdl", "1"),
                d.remove(b).then(null, function (f) {
                  G(F.g(), "crdlvf", f.message);
                }),
                null
              );
            G(F.g(), "cefml", "1");
            return { Ab: e.Ab, Zc: e.Zc, xa: e.xa, video: e.video };
          },
          function (e) {
            G(F.g(), "cgvf", e.message);
            return null;
          }
        );
      },
      cy = function (a, b) {
        a = Tx(a.g).objectStore("MediaSourceVideoChunk");
        Promise.resolve(Ox(a, b)).then(
          function () {
            G(F.g(), "cavs", "1");
          },
          function (c) {
            G(F.g(), "cavf", c.message);
          }
        );
      };
    var ey = function (a) {
      Mw.call(this);
      var b = this;
      this.D = this.h = this.g = 0;
      this.l = null;
      this.uri = new N(a);
      this.state = 0;
      this.j = (this.A = Zw()) ? xu(Vx) : null;
      qn(this, function () {
        pn(b.j);
      });
      this.I = this.A ? this.j.initialize() : null;
    };
    v(ey, Mw);
    ey.prototype.F = function () {
      return this.g;
    };
    ey.prototype.B = function () {
      return 3 === this.state;
    };
    ey.prototype.G = function (a) {
      1 === this.state
        ? ((this.g += a), (this.state = 2))
        : 0 === this.state && ((this.g += a), (this.state = 1), fy(this));
    };
    var fy = function (a) {
        Ka(function (b) {
          if (1 == b.g) return 2 === a.state && (a.state = 1), Aa(b, gy(a), 4);
          var c = 3 < a.D;
          if (c) {
            null === a.l && (a.l = 400);
            var d = Xw("media_source_error", {
              code:
                0 < a.h
                  ? MediaError.MEDIA_ERR_NETWORK
                  : MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
              message:
                'Response code "' +
                a.l +
                '" with ' +
                a.g +
                " bytes requested and " +
                a.h +
                " bytes loaded",
            });
            a.dispatchEvent(d);
          }
          a.h < a.g && 3 !== a.state && !c
            ? (b.g = 1)
            : (3 !== a.state && (a.state = 0), (b.g = 0));
        });
      },
      gy = function (a) {
        var b;
        return Ka(function (c) {
          switch (c.g) {
            case 1:
              b = a.h + "-" + (a.g - 1);
              hv(a.uri, "range", b);
              if (!a.A) {
                c.g = 2;
                break;
              }
              return Aa(c, a.I, 3);
            case 3:
              return c.return(hy(a));
            case 2:
              return (c.j = 4), Aa(c, iy(a), 6);
            case 6:
              Ba(c);
              break;
            case 4:
              Ca(c), a.D++, (c.g = 0);
          }
        });
      },
      hy = function (a) {
        var b;
        return Ka(function (c) {
          switch (c.g) {
            case 1:
              return Aa(c, by(a.j, a.uri), 2);
            case 2:
              if ((b = c.h)) {
                b.xa && (a.state = 3);
                jy(a, b.video);
                c.g = 0;
                break;
              }
              c.j = 4;
              return Aa(c, iy(a), 6);
            case 6:
              Ba(c);
              break;
            case 4:
              Ca(c), a.D++, (c.g = 0);
          }
        });
      },
      iy = function (a) {
        var b, c, d, e, f, g, h;
        return Ka(function (k) {
          if (1 == k.g)
            return (b = 0), (c = a.g - a.h), Aa(k, fetch(a.uri.toString()), 2);
          d = k.h;
          if (400 <= d.status)
            return (
              G(F.g(), "lvlfes", d.status.toString()),
              (a.l = d.status),
              k.return(Promise.reject())
            );
          f = null == (e = d.body) ? void 0 : e.getReader();
          if (!f)
            return vi("lvlmr"), (a.l = d.status), k.return(Promise.reject());
          g = [];
          h = function () {
            var n, m, p, u, r, x;
            return Ka(function (B) {
              if (1 == B.g) return Aa(B, f.read(), 2);
              n = B.h;
              m = n.done;
              p = n.value;
              if (m) return (u = b < c), ky(a, g, u), B.return();
              g.push(p);
              b += null == (r = p) ? void 0 : r.length;
              jy(a, null == (x = p) ? void 0 : x.buffer);
              return Aa(B, h(), 0);
            });
          };
          return Aa(k, h(), 0);
        });
      },
      ky = function (a, b, c) {
        c && ((a.state = 3), jy(a, new ArrayBuffer(0)));
        var d = new Uint8Array(
            b.reduce(function (g, h) {
              return g + h.length;
            }, 0)
          ),
          e = 0;
        b = t(b);
        for (var f = b.next(); !f.done; f = b.next())
          (f = f.value), d.set(f, e), (e += f.length);
        a.A && 0 < d.buffer.byteLength && dy(a.j, d.buffer, a.uri, c);
      },
      jy = function (a, b) {
        null !== b &&
          ((b = b.slice(0)),
          (a.h += b.byteLength),
          a.dispatchEvent({ type: "progress", Wd: b }));
      };
    ey.prototype.L = function () {
      var a;
      (null == (a = this.j) ? 0 : Wx(a)) && this.j.close();
      Mw.prototype.L.call(this);
    };
    var ly = function () {};
    var my = function (a) {
      Mw.call(this);
      var b = this;
      this.D = this.h = this.g = 0;
      this.l = null;
      this.uri = new N(a);
      this.state = 0;
      this.j = (this.A = Zw()) ? xu(Vx) : null;
      qn(this, function () {
        pn(b.j);
      });
      this.I = this.A ? this.j.initialize() : null;
    };
    v(my, Mw);
    my.prototype.F = function () {
      return this.g;
    };
    my.prototype.B = function () {
      return 3 === this.state;
    };
    my.prototype.G = function (a) {
      1 === this.state
        ? ((this.g += a), (this.state = 2))
        : 0 === this.state && ((this.g += a), (this.state = 1), ny(this));
    };
    var ny = function (a) {
        Ka(function (b) {
          if (1 == b.g) return 2 === a.state && (a.state = 1), Aa(b, oy(a), 4);
          var c = 3 < a.D;
          if (c && null !== a.l) {
            var d = Xw("media_source_error", {
              code:
                0 < a.h
                  ? MediaError.MEDIA_ERR_NETWORK
                  : MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
              message:
                'Response code "' +
                a.l +
                '" with ' +
                a.g +
                " bytes requested and " +
                a.h +
                " bytes loaded",
            });
            a.dispatchEvent(d);
          }
          a.h < a.g && 3 !== a.state && !c
            ? (b.g = 1)
            : (3 !== a.state && (a.state = 0), (b.g = 0));
        });
      },
      oy = function (a) {
        var b;
        return Ka(function (c) {
          switch (c.g) {
            case 1:
              b = a.h + "-" + (a.g - 1);
              hv(a.uri, "range", b);
              if (!a.A) {
                c.g = 2;
                break;
              }
              return Aa(c, a.I, 3);
            case 3:
              return c.return(py(a));
            case 2:
              return (c.j = 4), Aa(c, qy(a), 6);
            case 6:
              Ba(c);
              break;
            case 4:
              Ca(c), a.D++, (c.g = 0);
          }
        });
      },
      py = function (a) {
        var b;
        return Ka(function (c) {
          switch (c.g) {
            case 1:
              return Aa(c, by(a.j, a.uri), 2);
            case 2:
              if ((b = c.h)) {
                b.xa && (a.state = 3);
                ry(a, b.video, 0);
                c.g = 0;
                break;
              }
              c.j = 4;
              return Aa(c, qy(a), 6);
            case 6:
              Ba(c);
              break;
            case 4:
              Ca(c), a.D++, (c.g = 0);
          }
        });
      },
      qy = function (a) {
        return new Promise(function (b, c) {
          var d = new XMLHttpRequest(),
            e = 0,
            f = a.g - a.h;
          d.addEventListener("load", function () {
            vi("lvlcl");
            if (400 <= d.status)
              return (
                G(F.g(), "lvlxes", d.status.toString()), (a.l = d.status), c()
              );
            var g = d.response;
            g.byteLength < f && (a.state = 3);
            var h = ry(a, g, e);
            e += h;
            a.A && 0 < g.byteLength && dy(a.j, g, a.uri, g.byteLength < f);
            b();
          });
          d.addEventListener("timeout", function () {
            vi("lvlct");
            a.l = d.status;
            c();
          });
          d.addEventListener("error", function () {
            vi("lvlce");
            a.l = d.status;
            c();
          });
          d.addEventListener("progress", function () {
            if (400 <= d.status) a.l = d.status;
            else {
              var g = ry(a, d.response, e);
              e += g;
            }
          });
          d.responseType = "arraybuffer";
          d.open("get", a.uri.toString());
          d.send(null);
        });
      },
      ry = function (a, b, c) {
        if (null === b) return 0;
        b = b.slice(c);
        a.h += b.byteLength;
        a.dispatchEvent({ type: "progress", Wd: b });
        return b.byteLength;
      };
    my.prototype.L = function () {
      this.A && Wx(this.j) && this.j.close();
      Mw.prototype.L.call(this);
    };
    function sy() {
      return !!window.MediaSource;
    }
    function ty(a) {
      return [43, 44, 45].includes(a) && Oc
        ? !1
        : Ow[a]
        ? ((a = Ww(a)), !!a && sy() && MediaSource.isTypeSupported(a))
        : !1;
    }
    var uy = function () {};
    uy.prototype.Jf = function (a, b, c) {
      return 0 === c ? 1e6 : 5e3 > b - a ? 3e5 : 0;
    };
    var yy = function (a) {
      M.call(this);
      var b = this;
      this.j = a;
      this.h = [];
      this.l = null;
      this.I = 0;
      this.G = !1;
      this.D = 0;
      this.A = [];
      this.B = this.j.map(function (c) {
        return H(jk) ? xu(ey, c.url) : xu(my, c.url);
      });
      this.g = xu(MediaSource);
      this.F = function () {
        vy(b);
      };
      this.g.addEventListener("sourceopen", this.F);
      this.J = wy(this);
    };
    v(yy, M);
    var wy = function (a) {
        for (var b = [], c = 0; c < a.j.length; ++c) b.push(new uy());
        return b;
      },
      vy = function (a) {
        vi("msms_oso");
        for (
          var b = { Ja: 0 };
          b.Ja < a.j.length;
          b = { Va: b.Va, Ja: b.Ja, Rb: b.Rb }, ++b.Ja
        ) {
          var c = a.j[b.Ja];
          G(F.g(), "msms_mime" + b.Ja, c.mimeType);
          G(F.g(), "msms_cs" + b.Ja, c.g.toString());
          b.Va = a.g.addSourceBuffer(c.mimeType);
          b.Va
            ? ((b.Rb = a.B[b.Ja]),
              H(jk) &&
                b.Va.addEventListener(
                  "updateend",
                  (function (d) {
                    return function () {
                      if (0 < a.A.length && !d.Va.updating) {
                        var e = a.A.shift();
                        d.Va.appendBuffer(e);
                      }
                    };
                  })(b)
                ),
              b.Va.addEventListener(
                "error",
                (function (d) {
                  return function () {
                    vi("msms_sbe" + d.Ja);
                  };
                })(b)
              ),
              b.Rb.O(
                "progress",
                (function (d) {
                  return function (e) {
                    var f = d.Va,
                      g = d.Rb;
                    e = e.Wd;
                    0 !== e.byteLength &&
                      (H(jk)
                        ? f.updating
                          ? a.A.push(e)
                          : f.appendBuffer(e)
                        : f.appendBuffer(e));
                    g.B() && (a.I++, a.I === a.h.length && zy(a));
                  };
                })(b)
              ),
              b.Rb.O("media_source_error", function (d) {
                a.dispatchEvent(d);
              }),
              a.h.push(b.Va))
            : vi("msms_sbf" + b.Ja);
        }
        G(F.g(), "msms_ns", a.h.length.toString());
        a.G = !0;
        Ay(a);
      },
      zy = function (a) {
        Promise.all(
          a.h.map(function (b) {
            return new Promise(function (c) {
              b.updating
                ? b.addEventListener("updateend", function () {
                    c();
                  })
                : c();
            });
          })
        ).then(function () {
          a.g.endOfStream();
        });
      },
      Ay = function (a) {
        if (a.G)
          for (var b = 0; b < a.j.length; ++b) {
            var c = a.B[b],
              d = a.h[b];
            d = 0 === d.buffered.length ? 0 : 1e3 * d.buffered.end(0);
            d = a.J[b].Jf(a.D, d, c.F());
            0 !== d && c.G(d);
          }
      },
      By = function (a) {
        a.l = jh(a.g).toString();
        return a.l;
      };
    yy.prototype.L = function () {
      this.l && window.URL.revokeObjectURL(this.l);
      for (var a = t(this.B), b = a.next(); !b.done; b = a.next()) b.value.W();
      this.g.removeEventListener("sourceopen", this.F);
      M.prototype.L.call(this);
    };
    var Cy = RegExp(
        "/pagead/conversion|/pagead/adview|/pagead/gen_204|/activeview?|csi.gstatic.com/csi|google.com/pagead/xsul|google.com/ads/measurement/l|googleads.g.doubleclick.net/pagead/ide_cookie|googleads.g.doubleclick.net/xbbe/pixel"
      ),
      Dy = RegExp("outstream.min.js"),
      Ey = RegExp("outstream.min.css"),
      Fy = RegExp("fonts.gstatic.com"),
      Gy = RegExp(
        "googlevideo.com/videoplayback|c.2mdn.net/videoplayback|gcdn.2mdn.net/videoplayback"
      ),
      Hy = RegExp("custom.elements.min.js");
    function Iy(a, b) {
      var c = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        k = 0,
        n = !1,
        m = !1;
      if (
        "function" === typeof Ra("performance.getEntriesByType", w) &&
        "transferSize" in w.PerformanceResourceTiming.prototype
      ) {
        var p = w.performance.getEntriesByType("resource");
        p = t(p);
        for (var u = p.next(); !u.done; u = p.next())
          (u = u.value),
            Cy.test(u.name) ||
              ((f += 1),
              u.transferSize
                ? ((c += u.transferSize),
                  u.encodedBodySize &&
                    u.transferSize < u.encodedBodySize &&
                    ((h += 1),
                    (e += u.encodedBodySize),
                    Dy.test(u.name) && (n = !0),
                    Ey.test(u.name) && (m = !0)),
                  Gy.test(u.name) && (d += u.transferSize))
                : 0 === u.transferSize && 0 === u.encodedBodySize
                ? Hy.test(u.name)
                  ? (c += 6686)
                  : Fy.test(u.name) ||
                    ((k += 1),
                    ui(F.g(), {
                      event_name: "unmeasurable_asset",
                      resource_name: u.name,
                      encoded_body_size: u.encodedBodySize,
                      transfer_size: u.transferSize,
                    }))
                : ((g += 1),
                  (e += u.encodedBodySize),
                  Dy.test(u.name) && (n = !0),
                  Ey.test(u.name) && (m = !0)));
        p = 0;
        if (a.duration) {
          for (u = 0; u < a.buffered.length; u++)
            p += a.buffered.end(u) - a.buffered.start(u);
          p = Math.min(p, a.duration);
        }
        ui(F.g(), {
          event_name: b,
          asset_bytes: c,
          video_bytes: d,
          cached_data_bytes: e,
          js_cached: n,
          css_cached: m,
          num_assets: f,
          num_assets_cached: g,
          num_assets_cache_validated: h,
          num_assets_unmeasurable: k,
          video_played_seconds: a.currentTime.toFixed(2),
          video_muted: a.muted,
          video_seconds_loaded: p.toFixed(2),
        });
      } else G(F.g(), "error", "reporting_timing_not_supported");
    }
    var Jy = function (a, b, c, d) {
      this.url = a;
      this.mimeType = b;
      this.g = c;
      this.h = void 0 === d ? null : d;
    };
    function Ky(a) {
      var b = F.g(),
        c = a.getVideoPlaybackQuality && a.getVideoPlaybackQuality();
      c
        ? ((a = a.currentTime),
          G(b, "vqdf", String(c.droppedVideoFrames)),
          G(b, "vqtf", String(c.totalVideoFrames)),
          G(b, "vqfr", String(Math.round(c.totalVideoFrames / a))))
        : G(b, "vqu", "1");
    }
    var Ly = function (a) {
      this.g = a;
    };
    Ly.prototype.toString = function () {
      return this.g;
    };
    var My = new Ly("video_mute"),
      Ny = new Ly("video_caption_visibility");
    var Oy = function (a) {
      L.call(this);
      this.A = 1;
      this.j = [];
      this.o = 0;
      this.g = [];
      this.h = {};
      this.D = !!a;
    };
    cb(Oy, L);
    var Py = function (a, b, c) {
        var d = Ny.toString(),
          e = a.h[d];
        e || (e = a.h[d] = []);
        var f = a.A;
        a.g[f] = d;
        a.g[f + 1] = b;
        a.g[f + 2] = c;
        a.A = f + 3;
        e.push(f);
      },
      Qy = function (a, b, c) {
        var d = a.h[Ny.toString()];
        if (d) {
          var e = a.g;
          (d = d.find(function (f) {
            return e[f + 1] == b && e[f + 2] == c;
          })) && a.l(d);
        }
      };
    Oy.prototype.l = function (a) {
      var b = this.g[a];
      if (b) {
        var c = this.h[b];
        0 != this.o
          ? (this.j.push(a), (this.g[a + 1] = function () {}))
          : (c && dc(c, a),
            delete this.g[a],
            delete this.g[a + 1],
            delete this.g[a + 2]);
      }
      return !!b;
    };
    Oy.prototype.B = function (a, b) {
      var c = this.h[a];
      if (c) {
        for (
          var d = Array(arguments.length - 1), e = 1, f = arguments.length;
          e < f;
          e++
        )
          d[e - 1] = arguments[e];
        if (this.D)
          for (e = 0; e < c.length; e++) {
            var g = c[e];
            Ry(this.g[g + 1], this.g[g + 2], d);
          }
        else {
          this.o++;
          try {
            for (e = 0, f = c.length; e < f && !this.wa(); e++)
              (g = c[e]), this.g[g + 1].apply(this.g[g + 2], d);
          } finally {
            if ((this.o--, 0 < this.j.length && 0 == this.o))
              for (; (c = this.j.pop()); ) this.l(c);
          }
        }
      }
    };
    var Ry = function (a, b, c) {
      fs(function () {
        a.apply(b, c);
      });
    };
    Oy.prototype.clear = function (a) {
      if (a) {
        var b = this.h[a];
        b && (b.forEach(this.l, this), delete this.h[a]);
      } else (this.g.length = 0), (this.h = {});
    };
    Oy.prototype.L = function () {
      Oy.Da.L.call(this);
      this.clear();
      this.j.length = 0;
    };
    var Sy = function (a) {
      L.call(this);
      this.g = new Oy(a);
      rn(this, this.g);
    };
    cb(Sy, L);
    Sy.prototype.clear = function (a) {
      this.g.clear(void 0 !== a ? a.toString() : void 0);
    };
    var Ty = function (a) {
      a = void 0 === a ? null : a;
      L.call(this);
      this.g = new cw(this);
      rn(this, this.g);
      this.pb = a;
    };
    v(Ty, L);
    var Uy = function (a, b, c) {
      a.pb &&
        (Py(a.pb.g, b, c),
        qn(a, function () {
          Qy(a.pb.g, b, c);
        }));
    };
    var Vy = function (a, b) {
      Ty.call(this, b);
      Uy(
        this,
        function (c) {
          c ? (a.g.mode = "showing") : a.ab();
        },
        this
      );
    };
    v(Vy, Ty);
    var Wy = function () {
      M.call(this);
      this.h = new cw(this);
      rn(this, this.h);
    };
    v(Wy, M);
    var Yy = function (a, b, c) {
      c = void 0 === c ? !0 : c;
      Wy.call(this);
      a.setAttribute("crossorigin", "anonymous");
      var d = Pg("TRACK");
      d.setAttribute("kind", "captions");
      d.setAttribute("src", b);
      d.setAttribute("default", "");
      a.appendChild(d);
      this.g = a.textTracks[0];
      Xy(this);
      c ? (this.g.mode = "showing") : this.ab();
    };
    v(Yy, Wy);
    var Xy = function (a) {
      var b = a.g;
      b.addEventListener(
        "cuechange",
        function () {
          for (var c = b.cues, d = 0; d < c.length; d++) {
            var e = c[d];
            e.align = "center";
            e.position = "auto";
          }
        },
        { once: !0 }
      );
    };
    Yy.prototype.ab = function () {
      this.g.mode = "hidden";
    };
    function Zy(a, b) {
      if ("undefined" !== typeof ReportingObserver) {
        var c = function (e) {
            e = t(e);
            for (var f = e.next(); !f.done; f = e.next())
              (f = f.value), a(f) && b(f);
          },
          d = new ReportingObserver(c, { buffered: !0 });
        w.addEventListener("pagehide", function () {
          c(d.takeRecords(), d);
          d.disconnect();
        });
        d.observe();
      }
    }
    function $y(a) {
      a = void 0 === a ? null : a;
      Zy(
        function (b) {
          return b.body && "HeavyAdIntervention" === b.body.id;
        },
        function (b) {
          var c = b.body.message,
            d = F.g();
          G(d, "ham", c);
          c.includes("CPU")
            ? G(d, "hacpu", "true")
            : c.includes("network") && G(d, "habytes", "true");
          a && a(b);
        }
      );
    }
    var az =
        "autoplay controls crossorigin demuxedaudiosrc demuxedvideosrc loop muted playsinline poster preload src webkit-playsinline x-webkit-airplay".split(
          " "
        ),
      bz =
        "autoplay buffered controls crossOrigin currentSrc currentTime defaultMuted defaultPlaybackRate disableRemotePlayback duration ended loop muted networkState onerror onwaitingforkey paused played playsinline poster preload preservesPitch mozPreservesPitch webkitPreservesPitch readyState seekable videoWidth videoHeight volume textTracks canPlayType captureStream getVideoPlaybackQuality load pause play setSinkId oncanplay oncanplaythrough onload onplay onpause onended onfullscreenchange onfullscreenerror addEventListener dispatchEvent removeEventListener requestFullscreen".split(
          " "
        ),
      cz = { childList: !0 },
      dz = !RegExp("^\\s*class\\s*\\{\\s*\\}\\s*$").test(
        function () {}.toString()
      ),
      ez = HTMLElement;
    dz &&
      ((ez = function () {
        var a = Object.getPrototypeOf(this).constructor;
        return w.Reflect.construct(HTMLElement, [], a);
      }),
      Object.setPrototypeOf(ez, HTMLElement),
      Object.setPrototypeOf(ez.prototype, HTMLElement.prototype));
    var fz = function (a) {
        if (null !== a) {
          a = t(a);
          for (var b = a.next(); !b.done; b = a.next())
            if (((b = b.value), b.nodeName === "TRACK".toString())) return b;
        }
        return null;
      },
      gz = function (a, b) {
        this.code = a;
        this.message = void 0 === b ? "" : b;
      },
      hz = function (a) {
        gz.call(
          this,
          MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
          void 0 === a ? "" : a
        );
      };
    v(hz, gz);
    var lz = function (a, b) {
      b = void 0 === b ? !1 : b;
      var c = ez.call(this) || this;
      G(F.g(), "ulv", "1");
      c.fg = b;
      c.ya = null;
      c.me = null;
      c.Rd = null;
      c.R = Pg("VIDEO");
      iz(c);
      c.pb = a || new Sy();
      jz(c);
      c.jc = null;
      kz(c);
      c.attachShadow({ mode: "open" });
      c.shadowRoot.appendChild(c.R);
      $y(function () {
        G(F.g(), "has", c.src || c.vb);
        G(F.g(), "hat", String(c.R.currentTime));
      });
      c.Lc = !1;
      c.oe = !1;
      c.Tb = null;
      c.Qc = null;
      c.gg = !1;
      c.re = !1;
      c.ai = null;
      return c;
    };
    v(lz, ez);
    lz.prototype.attributeChangedCallback = function (a, b, c) {
      switch (a) {
        case "src":
          mz(this, c);
          break;
        case "demuxedaudiosrc":
        case "demuxedvideosrc":
          nz(this);
          break;
        case "muted":
          this.R[a] = "" === c ? !0 : !!c;
          oz(this, a, c);
          break;
        default:
          oz(this, a, c);
      }
    };
    var oz = function (a, b, c) {
        c !== a.R.getAttribute(b) &&
          (null === c ? a.R.removeAttribute(b) : a.R.setAttribute(b, c));
      },
      pz = function (a) {
        a.ya &&
          (a.R.removeEventListener("timeupdate", a.Tb), a.ya.W(), (a.ya = null));
      },
      qz = function (a, b) {
        a.Rd = b;
        a.R.dispatchEvent(new Event("error"));
      },
      iz = function (a) {
        rz(a);
        sz(a);
        a.R.addEventListener("loadedmetadata", function () {
          a.Qc = Sv(a);
          a.Qc.then(function (b) {
            var c = a.R.videoWidth,
              d = a.R.videoHeight,
              e = b.width,
              f = b.height;
            0 < c &&
              0 < d &&
              0 < e &&
              0 < f &&
              ((b = b.width / b.height),
              (c /= d),
              0.97 <= Math.min(c, b) / Math.max(c, b)
                ? mm(a.R, { "object-fit": "cover" })
                : mm(a.R, { "object-fit": "contain" }));
          });
        });
        a.R.addEventListener("play", function () {
          a.oe || (Iy(a.R, "first_play"), (a.oe = !0));
        });
        a.R.addEventListener("pause", function () {
          a.Lc || (Iy(a.R, "first_pause"), Ky(a.R), (a.Lc = !0));
        });
        Kr(w, "pagehide", function () {
          a.Lc || (Iy(a.R, "first_pause"), Ky(a.R), (a.Lc = !0));
        });
        a.R.addEventListener("stalled", function () {
          G(F.g(), "ves", "1");
        });
        new Iv(a.R).O("playbackStalled", function () {
          return G(F.g(), "pbs", "1");
        });
        a.R.addEventListener("media_source_error", function (b) {
          pz(a);
          b = b.detail;
          qz(a, new gz(b.code, b.message));
        });
        tz(a);
      },
      kz = function (a) {
        var b = fz(a.childNodes);
        b && uz(a, b);
        null === a.jc && vz(a);
      },
      vz = function (a) {
        if (w.MutationObserver) {
          var b = new MutationObserver(function (c) {
            c = t(c);
            for (var d = c.next(); !d.done; d = c.next())
              if (
                ((d = d.value), "childList" === d.type && (d = fz(d.addedNodes)))
              ) {
                uz(a, d);
                b.disconnect();
                break;
              }
          });
          b.observe(a, cz);
        }
      },
      jz = function (a) {
        a.R.addEventListener("volumechange", function () {
          a.pb.g.B(My.toString(), a.R.muted);
          a.fg || a.pb.g.B(Ny.toString(), a.R.muted);
        });
      },
      uz = function (a, b) {
        if (null === a.jc && b.hasAttribute("src")) {
          var c = b.getAttribute("src");
          a.jc = new Yy(a.R, c, b.hasAttribute("default"));
          new Vy(a.jc, a.pb);
          c.includes("kind=asr") && G(F.g(), "act", "1");
        }
      },
      mz = function (a, b) {
        if (b !== a.me) {
          a.me = b;
          a.gg && b && xv(b) && (b = yv(b));
          var c = b ? Vw(b) : null,
            d = !!c && ty(c);
          G(F.g(), "umsem", d ? "1" : "0");
          d
            ? ((b = xu(Jy, b, Ww(c), 1e3 * Nw[c], null)),
              (a.ya = xu(yy, [b])),
              a.ya.O("media_source_error", function (e) {
                e = Xw("media_source_error", e.detail);
                a.R.dispatchEvent(e);
              }),
              (a.Tb = function () {
                var e = a.ya;
                e.D = 1e3 * a.R.currentTime;
                Ay(e);
              }),
              a.R.addEventListener("timeupdate", a.Tb),
              oz(a, "src", By(a.ya)))
            : (pz(a), oz(a, "src", b));
          a.re || a.R.load();
        }
      },
      nz = function (a) {
        a.src &&
          qz(
            a,
            new gz(
              MediaError.MEDIA_ERR_ABORTED,
              "Setting demuxed src after src is already set."
            )
          );
        if (!a.Hb && !a.vb && a.ya) pz(a), oz(a, "src", null), a.R.load();
        else if (a.Hb && a.vb) {
          var b = Vw(a.Hb),
            c = Vw(a.vb);
          if (c && ty(c))
            if (b && ty(b)) {
              var d = !!c && ty(c) && !!b && ty(b);
              G(F.g(), "umsed", d ? "1" : "0");
              c = xu(Jy, a.vb, Ww(c), -1, null);
              b = xu(Jy, a.Hb, Ww(b), -1, null);
              a.ya = xu(yy, [c, b]);
              a.ya.O("media_source_error", function (e) {
                e = Xw("media_source_error", e.detail);
                a.R.dispatchEvent(e);
              });
              a.Tb = function () {
                var e = a.ya;
                e.D = 1e3 * a.R.currentTime;
                Ay(e);
              };
              a.R.addEventListener("timeupdate", a.Tb);
              oz(a, "src", By(a.ya));
              a.re || a.R.load();
            } else qz(a, new hz('Audio itag "' + b + '" not supported.'));
          else qz(a, new hz('Video itag "' + c + '" not supported.'));
        }
      },
      rz = function (a) {
        for (
          var b = t(bz), c = b.next(), d = {};
          !c.done;
          d = { Ka: d.Ka, ha: d.ha }, c = b.next()
        )
          (d.Ka = c.value),
            d.Ka in a.R &&
              ("function" === typeof a.R[d.Ka]
                ? ((d.ha = a.R[d.Ka].bind(a.R)),
                  Object.defineProperty(a, d.Ka, {
                    set: (function (e) {
                      return function (f) {
                        a.R[e.Ka] = f;
                      };
                    })(d),
                    get: (function (e) {
                      return function () {
                        return e.ha;
                      };
                    })(d),
                  }))
                : Object.defineProperty(a, d.Ka, {
                    set: (function (e) {
                      return function (f) {
                        a.R[e.Ka] = f;
                      };
                    })(d),
                    get: (function (e) {
                      return function () {
                        return a.R[e.Ka];
                      };
                    })(d),
                  }));
      },
      sz = function (a) {
        Object.defineProperty(a, "error", {
          set: function () {},
          get: function () {
            return a.R.error ? a.R.error : a.Rd;
          },
        });
      },
      tz = function (a) {
        a.R.style.width = tm();
        a.R.style.height = tm();
      };
    lz.prototype.disconnectedCallback = function () {
      if (this.Qc) {
        var a = Ov.get(this.Qc);
        Rv(a);
      }
      ez.prototype.disconnectedCallback &&
        ez.prototype.disconnectedCallback.call(this);
    };
    da.Object.defineProperties(lz.prototype, {
      Hb: {
        configurable: !0,
        enumerable: !0,
        set: function (a) {
          this.setAttribute("demuxedaudiosrc", a);
        },
        get: function () {
          return this.getAttribute("demuxedaudiosrc");
        },
      },
      vb: {
        configurable: !0,
        enumerable: !0,
        set: function (a) {
          this.setAttribute("demuxedvideosrc", a);
        },
        get: function () {
          return this.getAttribute("demuxedvideosrc");
        },
      },
      src: {
        configurable: !0,
        enumerable: !0,
        set: function (a) {
          this.setAttribute("src", a);
        },
        get: function () {
          return this.getAttribute("src");
        },
      },
    });
    da.Object.defineProperties(lz, {
      observedAttributes: {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return az;
        },
      },
    });
    w.customElements &&
      (w.customElements.get("lima-video") ||
        w.customElements.define("lima-video", lz));
    function wz() {
      var a = xu(Vx);
      a.initialize().then(function (b) {
        b && ((b = Xw("initialized")), a.dispatchEvent(b));
      });
      return a;
    }
    var yz = function (a, b, c, d, e) {
      L.call(this);
      this.G = a;
      this.h = c;
      this.o = e;
      this.aa = this.V = this.bc = this.D = this.j = this.tb = 0;
      this.B = [];
      this.J = !1;
      this.ga = this.ma = this.ba = null;
      this.Fa = !1;
      this.Sd = this.I = this.A = this.Na = this.sb = null;
      this.xa = !1;
      this.N = new N(b.url);
      this.F = b.g;
      this.Ea = d;
      (this.U = b.h) || this.N.j.remove("alr");
      G(F.g(), "sl_dv" + this.o, (null !== this.U).toString());
      this.X = !this.U;
      this.g = new XMLHttpRequest();
      this.Z = 0.1;
      if ((this.l = Zw())) (this.A = wz()), rn(this, this.A);
      xz(this);
    };
    v(yz, L);
    var zz = function (a, b) {
        b = Xw("media_source_error", b);
        a.G.dispatchEvent(b);
      },
      Az = function (a, b) {
        zz(a, {
          code:
            1 < a.j
              ? MediaError.MEDIA_ERR_NETWORK
              : MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
          message: b,
        });
      },
      xz = function (a) {
        a.ba = function () {
          Bz(a);
          if (a.X) {
            var b = a.g.responseText;
            a.J = !b || b.length < a.F;
            a.V = 0;
            vi("sl_cc" + a.o + "_" + a.j);
            a.D++;
            Cz(a);
          }
        };
        a.ma = function () {
          Bz(a);
        };
        a.ga = function () {
          vi("sl_ec" + a.o + "_" + a.j);
          Az(a, "Failed to load chunk " + a.j + " for stream " + a.o);
        };
        a.g.addEventListener("load", a.ba);
        a.g.addEventListener("progress", a.ma);
        a.g.addEventListener("error", a.ga);
        a.h.addEventListener("updateend", function () {
          a.h.buffered.length &&
            ((a.bc = a.h.buffered.end(0)),
            a.l
              ? a.xa &&
                !a.h.updating &&
                a.j === a.D &&
                (vi("sl_lc" + a.o), a.Ea())
              : a.J &&
                !a.h.updating &&
                a.j === a.D &&
                (vi("sl_lc" + a.o), a.Ea()));
          !a.Fa && 1 < a.G.buffered.length && (G(F.g(), "dbr", "1"), (a.Fa = !0));
        });
        a.h.addEventListener("update", function () {
          a.B.length && !a.h.updating && a.h.appendBuffer(a.B.shift());
        });
        a.h.addEventListener("error", function () {
          vi("msb_err" + a.o);
          zz(a, {
            code: MediaError.MEDIA_ERR_DECODE,
            message: "Error on SourceBuffer " + a.o,
          });
        });
        a.l
          ? (Wx(a.A)
              ? Dz(a)
              : (a.sb = Kr(a.A, "initialized", function () {
                  Dz(a);
                })),
            (a.Na = Kr(a.A, "get_video_succeeded", function () {
              Cz(a);
            })))
          : Dz(a);
      },
      Fz = function (a) {
        vi("sl_rc" + a.o + "_" + a.j);
        var b = Ez(a);
        a.g.open("get", b);
        a.g.overrideMimeType("text/plain; charset=x-user-defined");
        a.g.send(null);
        a.l && ((a.I = null), (a.Sd = b));
      },
      Bz = function (a) {
        if (400 <= a.g.status)
          Az(
            a,
            'Response code "' +
              a.g.status +
              '" on loading chunk ' +
              a.j +
              " for stream " +
              a.o
          );
        else {
          if (!a.X) {
            var b = a.g.getResponseHeader("content-type");
            if (b && 0 <= b.indexOf("text/plain")) {
              a.g.readyState === XMLHttpRequest.DONE &&
                ((a.N = new N(a.g.response)),
                (a.j = 0),
                (a.D = 0),
                a.tb++,
                Dz(a));
              return;
            }
            a.X = !0;
            vi("sl_redc" + a.o);
            G(F.g(), "sl_tr" + a.o, a.tb.toString());
          }
          a.N.j.remove("alr");
          if (
            a.g.readyState === XMLHttpRequest.LOADING ||
            a.g.readyState === XMLHttpRequest.DONE
          )
            (b = Gz(a, a.V)),
              (a.V = a.g.response.length),
              (a.aa += b.byteLength),
              Hz(a, b);
          if (
            a.l &&
            a.g.readyState === XMLHttpRequest.DONE &&
            ((b = Gz(a, 0)), 0 < b.byteLength)
          ) {
            var c = a.g.responseText;
            a.xa = !c || c.length < a.F;
            dy(a.A, b, new N(a.Sd), a.xa);
          }
        }
      },
      Hz = function (a, b) {
        0 < b.byteLength &&
          (a.h.updating || a.B.length ? a.B.push(b) : a.h.appendBuffer(b));
      },
      Gz = function (a, b) {
        a = a.g.response;
        for (var c = new Uint8Array(a.length - b), d = 0; d < c.length; d++)
          c[d] = a.charCodeAt(d + b) & 255;
        return c.buffer;
      },
      Cz = function (a) {
        var b = Av;
        -1 !== b && b < a.aa + a.F
          ? (a.G.pause(), (Av = -1), (b = !1))
          : ((b = a.D === a.j && !a.h.updating && !a.B.length),
            (b = a.l
              ? !a.xa && b && a.G.currentTime >= a.Z
              : !a.J && b && a.G.currentTime >= a.Z));
        b && ((a.Z = a.bc + 0.1), Dz(a));
      },
      Ez = function (a) {
        var b = a.l && a.I ? a.I + 1 : a.j * a.F;
        return hv(a.N, "range", b + "-" + (b + a.F - 1)).toString();
      },
      Dz = function (a) {
        if (a.l) {
          var b = new N(Ez(a));
          by(a.A, b).then(function (c) {
            c
              ? ((a.I = Number(c.Zc)),
                (a.xa = c.xa),
                Hz(a, c.video),
                (c = Xw("get_video_succeeded")),
                a.A.dispatchEvent(c),
                a.D++)
              : Fz(a);
            a.j++;
          });
        } else Fz(a), a.j++;
      };
    yz.prototype.L = function () {
      this.l && Wx(this.A) && this.A.close();
      this.g.removeEventListener("load", this.ba);
      this.g.removeEventListener("progress", this.ma);
      this.g.removeEventListener("error", this.ga);
      Sr(this.sb);
      Sr(this.Na);
      L.prototype.L.call(this);
    };
    var Jz = function (a, b) {
      L.call(this);
      var c = this;
      this.l = a;
      this.F = b;
      this.g = new MediaSource();
      this.D = [];
      this.j = [];
      this.h = this.o = null;
      this.A = !1;
      this.B = function () {
        Iz(c);
      };
      this.g.addEventListener("sourceopen", this.B);
    };
    v(Jz, L);
    var Kz = function (a) {
        a.o && a.l.removeEventListener("timeupdate", a.o);
      },
      Iz = function (a) {
        vi("msmsw_oso");
        a.o = function () {
          if (!a.A)
            for (var e = t(a.j), f = e.next(); !f.done; f = e.next()) Cz(f.value);
        };
        a.l.addEventListener("timeupdate", a.o);
        for (var b = 0; b < a.F.length; b++) {
          var c = a.F[b];
          G(F.g(), "msmsw_mime" + b, c.mimeType);
          G(F.g(), "msmsw_cs" + b, c.g.toString());
          var d = a.g.addSourceBuffer(c.mimeType);
          d
            ? (a.D.push(d),
              (c = xu(
                yz,
                a.l,
                c,
                d,
                function () {
                  a: if (!a.A) {
                    for (var e = t(a.j), f = e.next(); !f.done; f = e.next())
                      if (
                        ((f = f.value),
                        f.l
                          ? !f.xa || f.h.updating || f.B.length
                          : !f.J || f.h.updating || f.B.length)
                      )
                        break a;
                    a.g.endOfStream();
                    a.A = !0;
                    Kz(a);
                  }
                },
                b
              )),
              a.j.push(c))
            : vi("msmsw_sbf" + b);
        }
        G(F.g(), "msmsw_ns", a.D.length.toString());
      };
    Jz.prototype.L = function () {
      this.h && window.URL.revokeObjectURL(this.h);
      for (var a = t(this.j), b = a.next(); !b.done; b = a.next()) b.value.W();
      Kz(this);
      this.g.removeEventListener("sourceopen", this.B);
      L.prototype.L.call(this);
    };
    var Lz = function () {
      throw Error("Do not instantiate directly");
    };
    Lz.prototype.g = null;
    Lz.prototype.getContent = function () {
      return this.content;
    };
    Lz.prototype.toString = function () {
      return this.content;
    };
    var Mz = function () {
      Lz.call(this);
    };
    cb(Mz, Lz);
    var Nz = (function (a) {
      function b(c) {
        this.content = c;
      }
      b.prototype = a.prototype;
      return function (c, d) {
        c = new b(String(c));
        void 0 !== d && (c.g = d);
        return c;
      };
    })(Mz); /*
  
  Math.uuid.js (v1.4)
  http://www.broofa.com
  mailto:robert@broofa.com
  Copyright (c) 2010 Robert Kieffer
  Dual licensed under the MIT and GPL licenses.
  */
    var Oz =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
          ""
        ),
      Pz = function () {
        for (var a = Array(36), b = 0, c, d = 0; 36 > d; d++)
          8 == d || 13 == d || 18 == d || 23 == d
            ? (a[d] = "-")
            : 14 == d
            ? (a[d] = "4")
            : (2 >= b && (b = (33554432 + 16777216 * Math.random()) | 0),
              (c = b & 15),
              (b >>= 4),
              (a[d] = Oz[19 == d ? (c & 3) | 8 : c]));
        return a.join("");
      };
    var Rz = function (a) {
      N.call(this, a);
      this.B = new Map();
      a = this.h;
      var b = a.indexOf(";"),
        c = null;
      0 <= b
        ? ((this.h = a.substring(0, b)), (c = a.substring(b + 1)))
        : (this.h = a);
      Qz(this, c);
    };
    v(Rz, N);
    Rz.prototype.toString = function () {
      return Sz(this, N.prototype.toString.call(this));
    };
    Rz.prototype.D = function () {
      return "";
    };
    var Qz = function (a, b) {
        lb(yg(b)) ||
          b.split(";").forEach(function (c) {
            var d = c.indexOf("=");
            if (!(0 >= d)) {
              var e = ug(c.substring(0, d));
              c = ug(c.substring(d + 1));
              d = a.B.get(e);
              null != d ? d.includes(c) || d.push(c) : (d = [yg(c)]);
              a.B.set(e, d);
            }
          }, a);
      },
      Tz = function (a) {
        if (lb(yg("ord"))) return null;
        a = a.B.get("ord");
        return null != a ? a : null;
      },
      Uz = function (a, b) {
        lb(yg("ord")) || ((b = b.map(yg)), a.B.set("ord", b));
      },
      Sz = function (a, b) {
        b = [yg(b)];
        b.push.apply(b, ia(Vz(a)));
        return b.join(";");
      },
      Vz = function (a) {
        var b = Tz(a);
        null == b ? (b = [yg(Date.now())]) : lb(yg("ord")) || a.B.delete("ord");
        var c = [];
        a.B.forEach(function (d, e) {
          d.forEach(function (f) {
            c.push(e + "=" + f);
          });
        });
        c.push("ord=" + b[0]);
        Uz(a, b);
        return c;
      };
    Rz.prototype.F = function () {
      return new Rz(this.toString());
    };
    var U = {
      DEPRECATED_ERROR_CODE: -1,
      VAST_MALFORMED_RESPONSE: 100,
      VAST_SCHEMA_VALIDATION_ERROR: 101,
      VAST_UNSUPPORTED_VERSION: 102,
      VAST_TRAFFICKING_ERROR: 200,
      VAST_UNEXPECTED_LINEARITY: 201,
      VAST_UNEXPECTED_DURATION_ERROR: 202,
      VAST_WRAPPER_ERROR: 300,
      VAST_LOAD_TIMEOUT: 301,
      VAST_TOO_MANY_REDIRECTS: 302,
      VAST_NO_ADS_AFTER_WRAPPER: 303,
      VIDEO_PLAY_ERROR: 400,
      VAST_MEDIA_LOAD_TIMEOUT: 402,
      VAST_LINEAR_ASSET_MISMATCH: 403,
      VAST_PROBLEM_DISPLAYING_MEDIA_FILE: 405,
      OVERLAY_AD_PLAYING_FAILED: 500,
      NONLINEAR_DIMENSIONS_ERROR: 501,
      OVERLAY_AD_LOADING_FAILED: 502,
      VAST_NONLINEAR_ASSET_MISMATCH: 503,
      COMPANION_REQUIRED_ERROR: 602,
      COMPANION_AD_LOADING_FAILED: 603,
      UNKNOWN_ERROR: 900,
      VPAID_ERROR: 901,
      FAILED_TO_REQUEST_ADS: 1005,
      VAST_ASSET_NOT_FOUND: 1007,
      VAST_EMPTY_RESPONSE: 1009,
      UNKNOWN_AD_RESPONSE: 1010,
      UNSUPPORTED_LOCALE: 1011,
      ADS_REQUEST_NETWORK_ERROR: 1012,
      INVALID_AD_TAG: 1013,
      STREAM_INITIALIZATION_FAILED: 1020,
      ASSET_FALLBACK_FAILED: 1021,
      INVALID_ARGUMENTS: 1101,
      NATIVE_MESSAGE_ERROR: 1204,
      AUTOPLAY_DISALLOWED: 1205,
      CONSENT_MANAGEMENT_PROVIDER_NOT_READY: 1300,
      Dh: 2002,
    };
    U[-1] = "DEPRECATED_ERROR_CODE";
    U[100] = "VAST_MALFORMED_RESPONSE";
    U[101] = "VAST_SCHEMA_VALIDATION_ERROR";
    U[102] = "VAST_UNSUPPORTED_VERSION";
    U[200] = "VAST_TRAFFICKING_ERROR";
    U[201] = "VAST_UNEXPECTED_LINEARITY";
    U[202] = "VAST_UNEXPECTED_DURATION_ERROR";
    U[300] = "VAST_WRAPPER_ERROR";
    U[301] = "VAST_LOAD_TIMEOUT";
    U[302] = "VAST_TOO_MANY_REDIRECTS";
    U[303] = "VAST_NO_ADS_AFTER_WRAPPER";
    U[400] = "VIDEO_PLAY_ERROR";
    U[402] = "VAST_MEDIA_LOAD_TIMEOUT";
    U[403] = "VAST_LINEAR_ASSET_MISMATCH";
    U[405] = "VAST_PROBLEM_DISPLAYING_MEDIA_FILE";
    U[500] = "OVERLAY_AD_PLAYING_FAILED";
    U[501] = "NONLINEAR_DIMENSIONS_ERROR";
    U[502] = "OVERLAY_AD_LOADING_FAILED";
    U[503] = "VAST_NONLINEAR_ASSET_MISMATCH";
    U[602] = "COMPANION_REQUIRED_ERROR";
    U[603] = "COMPANION_AD_LOADING_FAILED";
    U[900] = "UNKNOWN_ERROR";
    U[901] = "VPAID_ERROR";
    U[1005] = "FAILED_TO_REQUEST_ADS";
    U[1007] = "VAST_ASSET_NOT_FOUND";
    U[1009] = "VAST_EMPTY_RESPONSE";
    U[1010] = "UNKNOWN_AD_RESPONSE";
    U[1011] = "UNSUPPORTED_LOCALE";
    U[1012] = "ADS_REQUEST_NETWORK_ERROR";
    U[1013] = "INVALID_AD_TAG";
    U[1020] = "STREAM_INITIALIZATION_FAILED";
    U[1021] = "ASSET_FALLBACK_FAILED";
    U[1101] = "INVALID_ARGUMENTS";
    U[1204] = "NATIVE_MESSAGE_ERROR";
    U[1205] = "AUTOPLAY_DISALLOWED";
    U[1300] = "CONSENT_MANAGEMENT_PROVIDER_NOT_READY";
    U[2002] = "SUPPORTED_ADS_NOT_FOUND";
    var Wz = function (a, b, c) {
      var d = Error.call(this);
      this.message = d.message;
      "stack" in d && (this.stack = d.stack);
      this.type = a;
      this.errorMessage = b;
      this.errorCode = c;
      this.ad = this.g = null;
    };
    v(Wz, Error);
    l = Wz.prototype;
    l.getAd = function () {
      return this.ad;
    };
    l.getInnerError = function () {
      return this.g;
    };
    l.getMessage = function () {
      return this.errorMessage;
    };
    l.getErrorCode = function () {
      return this.errorCode;
    };
    l.getVastErrorCode = function () {
      return 1e3 > this.errorCode ? this.errorCode : 900;
    };
    l.getType = function () {
      return this.type;
    };
    l.toString = function () {
      return (
        "AdError " +
        this.getErrorCode() +
        ": " +
        this.getMessage() +
        (null != this.getInnerError()
          ? " Caused by: " + this.getInnerError()
          : "")
      );
    };
    var Xz = function (a) {
      var b = {};
      b =
        ((b.IABUSPrivacy_String = "uspString"),
        (b.IABTCF_gdprApplies = "gdprApplies"),
        (b.IABTCF_TCString = "tcString"),
        (b.IABTCF_AddtlConsent = "addtlConsent"),
        (b.IABGPP_HDR_GppString = "gppString"),
        (b.IABGPP_GppSID = "gppSid"),
        b);
      for (var c in b) null != a[c] && ((a[b[c]] = a[c]), delete a[c]);
      this.ge = !!a.isGdprLoader;
      c = a.uspString;
      this.uspString = "string" === typeof c ? c : "";
      c = a.gdprApplies;
      this.h =
        "boolean" === typeof c
          ? c
            ? "1"
            : "0"
          : "number" !== typeof c || (1 !== c && 0 !== c)
          ? "string" !== typeof c || ("1" !== c && "0" !== c)
            ? ""
            : "1" === c
            ? "1"
            : "0"
          : 1 === c
          ? "1"
          : "0";
      c = a.tcString;
      this.g = "string" === typeof c ? c : "";
      /^[\.\w_-]*$/.test(this.g) || (this.g = encodeURIComponent(this.g));
      a = a.gppString;
      this.gppString = "string" === typeof a ? a : "";
    };
    var Yz = function (a) {
        this.g = a;
      },
      Zz = function (a, b) {
        return Tf(a.g, b) && ((a = a.g[b]), "boolean" === typeof a) ? a : !1;
      },
      $z = function (a) {
        return Tf(a.g, "videoElementFakeDuration") &&
          ((a = a.g.videoElementFakeDuration), "number" === typeof a)
          ? a
          : NaN;
      },
      aA = function (a) {
        if (Tf(a.g, "forceExperimentIds")) {
          a = a.g.forceExperimentIds;
          var b = [],
            c = 0;
          Array.isArray(a) &&
            a.forEach(function (d) {
              "number" === typeof d && (b[c++] = d);
            });
          return b;
        }
        return null;
      };
    var V = function () {
        this.D = "always";
        this.J = 4;
        this.ppid = null;
        this.l = 1;
        this.g = 0;
        this.o = !0;
        this.locale = "en";
        this.j = null;
        this.h = !1;
        this.playerVersion = this.playerType = "";
        this.A = null;
        this.H = this.B = -1;
        this.K = "";
        this.G = !1;
        this.F = !0;
        this.sessionId = Pz();
        this.I = {};
        try {
          this.N = sl()[0];
        } catch (a) {}
      },
      bA = function (a) {
        a = yg(a);
        lb(a) || (a = a.substring(0, 20));
        return a;
      };
    l = V.prototype;
    l.setCompanionBackfill = function (a) {
      this.D = a;
    };
    l.getCompanionBackfill = function () {
      return this.D;
    };
    l.setNumRedirects = function (a) {
      this.J = a;
    };
    l.getNumRedirects = function () {
      return this.J;
    };
    l.setPpid = function (a) {
      this.ppid = a;
    };
    l.getPpid = function () {
      return this.ppid;
    };
    l.setVpaidAllowed = function (a) {
      "boolean" === typeof a && (this.l = a ? 1 : 0);
    };
    l.setVpaidMode = function (a) {
      this.l = a;
    };
    l.sf = function () {
      return this.l;
    };
    l.setAutoPlayAdBreaks = function (a) {
      this.o = a;
    };
    l.Df = function () {
      return this.o;
    };
    l.Wf = function (a) {
      this.h = a;
    };
    l.rf = function () {
      return this.h;
    };
    l.setLocale = function (a) {
      if ((a = Vv(a))) this.locale = a;
    };
    l.getLocale = function () {
      return this.locale;
    };
    l.setPlayerType = function (a) {
      this.playerType = bA(a);
    };
    l.getPlayerType = function () {
      return this.playerType;
    };
    l.setPlayerVersion = function (a) {
      this.playerVersion = bA(a);
    };
    l.getPlayerVersion = function () {
      return this.playerVersion;
    };
    var cA = function (a) {
      if (null == a.A) {
        var b = {};
        var c = new N(C().location.href).j;
        if (mv(c, "tcnfp"))
          try {
            b = JSON.parse(c.get("tcnfp"));
          } catch (d) {}
        a.A = new Yz(b);
      }
      return a.A;
    };
    l = V.prototype;
    l.Xf = function (a) {
      this.B = a;
    };
    l.Yf = function (a) {
      this.H = a;
    };
    l.setDisableCustomPlaybackForIOS10Plus = function (a) {
      this.G = a;
    };
    l.getDisableCustomPlaybackForIOS10Plus = function () {
      return this.G;
    };
    l.isCookiesEnabled = function () {
      return this.F;
    };
    l.setCookiesEnabled = function (a) {
      null != a && (this.F = a);
    };
    l.setSessionId = function (a) {
      this.sessionId = a;
    };
    l.Vf = function () {};
    l.qf = function () {
      return !0;
    };
    l.setFeatureFlags = function (a) {
      this.I = a;
    };
    l.getFeatureFlags = function () {
      return this.I;
    };
    V.prototype.getFeatureFlags = V.prototype.getFeatureFlags;
    V.prototype.setFeatureFlags = V.prototype.setFeatureFlags;
    V.prototype.getDisableFlashAds = V.prototype.qf;
    V.prototype.setDisableFlashAds = V.prototype.Vf;
    V.prototype.setSessionId = V.prototype.setSessionId;
    V.prototype.setCookiesEnabled = V.prototype.setCookiesEnabled;
    V.prototype.isCookiesEnabled = V.prototype.isCookiesEnabled;
    V.prototype.getDisableCustomPlaybackForIOS10Plus =
      V.prototype.getDisableCustomPlaybackForIOS10Plus;
    V.prototype.setDisableCustomPlaybackForIOS10Plus =
      V.prototype.setDisableCustomPlaybackForIOS10Plus;
    V.prototype.setStreamCorrelator = V.prototype.Yf;
    V.prototype.setPageCorrelator = V.prototype.Xf;
    V.prototype.getPlayerVersion = V.prototype.getPlayerVersion;
    V.prototype.setPlayerVersion = V.prototype.setPlayerVersion;
    V.prototype.getPlayerType = V.prototype.getPlayerType;
    V.prototype.setPlayerType = V.prototype.setPlayerType;
    V.prototype.getLocale = V.prototype.getLocale;
    V.prototype.setLocale = V.prototype.setLocale;
    V.prototype.getIsVpaidAdapter = V.prototype.rf;
    V.prototype.setIsVpaidAdapter = V.prototype.Wf;
    V.prototype.isAutoPlayAdBreaks = V.prototype.Df;
    V.prototype.setAutoPlayAdBreaks = V.prototype.setAutoPlayAdBreaks;
    V.prototype.getVpaidMode = V.prototype.sf;
    V.prototype.setVpaidMode = V.prototype.setVpaidMode;
    V.prototype.setVpaidAllowed = V.prototype.setVpaidAllowed;
    V.prototype.getPpid = V.prototype.getPpid;
    V.prototype.setPpid = V.prototype.setPpid;
    V.prototype.getNumRedirects = V.prototype.getNumRedirects;
    V.prototype.setNumRedirects = V.prototype.setNumRedirects;
    V.prototype.getCompanionBackfill = V.prototype.getCompanionBackfill;
    V.prototype.setCompanionBackfill = V.prototype.setCompanionBackfill;
    var dA = new V();
    var eA = function (a) {
      this.P = me(a);
    };
    v(eA, Ue);
    eA.ua = [10];
    function fA(a) {
      var b = {};
      new N(a).j.forEach(function (c, d) {
        b[d] = c;
      });
      return b;
    }
    var gA = function (a, b) {
        a = void 0 === a ? {} : a;
        b = void 0 === b ? {} : b;
        var c = {};
        a = t(Object.entries(a));
        for (var d = a.next(); !d.done; d = a.next()) {
          var e = t(d.value);
          d = e.next().value;
          e = e.next().value;
          null != e && (c[d] = String(e));
        }
        this.g = c;
        this.h = new Xz(b);
      },
      hA = function (a, b) {
        var c = new N(a);
        var d = c.h;
        (c =
          kb(c.g, "googleads.g.doubleclick.net") &&
          Tv("/pagead/(live/)?ads", d)) ||
          ((d = new Rz(a)),
          (c = d.g),
          (d = Sz(d, d.h)),
          (c =
            !kb(c, ".g.doubleclick.net") &&
            kb(c, "doubleclick.net") &&
            Tv("/(ad|pfad)[x|i|j]?/", d)));
        c ||
          ((c = new N(a)),
          (d = c.h),
          (c = kb(c.g, "doubleclick.net") && Tv("/gampad/(live/)?ads", d)));
        (c = c || "bid.g.doubleclick.net" == new N(a).g) ||
          ((c = new N(a)),
          (d = c.h),
          (c = "ad.doubleclick.net" === c.g && Tv("/dv3/adv", d)));
        c ||
          ((c = new N(a)),
          (d = c.h),
          "pubads.g.doubleclick.net" === c.g &&
            (Tv("/ssai/", d) || Tv("/ondemand/", d)));
        return new gA(fA(a), b);
      },
      iA = function (a, b) {
        if (a.g.hasOwnProperty(b)) return a.g[b];
      },
      jA = function (a) {
        var b = iA(a, "ltd");
        if (!(b = "1" === b || "true" === b)) {
          b = iA(a, "gdpr");
          var c = a.h.h;
          b = ("1" === c || "0" === c ? c : void 0 !== b ? b : "").toLowerCase();
          if ("true" === b || "1" === b)
            if (
              ((b = a.h.g),
              (a = iA(a, "gdpr_consent")),
              (a =
                b && "tcunavailable" !== b
                  ? b
                  : "tcunavailable" === b
                  ? a || b
                  : a || ""),
              "tcunavailable" === a)
            )
              var d = !1;
            else {
              if ((b = gu(a)) && a) {
                var e = He(b, yt, 1);
                b = He(b, rt, 2) || new rt();
                c = Qe(e, 9);
                var f = Qe(e, 4),
                  g = Qe(e, 5),
                  h = Pe(e, 10),
                  k = Pe(e, 11),
                  n = Oe(Ne(e, 16), ""),
                  m = Pe(e, 15),
                  p = {
                    consents: hu(Ce(e, 13, Yd), Ut),
                    legitimateInterests: hu(Ce(e, 14, Yd), Ut),
                  },
                  u = {
                    consents: hu(Ce(e, 17, ae)),
                    legitimateInterests: hu(Ce(e, 18, ae)),
                  },
                  r = hu(Ce(e, 12, Yd), Vt),
                  x = Je(e, qt, 19);
                e = {};
                x = t(x);
                for (var B = x.next(); !B.done; B = x.next()) {
                  B = B.value;
                  var P = Oe(ye(B, 1), 0);
                  e[P] = e[P] || {};
                  for (
                    var ka = t(Ce(B, 3, ae)), pa = ka.next();
                    !pa.done;
                    pa = ka.next()
                  )
                    e[P][pa.value] = Oe(ye(B, 2), 0);
                }
                a = {
                  tcString: a,
                  tcfPolicyVersion: c,
                  gdprApplies: !0,
                  cmpId: f,
                  cmpVersion: g,
                  isServiceSpecific: h,
                  useNonStandardStacks: k,
                  publisherCC: n,
                  purposeOneTreatment: m,
                  purpose: p,
                  vendor: u,
                  specialFeatureOptins: r,
                  publisher: {
                    restrictions: e,
                    consents: hu(Ce(b, 1, Yd), Ut),
                    legitimateInterests: hu(Ce(b, 2, Yd), Ut),
                    customPurposes: {
                      consents: hu(Ce(b, 3, ae)),
                      legitimateInterests: hu(Ce(b, 4, ae)),
                    },
                  },
                };
              } else a = null;
              if (a) {
                var ha = void 0 === ha ? !1 : ha;
                if (Su(a))
                  if (
                    !1 === a.gdprApplies ||
                    "tcunavailable" === a.tcString ||
                    (void 0 === a.gdprApplies && !ha) ||
                    "string" !== typeof a.tcString ||
                    !a.tcString.length
                  )
                    d = !0;
                  else {
                    d = void 0 === d ? "755" : d;
                    c: {
                      if (
                        a.publisher &&
                        a.publisher.restrictions &&
                        ((ha = a.publisher.restrictions["1"]), void 0 !== ha)
                      ) {
                        ha = ha[void 0 === d ? "755" : d];
                        break c;
                      }
                      ha = void 0;
                    }
                    0 === ha
                      ? (d = !1)
                      : a.purpose && a.vendor
                      ? ((ha = a.vendor.consents),
                        (d = !(!ha || !ha[void 0 === d ? "755" : d])) &&
                        a.purposeOneTreatment &&
                        "CH" === a.publisherCC
                          ? (d = !0)
                          : d &&
                            ((d = a.purpose.consents), (d = !(!d || !d["1"]))))
                      : (d = !0);
                  }
                else d = !1;
              } else d = !1;
            }
          else d = !0;
          b = !d;
        }
        return b;
      },
      kA = function (a) {
        var b = new eA();
        a = !jA(a);
        Ae(b, 5, Td(a));
        return b;
      };
    var lA = function (a) {
      this.P = me(a);
    };
    v(lA, Ue);
    lA.prototype.getVersion = function () {
      return Oe(Ne(this, 2), "");
    };
    var mA = function (a) {
      this.P = me(a);
    };
    v(mA, Ue);
    var nA = function (a, b) {
        return Te(a, 2, b);
      },
      oA = function (a, b) {
        return Te(a, 3, b);
      },
      pA = function (a, b) {
        return Te(a, 4, b);
      },
      qA = function (a, b) {
        return Te(a, 5, b);
      },
      rA = function (a, b) {
        return Te(a, 9, b);
      },
      sA = function (a, b) {
        return Le(a, 10, b);
      },
      tA = function (a, b) {
        return Ae(a, 11, Td(b));
      },
      uA = function (a, b) {
        return Te(a, 1, b);
      },
      vA = function (a, b) {
        return Ae(a, 7, Td(b));
      };
    mA.ua = [10, 6];
    var wA =
      "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(
        " "
      );
    function xA(a) {
      var b;
      return null != (b = a.google_tag_data) ? b : (a.google_tag_data = {});
    }
    function yA(a) {
      var b, c;
      return (
        "function" ===
        typeof (null == (b = a.navigator)
          ? void 0
          : null == (c = b.userAgentData)
          ? void 0
          : c.getHighEntropyValues)
      );
    }
    function zA() {
      var a = window;
      if (!yA(a)) return null;
      var b = xA(a);
      if (b.uach_promise) return b.uach_promise;
      a = a.navigator.userAgentData.getHighEntropyValues(wA).then(function (c) {
        null != b.uach || (b.uach = c);
        return c;
      });
      return (b.uach_promise = a);
    }
    function AA(a) {
      var b;
      return tA(
        sA(
          qA(
            nA(
              uA(
                pA(
                  vA(
                    rA(oA(new mA(), a.architecture || ""), a.bitness || ""),
                    a.mobile || !1
                  ),
                  a.model || ""
                ),
                a.platform || ""
              ),
              a.platformVersion || ""
            ),
            a.uaFullVersion || ""
          ),
          (null == (b = a.fullVersionList)
            ? void 0
            : b.map(function (c) {
                var d = new lA();
                d = Te(d, 1, c.brand);
                return Te(d, 2, c.version);
              })) || []
        ),
        a.wow64 || !1
      );
    }
    function BA() {
      var a, b;
      return null !=
        (b =
          null == (a = zA())
            ? void 0
            : a.then(function (c) {
                return AA(c);
              }))
        ? b
        : null;
    }
    var DA = function () {
        new gA();
        Pz();
        this.deviceId = "";
        this.g = this.referrer = this.ppid = null;
        CA(this);
      },
      EA = function () {
        DA.g();
        var a = "h.3.597.0";
        dA.h && (a += "/vpaid_adapter");
        return a;
      },
      CA = function (a) {
        var b = BA();
        b &&
          b.then(function (c) {
            if (null == c) c = null;
            else {
              c = We(c);
              for (var d = [], e = 0, f = 0; f < c.length; f++) {
                var g = c.charCodeAt(f);
                255 < g && ((d[e++] = g & 255), (g >>= 8));
                d[e++] = g;
              }
              c = Uc(d, 3);
            }
            a.g = c;
          });
      };
    DA.g = function () {
      return E(DA);
    };
    function FA() {
      var a = C(),
        b = document;
      return new N(a.parent === a ? a.location.href : b.referrer);
    }
    function GA(a, b) {
      hv(a, "url", "");
      try {
        var c = 2083 - a.toString().length - 1;
        if (0 >= c) return a.toString();
        for (
          var d = b.slice(0, c), e = encodeURIComponent(d), f = c;
          0 < f && e.length > c;
  
        )
          (d = b.slice(0, f--)), (e = encodeURIComponent(d));
        hv(a, "url", d);
      } catch (g) {}
      return a.toString();
    }
    var W = {},
      HA =
        ((W.creativeView = "creativeview"),
        (W.start = "start"),
        (W.midpoint = "midpoint"),
        (W.firstQuartile = "firstquartile"),
        (W.thirdQuartile = "thirdquartile"),
        (W.complete = "complete"),
        (W.mute = "mute"),
        (W.unmute = "unmute"),
        (W.pause = "pause"),
        (W.rewind = "rewind"),
        (W.resume = "resume"),
        (W.fullscreen = "fullscreen"),
        (W.exitFullscreen = "exitfullscreen"),
        (W.expand = "expand"),
        (W.collapse = "collapse"),
        (W.close = "close"),
        (W.acceptInvitation = "acceptinvitation"),
        (W.adCanPlay = "adCanPlay"),
        (W.adStarted = "adStarted"),
        (W.abandon = "abandon"),
        (W.acceptInvitationLinear = "acceptinvitationlinear"),
        (W.engagedView = "engagedview"),
        (W.instreamAdComplete = "instreamAdComplete"),
        (W.skipShown = "skipshown"),
        (W.skippableStateChanged = "skippableStateChanged"),
        (W.skip = "skip"),
        (W.progress = "progress"),
        (W.publisher_invoked_skip = "PUBLISHER_INVOKED_SKIP"),
        (W.annotation_start = "annotation_start"),
        (W.annotation_click = "annotation_click"),
        (W.annotation_close = "annotation_close"),
        (W.cta_annotation_shown = "cta_annotation_shown"),
        (W.cta_annotation_clicked = "cta_annotation_clicked"),
        (W.cta_annotation_closed = "cta_annotation_closed"),
        (W.replay = "replay"),
        (W.stop = "stop"),
        (W.autoplayDisallowed = "autoplayDisallowed"),
        (W.error = "error"),
        (W.mediaLoadTimeout = "mediaLoadTimeout"),
        (W.linearChanged = "linearChanged"),
        (W.click = "click"),
        (W.contentPauseRequested = "contentPauseRequested"),
        (W.contentResumeRequested = "contentResumeRequested"),
        (W.discardAdBreak = "discardAdBreak"),
        (W.updateAdsRenderingSettings = "updateAdsRenderingSettings"),
        (W.durationChange = "durationChange"),
        (W.expandedChanged = "expandedChanged"),
        (W.autoClose = "autoClose"),
        (W.userClose = "userClose"),
        (W.userRecall = "userRecall"),
        (W.prefetched = "prefetched"),
        (W.loaded = "loaded"),
        (W.init = "init"),
        (W.allAdsCompleted = "allAdsCompleted"),
        (W.adMetadata = "adMetadata"),
        (W.adBreakReady = "adBreakReady"),
        (W.adBreakFetchError = "adBreakFetchError"),
        (W.log = "log"),
        (W.volumeChange = "volumeChange"),
        (W.companionBackfill = "companionBackfill"),
        (W.companionInitialized = "companionInitialized"),
        (W.companionImpression = "companionImpression"),
        (W.companionClick = "companionClick"),
        (W.impression = "impression"),
        (W.interaction = "interaction"),
        (W.adProgress = "adProgress"),
        (W.adBuffering = "adBuffering"),
        (W.trackingUrlPinged = "trackingUrlPinged"),
        (W.measurable_impression = "measurable_impression"),
        (W.custom_metric_viewable = "custom_metric_viewable"),
        (W.viewable_impression = "viewable_impression"),
        (W.fully_viewable_audible_half_duration_impression =
          "fully_viewable_audible_half_duration_impression"),
        (W.audio_audible = "audio_audible"),
        (W.audio_measurable = "audio_measurable"),
        (W.overlay_resize = "overlay_resize"),
        (W.overlay_unmeasurable_impression = "overlay_unmeasurable_impression"),
        (W.overlay_unviewable_impression = "overlay_unviewable_impression"),
        (W.overlay_viewable_immediate_impression =
          "overlay_viewable_immediate_impression"),
        (W.overlay_viewable_end_of_session_impression =
          "overlay_viewable_end_of_session_impression"),
        (W.externalActivityEvent = "externalActivityEvent"),
        (W.adEvent = "adEvent"),
        (W.configure = "configure"),
        (W.remainingTime = "remainingTime"),
        (W.destroy = "destroy"),
        (W.resize = "resize"),
        (W.volume = "volume"),
        (W.authorIconClicked = "videoAuthorIconClicked"),
        (W.authorNameClicked = "videoAuthorClicked"),
        (W.videoClicked = "videoClicked"),
        (W.videoIconClicked = "videoIconClicked"),
        (W.learnMoreClicked = "videoLearnMoreClicked"),
        (W.muteClicked = "videoMuteClicked"),
        (W.titleClicked = "videoTitleClicked"),
        (W.videoSkipClicked = "SKIPPED"),
        (W.unmuteClicked = "videoUnmuteClicked"),
        (W.vpaidEvent = "vpaidEvent"),
        (W.show_ad = "show_ad"),
        (W.video_card_endcap_collapse = "video_card_endcap_collapse"),
        (W.video_card_endcap_dismiss = "video_card_endcap_dismiss"),
        (W.video_card_endcap_impression = "video_card_endcap_impression"),
        (W.mediaUrlPinged = "mediaUrlPinged"),
        (W.breakStart = "breakstart"),
        (W.breakEnd = "breakend"),
        (W.omidReady = "omidReady"),
        (W.omidUnavailable = "omidUnavailable"),
        (W.omidAdSessionCompleted = "omidAdSessionCompleted"),
        (W.omidAdSessionAbandoned = "omidAdSessionAbandoned"),
        (W.verificationNotExecuted = "verificationNotExecuted"),
        (W.loadStart = "loadStart"),
        (W.seeked = "seeked"),
        (W.seeking = "seeking"),
        W);
    var IA = new (function () {
      this.g = new Map();
      this.j = 0;
      this.h = null != window.fetch;
    })();
    function JA(a) {
      var b = void 0 === b ? IA : b;
      var c = void 0 === c ? null : c;
      a = new Yv(a, c ? c : c);
      var d = void 0 === d ? !1 : d;
      var e = void 0 === e ? !1 : e;
      null != a.g || e ? Hw(b, a.url, d, e, a.g) : Hw(b, a.url, d);
    }
    var X = function () {
      this.j = 0.01 > Math.random();
      this.h = Math.floor(4503599627370496 * Math.random());
      this.g = null;
    };
    X.prototype.report = function (a, b, c) {
      b = void 0 === b ? {} : b;
      if (null == w.G_testRunner && (this.j || (void 0 === c ? 0 : c))) {
        b.lid = a;
        EA() && (b.sdkv = EA());
        this.g && (b.palv = this.g);
        a = Oi().sort().join(",");
        lb(yg(a)) || (b.e = a);
        b = KA(this, b);
        var d = new N("http://pagead2.googlesyndication.com/pagead/gen_204");
        Mf(
          b,
          function (e, f) {
            null != e &&
              hv(
                d,
                f,
                null == e ? "" : "boolean" === typeof e ? (e ? "t" : "f") : "" + e
              );
          },
          this
        );
        b = FA();
        Vu(d, b.o);
        b = d.toString();
        a = d.j.get("url");
        null != a && Kb() && 2083 < b.length && (b = GA(d, a));
        JA(b);
      }
    };
    var KA = function (a, b) {
      b.id = "ima_html5";
      var c = FA();
      b.c = a.h;
      b.domain = c.g;
      return b;
    };
    X.g = function () {
      return E(X);
    };
    function LA(a) {
      var b = Date.now(),
        c = {};
      a = ((c["x-afma-token-requester-type"] = a), c);
      return new Bw()
        .get({
          url: "https://pubads.g.doubleclick.net/adsid/integrator.json",
          withCredentials: !0,
          timeout: new Wv(),
          headers: a,
        })
        .then(function (d) {
          var e = Date.now();
          d = d.newToken || "";
          var f = {};
          X.g().report(182, ((f.t = e - b), f));
          return new MA(d);
        })
        .catch(function (d) {
          var e = "not instanceof Error";
          d instanceof Error && (e = Zv(Number(d.message)));
          d = Date.now();
          var f = {};
          X.g().report(182, ((f.except = e), (f.t = d - b), f));
          return Promise.resolve(NA);
        });
    }
    var OA = function () {
      M.call(this);
      this.g = null;
      this.l = new cw(this);
      rn(this, this.l);
      this.h = new zs(72e5);
      this.j = Promise.resolve(NA);
    };
    v(OA, M);
    var PA = function (a, b) {
      b = void 0 === b ? "requester_type_9" : b;
      var c = function (d) {
        a.g = d;
        return a.g;
      };
      a.j = LA(b).then(c);
      a.h = new zs(72e5);
      a.l.O(a.h, "tick", function () {
        a.j = LA(b).then(c);
      });
      a.h.start();
      qn(a, function () {
        a.h.stop();
      });
    };
    OA.prototype.getId = function () {
      var a = this;
      return Ka(function (b) {
        if (1 == b.g)
          return (
            null != a.g && a.g !== NA
              ? ((b.g = 2), (b = void 0))
              : (b = Aa(b, a.j, 3)),
            b
          );
        2 != b.g && (a.g = b.h);
        return b.return(a.g);
      });
    };
    var MA = function (a) {
        this.id = a;
      },
      NA = new MA("");
    var QA = function (a) {
      M.call(this);
      this.j = [];
      this.h = !1;
      this.sessionId = a || "goog_" + zg++;
    };
    v(QA, M);
    QA.prototype.connect = function () {
      for (this.h = !0; 0 !== this.j.length; ) {
        var a = this.j.shift();
        a && this.sendMessage(a.name, a.type, a.data);
      }
    };
    var RA = function (a, b, c, d) {
      a.h ? a.sendMessage(b, c, d) : a.j.push({ name: b, type: c, data: d });
    };
    QA.prototype.sendMessage = function () {};
    var SA = function (a, b, c, d, e) {
      e = void 0 === e ? "" : e;
      ur.call(this, a);
      this.messageType = b;
      this.qa = c;
      this.sessionId = d;
      this.origin = e;
    };
    v(SA, ur);
    SA.prototype.toString = function () {
      return "";
    };
    var TA = { IMAGE: "Image", FLASH: "Flash", ALL: "All" },
      UA = { HTML: "Html", IFRAME: "IFrame", STATIC: "Static", ALL: "All" },
      VA = {
        IGNORE: "IgnoreSize",
        SELECT_EXACT_MATCH: "SelectExactMatch",
        SELECT_NEAR_MATCH: "SelectNearMatch",
        SELECT_FLUID: "SelectFluid",
      },
      WA = function () {
        this.allowCustom = !0;
        this.creativeType = this.resourceType = "All";
        this.sizeCriteria = "SelectExactMatch";
        this.nearMatchPercent = 90;
        this.adSlotIds = [];
      };
    y(
      "module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$companion_ad_selection_settings.CompanionAdSelectionSettings.CreativeType",
      TA
    );
    y(
      "module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$companion_ad_selection_settings.CompanionAdSelectionSettings.ResourceType",
      UA
    );
    y(
      "module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$companion_ad_selection_settings.CompanionAdSelectionSettings.SizeCriteria",
      VA
    );
    var YA = function (a, b) {
        b = void 0 === b ? new WA() : b;
        this.g = a;
        this.settings = b ? b : new WA();
        this.resourceType = XA(UA, this.settings.resourceType)
          ? this.settings.resourceType
          : "All";
        this.creativeType = XA(TA, this.settings.creativeType)
          ? this.settings.creativeType
          : "All";
        this.sizeCriteria = XA(VA, this.settings.sizeCriteria)
          ? this.settings.sizeCriteria
          : "SelectExactMatch";
        this.adSlotIds =
          null != this.settings.adSlotIds ? this.settings.adSlotIds : [];
        this.nearMatchPercent =
          "number" === typeof this.settings.nearMatchPercent &&
          0 < this.settings.nearMatchPercent &&
          100 >= this.settings.nearMatchPercent
            ? this.settings.nearMatchPercent
            : 90;
      },
      aB = function (a, b) {
        var c = [];
        b.forEach(function (d) {
          a.settings.allowCustom &&
            (!lb(d.getContent()) &&
            (isNaN(d.data.sequenceNumber) ||
              isNaN(d.data.mainAdSequenceNumber) ||
              d.data.mainAdSequenceNumber === d.data.sequenceNumber) &&
            ZA(a, d)
              ? c.push(d)
              : ((d = $A(a, d)), null != d && !lb(d.getContent()) && c.push(d)));
        });
        return c;
      };
    YA.prototype.ce = function () {
      return this.resourceType;
    };
    var ZA = function (a, b) {
        var c;
        if ((c = "Flash" !== b.getContentType())) {
          if ((c = "All" === a.resourceType || a.resourceType === b.ce()))
            (c = b.getContentType()),
              (c =
                null == c
                  ? !0
                  : "All" === a.creativeType || a.creativeType === c);
          c &&
            ((c = b.getAdSlotId()),
            (c =
              0 === a.adSlotIds.length
                ? !0
                : null != c
                ? a.adSlotIds.includes(c)
                : !1));
        }
        if (c)
          if (((c = b.getSize()), (b = !!b.data.fluidSize) || a.g.ae))
            a = b && a.g.ae;
          else if (
            ((b = "IgnoreSize" === a.sizeCriteria) ||
              ((b = a.g.size),
              (b =
                b == c
                  ? !0
                  : b && c
                  ? b.width == c.width && b.height == c.height
                  : !1)),
            b)
          )
            a = !0;
          else {
            if ((b = "SelectNearMatch" === a.sizeCriteria))
              (b = c.width),
                (c = c.height),
                (b =
                  b > a.g.size.width ||
                  c > a.g.size.height ||
                  b < (a.nearMatchPercent / 100) * a.g.size.width ||
                  c < (a.nearMatchPercent / 100) * a.g.size.height
                    ? !1
                    : !0);
            a = b;
          }
        else a = !1;
        return a;
      },
      $A = function (a, b) {
        b = bB(b);
        return null == b
          ? null
          : b.find(function (c) {
              return ZA(a, c);
            }) || null;
      },
      XA = function (a, b) {
        return null != b && Uf(a, b);
      };
    var cB = function (a, b) {
      this.message = a;
      this.errorCode = b;
    };
    cB.prototype.getErrorCode = function () {
      return this.errorCode;
    };
    cB.prototype.getMessage = function () {
      return this.message;
    };
    var dB = new cB(
        "Failed to initialize ad playback element before starting ad playback.",
        400
      ),
      eB = new cB("The provided {0} information: {1} is invalid.", 1101);
    function fB(a, b) {
      var c = void 0 === b ? null : b;
      var d = Ma.apply(2, arguments);
      if (!(c instanceof Wz)) {
        var e = a.getErrorCode(),
          f = a.getMessage();
        if (0 < d.length)
          for (var g = 0; g < d.length; g++)
            f = f.replace(new RegExp("\\{" + g + "\\}", "ig"), d[g]);
        d = new Wz("adPlayError", f, e);
        d.g = c;
        c = d;
      }
      return c;
    }
    var gB = function () {};
    gB.g = function () {
      throw Error("Must be overridden");
    };
    var hB = function () {
      this.g = 0;
    };
    v(hB, gB);
    hB.lb = void 0;
    hB.g = function () {
      return hB.lb ? hB.lb : (hB.lb = new hB());
    };
    function iB(a, b, c, d) {
      c = void 0 === c ? null : c;
      d = void 0 === d ? {} : d;
      var e = hB.g();
      0 === e.g && (e.g = 0.001 > Math.random() ? 2 : 1);
      if (2 === e.g) {
        e = {};
        var f = Object,
          g = f.assign;
        e.c = String(a);
        a = String;
        var h = window;
        if ("number" !== typeof h.goog_pvsid)
          try {
            var k = Object,
              n = k.defineProperty,
              m = void 0;
            m = void 0 === m ? Math.random : m;
            var p = Math.floor(m() * Math.pow(2, 52));
            n.call(k, h, "goog_pvsid", { value: p, configurable: !1 });
          } catch (u) {}
        e.pc = a(Number(h.goog_pvsid) || -1);
        e.em = c;
        e.lid = b;
        E(lt);
        Qh(g.call(f, {}, ((e.eids = ""), e), d), "esp");
      }
    }
    function jB() {
      var a = window;
      var b = void 0 === b ? function () {} : b;
      return new Promise(function (c) {
        var d = function () {
          c(b());
          Kf(a, "load", d);
        };
        Jf(a, "load", d);
      });
    }
    var kB = function () {
        this.cache = {};
      },
      mB = function () {
        lB || (lB = new kB());
        return lB;
      },
      nB = function (a) {
        var b = Me(a, 3);
        if (!b) return 3;
        if (void 0 === Ne(a, 2)) return 4;
        a = Date.now();
        return a > b + 2592e5 ? 2 : a > b + 432e5 ? 1 : 0;
      };
    kB.prototype.get = function (a, b) {
      if (this.cache[a]) return { Cb: this.cache[a], success: !0 };
      var c = "";
      try {
        c = b.getItem("_GESPSK-" + a);
      } catch (g) {
        var d;
        iB(6, a, null == (d = g) ? void 0 : d.message);
        return { Cb: null, success: !1 };
      }
      if (!c) return { Cb: null, success: !0 };
      try {
        var e = $s(c);
        this.cache[a] = e;
        return { Cb: e, success: !0 };
      } catch (g) {
        var f;
        iB(5, a, null == (f = g) ? void 0 : f.message);
        return { Cb: null, success: !1 };
      }
    };
    kB.prototype.set = function (a, b) {
      var c = Ne(a, 1),
        d = "_GESPSK-" + c;
      Zs(a);
      try {
        b.setItem(d, We(a));
      } catch (f) {
        var e;
        iB(7, c, null == (e = f) ? void 0 : e.message);
        return !1;
      }
      this.cache[c] = a;
      return !0;
    };
    kB.prototype.remove = function (a, b) {
      a = Ne(a, 1);
      try {
        b.removeItem("_GESPSK-" + a), delete this.cache[a];
      } catch (d) {
        var c;
        iB(8, a, null == (c = d) ? void 0 : c.message);
      }
    };
    var lB = null;
    var oB = function () {
      var a = {};
      this.h = function (b, c) {
        return null != a[b] ? a[b] : c;
      };
      this.j = function () {
        var b = ku.g,
          c = ku.defaultValue;
        return null != a[b] ? a[b] : c;
      };
      this.g = function (b, c) {
        return null != a[b] ? a[b] : c;
      };
    };
    function pB(a) {
      return E(oB).h(a.g, a.defaultValue);
    }
    var qB = function (a) {
      L.call(this);
      this.l = a;
      this.g = [];
      this.h = [];
      this.j = [];
      this.o = [];
    };
    v(qB, L);
    var rB = function (a, b) {
      a.h.push({ dc: !1, Oa: b });
      pB(nu) && b.Sc(a.l);
    };
    qB.prototype.L = function () {
      this.g.length = 0;
      this.j.length = 0;
      if (pB(nu))
        for (var a = t(this.h), b = a.next(); !b.done; b = a.next())
          b.value.Oa.hc.length = 0;
      this.h.length = 0;
      this.o.length = 0;
      L.prototype.L.call(this);
    };
    var sB = function () {
      var a = this;
      this.promise = new Promise(function (b, c) {
        a.resolve = b;
        a.reject = c;
      });
    };
    var tB = function (a) {
      a = Error.call(this, a);
      this.message = a.message;
      "stack" in a && (this.stack = a.stack);
      Object.setPrototypeOf(this, tB.prototype);
      this.name = "InputError";
    };
    v(tB, Error);
    var uB = function () {
        this.bb = !1;
      },
      vB = function () {
        uB.apply(this, arguments);
        this.hc = [];
        this.Jc = new sB();
      };
    v(vB, uB);
    var xB = function (a, b) {
        a.bb || ((a.bb = !0), (a.Ub = b), a.Jc.resolve(b), pB(nu) && wB(a));
      },
      wB = function (a) {
        for (var b = t(a.hc), c = b.next(); !c.done; c = b.next())
          (c = c.value), c(a.Ub);
        a.hc.length = 0;
      };
    vB.prototype.Sc = function (a) {
      pB(nu) && this.hc.push(a);
    };
    da.Object.defineProperties(vB.prototype, {
      promise: {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return this.Jc.promise;
        },
      },
      Wb: {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return this.bb;
        },
      },
      error: {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return this.nd;
        },
      },
    });
    var yB = function () {
      vB.apply(this, arguments);
    };
    v(yB, vB);
    var zB = function (a, b) {
        xB(a, b);
      },
      AB = function (a, b) {
        b.then(function (c) {
          xB(a, c);
        });
      };
    yB.prototype.gb = function (a) {
      this.bb ||
        ((this.bb = !0),
        (this.Ub = null),
        (this.nd = a),
        this.Jc.reject(a),
        pB(nu) && wB(this));
    };
    var BB = function (a) {
      this.bb = !1;
      this.g = a;
    };
    v(BB, uB);
    BB.prototype.Wb = function () {
      return this.g.bb;
    };
    da.Object.defineProperties(BB.prototype, {
      error: {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return this.g.nd;
        },
      },
    });
    var CB = function (a) {
      BB.call(this, a);
      this.g = a;
    };
    v(CB, BB);
    da.Object.defineProperties(CB.prototype, {
      value: {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return this.g.Ub;
        },
      },
    });
    var DB = function (a) {
      BB.call(this, a);
      this.g = a;
    };
    v(DB, BB);
    da.Object.defineProperties(DB.prototype, {
      value: {
        configurable: !0,
        enumerable: !0,
        get: function () {
          var a;
          return null != (a = this.g.Ub) ? a : null;
        },
      },
    });
    var EB = function () {
      vB.apply(this, arguments);
    };
    v(EB, vB);
    EB.prototype.notify = function () {
      xB(this, null);
    };
    function FB(a, b, c) {
      var d, e, f, g, h;
      return Ka(function (k) {
        if (1 == k.g)
          return (
            (d = c
              ? a.filter(function (n) {
                  return !n.dc;
                })
              : a),
            Aa(
              k,
              Promise.all(
                d.map(function (n) {
                  return n.Oa.promise;
                })
              ),
              2
            )
          );
        if (a.length === d.length) return k.return();
        e = a.filter(function (n) {
          return n.dc;
        });
        if (pB(ou)) {
          f = t(b);
          for (g = f.next(); !g.done; g = f.next()) (h = g.value), h.g();
          return Aa(
            k,
            Promise.all(
              e.map(function (n) {
                return n.Oa.promise;
              })
            ),
            0
          );
        }
        return Aa(
          k,
          Promise.race([
            Promise.all(
              e.map(function (n) {
                return n.Oa.promise;
              })
            ),
            new Promise(function (n) {
              return void setTimeout(n, c);
            }),
          ]),
          0
        );
      });
    }
    var HB = function (a, b) {
      L.call(this);
      var c = this;
      this.id = a;
      this.timeoutMs = b;
      this.F = this.D = this.B = this.o = !1;
      this.g = new qB(function () {
        GB(c);
      });
      rn(this, this.g);
    };
    v(HB, L);
    HB.prototype.start = function () {
      var a = this,
        b;
      return Ka(function (c) {
        switch (c.g) {
          case 1:
            if (a.o) return c.return();
            a.o = !0;
            c.j = 2;
            return Aa(c, FB(a.g.h, a.g.o, a.timeoutMs), 4);
          case 4:
            if (a.wa()) {
              c.g = 5;
              break;
            }
            for (var d = 0, e = t(a.g.j), f = e.next(); !f.done; f = e.next()) {
              if (null == f.value.g.Ub)
                throw Error("missing input: " + a.id + "/" + d);
              ++d;
            }
            return Aa(c, a.h(), 5);
          case 5:
            Ba(c);
            break;
          case 2:
            b = Ca(c);
            if (a.wa()) return c.return();
            !(b instanceof tB) &&
              b instanceof Error &&
              (a.l(a.id, b), a.g.g.length && IB(a, new tB(b.message)));
            c.g = 0;
        }
      });
    };
    var GB = function (a) {
        if (!a.o && a.B)
          try {
            var b = a.g.h,
              c = a.timeoutMs
                ? b.filter(function (k) {
                    return !k.dc;
                  })
                : b,
              d = b.filter(function (k) {
                return k.dc;
              }),
              e,
              f =
                null ==
                (e = b.find(function (k) {
                  return void 0 !== k.Oa.error;
                }))
                  ? void 0
                  : e.Oa.error;
            if (f) throw ((a.o = !0), f);
            if (
              !c.some(function (k) {
                return !k.Oa.Wb;
              })
            ) {
              if (d.length)
                if (pB(ou)) {
                  for (var g = t(a.g.o), h = g.next(); !h.done; h = g.next())
                    h.value.g();
                  if (
                    d.some(function (k) {
                      return !k.Oa.Wb;
                    })
                  )
                    return;
                } else if (
                  (a.D ||
                    ((a.D = !0),
                    setTimeout(function () {
                      a.F = !0;
                      GB(a);
                    }, a.timeoutMs)),
                  d.some(function (k) {
                    return !k.Oa.Wb;
                  }) && !a.F)
                )
                  return;
              a.o = !0;
              a.h();
            }
          } catch (k) {
            !(a.wa() || k instanceof tB) &&
              k instanceof Error &&
              (a.l(a.id, k), a.g.g.length && IB(a, new tB(k.message)));
          }
      },
      JB = function (a) {
        var b = void 0 === b ? new yB() : b;
        a.g.g.push(b);
        return b;
      },
      KB = function (a) {
        var b = void 0 === b ? new EB() : b;
        a.g.g.push(b);
        return b;
      },
      LB = function (a, b) {
        rB(a.g, b);
        b = new CB(b);
        a.g.j.push(b);
        return b;
      },
      MB = function (a, b) {
        rB(a.g, b);
        return new DB(b);
      },
      IB = function (a, b) {
        a = t(a.g.g);
        for (var c = a.next(); !c.done; c = a.next())
          if (((c = c.value), !c.Wb)) {
            var d = b;
            c.bb = !0;
            c.nd = d;
            c.Jc.reject(d);
            pB(nu) && wB(c);
          }
      };
    var NB = function (a, b) {
      HB.call(this, a);
      this.id = a;
      this.l = b;
    };
    v(NB, HB);
    function OB(a, b) {
      return Je(a, Xs, 2).some(function (c) {
        return Ne(c, 1) === b && null != Ne(c, 2);
      });
    }
    function PB(a) {
      var b = void 0 === b ? !1 : b;
      var c = new dt();
      if (a) {
        var d = [],
          e = RegExp("^_GESPSK-(.+)$");
        try {
          for (var f = 0; f < a.length; f++) {
            var g = (e.exec(a.key(f)) || [])[1];
            g && d.push(g);
          }
        } catch (m) {}
        d = t(d);
        f = d.next();
        for (e = {}; !f.done; e = { Nb: e.Nb }, f = d.next())
          if (
            ((e.Nb = f.value),
            (g = mB().get(e.Nb, a).Cb) &&
              (!b || !OB(c, e.Nb)) &&
              ((f = nB(g)), 2 !== f && 3 !== f))
          ) {
            Ae(g, 9, Td(!1));
            f = Ne(g, 2);
            var h = Xs,
              k = c.P,
              n = Dd(k);
            Od(n);
            k = Ie(k, n, h, 2, 2);
            g = null != g ? g : new h();
            k.push(g);
            yd(g.P) & 2 ? Bd(k, 8) : Bd(k, 16);
            g = {};
            iB(19, e.Nb, null, ((g.hs = f ? "1" : "0"), g));
          }
      }
      if (!Je(c, Xs, 2).length) return null;
      iB(50, "");
      return Uc(c.g(), 3);
    }
    var QB = {};
    var RB = function () {
      L.apply(this, arguments);
      this.o = [];
      this.A = [];
      this.l = {};
      this.g = [];
      this.h = new sB();
      this.j = {};
    };
    v(RB, L);
    var SB = function (a, b) {
        rn(a, b);
        a.o.push(b);
      },
      TB = function (a, b) {
        b = t(b);
        for (var c = b.next(); !c.done; c = b.next()) SB(a, c.value);
      },
      UB = function (a) {
        var b, c, d, e, f, g, h, k, n, m, p, u;
        Ka(function (r) {
          switch (r.g) {
            case 1:
              if (!a.g.length) {
                r.g = 2;
                break;
              }
              return Aa(
                r,
                Promise.all(
                  a.g.map(function (x) {
                    return x.h.promise;
                  })
                ),
                2
              );
            case 2:
              b = t(a.o);
              for (c = b.next(); !c.done; c = b.next())
                (d = c.value), pB(nu) ? ((d.B = !0), GB(d)) : d.start();
              e = t(a.A);
              for (f = e.next(); !f.done; f = e.next()) (g = f.value), UB(g);
              if (!a.j) {
                r.g = 4;
                break;
              }
              h = Object.keys(a.j);
              if (!h.length) {
                r.g = 4;
                break;
              }
              return Aa(
                r,
                Promise.all(
                  Object.values(a.j).map(function (x) {
                    return x.promise;
                  })
                ),
                6
              );
            case 6:
              for (k = r.h, n = 0, m = t(h), p = m.next(); !p.done; p = m.next())
                (u = p.value), (a.l[u] = k[n++]);
            case 4:
              return a.h.resolve(a.l), r.return(a.h.promise);
          }
        });
      };
    RB.prototype.L = function () {
      L.prototype.L.call(this);
      this.o.length = 0;
      this.A.length = 0;
      this.g.length = 0;
    };
    var VB = function (a, b, c, d) {
      NB.call(this, 1041, d);
      this.storage = b;
      this.A = LB(this, a);
      c && (this.j = MB(this, c));
    };
    v(VB, NB);
    VB.prototype.h = function () {
      var a = this.A.value,
        b,
        c,
        d =
          null != (c = this.storage)
            ? c
            : null == (b = this.j)
            ? void 0
            : b.value;
      d && mB().set(a, d) && null != Ne(a, 2) && iB(27, Ne(a, 1));
    };
    var WB = function (a, b) {
      NB.call(this, 1094, b);
      this.j = KB(this);
      this.A = LB(this, a);
    };
    v(WB, NB);
    WB.prototype.h = function () {
      var a = this.A.value;
      if (a) {
        if (void 0 !== a)
          for (var b = t(Object.keys(a)), c = b.next(); !c.done; c = b.next())
            if (((c = c.value), c.startsWith("_GESPSK")))
              try {
                a.removeItem(c);
              } catch (d) {}
        lB = new kB();
        this.j.notify();
      }
    };
    var XB = function (a, b) {
      NB.call(this, 1048, b);
      this.j = JB(this);
      this.A = JB(this);
      this.G = LB(this, a);
    };
    v(XB, NB);
    XB.prototype.h = function () {
      var a = this.G.value,
        b = function (c) {
          var d = {};
          iB(
            c,
            Ne(a, 1),
            null,
            ((d.tic = String(Math.round((Date.now() - Me(a, 3)) / 6e4))), d)
          );
        };
      switch (nB(a)) {
        case 0:
          b(24);
          break;
        case 1:
          b(25);
          xB(this.A, a);
          break;
        case 2:
          b(26);
          xB(this.j, a);
          break;
        case 3:
          iB(9, Ne(a, 1));
          xB(this.j, a);
          break;
        case 4:
          b(23), xB(this.j, a);
      }
    };
    var YB = function (a, b, c) {
      NB.call(this, 1027, c);
      this.kc = a;
      this.storage = b;
      this.j = JB(this);
      this.A = JB(this);
    };
    v(YB, NB);
    YB.prototype.h = function () {
      var a = mB().get(this.kc, this.storage).Cb;
      if (!a) {
        a = Zs(Ys(this.kc));
        var b = a.gb(Vs(100));
        xB(this.A, b);
      }
      xB(this.j, a);
    };
    var ZB = function (a, b, c) {
      NB.call(this, 1046, c);
      this.output = KB(this);
      this.j = JB(this);
      this.A = LB(this, b);
      rB(this.g, a);
    };
    v(ZB, NB);
    ZB.prototype.h = function () {
      xB(this.j, this.A.value);
    };
    var $B = function (a, b, c) {
      NB.call(this, 1047, c);
      this.collectorFunction = a;
      this.j = JB(this);
      this.A = JB(this);
      this.G = JB(this);
      this.I = LB(this, b);
    };
    v($B, NB);
    $B.prototype.h = function () {
      var a = this,
        b = this.I.value,
        c = Ne(b, 1);
      iB(18, c);
      try {
        var d = Zh();
        this.collectorFunction()
          .then(function (e) {
            iB(29, c, null, { delta: String(Zh() - d) });
            var f = Te(b, 2, e);
            xB(a.j, f);
            xB(a.G, null != e ? e : null);
          })
          .catch(function (e) {
            iB(28, c, aC(e));
            e = b.gb(Vs(106));
            xB(a.A, e);
          });
      } catch (e) {
        iB(1, c, aC(e)), zB(this.A, b.gb(Vs(107)));
      }
    };
    function aC(a) {
      return "string" === typeof a ? a : a instanceof Error ? a.message : null;
    }
    var bC = function (a, b) {
      NB.call(this, 1028, b);
      this.j = JB(this);
      this.A = LB(this, a);
    };
    v(bC, NB);
    bC.prototype.h = function () {
      var a = this.A.value,
        b = Ne(a, 1);
      null != Me(a, 3) || iB(35, b);
      xB(this.j, a);
    };
    var cC = function (a, b, c, d, e) {
      NB.call(this, 1050, e);
      this.I = c;
      this.G = d;
      this.j = JB(this);
      this.A = LB(this, a);
      this.J = MB(this, b);
    };
    v(cC, NB);
    cC.prototype.h = function () {
      var a = this.A.value,
        b = Ne(a, 1),
        c = this.J.value;
      if (null == c) iB(41, b), a.gb(Vs(111)), xB(this.j, a);
      else if ("string" !== typeof c)
        iB(21, b), (a = a.gb(Vs(113))), xB(this.j, a);
      else {
        if (c.length > (/^(\d+)$/.test(b) ? this.G : this.I)) {
          var d = {};
          iB(12, b, null, ((d.sl = String(c.length)), d));
          b = a.gb(Vs(108));
          Ae(b, 2);
        } else c.length || iB(20, b), Ae(a, 10);
        xB(this.j, a);
      }
    };
    var dC = function (a) {
      NB.call(this, 1046, a);
      this.output = KB(this);
    };
    v(dC, NB);
    dC.prototype.h = function () {
      var a = this;
      jB().then(function () {
        a.output.notify();
      });
    };
    function eC(a, b, c, d, e) {
      var f, g, h, k, n, m, p, u, r, x, B, P, ka;
      return Ka(function (pa) {
        return 1 == pa.g
          ? ((f = new RB()),
            (g = new YB(a, c, e)),
            SB(f, g),
            SB(f, new VB(g.A, void 0, d, e)),
            (h = new bC(g.j, e)),
            SB(f, h),
            (k = new XB(h.j, e)),
            SB(f, k),
            (n = new $B(b, k.j, e)),
            SB(f, n),
            SB(f, new VB(n.A, void 0, d, e)),
            (m = new cC(n.j, n.G, 300, 1e3, e)),
            SB(f, m),
            SB(f, new VB(m.j, void 0, d, e)),
            (p = new dC(e)),
            SB(f, p),
            (u = new ZB(p.output, k.A, e)),
            SB(f, u),
            (r = new $B(b, u.j, e)),
            SB(f, r),
            (x = new VB(r.j, void 0, d, e)),
            SB(f, x),
            UB(f),
            (ka = a),
            Aa(pa, m.j.promise, 2))
          : pa.return({
              id: ka,
              collectorGeneratedData:
                null != (P = null == (B = pa.h) ? void 0 : Ne(B, 2)) ? P : null,
            });
      });
    }
    var fC = function (a, b, c, d) {
      NB.call(this, 1059, d);
      this.I = b;
      this.G = c;
      this.j = JB(this);
      this.J = LB(this, a);
      this.A = MB(this, c);
    };
    v(fC, NB);
    fC.prototype.h = function () {
      var a = this.A.value;
      if (a) {
        var b = this.J.value,
          c = b.id,
          d = b.collectorFunction,
          e;
        b = null != (e = b.networkCode) ? e : c;
        c = {};
        iB(42, b, null, ((c.ea = String(Number(this.I))), c));
        AB(this.j, eC(b, d, a, this.G, this.l));
      }
    };
    var gC = function (a, b) {
      NB.call(this, 1057, b);
      this.j = a;
      this.A = JB(this);
      this.G = JB(this);
    };
    v(gC, NB);
    gC.prototype.h = function () {
      if (this.j)
        if ("object" !== typeof this.j)
          iB(46, "UNKNOWN_COLLECTOR_ID"), hC(this, "UNKNOWN_COLLECTOR_ID", 112);
        else {
          var a = this.j.id,
            b = this.j.networkCode;
          a && b && (delete this.j.id, iB(47, a + ";" + b));
          a = null != b ? b : a;
          "string" !== typeof a
            ? ((b = {}),
              iB(
                37,
                "INVALID_COLLECTOR_ID",
                null,
                ((b.ii = JSON.stringify(a)), b)
              ),
              hC(this, "INVALID_COLLECTOR_ID", 102))
            : "function" !== typeof this.j.collectorFunction
            ? (iB(14, a), hC(this, a, 105))
            : E(oB).g(mu.g, mu.defaultValue).includes(a)
            ? (iB(22, a), hC(this, a, 104))
            : xB(this.G, this.j);
        }
      else iB(39, "UNKNOWN_COLLECTOR_ID"), hC(this, "UNKNOWN_COLLECTOR_ID", 110);
    };
    var hC = function (a, b, c) {
      b = Ys(b).gb(Vs(c));
      xB(a.A, b);
    };
    var iC = function (a, b, c, d, e) {
      var f = document;
      f = void 0 === f ? document : f;
      e = void 0 === e ? QB : e;
      this.g = b;
      this.j = c;
      this.o = f;
      this.K = d;
      this.H = e;
      this.B = [];
      this.A = [];
      this.l = [];
      this.h = 0;
      a = t(a);
      for (b = a.next(); !b.done; b = a.next()) this.push(b.value);
    };
    iC.prototype.push = function (a) {
      var b = this;
      this.j || this.K();
      var c = function (f, g) {
        return void jC(b, f, g);
      };
      a = new gC(a, c);
      var d = new VB(a.A, void 0, this.g, c);
      c = new fC(a.G, this.j, this.g, c, this.H);
      var e = new RB();
      TB(e, [a, d, c]);
      UB(e);
      a = c.j.promise;
      this.B.push(a);
      d = t(this.A);
      for (c = d.next(); !c.done; c = d.next()) a.then(c.value);
    };
    iC.prototype.addOnSignalResolveCallback = function (a) {
      this.A.push(a);
      for (var b = t(this.B), c = b.next(); !c.done; c = b.next())
        c.value.then(a);
    };
    iC.prototype.addErrorHandler = function (a) {
      this.l.push(a);
    };
    iC.prototype.clearAllCache = function () {
      var a = this,
        b =
          this.o.currentScript instanceof HTMLScriptElement
            ? this.o.currentScript.src
            : "";
      if (1 === this.h) {
        var c = {};
        iB(49, "", null, ((c.url = b), c));
      } else if (
        ((c = String(rh(null != b ? b : ""))),
        E(oB).g(lu.g, lu.defaultValue).includes(c))
      )
        (c = {}), iB(48, "", null, ((c.url = b), c));
      else {
        var d = new RB();
        c = new WB(this.g, function (e, f) {
          return void jC(a, e, f);
        });
        SB(d, c);
        UB(d);
        this.h = 1;
        setTimeout(function () {
          a.h = 0;
        }, 1e3 * E(oB).j());
        d = {};
        iB(43, "", null, ((d.url = b), d));
        return c.j.promise;
      }
    };
    var jC = function (a, b, c) {
        a = t(a.l);
        for (var d = a.next(); !d.done; d = a.next()) (d = d.value), d(b, c);
      },
      kC = function (a) {
        this.push = function (b) {
          a.push(b);
        };
        this.addOnSignalResolveCallback = function (b) {
          a.addOnSignalResolveCallback(b);
        };
        this.addErrorHandler = function (b) {
          a.addErrorHandler(b);
        };
        this.clearAllCache = function () {
          a.clearAllCache();
        };
      };
    function lC(a, b, c, d, e, f) {
      f = void 0 === f ? QB : f;
      nh() !== oh()
        ? iB(16, "")
        : (mC(a, "encryptedSignalProviders", c, e) &&
            mC(a, "secureSignalProviders", c, e)) ||
          (iB(38, ""),
          nC(a, "encryptedSignalProviders", b, f, c, d, e),
          nC(a, "secureSignalProviders", b, f, c, function () {}, e));
    }
    function mC(a, b, c, d) {
      if (void 0 === a[b] || a[b] instanceof Array) return !1;
      a = a[b];
      d && a.addOnSignalResolveCallback(d);
      a.addErrorHandler(c);
      return !0;
    }
    function nC(a, b, c, d, e, f, g) {
      var h,
        k = new iC(
          null != (h = a[b]) ? h : [],
          c,
          "secureSignalProviders" === b,
          f,
          d
        );
      a[b] = new kC(k);
      g && k.addOnSignalResolveCallback(g);
      k.addErrorHandler(e);
    }
    function oC(a, b, c, d, e) {
      var f = void 0 === f ? QB : f;
      var g = new yB();
      xB(g, b);
      lC(a, g, c, d, e, f);
    }
    function pC(a, b, c, d) {
      var e = qC,
        f = new Map();
      b = b.map(function (g) {
        var h = g.kc;
        return new Promise(function (k) {
          f.set(h, k);
        });
      });
      oC(a, c, d, e, function (g) {
        var h = g.collectorGeneratedData;
        g = g.id;
        var k;
        return void (null == (k = f.get(g))
          ? void 0
          : k({ collectorGeneratedData: h, id: g }));
      });
      return b;
    }
    function rC() {
      var a;
      return null != (a = w.googletag) ? a : (w.googletag = { cmd: [] });
    }
    function sC(a) {
      if (!a || jA(a)) return null;
      try {
        return window.localStorage;
      } catch (b) {
        return null;
      }
    }
    function tC(a, b) {
      (a = sC(a)) && oC(rC(), a, function () {}, qC, b);
    }
    function uC(a, b) {
      return (b = sC(b)) && 0 !== a.length
        ? pC(rC(), a, b, function () {})
        : null;
    }
    function qC() {}
    var wC = function (a) {
        a = void 0 === a ? !1 : a;
        var b = cA(dA);
        if ((b && Zz(b, "forceCustomPlayback")) || dA.h) return !0;
        if (Fv() && a) return !1;
        a = a && (Fv() || Gv(10)) && dA.getDisableCustomPlaybackForIOS10Plus();
        return ((yc || Ac) && !a) || (xc && (!xc || !Ev(Dv, 4))) || vC()
          ? !0
          : !1;
      },
      xC = function (a) {
        return null === a
          ? !1
          : dA.h
          ? !0
          : Bc || Fv()
          ? Hv(a)
            ? Fv() || (Gv(10) && dA.getDisableCustomPlaybackForIOS10Plus())
              ? !1
              : !0
            : !0
          : (xc && (!xc || !Ev(Dv, 4))) || vC()
          ? !0
          : !1;
      },
      yC = function () {
        var a = cA(dA);
        return a && Zz(a, "disableOnScreenDetection") ? !1 : !Km();
      },
      vC = function () {
        return 1 === zC() || 2 === zC();
      },
      zC = function () {
        if (H(sk))
          switch ((DA.g(), 0)) {
            case 1:
              return 3;
            case 2:
              return 1;
          }
        return (DA.g(), DA.g(), "tvos" === (DA.g(), null)) ? 1 : Lm() ? 2 : 0;
      };
    var AC = function (a, b) {
      return 0 == a.indexOf(b) ? a.substr(b.length) : null;
    };
    function BC() {
      if (Km()) return window.location.href;
      var a = hl(),
        b = a.h,
        c = a.g;
      a = a.j;
      var d = null;
      if (a)
        try {
          var e = iv(a.url),
            f = e.h,
            g = AC(f, "/v/");
          g || (g = AC(f, "/a/"));
          if (!g) throw Error("Can not extract standalone amp url.");
          var h = AC("/" + g, "/s/"),
            k = Yu(e.j);
          k.remove("amp_js_v");
          k.remove("amp_lite");
          var n = h ? iv("https://" + h) : iv("http://" + g);
          Xu(n, k);
          d = n.toString();
        } catch (m) {
          d = null;
        }
      return d ? d : b && b.url ? b.url : c && c.url ? c.url : "";
    }
    function CC() {
      var a = dl();
      a = t(a);
      for (var b = a.next(); !b.done; b = a.next())
        if (((b = b.value), b.url && b.url.includes("amp=1"))) return !0;
      return null != window.context
        ? ((a = Number(window.context.ampcontextVersion)),
          isNaN(a) ? !1 : 0 < Math.floor(a))
        : null != hl().j;
    }
    function DC(a, b, c, d) {
      var e = new sB(),
        f = "",
        g = function (k) {
          try {
            var n = "object" === typeof k.data ? k.data : JSON.parse(k.data);
            f === n.paw_id &&
              (Kf(a, "message", g),
              n.error ? e.reject(Error(n.error)) : e.resolve(d(n)));
          } catch (m) {}
        },
        h = EC(a);
      return h
        ? (Jf(a, "message", g), (f = c(h)), e.promise)
        : (c = FC(a))
        ? ((f = String(Math.floor(2147483647 * ph()))),
          Jf(a, "message", g),
          b(c, f),
          e.promise)
        : null;
    }
    function GC(a) {
      return DC(
        a,
        function (b, c) {
          var d, e;
          return void (null ==
          (d = null != (e = b.getGmaQueryInfo) ? e : b.getGmaSig)
            ? void 0
            : d.postMessage(c));
        },
        function (b) {
          return b.getQueryInfo();
        },
        function (b) {
          return b.signal;
        }
      );
    }
    function HC() {
      var a = window;
      return !!EC(a) || !!FC(a);
    }
    function EC(a) {
      var b;
      if (
        "function" === typeof (null == (b = a.gmaSdk) ? void 0 : b.getQueryInfo)
      )
        return a.gmaSdk;
    }
    function FC(a) {
      var b, c, d, e, f, g;
      if (
        "function" ===
          typeof (null == (b = a.webkit)
            ? void 0
            : null == (c = b.messageHandlers)
            ? void 0
            : null == (d = c.getGmaQueryInfo)
            ? void 0
            : d.postMessage) ||
        "function" ===
          typeof (null == (e = a.webkit)
            ? void 0
            : null == (f = e.messageHandlers)
            ? void 0
            : null == (g = f.getGmaSig)
            ? void 0
            : g.postMessage)
      )
        return a.webkit.messageHandlers;
    }
    var IC = function (a, b) {
        this.timeoutMs = a;
        this.h = b;
        this.signal = null;
        this.g = 0;
      },
      JC = function () {
        return ((H(ck) || H(ek) || H(fk)) && xc) || (H(ak) && (Bc || Fv()));
      },
      KC = function (a) {
        if (HC()) {
          if (H(gk) || ((H(bk) || H(dk)) && xc) || (H(Zj) && (Bc || Fv())))
            return Promise.resolve("0");
          if (H(hk) || JC()) {
            var b;
            return (null != (b = a.h(window)) ? b : Promise.resolve(null)).catch(
              function () {
                return "0";
              }
            );
          }
        }
        return Promise.resolve(null);
      },
      MC = function (a) {
        var b;
        return Ka(function (c) {
          if (1 == c.g) {
            if (!JC()) return c.return(LC(a));
            b = Date.now() - a.g;
            !a.signal || 3e5 < b
              ? (c = Aa(c, LC(a), 3))
              : ((c.g = 2), (c = void 0));
            return c;
          }
          2 != c.g && ((a.signal = c.h), (a.g = Date.now()));
          return c.return(a.signal);
        });
      },
      LC = function (a) {
        var b = H(ek) && xc ? 0 : H(fk) && xc ? 100 : a.timeoutMs;
        return Promise.race([
          KC(a).then(function (c) {
            if (null == c) return null;
            a.signal = 1e4 < c.length ? "0" : c;
            a.g = Date.now();
            return a.signal;
          }),
          Bs(b),
        ]);
      };
    function yi(a, b) {
      return b instanceof RegExp ? "__REGEXP" + b.toString() : b;
    }
    function NC(a, b) {
      return b && 0 === b.toString().indexOf("__REGEXP")
        ? ((a = b.split("__REGEXP")[1].match(/\/(.*)\/(.*)?/)),
          new RegExp(a[1], a[2] || ""))
        : b;
    }
    var OC = function (a, b) {
      QA.call(this, b);
      this.l = a;
      this.g = null;
      this.A = new cw(this);
      this.A.O(C(), "message", this.B);
    };
    v(OC, QA);
    var PC = function (a) {
      if (null == a || "string" !== typeof a || !a.startsWith("ima://"))
        return null;
      a = a.substr(6);
      try {
        return JSON.parse(a, NC);
      } catch (b) {
        return null;
      }
    };
    OC.prototype.sendMessage = function (a, b, c) {
      if (null != this.g && null != this.g.postMessage) {
        var d = this.g,
          e = d.postMessage,
          f = {};
        f.name = a;
        f.type = b;
        null != c && (f.data = c);
        f.sid = this.sessionId;
        f.channel = this.l;
        a = [];
        Ai(new zi(), f, a);
        e.call(d, "ima://" + a.join(""), "*");
      }
      null != this.g && null == this.g.postMessage && X.g().report(11);
    };
    OC.prototype.L = function () {
      pn(this.A);
      this.g = null;
      QA.prototype.L.call(this);
    };
    OC.prototype.B = function (a) {
      a = a.g;
      var b = PC(a.data);
      if (QC(this, b)) {
        if (null === this.g) (this.g = a.source), this.h || this.connect();
        else if (this.g !== a.source) return;
        QC(this, b) &&
          this.dispatchEvent(
            new SA(b.name, b.type, b.data || {}, b.sid, a.origin)
          );
      }
    };
    var QC = function (a, b) {
      if (null == b) return !1;
      var c = b.channel;
      if (null == c || c !== a.l) return !1;
      b = b.sid;
      return null == b || ("*" !== a.sessionId && b !== a.sessionId) ? !1 : !0;
    };
    var RC = function () {
      M.call(this);
      this.F = !1;
      this.g = null;
      this.A = this.D = this.J = !1;
      this.h = 0;
      this.l = [];
      this.B = !1;
      this.U = this.N = Infinity;
      this.j = 0;
      this.G = {};
      this.I = new cw(this);
      rn(this, this.I);
    };
    v(RC, M);
    var TC = function (a, b) {
        null == b || a.F || ((a.g = b), SC(a), (a.F = !0));
      },
      VC = function (a) {
        null != a.g &&
          a.F &&
          (UC(a),
          (a.F = !1),
          (a.D = !1),
          (a.A = !1),
          (a.h = 0),
          (a.l = []),
          (a.B = !1));
      },
      SC = function (a) {
        UC(a);
        !(a.g instanceof M) && "ontouchstart" in document.documentElement && Bc
          ? ((a.G = {
              touchstart: function (b) {
                a.D = !0;
                a.h = b.touches.length;
                a.j && (window.clearTimeout(a.j), (a.j = 0), (a.J = !0));
                a.B = WC(a, b.touches) || 1 !== b.touches.length;
                a.B
                  ? ((a.N = Infinity), (a.U = Infinity))
                  : ((a.N = b.touches[0].clientX), (a.U = b.touches[0].clientY));
                b = b.touches;
                a.l = [];
                for (var c = 0; c < b.length; c++) a.l.push(b[c].identifier);
              },
              touchmove: function (b) {
                a.h = b.touches.length;
                if (
                  !Gv(8) ||
                  Math.pow(b.changedTouches[0].clientX - a.N, 2) +
                    Math.pow(b.changedTouches[0].clientY - a.U, 2) >
                    Math.pow(5, 2)
                )
                  a.A = !0;
              },
              touchend: function (b) {
                return void XC(a, b);
              },
            }),
            Mf(a.G, function (b, c) {
              a.g.addEventListener(c, b, !1);
            }))
          : a.I.O(a.g, "click", a.V);
      },
      UC = function (a) {
        a.I.qb(a.g, "click", a.V);
        Mf(
          a.G,
          function (b, c) {
            this.g.removeEventListener(c, b, !1);
          },
          a
        );
        a.G = {};
      },
      XC = function (a, b) {
        !a.D ||
          1 !== a.h ||
          a.A ||
          a.J ||
          a.B ||
          !WC(a, b.changedTouches) ||
          (a.j = window.setTimeout(function () {
            return void YC(a);
          }, 300));
        a.h = b.touches.length;
        0 === a.h && ((a.D = !1), (a.A = !1), (a.l = []));
        a.J = !1;
      };
    RC.prototype.V = function () {
      YC(this);
    };
    var WC = function (a, b) {
        for (var c = 0; c < b.length; c++)
          if (a.l.includes(b[c].identifier)) return !0;
        return !1;
      },
      YC = function (a) {
        a.j = 0;
        a.dispatchEvent(new ur("click"));
      };
    RC.prototype.L = function () {
      VC(this);
      M.prototype.L.call(this);
    };
    var ZC = function () {
      this.allowStorage = !1;
    };
    var $C = Pz().toString();
    function aD(a) {
      return "number" === typeof a ? a.toString() : "";
    }
    function bD(a) {
      return window.encodeURIComponent(yg(a));
    }
    var cD = function (a, b, c) {
        this.h = c;
        0 === b.length && (b = [[]]);
        this.g = b.map(function (d) {
          d = a.concat(d);
          for (var e = [], f = 0, g = 0; f < d.length; ) {
            var h = d[f++];
            if (128 > h) e[g++] = String.fromCharCode(h);
            else if (191 < h && 224 > h) {
              var k = d[f++];
              e[g++] = String.fromCharCode(((h & 31) << 6) | (k & 63));
            } else if (239 < h && 365 > h) {
              k = d[f++];
              var n = d[f++],
                m = d[f++];
              h =
                (((h & 7) << 18) |
                  ((k & 63) << 12) |
                  ((n & 63) << 6) |
                  (m & 63)) -
                65536;
              e[g++] = String.fromCharCode(55296 + (h >> 10));
              e[g++] = String.fromCharCode(56320 + (h & 1023));
            } else
              (k = d[f++]),
                (n = d[f++]),
                (e[g++] = String.fromCharCode(
                  ((h & 15) << 12) | ((k & 63) << 6) | (n & 63)
                ));
          }
          return new RegExp(e.join(""));
        });
      },
      dD = function (a, b) {
        return b
          ? a.g.some(function (c) {
              c = b.match(c);
              return null == c
                ? !1
                : !a.h ||
                  (1 <= c.length && "3.597.0" === c[1]) ||
                  (2 <= c.length && "3.597.0" === c[2])
                ? !0
                : !1;
            })
          : !1;
      },
      eD = [
        94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105, 109,
        97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105,
        115, 92, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111,
        97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47,
      ],
      fD = [
        94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 115, 48,
        92, 46, 50, 109, 100, 110, 92, 46, 110, 101, 116, 47, 105, 110, 115, 116,
        114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47,
      ],
      gD = [
        94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105, 109,
        97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105,
        115, 92, 46, 99, 111, 109, 47, 112, 97, 108, 47, 115, 100, 107, 108, 111,
        97, 100, 101, 114, 47,
      ],
      hD = [
        [105, 109, 97, 51, 92, 46, 106, 115],
        [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115],
        [105, 109, 97, 51, 95, 101, 97, 112, 46, 106, 115],
      ],
      iD = [
        [
          98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48,
          45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93,
          41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116,
          109, 108,
        ],
        [
          98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48,
          45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 40, 91,
          97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44,
          50, 125, 92, 46, 104, 116, 109, 108,
        ],
        [
          98, 114, 105, 100, 103, 101, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57,
          93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125, 92, 46, 104,
          116, 109, 108,
        ],
      ],
      jD = [
        [111, 117, 116, 115, 116, 114, 101, 97, 109, 92, 46, 106, 115],
        [
          111, 117, 116, 115, 116, 114, 101, 97, 109, 95, 100, 101, 98, 117, 103,
          92, 46, 106, 115,
        ],
      ],
      kD = new cD(eD, hD, !1);
    new cD(eD, iD, !0);
    var lD = new cD(fD, hD, !1);
    new cD(fD, iD, !0);
    var mD = new cD(
        [
          94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 105,
          109, 97, 115, 100, 107, 92, 46, 103, 111, 111, 103, 108, 101, 97, 112,
          105, 115, 92, 46, 99, 111, 109, 47, 112, 114, 101, 114, 101, 108, 101,
          97, 115, 101, 47, 106, 115, 47, 91, 48, 45, 57, 93, 43, 46, 91, 48, 45,
          57, 46, 93, 43, 47,
        ],
        hD,
        !1
      ),
      nD = new cD(
        [
          94, 40, 63, 58, 104, 116, 116, 112, 115, 63, 58, 41, 63, 47, 47, 40,
          112, 97, 103, 101, 97, 100, 50, 124, 116, 112, 99, 41, 92, 46, 103, 111,
          111, 103, 108, 101, 115, 121, 110, 100, 105, 99, 97, 116, 105, 111, 110,
          92, 46, 99, 111, 109, 47, 112, 97, 103, 101, 97, 100, 47, 40, 103, 97,
          100, 103, 101, 116, 115, 124, 106, 115, 41, 47,
        ],
        [],
        !1
      );
    new cD(
      eD,
      [
        [
          100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93,
          43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 40, 91, 97, 45,
          122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125,
          92, 46, 104, 116, 109, 108,
        ],
        [
          100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 91, 48, 45, 57, 93,
          43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117,
          103, 40, 95, 40, 91, 97, 45, 122, 48, 45, 57, 93, 41, 123, 50, 44, 51,
          125, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108,
        ],
        [
          100, 97, 105, 95, 105, 102, 114, 97, 109, 101, 40, 95, 40, 91, 97, 45,
          122, 48, 45, 57, 93, 41, 123, 50, 44, 51, 125, 41, 123, 48, 44, 50, 125,
          92, 46, 104, 116, 109, 108,
        ],
      ],
      !0
    );
    var oD = new cD(eD, jD, !1),
      pD = new cD(eD, jD, !1);
    new cD(gD, [[112, 97, 108, 46, 106, 115]], !1);
    new cD(gD, [[99, 97, 115, 116, 95, 112, 97, 108, 46, 106, 115]], !1);
    function qD(a, b) {
      for (var c = {}, d = 0; d < b.length; c = { Mc: c.Mc }, d++)
        if (
          ((c.Mc = b[d]),
          a.some(
            (function (e) {
              return function (f) {
                return dD(f, e.Mc.src);
              };
            })(c)
          ))
        )
          return c.Mc;
      return null;
    }
    var rD =
      "abort canplay canplaythrough durationchange emptied loadstart loadeddata loadedmetadata progress ratechange seeked seeking stalled suspend waiting".split(
        " "
      );
    var sD = function (a, b) {
      L.call(this);
      this.g = a;
      this.timeoutMs = b;
      rn(this, this.g);
    };
    v(sD, L);
    var uD = function (a) {
        if (!H(tk) || !zu(a.g.caller)) return Promise.resolve(null);
        var b = new sB(),
          c = null;
        a.g.addEventListener(function (e) {
          if (1 === e.pingData.internalErrorState) b.resolve(null);
          else if ("listenerRegistered" === e.eventName)
            (c = e.listenerId),
              1 === e.pingData.applicableSections.length &&
                -1 === e.pingData.applicableSections[0] &&
                b.resolve(new tD("", "-1"));
          else if ("signalStatus" === e.eventName && "ready" === e.data) {
            e = e.pingData;
            var f,
              g = (null != (f = e.applicableSections) ? f : []).join("_");
            b.resolve(new tD(e.gppString, g));
          }
        });
        var d = new Promise(function (e) {
          setTimeout(function () {
            e(null);
          }, a.timeoutMs);
        });
        d = Promise.race([b.promise, d]);
        d.then(function () {
          null !== c && a.g.removeEventListener(c);
        });
        return d;
      },
      tD = function (a, b) {
        this.gppString = a;
        this.sid = b;
      };
    var vD = fa([
        "https://pagead2.googlesyndication.com/omsdk/releases/live/omweb-v1.js",
      ]),
      wD = fa([
        "https://pagead2.googlesyndication.com/omsdk/releases/control/omweb-v1.js",
      ]),
      xD = fa([
        "https://pagead2.googlesyndication.com/omsdk/releases/canary/omweb-v1.js",
      ]),
      yD = fa([
        "https://pagead2.googlesyndication.com/omsdk/releases/experimental/omweb-v1.js",
      ]),
      zD = Th(vD),
      AD = Th(wD),
      BD = Th(xD),
      CD = Th(yD);
    function DD(a) {
      return (a = Tg(a)) && a.omidSessionInterface
        ? a.omidSessionInterface
        : null;
    }
    function ED(a) {
      var b, c, d, e, f, g;
      return Ka(function (h) {
        if (1 == h.g)
          return (
            (b = Pg("IFRAME", {
              sandbox: "allow-scripts allow-same-origin",
              style: "display: none",
            })),
            (c = new Promise(function (k) {
              b.addEventListener("load", function () {
                k();
              });
            })),
            a.appendChild(b),
            Aa(h, c, 2)
          );
        d = Pg("SCRIPT");
        e = zD;
        H(Jj) ? (e = AD) : H(Kj) ? (e = BD) : H(Lj) && (e = CD);
        eh(d, e);
        f = new Promise(function (k, n) {
          d.addEventListener("load", function () {
            DD(b) ? k(b) : n();
          });
        });
        g = b.contentDocument || b.contentWindow.document;
        g.head.appendChild(d);
        return h.return(f);
      });
    }
    var FD = function (a, b) {
      M.call(this);
      this.h = b;
      this.g = DD(a);
    };
    v(FD, M);
    var HD = function (a) {
        try {
          a.g &&
            a.g.registerSessionObserver(function (b) {
              "sessionStart" === b.type
                ? GD(a, a.h)
                : "sessionFinish" === b.type && HD(a);
            });
        } catch (b) {
          a.dispatchEvent(new Event("error"));
        }
      },
      GD = function (a, b) {
        b instanceof lz && (b = b.R);
        var c;
        if ("AUDIO" !== (null == (c = b.tagName) ? void 0 : c.toUpperCase()))
          try {
            a.g && a.g.setVideoElement(b);
          } catch (d) {
            a.dispatchEvent(new Event("error"));
          }
      },
      ID = function (a, b) {
        try {
          a.g && a.g.setSessionClientWindow(b);
        } catch (c) {
          a.dispatchEvent(new Event("error"));
        }
      };
    var JD = function (a) {
      this.data = a;
    };
    l = JD.prototype;
    l.getTotalAds = function () {
      return this.data.totalAds;
    };
    l.getMaxDuration = function () {
      return this.data.maxDuration;
    };
    l.getAdPosition = function () {
      return this.data.adPosition;
    };
    l.getPodIndex = function () {
      return this.data.podIndex;
    };
    l.getTimeOffset = function () {
      return this.data.timeOffset;
    };
    l.getIsBumper = function () {
      return this.data.isBumper;
    };
    JD.prototype.getIsBumper = JD.prototype.getIsBumper;
    JD.prototype.getTimeOffset = JD.prototype.getTimeOffset;
    JD.prototype.getPodIndex = JD.prototype.getPodIndex;
    JD.prototype.getAdPosition = JD.prototype.getAdPosition;
    JD.prototype.getMaxDuration = JD.prototype.getMaxDuration;
    JD.prototype.getTotalAds = JD.prototype.getTotalAds;
    var KD = function (a) {
      this.data = a;
    };
    l = KD.prototype;
    l.getContent = function () {
      return this.data.content;
    };
    l.getContentType = function () {
      return this.data.contentType;
    };
    l.getWidth = function () {
      return this.getSize().width;
    };
    l.getHeight = function () {
      return this.getSize().height;
    };
    l.getAdSlotId = function () {
      return this.data.adSlotId;
    };
    l.getSize = function () {
      return this.data.size;
    };
    l.ce = function () {
      return this.data.resourceType;
    };
    var bB = function (a) {
      return (a = a.data.backupCompanions)
        ? a.map(function (b) {
            return new KD(b);
          })
        : [];
    };
    KD.prototype.getAdSlotId = KD.prototype.getAdSlotId;
    KD.prototype.getHeight = KD.prototype.getHeight;
    KD.prototype.getWidth = KD.prototype.getWidth;
    KD.prototype.getContentType = KD.prototype.getContentType;
    KD.prototype.getContent = KD.prototype.getContent;
    var LD = function (a, b) {
      this.h = a;
      this.g = b;
    };
    LD.prototype.getAdIdValue = function () {
      return this.h;
    };
    LD.prototype.getAdIdRegistry = function () {
      return this.g;
    };
    LD.prototype.getAdIdRegistry = LD.prototype.getAdIdRegistry;
    LD.prototype.getAdIdValue = LD.prototype.getAdIdValue;
    var Y = function (a) {
      this.data = a;
    };
    Y.prototype.getAdId = function () {
      return this.data.adId;
    };
    Y.prototype.getCreativeAdId = function () {
      return this.data.creativeAdId;
    };
    Y.prototype.getCreativeId = function () {
      return this.data.creativeId;
    };
    var MD = function (a) {
      return a.data.adQueryId;
    };
    l = Y.prototype;
    l.getAdSystem = function () {
      return this.data.adSystem;
    };
    l.getAdvertiserName = function () {
      return this.data.advertiserName;
    };
    l.getApiFramework = function () {
      return this.data.apiFramework;
    };
    l.getWrapperAdIds = function () {
      return this.data.adWrapperIds;
    };
    l.getWrapperCreativeIds = function () {
      return this.data.adWrapperCreativeIds;
    };
    l.getWrapperAdSystems = function () {
      return this.data.adWrapperSystems;
    };
    l.isLinear = function () {
      return this.data.linear;
    };
    l.isSkippable = function () {
      return this.data.skippable;
    };
    l.getContentType = function () {
      return this.data.contentType;
    };
    l.getDescription = function () {
      return this.data.description;
    };
    l.getTitle = function () {
      return this.data.title;
    };
    l.getDuration = function () {
      return this.data.duration;
    };
    l.getVastMediaWidth = function () {
      return this.data.vastMediaWidth;
    };
    l.getVastMediaHeight = function () {
      return this.data.vastMediaHeight;
    };
    l.getWidth = function () {
      return this.data.width;
    };
    l.getHeight = function () {
      return this.data.height;
    };
    l.getUiElements = function () {
      return this.data.uiElements;
    };
    l.getMinSuggestedDuration = function () {
      return this.data.minSuggestedDuration;
    };
    l.getAdPodInfo = function () {
      return new JD(this.data.adPodInfo);
    };
    l.getCompanionAds = function (a, b, c) {
      if (!this.data.companions) return [];
      var d = this.data.companions.map(function (e) {
        return new KD(e);
      });
      return aB(
        new YA(
          { size: new A(a, b), ae: c ? "SelectFluid" === c.sizeCriteria : !1 },
          c
        ),
        d
      );
    };
    l.getTraffickingParameters = function () {
      return Uv(yg(this.data.traffickingParameters));
    };
    l.getTraffickingParametersString = function () {
      return this.data.traffickingParameters;
    };
    l.getVastMediaBitrate = function () {
      return this.data.vastMediaBitrate;
    };
    l.getMediaUrl = function () {
      return this.data.mediaUrl;
    };
    l.getSurveyUrl = function () {
      return this.data.surveyUrl;
    };
    l.getDealId = function () {
      return this.data.dealId;
    };
    l.getUniversalAdIds = function () {
      return (this.data.universalAdIds || []).map(function (a) {
        return new LD(a.adIdValue, a.adIdRegistry);
      });
    };
    l.getUniversalAdIdValue = function () {
      return this.data.universalAdIdValue;
    };
    l.getUniversalAdIdRegistry = function () {
      return this.data.universalAdIdRegistry;
    };
    l.getSkipTimeOffset = function () {
      return this.data.skipTimeOffset;
    };
    l.he = function () {
      return this.data.disableUi;
    };
    Y.prototype.isUiDisabled = Y.prototype.he;
    Y.prototype.getSkipTimeOffset = Y.prototype.getSkipTimeOffset;
    Y.prototype.getUniversalAdIdRegistry = Y.prototype.getUniversalAdIdRegistry;
    Y.prototype.getUniversalAdIdValue = Y.prototype.getUniversalAdIdValue;
    Y.prototype.getUniversalAdIds = Y.prototype.getUniversalAdIds;
    Y.prototype.getDealId = Y.prototype.getDealId;
    Y.prototype.getSurveyUrl = Y.prototype.getSurveyUrl;
    Y.prototype.getMediaUrl = Y.prototype.getMediaUrl;
    Y.prototype.getVastMediaBitrate = Y.prototype.getVastMediaBitrate;
    Y.prototype.getTraffickingParametersString =
      Y.prototype.getTraffickingParametersString;
    Y.prototype.getTraffickingParameters = Y.prototype.getTraffickingParameters;
    Y.prototype.getCompanionAds = Y.prototype.getCompanionAds;
    Y.prototype.getAdPodInfo = Y.prototype.getAdPodInfo;
    Y.prototype.getMinSuggestedDuration = Y.prototype.getMinSuggestedDuration;
    Y.prototype.getUiElements = Y.prototype.getUiElements;
    Y.prototype.getHeight = Y.prototype.getHeight;
    Y.prototype.getWidth = Y.prototype.getWidth;
    Y.prototype.getVastMediaHeight = Y.prototype.getVastMediaHeight;
    Y.prototype.getVastMediaWidth = Y.prototype.getVastMediaWidth;
    Y.prototype.getDuration = Y.prototype.getDuration;
    Y.prototype.getTitle = Y.prototype.getTitle;
    Y.prototype.getDescription = Y.prototype.getDescription;
    Y.prototype.getContentType = Y.prototype.getContentType;
    Y.prototype.isSkippable = Y.prototype.isSkippable;
    Y.prototype.isLinear = Y.prototype.isLinear;
    Y.prototype.getWrapperAdSystems = Y.prototype.getWrapperAdSystems;
    Y.prototype.getWrapperCreativeIds = Y.prototype.getWrapperCreativeIds;
    Y.prototype.getWrapperAdIds = Y.prototype.getWrapperAdIds;
    Y.prototype.getApiFramework = Y.prototype.getApiFramework;
    Y.prototype.getAdvertiserName = Y.prototype.getAdvertiserName;
    Y.prototype.getAdSystem = Y.prototype.getAdSystem;
    Y.prototype.getCreativeId = Y.prototype.getCreativeId;
    Y.prototype.getCreativeAdId = Y.prototype.getCreativeAdId;
    Y.prototype.getAdId = Y.prototype.getAdId;
    var ND = function (a) {
      this.g = a;
    };
    ND.prototype.getCuePoints = function () {
      return this.g;
    };
    ND.prototype.getCuePoints = ND.prototype.getCuePoints;
    var PD = function () {
        this.useLearnMoreButton = this.disableUi = this.disableClickThrough = !1;
        this.autoAlign = this.useVideoAdUi = !0;
        this.bitrate = -1;
        this.enablePreloading = !1;
        this.loadVideoTimeout = OD;
        this.mimeTypes = null;
        this.playAdsAfterTime = -1;
        this.restoreCustomPlaybackStateOnAdBreakComplete = !1;
        this.uiElements = null;
        this.useStyledNonLinearAds = this.useStyledLinearAds = !1;
      },
      QD = function (a, b) {
        var c = {};
        Object.assign(c, a);
        b && (c.disableClickThrough = !0);
        return c;
      };
    PD.prototype.append = function (a) {
      if (a) {
        var b = a.autoAlign;
        null != b && (this.autoAlign = b);
        b = Dg(a.bitrate);
        "number" === typeof b && !isNaN(b) && 0 < b && (this.bitrate = b);
        this.disableClickThrough =
          a.disableClickThrough || this.disableClickThrough;
        this.disableUi = a.disableUi || this.disableUi;
        this.enablePreloading = a.enablePreloading || this.enablePreloading;
        (b = a.mimeTypes) && 0 !== b.length && (this.mimeTypes = b);
        b = Dg(a.playAdsAfterTime);
        "number" === typeof b &&
          !isNaN(b) &&
          0 < b &&
          (this.playAdsAfterTime = b);
        this.restoreCustomPlaybackStateOnAdBreakComplete =
          a.restoreCustomPlaybackStateOnAdBreakComplete ||
          this.restoreCustomPlaybackStateOnAdBreakComplete;
        b = Dg(a.loadVideoTimeout);
        "number" === typeof b &&
          !isNaN(b) &&
          0 < b &&
          (this.loadVideoTimeout = b);
        this.uiElements = a.uiElements || this.uiElements;
        this.useLearnMoreButton = a.useLearnMoreButton || this.useLearnMoreButton;
        this.useStyledLinearAds = a.useStyledLinearAds || this.useStyledLinearAds;
        this.useStyledNonLinearAds =
          a.useStyledNonLinearAds || this.useStyledNonLinearAds;
        this.useVideoAdUi = !1 === a.useVideoAdUi ? !1 : this.useVideoAdUi;
      }
    };
    y(
      "module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ads_rendering_settings.AdsRenderingSettings.AUTO_SCALE",
      -1
    );
    var OD = H(kk) ? 4e3 : H(lk) ? 6500 : H(mk) ? 12e3 : 8e3;
    var SD = function (a, b, c) {
      L.call(this);
      this.A = a;
      this.l = b;
      this.o = c;
      this.g = this.j = this.h = null;
      a = new cw(this);
      rn(this, a);
      RD(this);
    };
    v(SD, L);
    var TD = function (a, b) {
        a.h = b;
        a.g && a.h && ID(a.g, a.h);
      },
      RD = function (a) {
        ED(a.A)
          .then(function (b) {
            return void UD(a, b);
          })
          .catch(function () {
            return void VD(a);
          });
      },
      UD = function (a, b) {
        a.j = b;
        a.g = new FD(b, a.o);
        a.g.O("error", function () {
          return void VD(a);
        });
        HD(a.g);
        a.g && a.h && ID(a.g, a.h);
      },
      VD = function (a) {
        RA(a.l, "omid", "iframeFailed");
        a.W();
      };
    SD.prototype.L = function () {
      this.j && (Qg(this.j), (this.j = null));
      L.prototype.L.call(this);
    };
    var WD = function (a, b, c, d) {
      L.call(this);
      this.o = a;
      this.j = b;
      this.g = c;
      this.B = d;
      this.h = new cw(this);
      rn(this, this.h);
      this.h.O(this.o, d, this.A);
    };
    v(WD, L);
    var XD = function (a, b) {
      var c = b.qa;
      switch (b.messageType) {
        case "showVideo":
          a.j.Pc();
          break;
        case "hide":
          a.j.ab();
          break;
        case "resizeAndPositionVideo":
          b = c.resizeAndPositionVideo;
          a.j.ud(new Ah(b.x, b.y, b.width, b.height));
          break;
        case "restoreSizeAndPositionVideo":
          a.j.wd();
      }
    };
    WD.prototype.A = function (a) {
      var b = a.qa;
      switch (a.messageType) {
        case "activate":
          this.j.cc(this.g);
          break;
        case "startTracking":
          a = this.g;
          var c = this.l;
          this.h.O(a, Qf(Lw), c);
          this.h.O(a, rD, c);
          a = this.g;
          YD(a);
          a.h.O(a.g, rD, a.Na);
          a.h.O(a.g, "ended", a.Kf);
          a.h.O(a.g, "webkitbeginfullscreen", a.tb);
          a.h.O(a.g, "webkitendfullscreen", a.ba);
          a.h.O(a.g, "loadedmetadata", a.Mf);
          a.h.O(a.g, "pause", a.Of);
          a.h.O(a.g, "playing", a.je);
          a.h.O(a.g, "timeupdate", a.Pf);
          a.h.O(a.g, "volumechange", a.Rf);
          a.h.O(a.g, "error", a.X);
          a.h.O(a.g, Pc || (Bc && !Gv(8)) ? "loadeddata" : "canplay", a.Lf);
          a.l = new RC();
          a.h.O(a.l, "click", a.ma);
          TC(a.l, a.g);
          a.F = new zs(1e3);
          a.h.O(a.F, "tick", a.Fa);
          a.F.start();
          break;
        case "stopTracking":
          a = this.g;
          c = this.l;
          this.h.qb(a, Qf(Lw), c);
          this.h.qb(a, rD, c);
          YD(this.g);
          break;
        case "exitFullscreen":
          a = this.g;
          (yc || Ac) &&
            a.g.webkitDisplayingFullscreen &&
            a.g.webkitExitFullscreen();
          break;
        case "play":
          ZD(this.g);
          break;
        case "pause":
          this.g.pause();
          break;
        case "load":
          a = this.g;
          c = b.videoUrl;
          var d = b.muxedMediaUrl,
            e = b.muxedMimeType,
            f = b.muxedAudioCodec,
            g = b.muxedVideoCodec,
            h = b.demuxedAudioUrl,
            k = b.demuxedVideoUrl,
            n = b.demuxedAudioMimeType,
            m = b.demuxedVideoMimeType,
            p = b.demuxedAudioCodec,
            u = b.demuxedVideoCodec;
          b = b.mseCompatible;
          var r = null;
          k &&
            h &&
            b &&
            m &&
            n &&
            u &&
            p &&
            (r = new vu({
              kg: k,
              cf: h,
              gi: null,
              Uh: null,
              jg: m,
              bf: n,
              ib: u,
              Wa: p,
              height: null,
              width: null,
              Ca: b,
              fi: null,
              Th: null,
            }));
          h = null;
          d &&
            e &&
            g &&
            f &&
            (h = new wu({
              If: d,
              Ab: null,
              mimeType: e,
              ib: g,
              Wa: f,
              height: null,
              width: null,
              Ca: b,
              Zh: null,
            }));
          r ? a.load(c, r) : h ? a.load(c, h) : a.load(c, null);
          break;
        case "unload":
          a = this.g;
          $D(a);
          a.U = !1;
          "removeAttribute" in a.g ? a.g.removeAttribute("src") : (a.g.src = "");
          a.g.load();
          break;
        case "setCurrentTime":
          this.g.g.currentTime = b.currentTime;
          break;
        case "setVolume":
          this.g.setVolume(b.volume);
      }
    };
    WD.prototype.l = function (a) {
      var b = {};
      switch (a.type) {
        case "autoplayDisallowed":
          a = "autoplayDisallowed";
          break;
        case "beginFullscreen":
          a = "fullscreen";
          break;
        case "endFullscreen":
          a = "exitFullscreen";
          break;
        case "click":
          a = "click";
          break;
        case "end":
          a = "end";
          break;
        case "error":
          a = "error";
          break;
        case "loaded":
          a = "loaded";
          break;
        case "mediaLoadTimeout":
          a = "mediaLoadTimeout";
          break;
        case "pause":
          a = "pause";
          b.ended = this.g.g.ended;
          break;
        case "play":
          a = "play";
          break;
        case "skip":
          a = "skip";
          break;
        case "start":
          a = "start";
          b.volume = this.g.getVolume();
          break;
        case "timeUpdate":
          a = "timeupdate";
          b.currentTime = this.g.getCurrentTime();
          b.duration = this.g.getDuration();
          break;
        case "volumeChange":
          a = "volumeChange";
          b.volume = this.g.getVolume();
          break;
        case "loadedmetadata":
          a = a.type;
          b.duration = this.g.getDuration();
          break;
        case "abort":
        case "canplay":
        case "canplaythrough":
        case "durationchange":
        case "emptied":
        case "loadstart":
        case "loadeddata":
        case "progress":
        case "ratechange":
        case "seeked":
        case "seeking":
        case "stalled":
        case "suspend":
        case "waiting":
          a = a.type;
          break;
        default:
          return;
      }
      RA(this.o, this.B, a, b);
    };
    var aE = function (a, b) {
      L.call(this);
      this.h = b;
      this.g = null;
      this.j = new WD(a, b, this.h.da, "videoDisplay1");
      rn(this, this.j);
      var c = this.h.za;
      null != c &&
        ((this.g = new WD(a, b, c, "videoDisplay2")), rn(this, this.g));
    };
    v(aE, L);
    var bE = function (a, b, c, d) {
      var e = wh("IFRAME");
      e.id = b;
      e.name = b;
      e.width = String(c);
      e.height = String(d);
      e.allowTransparency = "true";
      e.scrolling = "no";
      e.marginWidth = "0";
      e.marginHeight = "0";
      e.frameBorder = "0";
      e.style.border = "0";
      e.style.verticalAlign = "bottom";
      e.src = "about:blank";
      e.setAttribute("role", "region");
      e.setAttribute("aria-label", "Advertisement");
      e.title = "3rd party ad content";
      e.tabIndex = 0;
      a.appendChild(e);
      return e;
    };
    function cE(a) {
      return sg(null === a ? "null" : void 0 === a ? "undefined" : a);
    }
    function dE() {
      var a,
        b,
        c,
        d = C();
      d = void 0 === d ? window : d;
      d = (null != (c = void 0 === d ? null : d) ? c : window).googletag;
      c = (null == d ? 0 : d.apiReady) ? d : void 0;
      return null !=
        (b =
          null == c ? void 0 : null == (a = c.companionAds) ? void 0 : a.call(c))
        ? b
        : null;
    }
    function eE(a) {
      var b = {};
      b.slotId = a.getSlotId().getId();
      var c = [];
      a = t(a.getSizes() || []);
      for (var d = a.next(); !d.done; d = a.next())
        if (((d = d.value), "string" !== typeof d)) {
          var e = {};
          c.push(((e.adWidth = d.getWidth()), (e.adHeight = d.getHeight()), e));
        } else "fluid" === d && ((d = {}), c.push(((d.fluidSize = !0), d)));
      return (b.adSizes = c), b;
    }
    function fE(a) {
      var b = dE();
      if (b && a && Array.isArray(a)) {
        var c = new Map(
          b.getSlots().map(function (u) {
            return [u.getSlotId().getId(), u];
          })
        );
        a = t(a);
        for (var d = a.next(); !d.done; d = a.next()) {
          var e = d.value,
            f = c.get(e.slotId);
          if (f && !b.isSlotAPersistentRoadblock(f)) {
            var g = e.adContent;
            if (g && (d = Hg(f.getSlotId().getDomId()))) {
              d.style.display = "";
              var h = e.adWidth,
                k = e.adHeight;
              e.fluidSize && ((k = zm(d)), (h = k.width), (k = k.height));
              d.textContent = "";
              if (e.friendlyIframeRendering)
                try {
                  var n = "google_companion_" + f.getSlotId().getId(),
                    m = bE(d, n, h, k),
                    p = m.contentWindow
                      ? m.contentWindow.document
                      : m.contentDocument;
                  uc && p.open("text/html", "replace");
                  fh(p, cE(g));
                  p.close();
                } catch (u) {}
              else
                dh(d, cE(g)),
                  (d.style.width = h + "px"),
                  (d.style.height = k + "px");
              b.slotRenderEnded(f, h, k);
              (e = e.onAdContentSet) && e(d);
            }
          }
        }
      }
    }
    var gE = function (a, b, c, d, e, f) {
      SA.call(this, a, b, c, d, e);
      this.g = f;
    };
    v(gE, SA);
    var hE = function (a, b) {
      M.call(this);
      this.messageName = a;
      this.l = b;
      this.g = {};
      this.h = new cw(this);
      rn(this, this.h);
      this.h.O(C(), "message", this.j);
    };
    v(hE, M);
    var iE = function (a, b) {
        var c = b.g;
        a.g.hasOwnProperty(c) && RA(a.g[c], b.type, b.messageType, b.qa);
      },
      jE = function (a, b, c, d) {
        a.g.hasOwnProperty(b) ||
          ((c = new OC(b, c)),
          a.h.O(c, a.messageName, function (e) {
            this.dispatchEvent(
              new gE(e.type, e.messageType, e.qa, e.sessionId, e.origin, b)
            );
          }),
          (c.g = d),
          c.connect(),
          (a.g[b] = c));
      };
    hE.prototype.L = function () {
      for (var a = t(Object.values(this.g)), b = a.next(); !b.done; b = a.next())
        pn(b.value);
      M.prototype.L.call(this);
    };
    hE.prototype.j = function (a) {
      a = a.g;
      var b = PC(a.data);
      if (null != b) {
        var c = b.channel;
        if (this.l && !this.g.hasOwnProperty(c)) {
          var d = b.sid;
          jE(this, c, d, a.source);
          this.dispatchEvent(
            new gE(b.name, b.type, b.data || {}, d, a.origin, c)
          );
        }
      }
    };
    function kE() {
      return !!Ra("googletag.cmd", C());
    }
    function lE() {
      var a = Ra("googletag.console", C());
      return null != a ? a : null;
    }
    var mE = function () {
      cw.call(this);
      this.g = null;
      this.j = new hE("gpt", !0);
      rn(this, this.j);
      this.O(this.j, "gpt", this.A);
      kE() ||
        C().top === C() ||
        ((this.g = new hE("gpt", !1)),
        rn(this, this.g),
        this.O(this.g, "gpt", this.l));
    };
    v(mE, cw);
    mE.prototype.A = function (a) {
      var b = a.origin,
        c = "//imasdk.googleapis.com".match(Xg);
      b = b.match(Xg);
      if (c[3] == b[3] && c[4] == b[4])
        if (null != this.g)
          jE(this.g, a.g, a.sessionId, C().parent),
            null != this.g && iE(this.g, a);
        else if (((c = a.qa), null != c && void 0 !== c.scope)) {
          b = c.scope;
          c = c.args;
          var d;
          if ("proxy" === b) {
            var e = a.messageType;
            "isGptPresent" === e
              ? (d = kE())
              : "isConsolePresent" === e && (d = null != lE());
          } else if (kE())
            if ("pubads" === b || "companionAds" === b) {
              d = a.messageType;
              var f = C().googletag;
              if (
                null != f &&
                null != f[b] &&
                ((b = f[b]()), null != b && ((d = b[d]), null != d))
              )
                try {
                  e = d.apply(b, c);
                } catch (g) {}
              d = e;
            } else if ("console" === b) {
              if (((e = lE()), null != e && ((b = e[a.messageType]), null != b)))
                try {
                  b.apply(e, c);
                } catch (g) {}
            } else
              null === b &&
                ((e = a.messageType),
                "googleGetCompanionAdSlots" === e
                  ? (e = dE())
                    ? ((e = e.getSlots().map(eE)), (d = e.length ? e : null))
                    : (d = null)
                  : ("googleSetCompanionAdContents" === e &&
                      fE(null == c ? void 0 : c[0]),
                    (d = null)));
          void 0 !== d && ((a.qa.returnValue = d), iE(this.j, a));
        }
    };
    mE.prototype.l = function (a) {
      iE(this.j, a);
    };
    var nE = function (a, b) {
      if (a.g) {
        var c = a.g;
        pn(c.g[b]);
        delete c.g[b];
      }
      a.j && ((a = a.j), pn(a.g[b]), delete a.g[b]);
    };
    var pE = function (a, b) {
        var c = Array.prototype.slice.call(arguments),
          d = c.shift();
        if ("undefined" == typeof d)
          throw Error("[goog.string.format] Template required");
        return d.replace(
          /%([0\- \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g,
          function (e, f, g, h, k, n, m, p) {
            if ("%" == n) return "%";
            var u = c.shift();
            if ("undefined" == typeof u)
              throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = u;
            return oE[n].apply(null, arguments);
          }
        );
      },
      oE = {
        s: function (a, b, c) {
          return isNaN(c) || "" == c || a.length >= Number(c)
            ? a
            : (a =
                -1 < b.indexOf("-", 0)
                  ? a + xg(" ", Number(c) - a.length)
                  : xg(" ", Number(c) - a.length) + a);
        },
        f: function (a, b, c, d, e) {
          d = a.toString();
          isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
          var f =
            0 > Number(a)
              ? "-"
              : 0 <= b.indexOf("+")
              ? "+"
              : 0 <= b.indexOf(" ")
              ? " "
              : "";
          0 <= Number(a) && (d = f + d);
          if (isNaN(c) || d.length >= Number(c)) return d;
          d = isNaN(e)
            ? Math.abs(Number(a)).toString()
            : Math.abs(Number(a)).toFixed(e);
          a = Number(c) - d.length - f.length;
          return (d =
            0 <= b.indexOf("-", 0)
              ? f + d + xg(" ", a)
              : f + xg(0 <= b.indexOf("0", 0) ? "0" : " ", a) + d);
        },
        d: function (a, b, c, d, e, f, g, h) {
          return oE.f(parseInt(a, 10), b, c, d, 0, f, g, h);
        },
      };
    oE.i = oE.d;
    oE.u = oE.d;
    function qE() {
      return ["autoplay", "attribution-reporting"]
        .filter(function (a) {
          var b = document.featurePolicy;
          return (
            void 0 !== b &&
            "function" == typeof b.allowedFeatures &&
            "object" == typeof b.allowedFeatures() &&
            b.allowedFeatures().includes(a)
          );
        })
        .join(";");
    }
    var sE = function (a, b) {
      M.call(this);
      this.D = b;
      this.J = this.I = null;
      this.G = !1;
      this.F = "goog_" + zg++;
      this.A = new Map();
      this.h = null;
      var c = C();
      var d = Ra("google.ima.gptProxyInstance", c);
      null != d
        ? (c = d)
        : ((d = new mE()), y("google.ima.gptProxyInstance", d, c), (c = d));
      this.V = c;
      this.B = null;
      this.j = new cw(this);
      rn(this, this.j);
      c = this.F;
      d =
        (th() ? "https:" : "http:") +
        pE(
          "//cdn.jsdelivr.net/gh/react-4-smart-tv/ima-smart-tv/iframe.html",
          dA.getLocale()
        );
      a: {
        var e = window;
        try {
          do {
            try {
              if (
                0 === e.location.href.indexOf(d) ||
                0 === e.document.referrer.indexOf(d)
              ) {
                var f = !0;
                break a;
              }
            } catch (k) {}
            e = e.parent;
          } while (e !== e.top);
        } catch (k) {}
        f = !1;
      }
      f && (d += "?f=" + c);
      f = window.document;
      if (Dh.length && f.head) {
        e = t(Dh);
        for (var g = e.next(); !g.done; g = e.next())
          if ((g = g.value) && f.head) {
            var h = wh("META");
            f.head.appendChild(h);
            h.httpEquiv = "origin-trial";
            h.content = g;
          }
      }
      f = qE();
      c = Pg("IFRAME", {
        src: d + "#" + c,
        allowFullscreen: !0,
        allow: f,
        id: c,
        style:
          "border:0; opacity:0; margin:0; padding:0; position:relative; color-scheme: light;",
      });
      this.j.Qb(c, "load", this.aa);
      a.appendChild(c);
      this.g = c;
      this.l = rE(this);
      this.N = new aE(this.l, this.D);
      rn(this, this.N);
      this.D.da && this.j.O(this.l, "displayContainer", this.U);
      this.j.O(this.l, "mouse", this.X);
      this.j.O(this.l, "touch", this.Z);
      vC() || ((this.B = new SD(a, this.l, b.da.N.g)), rn(this, this.B));
    };
    v(sE, M);
    var rE = function (a, b) {
      b = void 0 === b ? "*" : b;
      var c = a.A.get(b);
      null == c &&
        ((c = new OC(a.F, b)),
        a.G && ((c.g = Tg(a.g)), c.connect()),
        a.A.set(b, c));
      return c;
    };
    sE.prototype.cc = function (a) {
      var b;
      null != (b = this.B) &&
        ((a = a.N.g), (b.o = a), b.g && ((b = b.g), (b.h = a), GD(b, a)));
    };
    sE.prototype.L = function () {
      null !== this.h && (this.h.W(), (this.h = null));
      this.A.forEach(function (a) {
        pn(a);
      });
      this.A.clear();
      nE(this.V, this.F);
      Qg(this.g);
      M.prototype.L.call(this);
    };
    sE.prototype.X = function (a) {
      var b = a.qa,
        c = rm(this.g),
        d = document.createEvent("MouseEvent");
      d.initMouseEvent(
        a.messageType,
        !0,
        !0,
        window,
        b.detail,
        b.screenX,
        b.screenY,
        b.clientX + c.x,
        b.clientY + c.y,
        b.ctrlKey,
        b.altKey,
        b.shiftKey,
        b.metaKey,
        b.button,
        null
      );
      this.g.dispatchEvent(d);
    };
    var tE = function (a, b) {
      var c = rm(a.g),
        d = !!("TouchEvent" in window && 0 < TouchEvent.length);
      b = b.map(function (f) {
        return d
          ? new Touch({
              identifier: f.identifier,
              target: a.g,
              clientX: f.clientX,
              clientY: f.clientY,
              screenX: f.screenX,
              screenY: f.screenY,
              pageX: f.pageX + c.x,
              pageY: f.pageY + c.y,
            })
          : document.createTouch(
              window,
              a.g,
              f.identifier,
              f.pageX + c.x,
              f.pageY + c.y,
              f.screenX,
              f.screenY
            );
      });
      if (d) return b;
      var e;
      return null == (e = document.createTouchList)
        ? void 0
        : e.apply(document, b);
    };
    sE.prototype.Z = function (a) {
      var b = a.qa,
        c = rm(this.g);
      if ("TouchEvent" in window && 0 < TouchEvent.length)
        (b = {
          bubbles: !0,
          cancelable: !0,
          view: window,
          detail: b.detail,
          ctrlKey: b.ctrlKey,
          altKey: b.altKey,
          shiftKey: b.shiftKey,
          metaKey: b.metaKey,
          touches: tE(this, b.touches),
          targetTouches: tE(this, b.targetTouches),
          changedTouches: tE(this, b.changedTouches),
        }),
          (a = new TouchEvent(a.messageType, b)),
          this.g.dispatchEvent(a);
      else {
        var d = document.createEvent("TouchEvent");
        d.initTouchEvent(
          a.messageType,
          !0,
          !0,
          window,
          b.detail,
          b.screenX,
          b.screenY,
          b.clientX + c.x,
          b.clientY + c.y,
          b.ctrlKey,
          b.altKey,
          b.shiftKey,
          b.metaKey,
          tE(this, b.touches),
          tE(this, b.targetTouches),
          tE(this, b.changedTouches),
          b.scale,
          b.rotation
        );
        this.g.dispatchEvent(d);
      }
    };
    sE.prototype.U = function (a) {
      switch (a.messageType) {
        case "showVideo":
          null == this.h
            ? ((this.h = new RC()), this.j.O(this.h, "click", this.ba))
            : VC(this.h);
          TC(this.h, this.D.Jb());
          break;
        case "hide":
          null !== this.h && (this.h.W(), (this.h = null));
      }
      var b = this.N;
      XD(b.j, a);
      b.g && XD(b.g, a);
    };
    sE.prototype.ba = function () {
      RA(this.l, "displayContainer", "videoClick");
    };
    sE.prototype.aa = function () {
      this.I = bi();
      this.J = Zh();
      var a = Tg(this.g);
      this.A.forEach(function (c) {
        c.g = a;
        c.connect();
      });
      var b;
      null == (b = this.B) || TD(b, a);
      this.G = !0;
    };
    var uE = fa(["https://s0.2mdn.net/instream/video/client.js"]),
      vE = null,
      wE = function () {
        M.call(this);
        this.g = null;
        this.h = new Map();
        this.j = new Map();
        this.ta = this.B = !1;
        this.l = null;
        this.A = new cw(this);
        rn(this, this.A);
      };
    v(wE, M);
    var xE = function () {
        null == vE && (vE = new wE());
        return vE;
      },
      lr = function (a, b, c) {
        var d = {};
        d.queryId = b;
        d.viewabilityData = c;
        a.g && RA(a.g, "activityMonitor", "viewabilityMeasurement", d);
      };
    wE.prototype.destroy = function () {
      this.A.qb(this.g, "activityMonitor", this.D);
      this.ta = !1;
      this.h.clear();
    };
    wE.prototype.L = function () {
      this.destroy();
      M.prototype.L.call(this);
    };
    wE.prototype.init = function (a) {
      if (!this.ta) {
        if ((this.g = a || null))
          this.A.O(this.g, "activityMonitor", this.D), yE(this);
        if (
          !(
            w.ima &&
            w.ima.video &&
            w.ima.video.client &&
            w.ima.video.client.tagged
          )
        ) {
          y("ima.video.client.sdkTag", !0);
          var b = w.document;
          a = Ng(document, "SCRIPT");
          var c = Th(uE);
          eh(a, c);
          a.async = !0;
          a.type = "text/javascript";
          b = b.getElementsByTagName("script")[0];
          b.parentNode.insertBefore(a, b);
        }
        Uk();
        E(br).G = dA.g;
        this.B = !0;
        E(br).j = !0;
        this.l = null;
        a = E(br);
        b = "h" == Nq(a) || "b" == Nq(a);
        c = !(J(), !1);
        b && c && ((a.K = !0), (a.F = new hp()));
        this.ta = !0;
      }
    };
    var AE = function (a) {
        if (null == a) return !1;
        if ((yc || Ac) && null !== a.webkitDisplayingFullscreen)
          return a.webkitDisplayingFullscreen;
        a = zE(a);
        var b = window.screen.availHeight || window.screen.height;
        return (
          0 >= (window.screen.availWidth || window.screen.width) - a.width &&
          42 >= b - a.height
        );
      },
      zE = function (a) {
        var b = {
          left: a.offsetLeft,
          top: a.offsetTop,
          width: a.offsetWidth,
          height: a.offsetHeight,
        };
        try {
          "function" === typeof a.getBoundingClientRect &&
            Sg(Fg(a), a) &&
            (b = a.getBoundingClientRect());
        } catch (c) {}
        return b;
      },
      BE = function (a, b, c, d, e) {
        e = void 0 === e ? {} : e;
        if (a.ta) {
          d && null == e.opt_osdId && (e.opt_osdId = d);
          if (a.l) return a.l(b, c, e);
          if ((a = d ? a.j.get(d) : dA.j))
            null == e.opt_fullscreen && (e.opt_fullscreen = AE(a)),
              null == e.opt_adElement && (e.opt_adElement = a);
          return ot.ob(469, bb(or, b, c, e)) || {};
        }
        return {};
      },
      CE = function (a) {
        var b;
        0 !== dA.g ? (b = E(br).j) : (b = a.B);
        return b;
      },
      DE = function (a, b) {
        var c = String(Math.floor(1e9 * Math.random()));
        a.j.set(c, b);
        if (H(Tj))
          try {
            Ts(
              function (d) {
                if (a.g) {
                  var e = {};
                  e.engagementString = d;
                  RA(a.g, "activityMonitor", "engagementData", e);
                }
              },
              function () {
                return b;
              }
            );
          } catch (d) {}
        0 !== dA.g && mr(E(br), c, a);
        return c;
      },
      EE = function (a, b, c) {
        if (c) a.h.get(c) === b && a.h.delete(c);
        else {
          var d = [];
          a.h.forEach(function (e, f) {
            e === b && d.push(f);
          });
          d.forEach(a.h.delete, a.h);
        }
      },
      hr = function (a, b) {
        a = a.h.get(b);
        return "function" === typeof a ? a() : {};
      },
      yE = function (a) {
        if ("function" === typeof window.Goog_AdSense_Lidar_getUrlSignalsArray) {
          var b = {};
          b.pageSignals = window.Goog_AdSense_Lidar_getUrlSignalsArray();
          var c;
          null == (c = a.g) || RA(c, "activityMonitor", "pageSignals", b);
        }
      };
    wE.prototype.D = function (a) {
      var b = a.qa,
        c = b.queryId,
        d = {},
        e = null;
      d.eventId = b.eventId;
      switch (a.messageType) {
        case "getPageSignals":
          yE(this);
          break;
        case "reportVastEvent":
          e = b.vastEvent;
          a = b.osdId;
          var f = {};
          f.opt_fullscreen = b.isFullscreen;
          b.isOverlay && (f.opt_bounds = b.overlayBounds);
          d.viewabilityData = BE(this, e, c, a, f);
          var g;
          null == (g = this.g) || RA(g, "activityMonitor", "viewability", d);
          break;
        case "fetchAdTagUrl":
          (c = {}),
            (c.eventId = b.eventId),
            (a = b.osdId),
            Tf(b, "isFullscreen") && (e = b.isFullscreen),
            Tf(b, "loggingId") &&
              ((b = b.loggingId),
              (c.loggingId = b),
              X.g().report(43, {
                step: "beforeLookup",
                logid: b,
                time: Date.now(),
              })),
            (c.engagementString = FE(this, a, e)),
            this.g && RA(this.g, "activityMonitor", "engagement", c);
      }
    };
    var FE = function (a, b, c) {
      var d,
        e = b ? (null != (d = a.j.get(b)) ? d : null) : dA.j;
      a = {};
      null != c && (a.fullscreen = c);
      c = "";
      try {
        c = Ss(function () {
          return e;
        }, a);
      } catch (f) {
        (c = f), (c = "sdktle;" + wg(c.name, 12) + ";" + wg(c.message, 40));
      }
      return c;
    };
    y("ima.common.getVideoMetadata", function (a) {
      return hr(xE(), a);
    });
    y("ima.common.triggerViewabilityMeasurementUpdate", function (a, b) {
      lr(xE(), a, b);
    });
    var GE = function (a) {
        this.g = a;
        this.j = "";
        this.h = -1;
        this.o = !1;
      },
      IE = function (a, b) {
        if (0 <= a.h) {
          var c = null == b ? function () {} : b,
            d = function () {
              HE(a, c);
              a.g.removeEventListener("loadedmetadata", d, !1);
            };
          a.g.addEventListener("loadedmetadata", d, !1);
          a.g.src = a.j;
          a.g.load();
        } else null != b && b();
      },
      HE = function (a, b) {
        var c = 0 < a.g.seekable.length;
        a.o
          ? c
            ? ((a.g.currentTime = a.h), JE(a), b())
            : setTimeout(function () {
                return void HE(a, b);
              }, 100)
          : (JE(a), b());
      },
      JE = function (a) {
        a.h = -1;
        a.j = "";
        a.o = !1;
      };
    var KE = new A(5, 5),
      LE = function (a) {
        M.call(this);
        this.g = a;
        this.l = this.aa = null;
        this.B = 0;
        this.I = this.D = this.U = this.loaded = this.G = !1;
        this.V = this.F = this.J = this.j = null;
        this.Z = !1;
        this.A = null;
        this.N = new GE(a);
        this.h = new cw(this);
        rn(this, this.h);
        this.size = this.getSize();
        this.fullscreen = AE(this.g);
      };
    v(LE, M);
    l = LE.prototype;
    l.Md = function () {
      var a = this.N;
      a.j = a.g.currentSrc;
      a.o = 0 < a.g.seekable.length;
      a.h = a.g.ended ? -1 : a.g.currentTime;
    };
    l.ac = function (a) {
      IE(this.N, a);
    };
    l.load = function (a, b) {
      var c = F.g().g;
      c.X = !0;
      li(c);
      vi("hvd_lc");
      $D(this);
      this.U = !1;
      if (b)
        if ((vi("hvd_ad"), b instanceof wu)) {
          if ((vi("hvd_mad"), (c = b.getMediaUrl()))) {
            vi("hvd_admu");
            vi("hvd_src");
            this.g.src = c;
            this.g.load();
            return;
          }
        } else if (b instanceof vu) {
          vi("hvd_dad");
          c = b.o;
          var d = b.h,
            e = b.j,
            f = b.g,
            g = b.ib,
            h = b.Wa;
          if (c && d && e && f && g && h && (vi("hvd_addu"), b.Ca)) {
            vi("hvd_admse");
            b = e + '; codecs="' + g + '"';
            f = f + '; codecs="' + h + '"';
            if (
              sy() &&
              sy() &&
              MediaSource.isTypeSupported(b) &&
              sy() &&
              MediaSource.isTypeSupported(f)
            ) {
              vi("hvd_ymse");
              vi("hvd_mse");
              a = !1;
              try {
                -1 !== window.location.search.indexOf("goog_limavideo=true") &&
                  (a = !0);
              } catch (k) {}
              w.customElements
                ? a
                  ? (a = !0)
                  : (H(Uj) && X.g().report(153, { limvid: "vd" }),
                    (a =
                      H(Uj) ||
                      H(Oj) ||
                      H(Sj) ||
                      H(Rj) ||
                      H(Pj) ||
                      H(Qj) ||
                      H(Mj) ||
                      H(Nj)
                        ? !0
                        : !1))
                : (a = !1);
              a && this.g instanceof lz
                ? ((this.g.vb = c), (this.g.Hb = d))
                : ((this.aa = new Jz(this.g, [
                    new Jy(c, b, 35e4, new ly()),
                    new Jy(d, f, 82e3, new ly()),
                  ])),
                  rn(this, this.aa),
                  (a = this.g),
                  (c = this.aa),
                  c.h || (c.h = jh(c.g).toString()),
                  (c = c.h),
                  (a.src = c));
              this.g.load();
              return;
            }
            vi("hvd_nmse");
          }
        } else vi("hvd_uad");
      a ? (vi("hvd_src"), (this.g.src = a)) : vi("hvd_vn");
      this.g.load();
    };
    l.setVolume = function (a) {
      this.g.volume = Math.max(a, 0);
      this.g.muted = 0 === a ? !0 : !1;
    };
    l.ud = function (a) {
      this.g.style.left = String(a.left) + "px";
      this.g.style.top = String(a.top) + "px";
      this.g.style.width = String(a.width) + "px";
      this.g.style.height = String(a.height) + "px";
    };
    l.wd = function () {
      this.g.style.width = "100%";
      this.g.style.height = "100%";
      this.g.style.left = "0";
      this.g.style.right = "0";
    };
    l.getVolume = function () {
      return this.g.muted ? 0 : this.g.volume;
    };
    var ZD = function (a) {
      a.Z = !1;
      a.U || Kb()
        ? ((a.I = !1),
          (a.j = a.g.play()),
          null != a.j &&
            ((a.J = null),
            a.j
              .then(function () {
                a.j = null;
                a.je(a.J);
                a.J = null;
              })
              .catch(function (b) {
                a.j = null;
                var c = "";
                null != b && null != b.name && (c = b.name);
                "AbortError" === c || "NotAllowedError" === c
                  ? a.dispatchEvent("autoplayDisallowed")
                  : a.X();
              })))
        : (a.I = !0);
    };
    l = LE.prototype;
    l.pause = function () {
      null == this.j && ((this.Z = !0), this.g.pause());
    };
    l.getCurrentTime = function () {
      return this.g.currentTime;
    };
    l.getDuration = function () {
      return isNaN(this.g.duration) ? -1 : this.g.duration;
    };
    l.getSize = function () {
      return new A(this.g.offsetWidth, this.g.offsetHeight);
    };
    l.L = function () {
      if (this.V) {
        var a = Ov.get(this.V);
        Rv(a);
      }
      YD(this);
      M.prototype.L.call(this);
    };
    var YD = function (a) {
        null != a.l && (VC(a.l), (a.l = null));
        null != a.F && a.F.W();
        gw(a.h);
        $D(a);
      },
      $D = function (a) {
        a.loaded = !1;
        a.D = !1;
        a.G = !1;
        a.I = !1;
        a.B = 0;
        a.j = null;
        a.J = null;
        pn(a.A);
      };
    LE.prototype.Na = function (a) {
      this.dispatchEvent(a.type);
    };
    var NE = function (a) {
      if (!a.D) {
        a.D = !0;
        a.dispatchEvent("start");
        try {
          if (H(Uj) && w.customElements) {
            var b = w.customElements.get("lima-video");
            a.g instanceof b
              ? X.g().report(153, { limvid: "limastart" })
              : X.g().report(153, { limvid: "videostart" });
          }
        } catch (c) {
          X.g().report(153, { limvid: "startfail" });
        }
        b =
          "function" === typeof a.g.getAttribute &&
          null != a.g.getAttribute("playsinline");
        b = void 0 === b ? !1 : b;
        ((!Fv() && !Gv(10)) || (!b && (DA.g(), !1))
          ? (DA.g(), yb(Eb(), "Xbox")) ||
            (yc || Ac
              ? 0
              : (!xc || (xc && Ev(Dv, 4))) && (Km() ? (DA.g(), !1) : !vC()))
          : 1) ||
          !xc ||
          (xc && Ev(Dv, 3)) ||
          ((yc || Ac) && !Gv(4)) ||
          ME(a);
      }
    };
    l = LE.prototype;
    l.Mf = function () {
      this.U = !0;
      this.I && ZD(this);
      this.I = !1;
      OE(this);
    };
    l.Lf = function () {
      this.loaded || ((this.loaded = !0), this.dispatchEvent("loaded"));
    };
    l.je = function (a) {
      null != this.j
        ? (this.J = a)
        : (this.dispatchEvent("play"), Bc || Fv() || Pc || NE(this));
    };
    l.Pf = function (a) {
      if (!this.D && (Bc || Fv() || Pc)) {
        if (0 >= this.getCurrentTime()) return;
        if (Pc && this.g.ended && 1 === this.getDuration()) {
          this.X(a);
          return;
        }
        NE(this);
      }
      if (Bc || yb(Eb(), "Nintendo WiiU")) {
        if (1.5 < this.getCurrentTime() - this.B) {
          this.G = !0;
          this.g.currentTime = this.B;
          return;
        }
        this.G = !1;
        this.getCurrentTime() > this.B && (this.B = this.getCurrentTime());
      }
      this.dispatchEvent("timeUpdate");
    };
    l.Rf = function () {
      this.dispatchEvent("volumeChange");
    };
    l.Of = function () {
      if (this.D && Bc && !this.Z && (2 > PE(this) || this.G)) {
        this.A = new zs(250);
        this.h.O(this.A, "tick", this.Ea);
        this.A.start();
        var a = !0;
      } else a = !1;
      a || this.j || this.dispatchEvent("pause");
    };
    l.Kf = function () {
      var a = !0;
      if (Bc || yb(Eb(), "Nintendo WiiU")) a = this.B >= this.g.duration - 1.5;
      !this.G && a && this.dispatchEvent("end");
    };
    var ME = function (a) {
      a.dispatchEvent("beginFullscreen");
    };
    LE.prototype.ba = function () {
      this.dispatchEvent("endFullscreen");
    };
    LE.prototype.X = function () {
      this.dispatchEvent("error");
    };
    LE.prototype.ma = function () {
      this.dispatchEvent("click");
    };
    var OE = function (a) {
      a.g instanceof HTMLElement &&
        ((a.V = Sv(a.g, KE)),
        a.V.then(function (b) {
          a.wa() || G(F.g(), "ps", b.width + "x" + b.height);
        }));
    };
    LE.prototype.Fa = function () {
      var a = this.getSize(),
        b = AE(this.g);
      if (a.width !== this.size.width || a.height !== this.size.height)
        !this.fullscreen && b ? ME(this) : this.fullscreen && !b && this.ba(),
          (this.size = a),
          (this.fullscreen = b);
    };
    LE.prototype.Ea = function () {
      if (
        !this.g.ended &&
        this.g.paused &&
        (Bc || Qc ? this.g.currentTime < this.g.duration : 1)
      ) {
        var a = this.g.duration - this.g.currentTime,
          b = PE(this);
        0 < b && (2 <= b || 2 > a) && (pn(this.A), ZD(this));
      } else pn(this.A);
    };
    var PE = function (a) {
      var b;
      a: {
        for (b = a.g.buffered.length - 1; 0 <= b; ) {
          if (a.g.buffered.start(b) <= a.g.currentTime) {
            b = a.g.buffered.end(b);
            break a;
          }
          b--;
        }
        b = 0;
      }
      return b - a.g.currentTime;
    };
    LE.prototype.tb = function () {
      X.g().report(139);
      ME(this);
    };
    var QE = function (a, b) {
      this.g = a[w.Symbol.iterator]();
      this.h = b;
    };
    QE.prototype[Symbol.iterator] = function () {
      return this;
    };
    QE.prototype.next = function () {
      var a = this.g.next();
      return {
        value: a.done ? void 0 : this.h.call(void 0, a.value),
        done: a.done,
      };
    };
    var RE = function (a, b) {
      return new QE(a, b);
    };
    var VE = function (a) {
        if (a instanceof SE || a instanceof TE || a instanceof UE) return a;
        if ("function" == typeof a.next)
          return new SE(function () {
            return a;
          });
        if ("function" == typeof a[Symbol.iterator])
          return new SE(function () {
            return a[Symbol.iterator]();
          });
        if ("function" == typeof a.ub)
          return new SE(function () {
            return a.ub();
          });
        throw Error("Not an iterator or iterable.");
      },
      SE = function (a) {
        this.g = a;
      };
    SE.prototype.ub = function () {
      return new TE(this.g());
    };
    SE.prototype[Symbol.iterator] = function () {
      return new UE(this.g());
    };
    SE.prototype.h = function () {
      return new UE(this.g());
    };
    var TE = function (a) {
      this.g = a;
    };
    v(TE, eo);
    TE.prototype.next = function () {
      return this.g.next();
    };
    TE.prototype[Symbol.iterator] = function () {
      return new UE(this.g);
    };
    TE.prototype.h = function () {
      return new UE(this.g);
    };
    var UE = function (a) {
      SE.call(this, function () {
        return a;
      });
      this.j = a;
    };
    v(UE, SE);
    UE.prototype.next = function () {
      return this.j.next();
    };
    var WE = function (a, b) {
      this.h = {};
      this.g = [];
      this.j = this.size = 0;
      var c = arguments.length;
      if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
      } else if (a)
        if (a instanceof WE)
          for (c = a.tc(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));
        else for (d in a) this.set(d, a[d]);
    };
    l = WE.prototype;
    l.xb = function () {
      XE(this);
      for (var a = [], b = 0; b < this.g.length; b++) a.push(this.h[this.g[b]]);
      return a;
    };
    l.tc = function () {
      XE(this);
      return this.g.concat();
    };
    l.has = function (a) {
      return YE(this.h, a);
    };
    l.isEmpty = function () {
      return 0 == this.size;
    };
    l.clear = function () {
      this.h = {};
      this.j = this.size = this.g.length = 0;
    };
    l.remove = function (a) {
      YE(this.h, a)
        ? (delete this.h[a],
          --this.size,
          this.j++,
          this.g.length > 2 * this.size && XE(this),
          (a = !0))
        : (a = !1);
      return a;
    };
    var XE = function (a) {
      if (a.size != a.g.length) {
        for (var b = 0, c = 0; b < a.g.length; ) {
          var d = a.g[b];
          YE(a.h, d) && (a.g[c++] = d);
          b++;
        }
        a.g.length = c;
      }
      if (a.size != a.g.length) {
        var e = {};
        for (c = b = 0; b < a.g.length; )
          (d = a.g[b]), YE(e, d) || ((a.g[c++] = d), (e[d] = 1)), b++;
        a.g.length = c;
      }
    };
    l = WE.prototype;
    l.get = function (a, b) {
      return YE(this.h, a) ? this.h[a] : b;
    };
    l.set = function (a, b) {
      YE(this.h, a) || ((this.size += 1), this.g.push(a), this.j++);
      this.h[a] = b;
    };
    l.forEach = function (a, b) {
      for (var c = this.tc(), d = 0; d < c.length; d++) {
        var e = c[d],
          f = this.get(e);
        a.call(b, f, e, this);
      }
    };
    l.keys = function () {
      return VE(this.ub(!0)).h();
    };
    l.values = function () {
      return VE(this.ub(!1)).h();
    };
    l.entries = function () {
      var a = this;
      return RE(this.keys(), function (b) {
        return [b, a.get(b)];
      });
    };
    l.ub = function (a) {
      XE(this);
      var b = 0,
        c = this.j,
        d = this,
        e = new eo();
      e.next = function () {
        if (c != d.j)
          throw Error("The map has changed since the iterator was created");
        if (b >= d.g.length) return fo;
        var f = d.g[b++];
        return { value: a ? f : d.h[f], done: !1 };
      };
      return e;
    };
    var YE = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    };
    var $E = function () {
      M.call(this);
      this.readyState = 0;
      this.seeking = !1;
      this.currentTime = 0;
      this.initialTime = void 0;
      this.duration = NaN;
      this.paused = !0;
      this.ended = !1;
      this.volume = 1;
      this.muted = !1;
      this.currentSrc = "";
      this.defaultPlaybackRate = 1;
      this.playbackRate = 0;
      this.B = null;
      this.j = 0;
      this.h = this.g = null;
      this.buffered = new ZE();
      this.seekable = new ZE();
      this.A = "";
      this.tagName = "VIDEO";
      this.height = this.width = 0;
      this.canPlayType = function () {
        return "";
      };
      this.l = new cw(this);
      rn(this, this.l);
      var a = cA(dA);
      a && (this.duration = $z(a));
    };
    v($E, M);
    var aF = function () {
      var a = ["video/mp4"],
        b = ["video/ogg"],
        c = new $E();
      c.canPlayType = function (d) {
        return a.includes(d) ? "probably" : b.includes(d) ? "maybe" : "";
      };
      return c;
    };
    l = $E.prototype;
    l.pause = function () {
      if (!this.paused) {
        var a;
        null == (a = this.B) || a.stop();
        this.paused = !0;
        this.dispatchEvent("timeupdate");
        this.dispatchEvent("pause");
      }
    };
    l.load = function () {
      this.readyState = 0;
      this.paused = !0;
      this.seeking = !1;
      this.dispatchEvent("loadstart");
      var a;
      isNaN(this.duration) ? (a = 10 + 20 * Math.random()) : (a = this.duration);
      this.setProperty("duration", a);
      a = this.seekable;
      a.g.push(new bF(this.duration));
      a.length = a.g.length;
      a = this.buffered;
      a.g.push(new bF(this.duration));
      a.length = a.g.length;
      this.dispatchEvent("loadedmetadata");
      0 < this.currentTime && this.dispatchEvent("timeupdate");
      this.dispatchEvent("loadeddata");
      this.dispatchEvent("canplay");
      this.dispatchEvent("canplaythrough");
      this.dispatchEvent("progress");
      this.playbackRate = this.defaultPlaybackRate;
    };
    l.setProperty = function (a, b) {
      switch (a) {
        case "currentTime":
          a = Number(b);
          this.seeking = !0;
          this.dispatchEvent("seeking");
          this.seeking = !1;
          this.currentTime = a;
          this.dispatchEvent("seeked");
          a = Date.now() - this.j;
          b = this.currentTime + a / 1e3;
          this.j += a;
          2 < this.readyState && (this.currentTime = Math.min(b, this.duration));
          this.dispatchEvent("timeupdate");
          if (this.currentTime === this.duration) {
            this.ended = this.paused = !0;
            var c;
            null == (c = this.B) || c.stop();
            this.dispatchEvent("ended");
          }
          break;
        case "duration":
          this.duration = Number(b);
          this.dispatchEvent("durationchange");
          break;
        case "volume":
          this.setVolume(Number(b));
          break;
        default:
          throw Error("Property setter not implemented");
      }
    };
    l.setVolume = function (a) {
      this.volume = a;
      this.dispatchEvent("volumechange");
    };
    l.setAttribute = function (a, b) {
      null != a && cF.set(a, b);
    };
    l.getAttribute = function (a) {
      return cF.get(a);
    };
    l.Qf = function (a) {
      var b = null,
        c = null;
      switch (a.type) {
        case "loadeddata":
          b = "Loaded";
          break;
        case "playing":
          b = "Playing";
          c = "#00f";
          break;
        case "pause":
          b = "Paused";
          break;
        case "ended":
          (b = "Ended"), (c = "#000");
      }
      b && this.h && (this.h.innerText = b);
      c && this.g && (this.g.style.backgroundColor = c);
    };
    da.Object.defineProperties($E.prototype, {
      src: {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return this.A;
        },
        set: function (a) {
          this.A = a;
        },
      },
    });
    var cF = new WE(),
      bF = function (a) {
        this.startTime = 0;
        this.endTime = a;
      },
      ZE = function () {
        this.length = 0;
        this.g = [];
      };
    ZE.prototype.start = function (a) {
      return this.g[a].startTime;
    };
    ZE.prototype.end = function (a) {
      return this.g[a].endTime;
    };
    var fF = function (a, b) {
      L.call(this);
      this.o = a;
      this.j = this.g = null;
      this.h = dF(this);
      eF(this, b);
      $y(function () {
        G(F.g(), "haob", "1");
      });
    };
    v(fF, L);
    fF.prototype.initialize = function () {
      this.h && this.h.load();
    };
    fF.prototype.L = function () {
      Qg(this.g);
      L.prototype.L.call(this);
    };
    var eF = function (a, b) {
        a.g = Pg("DIV", { style: "display:none;" });
        a.o.appendChild(a.g);
        a.g.appendChild(a.h);
        b &&
          ((a.j = Pg("DIV", {
            style: "position:absolute;width:100%;height:100%;left:0px;top:0px",
          })),
          a.g.appendChild(a.j));
      },
      dF = function (a) {
        var b = cA(dA);
        if (Zz(b, "useVideoElementFake"))
          (a = aF()),
            (b = Pg("DIV", {
              style: "position:absolute;width:100%;height:100%;top:0px;left:0px;",
            })),
            Object.assign(b, a),
            (a.g = Pg("DIV", {
              style:
                "position:absolute;width:100%;height:100%;top:0px;left:0px;background-color:#000",
            })),
            (a.h = Pg("P", {
              style:
                "position:absolute;top:25%;margin-left:10px;font-size:24px;color:#fff;",
            })),
            a.g.appendChild(a.h),
            b.appendChild(a.g),
            a.l.O(a, ["loadeddata", "playing", "pause", "ended"], a.Qf),
            (a = b);
        else {
          b = !1;
          try {
            -1 !== window.location.search.indexOf("goog_limavideo=true") &&
              (b = !0);
          } catch (c) {}
          if (gF(a, b)) {
            b && console.log("force lima video in wrapper");
            a = null;
            try {
              a = new lz();
            } catch (c) {
              (a = Pg("lima-video")),
                H(Uj) && X.g().report(153, { limvid: "firefail" });
            }
            a.style.backgroundColor = "#000";
            a.style.height = "100%";
            a.style.width = "100%";
            a.style.position = "absolute";
            a.style.left = "0";
            a.style.top = "0";
          } else
            a = Pg("VIDEO", {
              style:
                "background-color:#000;position:absolute;width:100%;height:100%;left:0;top:0;",
              title: Nz("Advertisement").toString(),
            });
        }
        a.setAttribute("webkit-playsinline", "true");
        a.setAttribute("playsinline", "true");
        return a;
      },
      gF = function (a, b) {
        if (!w.customElements) return !1;
        if (b) return !0;
        if (Lb() && Fg(a.o) !== document) return !1;
        H(Uj) && X.g().report(153, { limvid: "vw" });
        return H(Oj) || H(Uj) || H(Mj) || H(Nj) ? !0 : !1;
      };
    fF.prototype.Jb = function () {
      return this.j;
    };
    fF.prototype.ab = function () {
      var a = this.g;
      null != a && (a.style.display = "none");
    };
    var kF = function (a, b, c) {
      var d = a && a.getRootNode ? a.getRootNode({ composed: !0 }) : a;
      if (null == a || !Sg(Fg(d), d))
        throw fB(eB, null, "containerElement", "element");
      this.h = b;
      this.N = xC(this.h || null);
      this.J = Hv(this.h || null);
      this.I = String(Math.floor(1e9 * Math.random()));
      this.D = !1;
      this.Kc = a;
      this.G = null != b;
      dA.g = 2;
      this.H = hF(b ? b : null);
      d = Pg("DIV", { style: "position:absolute" });
      a.insertBefore(d, a.firstChild);
      this.o = d;
      this.g = null;
      iF(this) && b
        ? (a = new LE(b))
        : ((this.g = new fF(this.o, !0)), (a = new LE(this.g.h)));
      this.da = a;
      this.za = this.j = null;
      if ((a = this.g && dA.o))
        a = !(iF(this) || yc || Ac || Lm() || (xc && (!xc || !Ev(Dv, 4))));
      a && ((this.j = new fF(this.o, !0)), (this.za = new LE(this.j.h)));
      this.l = c || null;
      this.F = null != this.l;
      iF(this) && b
        ? "function" !== typeof b.getBoundingClientRect
          ? ((c = this.o), (dA.j = c))
          : (c = b)
        : (c = this.o);
      this.B = c;
      this.A = new sE(this.o, this);
      this.size = new A(0, 0);
      this.K = "";
      b &&
        ((b = iv(b.src || b.currentSrc)),
        200 > b.toString().length
          ? (this.K = b.toString())
          : 200 > b.g.length && (this.K = b.g));
      this.Hd = new Map();
      this.Hd.set("videoDisplay1", this.da);
      this.za && this.Hd.set("videoDisplay2", this.za);
      jF(this) &&
        !dA.h &&
        console.warn(
          "Custom media element must be a <video> or <audio> element. Viewability/audibility measurement will fail."
        );
    };
    l = kF.prototype;
    l.initialize = function () {
      this.D = !0;
      null != this.g && this.g.initialize();
      null != this.j && this.j.initialize();
    };
    l.ta = function () {
      return this.D;
    };
    l.destroy = function () {
      var a = this;
      this.h = null;
      pn(this.g);
      pn(this.j);
      pn(this.A);
      this.da.ac(function () {
        return pn(a.da);
      });
      null != this.za &&
        this.za.ac(function () {
          return pn(a.za);
        });
      Qg(this.o);
    };
    l.Pc = function () {
      if (null != this.g) {
        var a = this.g.g;
        null != a && (a.style.display = "block");
      }
    };
    l.cc = function (a) {
      this.da !== a &&
        this.g &&
        this.j &&
        this.za &&
        (a.setVolume(this.da.getVolume()),
        (a = this.da),
        (this.da = this.za),
        (this.za = a),
        (a = this.g),
        (this.g = this.j),
        (this.j = a),
        this.j.ab(),
        this.A.cc(this.da));
    };
    l.ab = function () {
      null != this.g && this.g.ab();
    };
    l.Jb = function () {
      return this.F && this.l ? this.l : null != this.g ? this.g.Jb() : null;
    };
    var iF = function (a) {
        return wC(a.H) && a.G;
      },
      jF = function (a) {
        var b = ["VIDEO", "AUDIO"],
          c;
        return (
          iF(a) &&
          !!a.h &&
          !b.includes(null == (c = a.h.tagName) ? void 0 : c.toUpperCase())
        );
      };
    kF.prototype.getSize = function () {
      return this.size;
    };
    var hF = function (a) {
      return null != a &&
        "function" === typeof a.getAttribute &&
        null != a.getAttribute("playsinline")
        ? !0
        : !1;
    };
    kF.prototype.ud = function (a) {
      this.da.ud(a);
    };
    kF.prototype.wd = function () {
      this.da.wd();
    };
    kF.prototype.destroy = kF.prototype.destroy;
    kF.prototype.initialize = kF.prototype.initialize;
    var lF = { AD_LOAD: "adLoadError", AD_PLAY: "adPlayError" },
      mF = function (a) {
        var b = Error.call(this);
        this.message = b.message;
        "stack" in b && (this.stack = b.stack);
        this.data = a;
      };
    v(mF, Error);
    l = mF.prototype;
    l.getInnerError = function () {
      var a = this.data.innerError;
      return a instanceof Object ? new mF(a) : null != a ? Error(a) : null;
    };
    l.getMessage = function () {
      return this.data.errorMessage;
    };
    l.getErrorCode = function () {
      return this.data.errorCode;
    };
    l.getVastErrorCode = function () {
      var a = this.getErrorCode();
      return 1e3 > a ? a : 900;
    };
    l.getType = function () {
      return this.data.type;
    };
    l.toString = function () {
      return (
        "AdError " +
        this.getErrorCode() +
        ": " +
        this.getMessage() +
        (null != this.getInnerError()
          ? " Caused by: " + this.getInnerError()
          : "")
      );
    };
    mF.prototype.getType = mF.prototype.getType;
    mF.prototype.getVastErrorCode = mF.prototype.getVastErrorCode;
    mF.prototype.getErrorCode = mF.prototype.getErrorCode;
    mF.prototype.getMessage = mF.prototype.getMessage;
    mF.prototype.getInnerError = mF.prototype.getInnerError;
    y(
      "module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ad_error.AdError.Type",
      lF
    );
    var nF = { AD_ERROR: "adError" },
      oF = function (a, b) {
        b = void 0 === b ? null : b;
        ur.call(this, "adError");
        this.error = a;
        this.g = b;
      };
    v(oF, ur);
    oF.prototype.getError = function () {
      return this.error;
    };
    oF.prototype.getUserRequestContext = function () {
      return this.g;
    };
    oF.prototype.getUserRequestContext = oF.prototype.getUserRequestContext;
    oF.prototype.getError = oF.prototype.getError;
    y(
      "module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ad_error_event.AdErrorEvent.Type",
      nF
    );
    var pF = {
        AD_CAN_PLAY: "adCanPlay",
        og: "adStarted",
        CONTENT_PAUSE_REQUESTED: "contentPauseRequested",
        CONTENT_RESUME_REQUESTED: "contentResumeRequested",
        CLICK: "click",
        VIDEO_CLICKED: "videoClicked",
        VIDEO_ICON_CLICKED: "videoIconClicked",
        Id: "engagedView",
        EXPANDED_CHANGED: "expandedChanged",
        STARTED: "start",
        AD_PROGRESS: "adProgress",
        AD_BUFFERING: "adBuffering",
        IMPRESSION: "impression",
        Nd: "measurable_impression",
        VIEWABLE_IMPRESSION: "viewable_impression",
        Jd: "fully_viewable_audible_half_duration_impression",
        Ne: "overlay_resize",
        Oe: "overlay_unmeasurable_impression",
        Pe: "overlay_unviewable_impression",
        Re: "overlay_viewable_immediate_impression",
        Qe: "overlay_viewable_end_of_session_impression",
        Hg: "externalActivityEvent",
        PAUSED: "pause",
        RESUMED: "resume",
        FIRST_QUARTILE: "firstQuartile",
        MIDPOINT: "midpoint",
        THIRD_QUARTILE: "thirdQuartile",
        COMPLETE: "complete",
        DURATION_CHANGE: "durationChange",
        USER_CLOSE: "userClose",
        Lh: "userRecall",
        th: "prefetched",
        LOADED: "loaded",
        ALL_ADS_COMPLETED: "allAdsCompleted",
        SKIPPED: "skip",
        Ve: "skipShown",
        LINEAR_CHANGED: "linearChanged",
        SKIPPABLE_STATE_CHANGED: "skippableStateChanged",
        AD_METADATA: "adMetadata",
        AD_BREAK_FETCH_ERROR: "adBreakFetchError",
        AD_BREAK_READY: "adBreakReady",
        LOG: "log",
        VOLUME_CHANGED: "volumeChange",
        VOLUME_MUTED: "mute",
        INTERACTION: "interaction",
        vg: "companionBackfill",
        Ih: "trackingUrlPinged",
        Mh: "video_card_endcap_collapse",
        Nh: "video_card_endcap_dismiss",
        Oh: "video_card_endcap_impression",
        yg: "companionInitialized",
        xg: "companionImpression",
        wg: "companionClick",
        kh: "mediaUrlPinged",
        Ke: "loadStart",
        mh: "navigationRequested",
      },
      qF = function (a, b, c) {
        b = void 0 === b ? null : b;
        c = void 0 === c ? null : c;
        ur.call(this, a);
        this.ad = b;
        this.j = c;
      };
    v(qF, ur);
    qF.prototype.getAd = function () {
      return this.ad;
    };
    qF.prototype.getAdData = function () {
      return this.j;
    };
    qF.prototype.getAdData = qF.prototype.getAdData;
    qF.prototype.getAd = qF.prototype.getAd;
    y(
      "module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ad_event.AdEvent.Type",
      pF
    );
    var rF = function (a, b) {
      b = void 0 === b ? null : b;
      qF.call(this, "adMetadata", a);
      this.g = b;
    };
    v(rF, qF);
    rF.prototype.mf = function () {
      return this.g;
    };
    rF.prototype.getAdCuePoints = rF.prototype.mf;
    var sF = function (a) {
      this.adBreakDuration = a.adBreakDuration;
      this.adPosition = a.adPosition;
      this.currentTime = a.currentTime;
      this.duration = a.duration;
      this.totalAds = a.totalAds;
    };
    var tF = function (a, b) {
      M.call(this);
      this.j = a;
      this.A = b;
      this.h = this.j.currentTime;
      this.g = new zs(250);
      rn(this, this.g);
      this.l = new cw(this);
      rn(this, this.l);
      ew(this.l, this.g, "tick", this.B, !1, this);
    };
    v(tF, M);
    tF.prototype.kb = function () {
      return this.h;
    };
    tF.prototype.start = function () {
      uF(this);
      this.g.start();
    };
    tF.prototype.stop = function () {
      this.g.stop();
    };
    tF.prototype.B = function () {
      var a = this.j.currentTime;
      a !== this.kb() && ((this.h = a), uF(this));
    };
    var uF = function (a) {
      var b = {};
      b.currentTime = a.kb();
      RA(a.A, "contentTimeUpdate", "contentTimeUpdate", b);
    };
    var vF = vc && "srcdoc" in Ng(document, "IFRAME"),
      wF = function (a, b) {
        a.open("text/html", "replace");
        fh(a, sg(b));
        a.close();
      };
    var xF = {
        rgb: !0,
        rgba: !0,
        alpha: !0,
        rect: !0,
        image: !0,
        "linear-gradient": !0,
        "radial-gradient": !0,
        "repeating-linear-gradient": !0,
        "repeating-radial-gradient": !0,
        "cubic-bezier": !0,
        matrix: !0,
        perspective: !0,
        rotate: !0,
        rotate3d: !0,
        rotatex: !0,
        rotatey: !0,
        steps: !0,
        rotatez: !0,
        scale: !0,
        scale3d: !0,
        scalex: !0,
        scaley: !0,
        scalez: !0,
        skew: !0,
        skewx: !0,
        skewy: !0,
        translate: !0,
        translate3d: !0,
        translatex: !0,
        translatey: !0,
        translatez: !0,
      },
      yF = function (a) {
        a = nb(a);
        if ("" == a) return null;
        var b = String(a.slice(0, 4)).toLowerCase();
        if (0 == ("url(" < b ? -1 : "url(" == b ? 0 : 1)) return null;
        if (0 < a.indexOf("(")) {
          if (/"|'/.test(a)) return null;
          b = /([\-\w]+)\(/g;
          for (var c; (c = b.exec(a)); )
            if (!(c[1].toLowerCase() in xF)) return null;
        }
        return a;
      };
    function zF(a, b) {
      a = w[a];
      return a && a.prototype
        ? ((b = Object.getOwnPropertyDescriptor(a.prototype, b)) && b.get) || null
        : null;
    }
    function AF(a) {
      var b = w.CSSStyleDeclaration;
      return (b && b.prototype && b.prototype[a]) || null;
    }
    zF("Element", "attributes") || zF("Node", "attributes");
    zF("Element", "innerHTML") || zF("HTMLElement", "innerHTML");
    zF("Node", "nodeName");
    zF("Node", "nodeType");
    zF("Node", "parentNode");
    zF("Node", "childNodes");
    zF("HTMLElement", "style") || zF("Element", "style");
    zF("HTMLStyleElement", "sheet");
    var BF = AF("getPropertyValue"),
      CF = AF("setProperty");
    zF("Element", "namespaceURI") || zF("Node", "namespaceURI");
    function DF(a, b, c, d) {
      if (a) return a.apply(b, d);
      if (sc && 10 > document.documentMode) {
        if (!b[c].call) throw Error("IE Clobbering detected");
      } else if ("function" != typeof b[c]) throw Error("Clobbering detected");
      return b[c].apply(b, d);
    }
    var EF = {
        "-webkit-border-horizontal-spacing": !0,
        "-webkit-border-vertical-spacing": !0,
      },
      GF = function (a) {
        if (!a) return og;
        var b = document.createElement("div").style;
        FF(a).forEach(function (c) {
          var d =
            vc && c in EF
              ? c
              : c.replace(
                  /^-(?:apple|css|epub|khtml|moz|mso?|o|rim|wap|webkit|xv)-(?=[a-z])/i,
                  ""
                );
          0 != d.lastIndexOf("--", 0) &&
            0 != d.lastIndexOf("var", 0) &&
            ((c =
              DF(
                BF,
                a,
                a.getPropertyValue ? "getPropertyValue" : "getAttribute",
                [c]
              ) || ""),
            (c = yF(c)),
            null != c &&
              DF(CF, b, b.setProperty ? "setProperty" : "setAttribute", [d, c]));
        });
        return new ng(b.cssText || "", mg);
      },
      FF = function (a) {
        Ta(a) ? (a = hc(a)) : ((a = Rf(a)), dc(a, "cssText"));
        return a;
      };
    var HF = function (a, b, c) {
      M.call(this);
      this.h = a;
      this.l = b;
      this.B = c;
      this.g = null;
      this.D = "";
      this.F = og;
      this.G = 0;
      this.A = this.slot = this.j = null;
      this.sessionId = "";
    };
    v(HF, M);
    HF.prototype.init = function (a) {
      this.sessionId = a;
      a = "about:blank";
      sc && (a = "");
      this.j = Pg("IFRAME", {
        src: a,
        allowtransparency: !0,
        background: "transparent",
      });
      mm(this.j, { display: "none", width: "0", height: "0" });
      a = this.h.Kc;
      a.appendChild(this.j);
      a = a.ownerDocument;
      a = a.defaultView || a.parentWindow;
      null == this.A && (this.A = new cw(this));
      this.A.O(a, "message", this.I);
      a =
        '<body><script src="//imasdk.googleapis.com/js/sdkloader/loader.js">\x3c/script><script>loader = new VPAIDLoader(false, "' +
        (this.sessionId + '");\x3c/script></body>');
      if (Qc || Oc || tc) {
        var b = this.j.contentWindow;
        b && wF(b.document, a);
      } else
        (b = this.j),
          vF
            ? ((a = sg(a)), (b.srcdoc = rg(a)))
            : (b = b.contentWindow) && wF(b.document, a);
    };
    HF.prototype.I = function (a) {
      try {
        var b = a.g.data;
        try {
          var c = JSON.parse(b);
        } catch (x) {
          return;
        }
        var d = c.session;
        if (null != d && this.sessionId === d)
          switch (c.type) {
            case "friendlyReady":
              var e = IF(this);
              if (null != e) {
                this.g = e;
                this.D = e.currentSrc;
                var f = e.style.cssText;
                if (sc && 10 > document.documentMode) var g = og;
                else {
                  var h = document.implementation
                    .createHTMLDocument("")
                    .createElement("DIV");
                  h.style.cssText = f;
                  g = GF(h.style);
                }
                this.F = g;
                this.G = e.currentTime;
              } else {
                var k = this.h.Kc,
                  n = "border: 0; margin: 0; padding: 0; position: absolute; ",
                  m = this.h.getSize();
                n += "width:" + m.width + "px;";
                n += "height:" + m.height + "px;";
                this.g = Pg("VIDEO", { style: n, autoplay: !0 });
                k.appendChild(this.g);
              }
              var p = this.h.Kc;
              k = "border: 0; margin: 0; padding: 0;position: absolute; ";
              var u = vm(this.g);
              k += "width:" + u.width + "px;";
              k += "height:" + u.height + "px;";
              this.slot = Pg("DIV", { style: k });
              p.appendChild(this.slot);
              try {
                this.j.contentWindow.loader.initFriendly(this.g, this.slot);
              } catch (x) {
                JF(this);
              }
              RA(this.l, "vpaid", "", b);
              break;
            case "becameLinear":
              this.g && !Wg() && !Vg() && mm(this.g, { visibility: "visible" });
              RA(this.l, "vpaid", "", b);
              break;
            case "becameNonlinear":
              KF(this);
              RA(this.l, "vpaid", "", b);
              break;
            case "startAd":
              p = {};
              if (this.g) {
                n = this.g.paused;
                var r = 0 < this.g.currentTime;
                p.apl = r && !n ? "1" : "0";
                p.ip = n ? "1" : "0";
                p.iavp = r ? "1" : "0";
              } else p.apl = "n";
              X.g().report(99, p);
              RA(this.l, "vpaid", "", b);
              this.Pc();
              break;
            default:
              RA(this.l, "vpaid", "", b);
          }
      } catch (x) {
        JF(this);
      }
    };
    var JF = function (a) {
      var b = { type: "error" };
      b.session = a.sessionId;
      b = JSON.stringify(b);
      a.postMessage(b);
    };
    HF.prototype.postMessage = function (a) {
      window.postMessage(a, "*");
    };
    var IF = function (a) {
      return ("videoDisplayUnknown" === a.B ? a.h.da : a.h.Hd.get(a.B)).N.g;
    };
    HF.prototype.Pc = function () {
      null != IF(this) && this.h.Pc();
    };
    var KF = function (a) {
      a.g && !Wg() && !Vg() && mm(a.g, { visibility: "hidden" });
    };
    HF.prototype.L = function () {
      pn(this.A);
      this.A = null;
      Qg(this.slot);
      this.slot = null;
      Qg(this.j);
      this.j = null;
      var a = IF(this);
      if (null != a) {
        var b = this.F;
        a.style.cssText =
          b instanceof ng && b.constructor === ng ? b.g : "type_error:SafeStyle";
        Wg() || Vg()
          ? ((a.src = this.D), (a.currentTime = this.G))
          : (a.removeAttribute("src"), this.h.ab());
      } else Qg(this.g), (this.g = null);
      M.prototype.L.call(this);
    };
    var LF = function (a, b) {
      L.call(this);
      this.h = a;
      this.j = b;
      this.g = new Map();
    };
    v(LF, L);
    var MF = function (a, b) {
      try {
        var c = b.qa,
          d = c.session;
        switch (c.vpaidEventType) {
          case "createFriendlyIframe":
            b = "videoDisplayUnknown";
            c.videoDisplayName && (b = c.videoDisplayName);
            var e = c.session,
              f = new HF(a.h, a.j, b);
            a.g.set(e, f);
            f.init(e);
            break;
          case "vpaidNonLinear":
            var g = a.g.get(d);
            g && KF(g);
            break;
          case "destroyFriendlyIframe":
            var h = a.g.get(d);
            h && (h.W(), a.g.delete(d));
        }
      } catch (k) {
        X.g().report(125, { msg: k.message });
      }
    };
    LF.prototype.L = function () {
      this.g.forEach(function (a) {
        a.W();
      });
    };
    var NF = function (a) {
      this.g = a || { cookie: "" };
    };
    l = NF.prototype;
    l.set = function (a, b, c) {
      var d = !1;
      if ("object" === typeof c) {
        var e = c.di;
        d = c.Uf || !1;
        var f = c.domain || void 0;
        var g = c.path || void 0;
        var h = c.ie;
      }
      if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
      if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
      void 0 === h && (h = -1);
      this.g.cookie =
        a +
        "=" +
        b +
        (f ? ";domain=" + f : "") +
        (g ? ";path=" + g : "") +
        (0 > h
          ? ""
          : 0 == h
          ? ";expires=" + new Date(1970, 1, 1).toUTCString()
          : ";expires=" + new Date(Date.now() + 1e3 * h).toUTCString()) +
        (d ? ";secure" : "") +
        (null != e ? ";samesite=" + e : "");
    };
    l.get = function (a, b) {
      for (
        var c = a + "=", d = (this.g.cookie || "").split(";"), e = 0, f;
        e < d.length;
        e++
      ) {
        f = nb(d[e]);
        if (0 == f.lastIndexOf(c, 0)) return f.slice(c.length);
        if (f == a) return "";
      }
      return b;
    };
    l.remove = function (a, b, c) {
      var d = void 0 !== this.get(a);
      this.set(a, "", { ie: 0, path: b, domain: c });
      return d;
    };
    l.tc = function () {
      return OF(this).keys;
    };
    l.xb = function () {
      return OF(this).values;
    };
    l.isEmpty = function () {
      return !this.g.cookie;
    };
    l.clear = function () {
      for (var a = OF(this).keys, b = a.length - 1; 0 <= b; b--)
        this.remove(a[b]);
    };
    var OF = function (a) {
      a = (a.g.cookie || "").split(";");
      for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
        (e = nb(a[f])),
          (d = e.indexOf("=")),
          -1 == d
            ? (b.push(""), c.push(e))
            : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
      return { keys: b, values: c };
    };
    function PF(a) {
      return "null" !== a.origin;
    }
    function QF(a, b, c) {
      b = Pe(b, 5) && PF(c) ? c.document.cookie : null;
      return null === b ? null : new NF({ cookie: b }).get(a) || "";
    }
    var RF = function () {
        this.g = window;
        this.h = 0;
      },
      SF = function (a, b, c, d) {
        if (d) {
          var e = Me(c, 2) - Date.now() / 1e3;
          e = { ie: Math.max(e, 0), path: Ne(c, 3), domain: Ne(c, 4), Uf: !1 };
          c = c.ha();
          a = a.g;
          Pe(d, 5) && PF(a) && new NF(a.document).set(b, c, e);
        }
      },
      TF = function (a, b, c) {
        if (c && QF(b, c, a.g)) {
          var d = a.g.location.hostname;
          if ("localhost" === d) d = ["localhost"];
          else if (((d = d.split(".")), 2 > d.length)) d = [];
          else {
            for (var e = [], f = 0; f < d.length - 1; ++f)
              e.push(d.slice(f).join("."));
            d = e;
          }
          d = t(d);
          for (e = d.next(); !e.done; e = d.next())
            (f = a.g),
              Pe(c, 5) && PF(f) && new NF(f.document).remove(b, "/", e.value);
        }
      };
    var UF = function () {
      this.g = [];
      this.h = [];
    };
    UF.prototype.isEmpty = function () {
      return 0 === this.g.length && 0 === this.h.length;
    };
    UF.prototype.clear = function () {
      this.g = [];
      this.h = [];
    };
    UF.prototype.remove = function (a) {
      var b = this.g;
      b: {
        var c = b.length - 1;
        0 > c && (c = Math.max(0, b.length + c));
        if ("string" === typeof b)
          c = "string" !== typeof a || 1 != a.length ? -1 : b.lastIndexOf(a, c);
        else {
          for (; 0 <= c; c--) if (c in b && b[c] === a) break b;
          c = -1;
        }
      }
      0 <= c ? (ec(b, c), (b = !0)) : (b = !1);
      return b || dc(this.h, a);
    };
    UF.prototype.xb = function () {
      for (var a = [], b = this.g.length - 1; 0 <= b; --b) a.push(this.g[b]);
      var c = this.h.length;
      for (b = 0; b < c; ++b) a.push(this.h[b]);
      return a;
    };
    var Z = function (a, b, c, d, e, f, g, h) {
      M.call(this);
      var k = this;
      this.I = a;
      this.g = b;
      this.adTagUrl = c;
      this.ba = d;
      this.bc = e;
      this.D = g;
      this.Na = h;
      this.l = new PD();
      this.J = !1;
      this.volume = 1;
      this.ba = d;
      this.aa = -1;
      this.B = this.j = this.h = null;
      this.A = new tF({ currentTime: 0 }, this.D);
      this.F = new UF();
      this.ma = this.V = !1;
      this.X = new Map();
      this.Z = this.Ea = !1;
      this.Fa = new LF(b, g);
      rn(this, this.Fa);
      this.G = f && null != this.g.l;
      this.N = function () {
        var n = k.g.da,
          m = n.getCurrentTime();
        n = n.getDuration();
        return { currentTime: m, duration: n, isPlaying: !0, volume: k.volume };
      };
      this.U = new cw(this);
      this.U.O(this.D, "adsManager", this.tb);
    };
    v(Z, M);
    Z.prototype.tb = function (a) {
      var b = this,
        c = a.messageType,
        d = a.qa,
        e = {};
      switch (c) {
        case "error":
          VF(this);
          WF(this, d);
          break;
        case "contentPauseRequested":
          X.g().report(130);
          XF(this);
          this.A.stop();
          YF(this, c, d);
          break;
        case "contentResumeRequested":
          ZF(this, function () {
            YF(b, c, d);
          });
          break;
        case "remainingTime":
          this.aa = d.remainingTime;
          break;
        case "skip":
          YF(this, c, d);
          break;
        case "log":
          YF(this, c, d, d.logData);
          break;
        case "companionBackfill":
          a = Ra("window.google_show_companion_ad");
          null != a && a();
          break;
        case "skipShown":
          this.J = !0;
          YF(this, c, d);
          break;
        case "interaction":
          YF(this, c, d, d.interactionData);
          break;
        case "vpaidEvent":
          MF(this.Fa, a);
          break;
        case "skippableStateChanged":
          e = d.adData;
          null != e.skippable && (this.J = e.skippable);
          YF(this, c, d);
          break;
        case "volumeChange":
          e = d.adData;
          null != e && "number" === typeof e.volume && (this.volume = e.volume);
          YF(this, c, d);
          break;
        case "firstQuartile":
          YF(this, HA.firstQuartile, d);
          YF(this, c, d);
          break;
        case "thirdQuartile":
          YF(this, HA.thirdQuartile, d);
          YF(this, c, d);
          break;
        case "updateGfpCookie":
          $F(this, d);
          break;
        default:
          YF(this, c, d);
      }
    };
    var YF = function (a, b, c, d) {
        if (null == c.companions) {
          var e = a.X.get(c.adId);
          c.companions = null != e ? e : [];
        }
        var f = c.adData;
        if ((e = null == f ? null : new Y(f))) a.h = e;
        switch (b) {
          case "adBreakReady":
          case "mediaUrlPinged":
            b = new qF(b, null, c);
            break;
          case "adMetadata":
            b = null;
            null != c.adCuePoints && (b = new ND(c.adCuePoints));
            b = new rF(e, b);
            break;
          case "allAdsCompleted":
            a.h = null;
            a.Ea = !0;
            b = new qF(b, e);
            break;
          case "contentPauseRequested":
            a.Z = !1;
            b = new qF(b, e);
            break;
          case "contentResumeRequested":
            a.h = null;
            a.Z = !0;
            b = new qF(b, e);
            break;
          case "loaded":
            a.aa = e.getDuration();
            a.J = !1;
            yC() &&
              ((d = a.I),
              (c = a.bc),
              d.h.set(MD(e), a.N),
              CE(d) && BE(d, "loaded", MD(e), c));
            b = new qF(b, e, f);
            break;
          case "start":
            a.X.set(c.adId, c.companions);
            null != a.g.Jb() &&
              (null == a.j
                ? ((a.j = new RC()), a.U.O(a.j, "click", a.Nf))
                : VC(a.j),
              TC(a.j, a.g.Jb()));
            b = new qF(b, e);
            break;
          case "complete":
            null != a.j && VC(a.j);
            yC() && EE(a.I, a.N, MD(e));
            a.h = null;
            a.X.delete(c.adId);
            b = new qF(b, e);
            break;
          case "log":
            c = null;
            null != d && null != d.type
              ? ((f = d.type), (f = "adLoadError" === f || "adPlayError" === f))
              : (f = !1);
            f && (c = { adError: new mF(d) });
            b = new qF(b, e, c);
            break;
          case "interaction":
            b = new qF(b, e, d);
            break;
          case "adProgress":
            b = new qF(b, e, new sF(c));
            break;
          default:
            b = new qF(b, e);
        }
        a.dispatchEvent(b);
        a.Ea && a.Z && a.destroy();
      },
      WF = function (a, b) {
        var c = new oF(new mF(b));
        a.V
          ? (a.dispatchEvent(c),
            yC() && a.h && EE(a.I, a.N, MD(a.h)),
            (a.h = null))
          : a.F.h.push(c);
        a = { error: b.errorCode, vis: Wh(document) };
        X.g().report(7, a);
      },
      aG = function (a, b, c) {
        RA(a.D, "adsManager", b, c);
      },
      ZF = function (a, b) {
        X.g().report(131);
        VF(a, b);
        a.wa() || a.A.start();
      },
      XF = function (a) {
        var b = a.g.da;
        iF(a.g) &&
          a.l.restoreCustomPlaybackStateOnAdBreakComplete &&
          null != b.Md &&
          b.Md();
      },
      VF = function (a, b) {
        var c = a.g.da;
        iF(a.g) && a.l.restoreCustomPlaybackStateOnAdBreakComplete && null != c.ac
          ? c.ac(b)
          : b && b();
      };
    l = Z.prototype;
    l.configureAdsManager = function (a, b) {
      this.B = a;
      null != a.currentTime && ((this.A = new tF(a, this.D)), this.A.start());
      null != b && (this.l = bG(b));
    };
    l.init = function (a, b, c, d) {
      if (this.F.isEmpty()) {
        var e = this.g,
          f = null;
        e.h && null == d && (f = { vd: "setnull" });
        e.h && e.h === d && (f = { vd: "match" });
        if (e.h && e.h !== d) {
          f = xC(d || null);
          var g = Hv(d || null);
          f = { vd: "diff", oc: e.N, nc: f, oi: e.J, ni: g };
        }
        !e.h && d && (f = { vd: "new" });
        f && ((f.custVid = e.I), X.g().report(93, f));
        null != d &&
          ((e.H = hF(d)),
          wC(e.H) &&
            ((e.G = !0),
            pn(e.g),
            pn(e.j),
            pn(e.za),
            (e.g = null),
            (e.j = null),
            (e.za = null),
            pn(e.da),
            (e.da = new LE(d)),
            "function" !== typeof d.getBoundingClientRect
              ? ((e.B = e.o), (dA.j = e.B))
              : (e.B = d),
            e.A.cc(e.da)));
        this.V = !0;
        this.resize(a, b, c);
        d = QD(this.l, this.G);
        aG(this, "init", {
          adsRenderingSettings: d,
          width: a,
          height: b,
          viewMode: c,
        });
      } else {
        for (; !this.F.isEmpty(); )
          (b = a = this.F),
            0 === b.g.length && ((b.g = b.h), b.g.reverse(), (b.h = [])),
            (a = a.g.pop()),
            this.dispatchEvent(a);
        this.W();
      }
    };
    l.isCustomPlaybackUsed = function () {
      return iF(this.g);
    };
    l.isCustomClickTrackingUsed = function () {
      return this.G;
    };
    l.getRemainingTime = function () {
      return this.aa;
    };
    l.getAdSkippableState = function () {
      return this.J;
    };
    l.discardAdBreak = function () {
      aG(this, "discardAdBreak");
    };
    l.updateAdsRenderingSettings = function (a) {
      if (null != a) {
        a = bG(a);
        var b = this.l.bitrate,
          c = a.bitrate;
        X.g().report(96, {
          init: this.V ? "1" : "0",
          start: this.ma ? "1" : "0",
          old: b,
          new: c,
          changed: b !== c ? "1" : "0",
        });
        this.l = a;
        a = QD(this.l, this.G);
        aG(this, "updateAdsRenderingSettings", { adsRenderingSettings: a });
      }
    };
    l.skip = function () {
      aG(this, "skip");
    };
    l.start = function () {
      if (this.adTagUrl) {
        (yc || Ac) && X.g().report(50, { customPlayback: iF(this.g) });
        this.g.ta() ||
          X.g().report(26, {
            adtagurl: this.adTagUrl,
            customPlayback: iF(this.g),
          });
        Fm(this.g.o) &&
          X.g().report(30, {
            adtagurl: this.adTagUrl,
            customPlayback: iF(this.g),
          });
        var a = this.g.l,
          b = this.g.o,
          c;
        if ((c = a && b && !Fm(a)))
          (a = zE(a)),
            (b = zE(b)),
            (c =
              0 < a.width &&
              0 < a.height &&
              0 < b.width &&
              0 < b.height &&
              a.left <= b.left + b.width &&
              b.left <= a.left + a.width &&
              a.top <= b.top + b.height &&
              b.top <= a.top + a.height);
        b = c;
        X.g().report(31, {
          adtagurl: this.adTagUrl,
          customPlayback: iF(this.g),
          covers: b,
        });
      }
      if (!this.g.ta() && !iF(this.g)) throw fB(dB);
      b = this.g;
      b.F = this.G && null != b.l;
      this.g.A.g.style.opacity = "1";
      if (null != this.B && 1 === this.getVolume()) {
        var d, e;
        if (
          "boolean" === typeof (null == (d = this.B) ? void 0 : d.muted) &&
          (null == (e = this.B) ? 0 : e.muted)
        )
          this.setVolume(0);
        else {
          var f;
          if ("number" === typeof (null == (f = this.B) ? void 0 : f.volume)) {
            var g;
            d = null == (g = this.B) ? void 0 : g.volume;
            if (0 <= d && 1 >= d) {
              var h;
              this.setVolume(null == (h = this.B) ? void 0 : h.volume);
            }
          }
        }
      }
      this.ma = !0;
      aG(this, "start");
    };
    l.Nf = function () {
      if (!this.l.disableClickThrough && null != this.h) {
        var a = this.h.data.clickThroughUrl;
        null != a && Bv(a, this.h.data.attributionParams);
      }
    };
    l.resize = function (a, b, c) {
      var d = this.g,
        e = d.o;
      null != e &&
        (-1 === a
          ? ((e.style.right = "0"), (e.style.left = "0"))
          : (e.style.width = a + "px"),
        -1 === b
          ? ((e.style.bottom = "0"), (e.style.top = "0"))
          : (e.style.height = b + "px"));
      e = d.A;
      e.g.width = -1 === a ? "100%" : String(a);
      e.g.height = -1 === b ? "100%" : String(b);
      try {
        e.g.offsetTop = e.g.offsetTop;
      } catch (f) {}
      d.size = new A(a, b);
      aG(this, "resize", { width: a, height: b, viewMode: c });
    };
    l.stop = function () {
      aG(this, "stop");
    };
    l.expand = function () {
      aG(this, "expand");
    };
    l.collapse = function () {
      aG(this, "collapse");
    };
    l.getVolume = function () {
      return this.volume;
    };
    l.setVolume = function (a) {
      this.volume = a;
      this.g.da.setVolume(a);
      aG(this, "volume", { volume: a });
    };
    l.pause = function () {
      aG(this, "pause");
    };
    l.resume = function () {
      aG(this, "resume");
    };
    l.destroy = function () {
      this.W();
    };
    l.getCuePoints = function () {
      return this.ba;
    };
    l.nf = function () {
      return this.h;
    };
    l.L = function () {
      aG(this, "destroy");
      null != this.j && this.j.W();
      this.U.W();
      this.F.clear();
      this.A && (this.A.stop(), this.A.W());
      yC() && EE(this.I, this.N);
      M.prototype.L.call(this);
    };
    l.df = function () {
      X.g().report(124, { api: "clicked" });
      var a = this.h && this.h.data.clickThroughUrl,
        b;
      if (a && (null == (b = this.h) ? 0 : b.he())) {
        var c;
        Bv(a, null == (c = this.h) ? void 0 : c.data.attributionParams);
      }
      aG(this, "click");
    };
    l.focus = function () {
      RA(this.D, "userInteraction", "focusUiElement");
    };
    var $F = function (a, b) {
      var c = b.gfpCookieUserEnabled;
      b = b.gfpCookieClearData;
      var d = new et();
      d = Te(d, 1, c ? "0" : "1");
      d = Ae(d, 2, ce(2147483647));
      d = Te(d, 3, "/");
      d = Te(d, 4, window.location.hostname);
      var e = new RF(),
        f,
        g;
      a = null != (g = null == (f = a.Na) ? void 0 : kA(f)) ? g : null;
      SF(e, "__gpi_opt_out", d, a);
      if (!c || b) TF(e, "__gads", a), TF(e, "__gpi", a);
    };
    Z.prototype.clicked = Z.prototype.df;
    Z.prototype.getCurrentAd = Z.prototype.nf;
    Z.prototype.getCuePoints = Z.prototype.getCuePoints;
    Z.prototype.destroy = Z.prototype.destroy;
    Z.prototype.resume = Z.prototype.resume;
    Z.prototype.pause = Z.prototype.pause;
    Z.prototype.setVolume = Z.prototype.setVolume;
    Z.prototype.getVolume = Z.prototype.getVolume;
    Z.prototype.collapse = Z.prototype.collapse;
    Z.prototype.expand = Z.prototype.expand;
    Z.prototype.stop = Z.prototype.stop;
    Z.prototype.resize = Z.prototype.resize;
    Z.prototype.start = Z.prototype.start;
    Z.prototype.skip = Z.prototype.skip;
    Z.prototype.updateAdsRenderingSettings =
      Z.prototype.updateAdsRenderingSettings;
    Z.prototype.discardAdBreak = Z.prototype.discardAdBreak;
    Z.prototype.getAdSkippableState = Z.prototype.getAdSkippableState;
    Z.prototype.getRemainingTime = Z.prototype.getRemainingTime;
    Z.prototype.isCustomClickTrackingUsed = Z.prototype.isCustomClickTrackingUsed;
    Z.prototype.isCustomPlaybackUsed = Z.prototype.isCustomPlaybackUsed;
    Z.prototype.init = Z.prototype.init;
    function bG(a) {
      if (a instanceof PD) return X.g().report(174, { valid: !0 }), a;
      X.g().report(174, { valid: !1 });
      var b = new PD();
      b.append(a);
      return b;
    }
    var cG = { ADS_MANAGER_LOADED: "adsManagerLoaded" },
      dG = function (a, b) {
        ur.call(this, "adsManagerLoaded");
        this.g = a;
        this.j = b;
      };
    v(dG, ur);
    dG.prototype.getAdsManager = function (a, b) {
      a = a || { currentTime: null };
      this.g.configureAdsManager(a, b);
      return this.g;
    };
    dG.prototype.getUserRequestContext = function () {
      return this.j;
    };
    dG.prototype.getUserRequestContext = dG.prototype.getUserRequestContext;
    dG.prototype.getAdsManager = dG.prototype.getAdsManager;
    y(
      "module$exports$google3$javascript$ads$interactivemedia$sdk$clientside$api$ads_manager_loaded_event.AdsManagerLoadedEvent.Type",
      cG
    );
    var eG = function () {
      this.j = this.h = "unknown";
      this.g = "0";
      this.adsResponse = null;
      this.adTagUrl = "";
      this.contentTitle = this.contentKeywords = this.contentDuration = null;
      this.forceNonLinearFullSlot = !1;
      this.nonLinearAdSlotWidth =
        this.nonLinearAdSlotHeight =
        this.liveStreamPrefetchSeconds =
        this.linearAdSlotWidth =
        this.linearAdSlotHeight =
          0;
      this.omidAccessModeRules = {};
      this.pageUrl = null;
      this.vastLoadTimeout = 5e3;
    };
    eG.prototype.setAdWillAutoPlay = function (a) {
      this.h = a ? "auto" : "click";
    };
    eG.prototype.setAdWillPlayMuted = function (a) {
      this.j = a ? "muted" : "unmuted";
    };
    eG.prototype.setContinuousPlayback = function (a) {
      this.g = a ? "2" : "1";
    };
    eG.prototype.setContinuousPlayback = eG.prototype.setContinuousPlayback;
    eG.prototype.setAdWillPlayMuted = eG.prototype.setAdWillPlayMuted;
    eG.prototype.setAdWillAutoPlay = eG.prototype.setAdWillAutoPlay;
    var fG = function () {
      this.continuousPlayback = this.adWillPlayMuted = this.adWillAutoPlay = null;
      this.descriptionUrl = "";
      this.iconsSupported = !1;
      this.nonceLengthLimit = Number.MAX_SAFE_INTEGER;
      this.ppid =
        this.playerVersion =
        this.playerType =
        this.omidVersion =
        this.omidPartnerVersion =
        this.omidPartnerName =
          "";
      this.sessionId = $C;
      this.skippablesSupported = !1;
      this.supportedApiFrameworks = [];
      this.videoWidth = this.videoHeight = -1;
      this.url = "";
    };
    y("goog.pal.NonceRequest", fG);
    var hG = function (a, b) {
        this.g = this.h = null;
        this.j = "";
        if ((this.allowStorage = a.allowStorage))
          (this.g = new OA()), (this.h = NA), PA(this.g);
        gG();
        this.o = new IC(5e3, b);
      },
      iG = function (a, b) {
        var c, d, e, f, g, h, k, n, m, p, u, r, x, B, P, ka, pa, ha;
        return Ka(function (vb) {
          if (1 == vb.g)
            return (
              (a.j = ""),
              (c = a.g ? a.g.getId() : Promise.resolve(NA)),
              (d = MC(a.o)),
              (e = Promise.all([c, d])),
              Aa(vb, e, 2)
            );
          f = vb.h;
          g = t(f);
          h = g.next().value;
          k = g.next().value;
          n = h;
          m = k;
          if (H(hk) || JC())
            (u = {}),
              X.g().report(
                155,
                ((u.ws = HC()), (u.blob = null != (p = m) ? p : "undef"), u),
                !0
              );
          b.descriptionUrl &&
            ((r = /[:\/"<>#|?=]/),
            (x = b.descriptionUrl.match(r)),
            (P = 0 === (null == (B = x) ? void 0 : B.length)),
            (ka = {}),
            X.g().report(178, ((ka.durl = P), ka)));
          a.h = n;
          pa = {};
          X.g().report(
            182,
            ((pa.aid = !!n.id),
            (pa.aidf = !!a.g),
            (pa.hsc = !!a.allowStorage),
            pa)
          );
          var qc = Map,
            Ic = [],
            Fd = Ic.concat;
          var fd = Map;
          var Dc = [],
            R = Dc.concat,
            Ea = new Map();
          Ea.set("eid", Oi().sort().join(","));
          Ea.set("aselc", "3");
          Ea.set("correlator", "");
          Ea.set("pal_v", "0.0.0");
          H(ik)
            ? (Ea.set("ref", new el().g || window.document.referrer),
              Ea.set("useragent", Eb()))
            : (Ea.set("ref", bD(new el().g || window.document.referrer)),
              Ea.set("useragent", bD(Eb())));
          Ea.set("sdkv", "h.3.2.2");
          Ea = ia(Ea);
          var va = new Map();
          null != b.adWillAutoPlay &&
            va.set("vpa", b.adWillAutoPlay ? "auto" : "click");
          null != b.adWillPlayMuted &&
            va.set("vpmute", b.adWillPlayMuted ? "1" : "0");
          null != b.continuousPlayback &&
            va.set("vconp", b.continuousPlayback ? "2" : "1");
          va.set("wta", b.iconsSupported ? "1" : "0");
          va.set("pss", b.skippablesSupported ? "1" : "0");
          H(ik)
            ? (500 >= b.descriptionUrl.length &&
                va.set("video_url_to_fetch", b.descriptionUrl),
              200 >= b.ppid.length && va.set("ppid", b.ppid),
              200 >= b.playerType.length && va.set("mpt", b.playerType),
              200 >= b.playerVersion.length && va.set("mpv", b.playerVersion),
              va.set("sid", b.sessionId))
            : (500 >= b.descriptionUrl.length &&
                va.set("video_url_to_fetch", bD(b.descriptionUrl)),
              200 >= b.ppid.length && va.set("ppid", bD(b.ppid)),
              200 >= b.playerType.length && va.set("mpt", bD(b.playerType)),
              200 >= b.playerVersion.length && va.set("mpv", bD(b.playerVersion)),
              va.set("sid", bD(b.sessionId)));
          var tb = b.videoHeight,
            Pa = b.videoWidth;
          if (-1 !== tb || -1 !== Pa) {
            var oG = 0 <= tb ? tb.toString() : "0",
              pG = 0 <= Pa ? Pa.toString() : "0",
              Jw = "l";
            tb > Pa && (Jw = "p");
            va.set("vp_h", oG);
            va.set("vp_w", pG);
            va.set("u_so", Jw);
          }
          va = ia(va);
          tb = new Map();
          Pa = {};
          Pa.u_tz = -new Date().getTimezoneOffset();
          var zd = void 0 === zd ? K : zd;
          try {
            var Dj = zd.history.length;
          } catch (DG) {
            Dj = 0;
          }
          Pa.u_his = Dj;
          var La;
          Pa.u_h = null == (La = K.screen) ? void 0 : La.height;
          var Qb;
          Pa.u_w = null == (Qb = K.screen) ? void 0 : Qb.width;
          var la;
          Pa.u_ah = null == (la = K.screen) ? void 0 : la.availHeight;
          var he;
          Pa.u_aw = null == (he = K.screen) ? void 0 : he.availWidth;
          var Kw;
          Pa.u_cd = null == (Kw = K.screen) ? void 0 : Kw.colorDepth;
          tb.set("u_ah", aD(Pa.u_ah));
          tb.set("u_aw", aD(Pa.u_aw));
          tb.set("u_cd", aD(Pa.u_cd));
          tb.set("u_his", aD(Pa.u_his));
          tb.set("nhd", aD(Math.max(dl().length, 0)));
          tb.set("u_h", aD(Pa.u_h));
          tb.set("u_w", aD(Pa.u_w));
          tb.set("dt", aD(pt));
          tb.set("u_tz", aD(Pa.u_tz));
          fd = new fd(R.call(Dc, Ea, va, ia(tb)));
          fd = ia(fd);
          Dc = Map;
          R = [];
          Dj = R.concat;
          zd = a.h.id;
          La = a.j;
          Qb = new Map();
          zd && Qb.set("adsid", zd);
          Qb.set("sodar_correlator", La);
          m && Qb.set("scar", m);
          zd = ia(Qb);
          La = new Map();
          Qb = !1;
          la = b.omidVersion;
          0 < la.length &&
            200 >= la.length &&
            (H(ik)
              ? La.set("omid_v", la)
              : La.set("omid_v", encodeURIComponent(la)));
          la = b.omidPartnerName;
          he = b.omidPartnerVersion;
          0 < la.length &&
            0 < he.length &&
            200 >= la.length &&
            200 >= he.length &&
            (H(ik)
              ? La.set("omid_p", la + "/" + he)
              : La.set("omid_p", encodeURIComponent(la + "/" + he)),
            (Qb = !0));
          la = b.supportedApiFrameworks;
          !la.includes(7) && Qb && la.push(7);
          H(ik)
            ? La.set("sdk_apis", la.toString())
            : La.set("sdk_apis", encodeURIComponent(la.toString()));
          Qb = BC();
          la = hl();
          la = la.h ? la.h.url : la.g.url;
          H(ik)
            ? (La.set("top", Qb),
              b.url
                ? (La.set("url", b.url), La.set("loc", la))
                : La.set("url", la))
            : (La.set("top", encodeURI(Qb)),
              b.url
                ? (La.set("url", encodeURI(b.url)), La.set("loc", encodeURI(la)))
                : La.set("url", encodeURI(la)));
          Dc = new Dc(Dj.call(R, zd, ia(La)));
          ha = new qc(Fd.call(Ic, fd, ia(Dc)));
          return vb.return(ha);
        });
      },
      gG = function () {
        new Bw()
          .get({
            url: "https://pagead2.googlesyndication.com/getconfig/sodar?tid=pal&tv=1.0",
            withCredentials: !1,
            timeout: new Wv(),
          })
          .then(function (a) {
            if (a) {
              var b = a.injector_basename,
                c = a.sodar_query_id,
                d = a.bg_hash_basename,
                e = a.bg_binary;
              if (b && c && d && e) {
                a = window;
                var f = "//pagead2.googlesyndication.com/bg/" + vg(d) + ".js";
                d = a.document;
                e = { _bgu_: f, _bgp_: e, _li_: "v_h.h.3.2.2" };
                c && (e._sid_ = c);
                ((c = a.GoogleTyFxhY) && "function" == typeof c.push) ||
                  (c = a.GoogleTyFxhY = []);
                c.push(e);
                c = Ng(Gg(d).g, "SCRIPT");
                c.type = "text/javascript";
                c.async = !0;
                b = hg(new Af(yf, "//tpc.googlesyndication.com/sodar/%{path}"), {
                  path: vg(b) + ".js",
                });
                eh(c, b);
                (b = (a.GoogleTyFxhYEET || {})[c.src])
                  ? b()
                  : d.getElementsByTagName("head")[0].appendChild(c);
              }
            }
          });
      };
    var jG = function (a, b) {
        (0, a.__uspapi)("getUSPData", 1, function (c, d) {
          b.callback({ qc: null != c ? c : void 0, rc: d ? void 0 : 2 });
        });
      },
      kG = {
        zc: function (a) {
          return a.callback;
        },
        Sb: function (a, b) {
          a = {};
          return (
            (a.__uspapiCall = { callId: b, command: "getUSPData", version: 1 }), a
          );
        },
        Bb: function (a, b) {
          b = b.__uspapiReturn;
          var c;
          a({
            qc: null != (c = b.returnValue) ? c : void 0,
            rc: b.success ? void 0 : 2,
          });
        },
      };
    function lG(a) {
      var b = {};
      "string" === typeof a.data ? (b = JSON.parse(a.data)) : (b = a.data);
      return { payload: b, ke: b.__uspapiReturn.callId };
    }
    var mG = function (a, b) {
      b = void 0 === b ? {} : b;
      L.call(this);
      var c;
      this.timeoutMs = null != (c = b.timeoutMs) ? c : 500;
      this.caller = new yu(
        a,
        "__uspapiLocator",
        function (d) {
          return "function" === typeof d.__uspapi;
        },
        lG
      );
      this.caller.l.set("getDataWithCallback", jG);
      this.caller.o.set("getDataWithCallback", kG);
    };
    v(mG, L);
    mG.prototype.L = function () {
      this.caller.W();
      L.prototype.L.call(this);
    };
    var nG = function (a, b) {
      var c = {};
      if (zu(a.caller)) {
        var d = Ff(function () {
          b(c);
        });
        Bu(a.caller, "getDataWithCallback", {
          callback: function (e) {
            e.rc || (c = e.qc);
            d();
          },
        });
        setTimeout(d, a.timeoutMs);
      } else b(c);
    };
      
    var qG = JC() ? 500 : 2e3,
      rG = function (a) {
        M.call(this);
        var b = this,
          c = aA(cA(this.getSettings()));
        c && 0 < c.length && (Ni.reset(), Pi(new jj(c)));
        this.A = new RF();
        this.B = null;
        this.g = a;
        this.F = new Map();
        this.l = this.g.A;
        this.I = new cw(this);
        rn(this, this.I);
        this.U = new Ou(window, { timeoutMs: 500 });
        this.V = new mG(window, { timeoutMs: 500 });
        this.J = new IC(qG, GC);
        JC() && MC(this.J);
        a = new Ju(window, { timeoutMs: 500 });
        this.N = new sD(a, 500);
        rn(this, this.N);
        this.h = null;
        this.G = {};
        0 != dA.g ? ((this.j = new wE()), rn(this, this.j)) : (this.j = xE());
        yC() &&
          (this.j.init(rE(this.l)),
          (this.D = DE(this.j, this.g.B)),
          qn(this, function () {
            var d = b.D;
            b.j.j.delete(d);
            0 !== dA.g && (E(br).o[d] = null);
          }));
      };
    v(rG, M);
    rG.prototype.destroy = function () {
      this.W();
    };
    rG.prototype.getVersion = function () {
      return "h.3.597.0";
    };
    rG.prototype.requestAds = function (a, b) {
      var c = this,
        d = [],
        e = null;
      Qu(this.U) &&
        d.push(
          new Promise(function (h) {
            Tu(c.U, function (k) {
              e = k;
              h();
            });
          })
        );
      var f = null;
      zu(this.V.caller) &&
        d.push(
          new Promise(function (h) {
            nG(c.V, function (k) {
              f = k;
              h();
            });
          })
        );
      var g = null;
      d.push(
        uD(this.N).then(function (h) {
          g = h;
        })
      );
      Promise.all(d).then(function () {
        sG(c, a, b, { Dd: e, Gd: f, cd: g });
      });
    };
    var sG = function (a, b, c, d) {
      var e = b.adTagUrl;
      e &&
        X.g().report(8, {
          adtagurl: e,
          customPlayback: iF(a.g),
          customClick: null != a.g.l,
        });
      var f = "goog_" + zg++;
      a.F.set(f, c || null);
      var g = tG({ adTagUrl: e, ge: !1, Dd: d.Dd, Gd: d.Gd, cd: d.cd });
      a.h = hA(e, g || {});
      tC(a.h, function () {
        uG(a);
      });
      c = Promise.resolve();
      H(rk) &&
        (c = new Promise(function (k) {
          setTimeout(function () {
            k();
          }, 50);
        }));
      var h;
      d =
        null == (h = b.adTagUrl)
          ? void 0
          : h.includes("GOOGLE_INSTREAM_VIDEO_NONCE");
      h = jA(a.h);
      h = vG(a, h, d);
      d = wG(a, b);
      e = MC(a.J);
      Promise.all([c, h, d, e]).then(function (k) {
        k = t(k);
        k.next();
        k.next();
        var n = k.next().value;
        k = k.next().value;
        var m = {};
        m = ((m.limaExperimentIds = Oi().sort().join(",")), m);
        var p = a.getSettings(),
          u = CE(a.j);
        u = void 0 === u ? null : u;
        var r = {};
        null != u && (r.activeViewPushUpdates = u);
        r.activityMonitorMode = p.g;
        r.adsToken = p.K;
        r.autoPlayAdBreaks = p.o;
        r.companionBackfill = p.getCompanionBackfill();
        r.cookiesEnabled = p.isCookiesEnabled();
        r.disableCustomPlaybackForIOS10Plus =
          p.getDisableCustomPlaybackForIOS10Plus();
        r.engagementDetection = !0;
        r.isFunctionalTest = !1;
        r.isVpaidAdapter = p.h;
        r["1pJar"] = "";
        r.numRedirects = p.getNumRedirects();
        r.pageCorrelator = p.B;
        r.persistentStateCorrelator = Lh();
        r.playerType = p.getPlayerType();
        r.playerVersion = p.getPlayerVersion();
        r.ppid = p.getPpid();
        r.privacyControls = "";
        r.reportMediaRequests = !1;
        r.sessionId = p.sessionId;
        r.streamCorrelator = p.H;
        r.testingConfig = cA(p).g;
        r.urlSignals = p.N;
        r.vpaidMode = p.l;
        r.featureFlags = p.getFeatureFlags();
        u = b.adTagUrl;
        p = {};
        p.contentMediaUrl = a.g.K;
        p.customClickTrackingProvided = null != a.g.l;
        p.isAmp = CC();
        a: {
          try {
            var x = window.top.location.href;
          } catch (va) {
            x = 2;
            break a;
          }
          x = null == x ? 2 : x == window.document.location.href ? 0 : 1;
        }
        p.iframeState = x;
        p.imaHostingDomain = window.document.domain;
        p.imaHostingPageUrl = window.document.URL;
        p.topAccessiblePageUrl = BC();
        p.referrer = window.document.referrer;
        p.domLoadTime = a.l.I;
        p.sdkImplLoadTime = a.l.J;
        p.supportsResizing = !iF(a.g);
        x = C().location.ancestorOrigins;
        p.topOrigin = x
          ? 0 < x.length && 200 > x[x.length - 1].length
            ? x[x.length - 1]
            : ""
          : null;
        p.osdId = a.D;
        p.usesCustomVideoPlayback = iF(a.g);
        p.usesProxyMediaElement = jF(a.g);
        p.usesInlinePlayback = a.g.H;
        var B = a.g.Kc;
        x = [];
        var P = "",
          ka = "";
        if (null != B) {
          P = B;
          ka = !0;
          ka = void 0 === ka ? !1 : ka;
          for (var pa = [], ha = 0; P && 25 > ha; ++ha) {
            var vb = "";
            (void 0 !== ka && ka) ||
              (vb = (vb = 9 !== P.nodeType && P.id) ? "/" + vb : "");
            a: {
              if (P && P.nodeName && P.parentElement) {
                var qc = P.nodeName.toString().toLowerCase();
                for (
                  var Ic = P.parentElement.childNodes, Fd = 0, fd = 0;
                  fd < Ic.length;
                  ++fd
                ) {
                  var Dc = Ic[fd];
                  if (
                    Dc.nodeName &&
                    Dc.nodeName.toString().toLowerCase() === qc
                  ) {
                    if (P === Dc) {
                      qc = "." + Fd;
                      break a;
                    }
                    ++Fd;
                  }
                }
              }
              qc = "";
            }
            pa.push(
              (P.nodeName && P.nodeName.toString().toLowerCase()) + vb + qc
            );
            P = P.parentElement;
          }
          P = pa.join();
          if (B) {
            B =
              ((B = B.ownerDocument) && (B.defaultView || B.parentWindow)) ||
              null;
            ka = [];
            if (B)
              try {
                var R = B.parent;
                for (pa = 0; R && R !== B && 25 > pa; ++pa) {
                  var Ea = R.frames;
                  for (ha = 0; ha < Ea.length; ++ha)
                    if (B === Ea[ha]) {
                      ka.push(ha);
                      break;
                    }
                  B = R;
                  R = B.parent;
                }
              } catch (va) {}
            ka = ka.join();
          } else ka = "";
        }
        x.push(P, ka);
        if (null != u) {
          for (R = 0; R < tu.length - 1; ++R) x.push(ah(u, tu[R]) || "");
          R = ah(u, "videoad_start_delay");
          Ea = "";
          R &&
            ((R = parseInt(R, 10)),
            (Ea = 0 > R ? "postroll" : 0 == R ? "preroll" : "midroll"));
          x.push(Ea);
        } else for (R = 0; R < tu.length; ++R) x.push("");
        p = ((p.videoAdKey = rh(x.join(":")).toString()), p);
        R = {};
        m =
          ((R.consentSettings = g),
          (R.imalibExperiments = m),
          (R.settings = r),
          (R.videoEnvironment = p),
          R);
        r = {};
        r.adsResponse = b.adsResponse;
        r.videoPlayActivation = b.h;
        r.videoPlayMuted = b.j;
        r.videoContinuousPlay = b.g;
        r.adTagUrl = b.adTagUrl;
        r.contentDuration = b.contentDuration;
        r.contentKeywords = b.contentKeywords;
        r.contentTitle = b.contentTitle;
        r.linearAdSlotWidth = b.linearAdSlotWidth;
        r.linearAdSlotHeight = b.linearAdSlotHeight;
        r.nonLinearAdSlotWidth = b.nonLinearAdSlotWidth;
        r.nonLinearAdSlotHeight = b.nonLinearAdSlotHeight;
        r.forceNonLinearFullSlot = b.forceNonLinearFullSlot;
        r.liveStreamPrefetchSeconds = b.liveStreamPrefetchSeconds;
        r.vastLoadTimeout = b.vastLoadTimeout;
        r.omidAccessModeRules = b.omidAccessModeRules;
        r.pageUrl = b.pageUrl;
        Object.assign(m, r);
        if (a.h && dA.isCookiesEnabled()) {
          r = kA(a.h);
          p = a.A;
          if (0 === p.h) {
            if (r && QF("__gads", r, p.g)) R = !0;
            else if (
              ((R = p.g),
              Pe(r, 5) &&
                PF(R) &&
                new NF(R.document).set("GoogleAdServingTest", "Good", void 0),
              (R = "Good" === QF("GoogleAdServingTest", r, p.g)))
            )
              (Ea = p.g),
                Pe(r, 5) &&
                  PF(Ea) &&
                  new NF(Ea.document).remove(
                    "GoogleAdServingTest",
                    void 0,
                    void 0
                  );
            p.h = R ? 2 : 1;
          }
          m.isBrowserCookieEnabled = 2 === p.h;
          p = r ? QF("__gads", r, a.A.g) : null;
          null !== p && (m.gfpCookieValue = p);
          p = r ? QF("__gpi", r, a.A.g) : null;
          null !== p && (m.gfpCookieV2Id = p);
          r = r ? QF("__gpi_opt_out", r, a.A.g) : null;
          null !== r && (m.gfpCookieV2OptOut = r);
        }
        if ((r = PB(sC(a.h)))) (a.G.espSignals = r), (m.espSignals = r);
        n && (m.palSignals = Object.fromEntries(n));
        k && (m.gmaSignals = k);
        m.isEapLoader = !1;
        n = rE(a.l, f);
        a.I.O(n, "adsLoader", a.X);
        RA(n, "adsLoader", "requestAds", m);
        if (H(hk) || JC())
          (n = {}),
            X.g().report(
              155,
              ((n.ws = HC()), (n.blob = null != k ? k : "undef"), n),
              !0
            );
      });
    };
    rG.prototype.getSettings = function () {
      return dA;
    };
    rG.prototype.contentComplete = function () {
      RA(rE(this.l), "adsLoader", "contentComplete");
    };
    rG.prototype.X = function (a) {
      var b = a.messageType;
      switch (b) {
        case "adsLoaded":
          b = a.qa;
          a = a.sessionId;
          b = new Z(
            this.j,
            this.g,
            b.adTagUrl || "",
            b.adCuePoints,
            this.D,
            b.isCustomClickTrackingAllowed,
            rE(this.l, a),
            this.h
          );
          this.dispatchEvent(new dG(b, xG(this, a)));
          break;
        case "error":
          b = a.qa;
          this.dispatchEvent(new oF(new mF(b), xG(this, a.sessionId)));
          a = { error: b.errorCode, vis: Wh(document) };
          X.g().report(7, a);
          break;
        case "cookieUpdate":
          a = a.qa;
          if (null == a) break;
          if (dA.isCookiesEnabled()) {
            b = new eA();
            Ae(b, 5, Td(!0));
            var c = a.gfpCookie;
            c && SF(this.A, "__gads", ft(c), b);
            (c = a.gfpCookieV2) && SF(this.A, "__gpi", ft(c), b);
          }
          yG(this, a.encryptedSignalBidderIds || []);
          break;
        case "trackingUrlPinged":
          this.dispatchEvent(new qF(b, null, a.qa));
      }
    };
    var yG = function (a, b) {
        0 != b.length &&
          (b = uC(
            b.map(function (c) {
              return { kc: c };
            }),
            a.h
          )) &&
          b.forEach(function (c) {
            return c.then(function (d) {
              d && uG(a);
            });
          });
      },
      uG = function (a) {
        var b = PB(sC(a.h));
        b &&
          ((a.G.espSignals = b), RA(rE(a.l), "adsLoader", "signalsRefresh", a.G));
      },
      xG = function (a, b) {
        var c = a.F.get(b);
        a.F.delete(b);
        return c;
      },
      tG = function (a) {
        var b = a.Dd,
          c = a.Gd,
          d = a.cd,
          e = {};
        var f = void 0 === f ? w : f;
        return (
          (e.gfcLoaded = uh(f.top, "googlefcLoaded")),
          (e.isGdprLoader = a.ge),
          (e.addtlConsent = b ? b.addtlConsent : null),
          (e.gdprApplies = b ? b.gdprApplies : null),
          (e.tcString = b ? b.tcString : null),
          (e.uspString = c ? c.uspString : null),
          (e.gppString = d ? d.gppString : null),
          (e.gppSid = d ? d.sid : null),
          e
        );
      },
      wG = function (a, b) {
        if (!(H(nk) || H(ok) || H(pk) || H(qk))) return Promise.resolve(null);
        var c = new ZC();
        c.allowStorage = !jA(a.h);
        a = new hG(c, function () {
          return null;
        });
        c = new fG();
        var d = b.pageUrl || new URL(b.adTagUrl).searchParams.get("url");
        d && zv(d) && (c.url = d);
        c.videoHeight = b.linearAdSlotHeight;
        c.videoWidth = b.linearAdSlotWidth;
        return iG(a, c)
          .then(function (e) {
            for (var f = t(e.keys()), g = f.next(); !g.done; g = f.next())
              (g = g.value), lb(e.get(g)) && e.delete(g);
            return e;
          })
          .catch(function (e) {
            X.g().report(181, { message: null == e ? void 0 : e.message });
            return null;
          });
      },
      vG = function (a, b, c) {
        return b
          ? ((a.B = null), Promise.resolve())
          : c
          ? zG(a)
          : Promise.resolve();
      },
      zG = function (a) {
        var b;
        return Ka(function (c) {
          if (1 == c.g)
            return (
              a.B || ((a.B = new OA()), PA(a.B, "requester_type_8")),
              Aa(c, a.B.getId(), 2)
            );
          b = c.h;
          dA.K = b.id || "";
          c.g = 0;
        });
      };
    rG.prototype.contentComplete = rG.prototype.contentComplete;
    rG.prototype.getSettings = rG.prototype.getSettings;
    rG.prototype.requestAds = rG.prototype.requestAds;
    rG.prototype.getVersion = rG.prototype.getVersion;
    rG.prototype.destroy = rG.prototype.destroy;
    function AG(a, b) {
      return a && (a[b] || (a[b] = {}));
    }
    function BG(a, b) {
      var c;
      if (
        (c =
          void 0 === c
            ? "undefined" === typeof omidExports
              ? null
              : omidExports
            : c)
      )
        (a = a.split(".")),
          (a.slice(0, a.length - 1).reduce(AG, c)[a[a.length - 1]] = b);
    }
    var CG = new Map([
      [2, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.moatads\.com\/.*$/]],
      [
        3,
        [
          /^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.doubleverify\.com\/.*$/,
          /^(https?:\/\/|\/\/)?c\.[\w\-]+\.com\/vfw\/dv\/.*$/,
          /^(https?:\/\/|\/\/)?(www\.)?[\w]+\.tv\/r\/s\/d\/.*$/,
        ],
      ],
      [4, [/^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.adsafeprotected\.com\/.*$/]],
      [
        5,
        [
          /^https?:\/\/(q|cdn)\.adrta\.com\/s\/.*\/(aa|aanf)\.js.*$/,
          /^https:\/\/cdn\.rta247\.com\/s\/.*\/(aa|aanf)\.js.*$/,
        ],
      ],
      [6, []],
      [
        7,
        [
          /^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.voicefive\.com\/.*$/,
          /^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.measuread\.com\/.*$/,
          /^(https?:\/\/|\/\/)?[-a-zA-Z0-9.]+\.scorecardresearch\.com\/.*$/,
        ],
      ],
      [
        8,
        [/^(https?:\/\/|\/\/)?s418\.mxcdn\.net\/bb-serve\/omid-meetrics.*\.js$/],
      ],
      [
        9,
        [
          /^(https?:\/\/|\/\/)?pagead2\.googlesyndication\.com\/.*$/,
          /^(https?:\/\/|\/\/)?www\.googletagservices\.com\/.*$/,
        ],
      ],
    ]);
    BG("OmidSessionClient.verificationVendorIdForScriptUrl", function (a) {
      for (var b = t(CG.keys()), c = b.next(); !c.done; c = b.next()) {
        c = c.value;
        for (var d = t(CG.get(c)), e = d.next(); !e.done; e = d.next())
          if (e.value.test(a)) return c;
      }
      return 1;
    });
    BG("OmidSessionClient.VerificationVendorId", {
      OTHER: 1,
      MOAT: 2,
      DOUBLEVERIFY: 3,
      INTEGRAL_AD_SCIENCE: 4,
      PIXELATE: 5,
      NIELSEN: 6,
      COMSCORE: 7,
      MEETRICS: 8,
      GOOGLE: 9,
    });
    y("google.ima.AdCuePoints.POSTROLL", -1, window);
    y("google.ima.AdCuePoints.PREROLL", 0, window);
    y("google.ima.AdDisplayContainer", kF, window);
    y("google.ima.AdError.ErrorCode", U, window);
    y("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window);
    y("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window);
    y("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window);
    y("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window);
    y("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window);
    y("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window);
    y("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window);
    y("google.ima.AdError.Type", lF, window);
    y("google.ima.AdErrorEvent.Type", nF, window);
    y("google.ima.AdEvent.Type", pF, window);
    y("google.ima.AdsLoader", rG, window);
    y("google.ima.AdsManagerLoadedEvent.Type", cG, window);
    y("google.ima.CompanionAdSelectionSettings", WA, window);
    y("google.ima.CompanionAdSelectionSettings.CreativeType", TA);
    y("google.ima.CompanionAdSelectionSettings.ResourceType", UA);
    y("google.ima.CompanionAdSelectionSettings.SizeCriteria", VA);
    y(
      "google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED",
      "deprecated-event",
      window
    );
    y("ima.ImaSdkSettings", V, window);
    y("google.ima.settings", dA, window);
    y("google.ima.ImaSdkSettings.CompanionBackfillMode", {
      ALWAYS: "always",
      ON_MASTER_AD: "on_master_ad",
    });
    y("google.ima.ImaSdkSettings.VpaidMode", {
      DISABLED: 0,
      ENABLED: 1,
      INSECURE: 2,
      0: "DISABLED",
      1: "ENABLED",
      2: "INSECURE",
    });
    y("google.ima.AdsRenderingSettings", PD, window);
    y("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window);
    y("google.ima.AdsRequest", eG, window);
    y("google.ima.VERSION", "3.597.0");
    y("google.ima.OmidAccessMode", {
      LIMITED: "limited",
      DOMAIN: "domain",
      FULL: "full",
    });
    y("google.ima.OmidVerificationVendor", {
      COMSCORE: 7,
      DOUBLEVERIFY: 3,
      GOOGLE: 9,
      INTEGRAL_AD_SCIENCE: 4,
      MEETRICS: 8,
      MOAT: 2,
      NIELSEN: 6,
      PIXELATE: 5,
      OTHER: 1,
      7: "COMSCORE",
      3: "DOUBLEVERIFY",
      9: "GOOGLE",
      4: "INTEGRAL_AD_SCIENCE",
      8: "MEETRICS",
      2: "MOAT",
      6: "NIELSEN",
      5: "PIXELATE",
      1: "OTHER",
    });
    y("google.ima.UiElements", {
      AD_ATTRIBUTION: "adAttribution",
      COUNTDOWN: "countdown",
    });
    y("google.ima.ViewMode", { NORMAL: "normal", FULLSCREEN: "fullscreen" });
  })();
  