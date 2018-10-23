(function(b) {
	function c(f) {
		f = f || {};
		this.settings = f;
		if(f.statusInterval == null) {
			f.statusInterval = 5000
		}
		if(f.loggingDelay == null) {
			f.loggingDelay = 20 * 1000
		}
		if(f.noProgressTimeout == null) {
			f.noProgressTimeout = Infinity
		}
		var i = [],
			d = [],
			o, e = Date.now();
		var l = {
			QUEUED: 0,
			WAITING: 1,
			LOADED: 2,
			ERROR: 3,
			TIMEOUT: 4
		};
		var m = function(p) {
			if(p == null) {
				return []
			}
			if(Array.isArray(p)) {
				return p
			}
			return [p]
		};
		this.add = function(p) {
			p.tags = new a(p.tags);
			if(p.priority == null) {
				p.priority = Infinity
			}
			i.push({
				resource: p,
				status: l.QUEUED
			})
		};
		this.addProgressListener = function(q, p) {
			d.push({
				callback: q,
				tags: new a(p)
			})
		};
		this.addCompletionListener = function(q, p) {
			d.push({
				tags: new a(p),
				callback: function(r) {
					if(r.completedCount === r.totalCount) {
						q(r)
					}
				}
			})
		};
		var k = function(p) {
			p = m(p);
			var q = function(u) {
				var v = u.resource,
					t = Infinity;
				for(var s = 0; s < v.tags.length; s++) {
					for(var r = 0; r < Math.min(p.length, t); r++) {
						if(v.tags.all[s] === p[r] && r < t) {
							t = r;
							if(t === 0) {
								break
							}
						}
						if(t === 0) {
							break
						}
					}
				}
				return t
			};
			return function(s, r) {
				var u = q(s),
					t = q(r);
				if(u < t) {
					return -1
				}
				if(u > t) {
					return 1
				}
				if(s.priority < r.priority) {
					return -1
				}
				if(s.priority > r.priority) {
					return 1
				}
				return 0
			}
		};
		this.start = function(q) {
			o = Date.now();
			var r = k(q);
			i.sort(r);
			for(var s = 0, p = i.length; s < p; s++) {
				var t = i[s];
				t.status = l.WAITING;
				t.resource.start(this)
			}
			setTimeout(g, 100)
		};
		var g = function() {
			var t = false,
				u = Date.now() - e,
				q = (u >= f.noProgressTimeout),
				r = (u >= f.loggingDelay);
			for(var s = 0, p = i.length; s < p; s++) {
				var v = i[s];
				if(v.status !== l.WAITING) {
					continue
				}
				if(v.resource.checkStatus) {
					v.resource.checkStatus()
				}
				if(v.status === l.WAITING) {
					if(q) {
						v.resource.onTimeout()
					} else {
						t = true
					}
				}
			}
			if(r && t) {
				h()
			}
			if(t) {
				setTimeout(g, f.statusInterval)
			}
		};
		this.isBusy = function() {
			for(var q = 0, p = i.length; q < p; q++) {
				if(i[q].status === l.QUEUED || i[q].status === l.WAITING) {
					return true
				}
			}
			return false
		};
		var n = function(w, t) {
			var u = null,
				s, p, q, v, r;
			for(s = 0, p = i.length; s < p; s++) {
				if(i[s].resource === w) {
					u = i[s];
					break
				}
			}
			if(u == null || u.status !== l.WAITING) {
				return
			}
			u.status = t;
			e = Date.now();
			q = w.tags.length;
			for(s = 0, p = d.length; s < p; s++) {
				v = d[s];
				if(v.tags.length === 0) {
					r = true
				} else {
					r = w.tags.intersects(v.tags)
				}
				if(r) {
					j(u, v)
				}
			}
		};
		this.onLoad = function(p) {
			n(p, l.LOADED)
		};
		this.onError = function(p) {
			n(p, l.ERROR)
		};
		this.onTimeout = function(p) {
			n(p, l.TIMEOUT)
		};
		var j = function(q, w) {
			var t = 0,
				v = 0,
				s, p, u, r;
			for(s = 0, p = i.length; s < p; s++) {
				u = i[s];
				r = false;
				if(w.tags.length === 0) {
					r = true
				} else {
					r = u.resource.tags.intersects(w.tags)
				}
				if(r) {
					v++;
					if(u.status === l.LOADED || u.status === l.ERROR || u.status === l.TIMEOUT) {
						t++
					}
				}
			}
			w.callback({
				resource: q.resource,
				loaded: (q.status === l.LOADED),
				error: (q.status === l.ERROR),
				timeout: (q.status === l.TIMEOUT),
				completedCount: t,
				totalCount: v
			})
		};
		var h = this.log = function(s) {
			if(!window.console) {
				return
			}
			var r = Math.round((Date.now() - o) / 1000);
			window.console.log("PxLoader elapsed: " + r + " sec");
			for(var q = 0, p = i.length; q < p; q++) {
				var u = i[q];
				if(!s && u.status !== l.WAITING) {
					continue
				}
				var t = "PxLoader: #" + q + " " + u.resource.getName();
				switch(u.status) {
					case l.QUEUED:
						t += " (Not Started)";
						break;
					case l.WAITING:
						t += " (Waiting)";
						break;
					case l.LOADED:
						t += " (Loaded)";
						break;
					case l.ERROR:
						t += " (Error)";
						break;
					case l.TIMEOUT:
						t += " (Timeout)";
						break
				}
				if(u.resource.tags.length > 0) {
					t += " Tags: [" + u.resource.tags.all.join(",") + "]"
				}
				window.console.log(t)
			}
		}
	}

	function a(d) {
		this.all = [];
		this.first = null;
		this.length = 0;
		this.lookup = {};
		if(d) {
			if(Array.isArray(d)) {
				this.all = d.slice(0)
			} else {
				if(typeof d === "object") {
					for(var f in d) {
						if(d.hasOwnProperty(f)) {
							this.all.push(f)
						}
					}
				} else {
					this.all.push(d)
				}
			}
			this.length = this.all.length;
			if(this.length > 0) {
				this.first = this.all[0]
			}
			for(var e = 0; e < this.length; e++) {
				this.lookup[this.all[e]] = true
			}
		}
	}
	a.prototype.intersects = function(d) {
		if(this.length === 0 || d.length === 0) {
			return false
		}
		if(this.length === 1 && d.length === 1) {
			return this.first === d.first
		}
		if(d.length < this.length) {
			return d.intersects(this)
		}
		for(var e in this.lookup) {
			if(d.lookup[e]) {
				return true
			}
		}
		return false
	};
	if(typeof define === "function" && define.amd) {
		define("PxLoader", [], function() {
			return c
		})
	}
	b.PxLoader = c
}(this));
if(!Date.now) {
	Date.now = function now() {
		return new Date().getTime()
	}
}
if(!Array.isArray) {
	Array.isArray = function(a) {
		return Object.prototype.toString.call(a) === "[object Array]"
	}
};

