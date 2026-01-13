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
          url = 'https://fanyi.youdao.com/indexLLM.html#/';
          // @todo 有道翻译API暂时关闭 url = 'index.html?type=translate&value=' + encodeURIComponent(selection);
        } else if (type === 'search') {
          url = 'index.html?message=' + selection;
        }

        // 发送消息给 background 页面，让它执行 handleTabCreate
        chrome.runtime.sendMessage({
          action: 'handleTabCreate',
          url,
        });
      } else if (message.action === 'getPageMetrics') {
        const doc = document.documentElement;
        const body = document.body;
        const totalHeight = Math.max(doc.scrollHeight, body ? body.scrollHeight : 0);
        const totalWidth = Math.max(doc.scrollWidth, body ? body.scrollWidth : 0);
        const viewportWidth = window.innerWidth || doc.clientWidth;
        const viewportHeight = window.innerHeight || doc.clientHeight;
        sendResponse({
          totalWidth,
          totalHeight,
          viewportWidth,
          viewportHeight,
          devicePixelRatio: window.devicePixelRatio || 1,
          scrollY: window.scrollY || window.pageYOffset || doc.scrollTop || 0,
        });
      } else if (message.action === 'scrollTo') {
        const y = Math.max(0, message.y || 0);
        const delay = typeof message.delay === 'number' ? message.delay : 200;
        window.scrollTo(0, y);
        setTimeout(() => {
          sendResponse({
            scrollY: window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0,
          });
        }, delay);
        return true;
      } else if (message.action === 'startElementSelect') {
        let responded = false;
        let highlightEl = document.getElementById('fe-tools-node-highlight');
        const cleanup = () => {
          document.removeEventListener('mousemove', handleMove, true);
          document.removeEventListener('click', handleClick, true);
          document.removeEventListener('keydown', handleKey, true);
          if (highlightEl && highlightEl.parentNode) {
            highlightEl.parentNode.removeChild(highlightEl);
          }
          highlightEl = null;
        };
        const sendOnce = payload => {
          if (responded) return;
          responded = true;
          sendResponse(payload);
        };
        const ensureHighlight = () => {
          if (highlightEl) return;
          highlightEl = document.createElement('div');
          highlightEl.id = 'fe-tools-node-highlight';
          highlightEl.style.position = 'absolute';
          highlightEl.style.border = '2px solid #2969f7';
          highlightEl.style.background = 'rgba(41, 105, 247, 0.12)';
          highlightEl.style.pointerEvents = 'none';
          highlightEl.style.zIndex = '2147483647';
          document.body.appendChild(highlightEl);
        };
        const updateHighlight = target => {
          if (!target || !target.getBoundingClientRect) return;
          const rect = target.getBoundingClientRect();
          ensureHighlight();
          highlightEl.style.left = rect.left + window.scrollX + 'px';
          highlightEl.style.top = rect.top + window.scrollY + 'px';
          highlightEl.style.width = rect.width + 'px';
          highlightEl.style.height = rect.height + 'px';
        };
        const handleMove = event => {
          const target = event.target;
          if (target && target.nodeType === 1) {
            updateHighlight(target);
          }
        };
        const handleClick = event => {
          event.preventDefault();
          event.stopPropagation();
          const target = event.target;
          if (!target || target.nodeType !== 1) {
            sendOnce({
              success: false,
              error: 'selection failed',
            });
            cleanup();
            return;
          }
          const rect = target.getBoundingClientRect();
          sendOnce({
            success: true,
            rect: {
              left: rect.left + window.scrollX,
              top: rect.top + window.scrollY,
              width: rect.width,
              height: rect.height,
            },
          });
          cleanup();
        };
        const handleKey = event => {
          if (event.key === 'Escape') {
            sendOnce({
              success: false,
              error: 'selection canceled',
            });
            cleanup();
          }
        };
        ensureHighlight();
        document.addEventListener('mousemove', handleMove, true);
        document.addEventListener('click', handleClick, true);
        document.addEventListener('keydown', handleKey, true);
        return true;
      } else if (message.action === 'startElementSelectAndCapture') {
        let responded = false;
        let highlightEl = document.getElementById('fe-tools-node-highlight');
        const filename = message.filename || 'node-screenshot.png';
        const cleanup = () => {
          document.removeEventListener('mousemove', handleMove, true);
          document.removeEventListener('click', handleClick, true);
          document.removeEventListener('keydown', handleKey, true);
          if (highlightEl && highlightEl.parentNode) {
            highlightEl.parentNode.removeChild(highlightEl);
          }
          highlightEl = null;
        };
        const sendOnce = payload => {
          if (responded) return;
          responded = true;
          sendResponse(payload);
        };
        const ensureHighlight = () => {
          if (highlightEl) return;
          highlightEl = document.createElement('div');
          highlightEl.id = 'fe-tools-node-highlight';
          highlightEl.style.position = 'absolute';
          highlightEl.style.border = '2px solid #2969f7';
          highlightEl.style.background = 'rgba(41, 105, 247, 0.12)';
          highlightEl.style.pointerEvents = 'none';
          highlightEl.style.zIndex = '2147483647';
          document.body.appendChild(highlightEl);
        };
        const updateHighlight = target => {
          if (!target || !target.getBoundingClientRect) return;
          const rect = target.getBoundingClientRect();
          ensureHighlight();
          highlightEl.style.left = rect.left + window.scrollX + 'px';
          highlightEl.style.top = rect.top + window.scrollY + 'px';
          highlightEl.style.width = rect.width + 'px';
          highlightEl.style.height = rect.height + 'px';
        };
        const handleMove = event => {
          const target = event.target;
          if (target && target.nodeType === 1) {
            updateHighlight(target);
          }
        };
        const handleClick = event => {
          event.preventDefault();
          event.stopPropagation();
          const target = event.target;
          if (!target || target.nodeType !== 1) {
            sendOnce({
              success: false,
              error: 'selection failed',
            });
            cleanup();
            return;
          }
          const rect = target.getBoundingClientRect();
          const cropRect = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          };
          cleanup();
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              chrome.runtime.sendMessage(
                {
                  action: 'captureVisibleTab',
                },
                captureResp => {
                  if (chrome.runtime.lastError || !captureResp?.success || !captureResp.dataUrl) {
                    sendOnce({
                      success: false,
                      error: chrome.runtime.lastError?.message || captureResp?.error || 'capture failed',
                    });
                    return;
                  }
              const img = new Image();
              img.onload = () => {
                const scale = img.width / window.innerWidth;
                const sx = Math.max(0, Math.round(cropRect.left * scale));
                const sy = Math.max(0, Math.round(cropRect.top * scale));
                const sw = Math.max(0, Math.round(cropRect.width * scale));
                const sh = Math.max(0, Math.round(cropRect.height * scale));
                if (!sw || !sh) {
                  sendOnce({
                    success: false,
                    error: 'selection failed',
                  });
                  return;
                }
                const canvas = document.createElement('canvas');
                canvas.width = Math.min(sw, img.width - sx);
                canvas.height = Math.min(sh, img.height - sy);
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                  sendOnce({
                    success: false,
                    error: 'capture failed',
                  });
                  return;
                }
                ctx.drawImage(
                  img,
                  sx,
                  sy,
                  canvas.width,
                  canvas.height,
                  0,
                  0,
                  canvas.width,
                  canvas.height
                );
                const dataUrl = canvas.toDataURL('image/png');
                chrome.runtime.sendMessage(
                  {
                    action: 'downloadImage',
                    dataUrl,
                    filename,
                  },
                  downloadResp => {
                    if (chrome.runtime.lastError || !downloadResp?.success) {
                      sendOnce({
                        success: false,
                        error:
                          chrome.runtime.lastError?.message || downloadResp?.error || 'download failed',
                      });
                    } else {
                      sendOnce({
                        success: true,
                      });
                    }
                  }
                );
              };
                img.onerror = () => {
                  sendOnce({
                    success: false,
                    error: 'capture failed',
                  });
                };
                img.src = captureResp.dataUrl;
                }
              );
            });
          });
          return;
        };
        const handleKey = event => {
          if (event.key === 'Escape') {
            sendOnce({
              success: false,
              error: 'selection canceled',
            });
            cleanup();
          }
        };
        ensureHighlight();
        document.addEventListener('mousemove', handleMove, true);
        document.addEventListener('click', handleClick, true);
        document.addEventListener('keydown', handleKey, true);
        return true;
      }
    });
}
});
