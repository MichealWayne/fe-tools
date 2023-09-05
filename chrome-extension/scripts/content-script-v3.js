! function (t) {
  var e = {};

  function n(o) {
    if (e[o]) return e[o].exports;
    var r = e[o] = {
      i: o,
      l: !1,
      exports: {}
    };
    return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
  }
  n.m = t, n.c = e, n.d = function (t, e, o) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: o
    })
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    })
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var o = Object.create(null);
    if (n.r(o), Object.defineProperty(o, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t)
      for (var r in t) n.d(o, r, function (e) {
        return t[e]
      }.bind(null, r));
    return o
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return n.d(e, "a", e), e
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, n.p = "", n(n.s = 70)
}({
  1: function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
        }
        return t
      },
      r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      };
    e.get = c, e.post = i;
    var a = e.AJAX_INTERFACE = {
      getFeTools: "get https://blog.michealwayne.cn/fe-tools/datas/tools.json",
      handleTranslate: "get https://fanyi.youdao.com/translate",
      getMooCSS: "get https://blog.michealwayne.cn/fe-tools/datas/moo-css.json",
      getRegex: "get https://blog.michealwayne.cn/fe-tools/datas/regex.json"
    };

    function s(t) {
      var e = t.statusText,
        n = t.status,
        a = t.data,
        s = {};
      return "object" === (void 0 === a ? "undefined" : r(a)) ? (s = a, Array.isArray(a) && (s.list = a)) : s.data = a, Promise.resolve(o({
        success: !0,
        message: e,
        statusCode: n
      }, s))
    }

    function u(t) {
      var e = t.response,
        n = t.message,
        o = void 0,
        r = void 0;
      if (e && e instanceof Object) {
        var a = e.data,
          s = e.statusText;
        r = e.status, o = a.message || s
      } else r = 600, o = n || "Network Error";
      return Promise.reject({
        success: !1,
        statusCode: r,
        message: o
      })
    }

    function c(t) {
      return axios.get(t, "function" == typeof (arguments.length <= 1 ? void 0 : arguments[1]) ? {} : {
        params: arguments.length <= 1 ? void 0 : arguments[1]
      }).catch((function (t) {
        return console.warn(t)
      })).then((function (t) {
        return s(t)
      })).catch((function (t) {
        return u(t)
      }))
    }

    function i(t) {
      return axios.post(t, arguments.length <= 1 ? void 0 : arguments[1]).catch((function (t) {
        return console.warn(t)
      })).then((function (t) {
        return s(t)
      })).catch((function (t) {
        return u(t)
      }))
    }
    var l = {
        get: c,
        post: i
      },
      f = {};

    function d(t) {
      return t = t.split(" "),
        function (e) {
          return l[t[0]](t[1], e)
        }
    }
    for (var p in a) f[p] = d(a[p]);
    e.default = f
  },
  70: function (t, e, n) {
    "use strict";
    var o, r = n(1),
      a = (o = r) && o.__esModule ? o : {
        default: o
      };
    var s = function (t) {
      a.default.handleTranslate({
        doctype: "json",
        type: "AUTO",
        i: t
      }).then((function (t) {
        if (t.translateResult && t.translateResult.length) {
          var e = t.translateResult || [],
            n = "";
          e.map((function (t) {
            t && t.length && t.map((function (t) {
              n += t.tgt
            }))
          })), alert("result: " + (n || ""))
        }
      }))
    };

    // 监听来自 background 页面的消息
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'executeScriptAndHandleTabCreate') {
        console.log('chrome', chrome, window.getSelection().toString())
        const selection = window.getSelection().toString();
        const type = message.type;
        let url;

        if (type === 'translate') {
          url = 'index.html?type=translate&value=' + encodeURIComponent(selection);
        } else if (type === 'search') {
          url = 'index.html?message=' + selection;
        }

        // 发送消息给 background 页面，让它执行 handleTabCreate
        chrome.runtime.sendMessage({
          action: 'handleTabCreate',
          url,
        });
      }
    });
}
});