function PxLoaderImage(a, i, f) {
	var h = this, g = null;
	this.img = new Image();
	this.tags = i;
	this.priority = f;
	var b = function() {
		if(h.img.readyState === "complete") {
			c();
			g.onLoad(h)
		}
	};
	var e = function() {
		c();
		g.onLoad(h)
	};
	var d = function() {
		c();
		g.onError(h)
	};
	var c = function() {
		h.unbind("load", e);
		h.unbind("readystatechange", b);
		h.unbind("error", d)
	};
	this.start = function(j) {
		g = j;
		h.bind("load", e);
		h.bind("readystatechange", b);
		h.bind("error", d);
		h.img.src = a
	};
	this.checkStatus = function() {
		if(h.img.complete) {
			c();
			g.onLoad(h)
		}
	};
	this.onTimeout = function() {
		c();
		if(h.img.complete) {
			g.onLoad(h)
		} else {
			g.onTimeout(h)
		}
	};
	this.getName = function() {
		return a
	};
	this.bind = function(j, k) {
		if(h.img.addEventListener) {
			h.img.addEventListener(j, k, false)
		} else {
			if(h.img.attachEvent) {
				h.img.attachEvent("on" + j, k)
			}
		}
	};
	this.unbind = function(j, k) {
		if(h.img.removeEventListener) {
			h.img.removeEventListener(j, k, false)
		} else {
			if(h.img.detachEvent) {
				h.img.detachEvent("on" + j, k)
			}
		}
	}
}
PxLoader.prototype.addImage = function(c, b, d) {
	var a = new PxLoaderImage(c, b, d);
	this.add(a);
	return a.img
};
if(typeof define === "function" && define.amd) {
	define("PxLoaderImage", [], function() {
		return PxLoaderImage
	})
};

