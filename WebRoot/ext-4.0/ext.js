/*
 * 
 * This file is part of Ext JS 4
 * 
 * Copyright (c) 2011 Sencha Inc
 * 
 * Contact: http://www.sencha.com/contact
 * 
 * GNU General Public License Usage This file may be used under the terms of the
 * GNU General Public License version 3.0 as published by the Free Software
 * Foundation and appearing in the file LICENSE included in the packaging of
 * this file. Please review the following information to ensure the GNU General
 * Public License version 3.0 requirements will be met:
 * http://www.gnu.org/copyleft/gpl.html.
 * 
 * If you are unsure which license is appropriate for your use, please contact
 * the sales department at http://www.sencha.com/contact.
 * 
 */
(function() {
	var e = this, a = Object.prototype, g = a.toString, b = true, d = {
		toString : 1
	}, c;
	if (typeof Ext === "undefined") {
		e.Ext = {}
	}
	Ext.global = e;
	for (c in d) {
		b = null
	}
	if (b) {
		b = ["hasOwnProperty", "valueOf", "isPrototypeOf",
				"propertyIsEnumerable", "toLocaleString", "toString",
				"constructor"]
	}
	Ext.enumerables = b;
	Ext.apply = function(n, m, p) {
		if (p) {
			Ext.apply(n, p)
		}
		if (n && m && typeof m === "object") {
			var o, l, h;
			for (o in m) {
				n[o] = m[o]
			}
			if (b) {
				for (l = b.length; l--;) {
					h = b[l];
					if (m.hasOwnProperty(h)) {
						n[h] = m[h]
					}
				}
			}
		}
		return n
	};
	Ext.buildSettings = Ext.apply({
		baseCSSPrefix : "x-",
		scopeResetCSS : false
	}, Ext.buildSettings || {});
	Ext.apply(Ext, {
		emptyFn : function() {
		},
		baseCSSPrefix : Ext.buildSettings.baseCSSPrefix,
		applyIf : function(i, h) {
			var j;
			if (i) {
				for (j in h) {
					if (i[j] === undefined) {
						i[j] = h[j]
					}
				}
			}
			return i
		},
		iterate : function(h, j, i) {
			if (Ext.isEmpty(h)) {
				return
			}
			if (i === undefined) {
				i = h
			}
			if (Ext.isIterable(h)) {
				Ext.Array.each.call(Ext.Array, h, j, i)
			} else {
				Ext.Object.each.call(Ext.Object, h, j, i)
			}
		}
	});
	Ext.apply(Ext, {
		extend : function() {
			var h = a.constructor, i = function(k) {
				for (var j in k) {
					if (!k.hasOwnProperty(j)) {
						continue
					}
					this[j] = k[j]
				}
			};
			return function(j, o, m) {
				if (Ext.isObject(o)) {
					m = o;
					o = j;
					j = m.constructor !== h ? m.constructor : function() {
						o.apply(this, arguments)
					}
				}
				var l = function() {
				}, k, n = o.prototype;
				l.prototype = n;
				k = j.prototype = new l();
				k.constructor = j;
				j.superclass = n;
				if (n.constructor === h) {
					n.constructor = o
				}
				j.override = function(p) {
					Ext.override(j, p)
				};
				k.override = i;
				k.proto = k;
				j.override(m);
				j.extend = function(p) {
					return Ext.extend(j, p)
				};
				return j
			}
		}(),
		override : function(h, i) {
			if (h.prototype.$className) {
				return h.override(i)
			} else {
				Ext.apply(h.prototype, i)
			}
		}
	});
	Ext.apply(Ext, {
		valueFrom : function(j, h, i) {
			return Ext.isEmpty(j, i) ? h : j
		},
		typeOf : function(i) {
			if (i === null) {
				return "null"
			}
			var h = typeof i;
			if (h === "undefined" || h === "string" || h === "number"
					|| h === "boolean") {
				return h
			}
			var j = g.call(i);
			switch (j) {
				case "[object Array]" :
					return "array";
				case "[object Date]" :
					return "date";
				case "[object Boolean]" :
					return "boolean";
				case "[object Number]" :
					return "number";
				case "[object RegExp]" :
					return "regexp"
			}
			if (h === "function") {
				return "function"
			}
			if (h === "object") {
				if (i.nodeType !== undefined) {
					if (i.nodeType === 3) {
						return (/\S/).test(i.nodeValue)
								? "textnode"
								: "whitespace"
					} else {
						return "element"
					}
				}
				return "object"
			}
		},
		isEmpty : function(h, i) {
			return (h === null) || (h === undefined) || (!i ? h === "" : false)
					|| (Ext.isArray(h) && h.length === 0)
		},
		isArray : ("isArray" in Array) ? Array.isArray : function(h) {
			return g.call(h) === "[object Array]"
		},
		isDate : function(h) {
			return g.call(h) === "[object Date]"
		},
		isObject : (g.call(null) === "[object Object]") ? function(h) {
			return h !== null && h !== undefined
					&& g.call(h) === "[object Object]"
					&& h.ownerDocument === undefined
		} : function(h) {
			return g.call(h) === "[object Object]"
		},
		isPrimitive : function(i) {
			var h = typeof i;
			return h === "string" || h === "number" || h === "boolean"
		},
		isFunction : (typeof document !== "undefined" && typeof document
				.getElementsByTagName("body") === "function") ? function(h) {
			return g.call(h) === "[object Function]"
		} : function(h) {
			return typeof h === "function"
		},
		isNumber : function(h) {
			return typeof h === "number" && isFinite(h)
		},
		isNumeric : function(h) {
			return !isNaN(parseFloat(h)) && isFinite(h)
		},
		isString : function(h) {
			return typeof h === "string"
		},
		isBoolean : function(h) {
			return typeof h === "boolean"
		},
		isElement : function(h) {
			return h ? h.nodeType === 1 : false
		},
		isTextNode : function(h) {
			return h ? h.nodeName === "#text" : false
		},
		isDefined : function(h) {
			return typeof h !== "undefined"
		},
		isIterable : function(h) {
			return (h && typeof h !== "string")
					? h.length !== undefined
					: false
		}
	});
	Ext.apply(Ext, {
		clone : function(p) {
			if (p === null || p === undefined) {
				return p
			}
			if (p.nodeType && p.cloneNode) {
				return p.cloneNode(true)
			}
			var o = g.call(p);
			if (o === "[object Date]") {
				return new Date(p.getTime())
			}
			var n, l, h, q, m;
			if (o === "[object Array]") {
				n = p.length;
				q = [];
				while (n--) {
					q[n] = Ext.clone(p[n])
				}
			} else {
				if (o === "[object Object]" && p.constructor === Object) {
					q = {};
					for (m in p) {
						q[m] = Ext.clone(p[m])
					}
					if (b) {
						for (l = b.length; l--;) {
							h = b[l];
							q[h] = p[h]
						}
					}
				}
			}
			return q || p
		},
		getUniqueGlobalNamespace : function() {
			var j = this.uniqueGlobalNamespace;
			if (j === undefined) {
				var h = 0;
				do {
					j = "ExtBox" + (++h)
				} while (Ext.global[j] !== undefined);
				Ext.global[j] = Ext;
				this.uniqueGlobalNamespace = j
			}
			return j
		},
		functionFactory : function() {
			var h = Array.prototype.slice.call(arguments);
			if (h.length > 0) {
				h[h.length - 1] = "var Ext=window."
						+ this.getUniqueGlobalNamespace() + ";"
						+ h[h.length - 1]
			}
			return Function.prototype.constructor.apply(Function.prototype, h)
		}
	});
	Ext.type = Ext.typeOf
})();
(function() {
	var a = "4.0.7", b;
	Ext.Version = b = Ext.extend(Object, {
		constructor : function(c) {
			var e, d;
			if (c instanceof b) {
				return c
			}
			this.version = this.shortVersion = String(c).toLowerCase().replace(
					/_/g, ".").replace(/[\-+]/g, "");
			d = this.version.search(/([^\d\.])/);
			if (d !== -1) {
				this.release = this.version.substr(d, c.length);
				this.shortVersion = this.version.substr(0, d)
			}
			this.shortVersion = this.shortVersion.replace(/[^\d]/g, "");
			e = this.version.split(".");
			this.major = parseInt(e.shift() || 0, 10);
			this.minor = parseInt(e.shift() || 0, 10);
			this.patch = parseInt(e.shift() || 0, 10);
			this.build = parseInt(e.shift() || 0, 10);
			return this
		},
		toString : function() {
			return this.version
		},
		valueOf : function() {
			return this.version
		},
		getMajor : function() {
			return this.major || 0
		},
		getMinor : function() {
			return this.minor || 0
		},
		getPatch : function() {
			return this.patch || 0
		},
		getBuild : function() {
			return this.build || 0
		},
		getRelease : function() {
			return this.release || ""
		},
		isGreaterThan : function(c) {
			return b.compare(this.version, c) === 1
		},
		isLessThan : function(c) {
			return b.compare(this.version, c) === -1
		},
		equals : function(c) {
			return b.compare(this.version, c) === 0
		},
		match : function(c) {
			c = String(c);
			return this.version.substr(0, c.length) === c
		},
		toArray : function() {
			return [this.getMajor(), this.getMinor(), this.getPatch(),
					this.getBuild(), this.getRelease()]
		},
		getShortVersion : function() {
			return this.shortVersion
		}
	});
	Ext.apply(b, {
		releaseValueMap : {
			dev : -6,
			alpha : -5,
			a : -5,
			beta : -4,
			b : -4,
			rc : -3,
			"#" : -2,
			p : -1,
			pl : -1
		},
		getComponentValue : function(c) {
			return !c ? 0 : (isNaN(c)
					? this.releaseValueMap[c] || c
					: parseInt(c, 10))
		},
		compare : function(h, g) {
			var d, e, c;
			h = new b(h).toArray();
			g = new b(g).toArray();
			for (c = 0; c < Math.max(h.length, g.length); c++) {
				d = this.getComponentValue(h[c]);
				e = this.getComponentValue(g[c]);
				if (d < e) {
					return -1
				} else {
					if (d > e) {
						return 1
					}
				}
			}
			return 0
		}
	});
	Ext.apply(Ext, {
		versions : {},
		lastRegisteredVersion : null,
		setVersion : function(d, c) {
			Ext.versions[d] = new b(c);
			Ext.lastRegisteredVersion = Ext.versions[d];
			return this
		},
		getVersion : function(c) {
			if (c === undefined) {
				return Ext.lastRegisteredVersion
			}
			return Ext.versions[c]
		},
		deprecate : function(c, e, g, d) {
			if (b.compare(Ext.getVersion(c), e) < 1) {
				g.call(d)
			}
		}
	});
	Ext.setVersion("core", a)
})();
Ext.String = {
	trimRegex : /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
	escapeRe : /('|\\)/g,
	formatRe : /\{(\d+)\}/g,
	escapeRegexRe : /([-.*+?^${}()|[\]\/\\])/g,
	htmlEncode : (function() {
		var d = {
			"&" : "&amp;",
			">" : "&gt;",
			"<" : "&lt;",
			'"' : "&quot;"
		}, b = [], c, a;
		for (c in d) {
			b.push(c)
		}
		a = new RegExp("(" + b.join("|") + ")", "g");
		return function(e) {
			return (!e) ? e : String(e).replace(a, function(h, g) {
				return d[g]
			})
		}
	})(),
	htmlDecode : (function() {
		var d = {
			"&amp;" : "&",
			"&gt;" : ">",
			"&lt;" : "<",
			"&quot;" : '"'
		}, b = [], c, a;
		for (c in d) {
			b.push(c)
		}
		a = new RegExp("(" + b.join("|") + "|&#[0-9]{1,5};)", "g");
		return function(e) {
			return (!e) ? e : String(e).replace(a, function(h, g) {
				if (g in d) {
					return d[g]
				} else {
					return String.fromCharCode(parseInt(g.substr(2), 10))
				}
			})
		}
	})(),
	urlAppend : function(b, a) {
		if (!Ext.isEmpty(a)) {
			return b + (b.indexOf("?") === -1 ? "?" : "&") + a
		}
		return b
	},
	trim : function(a) {
		return a.replace(Ext.String.trimRegex, "")
	},
	capitalize : function(a) {
		return a.charAt(0).toUpperCase() + a.substr(1)
	},
	ellipsis : function(c, a, d) {
		if (c && c.length > a) {
			if (d) {
				var e = c.substr(0, a - 2), b = Math.max(e.lastIndexOf(" "), e
						.lastIndexOf("."), e.lastIndexOf("!"), e
						.lastIndexOf("?"));
				if (b !== -1 && b >= (a - 15)) {
					return e.substr(0, b) + "..."
				}
			}
			return c.substr(0, a - 3) + "..."
		}
		return c
	},
	escapeRegex : function(a) {
		return a.replace(Ext.String.escapeRegexRe, "\\$1")
	},
	escape : function(a) {
		return a.replace(Ext.String.escapeRe, "\\$1")
	},
	toggle : function(b, c, a) {
		return b === c ? a : c
	},
	leftPad : function(b, c, d) {
		var a = String(b);
		d = d || " ";
		while (a.length < c) {
			a = d + a
		}
		return a
	},
	format : function(b) {
		var a = Ext.Array.toArray(arguments, 1);
		return b.replace(Ext.String.formatRe, function(c, d) {
			return a[d]
		})
	},
	repeat : function(e, d, b) {
		for (var a = [], c = d; c--;) {
			a.push(e)
		}
		return a.join(b || "")
	}
};
(function() {
	var a = (0.9).toFixed() !== "1";
	Ext.Number = {
		constrain : function(d, c, b) {
			d = parseFloat(d);
			if (!isNaN(c)) {
				d = Math.max(d, c)
			}
			if (!isNaN(b)) {
				d = Math.min(d, b)
			}
			return d
		},
		snap : function(e, c, d, h) {
			var g = e, b;
			if (!(c && e)) {
				return e
			}
			b = e % c;
			if (b !== 0) {
				g -= b;
				if (b * 2 >= c) {
					g += c
				} else {
					if (b * 2 < -c) {
						g -= c
					}
				}
			}
			return Ext.Number.constrain(g, d, h)
		},
		toFixed : function(d, b) {
			if (a) {
				b = b || 0;
				var c = Math.pow(10, b);
				return (Math.round(d * c) / c).toFixed(b)
			}
			return d.toFixed(b)
		},
		from : function(c, b) {
			if (isFinite(c)) {
				c = parseFloat(c)
			}
			return !isNaN(c) ? c : b
		}
	}
})();
Ext.num = function() {
	return Ext.Number.from.apply(this, arguments)
};
(function() {
	var g = Array.prototype, o = g.slice, q = function() {
		var A = [], e, z = 20;
		if (!A.splice) {
			return false
		}
		while (z--) {
			A.push("A")
		}
		A.splice(15, 0, "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F",
				"F", "F", "F", "F", "F", "F", "F", "F", "F", "F");
		e = A.length;
		A.splice(13, 0, "XXX");
		if (e + 1 != A.length) {
			return false
		}
		return true
	}(), j = "forEach" in g, u = "map" in g, p = "indexOf" in g, y = "every" in g, c = "some" in g, d = "filter" in g, n = function() {
		var e = [1, 2, 3, 4, 5].sort(function() {
			return 0
		});
		return e[0] === 1 && e[1] === 2 && e[2] === 3 && e[3] === 4
				&& e[4] === 5
	}(), k = true, a;
	try {
		if (typeof document !== "undefined") {
			o.call(document.getElementsByTagName("body"))
		}
	} catch (s) {
		k = false
	}
	function m(z, e) {
		return (e < 0) ? Math.max(0, z.length + e) : Math.min(z.length, e)
	}
	function x(G, F, z, J) {
		var K = J ? J.length : 0, B = G.length, H = m(G, F);
		if (H === B) {
			if (K) {
				G.push.apply(G, J)
			}
		} else {
			var E = Math.min(z, B - H), I = H + E, A = I + K - E, e = B - I, C = B
					- E, D;
			if (A < I) {
				for (D = 0; D < e; ++D) {
					G[A + D] = G[I + D]
				}
			} else {
				if (A > I) {
					for (D = e; D--;) {
						G[A + D] = G[I + D]
					}
				}
			}
			if (K && H === C) {
				G.length = C;
				G.push.apply(G, J)
			} else {
				G.length = C + K;
				for (D = 0; D < K; ++D) {
					G[H + D] = J[D]
				}
			}
		}
		return G
	}
	function i(B, e, A, z) {
		if (z && z.length) {
			if (e < B.length) {
				B.splice.apply(B, [e, A].concat(z))
			} else {
				B.push.apply(B, z)
			}
		} else {
			B.splice(e, A)
		}
		return B
	}
	function b(A, e, z) {
		return x(A, e, z)
	}
	function r(A, e, z) {
		A.splice(e, z);
		return A
	}
	function l(C, e, A) {
		var B = m(C, e), z = C.slice(e, m(C, B + A));
		if (arguments.length < 4) {
			x(C, B, A)
		} else {
			x(C, B, A, o.call(arguments, 3))
		}
		return z
	}
	function h(e) {
		return e.splice.apply(e, o.call(arguments, 1))
	}
	var w = q ? r : b, t = q ? i : x, v = q ? h : l;
	a = Ext.Array = {
		each : function(D, B, A, e) {
			D = a.from(D);
			var z, C = D.length;
			if (e !== true) {
				for (z = 0; z < C; z++) {
					if (B.call(A || D[z], D[z], z, D) === false) {
						return z
					}
				}
			} else {
				for (z = C - 1; z > -1; z--) {
					if (B.call(A || D[z], D[z], z, D) === false) {
						return z
					}
				}
			}
			return true
		},
		forEach : function(C, A, z) {
			if (j) {
				return C.forEach(A, z)
			}
			var e = 0, B = C.length;
			for (; e < B; e++) {
				A.call(z, C[e], e, C)
			}
		},
		indexOf : function(C, A, B) {
			if (p) {
				return C.indexOf(A, B)
			}
			var e, z = C.length;
			for (e = (B < 0) ? Math.max(0, z + B) : B || 0; e < z; e++) {
				if (C[e] === A) {
					return e
				}
			}
			return -1
		},
		contains : function(B, A) {
			if (p) {
				return B.indexOf(A) !== -1
			}
			var e, z;
			for (e = 0, z = B.length; e < z; e++) {
				if (B[e] === A) {
					return true
				}
			}
			return false
		},
		toArray : function(A, C, e) {
			if (!A || !A.length) {
				return []
			}
			if (typeof A === "string") {
				A = A.split("")
			}
			if (k) {
				return o.call(A, C || 0, e || A.length)
			}
			var B = [], z;
			C = C || 0;
			e = e ? ((e < 0) ? A.length + e : e) : A.length;
			for (z = C; z < e; z++) {
				B.push(A[z])
			}
			return B
		},
		pluck : function(D, e) {
			var z = [], A, C, B;
			for (A = 0, C = D.length; A < C; A++) {
				B = D[A];
				z.push(B[e])
			}
			return z
		},
		map : function(D, C, B) {
			if (u) {
				return D.map(C, B)
			}
			var A = [], z = 0, e = D.length;
			for (; z < e; z++) {
				A[z] = C.call(B, D[z], z, D)
			}
			return A
		},
		every : function(C, A, z) {
			if (y) {
				return C.every(A, z)
			}
			var e = 0, B = C.length;
			for (; e < B; ++e) {
				if (!A.call(z, C[e], e, C)) {
					return false
				}
			}
			return true
		},
		some : function(C, A, z) {
			if (c) {
				return C.some(A, z)
			}
			var e = 0, B = C.length;
			for (; e < B; ++e) {
				if (A.call(z, C[e], e, C)) {
					return true
				}
			}
			return false
		},
		clean : function(C) {
			var z = [], e = 0, B = C.length, A;
			for (; e < B; e++) {
				A = C[e];
				if (!Ext.isEmpty(A)) {
					z.push(A)
				}
			}
			return z
		},
		unique : function(C) {
			var B = [], e = 0, A = C.length, z;
			for (; e < A; e++) {
				z = C[e];
				if (a.indexOf(B, z) === -1) {
					B.push(z)
				}
			}
			return B
		},
		filter : function(D, B, A) {
			if (d) {
				return D.filter(B, A)
			}
			var z = [], e = 0, C = D.length;
			for (; e < C; e++) {
				if (B.call(A, D[e], e, D)) {
					z.push(D[e])
				}
			}
			return z
		},
		from : function(z, e) {
			if (z === undefined || z === null) {
				return []
			}
			if (Ext.isArray(z)) {
				return (e) ? o.call(z) : z
			}
			if (z && z.length !== undefined && typeof z !== "string") {
				return Ext.toArray(z)
			}
			return [z]
		},
		remove : function(A, z) {
			var e = a.indexOf(A, z);
			if (e !== -1) {
				w(A, e, 1)
			}
			return A
		},
		include : function(z, e) {
			if (!a.contains(z, e)) {
				z.push(e)
			}
		},
		clone : function(e) {
			return o.call(e)
		},
		merge : function() {
			var e = o.call(arguments), B = [], z, A;
			for (z = 0, A = e.length; z < A; z++) {
				B = B.concat(e[z])
			}
			return a.unique(B)
		},
		intersect : function() {
			var A = [], e = o.call(arguments), E, C, B, G, H, K, J, I, z, D;
			if (!e.length) {
				return A
			}
			for (E = K = 0, I = e.length; E < I, H = e[E]; E++) {
				if (!G || H.length < G.length) {
					G = H;
					K = E
				}
			}
			G = a.unique(G);
			w(e, K, 1);
			for (E = 0, I = G.length; E < I, K = G[E]; E++) {
				var F = 0;
				for (C = 0, z = e.length; C < z, H = e[C]; C++) {
					for (B = 0, D = H.length; B < D, J = H[B]; B++) {
						if (K === J) {
							F++;
							break
						}
					}
				}
				if (F === z) {
					A.push(K)
				}
			}
			return A
		},
		difference : function(z, e) {
			var E = o.call(z), C = E.length, B, A, D;
			for (B = 0, D = e.length; B < D; B++) {
				for (A = 0; A < C; A++) {
					if (E[A] === e[B]) {
						w(E, A, 1);
						A--;
						C--
					}
				}
			}
			return E
		},
		slice : ([1, 2].slice(1, undefined).length ? function(A, z, e) {
			return o.call(A, z, e)
		} : function(A, z, e) {
			if (typeof z === "undefined") {
				return o.call(A)
			}
			if (typeof e === "undefined") {
				return o.call(A, z)
			}
			return o.call(A, z, e)
		}),
		sort : function(F, E) {
			if (n) {
				if (E) {
					return F.sort(E)
				} else {
					return F.sort()
				}
			}
			var C = F.length, B = 0, D, e, A, z;
			for (; B < C; B++) {
				A = B;
				for (e = B + 1; e < C; e++) {
					if (E) {
						D = E(F[e], F[A]);
						if (D < 0) {
							A = e
						}
					} else {
						if (F[e] < F[A]) {
							A = e
						}
					}
				}
				if (A !== B) {
					z = F[B];
					F[B] = F[A];
					F[A] = z
				}
			}
			return F
		},
		flatten : function(A) {
			var z = [];
			function e(B) {
				var D, E, C;
				for (D = 0, E = B.length; D < E; D++) {
					C = B[D];
					if (Ext.isArray(C)) {
						e(C)
					} else {
						z.push(C)
					}
				}
				return z
			}
			return e(A)
		},
		min : function(D, C) {
			var z = D[0], e, B, A;
			for (e = 0, B = D.length; e < B; e++) {
				A = D[e];
				if (C) {
					if (C(z, A) === 1) {
						z = A
					}
				} else {
					if (A < z) {
						z = A
					}
				}
			}
			return z
		},
		max : function(D, C) {
			var e = D[0], z, B, A;
			for (z = 0, B = D.length; z < B; z++) {
				A = D[z];
				if (C) {
					if (C(e, A) === -1) {
						e = A
					}
				} else {
					if (A > e) {
						e = A
					}
				}
			}
			return e
		},
		mean : function(e) {
			return e.length > 0 ? a.sum(e) / e.length : undefined
		},
		sum : function(C) {
			var z = 0, e, B, A;
			for (e = 0, B = C.length; e < B; e++) {
				A = C[e];
				z += A
			}
			return z
		},
		erase : w,
		insert : function(A, z, e) {
			return t(A, z, 0, e)
		},
		replace : t,
		splice : v
	};
	Ext.each = a.each;
	a.union = a.merge;
	Ext.min = a.min;
	Ext.max = a.max;
	Ext.sum = a.sum;
	Ext.mean = a.mean;
	Ext.flatten = a.flatten;
	Ext.clean = a.clean;
	Ext.unique = a.unique;
	Ext.pluck = a.pluck;
	Ext.toArray = function() {
		return a.toArray.apply(a, arguments)
	}
})();
Ext.Function = {
	flexSetter : function(a) {
		return function(d, c) {
			var e, g;
			if (d === null) {
				return this
			}
			if (typeof d !== "string") {
				for (e in d) {
					if (d.hasOwnProperty(e)) {
						a.call(this, e, d[e])
					}
				}
				if (Ext.enumerables) {
					for (g = Ext.enumerables.length; g--;) {
						e = Ext.enumerables[g];
						if (d.hasOwnProperty(e)) {
							a.call(this, e, d[e])
						}
					}
				}
			} else {
				a.call(this, d, c)
			}
			return this
		}
	},
	bind : function(d, c, b, a) {
		if (arguments.length === 2) {
			return function() {
				return d.apply(c, arguments)
			}
		}
		var g = d, e = Array.prototype.slice;
		return function() {
			var h = b || arguments;
			if (a === true) {
				h = e.call(arguments, 0);
				h = h.concat(b)
			} else {
				if (typeof a == "number") {
					h = e.call(arguments, 0);
					Ext.Array.insert(h, a, b)
				}
			}
			return g.apply(c || window, h)
		}
	},
	pass : function(c, a, b) {
		if (a) {
			a = Ext.Array.from(a)
		}
		return function() {
			return c.apply(b, a.concat(Ext.Array.toArray(arguments)))
		}
	},
	alias : function(b, a) {
		return function() {
			return b[a].apply(b, arguments)
		}
	},
	createInterceptor : function(d, c, b, a) {
		var e = d;
		if (!Ext.isFunction(c)) {
			return d
		} else {
			return function() {
				var h = this, g = arguments;
				c.target = h;
				c.method = d;
				return (c.apply(b || h || window, g) !== false) ? d.apply(h
						|| window, g) : a || null
			}
		}
	},
	createDelayed : function(e, c, d, b, a) {
		if (d || b) {
			e = Ext.Function.bind(e, d, b, a)
		}
		return function() {
			var g = this;
			setTimeout(function() {
				e.apply(g, arguments)
			}, c)
		}
	},
	defer : function(d, c, e, b, a) {
		d = Ext.Function.bind(d, e, b, a);
		if (c > 0) {
			return setTimeout(d, c)
		}
		d();
		return 0
	},
	createSequence : function(c, b, a) {
		if (!Ext.isFunction(b)) {
			return c
		} else {
			return function() {
				var d = c.apply(this || window, arguments);
				b.apply(a || this || window, arguments);
				return d
			}
		}
	},
	createBuffered : function(d, a, c, b) {
		return function() {
			var e;
			return function() {
				var g = this;
				if (e) {
					clearTimeout(e);
					e = null
				}
				e = setTimeout(function() {
					d.apply(c || g, b || arguments)
				}, a)
			}
		}()
	},
	createThrottled : function(e, b, d) {
		var g, a, c, i, h = function() {
			e.apply(d || this, c);
			g = new Date().getTime()
		};
		return function() {
			a = new Date().getTime() - g;
			c = arguments;
			clearTimeout(i);
			if (!g || (a >= b)) {
				h()
			} else {
				i = setTimeout(h, b - a)
			}
		}
	},
	interceptBefore : function(b, a, c) {
		var d = b[a] || Ext.emptyFn;
		return b[a] = function() {
			var e = c.apply(this, arguments);
			d.apply(this, arguments);
			return e
		}
	},
	interceptAfter : function(b, a, c) {
		var d = b[a] || Ext.emptyFn;
		return b[a] = function() {
			d.apply(this, arguments);
			return c.apply(this, arguments)
		}
	}
};
Ext.defer = Ext.Function.alias(Ext.Function, "defer");
Ext.pass = Ext.Function.alias(Ext.Function, "pass");
Ext.bind = Ext.Function.alias(Ext.Function, "bind");
(function() {
	var a = Ext.Object = {
		toQueryObjects : function(d, j, c) {
			var b = a.toQueryObjects, h = [], e, g;
			if (Ext.isArray(j)) {
				for (e = 0, g = j.length; e < g; e++) {
					if (c) {
						h = h.concat(b(d + "[" + e + "]", j[e], true))
					} else {
						h.push({
							name : d,
							value : j[e]
						})
					}
				}
			} else {
				if (Ext.isObject(j)) {
					for (e in j) {
						if (j.hasOwnProperty(e)) {
							if (c) {
								h = h.concat(b(d + "[" + e + "]", j[e], true))
							} else {
								h.push({
									name : d,
									value : j[e]
								})
							}
						}
					}
				} else {
					h.push({
						name : d,
						value : j
					})
				}
			}
			return h
		},
		toQueryString : function(e, c) {
			var g = [], d = [], k, h, l, b, m;
			for (k in e) {
				if (e.hasOwnProperty(k)) {
					g = g.concat(a.toQueryObjects(k, e[k], c))
				}
			}
			for (h = 0, l = g.length; h < l; h++) {
				b = g[h];
				m = b.value;
				if (Ext.isEmpty(m)) {
					m = ""
				} else {
					if (Ext.isDate(m)) {
						m = Ext.Date.toString(m)
					}
				}
				d.push(encodeURIComponent(b.name) + "="
						+ encodeURIComponent(String(m)))
			}
			return d.join("&")
		},
		fromQueryString : function(c, q) {
			var l = c.replace(/^\?/, "").split("&"), t = {}, r, h, v, m, p, e, n, o, b, g, s, k, u, d;
			for (p = 0, e = l.length; p < e; p++) {
				n = l[p];
				if (n.length > 0) {
					h = n.split("=");
					v = decodeURIComponent(h[0]);
					m = (h[1] !== undefined) ? decodeURIComponent(h[1]) : "";
					if (!q) {
						if (t.hasOwnProperty(v)) {
							if (!Ext.isArray(t[v])) {
								t[v] = [t[v]]
							}
							t[v].push(m)
						} else {
							t[v] = m
						}
					} else {
						g = v.match(/(\[):?([^\]]*)\]/g);
						s = v.match(/^([^\[]+)/);
						v = s[0];
						k = [];
						if (g === null) {
							t[v] = m;
							continue
						}
						for (o = 0, b = g.length; o < b; o++) {
							u = g[o];
							u = (u.length === 2) ? "" : u.substring(1, u.length
									- 1);
							k.push(u)
						}
						k.unshift(v);
						r = t;
						for (o = 0, b = k.length; o < b; o++) {
							u = k[o];
							if (o === b - 1) {
								if (Ext.isArray(r) && u === "") {
									r.push(m)
								} else {
									r[u] = m
								}
							} else {
								if (r[u] === undefined
										|| typeof r[u] === "string") {
									d = k[o + 1];
									r[u] = (Ext.isNumeric(d) || d === "")
											? []
											: {}
								}
								r = r[u]
							}
						}
					}
				}
			}
			return t
		},
		each : function(b, d, c) {
			for (var e in b) {
				if (b.hasOwnProperty(e)) {
					if (d.call(c || b, e, b[e], b) === false) {
						return
					}
				}
			}
		},
		merge : function(j, d, h) {
			if (typeof d === "string") {
				if (h && h.constructor === Object) {
					if (j[d] && j[d].constructor === Object) {
						a.merge(j[d], h)
					} else {
						j[d] = Ext.clone(h)
					}
				} else {
					j[d] = h
				}
				return j
			}
			var c = 1, e = arguments.length, b, g;
			for (; c < e; c++) {
				b = arguments[c];
				for (g in b) {
					if (b.hasOwnProperty(g)) {
						a.merge(j, g, b[g])
					}
				}
			}
			return j
		},
		getKey : function(b, d) {
			for (var c in b) {
				if (b.hasOwnProperty(c) && b[c] === d) {
					return c
				}
			}
			return null
		},
		getValues : function(c) {
			var b = [], d;
			for (d in c) {
				if (c.hasOwnProperty(d)) {
					b.push(c[d])
				}
			}
			return b
		},
		getKeys : ("keys" in Object.prototype) ? Object.keys : function(b) {
			var c = [], d;
			for (d in b) {
				if (b.hasOwnProperty(d)) {
					c.push(d)
				}
			}
			return c
		},
		getSize : function(b) {
			var c = 0, d;
			for (d in b) {
				if (b.hasOwnProperty(d)) {
					c++
				}
			}
			return c
		}
	};
	Ext.merge = Ext.Object.merge;
	Ext.urlEncode = function() {
		var b = Ext.Array.from(arguments), c = "";
		if ((typeof b[1] === "string")) {
			c = b[1] + "&";
			b[1] = false
		}
		return c + Ext.Object.toQueryString.apply(Ext.Object, b)
	};
	Ext.urlDecode = function() {
		return Ext.Object.fromQueryString.apply(Ext.Object, arguments)
	}
})();
(function() {
	function b(d) {
		var c = Array.prototype.slice.call(arguments, 1);
		return d.replace(/\{(\d+)\}/g, function(e, g) {
			return c[g]
		})
	}
	Ext.Date = {
		now : Date.now || function() {
			return +new Date()
		},
		toString : function(c) {
			var d = Ext.String.leftPad;
			return c.getFullYear() + "-" + d(c.getMonth() + 1, 2, "0") + "-"
					+ d(c.getDate(), 2, "0") + "T" + d(c.getHours(), 2, "0")
					+ ":" + d(c.getMinutes(), 2, "0") + ":"
					+ d(c.getSeconds(), 2, "0")
		},
		getElapsed : function(d, c) {
			return Math.abs(d - (c || new Date()))
		},
		useStrict : false,
		formatCodeToRegex : function(d, c) {
			var e = a.parseCodes[d];
			if (e) {
				e = typeof e == "function" ? e() : e;
				a.parseCodes[d] = e
			}
			return e ? Ext.applyIf({
				c : e.c ? b(e.c, c || "{0}") : e.c
			}, e) : {
				g : 0,
				c : null,
				s : Ext.String.escapeRegex(d)
			}
		},
		parseFunctions : {
			MS : function(d, c) {
				var e = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/");
				var g = (d || "").match(e);
				return g ? new Date(((g[1] || "") + g[2]) * 1) : null
			}
		},
		parseRegexes : [],
		formatFunctions : {
			MS : function() {
				return "\\/Date(" + this.getTime() + ")\\/"
			}
		},
		y2kYear : 50,
		MILLI : "ms",
		SECOND : "s",
		MINUTE : "mi",
		HOUR : "h",
		DAY : "d",
		MONTH : "mo",
		YEAR : "y",
		defaults : {},
		dayNames : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday", "Saturday"],
		monthNames : ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November",
				"December"],
		monthNumbers : {
			Jan : 0,
			Feb : 1,
			Mar : 2,
			Apr : 3,
			May : 4,
			Jun : 5,
			Jul : 6,
			Aug : 7,
			Sep : 8,
			Oct : 9,
			Nov : 10,
			Dec : 11
		},
		defaultFormat : "m/d/Y",
		getShortMonthName : function(c) {
			return a.monthNames[c].substring(0, 3)
		},
		getShortDayName : function(c) {
			return a.dayNames[c].substring(0, 3)
		},
		getMonthNumber : function(c) {
			return a.monthNumbers[c.substring(0, 1).toUpperCase()
					+ c.substring(1, 3).toLowerCase()]
		},
		formatContainsHourInfo : (function() {
			var d = /(\\.)/g, c = /([gGhHisucUOPZ]|MS)/;
			return function(e) {
				return c.test(e.replace(d, ""))
			}
		})(),
		formatContainsDateInfo : (function() {
			var d = /(\\.)/g, c = /([djzmnYycU]|MS)/;
			return function(e) {
				return c.test(e.replace(d, ""))
			}
		})(),
		formatCodes : {
			d : "Ext.String.leftPad(this.getDate(), 2, '0')",
			D : "Ext.Date.getShortDayName(this.getDay())",
			j : "this.getDate()",
			l : "Ext.Date.dayNames[this.getDay()]",
			N : "(this.getDay() ? this.getDay() : 7)",
			S : "Ext.Date.getSuffix(this)",
			w : "this.getDay()",
			z : "Ext.Date.getDayOfYear(this)",
			W : "Ext.String.leftPad(Ext.Date.getWeekOfYear(this), 2, '0')",
			F : "Ext.Date.monthNames[this.getMonth()]",
			m : "Ext.String.leftPad(this.getMonth() + 1, 2, '0')",
			M : "Ext.Date.getShortMonthName(this.getMonth())",
			n : "(this.getMonth() + 1)",
			t : "Ext.Date.getDaysInMonth(this)",
			L : "(Ext.Date.isLeapYear(this) ? 1 : 0)",
			o : "(this.getFullYear() + (Ext.Date.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))",
			Y : "Ext.String.leftPad(this.getFullYear(), 4, '0')",
			y : "('' + this.getFullYear()).substring(2, 4)",
			a : "(this.getHours() < 12 ? 'am' : 'pm')",
			A : "(this.getHours() < 12 ? 'AM' : 'PM')",
			g : "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
			G : "this.getHours()",
			h : "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
			H : "Ext.String.leftPad(this.getHours(), 2, '0')",
			i : "Ext.String.leftPad(this.getMinutes(), 2, '0')",
			s : "Ext.String.leftPad(this.getSeconds(), 2, '0')",
			u : "Ext.String.leftPad(this.getMilliseconds(), 3, '0')",
			O : "Ext.Date.getGMTOffset(this)",
			P : "Ext.Date.getGMTOffset(this, true)",
			T : "Ext.Date.getTimezone(this)",
			Z : "(this.getTimezoneOffset() * -60)",
			c : function() {
				for (var k = "Y-m-dTH:i:sP", h = [], g = 0, d = k.length; g < d; ++g) {
					var j = k.charAt(g);
					h.push(j == "T" ? "'T'" : a.getFormatCode(j))
				}
				return h.join(" + ")
			},
			U : "Math.round(this.getTime() / 1000)"
		},
		isValid : function(o, c, n, k, g, j, e) {
			k = k || 0;
			g = g || 0;
			j = j || 0;
			e = e || 0;
			var l = a.add(new Date(o < 100 ? 100 : o, c - 1, n, k, g, j, e),
					a.YEAR, o < 100 ? o - 100 : 0);
			return o == l.getFullYear() && c == l.getMonth() + 1
					&& n == l.getDate() && k == l.getHours()
					&& g == l.getMinutes() && j == l.getSeconds()
					&& e == l.getMilliseconds()
		},
		parse : function(d, g, c) {
			var e = a.parseFunctions;
			if (e[g] == null) {
				a.createParser(g)
			}
			return e[g](d, Ext.isDefined(c) ? c : a.useStrict)
		},
		parseDate : function(d, e, c) {
			return a.parse(d, e, c)
		},
		getFormatCode : function(d) {
			var c = a.formatCodes[d];
			if (c) {
				c = typeof c == "function" ? c() : c;
				a.formatCodes[d] = c
			}
			return c || ("'" + Ext.String.escape(d) + "'")
		},
		createFormat : function(h) {
			var g = [], c = false, e = "";
			for (var d = 0; d < h.length; ++d) {
				e = h.charAt(d);
				if (!c && e == "\\") {
					c = true
				} else {
					if (c) {
						c = false;
						g.push("'" + Ext.String.escape(e) + "'")
					} else {
						g.push(a.getFormatCode(e))
					}
				}
			}
			a.formatFunctions[h] = Ext.functionFactory("return " + g.join("+"))
		},
		createParser : (function() {
			var c = [
					"var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,",
					"def = Ext.Date.defaults,",
					"results = String(input).match(Ext.Date.parseRegexes[{0}]);",
					"if(results){",
					"{1}",
					"if(u != null){",
					"v = new Date(u * 1000);",
					"}else{",
					"dt = Ext.Date.clearTime(new Date);",
					"y = Ext.Number.from(y, Ext.Number.from(def.y, dt.getFullYear()));",
					"m = Ext.Number.from(m, Ext.Number.from(def.m - 1, dt.getMonth()));",
					"d = Ext.Number.from(d, Ext.Number.from(def.d, dt.getDate()));",
					"h  = Ext.Number.from(h, Ext.Number.from(def.h, dt.getHours()));",
					"i  = Ext.Number.from(i, Ext.Number.from(def.i, dt.getMinutes()));",
					"s  = Ext.Number.from(s, Ext.Number.from(def.s, dt.getSeconds()));",
					"ms = Ext.Number.from(ms, Ext.Number.from(def.ms, dt.getMilliseconds()));",
					"if(z >= 0 && y >= 0){",
					"v = Ext.Date.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);",
					"v = !strict? v : (strict === true && (z <= 364 || (Ext.Date.isLeapYear(v) && z <= 365))? Ext.Date.add(v, Ext.Date.DAY, z) : null);",
					"}else if(strict === true && !Ext.Date.isValid(y, m + 1, d, h, i, s, ms)){",
					"v = null;",
					"}else{",
					"v = Ext.Date.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);",
					"}",
					"}",
					"}",
					"if(v){",
					"if(zz != null){",
					"v = Ext.Date.add(v, Ext.Date.SECOND, -v.getTimezoneOffset() * 60 - zz);",
					"}else if(o){",
					"v = Ext.Date.add(v, Ext.Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
					"}", "}", "return v;"].join("\n");
			return function(m) {
				var e = a.parseRegexes.length, n = 1, g = [], l = [], k = false, d = "";
				for (var j = 0; j < m.length; ++j) {
					d = m.charAt(j);
					if (!k && d == "\\") {
						k = true
					} else {
						if (k) {
							k = false;
							l.push(Ext.String.escape(d))
						} else {
							var h = a.formatCodeToRegex(d, n);
							n += h.g;
							l.push(h.s);
							if (h.g && h.c) {
								g.push(h.c)
							}
						}
					}
				}
				a.parseRegexes[e] = new RegExp("^" + l.join("") + "$", "i");
				a.parseFunctions[m] = Ext.functionFactory("input", "strict", b(
						c, e, g.join("")))
			}
		})(),
		parseCodes : {
			d : {
				g : 1,
				c : "d = parseInt(results[{0}], 10);\n",
				s : "(\\d{2})"
			},
			j : {
				g : 1,
				c : "d = parseInt(results[{0}], 10);\n",
				s : "(\\d{1,2})"
			},
			D : function() {
				for (var c = [], d = 0; d < 7; c.push(a.getShortDayName(d)), ++d) {
				}
				return {
					g : 0,
					c : null,
					s : "(?:" + c.join("|") + ")"
				}
			},
			l : function() {
				return {
					g : 0,
					c : null,
					s : "(?:" + a.dayNames.join("|") + ")"
				}
			},
			N : {
				g : 0,
				c : null,
				s : "[1-7]"
			},
			S : {
				g : 0,
				c : null,
				s : "(?:st|nd|rd|th)"
			},
			w : {
				g : 0,
				c : null,
				s : "[0-6]"
			},
			z : {
				g : 1,
				c : "z = parseInt(results[{0}], 10);\n",
				s : "(\\d{1,3})"
			},
			W : {
				g : 0,
				c : null,
				s : "(?:\\d{2})"
			},
			F : function() {
				return {
					g : 1,
					c : "m = parseInt(Ext.Date.getMonthNumber(results[{0}]), 10);\n",
					s : "(" + a.monthNames.join("|") + ")"
				}
			},
			M : function() {
				for (var c = [], d = 0; d < 12; c.push(a.getShortMonthName(d)), ++d) {
				}
				return Ext.applyIf({
					s : "(" + c.join("|") + ")"
				}, a.formatCodeToRegex("F"))
			},
			m : {
				g : 1,
				c : "m = parseInt(results[{0}], 10) - 1;\n",
				s : "(\\d{2})"
			},
			n : {
				g : 1,
				c : "m = parseInt(results[{0}], 10) - 1;\n",
				s : "(\\d{1,2})"
			},
			t : {
				g : 0,
				c : null,
				s : "(?:\\d{2})"
			},
			L : {
				g : 0,
				c : null,
				s : "(?:1|0)"
			},
			o : function() {
				return a.formatCodeToRegex("Y")
			},
			Y : {
				g : 1,
				c : "y = parseInt(results[{0}], 10);\n",
				s : "(\\d{4})"
			},
			y : {
				g : 1,
				c : "var ty = parseInt(results[{0}], 10);\ny = ty > Ext.Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
				s : "(\\d{1,2})"
			},
			a : {
				g : 1,
				c : "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
				s : "(am|pm|AM|PM)"
			},
			A : {
				g : 1,
				c : "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
				s : "(AM|PM|am|pm)"
			},
			g : function() {
				return a.formatCodeToRegex("G")
			},
			G : {
				g : 1,
				c : "h = parseInt(results[{0}], 10);\n",
				s : "(\\d{1,2})"
			},
			h : function() {
				return a.formatCodeToRegex("H")
			},
			H : {
				g : 1,
				c : "h = parseInt(results[{0}], 10);\n",
				s : "(\\d{2})"
			},
			i : {
				g : 1,
				c : "i = parseInt(results[{0}], 10);\n",
				s : "(\\d{2})"
			},
			s : {
				g : 1,
				c : "s = parseInt(results[{0}], 10);\n",
				s : "(\\d{2})"
			},
			u : {
				g : 1,
				c : "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
				s : "(\\d+)"
			},
			O : {
				g : 1,
				c : [
						"o = results[{0}];",
						"var sn = o.substring(0,1),",
						"hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),",
						"mn = o.substring(3,5) % 60;",
						"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"]
						.join("\n"),
				s : "([+-]\\d{4})"
			},
			P : {
				g : 1,
				c : [
						"o = results[{0}];",
						"var sn = o.substring(0,1),",
						"hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),",
						"mn = o.substring(4,6) % 60;",
						"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"]
						.join("\n"),
				s : "([+-]\\d{2}:\\d{2})"
			},
			T : {
				g : 0,
				c : null,
				s : "[A-Z]{1,4}"
			},
			Z : {
				g : 1,
				c : "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
				s : "([+-]?\\d{1,5})"
			},
			c : function() {
				var e = [], c = [a.formatCodeToRegex("Y", 1),
						a.formatCodeToRegex("m", 2),
						a.formatCodeToRegex("d", 3),
						a.formatCodeToRegex("h", 4),
						a.formatCodeToRegex("i", 5),
						a.formatCodeToRegex("s", 6), {
							c : "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
						}, {
							c : ["if(results[8]) {", "if(results[8] == 'Z'){",
									"zz = 0;",
									"}else if (results[8].indexOf(':') > -1){",
									a.formatCodeToRegex("P", 8).c, "}else{",
									a.formatCodeToRegex("O", 8).c, "}", "}"]
									.join("\n")
						}];
				for (var g = 0, d = c.length; g < d; ++g) {
					e.push(c[g].c)
				}
				return {
					g : 1,
					c : e.join(""),
					s : [c[0].s, "(?:", "-", c[1].s, "(?:", "-", c[2].s, "(?:",
							"(?:T| )?", c[3].s, ":", c[4].s, "(?::", c[5].s,
							")?", "(?:(?:\\.|,)(\\d+))?",
							"(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"]
							.join("")
				}
			},
			U : {
				g : 1,
				c : "u = parseInt(results[{0}], 10);\n",
				s : "(-?\\d+)"
			}
		},
		dateFormat : function(c, d) {
			return a.format(c, d)
		},
		format : function(d, e) {
			if (a.formatFunctions[e] == null) {
				a.createFormat(e)
			}
			var c = a.formatFunctions[e].call(d);
			return c + ""
		},
		getTimezone : function(c) {
			return c
					.toString()
					.replace(
							/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,
							"$1$2").replace(/[^A-Z]/g, "")
		},
		getGMTOffset : function(c, d) {
			var e = c.getTimezoneOffset();
			return (e > 0 ? "-" : "+")
					+ Ext.String.leftPad(Math.floor(Math.abs(e) / 60), 2, "0")
					+ (d ? ":" : "")
					+ Ext.String.leftPad(Math.abs(e % 60), 2, "0")
		},
		getDayOfYear : function(g) {
			var e = 0, j = Ext.Date.clone(g), c = g.getMonth(), h;
			for (h = 0, j.setDate(1), j.setMonth(0); h < c; j.setMonth(++h)) {
				e += a.getDaysInMonth(j)
			}
			return e + g.getDate() - 1
		},
		getWeekOfYear : (function() {
			var c = 86400000, d = 7 * c;
			return function(g) {
				var h = Date
						.UTC(g.getFullYear(), g.getMonth(), g.getDate() + 3)
						/ c, e = Math.floor(h / 7), i = new Date(e * d)
						.getUTCFullYear();
				return e - Math.floor(Date.UTC(i, 0, 7) / d) + 1
			}
		})(),
		isLeapYear : function(c) {
			var d = c.getFullYear();
			return !!((d & 3) == 0 && (d % 100 || (d % 400 == 0 && d)))
		},
		getFirstDayOfMonth : function(d) {
			var c = (d.getDay() - (d.getDate() - 1)) % 7;
			return (c < 0) ? (c + 7) : c
		},
		getLastDayOfMonth : function(c) {
			return a.getLastDateOfMonth(c).getDay()
		},
		getFirstDateOfMonth : function(c) {
			return new Date(c.getFullYear(), c.getMonth(), 1)
		},
		getLastDateOfMonth : function(c) {
			return new Date(c.getFullYear(), c.getMonth(), a.getDaysInMonth(c))
		},
		getDaysInMonth : (function() {
			var c = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			return function(e) {
				var d = e.getMonth();
				return d == 1 && a.isLeapYear(e) ? 29 : c[d]
			}
		})(),
		getSuffix : function(c) {
			switch (c.getDate()) {
				case 1 :
				case 21 :
				case 31 :
					return "st";
				case 2 :
				case 22 :
					return "nd";
				case 3 :
				case 23 :
					return "rd";
				default :
					return "th"
			}
		},
		clone : function(c) {
			return new Date(c.getTime())
		},
		isDST : function(c) {
			return new Date(c.getFullYear(), 0, 1).getTimezoneOffset() != c
					.getTimezoneOffset()
		},
		clearTime : function(e, j) {
			if (j) {
				return Ext.Date.clearTime(Ext.Date.clone(e))
			}
			var h = e.getDate();
			e.setHours(0);
			e.setMinutes(0);
			e.setSeconds(0);
			e.setMilliseconds(0);
			if (e.getDate() != h) {
				for (var g = 1, i = a.add(e, Ext.Date.HOUR, g); i.getDate() != h; g++, i = a
						.add(e, Ext.Date.HOUR, g)) {
				}
				e.setDate(h);
				e.setHours(i.getHours())
			}
			return e
		},
		add : function(h, g, i) {
			var j = Ext.Date.clone(h), c = Ext.Date;
			if (!g || i === 0) {
				return j
			}
			switch (g.toLowerCase()) {
				case Ext.Date.MILLI :
					j.setMilliseconds(j.getMilliseconds() + i);
					break;
				case Ext.Date.SECOND :
					j.setSeconds(j.getSeconds() + i);
					break;
				case Ext.Date.MINUTE :
					j.setMinutes(j.getMinutes() + i);
					break;
				case Ext.Date.HOUR :
					j.setHours(j.getHours() + i);
					break;
				case Ext.Date.DAY :
					j.setDate(j.getDate() + i);
					break;
				case Ext.Date.MONTH :
					var e = h.getDate();
					if (e > 28) {
						e = Math.min(e, Ext.Date.getLastDateOfMonth(Ext.Date
								.add(Ext.Date.getFirstDateOfMonth(h), "mo", i))
								.getDate())
					}
					j.setDate(e);
					j.setMonth(h.getMonth() + i);
					break;
				case Ext.Date.YEAR :
					j.setFullYear(h.getFullYear() + i);
					break
			}
			return j
		},
		between : function(d, g, c) {
			var e = d.getTime();
			return g.getTime() <= e && e <= c.getTime()
		},
		compat : function() {
			var g = window.Date, e, c, h = ["useStrict", "formatCodeToRegex",
					"parseFunctions", "parseRegexes", "formatFunctions",
					"y2kYear", "MILLI", "SECOND", "MINUTE", "HOUR", "DAY",
					"MONTH", "YEAR", "defaults", "dayNames", "monthNames",
					"monthNumbers", "getShortMonthName", "getShortDayName",
					"getMonthNumber", "formatCodes", "isValid", "parseDate",
					"getFormatCode", "createFormat", "createParser",
					"parseCodes"], d = ["dateFormat", "format", "getTimezone",
					"getGMTOffset", "getDayOfYear", "getWeekOfYear",
					"isLeapYear", "getFirstDayOfMonth", "getLastDayOfMonth",
					"getDaysInMonth", "getSuffix", "clone", "isDST",
					"clearTime", "add", "between"];
			Ext.Array.forEach(h, function(i) {
				g[i] = a[i]
			});
			Ext.Array.forEach(d, function(i) {
				g.prototype[i] = function() {
					var j = Array.prototype.slice.call(arguments);
					j.unshift(this);
					return a[i].apply(a, j)
				}
			})
		}
	};
	var a = Ext.Date
})();
(function(a) {
	var b = Ext.Base = function() {
	};
	b.prototype = {
		$className : "Ext.Base",
		$class : b,
		self : b,
		constructor : function() {
			return this
		},
		initConfig : function(c) {
			if (!this.$configInited) {
				this.config = Ext.Object.merge({}, this.config || {}, c || {});
				this.applyConfig(this.config);
				this.$configInited = true
			}
			return this
		},
		setConfig : function(c) {
			this.applyConfig(c || {});
			return this
		},
		applyConfig : a(function(c, d) {
			var e = "set" + Ext.String.capitalize(c);
			if (typeof this[e] === "function") {
				this[e].call(this, d)
			}
			return this
		}),
		callParent : function(d) {
			var g = this.callParent.caller, e, c;
			if (!g.$owner) {
				g = g.caller
			}
			e = g.$owner.superclass;
			c = g.$name;
			return e[c].apply(this, d || [])
		},
		statics : function() {
			var d = this.statics.caller, c = this.self;
			if (!d) {
				return c
			}
			return d.$owner
		},
		callOverridden : function(c) {
			var d = this.callOverridden.caller;
			return d.$previous.apply(this, c || [])
		},
		destroy : function() {
		}
	};
	Ext.apply(Ext.Base, {
		create : function() {
			return Ext.create.apply(Ext, [this].concat(Array.prototype.slice
					.call(arguments, 0)))
		},
		own : function(c, d) {
			if (typeof d == "function") {
				this.ownMethod(c, d)
			} else {
				this.prototype[c] = d
			}
		},
		ownMethod : function(c, d) {
			var e;
			if (typeof d.$owner !== "undefined" && d !== Ext.emptyFn) {
				e = d;
				d = function() {
					return e.apply(this, arguments)
				}
			}
			d.$owner = this;
			d.$name = c;
			this.prototype[c] = d
		},
		addStatics : function(c) {
			for (var d in c) {
				if (c.hasOwnProperty(d)) {
					this[d] = c[d]
				}
			}
			return this
		},
		addInheritableStatics : function(d) {
			var h, c, g = this.prototype, e, i;
			h = g.$inheritableStatics;
			c = g.$hasInheritableStatics;
			if (!h) {
				h = g.$inheritableStatics = [];
				c = g.$hasInheritableStatics = {}
			}
			for (e in d) {
				if (d.hasOwnProperty(e)) {
					i = d[e];
					this[e] = i;
					if (!c[e]) {
						c[e] = true;
						h.push(e)
					}
				}
			}
			return this
		},
		implement : function(d) {
			var g = this.prototype, c = Ext.enumerables, e, h, j;
			for (e in d) {
				if (d.hasOwnProperty(e)) {
					j = d[e];
					if (typeof j === "function") {
						j.$owner = this;
						j.$name = e
					}
					g[e] = j
				}
			}
			if (c) {
				for (h = c.length; h--;) {
					e = c[h];
					if (d.hasOwnProperty(e)) {
						j = d[e];
						j.$owner = this;
						j.$name = e;
						g[e] = j
					}
				}
			}
		},
		borrow : function(h, d) {
			var c = h.prototype, e, g, j;
			d = Ext.Array.from(d);
			for (e = 0, g = d.length; e < g; e++) {
				j = d[e];
				this.own(j, c[j])
			}
			return this
		},
		override : function(d) {
			var g = this.prototype, c = Ext.enumerables, e, h, k, j;
			if (arguments.length === 2) {
				e = d;
				k = arguments[1];
				if (typeof k == "function") {
					if (typeof g[e] == "function") {
						j = g[e];
						k.$previous = j
					}
					this.ownMethod(e, k)
				} else {
					g[e] = k
				}
				return this
			}
			for (e in d) {
				if (d.hasOwnProperty(e)) {
					k = d[e];
					if (typeof k === "function") {
						if (typeof g[e] === "function") {
							j = g[e];
							k.$previous = j
						}
						this.ownMethod(e, k)
					} else {
						g[e] = k
					}
				}
			}
			if (c) {
				for (h = c.length; h--;) {
					e = c[h];
					if (d.hasOwnProperty(e)) {
						if (typeof g[e] !== "undefined") {
							j = g[e];
							d[e].$previous = j
						}
						this.ownMethod(e, d[e])
					}
				}
			}
			return this
		},
		mixin : function(e, c) {
			var d = c.prototype, i = this.prototype, g, h;
			for (g in d) {
				if (d.hasOwnProperty(g)) {
					if (typeof i[g] === "undefined" && g !== "mixins"
							&& g !== "mixinId") {
						if (typeof d[g] === "function") {
							h = d[g];
							if (typeof h.$owner === "undefined") {
								this.ownMethod(g, h)
							} else {
								i[g] = h
							}
						} else {
							i[g] = d[g]
						}
					} else {
						if (g === "config" && i.config && d.config) {
							Ext.Object.merge(i.config, d.config)
						}
					}
				}
			}
			if (typeof d.onClassMixedIn !== "undefined") {
				d.onClassMixedIn.call(c, this)
			}
			if (!i.hasOwnProperty("mixins")) {
				if ("mixins" in i) {
					i.mixins = Ext.Object.merge({}, i.mixins)
				} else {
					i.mixins = {}
				}
			}
			i.mixins[e] = d
		},
		getName : function() {
			return Ext.getClassName(this)
		},
		createAlias : a(function(d, c) {
			this.prototype[d] = function() {
				return this[c].apply(this, arguments)
			}
		})
	})
})(Ext.Function.flexSetter);
(function() {
	var c, d = Ext.Base, b = [], a;
	for (a in d) {
		if (d.hasOwnProperty(a)) {
			b.push(a)
		}
	}
	Ext.Class = c = function(m, s, q) {
		if (typeof m != "function") {
			q = s;
			s = m;
			m = function() {
				return this.constructor.apply(this, arguments)
			}
		}
		if (!s) {
			s = {}
		}
		var g = s.preprocessors || c.getDefaultPreprocessors(), n = c
				.getPreprocessors(), l = 0, p = [], t, r, e, k, h, o;
		for (k = 0, o = b.length; k < o; k++) {
			r = b[k];
			m[r] = d[r]
		}
		delete s.preprocessors;
		for (h = 0, o = g.length; h < o; h++) {
			t = g[h];
			if (typeof t == "string") {
				t = n[t];
				if (!t.always) {
					if (s.hasOwnProperty(t.name)) {
						p.push(t.fn)
					}
				} else {
					p.push(t.fn)
				}
			} else {
				p.push(t)
			}
		}
		s.onClassCreated = q || Ext.emptyFn;
		s.onBeforeClassCreated = function(i, j) {
			q = j.onClassCreated;
			delete j.onBeforeClassCreated;
			delete j.onClassCreated;
			i.implement(j);
			q.call(i, i)
		};
		e = function(i, j) {
			t = p[l++];
			if (!t) {
				j.onBeforeClassCreated.apply(this, arguments);
				return
			}
			if (t.call(this, i, j, e) !== false) {
				e.apply(this, arguments)
			}
		};
		e.call(c, m, s);
		return m
	};
	Ext.apply(c, {
		preprocessors : {},
		registerPreprocessor : function(g, h, e) {
			this.preprocessors[g] = {
				name : g,
				always : e || false,
				fn : h
			};
			return this
		},
		getPreprocessor : function(e) {
			return this.preprocessors[e]
		},
		getPreprocessors : function() {
			return this.preprocessors
		},
		getDefaultPreprocessors : function() {
			return this.defaultPreprocessors || []
		},
		setDefaultPreprocessors : function(e) {
			this.defaultPreprocessors = Ext.Array.from(e);
			return this
		},
		setDefaultPreprocessorPosition : function(h, j, i) {
			var e = this.defaultPreprocessors, g;
			if (typeof j == "string") {
				if (j === "first") {
					e.unshift(h);
					return this
				} else {
					if (j === "last") {
						e.push(h);
						return this
					}
				}
				j = (j === "after") ? 1 : -1
			}
			g = Ext.Array.indexOf(e, i);
			if (g !== -1) {
				Ext.Array.splice(e, Math.max(0, g + j), 0, h)
			}
			return this
		}
	});
	c.registerPreprocessor("extend", function(u, j) {
		var p = j.extend, e = Ext.Base, n = e.prototype, r = function() {
		}, s, l, h, o, t, g, q, m;
		if (p && p !== Object) {
			s = p
		} else {
			s = e
		}
		q = s.prototype;
		r.prototype = q;
		m = u.prototype = new r();
		if (!("$class" in s)) {
			for (l in n) {
				if (!q[l]) {
					q[l] = n[l]
				}
			}
		}
		m.self = u;
		u.superclass = m.superclass = q;
		delete j.extend;
		g = q.$inheritableStatics;
		if (g) {
			for (h = 0, o = g.length; h < o; h++) {
				t = g[h];
				if (!u.hasOwnProperty(t)) {
					u[t] = s[t]
				}
			}
		}
		if (q.config) {
			m.config = Ext.Object.merge({}, q.config)
		} else {
			m.config = {}
		}
		if (m.$onExtended) {
			m.$onExtended.call(u, u, j)
		}
		if (j.onClassExtended) {
			m.$onExtended = j.onClassExtended;
			delete j.onClassExtended
		}
	}, true);
	c.registerPreprocessor("statics", function(e, g) {
		e.addStatics(g.statics);
		delete g.statics
	});
	c.registerPreprocessor("inheritableStatics", function(e, g) {
		e.addInheritableStatics(g.inheritableStatics);
		delete g.inheritableStatics
	});
	c.registerPreprocessor("config", function(e, h) {
		var g = e.prototype;
		Ext.Object.each(h.config, function(m) {
			var j = m.charAt(0).toUpperCase() + m.substr(1), k = m, l = "apply"
					+ j, n = "set" + j, i = "get" + j;
			if (!(l in g) && !h.hasOwnProperty(l)) {
				h[l] = function(o) {
					return o
				}
			}
			if (!(n in g) && !h.hasOwnProperty(n)) {
				h[n] = function(p) {
					var o = this[l].call(this, p, this[k]);
					if (typeof o != "undefined") {
						this[k] = o
					}
					return this
				}
			}
			if (!(i in g) && !h.hasOwnProperty(i)) {
				h[i] = function() {
					return this[k]
				}
			}
		});
		Ext.Object.merge(g.config, h.config);
		delete h.config
	});
	c.registerPreprocessor("mixins", function(g, m) {
		var e = m.mixins, j, h, k, l;
		delete m.mixins;
		Ext.Function.interceptBefore(m, "onClassCreated", function(i) {
			if (e instanceof Array) {
				for (k = 0, l = e.length; k < l; k++) {
					h = e[k];
					j = h.prototype.mixinId || h.$className;
					i.mixin(j, h)
				}
			} else {
				for (j in e) {
					if (e.hasOwnProperty(j)) {
						i.mixin(j, e[j])
					}
				}
			}
		})
	});
	c.setDefaultPreprocessors(["extend", "statics", "inheritableStatics",
			"config", "mixins"]);
	Ext.extend = function(g, i, h) {
		if (arguments.length === 2 && Ext.isObject(i)) {
			h = i;
			i = g;
			g = null
		}
		var e;
		if (!i) {
			Ext.Error
					.raise("Attempting to extend from a class which has not been loaded on the page.")
		}
		h.extend = i;
		h.preprocessors = ["extend", "statics", "inheritableStatics", "mixins",
				"config"];
		if (g) {
			e = new c(g, h)
		} else {
			e = new c(h)
		}
		e.prototype.override = function(k) {
			for (var j in k) {
				if (k.hasOwnProperty(j)) {
					this[j] = k[j]
				}
			}
		};
		return e
	}
})();
(function(b, c) {
	var e = Array.prototype.slice;
	var a = Ext.ClassManager = {
		classes : {},
		existCache : {},
		namespaceRewrites : [{
			from : "Ext.",
			to : Ext
		}],
		maps : {
			alternateToName : {},
			aliasToName : {},
			nameToAliases : {}
		},
		enableNamespaceParseCache : true,
		namespaceParseCache : {},
		instantiators : [],
		isCreated : function(k) {
			var j, l, h, g, m;
			if (this.classes.hasOwnProperty(k)
					|| this.existCache.hasOwnProperty(k)) {
				return true
			}
			g = Ext.global;
			m = this.parseNamespace(k);
			for (j = 0, l = m.length; j < l; j++) {
				h = m[j];
				if (typeof h !== "string") {
					g = h
				} else {
					if (!g || !g[h]) {
						return false
					}
					g = g[h]
				}
			}
			Ext.Loader.historyPush(k);
			this.existCache[k] = true;
			return true
		},
		parseNamespace : function(h) {
			var g = this.namespaceParseCache;
			if (this.enableNamespaceParseCache) {
				if (g.hasOwnProperty(h)) {
					return g[h]
				}
			}
			var j = [], l = this.namespaceRewrites, q, o, p, k, m, n = Ext.global;
			for (k = 0, m = l.length; k < m; k++) {
				q = l[k];
				o = q.from;
				p = q.to;
				if (h === o || h.substring(0, o.length) === o) {
					h = h.substring(o.length);
					if (typeof p !== "string") {
						n = p
					} else {
						j = j.concat(p.split("."))
					}
					break
				}
			}
			j.push(n);
			j = j.concat(h.split("."));
			if (this.enableNamespaceParseCache) {
				g[h] = j
			}
			return j
		},
		setNamespace : function(k, n) {
			var h = Ext.global, o = this.parseNamespace(k), m = o.length - 1, g = o[m], l, j;
			for (l = 0; l < m; l++) {
				j = o[l];
				if (typeof j !== "string") {
					h = j
				} else {
					if (!h[j]) {
						h[j] = {}
					}
					h = h[j]
				}
			}
			h[g] = n;
			return h[g]
		},
		createNamespaces : function() {
			var g = Ext.global, n, k, l, h, m, o;
			for (l = 0, m = arguments.length; l < m; l++) {
				n = this.parseNamespace(arguments[l]);
				for (h = 0, o = n.length; h < o; h++) {
					k = n[h];
					if (typeof k !== "string") {
						g = k
					} else {
						if (!g[k]) {
							g[k] = {}
						}
						g = g[k]
					}
				}
			}
			return g
		},
		set : function(g, i) {
			var h = this.getName(i);
			this.classes[g] = this.setNamespace(g, i);
			if (h && h !== g) {
				this.maps.alternateToName[g] = h
			}
			return this
		},
		get : function(j) {
			if (this.classes.hasOwnProperty(j)) {
				return this.classes[j]
			}
			var g = Ext.global, m = this.parseNamespace(j), h, k, l;
			for (k = 0, l = m.length; k < l; k++) {
				h = m[k];
				if (typeof h !== "string") {
					g = h
				} else {
					if (!g || !g[h]) {
						return null
					}
					g = g[h]
				}
			}
			return g
		},
		setAlias : function(g, h) {
			var j = this.maps.aliasToName, k = this.maps.nameToAliases, i;
			if (typeof g === "string") {
				i = g
			} else {
				i = this.getName(g)
			}
			if (h && j[h] !== i) {
				j[h] = i
			}
			if (!k[i]) {
				k[i] = []
			}
			if (h) {
				Ext.Array.include(k[i], h)
			}
			return this
		},
		getByAlias : function(g) {
			return this.get(this.getNameByAlias(g))
		},
		getNameByAlias : function(g) {
			return this.maps.aliasToName[g] || ""
		},
		getNameByAlternate : function(g) {
			return this.maps.alternateToName[g] || ""
		},
		getAliasesByName : function(g) {
			return this.maps.nameToAliases[g] || []
		},
		getName : function(g) {
			return g && g.$className || ""
		},
		getClass : function(g) {
			return g && g.self || null
		},
		create : function(i, j, g) {
			var h = this;
			j.$className = i;
			return new b(j, function() {
				var r = j.postprocessors || h.defaultPostprocessors, q = h.postprocessors, m = 0, l = [], k, p, n, o;
				delete j.postprocessors;
				for (n = 0, o = r.length; n < o; n++) {
					k = r[n];
					if (typeof k === "string") {
						k = q[k];
						if (!k.always) {
							if (j[k.name] !== undefined) {
								l.push(k.fn)
							}
						} else {
							l.push(k.fn)
						}
					} else {
						l.push(k)
					}
				}
				p = function(t, s, u) {
					k = l[m++];
					if (!k) {
						h.set(i, s);
						Ext.Loader.historyPush(i);
						if (g) {
							g.call(s, s)
						}
						return
					}
					if (k.call(this, t, s, u, p) !== false) {
						p.apply(this, arguments)
					}
				};
				p.call(h, i, this, j)
			})
		},
		instantiateByAlias : function() {
			var h = arguments[0], g = e.call(arguments), i = this
					.getNameByAlias(h);
			if (!i) {
				i = this.maps.aliasToName[h];
				Ext.syncRequire(i)
			}
			g[0] = i;
			return this.instantiate.apply(this, g)
		},
		instantiate : function() {
			var i = arguments[0], h = e.call(arguments, 1), j = i, k, g;
			if (typeof i !== "function") {
				g = this.get(i)
			} else {
				g = i
			}
			if (!g) {
				k = this.getNameByAlias(i);
				if (k) {
					i = k;
					g = this.get(i)
				}
			}
			if (!g) {
				k = this.getNameByAlternate(i);
				if (k) {
					i = k;
					g = this.get(i)
				}
			}
			if (!g) {
				Ext.syncRequire(i);
				g = this.get(i)
			}
			return this.getInstantiator(h.length)(g, h)
		},
		dynInstantiate : function(h, g) {
			g = Ext.Array.from(g, true);
			g.unshift(h);
			return this.instantiate.apply(this, g)
		},
		getInstantiator : function(j) {
			if (!this.instantiators[j]) {
				var h = j, g = [];
				for (h = 0; h < j; h++) {
					g.push("a[" + h + "]")
				}
				this.instantiators[j] = new Function("c", "a", "return new c("
						+ g.join(",") + ")")
			}
			return this.instantiators[j]
		},
		postprocessors : {},
		defaultPostprocessors : [],
		registerPostprocessor : function(h, i, g) {
			this.postprocessors[h] = {
				name : h,
				always : g || false,
				fn : i
			};
			return this
		},
		setDefaultPostprocessors : function(g) {
			this.defaultPostprocessors = Ext.Array.from(g);
			return this
		},
		setDefaultPostprocessorPosition : function(h, k, j) {
			var i = this.defaultPostprocessors, g;
			if (typeof k === "string") {
				if (k === "first") {
					i.unshift(h);
					return this
				} else {
					if (k === "last") {
						i.push(h);
						return this
					}
				}
				k = (k === "after") ? 1 : -1
			}
			g = Ext.Array.indexOf(i, j);
			if (g !== -1) {
				Ext.Array.splice(i, Math.max(0, g + k), 0, h)
			}
			return this
		},
		getNamesByExpression : function(o) {
			var m = this.maps.nameToAliases, p = [], g, l, j, h, q, k, n;
			if (o.indexOf("*") !== -1) {
				o = o.replace(/\*/g, "(.*?)");
				q = new RegExp("^" + o + "$");
				for (g in m) {
					if (m.hasOwnProperty(g)) {
						j = m[g];
						if (g.search(q) !== -1) {
							p.push(g)
						} else {
							for (k = 0, n = j.length; k < n; k++) {
								l = j[k];
								if (l.search(q) !== -1) {
									p.push(g);
									break
								}
							}
						}
					}
				}
			} else {
				h = this.getNameByAlias(o);
				if (h) {
					p.push(h)
				} else {
					h = this.getNameByAlternate(o);
					if (h) {
						p.push(h)
					} else {
						p.push(o)
					}
				}
			}
			return p
		}
	};
	var d = a.defaultPostprocessors;
	a.registerPostprocessor("alias", function(j, h, m) {
		var g = m.alias, k, l;
		delete m.alias;
		for (k = 0, l = g.length; k < l; k++) {
			c = g[k];
			this.setAlias(h, c)
		}
	});
	a.registerPostprocessor("singleton", function(h, g, j, i) {
		i.call(this, h, new g(), j);
		return false
	});
	a.registerPostprocessor("alternateClassName", function(h, g, m) {
		var k = m.alternateClassName, j, l, n;
		if (!(k instanceof Array)) {
			k = [k]
		}
		for (j = 0, l = k.length; j < l; j++) {
			n = k[j];
			this.set(n, g)
		}
	});
	a.setDefaultPostprocessors(["alias", "singleton", "alternateClassName"]);
	Ext.apply(Ext, {
		create : c(a, "instantiate"),
		factory : function(n, l) {
			if (n instanceof Array) {
				var k, m;
				for (k = 0, m = n.length; k < m; k++) {
					n[k] = Ext.factory(n[k], l)
				}
				return n
			}
			var g = (typeof n === "string");
			if (g || (n instanceof Object && n.constructor === Object)) {
				var j, h = {};
				if (g) {
					j = n
				} else {
					j = n.className;
					h = n;
					delete h.className
				}
				if (l !== undefined && j.indexOf(l) === -1) {
					j = l + "." + Ext.String.capitalize(j)
				}
				return Ext.create(j, h)
			}
			if (typeof n === "function") {
				return Ext.create(n)
			}
			return n
		},
		widget : function(h) {
			var g = e.call(arguments);
			g[0] = "widget." + h;
			return a.instantiateByAlias.apply(a, g)
		},
		createByAlias : c(a, "instantiateByAlias"),
		define : function(k, l, i) {
			if (!l.override) {
				return a.create.apply(a, arguments)
			}
			var j = l.requires, h = l.uses, g = k;
			k = l.override;
			l = Ext.apply({}, l);
			delete l.requires;
			delete l.uses;
			delete l.override;
			if (typeof j == "string") {
				j = [k, j]
			} else {
				if (j) {
					j = j.slice(0);
					j.unshift(k)
				} else {
					j = [k]
				}
			}
			return a.create(g, {
				requires : j,
				uses : h,
				isPartial : true,
				constructor : function() {
				}
			}, function() {
				var m = a.get(k);
				if (m.override) {
					m.override(l)
				} else {
					m.self.override(l)
				}
				if (i) {
					i.call(m)
				}
			})
		},
		getClassName : c(a, "getName"),
		getDisplayName : function(g) {
			if (g.displayName) {
				return g.displayName
			}
			if (g.$name && g.$class) {
				return Ext.getClassName(g.$class) + "#" + g.$name
			}
			if (g.$className) {
				return g.$className
			}
			return "Anonymous"
		},
		getClass : c(a, "getClass"),
		namespace : c(a, "createNamespaces")
	});
	Ext.createWidget = Ext.widget;
	Ext.ns = Ext.namespace;
	b.registerPreprocessor("className", function(g, h) {
		if (h.$className) {
			g.$className = h.$className
		}
	}, true);
	b.setDefaultPreprocessorPosition("className", "first");
	b.registerPreprocessor("xtype", function(h, n) {
		var m = Ext.Array.from(n.xtype), j = "widget.", g = Ext.Array
				.from(n.alias), k, l, o;
		n.xtype = m[0];
		n.xtypes = m;
		g = n.alias = Ext.Array.from(n.alias);
		for (k = 0, l = m.length; k < l; k++) {
			o = m[k];
			g.push(j + o)
		}
		n.alias = g
	});
	b.setDefaultPreprocessorPosition("xtype", "last");
	b.registerPreprocessor("alias", function(p, k) {
		var g = Ext.Array.from(k.alias), j = Ext.Array.from(k.xtypes), q = "widget.", o = q.length, l, n, m, h;
		for (l = 0, n = g.length; l < n; l++) {
			m = g[l];
			if (m.substring(0, o) === q) {
				h = m.substring(o);
				Ext.Array.include(j, h);
				if (!p.xtype) {
					p.xtype = k.xtype = h
				}
			}
		}
		k.alias = g;
		k.xtypes = j
	});
	b.setDefaultPreprocessorPosition("alias", "last")
})(Ext.Class, Ext.Function.alias);
(function(c, b, a, e) {
	var d = ["extend", "mixins", "requires"], g;
	g = Ext.Loader = {
		documentHead : typeof document !== "undefined"
				&& (document.head || document.getElementsByTagName("head")[0]),
		isLoading : false,
		queue : [],
		isFileLoaded : {},
		readyListeners : [],
		optionalRequires : [],
		requiresMap : {},
		numPendingFiles : 0,
		numLoadedFiles : 0,
		hasFileLoadError : false,
		classNameToFilePathMap : {},
		history : [],
		config : {
			enabled : false,
			disableCaching : true,
			disableCachingParam : "_dc",
			paths : {
				Ext : "."
			}
		},
		setConfig : function(h, i) {
			if (Ext.isObject(h) && arguments.length === 1) {
				Ext.Object.merge(this.config, h)
			} else {
				this.config[h] = (Ext.isObject(i)) ? Ext.Object.merge(
						this.config[h], i) : i
			}
			return this
		},
		getConfig : function(h) {
			if (h) {
				return this.config[h]
			}
			return this.config
		},
		setPath : a(function(h, i) {
			this.config.paths[h] = i;
			return this
		}),
		getPath : function(h) {
			var j = "", k = this.config.paths, i = this.getPrefix(h);
			if (i.length > 0) {
				if (i === h) {
					return k[i]
				}
				j = k[i];
				h = h.substring(i.length + 1)
			}
			if (j.length > 0) {
				j += "/"
			}
			return j.replace(/\/\.\//g, "/") + h.replace(/\./g, "/") + ".js"
		},
		getPrefix : function(i) {
			var k = this.config.paths, j, h = "";
			if (k.hasOwnProperty(i)) {
				return i
			}
			for (j in k) {
				if (k.hasOwnProperty(j)
						&& j + "." === i.substring(0, j.length + 1)) {
					if (j.length > h.length) {
						h = j
					}
				}
			}
			return h
		},
		refreshQueue : function() {
			var n = this.queue.length, k, m, h, l;
			if (n === 0) {
				this.triggerReady();
				return
			}
			for (k = 0; k < n; k++) {
				m = this.queue[k];
				if (m) {
					l = m.requires;
					if (l.length > this.numLoadedFiles) {
						continue
					}
					h = 0;
					do {
						if (c.isCreated(l[h])) {
							Ext.Array.erase(l, h, 1)
						} else {
							h++
						}
					} while (h < l.length);
					if (m.requires.length === 0) {
						Ext.Array.erase(this.queue, k, 1);
						m.callback.call(m.scope);
						this.refreshQueue();
						break
					}
				}
			}
			return this
		},
		injectScriptElement : function(j, l, n, k) {
			var i = document.createElement("script"), m = this, h = function() {
				m.cleanupScriptElement(i);
				l.call(k)
			}, o = function() {
				m.cleanupScriptElement(i);
				n.call(k)
			};
			i.type = "text/javascript";
			i.src = j;
			i.onload = h;
			i.onerror = o;
			i.onreadystatechange = function() {
				if (this.readyState === "loaded"
						|| this.readyState === "complete") {
					h()
				}
			};
			this.documentHead.appendChild(i);
			return i
		},
		cleanupScriptElement : function(h) {
			h.onload = null;
			h.onreadystatechange = null;
			h.onerror = null;
			return this
		},
		loadScriptFile : function(i, p, m, s, h) {
			var o = this, t = i
					+ (this.getConfig("disableCaching")
							? ("?" + this.getConfig("disableCachingParam")
									+ "=" + Ext.Date.now())
							: ""), l = i.split("/").pop(), j = false, r, k, q;
			s = s || this;
			this.isLoading = true;
			if (!h) {
				q = function() {
					m.call(s, "Failed loading '" + i
							+ "', please verify that the file exists", h)
				};
				if (!Ext.isReady && Ext.onDocumentReady) {
					Ext.onDocumentReady(function() {
						o.injectScriptElement(t, p, q, s)
					})
				} else {
					this.injectScriptElement(t, p, q, s)
				}
			} else {
				if (typeof XMLHttpRequest !== "undefined") {
					r = new XMLHttpRequest()
				} else {
					r = new ActiveXObject("Microsoft.XMLHTTP")
				}
				try {
					r.open("GET", t, false);
					r.send(null)
				} catch (n) {
					j = true
				}
				k = (r.status === 1223) ? 204 : r.status;
				if (!j) {
					j = (k === 0)
				}
				if (j) {
					m
							.call(
									this,
									"Failed loading synchronously via XHR: '"
											+ i
											+ "'; It's likely that the file is either being loaded from a different domain or from the local file system whereby cross origin requests are not allowed due to security reasons. Use asynchronous loading with Ext.require instead.",
									h)
				} else {
					if (k >= 200 && k < 300) {
						new Function(r.responseText + "\n//@ sourceURL=" + l)();
						p.call(s)
					} else {
						m
								.call(
										this,
										"Failed loading synchronously via XHR: '"
												+ i
												+ "'; please verify that the file exists. XHR status code: "
												+ k, h)
					}
				}
				r = null
			}
		},
		exclude : function(i) {
			var h = this;
			return {
				require : function(l, k, j) {
					return h.require(l, k, j, i)
				},
				syncRequire : function(l, k, j) {
					return h.syncRequire(l, k, j, i)
				}
			}
		},
		syncRequire : function() {
			this.syncModeEnabled = true;
			this.require.apply(this, arguments);
			this.refreshQueue();
			this.syncModeEnabled = false
		},
		require : function(r, x, z, y) {
			var n, v, k, w, t = {}, l = [], m = [], q, h = [], p, o, u, s;
			r = Ext.Array.from(r);
			y = Ext.Array.from(y);
			x = x || Ext.emptyFn;
			z = z || Ext.global;
			for (p = 0, u = y.length; p < u; p++) {
				k = y[p];
				if (typeof k === "string" && k.length > 0) {
					l = c.getNamesByExpression(k);
					for (o = 0, s = l.length; o < s; o++) {
						t[l[o]] = true
					}
				}
			}
			for (p = 0, u = r.length; p < u; p++) {
				v = r[p];
				if (typeof v === "string" && v.length > 0) {
					m = c.getNamesByExpression(v);
					for (o = 0, s = m.length; o < s; o++) {
						q = m[o];
						if (!t.hasOwnProperty(q) && !c.isCreated(q)) {
							Ext.Array.include(h, q)
						}
					}
				}
			}
			if (!this.config.enabled) {
				if (h.length > 0) {
					Ext.Error.raise({
						sourceClass : "Ext.Loader",
						sourceMethod : "require",
						msg : "Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. Missing required class"
								+ ((h.length > 1) ? "es" : "")
								+ ": "
								+ h.join(", ")
					})
				}
			}
			if (h.length === 0) {
				x.call(z);
				return this
			}
			this.queue.push({
				requires : h,
				callback : x,
				scope : z
			});
			h = h.slice();
			for (p = 0, u = h.length; p < u; p++) {
				w = h[p];
				if (!this.isFileLoaded.hasOwnProperty(w)) {
					this.isFileLoaded[w] = false;
					n = this.getPath(w);
					this.classNameToFilePathMap[w] = n;
					this.numPendingFiles++;
					this.loadScriptFile(n, Ext.Function.pass(this.onFileLoaded,
							[w, n], this), Ext.Function.pass(
							this.onFileLoadError, [w, n]), this,
							this.syncModeEnabled)
				}
			}
			return this
		},
		onFileLoaded : function(i, h) {
			this.numLoadedFiles++;
			this.isFileLoaded[i] = true;
			this.numPendingFiles--;
			if (this.numPendingFiles === 0) {
				this.refreshQueue()
			}
		},
		onFileLoadError : function(j, i, h, k) {
			this.numPendingFiles--;
			this.hasFileLoadError = true
		},
		addOptionalRequires : function(k) {
			var m = this.optionalRequires, j, l, h;
			k = Ext.Array.from(k);
			for (j = 0, l = k.length; j < l; j++) {
				h = k[j];
				Ext.Array.include(m, h)
			}
			return this
		},
		triggerReady : function(i) {
			var k = this.readyListeners, j, h;
			if (this.isLoading || i) {
				this.isLoading = false;
				if (this.optionalRequires.length) {
					j = Ext.Array.clone(this.optionalRequires);
					this.optionalRequires.length = 0;
					this.require(j, Ext.Function.pass(this.triggerReady,
							[true], this), this);
					return this
				}
				while (k.length) {
					h = k.shift();
					h.fn.call(h.scope);
					if (this.isLoading) {
						return this
					}
				}
			}
			return this
		},
		onReady : function(k, j, l, h) {
			var i;
			if (l !== false && Ext.onDocumentReady) {
				i = k;
				k = function() {
					Ext.onDocumentReady(i, j, h)
				}
			}
			if (!this.isLoading) {
				k.call(j)
			} else {
				this.readyListeners.push({
					fn : k,
					scope : j
				})
			}
		},
		historyPush : function(h) {
			if (h && this.isFileLoaded.hasOwnProperty(h)) {
				Ext.Array.include(this.history, h)
			}
			return this
		}
	};
	Ext.require = e(g, "require");
	Ext.syncRequire = e(g, "syncRequire");
	Ext.exclude = e(g, "exclude");
	Ext.onReady = function(j, i, h) {
		g.onReady(j, i, true, h)
	};
	b.registerPreprocessor("loader", function(v, l, u) {
		var s = this, q = [], r = c.getName(v), m, k, p, o, t, n, h;
		for (m = 0, p = d.length; m < p; m++) {
			n = d[m];
			if (l.hasOwnProperty(n)) {
				h = l[n];
				if (typeof h === "string") {
					q.push(h)
				} else {
					if (h instanceof Array) {
						for (k = 0, o = h.length; k < o; k++) {
							t = h[k];
							if (typeof t === "string") {
								q.push(t)
							}
						}
					} else {
						if (typeof h != "function") {
							for (k in h) {
								if (h.hasOwnProperty(k)) {
									t = h[k];
									if (typeof t === "string") {
										q.push(t)
									}
								}
							}
						}
					}
				}
			}
		}
		if (q.length === 0) {
			return
		}
		g.require(q, function() {
			for (m = 0, p = d.length; m < p; m++) {
				n = d[m];
				if (l.hasOwnProperty(n)) {
					h = l[n];
					if (typeof h === "string") {
						l[n] = c.get(h)
					} else {
						if (h instanceof Array) {
							for (k = 0, o = h.length; k < o; k++) {
								t = h[k];
								if (typeof t === "string") {
									l[n][k] = c.get(t)
								}
							}
						} else {
							if (typeof h != "function") {
								for (var i in h) {
									if (h.hasOwnProperty(i)) {
										t = h[i];
										if (typeof t === "string") {
											l[n][i] = c.get(t)
										}
									}
								}
							}
						}
					}
				}
			}
			u.call(s, v, l)
		});
		return false
	}, true);
	b.setDefaultPreprocessorPosition("loader", "after", "className");
	c.registerPostprocessor("uses", function(l, j, p) {
		var h = Ext.Array.from(p.uses), k = [], m, o, n;
		for (m = 0, o = h.length; m < o; m++) {
			n = h[m];
			if (typeof n === "string") {
				k.push(n)
			}
		}
		g.addOptionalRequires(k)
	});
	c.setDefaultPostprocessorPosition("uses", "last")
})(Ext.ClassManager, Ext.Class, Ext.Function.flexSetter, Ext.Function.alias);
Ext.Error = Ext.extend(Error, {
	statics : {
		ignore : false,
		raise : function(a) {
			a = a || {};
			if (Ext.isString(a)) {
				a = {
					msg : a
				}
			}
			var c = this.raise.caller;
			if (c) {
				if (c.$name) {
					a.sourceMethod = c.$name
				}
				if (c.$owner) {
					a.sourceClass = c.$owner.$className
				}
			}
			if (Ext.Error.handle(a) !== true) {
				var b = Ext.Error.prototype.toString.call(a);
				Ext.log({
					msg : b,
					level : "error",
					dump : a,
					stack : true
				});
				throw new Ext.Error(a)
			}
		},
		handle : function() {
			return Ext.Error.ignore
		}
	},
	name : "Ext.Error",
	constructor : function(a) {
		if (Ext.isString(a)) {
			a = {
				msg : a
			}
		}
		var b = this;
		Ext.apply(b, a);
		b.message = b.message || b.msg
	},
	toString : function() {
		var c = this, b = c.className ? c.className : "", a = c.methodName
				? "." + c.methodName + "(): "
				: "", d = c.msg || "(No description provided)";
		return b + a + d
	}
});
Ext.JSON = new (function() {
	var useHasOwn = !!{}.hasOwnProperty, isNative = function() {
		var useNative = null;
		return function() {
			if (useNative === null) {
				useNative = Ext.USE_NATIVE_JSON && window.JSON
						&& JSON.toString() == "[object JSON]"
			}
			return useNative
		}
	}(), pad = function(n) {
		return n < 10 ? "0" + n : n
	}, doDecode = function(json) {
		return eval("(" + json + ")")
	}, doEncode = function(o) {
		if (!Ext.isDefined(o) || o === null) {
			return "null"
		} else {
			if (Ext.isArray(o)) {
				return encodeArray(o)
			} else {
				if (Ext.isDate(o)) {
					return Ext.JSON.encodeDate(o)
				} else {
					if (Ext.isString(o)) {
						return encodeString(o)
					} else {
						if (typeof o == "number") {
							return isFinite(o) ? String(o) : "null"
						} else {
							if (Ext.isBoolean(o)) {
								return String(o)
							} else {
								if (Ext.isObject(o)) {
									return encodeObject(o)
								} else {
									if (typeof o === "function") {
										return "null"
									}
								}
							}
						}
					}
				}
			}
		}
		return "undefined"
	}, m = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\",
		"\x0b" : "\\u000b"
	}, charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g, encodeString = function(s) {
		return '"' + s.replace(charToReplace, function(a) {
			var c = m[a];
			return typeof c === "string" ? c : "\\u"
					+ ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"'
	}, encodeArray = function(o) {
		var a = ["[", ""], len = o.length, i;
		for (i = 0; i < len; i += 1) {
			a.push(doEncode(o[i]), ",")
		}
		a[a.length - 1] = "]";
		return a.join("")
	}, encodeObject = function(o) {
		var a = ["{", ""], i;
		for (i in o) {
			if (!useHasOwn || o.hasOwnProperty(i)) {
				a.push(doEncode(i), ":", doEncode(o[i]), ",")
			}
		}
		a[a.length - 1] = "}";
		return a.join("")
	};
	this.encodeDate = function(o) {
		return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-"
				+ pad(o.getDate()) + "T" + pad(o.getHours()) + ":"
				+ pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"'
	};
	this.encode = function() {
		var ec;
		return function(o) {
			if (!ec) {
				ec = isNative() ? JSON.stringify : doEncode
			}
			return ec(o)
		}
	}();
	this.decode = function() {
		var dc;
		return function(json, safe) {
			if (!dc) {
				dc = isNative() ? JSON.parse : doDecode
			}
			try {
				return dc(json)
			} catch (e) {
				if (safe === true) {
					return null
				}
				Ext.Error.raise({
					sourceClass : "Ext.JSON",
					sourceMethod : "decode",
					msg : "You're trying to decode an invalid JSON String: "
							+ json
				})
			}
		}
	}()
})();
Ext.encode = Ext.JSON.encode;
Ext.decode = Ext.JSON.decode;
Ext.apply(Ext, {
	userAgent : navigator.userAgent.toLowerCase(),
	cache : {},
	idSeed : 1000,
	windowId : "ext-window",
	documentId : "ext-document",
	isReady : false,
	enableGarbageCollector : true,
	enableListenerCollection : true,
	id : function(a, c) {
		var b = this, d = "";
		a = Ext.getDom(a, true) || {};
		if (a === document) {
			a.id = b.documentId
		} else {
			if (a === window) {
				a.id = b.windowId
			}
		}
		if (!a.id) {
			if (b.isSandboxed) {
				if (!b.uniqueGlobalNamespace) {
					b.getUniqueGlobalNamespace()
				}
				d = b.uniqueGlobalNamespace + "-"
			}
			a.id = d + (c || "ext-gen") + (++Ext.idSeed)
		}
		return a.id
	},
	getBody : function() {
		return Ext.get(document.body || false)
	},
	getHead : function() {
		var a;
		return function() {
			if (a == undefined) {
				a = Ext.get(document.getElementsByTagName("head")[0])
			}
			return a
		}
	}(),
	getDoc : function() {
		return Ext.get(document)
	},
	getCmp : function(a) {
		return Ext.ComponentManager.get(a)
	},
	getOrientation : function() {
		return window.innerHeight > window.innerWidth
				? "portrait"
				: "landscape"
	},
	destroy : function() {
		var c = arguments.length, b, a;
		for (b = 0; b < c; b++) {
			a = arguments[b];
			if (a) {
				if (Ext.isArray(a)) {
					this.destroy.apply(this, a)
				} else {
					if (Ext.isFunction(a.destroy)) {
						a.destroy()
					} else {
						if (a.dom) {
							a.remove()
						}
					}
				}
			}
		}
	},
	callback : function(d, c, b, a) {
		if (Ext.isFunction(d)) {
			b = b || [];
			c = c || window;
			if (a) {
				Ext.defer(d, a, c, b)
			} else {
				d.apply(c, b)
			}
		}
	},
	htmlEncode : function(a) {
		return Ext.String.htmlEncode(a)
	},
	htmlDecode : function(a) {
		return Ext.String.htmlDecode(a)
	},
	urlAppend : function(a, b) {
		if (!Ext.isEmpty(b)) {
			return a + (a.indexOf("?") === -1 ? "?" : "&") + b
		}
		return a
	}
});
Ext.ns = Ext.namespace;
window.undefined = window.undefined;
(function() {
	var m = function(e) {
		return e.test(Ext.userAgent)
	}, q = document.compatMode == "CSS1Compat", C = function(O, N) {
		var e;
		return (O && (e = N.exec(Ext.userAgent))) ? parseFloat(e[1]) : 0
	}, n = document.documentMode, a = m(/opera/), s = a && m(/version\/10\.5/), H = m(/\bchrome\b/), w = m(/webkit/), c = !H
			&& m(/safari/), F = c && m(/applewebkit\/4/), D = c
			&& m(/version\/3/), A = c && m(/version\/4/), z = c
			&& m(/version\/5/), i = !a && m(/msie/), G = i
			&& (m(/msie 7/) || n == 7), E = i
			&& (m(/msie 8/) && n != 7 && n != 9 || n == 8), B = i
			&& (m(/msie 9/) && n != 7 && n != 8 || n == 9), J = i
			&& m(/msie 6/), b = !w && m(/gecko/), M = b && m(/rv:1\.9/), L = b
			&& m(/rv:2\.0/), K = b && m(/rv:5\./), v = M && m(/rv:1\.9\.0/), t = M
			&& m(/rv:1\.9\.1/), r = M && m(/rv:1\.9\.2/), g = m(/windows|win32/), y = m(/macintosh|mac os x/), u = m(/linux/), j = null, k = C(
			true, /\bchrome\/(\d+\.\d+)/), h = C(true, /\bfirefox\/(\d+\.\d+)/), l = C(
			i, /msie (\d+\.\d+)/), p = C(a, /version\/(\d+\.\d+)/), d = C(c,
			/version\/(\d+\.\d+)/), x = C(w, /webkit\/(\d+\.\d+)/), o = /^https/i
			.test(window.location.protocol);
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch (I) {
	}
	Ext.setVersion("extjs", "4.0.7");
	Ext.apply(Ext, {
		SSL_SECURE_URL : o && i ? 'javascript:""' : "about:blank",
		scopeResetCSS : Ext.buildSettings.scopeResetCSS,
		enableNestedListenerRemoval : false,
		USE_NATIVE_JSON : false,
		getDom : function(O, N) {
			if (!O || !document) {
				return null
			}
			if (O.dom) {
				return O.dom
			} else {
				if (typeof O == "string") {
					var P = document.getElementById(O);
					if (P && i && N) {
						if (O == P.getAttribute("id")) {
							return P
						} else {
							return null
						}
					}
					return P
				} else {
					return O
				}
			}
		},
		removeNode : J || G ? function() {
			var e;
			return function(N) {
				if (N && N.tagName != "BODY") {
					(Ext.enableNestedListenerRemoval) ? Ext.EventManager
							.purgeElement(N) : Ext.EventManager.removeAll(N);
					e = e || document.createElement("div");
					e.appendChild(N);
					e.innerHTML = "";
					delete Ext.cache[N.id]
				}
			}
		}() : function(e) {
			if (e && e.parentNode && e.tagName != "BODY") {
				(Ext.enableNestedListenerRemoval) ? Ext.EventManager
						.purgeElement(e) : Ext.EventManager.removeAll(e);
				e.parentNode.removeChild(e);
				delete Ext.cache[e.id]
			}
		},
		isStrict : q,
		isIEQuirks : i && !q,
		isOpera : a,
		isOpera10_5 : s,
		isWebKit : w,
		isChrome : H,
		isSafari : c,
		isSafari3 : D,
		isSafari4 : A,
		isSafari5 : z,
		isSafari2 : F,
		isIE : i,
		isIE6 : J,
		isIE7 : G,
		isIE8 : E,
		isIE9 : B,
		isGecko : b,
		isGecko3 : M,
		isGecko4 : L,
		isGecko5 : K,
		isFF3_0 : v,
		isFF3_5 : t,
		isFF3_6 : r,
		isFF4 : 4 <= h && h < 5,
		isFF5 : 5 <= h && h < 6,
		isLinux : u,
		isWindows : g,
		isMac : y,
		chromeVersion : k,
		firefoxVersion : h,
		ieVersion : l,
		operaVersion : p,
		safariVersion : d,
		webKitVersion : x,
		isSecure : o,
		BLANK_IMAGE_URL : (J || G)
				? "//www.sencha.com/s.gif"
				: "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
		value : function(O, e, N) {
			return Ext.isEmpty(O, N) ? e : O
		},
		escapeRe : function(e) {
			return e.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
		},
		addBehaviors : function(Q) {
			if (!Ext.isReady) {
				Ext.onReady(function() {
					Ext.addBehaviors(Q)
				})
			} else {
				var N = {}, P, e, O;
				for (e in Q) {
					if ((P = e.split("@"))[1]) {
						O = P[0];
						if (!N[O]) {
							N[O] = Ext.select(O)
						}
						N[O].on(P[1], Q[e])
					}
				}
				N = null
			}
		},
		getScrollbarSize : function(Q) {
			if (!Ext.isReady) {
				return 0
			}
			if (Q === true || j === null) {
				var O = Ext.isIE9 ? "" : Ext.baseCSSPrefix + "hide-offsets", S = Ext
						.getBody()
						.createChild('<div class="'
								+ O
								+ '" style="width:100px;height:50px;overflow:hidden;"><div style="height:200px;"></div></div>'), R = S
						.child("div", true), N = R.offsetWidth;
				S.setStyle("overflow", (Ext.isWebKit || Ext.isGecko)
						? "auto"
						: "scroll");
				var e = R.offsetWidth, P = N - e;
				S.remove();
				j = {
					width : P,
					height : P
				}
			}
			return j
		},
		getScrollBarWidth : function(N) {
			var e = Ext.getScrollbarSize(N);
			return e.width + 2
		},
		copyTo : function(e, N, P, O) {
			if (typeof P == "string") {
				P = P.split(/[,;\s]/)
			}
			Ext.each(P, function(Q) {
				if (O || N.hasOwnProperty(Q)) {
					e[Q] = N[Q]
				}
			}, this);
			return e
		},
		destroyMembers : function(P) {
			for (var O = 1, N = arguments, e = N.length; O < e; O++) {
				Ext.destroy(P[N[O]]);
				delete P[N[O]]
			}
		},
		log : Ext.emptyFn,
		partition : function(e, N) {
			var O = [[], []];
			Ext.each(e, function(Q, R, P) {
				O[(N && N(Q, R, P)) || (!N && Q) ? 0 : 1].push(Q)
			});
			return O
		},
		invoke : function(e, N) {
			var P = [], O = Array.prototype.slice.call(arguments, 2);
			Ext.each(e, function(Q, R) {
				if (Q && typeof Q[N] == "function") {
					P.push(Q[N].apply(Q, O))
				} else {
					P.push(undefined)
				}
			});
			return P
		},
		zip : function() {
			var T = Ext.partition(arguments, function(U) {
				return typeof U != "function"
			}), Q = T[0], S = T[1][0], e = Ext.max(Ext.pluck(Q, "length")), P = [];
			for (var R = 0; R < e; R++) {
				P[R] = [];
				if (S) {
					P[R] = S.apply(S, Ext.pluck(Q, R))
				} else {
					for (var O = 0, N = Q.length; O < N; O++) {
						P[R].push(Q[O][R])
					}
				}
			}
			return P
		},
		toSentence : function(N, e) {
			var Q = N.length;
			if (Q <= 1) {
				return N[0]
			} else {
				var P = N.slice(0, Q - 1), O = N[Q - 1];
				return Ext.util.Format.format("{0} {1} {2}", P.join(", "), e
						|| "and", O)
			}
		},
		useShims : J
	})
})();
Ext.application = function(a) {
	Ext.require("Ext.app.Application");
	Ext.onReady(function() {
		Ext.create("Ext.app.Application", a)
	})
};
(function() {
	Ext.ns("Ext.util");
	Ext.util.Format = {};
	var g = Ext.util.Format, e = /<\/?[^>]+>/gi, c = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, b = /\r?\n/g, d = /[^\d\.]/g, a;
	Ext.apply(g, {
		thousandSeparator : ",",
		decimalSeparator : ".",
		currencyPrecision : 2,
		currencySign : "$",
		currencyAtEnd : false,
		undef : function(h) {
			return h !== undefined ? h : ""
		},
		defaultValue : function(i, h) {
			return i !== undefined && i !== "" ? i : h
		},
		substr : function(i, j, h) {
			return String(i).substr(j, h)
		},
		lowercase : function(h) {
			return String(h).toLowerCase()
		},
		uppercase : function(h) {
			return String(h).toUpperCase()
		},
		usMoney : function(h) {
			return g.currency(h, "$", 2)
		},
		currency : function(k, m, j, h) {
			var o = "", n = ",0", l = 0;
			k = k - 0;
			if (k < 0) {
				k = -k;
				o = "-"
			}
			j = j || g.currencyPrecision;
			n += n + (j > 0 ? "." : "");
			for (; l < j; l++) {
				n += "0"
			}
			k = g.number(k, n);
			if ((h || g.currencyAtEnd) === true) {
				return Ext.String
						.format("{0}{1}{2}", o, k, m || g.currencySign)
			} else {
				return Ext.String
						.format("{0}{1}{2}", o, m || g.currencySign, k)
			}
		},
		date : function(h, i) {
			if (!h) {
				return ""
			}
			if (!Ext.isDate(h)) {
				h = new Date(Date.parse(h))
			}
			return Ext.Date.dateFormat(h, i || Ext.Date.defaultFormat)
		},
		dateRenderer : function(h) {
			return function(i) {
				return g.date(i, h)
			}
		},
		stripTags : function(h) {
			return !h ? h : String(h).replace(e, "")
		},
		stripScripts : function(h) {
			return !h ? h : String(h).replace(c, "")
		},
		fileSize : function(h) {
			if (h < 1024) {
				return h + " bytes"
			} else {
				if (h < 1048576) {
					return (Math.round(((h * 10) / 1024)) / 10) + " KB"
				} else {
					return (Math.round(((h * 10) / 1048576)) / 10) + " MB"
				}
			}
		},
		math : function() {
			var h = {};
			return function(j, i) {
				if (!h[i]) {
					h[i] = Ext.functionFactory("v", "return v " + i + ";")
				}
				return h[i](j)
			}
		}(),
		round : function(j, i) {
			var h = Number(j);
			if (typeof i == "number") {
				i = Math.pow(10, i);
				h = Math.round(j * i) / i
			}
			return h
		},
		number : function(y, s) {
			if (!s) {
				return y
			}
			y = Ext.Number.from(y, NaN);
			if (isNaN(y)) {
				return ""
			}
			var A = g.thousandSeparator, q = g.decimalSeparator, z = false, r = y < 0, k, h;
			y = Math.abs(y);
			if (s.substr(s.length - 2) == "/i") {
				if (!a) {
					a = new RegExp("[^\\d\\" + g.decimalSeparator + "]", "g")
				}
				s = s.substr(0, s.length - 2);
				z = true;
				k = s.indexOf(A) != -1;
				h = s.replace(a, "").split(q)
			} else {
				k = s.indexOf(",") != -1;
				h = s.replace(d, "").split(".")
			}
			if (1 < h.length) {
				y = y.toFixed(h[1].length)
			} else {
				if (2 < h.length) {
				} else {
					y = y.toFixed(0)
				}
			}
			var x = y.toString();
			h = x.split(".");
			if (k) {
				var w = h[0], p = [], t = w.length, o = Math.floor(t / 3), l = w.length
						% 3 || 3, u;
				for (u = 0; u < t; u += l) {
					if (u !== 0) {
						l = 3
					}
					p[p.length] = w.substr(u, l);
					o -= 1
				}
				x = p.join(A);
				if (h[1]) {
					x += q + h[1]
				}
			} else {
				if (h[1]) {
					x = h[0] + q + h[1]
				}
			}
			if (r) {
				r = x.replace(/[^1-9]/g, "") !== ""
			}
			return (r ? "-" : "") + s.replace(/[\d,?\.?]+/, x)
		},
		numberRenderer : function(h) {
			return function(i) {
				return g.number(i, h)
			}
		},
		plural : function(h, i, j) {
			return h + " " + (h == 1 ? i : (j ? j : i + "s"))
		},
		nl2br : function(h) {
			return Ext.isEmpty(h) ? "" : h.replace(b, "<br/>")
		},
		capitalize : Ext.String.capitalize,
		ellipsis : Ext.String.ellipsis,
		format : Ext.String.format,
		htmlDecode : Ext.String.htmlDecode,
		htmlEncode : Ext.String.htmlEncode,
		leftPad : Ext.String.leftPad,
		trim : Ext.String.trim,
		parseBox : function(i) {
			if (Ext.isNumber(i)) {
				i = i.toString()
			}
			var j = i.split(" "), h = j.length;
			if (h == 1) {
				j[1] = j[2] = j[3] = j[0]
			} else {
				if (h == 2) {
					j[2] = j[0];
					j[3] = j[1]
				} else {
					if (h == 3) {
						j[3] = j[1]
					}
				}
			}
			return {
				top : parseInt(j[0], 10) || 0,
				right : parseInt(j[1], 10) || 0,
				bottom : parseInt(j[2], 10) || 0,
				left : parseInt(j[3], 10) || 0
			}
		},
		escapeRegex : function(h) {
			return h.replace(/([\-.*+?\^${}()|\[\]\/\\])/g, "\\$1")
		}
	})
})();
Ext.ns("Ext.util");
Ext.util.TaskRunner = function(e) {
	e = e || 10;
	var g = [], a = [], b = 0, h = false, d = function() {
		h = false;
		clearInterval(b);
		b = 0
	}, i = function() {
		if (!h) {
			h = true;
			b = setInterval(j, e)
		}
	}, c = function(k) {
		a.push(k);
		if (k.onStop) {
			k.onStop.apply(k.scope || k)
		}
	}, j = function() {
		var m = a.length, o = new Date().getTime(), q;
		if (m > 0) {
			for (q = 0; q < m; q++) {
				Ext.Array.remove(g, a[q])
			}
			a = [];
			if (g.length < 1) {
				d();
				return
			}
		}
		q = 0;
		var p, l, n, k = g.length;
		for (; q < k; ++q) {
			p = g[q];
			l = o - p.taskRunTime;
			if (p.interval <= l) {
				n = p.run.apply(p.scope || p, p.args || [++p.taskRunCount]);
				p.taskRunTime = o;
				if (n === false || p.taskRunCount === p.repeat) {
					c(p);
					return
				}
			}
			if (p.duration && p.duration <= (o - p.taskStartTime)) {
				c(p)
			}
		}
	};
	this.start = function(k) {
		g.push(k);
		k.taskStartTime = new Date().getTime();
		k.taskRunTime = 0;
		k.taskRunCount = 0;
		i();
		return k
	};
	this.stop = function(k) {
		c(k);
		return k
	};
	this.stopAll = function() {
		d();
		for (var l = 0, k = g.length; l < k; l++) {
			if (g[l].onStop) {
				g[l].onStop()
			}
		}
		g = [];
		a = []
	}
};
Ext.TaskManager = Ext.create("Ext.util.TaskRunner");
Ext.is = {
	init : function(b) {
		var c = this.platforms, e = c.length, d, a;
		b = b || window.navigator;
		for (d = 0; d < e; d++) {
			a = c[d];
			this[a.identity] = a.regex.test(b[a.property])
		}
		this.Desktop = this.Mac || this.Windows
				|| (this.Linux && !this.Android);
		this.Tablet = this.iPad;
		this.Phone = !this.Desktop && !this.Tablet;
		this.iOS = this.iPhone || this.iPad || this.iPod;
		this.Standalone = !!window.navigator.standalone
	},
	platforms : [{
		property : "platform",
		regex : /iPhone/i,
		identity : "iPhone"
	}, {
		property : "platform",
		regex : /iPod/i,
		identity : "iPod"
	}, {
		property : "userAgent",
		regex : /iPad/i,
		identity : "iPad"
	}, {
		property : "userAgent",
		regex : /Blackberry/i,
		identity : "Blackberry"
	}, {
		property : "userAgent",
		regex : /Android/i,
		identity : "Android"
	}, {
		property : "platform",
		regex : /Mac/i,
		identity : "Mac"
	}, {
		property : "platform",
		regex : /Win/i,
		identity : "Windows"
	}, {
		property : "platform",
		regex : /Linux/i,
		identity : "Linux"
	}]
};
Ext.is.init();
Ext.supports = {
	init : function() {
		var d = document, g = d.createElement("div"), b = this.tests, c = b.length, a, e;
		g.innerHTML = [
				'<div style="height:30px;width:50px;">',
				'<div style="height:20px;width:20px;"></div>',
				"</div>",
				'<div style="width: 200px; height: 200px; position: relative; padding: 5px;">',
				'<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>',
				"</div>",
				'<div style="float:left; background-color:transparent;"></div>']
				.join("");
		d.body.appendChild(g);
		for (a = 0; a < c; a++) {
			e = b[a];
			this[e.identity] = e.fn.call(this, d, g)
		}
		d.body.removeChild(g)
	},
	CSS3BoxShadow : Ext.isDefined(document.documentElement.style.boxShadow),
	ClassList : !!document.documentElement.classList,
	OrientationChange : ((typeof window.orientation != "undefined") && ("onorientationchange" in window)),
	DeviceMotion : ("ondevicemotion" in window),
	Touch : ("ontouchstart" in window) && (!Ext.is.Desktop),
	tests : [{
		identity : "Transitions",
		fn : function(g, j) {
			var e = ["webkit", "Moz", "o", "ms", "khtml"], h = "TransitionEnd", a = [
					e[0] + h, "transitionend", e[2] + h, e[3] + h, e[4] + h], d = e.length, c = 0, b = false;
			j = Ext.get(j);
			for (; c < d; c++) {
				if (j.getStyle(e[c] + "TransitionProperty")) {
					Ext.supports.CSS3Prefix = e[c];
					Ext.supports.CSS3TransitionEnd = a[c];
					b = true;
					break
				}
			}
			return b
		}
	}, {
		identity : "RightMargin",
		fn : function(b, c) {
			var a = b.defaultView;
			return !(a && a.getComputedStyle(c.firstChild.firstChild, null).marginRight != "0px")
		}
	}, {
		identity : "DisplayChangeInputSelectionBug",
		fn : function() {
			var a = Ext.webKitVersion;
			return 0 < a && a < 533
		}
	}, {
		identity : "DisplayChangeTextAreaSelectionBug",
		fn : function() {
			var a = Ext.webKitVersion;
			return 0 < a && a < 534.24
		}
	}, {
		identity : "TransparentColor",
		fn : function(b, c, a) {
			a = b.defaultView;
			return !(a && a.getComputedStyle(c.lastChild, null).backgroundColor != "transparent")
		}
	}, {
		identity : "ComputedStyle",
		fn : function(b, c, a) {
			a = b.defaultView;
			return a && a.getComputedStyle
		}
	}, {
		identity : "Svg",
		fn : function(a) {
			return !!a.createElementNS
					&& !!a.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
		}
	}, {
		identity : "Canvas",
		fn : function(a) {
			return !!a.createElement("canvas").getContext
		}
	}, {
		identity : "Vml",
		fn : function(a) {
			var b = a.createElement("div");
			b.innerHTML = "<!--[if vml]><br><br><![endif]-->";
			return (b.childNodes.length == 2)
		}
	}, {
		identity : "Float",
		fn : function(a, b) {
			return !!b.lastChild.style.cssFloat
		}
	}, {
		identity : "AudioTag",
		fn : function(a) {
			return !!a.createElement("audio").canPlayType
		}
	}, {
		identity : "History",
		fn : function() {
			return !!(window.history && history.pushState)
		}
	}, {
		identity : "CSS3DTransform",
		fn : function() {
			return (typeof WebKitCSSMatrix != "undefined" && new WebKitCSSMatrix()
					.hasOwnProperty("m41"))
		}
	}, {
		identity : "CSS3LinearGradient",
		fn : function(e, h) {
			var d = "background-image:", b = "-webkit-gradient(linear, left top, right bottom, from(black), to(white))", g = "linear-gradient(left top, black, white)", c = "-moz-"
					+ g, a = [d + b, d + g, d + c];
			h.style.cssText = a.join(";");
			return ("" + h.style.backgroundImage).indexOf("gradient") !== -1
		}
	}, {
		identity : "CSS3BorderRadius",
		fn : function(d, e) {
			var b = ["borderRadius", "BorderRadius", "MozBorderRadius",
					"WebkitBorderRadius", "OBorderRadius", "KhtmlBorderRadius"], c = false, a;
			for (a = 0; a < b.length; a++) {
				if (document.body.style[b[a]] !== undefined) {
					return true
				}
			}
			return c
		}
	}, {
		identity : "GeoLocation",
		fn : function() {
			return (typeof navigator != "undefined" && typeof navigator.geolocation != "undefined")
					|| (typeof google != "undefined" && typeof google.gears != "undefined")
		}
	}, {
		identity : "MouseEnterLeave",
		fn : function(a, b) {
			return ("onmouseenter" in b && "onmouseleave" in b)
		}
	}, {
		identity : "MouseWheel",
		fn : function(a, b) {
			return ("onmousewheel" in b)
		}
	}, {
		identity : "Opacity",
		fn : function(a, b) {
			if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
				return false
			}
			b.firstChild.style.cssText = "opacity:0.73";
			return b.firstChild.style.opacity == "0.73"
		}
	}, {
		identity : "Placeholder",
		fn : function(a) {
			return "placeholder" in a.createElement("input")
		}
	}, {
		identity : "Direct2DBug",
		fn : function() {
			return Ext.isString(document.body.style.msTransformOrigin)
		}
	}, {
		identity : "BoundingClientRect",
		fn : function(a, b) {
			return Ext.isFunction(b.getBoundingClientRect)
		}
	}, {
		identity : "IncludePaddingInWidthCalculation",
		fn : function(b, c) {
			var a = Ext.get(c.childNodes[1].firstChild);
			return a.getWidth() == 210
		}
	}, {
		identity : "IncludePaddingInHeightCalculation",
		fn : function(b, c) {
			var a = Ext.get(c.childNodes[1].firstChild);
			return a.getHeight() == 210
		}
	}, {
		identity : "ArraySort",
		fn : function() {
			var b = [1, 2, 3, 4, 5].sort(function() {
				return 0
			});
			return b[0] === 1 && b[1] === 2 && b[2] === 3 && b[3] === 4
					&& b[4] === 5
		}
	}, {
		identity : "Range",
		fn : function() {
			return !!document.createRange
		}
	}, {
		identity : "CreateContextualFragment",
		fn : function() {
			var a = Ext.supports.Range ? document.createRange() : false;
			return a && !!a.createContextualFragment
		}
	}, {
		identity : "WindowOnError",
		fn : function() {
			return Ext.isIE || Ext.isGecko || Ext.webKitVersion >= 534.16
		}
	}]
};
Ext.ns("Ext.core");
Ext.core.DomHelper = Ext.DomHelper = function() {
	var x = null, k = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i, m = /^table|tbody|tr|td$/i, d = /tag|children|cn|html$/i, t = /td|tr|tbody/i, v = /end/i, r, o = "afterbegin", p = "afterend", c = "beforebegin", q = "beforeend", a = "<table>", i = "</table>", b = a
			+ "<tbody>", j = "</tbody>" + i, l = b + "<tr>", w = "</tr>" + j;
	function h(B, D, C, E, A, y) {
		B = Ext.getDom(B);
		var z;
		if (r.useDom) {
			z = n(D, null);
			if (y) {
				B.appendChild(z)
			} else {
				(A == "firstChild" ? B : B.parentNode).insertBefore(z, B[A]
						|| B)
			}
		} else {
			z = Ext.DomHelper.insertHtml(E, B, Ext.DomHelper.createHtml(D))
		}
		return C ? Ext.get(z, true) : z
	}
	function n(y, E) {
		var z, H = document, C, F, A, G;
		if (Ext.isArray(y)) {
			z = H.createDocumentFragment();
			for (var D = 0, B = y.length; D < B; D++) {
				n(y[D], z)
			}
		} else {
			if (typeof y == "string") {
				z = H.createTextNode(y)
			} else {
				z = H.createElement(y.tag || "div");
				C = !!z.setAttribute;
				for (F in y) {
					if (!d.test(F)) {
						A = y[F];
						if (F == "cls") {
							z.className = A
						} else {
							if (C) {
								z.setAttribute(F, A)
							} else {
								z[F] = A
							}
						}
					}
				}
				Ext.DomHelper.applyStyles(z, y.style);
				if ((G = y.children || y.cn)) {
					n(G, z)
				} else {
					if (y.html) {
						z.innerHTML = y.html
					}
				}
			}
		}
		if (E) {
			E.appendChild(z)
		}
		return z
	}
	function u(D) {
		var z = "", y, C, B, E, A;
		if (typeof D == "string") {
			z = D
		} else {
			if (Ext.isArray(D)) {
				for (A = 0; A < D.length; A++) {
					if (D[A]) {
						z += u(D[A])
					}
				}
			} else {
				z += "<" + (D.tag = D.tag || "div");
				for (y in D) {
					C = D[y];
					if (!d.test(y)) {
						if (typeof C == "object") {
							z += " " + y + '="';
							for (B in C) {
								z += B + ":" + C[B] + ";"
							}
							z += '"'
						} else {
							z += " " + ({
								cls : "class",
								htmlFor : "for"
							}[y] || y) + '="' + C + '"'
						}
					}
				}
				if (k.test(D.tag)) {
					z += "/>"
				} else {
					z += ">";
					if ((E = D.children || D.cn)) {
						z += u(E)
					} else {
						if (D.html) {
							z += D.html
						}
					}
					z += "</" + D.tag + ">"
				}
			}
		}
		return z
	}
	function g(F, C, B, D) {
		x.innerHTML = [C, B, D].join("");
		var y = -1, A = x, z;
		while (++y < F) {
			A = A.firstChild
		}
		z = A.nextSibling;
		if (z) {
			var E = document.createDocumentFragment();
			while (A) {
				z = A.nextSibling;
				E.appendChild(A);
				A = z
			}
			A = E
		}
		return A
	}
	function e(y, z, B, A) {
		var C, D;
		x = x || document.createElement("div");
		if (y == "td" && (z == o || z == q) || !t.test(y) && (z == c || z == p)) {
			return null
		}
		D = z == c ? B : z == p ? B.nextSibling : z == o ? B.firstChild : null;
		if (z == c || z == p) {
			B = B.parentNode
		}
		if (y == "td" || (y == "tr" && (z == q || z == o))) {
			C = g(4, l, A, w)
		} else {
			if ((y == "tbody" && (z == q || z == o))
					|| (y == "tr" && (z == c || z == p))) {
				C = g(3, b, A, j)
			} else {
				C = g(2, a, A, i)
			}
		}
		B.insertBefore(C, D);
		return C
	}
	function s(A) {
		var D = document.createElement("div"), y = document
				.createDocumentFragment(), z = 0, B, C;
		D.innerHTML = A;
		C = D.childNodes;
		B = C.length;
		for (; z < B; z++) {
			y.appendChild(C[z].cloneNode(true))
		}
		return y
	}
	r = {
		markup : function(y) {
			return u(y)
		},
		applyStyles : function(y, z) {
			if (z) {
				y = Ext.fly(y);
				if (typeof z == "function") {
					z = z.call()
				}
				if (typeof z == "string") {
					z = Ext.Element.parseStyles(z)
				}
				if (typeof z == "object") {
					y.setStyle(z)
				}
			}
		},
		insertHtml : function(D, y, E) {
			var B = {}, A, F, C, G, H, z;
			D = D.toLowerCase();
			B[c] = ["BeforeBegin", "previousSibling"];
			B[p] = ["AfterEnd", "nextSibling"];
			if (y.insertAdjacentHTML) {
				if (m.test(y.tagName)
						&& (z = e(y.tagName.toLowerCase(), D, y, E))) {
					return z
				}
				B[o] = ["AfterBegin", "firstChild"];
				B[q] = ["BeforeEnd", "lastChild"];
				if ((A = B[D])) {
					y.insertAdjacentHTML(A[0], E);
					return y[A[1]]
				}
			} else {
				if (Ext.isTextNode(y)) {
					D = D === "afterbegin" ? "beforebegin" : D;
					D = D === "beforeend" ? "afterend" : D
				}
				F = Ext.supports.CreateContextualFragment ? y.ownerDocument
						.createRange() : undefined;
				G = "setStart" + (v.test(D) ? "After" : "Before");
				if (B[D]) {
					if (F) {
						F[G](y);
						H = F.createContextualFragment(E)
					} else {
						H = s(E)
					}
					y.parentNode.insertBefore(H, D == c ? y : y.nextSibling);
					return y[(D == c ? "previous" : "next") + "Sibling"]
				} else {
					C = (D == o ? "first" : "last") + "Child";
					if (y.firstChild) {
						if (F) {
							F[G](y[C]);
							H = F.createContextualFragment(E)
						} else {
							H = s(E)
						}
						if (D == o) {
							y.insertBefore(H, y.firstChild)
						} else {
							y.appendChild(H)
						}
					} else {
						y.innerHTML = E
					}
					return y[C]
				}
			}
		},
		insertBefore : function(y, A, z) {
			return h(y, A, z, c)
		},
		insertAfter : function(y, A, z) {
			return h(y, A, z, p, "nextSibling")
		},
		insertFirst : function(y, A, z) {
			return h(y, A, z, o, "firstChild")
		},
		append : function(y, A, z) {
			return h(y, A, z, q, "", true)
		},
		overwrite : function(y, A, z) {
			y = Ext.getDom(y);
			y.innerHTML = u(A);
			return z ? Ext.get(y.firstChild) : y.firstChild
		},
		createHtml : u,
		createDom : n,
		useDom : false,
		createTemplate : function(z) {
			var y = Ext.DomHelper.createHtml(z);
			return Ext.create("Ext.Template", y)
		}
	};
	return r
}();
Ext.ns("Ext.core");
Ext.core.DomQuery = Ext.DomQuery = function() {
	var cache = {}, simpleCache = {}, valueCache = {}, nonSpace = /\S/, trimRe = /^\s+|\s+$/g, tplRe = /\{(\d+)\}/g, modeRe = /^(\s?[\/>+~]\s?|\s|$)/, tagTokenRe = /^(#)?([\w-\*]+)/, nthRe = /(\d*)n\+?(\d*)/, nthRe2 = /\D/, startIdRe = /^\s*\#/, isIE = window.ActiveXObject
			? true
			: false, key = 30803;
	eval("var batch = 30803;");
	function child(parent, index) {
		var i = 0, n = parent.firstChild;
		while (n) {
			if (n.nodeType == 1) {
				if (++i == index) {
					return n
				}
			}
			n = n.nextSibling
		}
		return null
	}
	function next(n) {
		while ((n = n.nextSibling) && n.nodeType != 1) {
		}
		return n
	}
	function prev(n) {
		while ((n = n.previousSibling) && n.nodeType != 1) {
		}
		return n
	}
	function children(parent) {
		var n = parent.firstChild, nodeIndex = -1, nextNode;
		while (n) {
			nextNode = n.nextSibling;
			if (n.nodeType == 3 && !nonSpace.test(n.nodeValue)) {
				parent.removeChild(n)
			} else {
				n.nodeIndex = ++nodeIndex
			}
			n = nextNode
		}
		return this
	}
	function byClassName(nodeSet, cls) {
		if (!cls) {
			return nodeSet
		}
		var result = [], ri = -1;
		for (var i = 0, ci; ci = nodeSet[i]; i++) {
			if ((" " + ci.className + " ").indexOf(cls) != -1) {
				result[++ri] = ci
			}
		}
		return result
	}
	function attrValue(n, attr) {
		if (!n.tagName && typeof n.length != "undefined") {
			n = n[0]
		}
		if (!n) {
			return null
		}
		if (attr == "for") {
			return n.htmlFor
		}
		if (attr == "class" || attr == "className") {
			return n.className
		}
		return n.getAttribute(attr) || n[attr]
	}
	function getNodes(ns, mode, tagName) {
		var result = [], ri = -1, cs;
		if (!ns) {
			return result
		}
		tagName = tagName || "*";
		if (typeof ns.getElementsByTagName != "undefined") {
			ns = [ns]
		}
		if (!mode) {
			for (var i = 0, ni; ni = ns[i]; i++) {
				cs = ni.getElementsByTagName(tagName);
				for (var j = 0, ci; ci = cs[j]; j++) {
					result[++ri] = ci
				}
			}
		} else {
			if (mode == "/" || mode == ">") {
				var utag = tagName.toUpperCase();
				for (var i = 0, ni, cn; ni = ns[i]; i++) {
					cn = ni.childNodes;
					for (var j = 0, cj; cj = cn[j]; j++) {
						if (cj.nodeName == utag || cj.nodeName == tagName
								|| tagName == "*") {
							result[++ri] = cj
						}
					}
				}
			} else {
				if (mode == "+") {
					var utag = tagName.toUpperCase();
					for (var i = 0, n; n = ns[i]; i++) {
						while ((n = n.nextSibling) && n.nodeType != 1) {
						}
						if (n
								&& (n.nodeName == utag || n.nodeName == tagName || tagName == "*")) {
							result[++ri] = n
						}
					}
				} else {
					if (mode == "~") {
						var utag = tagName.toUpperCase();
						for (var i = 0, n; n = ns[i]; i++) {
							while ((n = n.nextSibling)) {
								if (n.nodeName == utag || n.nodeName == tagName
										|| tagName == "*") {
									result[++ri] = n
								}
							}
						}
					}
				}
			}
		}
		return result
	}
	function concat(a, b) {
		if (b.slice) {
			return a.concat(b)
		}
		for (var i = 0, l = b.length; i < l; i++) {
			a[a.length] = b[i]
		}
		return a
	}
	function byTag(cs, tagName) {
		if (cs.tagName || cs == document) {
			cs = [cs]
		}
		if (!tagName) {
			return cs
		}
		var result = [], ri = -1;
		tagName = tagName.toLowerCase();
		for (var i = 0, ci; ci = cs[i]; i++) {
			if (ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName) {
				result[++ri] = ci
			}
		}
		return result
	}
	function byId(cs, id) {
		if (cs.tagName || cs == document) {
			cs = [cs]
		}
		if (!id) {
			return cs
		}
		var result = [], ri = -1;
		for (var i = 0, ci; ci = cs[i]; i++) {
			if (ci && ci.id == id) {
				result[++ri] = ci;
				return result
			}
		}
		return result
	}
	function byAttribute(cs, attr, value, op, custom) {
		var result = [], ri = -1, useGetStyle = custom == "{", fn = Ext.DomQuery.operators[op], a, xml, hasXml;
		for (var i = 0, ci; ci = cs[i]; i++) {
			if (ci.nodeType != 1) {
				continue
			}
			if (!hasXml) {
				xml = Ext.DomQuery.isXml(ci);
				hasXml = true
			}
			if (!xml) {
				if (useGetStyle) {
					a = Ext.DomQuery.getStyle(ci, attr)
				} else {
					if (attr == "class" || attr == "className") {
						a = ci.className
					} else {
						if (attr == "for") {
							a = ci.htmlFor
						} else {
							if (attr == "href") {
								a = ci.getAttribute("href", 2)
							} else {
								a = ci.getAttribute(attr)
							}
						}
					}
				}
			} else {
				a = ci.getAttribute(attr)
			}
			if ((fn && fn(a, value)) || (!fn && a)) {
				result[++ri] = ci
			}
		}
		return result
	}
	function byPseudo(cs, name, value) {
		return Ext.DomQuery.pseudos[name](cs, value)
	}
	function nodupIEXml(cs) {
		var d = ++key, r;
		cs[0].setAttribute("_nodup", d);
		r = [cs[0]];
		for (var i = 1, len = cs.length; i < len; i++) {
			var c = cs[i];
			if (!c.getAttribute("_nodup") != d) {
				c.setAttribute("_nodup", d);
				r[r.length] = c
			}
		}
		for (var i = 0, len = cs.length; i < len; i++) {
			cs[i].removeAttribute("_nodup")
		}
		return r
	}
	function nodup(cs) {
		if (!cs) {
			return []
		}
		var len = cs.length, c, i, r = cs, cj, ri = -1;
		if (!len || typeof cs.nodeType != "undefined" || len == 1) {
			return cs
		}
		if (isIE && typeof cs[0].selectSingleNode != "undefined") {
			return nodupIEXml(cs)
		}
		var d = ++key;
		cs[0]._nodup = d;
		for (i = 1; c = cs[i]; i++) {
			if (c._nodup != d) {
				c._nodup = d
			} else {
				r = [];
				for (var j = 0; j < i; j++) {
					r[++ri] = cs[j]
				}
				for (j = i + 1; cj = cs[j]; j++) {
					if (cj._nodup != d) {
						cj._nodup = d;
						r[++ri] = cj
					}
				}
				return r
			}
		}
		return r
	}
	function quickDiffIEXml(c1, c2) {
		var d = ++key, r = [];
		for (var i = 0, len = c1.length; i < len; i++) {
			c1[i].setAttribute("_qdiff", d)
		}
		for (var i = 0, len = c2.length; i < len; i++) {
			if (c2[i].getAttribute("_qdiff") != d) {
				r[r.length] = c2[i]
			}
		}
		for (var i = 0, len = c1.length; i < len; i++) {
			c1[i].removeAttribute("_qdiff")
		}
		return r
	}
	function quickDiff(c1, c2) {
		var len1 = c1.length, d = ++key, r = [];
		if (!len1) {
			return c2
		}
		if (isIE && typeof c1[0].selectSingleNode != "undefined") {
			return quickDiffIEXml(c1, c2)
		}
		for (var i = 0; i < len1; i++) {
			c1[i]._qdiff = d
		}
		for (var i = 0, len = c2.length; i < len; i++) {
			if (c2[i]._qdiff != d) {
				r[r.length] = c2[i]
			}
		}
		return r
	}
	function quickId(ns, mode, root, id) {
		if (ns == root) {
			var d = root.ownerDocument || root;
			return d.getElementById(id)
		}
		ns = getNodes(ns, mode, "*");
		return byId(ns, id)
	}
	return {
		getStyle : function(el, name) {
			return Ext.fly(el).getStyle(name)
		},
		compile : function(path, type) {
			type = type || "select";
			var fn = ["var f = function(root){\n var mode; ++batch; var n = root || document;\n"], mode, lastPath, matchers = Ext.DomQuery.matchers, matchersLn = matchers.length, modeMatch, lmode = path
					.match(modeRe);
			if (lmode && lmode[1]) {
				fn[fn.length] = 'mode="' + lmode[1].replace(trimRe, "") + '";';
				path = path.replace(lmode[1], "")
			}
			while (path.substr(0, 1) == "/") {
				path = path.substr(1)
			}
			while (path && lastPath != path) {
				lastPath = path;
				var tokenMatch = path.match(tagTokenRe);
				if (type == "select") {
					if (tokenMatch) {
						if (tokenMatch[1] == "#") {
							fn[fn.length] = 'n = quickId(n, mode, root, "'
									+ tokenMatch[2] + '");'
						} else {
							fn[fn.length] = 'n = getNodes(n, mode, "'
									+ tokenMatch[2] + '");'
						}
						path = path.replace(tokenMatch[0], "")
					} else {
						if (path.substr(0, 1) != "@") {
							fn[fn.length] = 'n = getNodes(n, mode, "*");'
						}
					}
				} else {
					if (tokenMatch) {
						if (tokenMatch[1] == "#") {
							fn[fn.length] = 'n = byId(n, "' + tokenMatch[2]
									+ '");'
						} else {
							fn[fn.length] = 'n = byTag(n, "' + tokenMatch[2]
									+ '");'
						}
						path = path.replace(tokenMatch[0], "")
					}
				}
				while (!(modeMatch = path.match(modeRe))) {
					var matched = false;
					for (var j = 0; j < matchersLn; j++) {
						var t = matchers[j];
						var m = path.match(t.re);
						if (m) {
							fn[fn.length] = t.select.replace(tplRe, function(x,
									i) {
								return m[i]
							});
							path = path.replace(m[0], "");
							matched = true;
							break
						}
					}
					if (!matched) {
					}
				}
				if (modeMatch[1]) {
					fn[fn.length] = 'mode="' + modeMatch[1].replace(trimRe, "")
							+ '";';
					path = path.replace(modeMatch[1], "")
				}
			}
			fn[fn.length] = "return nodup(n);\n}";
			eval(fn.join(""));
			return f
		},
		jsSelect : function(path, root, type) {
			root = root || document;
			if (typeof root == "string") {
				root = document.getElementById(root)
			}
			var paths = path.split(","), results = [];
			for (var i = 0, len = paths.length; i < len; i++) {
				var subPath = paths[i].replace(trimRe, "");
				if (!cache[subPath]) {
					cache[subPath] = Ext.DomQuery.compile(subPath);
					if (!cache[subPath]) {
					}
				}
				var result = cache[subPath](root);
				if (result && result != document) {
					results = results.concat(result)
				}
			}
			if (paths.length > 1) {
				return nodup(results)
			}
			return results
		},
		isXml : function(el) {
			var docEl = (el ? el.ownerDocument || el : 0).documentElement;
			return docEl ? docEl.nodeName !== "HTML" : false
		},
		select : document.querySelectorAll ? function(path, root, type) {
			root = root || document;
			if (!Ext.DomQuery.isXml(root) && !(Ext.isSafari3 && !Ext.isStrict)) {
				try {
					var isDocumentRoot = root.nodeType === 9, _path = path, _root = root;
					if (!isDocumentRoot && path.indexOf(",") === -1
							&& !startIdRe.test(path)) {
						_path = "#" + Ext.id(root) + " " + path;
						_root = root.parentNode
					}
					return Ext.Array.toArray(_root.querySelectorAll(_path))
				} catch (e) {
				}
			}
			return Ext.DomQuery.jsSelect.call(this, path, root, type)
		}
				: function(path, root, type) {
					return Ext.DomQuery.jsSelect.call(this, path, root, type)
				},
		selectNode : function(path, root) {
			return Ext.DomQuery.select(path, root)[0]
		},
		selectValue : function(path, root, defaultValue) {
			path = path.replace(trimRe, "");
			if (!valueCache[path]) {
				valueCache[path] = Ext.DomQuery.compile(path, "select")
			}
			var n = valueCache[path](root), v;
			n = n[0] ? n[0] : n;
			if (typeof n.normalize == "function") {
				n.normalize()
			}
			v = (n && n.firstChild ? n.firstChild.nodeValue : null);
			return ((v === null || v === undefined || v === "")
					? defaultValue
					: v)
		},
		selectNumber : function(path, root, defaultValue) {
			var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
			return parseFloat(v)
		},
		is : function(el, ss) {
			if (typeof el == "string") {
				el = document.getElementById(el)
			}
			var isArray = Ext.isArray(el), result = Ext.DomQuery.filter(isArray
					? el
					: [el], ss);
			return isArray ? (result.length == el.length) : (result.length > 0)
		},
		filter : function(els, ss, nonMatches) {
			ss = ss.replace(trimRe, "");
			if (!simpleCache[ss]) {
				simpleCache[ss] = Ext.DomQuery.compile(ss, "simple")
			}
			var result = simpleCache[ss](els);
			return nonMatches ? quickDiff(result, els) : result
		},
		matchers : [{
			re : /^\.([\w-]+)/,
			select : 'n = byClassName(n, " {1} ");'
		}, {
			re : /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
			select : 'n = byPseudo(n, "{1}", "{2}");'
		}, {
			re : /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
			select : 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
		}, {
			re : /^#([\w-]+)/,
			select : 'n = byId(n, "{1}");'
		}, {
			re : /^@([\w-]+)/,
			select : 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
		}],
		operators : {
			"=" : function(a, v) {
				return a == v
			},
			"!=" : function(a, v) {
				return a != v
			},
			"^=" : function(a, v) {
				return a && a.substr(0, v.length) == v
			},
			"$=" : function(a, v) {
				return a && a.substr(a.length - v.length) == v
			},
			"*=" : function(a, v) {
				return a && a.indexOf(v) !== -1
			},
			"%=" : function(a, v) {
				return (a % v) == 0
			},
			"|=" : function(a, v) {
				return a && (a == v || a.substr(0, v.length + 1) == v + "-")
			},
			"~=" : function(a, v) {
				return a && (" " + a + " ").indexOf(" " + v + " ") != -1
			}
		},
		pseudos : {
			"first-child" : function(c) {
				var r = [], ri = -1, n;
				for (var i = 0, ci; ci = n = c[i]; i++) {
					while ((n = n.previousSibling) && n.nodeType != 1) {
					}
					if (!n) {
						r[++ri] = ci
					}
				}
				return r
			},
			"last-child" : function(c) {
				var r = [], ri = -1, n;
				for (var i = 0, ci; ci = n = c[i]; i++) {
					while ((n = n.nextSibling) && n.nodeType != 1) {
					}
					if (!n) {
						r[++ri] = ci
					}
				}
				return r
			},
			"nth-child" : function(c, a) {
				var r = [], ri = -1, m = nthRe.exec(a == "even" && "2n"
						|| a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a
						|| a), f = (m[1] || 1) - 0, l = m[2] - 0;
				for (var i = 0, n; n = c[i]; i++) {
					var pn = n.parentNode;
					if (batch != pn._batch) {
						var j = 0;
						for (var cn = pn.firstChild; cn; cn = cn.nextSibling) {
							if (cn.nodeType == 1) {
								cn.nodeIndex = ++j
							}
						}
						pn._batch = batch
					}
					if (f == 1) {
						if (l == 0 || n.nodeIndex == l) {
							r[++ri] = n
						}
					} else {
						if ((n.nodeIndex + l) % f == 0) {
							r[++ri] = n
						}
					}
				}
				return r
			},
			"only-child" : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if (!prev(ci) && !next(ci)) {
						r[++ri] = ci
					}
				}
				return r
			},
			empty : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					var cns = ci.childNodes, j = 0, cn, empty = true;
					while (cn = cns[j]) {
						++j;
						if (cn.nodeType == 1 || cn.nodeType == 3) {
							empty = false;
							break
						}
					}
					if (empty) {
						r[++ri] = ci
					}
				}
				return r
			},
			contains : function(c, v) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if ((ci.textContent || ci.innerText || "").indexOf(v) != -1) {
						r[++ri] = ci
					}
				}
				return r
			},
			nodeValue : function(c, v) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if (ci.firstChild && ci.firstChild.nodeValue == v) {
						r[++ri] = ci
					}
				}
				return r
			},
			checked : function(c) {
				var r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if (ci.checked == true) {
						r[++ri] = ci
					}
				}
				return r
			},
			not : function(c, ss) {
				return Ext.DomQuery.filter(c, ss, true)
			},
			any : function(c, selectors) {
				var ss = selectors.split("|"), r = [], ri = -1, s;
				for (var i = 0, ci; ci = c[i]; i++) {
					for (var j = 0; s = ss[j]; j++) {
						if (Ext.DomQuery.is(ci, s)) {
							r[++ri] = ci;
							break
						}
					}
				}
				return r
			},
			odd : function(c) {
				return this["nth-child"](c, "odd")
			},
			even : function(c) {
				return this["nth-child"](c, "even")
			},
			nth : function(c, a) {
				return c[a - 1] || []
			},
			first : function(c) {
				return c[0] || []
			},
			last : function(c) {
				return c[c.length - 1] || []
			},
			has : function(c, ss) {
				var s = Ext.DomQuery.select, r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					if (s(ss, ci).length > 0) {
						r[++ri] = ci
					}
				}
				return r
			},
			next : function(c, ss) {
				var is = Ext.DomQuery.is, r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					var n = next(ci);
					if (n && is(n, ss)) {
						r[++ri] = ci
					}
				}
				return r
			},
			prev : function(c, ss) {
				var is = Ext.DomQuery.is, r = [], ri = -1;
				for (var i = 0, ci; ci = c[i]; i++) {
					var n = prev(ci);
					if (n && is(n, ss)) {
						r[++ri] = ci
					}
				}
				return r
			}
		}
	}
}();
Ext.query = Ext.DomQuery.select;
(function() {
	var h = document, a = Ext.cache;
	Ext.Element = Ext.core.Element = function(l, m) {
		var n = typeof l == "string" ? h.getElementById(l) : l, o;
		if (!n) {
			return null
		}
		o = n.id;
		if (!m && o && a[o]) {
			return a[o].el
		}
		this.dom = n;
		this.id = o || Ext.id(n)
	};
	var d = Ext.DomHelper, e = Ext.Element;
	e.prototype = {
		set : function(q, m) {
			var n = this.dom, l, p;
			m = (m !== false) && !!n.setAttribute;
			for (l in q) {
				if (q.hasOwnProperty(l)) {
					p = q[l];
					if (l == "style") {
						d.applyStyles(n, p)
					} else {
						if (l == "cls") {
							n.className = p
						} else {
							if (m) {
								n.setAttribute(l, p)
							} else {
								n[l] = p
							}
						}
					}
				}
			}
			return this
		},
		defaultUnit : "px",
		is : function(l) {
			return Ext.DomQuery.is(this.dom, l)
		},
		focus : function(o, n) {
			var l = this;
			n = n || l.dom;
			try {
				if (Number(o)) {
					Ext.defer(l.focus, o, null, [null, n])
				} else {
					n.focus()
				}
			} catch (m) {
			}
			return l
		},
		blur : function() {
			try {
				this.dom.blur()
			} catch (l) {
			}
			return this
		},
		getValue : function(l) {
			var m = this.dom.value;
			return l ? parseInt(m, 10) : m
		},
		addListener : function(l, o, n, m) {
			Ext.EventManager.on(this.dom, l, o, n || this, m);
			return this
		},
		removeListener : function(l, n, m) {
			Ext.EventManager.un(this.dom, l, n, m || this);
			return this
		},
		removeAllListeners : function() {
			Ext.EventManager.removeAll(this.dom);
			return this
		},
		purgeAllListeners : function() {
			Ext.EventManager.purgeElement(this);
			return this
		},
		addUnits : function(m, l) {
			if (Ext.isNumber(m)) {
				return m + (l || this.defaultUnit || "px")
			}
			if (m === "" || m == "auto" || m == null) {
				return m || ""
			}
			if (!i.test(m)) {
				return m || ""
			}
			return m
		},
		isBorderBox : function() {
			return Ext.isBorderBox || g[(this.dom.tagName || "").toLowerCase()]
		},
		remove : function() {
			var l = this, m = l.dom;
			if (m) {
				delete l.dom;
				Ext.removeNode(m)
			}
		},
		hover : function(m, l, o, n) {
			var p = this;
			p.on("mouseenter", m, o || p.dom, n);
			p.on("mouseleave", l, o || p.dom, n);
			return p
		},
		contains : function(l) {
			return !l ? false : Ext.Element.isAncestor(this.dom, l.dom
					? l.dom
					: l)
		},
		getAttributeNS : function(m, l) {
			return this.getAttribute(l, m)
		},
		getAttribute : (Ext.isIE && !(Ext.isIE9 && document.documentMode === 9))
				? function(l, n) {
					var o = this.dom, m;
					if (n) {
						m = typeof o[n + ":" + l];
						if (m != "undefined" && m != "unknown") {
							return o[n + ":" + l] || null
						}
						return null
					}
					if (l === "for") {
						l = "htmlFor"
					}
					return o[l] || null
				}
				: function(l, m) {
					var n = this.dom;
					if (m) {
						return n.getAttributeNS(m, l)
								|| n.getAttribute(m + ":" + l)
					}
					return n.getAttribute(l) || n[l] || null
				},
		update : function(l) {
			if (this.dom) {
				this.dom.innerHTML = l
			}
			return this
		}
	};
	var k = e.prototype;
	e.addMethods = function(l) {
		Ext.apply(k, l)
	};
	k.on = k.addListener;
	k.un = k.removeListener;
	k.clearListeners = k.removeAllListeners;
	k.destroy = k.remove;
	k.autoBoxAdjust = true;
	var i = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i, c;
	e.get = function(m) {
		var l, p, o;
		if (!m) {
			return null
		}
		if (typeof m == "string") {
			if (!(p = h.getElementById(m))) {
				return null
			}
			if (a[m] && a[m].el) {
				l = a[m].el;
				l.dom = p
			} else {
				l = e.addToCache(new e(p))
			}
			return l
		} else {
			if (m.tagName) {
				if (!(o = m.id)) {
					o = Ext.id(m)
				}
				if (a[o] && a[o].el) {
					l = a[o].el;
					l.dom = m
				} else {
					l = e.addToCache(new e(m))
				}
				return l
			} else {
				if (m instanceof e) {
					if (m != c) {
						if (Ext.isIE && (m.id == undefined || m.id == "")) {
							m.dom = m.dom
						} else {
							m.dom = h.getElementById(m.id) || m.dom
						}
					}
					return m
				} else {
					if (m.isComposite) {
						return m
					} else {
						if (Ext.isArray(m)) {
							return e.select(m)
						} else {
							if (m == h) {
								if (!c) {
									var n = function() {
									};
									n.prototype = e.prototype;
									c = new n();
									c.dom = h
								}
								return c
							}
						}
					}
				}
			}
		}
		return null
	};
	k.getById = (!Ext.isIE6 && !Ext.isIE7 && !Ext.isIE8) ? e.get : function(p) {
		var o = this.dom, n, m, l;
		if (o) {
			m = o.all[p];
			if (m) {
				n = a[p];
				if (n && n.el) {
					l = n.el;
					l.dom = m
				} else {
					l = e.addToCache(new e(m))
				}
				return l
			}
		}
		return e.get(p)
	};
	e.addToCache = function(l, m) {
		if (l) {
			m = m || l.id;
			a[m] = {
				el : l,
				data : {},
				events : {}
			}
		}
		return l
	};
	e.data = function(m, l, n) {
		m = e.get(m);
		if (!m) {
			return null
		}
		var o = a[m.id].data;
		if (arguments.length == 2) {
			return o[l]
		} else {
			return (o[l] = n)
		}
	};
	function j() {
		if (!Ext.enableGarbageCollector) {
			clearInterval(e.collectorThreadId)
		} else {
			var l, n, q, p;
			for (l in a) {
				if (!a.hasOwnProperty(l)) {
					continue
				}
				p = a[l];
				if (p.skipGarbageCollection) {
					continue
				}
				n = p.el;
				q = n.dom;
				if (!q || !q.parentNode
						|| (!q.offsetParent && !h.getElementById(l))) {
					if (q && Ext.enableListenerCollection) {
						Ext.EventManager.removeAll(q)
					}
					delete a[l]
				}
			}
			if (Ext.isIE) {
				var m = {};
				for (l in a) {
					if (!a.hasOwnProperty(l)) {
						continue
					}
					m[l] = a[l]
				}
				a = Ext.cache = m
			}
		}
	}
	e.collectorThreadId = setInterval(j, 30000);
	var b = function() {
	};
	b.prototype = e.prototype;
	e.Flyweight = function(l) {
		this.dom = l
	};
	e.Flyweight.prototype = new b();
	e.Flyweight.prototype.isFlyweight = true;
	e._flyweights = {};
	e.fly = function(n, l) {
		var m = null;
		l = l || "_global";
		n = Ext.getDom(n);
		if (n) {
			(e._flyweights[l] = e._flyweights[l] || new e.Flyweight()).dom = n;
			m = e._flyweights[l]
		}
		return m
	};
	Ext.get = e.get;
	Ext.fly = e.fly;
	var g = Ext.isStrict ? {
		select : 1
	} : {
		input : 1,
		select : 1,
		textarea : 1
	};
	if (Ext.isIE || Ext.isGecko) {
		g.button = 1
	}
})();
Ext.Element.addMethods({
	findParent : function(i, h, c) {
		var e = this.dom, a = document.body, g = 0, d;
		h = h || 50;
		if (isNaN(h)) {
			d = Ext.getDom(h);
			h = Number.MAX_VALUE
		}
		while (e && e.nodeType == 1 && g < h && e != a && e != d) {
			if (Ext.DomQuery.is(e, i)) {
				return c ? Ext.get(e) : e
			}
			g++;
			e = e.parentNode
		}
		return null
	},
	findParentNode : function(d, c, a) {
		var b = Ext.fly(this.dom.parentNode, "_internal");
		return b ? b.findParent(d, c, a) : null
	},
	up : function(b, a) {
		return this.findParentNode(b, a, true)
	},
	select : function(a) {
		return Ext.Element.select(a, false, this.dom)
	},
	query : function(a) {
		return Ext.DomQuery.select(a, this.dom)
	},
	down : function(a, b) {
		var c = Ext.DomQuery.selectNode(a, this.dom);
		return b ? c : Ext.get(c)
	},
	child : function(a, b) {
		var d, c = this, e;
		e = Ext.get(c).id;
		e = e.replace(/[\.:]/g, "\\$0");
		d = Ext.DomQuery.selectNode("#" + e + " > " + a, c.dom);
		return b ? d : Ext.get(d)
	},
	parent : function(a, b) {
		return this.matchNode("parentNode", "parentNode", a, b)
	},
	next : function(a, b) {
		return this.matchNode("nextSibling", "nextSibling", a, b)
	},
	prev : function(a, b) {
		return this.matchNode("previousSibling", "previousSibling", a, b)
	},
	first : function(a, b) {
		return this.matchNode("nextSibling", "firstChild", a, b)
	},
	last : function(a, b) {
		return this.matchNode("previousSibling", "lastChild", a, b)
	},
	matchNode : function(b, e, a, c) {
		if (!this.dom) {
			return null
		}
		var d = this.dom[e];
		while (d) {
			if (d.nodeType == 1 && (!a || Ext.DomQuery.is(d, a))) {
				return !c ? Ext.get(d) : d
			}
			d = d[b]
		}
		return null
	}
});
Ext.Element.addMethods({
	appendChild : function(a) {
		return Ext.get(a).appendTo(this)
	},
	appendTo : function(a) {
		Ext.getDom(a).appendChild(this.dom);
		return this
	},
	insertBefore : function(a) {
		a = Ext.getDom(a);
		a.parentNode.insertBefore(this.dom, a);
		return this
	},
	insertAfter : function(a) {
		a = Ext.getDom(a);
		a.parentNode.insertBefore(this.dom, a.nextSibling);
		return this
	},
	insertFirst : function(b, a) {
		b = b || {};
		if (b.nodeType || b.dom || typeof b == "string") {
			b = Ext.getDom(b);
			this.dom.insertBefore(b, this.dom.firstChild);
			return !a ? Ext.get(b) : b
		} else {
			return this.createChild(b, this.dom.firstChild, a)
		}
	},
	insertSibling : function(e, c, d) {
		var g = this, b, a = (c || "before").toLowerCase() == "after", h;
		if (Ext.isArray(e)) {
			h = g;
			Ext.each(e, function(i) {
				b = Ext.fly(h, "_internal").insertSibling(i, c, d);
				if (a) {
					h = b
				}
			});
			return b
		}
		e = e || {};
		if (e.nodeType || e.dom) {
			b = g.dom.parentNode.insertBefore(Ext.getDom(e), a
					? g.dom.nextSibling
					: g.dom);
			if (!d) {
				b = Ext.get(b)
			}
		} else {
			if (a && !g.dom.nextSibling) {
				b = Ext.DomHelper.append(g.dom.parentNode, e, !d)
			} else {
				b = Ext.DomHelper[a ? "insertAfter" : "insertBefore"](g.dom, e,
						!d)
			}
		}
		return b
	},
	replace : function(a) {
		a = Ext.get(a);
		this.insertBefore(a);
		a.remove();
		return this
	},
	replaceWith : function(a) {
		var b = this;
		if (a.nodeType || a.dom || typeof a == "string") {
			a = Ext.get(a);
			b.dom.parentNode.insertBefore(a, b.dom)
		} else {
			a = Ext.DomHelper.insertBefore(b.dom, a)
		}
		delete Ext.cache[b.id];
		Ext.removeNode(b.dom);
		b.id = Ext.id(b.dom = a);
		Ext.Element.addToCache(b.isFlyweight ? new Ext.Element(b.dom) : b);
		return b
	},
	createChild : function(b, a, c) {
		b = b || {
			tag : "div"
		};
		if (a) {
			return Ext.DomHelper.insertBefore(a, b, c !== true)
		} else {
			return Ext.DomHelper[!this.dom.firstChild
					? "insertFirst"
					: "append"](this.dom, b, c !== true)
		}
	},
	wrap : function(a, b) {
		var e = Ext.DomHelper.insertBefore(this.dom, a || {
			tag : "div"
		}, !b), c = e.dom || e;
		c.appendChild(this.dom);
		return e
	},
	insertHtml : function(b, c, a) {
		var d = Ext.DomHelper.insertHtml(b, this.dom, c);
		return a ? Ext.get(d) : d
	}
});
(function() {
	var w = Ext.Element, z = Ext.supports, r = document.defaultView, B = /alpha\(opacity=(.*)\)/i, l = /^\s+|\s+$/g, t = /\s+/, b = /\w/g, u = /table-row|table-.*-group/, c = "_internal", e = "padding", d = "margin", x = "border", s = "-left", p = "-right", v = "-top", o = "-bottom", j = "-width", q = Math, y = "hidden", g = "isClipped", k = "overflow", n = "overflow-x", m = "overflow-y", A = "originalClip", i = {
		l : x + s + j,
		r : x + p + j,
		t : x + v + j,
		b : x + o + j
	}, h = {
		l : e + s,
		r : e + p,
		t : e + v,
		b : e + o
	}, a = {
		l : d + s,
		r : d + p,
		t : d + v,
		b : d + o
	}, C = w.data;
	w.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
	w.inheritedProps = {
		fontSize : 1,
		fontStyle : 1,
		opacity : 1
	};
	Ext.override(w, {
		adjustWidth : function(D) {
			var E = this, F = (typeof D == "number");
			if (F && E.autoBoxAdjust && !E.isBorderBox()) {
				D -= (E.getBorderWidth("lr") + E.getPadding("lr"))
			}
			return (F && D < 0) ? 0 : D
		},
		adjustHeight : function(D) {
			var E = this, F = (typeof D == "number");
			if (F && E.autoBoxAdjust && !E.isBorderBox()) {
				D -= (E.getBorderWidth("tb") + E.getPadding("tb"))
			}
			return (F && D < 0) ? 0 : D
		},
		addCls : function(H) {
			var I = this, E = [], J = ((I.dom.className.replace(l, "") == "")
					? ""
					: " "), G, D, F;
			if (H === undefined) {
				return I
			}
			if (Object.prototype.toString.call(H) !== "[object Array]") {
				if (typeof H === "string") {
					H = H.replace(l, "").split(t);
					if (H.length === 1) {
						H = H[0];
						if (!I.hasCls(H)) {
							I.dom.className += J + H
						}
					} else {
						this.addCls(H)
					}
				}
			} else {
				for (G = 0, D = H.length; G < D; G++) {
					F = H[G];
					if (typeof F == "string"
							&& (" " + I.dom.className + " ").indexOf(" " + F
									+ " ") == -1) {
						E.push(F)
					}
				}
				if (E.length) {
					I.dom.className += J + E.join(" ")
				}
			}
			return I
		},
		removeCls : function(I) {
			var J = this, H, E, D, G, F;
			if (I === undefined) {
				return J
			}
			if (Object.prototype.toString.call(I) !== "[object Array]") {
				I = I.replace(l, "").split(t)
			}
			if (J.dom && J.dom.className) {
				F = J.dom.className.replace(l, "").split(t);
				for (H = 0, D = I.length; H < D; H++) {
					G = I[H];
					if (typeof G == "string") {
						G = G.replace(l, "");
						E = Ext.Array.indexOf(F, G);
						if (E != -1) {
							Ext.Array.erase(F, E, 1)
						}
					}
				}
				J.dom.className = F.join(" ")
			}
			return J
		},
		radioCls : function(G) {
			var H = this.dom.parentNode.childNodes, E, F, D;
			G = Ext.isArray(G) ? G : [G];
			for (F = 0, D = H.length; F < D; F++) {
				E = H[F];
				if (E && E.nodeType == 1) {
					Ext.fly(E, "_internal").removeCls(G)
				}
			}
			return this.addCls(G)
		},
		toggleCls : Ext.supports.ClassList ? function(D) {
			this.dom.classList.toggle(Ext.String.trim(D));
			return this
		} : function(D) {
			return this.hasCls(D) ? this.removeCls(D) : this.addCls(D)
		},
		hasCls : Ext.supports.ClassList ? function(E) {
			if (!E) {
				return false
			}
			E = E.split(t);
			var F = E.length, D = 0;
			for (; D < F; D++) {
				if (E[D] && this.dom.classList.contains(E[D])) {
					return true
				}
			}
			return false
		} : function(D) {
			return D
					&& (" " + this.dom.className + " ").indexOf(" " + D + " ") != -1
		},
		replaceCls : function(E, D) {
			return this.removeCls(E).addCls(D)
		},
		isStyle : function(D, E) {
			return this.getStyle(D) == E
		},
		getStyle : function() {
			return r && r.getComputedStyle ? function(J) {
				var H = this.dom, D, G, E, I, F;
				if (H == document) {
					return null
				}
				J = w.normalize(J);
				E = (D = H.style[J]) ? D : (G = r.getComputedStyle(H, ""))
						? G[J]
						: null;
				if (J == "marginRight" && E != "0px" && !z.RightMargin) {
					F = w.getRightMarginFixCleaner(H);
					I = this.getStyle("display");
					H.style.display = "inline-block";
					E = r.getComputedStyle(H, "").marginRight;
					H.style.display = I;
					F()
				}
				if (J == "backgroundColor" && E == "rgba(0, 0, 0, 0)"
						&& !z.TransparentColor) {
					E = "transparent"
				}
				return E
			} : function(I) {
				var F = this.dom, D, E;
				if (F == document) {
					return null
				}
				I = w.normalize(I);
				do {
					if (I == "opacity") {
						if (F.style.filter.match) {
							D = F.style.filter.match(B);
							if (D) {
								var H = parseFloat(D[1]);
								if (!isNaN(H)) {
									return H ? H / 100 : 0
								}
							}
						}
						return 1
					}
					if (!Ext.isIE6) {
						return F.style[I]
								|| ((E = F.currentStyle) ? E[I] : null)
					}
					try {
						return F.style[I]
								|| ((E = F.currentStyle) ? E[I] : null)
					} catch (G) {
					}
					if (!w.inheritedProps[I]) {
						break
					}
					F = F.parentNode
				} while (F);
				return null
			}
		}(),
		getColor : function(D, E, I) {
			var G = this.getStyle(D), F = I || I === "" ? I : "#", H;
			if (!G || (/transparent|inherit/.test(G))) {
				return E
			}
			if (/^r/.test(G)) {
				Ext.each(G.slice(4, G.length - 1).split(","), function(J) {
					H = parseInt(J, 10);
					F += (H < 16 ? "0" : "") + H.toString(16)
				})
			} else {
				G = G.replace("#", "");
				F += G.length == 3 ? G
						.replace(/^(\w)(\w)(\w)$/, "$1$1$2$2$3$3") : G
			}
			return (F.length > 5 ? F.toLowerCase() : E)
		},
		setStyle : function(H, G) {
			var F = this, D, E;
			if (!F.dom) {
				return F
			}
			if (typeof H === "string") {
				D = {};
				D[H] = G;
				H = D
			}
			for (E in H) {
				if (H.hasOwnProperty(E)) {
					G = Ext.value(H[E], "");
					if (E == "opacity") {
						F.setOpacity(G)
					} else {
						F.dom.style[w.normalize(E)] = G
					}
				}
			}
			return F
		},
		setOpacity : function(E, D) {
			var G = this, I = G.dom, H, F;
			if (!G.dom) {
				return G
			}
			F = G.dom.style;
			if (!D || !G.anim) {
				if (!Ext.supports.Opacity) {
					E = E < 1 ? "alpha(opacity=" + E * 100 + ")" : "";
					H = F.filter.replace(B, "").replace(l, "");
					F.zoom = 1;
					F.filter = H + (H.length > 0 ? " " : "") + E
				} else {
					F.opacity = E
				}
			} else {
				if (!Ext.isObject(D)) {
					D = {
						duration : 350,
						easing : "ease-in"
					}
				}
				G.animate(Ext.applyIf({
					to : {
						opacity : E
					}
				}, D))
			}
			return G
		},
		clearOpacity : function() {
			var D = this.dom.style;
			if (!Ext.supports.Opacity) {
				if (!Ext.isEmpty(D.filter)) {
					D.filter = D.filter.replace(B, "").replace(l, "")
				}
			} else {
				D.opacity = D["-moz-opacity"] = D["-khtml-opacity"] = ""
			}
			return this
		},
		adjustDirect2DDimension : function(H) {
			var F = this, I = F.dom, G = F.getStyle("display"), E = I.style.display, D = I.style.position, K = H === "width"
					? 0
					: 1, J;
			if (G === "inline") {
				I.style.display = "inline-block"
			}
			I.style.position = G.match(u) ? "absolute" : "static";
			J = (parseFloat(F.getStyle(H)) || parseFloat(I.currentStyle.msTransformOrigin
					.split(" ")[K])
					* 2)
					% 1;
			I.style.position = D;
			if (G === "inline") {
				I.style.display = E
			}
			return J
		},
		getHeight : function(K, F) {
			var J = this, G = J.dom, H = Ext.isIE
					&& J.isStyle("display", "none"), L, E, D, I;
			if (Ext.isIEQuirks) {
				D = G.style;
				E = D.overflow;
				J.setStyle({
					overflow : "hidden"
				})
			}
			L = G.offsetHeight;
			L = q.max(L, H ? 0 : G.clientHeight) || 0;
			if (!H && Ext.supports.Direct2DBug) {
				I = J.adjustDirect2DDimension("height");
				if (F) {
					L += I
				} else {
					if (I > 0 && I < 0.5) {
						L++
					}
				}
			}
			if (K) {
				L -= (J.getBorderWidth("tb") + J.getPadding("tb"))
			}
			if (Ext.isIEQuirks) {
				J.setStyle({
					overflow : E
				})
			}
			if (L < 0) {
				L = 0
			}
			return L
		},
		getWidth : function(D, N) {
			var K = this, H = K.dom, I = Ext.isIE
					&& K.isStyle("display", "none"), L, F, G, E, J, M;
			if (Ext.isIEQuirks) {
				E = H.style;
				G = E.overflow;
				K.setStyle({
					overflow : "hidden"
				})
			}
			if (Ext.isOpera10_5) {
				if (H.parentNode.currentStyle.position === "relative") {
					M = H.parentNode.style.position;
					H.parentNode.style.position = "static";
					F = H.offsetWidth;
					H.parentNode.style.position = M
				}
				F = Math.max(F || 0, H.offsetWidth)
			} else {
				if (Ext.supports.BoundingClientRect) {
					L = H.getBoundingClientRect();
					F = L.right - L.left;
					F = N ? F : Math.ceil(F)
				} else {
					F = H.offsetWidth
				}
			}
			F = q.max(F, I ? 0 : H.clientWidth) || 0;
			if (!I && Ext.supports.Direct2DBug) {
				J = K.adjustDirect2DDimension("width");
				if (N) {
					F += J
				} else {
					if (J > 0 && J < 0.5) {
						F++
					}
				}
			}
			if (D) {
				F -= (K.getBorderWidth("lr") + K.getPadding("lr"))
			}
			if (Ext.isIEQuirks) {
				K.setStyle({
					overflow : G
				})
			}
			if (F < 0) {
				F = 0
			}
			return F
		},
		setWidth : function(E, D) {
			var F = this;
			E = F.adjustWidth(E);
			if (!D || !F.anim) {
				F.dom.style.width = F.addUnits(E)
			} else {
				if (!Ext.isObject(D)) {
					D = {}
				}
				F.animate(Ext.applyIf({
					to : {
						width : E
					}
				}, D))
			}
			return F
		},
		setHeight : function(D, E) {
			var F = this;
			D = F.adjustHeight(D);
			if (!E || !F.anim) {
				F.dom.style.height = F.addUnits(D)
			} else {
				if (!Ext.isObject(E)) {
					E = {}
				}
				F.animate(Ext.applyIf({
					to : {
						height : D
					}
				}, E))
			}
			return F
		},
		getBorderWidth : function(D) {
			return this.addStyles(D, i)
		},
		getPadding : function(D) {
			return this.addStyles(D, h)
		},
		clip : function() {
			var D = this, E = D.dom;
			if (!C(E, g)) {
				C(E, g, true);
				C(E, A, {
					o : D.getStyle(k),
					x : D.getStyle(n),
					y : D.getStyle(m)
				});
				D.setStyle(k, y);
				D.setStyle(n, y);
				D.setStyle(m, y)
			}
			return D
		},
		unclip : function() {
			var E = this, F = E.dom, D;
			if (C(F, g)) {
				C(F, g, false);
				D = C(F, A);
				if (D.o) {
					E.setStyle(k, D.o)
				}
				if (D.x) {
					E.setStyle(n, D.x)
				}
				if (D.y) {
					E.setStyle(m, D.y)
				}
			}
			return E
		},
		addStyles : function(K, J) {
			var E = 0, I = K.match(b), H = 0, D = I.length, G, F;
			for (; H < D; H++) {
				G = I[H];
				F = G && parseInt(this.getStyle(J[G]), 10);
				if (F) {
					E += q.abs(F)
				}
			}
			return E
		},
		margins : a,
		applyStyles : function(D) {
			Ext.DomHelper.applyStyles(this.dom, D);
			return this
		},
		getStyles : function() {
			var G = {}, D = arguments.length, E = 0, F;
			for (; E < D; ++E) {
				F = arguments[E];
				G[F] = this.getStyle(F)
			}
			return G
		},
		boxWrap : function(D) {
			D = D || Ext.baseCSSPrefix + "box";
			var E = Ext.get(this.insertHtml("beforeBegin", "<div class='" + D
					+ "'>" + Ext.String.format(w.boxMarkup, D) + "</div>"));
			Ext.DomQuery.selectNode("." + D + "-mc", E.dom)
					.appendChild(this.dom);
			return E
		},
		setSize : function(F, D, E) {
			var G = this;
			if (Ext.isObject(F)) {
				E = D;
				D = F.height;
				F = F.width
			}
			F = G.adjustWidth(F);
			D = G.adjustHeight(D);
			if (!E || !G.anim) {
				if (!Ext.isIEQuirks && (Ext.isIE6 || Ext.isIE7)) {
					G.dom.offsetTop
				}
				G.dom.style.width = G.addUnits(F);
				G.dom.style.height = G.addUnits(D)
			} else {
				if (E === true) {
					E = {}
				}
				G.animate(Ext.applyIf({
					to : {
						width : F,
						height : D
					}
				}, E))
			}
			return G
		},
		getComputedHeight : function() {
			var E = this, D = Math.max(E.dom.offsetHeight, E.dom.clientHeight);
			if (!D) {
				D = parseFloat(E.getStyle("height")) || 0;
				if (!E.isBorderBox()) {
					D += E.getFrameWidth("tb")
				}
			}
			return D
		},
		getComputedWidth : function() {
			var E = this, D = Math.max(E.dom.offsetWidth, E.dom.clientWidth);
			if (!D) {
				D = parseFloat(E.getStyle("width")) || 0;
				if (!E.isBorderBox()) {
					D += E.getFrameWidth("lr")
				}
			}
			return D
		},
		getFrameWidth : function(E, D) {
			return D && this.isBorderBox() ? 0 : (this.getPadding(E) + this
					.getBorderWidth(E))
		},
		addClsOnOver : function(D) {
			var E = this.dom;
			this.hover(function() {
				Ext.fly(E, c).addCls(D)
			}, function() {
				Ext.fly(E, c).removeCls(D)
			});
			return this
		},
		addClsOnFocus : function(D) {
			var E = this, F = E.dom;
			E.on("focus", function() {
				Ext.fly(F, c).addCls(D)
			});
			E.on("blur", function() {
				Ext.fly(F, c).removeCls(D)
			});
			return E
		},
		addClsOnClick : function(D) {
			var E = this.dom;
			this.on("mousedown", function() {
				Ext.fly(E, c).addCls(D);
				var G = Ext.getDoc(), F = function() {
					Ext.fly(E, c).removeCls(D);
					G.removeListener("mouseup", F)
				};
				G.on("mouseup", F)
			});
			return this
		},
		getViewSize : function() {
			var G = this, H = G.dom, E = (H == Ext.getDoc().dom || H == Ext
					.getBody().dom), F, I, D;
			if (E) {
				D = {
					width : w.getViewWidth(),
					height : w.getViewHeight()
				}
			} else {
				if (Ext.isIE6 || Ext.isIEQuirks) {
					F = H.style;
					I = F.overflow;
					G.setStyle({
						overflow : "hidden"
					})
				}
				D = {
					width : H.clientWidth,
					height : H.clientHeight
				};
				if (Ext.isIE6 || Ext.isIEQuirks) {
					G.setStyle({
						overflow : I
					})
				}
			}
			return D
		},
		getStyleSize : function() {
			var H = this, I = document, J = this.dom, E = (J == I || J == I.body), G = J.style, D, F;
			if (E) {
				return {
					width : w.getViewWidth(),
					height : w.getViewHeight()
				}
			}
			if (G.width && G.width != "auto") {
				D = parseFloat(G.width);
				if (H.isBorderBox()) {
					D -= H.getFrameWidth("lr")
				}
			}
			if (G.height && G.height != "auto") {
				F = parseFloat(G.height);
				if (H.isBorderBox()) {
					F -= H.getFrameWidth("tb")
				}
			}
			return {
				width : D || H.getWidth(true),
				height : F || H.getHeight(true)
			}
		},
		getSize : function(D) {
			return {
				width : this.getWidth(D),
				height : this.getHeight(D)
			}
		},
		repaint : function() {
			var D = this.dom;
			this.addCls(Ext.baseCSSPrefix + "repaint");
			setTimeout(function() {
				Ext.fly(D).removeCls(Ext.baseCSSPrefix + "repaint")
			}, 1);
			return this
		},
		selectable : function() {
			var D = this;
			D.dom.unselectable = "off";
			D.on("selectstart", function(E) {
				E.stopPropagation();
				return true
			});
			D.applyStyles("-moz-user-select: text; -khtml-user-select: text;");
			D.removeCls(Ext.baseCSSPrefix + "unselectable");
			return D
		},
		unselectable : function() {
			var D = this;
			D.dom.unselectable = "on";
			D.swallowEvent("selectstart", true);
			D
					.applyStyles("-moz-user-select:-moz-none;-khtml-user-select:none;");
			D.addCls(Ext.baseCSSPrefix + "unselectable");
			return D
		},
		getMargin : function(E) {
			var F = this, G = {
				t : "top",
				l : "left",
				r : "right",
				b : "bottom"
			}, H = {}, D;
			if (!E) {
				for (D in F.margins) {
					H[G[D]] = parseFloat(F.getStyle(F.margins[D])) || 0
				}
				return H
			} else {
				return F.addStyles.call(F, E, F.margins)
			}
		}
	})
})();
Ext.Element.VISIBILITY = 1;
Ext.Element.DISPLAY = 2;
Ext.Element.OFFSETS = 3;
Ext.Element.ASCLASS = 4;
Ext.Element.visibilityCls = Ext.baseCSSPrefix + "hide-nosize";
Ext.Element.addMethods(function() {
	var e = Ext.Element, p = "opacity", j = "visibility", g = "display", d = "hidden", n = "offsets", k = "asclass", m = "none", a = "nosize", b = "originalDisplay", c = "visibilityMode", h = "isVisible", i = e.data, l = function(
			r) {
		var q = i(r, b);
		if (q === undefined) {
			i(r, b, q = "")
		}
		return q
	}, o = function(r) {
		var q = i(r, c);
		if (q === undefined) {
			i(r, c, q = 1)
		}
		return q
	};
	return {
		originalDisplay : "",
		visibilityMode : 1,
		setVisibilityMode : function(q) {
			i(this.dom, c, q);
			return this
		},
		isVisible : function() {
			var q = this, s = q.dom, r = i(s, h);
			if (typeof r == "boolean") {
				return r
			}
			r = !q.isStyle(j, d)
					&& !q.isStyle(g, m)
					&& !((o(s) == e.ASCLASS) && q.hasCls(q.visibilityCls
							|| e.visibilityCls));
			i(s, h, r);
			return r
		},
		setVisible : function(t, q) {
			var w = this, r, y, x, v, u = w.dom, s = o(u);
			if (typeof q == "string") {
				switch (q) {
					case g :
						s = e.DISPLAY;
						break;
					case j :
						s = e.VISIBILITY;
						break;
					case n :
						s = e.OFFSETS;
						break;
					case a :
					case k :
						s = e.ASCLASS;
						break
				}
				w.setVisibilityMode(s);
				q = false
			}
			if (!q || !w.anim) {
				if (s == e.ASCLASS) {
					w[t ? "removeCls" : "addCls"](w.visibilityCls
							|| e.visibilityCls)
				} else {
					if (s == e.DISPLAY) {
						return w.setDisplayed(t)
					} else {
						if (s == e.OFFSETS) {
							if (!t) {
								if (!w.hideModeStyles) {
									w.hideModeStyles = {
										position : w.getStyle("position"),
										top : w.getStyle("top"),
										left : w.getStyle("left")
									}
								}
								w.applyStyles({
									position : "absolute",
									top : "-10000px",
									left : "-10000px"
								})
							} else {
								if (w.hideModeStyles) {
									w.applyStyles(w.hideModeStyles || {
										position : "",
										top : "",
										left : ""
									});
									delete w.hideModeStyles
								}
							}
						} else {
							w.fixDisplay();
							u.style.visibility = t ? "" : d
						}
					}
				}
			} else {
				if (t) {
					w.setOpacity(0.01);
					w.setVisible(true)
				}
				if (!Ext.isObject(q)) {
					q = {
						duration : 350,
						easing : "ease-in"
					}
				}
				w.animate(Ext.applyIf({
					callback : function() {
						t || w.setVisible(false).setOpacity(1)
					},
					to : {
						opacity : (t) ? 1 : 0
					}
				}, q))
			}
			i(u, h, t);
			return w
		},
		hasMetrics : function() {
			var q = this.dom;
			return this.isVisible() || (o(q) == e.OFFSETS)
					|| (o(q) == e.VISIBILITY)
		},
		toggle : function(q) {
			var r = this;
			r.setVisible(!r.isVisible(), r.anim(q));
			return r
		},
		setDisplayed : function(q) {
			if (typeof q == "boolean") {
				q = q ? l(this.dom) : m
			}
			this.setStyle(g, q);
			return this
		},
		fixDisplay : function() {
			var q = this;
			if (q.isStyle(g, m)) {
				q.setStyle(j, d);
				q.setStyle(g, l(this.dom));
				if (q.isStyle(g, m)) {
					q.setStyle(g, "block")
				}
			}
		},
		hide : function(q) {
			if (typeof q == "string") {
				this.setVisible(false, q);
				return this
			}
			this.setVisible(false, this.anim(q));
			return this
		},
		show : function(q) {
			if (typeof q == "string") {
				this.setVisible(true, q);
				return this
			}
			this.setVisible(true, this.anim(q));
			return this
		}
	}
}());
Ext.applyIf(Ext.Element.prototype, {
	animate : function(a) {
		var b = this;
		if (!b.id) {
			b = Ext.get(b.dom)
		}
		if (Ext.fx.Manager.hasFxBlock(b.id)) {
			return b
		}
		Ext.fx.Manager.queueFx(Ext.create("Ext.fx.Anim", b.anim(a)));
		return this
	},
	anim : function(a) {
		if (!Ext.isObject(a)) {
			return (a) ? {} : false
		}
		var b = this, c = a.duration || Ext.fx.Anim.prototype.duration, e = a.easing
				|| "ease", d;
		if (a.stopAnimation) {
			b.stopAnimation()
		}
		Ext.applyIf(a, Ext.fx.Manager.getFxDefaults(b.id));
		Ext.fx.Manager.setFxDefaults(b.id, {
			delay : 0
		});
		d = {
			target : b,
			remove : a.remove,
			alternate : a.alternate || false,
			duration : c,
			easing : e,
			callback : a.callback,
			listeners : a.listeners,
			iterations : a.iterations || 1,
			scope : a.scope,
			block : a.block,
			concurrent : a.concurrent,
			delay : a.delay || 0,
			paused : true,
			keyframes : a.keyframes,
			from : a.from || {},
			to : Ext.apply({}, a)
		};
		Ext.apply(d.to, a.to);
		delete d.to.to;
		delete d.to.from;
		delete d.to.remove;
		delete d.to.alternate;
		delete d.to.keyframes;
		delete d.to.iterations;
		delete d.to.listeners;
		delete d.to.target;
		delete d.to.paused;
		delete d.to.callback;
		delete d.to.scope;
		delete d.to.duration;
		delete d.to.easing;
		delete d.to.concurrent;
		delete d.to.block;
		delete d.to.stopAnimation;
		delete d.to.delay;
		return d
	},
	slideIn : function(b, h, e) {
		var g = this, d = g.dom.style, c, a;
		b = b || "t";
		h = h || {};
		c = function() {
			var m = this, l = h.listeners, n, i, k, j, o;
			if (!e) {
				g.fixDisplay()
			}
			n = g.getBox();
			if ((b == "t" || b == "b") && n.height === 0) {
				n.height = g.dom.scrollHeight
			} else {
				if ((b == "l" || b == "r") && n.width === 0) {
					n.width = g.dom.scrollWidth
				}
			}
			i = g.getPositioning();
			g.setSize(n.width, n.height);
			j = g.wrap({
				style : {
					visibility : e ? "visible" : "hidden"
				}
			});
			j.setPositioning(i);
			if (j.isStyle("position", "static")) {
				j.position("relative")
			}
			g.clearPositioning("auto");
			j.clip();
			g.setStyle({
				visibility : "",
				position : "absolute"
			});
			if (e) {
				j.setSize(n.width, n.height)
			}
			switch (b) {
				case "t" :
					o = {
						from : {
							width : n.width + "px",
							height : "0px"
						},
						to : {
							width : n.width + "px",
							height : n.height + "px"
						}
					};
					d.bottom = "0px";
					break;
				case "l" :
					o = {
						from : {
							width : "0px",
							height : n.height + "px"
						},
						to : {
							width : n.width + "px",
							height : n.height + "px"
						}
					};
					d.right = "0px";
					break;
				case "r" :
					o = {
						from : {
							x : n.x + n.width,
							width : "0px",
							height : n.height + "px"
						},
						to : {
							x : n.x,
							width : n.width + "px",
							height : n.height + "px"
						}
					};
					break;
				case "b" :
					o = {
						from : {
							y : n.y + n.height,
							width : n.width + "px",
							height : "0px"
						},
						to : {
							y : n.y,
							width : n.width + "px",
							height : n.height + "px"
						}
					};
					break;
				case "tl" :
					o = {
						from : {
							x : n.x,
							y : n.y,
							width : "0px",
							height : "0px"
						},
						to : {
							width : n.width + "px",
							height : n.height + "px"
						}
					};
					d.bottom = "0px";
					d.right = "0px";
					break;
				case "bl" :
					o = {
						from : {
							x : n.x + n.width,
							width : "0px",
							height : "0px"
						},
						to : {
							x : n.x,
							width : n.width + "px",
							height : n.height + "px"
						}
					};
					d.right = "0px";
					break;
				case "br" :
					o = {
						from : {
							x : n.x + n.width,
							y : n.y + n.height,
							width : "0px",
							height : "0px"
						},
						to : {
							x : n.x,
							y : n.y,
							width : n.width + "px",
							height : n.height + "px"
						}
					};
					break;
				case "tr" :
					o = {
						from : {
							y : n.y + n.height,
							width : "0px",
							height : "0px"
						},
						to : {
							y : n.y,
							width : n.width + "px",
							height : n.height + "px"
						}
					};
					d.bottom = "0px";
					break
			}
			j.show();
			a = Ext.apply({}, h);
			delete a.listeners;
			a = Ext.create("Ext.fx.Anim", Ext.applyIf(a, {
				target : j,
				duration : 500,
				easing : "ease-out",
				from : e ? o.to : o.from,
				to : e ? o.from : o.to
			}));
			a.on("afteranimate", function() {
				if (e) {
					g.setPositioning(i);
					if (h.useDisplay) {
						g.setDisplayed(false)
					} else {
						g.hide()
					}
				} else {
					g.clearPositioning();
					g.setPositioning(i)
				}
				if (j.dom) {
					j.dom.parentNode.insertBefore(g.dom, j.dom);
					j.remove()
				}
				g.setSize(n.width, n.height);
				m.end()
			});
			if (l) {
				a.on(l)
			}
		};
		g.animate({
			duration : h.duration ? h.duration * 2 : 1000,
			listeners : {
				beforeanimate : {
					fn : c
				},
				afteranimate : {
					fn : function() {
						if (a && a.running) {
							a.end()
						}
					}
				}
			}
		});
		return g
	},
	slideOut : function(a, b) {
		return this.slideIn(a, b, true)
	},
	puff : function(c) {
		var b = this, a;
		c = Ext.applyIf(c || {}, {
			easing : "ease-out",
			duration : 500,
			useDisplay : false
		});
		a = function() {
			b.clearOpacity();
			b.show();
			var e = b.getBox(), g = b.getStyle("fontSize"), d = b
					.getPositioning();
			this.to = {
				width : e.width * 2,
				height : e.height * 2,
				x : e.x - (e.width / 2),
				y : e.y - (e.height / 2),
				opacity : 0,
				fontSize : "200%"
			};
			this.on("afteranimate", function() {
				if (b.dom) {
					if (c.useDisplay) {
						b.setDisplayed(false)
					} else {
						b.hide()
					}
					b.clearOpacity();
					b.setPositioning(d);
					b.setStyle({
						fontSize : g
					})
				}
			})
		};
		b.animate({
			duration : c.duration,
			easing : c.easing,
			listeners : {
				beforeanimate : {
					fn : a
				}
			}
		});
		return b
	},
	switchOff : function(c) {
		var b = this, a;
		c = Ext.applyIf(c || {}, {
			easing : "ease-in",
			duration : 500,
			remove : false,
			useDisplay : false
		});
		a = function() {
			var h = this, g = b.getSize(), i = b.getXY(), e, d;
			b.clearOpacity();
			b.clip();
			d = b.getPositioning();
			e = Ext.create("Ext.fx.Animator", {
				target : b,
				duration : c.duration,
				easing : c.easing,
				keyframes : {
					33 : {
						opacity : 0.3
					},
					66 : {
						height : 1,
						y : i[1] + g.height / 2
					},
					100 : {
						width : 1,
						x : i[0] + g.width / 2
					}
				}
			});
			e.on("afteranimate", function() {
				if (c.useDisplay) {
					b.setDisplayed(false)
				} else {
					b.hide()
				}
				b.clearOpacity();
				b.setPositioning(d);
				b.setSize(g);
				h.end()
			})
		};
		b.animate({
			duration : (c.duration * 2),
			listeners : {
				beforeanimate : {
					fn : a
				}
			}
		});
		return b
	},
	frame : function(a, d, e) {
		var c = this, b;
		a = a || "#C3DAF9";
		d = d || 1;
		e = e || {};
		b = function() {
			c.show();
			var i = this, j = c.getBox(), h = Ext.getBody().createChild({
				style : {
					position : "absolute",
					"pointer-events" : "none",
					"z-index" : 35000,
					border : "0px solid " + a
				}
			}), g;
			g = Ext.create("Ext.fx.Anim", {
				target : h,
				duration : e.duration || 1000,
				iterations : d,
				from : {
					top : j.y,
					left : j.x,
					borderWidth : 0,
					opacity : 1,
					height : j.height,
					width : j.width
				},
				to : {
					top : j.y - 20,
					left : j.x - 20,
					borderWidth : 10,
					opacity : 0,
					height : j.height + 40,
					width : j.width + 40
				}
			});
			g.on("afteranimate", function() {
				h.remove();
				i.end()
			})
		};
		c.animate({
			duration : (e.duration * 2) || 2000,
			listeners : {
				beforeanimate : {
					fn : b
				}
			}
		});
		return c
	},
	ghost : function(a, d) {
		var c = this, b;
		a = a || "b";
		b = function() {
			var h = c.getWidth(), g = c.getHeight(), i = c.getXY(), e = c
					.getPositioning(), j = {
				opacity : 0
			};
			switch (a) {
				case "t" :
					j.y = i[1] - g;
					break;
				case "l" :
					j.x = i[0] - h;
					break;
				case "r" :
					j.x = i[0] + h;
					break;
				case "b" :
					j.y = i[1] + g;
					break;
				case "tl" :
					j.x = i[0] - h;
					j.y = i[1] - g;
					break;
				case "bl" :
					j.x = i[0] - h;
					j.y = i[1] + g;
					break;
				case "br" :
					j.x = i[0] + h;
					j.y = i[1] + g;
					break;
				case "tr" :
					j.x = i[0] + h;
					j.y = i[1] - g;
					break
			}
			this.to = j;
			this.on("afteranimate", function() {
				if (c.dom) {
					c.hide();
					c.clearOpacity();
					c.setPositioning(e)
				}
			})
		};
		c.animate(Ext.applyIf(d || {}, {
			duration : 500,
			easing : "ease-out",
			listeners : {
				beforeanimate : {
					fn : b
				}
			}
		}));
		return c
	},
	highlight : function(d, b) {
		var i = this, e = i.dom, k = {}, h, l, g, c, a, j;
		b = b || {};
		c = b.listeners || {};
		g = b.attr || "backgroundColor";
		k[g] = d || "ffff9c";
		if (!b.to) {
			l = {};
			l[g] = b.endColor || i.getColor(g, "ffffff", "")
		} else {
			l = b.to
		}
		b.listeners = Ext.apply(Ext.apply({}, c), {
			beforeanimate : function() {
				h = e.style[g];
				i.clearOpacity();
				i.show();
				a = c.beforeanimate;
				if (a) {
					j = a.fn || a;
					return j.apply(a.scope || c.scope || window, arguments)
				}
			},
			afteranimate : function() {
				if (e) {
					e.style[g] = h
				}
				a = c.afteranimate;
				if (a) {
					j = a.fn || a;
					j.apply(a.scope || c.scope || window, arguments)
				}
			}
		});
		i.animate(Ext.apply({}, b, {
			duration : 1000,
			easing : "ease-in",
			from : k,
			to : l
		}));
		return i
	},
	pause : function(a) {
		var b = this;
		Ext.fx.Manager.setFxDefaults(b.id, {
			delay : a
		});
		return b
	},
	fadeIn : function(a) {
		this.animate(Ext.apply({}, a, {
			opacity : 1
		}));
		return this
	},
	fadeOut : function(a) {
		this.animate(Ext.apply({}, a, {
			opacity : 0
		}));
		return this
	},
	scale : function(a, b, c) {
		this.animate(Ext.apply({}, c, {
			width : a,
			height : b
		}));
		return this
	},
	shift : function(a) {
		this.animate(a);
		return this
	}
});
Ext.applyIf(Ext.Element, {
	unitRe : /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
	camelRe : /(-[a-z])/gi,
	opacityRe : /alpha\(opacity=(.*)\)/i,
	cssRe : /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
	propertyCache : {},
	defaultUnit : "px",
	borders : {
		l : "border-left-width",
		r : "border-right-width",
		t : "border-top-width",
		b : "border-bottom-width"
	},
	paddings : {
		l : "padding-left",
		r : "padding-right",
		t : "padding-top",
		b : "padding-bottom"
	},
	margins : {
		l : "margin-left",
		r : "margin-right",
		t : "margin-top",
		b : "margin-bottom"
	},
	addUnits : Ext.Element.prototype.addUnits,
	parseBox : function(b) {
		if (Ext.isObject(b)) {
			return {
				top : b.top || 0,
				right : b.right || 0,
				bottom : b.bottom || 0,
				left : b.left || 0
			}
		} else {
			if (typeof b != "string") {
				b = b.toString()
			}
			var c = b.split(" "), a = c.length;
			if (a == 1) {
				c[1] = c[2] = c[3] = c[0]
			} else {
				if (a == 2) {
					c[2] = c[0];
					c[3] = c[1]
				} else {
					if (a == 3) {
						c[3] = c[1]
					}
				}
			}
			return {
				top : parseFloat(c[0]) || 0,
				right : parseFloat(c[1]) || 0,
				bottom : parseFloat(c[2]) || 0,
				left : parseFloat(c[3]) || 0
			}
		}
	},
	unitizeBox : function(c, b) {
		var a = this.addUnits, d = this.parseBox(c);
		return a(d.top, b) + " " + a(d.right, b) + " " + a(d.bottom, b) + " "
				+ a(d.left, b)
	},
	camelReplaceFn : function(b, c) {
		return c.charAt(1).toUpperCase()
	},
	normalize : function(a) {
		if (a == "float") {
			a = Ext.supports.Float ? "cssFloat" : "styleFloat"
		}
		return this.propertyCache[a]
				|| (this.propertyCache[a] = a.replace(this.camelRe,
						this.camelReplaceFn))
	},
	getDocumentHeight : function() {
		return Math.max(!Ext.isStrict
				? document.body.scrollHeight
				: document.documentElement.scrollHeight, this
				.getViewportHeight())
	},
	getDocumentWidth : function() {
		return Math
				.max(!Ext.isStrict
						? document.body.scrollWidth
						: document.documentElement.scrollWidth, this
						.getViewportWidth())
	},
	getViewportHeight : function() {
		return window.innerHeight
	},
	getViewportWidth : function() {
		return window.innerWidth
	},
	getViewSize : function() {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	},
	getOrientation : function() {
		if (Ext.supports.OrientationChange) {
			return (window.orientation == 0) ? "portrait" : "landscape"
		}
		return (window.innerHeight > window.innerWidth)
				? "portrait"
				: "landscape"
	},
	fromPoint : function(a, b) {
		return Ext.get(document.elementFromPoint(a, b))
	},
	parseStyles : function(c) {
		var a = {}, b = this.cssRe, d;
		if (c) {
			b.lastIndex = 0;
			while ((d = b.exec(c))) {
				a[d[1]] = d[2]
			}
		}
		return a
	}
});
Ext.CompositeElementLite = function(b, a) {
	this.elements = [];
	this.add(b, a);
	this.el = new Ext.Element.Flyweight()
};
Ext.CompositeElementLite.prototype = {
	isComposite : true,
	getElement : function(a) {
		var b = this.el;
		b.dom = a;
		b.id = a.id;
		return b
	},
	transformElement : function(a) {
		return Ext.getDom(a)
	},
	getCount : function() {
		return this.elements.length
	},
	add : function(d, b) {
		var e = this, g = e.elements;
		if (!d) {
			return this
		}
		if (typeof d == "string") {
			d = Ext.Element.selectorFunction(d, b)
		} else {
			if (d.isComposite) {
				d = d.elements
			} else {
				if (!Ext.isIterable(d)) {
					d = [d]
				}
			}
		}
		for (var c = 0, a = d.length; c < a; ++c) {
			g.push(e.transformElement(d[c]))
		}
		return e
	},
	invoke : function(g, b) {
		var h = this, d = h.elements, a = d.length, j, c;
		for (c = 0; c < a; c++) {
			j = d[c];
			if (j) {
				Ext.Element.prototype[g].apply(h.getElement(j), b)
			}
		}
		return h
	},
	item : function(b) {
		var d = this, c = d.elements[b], a = null;
		if (c) {
			a = d.getElement(c)
		}
		return a
	},
	addListener : function(b, j, h, g) {
		var d = this.elements, a = d.length, c, k;
		for (c = 0; c < a; c++) {
			k = d[c];
			if (k) {
				Ext.EventManager.on(k, b, j, h || k, g)
			}
		}
		return this
	},
	each : function(g, d) {
		var h = this, c = h.elements, a = c.length, b, j;
		for (b = 0; b < a; b++) {
			j = c[b];
			if (j) {
				j = this.getElement(j);
				if (g.call(d || j, j, h, b) === false) {
					break
				}
			}
		}
		return h
	},
	fill : function(a) {
		var b = this;
		b.elements = [];
		b.add(a);
		return b
	},
	filter : function(a) {
		var b = [], d = this, c = Ext.isFunction(a) ? a : function(e) {
			return e.is(a)
		};
		d.each(function(h, e, g) {
			if (c(h, g) !== false) {
				b[b.length] = d.transformElement(h)
			}
		});
		d.elements = b;
		return d
	},
	indexOf : function(a) {
		return Ext.Array.indexOf(this.elements, this.transformElement(a))
	},
	replaceElement : function(e, c, a) {
		var b = !isNaN(e) ? e : this.indexOf(e), g;
		if (b > -1) {
			c = Ext.getDom(c);
			if (a) {
				g = this.elements[b];
				g.parentNode.insertBefore(c, g);
				Ext.removeNode(g)
			}
			Ext.Array.splice(this.elements, b, 1, c)
		}
		return this
	},
	clear : function() {
		this.elements = []
	}
};
Ext.CompositeElementLite.prototype.on = Ext.CompositeElementLite.prototype.addListener;
Ext.CompositeElementLite.importElementMethods = function() {
	var c, b = Ext.Element.prototype, a = Ext.CompositeElementLite.prototype;
	for (c in b) {
		if (typeof b[c] == "function") {
			(function(d) {
				a[d] = a[d] || function() {
					return this.invoke(d, arguments)
				}
			}).call(a, c)
		}
	}
};
Ext.CompositeElementLite.importElementMethods();
if (Ext.DomQuery) {
	Ext.Element.selectorFunction = Ext.DomQuery.select
}
Ext.Element.select = function(a, b) {
	var c;
	if (typeof a == "string") {
		c = Ext.Element.selectorFunction(a, b)
	} else {
		if (a.length !== undefined) {
			c = a
		} else {
		}
	}
	return new Ext.CompositeElementLite(c)
};
Ext.select = Ext.Element.select;
Ext.util.DelayedTask = function(d, c, a) {
	var e = this, g, b = function() {
		clearInterval(g);
		g = null;
		d.apply(c, a || [])
	};
	this.delay = function(i, k, j, h) {
		e.cancel();
		d = k || d;
		c = j || c;
		a = h || a;
		g = setInterval(b, i)
	};
	this.cancel = function() {
		if (g) {
			clearInterval(g);
			g = null
		}
	}
};
Ext.require("Ext.util.DelayedTask", function() {
	Ext.util.Event = Ext.extend(Object, (function() {
		function b(e, g, h, d) {
			g.task = new Ext.util.DelayedTask();
			return function() {
				g.task.delay(h.buffer, e, d, Ext.Array.toArray(arguments))
			}
		}
		function a(e, g, h, d) {
			return function() {
				var i = new Ext.util.DelayedTask();
				if (!g.tasks) {
					g.tasks = []
				}
				g.tasks.push(i);
				i.delay(h.delay || 10, e, d, Ext.Array.toArray(arguments))
			}
		}
		function c(e, g, h, d) {
			return function() {
				g.ev.removeListener(g.fn, d);
				return e.apply(d, arguments)
			}
		}
		return {
			isEvent : true,
			constructor : function(e, d) {
				this.name = d;
				this.observable = e;
				this.listeners = []
			},
			addListener : function(g, e, d) {
				var h = this, i;
				e = e || h.observable;
				if (!h.isListening(g, e)) {
					i = h.createListener(g, e, d);
					if (h.firing) {
						h.listeners = h.listeners.slice(0)
					}
					h.listeners.push(i)
				}
			},
			createListener : function(g, e, i) {
				i = i || {};
				e = e || this.observable;
				var h = {
					fn : g,
					scope : e,
					o : i,
					ev : this
				}, d = g;
				if (i.single) {
					d = c(d, h, i, e)
				}
				if (i.delay) {
					d = a(d, h, i, e)
				}
				if (i.buffer) {
					d = b(d, h, i, e)
				}
				h.fireFn = d;
				return h
			},
			findListener : function(j, h) {
				var g = this.listeners, d = g.length, k, e;
				while (d--) {
					k = g[d];
					if (k) {
						e = k.scope;
						if (k.fn == j && (e == h || e == this.observable)) {
							return d
						}
					}
				}
				return -1
			},
			isListening : function(e, d) {
				return this.findListener(e, d) !== -1
			},
			removeListener : function(h, g) {
				var i = this, e, j, d;
				e = i.findListener(h, g);
				if (e != -1) {
					j = i.listeners[e];
					if (i.firing) {
						i.listeners = i.listeners.slice(0)
					}
					if (j.task) {
						j.task.cancel();
						delete j.task
					}
					d = j.tasks && j.tasks.length;
					if (d) {
						while (d--) {
							j.tasks[d].cancel()
						}
						delete j.tasks
					}
					Ext.Array.erase(i.listeners, e, 1);
					return true
				}
				return false
			},
			clearListeners : function() {
				var e = this.listeners, d = e.length;
				while (d--) {
					this.removeListener(e[d].fn, e[d].scope)
				}
			},
			fire : function() {
				var j = this, g = j.listeners, h = g.length, e, d, k;
				if (h > 0) {
					j.firing = true;
					for (e = 0; e < h; e++) {
						k = g[e];
						d = arguments.length ? Array.prototype.slice.call(
								arguments, 0) : [];
						if (k.o) {
							d.push(k.o)
						}
						if (k
								&& k.fireFn.apply(k.scope || j.observable, d) === false) {
							return (j.firing = false)
						}
					}
				}
				j.firing = false;
				return true
			}
		}
	})())
});
Ext.EventManager = {
	hasBoundOnReady : false,
	hasFiredReady : false,
	readyTimeout : null,
	hasOnReadyStateChange : false,
	readyEvent : new Ext.util.Event(),
	checkReadyState : function() {
		var a = Ext.EventManager;
		if (window.attachEvent) {
			if (window != top) {
				return false
			}
			try {
				document.documentElement.doScroll("left")
			} catch (b) {
				return false
			}
			a.fireDocReady();
			return true
		}
		if (document.readyState == "complete") {
			a.fireDocReady();
			return true
		}
		a.readyTimeout = setTimeout(arguments.callee, 2);
		return false
	},
	bindReadyEvent : function() {
		var a = Ext.EventManager;
		if (a.hasBoundOnReady) {
			return
		}
		if (document.addEventListener) {
			document
					.addEventListener("DOMContentLoaded", a.fireDocReady, false);
			window.addEventListener("load", a.fireDocReady, false)
		} else {
			if (!a.checkReadyState()) {
				document.attachEvent("onreadystatechange", a.checkReadyState);
				a.hasOnReadyStateChange = true
			}
			window.attachEvent("onload", a.fireDocReady, false)
		}
		a.hasBoundOnReady = true
	},
	fireDocReady : function() {
		var a = Ext.EventManager;
		if (!a.hasFiredReady) {
			a.hasFiredReady = true;
			if (document.addEventListener) {
				document.removeEventListener("DOMContentLoaded",
						a.fireDocReady, false);
				window.removeEventListener("load", a.fireDocReady, false)
			} else {
				if (a.readyTimeout !== null) {
					clearTimeout(a.readyTimeout)
				}
				if (a.hasOnReadyStateChange) {
					document.detachEvent("onreadystatechange",
							a.checkReadyState)
				}
				window.detachEvent("onload", a.fireDocReady)
			}
			Ext.supports.init()
		}
		if (!Ext.isReady) {
			Ext.isReady = true;
			a.onWindowUnload();
			a.readyEvent.fire()
		}
	},
	onDocumentReady : function(c, b, a) {
		a = a || {};
		var d = Ext.EventManager, e = d.readyEvent;
		a.single = true;
		if (Ext.isReady) {
			e.addListener(c, b, a);
			e.fire()
		} else {
			a.delay = a.delay || 1;
			e.addListener(c, b, a);
			d.bindReadyEvent()
		}
	},
	stoppedMouseDownEvent : new Ext.util.Event(),
	propRe : /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|freezeEvent)$/,
	getId : function(a) {
		var b = false, c;
		a = Ext.getDom(a);
		if (a === document || a === window) {
			c = a === document ? Ext.documentId : Ext.windowId
		} else {
			c = Ext.id(a)
		}
		if (a && (a.getElementById || a.navigator)) {
			b = true
		}
		if (!Ext.cache[c]) {
			Ext.Element.addToCache(new Ext.Element(a), c);
			if (b) {
				Ext.cache[c].skipGarbageCollection = true
			}
		}
		return c
	},
	prepareListenerConfig : function(d, b, h) {
		var e = this, i = e.propRe, c, g, a;
		for (c in b) {
			if (b.hasOwnProperty(c)) {
				if (!i.test(c)) {
					g = b[c];
					if (Ext.isFunction(g)) {
						a = [d, c, g, b.scope, b]
					} else {
						a = [d, c, g.fn, g.scope, g]
					}
					if (h === true) {
						e.removeListener.apply(this, a)
					} else {
						e.addListener.apply(e, a)
					}
				}
			}
		}
	},
	normalizeEvent : function(a, b) {
		if (/mouseenter|mouseleave/.test(a) && !Ext.supports.MouseEnterLeave) {
			if (b) {
				b = Ext.Function.createInterceptor(b, this.contains, this)
			}
			a = a == "mouseenter" ? "mouseover" : "mouseout"
		} else {
			if (a == "mousewheel" && !Ext.supports.MouseWheel && !Ext.isOpera) {
				a = "DOMMouseScroll"
			}
		}
		return {
			eventName : a,
			fn : b
		}
	},
	contains : function(b) {
		var a = b.browserEvent.currentTarget, c = this.getRelatedTarget(b);
		if (a && a.firstChild) {
			while (c) {
				if (c === a) {
					return false
				}
				c = c.parentNode;
				if (c && (c.nodeType != 1)) {
					c = null
				}
			}
		}
		return true
	},
	addListener : function(c, a, g, e, b) {
		if (typeof a !== "string") {
			this.prepareListenerConfig(c, a);
			return
		}
		var h = Ext.getDom(c), i, d;
		b = b || {};
		i = this.normalizeEvent(a, g);
		d = this.createListenerWrap(h, a, i.fn, e, b);
		if (h.attachEvent) {
			h.attachEvent("on" + i.eventName, d)
		} else {
			h.addEventListener(i.eventName, d, b.capture || false)
		}
		if (h == document && a == "mousedown") {
			this.stoppedMouseDownEvent.addListener(d)
		}
		this.getEventListenerCache(h, a).push({
			fn : g,
			wrap : d,
			scope : e
		})
	},
	removeListener : function(h, l, m, o) {
		if (typeof l !== "string") {
			this.prepareListenerConfig(h, l, true);
			return
		}
		var g = Ext.getDom(h), a = this.getEventListenerCache(g, l), n = this
				.normalizeEvent(l).eventName, k = a.length, e, c, b, d;
		while (k--) {
			c = a[k];
			if (c && (!m || c.fn == m) && (!o || c.scope === o)) {
				b = c.wrap;
				if (b.task) {
					clearTimeout(b.task);
					delete b.task
				}
				e = b.tasks && b.tasks.length;
				if (e) {
					while (e--) {
						clearTimeout(b.tasks[e])
					}
					delete b.tasks
				}
				if (g.detachEvent) {
					g.detachEvent("on" + n, b)
				} else {
					g.removeEventListener(n, b, false)
				}
				if (b && g == document && l == "mousedown") {
					this.stoppedMouseDownEvent.removeListener(b)
				}
				Ext.Array.erase(a, k, 1)
			}
		}
	},
	removeAll : function(b) {
		var d = Ext.getDom(b), a, c;
		if (!d) {
			return
		}
		a = this.getElementEventCache(d);
		for (c in a) {
			if (a.hasOwnProperty(c)) {
				this.removeListener(d, c)
			}
		}
		Ext.cache[d.id].events = {}
	},
	purgeElement : function(d, b) {
		var e = Ext.getDom(d), c = 0, a;
		if (b) {
			this.removeListener(e, b)
		} else {
			this.removeAll(e)
		}
		if (e && e.childNodes) {
			for (a = d.childNodes.length; c < a; c++) {
				this.purgeElement(d.childNodes[c], b)
			}
		}
	},
	createListenerWrap : function(i, b, e, d, a) {
		a = a || {};
		var g, h;
		return function c(k, j) {
			if (!h) {
				g = ["if(!Ext) {return;}"];
				if (a.buffer || a.delay || a.freezeEvent) {
					g.push("e = new Ext.EventObjectImpl(e, "
							+ (a.freezeEvent ? "true" : "false") + ");")
				} else {
					g.push("e = Ext.EventObject.setEvent(e);")
				}
				if (a.delegate) {
					g.push('var t = e.getTarget("' + a.delegate + '", this);');
					g.push("if(!t) {return;}")
				} else {
					g.push("var t = e.target;")
				}
				if (a.target) {
					g.push("if(e.target !== options.target) {return;}")
				}
				if (a.stopEvent) {
					g.push("e.stopEvent();")
				} else {
					if (a.preventDefault) {
						g.push("e.preventDefault();")
					}
					if (a.stopPropagation) {
						g.push("e.stopPropagation();")
					}
				}
				if (a.normalized === false) {
					g.push("e = e.browserEvent;")
				}
				if (a.buffer) {
					g.push("(wrap.task && clearTimeout(wrap.task));");
					g.push("wrap.task = setTimeout(function(){")
				}
				if (a.delay) {
					g.push("wrap.tasks = wrap.tasks || [];");
					g.push("wrap.tasks.push(setTimeout(function(){")
				}
				g.push("fn.call(scope || dom, e, t, options);");
				if (a.single) {
					g
							.push("Ext.EventManager.removeListener(dom, ename, fn, scope);")
				}
				if (a.delay) {
					g.push("}, " + a.delay + "));")
				}
				if (a.buffer) {
					g.push("}, " + a.buffer + ");")
				}
				h = Ext.functionFactory("e", "options", "fn", "scope", "ename",
						"dom", "wrap", "args", g.join("\n"))
			}
			h.call(i, k, a, e, d, b, i, c, j)
		}
	},
	getEventListenerCache : function(c, a) {
		if (!c) {
			return []
		}
		var b = this.getElementEventCache(c);
		return b[a] || (b[a] = [])
	},
	getElementEventCache : function(b) {
		if (!b) {
			return {}
		}
		var a = Ext.cache[this.getId(b)];
		return a.events || (a.events = {})
	},
	mouseLeaveRe : /(mouseout|mouseleave)/,
	mouseEnterRe : /(mouseover|mouseenter)/,
	stopEvent : function(a) {
		this.stopPropagation(a);
		this.preventDefault(a)
	},
	stopPropagation : function(a) {
		a = a.browserEvent || a;
		if (a.stopPropagation) {
			a.stopPropagation()
		} else {
			a.cancelBubble = true
		}
	},
	preventDefault : function(a) {
		a = a.browserEvent || a;
		if (a.preventDefault) {
			a.preventDefault()
		} else {
			a.returnValue = false;
			try {
				if (a.ctrlKey || a.keyCode > 111 && a.keyCode < 124) {
					a.keyCode = -1
				}
			} catch (b) {
			}
		}
	},
	getRelatedTarget : function(a) {
		a = a.browserEvent || a;
		var b = a.relatedTarget;
		if (!b) {
			if (this.mouseLeaveRe.test(a.type)) {
				b = a.toElement
			} else {
				if (this.mouseEnterRe.test(a.type)) {
					b = a.fromElement
				}
			}
		}
		return this.resolveTextNode(b)
	},
	getPageX : function(a) {
		return this.getXY(a)[0]
	},
	getPageY : function(a) {
		return this.getXY(a)[1]
	},
	getPageXY : function(c) {
		c = c.browserEvent || c;
		var b = c.pageX, e = c.pageY, d = document.documentElement, a = document.body;
		if (!b && b !== 0) {
			b = c.clientX + (d && d.scrollLeft || a && a.scrollLeft || 0)
					- (d && d.clientLeft || a && a.clientLeft || 0);
			e = c.clientY + (d && d.scrollTop || a && a.scrollTop || 0)
					- (d && d.clientTop || a && a.clientTop || 0)
		}
		return [b, e]
	},
	getTarget : function(a) {
		a = a.browserEvent || a;
		return this.resolveTextNode(a.target || a.srcElement)
	},
	resolveTextNode : Ext.isGecko ? function(b) {
		if (!b) {
			return
		}
		var a = HTMLElement.prototype.toString.call(b);
		if (a == "[xpconnect wrapped native prototype]"
				|| a == "[object XULElement]") {
			return
		}
		return b.nodeType == 3 ? b.parentNode : b
	} : function(a) {
		return a && a.nodeType == 3 ? a.parentNode : a
	},
	curWidth : 0,
	curHeight : 0,
	onWindowResize : function(d, c, b) {
		var a = this.resizeEvent;
		if (!a) {
			this.resizeEvent = a = new Ext.util.Event();
			this.on(window, "resize", this.fireResize, this, {
				buffer : 100
			})
		}
		a.addListener(d, c, b)
	},
	fireResize : function() {
		var c = this, a = Ext.Element.getViewWidth(), b = Ext.Element
				.getViewHeight();
		if (c.curHeight != b || c.curWidth != a) {
			c.curHeight = b;
			c.curWidth = a;
			c.resizeEvent.fire(a, b)
		}
	},
	removeResizeListener : function(b, a) {
		if (this.resizeEvent) {
			this.resizeEvent.removeListener(b, a)
		}
	},
	onWindowUnload : function() {
		var a = this.unloadEvent;
		if (!a) {
			this.unloadEvent = a = new Ext.util.Event();
			this.addListener(window, "unload", this.fireUnload, this)
		}
	},
	fireUnload : function() {
		try {
			this.removeUnloadListener();
			if (Ext.isGecko3) {
				var h = Ext.ComponentQuery.query("gridview"), b = 0, d = h.length;
				for (; b < d; b++) {
					h[b].scrollToTop()
				}
			}
			var c, a = Ext.cache;
			for (c in a) {
				if (a.hasOwnProperty(c)) {
					Ext.EventManager.removeAll(c)
				}
			}
		} catch (g) {
		}
	},
	removeUnloadListener : function() {
		if (this.unloadEvent) {
			this.removeListener(window, "unload", this.fireUnload)
		}
	},
	useKeyDown : Ext.isWebKit
			? parseInt(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1], 10) >= 525
			: !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera),
	getKeyEvent : function() {
		return this.useKeyDown ? "keydown" : "keypress"
	}
};
Ext.onReady = function(c, b, a) {
	Ext.Loader.onReady(c, b, true, a)
};
Ext.onDocumentReady = Ext.EventManager.onDocumentReady;
Ext.EventManager.on = Ext.EventManager.addListener;
Ext.EventManager.un = Ext.EventManager.removeListener;
(function() {
	var a = function() {
		var g = document.body || document.getElementsByTagName("body")[0], e = Ext.baseCSSPrefix, c = [e
				+ "body"], b = [], d;
		if (!g) {
			return false
		}
		d = g.parentNode;
		function h(i) {
			c.push(e + i)
		}
		if (Ext.isIE) {
			h("ie");
			if (Ext.isIE6) {
				h("ie6")
			} else {
				h("ie7p");
				if (Ext.isIE7) {
					h("ie7")
				} else {
					h("ie8p");
					if (Ext.isIE8) {
						h("ie8")
					} else {
						h("ie9p");
						if (Ext.isIE9) {
							h("ie9")
						}
					}
				}
			}
			if (Ext.isIE6 || Ext.isIE7) {
				h("ie7m")
			}
			if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
				h("ie8m")
			}
			if (Ext.isIE7 || Ext.isIE8) {
				h("ie78")
			}
		}
		if (Ext.isGecko) {
			h("gecko");
			if (Ext.isGecko3) {
				h("gecko3")
			}
			if (Ext.isGecko4) {
				h("gecko4")
			}
			if (Ext.isGecko5) {
				h("gecko5")
			}
		}
		if (Ext.isOpera) {
			h("opera")
		}
		if (Ext.isWebKit) {
			h("webkit")
		}
		if (Ext.isSafari) {
			h("safari");
			if (Ext.isSafari2) {
				h("safari2")
			}
			if (Ext.isSafari3) {
				h("safari3")
			}
			if (Ext.isSafari4) {
				h("safari4")
			}
			if (Ext.isSafari5) {
				h("safari5")
			}
		}
		if (Ext.isChrome) {
			h("chrome")
		}
		if (Ext.isMac) {
			h("mac")
		}
		if (Ext.isLinux) {
			h("linux")
		}
		if (!Ext.supports.CSS3BorderRadius) {
			h("nbr")
		}
		if (!Ext.supports.CSS3LinearGradient) {
			h("nlg")
		}
		if (!Ext.scopeResetCSS) {
			h("reset")
		}
		if (d) {
			if (Ext.isStrict && (Ext.isIE6 || Ext.isIE7)) {
				Ext.isBorderBox = false
			} else {
				Ext.isBorderBox = true
			}
			b.push(e + (Ext.isBorderBox ? "border-box" : "strict"));
			if (!Ext.isStrict) {
				b.push(e + "quirks")
			}
			Ext.fly(d, "_internal").addCls(b)
		}
		Ext.fly(g, "_internal").addCls(c);
		return true
	};
	Ext.onReady(a)
})();
Ext.define("Ext.EventObjectImpl", {
	uses : ["Ext.util.Point"],
	BACKSPACE : 8,
	TAB : 9,
	NUM_CENTER : 12,
	ENTER : 13,
	RETURN : 13,
	SHIFT : 16,
	CTRL : 17,
	ALT : 18,
	PAUSE : 19,
	CAPS_LOCK : 20,
	ESC : 27,
	SPACE : 32,
	PAGE_UP : 33,
	PAGE_DOWN : 34,
	END : 35,
	HOME : 36,
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40,
	PRINT_SCREEN : 44,
	INSERT : 45,
	DELETE : 46,
	ZERO : 48,
	ONE : 49,
	TWO : 50,
	THREE : 51,
	FOUR : 52,
	FIVE : 53,
	SIX : 54,
	SEVEN : 55,
	EIGHT : 56,
	NINE : 57,
	A : 65,
	B : 66,
	C : 67,
	D : 68,
	E : 69,
	F : 70,
	G : 71,
	H : 72,
	I : 73,
	J : 74,
	K : 75,
	L : 76,
	M : 77,
	N : 78,
	O : 79,
	P : 80,
	Q : 81,
	R : 82,
	S : 83,
	T : 84,
	U : 85,
	V : 86,
	W : 87,
	X : 88,
	Y : 89,
	Z : 90,
	CONTEXT_MENU : 93,
	NUM_ZERO : 96,
	NUM_ONE : 97,
	NUM_TWO : 98,
	NUM_THREE : 99,
	NUM_FOUR : 100,
	NUM_FIVE : 101,
	NUM_SIX : 102,
	NUM_SEVEN : 103,
	NUM_EIGHT : 104,
	NUM_NINE : 105,
	NUM_MULTIPLY : 106,
	NUM_PLUS : 107,
	NUM_MINUS : 109,
	NUM_PERIOD : 110,
	NUM_DIVISION : 111,
	F1 : 112,
	F2 : 113,
	F3 : 114,
	F4 : 115,
	F5 : 116,
	F6 : 117,
	F7 : 118,
	F8 : 119,
	F9 : 120,
	F10 : 121,
	F11 : 122,
	F12 : 123,
	WHEEL_SCALE : (function() {
		var a;
		if (Ext.isGecko) {
			a = 3
		} else {
			if (Ext.isMac) {
				if (Ext.isSafari && Ext.webKitVersion >= 532) {
					a = 120
				} else {
					a = 12
				}
				a *= 3
			} else {
				a = 120
			}
		}
		return a
	})(),
	clickRe : /(dbl)?click/,
	safariKeys : {
		3 : 13,
		63234 : 37,
		63235 : 39,
		63232 : 38,
		63233 : 40,
		63276 : 33,
		63277 : 34,
		63272 : 46,
		63273 : 36,
		63275 : 35
	},
	btnMap : Ext.isIE ? {
		1 : 0,
		4 : 1,
		2 : 2
	} : {
		0 : 0,
		1 : 1,
		2 : 2
	},
	constructor : function(a, b) {
		if (a) {
			this.setEvent(a.browserEvent || a, b)
		}
	},
	setEvent : function(d, e) {
		var c = this, b, a;
		if (d == c || (d && d.browserEvent)) {
			return d
		}
		c.browserEvent = d;
		if (d) {
			b = d.button ? c.btnMap[d.button] : (d.which ? d.which - 1 : -1);
			if (c.clickRe.test(d.type) && b == -1) {
				b = 0
			}
			a = {
				type : d.type,
				button : b,
				shiftKey : d.shiftKey,
				ctrlKey : d.ctrlKey || d.metaKey || false,
				altKey : d.altKey,
				keyCode : d.keyCode,
				charCode : d.charCode,
				target : Ext.EventManager.getTarget(d),
				relatedTarget : Ext.EventManager.getRelatedTarget(d),
				currentTarget : d.currentTarget,
				xy : (e ? c.getXY() : null)
			}
		} else {
			a = {
				button : -1,
				shiftKey : false,
				ctrlKey : false,
				altKey : false,
				keyCode : 0,
				charCode : 0,
				target : null,
				xy : [0, 0]
			}
		}
		Ext.apply(c, a);
		return c
	},
	stopEvent : function() {
		this.stopPropagation();
		this.preventDefault()
	},
	preventDefault : function() {
		if (this.browserEvent) {
			Ext.EventManager.preventDefault(this.browserEvent)
		}
	},
	stopPropagation : function() {
		var a = this.browserEvent;
		if (a) {
			if (a.type == "mousedown") {
				Ext.EventManager.stoppedMouseDownEvent.fire(this)
			}
			Ext.EventManager.stopPropagation(a)
		}
	},
	getCharCode : function() {
		return this.charCode || this.keyCode
	},
	getKey : function() {
		return this.normalizeKey(this.keyCode || this.charCode)
	},
	normalizeKey : function(a) {
		return Ext.isWebKit ? (this.safariKeys[a] || a) : a
	},
	getPageX : function() {
		return this.getX()
	},
	getPageY : function() {
		return this.getY()
	},
	getX : function() {
		return this.getXY()[0]
	},
	getY : function() {
		return this.getXY()[1]
	},
	getXY : function() {
		if (!this.xy) {
			this.xy = Ext.EventManager.getPageXY(this.browserEvent)
		}
		return this.xy
	},
	getTarget : function(b, c, a) {
		if (b) {
			return Ext.fly(this.target).findParent(b, c, a)
		}
		return a ? Ext.get(this.target) : this.target
	},
	getRelatedTarget : function(b, c, a) {
		if (b) {
			return Ext.fly(this.relatedTarget).findParent(b, c, a)
		}
		return a ? Ext.get(this.relatedTarget) : this.relatedTarget
	},
	correctWheelDelta : function(c) {
		var b = this.WHEEL_SCALE, a = Math.round(c / b);
		if (!a && c) {
			a = (c < 0) ? -1 : 1
		}
		return a
	},
	getWheelDeltas : function() {
		var d = this, c = d.browserEvent, b = 0, a = 0;
		if (Ext.isDefined(c.wheelDeltaX)) {
			b = c.wheelDeltaX;
			a = c.wheelDeltaY
		} else {
			if (c.wheelDelta) {
				a = c.wheelDelta
			} else {
				if (c.detail) {
					a = -c.detail;
					if (a > 100) {
						a = 3
					} else {
						if (a < -100) {
							a = -3
						}
					}
					if (Ext.isDefined(c.axis) && c.axis === c.HORIZONTAL_AXIS) {
						b = a;
						a = 0
					}
				}
			}
		}
		return {
			x : d.correctWheelDelta(b),
			y : d.correctWheelDelta(a)
		}
	},
	getWheelDelta : function() {
		var a = this.getWheelDeltas();
		return a.y
	},
	within : function(d, e, b) {
		if (d) {
			var c = e ? this.getRelatedTarget() : this.getTarget(), a;
			if (c) {
				a = Ext.fly(d).contains(c);
				if (!a && b) {
					a = c == Ext.getDom(d)
				}
				return a
			}
		}
		return false
	},
	isNavKeyPress : function() {
		var b = this, a = this.normalizeKey(b.keyCode);
		return (a >= 33 && a <= 40) || a == b.RETURN || a == b.TAB
				|| a == b.ESC
	},
	isSpecialKey : function() {
		var a = this.normalizeKey(this.keyCode);
		return (this.type == "keypress" && this.ctrlKey)
				|| this.isNavKeyPress() || (a == this.BACKSPACE)
				|| (a >= 16 && a <= 20) || (a >= 44 && a <= 46)
	},
	getPoint : function() {
		var a = this.getXY();
		return Ext.create("Ext.util.Point", a[0], a[1])
	},
	hasModifier : function() {
		return this.ctrlKey || this.altKey || this.shiftKey || this.metaKey
	},
	injectEvent : function() {
		var d, e = {};
		if (!Ext.isIE && document.createEvent) {
			d = {
				createHtmlEvent : function(k, i, h, g) {
					var j = k.createEvent("HTMLEvents");
					j.initEvent(i, h, g);
					return j
				},
				createMouseEvent : function(u, s, m, l, o, k, i, j, g, r, q, n,
						p) {
					var h = u.createEvent("MouseEvents"), t = u.defaultView
							|| window;
					if (h.initMouseEvent) {
						h.initMouseEvent(s, m, l, t, o, k, i, k, i, j, g, r, q,
								n, p)
					} else {
						h = u.createEvent("UIEvents");
						h.initEvent(s, m, l);
						h.view = t;
						h.detail = o;
						h.screenX = k;
						h.screenY = i;
						h.clientX = k;
						h.clientY = i;
						h.ctrlKey = j;
						h.altKey = g;
						h.metaKey = q;
						h.shiftKey = r;
						h.button = n;
						h.relatedTarget = p
					}
					return h
				},
				createUIEvent : function(m, k, i, h, j) {
					var l = m.createEvent("UIEvents"), g = m.defaultView
							|| window;
					l.initUIEvent(k, i, h, g, j);
					return l
				},
				fireEvent : function(i, g, h) {
					i.dispatchEvent(h)
				},
				fixTarget : function(g) {
					if (g == window && !g.dispatchEvent) {
						return document
					}
					return g
				}
			}
		} else {
			if (document.createEventObject) {
				var c = {
					0 : 1,
					1 : 4,
					2 : 2
				};
				d = {
					createHtmlEvent : function(k, i, h, g) {
						var j = k.createEventObject();
						j.bubbles = h;
						j.cancelable = g;
						return j
					},
					createMouseEvent : function(t, s, m, l, o, k, i, j, g, r,
							q, n, p) {
						var h = t.createEventObject();
						h.bubbles = m;
						h.cancelable = l;
						h.detail = o;
						h.screenX = k;
						h.screenY = i;
						h.clientX = k;
						h.clientY = i;
						h.ctrlKey = j;
						h.altKey = g;
						h.shiftKey = r;
						h.metaKey = q;
						h.button = c[n] || n;
						h.relatedTarget = p;
						return h
					},
					createUIEvent : function(l, j, h, g, i) {
						var k = l.createEventObject();
						k.bubbles = h;
						k.cancelable = g;
						return k
					},
					fireEvent : function(i, g, h) {
						i.fireEvent("on" + g, h)
					},
					fixTarget : function(g) {
						if (g == document) {
							return document.documentElement
						}
						return g
					}
				}
			}
		}
		Ext.Object.each({
			load : [false, false],
			unload : [false, false],
			select : [true, false],
			change : [true, false],
			submit : [true, true],
			reset : [true, false],
			resize : [true, false],
			scroll : [true, false]
		}, function(i, j) {
			var h = j[0], g = j[1];
			e[i] = function(m, k) {
				var l = d.createHtmlEvent(i, h, g);
				d.fireEvent(m, i, l)
			}
		});
		function b(i, h) {
			var g = (i != "mousemove");
			return function(m, j) {
				var l = j.getXY(), k = d.createMouseEvent(m.ownerDocument, i,
						true, g, h, l[0], l[1], j.ctrlKey, j.altKey,
						j.shiftKey, j.metaKey, j.button, j.relatedTarget);
				d.fireEvent(m, i, k)
			}
		}
		Ext.each(["click", "dblclick", "mousedown", "mouseup", "mouseover",
				"mousemove", "mouseout"], function(g) {
			e[g] = b(g, 1)
		});
		Ext.Object.each({
			focusin : [true, false],
			focusout : [true, false],
			activate : [true, true],
			focus : [false, false],
			blur : [false, false]
		}, function(i, j) {
			var h = j[0], g = j[1];
			e[i] = function(m, k) {
				var l = d.createUIEvent(m.ownerDocument, i, h, g, 1);
				d.fireEvent(m, i, l)
			}
		});
		if (!d) {
			e = {};
			d = {
				fixTarget : function(g) {
					return g
				}
			}
		}
		function a(h, g) {
		}
		return function(j) {
			var i = this, h = e[i.type] || a, g = j ? (j.dom || j) : i
					.getTarget();
			g = d.fixTarget(g);
			h(g, i)
		}
	}()
}, function() {
	Ext.EventObject = new Ext.EventObjectImpl()
});
(function() {
	var e = document, d = null, b = e.compatMode == "CSS1Compat", h = Ext.Element, a = function(
			i) {
		if (!c) {
			c = new Ext.Element.Flyweight()
		}
		c.dom = i;
		return c
	}, c;
	if (!("activeElement" in e) && e.addEventListener) {
		e.addEventListener("focus", function(i) {
			if (i && i.target) {
				d = (i.target == e) ? null : i.target
			}
		}, true)
	}
	function g(j, k, i) {
		return function() {
			j.selectionStart = k;
			j.selectionEnd = i
		}
	}
	Ext.apply(h, {
		isAncestor : function(j, k) {
			var i = false;
			j = Ext.getDom(j);
			k = Ext.getDom(k);
			if (j && k) {
				if (j.contains) {
					return j.contains(k)
				} else {
					if (j.compareDocumentPosition) {
						return !!(j.compareDocumentPosition(k) & 16)
					} else {
						while ((k = k.parentNode)) {
							i = k == j || i
						}
					}
				}
			}
			return i
		},
		getActiveElement : function() {
			return e.activeElement || d
		},
		getRightMarginFixCleaner : function(n) {
			var k = Ext.supports, l = k.DisplayChangeInputSelectionBug, m = k.DisplayChangeTextAreaSelectionBug;
			if (l || m) {
				var o = e.activeElement || d, i = o && o.tagName, p, j;
				if ((m && i == "TEXTAREA")
						|| (l && i == "INPUT" && o.type == "text")) {
					if (h.isAncestor(n, o)) {
						p = o.selectionStart;
						j = o.selectionEnd;
						if (Ext.isNumber(p) && Ext.isNumber(j)) {
							return g(o, p, j)
						}
					}
				}
			}
			return Ext.emptyFn
		},
		getViewWidth : function(i) {
			return i ? h.getDocumentWidth() : h.getViewportWidth()
		},
		getViewHeight : function(i) {
			return i ? h.getDocumentHeight() : h.getViewportHeight()
		},
		getDocumentHeight : function() {
			return Math.max(!b
					? e.body.scrollHeight
					: e.documentElement.scrollHeight, h.getViewportHeight())
		},
		getDocumentWidth : function() {
			return Math.max(!b
					? e.body.scrollWidth
					: e.documentElement.scrollWidth, h.getViewportWidth())
		},
		getViewportHeight : function() {
			return Ext.isIE ? (Ext.isStrict
					? e.documentElement.clientHeight
					: e.body.clientHeight) : self.innerHeight
		},
		getViewportWidth : function() {
			return (!Ext.isStrict && !Ext.isOpera)
					? e.body.clientWidth
					: Ext.isIE
							? e.documentElement.clientWidth
							: self.innerWidth
		},
		getY : function(i) {
			return h.getXY(i)[1]
		},
		getX : function(i) {
			return h.getXY(i)[0]
		},
		getOffsetParent : function(j) {
			j = Ext.getDom(j);
			try {
				return j.offsetParent
			} catch (k) {
				var i = document.body;
				return (j == i) ? null : i
			}
		},
		getXY : function(k) {
			var j, r, t, w, l, m, v = 0, s = 0, u, i, n = (e.body || e.documentElement), q;
			k = Ext.getDom(k);
			if (k != n) {
				i = a(k).isStyle("position", "absolute");
				if (k.getBoundingClientRect) {
					try {
						t = k.getBoundingClientRect();
						u = a(document).getScroll();
						q = [Math.round(t.left + u.left),
								Math.round(t.top + u.top)]
					} catch (o) {
					}
				}
				if (!q) {
					for (j = k; j; j = h.getOffsetParent(j)) {
						r = a(j);
						v += j.offsetLeft;
						s += j.offsetTop;
						i = i || r.isStyle("position", "absolute");
						if (Ext.isGecko) {
							s += w = parseInt(r.getStyle("borderTopWidth"), 10)
									|| 0;
							v += l = parseInt(r.getStyle("borderLeftWidth"), 10)
									|| 0;
							if (j != k && !r.isStyle("overflow", "visible")) {
								v += l;
								s += w
							}
						}
					}
					if (Ext.isSafari && i) {
						v -= n.offsetLeft;
						s -= n.offsetTop
					}
					if (Ext.isGecko && !i) {
						m = a(n);
						v += parseInt(m.getStyle("borderLeftWidth"), 10) || 0;
						s += parseInt(m.getStyle("borderTopWidth"), 10) || 0
					}
					j = k.parentNode;
					while (j && j != n) {
						if (!Ext.isOpera
								|| (j.tagName != "TR" && !a(j).isStyle(
										"display", "inline"))) {
							v -= j.scrollLeft;
							s -= j.scrollTop
						}
						j = j.parentNode
					}
					q = [v, s]
				}
			}
			return q || [0, 0]
		},
		setXY : function(j, k) {
			(j = Ext.fly(j, "_setXY")).position();
			var l = j.translatePoints(k), i = j.dom.style, m;
			for (m in l) {
				if (!isNaN(l[m])) {
					i[m] = l[m] + "px"
				}
			}
		},
		setX : function(j, i) {
			h.setXY(j, [i, false])
		},
		setY : function(i, j) {
			h.setXY(i, [false, j])
		},
		serializeForm : function(o) {
			var n = o.elements || (document.forms[o] || Ext.getDom(o)).elements, i = false, m = encodeURIComponent, j, p = "", l, k;
			Ext.each(n, function(q) {
				j = q.name;
				l = q.type;
				if (!q.disabled && j) {
					if (/select-(one|multiple)/i.test(l)) {
						Ext.each(q.options, function(r) {
							if (r.selected) {
								k = r.hasAttribute
										? r.hasAttribute("value")
										: r.getAttributeNode("value").specified;
								p += Ext.String.format("{0}={1}&", m(j), m(k
										? r.value
										: r.text))
							}
						})
					} else {
						if (!(/file|undefined|reset|button/i.test(l))) {
							if (!(/radio|checkbox/i.test(l) && !q.checked)
									&& !(l == "submit" && i)) {
								p += m(j) + "=" + m(q.value) + "&";
								i = /submit/i.test(l)
							}
						}
					}
				}
			});
			return p.substr(0, p.length - 1)
		}
	})
})();
Ext.Element.addMethods((function() {
	var focusRe = /button|input|textarea|select|object/;
	return {
		monitorMouseLeave : function(delay, handler, scope) {
			var me = this, timer, listeners = {
				mouseleave : function(e) {
					timer = setTimeout(Ext.Function.bind(handler, scope || me,
							[e]), delay)
				},
				mouseenter : function() {
					clearTimeout(timer)
				},
				freezeEvent : true
			};
			me.on(listeners);
			return listeners
		},
		swallowEvent : function(eventName, preventDefault) {
			var me = this;
			function fn(e) {
				e.stopPropagation();
				if (preventDefault) {
					e.preventDefault()
				}
			}
			if (Ext.isArray(eventName)) {
				Ext.each(eventName, function(e) {
					me.on(e, fn)
				});
				return me
			}
			me.on(eventName, fn);
			return me
		},
		relayEvent : function(eventName, observable) {
			this.on(eventName, function(e) {
				observable.fireEvent(eventName, e)
			})
		},
		clean : function(forceReclean) {
			var me = this, dom = me.dom, n = dom.firstChild, nx, ni = -1;
			if (Ext.Element.data(dom, "isCleaned") && forceReclean !== true) {
				return me
			}
			while (n) {
				nx = n.nextSibling;
				if (n.nodeType == 3) {
					if (!(/\S/.test(n.nodeValue))) {
						dom.removeChild(n)
					} else {
						if (nx && nx.nodeType == 3) {
							n.appendData(Ext.String.trim(nx.data));
							dom.removeChild(nx);
							nx = n.nextSibling;
							n.nodeIndex = ++ni
						}
					}
				} else {
					Ext.fly(n).clean();
					n.nodeIndex = ++ni
				}
				n = nx
			}
			Ext.Element.data(dom, "isCleaned", true);
			return me
		},
		load : function(options) {
			this.getLoader().load(options);
			return this
		},
		getLoader : function() {
			var dom = this.dom, data = Ext.Element.data, loader = data(dom,
					"loader");
			if (!loader) {
				loader = Ext.create("Ext.ElementLoader", {
					target : this
				});
				data(dom, "loader", loader)
			}
			return loader
		},
		update : function(html, loadScripts, callback) {
			var me = this, id, dom, interval;
			if (!me.dom) {
				return me
			}
			html = html || "";
			dom = me.dom;
			if (loadScripts !== true) {
				dom.innerHTML = html;
				Ext.callback(callback, me);
				return me
			}
			id = Ext.id();
			html += '<span id="' + id + '"></span>';
			interval = setInterval(function() {
				if (!document.getElementById(id)) {
					return false
				}
				clearInterval(interval);
				var DOC = document, hd = DOC.getElementsByTagName("head")[0], re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig, srcRe = /\ssrc=([\'\"])(.*?)\1/i, typeRe = /\stype=([\'\"])(.*?)\1/i, match, attrs, srcMatch, typeMatch, el, s;
				while ((match = re.exec(html))) {
					attrs = match[1];
					srcMatch = attrs ? attrs.match(srcRe) : false;
					if (srcMatch && srcMatch[2]) {
						s = DOC.createElement("script");
						s.src = srcMatch[2];
						typeMatch = attrs.match(typeRe);
						if (typeMatch && typeMatch[2]) {
							s.type = typeMatch[2]
						}
						hd.appendChild(s)
					} else {
						if (match[2] && match[2].length > 0) {
							if (window.execScript) {
								window.execScript(match[2])
							} else {
								window.eval(match[2])
							}
						}
					}
				}
				el = DOC.getElementById(id);
				if (el) {
					Ext.removeNode(el)
				}
				Ext.callback(callback, me)
			}, 20);
			dom.innerHTML = html.replace(
					/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
			return me
		},
		removeAllListeners : function() {
			this.removeAnchor();
			Ext.EventManager.removeAll(this.dom);
			return this
		},
		getScopeParent : function() {
			var parent = this.dom.parentNode;
			return Ext.scopeResetCSS ? parent.parentNode : parent
		},
		createProxy : function(config, renderTo, matchBox) {
			config = (typeof config == "object") ? config : {
				tag : "div",
				cls : config
			};
			var me = this, proxy = renderTo ? Ext.DomHelper.append(renderTo,
					config, true) : Ext.DomHelper.insertBefore(me.dom, config,
					true);
			proxy.setVisibilityMode(Ext.Element.DISPLAY);
			proxy.hide();
			if (matchBox && me.setBox && me.getBox) {
				proxy.setBox(me.getBox())
			}
			return proxy
		},
		focusable : function() {
			var dom = this.dom, nodeName = dom.nodeName.toLowerCase(), canFocus = false, hasTabIndex = !isNaN(dom.tabIndex);
			if (!dom.disabled) {
				if (focusRe.test(nodeName)) {
					canFocus = true
				} else {
					canFocus = nodeName == "a"
							? dom.href || hasTabIndex
							: hasTabIndex
				}
			}
			return canFocus && this.isVisible(true)
		}
	}
})());
Ext.Element.prototype.clearListeners = Ext.Element.prototype.removeAllListeners;
Ext.Element.addMethods({
	getAnchorXY : function(e, l, q) {
		e = (e || "tl").toLowerCase();
		q = q || {};
		var k = this, b = k.dom == document.body || k.dom == document, n = q.width
				|| b ? Ext.Element.getViewWidth() : k.getWidth(), i = q.height
				|| b ? Ext.Element.getViewHeight() : k.getHeight(), p, a = Math.round, c = k
				.getXY(), m = k.getScroll(), j = b ? m.left : !l ? c[0] : 0, g = b
				? m.top
				: !l ? c[1] : 0, d = {
			c : [a(n * 0.5), a(i * 0.5)],
			t : [a(n * 0.5), 0],
			l : [0, a(i * 0.5)],
			r : [n, a(i * 0.5)],
			b : [a(n * 0.5), i],
			tl : [0, 0],
			bl : [0, i],
			br : [n, i],
			tr : [n, 0]
		};
		p = d[e];
		return [p[0] + j, p[1] + g]
	},
	anchorTo : function(b, h, c, a, k, l) {
		var i = this, e = i.dom, j = !Ext.isEmpty(k), d = function() {
			Ext.fly(e).alignTo(b, h, c, a);
			Ext.callback(l, Ext.fly(e))
		}, g = this.getAnchor();
		this.removeAnchor();
		Ext.apply(g, {
			fn : d,
			scroll : j
		});
		Ext.EventManager.onWindowResize(d, null);
		if (j) {
			Ext.EventManager.on(window, "scroll", d, null, {
				buffer : !isNaN(k) ? k : 50
			})
		}
		d.call(i);
		return i
	},
	removeAnchor : function() {
		var b = this, a = this.getAnchor();
		if (a && a.fn) {
			Ext.EventManager.removeResizeListener(a.fn);
			if (a.scroll) {
				Ext.EventManager.un(window, "scroll", a.fn)
			}
			delete a.fn
		}
		return b
	},
	getAnchor : function() {
		var b = Ext.Element.data, c = this.dom;
		if (!c) {
			return
		}
		var a = b(c, "_anchor");
		if (!a) {
			a = b(c, "_anchor", {})
		}
		return a
	},
	getAlignVector : function(c, a, h) {
		var d = this, b = {
			t : "top",
			l : "left",
			r : "right",
			b : "bottom"
		}, e = d.getRegion(), g;
		c = Ext.get(c);
		if (!c || !c.dom) {
		}
		g = c.getRegion()
	},
	getAlignToXY : function(g, A, B) {
		g = Ext.get(g);
		if (!g || !g.dom) {
		}
		B = B || [0, 0];
		A = (!A || A == "?" ? "tl-bl?" : (!(/-/).test(A) && A !== "" ? "tl-"
				+ A : A || "tl-bl")).toLowerCase();
		var K = this, H = K.dom, M, L, n, l, s, F, v, t = Ext.Element
				.getViewWidth()
				- 10, G = Ext.Element.getViewHeight() - 10, b, i, j, k, u, z, N = document, J = N.documentElement, q = N.body, E = (J.scrollLeft
				|| q.scrollLeft || 0)
				+ 5, D = (J.scrollTop || q.scrollTop || 0) + 5, I = false, e = "", a = "", C = A
				.match(/^([a-z]+)-([a-z]+)(\?)?$/);
		if (!C) {
		}
		e = C[1];
		a = C[2];
		I = !!C[3];
		M = K.getAnchorXY(e, true);
		L = g.getAnchorXY(a, false);
		n = L[0] - M[0] + B[0];
		l = L[1] - M[1] + B[1];
		if (I) {
			s = K.getWidth();
			F = K.getHeight();
			v = g.getRegion();
			b = e.charAt(0);
			i = e.charAt(e.length - 1);
			j = a.charAt(0);
			k = a.charAt(a.length - 1);
			u = ((b == "t" && j == "b") || (b == "b" && j == "t"));
			z = ((i == "r" && k == "l") || (i == "l" && k == "r"));
			if (n + s > t + E) {
				n = z ? v.left - s : t + E - s
			}
			if (n < E) {
				n = z ? v.right : E
			}
			if (l + F > G + D) {
				l = u ? v.top - F : G + D - F
			}
			if (l < D) {
				l = u ? v.bottom : D
			}
		}
		return [n, l]
	},
	alignTo : function(c, a, e, b) {
		var d = this;
		return d.setXY(d.getAlignToXY(c, a, e), d.anim && !!b
				? d.anim(b)
				: false)
	},
	adjustForConstraints : function(c, b) {
		var a = this.getConstrainVector(b, c);
		if (a) {
			c[0] += a[0];
			c[1] += a[1]
		}
		return c
	},
	getConstrainVector : function(d, b) {
		if (!(d instanceof Ext.util.Region)) {
			d = Ext.get(d).getViewRegion()
		}
		var g = this.getRegion(), a = [0, 0], e = this.shadow
				&& this.shadow.offset, c = false;
		if (b) {
			g.translateBy(b[0] - g.x, b[1] - g.y)
		}
		if (e) {
			d.adjust(0, -e, -e, e)
		}
		if (g.right > d.right) {
			c = true;
			a[0] = (d.right - g.right)
		}
		if (g.left + a[0] < d.left) {
			c = true;
			a[0] = (d.left - g.left)
		}
		if (g.bottom > d.bottom) {
			c = true;
			a[1] = (d.bottom - g.bottom)
		}
		if (g.top + a[1] < d.top) {
			c = true;
			a[1] = (d.top - g.top)
		}
		return c ? a : false
	},
	getCenterXY : function() {
		return this.getAlignToXY(document, "c-c")
	},
	center : function(a) {
		return this.alignTo(a || document, "c-c")
	}
});
(function() {
	var i = Ext.Element, a = "left", e = "right", c = "top", h = "bottom", g = "position", b = "static", d = "relative", j = "auto", k = "z-index";
	Ext.override(Ext.Element, {
		getX : function() {
			return i.getX(this.dom)
		},
		getY : function() {
			return i.getY(this.dom)
		},
		getXY : function() {
			return i.getXY(this.dom)
		},
		getOffsetsTo : function(l) {
			var n = this.getXY(), m = Ext.fly(l, "_internal").getXY();
			return [n[0] - m[0], n[1] - m[1]]
		},
		setX : function(l, m) {
			return this.setXY([l, this.getY()], m)
		},
		setY : function(m, l) {
			return this.setXY([this.getX(), m], l)
		},
		setLeft : function(l) {
			this.setStyle(a, this.addUnits(l));
			return this
		},
		setTop : function(l) {
			this.setStyle(c, this.addUnits(l));
			return this
		},
		setRight : function(l) {
			this.setStyle(e, this.addUnits(l));
			return this
		},
		setBottom : function(l) {
			this.setStyle(h, this.addUnits(l));
			return this
		},
		setXY : function(n, l) {
			var m = this;
			if (!l || !m.anim) {
				i.setXY(m.dom, n)
			} else {
				if (!Ext.isObject(l)) {
					l = {}
				}
				m.animate(Ext.applyIf({
					to : {
						x : n[0],
						y : n[1]
					}
				}, l))
			}
			return m
		},
		setLocation : function(l, n, m) {
			return this.setXY([l, n], m)
		},
		moveTo : function(l, n, m) {
			return this.setXY([l, n], m)
		},
		getLeft : function(l) {
			return !l ? this.getX() : parseInt(this.getStyle(a), 10) || 0
		},
		getRight : function(l) {
			var m = this;
			return !l ? m.getX() + m.getWidth() : (m.getLeft(true) + m
					.getWidth())
					|| 0
		},
		getTop : function(l) {
			return !l ? this.getY() : parseInt(this.getStyle(c), 10) || 0
		},
		getBottom : function(l) {
			var m = this;
			return !l ? m.getY() + m.getHeight() : (m.getTop(true) + m
					.getHeight())
					|| 0
		},
		position : function(p, o, l, n) {
			var m = this;
			if (!p && m.isStyle(g, b)) {
				m.setStyle(g, d)
			} else {
				if (p) {
					m.setStyle(g, p)
				}
			}
			if (o) {
				m.setStyle(k, o)
			}
			if (l || n) {
				m.setXY([l || false, n || false])
			}
		},
		clearPositioning : function(l) {
			l = l || "";
			this.setStyle({
				left : l,
				right : l,
				top : l,
				bottom : l,
				"z-index" : "",
				position : b
			});
			return this
		},
		getPositioning : function() {
			var m = this.getStyle(a);
			var n = this.getStyle(c);
			return {
				position : this.getStyle(g),
				left : m,
				right : m ? "" : this.getStyle(e),
				top : n,
				bottom : n ? "" : this.getStyle(h),
				"z-index" : this.getStyle(k)
			}
		},
		setPositioning : function(l) {
			var n = this, m = n.dom.style;
			n.setStyle(l);
			if (l.right == j) {
				m.right = ""
			}
			if (l.bottom == j) {
				m.bottom = ""
			}
			return n
		},
		translatePoints : function(l, s) {
			if (Ext.isArray(l)) {
				s = l[1];
				l = l[0]
			}
			var m = this, n = m.isStyle(g, d), r = m.getXY(), q = parseInt(m
					.getStyle(a), 10), p = parseInt(m.getStyle(c), 10);
			if (!Ext.isNumber(q)) {
				q = n ? 0 : m.dom.offsetLeft
			}
			if (!Ext.isNumber(p)) {
				p = n ? 0 : m.dom.offsetTop
			}
			q = (Ext.isNumber(l)) ? l - r[0] + q : undefined;
			p = (Ext.isNumber(s)) ? s - r[1] + p : undefined;
			return {
				left : q,
				top : p
			}
		},
		setBox : function(p, q, m) {
			var o = this, l = p.width, n = p.height;
			if ((q && !o.autoBoxAdjust) && !o.isBorderBox()) {
				l -= (o.getBorderWidth("lr") + o.getPadding("lr"));
				n -= (o.getBorderWidth("tb") + o.getPadding("tb"))
			}
			o.setBounds(p.x, p.y, l, n, m);
			return o
		},
		getBox : function(s, z) {
			var v = this, D, o, y, n = v.getBorderWidth, A = v.getPadding, p, m, C, x, B, q, u;
			if (!z) {
				D = v.getXY()
			} else {
				o = parseInt(v.getStyle("left"), 10) || 0;
				y = parseInt(v.getStyle("top"), 10) || 0;
				D = [o, y]
			}
			B = v.getWidth();
			q = v.getHeight();
			if (!s) {
				u = {
					x : D[0],
					y : D[1],
					0 : D[0],
					1 : D[1],
					width : B,
					height : q
				}
			} else {
				p = n.call(v, "l") + A.call(v, "l");
				m = n.call(v, "r") + A.call(v, "r");
				C = n.call(v, "t") + A.call(v, "t");
				x = n.call(v, "b") + A.call(v, "b");
				u = {
					x : D[0] + p,
					y : D[1] + C,
					0 : D[0] + p,
					1 : D[1] + C,
					width : B - (p + m),
					height : q - (C + x)
				}
			}
			u.right = u.x + u.width;
			u.bottom = u.y + u.height;
			return u
		},
		move : function(t, m, n) {
			var q = this, w = q.getXY(), u = w[0], s = w[1], o = [u - m, s], v = [
					u + m, s], r = [u, s - m], l = [u, s + m], p = {
				l : o,
				left : o,
				r : v,
				right : v,
				t : r,
				top : r,
				up : r,
				b : l,
				bottom : l,
				down : l
			};
			t = t.toLowerCase();
			q.moveTo(p[t][0], p[t][1], n)
		},
		setLeftTop : function(o, n) {
			var m = this, l = m.dom.style;
			l.left = m.addUnits(o);
			l.top = m.addUnits(n);
			return m
		},
		getRegion : function() {
			return this.getPageBox(true)
		},
		getViewRegion : function() {
			var p = this, n = p.dom === document.body, m, s, r, q, o, l;
			if (n) {
				m = p.getScroll();
				q = m.left;
				r = m.top;
				o = Ext.Element.getViewportWidth();
				l = Ext.Element.getViewportHeight()
			} else {
				s = p.getXY();
				q = s[0] + p.getBorderWidth("l") + p.getPadding("l");
				r = s[1] + p.getBorderWidth("t") + p.getPadding("t");
				o = p.getWidth(true);
				l = p.getHeight(true)
			}
			return Ext.create("Ext.util.Region", r, q + o, r + l, q)
		},
		getPageBox : function(p) {
			var s = this, n = s.dom, v = n === document.body, x = v
					? Ext.Element.getViewWidth()
					: n.offsetWidth, q = v
					? Ext.Element.getViewHeight()
					: n.offsetHeight, z = s.getXY(), y = z[1], m = z[0] + x, u = z[1]
					+ q, o = z[0];
			if (p) {
				return Ext.create("Ext.util.Region", y, m, u, o)
			} else {
				return {
					left : o,
					top : y,
					width : x,
					height : q,
					right : m,
					bottom : u
				}
			}
		},
		setBounds : function(m, q, o, l, n) {
			var p = this;
			if (!n || !p.anim) {
				p.setSize(o, l);
				p.setLocation(m, q)
			} else {
				if (!Ext.isObject(n)) {
					n = {}
				}
				p.animate(Ext.applyIf({
					to : {
						x : m,
						y : q,
						width : p.adjustWidth(o),
						height : p.adjustHeight(l)
					}
				}, n))
			}
			return p
		},
		setRegion : function(m, l) {
			return this.setBounds(m.left, m.top, m.right - m.left, m.bottom
					- m.top, l)
		}
	})
})();
Ext.override(Ext.Element, {
	isScrollable : function() {
		var a = this.dom;
		return a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth
	},
	getScroll : function() {
		var i = this.dom, h = document, a = h.body, c = h.documentElement, b, g, e;
		if (i == h || i == a) {
			if (Ext.isIE && Ext.isStrict) {
				b = c.scrollLeft;
				g = c.scrollTop
			} else {
				b = window.pageXOffset;
				g = window.pageYOffset
			}
			e = {
				left : b || (a ? a.scrollLeft : 0),
				top : g || (a ? a.scrollTop : 0)
			}
		} else {
			e = {
				left : i.scrollLeft,
				top : i.scrollTop
			}
		}
		return e
	},
	scrollTo : function(b, d, a) {
		var g = /top/i.test(b), c = this, h = c.dom, e = {}, i;
		if (!a || !c.anim) {
			i = "scroll" + (g ? "Top" : "Left");
			h[i] = d
		} else {
			if (!Ext.isObject(a)) {
				a = {}
			}
			e["scroll" + (g ? "Top" : "Left")] = d;
			c.animate(Ext.applyIf({
				to : e
			}, a))
		}
		return c
	},
	scrollIntoView : function(b, e) {
		b = Ext.getDom(b) || Ext.getBody().dom;
		var c = this.dom, h = this.getOffsetsTo(b), g = h[0] + b.scrollLeft, j = h[1]
				+ b.scrollTop, a = j + c.offsetHeight, k = g + c.offsetWidth, n = b.clientHeight, m = parseInt(
				b.scrollTop, 10), d = parseInt(b.scrollLeft, 10), i = m + n, l = d
				+ b.clientWidth;
		if (c.offsetHeight > n || j < m) {
			b.scrollTop = j
		} else {
			if (a > i) {
				b.scrollTop = a - n
			}
		}
		b.scrollTop = b.scrollTop;
		if (e !== false) {
			if (c.offsetWidth > b.clientWidth || g < d) {
				b.scrollLeft = g
			} else {
				if (k > l) {
					b.scrollLeft = k - b.clientWidth
				}
			}
			b.scrollLeft = b.scrollLeft
		}
		return this
	},
	scrollChildIntoView : function(b, a) {
		Ext.fly(b, "_scrollChildIntoView").scrollIntoView(this, a)
	},
	scroll : function(m, b, d) {
		if (!this.isScrollable()) {
			return false
		}
		var e = this.dom, g = e.scrollLeft, p = e.scrollTop, n = e.scrollWidth, k = e.scrollHeight, i = e.clientWidth, a = e.clientHeight, c = false, o, j = {
			l : Math.min(g + b, n - i),
			r : o = Math.max(g - b, 0),
			t : Math.max(p - b, 0),
			b : Math.min(p + b, k - a)
		};
		j.d = j.b;
		j.u = j.t;
		m = m.substr(0, 1);
		if ((o = j[m]) > -1) {
			c = true;
			this.scrollTo(m == "l" || m == "r" ? "left" : "top", o, this
					.anim(d))
		}
		return c
	}
});
Ext.Element.addMethods(function() {
	var d = "visibility", b = "display", a = "hidden", h = "none", c = Ext.baseCSSPrefix
			+ "masked", g = Ext.baseCSSPrefix + "masked-relative", e = Ext.Element.data;
	return {
		isVisible : function(i) {
			var j = !this.isStyle(d, a) && !this.isStyle(b, h), k = this.dom.parentNode;
			if (i !== true || !j) {
				return j
			}
			while (k && !(/^body/i.test(k.tagName))) {
				if (!Ext.fly(k, "_isVisible").isVisible()) {
					return false
				}
				k = k.parentNode
			}
			return true
		},
		isDisplayed : function() {
			return !this.isStyle(b, h)
		},
		enableDisplayMode : function(i) {
			this.setVisibilityMode(Ext.Element.DISPLAY);
			if (!Ext.isEmpty(i)) {
				e(this.dom, "originalDisplay", i)
			}
			return this
		},
		mask : function(j, o) {
			var q = this, l = q.dom, m = l.style.setExpression, p = Ext.DomHelper, n = Ext.baseCSSPrefix
					+ "mask-msg", i, r;
			if (!(/^body/i.test(l.tagName) && q.getStyle("position") == "static")) {
				q.addCls(g)
			}
			i = e(l, "maskMsg");
			if (i) {
				i.remove()
			}
			i = e(l, "mask");
			if (i) {
				i.remove()
			}
			r = p.append(l, {
				cls : Ext.baseCSSPrefix + "mask"
			}, true);
			e(l, "mask", r);
			q.addCls(c);
			r.setDisplayed(true);
			if (typeof j == "string") {
				var k = p.append(l, {
					cls : n,
					cn : {
						tag : "div"
					}
				}, true);
				e(l, "maskMsg", k);
				k.dom.className = o ? n + " " + o : n;
				k.dom.firstChild.innerHTML = j;
				k.setDisplayed(true);
				k.center(q)
			}
			if (!Ext.supports.IncludePaddingInWidthCalculation && m) {
				r.dom.style.setExpression("width",
						'this.parentNode.offsetWidth + "px"')
			}
			if (!Ext.supports.IncludePaddingInHeightCalculation && m) {
				r.dom.style.setExpression("height",
						'this.parentNode.offsetHeight + "px"')
			} else {
				if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict)
						&& q.getStyle("height") == "auto") {
					r.setSize(undefined, q.getHeight())
				}
			}
			return r
		},
		unmask : function() {
			var k = this, l = k.dom, i = e(l, "mask"), j = e(l, "maskMsg");
			if (i) {
				if (i.dom.style.clearExpression) {
					i.dom.style.clearExpression("width");
					i.dom.style.clearExpression("height")
				}
				if (j) {
					j.remove();
					e(l, "maskMsg", undefined)
				}
				i.remove();
				e(l, "mask", undefined);
				k.removeCls([c, g])
			}
		},
		isMasked : function() {
			var k = this, i = e(k.dom, "mask"), j = e(k.dom, "maskMsg");
			if (i && i.isVisible()) {
				if (j) {
					j.center(k)
				}
				return true
			}
			return false
		},
		createShim : function() {
			var i = document.createElement("iframe"), j;
			i.frameBorder = "0";
			i.className = Ext.baseCSSPrefix + "shim";
			i.src = Ext.SSL_SECURE_URL;
			j = Ext.get(this.dom.parentNode.insertBefore(i, this.dom));
			j.autoBoxAdjust = false;
			return j
		}
	}
}());
Ext.Element.addMethods({
	addKeyListener : function(b, d, c) {
		var a;
		if (typeof b != "object" || Ext.isArray(b)) {
			a = {
				key : b,
				fn : d,
				scope : c
			}
		} else {
			a = {
				key : b.key,
				shift : b.shift,
				ctrl : b.ctrl,
				alt : b.alt,
				fn : d,
				scope : c
			}
		}
		return Ext.create("Ext.util.KeyMap", this, a)
	},
	addKeyMap : function(a) {
		return Ext.create("Ext.util.KeyMap", this, a)
	}
});
Ext.CompositeElementLite.importElementMethods();
Ext.apply(Ext.CompositeElementLite.prototype, {
	addElements : function(c, a) {
		if (!c) {
			return this
		}
		if (typeof c == "string") {
			c = Ext.Element.selectorFunction(c, a)
		}
		var b = this.elements;
		Ext.each(c, function(d) {
			b.push(Ext.get(d))
		});
		return this
	},
	first : function() {
		return this.item(0)
	},
	last : function() {
		return this.item(this.getCount() - 1)
	},
	contains : function(a) {
		return this.indexOf(a) != -1
	},
	removeElement : function(d, e) {
		var c = this, a = this.elements, b;
		Ext.each(d, function(g) {
			if ((b = (a[g] || a[g = c.indexOf(g)]))) {
				if (e) {
					if (b.dom) {
						b.remove()
					} else {
						Ext.removeNode(b)
					}
				}
				Ext.Array.erase(a, g, 1)
			}
		});
		return this
	}
});
Ext.CompositeElement = Ext.extend(Ext.CompositeElementLite, {
	constructor : function(b, a) {
		this.elements = [];
		this.add(b, a)
	},
	getElement : function(a) {
		return a
	},
	transformElement : function(a) {
		return Ext.get(a)
	}
});
Ext.Element.select = function(a, d, b) {
	var c;
	if (typeof a == "string") {
		c = Ext.Element.selectorFunction(a, b)
	} else {
		if (a.length !== undefined) {
			c = a
		} else {
		}
	}
	return (d === true)
			? new Ext.CompositeElement(c)
			: new Ext.CompositeElementLite(c)
};
Ext.select = Ext.Element.select;
(function() {
	var h = {
		nameToAliasesMap : {
			"Ext.AbstractComponent" : [""],
			"Ext.AbstractManager" : [""],
			"Ext.AbstractPlugin" : [""],
			"Ext.Ajax" : [""],
			"Ext.ComponentLoader" : [""],
			"Ext.ComponentManager" : [""],
			"Ext.ComponentQuery" : [""],
			"Ext.ElementLoader" : [""],
			"Ext.ModelManager" : [""],
			"Ext.PluginManager" : [""],
			"Ext.Template" : [""],
			"Ext.XTemplate" : [""],
			"Ext.app.Application" : [""],
			"Ext.app.Controller" : [""],
			"Ext.app.EventBus" : [""],
			"Ext.chart.Callout" : [""],
			"Ext.chart.Chart" : ["widget.chart"],
			"Ext.chart.Highlight" : [""],
			"Ext.chart.Label" : [""],
			"Ext.chart.Legend" : [""],
			"Ext.chart.LegendItem" : [""],
			"Ext.chart.Mask" : [""],
			"Ext.chart.MaskLayer" : [""],
			"Ext.chart.Navigation" : [""],
			"Ext.chart.Shape" : [""],
			"Ext.chart.Tip" : [""],
			"Ext.chart.TipSurface" : [""],
			"Ext.chart.axis.Abstract" : [""],
			"Ext.chart.axis.Axis" : [""],
			"Ext.chart.axis.Category" : ["axis.category"],
			"Ext.chart.axis.Gauge" : ["axis.gauge"],
			"Ext.chart.axis.Numeric" : ["axis.numeric"],
			"Ext.chart.axis.Radial" : ["axis.radial"],
			"Ext.chart.axis.Time" : ["axis.time"],
			"Ext.chart.series.Area" : ["series.area"],
			"Ext.chart.series.Bar" : ["series.bar"],
			"Ext.chart.series.Cartesian" : [""],
			"Ext.chart.series.Column" : ["series.column"],
			"Ext.chart.series.Gauge" : ["series.gauge"],
			"Ext.chart.series.Line" : ["series.line"],
			"Ext.chart.series.Pie" : ["series.pie"],
			"Ext.chart.series.Radar" : ["series.radar"],
			"Ext.chart.series.Scatter" : ["series.scatter"],
			"Ext.chart.series.Series" : [""],
			"Ext.chart.theme.Base" : [""],
			"Ext.chart.theme.Theme" : [""],
			"Ext.container.AbstractContainer" : [""],
			"Ext.data.AbstractStore" : [""],
			"Ext.data.ArrayStore" : ["store.array"],
			"Ext.data.Association" : [""],
			"Ext.data.Batch" : [""],
			"Ext.data.BelongsToAssociation" : ["association.belongsto"],
			"Ext.data.BufferStore" : ["store.buffer"],
			"Ext.data.Connection" : [""],
			"Ext.data.DirectStore" : ["store.direct"],
			"Ext.data.Errors" : [""],
			"Ext.data.Field" : ["data.field"],
			"Ext.data.HasManyAssociation" : ["association.hasmany"],
			"Ext.data.IdGenerator" : [""],
			"Ext.data.JsonP" : [""],
			"Ext.data.JsonPStore" : ["store.jsonp"],
			"Ext.data.JsonStore" : ["store.json"],
			"Ext.data.Model" : [""],
			"Ext.data.NodeInterface" : [""],
			"Ext.data.NodeStore" : ["store.node"],
			"Ext.data.Operation" : [""],
			"Ext.data.Request" : [""],
			"Ext.data.ResultSet" : [""],
			"Ext.data.SequentialIdGenerator" : ["idgen.sequential"],
			"Ext.data.SortTypes" : [""],
			"Ext.data.Store" : ["store.store"],
			"Ext.data.StoreManager" : [""],
			"Ext.data.Tree" : ["data.tree"],
			"Ext.data.TreeStore" : ["store.tree"],
			"Ext.data.Types" : [""],
			"Ext.data.UuidGenerator" : [""],
			"Ext.data.validations" : [""],
			"Ext.data.XmlStore" : ["store.xml"],
			"Ext.data.proxy.Ajax" : ["proxy.ajax"],
			"Ext.data.proxy.Client" : [""],
			"Ext.data.proxy.Direct" : ["proxy.direct"],
			"Ext.data.proxy.JsonP" : ["proxy.jsonp", "proxy.scripttag"],
			"Ext.data.proxy.LocalStorage" : ["proxy.localstorage"],
			"Ext.data.proxy.Memory" : ["proxy.memory"],
			"Ext.data.proxy.Proxy" : ["proxy.proxy"],
			"Ext.data.proxy.Rest" : ["proxy.rest"],
			"Ext.data.proxy.Server" : ["proxy.server"],
			"Ext.data.proxy.SessionStorage" : ["proxy.sessionstorage"],
			"Ext.data.proxy.WebStorage" : [""],
			"Ext.data.reader.Array" : ["reader.array"],
			"Ext.data.reader.Json" : ["reader.json"],
			"Ext.data.reader.Reader" : [""],
			"Ext.data.reader.Xml" : ["reader.xml"],
			"Ext.data.writer.Json" : ["writer.json"],
			"Ext.data.writer.Writer" : ["writer.base"],
			"Ext.data.writer.Xml" : ["writer.xml"],
			"Ext.direct.Event" : ["direct.event"],
			"Ext.direct.ExceptionEvent" : ["direct.exception"],
			"Ext.direct.JsonProvider" : ["direct.jsonprovider"],
			"Ext.direct.Manager" : [""],
			"Ext.direct.PollingProvider" : ["direct.pollingprovider"],
			"Ext.direct.Provider" : ["direct.provider"],
			"Ext.direct.RemotingEvent" : ["direct.rpc"],
			"Ext.direct.RemotingMethod" : [""],
			"Ext.direct.RemotingProvider" : ["direct.remotingprovider"],
			"Ext.direct.Transaction" : ["direct.transaction"],
			"Ext.draw.Color" : [""],
			"Ext.draw.Component" : ["widget.draw"],
			"Ext.draw.CompositeSprite" : [""],
			"Ext.draw.Draw" : [""],
			"Ext.draw.Matrix" : [""],
			"Ext.draw.Sprite" : [""],
			"Ext.draw.SpriteDD" : [""],
			"Ext.draw.Surface" : [""],
			"Ext.draw.engine.Svg" : [""],
			"Ext.draw.engine.Vml" : [""],
			"Ext.fx.Anim" : [""],
			"Ext.fx.Animator" : [""],
			"Ext.fx.CubicBezier" : [""],
			"Ext.fx.Easing" : [],
			"Ext.fx.Manager" : [""],
			"Ext.fx.PropertyHandler" : [""],
			"Ext.fx.Queue" : [""],
			"Ext.fx.target.Component" : [""],
			"Ext.fx.target.CompositeElement" : [""],
			"Ext.fx.target.CompositeElementCSS" : [""],
			"Ext.fx.target.CompositeSprite" : [""],
			"Ext.fx.target.Element" : [""],
			"Ext.fx.target.ElementCSS" : [""],
			"Ext.fx.target.Sprite" : [""],
			"Ext.fx.target.Target" : [""],
			"Ext.layout.Layout" : [""],
			"Ext.layout.component.AbstractDock" : [""],
			"Ext.layout.component.Auto" : ["layout.autocomponent"],
			"Ext.layout.component.Component" : [""],
			"Ext.layout.component.Draw" : ["layout.draw"],
			"Ext.layout.container.AbstractCard" : [""],
			"Ext.layout.container.AbstractContainer" : [""],
			"Ext.layout.container.AbstractFit" : [""],
			"Ext.layout.container.Auto" : ["layout.auto",
					"layout.autocontainer"],
			"Ext.panel.AbstractPanel" : [""],
			"Ext.selection.DataViewModel" : [""],
			"Ext.selection.Model" : [""],
			"Ext.state.CookieProvider" : [""],
			"Ext.state.LocalStorageProvider" : ["state.localstorage"],
			"Ext.state.Manager" : [""],
			"Ext.state.Provider" : [""],
			"Ext.state.Stateful" : [""],
			"Ext.util.AbstractMixedCollection" : [""],
			"Ext.util.Filter" : [""],
			"Ext.util.Grouper" : [""],
			"Ext.util.HashMap" : [""],
			"Ext.util.Inflector" : [""],
			"Ext.util.Memento" : [""],
			"Ext.util.MixedCollection" : [""],
			"Ext.util.Observable" : [""],
			"Ext.util.Offset" : [""],
			"Ext.util.Point" : [""],
			"Ext.util.Region" : [""],
			"Ext.util.Sortable" : [""],
			"Ext.util.Sorter" : [""],
			"Ext.view.AbstractView" : [""],
			"Ext.Action" : [""],
			"Ext.Component" : ["widget.component", "widget.box"],
			"Ext.Editor" : ["widget.editor"],
			"Ext.FocusManager" : [""],
			"Ext.Img" : ["widget.image", "widget.imagecomponent"],
			"Ext.Layer" : [""],
			"Ext.LoadMask" : ["widget.loadmask"],
			"Ext.ProgressBar" : ["widget.progressbar"],
			"Ext.Shadow" : [""],
			"Ext.ShadowPool" : [""],
			"Ext.ZIndexManager" : [""],
			"Ext.button.Button" : ["widget.button"],
			"Ext.button.Cycle" : ["widget.cycle"],
			"Ext.button.Split" : ["widget.splitbutton"],
			"Ext.container.ButtonGroup" : ["widget.buttongroup"],
			"Ext.container.Container" : ["widget.container"],
			"Ext.container.Viewport" : ["widget.viewport"],
			"Ext.dd.DD" : [""],
			"Ext.dd.DDProxy" : [""],
			"Ext.dd.DDTarget" : [""],
			"Ext.dd.DragDrop" : [""],
			"Ext.dd.DragDropManager" : [""],
			"Ext.dd.DragSource" : [""],
			"Ext.dd.DragTracker" : [""],
			"Ext.dd.DragZone" : [""],
			"Ext.dd.DropTarget" : [""],
			"Ext.dd.DropZone" : [""],
			"Ext.dd.Registry" : [""],
			"Ext.dd.ScrollManager" : [""],
			"Ext.dd.StatusProxy" : [""],
			"Ext.flash.Component" : ["widget.flash"],
			"Ext.form.Basic" : [""],
			"Ext.form.CheckboxGroup" : ["widget.checkboxgroup"],
			"Ext.form.CheckboxManager" : [""],
			"Ext.form.FieldAncestor" : [""],
			"Ext.form.FieldContainer" : ["widget.fieldcontainer"],
			"Ext.form.FieldSet" : ["widget.fieldset"],
			"Ext.form.Label" : ["widget.label"],
			"Ext.form.Labelable" : [""],
			"Ext.form.Panel" : ["widget.form"],
			"Ext.form.RadioGroup" : ["widget.radiogroup"],
			"Ext.form.RadioManager" : [""],
			"Ext.form.action.Action" : [""],
			"Ext.form.action.DirectLoad" : ["formaction.directload"],
			"Ext.form.action.DirectSubmit" : ["formaction.directsubmit"],
			"Ext.form.action.Load" : ["formaction.load"],
			"Ext.form.action.StandardSubmit" : ["formaction.standardsubmit"],
			"Ext.form.action.Submit" : ["formaction.submit"],
			"Ext.form.field.Base" : ["widget.field"],
			"Ext.form.field.Checkbox" : ["widget.checkboxfield",
					"widget.checkbox"],
			"Ext.form.field.ComboBox" : ["widget.combobox", "widget.combo"],
			"Ext.form.field.Date" : ["widget.datefield"],
			"Ext.form.field.Display" : ["widget.displayfield"],
			"Ext.form.field.Field" : [""],
			"Ext.form.field.File" : ["widget.filefield",
					"widget.fileuploadfield"],
			"Ext.form.field.Hidden" : ["widget.hiddenfield", "widget.hidden"],
			"Ext.form.field.HtmlEditor" : ["widget.htmleditor"],
			"Ext.form.field.Number" : ["widget.numberfield"],
			"Ext.form.field.Picker" : ["widget.pickerfield"],
			"Ext.form.field.Radio" : ["widget.radiofield", "widget.radio"],
			"Ext.form.field.Spinner" : ["widget.spinnerfield"],
			"Ext.form.field.Text" : ["widget.textfield"],
			"Ext.form.field.TextArea" : ["widget.textareafield",
					"widget.textarea"],
			"Ext.form.field.Time" : ["widget.timefield"],
			"Ext.form.field.Trigger" : ["widget.triggerfield", "widget.trigger"],
			"Ext.form.field.VTypes" : [""],
			"Ext.grid.CellEditor" : [""],
			"Ext.grid.ColumnLayout" : ["layout.gridcolumn"],
			"Ext.grid.Lockable" : [""],
			"Ext.grid.LockingView" : [""],
			"Ext.grid.PagingScroller" : ["widget.paginggridscroller"],
			"Ext.grid.Panel" : ["widget.gridpanel", "widget.grid"],
			"Ext.grid.RowEditor" : [""],
			"Ext.grid.RowNumberer" : ["widget.rownumberer"],
			"Ext.grid.Scroller" : ["widget.gridscroller"],
			"Ext.grid.View" : ["widget.gridview"],
			"Ext.grid.ViewDropZone" : [""],
			"Ext.grid.column.Action" : ["widget.actioncolumn"],
			"Ext.grid.column.Boolean" : ["widget.booleancolumn"],
			"Ext.grid.column.Column" : ["widget.gridcolumn"],
			"Ext.grid.column.Date" : ["widget.datecolumn"],
			"Ext.grid.column.Number" : ["widget.numbercolumn"],
			"Ext.grid.column.Template" : ["widget.templatecolumn"],
			"Ext.grid.feature.AbstractSummary" : ["feature.abstractsummary"],
			"Ext.grid.feature.Chunking" : ["feature.chunking"],
			"Ext.grid.feature.Feature" : ["feature.feature"],
			"Ext.grid.feature.Grouping" : ["feature.grouping"],
			"Ext.grid.feature.GroupingSummary" : ["feature.groupingsummary"],
			"Ext.grid.feature.RowBody" : ["feature.rowbody"],
			"Ext.grid.feature.RowWrap" : ["feature.rowwrap"],
			"Ext.grid.feature.Summary" : ["feature.summary"],
			"Ext.grid.header.Container" : ["widget.headercontainer"],
			"Ext.grid.header.DragZone" : [""],
			"Ext.grid.header.DropZone" : [""],
			"Ext.grid.plugin.CellEditing" : ["plugin.cellediting"],
			"Ext.grid.plugin.DragDrop" : ["plugin.gridviewdragdrop"],
			"Ext.grid.plugin.Editing" : ["editing.editing"],
			"Ext.grid.plugin.HeaderReorderer" : ["plugin.gridheaderreorderer"],
			"Ext.grid.plugin.HeaderResizer" : ["plugin.gridheaderresizer"],
			"Ext.grid.plugin.RowEditing" : ["plugin.rowediting"],
			"Ext.grid.property.Grid" : ["widget.propertygrid"],
			"Ext.grid.property.HeaderContainer" : [""],
			"Ext.grid.property.Property" : [""],
			"Ext.grid.property.Store" : [""],
			"Ext.layout.component.Body" : ["layout.body"],
			"Ext.layout.component.BoundList" : ["layout.boundlist"],
			"Ext.layout.component.Button" : ["layout.button"],
			"Ext.layout.component.Dock" : ["layout.dock"],
			"Ext.layout.component.Editor" : ["layout.editor"],
			"Ext.layout.component.FieldSet" : ["layout.fieldset"],
			"Ext.layout.component.ProgressBar" : ["layout.progressbar"],
			"Ext.layout.component.Tab" : ["layout.tab"],
			"Ext.layout.component.Tip" : ["layout.tip"],
			"Ext.layout.component.field.Field" : ["layout.field"],
			"Ext.layout.component.field.File" : ["layout.filefield"],
			"Ext.layout.component.field.HtmlEditor" : ["layout.htmleditor"],
			"Ext.layout.component.field.Slider" : ["layout.sliderfield"],
			"Ext.layout.component.field.Text" : ["layout.textfield"],
			"Ext.layout.component.field.TextArea" : ["layout.textareafield"],
			"Ext.layout.component.field.Trigger" : ["layout.triggerfield"],
			"Ext.layout.container.Absolute" : ["layout.absolute"],
			"Ext.layout.container.Accordion" : ["layout.accordion"],
			"Ext.layout.container.Anchor" : ["layout.anchor"],
			"Ext.layout.container.Border" : ["layout.border"],
			"Ext.layout.container.Box" : ["layout.box"],
			"Ext.layout.container.Card" : ["layout.card"],
			"Ext.layout.container.CheckboxGroup" : ["layout.checkboxgroup"],
			"Ext.layout.container.Column" : ["layout.column"],
			"Ext.layout.container.Container" : [""],
			"Ext.layout.container.Fit" : ["layout.fit"],
			"Ext.layout.container.HBox" : ["layout.hbox"],
			"Ext.layout.container.Table" : ["layout.table"],
			"Ext.layout.container.VBox" : ["layout.vbox"],
			"Ext.layout.container.boxOverflow.Menu" : [""],
			"Ext.layout.container.boxOverflow.None" : [""],
			"Ext.layout.container.boxOverflow.Scroller" : [""],
			"Ext.menu.CheckItem" : ["widget.menucheckitem"],
			"Ext.menu.ColorPicker" : ["widget.colormenu"],
			"Ext.menu.DatePicker" : ["widget.datemenu"],
			"Ext.menu.Item" : ["widget.menuitem"],
			"Ext.menu.KeyNav" : [""],
			"Ext.menu.Manager" : [""],
			"Ext.menu.Menu" : ["widget.menu"],
			"Ext.menu.Separator" : ["widget.menuseparator"],
			"Ext.panel.DD" : [""],
			"Ext.panel.Header" : ["widget.header"],
			"Ext.panel.Panel" : ["widget.panel"],
			"Ext.panel.Proxy" : [""],
			"Ext.panel.Table" : ["widget.tablepanel"],
			"Ext.panel.Tool" : ["widget.tool"],
			"Ext.picker.Color" : ["widget.colorpicker"],
			"Ext.picker.Date" : ["widget.datepicker"],
			"Ext.picker.Month" : ["widget.monthpicker"],
			"Ext.picker.Time" : ["widget.timepicker"],
			"Ext.resizer.Handle" : [""],
			"Ext.resizer.Resizer" : [""],
			"Ext.resizer.ResizeTracker" : [""],
			"Ext.resizer.Splitter" : ["widget.splitter"],
			"Ext.resizer.SplitterTracker" : [""],
			"Ext.selection.CellModel" : ["selection.cellmodel"],
			"Ext.selection.CheckboxModel" : ["selection.checkboxmodel"],
			"Ext.selection.RowModel" : ["selection.rowmodel"],
			"Ext.selection.TreeModel" : ["selection.treemodel"],
			"Ext.slider.Multi" : ["widget.multislider"],
			"Ext.slider.Single" : ["widget.slider", "widget.sliderfield"],
			"Ext.slider.Thumb" : [""],
			"Ext.slider.Tip" : ["widget.slidertip"],
			"Ext.tab.Bar" : ["widget.tabbar"],
			"Ext.tab.Panel" : ["widget.tabpanel"],
			"Ext.tab.Tab" : ["widget.tab"],
			"Ext.tip.QuickTip" : [""],
			"Ext.tip.QuickTipManager" : [""],
			"Ext.tip.Tip" : [""],
			"Ext.tip.ToolTip" : ["widget.tooltip"],
			"Ext.toolbar.Fill" : ["widget.tbfill"],
			"Ext.toolbar.Item" : ["widget.tbitem"],
			"Ext.toolbar.Paging" : ["widget.pagingtoolbar"],
			"Ext.toolbar.Separator" : ["widget.tbseparator"],
			"Ext.toolbar.Spacer" : ["widget.tbspacer"],
			"Ext.toolbar.TextItem" : ["widget.tbtext"],
			"Ext.toolbar.Toolbar" : ["widget.toolbar"],
			"Ext.tree.Column" : ["widget.treecolumn"],
			"Ext.tree.Panel" : ["widget.treepanel"],
			"Ext.tree.View" : ["widget.treeview"],
			"Ext.tree.ViewDragZone" : [""],
			"Ext.tree.ViewDropZone" : [""],
			"Ext.tree.plugin.TreeViewDragDrop" : ["plugin.treeviewdragdrop"],
			"Ext.util.Animate" : [""],
			"Ext.util.ClickRepeater" : [""],
			"Ext.util.ComponentDragger" : [""],
			"Ext.util.Cookies" : [""],
			"Ext.util.CSS" : [""],
			"Ext.util.Floating" : [""],
			"Ext.util.History" : [""],
			"Ext.util.KeyMap" : [""],
			"Ext.util.KeyNav" : [""],
			"Ext.util.TextMetrics" : [""],
			"Ext.view.BoundList" : ["widget.boundlist"],
			"Ext.view.BoundListKeyNav" : [""],
			"Ext.view.DragZone" : [""],
			"Ext.view.DropZone" : [""],
			"Ext.view.Table" : ["widget.tableview"],
			"Ext.view.TableChunker" : [""],
			"Ext.view.View" : ["widget.dataview"],
			"Ext.window.MessageBox" : ["widget.messagebox"],
			"Ext.window.Window" : ["widget.window"]
		},
		alternateToNameMap : {
			"Ext.ComponentMgr" : "Ext.ComponentManager",
			"Ext.ModelMgr" : "Ext.ModelManager",
			"Ext.PluginMgr" : "Ext.PluginManager",
			"Ext.chart.Axis" : "Ext.chart.axis.Axis",
			"Ext.chart.CategoryAxis" : "Ext.chart.axis.Category",
			"Ext.chart.NumericAxis" : "Ext.chart.axis.Numeric",
			"Ext.chart.TimeAxis" : "Ext.chart.axis.Time",
			"Ext.chart.BarSeries" : "Ext.chart.series.Bar",
			"Ext.chart.BarChart" : "Ext.chart.series.Bar",
			"Ext.chart.StackedBarChart" : "Ext.chart.series.Bar",
			"Ext.chart.CartesianSeries" : "Ext.chart.series.Cartesian",
			"Ext.chart.CartesianChart" : "Ext.chart.series.Cartesian",
			"Ext.chart.ColumnSeries" : "Ext.chart.series.Column",
			"Ext.chart.ColumnChart" : "Ext.chart.series.Column",
			"Ext.chart.StackedColumnChart" : "Ext.chart.series.Column",
			"Ext.chart.LineSeries" : "Ext.chart.series.Line",
			"Ext.chart.LineChart" : "Ext.chart.series.Line",
			"Ext.chart.PieSeries" : "Ext.chart.series.Pie",
			"Ext.chart.PieChart" : "Ext.chart.series.Pie",
			"Ext.data.Record" : "Ext.data.Model",
			"Ext.StoreMgr" : "Ext.data.StoreManager",
			"Ext.data.StoreMgr" : "Ext.data.StoreManager",
			"Ext.StoreManager" : "Ext.data.StoreManager",
			"Ext.data.XmlStore" : "Ext.data.XmlStore",
			"Ext.data.HttpProxy" : "Ext.data.proxy.Ajax",
			"Ext.data.AjaxProxy" : "Ext.data.proxy.Ajax",
			"Ext.data.ClientProxy" : "Ext.data.proxy.Client",
			"Ext.data.DirectProxy" : "Ext.data.proxy.Direct",
			"Ext.data.ScriptTagProxy" : "Ext.data.proxy.JsonP",
			"Ext.data.LocalStorageProxy" : "Ext.data.proxy.LocalStorage",
			"Ext.data.MemoryProxy" : "Ext.data.proxy.Memory",
			"Ext.data.DataProxy" : "Ext.data.proxy.Proxy",
			"Ext.data.Proxy" : "Ext.data.proxy.Proxy",
			"Ext.data.RestProxy" : "Ext.data.proxy.Rest",
			"Ext.data.ServerProxy" : "Ext.data.proxy.Server",
			"Ext.data.SessionStorageProxy" : "Ext.data.proxy.SessionStorage",
			"Ext.data.WebStorageProxy" : "Ext.data.proxy.WebStorage",
			"Ext.data.ArrayReader" : "Ext.data.reader.Array",
			"Ext.data.JsonReader" : "Ext.data.reader.Json",
			"Ext.data.Reader" : "Ext.data.reader.Reader",
			"Ext.data.DataReader" : "Ext.data.reader.Reader",
			"Ext.data.XmlReader" : "Ext.data.reader.Xml",
			"Ext.data.JsonWriter" : "Ext.data.writer.Json",
			"Ext.data.DataWriter" : "Ext.data.writer.Writer",
			"Ext.data.Writer" : "Ext.data.writer.Writer",
			"Ext.data.XmlWriter" : "Ext.data.writer.Xml",
			"Ext.Direct.Transaction" : "Ext.direct.Transaction",
			"Ext.AbstractSelectionModel" : "Ext.selection.Model",
			"Ext.view.AbstractView" : "Ext.view.AbstractView",
			"Ext.FocusMgr" : "Ext.FocusManager",
			"Ext.WindowGroup" : "Ext.ZIndexManager",
			"Ext.Button" : "Ext.button.Button",
			"Ext.CycleButton" : "Ext.button.Cycle",
			"Ext.SplitButton" : "Ext.button.Split",
			"Ext.ButtonGroup" : "Ext.container.ButtonGroup",
			"Ext.Container" : "Ext.container.Container",
			"Ext.Viewport" : "Ext.container.Viewport",
			"Ext.dd.DragDropMgr" : "Ext.dd.DragDropManager",
			"Ext.dd.DDM" : "Ext.dd.DragDropManager",
			"Ext.FlashComponent" : "Ext.flash.Component",
			"Ext.form.BasicForm" : "Ext.form.Basic",
			"Ext.FormPanel" : "Ext.form.Panel",
			"Ext.form.FormPanel" : "Ext.form.Panel",
			"Ext.form.Action" : "Ext.form.action.Action",
			"Ext.form.Action.DirectLoad" : "Ext.form.action.DirectLoad",
			"Ext.form.Action.DirectSubmit" : "Ext.form.action.DirectSubmit",
			"Ext.form.Action.Load" : "Ext.form.action.Load",
			"Ext.form.Action.Submit" : "Ext.form.action.Submit",
			"Ext.form.Field" : "Ext.form.field.Base",
			"Ext.form.BaseField" : "Ext.form.field.Base",
			"Ext.form.Checkbox" : "Ext.form.field.Checkbox",
			"Ext.form.ComboBox" : "Ext.form.field.ComboBox",
			"Ext.form.DateField" : "Ext.form.field.Date",
			"Ext.form.Date" : "Ext.form.field.Date",
			"Ext.form.DisplayField" : "Ext.form.field.Display",
			"Ext.form.Display" : "Ext.form.field.Display",
			"Ext.form.FileUploadField" : "Ext.form.field.File",
			"Ext.ux.form.FileUploadField" : "Ext.form.field.File",
			"Ext.form.File" : "Ext.form.field.File",
			"Ext.form.Hidden" : "Ext.form.field.Hidden",
			"Ext.form.HtmlEditor" : "Ext.form.field.HtmlEditor",
			"Ext.form.NumberField" : "Ext.form.field.Number",
			"Ext.form.Number" : "Ext.form.field.Number",
			"Ext.form.Picker" : "Ext.form.field.Picker",
			"Ext.form.Radio" : "Ext.form.field.Radio",
			"Ext.form.Spinner" : "Ext.form.field.Spinner",
			"Ext.form.TextField" : "Ext.form.field.Text",
			"Ext.form.Text" : "Ext.form.field.Text",
			"Ext.form.TextArea" : "Ext.form.field.TextArea",
			"Ext.form.TimeField" : "Ext.form.field.Time",
			"Ext.form.Time" : "Ext.form.field.Time",
			"Ext.form.TriggerField" : "Ext.form.field.Trigger",
			"Ext.form.TwinTriggerField" : "Ext.form.field.Trigger",
			"Ext.form.Trigger" : "Ext.form.field.Trigger",
			"Ext.list.ListView" : "Ext.grid.Panel",
			"Ext.ListView" : "Ext.grid.Panel",
			"Ext.grid.GridPanel" : "Ext.grid.Panel",
			"Ext.grid.ActionColumn" : "Ext.grid.column.Action",
			"Ext.grid.BooleanColumn" : "Ext.grid.column.Boolean",
			"Ext.grid.Column" : "Ext.grid.column.Column",
			"Ext.grid.DateColumn" : "Ext.grid.column.Date",
			"Ext.grid.NumberColumn" : "Ext.grid.column.Number",
			"Ext.grid.TemplateColumn" : "Ext.grid.column.Template",
			"Ext.grid.PropertyGrid" : "Ext.grid.property.Grid",
			"Ext.grid.PropertyColumnModel" : "Ext.grid.property.HeaderContainer",
			"Ext.PropGridProperty" : "Ext.grid.property.Property",
			"Ext.grid.PropertyStore" : "Ext.grid.property.Store",
			"Ext.layout.AbsoluteLayout" : "Ext.layout.container.Absolute",
			"Ext.layout.AccordionLayout" : "Ext.layout.container.Accordion",
			"Ext.layout.AnchorLayout" : "Ext.layout.container.Anchor",
			"Ext.layout.BorderLayout" : "Ext.layout.container.Border",
			"Ext.layout.BoxLayout" : "Ext.layout.container.Box",
			"Ext.layout.CardLayout" : "Ext.layout.container.Card",
			"Ext.layout.ColumnLayout" : "Ext.layout.container.Column",
			"Ext.layout.ContainerLayout" : "Ext.layout.container.Container",
			"Ext.layout.FitLayout" : "Ext.layout.container.Fit",
			"Ext.layout.HBoxLayout" : "Ext.layout.container.HBox",
			"Ext.layout.TableLayout" : "Ext.layout.container.Table",
			"Ext.layout.VBoxLayout" : "Ext.layout.container.VBox",
			"Ext.layout.boxOverflow.Menu" : "Ext.layout.container.boxOverflow.Menu",
			"Ext.layout.boxOverflow.None" : "Ext.layout.container.boxOverflow.None",
			"Ext.layout.boxOverflow.Scroller" : "Ext.layout.container.boxOverflow.Scroller",
			"Ext.menu.TextItem" : "Ext.menu.Item",
			"Ext.menu.MenuMgr" : "Ext.menu.Manager",
			"Ext.Panel" : "Ext.panel.Panel",
			"Ext.dd.PanelProxy" : "Ext.panel.Proxy",
			"Ext.ColorPalette" : "Ext.picker.Color",
			"Ext.DatePicker" : "Ext.picker.Date",
			"Ext.MonthPicker" : "Ext.picker.Month",
			"Ext.Resizable" : "Ext.resizer.Resizer",
			"Ext.slider.MultiSlider" : "Ext.slider.Multi",
			"Ext.Slider" : "Ext.slider.Single",
			"Ext.form.SliderField" : "Ext.slider.Single",
			"Ext.slider.SingleSlider" : "Ext.slider.Single",
			"Ext.slider.Slider" : "Ext.slider.Single",
			"Ext.TabPanel" : "Ext.tab.Panel",
			"Ext.QuickTip" : "Ext.tip.QuickTip",
			"Ext.Tip" : "Ext.tip.Tip",
			"Ext.ToolTip" : "Ext.tip.ToolTip",
			"Ext.Toolbar.Fill" : "Ext.toolbar.Fill",
			"Ext.Toolbar.Item" : "Ext.toolbar.Item",
			"Ext.PagingToolbar" : "Ext.toolbar.Paging",
			"Ext.Toolbar.Separator" : "Ext.toolbar.Separator",
			"Ext.Toolbar.Spacer" : "Ext.toolbar.Spacer",
			"Ext.Toolbar.TextItem" : "Ext.toolbar.TextItem",
			"Ext.Toolbar" : "Ext.toolbar.Toolbar",
			"Ext.tree.TreePanel" : "Ext.tree.Panel",
			"Ext.TreePanel" : "Ext.tree.Panel",
			"Ext.History" : "Ext.util.History",
			"Ext.KeyMap" : "Ext.util.KeyMap",
			"Ext.KeyNav" : "Ext.util.KeyNav",
			"Ext.BoundList" : "Ext.view.BoundList",
			"Ext.DataView" : "Ext.view.View",
			"Ext.Window" : "Ext.window.Window"
		}
	};
	var g = document.getElementsByTagName("script"), n = "", j, m, a, k;
	for (j = 0, m = g.length; j < m; j++) {
		a = g[j].src;
		k = a.match(/ext(-debug)?\.js$/);
		if (k) {
			n = a.substring(0, a.length - k[0].length);
			break
		}
	}
	var l = h.nameToAliasesMap, d = h.alternateToNameMap, e = Ext.ClassManager, b, c;
	for (b in l) {
		if (l.hasOwnProperty(b)) {
			c = l[b];
			if (c.length > 0) {
				for (j = 0, m = c.length; j < m; j++) {
					e.setAlias(b, c[j])
				}
			} else {
				e.setAlias(b, null)
			}
		}
	}
	Ext.Object.merge(e.maps.alternateToName, d);
	Ext.Loader.setConfig({
		enabled : true,
		disableCaching : true,
		paths : {
			Ext : n + "src"
		}
	})
})();
