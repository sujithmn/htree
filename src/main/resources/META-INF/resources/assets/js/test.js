
String.prototype.startsWith || Object.defineProperty(String.prototype, "startsWith", {
        value: function(t, e) {
            var n = 0 < e ? 0 | e : 0;
            return this.substring(n, n + t.length) === t
        }
    }), String.prototype.includes || (String.prototype.includes = function(t, e) {
        "use strict";
        if (t instanceof RegExp) throw TypeError("first argument must not be a RegExp");
        return void 0 === e && (e = 0), -1 !== this.indexOf(t, e)
    }), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(t) {
            if (null == this) throw new TypeError('"this" is null or not defined');
            var e = Object(this),
                n = e.length >>> 0;
            if ("function" != typeof t) throw new TypeError("predicate must be a function");
            for (var i = arguments[1], r = 0; r < n;) {
                var s = e[r];
                if (t.call(i, s, r, e)) return r;
                r++
            }
            return -1
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(t) {
            if (null == this) throw new TypeError('"this" is null or not defined');
            var e = Object(this),
                n = e.length >>> 0;
            if ("function" != typeof t) throw new TypeError("predicate must be a function");
            for (var i = arguments[1], r = 0; r < n;) {
                var s = e[r];
                if (t.call(i, s, r, e)) return s;
                r++
            }
        }
    }), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
        value: function(t, e) {
            if (null == this) throw new TypeError('"this" is null or not defined');
            var n = Object(this),
                i = n.length >>> 0;
            if (0 == i) return !1;
            var r, s, o = 0 | e,
                a = Math.max(0 <= o ? o : i - Math.abs(o), 0);
            for (; a < i;) {
                if ((r = n[a]) === (s = t) || "number" == typeof r && "number" == typeof s && isNaN(r) && isNaN(s)) return !0;
                a++
            }
            return !1
        }
    }), Array.prototype.fill || Object.defineProperty(Array.prototype, "fill", {
        value: function(t) {
            if (null == this) throw new TypeError("this is null or not defined");
            for (var e = Object(this), n = e.length >>> 0, i = arguments[1] >> 0, r = i < 0 ? Math.max(n + i, 0) : Math.min(i, n), s = arguments[2], o = void 0 === s ? n : s >> 0, a = o < 0 ? Math.max(n + o, 0) : Math.min(o, n); r < a;) e[r] = t, r++;
            return e
        }
    }), "function" != typeof Object.assign && (Object.assign = function(t, e) {
        "use strict";
        if (null == t) throw new TypeError("Cannot convert undefined or null to object");
        for (var n = Object(t), i = 1; i < arguments.length; i++) {
            var r = arguments[i];
            if (null != r)
                for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (n[s] = r[s])
        }
        return n
    }), window.Element && !Element.prototype.closest && (Element.prototype.closest = function(t) {
        var e, n = (this.document || this.ownerDocument).querySelectorAll(t),
            i = this;
        do {
            for (e = n.length; 0 <= --e && n.item(e) !== i;);
        } while (e < 0 && (i = i.parentElement));
        return i
    }), window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach),
    function() {
        window.dmx = window.dmx || {};
        var e = Object.prototype.toString,
            a = Object.prototype.hasOwnProperty,
            i = /\w*$/,
            d = /^(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array$/,
            u = function(t, e) {
                return t === e || t != t && e != e
            },
            r = function(t, e) {
                for (var n = t.length; n--;)
                    if (u(t[n][0], e)) return n;
                return -1
            },
            s = function(t, e) {
                return function(t) {
                    var e = typeof t;
                    return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t
                }(e) ? t["string" == typeof e ? "string" : "hash"] : t.map
            },
            o = function(t) {
                var e = -1,
                    n = null == t ? 0 : t.length;
                for (this.clear(); ++e < n;) {
                    var i = t[e];
                    this.set(i[0], i[1])
                }
            };
        o.prototype = {
            clear: function() {
                this.__data__ = [], this.size = 0
            },
            delete: function(t) {
                var e = this.__data__,
                    n = r(e, t);
                return !(n < 0) && (n == e.length - 1 ? e.pop() : e.splice(n, 1), --this.size, !0)
            },
            get: function(t) {
                var e = this.__data__,
                    n = r(e, t);
                return n < 0 ? void 0 : e[n][1]
            },
            has: function(t) {
                return -1 < r(this.__data__, t)
            },
            set: function(t, e) {
                var n = this.__data__;
                r(n, t);
                return index < 0 ? (++this.size, n.push([t, e])) : n[index][1] = e, this
            }
        };
        var c = function(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var i = t[e];
                this.set(i[0], i[1])
            }
        };
        c.prototype = {
            clear: function() {
                this.size = 0, this.__data__ = {
                    hash: new Hash,
                    map: new Map,
                    string: new Hash
                }
            },
            delete: function(t) {
                var e = s(this.__data__, t).delete(t);
                return this.size -= e ? 1 : 0, e
            },
            get: function(t) {
                return s(this.__data__, t).get(t)
            },
            has: function(t) {
                return s(this.__data__, t).has(t)
            },
            set: function(t, e) {
                var n = s(this.__data__, t),
                    i = n.size;
                return n.set(t, e), this.size += n.size == i ? 0 : 1, this
            }
        };
        var h = function(t) {
            var e = this.__data__ = new o(t);
            this.size = e.size
        };
        h.prototype = {
            clear: function() {
                this.__data__ = new o, this.size = 0
            },
            delete: function(t) {
                var e = this.__data__,
                    n = e.delete(t);
                return this.size = e.size, n
            },
            get: function(t) {
                return this.__data__.get(t)
            },
            has: function(t) {
                return this.__data__.has(t)
            },
            set: function(t, e) {
                var n = this.__data__;
                if (n instanceof o) {
                    var i = n.__data__;
                    if (i.length < 199) return i.push([t, e]), this.size = ++n.size, this;
                    n = this.__data__ = new c(i)
                }
                return n.set(t, e), this.size = n.size, this
            }
        };
        var l = function(t) {
                return e.call(t).slice(8, -1)
            },
            p = function(t) {
                return Array.isArray(t)
            },
            f = function(t) {
                return null != t && "object" == typeof t
            },
            m = function(t) {
                var e = new t.constructor(t.byteLength);
                return new Uint8Array(e).set(new Uint8Array(t)), e
            },
            v = function(t) {
                var e = m(t.buffer);
                return new t.constructor(e, t.byteOffset, t.length)
            },
            g = function(t, e) {
                var n = t.constructor;
                switch (e) {
                    case "ArrayBuffer":
                        return m();
                    case "Boolean":
                    case "Date":
                        return new n(+t);
                    case "DataView":
                        return function(t) {
                            var e = m(t.buffer);
                            return new t.constructor(e, t.byteOffset, t.byteLength)
                        }(t);
                    case "Float32Array":
                    case "Float64Array":
                    case "Int8Array":
                    case "Int16Array":
                    case "Int32Array":
                    case "Uint8Array":
                    case "Uint8ClampedArray":
                    case "Uint16Array":
                    case "Uint32Array":
                        return v(t);
                    case "Map":
                    case "Set":
                        return new n;
                    case "Number":
                    case "String":
                        return new n(t);
                    case "RegExp":
                        return function(t) {
                            var e = new t.constructor(t.source, i.exec(t));
                            return e.lastIndex = t.lastIndex, e
                        }(t);
                    case "ImageData":
                        return function(t) {
                            var e = v(t.data);
                            return new t.constructor(e, t.width, t.height)
                        }(t)
                }
            },
            x = function(n, t, e, i) {
                var r;
                if (!f(n)) return n;
                var s = l(n);
                if (r = p(n) ? function(t) {
                        return new t.constructor(t.length)
                    }(n) : "Object" == s ? {} : g(n, s), i = i || new h, "Map" == s) return n.forEach(function(t, e) {
                    r.set(e, x(t, e, n, i))
                }), r;
                if ("Set" == s) return n.forEach(function(t) {
                    r.add(x(t, t, n, i))
                }), r;
                if (function(t) {
                        return f(t) && d.test(l(t))
                    }(n)) return r;
                var o = p(n) ? void 0 : Object.keys(Object(n));
                return function(t, e) {
                    for (var n = -1, i = t.length; ++n < i && !1 !== e(t[n], n, t););
                }(o || n, function(t, e) {
                    o && (t = n[e = t]),
                        function(t, e, n) {
                            var i = t[e];
                            a.call(t, e) && u(i, n) && (void 0 !== n || e in t) || (t[e] = n)
                        }(r, e, x(t, e, n, i))
                }), r
            };
        dmx.clone = x
    }(),
    function() {
        window.dmx = window.dmx || {};
        var h = Object.prototype.hasOwnProperty,
            a = /^(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array$/,
            d = function(t) {
                return toString.call(t).slice(8, -1)
            },
            u = function(t) {
                return "object" == typeof t && null !== t
            },
            c = function(t) {
                var n = -1,
                    i = new Array(t.size);
                return t.forEach(function(t, e) {
                    i[++n] = [e, t]
                }), i
            },
            l = function(t) {
                var e = -1,
                    n = new Array(t.size);
                return t.forEach(function(t) {
                    n[++e] = t
                }), n
            },
            p = function(t, e) {
                var n = t.length;
                if (n != e.length) return !1;
                for (var i = -1; ++i < n;) {
                    var r = t[i],
                        s = e[i];
                    if (r !== s && !f(r, s)) return !1
                }
                return !0
            },
            n = function(t, e) {
                var n = Array.isArray(t),
                    i = Array.isArray(e),
                    r = n ? "Array" : d(t),
                    s = i ? "Array" : d(e),
                    o = r == s;
                return o && !("Object" == r) ? n || function(t) {
                    return u(t) && a.test(d(t))
                }(t) ? p(t, e) : function(t, e, n) {
                    switch (n) {
                        case "DataView":
                            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                            t = t.buffer, e = e.buffer;
                        case "ArrayBuffer":
                            return !(t.byteLength != e.byteLength || !f(new Uint8Array(t), new Uint8Array(e)));
                        case "Boolean":
                        case "Date":
                        case "Number":
                            return function(t, e) {
                                return t === e || t != t && e != e
                            }(+t, +e);
                        case "RegExp":
                        case "String":
                            return t == String(e);
                        case "Map":
                            var i = c;
                        case "Set":
                            return i || (i = l), t.size == e.size && p(i(t), i(e))
                    }
                }(t, e, r) : o && function(t, e) {
                    var n = Object.keys(t),
                        i = n.length;
                    if (i != Object.keys(e).length) return !1;
                    for (var r, s = i; s--;)
                        if (r = n[s], !h.call(e, r)) return !1;
                    for (var o = !0; ++s < i;) {
                        var a = t[r = n[s]],
                            d = e[r];
                        if (a !== d && !f(a, d)) {
                            o = !1;
                            break
                        }
                    }
                    if (o) {
                        var u = t.constructor,
                            c = e.constructor;
                        u != c && "constructor" in t && "constructor" in e && !("function" == typeof u && u instanceof u && "function" == typeof c && c instanceof c) && (o = !1)
                    }
                    return o
                }(t, e)
            },
            f = function(t, e) {
                return t === e || (null == t || null == e || !u(t) && !u(e) ? t != t && e != e : n(t, e))
            };
        dmx.equal = f
    }(), window.dmx = window.dmx || {}, dmx.__components = {}, dmx.__attributes = {
        before: {},
        mount: {},
        mounted: {}
    }, dmx.__formatters = {
        boolean: {},
        global: {},
        string: {},
        number: {},
        object: {},
        array: {}
    }, dmx.__adapters = {}, dmx.__actions = {}, dmx.config = {
        mapping: {
            form: "form",
            "button, input[type=button], input[type=submit], input[type=reset]": "button",
            "input[type=radio]": "radio",
            "input[type=checkbox]": "checkbox",
            "input[type=file][multiple]": "input-file-multiple",
            "input[type=file]": "input-file",
            input: "input",
            textarea: "textarea",
            "select[multiple]": "select-multiple",
            select: "select",
            ".checkbox-group": "checkbox-group",
            ".radio-group": "radio-group"
        }
    }, dmx.reIgnoreElement = /^(script|style)$/i, dmx.rePrefixed = /^dmx-/i, dmx.reExpression = /\{\{(.+?)\}\}/, dmx.reExpressionReplace = /\{\{(.+?)\}\}/g, dmx.reToggleAttribute = /^(checked|selected|disabled|required|hidden|async|autofocus|autoplay|default|defer|multiple|muted|novalidate|open|readonly|reversed|scoped)$/i, dmx.reDashAlpha = /-([a-z])/g, dmx.reUppercase = /[A-Z]/g, dmx.appConnect = function(t, e) {
        if (dmx.app) return alert("App already running!");
        t = t || document.documentElement, history.replaceState({
            title: document.title
        }, ""), window.onpopstate = function(t) {
            t.state && t.state.title && (document.title = t.state.title), dmx.requestUpdate()
        }, window.onhashchange = function() {
            dmx.requestUpdate()
        };
        var n = dmx.Component("app");
        dmx.app = new n(t, dmx.global), dmx.app.$update(), e && e()
    }, document.documentElement.style.visibility = "hidden", document.addEventListener("app:" == document.location.protocol ? "deviceready" : "DOMContentLoaded", function() {
        var t = document.querySelector(':root[dmx-app], [dmx-app], :root[is="dmx-app"], [is="dmx-app"]');
        t ? dmx.appConnect(t, function() {
            document.documentElement.style.visibility = "", t.removeAttribute("dmx-app")
        }) : (document.documentElement.style.visibility = "", console.warn("No APP root found!"))
    }), dmx.useHistory = window.history && window.history.pushState, dmx.extend = function() {
        var n = {},
            i = !1,
            t = 0,
            e = arguments.length;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (i = arguments[0], t++);
        for (var r = function(t) {
                for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i && "[object Object]" === Object.prototype.toString.call(t[e]) ? n[e] = dmx.extend(!0, n[e], t[e]) : null != t[e] && (n[e] = t[e]))
            }; t < e; t++) {
            r(arguments[t])
        }
        return n
    }, dmx.noop = function() {}, dmx.isset = function(t) {
        return void 0 !== v
    }, dmx.array = function(t) {
        return null == t ? [] : Array.prototype.slice.call(t)
    }, dmx.hashCode = function(t) {
        if (null == t) return 0;
        var e, n = JSON.stringify(t),
            i = 0;
        for (e = 0; e < n.length; e++) i = (i << 5) - i + n.charCodeAt(e), i &= i;
        return Math.abs(i)
    }, dmx.randomizer = function(t) {
        return t = +t || 0,
            function() {
                return (t = (9301 * t + 49297) % 233280) / 233280
            }
    }, dmx.repeatItems = function(t) {
        var e = [];
        if (t)
            if ("object" == typeof t) {
                var n = 0;
                for (var i in t) {
                    var r = dmx.clone(t[i]);
                    e.push(Object.assign({
                        $key: i,
                        $index: n,
                        $value: r
                    }, r)), n++
                }
            } else if ("number" == typeof t)
            for (var s = 0; s < t; s++) e.push({
                $key: String(s),
                $index: s,
                $value: s + 1
            });
        return e
    }, dmx.escapeRegExp = function(t) {
        return t.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&")
    }, dmx.validate = function(t) {
        return t.checkValidity()
    }, dmx.validateReset = function(t) {}, window.setImmediate ? dmx.nextTick = function(t, e) {
        return window.setImmediate(t.bind(e))
    } : window.postMessage ? function() {
        var n = [];
        window.addEventListener("message", function(t) {
            if (t.source === window && "dmxNextTick" === t.data && n.length) {
                var e = n.shift();
                e.fn.call(e.context)
            }
        }), dmx.nextTick = function(t, e) {
            n.push({
                fn: t,
                context: e
            }), window.postMessage("dmxNextTick", "*")
        }
    }() : dmx.nextTick = function(t, e) {
        window.setTimeout(t.bind(e), 0)
    }, dmx.requestUpdate = function() {
        var t = !1;
        return function() {
            t || (t = !0, dmx.nextTick(function() {
                t = !1, dmx.app && dmx.app.$update()
            }))
        }
    }(), dmx.debounce = function(e, n) {
        var i;
        return function() {
            var t = Array.prototype.slice.call(arguments);
            clearTimeout(i), i = setTimeout(function() {
                e.apply(null, t)
            }, n || 0)
        }
    }, dmx.keyCodes = {
        bs: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46,
        backspace: 8,
        pause: 19,
        capslock: 20,
        escape: 27,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        arrowleft: 37,
        arrowup: 38,
        arrowright: 39,
        arrowdown: 40,
        insert: 45,
        numlock: 144,
        scrolllock: 145,
        semicolon: 186,
        equal: 187,
        comma: 188,
        minus: 189,
        period: 190,
        slash: 191,
        backquote: 192,
        bracketleft: 219,
        backslash: 220,
        bracketright: 221,
        quote: 222,
        numpad0: 96,
        numpad1: 97,
        numpad2: 98,
        numpad3: 99,
        numpad4: 100,
        numpad5: 101,
        numpad6: 102,
        numpad7: 103,
        numpad8: 104,
        numpad9: 105,
        numpadmultiply: 106,
        numpadadd: 107,
        numpadsubstract: 109,
        numpaddivide: 111,
        f1: 112,
        f2: 113,
        f3: 114,
        f4: 115,
        f5: 116,
        f6: 117,
        f7: 118,
        f8: 119,
        f9: 120,
        f10: 121,
        f11: 122,
        f12: 123,
        digit0: 48,
        digit1: 49,
        digit2: 50,
        digit3: 51,
        digit4: 52,
        digit5: 53,
        digit6: 54,
        digit7: 55,
        digit8: 56,
        digit9: 57,
        keya: [65, 97],
        keyb: [66, 98],
        keyc: [67, 99],
        keyd: [68, 100],
        keye: [69, 101],
        keyf: [70, 102],
        keyg: [71, 103],
        keyh: [72, 104],
        keyi: [73, 105],
        keyj: [74, 106],
        keyk: [75, 107],
        keyl: [76, 108],
        keym: [77, 109],
        keyn: [78, 110],
        keyo: [79, 111],
        keyp: [80, 112],
        keyq: [81, 113],
        keyr: [82, 114],
        keys: [83, 115],
        keyt: [84, 116],
        keyu: [85, 117],
        keyv: [86, 118],
        keyw: [87, 119],
        keyx: [88, 120],
        keyy: [89, 121],
        keyz: [90, 122]
    }, dmx.eventListener = function(t, e, i, r) {
        var s, n = function(t) {
            if ((!r.self || t.target === t.currentTarget) && (!r.ctrl || t.ctrlKey) && (!r.alt || t.altKey) && (!r.shift || t.shiftKey) && (!r.meta || t.metaKey) && (!(t.originalEvent || t).nsp || Object.keys(r).includes((t.originalEvent || t).nsp)) && !((t.originalEvent || t) instanceof MouseEvent && null != r.button && t.button != (parseInt(r.button, 10) || 0))) {
                if ((t.originalEvent || t) instanceof KeyboardEvent) {
                    var n = [];
                    Object.keys(r).forEach(function(t) {
                        var e = parseInt(t, 10);
                        e ? n.push(e) : dmx.keyCodes[t] && n.push(dmx.keyCodes[t])
                    });
                    for (var e = 0; e < n.length; e++)
                        if (Array.isArray(n[e])) {
                            if (!n[e].includes(t.which)) return
                        } else if (t.which !== n[e]) return
                }
                if (r.stop && t.stopPropagation(), r.prevent && t.preventDefault(), t.originalEvent && (t = t.originalEvent), t.$data || (t.$data = {}), t instanceof MouseEvent && (t.$data.altKey = t.altKey, t.$data.ctrlKey = t.ctrlKey, t.$data.metaKey = t.metaKey, t.$data.shiftKey = t.shiftKey, t.$data.pageX = t.pageX, t.$data.pageY = t.pageY, t.$data.x = t.x || t.clientX, t.$data.y = t.y || t.clientY), t instanceof KeyboardEvent && (t.$data.altKey = t.altKey, t.$data.ctrlKey = t.ctrlKey, t.$data.metaKey = t.metaKey, t.$data.shiftKey = t.shiftKey, t.$data.location = t.location, t.$data.repeat = t.repeat, t.$data.code = t.code, t.$data.key = t.key), !r.debounce) return i.call(this, t);
                clearTimeout(s), s = setTimeout(i.bind(this, t), parseInt(r.debounce, 10) || 0)
            }
        };
        r = r || {}, window.Dom7 && 1 === t.nodeType ? Dom7(t).on(e.replace(/-/g, "."), n, !!r.capture) : window.jQuery && !r.capture ? jQuery(t).on(e.replace(/-/g, "."), n) : t.addEventListener(e.replace(/-/g, "."), n, !!r.capture)
    }, dmx.createClass = function(t, e) {
        var n = function() {
            t.constructor && t.constructor.apply(this, arguments)
        };
        return e && e.prototype && (n.prototype = Object.create(e.prototype)), Object.assign(n.prototype, t), n.prototype.constructor = n
    }, dmx.Config = function(t) {
        Object.assign(dmx.config, t)
    }, dmx.Component = function(t, e) {
        if (e) {
            var n = dmx.Component(e.extends) || dmx.BaseComponent;
            e.initialData = Object.assign({}, n.prototype.initialData, e.initialData), e.attributes = Object.assign({}, n.prototype.attributes, e.attributes), e.methods = Object.assign({}, n.prototype.methods, e.methods), e.events = Object.assign({}, n.prototype.events, e.events), e.hasOwnProperty("constructor") || (e.constructor = function(t, e) {
                n.call(this, t, e)
            }), e.type = t;
            var i = dmx.createClass(e, n);
            i.extends = e.extends, dmx.__components[t] = i
        }
        return dmx.__components[t]
    }, dmx.Attribute = function(t, e, n) {
        dmx.__attributes[e] || (dmx.__attributes[e] = {}), dmx.__attributes[e][t] = n
    }, dmx.Formatters = function(t, e) {
        for (var n in dmx.__formatters[t] || (dmx.__formatters[t] = {}), e) dmx.__formatters[t][n] = e[n]
    }, dmx.Formatter = function(t, e, n) {
        dmx.__formatters[t] || (dmx.__formatters[t] = {}), dmx.__formatters[t][e] = n
    }, dmx.Adapter = function(t, e, n) {
        return dmx.__adapters[t] || (dmx.__adapters[t] = {}), n && (dmx.__adapters[t][e] = n), dmx.__adapters[t][e]
    }, dmx.Actions = function(t) {
        for (var e in t) dmx.__actions[e] = t[e]
    }, dmx.Action = function(t, e) {
        dmx.__actions[t] = e
    },
    function() {
        var i = function(t) {
            if (!(this instanceof i)) return new i(t);
            if (t instanceof i) return t;
            if (!t) return this;
            var e = t.length;
            if (t.nodeType) this[0] = t, this.length = 1;
            else {
                if ("string" == typeof t) return i(document.querySelectorAll(t));
                if (e)
                    for (var n = 0; n < e; n++) t[n] && t[n].nodeType && (this[this.length] = t[n], this.length++)
            }
            return this
        };
        i.prototype = {
            constructor: i,
            length: 0,
            addClass: function(t) {
                for (var e = 0; e < this.length; e++) this[e].classList.add(t);
                return this
            },
            removeClass: function(t) {
                for (var e = 0; e < this.length; e++) this[e].classList.remove(t);
                return this
            },
            toggleClass: function(t) {
                for (var e = 0; e < this.length; e++) this[e].classList.toggle(t);
                return this
            },
            hasClass: function(t) {
                return !!this[0] && this[0].classList.contains(t)
            },
            attr: function(t, e) {
                if (1 === arguments.length && "string" == typeof t) return this[0] && this[0].getAttribute(t);
                for (var n = 0; n < this.length; n++)
                    if (2 === arguments.length) this[n].setAttribute(t, e);
                    else
                        for (var i in t) this[n].setAttribute(i, t[i]);
                return this
            },
            removeAttr: function(t) {
                for (var e = 0; e < this.length; e++) this[e].removeAttribute(t);
                return this
            },
            prop: function(t, e) {
                if (1 === arguments.length && "string" == typeof t) return this[0] && this[0][t];
                for (var n = 0; n < this.length; n++)
                    if (2 === arguments.length) this[n][t] = e;
                    else
                        for (var i in t) this[n][i] = t[i];
                return this
            },
            css: function(t, e) {
                if (1 === arguments.length && "string" == typeof t) return this[0] && window.getComputedStyle(this[0], null).getPropertyValue(t);
                for (var n = 0; n < this.length; n++)
                    if (2 === arguments.length) this[n].style.setProperty(t, e);
                    else
                        for (var i in t) this[n].style.setProperty(i, t[i]);
                return this
            },
            each: function(t, e) {
                if (!t) return this;
                for (var n = 0; n < this.length; n++)
                    if (!1 === t.call(e || this[n], n, this[n])) return this;
                return this
            },
            append: function() {
                for (var t = 0; t < arguments.length; t++)
                    for (var e = i(arguments[t]), n = 0; n < e.length; n++) this[0].appendChild(e[n]);
                return this
            },
            appendTo: function(t) {
                return i(t).append(this), this
            },
            detach: function() {
                for (var t = 0; t < this.length; t++) this[t].parentNode && this[t].parentNode.removeChild(this[t]);
                return this
            },
            empty: function() {
                for (var t = 0; t < this.length; t++) this[t].innerHTML = "";
                return this
            }
        }, dmx.dom = {
            get: function(t) {
                return i(document.getElementById(t))
            },
            select: function(t) {
                return i(t)
            },
            create: function(t) {
                var e = document.createElement(t);
                return i(e)
            },
            contains: function(t) {
                return document.documentElement.contains(t)
            },
            walk: function(t, e, n) {
                if (t) {
                    if (!1 === e.call(n, t)) return;
                    t.hasChildNodes() && Array.prototype.slice.call(t.childNodes, 0).forEach(function(t) {
                        dmx.dom.walk(t, e, n)
                    })
                }
            },
            getAttributes: function(t) {
                var e = [];
                if (1 == t.nodeType)
                    for (var n = 0; n < t.attributes.length; n++) {
                        var i = t.attributes[n];
                        if (i && i.specified && dmx.rePrefixed.test(i.name)) {
                            var r = i.name.substr(4),
                                s = null,
                                o = {};
                            r.split(".").forEach(function(t, e) {
                                if (0 === e) r = t;
                                else {
                                    var n = t.indexOf(":");
                                    0 < n ? o[t.substr(0, n)] = t.substr(n + 1) : o[t] = !0
                                }
                            });
                            var a = r.indexOf(":");
                            0 < a && (s = r.substr(a + 1), r = r.substr(0, a)), e.push({
                                name: r,
                                fullName: i.name,
                                value: i.value,
                                argument: s,
                                modifiers: o
                            })
                        }
                    }
                return e
            },
            remove: function(t) {
                Array.isArray(t) ? t.forEach(function(t) {
                    dmx.dom.remove(t)
                }) : t.parentNode && t.parentNode.removeChild(t)
            },
            replace: function(t, e) {
                t.parentNode && t.parentNode.replaceChild(e, t)
            }
        }
    }(),
    function() {
        var $ = {},
            e = {
                Boolean: "boolean",
                Null: "null",
                Undefinec: "undefined",
                Number: "number",
                BigInt: "number",
                String: "string",
                Date: "date",
                RegExp: "regexp",
                Blob: "blob",
                File: "file",
                FileList: "filelist",
                ArrayBuffer: "arraybuffer",
                ImageBitmap: "imagebitmap",
                ImageData: "imagedata",
                Array: "array",
                Object: "object",
                Map: "map",
                Set: "set",
                DataView: "array",
                Int8Array: "array",
                Uint8Array: "array",
                Uint8ClampedArray: "array",
                Int16Array: "array",
                Uint16Array: "array",
                Int32Array: "array",
                Uint32Array: "array",
                Float32Array: "array",
                Float64Array: "array",
                BigInt64Array: "array",
                BigUint64Array: "array"
            },
            A = {
                "{": "L_CURLY",
                "}": "R_CURLY",
                "(": "L_PAREN",
                ")": "R_PAREN",
                "[": "L_BRACKET",
                "]": "R_BRACKET",
                ".": "PERIOD",
                ",": "COMMA",
                ";": "SEMI",
                ":": "COLON",
                "?": "QUESTION",
                "+": "ADDICTIVE",
                "-": "ADDICTIVE",
                "*": "MULTIPLICATIVE",
                "/": "MULTIPLICATIVE",
                "%": "MULTIPLICATIVE",
                "===": "EQUALITY",
                "!==": "EQUALITY",
                "==": "EQUALITY",
                "!=": "EQUALITY",
                "<": "RELATIONAL",
                ">": "RELATIONAL",
                "<=": "RELATIONAL",
                ">=": "RELATIONAL",
                in: "RELATIONAL",
                "&&": "LOGICAL_AND",
                "||": "LOGICAL_OR",
                "!": "LOGICAL_NOT",
                "&": "BITWISE_AND",
                "|": "BITWISE_OR",
                "^": "BITWISE_XOR",
                "~": "BITWISE_NOT",
                "<<": "BITWISE_SHIFT",
                ">>": "BITWISE_SHIFT",
                ">>>": "BITWISE_SHIFT"
            },
            k = {
                n: "\n",
                f: "\f",
                r: "\r",
                t: "\t",
                v: "\v",
                "'": "'",
                '"': '"',
                "`": "`"
            },
            _ = {
                "**": function(t, e) {
                    return Math.pow(t(), e())
                },
                "??": function(t, e) {
                    return null == (t = t()) ? e() : t
                },
                in: function(t, e) {
                    return t() in e()
                },
                "?": function(t, e, n) {
                    return t() ? e() : n()
                },
                "+": function(t, e) {
                    return t = t(), e = e(), null == t ? e : null == e ? t : t + e
                },
                "-": function(t, e) {
                    return t() - e()
                },
                "*": function(t, e) {
                    return t() * e()
                },
                "/": function(t, e) {
                    return t() / e()
                },
                "%": function(t, e) {
                    return t() % e()
                },
                "===": function(t, e) {
                    return t() === e()
                },
                "!==": function(t, e) {
                    return t() !== e()
                },
                "==": function(t, e) {
                    return t() == e()
                },
                "!=": function(t, e) {
                    return t() != e()
                },
                "<": function(t, e) {
                    return t() < e()
                },
                ">": function(t, e) {
                    return t() > e()
                },
                "<=": function(t, e) {
                    return t() <= e()
                },
                ">=": function(t, e) {
                    return t() >= e()
                },
                "&&": function(t, e) {
                    return t() && e()
                },
                "||": function(t, e) {
                    return t() || e()
                },
                "&": function(t, e) {
                    return t() & e()
                },
                "|": function(t, e) {
                    return t() | e()
                },
                "^": function(t, e) {
                    return t() ^ e()
                },
                "<<": function(t, e) {
                    return t() << e()
                },
                ">>": function(t, e) {
                    return t() >> e()
                },
                ">>>": function(t, e) {
                    return t() >>> e()
                },
                "~": function(t) {
                    return ~t()
                },
                "!": function(t) {
                    return !t()
                }
            },
            C = {
                this: function(t) {
                    return function() {
                        return t.data
                    }
                },
                undefined: function() {
                    return function() {}
                },
                null: function() {
                    return function() {
                        return null
                    }
                },
                true: function() {
                    return function() {
                        return !0
                    }
                },
                false: function() {
                    return function() {
                        return !1
                    }
                },
                _: function() {
                    return function() {
                        return {
                            __dmxScope__: !0
                        }
                    }
                }
            },
            O = function() {
                return 0
            };
        dmx.getType = function(t) {
            return e[Object.prototype.toString.call(t).slice(8, -1)]
        }, dmx.lexer = function(s) {
            if ($[s]) return $[s];
            for (var t, e, n, o, i, r, a, d, u = [], c = 0, h = !0; c < s.length;) {
                if (n = c, o = l(), '"' != (d = o) && "'" != d && "`" != d || !h)
                    if ((m(o) || f(".") && p() && m(p())) && h) e = "NUMBER", t = b(), h = !1;
                    else if (v(o) && h) e = "IDENT", t = E(), f("(") && (e = "METHOD"), h = !1;
                else if (f("/") && h && ("(" == t || "," == t || "?" == t || ":" == t) && _()) e = "REGEXP", t = w(), h = !1;
                else {
                    if (" " == (a = o) || "\r" == a || "\t" == a || "\n" == a || "\v" == a || " " == a) {
                        c++;
                        continue
                    }
                    if ((r = l(3)) && A[r]) e = A[r], t = r, h = !0, c += 3;
                    else if ((i = l(2)) && A[i]) e = A[i], t = i, h = !0, c += 2;
                    else {
                        if (!A[o]) throw Error("Lexer Error: Unexpected token '" + o + "' at column " + c + " in expression [" + s + "]");
                        e = A[o], t = o, h = !0, c++
                    }
                } else e = "STRING", t = y(o), h = !1;
                u.push({
                    name: e,
                    index: n,
                    value: t
                })
            }
            return $[s] = u;

            function l(t) {
                return 1 < t ? s.substr(c, t) : s[c]
            }

            function p(t) {
                return c + (t = t || 1) < s.length && s[c + t]
            }

            function f(t) {
                return -1 != t.indexOf(o)
            }

            function m(t) {
                return "0" <= t && t <= "9"
            }

            function v(t) {
                return "a" <= t && t <= "z" || "A" <= t && t <= "Z" || "_" == t || "$" == t
            }

            function g(t) {
                return v(t) || m(t)
            }

            function x(t) {
                return "-" == t || "+" == t || m(t)
            }

            function y(t) {
                var e = "",
                    n = !1;
                for (c++; c < s.length;) {
                    if (o = l(), n) {
                        if ("u" == o) {
                            c++;
                            var i = l(4);
                            if (i.match(/[\da-f]{4}/i)) throw Error("Invalid unicode escape at column " + c + " in expression [" + s + "]");
                            e += String.fromCharCode(parseInt(i, 16)), c += 3
                        } else {
                            var r = k[o];
                            e += r || o
                        }
                        n = !1
                    } else if ("\\" == o) n = !0;
                    else {
                        if (o == t) return c++, "`" == t && (e = "{{" + e + "}}"), e;
                        e += o
                    }
                    c++
                }
                throw Error("Unterminated quote in expression [" + s + "]")
            }

            function b() {
                for (var t = "", e = !1; c < s.length;) {
                    if (o = l(), f(".") && p() && m(p()) || m(o)) t += o;
                    else {
                        var n = p();
                        if (f("eE") && x(n)) t += "e", e = !0;
                        else {
                            if (!(x(o) && n && m(n) && e)) {
                                if (!x(o) || n && m(n) || !e) break;
                                throw Error('Invalid exponent "' + o + '" in expression [' + s + "]")
                            }
                            t += o, e = !1
                        }
                    }
                    c++
                }
                return +t
            }

            function E() {
                for (var t = ""; c < s.length && g(o = l());) t += o, c++;
                return t
            }

            function w() {
                var t = "",
                    e = "",
                    n = !1;
                for (c++; c < s.length;) {
                    if (o = l(), n) n = !1;
                    else if ("\\" == o) n = !0;
                    else if ("/" == o) {
                        for (c++; - 1 != "ign".indexOf(o = l());) e += o, c++;
                        return new RegExp(t, e)
                    }
                    t += o, c++
                }
                throw Error("Unterminated regexp in expression [" + s + "]")
            }

            function _() {
                var t = c,
                    e = !0;
                try {
                    w()
                } catch (t) {
                    e = !1
                }
                return c = t, o = "/", e
            }
        }, dmx.parse = function(o, a) {
            if (a = a || dmx.app, dmx.reExpression.test(o)) return "{{" == o.substr(0, 2) && "}}" == o.substr(-2) && -1 == o.indexOf("{{", 2) ? dmx.parse(o.substring(2, o.length - 2), a) : o.replace(dmx.reExpressionReplace, function(t, e) {
                var n = dmx.parse(e, a);
                return null == n ? "" : n
            });
            if (o.trim()) {
                var t;
                try {
                    var d, n = dmx.lexer(o).slice(0);
                    t = function() {
                        var i = [];
                        for (;;)
                            if (0 < n.length && !(c("R_PAREN") || c("R_BRACKET") || c("R_CURLY") || c("COMMA") || c("SEMI")) && i.push(f()), !h("COMMA") && !h("SEMI")) return (1 == i.length ? i[0] : t)();

                        function t() {
                            for (var t, e = 0; e < i.length; e++) {
                                var n = i[e];
                                n && (t = n())
                            }
                            return t
                        }
                    }()
                } catch (t) {
                    console.error(t)
                }
                return t
            }

            function u() {
                if (0 === n.length) throw Error("Unexpected end in expression [" + o + "]");
                return n[0]
            }

            function c(t) {
                if (0 < n.length) {
                    var e = n[0];
                    if (!t || e.name == t) return e
                }
                return !1
            }

            function h(t) {
                var e = c(t);
                return !!e && (n.shift(), e)
            }

            function l(t) {
                if (!h(t)) throw Error("Unexpected token, expecting [" + t + "] in expression [" + o + "]")
            }

            function p(t) {
                var e = Array.prototype.slice.call(arguments, 1);
                return function() {
                    return _.hasOwnProperty(t) ? _[t].apply(a, e) : t
                }
            }

            function f() {
                return function t() {
                    var e, n = i(); {
                        if (h("QUESTION")) {
                            if (e = t(), h("COLON")) return p("?", n, e, t());
                            throw Error('Expecting a ":" in expression [' + o + "]")
                        }
                        return n
                    }
                }()
            }

            function i() {
                for (var t, e = r();;) {
                    if (!(t = h("LOGICAL_OR"))) return e;
                    e = p(t.value, e, r())
                }
            }

            function r() {
                var t, e = function() {
                    var t, e = s();
                    (t = h("BITWISE_OR")) && (e = p(t.value, e, s()));
                    return e
                }();
                return (t = h("LOGICAL_AND")) && (e = p(t.value, e, r())), e
            }

            function s() {
                var t, e = m();
                return (t = h("BITWISE_XOR")) && (e = p(t.value, e, m())), e
            }

            function m() {
                var t, e = function t() {
                    var e, n = v();
                    (e = h("EQUALITY")) && (n = p(e.value, n, t()));
                    return n
                }();
                return (t = h("BITWISE_AND")) && (e = p(t.value, e, m())), e
            }

            function v() {
                var t, e = function() {
                    var t, e = g();
                    for (; t = h("BITWISE_SHIFT");) e = p(t.value, e, g());
                    return e
                }();
                return (t = h("RELATIONAL")) && (e = p(t.value, e, v())), e
            }

            function g() {
                for (var t, e = x(); t = h("ADDICTIVE");) e = p(t.value, e, x());
                return e
            }

            function x() {
                for (var t, e = y(); t = h("MULTIPLICATIVE");) e = p(t.value, e, y());
                return e
            }

            function y() {
                var t;
                return (t = h("ADDICTIVE")) ? "+" == t.value ? e() : p(t.value, O, y()) : (t = h("LOGICAL_NOT")) ? p(t.value, y()) : e()
            }

            function e() {
                var t, e;
                if (h("L_PAREN")) t = f(), l("R_PAREN");
                else if (h("L_CURLY")) {
                    var n = {};
                    if ("R_CURLY" != u().name)
                        do {
                            var i = h().value;
                            l("COLON"), n[i] = f()()
                        } while (h("COMMA"));
                    t = p(n), l("R_CURLY")
                } else if (h("L_BRACKET")) {
                    var r = [];
                    if ("R_BRACKET" != u().name)
                        for (; r.push(f()()), h("COMMA"););
                    t = p(r), l("R_BRACKET")
                } else if (h("PERIOD")) t = c() ? w(p(a.data)) : p(a.data);
                else {
                    var s = h();
                    if (!1 === s) throw Error("Not a primary expression [" + o + "]");
                    t = "IDENT" == s.name ? C.hasOwnProperty(s.value) ? C[s.value](a) : function() {
                        return a.get(s.value)
                    } : "METHOD" == s.name ? p(dmx.__formatters.global[s.value] || function() {
                        window.warn && console.warn("Formatter " + s.value + " in expression [" + o + "] doesn't exist")
                    }) : function() {
                        return s.value
                    }
                }
                for (; e = h("L_PAREN") || h("L_BRACKET") || h("PERIOD");)
                    if ("(" == e.value) t = b(t, d);
                    else if ("[" == e.value) t = E(d = t);
                else {
                    if ("." != e.value) throw Error("Parse Error in expression [" + o + "]");
                    t = w(d = t)
                }
                return d = null, t
            }

            function b(n, i) {
                var r = [];
                if ("R_PAREN" != u().name)
                    for (; r.push(f()), h("COMMA"););
                return l("R_PAREN"),
                    function() {
                        var t = [];
                        i && t.push(i());
                        for (var e = 0; e < r.length; e++) t.push(r[e]());
                        return (n() || dmx.noop).apply(a, t)
                    }
            }

            function E(n) {
                var i = f();
                return l("R_BRACKET"),
                    function() {
                        var t = n(),
                            e = i();
                        if ("object" == typeof t && null != t) return t.__dmxScope__ ? a.get(e) : "map" == dmx.getType(t) ? t.get(e) : t[e]
                    }
            }

            function w(n) {
                var i = h();
                return function() {
                    var t = n(),
                        e = dmx.getType(t);
                    return "METHOD" == i.name ? "map" == e && "function" == typeof t.get("__" + i.value) ? (console.log("function", i.value, t.get("__" + i.value)), t.get("__" + i.value)) : "object" == e && "function" == typeof t["__" + i.value] ? t["__" + i.value] : dmx.__formatters[e] && dmx.__formatters[e][i.value] ? dmx.__formatters[e][i.value] : function() {
                        null != t && console.warn && console.warn("Formatter " + i.value + " in expression [" + o + "] doesn't exist for type " + e)
                    } : t && t.__dmxScope__ ? a.get(i.value) : "map" == e ? t.get(i.value) : t && t.hasOwnProperty(i.value) ? t[i.value] : void 0
                }
            }
        }
    }(), dmx.global = {
        data: {},
        seed: Math.random(),
        get: function(t) {
            if (this.data.hasOwnProperty(t)) return this.data[t]
        },
        set: function(t, e) {
            if ("object" != typeof t) dmx.equal(this.data[t], e) || (this.data[t] = e, dmx.requestUpdate());
            else
                for (var n in t) this.set(n, t[n])
        },
        del: function(t) {
            delete this.data[t], dmx.requestUpdate()
        }
    }, dmx.DataScope = function(t, e) {
        return "object" != typeof t && (t = {
            $value: t
        }), {
            parent: e || dmx.global,
            data: t,
            seed: Math.random(),
            get: function(t) {
                return this.data.hasOwnProperty(t) ? this.data[t] : this.parent ? "parent" == t ? this.parent.data : this.parent.get(t) : void 0
            },
            set: function(t, e) {
                if ("object" != typeof t) dmx.equal(this.data[t], e) || (this.data[t] = e);
                else
                    for (var n in t) this.set(n, t[n])
            },
            del: function(t) {
                delete this.data[t]
            }
        }
    }, dmx.BaseComponent = dmx.createClass({
        constructor: function(t, e) {
            this.$node = t, this.parent = e, this.bindings = {}, this.propBindings = {}, this.children = [], this.listeners = {}, this.props = {}, this.data = {}, this.seed = Math.random(), this.name = t.getAttribute("id") || t.getAttribute("name") || this.type.toLowerCase().replace(/^dmx-/, ""), this.name = this.name.replace(/[^\w]/g, ""), this.dmxDomId = t.getAttribute("dmxDomId");
            try {
                this.$parseAttributes(t), this.$initialData(), this.render(t), !1 !== this.beforeMount(t) && (this.$mount(t), this.$node && (this.$customAttributes("mounted", this.$node), this.dmxDomId && this.$node.setAttribute("dmxDomId", this.dmxDomId), (this.$node.dmxComponent = this).$node.dmxRendered = !0), this.dispatchEvent("mount"), this.mounted())
            } catch (t) {
                console.error(t)
            }
        },
        tag: null,
        initialData: {},
        attributes: {},
        methods: {},
        events: {
            mount: Event,
            destroy: Event
        },
        render: function(t) {
            if (this.tag) {
                if (this.tag.toUpperCase() !== this.$node.tagName) {
                    this.$node = document.createElement(this.tag);
                    for (var e = 0; e < t.attributes.length; e++) {
                        var n = t.attributes[e];
                        n.specified && this.$node.setAttribute(n.name, n.value)
                    }
                    this.$node.innerHTML = t.innerHTML
                }
            } else this.$node = null;
            this.$node && this.$parse()
        },
        find: function(t) {
            if (this.name == t) return this;
            for (var e = 0; e < this.children.length; e++) {
                var n = this.children[e].find(t);
                if (n) return n
            }
            return null
        },
        __find: function(t) {
            if (this.dmxDomId == t) return this;
            for (var e = 0; e < this.children.length; e++) {
                var n = this.children[e].__find(t);
                if (n) return n
            }
            return null
        },
        __replace: function(t) {
            var e = this.__find(t);
            if (e) {
                e.$destroy();
                var n = document.querySelector('[dmxDomId="' + t + '"]');
                if (n) {
                    var i = e.parent.children.indexOf(e),
                        r = dmx.__components[e.data.$type];
                    if (-1 < i && r) {
                        var s = new r(n, e.parent);
                        e.parent.children.splice(i, 1, s), s.name && e.parent.add(s.name, s.data)
                    }
                }
                dmx.requestUpdate()
            }
        },
        __remove: function(t) {
            var e = this.__find(t);
            if (e) {
                e.$destroy();
                var n = e.parent.children.indexOf(this); - 1 < n && e.parent.children.splice(n, 1), dmx.requestUpdate()
            }
        },
        beforeMount: dmx.noop,
        mounted: dmx.noop,
        beforeUpdate: dmx.noop,
        update: dmx.noop,
        updated: dmx.noop,
        beforeDestroy: dmx.noop,
        destroyed: dmx.noop,
        addEventListener: function(t, e) {
            t in this.listeners || (this.listeners[t] = []), this.listeners[t].push(e)
        },
        removeEventListener: function(t, e) {
            if (t in this.listeners)
                for (var n = this.listeners[t], i = 0; i < n.length; i++)
                    if (n[i] === e) return n.splice(i, 1), this.removeEventListener(t, e)
        },
        dispatchEvent: function(e, n, t, i) {
            if ("string" == typeof e) try {
                var r = this.events[e];
                e = new r(e, n)
            } catch (t) {
                var s = e;
                if ((e = document.createEvent("CustomEvent")).initEvent(s, n && n.bubbles, n && n.cancelable), !(e instanceof Event)) return console.warn("Unknown event " + e, this.events), !1;
                var o = e.preventDefault;
                e.preventDefault = function() {
                    o.call(this);
                    try {
                        Object.defineProperty(this, "defaultPrevented", {
                            get: function() {
                                return !0
                            }
                        })
                    } catch (t) {
                        this.defaultPrevented = !0
                    }
                    return e
                }
            }
            if (!(e.type in this.listeners)) return !0;
            var a = this.listeners[e.type];
            e.nsp = i, e.target = this, e.$data = t || {};
            for (var d = 0; d < a.length; d++) !1 === a[d].call(this, e) && e.preventDefault();
            return !e.defaultPrevented
        },
        $addChild: function(t, e) {
            var n = new dmx.__components[t](e, this);
            this.children.push(n), n.name && (this.data[n.name] && dmx.debug && console.warn('Duplicate name "' + n.name + '" found, component not added to scope.'), this.set(n.name, n.data))
        },
        $customAttributes: function(e, n) {
            dmx.dom.getAttributes(n).forEach(function(t) {
                dmx.__attributes[e][t.name] && (n.removeAttribute(t.fullName), dmx.__attributes[e][t.name].call(this, n, t))
            }, this)
        },
        $parse: function(n) {
            (n = n || this.$node) && (3 === n.nodeType && dmx.reExpression.test(n.nodeValue) && this.$addBinding(n.nodeValue, function(t, e) {
                n.nodeValue = t
            }), 1 === n.nodeType && (dmx.config.mapping && Object.keys(dmx.config.mapping).forEach(function(e) {
                dmx.array(n.querySelectorAll(e)).forEach(function(t) {
                    t.hasAttribute("is") || t.setAttribute("is", "dmx-" + dmx.config.mapping[e])
                })
            }), dmx.dom.walk(n, function(n) {
                if (n != this.$node) {
                    if (1 === n.nodeType) {
                        var t = n.tagName.toLowerCase(),
                            e = dmx.dom.getAttributes(n);
                        if (n.hasAttribute("is") && (t = n.getAttribute("is")), dmx.reIgnoreElement.test(t)) return !1;
                        if (this.$customAttributes("before", n), -1 !== e.findIndex(function(t) {
                                return "repeat" === t.name
                            })) return !1;
                        if (dmx.rePrefixed.test(t)) return (t = t.replace(/^dmx-/i, "")) in dmx.__components ? (n.isComponent = !0, n.dmxRendered ? window.__WAPPLER__ && n.dmxComponent && n.dmxComponent.$parse && n.dmxComponent.$parse() : this.$addChild(t, n), !1) : void console.warn("Unknown component found! " + t);
                        this.$customAttributes("mounted", n)
                    }
                    3 === n.nodeType && dmx.reExpression.test(n.nodeValue) && this.$addBinding(n.nodeValue, function(t, e) {
                        n.nodeValue = t
                    })
                }
            }, this)))
        },
        $update: function() {
            try {
                if (!1 !== this.beforeUpdate()) {
                    var t = dmx.clone(this.props);
                    this.$updateBindings(this.propBindings), this.$updateBindings(this.bindings);
                    try {
                        this.update(t)
                    } catch (t) {
                        console.error(t)
                    }
                    this.children.forEach(function(t) {
                        t.$update()
                    }), this.updated()
                }
            } catch (t) {
                console.error(t)
            }
        },
        $updateBindings: function(i) {
            Object.keys(i).forEach(function(t) {
                var e = i[t],
                    n = dmx.parse(t, this);
                dmx.equal(n, e.value) || (e.callbacks.forEach(function(t) {
                    t.call(this, n, e.value)
                }, this), e.value = dmx.clone(n))
            }, this)
        },
        $parseAttributes: function(s) {
            var o = this;
            this.attributes && (Object.keys(this.attributes).forEach(function(t) {
                var e = o.attributes[t],
                    n = e.default;
                if (s.hasAttribute(t) && (e.type == Boolean ? n = !0 : (n = s.getAttribute(t), e.type == Number && (n = Number(n)), e.type == String && (n = String(n)), e.validate && !e.validate(n) && (n = e.default)), s.removeAttribute(t)), s.hasAttribute("dmx-bind:" + t)) {
                    var i = s.getAttribute("dmx-bind:" + t),
                        r = o.$propBinding(t).bind(o);
                    o.propBindings[i] = o.propBindings[i] || {
                        value: null,
                        callbacks: []
                    }, o.propBindings[i].callbacks.push(r), s.removeAttribute("dmx-bind:" + t)
                }
                o.props[t] = dmx.clone(n)
            }), this.$updateBindings(this.propBindings)), this.events && Object.keys(this.events).forEach(function(t) {
                s.hasAttribute("on" + t) && (dmx.eventListener(o, t, Function("event", s.getAttribute("on" + t)), {}), s.removeAttribute("on" + t))
            }), dmx.dom.getAttributes(s).forEach(function(e) {
                "on" == e.name && this.events[e.argument] && (dmx.eventListener(o, e.argument, function(t) {
                    return t.originalEvent && (t = t.originalEvent), dmx.parse(e.value, dmx.DataScope({
                        $event: t.$data,
                        $originalEvent: t
                    }, o))
                }, e.modifiers), s.removeAttribute(e.fullName))
            }, this)
        },
        $propBinding: function(e) {
            var n = this.attributes[e],
                i = this;
            return function(t) {
                void 0 === t && (t = n.default), n.type == Boolean && (t = !!t), null != t && (n.type == Number && (t = Number(t)), n.type == String && (t = String(t))), n.validate && !n.validate(t) && (t = n.default), i.props[e] = dmx.clone(t)
            }
        },
        $initialData: function() {
            Object.assign(this.data, {
                $type: this.type
            }, "function" == typeof this.initialData ? this.initialData() : this.initialData), Object.keys(this.methods).forEach(function(t) {
                var e = this;
                this.data["__" + t] = function() {
                    return e.methods[t].apply(e, Array.prototype.slice.call(arguments, 1))
                }
            }, this)
        },
        $mount: function(t) {
            this.$placeholder && this.$node && dmx.dom.replace(this.$placeholder, this.$node)
        },
        $addBinding: function(t, e) {
            this.bindings[t] = this.bindings[t] || {
                value: null,
                callbacks: []
            }, this.bindings[t].callbacks.push(e), e.call(this, this.bindings[t].value)
        },
        $destroy: function() {
            this.dispatchEvent("destroy"), this.beforeDestroy(), this.$destroyChildren(), this.parent && this.parent.del(this.name), this.$node && dmx.dom.remove(this.$node), this.destroyed()
        },
        $destroyChildren: function() {
            this.children.forEach(function(t) {
                t.$destroy()
            }), this.children = []
        },
        get: function(t, e) {
            return this.data.hasOwnProperty(t) ? this.data[t] : this.parent && !0 !== e ? "parent" == t ? this.parent.data : this.parent.get(t) : null
        },
        add: function(t, e) {
            this.data[t] ? Array.isArray(this.data[t]) ? this.data[t].push(e) : this.data[t] = [this.data[t], e] : this.set(t, e), dmx.requestUpdate()
        },
        set: function(t, e) {
            if ("object" != typeof t) dmx.equal(this.data[t], e) || (this.data[t] = e, dmx.requestUpdate());
            else
                for (var n in t) this.set(n, t[n])
        },
        del: function(t) {
            delete this.data[t], dmx.requestUpdate()
        }
    }),
    function() {
        dmx.pathToRegexp = s, dmx.pathToRegexp.parse = i, dmx.pathToRegexp.compile = function(t, e) {
            return n(i(t, e))
        }, dmx.pathToRegexp.tokensToFunction = n, dmx.pathToRegexp.tokensToRegExp = r;
        var $ = "/",
            A = new RegExp(["(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"), "g");

        function i(t, e) {
            for (var n, i = [], r = 0, s = 0, o = "", a = e && e.delimiter || $, d = e && e.whitelist || void 0, u = !1; null !== (n = A.exec(t));) {
                var c = n[0],
                    h = n[1],
                    l = n.index;
                if (o += t.slice(s, l), s = l + c.length, h) o += h[1], u = !0;
                else {
                    var p = "",
                        f = n[2],
                        m = n[3],
                        v = n[4],
                        g = n[5];
                    if (!u && o.length) {
                        var x = o.length - 1,
                            y = o[x];
                        (!d || -1 < d.indexOf(y)) && (p = y, o = o.slice(0, x))
                    }
                    o && (i.push(o), o = "", u = !1);
                    var b = "+" === g || "*" === g,
                        E = "?" === g || "*" === g,
                        w = m || v,
                        _ = p || a;
                    i.push({
                        name: f || r++,
                        prefix: p,
                        delimiter: _,
                        optional: E,
                        repeat: b,
                        pattern: w ? C(w) : "[^" + k(_ === a ? _ : _ + a) + "]+?"
                    })
                }
            }
            return (o || s < t.length) && i.push(o + t.substr(s)), i
        }

        function n(u) {
            for (var c = new Array(u.length), t = 0; t < u.length; t++) "object" == typeof u[t] && (c[t] = new RegExp("^(?:" + u[t].pattern + ")$"));
            return function(t, e) {
                for (var n = "", i = e && e.encode || encodeURIComponent, r = 0; r < u.length; r++) {
                    var s = u[r];
                    if ("string" != typeof s) {
                        var o, a = t ? t[s.name] : void 0;
                        if (Array.isArray(a)) {
                            if (!s.repeat) throw new TypeError('Expected "' + s.name + '" to not repeat, but got array');
                            if (0 === a.length) {
                                if (s.optional) continue;
                                throw new TypeError('Expected "' + s.name + '" to not be empty')
                            }
                            for (var d = 0; d < a.length; d++) {
                                if (o = i(a[d], s), !c[r].test(o)) throw new TypeError('Expected all "' + s.name + '" to match "' + s.pattern + '"');
                                n += (0 === d ? s.prefix : s.delimiter) + o
                            }
                        } else if ("string" != typeof a && "number" != typeof a && "boolean" != typeof a) {
                            if (!s.optional) throw new TypeError('Expected "' + s.name + '" to be ' + (s.repeat ? "an array" : "a string"))
                        } else {
                            if (o = i(String(a), s), !c[r].test(o)) throw new TypeError('Expected "' + s.name + '" to match "' + s.pattern + '", but got "' + o + '"');
                            n += s.prefix + o
                        }
                    } else n += s
                }
                return n
            }
        }

        function k(t) {
            return t.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
        }

        function C(t) {
            return t.replace(/([=!:$/()])/g, "\\$1")
        }

        function f(t) {
            return t && t.sensitive ? "" : "i"
        }

        function r(t, e, n) {
            for (var i = (n = n || {}).strict, r = !1 !== n.start, s = !1 !== n.end, o = n.delimiter || $, a = [].concat(n.endsWith || []).map(k).concat("$").join("|"), d = r ? "^" : "", u = 0; u < t.length; u++) {
                var c = t[u];
                if ("string" == typeof c) d += k(c);
                else {
                    var h = c.repeat ? "(?:" + c.pattern + ")(?:" + k(c.delimiter) + "(?:" + c.pattern + "))*" : c.pattern;
                    e && e.push(c), c.optional ? c.prefix ? d += "(?:" + k(c.prefix) + "(" + h + "))?" : d += "(" + h + ")?" : d += k(c.prefix) + "(" + h + ")"
                }
            }
            if (s) i || (d += "(?:" + k(o) + ")?"), d += "$" === a ? "$" : "(?=" + a + ")";
            else {
                var l = t[t.length - 1],
                    p = "string" == typeof l ? l[l.length - 1] === o : void 0 === l;
                i || (d += "(?:" + k(o) + "(?=" + a + "))?"), p || (d += "(?=" + k(o) + "|" + a + ")")
            }
            return new RegExp(d, f(n))
        }

        function s(t, e, n) {
            return t instanceof RegExp ? function(t, e) {
                if (!e) return t;
                var n = t.source.match(/\((?!\?)/g);
                if (n)
                    for (var i = 0; i < n.length; i++) e.push({
                        name: i,
                        prefix: null,
                        delimiter: null,
                        optional: !1,
                        repeat: !1,
                        pattern: null
                    });
                return t
            }(t, e) : Array.isArray(t) ? function(t, e, n) {
                for (var i = [], r = 0; r < t.length; r++) i.push(s(t[r], e, n).source);
                return new RegExp("(?:" + i.join("|") + ")", f(n))
            }(t, e, n) : function(t, e, n) {
                return r(i(t, n), e, n)
            }(t, e, n)
        }
    }(), window.Hjson || (window.Hjson = {}, Hjson.parse = function(t) {
        var r, s, a, d = {
            '"': '"',
            "'": "'",
            "\\": "\\",
            "/": "/",
            b: "\b",
            f: "\f",
            n: "\n",
            r: "\r",
            t: "\t"
        };

        function o(t) {
            return "{" === t || "}" === t || "[" === t || "]" === t || "," === t || ":" === t
        }

        function u(t) {
            var e, n = 0,
                i = 1;
            for (e = s - 1; 0 < e && "\n" !== r[e]; e--, n++);
            for (; 0 < e; e--) "\n" === r[e] && i++;
            throw new Error(t + " at line " + i + "," + n + " >>>" + r.substr(s - n, 20) + " ...")
        }

        function c() {
            return a = r.charAt(s), s++, a
        }

        function h(t) {
            return r.charAt(s + t)
        }

        function i(t) {
            for (var e = "", n = a; c();) {
                if (a === n) return c(), t && "'" === n && "'" === a && 0 === e.length ? (c(), l()) : e;
                if ("\\" === a)
                    if (c(), "u" === a) {
                        for (var i = 0, r = 0; r < 4; r++) {
                            c();
                            var s, o = a.charCodeAt(0);
                            "0" <= a && a <= "9" ? s = o - 48 : "a" <= a && a <= "f" ? s = o - 97 + 10 : "A" <= a && a <= "F" ? s = o - 65 + 10 : u("Bad \\u char " + a), i = 16 * i + s
                        }
                        e += String.fromCharCode(i)
                    } else {
                        if ("string" != typeof d[a]) break;
                        e += d[a]
                    }
                else "\n" === a || "\r" === a ? u("Bad string containing newline") : e += a
            }
            u("Bad string")
        }

        function l() {
            for (var t = "", e = 0, n = 0;;) {
                var i = h(-n - 5);
                if (!i || "\n" === i) break;
                n++
            }

            function r() {
                for (var t = n; a && a <= " " && "\n" !== a && 0 < t--;) c()
            }
            for (; a && a <= " " && "\n" !== a;) c();
            for ("\n" === a && (c(), r());;) {
                if (a) {
                    if ("'" === a) {
                        if (e++, c(), 3 === e) return "\n" === t.slice(-1) && (t = t.slice(0, -1)), t;
                        continue
                    }
                    for (; 0 < e;) t += "'", e--
                } else u("Bad multiline string");
                "\n" === a ? (t += "\n", c(), r()) : ("\r" !== a && (t += a), c())
            }
        }

        function p() {
            if ('"' === a || "'" === a) return i(!1);
            for (var t = "", e = s, n = -1;;) {
                if (":" === a) return t ? 0 <= n && n !== t.length && (s = e + n, u("Found whitespace in your key name (use quotes to include)")) : u("Found ':' but no key name (for an empty key name use quotes)"), t;
                a <= " " ? a ? n < 0 && (n = t.length) : u("Found EOF while looking for a key name (check your syntax)") : o(a) ? u("Found '" + a + "' where a key name was expected (check your syntax or use quotes if the key name includes {}[],: or whitespace)") : t += a, c()
            }
        }

        function f() {
            for (; a;) {
                for (; a && a <= " ";) c();
                if ("#" === a || "/" === a && "/" === h(0))
                    for (; a && "\n" !== a;) c();
                else {
                    if ("/" !== a || "*" !== h(0)) break;
                    for (c(), c(); a && ("*" !== a || "/" !== h(0));) c();
                    a && (c(), c())
                }
            }
        }

        function m(t, e) {
            var n, i, r = "",
                s = 0,
                o = !0,
                a = 0;

            function d() {
                return i = t.charAt(a), a++, i
            }
            for (d(), "-" === i && (r = "-", d());
                "0" <= i && i <= "9";) o && ("0" == i ? s++ : o = !1), r += i, d();
            if (o && s--, "." === i)
                for (r += "."; d() && "0" <= i && i <= "9";) r += i;
            if ("e" === i || "E" === i)
                for (r += i, d(), "-" !== i && "+" !== i || (r += i, d());
                    "0" <= i && i <= "9";) r += i, d();
            for (; i && i <= " ";) d();
            return e && ("," !== i && "}" !== i && "]" !== i && "#" !== i && ("/" !== i || "/" !== t[a] && "*" !== t[a]) || (i = 0)), n = +r, i || s || !isFinite(n) ? void 0 : n
        }

        function v(n) {
            function t(t) {
                var e = function t(e, n) {
                    var i, r, s, o;
                    switch (typeof e) {
                        case "string":
                            0 <= e.indexOf(n) && (o = e);
                            break;
                        case "object":
                            if ("[object Array]" === Object.prototype.toString.apply(e))
                                for (i = 0, s = e.length; i < s; i++) o = t(e[i], n) || o;
                            else
                                for (r in e) Object.prototype.hasOwnProperty.call(e, r) && (o = t(e[r], n) || o)
                    }
                    return o
                }(n, t);
                return e ? "found '" + t + "' in a string value, your mistake could be with:\n  > " + e + "\n  (unquoted strings contain everything up to the next line!)" : ""
            }
            return t("}") || t("]")
        }

        function e() {
            var e = [];
            try {
                if (c(), f(), "]" === a) return c(), e;
                for (; a;) {
                    if (e.push(g()), f(), "," === a && (c(), f()), "]" === a) return c(), e;
                    f()
                }
                u("End of input while parsing an array (missing ']')")
            } catch (t) {
                throw t.hint = t.hint || v(e), t
            }
        }

        function n(t) {
            var e = "",
                n = {};
            try {
                if (t || c(), f(), "}" === a && !t) return c(), n;
                for (; a;) {
                    if (e = p(), f(), ":" !== a && u("Expected ':' instead of '" + a + "'"), c(), n[e] = g(), f(), "," === a && (c(), f()), "}" === a && !t) return c(), n;
                    f()
                }
                if (t) return n;
                u("End of input while parsing an object (missing '}')")
            } catch (t) {
                throw t.hint = t.hint || v(n), t
            }
        }

        function g() {
            switch (f(), a) {
                case "{":
                    return n();
                case "[":
                    return e();
                case "'":
                case '"':
                    return i(!0);
                default:
                    return function() {
                        var t = a;
                        for (o(a) && u("Found a punctuator character '" + a + "' when expecting a quoteless string (check your syntax)");;) {
                            c();
                            var e = "\r" === a || "\n" === a || "" === a;
                            if (e || "," === a || "}" === a || "]" === a || "#" === a || "/" === a && ("/" === h(0) || "*" === h(0))) {
                                var n = t[0];
                                switch (n) {
                                    case "f":
                                        if ("false" === t.trim()) return !1;
                                        break;
                                    case "n":
                                        if ("null" === t.trim()) return null;
                                        break;
                                    case "t":
                                        if ("true" === t.trim()) return !0;
                                        break;
                                    default:
                                        if ("-" === n || "0" <= n && n <= "9") {
                                            var i = m(t);
                                            if (void 0 !== i) return i
                                        }
                                }
                                if (e) return t.trim()
                            }
                            t += a
                        }
                    }()
            }
        }

        function x(t) {
            return f(), a && u("Syntax error, found trailing characters"), t
        }
        if ("string" != typeof t) throw new Error("source is not a string");
        return r = t, s = 0, a = " ",
            function() {
                switch (f(), a) {
                    case "{":
                        return x(n());
                    case "[":
                        return x(e());
                    default:
                        return x(g())
                }
            }()
    }), dmx.Flow = dmx.createClass({
        constructor: function(t) {
            if (!(this instanceof dmx.Flow)) return new dmx.Flow(t);
            window.Promise || console.warn("Promises are not supported, flows can not be used"), this._execStep = this._execStep.bind(this), this.scope = new dmx.DataScope({}, t), this.output = {}
        },
        run: function(t) {
            var e = this;
            return this.output = {}, this._exec(t.exec || t).then(function() {
                return dmx.debug && console.debug("finished", e.output), e.output
            })
        },
        _each: function(t, r) {
            return Promise.resolve(t).then(function(i) {
                return (i = Array.isArray(i) ? i : [i]).reduce(function(t, e, n) {
                    return t.then(function() {
                        return r(e, n, i.length)
                    })
                }, Promise.resolve()).then(function() {
                    return i
                })
            })
        },
        _exec: function(e) {
            var n = this;
            if (e.steps) {
                var t = this._each(e.steps, this._execStep);
                return e.catch && t.catch(function(t) {
                    return n._each(e.catch, n._execStep)
                }), t
            }
            return this._each(e, this._execStep)
        },
        _execStep: function(t) {
            var e = this;
            for (var n in dmx.debug && console.debug("exec step", t), t) {
                if (dmx.__actions[n]) {
                    var i = dmx.__actions[n].bind(this),
                        r = t[n];
                    return dmx.debug && console.debug("exec action", n, r), r.disabled ? Promise.resolve() : Promise.resolve(i(r)).then(function(t) {
                        r.name && (dmx.debug && console.debug("set data", r.name, t), e.scope.set(r.name, t), r.output && (dmx.debug && console.debug("set output", r.name, t), e.output[r.name] = t))
                    })
                }
                throw new Error("Action " + n + " was not found.")
            }
        },
        parse: function(t) {
            if (null == t) return t;
            if ("object" != typeof(t = t.valueOf())) return "string" == typeof t && -1 != t.indexOf("{{") ? dmx.parse(t, this.scope) : t;
            var e = t.slice ? [] : {};
            for (var n in t) e[n] = this.parse(t[n], this.scope);
            return e
        }
    }), dmx.Flow.run = function(t, e) {
        return new dmx.Flow(e).run(t)
    }, dmx.Component("app", {
        constructor: function(t, e) {
            this.onload = this.onload.bind(this), dmx.BaseComponent.call(this, t, e)
        },
        initialData: {
            query: {}
        },
        attributes: {},
        methods: {},
        events: {
            ready: Event,
            load: Event
        },
        render: function(t) {
            this.parseQuery(), this.$parse(), window.removeEventListener("load", this.onload), window.addEventListener("load", this.onload), dmx.nextTick(function() {
                this.dispatchEvent("ready")
            }, this)
        },
        update: function() {
            this.parseQuery()
        },
        onload: function() {
            this.dispatchEvent("load")
        },
        parseQuery: function() {
            var t = "";
            window.location.search ? t = window.location.search.substr(1) : window.location.hash.indexOf("?") && 0 < (t = window.location.hash.substr(window.location.hash.indexOf("?") + 1)).indexOf("#") && (t = t.substr(0, t.indexOf("#")));
            var n = t.split("&").reduce(function(t, e) {
                    var n = e.replace(/\+/g, " ").split("=");
                    return n[0] && (t[decodeURIComponent(n[0])] = decodeURIComponent(n[1] || "")), t
                }, {}),
                e = document.querySelector('meta[name="ac:base"]'),
                i = document.querySelector('meta[name="ac:route"]');
            if (i && i.content) {
                var r = [],
                    s = i.content;
                e && e.content && (s = e.content.replace(/\/$/, "") + s);
                var o = dmx.pathToRegexp(s, r, {
                    end: !1
                }).exec(decodeURI(window.location.pathname));
                o && r.forEach(function(t, e) {
                    n[t.name] = o[e + 1]
                })
            }
            this.set("query", n)
        }
    }), dmx.Component("form", {
        tag: "form",
        attributes: {
            novalidate: {
                type: Boolean,
                default: !1
            }
        },
        methods: {
            submit: function(t) {
                t ? this._submit() : this.submit()
            },
            reset: function() {
                this.reset()
            },
            validate: function() {
                this.validate()
            }
        },
        events: {
            invalid: Event,
            submit: Event
        },
        render: function(t) {
            dmx.BaseComponent.prototype.render.call(this, t), this.$node.noValidate = !0, this.$node.addEventListener("submit", this.onsubmit.bind(this)), this.$node.addEventListener("reset", this.onreset.bind(this))
        },
        submit: function(t) {
            if (this.props.novalidate || this.validate()) this.dispatchEvent("submit", {
                cancelable: !0
            }) && this._submit();
            else {
                dmx.requestUpdate(), this.dispatchEvent("invalid");
                var e = dmx.array(this.$node.elements).find(function(t) {
                    if (!t.validity.valid) return !0
                });
                e && e.focus()
            }
        },
        _submit: function() {
            HTMLFormElement.prototype.submit.call(this.$node)
        },
        reset: function() {
            HTMLFormElement.prototype.reset.call(this.$node)
        },
        validate: function() {
            return dmx.validate(this.$node)
        },
        onsubmit: function(t) {
            t.preventDefault(), this.submit()
        },
        onreset: function(t) {
            dmx.validateReset(this.$node), window.grecaptcha && this.$node.querySelector(".g-recaptcha") && grecaptcha.reset(), dmx.requestUpdate()
        }
    }), dmx.Component("form-element", {
        constructor: function(t, e) {
            this.updateData = dmx.debounce(this.updateData.bind(this)), dmx.BaseComponent.call(this, t, e)
        },
        initialData: {
            value: "",
            disabled: !1,
            validationMessage: "",
            invalid: !1,
            focused: !1
        },
        attributes: {
            value: {
                type: String,
                default: ""
            },
            disabled: {
                type: Boolean,
                default: !1
            }
        },
        methods: {
            setValue: function(t) {
                this.setValue(t)
            },
            focus: function() {
                this.focus()
            },
            disable: function(t) {
                this.disable(t)
            },
            validate: function() {
                this.validate()
            }
        },
        events: {
            updated: Event,
            changed: Event
        },
        render: function(t) {
            dmx.BaseComponent.prototype.render.call(this, t), this.$node.value = this.props.value || "", this.$node.disabled = this.props.disabled, this.$node.defaultValue = this.props.value || "", this.$node.addEventListener("input", this.updateData.bind(this)), this.$node.addEventListener("change", this.updateData.bind(this)), this.$node.addEventListener("invalid", this.updateData.bind(this)), this.$node.addEventListener("focus", this.updateData.bind(this)), this.$node.addEventListener("blur", this.updateData.bind(this)), this.set("value", this.props.value || ""), this.set("disabled", this.props.disabled)
        },
        update: function(t) {
            dmx.equal(t.value, this.props.value) || (this.$node.defaultValue = this.props.value || "", this.setValue(this.props.value)), t.disabled != this.props.disabled && (this.$node.disabled = this.props.disabled), this.updateData()
        },
        updateData: function(t) {
            t && this.$node.dirty && dmx.validate(this.$node), this.$node.value !== this.data.value && dmx.nextTick(function() {
                this.dispatchEvent("updated"), t && this.dispatchEvent("changed")
            }, this), this.set("value", this.$node.value), this.set("disabled", this.$node.disabled), this.set("focused", this.$node === document.activeElement), this.$node.dirty && (this.set("invalid", !this.$node.validity.valid), this.set("validationMessage", this.$node.validationMessage))
        },
        setValue: function(t) {
            this.$node.value = t || "", this.updateData()
        },
        focus: function() {
            this.$node.focus()
        },
        disable: function(t) {
            this.$node.disabled = !0 === t, this.updateData()
        },
        validate: function() {
            dmx.validate(this.$node), this.updateData()
        }
    }), dmx.Component("textarea", {
        extends: "form-element",
        tag: "textarea",
        render: function(t) {
            if (!this.props.value) {
                var e = this.$node.value; - 1 !== e.indexOf("{{") ? this.props.value = dmx.parse(e, this) : this.props.value = e
            }
            dmx.Component("form-element").prototype.render.call(this, t)
        }
    }), dmx.Component("input", {
        extends: "form-element",
        tag: "input"
    }), dmx.Component("input-file", {
        extends: "input",
        initialData: {
            file: null
        },
        render: function(t) {
            dmx.Component("form-element").prototype.render.call(this, t), this.$node.addEventListener("change", this.onchange.bind(this))
        },
        onchange: function() {
            var e = null;
            if (this.$node.files.length) {
                var t = this.$node.files[0];
                e = {
                    date: (t.lastModified ? new Date(t.lastModified) : t.lastModifiedDate).toISOString(),
                    name: t.name,
                    size: t.size,
                    type: t.type,
                    dataUrl: null
                }, -1 === t.type.indexOf("image/") || t.reader || (t.reader = new FileReader, t.reader.onload = function(t) {
                    e.dataUrl = t.target.result, dmx.requestUpdate()
                }, t.reader.readAsDataURL(t))
            }
            this.set("file", e)
        },
        setValue: function() {
            console.warn("Can not set value of a file input!")
        }
    }), dmx.Component("input-file-multiple", {
        extends: "input",
        initialData: {
            files: []
        },
        render: function(t) {
            dmx.Component("form-element").prototype.render.call(this, t), this.$node.addEventListener("change", this.onchange.bind(this))
        },
        onchange: function() {
            var t = Array.prototype.slice.call(this.$node.files).map(function(t) {
                var e = {
                    date: (t.lastModified ? new Date(t.lastModified) : t.lastModifiedDate).toISOString(),
                    name: t.name,
                    size: t.size,
                    type: t.type,
                    dataUrl: null
                };
                return -1 === t.type.indexOf("image/") || t.reader || (t.reader = new FileReader, t.reader.onload = function(t) {
                    e.dataUrl = t.target.result, dmx.requestUpdate()
                }, t.reader.readAsDataURL(t)), e
            });
            this.set("files", t)
        },
        setValue: function() {
            console.warn("Can not set value of a file input!")
        }
    }), dmx.Component("input-number", {
        extends: "input",
        render: function(t) {
            dmx.Component("form-element").prototype.render.call(this, t), this.set("value", +this.props.value)
        },
        updateData: function(t) {
            t && this.$node.dirty && dmx.validate(this.$node), this.$node.value !== this.data.value && dmx.nextTick(function() {
                this.dispatchEvent("updated"), t && this.dispatchEvent("changed")
            }, this), this.set("value", this.$node.value ? +this.$node.value : null), this.set("disabled", this.$node.disabled), this.$node.dirty && (this.set("invalid", !this.$node.validity.valid), this.set("validationMessage", this.$node.validationMessage))
        }
    }), dmx.Component("button", {
        extends: "form-element",
        tag: "button",
        attributes: {
            type: {
                type: String,
                default: "button",
                validate: function(t) {
                    return /^(button|submit|reset)$/i.test(t)
                }
            }
        },
        render: function(t) {
            dmx.Component("form-element").prototype.render.call(this, t), this.$node.type = this.props.type, "INPUT" === t.tagName && (this.$node.innerText = this.props.value)
        }
    }), dmx.Component("radio", {
        extends: "form-element",
        initialData: {
            checked: !1
        },
        tag: "input",
        attributes: {
            checked: {
                type: Boolean,
                default: !1
            }
        },
        methods: {
            select: function(t) {
                this.select(t)
            }
        },
        render: function(t) {
            dmx.Component("form-element").prototype.render.call(this, t), this.$node.addEventListener("click", this.updateData.bind(this)), this.$node.type = "radio", this.$node.checked = this.props.checked, this.$node.defaultChecked = this.props.checked, this.set("checked", this.props.checked)
        },
        update: function(t) {
            dmx.Component("form-element").prototype.update.call(this, t), t.checked !== this.props.checked && (this.$node.checked = this.props.checked, this.$node.defaultChecked = this.props.checked), this.updateData()
        },
        updateData: function(t) {
            dmx.Component("form-element").prototype.updateData.call(this, t), this.data.checked != this.$node.checked && dmx.nextTick(function() {
                this.dispatchEvent("updated"), t && this.dispatchEvent("changed")
            }, this), this.set("checked", this.$node.checked)
        },
        select: function(t) {
            this.$node.checked = !1 !== t
        }
    }), dmx.Component("radio-group", {
        initialData: {
            value: ""
        },
        tag: "div",
        attributes: {
            value: {
                type: String,
                default: ""
            }
        },
        methods: {
            setValue: function(t) {
                this.setValue(t)
            }
        },
        events: {
            updated: Event
        },
        render: function(t) {
            dmx.BaseComponent.prototype.render.call(this, t), this.setValue(this.props.value)
        },
        update: function(t) {
            dmx.BaseComponent.prototype.update.call(this, t), t.value != this.props.value && (this.updateValue = !0, dmx.nextTick(function() {
                this.dispatchEvent("updated")
            }, this))
        },
        updated: function() {
            this.updateValue && (this.updateValue = !1, this.setValue(this.props.value, !0));
            var t = Array.prototype.slice.call(this.$node.querySelectorAll("input[type=radio]")).filter(function(t) {
                return !t.disabled && t.checked
            }).map(function(t) {
                return t.value || 1
            });
            dmx.equal(this.data.value, t[0]) || (this.set("value", t[0]), dmx.nextTick(function() {
                this.dispatchEvent("updated")
            }, this))
        },
        setValue: function(e, n) {
            Array.prototype.slice.call(this.$node.querySelectorAll("input[type=radio]")).forEach(function(t) {
                t.checked = t.value == e, n && (t.defaultChecked = t.checked)
            })
        }
    }), dmx.Component("checkbox", {
        extends: "form-element",
        initialData: {
            checked: !1
        },
        tag: "input",
        attributes: {
            checked: {
                type: Boolean,
                default: !1
            }
        },
        methods: {
            select: function(t) {
                this.select(t)
            }
        },
        render: function(t) {
            dmx.Component("form-element").prototype.render.call(this, t), this.$node.addEventListener("click", this.updateData.bind(this)), this.$node.type = "checkbox", this.$node.checked = this.props.checked, this.$node.defaultChecked = this.props.checked, this.set("checked", this.props.checked)
        },
        update: function(t) {
            dmx.Component("form-element").prototype.update.call(this, t), t.checked !== this.props.checked && (this.$node.checked = this.props.checked, this.$node.defaultChecked = this.props.checked), this.updateData()
        },
        updateData: function(t) {
            dmx.Component("form-element").prototype.updateData.call(this, t), this.data.checked != this.$node.checked && dmx.nextTick(function() {
                this.dispatchEvent("updated"), t && this.dispatchEvent("changed")
            }, this), this.set("checked", this.$node.checked)
        },
        select: function(t) {
            this.$node.checked = !1 !== t
        }
    }), dmx.Component("checkbox-group", {
        initialData: {
            value: []
        },
        tag: "div",
        attributes: {
            value: {
                type: Array,
                default: []
            }
        },
        methods: {
            setValue: function(t) {
                this.setValue(t)
            }
        },
        events: {
            updated: Event
        },
        render: function(t) {
            dmx.BaseComponent.prototype.render.call(this, t), this.setValue(this.props.value)
        },
        update: function(t) {
            dmx.BaseComponent.prototype.update.call(this, t), dmx.equal(t.value, this.props.value) || (this.updateValue = !0)
        },
        updated: function() {
            this.updateValue && (this.updateValue = !1, this.setValue(this.props.value));
            var t = Array.prototype.slice.call(this.$node.querySelectorAll("input[type=checkbox]")).filter(function(t) {
                return !t.disabled && t.checked
            }).map(function(t) {
                return t.value || 1
            });
            dmx.equal(this.data.value, t) || (this.set("value", t), dmx.nextTick(function() {
                this.dispatchEvent("updated")
            }, this))
        },
        setValue: function(e, n) {
            Array.isArray(e) || (e = [e]), Array.prototype.slice.call(this.$node.querySelectorAll("input[type=checkbox]")).forEach(function(t) {
                t.checked = -1 < e.indexOf(t.value), n && (t.defaultChecked = t.checked)
            })
        }
    }), dmx.Component("select", {
        extends: "form-element",
        initialData: {
            selectedIndex: -1
        },
        tag: "select",
        attributes: {
            options: {
                type: Array,
                default: []
            },
            optionText: {
                type: String,
                default: "$value"
            },
            optionValue: {
                type: String,
                default: "$value"
            }
        },
        methods: {
            setSelectedIndex: function(t) {
                this.$node.selectedIndex = t, this.updateData()
            }
        },
        render: function(t) {
            this.options = [], this.props.value ? this.updateValue = !0 : this.props.value = this.$node.value, dmx.BaseComponent.prototype.render.call(this, t), this.$node.disabled = this.props.disabled, this.$node.addEventListener("change", this.updateData.bind(this)), this.$node.addEventListener("invalid", this.updateData.bind(this)), this.$node.addEventListener("focus", this.updateData.bind(this)), this.$node.addEventListener("blur", this.updateData.bind(this)), this.renderOptions()
        },
        update: function(t) {
            dmx.equal(t.options, this.props.options) || (this.renderOptions(), this.updateValue = !0), dmx.equal(t.value, this.props.value) || (this.updateValue = !0), t.disabled != this.props.disabled && (this.$node.disabled = this.props.disabled), this.updateData()
        },
        updated: function() {
            this.updateValue && (this.updateValue = !1, this.setValue(this.props.value, !0), this.updateData())
        },
        updateData: function(t) {
            dmx.Component("form-element").prototype.updateData.call(this, t), this.set("selectedIndex", this.$node.selectedIndex)
        },
        setValue: function(e, n) {
            dmx.array(this.$node.options).forEach(function(t) {
                t.selected = t.value === e, n && (t.defaultSelected = t.selected)
            })
        },
        renderOptions: function() {
            this.options.splice(0).forEach(function(t) {
                dmx.dom.remove(t)
            }), Array.isArray(this.props.options) && this.props.options.forEach(function(t) {
                "object" != typeof t && (t = {
                    $value: t
                });
                var e = document.createElement("option");
                e.value = dmx.parse(this.props.optionValue, dmx.DataScope(t, this)), e.innerText = dmx.parse(this.props.optionText, dmx.DataScope(t, this)), this.options.push(this.$node.appendChild(e))
            }, this)
        }
    }), dmx.Component("select-multiple", {
        extends: "select",
        initialData: {
            value: []
        },
        attributes: {
            value: {
                type: Array,
                default: null
            }
        },
        methods: {
            setSelectedIndex: function(t) {
                this.$node.selectedIndex = t, this.updateData()
            }
        },
        update: function(t) {
            dmx.equal(t.options, this.props.options) || (this.renderOptions(), this.updateValue = !0), dmx.equal(t.value, this.props.value) || (this.updateValue = !0), t.disabled != this.props.disabled && (this.$node.disabled = this.props.disabled), this.updateData()
        },
        updateData: function(t) {
            var e = Array.prototype.slice.call(this.$node.options).filter(function(t) {
                return t.selected
            }).map(function(t) {
                return t.value
            });
            dmx.equal(this.data.value, e) || dmx.nextTick(function() {
                this.dispatchEvent("updated"), t && this.dispatchEvent("changed")
            }, this), this.set("value", e), this.set("disabled", this.$node.disabled), this.set("invalid", !this.$node.validity.valid), this.set("focused", this.$node === document.activeElement), this.set("validationMessage", this.$node.validationMessage), this.set("selectedIndex", this.$node.selectedIndex)
        },
        setValue: function(e, n) {
            Array.isArray(e) || (e = [e]), e = e.map(function(t) {
                return t.toString()
            }), dmx.array(this.$node.options).forEach(function(t) {
                t.selected = -1 < e.indexOf(t.value), n && (t.defaultSelected = t.selected)
            })
        }
    }), dmx.Component("value", {
        initialData: {
            value: null
        },
        attributes: {
            value: {
                default: null
            }
        },
        methods: {
            setValue: function(t) {
                this.data.value !== t && (this.set("value", t), dmx.nextTick(function() {
                    this.dispatchEvent("updated")
                }, this))
            }
        },
        events: {
            updated: Event
        },
        render: function() {
            this.set("value", this.props.value)
        },
        update: function(t) {
            dmx.equal(t.value, this.props.value) || (this.set("value", this.props.value), dmx.nextTick(function() {
                this.dispatchEvent("updated")
            }, this))
        }
    }), dmx.Component("repeat", {
        initialData: {
            items: []
        },
        attributes: {
            repeat: {
                type: [Array, Object, Number],
                default: []
            },
            key: {
                type: String,
                default: ""
            }
        },
        events: {
            update: Event,
            updated: Event
        },
        render: function(t) {
            for (this.prevItems = [], this.childKeys = {}, this.$template = document.createDocumentFragment(); this.$node.hasChildNodes();) this.$template.appendChild(this.$node.firstChild);
            this.update({
                repeat: []
            })
        },
        update: function(t) {
            if (!dmx.equal(t.repeat, this.props.repeat)) {
                this.dispatchEvent("update"), t.key !== this.props.key && this._clear();
                var e = dmx.Component("repeat-item"),
                    n = this.props.repeat,
                    i = dmx.repeatItems(n);
                if (i.length) {
                    if (this.props.key && i[0].hasOwnProperty(this.props.key) && this.prevItems.length) {
                        var r, s, o = this.props.key,
                            a = this.prevItems,
                            d = this._clone(i),
                            u = 0,
                            c = 0,
                            h = a.length - 1,
                            l = d.length - 1;
                        t: for (;;) {
                            for (; a[u][o] === d[c][o];)
                                if (this.childKeys[d[c][o]].set(d[c]), c++, h < ++u || l < c) break t;
                            for (; a[h][o] === d[l][o];)
                                if (this.childKeys[d[l][o]].set(d[l]), l--, --h < u || l < c) break t;
                            if (a[h][o] !== d[c][o]) {
                                if (a[u][o] !== d[l][o]) break;
                                if (s = l + 1, this.childKeys[d[l][o]].set(d[l]), this._moveChild(d[l][o], d[s] && d[s][o]), l--, h < ++u || l < c) break
                            } else if (this.childKeys[d[c][o]].set(d[c]), this._moveChild(d[c][o], a[u][o]), c++, --h < u || l < c) break
                        }
                        if (h < u)
                            for (s = l + 1; c <= l;) this._insertChild(d[c++], d[s] && d[s][o]);
                        else if (l < c)
                            for (; u <= h;) this._removeChild(a[u++][o]);
                        else {
                            var p = h - u + 1,
                                f = l - c + 1,
                                m = a,
                                v = new Array(f).fill(-1),
                                g = !1,
                                x = 0,
                                y = 0;
                            if (f <= 4 || p * f <= 16) {
                                for (_ = u; _ <= h; _++)
                                    if (y < f)
                                        for (r = c; r <= l; r++)
                                            if (a[_][o] === d[r][o]) {
                                                v[r - c] = _, r < x ? g = !0 : x = r, this.childKeys[d[r][o]].set(d[r]), y++, m[_] = null;
                                                break
                                            }
                            } else {
                                var b = {};
                                for (_ = c; _ <= l; _++) b[d[_][o]] = _;
                                for (_ = u; _ <= h; _++) y < f && void 0 !== (r = b[a[_][o]]) && (v[r - c] = _, r < x ? g = !0 : x = r, this.childKeys[d[r][o]].set(d[r]), y++, m[_] = null)
                            }
                            if (p === a.length && 0 === y)
                                for (this._clear(); c < f;) this._insertChild(d[c++], null);
                            else {
                                for (_ = p - y; 0 < _;) null !== m[u] && (this._removeChild(a[u][o]), _--), u++;
                                if (g) {
                                    var E = this._lis(v);
                                    for (r = E.length - 1, _ = f - 1; 0 <= _; _--) - 1 === v[_] ? (s = (x = _ + c) + 1, this._insertChild(d[x], d[s] && d[s][o])) : r < 0 || _ !== E[r] ? (s = (x = _ + c) + 1, this._moveChild(d[x][o], d[s] && d[s][o])) : r--
                                } else if (y !== f)
                                    for (_ = f - 1; 0 <= _; _--) - 1 === v[_] && (s = (x = _ + c) + 1, this._insertChild(d[x], d[s] && d[s][o]))
                            }
                        }
                    } else if (this.children.length > i.length && this.children.splice(i.length).forEach(function(t) {
                            t.$destroy()
                        }), this.children.length && this.children.forEach(function(t, e) {
                            t.set(i[e])
                        }), i.length > this.children.length) {
                        for (var w = document.createDocumentFragment(), _ = this.children.length; _ < i.length; _++) {
                            var $ = new e(this.$template.cloneNode(!0), this, i[_]);
                            $.$nodes.forEach(function(t) {
                                w.appendChild(t), $.$parse(t)
                            }), this.children.push($)
                        }
                        this.$node.appendChild(w)
                    }
                } else this._clear();
                this.props.key && (this.prevItems = this._clone(i), this.children.forEach(function(t) {
                    this.childKeys[t.data[this.props.key]] = t
                }, this)), this.set("items", this.children.map(function(t) {
                    return t.data
                })), dmx.nextTick(function() {
                    this.dispatchEvent("updated")
                }, this)
            }
        },
        _lis: function(t) {
            var e, n, i = t.slice(0),
                r = [];
            r.push(0);
            for (var s = 0, o = t.length; s < o; s++)
                if (-1 !== t[s]) {
                    var a = r[r.length - 1];
                    if (t[a] < t[s]) i[s] = a, r.push(s);
                    else {
                        for (e = 0, n = r.length - 1; e < n;) {
                            var d = (e + n) / 2 | 0;
                            t[r[d]] < t[s] ? e = 1 + d : n = d
                        }
                        t[s] < t[r[e]] && (0 < e && (i[s] = r[e - 1]), r[e] = s)
                    }
                } for (n = r[(e = r.length) - 1]; 0 < e--;) n = i[r[e] = n];
            return r
        },
        _clear: function() {
            this.childKeys = {}, this.children.splice(0).forEach(function(t) {
                t.$destroy()
            })
        },
        _insertChild: function(t, e) {
            var n = new(dmx.Component("repeat-item"))(this.$template.cloneNode(!0), this, t);
            n.$nodes.forEach(function(t) {
                e ? this.childKeys[e] ? this.$node.insertBefore(t, this.childKeys[e].$nodes[0]) : console.warn("(insert) can not insert node before key " + e + "!") : this.$node.appendChild(t), n.$parse(t)
            }, this), this.childKeys[t[this.props.key]] = n, this.children.push(n)
        },
        _moveChild: function(t, e) {
            var n = this.childKeys[t];
            n ? this.childKeys[e] ? n.$nodes.forEach(function(t) {
                this.$node.insertBefore(t, this.childKeys[e].$nodes[0])
            }, this) : n.$nodes.forEach(function(t) {
                this.$node.appendChild(t)
            }, this) : console.warn("(move) child with key " + t + " not found!")
        },
        _removeChild: function(t) {
            var e = this.childKeys[t];
            e ? (e.$destroy(), this.children.splice(this.children.indexOf(e), 1), delete this.childKeys[t]) : console.warn("(remove) child with key " + t + " not found!")
        },
        _clone: function(t) {
            return dmx.clone(t)
        }
    }), dmx.Component("repeat-item", {
        constructor: function(t, e, n, i) {
            this.parent = e, this.bindings = {}, this.propBindings = {}, this.children = [], this.listeners = [], this.props = {}, this.data = dmx.clone(n || {}), this.seed = e.seed, this.name = i || "repeat", this.$nodes = [];
            for (var r = 0; r < t.childNodes.length; r++) this.$nodes.push(t.childNodes[r])
        },
        $destroy: function() {
            this.dispatchEvent("destroy");
            for (var t = 0; t < this.$nodes.length; t++) {
                var e = document.createEvent("Event");
                e.initEvent("remove", !1, !0), this.$nodes[t].dispatchEvent(e) && dmx.dom.remove(this.$nodes[t])
            }
        }
    }), dmx.Component("fetch", {
        constructor: function(t, e) {
            this.fetch = dmx.debounce(this.fetch.bind(this)), dmx.BaseComponent.call(this, t, e)
        },
        initialData: {
            status: 0,
            data: null,
            links: {},
            paging: {},
            headers: {},
            state: {
                executing: !1,
                uploading: !1,
                processing: !1,
                downloading: !1
            },
            uploadProgress: {
                position: 0,
                total: 0,
                percent: 0
            },
            downloadProgress: {
                position: 0,
                total: 0,
                percent: 0
            },
            lastError: {
                status: 0,
                message: "",
                response: null
            }
        },
        attributes: {
            timeout: {
                type: Number,
                default: 0
            },
            method: {
                type: String,
                default: "GET"
            },
            url: {
                type: String,
                default: ""
            },
            params: {
                type: Object,
                default: {}
            },
            headers: {
                type: Object,
                default: {}
            },
            data: {
                type: Object,
                default: {}
            },
            "data-type": {
                type: String,
                default: "auto"
            },
            noload: {
                type: Boolean,
                default: !1
            },
            cache: {
                type: String,
                default: ""
            },
            ttl: {
                type: Number,
                default: 86400
            },
            credentials: {
                type: Boolean,
                default: !1
            }
        },
        methods: {
            abort: function() {
                this.abort()
            },
            load: function(t, e) {
                var n = {};
                t && (n.params = t), e && (n.ttl = 0), this.fetch(n)
            },
            reset: function() {
                this.abort(), this._reset(), this.set("data", null)
            }
        },
        events: {
            start: Event,
            done: Event,
            error: Event,
            invalid: Event,
            unauthorized: Event,
            forbidden: Event,
            abort: Event,
            success: Event,
            upload: ProgressEvent,
            download: ProgressEvent
        },
        $parseAttributes: function(t) {
            dmx.BaseComponent.prototype.$parseAttributes.call(this, t), dmx.dom.getAttributes(t).forEach(function(e) {
                "param" == e.name && e.argument && this.$addBinding(e.value, function(t) {
                    this.props.params[e.argument] = t
                }), "header" == e.name && e.argument && this.$addBinding(e.value, function(t) {
                    this.props.headers[e.argument] = t
                }), "data" == e.name && e.argument && this.$addBinding(e.value, function(t) {
                    this.props.data[e.argument] = t
                })
            }, this)
        },
        render: function(t) {
            this.xhr = new XMLHttpRequest, this.xhr.addEventListener("load", this.onload.bind(this)), this.xhr.addEventListener("abort", this.onabort.bind(this)), this.xhr.addEventListener("error", this.onerror.bind(this)), this.xhr.addEventListener("timeout", this.ontimeout.bind(this)), this.xhr.addEventListener("progress", this.onprogress("download").bind(this)), this.xhr.upload && this.xhr.upload.addEventListener("progress", this.onprogress("upload").bind(this)), this.update({})
        },
        update: function(t) {
            !this.props.noload && this.props.url && (t.url == this.props.url && dmx.equal(t.params, this.props.params) || this.fetch())
        },
        abort: function() {
            this.xhr.abort()
        },
        fetch: function(e) {
            this.xhr.abort(), e = dmx.extend(!0, this.props, e || {}), this._reset(), this.dispatchEvent("start");
            var t = (-1 < e.url.indexOf("?") ? "&" : "?") + Object.keys(e.params).filter(function(t) {
                return null != e.params[t]
            }, this).map(function(t) {
                return encodeURIComponent(t) + "=" + encodeURIComponent(e.params[t])
            }, this).join("&");
            if (this._url = e.url + t, window.WebviewProxy && (this._url = window.WebviewProxy.convertProxyUrl(this._url)), this.props.cache) {
                var n = dmx.parse(this.props.cache + '.data["' + this._url + '"]', this);
                if (n) {
                    if (!(Date.now() - n.created >= 1e3 * e.ttl)) return this.set("headers", n.headers || {}), this.set("paging", n.paging || {}), this.set("links", n.links || {}), this.set("data", n.data), this.dispatchEvent("success"), void this.dispatchEvent("done");
                    dmx.parse(this.props.cache + '.remove("' + this._url + '")', this)
                }
            }
            this.set("state", {
                executing: !0,
                uploading: !1,
                processing: !1,
                downloading: !1
            });
            var i = null;
            "GET" != this.props.method.toUpperCase() && ("text" == this.props["data-type"] ? (e.headers["Content-Type"] || (e.headers["Content-Type"] = "application/text"), i = this.props.data.toString()) : "json" == this.props["data-type"] ? (e.headers["Content-Type"] || (e.headers["Content-Type"] = "application/json"), i = JSON.stringify(this.props.data)) : "POST" == this.props.method.toUpperCase() ? (i = new FormData, Object.keys(this.props.data).forEach(function(e) {
                var t = this.props.data[e];
                Array.isArray(t) ? (/\[\]$/.test(e) || (e += "[]"), t.forEach(function(t) {
                    i.append(e, t)
                }, this)) : i.set(e, t)
            }, this)) : (e.headers["Content-Type"] || (e.headers["Content-Type"] = "application/text"), i = this.props.data.toString())), this.xhr.open(this.props.method.toUpperCase(), this._url), this.xhr.timeout = 1e3 * e.timeout, Object.keys(e.headers).forEach(function(t) {
                this.xhr.setRequestHeader(t, e.headers[t])
            }, this), this.xhr.setRequestHeader("accept", "application/json"), this.props.credentials && (this.xhr.withCredentials = !0);
            try {
                this.xhr.send(i)
            } catch (t) {
                this._done(t)
            }
        },
        _reset: function() {
            this.set({
                status: 0,
                links: {},
                headers: {},
                state: {
                    executing: !1,
                    uploading: !1,
                    processing: !1,
                    downloading: !1
                },
                uploadProgress: {
                    position: 0,
                    total: 0,
                    percent: 0
                },
                downloadProgress: {
                    position: 0,
                    total: 0,
                    percent: 0
                },
                lastError: {
                    status: 0,
                    message: "",
                    response: null
                }
            })
        },
        _done: function(t) {
            if (this._reset(), t) this.set("lastError", {
                status: 0,
                message: t.message,
                response: null
            }), this.dispatchEvent("error");
            else {
                var e = this.xhr.responseText;
                try {
                    e = JSON.parse(e)
                } catch (t) {
                    if (this.xhr.status < 400) return this.set("lastError", {
                        status: 0,
                        message: "Response was not valid JSON",
                        response: e
                    }), void this.dispatchEvent("error")
                }
                try {
                    var n = this.xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
                    this.set("headers", n.reduce(function(t, e) {
                        var n = e.split(": "),
                            i = n.shift(),
                            r = n.join(": ");
                        return t[i] = r, t
                    }, {}))
                } catch (t) {
                    console.warn("Error parsing response headers", t)
                }
                try {
                    var i = Object.keys(this.data.headers).find(function(t) {
                        return "link" == t.toLowerCase()
                    });
                    i && this.set("links", this.data.headers[i].split(/,\s*</).map(function(t) {
                        try {
                            var e = t.match(/<?([^>]*)>(.*)/),
                                n = e[1],
                                i = e[2].split(";"),
                                r = n.substr(n.indexOf("?") + 1);
                            0 < r.indexOf("#") && (r = r.substr(0, r.indexOf("#")));
                            var s = r.split("&").reduce(function(t, e) {
                                var n = e.split("=");
                                return n[0] && (t[decodeURIComponent(n[0])] = decodeURIComponent(n[1] || "")), t
                            }, {});
                            i.shift();
                            var o = i.reduce(function(t, e) {
                                var n = e.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
                                return n && (t[n[1]] = n[2]), t
                            }, {});
                            return (o = Object.assign({}, s, o)).url = n, o
                        } catch (t) {
                            return console.warn("Error parsing link header part", t), null
                        }
                    }).filter(function(t) {
                        return t && t.rel
                    }).reduce(function(e, n) {
                        return n.rel.split(/\s+/).forEach(function(t) {
                            e[t] = Object.assign(n, {
                                rel: t
                            })
                        }), e
                    }, {}))
                } catch (t) {
                    console.warn("Error parsing link header", t)
                }
                try {
                    var r = {
                        page: 1,
                        pages: 1,
                        items: 0,
                        has: {
                            first: !1,
                            prev: !1,
                            next: !1,
                            last: !1
                        }
                    };
                    if (this.data.links.prev || this.data.links.next) {
                        this.data.links.last && this.data.links.last.page ? r.pages = +this.data.links.last.page : this.data.links.prev && this.data.prev.page && (r.pages = +this.data.links.prev.page + 1);
                        var s = Object.keys(this.data.headers).find(function(t) {
                            return "x-total" == (t = t.toLowerCase()) || "x-count" == t || "x-total-count" == t
                        });
                        s && (r.items = +this.data.headers[s]), this.data.links.prev && this.data.links.prev.page ? r.page = +this.data.links.prev.page + 1 : this.data.links.next && this.data.links.next.page && (r.page = +this.data.links.next.page - 1), r.has = {
                            first: !!this.data.links.first,
                            prev: !!this.data.links.prev,
                            next: !!this.data.links.next,
                            last: !!this.data.links.last
                        }
                    }
                    this.set("paging", r)
                } catch (t) {
                    console.warn("Error parsing paging", t)
                }
                this.set("status", this.xhr.status), this.xhr.status < 400 ? (this.set("data", e), this.dispatchEvent("success"), this.props.cache && dmx.parse(this.props.cache + '.set("' + this._url + '", { headers: headers, paging: paging, links: links, data: data, created: ' + Date.now() + " })", this)) : (this.set("lastError", {
                    status: this.xhr.status,
                    message: this.xhr.statusText,
                    response: e
                }), 400 == this.xhr.status ? this.dispatchEvent("invalid") : 401 == this.xhr.status ? this.dispatchEvent("unauthorized") : 403 == this.xhr.status ? this.dispatchEvent("forbidden") : this.dispatchEvent("error"))
            }
            this.dispatchEvent("done")
        },
        onload: function(t) {
            this._done()
        },
        onabort: function(t) {
            this._reset(), this.dispatchEvent("abort"), this.dispatchEvent("done")
        },
        onerror: function(t) {
            this._done({
                message: "Failed to execute"
            })
        },
        ontimeout: function(t) {
            this._done({
                message: "Execution timeout"
            })
        },
        onprogress: function(n) {
            return function(t) {
                t.loaded = t.loaded || t.position;
                var e = t.lengthComputable ? Math.ceil(t.loaded / t.total * 100) : 0;
                this.set("state", {
                    executing: !0,
                    uploading: "upload" == n && e < 100,
                    processing: "upload" == n && 100 == e,
                    downloading: "download" == n
                }), this.set(n + "Progress", {
                    position: t.loaded,
                    total: t.total,
                    percent: e
                }), this.dispatchEvent(n, {
                    lengthComputable: t.lengthComputable,
                    loaded: t.loaded,
                    total: t.total
                })
            }
        }
    }), dmx.Component("serverconnect", {
        extends: "fetch",
        attributes: {
            sockets: {
                type: Boolean,
                default: !1
            }
        },
        render: function(t) {
            this.props.sockets ? (this.eventName = this.props.url.replace(/^(.*?)api\//, ""), this.socket = dmx.Socket("/api"), this.socket.on(this.eventName, this.refresh.bind(this)), this.update({})) : dmx.Component("fetch").prototype.render.call(this, t)
        },
        fetch: function(t) {
            this.props.sockets ? this.refresh(t && t.params) : dmx.Component("fetch").prototype.fetch.call(this, t)
        },
        refresh: function(t) {
            t = dmx.extend(!0, {}, this.props.params, t || {}), this.dispatchEvent("start"), this.set("state", {
                executing: !0,
                uploading: !1,
                processing: !0,
                downloading: !1
            }), this.socket.emit(this.eventName, t, function(t) {
                this.set("status", t.status), this.set("data", t.data), this.set("state", {
                    executing: !1,
                    uploading: !1,
                    processing: !1,
                    downloading: !1
                }), t.status < 400 ? this.dispatchEvent("success") : 400 == t.status ? this.dispatchEvent("invalid") : 401 == t.status ? this.dispatchEvent("unauthorized") : 403 == t.status ? this.dispatchEvent("forbidden") : this.dispatchEvent("error"), this.dispatchEvent("done")
            }.bind(this))
        }
    }), dmx.Component("serverconnect-form", {
        extends: "form",
        initialData: {
            status: 0,
            data: null,
            headers: {},
            state: {
                executing: !1,
                uploading: !1,
                processing: !1,
                downloading: !1
            },
            uploadProgress: {
                position: 0,
                total: 0,
                percent: 0
            },
            downloadProgress: {
                position: 0,
                total: 0,
                percent: 0
            },
            lastError: {
                status: 0,
                message: "",
                response: null
            }
        },
        attributes: {
            timeout: {
                type: Number,
                default: 0
            },
            autosubmit: {
                type: Boolean,
                default: !1
            },
            params: {
                type: Object,
                default: {}
            },
            headers: {
                type: Object,
                default: {}
            },
            "post-data": {
                type: String,
                default: "form"
            },
            credentials: {
                type: Boolean,
                default: !1
            }
        },
        methods: {
            abort: function() {
                this.abort()
            }
        },
        events: {
            start: Event,
            done: Event,
            error: Event,
            unauthorized: Event,
            forbidden: Event,
            abort: Event,
            success: Event,
            upload: ProgressEvent,
            download: ProgressEvent
        },
        $parseAttributes: function(t) {
            dmx.BaseComponent.prototype.$parseAttributes.call(this, t), dmx.dom.getAttributes(t).forEach(function(e) {
                "param" == e.name && e.argument && this.$addBinding(e.value, function(t) {
                    this.props.params[e.argument] = t
                }), "header" == e.name && e.argument && this.$addBinding(e.value, function(t) {
                    this.props.headers[e.argument] = t
                })
            }, this)
        },
        render: function(e) {
            this.xhr = new XMLHttpRequest, this.xhr.addEventListener("load", this.onload.bind(this)), this.xhr.addEventListener("abort", this.onabort.bind(this)), this.xhr.addEventListener("error", this.onerror.bind(this)), this.xhr.addEventListener("timeout", this.ontimeout.bind(this)), this.xhr.addEventListener("progress", this.onprogress("download").bind(this)), this.xhr.upload && this.xhr.upload.addEventListener("progress", this.onprogress("upload").bind(this));
            var n = e.checkValidity;
            e.dmxExtraData = {}, e.dmxExtraElements = [], e.checkValidity = function() {
                for (var t = 0; t < e.dmxExtraElements.length; t++) e.dmxExtraElements[t].validate && e.dmxExtraElements[t].validate();
                return n.call(e)
            }, dmx.Component("form").prototype.render.call(this, e), this.props.autosubmit && dmx.nextTick(function() {
                this.submit()
            }, this)
        },
        abort: function() {
            this.xhr.abort()
        },
        _submit: function(n) {
            this.xhr.abort();
            var t = this.$node.method.toUpperCase(),
                e = this.$node.action,
                i = null,
                r = Object.keys(this.props.params).filter(function(t) {
                    return null != this.props.params[t]
                }, this).map(function(t) {
                    return encodeURIComponent(t) + "=" + encodeURIComponent(this.props.params[t])
                }, this).join("&");
            "GET" == t ? (r += dmx.array(this.$node.elements).filter(function(t) {
                return !(n && n[t.name]) && !t.disabled && ("radio" !== t.type && "checkbox" !== t.type || t.checked)
            }).map(function(t) {
                return encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value)
            }).join("&"), n && Object.keys(n).forEach(function(e) {
                Array.isArray(n[e]) ? n[e].forEach(function(t) {
                    r += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(t)
                }) : r += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(n[e])
            })) : "json" == this.props["post-data"] ? (i = {}, dmx.array(this.$node.elements).forEach(function(t) {
                if (t.name && !t.disabled)
                    if ("radio" == t.type.toLowerCase) {
                        var e = document.querySelector('input[name="' + t.name + '"]:checked');
                        e && (i[t.name] = e.value)
                    } else if ("checkbox" == t.type) {
                    var n = document.querySelectorAll('input[name="' + t.name + '"]');
                    n.length && (1 == n.length ? i[t.name] = n[0].checked : i[t.name] = dmx.array(n).filter(function(t) {
                        return t.checked
                    }).map(function(t) {
                        return t.value
                    }))
                } else "select-multiple" == t.type ? i[t.name] = dmx.array(t.selectedOptions).map(function(t) {
                    return t.value
                }) : "file" == t.type ? t.files.length && (t.multiple ? i[t.name] = t.files.map(function(t) {
                    return t.name
                }) : i[t.name] = t.files[0].name) : i[t.name] = t.value
            }), n && Object.assign(i, n), this.$node.dmxExtraData && Object.assign(i, this.$node.dmxExtraData), this.props.headers["Content-Type"] = "application/json", i = JSON.stringify(i)) : (i = new FormData(this.$node), n && Object.keys(n).forEach(function(e) {
                Array.isArray(n[e]) ? (/\[\]$/.test(e) || (e += "[]"), value.forEach(function(t) {
                    i.append(e, t)
                }, this)) : i.set(e, n[e])
            }, this), this.$node.dmxExtraData && Object.keys(this.$node.dmxExtraData).forEach(function(e) {
                var t = this.$node.dmxExtraData[e];
                Array.isArray(t) ? (/\[\]$/.test(e) || (e += "[]"), t.forEach(function(t) {
                    i.append(e, t)
                }, this)) : i.set(e, t)
            }, this)), this._reset(), this.dispatchEvent("start"), this.set("state", {
                executing: !0,
                uploading: !1,
                processing: !1,
                downloading: !1
            });
            var s = e;
            r && (s += (-1 < s.indexOf("?") ? "&" : "?") + r), window.WebviewProxy && (s = window.WebviewProxy.convertProxyUrl(s)), this.xhr.open(t, s), this.xhr.timeout = 1e3 * this.props.timeout, Object.keys(this.props.headers).forEach(function(t) {
                this.xhr.setRequestHeader(t, this.props.headers[t])
            }, this), this.xhr.setRequestHeader("accept", "application/json"), this.props.credentials && (this.xhr.withCredentials = !0);
            try {
                this.xhr.send(i)
            } catch (t) {
                this._done(t)
            }
        },
        _reset: function() {
            this.set({
                status: 0,
                headers: {},
                state: {
                    executing: !1,
                    uploading: !1,
                    processing: !1,
                    downloading: !1
                },
                uploadProgress: {
                    position: 0,
                    total: 0,
                    percent: 0
                },
                downloadProgress: {
                    position: 0,
                    total: 0,
                    percent: 0
                },
                lastError: {
                    status: 0,
                    message: "",
                    response: null
                }
            })
        },
        _done: function(t) {
            if (this._reset(), t) this.set("lastError", {
                status: 0,
                message: t.message,
                response: null
            }), this.dispatchEvent("error");
            else {
                var e = this.xhr.responseText;
                try {
                    e = JSON.parse(e)
                } catch (t) {
                    if (this.xhr.status < 400) return this.set("lastError", {
                        status: 0,
                        message: "Response was not valid JSON",
                        response: e
                    }), void this.dispatchEvent("error")
                }
                try {
                    var n = this.xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
                    this.set("headers", n.reduce(function(t, e) {
                        var n = e.split(": "),
                            i = n.shift(),
                            r = n.join(": ");
                        return t[i] = r, t
                    }, {}))
                } catch (t) {
                    console.warn("Error parsing response headers", t)
                }
                if (this.set("status", this.xhr.status), dmx.validateReset && dmx.validateReset(this.$node), window.grecaptcha && this.$node.querySelector(".g-recaptcha") && grecaptcha.reset(), this.xhr.status < 400) this.set("data", e), this.dispatchEvent("success");
                else if (this.set("lastError", {
                        status: this.xhr.status,
                        message: this.xhr.statusText,
                        response: e
                    }), 400 == this.xhr.status)
                    if (this.dispatchEvent("invalid"), e.form)
                        for (var i in e.form) {
                            var r = this.$node.querySelector('[name="' + i + '"]');
                            r && (r.setCustomValidity(e.form[i]), dmx.requestUpdate(), dmx.bootstrap5forms ? dmx.validate.setBootstrap5Message(r, e.form[i]) : dmx.bootstrap4forms ? dmx.validate.setBootstrap4Message(r, e.form[i]) : dmx.bootstrap3forms ? dmx.validate.setBootstrapMessage(r, e.form[i]) : dmx.validate.setErrorMessage(r, e.form[i]))
                        } else console.warn("400 error, no form errors in response.", e);
                    else 401 == this.xhr.status ? this.dispatchEvent("unauthorized") : 403 == this.xhr.status ? this.dispatchEvent("forbidden") : this.dispatchEvent("error")
            }
            this.dispatchEvent("done")
        },
        onload: function(t) {
            this._done()
        },
        onabort: function(t) {
            this._reset(), this.dispatchEvent("abort"), this.dispatchEvent("done")
        },
        onerror: function(t) {
            this._done({
                message: "Failed to execute"
            })
        },
        ontimeout: function(t) {
            this._done({
                message: "Execution timeout"
            })
        },
        onprogress: function(n) {
            return function(t) {
                t.loaded = t.loaded || t.position;
                var e = t.lengthComputable ? Math.ceil(t.loaded / t.total * 100) : 0;
                this.set("state", {
                    executing: !0,
                    uploading: "upload" == n && e < 100,
                    processing: "upload" == n && 100 == e,
                    downloading: "download" == n
                }), this.set(n + "Progress", {
                    position: t.loaded,
                    total: t.total,
                    percent: e
                }), this.dispatchEvent(n, {
                    lengthComputable: t.lengthComputable,
                    loaded: t.loaded,
                    total: t.total
                })
            }
        }
    }), dmx.Component("if", {
        attributes: {
            condition: {
                type: Boolean,
                default: !1
            }
        },
        events: {
            show: Event,
            hide: Event
        },
        render: function(t) {
            for (this.nodes = [], this.template = document.createDocumentFragment(); this.$node.firstChild;) this.template.appendChild(this.$node.firstChild);
            this.update({})
        },
        update: function(t) {
            this.props.condition != t.condition && (this.props.condition ? this._render() : this._destroy())
        },
        _render: function() {
            var t = this.template.cloneNode(!0);
            this.nodes = Array.prototype.slice.call(t.childNodes), this.$node.appendChild(t), this.$parse(), dmx.requestUpdate(), dmx.nextTick(function() {
                this.dispatchEvent("show")
            }, this)
        },
        _destroy: function() {
            this.bindings = {}, this.nodes.splice(0).forEach(function(t) {
                var e = document.createEvent("Event");
                e.initEvent("remove", !1, !0), t.dispatchEvent(e) && dmx.dom.remove(t)
            }), this.children.splice(0).forEach(function(t) {
                t.$destroy()
            }), dmx.nextTick(function() {
                this.dispatchEvent("hide")
            }, this)
        }
    }), dmx.Component("datetime", {
        initialData: function() {
            return {
                datetime: this.datetime()
            }
        },
        attributes: {
            interval: {
                type: String,
                default: "seconds"
            },
            utc: {
                type: Boolean,
                default: !1
            }
        },
        render: function() {
            this.timer()
        },
        timer: function() {
            this.set("datetime", this.datetime()), requestAnimationFrame(this.timer.bind(this))
        },
        datetime: function() {
            var t, e, n, i, r, s, o = new Date,
                a = function(t, e) {
                    return ("0000" + t).substr(-e)
                };
            s = this.props.utc ? (t = o.getUTCFullYear(), e = o.getUTCMonth() + 1, n = o.getUTCDate(), i = o.getUTCHours(), r = o.getUTCMinutes(), o.getUTCSeconds()) : (t = o.getFullYear(), e = o.getMonth() + 1, n = o.getDate(), i = o.getHours(), r = o.getMinutes(), o.getSeconds());
            var d = a(t, 4) + "-" + a(e, 2) + "-" + a(n, 2),
                u = this.props.utc ? "Z" : "";
            switch (this.props.interval) {
                case "days":
                    return d + "T00:00:00" + u;
                case "hours":
                    return d + "T" + a(i, 2) + ":00:00" + u;
                case "minutes":
                    return d + "T" + a(i, 2) + ":" + a(r, 2) + ":00" + u
            }
            return d + "T" + a(i, 2) + ":" + a(r, 2) + ":" + a(s, 2) + u
        }
    }), dmx.Component("api-action", {
        extends: "fetch"
    }), dmx.Component("api-form", {
        extends: "serverconnect-form"
    }), dmx.Component("array", {
        initialData: {
            items: [],
            count: 0
        },
        attributes: {
            items: {
                type: Array,
                default: []
            }
        },
        events: {
            updated: Event
        },
        methods: {
            add: function(t) {
                this.splice(this.count(), 0, t)
            },
            addUniq: function(t) {
                -1 == this.indexOf(t) && this.splice(this.count(), 0, t)
            },
            insert: function(t, e) {
                this.splice(t, 0, e)
            },
            insertBefore: function(t, e) {
                var n = this.indexOf(t); - 1 != n && this.splice(n, 0, e)
            },
            insertAfter: function(t, e) {
                var n = this.indexOf(t); - 1 != n && this.splice(n + 1, 0, e)
            },
            replace: function(t, e) {
                var n = this.indexOf(t); - 1 != n && this.splice(n, 1, e)
            },
            replaceAt: function(t, e) {
                this.splice(t, 1, e)
            },
            remove: function(t) {
                var e = this.indexOf(t); - 1 != e && this.splice(e, 1)
            },
            removeAt: function(t) {
                this.splice(t, 1)
            },
            reverse: function() {
                this.reverse()
            },
            sort: function() {
                this.sort()
            },
            empty: function() {
                this.updateData([])
            }
        },
        render: function() {
            var t = dmx.array(this.props.items);
            this.set("items", t), this.set("count", t.length)
        },
        update: function(t) {
            dmx.equal(t.items, this.props.items) || this.updateData(dmx.array(this.props.items))
        },
        count: function() {
            return this.data.items.length
        },
        indexOf: function(t) {
            return this.data.items.indexOf(t)
        },
        splice: function(t, e, n) {
            var i = dmx.clone(this.data.items);
            void 0 !== n ? i.splice(t, e, n) : i.splice(t, e), this.updateData(i)
        },
        reverse: function() {
            var t = dmx.clone(this.data.items);
            t.reverse(), this.updateData(t)
        },
        sort: function() {
            var t = dmx.clone(this.data.items);
            t.sort(), this.updateData(t)
        },
        updateData: function(t) {
            dmx.equal(this.data.items, t) || (this.set("items", t), this.set("count", t.length), dmx.nextTick(function() {
                this.dispatchEvent("updated")
            }, this))
        }
    }), dmx.Component("group", {
        render: function(t) {
            this.$parse()
        }
    }), dmx.Component("flow", {
        initialData: {
            $param: null,
            data: null,
            running: !1,
            lastError: null
        },
        attributes: {
            src: {
                type: String,
                default: null
            },
            preload: {
                type: Boolean,
                default: !1
            },
            autorun: {
                type: Boolean,
                default: !1
            },
            params: {
                type: Object,
                default: {}
            }
        },
        methods: {
            run: function(t, e) {
                return this.run(t, e)
            },
            runSub: function(t) {
                return this.runSub(t)
            }
        },
        events: {
            start: Event,
            done: Event,
            error: Event
        },
        $parseAttributes: function(t) {
            dmx.BaseComponent.prototype.$parseAttributes.call(this, t), dmx.dom.getAttributes(t).forEach(function(e) {
                "param" == e.name && e.argument && this.$addBinding(e.value, function(t) {
                    this.props.params[e.argument] = t
                })
            }, this)
        },
        render: function(e) {
            if (this.props.src)(this.props.preload || this.props.autorun) && this.load(this.props.src);
            else try {
                this.flow = (window.Hjson ? Hjson : JSON).parse(e.textContent), this.props.autorun && this.run()
            } catch (t) {
                console.error(t), dmx.debug && console.debug(e.textContent)
            }
        },
        update: function(t) {},
        load: function(i) {
            var r = this;
            return new Promise(function(t, e) {
                var n = new XMLHttpRequest;
                n.onload = function() {
                    try {
                        r.flow = (window.Hjson ? Hjson : JSON).parse(n.responseText), r.props.autorun && r.run(), t()
                    } catch (t) {
                        console.error(t), dmx.debug && console.debug(n.responseText), e(t)
                    }
                }, n.onabort = e, n.onerror = e, n.ontimeout = e, n.open("GET", i), n.send()
            })
        },
        runSub: function(t) {
            var e = this;
            if (this.flow) return dmx.Flow.run(this.flow, this);
            if (this.props.src) return this.load(this.props.src).then(function() {
                return dmx.Flow.run(e.flow, e)
            });
            throw new Error("No flow")
        },
        run: function(t, e) {
            var n = this;
            return this.flow ? this.data.running ? void console.info("Flow " + this.name + " is already running.") : (this.set("running", !0), this.set("log", {}), this.set("$param", Object.assign({}, this.props.params, t)), this.set("lastError", null), this.dispatchEvent("start"), dmx.Flow.run(this.flow, this).then(function(t) {
                return n.set("running", !1), n.set("data", t), n.dispatchEvent("done"), dmx.debug && console.debug("done", t), t
            }).catch(function(t) {
                if (n.set("running", !1), n.set("lastError", t && t.message), n.dispatchEvent("error"), console.error(t), e) throw t
            })) : this.props.src ? this.load(this.props.src).then(function() {
                return n.run(t, e)
            }) : void 0
        }
    }), dmx.Attribute("bind", "mounted", function(n, t) {
        var i = t.argument,
            r = dmx.reToggleAttribute.test(i);
        this.$addBinding(t.value, function(t) {
            if (r) t ? n.setAttribute(i, "") : n.removeAttribute(i);
            else {
                if ("style" === i && "object" == typeof t) {
                    for (var e in t) n.style[e] = t[e];
                    return
                }
                null != t ? n.setAttribute(i, t) : n.removeAttribute(i), "src" === i && ("VIDEO" === n.nodeName || "AUDIO" === n.nodeName ? n.load() : "SOURCE" === n.nodeName && n.parentNode && n.parentNode.load())
            }
        })
    }), dmx.Attribute("on", "mounted", function(t, n) {
        var i = this;
        dmx.eventListener(t, n.argument, function(t) {
            t.originalEvent && (t = t.originalEvent);
            var e = dmx.parse(n.value, dmx.DataScope({
                $event: t.$data,
                $originalEvent: t
            }, i));
            if ("string" == typeof e) try {
                e = new Function("event", e).call(this, t)
            } catch (t) {
                console.warn('Error executing "' + e + '"', t)
            }
            return e
        }, n.modifiers)
    }), dmx.Attribute("repeat", "before", function(t, o) {
        if (this.node != t) {
            var a = this,
                d = [],
                u = document.createDocumentFragment(),
                c = document.createComment("Repeat " + o.value),
                h = (dmx.Component("repeat-item"), o.argument || "repeat");
            t.parentNode.replaceChild(c, t), t.removeAttribute("dmx-repeat"), u.appendChild(t), a.set(h, []), this.$addBinding(o.value, function(t) {
                var e = dmx.Component("repeat-item"),
                    n = dmx.repeatItems(t);
                if (o.modifiers.fast) {
                    if (d.length > n.length && d.splice(n.length).forEach(function(t) {
                            a.children.splice(a.children.indexOf(t), 1), t.$destroy()
                        }), d.length && d.forEach(function(t, e) {
                            t.set(n[e])
                        }), n.length > d.length) {
                        for (i = document.createDocumentFragment(), r = d.length; r < n.length; r++) {
                            (s = new e(u.cloneNode(!0), a, n[r])).$nodes.forEach(function(t) {
                                i.appendChild(t), s.$parse(t)
                            }), d.push(s), a.children.push(s)
                        }
                        c.parentNode.insertBefore(i, c)
                    }
                } else {
                    var i = document.createDocumentFragment();
                    d.forEach(function(t) {
                        a.children.splice(a.children.indexOf(t), 1), t.$destroy()
                    }), d = [];
                    for (var r = 0; r < n.length; r++) {
                        var s;
                        (s = new e(u.cloneNode(!0), a, n[r])).$nodes.forEach(function(t) {
                            i.appendChild(t), s.$parse(t)
                        }), d.push(s), a.children.push(s)
                    }
                    c.parentNode.insertBefore(i, c)
                }
                a.set(h, d.map(function(t) {
                    return t.data
                }))
            })
        }
    }), dmx.Attribute("class", "mounted", function(n, t) {
        var i = t.argument;
        this.$addBinding(t.value, function(t, e) {
            t != e && n.classList[t ? "add" : "remove"](i)
        })
    }), dmx.Attribute("hide", "mounted", function(e, t) {
        var n = e.style.getPropertyValue("display"),
            i = e.style.getPropertyPriority("display");
        this.$addBinding(t.value, function(t) {
            t ? e.style.setProperty("display", "none", "important") : e.style.setProperty("display", n, i)
        })
    }), dmx.Attribute("show", "mounted", function(e, t) {
        var n = e.style.getPropertyValue("display"),
            i = e.style.getPropertyPriority("display");
        this.$addBinding(t.value, function(t) {
            t ? e.style.setProperty("display", n, i) : e.style.setProperty("display", "none", "important")
        })
    }), dmx.Attribute("html", "mounted", function(e, t) {
        this.$addBinding(t.value, function(t) {
            e.innerHTML = null != t ? t : ""
        })
    }), dmx.Attribute("text", "mounted", function(e, t) {
        this.$addBinding(t.value, function(t) {
            e.innerText = null != t ? t : ""
        })
    }), dmx.Attribute("style", "mounted", function(e, t) {
        var n = t.argument,
            i = t.modifiers.important ? "important" : "";
        this.$addBinding(t.value, function(t) {
            null != t && e.style.setProperty(n, t, i)
        })
    }), dmx.Formatters("global", {
        json: function(t) {
            return JSON.stringify(t)
        },
        log: function(t) {
            return console.log(t), t
        },
        run: function(t, e) {
            var n = dmx.DataScope({
                $param: e
            }, this);
            dmx.Flow.run(t, n)
        }
    }), dmx.Actions({
        subflow: function(t) {
            var e = this.parse(t.flow),
                n = this.parse(t.param);
            return this.parse(e + ".runSub(" + JSON.stringify(n) + ")")
        },
        comment: function(t) {
            dmx.debug && console.debug(t.message)
        },
        wait: function(t) {
            var e = this.parse(t.delay);
            if ("number" != typeof e) throw new Error("wait: Invalid delay");
            return new Promise(function(t) {
                setTimeout(t, e)
            })
        },
        now: function(t) {
            return (new Date).toISOString()
        },
        random: function(t) {
            var e = this.parse(t.lower),
                n = this.parse(t.upper),
                i = !!this.parse(t.floating);
            "number" == typeof e && isFinite(e) || (e = 0), "number" == typeof n && isFinite(n) || (n = 1);
            var r = e + Math.random() * (n - e);
            return i || Math.floor(e) != e || Math.floor(n) != n || (r = Math.round(r)), r
        },
        confirm: function(t) {
            var e = this.parse(t.message);
            if ("string" != typeof e) throw new Error("confirm: Invalid message");
            var n = confirm(e);
            if (n) {
                if (t.then) return this._exec(t.then).then(function() {
                    return n
                })
            } else if (t.else) return this._exec(t.else).then(function() {
                return n
            });
            return n
        },
        prompt: function(t) {
            var e = this.parse(t.message);
            if ("string" != typeof e) throw new Error("prompt: Invalid message");
            return prompt(e)
        },
        alert: function(t) {
            var e = this.parse(t.message);
            if ("string" != typeof e) throw new Error("alert: Invalid message");
            return alert(e)
        },
        repeat: function(n) {
            var t = this.parse(n.repeat);
            if (t) {
                if ("boolean" == typeof t) t = t ? [0] : [];
                else if ("string" == typeof t) t = t.split(/\s*,\s*/);
                else if ("number" == typeof t) {
                    for (var e = [], i = 0; i < t; i++) e.push(i + 1);
                    t = e
                }
                if ("object" != typeof t) throw new Error("repeat: data is not repeatable");
                var r = this,
                    s = this.scope;
                return this._each(t, function(t, e) {
                    return r.scope = new dmx.DataScope(Object.assign({
                        $value: t,
                        $index: e,
                        $key: e
                    }, t), s), r._exec(n.exec).then(function() {
                        r.scope = s
                    })
                })
            }
        },
        condition: function(t) {
            var e = !!this.parse(t.if);
            if (e) {
                if (t.then) return this._exec(t.then).then(function() {
                    return e
                })
            } else if (t.else) return this._exec(t.else).then(function() {
                return e
            });
            return e
        },
        while: function(e) {
            var n = this,
                i = function() {
                    return new Promise(function(t) {
                        if (!n.parse(e.condition)) return t();
                        n._exec(e.exec).then(i).then(t)
                    })
                };
            return i()
        },
        switch: function(t) {
            for (var e = this.parse(t.expression), n = 0; n < t.cases.length; n++)
                if (this.parse(t.cases[n].case) === e) return this._exec(t.cases[n].exec);
            if (t.default) return this._exec(t.default)
        },
        tryCatch: function(t) {
            var e = this;
            return Promise.resolve(e._exec(t.try)).catch(function() {
                return e._exec(t.catch)
            })
        },
        run: function(t) {
            if (!t.action) throw new Error("run: missing action");
            return this.parse(t.action)
        },
        runJS: function(t) {
            if (!t.function) throw new Error("runJS: missing function");
            var e = this.parse(t.function),
                n = this.parse(t.args);
            return window[e].apply(null, n)
        },
        assign: function(t) {
            return this.parse(t.value)
        },
        setGlobal: function(t) {
            var e = this.parse(t.key),
                n = this.parse(t.value);
            if ("string" != typeof e) throw new Error("setGlobal: key must be a string");
            return dmx.global.set(e, n), n
        },
        setSession: function(t) {
            var e = this.parse(t.key),
                n = this.parse(t.value);
            if ("string" != typeof e) throw new Error("setSession: key must be a string");
            return sessionStorage.setItem(e, JSON.stringify(n)), n
        },
        getSession: function(t) {
            var e = this.parse(t.key);
            if ("string" != typeof e) throw new Error("getSession: key must be a string");
            return JSON.parse(sessionStorage.getItem(e))
        },
        removeSession: function(t) {
            var e = this.parse(t.key);
            if ("string" != typeof e) throw new Error("removeSession: key must be a string");
            return sessionStorage.removeItem(e), !0
        },
        setStorage: function(t) {
            var e = this.parse(t.key),
                n = this.parse(t.value);
            if ("string" != typeof e) throw new Error("setStorage: key must be a string");
            return localStorage.setItem(e, JSON.stringify(n)), n
        },
        getStorage: function(t) {
            var e = this.parse(t.key);
            if ("string" != typeof e) throw new Error("getStorage: key must be a string");
            return JSON.parse(localStorage.getItem(e))
        },
        removeStorage: function(t) {
            var e = this.parse(t.key);
            if ("string" != typeof e) throw new Error("removeStorage: key must be a string");
            return localStorage.removeItem(e), !0
        },
        fetch: function(t) {
            var r = this.parse(t.url),
                s = this.parse(t.method),
                o = this.parse(t.timeout),
                e = this.parse(t.dataType),
                n = this.parse(t.data),
                i = this.parse(t.params),
                a = this.parse(t.headers),
                d = null;
            if ("string" != typeof r) throw new Error("fetch: invalid url " + r);
            if (["GET", "POST", "PUT", "DELETE"].includes(s) || (s = "GET"), ["auto", "json", "text"].includes(e) || (e = "auto"), "number" != typeof o && (o = 0), "object" == typeof i)
                for (var u in i) r += (-1 != r.indexOf("?") ? "&" : "?") + decodeURIComponent(u) + "=" + decodeURIComponent(i[u]);
            if ("GET" != s)
                if ("text" == e) a["Content-Type"] || (a["Content-Type"] = "application/text"), d = n.toString();
                else if ("json" == e) a["Content-Type"] || (a["Content-Type"] = "application/json"), n = JSON.stringify(n);
            else if ("POST" == s) {
                if (d = new FormData, "object" == typeof n && !Array.isArray(n))
                    for (var c in n) {
                        var h = n[c];
                        if (Array.isArray(h))
                            for (var l in /\[\]$/.test(c) || (c += "[]"), h) d.append(c, h[l]);
                        else d.set(c, h)
                    }
            } else a["Content-Type"] || (a["Content-Type"] = "application/text"), n = n.toString();
            return new Promise(function(n, t) {
                var i = new XMLHttpRequest;
                for (var e in i.onerror = t, i.onabort = t, i.ontimeout = t, i.onload = function() {
                        var t = i.responseText,
                            e = i.getAllResponseHeaders().trim().split(/[\r\n]+/).reduce(function(t, e) {
                                var n = e.split(": "),
                                    i = n.shift(),
                                    r = n.join(": ");
                                return t[i.toLowerCase()] = r, t
                            }, {});
                        /^application\/json/.test(e["content-type"]) && (t = JSON.parse(t)), n({
                            status: i.status,
                            headers: e,
                            data: t
                        })
                    }, i.open(s, r), i.timeout = 1e3 * o, a) i.setRequestHeader(e, a[e]);
                i.send(d)
            })
        }
    }), dmx.__actions.setValue = dmx.__actions.assign, dmx.__actions.api = dmx.__actions.fetch, dmx.__actions["api.send"] = dmx.__actions.fetch, dmx.__actions.serverConnect = dmx.__actions.fetch, dmx.Actions({
        "collections.addColumns": function(t) {
            var e = this.parse(t.collection),
                n = this.parse(t.add),
                i = !!this.parse(t.overwrite);
            if (!e.length) return [];
            for (var r = [], s = 0, o = e.length; s < o; s++) {
                var a = dmx.clone(e[s]);
                for (var d in n)(i || null == a[d]) && (a[d] = n[d]);
                r.push(a)
            }
            return r
        },
        "collections.filterColumns": function(t) {
            var e = this.parse(t.collection),
                n = this.parse(t.columns),
                i = !!this.parse(t.keep);
            if (!e.length) return [];
            for (var r = [], s = 0, o = e.length; s < o; s++) {
                var a = e[s],
                    d = {};
                for (var u in a) n.includes(u) ? i && (d[u] = dmx.clone(a[u])) : i || (d[u] = dmx.clone(a[u]));
                r.push(d)
            }
            return r
        },
        "collections.renameColumns": function(t) {
            var e = this.parse(t.collection),
                n = this.parse(t.rename);
            if (!e.length) return [];
            for (var i = [], r = 0, s = e.length; r < s; r++) {
                var o = e[r],
                    a = {};
                for (var d in o) a[n[d] || d] = dmx.clone(o[d]);
                i.push(a)
            }
            return i
        },
        "collections.fillDown": function(t) {
            var e = this.parse(t.collection),
                n = this.parse(t.columns);
            if (!e.length) return [];
            for (var i = [], r = {}, s = 0, o = n.length; s < o; s++) r[n[s]] = null;
            for (s = 0, o = e.length; s < o; s++) {
                var a = dmx.clone(e[s]);
                for (var d in r) null == a[d] ? a[d] = r[d] : r[d] = a[d];
                i.push(a)
            }
            return i
        },
        "collections.addRows": function(t) {
            var e = this.parse(t.collection),
                n = this.parse(t.rows);
            return dmx.clone(e).concat(dmx.clone(n))
        },
        "collections.addRowNumbers": function(t) {
            for (var e = this.parse(t.collection), n = this.parse(t.column), i = this.parse(t.startAt), r = !!this.parse(t.desc), s = [], o = 0, a = e.length; o < a; o++) {
                var d = dmx.clone(e[o]);
                d[n] = r ? a + i - o : i + o, s.push(d)
            }
            return s
        },
        "colections.join": function(t) {
            for (var e = this.parse(t.collection1), n = this.parse(t.collection2), i = this.parse(t.matches), r = !!this.parse(t.matchAll), s = [], o = 0, a = e.length; o < a; o++) {
                for (var d = dmx.clone(e[o]), u = 0, c = n.length; u < c; u++) {
                    var h = n[u],
                        l = !1;
                    for (var p in i)
                        if (d[p] == h[i[p]]) {
                            if (l = !0, !r) break
                        } else if (r) {
                        l = !1;
                        break
                    }
                    if (l) {
                        for (var f in h) d[f] = dmx.clone(h[f]);
                        break
                    }
                }
                s.push(d)
            }
            return s
        },
        "collections.mormalize": function(t) {
            for (var e = this.parse(t.collection), n = [], i = [], r = 0, s = e.length; r < s; r++)
                for (var o in e[r]) - 1 == n.indexOf(o) && n.push(o);
            for (r = 0, s = e.length; r < s; r++) {
                for (var a = {}, d = 0, u = n.length; d < u; d++) {
                    o = n[d];
                    var c = dmx.clone(e[o]);
                    a[o] = null != c ? c : null
                }
                i.push(a)
            }
            return i
        }
    }), dmx.Actions({
        "console.log": function(t) {
            console.log(this.parse(t.message))
        },
        "console.info": function(t) {
            console.info(this.parse(t.message))
        },
        "console.warn": function(t) {
            console.warn(this.parse(t.message))
        },
        "console.error": function(t) {
            console.error(this.parse(t.message))
        },
        "console.count": function(t) {
            console.count(this.parse(t.label))
        },
        "console.time": function(t) {
            console.time(this.parse(t.label))
        },
        "console.timeEnd": function(t) {
            console.timeEnd(this.parse(t.label))
        },
        "console.group": function(t) {
            console.group()
        },
        "console.groupEnd": function(t) {
            console.groupEnd()
        },
        "console.clear": function(t) {
            console.clear()
        }
    });
//# sourceMappingURL=maps/dmxAppConnect.js.map