var loader = new PxLoader();
loader.addProgressListener(function(a) {
	var c, b = a.resource.obj;
	//console.log(a.completedCount, a.totalCount);
	b && b.hasClass("lazy-bk") && (b.removeClass("lazy-bk"), c = b.attr("data-bk"), b.is("img") ? b.attr("src", c) : b.css({
		"background-image": "url(" + c + ")"
	})), updateprocessbar(a.completedCount, a.totalCount)
});
loader.addCompletionListener(function() {
	isloading = false;
});

function preload(a, b, c, d, e, f, x) {	//调用preload方法实现预加载  参数：nodesArr, callback, args, imgsArr, Booleans, string
	var g, h, i, j;
	if(a && a.length > 0 || d && d.length > 0) {
		if(f !== !0 && loadingPageShow(x), isloading = !0, a && a.length > 0 && a.each(nodeeach), d && d.length > 0)
			for(g = d.length, h = 0; g > h; h++) i = new PxLoaderImage(d[h]), loader.add(i);
		loader.start(), isloading ? j = setInterval(function() {
			isloading || (clearInterval(j), j = null, b(c), (void 0 == e || e) && loadingPageHide(x))
		}, 200) : (b(c), (void 0 == e || e) && loadingPageHide(x))
	} else b(c), (void 0 == e || e) && loadingPageHide(x)
}
function nodeeach(){
	var c, a = $(this),
		b = a.attr("data-bk");
	a.is("img") || a.css({}), c = new PxLoaderImage(b), c.obj = a, loader.add(c)
}
function loadingPageShow(x){
	x?$(".load_tips").show():$("#loading").show();
}
function loadingPageHide(x){
	x?$(".load_tips").hide():$("#loading").hide();
}
function updateprocessbar(a, b){
	var c = ~~(100 * a / b);
	if(c > 99) c = 99;
	$(".i-hbar").html(c + "%").siblings(".process").width((0.9*c)+"%");
}

/*function preload(nodes, callback, args, exts, hideloading, notshowloading) {
	if((nodes && nodes.length > 0) || (exts && exts.length > 0)) {
		if(notshowloading !== true)
			loadingPageShow(x);
			isloading = true;
		if(nodes && nodes.length > 0)
			nodes.each(nodeeach);
		if(exts && exts.length > 0) {
			var len = exts.length;
			for(var i = 0; i < len; i++) {
				var pxImage = new PxLoaderImage(exts[i]);
				loader.add(pxImage);
			}
		}
		loader.start(x);
		if(isloading) {
			var selfinterval = setInterval(function() {
				if(isloading) return;
				else {
					clearInterval(selfinterval);
					selfinterval = null;
					callback(args);
					if(!(hideloading != undefined && !hideloading))
						loadingPageHide();
				}
			}, 200);
		} else {
			callback(args);
			if(!(hideloading != undefined && !hideloading))
				loadingPageHide();
		}
	} else {
		callback(args);
		if(!(hideloading != undefined && !hideloading))
			loadingPageHide(x);
	}
}*/