// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8HAIT":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "48d4a72fc3fdd8eb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"g9e9u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "API_URL", ()=>API_URL);
var _menu = require("./menu");
var _menuDefault = parcelHelpers.interopDefault(_menu);
var _cards = require("./cards");
var _cardsDefault = parcelHelpers.interopDefault(_cards);
var _animation = require("./animation");
var _animationDefault = parcelHelpers.interopDefault(_animation);
const API_URL = "http://localhost:8080";
const menu = new (0, _menuDefault.default)([
    "Play"
]);
function initGame() {
    const card = new (0, _cardsDefault.default)();
    card.getCards();
    console.log("game launch");
    (0, _animationDefault.default)();
}
exports.default = initGame;

},{"./menu":"frHky","./cards":"wDC3l","./animation":"k5ez6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"frHky":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _intro = require("./intro");
var _introDefault = parcelHelpers.interopDefault(_intro);
var _sound = require("./sound");
var _soundDefault = parcelHelpers.interopDefault(_sound);
class GameMenu {
    constructor(options){
        this.options = options;
        this.play = false;
        this.createMenu();
        this.gameLaunch();
    }
    createMenu() {
        this.optionsList = document.querySelector(".options");
        for(let i = 0; i < this.options.length; i++){
            const option = document.createElement("button");
            option.classList.add(this.options[i].toLowerCase());
            option.innerText = this.options[i];
            this.optionsList.appendChild(option);
        }
    }
    gameLaunch() {
        const playButton = document.querySelector(".play");
        const menu = document.querySelector(".menu");
        const intro = document.querySelector(".intro");
        playButton.addEventListener("click", ()=>{
            menu.classList.add("disappear");
            intro.classList.remove("disappear");
            const audio = new (0, _soundDefault.default)();
            //audio.PlayMusic();
            (0, _introDefault.default)();
        });
    }
}
exports.default = GameMenu;

},{"./intro":"knEUC","./sound":"lGmhX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"knEUC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _game = require("./game");
var _gameDefault = parcelHelpers.interopDefault(_game);
function intro() {
    const introSection = document.querySelector(".intro");
    const game = document.querySelector(".game-ui");
    const eventButton = document.querySelector(".place button.visited");
    eventButton.addEventListener("click", ()=>{
        introSection.classList.add("appear");
        game.classList.remove("disappear");
        (0, _gameDefault.default)();
    });
}
exports.default = intro;

},{"./game":"g9e9u","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"lGmhX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Sound {
    constructor(){
        this.music = new Audio("./Audio/Music.wav");
    }
}
exports.default = Sound;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"wDC3l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _game = require("./game");
var _battle = require("./battle");
var _battleDefault = parcelHelpers.interopDefault(_battle);
class Card {
    constructor(){
        this.cards = [];
        this.json_obj = [];
        this.loading = false;
    }
    initClickEvent(data) {
        this.cards.forEach((card)=>{
            card.addEventListener("click", ()=>{
                const tab_id = card.getAttribute("tab_id");
                const card_id = card.getAttribute("card_id");
                const activeCard = data[tab_id];
                data.splice(tab_id, 1);
                (0, _battleDefault.default)(activeCard);
                card.classList.add("selected");
                setTimeout(()=>{
                    card.parentNode.removeChild(card);
                    this.playDrawcard(card_id);
                }, 700);
            });
        });
    }
    async fetchCards() {
        let response = await fetch(`${(0, _game.API_URL)}/init`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        this.showLoading();
        let data = await response.json();
        localStorage.setItem("listCards", JSON.stringify(data));
        const listCards = localStorage.getItem("listCards");
        this.json_obj = JSON.parse(listCards);
        return this.json_obj;
    }
    createCards(data) {
        const cardsContainer = document.querySelector(".cards");
        cardsContainer.innerHTML = "";
        for(let i = 0; i < data.length; i++){
            const cardsData = data[i];
            const cardElement = document.createElement("div");
            cardElement.setAttribute("tab_id", i);
            cardElement.setAttribute("card_id", cardsData.id);
            cardElement.classList.add("cards__item");
            cardElement.classList.add(`card-${i + 1}`);
            cardElement.innerHTML = `
      <img src="./Cards/${cardsData.Path}">
    `;
            cardsContainer.appendChild(cardElement);
        }
        this.cards = document.querySelectorAll(".cards__item");
        this.initClickEvent(data);
    }
    async getCards() {
        const data = await this.fetchCards();
        this.createCards(data);
    }
    async playDrawcard(id) {
        let response = await fetch(`${(0, _game.API_URL)}/play_drawcard?id=` + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await response.json();
        localStorage.setItem("listPlayerCards", JSON.stringify(data));
        const listCards = localStorage.getItem("listPlayerCards");
        this.json_obj = JSON.parse(listCards);
        this.createCards(this.json_obj);
    }
    showLoading() {
        this.loading = true;
        const loadingElement = document.querySelector(".loading");
        loadingElement.classList.add("disappear");
    }
}
exports.default = Card;

},{"./game":"g9e9u","./battle":"cHJbw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cHJbw":[function(require,module,exports) {
// set up global variables
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _allgo = require("./allgo");
var _allgoDefault = parcelHelpers.interopDefault(_allgo);
let iturn = 1;
let defence_p = 0;
let turndef_p = 0;
let defence_m = 0;
let turndef_m = 0;
let buff = false;
let turn_buff = 0;
// recover html id
hp_monster = document.getElementById("monster_hp");
hp_player = document.getElementById("player_hp");
mana_points = document.getElementById("mana_p");
// check if player or zombie are dead
function check_death() {
    hp_monster.textContent <= 0 ? alert("You Win!") : hp_player.textContent <= 0 && alert("You Lose!");
}
// gestion of mana points
function managestion(Cost) {
    mana_points.textContent -= Cost;
    console.log("Mana: ", mana_points.textContent);
    if (mana_points.textContent < 0) {
        alert("vous n'avez plus assez de mana pour lanc\xe9 votre competence vous pass\xe9 votre tour");
        turndef_m = Math.abs(turndef_m - 1);
        if (turndef_m <= 0) defence_m = 0;
        mana_points.textContent = 3;
        iturn += 1;
        return 1;
    }
    console.log("Mana2: ", mana_points.textContent);
    console.log("iturn%3: ", iturn % 3);
    if (iturn % 4 == 1) {
        console.log("gain en mana : 4");
        mana_points.textContent = 4;
    }
    return 0;
}
// gestion attaque buff
// function manage_buff(activeCard) {
//     if (activeCard.Buff === true || buff === true) {
//         buff = true;
//         turn_buff += 1;
//         if (turn_buff === 1) {
//             buff = true;
//         } else if (turn_buff === 3) {
//          buff = false;
//          turn_buff = 0;
//         }
//     }
// }
// gestion of player turn
function playerturn(activeCard) {
    let hp_p1 = hp_player.textContent;
    console.log(activeCard);
    if (managestion(activeCard.Cost) == 1) return;
    //manage_buff(activeCard);
    let nbr = (0, _allgoDefault.default)(activeCard.Attack, defence_m, activeCard.Heal, buff, false);
    defence_p += activeCard.Defence;
    if (defence_p > 0 && turndef_p == 0) turndef_p = 3;
    if (nbr >= 100) {
        hp_p1 = Math.floor(-hp_p1 - (nbr - 100)) * -1;
        hp_player.textContent = hp_p1;
        console.log("le pombier utilise une competence et se soigne de %i pv", nbr - 100);
        if (hp_p1 >= 180) hp_player.textContent = 180;
    } else if (nbr <= 99) {
        hp_monster.textContent -= nbr;
        console.log("le pombier utilise une competence et inflige %i de degat", nbr);
        check_death();
    }
    turndef_m <= 0 && (defence_m = 0);
    turndef_m = Math.abs(turndef_m - 1);
    iturn += 1;
}
// gestion of all zombie attack
function monsterattack(alea1) {
    let damage = 0;
    let regen = Math.random() * 0.2 + 0.3;
    let hp_m = hp_monster.textContent;
    //attack basic
    if (alea1 >= 0 && alea1 <= 6) {
        damage = (0, _allgoDefault.default)(10, defence_p, 0, false, false);
        hp_player.textContent -= damage;
        check_death();
        console.log("zombie utilise attaque basique est fait %i damage", damage);
    //strong attack
    } else if (alea1 >= 7 && alea1 <= 9) {
        damage = (0, _allgoDefault.default)(11, defence_p, 0, true, false);
        hp_player.textContent -= damage;
        check_death();
        console.log("zombie utilise forte attack est fait %i damage", damage);
    } else if (alea1 == 10) {
        damage = (0, _allgoDefault.default)(10, defence_p, 0, false, false);
        regen = damage * regen;
        hp_m = Math.floor((-regen - hp_m) * -1);
        hp_m >= 100 ? hp_monster.textContent = 100 : hp_monster.textContent = hp_m;
        hp_player.textContent -= damage;
        check_death();
        console.log("zombie utilise steal life attack est fait %i dommage et recupere %i de vie", damage, regen);
    }
}
// gestion of all zombie heal
function monsterheal(alea1) {
    let heal = 0;
    let hp_m = hp_monster.textContent;
    //heal basic
    if (alea1 >= 0 && alea1 <= 8) {
        heal = (0, _allgoDefault.default)(0, 0, 10, false, false);
        hp_m = Math.floor(-hp_m - (heal - 100)) * -1;
        hp_monster.textContent = hp_m;
        console.log("le zombie utilise une competence de soin basique et r\xe9cup\xe9re %i pv", heal - 100);
        if (hp_m >= 100) hp_monster.textContent = 100;
        //strong heal
        if (alea1 >= 9 && alea1 <= 10) {
            heal = (0, _allgoDefault.default)(0, 0, 13, false, false);
            hp_m = Math.floor(-hp_p - (heal - 100)) * -1;
            hp_monster.textContent = hp_m;
            console.log("le zombie utilise une forte competence de soin et recup\xe9re %i pv", heal - 100);
            if (hp_p >= 180) hp_player.textContent = 180;
        }
    }
}
// gestion of all zombie defence
function monsterdefence() {
    defence_m += 15;
    turndef_m = 3;
    console.log("le zombie se renforce et augmente sa defense");
}
// gestion of zombie turn
function monsterturn(nbr) {
    alea = Math.floor(Math.random() * 10 + 1);
    managestion(0);
    switch(nbr){
        //attack
        case 1:
        case 2:
        case 3:
            monsterattack(alea);
            break;
        //heal
        case 4:
            monsterheal(alea);
            break;
        //defence
        case 5:
            monsterdefence();
            break;
    }
    turndef_p = Math.abs(turndef_p - 1);
    if (turndef_p <= 0) defence_p = 0;
    iturn += 1;
}
function turngestion(activeCard) {
    console.log("tour avant la baisse de d\xe9fense du joueur: %i", turndef_p);
    console.log("tour avant la baisse de d\xe9fense du zombie: %i", turndef_m);
    console.log("tour de jeu: %i", iturn);
    if (iturn % 2 == 1) {
        console.log("Tour du joueur");
        playerturn(activeCard);
    } else if (iturn % 2 == 0) {
        console.log("Tour du zombie");
        monsterturn(Math.floor(Math.random() * 5 + 1));
    } else console.log("error");
}
exports.default = turngestion;

},{"./allgo":"hRUZT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hRUZT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const MIN_DAMAGE = 1.3;
const MAX_DAMAGE = 0.7;
const BUFF_MULTIPLIER = 1.5;
const DEBUFF_MULTIPLIER = 0.5;
let CRITICAL_HIT_CHANCE = 0.1;
let MISS_CHANCE = 0.05;
let ATTACK_RANGE = [
    1,
    1
];
// calculate damage
function calculateDamage(attack, defence, isBuff, isDeBuff) {
    let damage = (Math.random() * (MIN_DAMAGE - MAX_DAMAGE) + MIN_DAMAGE) * attack;
    let damageModifier = (isBuff ? BUFF_MULTIPLIER : 1) * (isDeBuff ? DEBUFF_MULTIPLIER : 1);
    damage = Math.floor(damage * damageModifier);
    // chance of critical hit
    let isCriticalHit = Math.random() < CRITICAL_HIT_CHANCE;
    if (isCriticalHit) {
        damage = damage * 2;
        alert("critical hit!");
    }
    //chance of miss
    let isMiss = Math.random() < MISS_CHANCE;
    if (isMiss) {
        damage = 0;
        alert("miss!");
    } else damage = Math.max(Math.floor(damage - defence * 0.7), 1);
    return damage;
}
// finale degat gestion
function finaledegat(attack, defence, isBuff, isDeBuff) {
    let finalDamage = 0;
    let attackCount = ATTACK_RANGE[1] - ATTACK_RANGE[0] + 1;
    for(let i = 0; i < attackCount; i++)finalDamage += calculateDamage(attack, defence, isBuff, isDeBuff);
    finalDamage = Math.floor(finalDamage / attackCount);
    return finalDamage;
}
//  calculate health
function healcalculate(heal) {
    heal *= Math.random() * (MIN_DAMAGE - MAX_DAMAGE) + MIN_DAMAGE;
    let isCriticalHeal = Math.random() < CRITICAL_HIT_CHANCE;
    if (isCriticalHeal) {
        heal = heal * 2;
        alert("critical heal!");
    }
    let isMiss = Math.random() < MISS_CHANCE;
    if (isMiss) {
        heal = 0;
        alert("miss!");
    } else return heal;
}
function allgo(attack, defence, heal, isBuff, isDeBuff) {
    if (attack === 0 && heal > 0) {
        let nbrheal = healcalculate(heal);
        return nbrheal + 100;
    } else if (attack > 0 && heal === 0) {
        let nbrdegat = finaledegat(attack, defence, isBuff, isDeBuff);
        return nbrdegat;
    } else console.log("cards de defense ou cards inutile");
    return 0;
}
exports.default = allgo;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k5ez6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var tID;
function stopAnimate() {
    clearInterval(tID);
}
exports.default = stopAnimate;
function animateScript() {
    var position = 538;
    const interval = 100;
    const diff = 538;
    tID = setInterval(()=>{
        document.getElementById("image").style.backgroundPosition = `-${position}px 0px`;
        if (position < 5380) position = position + diff;
        else position = 538;
    }, interval);
}
exports.default = animateScript;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["8HAIT","g9e9u"], "g9e9u", "parcelRequire4c95")

//# sourceMappingURL=index.c3fdd8eb.js.map
