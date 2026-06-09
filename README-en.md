# fe-tools

> Common documentation/websites for front-end development, style/JS method libraries (TS), and typical project templates.

<a title="Common front-end documentation/websites, style/JS method libraries, and project templates" href="https://blog.michealwayne.cn/fe-tools/stable/#fe-tools" target="_blank"><img style="display: block; margin: 0 auto; width: 50%;" src="https://blog.michealwayne.cn/images/fe.jpg"/></a>

---

## 1. Common Websites

Contents:

- [1.1 HTML/CSS/JavaScript](https://github.com/MichealWayne/fe-tools#11-htmlcssjavascript)
- [1.2 Compatibility/Query](https://github.com/MichealWayne/fe-tools#12-%E5%85%BC%E5%AE%B9%E6%9F%A5%E8%AF%A2)
- [1.3 CSS Tools](https://github.com/MichealWayne/fe-tools#13-css%E5%B7%A5%E5%85%B7)
- [1.4 JS Plugins/Libraries](https://github.com/MichealWayne/fe-tools#14-js%E6%8F%92%E4%BB%B6%E5%BA%93)
- [1.5 Vue](https://github.com/MichealWayne/fe-tools#15-vue)
- [1.6 React](https://github.com/MichealWayne/fe-tools#16-react)
- [1.7 Nodejs and Building](https://github.com/MichealWayne/fe-tools#17-nodejs%E5%92%8C%E6%9E%84%E5%BB%BA)
- [1.8 Hybrid and Cross-Platform](https://github.com/MichealWayne/fe-tools#18-hybird%E5%92%8C%E8%B7%A8%E7%AB%AF)
- [1.9 Auxiliary Tools](https://github.com/MichealWayne/fe-tools#19-%E8%BE%85%E5%8A%A9%E5%B7%A5%E5%85%B7)
- [1.10 Testing, Security, and Encryption](https://github.com/MichealWayne/fe-tools#110-%E6%B5%8B%E8%AF%95%E5%AE%89%E5%85%A8%E5%8F%8A%E5%8A%A0%E5%AF%86)
- [1.11 AI Artificial Intelligence Library](https://github.com/MichealWayne/fe-tools#111-ai-artificial-intelligence-library)
- [1.12 WebAssembly](https://github.com/MichealWayne/fe-tools#112-webassembly)
- [1.13 IDE Plugins](https://github.com/MichealWayne/fe-tools#113-ide-plugins)
- [1.14 Web3/Blockchain](https://github.com/MichealWayne/fe-tools#114-web3blockchain)
- [1.15 Life Edition](https://github.com/MichealWayne/fe-tools#115-life-edition)

> Note: Some options can be considered by asking [Deepseek](https://chat.deepseek.com/) / [chatGPT](https://chat.openai.com/chat) / [Claude](https://claude.ai/chats) / [Kimi](https://kimi.moonshot.cn/) first, and then judging based on the comprehensive information.

### 1.1 HTML/CSS/JavaScript/WASM/Dart

| Address                                                                                                                                                                                                                 | Tag           | Description                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| https://developer.mozilla.org/en-US/docs/Web                                                                                                                                                                            | html/css/js   | A very comprehensive and useful front-end query/learning website produced by Mozilla.                                                         |
| https://developer.mozilla.org/zh-CN/docs/Web                                                                                                                                                                            | html/css/js   | MDN docs in Chinese.                                                                                                                          |
| https://developer.mozilla.org/en-US/plus/ai-help                                                                                                                                                                        | html/css/js   | MDN AI assistant for documentation Q&A.                                                                                                       |
| https://www.w3.org/                                                                                                                                                                                                     | html/css/js   | The official W3C standard.                                                                                                                    |
| https://www.w3schools.com/                                                                                                                                                                                              | w3cschool     | W3C School, an international popular web development learning website.                                                                        |
| https://www.w3.org/Style/CSS/                                                                                                                                                                                           | w3c-css       | W3C CSS documentation.                                                                                                                        |
| https://www.runoob.com/cssref/css-reference.html                                                                                                                                                                        | css           | Quickly query CSS properties and basic usage.                                                                                                 |
| https://www.canvasapi.cn/                                                                                                                                                                                               | canvas        | Collection of canvas API methods.                                                                                                             |
| https://www.w3.org/Graphics/SVG/                                                                                                                                                                                        | svg           | W3C website, SVG documentation.                                                                                                               |
| http://www.t086.com/code/vml/                                                                                                                                                                                           | VML(IE)       | Historical reference: IE6/IE7-era graphics drawing technology, useful for understanding legacy compatibility approaches; not recommended for new projects. |
| https://www.typescriptlang.org/docs/handbook/intro.html                                                                                                                                                                 | typescript    | TypeScript official manual.                                                                                                                   |
| https://github.com/type-challenges/type-challenges                                                                                                                                                                      | ts-challenges | TypeScript Challenges, online learning/checking of one's TypeScript type programming level.                                                   |
| https://www.ecma-international.org/publications-and-standards/standards/                                                                                                                                                | ecma          | ECMAScript protocol standard.                                                                                                                 |
| http://www.ecma-international.org/ecma-262/6.0/                                                                                                                                                                         | ES6           | ECMAScript 6 official documentation.                                                                                                          |
| https://www.ecma-international.org/ecma-262/6.0/                                                                                                                                                                        | ES6           | Historical reference: ECMAScript 2015/ES6 official version page; modern standards should use the latest ECMA-262 and MDN. |
| https://ecma262.docschina.org/                                                                                                                                                                                          | ES6           | Historical reference: Chinese ECMAScript translation resources; incomplete and updated slowly, so ECMA official docs and MDN are preferred. |
| http://es6-features.org/                                                                                                                                                                                                | ES6           | Historical reference: ES6 feature demo site, useful for quickly reviewing ES6 syntax; use MDN/TC39 for modern features. |
| http://es6.ruanyifeng.com/                                                                                                                                                                                              | ES6           | The most frequently used ECMAScript 6 documentation in China, especially suitable for beginners.                                              |
| https://es6.ruanyifeng.com/                                                                                                                                                                                             | ES6           | Classic Chinese ES6 introduction, useful for fundamentals; modern JS features should use MDN/TC39/latest ECMA-262 as the source of truth. |
| http://www.html5plus.org/doc/h5p.html                                                                                                                                                                                   | html5         | HTML5 web API query, such as camera/geolocation.                                                                                              |
| [https://developer.apple.com/library/archive/](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocorrect) | html          | Safari webview HTML tag query, used for mobile web development, such as some iOS-specific attributes or behaviors can be found here.          |
| https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocorrect                                                | html          | Safari webview HTML tag query (direct link).                                                                                                   |
| https://webkit.org/status/                                                                                                                                                                                              | webkit        | WebKit official website documentation, js/css feature status support query.                                                                   |
| https://dart.dev/                                                                                                                                                                                                       | dart          | Dart language English official website.                                                                                                       |
| https://www.dartcn.com/guides/language/language-tour                                                                                                                                                                    | dart          | Dart language Chinese learning website.                                                                                                       |
| https://www.rfc-editor.org/                                                                                                                                                                                             | rfc/http      | RFC protocol official website, can query HTTP protocol and other content.                                                                     |
| https://www.iana.org/assignments/media-types/media-types.xhtml                                                                                                                                                          | MIME          | Media type list, MIME.                                                                                                                        |
| https://webassembly.org/                                                                                                                                                                                                | wasm          | Web Assembly (wasm) English official website.                                                                                                 |
| https://wasmtime.dev/                                                                                                                                                                                                   | wasmtime      | WebAssembly/WASI runtime, useful for understanding Wasm on servers and the edge. |
| https://github.com/bytecodealliance/jco                                                                                                                                                                                 | jco           | Bytecode Alliance JavaScript toolchain for interoperability between WebAssembly Component Model and JS. |
| https://www.wasm.com.cn/                                                                                                                                                                                                | wasm          | Web Assembly (wasm) Chinese website.                                                                                                          |
| https://docs.krustlet.dev/                                                                                                                                                                                              | krustlet      | Historical/specialized reference: experimental approach for running Wasm workloads in Kubernetes, not a general frontend Wasm framework. |

### 1.2 Compatibility/Query

| Address                                                  | Tag         | Description                                                                                                                                   |
| -------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| https://caniuse.com/                                     | caniuse     | The most frequently used website for compatibility support queries.                                                                           |
| https://github.com/compat-table/compat-table             | js          | ECMAScript compatibility query.                                                                                                               |
| https://wechat-miniprogram.github.io/miniprogram-compat/ | weapp       | Compatibility query for WeChat mini-program ES API and corresponding mini-program environment versions.                                       |
| http://iosfonts.com/                                     | ios font    | iOS system built-in font support query.                                                                                                       |
| https://www.bootcss.com/p/websafecolors/                 | web color   | Historical reference: 216 web-safe colors were an early device/browser compatibility concept and are no longer a hard constraint for modern UI design. |
| https://gs.statcounter.com/                              | statcounter | \*StatCounter's browser usage statistics report.                                                                                              |
| http://tongji.baidu.com/data/browser                     | browser     | Third-party reference: Baidu statistics-related browser/app share data source; keep if the link works, and cross-check with StatCounter/internal analytics. |

### 1.3 CSS Tools

### 1.3.1 Preprocessors

| Address                              | Tag    | Description                                         |
| ------------------------------------ | ------ | --------------------------------------------------- |
| https://lesscss.org/                 | less   | Easy-to-use CSS preprocessor tool.                  |
| https://sass-guidelin.es/zh/         | sass   | Popular CSS preprocessor tool.                      |
| http://stylus-lang.com/              | stylus | Feature-rich CSS preprocessor tool.                 |
| https://stylus-lang.com/             | stylus | Official documentation for Stylus.                  |
| http://www.zhangxinxu.com/jq/stylus/ | stylus | Stylus Chinese documentation.                       |
| https://asmcss.com/                  | asmcss | Assembler CSS official documentation, Just-in-time. |
| https://github.com/parcel-bundler/lightningcss | lightningcss | Ultra-fast Rust CSS parser/transformer/minifier, often used to replace parts of PostCSS/minifier in build pipelines. |
| https://github.com/tailwindlabs/tailwindcss-typography | tailwind-typography | Official prose typography plugin (commonly used for Markdown/rich text). |
| https://github.com/chakra-ui/panda | panda-css | Build-time, type-safe CSS-in-JS/atomic solution (popular for design systems). |

### 1.3.2 Postprocessors

| Address                                              | Tag          | Description                                                            |
| ---------------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| https://postcss.org/                                 | postcss      | Widely used CSS postprocessor, commonly used in CSS transforms, plugin processing, and engineering pipelines. |
| https://github.com/postcss/postcss                   | postcss      | PostCSS plugin ecosystem entry point. |
| https://github.com/postcss/autoprefixer              | autoprefixer | Postprocessing tool for automatically adding CSS prefixes.             |
| https://cssnano.co/                                  | cssnano      | CSS optimization and decomposition plugin.                             |
| https://www.npmjs.com/package/postcss-plugin-px2rem  | px2rem       | Tool that converts px units to rem units.                              |
| https://www.npmjs.com/package/postcss-px-to-viewport | px2vw        | Tool that converts px units to vw units.                               |
| https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env | postcss-preset-env | Modern replacement for cssnext, used to transform newer CSS syntax according to target browsers. |

### 1.3.3 Style Library/Module

| Address                                  | Tag              | Description                                                                    |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| https://css.30secondsofcode.org/         | 30s-of-code(css) | A collection of commonly used CSS style modules from the 30s of code series.   |
| https://daneden.github.io/animate.css/   | bulma.css        | A CSS3 animation library.                                                      |
| http://ianlunn.github.io/Hover/          | Hover.css        | A library of PC mouse hover interactive animations.                            |
| https://bulma.io/                        | bulma.css        | A lightweight CSS UI library.                                                  |
| http://cardinalcss.com/                  | cardinal.css     | Historical reference: early mobile-first Less style library; new projects usually prefer Tailwind/UnoCSS/modern component libraries. |
| http://bootflat.github.io/index.html     | bootflat.css     | Historical reference: Bootstrap 3-era flat-style SCSS library, useful for legacy maintenance. |
| https://jamiewilson.io/corpus/           | corpus.css       | Historical reference: niche SCSS collection; new projects should prefer modern CSS architecture or component libraries. |
| https://github.com/Tencent/weui          | weui             | A style library in the WeChat style, by Tencent.                               |
| http://www.materializecss.cn/            | materializecss   | A responsive front-end style framework in the Material style.                  |
| https://www.muicss.com/                  | MUI              | A lightweight front-end style framework in the Material style.                 |
| https://www.muicss.com                   | MUI              | MUI (no trailing slash).                                                       |
| https://metroui.org.ua/                  | Metro UI         | A popular responsive front-end style framework, https://react.metroui.org.ua/. |
| https://react.metroui.org.ua/            | Metro UI React   | React version of Metro UI.                                                     |
| https://nostalgic-css.github.io/NES.css/ | NES.css          | A front-end style framework in the pixelated style of game consoles.           |
| https://www.getpapercss.com/             | paper.css        | A front-end style framework in the hand-drawn style.                           |
| https://www.getpapercss.com              | paper.css        | paper.css (no trailing slash).                                                 |
| http://www.uiplayground.in/css3-icons/   | css3 icon        | Icons implemented purely in CSS.                                               |
| https://getbootstrap.com/docs/           | bootstrap        | Classic responsive frontend style framework, still suitable for some admin, website, and prototype scenarios. |
| https://www.layui.com/doc/               | layui            | A front-end UI framework written in its own module specification.              |
| https://fontawesome.com/                 | fontawesome      | A font icon library.                                                           |
| https://www.iconfont.cn/                 | iconfont         | A font icon library by Alibaba.                                                |
| http://necolas.github.io/normalize.css/  | normalize        | A relatively better CSS reset alternative.                                     |
| https://tailwindcss.com/                 | tailwind         | Utility-first CSS framework for quickly building customized UI and design systems. |
| https://unocss.dev/                      | unocss           | Atomic, on-demand CSS modular engine, inspired by Tailwind.                    |
| https://vanilla-extract.style/           | vanilla-extract  | TypeScript-first zero-runtime CSS-in-JS solution, suitable for design systems and component libraries. |
| https://stylelint.io/                    | stylelint        | CSS/SCSS/Less style linting tool commonly used as a modern style quality gate. |

### 1.3.4 Others

| Address                                                              | Tag                  | Description                                                                         |
| -------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------- |
| https://qishaoxuan.github.io/css_tricks/                             | css tricks           | Includes CSS tricks such as layout, icons, animations, etc.                         |
| https://en.bem.info/methodology/quick-start/                         | bem                  | BEM writing specification.                                                          |
| https://acss.io/                                                     | acss                 | Atomic CSS, a modular writing specification.                                        |
| https://csswizardry.net/talks/2014/11/itcss-dafed.pdf                | itcss                | IT CSS, a component-based writing specification.                                    |
| https://glenmaddern.com/articles/css-modules                         | css-modules          | A solution for modularizing CSS styles.                                             |
| https://github.com/MicheleBertoli/css-in-js                          | css-in-js            | Generates CSS styles by writing in JavaScript.                                      |
| https://github.com/emotion-js/emotion                                 | emotion              | Popular CSS-in-JS library, common in the React ecosystem.                           |
| https://stitches.dev/                                                 | stitches             | Modern CSS-in-JS solution, suitable for component variants and design systems.       |
| http://blog.michealwayne.cn/Moo-CSS/docs/moocss/#m%E6%A8%A1%E5%9D%97 | moo-css              | A CSS writing solution.                                                             |
| https://github.com/l-hammer/You-need-to-know-css                     | You-need-to-know-css | A collection of CSS tricks.                                                         |
| https://logotyp.us/                                                  | logotyp              | A collection of logos from well-known companies/businesses in and outside of China. |
| https://uiverse.io/                                                  | `uiverse`            | CSS component collection, claiming to be "the largest open-source UI library".      |

### 1.4 JS Plugins/Libraries

### 1.4.1 Libraries

| Address                                              | Tag               | Description                                                                                                                                                                                            |
| ---------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| https://lodash.com/docs/                             | lodash            | A well-known functional utility library.                                                                                                                                                               |
| https://github.com/ramda/ramda                       | ramda             | A popular functional utility library.                                                                                                                                                                  |
| https://gcanti.github.io/fp-ts/                      | fp-ts             | A TypeScript-encapsulated library following the functional programming paradigm.                                                                                                                       |
| https://github.com/rayepps/radash                    | radash            | A TypeScript-functional utility library.                                                                                                                                                               |
| https://github.com/toss/es-toolkit                   | es-toolkit        | High-performance utility library for modern JS/TS, suitable as a modern lodash/radash-like option. |
| https://underscorejs.org/                            | underscorejs      | A once-popular functional utility library.                                                                                                                                                             |
| https://api.jquery.com/                              | jQuery            | Maintenance reference: classic DOM/Ajax/plugin ecosystem library, common in old projects; usually not the default foundation for new projects. |
| https://zeptojs.com/                                 | Zepto             | Historical reference: early lightweight jQuery alternative for mobile Web, useful for legacy maintenance. |
| https://github.com/basecss/city                      | city              | Administrative division data files for all provinces and cities in China.                                                                                                                              |
| http://phaser.io/                                    | phaser            | A 2D game front-end library.                                                                                                                                                                           |
| http://fabricjs.com/                                 | fabricjs          | A well-known library that encapsulates SVG and canvas conversion.                                                                                                                                      |
| https://www.babylonjs.com/                           | babylonjs         | A well-known 3D game/video framework.                                                                                                                                                                  |
| https://immutable-js.github.io/immutable-js/         | immutable         | Production-level support for List, Stack, Map, OrderedMap, Set, OrderedSet, and Record data structures for JavaScript, usually used for ReactJs.                                                       |
| https://github.com/alibaba/GCanvas                   | gcanvas           | A lightweight, cross-platform graphic engine (web/weex/react-native), developed by Alibaba.                                                                                                            |
| https://github.com/jayphelps/core-decorators         | core-decorators   | A rich decorator encapsulation library based on ES2016/2017 decorator syntax.                                                                                                                          |
| https://github.com/prettymuchbryce/http-status-codes | http-status-codes | Constants for enumerating HTTP status codes. Supports all status codes defined in RFC1945 (HTTP/1.0), RFC2616 (HTTP/1.1), and RFC2518 (WebDAV). Commonly used for ajax request processing, TypeScript. |
| https://zod.dev/README_ZH                            | zod               | A schema declaration and verification library headed by TypeScript, which can be used for digital format verification and generation of ts declarations.                                               |
| https://github.com/dart-archive/ts2dart              | ts2dart           | Historical reference: early TypeScript-to-Dart tool, unmaintained for years; useful for understanding old approaches but not recommended for new projects. |
| https://github.com/inversify/InversifyJS             | inversify         | A TypeScript/JavaScript IoC container library.                                                                                                                                                         |
| https://github.com/young-steveo/bottlejs             | bottlejs          | A lightweight JavaScript/TypeScript dependency injection container library with lazy loading features.                                                                                                 |

### 1.4.2 Data Tools

| Address                                           | Tag             | Explanation                                                                             |
| ------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------- |
| https://stdlib.io/                                | stdlib          | Math enhancement library for js.                                                        |
| http://winterbe.github.io/streamjs/               | streamjs        | A tool for manipulating js data.                                                        |
| https://baconjs.github.io/                        | baconjs         | Another tool for manipulating js data.                                                  |
| https://date-fns.org/                             | date-fns        | A modular date formatting tool that supports on-demand usage.                           |
| https://moment.github.io/luxon/                   | luxon           | Modern date/time library from the Moment team, suitable for time zones, internationalization, and related scenarios. |
| https://tc39.es/proposal-temporal/docs/           | temporal        | Modern JavaScript date/time API proposal documentation, useful for understanding future native time handling. |
| https://day.js.org/                               | dayjs           | A lightweight date formatting tool that serves as an alternative to MomentJS.           |
| https://momentjs.com/                             | momentjs        | Maintenance reference: common date library in old projects; new projects should prefer Day.js, date-fns, Luxon, or Temporal. |
| http://numbrojs.com/                              | numbrojs        | A multi-language number conversion tool.                                                |
| http://numeraljs.com/                             | numeraljs       | A js library for formatting and manipulating numbers.                                   |
| http://openexchangerates.github.io/accounting.js/ | accounting.js   | A tool for formatting numbers and money.                                                |
| http://openexchangerates.github.io/money.js/      | money.js        | A tool for converting money exchange rates.                                             |
| https://github.com/MikeMcl/decimal.js#readme      | decimal.js      | A js library for precision processing.                                                  |
| https://tanstack.com/query/latest                 | tanstack-query  | Asynchronous state management library for TS/JS, React, Solid, Vue, Svelte, and Angular. |
| https://swr.vercel.app/                           | swr             | React data fetching and caching Hooks library, suitable for lightweight server-state scenarios. |

### 1.4.3 Requests, Cookies, and Caching

| Address                                    | Tag         | Explanation                                                                           |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------- |
| https://github.com/axios/axios             | axios       | A commonly used ajax library.                                                         |
| https://github.com/github/fetch            | fetch       | Fetch API compatibility polyfill; modern browsers support Fetch natively, so use it only for older environments. |
| https://github.com/webmodules/jsonp        | jsonp       | Implements jsonp. (Axios does not support jsonp.)                                     |
| http://medialize.github.io/URI.js/         | uri         | A library for URI parsing and manipulation.                                           |
| https://github.com/marcuswestin/store.js/  | storage     | A library for storage encapsulation that is compatible with IE6.                      |
| https://github.com/js-cookie/js-cookie     | js-cookie   | A library for cookie encapsulation.                                                   |
| https://dexie.org/                         | dexiejs     | A library for encapsulating IndexedDB.                                                |
| https://developer.mozilla.org/zh-CN/docs/Web/API/Cache | cache-api | Browser-native Cache API, commonly used with Service Worker/PWA. |
| https://developer.chrome.com/docs/workbox  | workbox     | Google Service Worker/PWA caching strategy toolkit. |
| https://localforage.github.io/localForage/ | localForage | A library for offline storage based on IndexedDB, WebSQL, and localStorage. (Mozilla) |
| https://addyosmani.com/basket.js/          | basket.js   | Historical reference: early approach for caching script/css resources in localStorage; modern projects should prefer HTTP Cache, Service Worker, Cache API, or Workbox. |

### 1.4.4 Plugins

| Address                                                          | Tag              | Explanation                                                                                                                                |
| ---------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| https://www.swiper.com.cn/                                       | swiper           | A carousel plugin.                                                                                                                         |
| https://github.com/jacoborus/nanobar/                            | nanobar          | A colorful progress bar display plugin (IE7+).                                                                                             |
| https://sweetalert.js.org/                                       | sweetalertjs     | A good PC alert display plugin.                                                                                                            |
| https://github.com/lancedikson/bowser                            | bowserjs         | A browser detection plugin based on ua.                                                                                                    |
| https://clipboardjs.com/                                         | clipboardjs      | A plugin for controlling the clipboard.                                                                                                    |
| https://github.com/kazuhikoarase/qrcode-generator/tree/master/js | grcode-generator | A tool for generating QR codes.                                                                                                            |
| http://html2canvas.hertzen.com/documentation                     | html2canvas      | Converts html to images (canvas), which is equivalent to implementing webpage screenshots.                                                 |
| https://www.rrweb.io/                                            | rrweb            | A webpage "screen recording" tool based on style interception that captures and replays user operations.                                   |
| https://github.com/sofish/pen#readme                             | Pen Editor       | Historical reference: early lightweight Web editor; modern rich-text scenarios can reference ProseMirror, Tiptap, or Lexical. |
| https://nosir.github.io/cleave.js/                               | cleave.js        | A useful input control plugin.                                                                                                             |
| https://github.com/jackmoore/autosize                            | autosize.js      | A useful <textarea/> height auto-adaptation tool.                                                                                          |
| https://github.com/eligrey/FileSaver.js                          | FileSaver.js     | A plugin for saving characters/images/files on the webpage.                                                                                |
| http://danml.com/download.html                                   | download.js      | A plugin for saving characters/images/files on the webpage, which is faster than FileSaver.                                                |
| https://github.com/mailru/FileAPI                                | FileAPI          | A plugin for controlling file uploads.                                                                                                     |
| https://github.com/alexgibson/shake.js                           | shake.js         | A mobile-side shake and vibration monitoring plugin.                                                                                       |
| https://atomiks.github.io/tippyjs/                               | tippy.js         | A useful bubble component with a React version.                                                                                            |
| https://fusejs.io/                                               | fusejs           | A lightweight and useful js fuzzy search library.                                                                                          |
| https://minisearch.dev/                                           | minisearch       | Full-text search library for browser/Node, suitable for small local-search scenarios. |
| https://pagefind.app/                                             | pagefind         | Static-site full-text search tool, suitable for documentation sites and blogs. |
| https://www.algolia.com/                                         | algolia          | A useful search integration solution.                                                                                                      |
| https://opensource.appbase.io/dejavu/                            | dejavu           | An elastic search solution, which is tailored for tech-savvy users.                                                                        |
| https://kamranahmed.info/driver.js/#single-element-with-popover  | driverjs         | A lightweight plugin for user operation guidance.                                                                                          |
| https://michalsnik.github.io/aos/                                | aosjs            | A powerful page scrolling animation plugin.                                                                                                |
| http://lab.ejci.net/favico.js/                                   | favicojs         | Fun/special interaction plugin for dynamic favicon badges or animation, suitable for specific notification scenarios. |
| https://alvarotrigo.com/fullPage/                                | fullpagejs       | A plugin for quickly building full-screen scrolling pages.                                                                                 |
| https://github.com/buuing/lucky-canvas                           | lucky-canvas     | A lottery plugin that supports web and cross-platform compatibility with mini-programs (large turntables/nine-square grids/slot machines). |
| https://mattboldt.com/demos/typed-js/                            | typed.js         | A js UI library that simulates typewriter effects.                                                                                         |

### Video/Audio

| Address                                             | Tag            | Description                                         |
| --------------------------------------------------- | -------------- | --------------------------------------------------- |
| http://www.mediaelementjs.com/                      | mediaelementjs | A video control plugin.                             |
| https://videojs.com/                                | videojs        | A video control plugin.                             |
| https://github.com/video-dev/hls.js                 | hlsjs          | Browser-side HLS playback library, commonly used for live and on-demand streaming. |
| https://github.com/Dash-Industry-Forum/dash.js      | dashjs         | MPEG-DASH player library for adaptive streaming scenarios. |
| https://github.com/bilibili/flv.js                  | flvjs          | Flash-free FLV playback plugin, useful for legacy live/video scenarios. |
| https://github.com/goldfire/howler.js#documentation | howlerjs       | A video and audio control plugin.                   |
| http://jplayer.org/                                 | jplayer        | A jQuery video and audio control plugin.            |
| https://jplayer.org/                                | jplayer        | A jQuery video and audio control plugin (HTTPS).    |
| https://github.com/zohararad/audio5js               | audio5js       | Historical reference: early audio control plugin; modern complex audio scenarios should prefer Web Audio API, Tone.js, howler.js, or wavesurfer.js. |
| https://tonejs.github.io/                           | tonejs         | Web Audio framework for music creation, synthesizers, sequencers, and complex audio scenarios. |
| https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API | web-audio-api | Browser-native audio processing API for audio analysis, synthesis, and visualization. |
| https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Session_API | media-session | Browser Media Session API for controlling system media notifications, lock-screen playback, and related capabilities. |
| https://github.com/katspaugh/wavesurfer.js          | Wavesurfer.js  | A lightweight audio waveform player.                |

### Images

| Address                                      | Tag          | Description                                                     |
| -------------------------------------------- | ------------ | --------------------------------------------------------------- |
| http://camanjs.com/                          | camanjs      | Historical reference: early Web image processing plugin; modern projects can reference Sharp, Squoosh, Compressor.js, Jimp, and WebCodecs. |
| https://github.com/jimp-dev/jimp             | jimp         | JavaScript image processing library, suitable for simple image processing in Node/scripts. |
| https://developer.mozilla.org/zh-CN/docs/Web/API/WebCodecs_API | webcodecs | Low-level browser audio/video/image codec API for high-performance media processing. |
| https://github.com/KnicKnic/WASM-ImageMagick | wasm-imagemagick | WASM version of ImageMagick, useful for browser-side image format conversion and processing experiments. |
| https://sharp.pixelplumbing.com/             | sharp        | A powerful image processing tool.                               |
| https://github.com/GoogleChromeLabs/squoosh  | squoosh      | An excellent image compression solution with browser support.   |
| https://github.com/naptha/tesseract.js       | tesseract    | A powerful OCR recognition library.                             |
| https://imagesloaded.desandro.com/           | imagesloaded | A library for determining the loading status of element images. |
| https://github.com/fengyuanchen/cropperjs    | cropperjs    | An integrated image cropping plugin library.                    |
| https://fengyuanchen.github.io/viewerjs/     | viewerjs     | An integrated image browsing/simple processing plugin library.  |
| https://fengyuanchen.github.io/compressorjs/ | compressorjs | An integrated image compression processing plugin library.      |

### Strings

| Address                                   | Tag        | Description                                                                                       |
| ----------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| https://vocajs.com/                       | vocajs     | camelcase/modify/fill/truncate/escape/change case and more for strings.                           |
| http://alexcorvi.github.io/anchorme.js/   | anchormejs | Automatically convert links/URLs/email addresses in text to clickable anchor links.               |
| https://alexcorvi.github.io/anchorme.js/  | anchormejs | Automatically convert links/URLs/email addresses in text to clickable anchor links (HTTPS).       |
| https://github.com/jprichardson/string.js | stringjs   | Historical reference: old string utility library; modern projects should prefer native string APIs, lodash/radash, Voca, or es-toolkit. |
| https://github.com/ljharb/qs              | qsjs       | A library for handling URL parameters.                                                            |
| https://github.com/ai/nanoid              | nanoid     | Small, secure, URL-friendly unique string ID generator.                                           |
| https://github.com/uuidjs/uuid            | uuid       | A library for generating RFC-compliant UUIDs.                                                     |
| https://github.com/pvorb/node-md5         | md5        | Get the md5 of characters and buffers.                                                            |
| https://github.com/indutny/hash.js        | hash       | Hash functions in pure javascript.                                                                |

### 1.4.5 Tools

| Address                                            | Tag                | Description                                                                                          |
| -------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------- |
| https://requirejs.org/                             | requirejs          | Historical reference: AMD module tool, useful for old-project maintenance; modern projects should prefer ESM/Vite/Rollup/Webpack/Rspack. |
| https://seajs.github.io/seajs/docs/                | seajs              | Historical reference: CMD module tool, useful for understanding frontend modularization evolution and legacy maintenance. |
| https://browserify.org/                            | browserify         | Historical reference: browser-side Node-style require bundler; modern projects should prefer ESM/Vite/Rollup/Rspack. |
| https://github.com/rickharrison/validate.js        | validate.js        | A form validation tool.                                                                              |
| https://github.com/validatorjs/validator.js        | validator.js       | A well-known content validation tool, including email validation, numerical validation, etc.         |
| https://rxjs.dev/                                  | RxJS               | JS asynchronous/reactive programming library based on the ReactiveX concept.                         |
| https://github.com/kelektiv/node.bcrypt.js#readme  | bcrypt             | A library for password hash processing.                                                              |
| https://fakerjs.dev/                               | faker              | Generates fake data in browser/Node.js; current recommended package is @faker-js/faker.              |
| https://joi.dev/                                   | joi                | A powerful schema description language and data validator for js.                                    |
| https://github.com/JedWatson/classnames#readme     | classnames         | A tool for combining className conditions, often used in React.                                      |
| https://github.com/lukeed/clsx                     | clsx               | A lightweight (228B) tool for combining className conditions, often used in React.                   |
| https://github.com/pillarjs/path-to-regexp#readme  | path-to-regexp     | A URL or path validation tool with wide usage.                                                       |
| https://craig.is/killing/mice                      | Mousetrap          | A keyboard event registration and capture encapsulation library that supports Windows/Mac keyboards. |
| https://uaparser.dev/                              | UaParserJs         | Detect user's Browser, Engine, OS, CPU, and Device type/model. Runs either in browser or node.js.    |
| https://github.com/ericclemmons/click-to-component | click-to-component | Option+Click React components in your browser to instantly open the source in VS Code                |

### 1.4.6 Data Visualization (Charts)

| Address                                                                     | Tag            | Description                                                                                                                  |
| --------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| https://www.highcharts.com/docs/                                            | highcharts     | Mature commercial visualization library with strong compatibility and chart capabilities; enterprise use should pay attention to licensing. |
| https://echarts.apache.org/                                                 | echarts        | Powerful Apache open-source interactive charting and visualization library, widely used in Chinese business chart scenarios. |
| https://d3js.org/                                                           | d3             | Low-level data-driven visualization toolkit for highly customized SVG/Canvas/data visualization. |
| https://www.chartjs.org/docs/latest/                                        | chartjs        | Simple Canvas charting library for common business charts. |
| https://antv.antgroup.com/                                                  | G2/G6/X6/L7    | AntV visualization ecosystem covering statistical charts, graph analysis, flowchart/graph editing, and geographic visualization. |
| http://blog.michealwayne.cn/FundCharts/docs/                                | fundcharts     | My own lightweight visualizing library that can be used across platforms.                                                    |
| https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene | threejs/webGL  | A famous webGL 3D modeling library.                                                                                          |
| https://playcanvas.com/                                                     | playcanvas     | A webGL 3D modeling library for games.                                                                                       |
| http://scenejs.org/                                                         | scenejs        | Historical reference: early WebGL 3D base library; modern 3D/WebGL scenarios should prefer Three.js, Babylon.js, PlayCanvas, OGL, or React Three Fiber. |
| http://snapsvg.io/                                                          | snap           | An svg manipulation library.                                                                                                 |
| https://www.pixijs.com/                                                     | pixijs         | A 2D WebGL rendering engine.                                                                                                 |
| https://ogl.netlify.app/                                                    | ogl            | Lightweight WebGL library for lower-level but concise 3D/WebGL development. |
| https://docs.pmnd.rs/react-three-fiber/getting-started/introduction         | react-three-fiber | React renderer for Three.js, suitable for 3D scenes in React projects. |
| https://tresjs.org/                                                         | tresjs         | Vue ecosystem declarative Three.js wrapper, suitable for 3D scenes in Vue projects. |
| https://libcafe.com/3d/index.html                                           | svg-3d-builder | Historical/specialized reference: 3D SVG rendering engine, useful for understanding SVG 3D expression approaches. |
| https://github.com/jsplumb/jsplumb                                          | jsplumb        | A user-friendly library for visualizing flowcharts.                                                                          |
| https://js.cytoscape.org/                                                   | cytoscape      | A user-friendly library for visualizing relationship charts.                                                                 |
| https://mermaid.js.org/                                                     | mermaid        | Text-based tool for generating flowcharts, sequence diagrams, architecture diagrams, and other charts. |
| https://ecomfe.github.io/zrender-doc/public/                                | zrender        | A 2D rendering engine that supports Canvas/SVG/VML, also the rendering engine for ECharts.                                   |
| https://docs.mind-elixir.com/.                                              | Mind Elixir    | A mind map library with effects similar to xmind.                                                                            |
| https://docs.mind-elixir.com/                                               | mind-elixir    | A mind map library with effects similar to xmind.                                                                            |

### 1.4.7 Data Visualization (Maps)

| Address                | Tag           | Description                                      |
| ---------------------- | ------------- | ------------------------------------------------ |
| https://cesium.com/platform/cesiumjs/ | Cesium.js | 3D globe, GIS, and city modeling visualization library. |
| http://kartograph.org/                | Kartograph.js | Historical reference: early 2D SVG map display library; modern map/geographic visualization can reference Leaflet, MapLibre GL, deck.gl, CesiumJS, AntV L7, and ECharts Map. |
| https://leafletjs.com/                | Leaflet.js | A mobile-first map display plugin. |
| https://maplibre.org/                 | maplibre | Open-source map rendering library derived from Mapbox GL JS, suitable for vector map and custom map applications. |
| https://deck.gl/                      | deck-gl | Large-scale geospatial data visualization framework, suitable for advanced WebGL map layers. |
| https://l7.antv.antgroup.com/         | antv-l7 | AntV geographic visualization engine, suitable for map visualization in data dashboards. |

### 1.4.8 H5 Animation

| Address                                       | Tag             | Description                                                                                 |
| --------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| http://bouncejs.com/                          | BounceJS        | A powerful CSS3 animation creation tool.                                                    |
| https://github.com/bendc/animateplus          | Animateplus     | A lightweight animation tool at only 3k.                                                    |
| https://animejs.com/                          | animejs         | A lightweight JS animation library.                                                         |
| https://gsap.com/                             | gsap            | Mature high-performance JavaScript animation library, suitable for complex timeline and interaction animations. |
| https://motion.dev/                           | motion          | Modern animation library from the Framer Motion direction, covering React and vanilla JS scenarios. |
| https://auto-animate.formkit.com/             | auto-animate    | Zero-configuration layout transition animation library for lightweight UI motion. |
| https://www.theatrejs.com/                    | theatrejs       | Visual animation and interaction timeline tool, suitable for complex UI/3D animation authoring. |
| https://svgjs.com/docs/3.0/                   | svgjs           | A lightweight SVG manipulation/animation library.                                           |
| http://snapsvg.io/                            | Snap.svg        | A famous SVG manipulation/animation library.                                                |
| https://airbnb.io/lottie/#/                   | lottie          | Cross-platform animation solution for web/native/mini programs/RN.                          |
| https://createjs.com/easeljs                  | easeljs         | A canvas animation manipulation library, one of the CreateJS Four Knights.                  |
| https://createjs.com/tweenjs                  | tweenjs         | An animation curve (ease/linear...) manipulation library, one of the CreateJS Four Knights. |
| https://createjs.com/soundjs                  | soundjs         | An audio control library, one of the CreateJS Four Knights.                                 |
| https://createjs.com/preloadjs                | preload         | A resource preloading library, one of the CreateJS Four Knights.                            |
| https://p5js.org/                             | p5js            | A canvas drawing functionality library.                                                     |
| https://roughjs.com/                          | roughjs         | An interesting canvas drawing library (drawn graphics have a hand-drawn style).             |
| https://www.babylonjs.com/                    | BabylonJS       | Powerful, polished, open game and 3D rendering engine.                                      |
| https://github.com/sarcadass/granim.js#readme | granimjs        | A 17k animation JS library for creating fluid and interactive gradients.                    |
| https://catdad.github.io/canvas-confetti/     | canvas-confetti | performant confetti animation in the browser.                                               |

### 1.4.9 Mobile Gesture

| Address                                  | Tag         | Description                                                                   |
| ---------------------------------------- | ----------- | ----------------------------------------------------------------------------- |
| https://github.com/AlloyTeam/AlloyFinger | AlloyFinger | Adds various mobile gesture events.                                           |
| http://hammerjs.github.io/               | hammerjs    | A gesture encapsulation library that cancels the 300ms delay of mobile click. |
| https://interactjs.io/                   | interactjs  | Implements drag-and-drop, scaling, and multi-touch gestures using JavaScript. |
| https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_events | pointer-events | Browser pointer event API covering mouse, touch, and pen input, useful as the modern foundation for gesture handling. |

### 1.4.10 Loading

| Address                              | Tag             | Description                                      |
| ------------------------------------ | --------------- | ------------------------------------------------ |
| https://developer.mozilla.org/zh-CN/docs/Web/Performance/Lazy_loading | lazy-loading | MDN lazy-loading guide, covering native lazy loading and modern resource loading basics. |
| http://callmecavs.com/layzr.js/      | layzr.js        | Lightweight image lazy loading tool.             |
| https://github.com/aFarkas/lazysizes | lazysizes       | High-performance image/iframe lazy loading tool. |
| https://infinite-scroll.com/         | infinite-scroll | "Infinite" scroll loading plugin.                |
| https://pazguille.github.io/aload/   | aload.js        | Historical reference: asynchronous image/js/css loading tool. |

### 1.4.11 TypeScript Assistance

| Address                                                   | Tag                       | Description                                                                                  |
| --------------------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| https://github.com/TypeStrong/ts-loader                   | ts-loader                 | TypeScript build plugin in webpack.                                                          |
| https://github.com/s-panferov/awesome-typescript-loader   | awesome-typescript-loader | TypeScript build plugin in webpack, faster than ts-loader.                                   |
| https://github.com/kimamula/ts-transformer-keys#readme    | ts-transformer-keys       | Used to extract key value arrays of interfaces (requires webpack).                           |
| https://github.com/tamino-martinius/node-ts-dedent#readme | ts-dedent                 | Print normal line breaks for logs on the node side.                                          |
| https://github.com/kawamataryo/suppress-ts-errors         | suppress-ts-error         | Automatically add @ts-expect-error or @ts-ignore comments to all type errors in the project. |
| https://github.com/sindresorhus/type-fest                 | type-fest                 | Classic tool type encapsulation library.                                                     |
| https://github.com/sindresorhus/ts-extras                 | ts-extras                 | Practical TypeScript helper types and functions from Sindre Sorhus.                           |
| https://github.com/millsp/ts-toolbelt                     | ts-toolbelt               | Advanced TypeScript type toolkit, suitable for complex type programming.                       |
| https://microsoft.github.io/TypeChat/                     | typechat                  | Based on OpenAi GPT model ts type production tools, Microsoft.                               |

### 1.4.12 Others

| Address                                            | Tag                    | Description                                                                                                                                      |
| -------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| https://github.com/krausest/js-framework-benchmark | js-framework-benchmark | Performance comparison of various front-end frameworks based on Chrome, with an analysis site.                                                   |
| https://angular.io/                                | angular                | Classic front-end framework with high encapsulation.                                                                                             |
| https://github.com/sveltejs/svelte                 | svelte                 | Lightweight web application compiler without virtual DOM, template, recently popular.                                                            |
| https://solidjs.com/                               | solid                  | A library friendly to webComponent, with a development experience similar to React, which has been popular in foreign countries in recent years. |
| https://stenciljs.com/                             | stenciljs              | WebComponent's compilation and build framework, jsx.                                                                                             |
| https://www.infernojs.org/                         | infernojs              | Lightweight class React library, jsx.                                                                                                            |
| https://emberjs.com/                               | emberjs                | A powerful web development framework with scaffolding, template.                                                                                 |
| https://github.com/akxcv/vuera                     | vuera                  | A library for mixing Vue/React components, which means Vue can use React components and React can use Vue components.                            |
| https://github.com/devilwjp/veaury                 | veaury                 | A library for mixing Vue3/React components, better than vuera                                                                                    |
| https://quark-design.hellobike.com/                | quark                  | A mobile cross-framework UI component library based on Web Components, Hallo.                                                                    |
| https://astro.build/ | astro | Modern static site generator with multi-framework component support and zero JS runtime. |
| https://qwik.builder.io/ | qwik | Resumable web framework with zero hydration and instant loading. |
| https://fresh.deno.dev/ | fresh | Full-stack web framework based on Deno with zero configuration and edge-first. |
| https://remix.run/ | remix | Full-stack web framework focused on web standards and modern UX. |
| https://sveltekit.dev/ | sveltekit | Svelte's full-stack application framework, similar to Next.js. |
| https://alpinejs.dev/ | alpinejs | Lightweight declarative framework with Vue-like syntax. |
| https://lit.dev/ | lit | Simple library for building Web Components, by Google. |
| https://github.com/BuilderIO/partytown | partytown | Library for relocating third-party scripts to web workers. |
| https://github.com/web3/web3.js                    | web3js                 | Standard js encapsulation library for Ethereum.                                                                                                  |

### 1.5 Vue

| Address                                                  | Tag                       | Description                                                                                                                                |
| -------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| https://vuejs.org/                                       | vue                       | Vue3 official documentation.                                                                                                               |
| https://cn.vuejs.org/                                    | vue                       | Vue3 official documentation (Chinese).                                                                                                     |
| https://v2.cn.vuejs.org/                                 | vue                       | Vue 2 Chinese documentation, useful for legacy Vue 2 projects.                                                                             |
| https://vuejs.org/v2/guide/syntax.html                   | vue                       | Vue2 official documentation.                                                                                                               |
| https://cn.vuejs.org/v2/guide/syntax.html                | vue                       | Vue2 official documentation (Chinese).                                                                                                     |
| https://cli.vuejs.org/                                   | vue-cli                   | Vue scaffolding tool documentation.                                                                                                        |
| https://cli.vuejs.org/zh/                                | vue-cli                   | Vue CLI Chinese documentation, mostly for maintaining older Vue CLI projects.                                                              |
| https://github.com/vuejs/create-vue                      | create-vue                | Official Vue project scaffolding tool, recommended for modern Vue 3 projects.                                                              |
| https://cli.vuejs.org/zh/guide/cli-service.html#%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4 | vue-cli | Vue CLI docs (Chinese, CLI service usage).                                                                                                 |
| https://pinia.vuejs.org/                                 | pinia                     | Lightweight Vue state management tool recommended for Vue3.                                                                                |
| https://vuex.vuejs.org/                                  | vuex                      | Vue data flow control tool.                                                                                                                |
| https://vuex.vuejs.org/zh/                               | vuex                      | Vuex documentation (Chinese).                                                                                                              |
| https://router.vuejs.org/                                | vue-router                | Front-end routing control based on Vue.                                                                                                    |
| https://router.vuejs.org/zh/                             | vue-router                | Vue Router documentation (Chinese).                                                                                                        |
| https://danilowoz.com/create-vue-content-loader/         | create-vue-content-loader | Vue version of SVG skeleton screen plug-in.                                                                                                |
| http://danilowoz.com/create-vue-content-loader/          | create-vue-content-loader | Vue version of SVG skeleton screen plug-in (HTTP).                                                                                         |
| https://ustbhuangyi.github.io/better-scroll/doc/api.html | better-scroll             | Plugin for controlling scrolling scenes.                                                                                                   |
| http://ustbhuangyi.github.io/better-scroll/doc/api.html  | better-scroll             | Plugin for controlling scrolling scenes (HTTP).                                                                                            |
| https://youzan.github.io/vant/                           | vant                      | Mobile UI library from Youzan.                                                                                                             |
| https://youzan.github.io/vant/#/zh-CN/intro              | vant                      | Mobile UI library from Youzan (Chinese docs).                                                                                              |
| https://aidenzou.github.io/vue-weui/                     | vue-weui                  | Mobile UI component library in WeUI style.                                                                                                 |
| http://aidenzou.github.io/vue-weui/#!/                   | vue-weui                  | Mobile UI component library in WeUI style (Chinese).                                                                                       |
| https://element.eleme.cn/                                | element                   | UI component library for PC front-end development, from Eleme.                                                                             |
| https://element.eleme.cn/#/zh-CN                         | element                   | UI component library for PC front-end development (Chinese docs).                                                                          |
| https://element-plus.org/                                | element-plus              | Vue 3 version of Element UI, a mainstream desktop component library.                                                                       |
| https://www.naiveui.com/                                 | naive-ui                  | Vue 3 component library with TypeScript support and strong theming ability.                                                                |
| https://arco.design/vue/docs/start                       | arco-vue                  | Arco Design Vue component library from ByteDance.                                                                                          |
| https://tdesign.tencent.com/vue-next/overview            | tdesign-vue-next          | Tencent TDesign Vue 3 component library.                                                                                                   |
| https://github.com/hilongjw/vue-lazyload                 | vue-lazyload              | Vue version of image/component lazy loading plug-in.                                                                                       |
| http://v1.iviewui.com/docs/guide/install                 | iview                     | PC UI component library.                                                                                                                   |
| https://vue.ant.design/                                  | antd-vue                  | PC UI component library, Vue version of ant design.                                                                                        |
| https://vue.ant.design/docs/vue/introduce-cn/            | antd-vue                  | PC UI component library, Vue version of ant design (Chinese docs).                                                                         |
| https://kazupon.github.io/vue-i18n/                      | vue-i18n                  | Multi-language solution.                                                                                                                   |
| https://terryz.github.io/vue/#/region                    | v-region                  | Vue administrative region selection component.                                                                                             |
| https://github.com/ecomfe/vue-echarts                    | vue-echarts               | Echarts Vue encapsulation component.                                                                                                       |
| https://nuxt.com/                                        | nuxtjs                    | Modern Vue/Nuxt full-stack application framework.                                                                                          |
| https://zh.nuxtjs.org/                                   | nuxtjs                    | Vue server-side rendering application framework (Chinese docs).                                                                            |
| https://vite.dev/                                        | vitejs                    | Fast modern frontend build tool, default choice for many Vue projects.                                                                     |
| https://github.com/vuejs/vue-class-component#readme      | vue-class-component       | Component decorator encapsulation for Vue, used for jsx/tsx Vue component writing.                                                         |
| https://formilyjs.org/                                   | formilyjs                 | Element/Antd form DSL solution.                                                                                                            |
| https://github.com/privatenumber/vue-2-3                 | vue-2-3                   | A solution encapsulation for coexistence of Vue2 and Vue3.                                                                                 |
| https://docs-swrv.netlify.app/                           | SWRV                      | Vue hook library for data requests, handling request caching, status, and more.                                                            |
| https://www.attojs.org/                                  | vue-request               | The Vue hook library for data requests is slightly richer than swrv.                                                                       |
| https://vueuse.org/                                      | vue-use                   | Utility collection based on Vue Composition API, covering browser, state, sensors, animation, and other common hooks.                      |
| https://tanstack.com/query/latest/docs/framework/vue/overview | tanstack-query-vue | Vue adapter for TanStack Query, suitable for service-state management. |
| https://ui.nuxt.com/                                     | nuxt-ui                   | Nuxt official UI component library, suitable for Nuxt/Vue projects.                                                                        |
| https://github.com/devilwjp/vuereact-combined#readme     | vuereact-combined         | Use React in Vue2 and Vue2 in React, And as perfect as possible.                                                                           |
| https://github.com/devilwjp/veaury                       | veaury                    | Use React in Vue3 and Vue3 in React, And as perfect as possible.                                                                           |

### 1.6 React

| Address                                                        | Tag                   | Description                                                                                                                                       |
| -------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://react.dev/                                             | react                 | React official documentation.                                                                                                                     |
| https://react.docschina.org/                                   | react                 | React Chinese translation documentation.                                                                                                          |
| https://create-react-app.dev/                                  | create-react-app      | Historical reference: React scaffolding tool; modern new projects usually prefer Vite, Next.js, Remix, or framework templates.                     |
| https://github.com/facebook/react-devtools                     | react-devtools        | React Chrome development extension plugin.                                                                                                        |
| https://reactrouter.com/                                       | react-router          | Frontend routing library for React.                                                                                                               |
| https://zustand.docs.pmnd.rs/getting-started/introduction      | zustand               | A popular, simple and lightweight data flow control tool.                                                                                         |
| https://github.com/facebookexperimental/Recoil                 | recoil                | Simple and hook-friendly data flow control tool.                                                                                                  |
| https://redux-toolkit.js.org/                                  | redux                 | Official recommended Redux toolset for state management, reducer logic, and async flows.                                                           |
| https://facebookarchive.github.io/flux/                        | flux                  | Historical reference: data-flow architecture from the early React ecosystem.                                                                        |
| https://cn.mobx.js.org/                                        | mobx                  | Lightweight data flow control tool.                                                                                                               |
| https://dvajs.com/                                             | dvajs                 | Data flow solution based on redux and redux-saga, by Ant Financial.                                                                               |
| https://umijs.org/zh/                                          | umijs                 | Pluggable enterprise-level React application framework, by Ant Financial.                                                                         |
| http://rekit.js.org/                                           | rekit                 | React/Redux/React-router development tool/IDE.                                                                                                    |
| http://rekit.js.org                                            | rekit                 | React/Redux/React-router development tool/IDE (no trailing slash).                                                                                |
| https://nextjs.org/                                            | nextjs                | Lightweight React server-side rendering application framework.                                                                                    |
| https://www.gatsbyjs.cn/                                       | gatsbyjs              | Lightweight React static website building framework.                                                                                              |
| https://github.com/streamich/react-use                         | react-use             | Easy-to-use React custom hooks encapsulation library.                                                                                             |
| https://react-hook-form.com/                                   | react-hook-form       | High-performance React form state and validation library.                                                                                          |
| https://jotai.org/                                             | jotai                 | Atomic React state management library.                                                                                                            |
| https://valtio.dev/                                            | valtio                | Proxy-based React state management library.                                                                                                       |
| https://ahooks.js.org/                                         | ahooks                | React Hooks library from the Ant/Alibaba ecosystem, covering business scenarios and common interactions.                                            |
| https://cn.mobx.js.org/                                        | umi hooks             | Hooks methods for the middle office, such as requests, dragging, and debouncing.                                                                  |
| https://react-query.tanstack.com/docs/overview                 | react-query           | Easy-to-use React ajax interface request processing encapsulation hook.                                                                           |
| https://github.com/welldone-software/why-did-you-render#readme | why-did-you-render    | Tool for detecting whether React components need to be re-rendered.                                                                               |
| https://www.framer.com/motion/                                 | framer-motion         | Very powerful React animation/interaction gesture library, from Farmer API.                                                                       |
| http://danilowoz.com/create-content-loader/                    | create-content-loader | React version of SVG skeleton screen plugin.                                                                                                      |
| https://ui.shadcn.com/                                         | shadcn                | shadcn, atomic and flexible UI component library.                                                                                                 |
| https://www.radix-ui.com/                                      | radix-ui             | Unstyled accessible component primitives, often used with Tailwind/shadcn.                                                                         |
| https://react-spectrum.adobe.com/react-aria/                   | react-aria           | Adobe accessibility-first React UI primitives and hooks.                                                                                           |
| https://ant.design/docs/react/getting-started-cn               | antd                  | Ant design, PC UI component library.                                                                                                              |
| https://mobile.ant.design/index-cn                             | antd-mobile           | Mobile version of antd, UI component library.                                                                                                     |
| https://www.styled-components.com/                             | styled-components     | CSS-in-JS implementation for React.                                                                                                               |
| https://github.com/cristianbote/goober                         | goober                | CSS-in-JS library with only 1kb size.                                                                                                             |
| https://chatui.io/                                             | chatui.io             | A solution for conversational domains (frontend components), Alibaba.                                                                             |
| https://x.ant.design/index-cn                                  | ant-design-x          | A solution for conversational domains (frontend components), Ant Group.                                                                           |
| https://tanstack.com/router/latest                             | tanstack-router       | Type-safe routing library from the TanStack ecosystem.                                                                                            |
| https://tanstack.com/form/latest                               | tanstack-form         | Type-safe form state management library from the TanStack ecosystem.                                                                               |
| https://lexical.dev/                                           | lexical               | Meta open-source rich text editor framework.                                                                                                      |
| https://tiptap.dev/                                            | tiptap                | Headless rich text editor framework based on ProseMirror.                                                                                         |
| https://authjs.dev/                                            | authjs                | Authentication solution formerly known as NextAuth.js, suitable for Next.js and other frameworks.                                                  |
| https://www.heroui.com/                                        | heroui               | React UI component library evolved from NextUI.                                                                                                   |
| https://github.com/twobin/react-lazyload                       | react-lazyload        | React-based image/component loading plugin.                                                                                                       |
| https://github.com/jamiebuilds/react-loadable#readme           | react-loadable        | Implementing code abstraction and dynamic loading of React components.                                                                            |
| https://github.com/STRML/react-draggable                       | react-draggable       | A React encapsulation component for drag and drop operations.                                                                                     |
| https://github.com/react-dnd/react-dnd#readme                  | react-dnd             | Complex drag and drop control library for React, based on HTML5 drag and drop API.                                                                |
| https://github.com/JedWatson/react-tappable                    | react-tappable        | A React encapsulation component for click event operations.                                                                                       |
| https://github.com/tajo/react-portal#readme                    | react-portal          | A tool for rendering additional node components defined through portals.                                                                          |
| https://github.com/vkbansal/react-contextmenu                  | react-contextmenu     | PC web implementation of right-click menu tool components.                                                                                        |
| https://rexxars.github.io/react-markdown/                      | react-markdown        | Markdown tool for use on React.                                                                                                                   |
| https://github.com/30-seconds/30-seconds-of-react              | 30s-of-react          | Collection of commonly used React code modules, part of the 30s of code series.                                                                   |
| https://vasanthk.gitbooks.io/react-bits/                       | react-bits            | Common React tricks.                                                                                                                              |
| https://docsite.js.org/zh-cn/docs/addDoc.html                  | docsite               | React-based document generation tool.                                                                                                             |
| http://casesandberg.github.io/react-color/                     | react-color           | React-based color picker plugin, simulating Sketch, Photoshop, Chrome and other color picking tools. Note that it can be directly used in Preact. |
| http://reactdesktop.js.org/                                    | react-desktop         | React encapsulation component that simulates Mac or Windows desktop interaction.                                                                  |
| https://www.reactboilerplate.com/                              | react-boilerplate     | A typical React project template that prioritizes performance.                                                                                    |
| https://github.com/sstur/react-rte                             | react-rte             | Rich text editor based on draftJS.                                                                                                                |
| https://react.i18next.com/                                     | react-i18next         | Multi-language solution.                                                                                                                          |
| https://swr.vercel.app/                                        | swr                   | React Hooks library for data requests, handling request caching, state, and more.                                                                 |
| https://formik.org/                                            | formik                | Highly encapsulated, out-of-the-box form wrapper library for React Forms.                                                                         |

#### 1.6.1 Next.js

| Address                                                        | Tag                   | Description                                                                                                                                       |
| -------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://nextjs.org/docs/app | nextjs-app-router | Next.js App Router documentation, the current main direction for Next.js applications. |
| https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations | server-actions | Next.js Server Actions documentation for form submission and server mutations. |
| https://github.com/TheEdoRan/next-safe-action | next-safe-action | Type-safe Server Actions helper for Next.js. |
| https://next.i18next.com/ | next-i18next | A library for handling internationalization and multilingual support in Next.js. |
| https://authjs.dev/ | next-auth | Authentication solution formerly known as NextAuth.js, supporting OAuth, JWT, database integration, and SSR/full-stack scenarios. |
| https://github.com/garmeeh/next-seo | next-seo | An SEO tool designed for Next.js, supporting dynamic meta tag management and structured data generation. |
| https://next-intl-docs.vercel.app/ | i18n | A modern internationalization solution, supporting both App Router and Pages Router, with built-in multilingual loading for SSR. |
| https://www.heroui.com/ | ui-library | Modern React UI component library evolved from NextUI, with SSR and theming support. |
| https://github.com/vercel/next.js/tree/canary/packages/next-mdx | mdx | The official MDX support library, allowing you to mix Markdown and React components directly in pages. |
| https://next-redux-wrapper.js.org/ | state-management | A bridge library between Redux and Next.js, automatically handling store synchronization in SSR scenarios. |
| https://github.com/vercel-labs/next-plugin-injection | security | The official security plugin, automatically injecting security headers like CSP (requires Next.js 13.4+). |
| https://nextjs.org/docs/app/api-reference/file-conventions/metadata | seo | The native SEO solution for Next.js 13+, replacing some functionalities of next-seo. |
| https://github.com/onivim/next-og | seo | Dynamically generates Open Graph images, supporting Edge Runtime. |

### 1.7 Nodejs and building

| Address                                                                                     | Label              | Description                                                                                  |
| ------------------------------------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| https://github.com/goldbergyoni/nodebestpractices                                           | nodebestpractices  | A collection of Nodejs best practices.                                                       |
| https://www.npmjs.com/                                                                      | npm                | Node package management platform.                                                            |
| https://yarnpkg.com/                                                                        | yarn               | Node package manager suitable for managing dependencies across multiple projects.             |
| https://pnpm.io/                                                                            | pnpm               | Fast, disk-efficient Node package manager, commonly used in monorepo scenarios.               |
| https://github.com/tj/n                                                                     | n                  | Extremely simple Nodejs version manager.                                                     |
| https://storybook.js.org/                                                                   | storybookjs        | UI component library navigation site for independent development of React, Vue, and Angular. |
| https://unpkg.com/                                                                          | unpkg              | Foreign public static resource CDN, applicable to all content on npm.                        |
| https://nodejs.org/docs/latest/api/                                                         | node               | Official Node.js API documentation; Chinese sites can be used as secondary references.        |
| https://docs.deno.com/                                                                      | deno               | Official Deno documentation for the modern JavaScript/TypeScript runtime.                     |
| https://bun.sh/                                                                             | bun                | JavaScript/TypeScript runtime, package manager, bundler, and test runner.                    |
| https://turbo.build/repo                                                                    | turborepo          | Easy-to-use, high-performance multi-package management tool, monorepo.                       |
| https://lerna.js.org/                                                                       | lerna              | Easy-to-use multi-package management tool, monorepo.                                         |
| https://github.com/ds300/patch-package#readme                                               | patch-package      | Tool package for patching node_modules.                                                      |
| https://v8.dev/docs                                                                         | V8                 | js V8 engine documentation.                                                                  |
| https://v8.dev/docs                                                                         | v8                 | V8 engine documentation entry; old Node 10.6 materials are only historical references.        |
| https://github.com/bellard/quickjs                                                          | quickjs            | A lightweight js engine.                                                                     |
| https://github.com/GoogleChromeLabs/jsvu                                                    | jsvu               | A must-have tool for debugging js engines, engine switching and version control.             |
| https://docs.docker.com/                                                                    | docker             | Application container engine Docker.                                                         |
| https://man.linuxde.net/                                                                    | linux              | Linux command query manual.                                                                  |
| http://aheckmann.github.io/gm/                                                              | gm                 | Backend image processing tool.                                                               |
| https://github.com/protobi/js-xlsx/tree/beta#readme                                         | js-xlsx            | Library for editing and processing xlsx.                                                     |
| https://github.com/shelljs/shelljs                                                          | shelljs            | Implement commonly used shell commands with Nodejs.                                          |
| https://github.com/chalk/chalk                                                              | chalk              | Console command line output style tool, mainly controls color.                               |
| https://github.com/node-schedule/node-schedule                                              | node-schedule      | Timing task tool for Nodejs.                                                                 |
| https://www.npmjs.com/package/source-map-support                                            | source-map-support | Module tool that supports SourceMap in the nodejs environment.                               |
| https://github.com/wclr/yalc                                                                | yalc               | An effective alternative to npm link, using real npm packages instead of various links.      |
| https://nodejs.org/api/corepack.html                                                        | corepack           | Node built-in package-manager version dispatcher for managing pnpm/yarn versions.            |
| https://volta.sh/                                                                           | volta              | Node/Yarn/npm toolchain version manager.                                                     |
| https://github.com/Schniz/fnm                                                               | fnm                | Fast Node.js version manager.                                                                |
| https://nx.dev/                                                                             | nx                 | Monorepo build system and task orchestration tool.                                           |
| https://github.com/changesets/changesets                                                    | changesets         | Multi-package repository version management and changelog generation tool.                    |

### 1.7.1 Building

| Address                                                                      | Tag           | Description                                                                                                     |
| ---------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| https://prettier.io/                                                         | prettier      | Code formatting tool that does not affect the code.                                                             |
| https://ejs.bootcss.com/                                                     | ejs           | Easy-to-use HTML template engine.                                                                               |
| http://mustache.github.io/                                                   | mustache      | HTML template library suitable for multiple languages.                                                          |
| https://pugjs.org/language/includes.html                                     | pug           | HTML template library.                                                                                          |
| http://www.nodeclass.com/api/jade.html                                       | jade          | HTML template library.                                                                                          |
| https://gulpjs.com/docs/en/getting-started/quick-start/                      | gulp          | Maintenance reference: automation build tool common in old projects; modern projects usually prefer Vite/Rollup/Rspack/esbuild. |
| https://gulpjs.com/plugins/                                                  | gulp          | Gulp plugin center.                                                                                             |
| https://gruntjs.com/                                                         | grunt         | Historical reference: early automation build tool, mainly for legacy maintenance.                                |
| https://rollupjs.org/                                                        | Rollup        | ES module bundler commonly used for libraries and tooling ecosystems.                                             |
| https://webpack.docschina.org/                                               | webpack       | The most widely used bundling tool.                                                                             |
| https://github.com/neutrinojs/webpack-chain                                  | webpack-chain | A tool to chain configure webpack configuration.                                                                |
| https://rspack.rs/                                                           | rspack        | Rust-based high-performance bundler compatible with the Webpack ecosystem.                                       |
| https://rsbuild.dev/                                                         | rsbuild       | Rspack-based build tool for modern web applications and libraries.                                               |
| https://nextjs.org/docs/app/api-reference/turbopack                          | turbopack     | High-performance Rust-based bundler mainly serving the Next.js ecosystem.                                         |
| https://parceljs.org/                                                        | parceljs      | Zero/low-configuration bundler.                                                                                  |
| https://www.snowpack.dev/                                                    | snowpack      | A lightweight frontend project building tool without bundle.                                                    |
| https://swc.rs/                                                              | swc           | A ts/js compiler written in Rust that claims to be 20 times faster than babel and supports all of its features. |
| https://babeljs.io/                                                          | babel         | Widely used JavaScript compiler.                                                                                 |
| https://github.com/fb55/htmlparser2#readme                                   | htmlparser2   | A tool for converting html to AST.                                                                              |
| https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/index.md | parse5        | A tool for converting html to AST.                                                                              |
| https://github.com/benjamn/recast                                            | recast        | A tool for converting js to AST.                                                                                |
| https://github.com/airbnb/ts-migrate                                         | ts-migrate    | A tool for converting js to ts (TypeScript).                                                                    |
| https://github.com/kimmobrunfeldt/concurrently#readme                        | concurrently  | A Nodejs command line control tool that enables running multiple commands simultaneously.                       |
| https://github.com/evanw/esbuild                                             | esbuild       | An extremely fast js bundling and compression tool.                                                             |
| https://github.com/addyosmani/critical#readme                                | critical      | A tool for extracting relevant CSS from HTML.                                                                   |
| https://modernjs.dev/                                                        | modernjs      | A web frontend engineering system tool developed by ByteDance.                                                  |
| https://github.com/javascript-obfuscator/javascript-obfuscator               | obfuscator    | A js code obfuscation plugin.                                                                                   |
| https://github.com/egoist/tsup                                               | tsup          | TypeScript library build tool based on esbuild.                                                                  |
| https://github.com/unjs/unbuild                                              | unbuild       | Library build tool from the UnJS ecosystem.                                                                      |
| https://tsdown.dev/                                                          | tsdown        | Next-generation build tool for TypeScript libraries.                                                             |
| https://biomejs.dev/                                                         | biome         | Modern Web formatter/linter toolchain, useful as a replacement for part of Prettier/ESLint scenarios.             |

### 1.7.2 Server

| Address                                                        | Tag                   | Description                                                                                                                                       |
| -------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| http://www.expressjs.com.cn/                                    | express             | Lightweight web application development framework.                                                                              |
| https://koajs.cn/#-application-                                 | koajs               | Web application development framework.                                                                                          |
| https://www.fastify.io/                                         | fastify             | Claimed to be the fastest lightweight web application development framework, with a focus on JSON schema acceleration.          |
| http://www.midwayjs.org/                                        | midway              | Web application development framework that supports Web/Full Stack/Microservices/RPC/Socket/Serverless, used by Alibaba Taobao. |
| https://docs.feathersjs.com/                                    | feathersjs          | Lightweight web application development framework suitable for data streaming.                                                  |
| https://docs.nestjs.com/                                        | nestjs              | Powerful web application framework.                                                                                             |
| https://hono.dev/                                               | hono                | Web-standards-first lightweight server framework, suitable for BFF, edge functions, and API services.                            |
| https://nitro.unjs.io/                                          | nitro               | Nuxt/UnJS server engine, suitable for full-stack and edge deployments.                                                           |
| https://elysiajs.com/                                           | elysia              | High-performance server framework in the Bun ecosystem.                                                                           |
| https://github.com/nuysoft/Mock/wiki                            | mockjs              | Interface data simulation tool that can be used on both client and server sides.                                                |
| https://sheetjs.com/                                            | sheetjs             | Tool for processing xlsx/csv spreadsheet import/export in Node or the browser.                                                   |
| https://www.prisma.io/                                          | prisma              | TypeScript ORM and database toolkit.                                                                                              |
| https://orm.drizzle.team/                                       | drizzle             | TypeScript-first ORM with type safety and SQL-friendly design.                                                                    |
| https://trpc.io/                                                | trpc                | End-to-end type-safe API/RPC framework.                                                                                           |
| https://ts-rest.com/                                            | ts-rest             | Contract-based type-safe REST API tooling.                                                                                        |
| https://github.com/parallel-js/parallel.js                      | paralleljs          | Tool for parallel processing of JS, usable in both the browser and Node server.                                                 |
| https://parall.ax/products/jspdf                                | js-pdf              | Tool for generating PDFs through Node.                                                                                          |
| http://doc.pm2.io/en/plus/overview/                             | pm2                 | Node process management.                                                                                                        |
| https://github.com/rvagg/node-worker-farm                       | node-worker-farm    | The very common Node.js multiprocess computing library.                                                                         |
| https://github.com/Marak/colors.js                              | colorsjs            | Node log console output color control.                                                                                          |
| https://log4js-node.github.io/log4js-node/                      | log4js              | Log tool.                                                                                                                       |
| https://nwjs.io/                                                | nwjs                | Application runtime environment based on NodeJs and Chromium, allowing you to call all Node.js modules directly from the DOM.   |
| https://github.com/archiverjs/node-archiver                     | node-archiver       | Supports ZIP/TAR document stream transmission and receiving plugins.                                                            |
| https://github.com/thejoshwolfe/yazl                            | yazl                | Compression zip plugin, corresponding to decompression at https://github.com/thejoshwolfe/yauzl.                                |
| https://github.com/thejoshwolfe/yauzl                           | yauzl               | Zip decompression library paired with yazl.                                                                                        |
| https://nodemailer.com/                                         | node-mailer         | Email sending library supporting SMTP/SES/Sendmail/Stream.                                                                    |
| https://sailsjs.com/                                            | sailsjs             | User-friendly MVC Nodejs framework.                                                                                             |
| https://helmetjs.github.io/                                     | helmet              | Protects Express service applications by setting response header.                                                               |
| https://github.com/expressjs/cors#readme                        | cors                | Cors middleware for Nodejs.                                                                                                     |
| https://github.com/expressjs/body-parser#readme                 | body-parser         | Request flow parsing middleware for Nodejs.                                                                                     |
| http://restify.com/                                             | restify             | Web service framework for Nodejs.                                                                                               |
| https://github.com/expressjs/multer#readme                      | multer              | Middleware for handling uploaded files in Nodejs.                                                                               |
| https://github.com/node-cache/node-cache                        | node-cache          | A Nodejs cache control module.                                                                                                  |
| https://socket.io/                                              | socket.io           | WebSocket solution.                                                                                                             |
| https://github.com/luin/ioredis                                 | ioredis             | Redis invocation JS encapsulation library.                                                                                      |
| https://github.com/websockets/ws                                | ws                  | A nodejs package for WebSocket.                                                                                                 |
| https://github.com/digitalocean/nginxconfig.io                  | nginxconfig.io      | Tool for generating nginx configurations online.                                                                                |
| https://github.com/davidmarkclements/fast-safe-stringify#readme | fast-safe-stringify | Securely and quickly serialize JSON, replacing JSON.stringify.                                                                  |

### 1.7.3 GraphQL

| Address                                        | Tag           | Description                                         |
| ---------------------------------------------- | ------------- | --------------------------------------------------- |
| https://graphql.org/graphql-js/                | graphql       | GraphQL's JS implementation.                        |
| https://github.com/hasura/graphql-engine       | hasura        | Powerful GraphQL engine solution.                   |
| https://github.com/apollographql/apollo-client | apollo-client | Solution for every UI framework and GraphQL server. |

### 1.7.4 Micro Frontends

| Address                                                   | Tags              | Description                                                                                                 |
| --------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| https://single-spa.js.org/                                | single-spa        | A micro-frontend solution with router configuration as its main feature.                                    |
| https://qiankun.umijs.org/zh/                             | qiankun           | An Ant-design micro-frontend framework based on single-spa.                                                 |
| https://webpack.docschina.org/concepts/module-federation/ | module-federation | A micro-frontend solution with module sharing during build as its main feature, implemented in webpack (5). |
| https://fronts.js.org/                                    | fronts            | A progressive micro-frontend framework based on webpack module-federation.                                  |
| https://github.com/jsdom/jsdom                            | jsdom             | A wrapped library for DOM manipulation in node environment.                                                 |
| https://wujie-micro.github.io/doc/                        | wujie             | Micro-frontend framework based on Web Components + iframe.                                                  |

### 1.7.5 Cloud and Serverless

| Address                                             | Tags       | Description                                                                                               |
| --------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| https://wasmedge.org/                               | wasmedge   | A cloud-native and serverless framework related to WebAssembly.                                           |
| https://www.serverless.com/                         | serverless | A framework for quickly building node serverless services, supporting Tencent Cloud SCF, AWS Lambda, etc. |
| https://aws.amazon.com/cn/campaigns/lambda/         | aws-lambda | Classic, Amazon serverless computing service.                                                             |
| https://qingfuwu.cn/                                | qingfuwu   | Byte lightweight service, supports Serverless (FaaS), CDN and other services, with a free tier.           |
| https://help.aliyun.com/document_detail/154438.html | aliyunFC   | Alibaba Cloud Function Compute service, supports Serverless (FaaS).                                       |
| https://cloud.tencent.com/document/product/583      | tecentFC   | Tencent Cloud Cloud Function service, supports Serverless (FaaS).                                         |

### 1.7.6 Low Code

| Address                                            | Tags           | Description                                                                        |
| -------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| https://lowcode-engine.cn/                         | lowcode-engine | An open-source low-code engine from Alibaba.                                       |
| https://weda.cloud.tencent.com/                    | weda           | Tencent low-code engine, Micro-Starter.                                            |
| https://aisuda.bce.baidu.com/amis/zh-CN/docs/index | amis           | Baidu open-source low-code engine, suitable for projects with a back-office focus. |
| https://shuffle.dev/                               | shuffle        | A popular low-code platform overseas.                                              |
| https://webflow.com/                               | webflow        | A popular low-code platform overseas.                                              |
| https://opentiny.design/tiny-engine#/home          | tiny-engine   | Huawei open-source low-code engine (2023), with component orchestration.          |
| https://netease.github.io/tango/                   | tango         | NetEase Cloud Music open-source low-code engine (2023), no private DSL/protocol.  |

### 1.8 Hybrid and Cross-platform

| Link                                                              | Tag                                 | Description                                                                                                                                                      |
| ----------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps | PWA                                 | Progressive Web Apps.                                                                                                                                            |
| https://developers.weixin.qq.com/miniprogram/dev/                 | Mini Program/Hybrid                 | WeChat Mini Program official development website.                                                                                                                |
| https://docs.alipay.com/mini/developer/getting-started            | Mini Program/Hybrid                 | Alipay Mini Program official development website.                                                                                                                |
| https://smartprogram.baidu.com/developer/index.html               | Mini Program/Hybrid                 | Baidu Mini Program official development website.                                                                                                                 |
| https://wepyjs.github.io/wepy-docs/                               | Mini Program/Hybrid                 | Vue syntax Mini Program official development website.                                                                                                            |
| https://github.com/opendigg/awesome-github-wechat-weapp           | Mini Program/Hybrid                 | Xiaomi Light App official development website.                                                                                                                   |
| https://dev.mi.com/doc/?page_id=2303                              | Light App/Hybrid                    | Xiaomi Light App official development website.                                                                                                                   |
| https://www.quickapp.cn/                                          | Light App/Hybrid                    | Oppo/vivo Light App official development website.                                                                                                                |
| https://developer.huawei.com/consumer/cn/quickApp                 | Light App/Hybrid                    | Huawei Light App official development website.                                                                                                                   |
| https://reactnative.cn/                                           | Cross-platform                      | Popular cross-platform tool using React syntax, RN.                                                                                                              |
| https://github.com/NativeScript/NativeScript                      | Cross-platform                      | Popular cross-platform development framework that supports Angular/Vue/Svelte/React.                                                                             |
| https://github.com/ionic-team/ionic-framework                     | Cross-platform                      | A powerful cross-platform UI toolkit for building native-quality iOS, Android, and PWA apps using HTML, CSS, and JavaScript.                                     |
| https://github.com/quasarframework/quasar                         | Cross-platform                      | Build top-quality, high-performance Vue responsive websites, PWAs, SSR, mobile, and desktop apps                                                                 |
| https://lynxjs.org/zh/index.html                                  | Cross-platform                      | Bytedance's cross-platform framework for iOS, Android, HarmonyOS and Web.                                                                                  |
| https://weexapp.com/zh/                                           | Cross-platform                      | A cross-platform tool that was popular a few years ago using Vue syntax, but is no longer maintained.                                                            |
| https://alibaba.github.io/weex-ui/#/cn/                           | Cross-platform/Weex                 | Weex UI component library.                                                                                                                                       |
| https://taro.jd.com/                                              | Mini Program/Cross-platform         | Cross-web/Mini Program/Native React syntax cross-platform tool, runtime cross-platform mode.                                                                     |
| https://rax.js.org/                                               | Mini Program/Cross-platform/Flutter | React syntax cross-platform tool for cross-web/Mini Program/Flutter (now largely quiet), Alibaba.                                                                 |
| https://wechat-miniprogram.github.io/kbone/docs/                  | Mini Program/Cross-platform         | Cross-web/Mini Program cross-platform build plugin with low cost and compatibility with various web frameworks, Tencent.                                         |
| https://hippyjs.org/                                              | Cross-platform                      | Tencent's hybrid cross-platform framework.                                                                                                                       |
| https://uniapp.dcloud.io/                                         | Mini Program/Cross-platform         | Vue syntax cross-platform tool for cross-web/Mini Program/Native.                                                                                                |
| https://openkraken.com/                                           | Kraken                              | High-performance web rendering engine built on Flutter that allows writing Flutter in web paradigm, Alibaba.                                                     |
| https://github.com/remaxjs/remax                                  | Remax                               | React syntax cross-web/Mini Program tool, similar to taro-next(3) cross-platform mode, friendly for Mini Program, Alipay.                                        |
| https://ant-move.github.io/guide/                                 | Antmove                             | Mini Program converter that converts to multi-platform Mini Program based on Alipay/WeChat Mini Program, Amap.                                                   |
| https://guoshuyu.cn/home/wx/Flutter-1.html                        | Cross-platform                      | Extremely popular Dart syntax cross-platform development tool.                                                                                                   |
| http://electronjs.org/docs                                        | Cross-platform                      | Development framework for PC, Windows/Mac applications.                                                                                                          |
| http://electronjs.org/docs                                        | Cross-platform                      | Development framework for PC, Windows applications, Microsoft.                                                                                                   |
| https://tauri.app/                                                | Tauri                               | Development framework for web-based Windows/Mac applications written in Rust.                                                                                    |
| https://github.com/tw93/Pake                                      | Pake                                | Scaffold tool for web page packaging and generating small desktop apps based on Rust Tauri framework, supporting Mac/Windows/Linux systems.                      |
| https://wendux.github.io/dist/#/doc/flyio/readme                  | Fly                                 | Request encapsulation library that supports Web, Node.js, WeChat Mini Program, Weex, React Native, Quick App.                                                    |
| https://github.com/icindy/wxParse                                 | wxParse                             | Rich text parsing component for WeChat Mini Program that supports conversion of HTML and markdown to wxml visualization (but is currently no longer maintained). |
| https://developer.chrome.com/extensions                           | Chrome-extension                    | Official documentation for Chrome extensions.                                                                                                                    |
| https://github.com/sxei/chrome-plugin-demo                        | Chrome-plugin, Chrome-extension     | A good tutorial for developing Chrome extensions with demos.                                                                                                     |

### 1.9 Auxiliary Tools

| Address                                                                                      | Tag                           | Description                                                                                                                                   |
| -------------------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| https://chat.openai.com/chat                                                                 | chatGPT                       | OpenAI-based Q&A bot, also good for looking up technical issues.                                                                               |
| https://www.cursor.so/                                                                       | cursor                        | Still a hot AI coding IDE product.                                                                                                             |
| https://stackoverflow.com/                                                                   | stackoverflow                 | A friendly community for solving technical problems.                                                                                          |
| https://bundlephobia.com/                                                                    | bundlephobia                  | A website for analyzing the size and loading performance of npm packages.                                                                     |
| https://npmgraph.js.org/                                                                     | npmgraph                      | A tool website for analyzing the dependency relationships of npm packages.                                                                    |
| https://www.typescriptlang.org/dt/search?search=                                             | joi                           | A website for querying TypeScript declaration files of various libraries.                                                                     |
| http://deerchao.net/tutorials/regex/regex.htm                                                | regexp                        | A beginner's tutorial on regular expressions.                                                                                                 |
| https://regexper.com/                                                                        | regexper                      | A visual online regular expression verification website.                                                                                      |
| https://extendsclass.com/regex-tester.html                                                   | cyrilex                       | An online visual regex tester and debugger.                                                                                                   |
| http://wproxy.org/whistle/install.html                                                       | whistle                       | A web debugging proxy tool.                                                                                                                   |
| https://astexplorer.net/                                                                     | astexplorer                   | An online ast parsing tool for languages such as css/html/js/ts.                                                                              |
| https://github.com/typicode/husky#readme                                                     | Husky                         | A git tool on NodeJS.                                                                                                                         |
| https://cn.eslint.org/                                                                       | eslint                        | A js code checking tool.                                                                                                                      |
| https://visualgo.net/en                                                                      | Visualgo                      | A visualization algorithm query.                                                                                                              |
| https://visualgo.net/en                                                                      | Visualgo                      | A visualization algorithm query.                                                                                                              |
| http://yisibl.github.io/cubic-bezier/#.48,1.06,1,1.45                                        | cubic                         | An animation curve query website (ease/linear...).                                                                                            |
| https://dev.w3.org/html5/html-author/charref                                                 | charref                       | A query for escape characters of character punctuation.                                                                                       |
| https://www.colorzilla.com/gradient-editor/                                                  | gradient-editor               | A CSS gradient style generation tool.                                                                                                         |
| https://valine.js.org/cdn.html                                                               | valine                        | A comment system tool.                                                                                                                        |
| http://gittalk.com.cutestat.com/                                                             | gittalk                       | A commenting tool for github.                                                                                                                 |
| https://github.com/Coding/WebIDE                                                             | webide                        | Writing code on the web.                                                                                                                      |
| https://hiroppy.github.io/fusuma/                                                            | fusuma                        | Writing web ppt with markdown.                                                                                                                |
| https://stackedit.io/                                                                        | stackedit                     | A browser-based markdown editor.                                                                                                              |
| https://vuepress.vuejs.org/zh/                                                               | vuepress                      | Writing documents/blogs with markdown.                                                                                                        |
| https://vitepress.dev/                                                                       | vitepress                     | Vite-powered static documentation site generator, suitable for docs and blogs.                                                                 |
| https://vitejs.cn/vitepress/                                                                 | vitepress                     | Historical/Chinese VitePress entry, kept to match the Chinese README resource list.                                                            |
| https://docusaurus.io/                                                                       | docusaurus                    | React-based documentation site generator, suitable for product, project, and open-source docs.                                                  |
| https://hexo.io/zh-cn/                                                                       | hexo                          | Writing documents/blogs with markdown.                                                                                                        |
| https://d.umijs.org/                                                                         | dumi                          | A tool suitable for writing front-end development documents, markdown, ants.                                                                  |
| https://jsdoc.app/                                                                           | jsdoc                         | The most classic tool for generating documentation from js code comments.                                                                     |
| https://github.com/jsdoc2md/jsdoc-to-markdown                                                | jsdoc-to-markdown             | Generating markdown documentation from js comments (jsdoc format).                                                                            |
| https://www.materialui.co/colors                                                             | materialui                    | Quickly select color values.                                                                                                                  |
| https://carbon.now.sh/                                                                       | carbon                        | Generate beautiful screenshots of code when writing blogs.                                                                                    |
| https://tinypng.com/                                                                         | Tinypng                       | Compress png and jpeg images.                                                                                                                 |
| https://github.com/svg/svgo                                                                  | svgo                          | A tool for compressing SVG graphic files.                                                                                                     |
| https://jakearchibald.github.io/svgomg/                                                      | SVGOMG                        | Compress SVG graphics online.                                                                                                                 |
| https://github.com/ImageOptim/ImageOptim                                                     | imageoptim                    | macOS image optimization tool, useful for compressing common image formats.                                                                    |
| https://squoosh.app/                                                                         | squoosh                       | Google web image compression tool.                                                                                                            |
| https://imagemagick.org/index.php                                                            | imagemagick                   | An image processing tool widely used in the background.                                                                                       |
| https://github.com/javierbyte/img2css                                                        | img2css                       | An interesting library that presents images in CSS using box-shadow.                                                                          |
| https://www.whatfontis.com/                                                                  | whatfontis                    | A font recognition tool for images, limited to English fonts and registration is required.                                                    |
| https://www.toptal.com/developers/keycode                                                    | keycode                       | Enter a key and get its corresponding js keyCode for the online website                                                                       |
| https://ps.gaoding.com/#/                                                                    | ps                            | Powerful online Photoshop.                                                                                                                    |
| https://avocode.com/convert-psd-to-sketch?ref=producthunt                                    | avocode                       | One-click conversion of psd to sketch.                                                                                                        |
| https://jakearchibald.github.io/svgomg/                                                      | svgomg                        | Online svg optimization and preview.                                                                                                          |
| https://code2flow.com/                                                                       | code2flow                     | Online pseudo-code to flowchart tool.                                                                                                         |
| https://tool.lu/json/                                                                        | json                          | Online json formatting tool.                                                                                                                  |
| https://tool.lu/js/                                                                          | js                            | Online js formatting/obfuscation/compression tool.                                                                                            |
| https://tool.lu/css/                                                                         | css                           | Online css formatting/compression/responsive unit processing tool.                                                                            |
| https://tool.lu/coderunner/                                                                  | coderunner                    | Online php/c/c++/python/go/js/java/bash code execution tool.                                                                                  |
| https://hoppscotch.io/                                                                       | hoppscotch                    | Open-source online API debugging tool.                                                                                                        |
| https://www.usebruno.com/                                                                    | bruno                         | Git-friendly API client, useful as a Postman alternative.                                                                                     |
| https://www.diffchecker.com/                                                                 | diffchecker                   | Online text/file diff tool.                                                                                                                   |
| https://isoflow.io/                                                                          | isoflow                       | Online flowchart drawing tool.                                                                                                                |
| https://codemirror.net/                                                                      | codemirror                    | Web code editor with many language modes and plugins.                                                                                          |
| https://github.com/n8n-io/n8n                                                                | n8n                           | A workflow automation tool based on free and open fair code licenses for easily automating tasks across different services.                   |
| https://zijian.aliyun.com/detect/dns/DNS_PING-d31c5446aff9db99decd9d9d944b11c5-1640605424801 | dns                           | A domain name DNS detection website tool, Alibaba Cloud.                                                                                      |
| https://tabatkins.github.io/railroad-diagrams/generator.html                                 | railroad-diagrams             | A website tool for drawing railroad diagrams online.                                                                                          |
| https://unbug.github.io/codelf/                                                              | codeIf                        | A naming search tool to help solve naming difficulties.                                                                                       |
| https://app.quicktype.io/                                                                    | QuickType                     | A tool website for generating type declaration code for specified languages (such as TypeScript, C++, Java, C#, Go, etc.) based on json text. |
| https://github.com/1c7/chinese-independent-developer                                         | chinese-independent-developer | An aggregation of projects by independent developers in China.                                                                                |

### 1.10 Testing, Security, and Encryption

### 1.10.1 Unit Testing

| Address                                         | Tag         | Description                                                                                      |
| ----------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| https://github.com/vitest-dev/vitest            | vitest      | Vite-native testing framework (one of the newer mainstream choices).                             |
| https://mochajs.org/                            | mocha       | A unit testing tool.                                                                             |
| https://jestjs.io/zh-Hans/                      | jest        | A unit testing tool.                                                                             |
| https://testing-library.com/                     | testing-library | UI testing tool family focused on user behavior, common in React/Vue/frontend unit tests. |
| https://mswjs.io/                                | msw         | API mocking library based on Service Worker/interceptors, useful for tests and local development. |
| https://www.cypress.io/                         | cypress     | A unit testing integrated platform tool.                                                         |
| https://github.com/avajs/ava                    | avajs       | A fast testing tool.                                                                             |
| https://karma-runner.github.io/latest/index.html | karma       | A JavaScript testing execution process management tool based on Node.js (Testacular's new name). |
| https://enzymejs.github.io/enzyme/              | enzyme      | A React unit testing tool that can test hooks.                                                   |
| https://github.com/marmelab/gremlins.js         | gremlins    | A node and browser Monkey Test tool.                                                             |
| https://uptime.kuma.pet/                        | uptime-kuma | An open-source metric monitoring platform based on puppeteer.                                    |
| https://playwright.dev/                         | playwright  | A newer e2e testing tool that supports mainstream browsers such as Chrome and Firefox.           |
| https://www.chromatic.com/                       | chromatic   | Visual regression and Storybook publishing platform.                                             |
| https://k6.io/                                   | k6          | Load and performance testing tool.                                                               |
| https://github.com/GoogleChrome/lighthouse-ci    | lighthouse-ci | Lighthouse CI for web performance and quality gates.                                           |

### 1.10.2 Security and Encryption Knowledge

| Address                                           | Tag       | Description                                                                                                                                                                |
| ------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://github.com/brix/crypto-js                 | crypto-js | A JavaScript encryption library that can be said to be the most commonly used, supporting mainstream hash algorithms and encryption algorithms such as SHA, MD5, AES, etc. |
| https://github.com/emn178/js-sha256               | js-sha256 | A lightweight library for SHA256 hash operations.                                                                                                                          |
| https://github.com/kelektiv/node.bcrypt.js#readme | bcrypt    | A library for password hash processing.                                                                                                                                    |
| https://github.com/ossf/scorecard                | ossf-scorecard | Open-source supply-chain security scoring/checks (useful for dependency governance).                                                          |
| https://github.com/OWASP/CheatSheetSeries        | owasp-cheatsheet | Security knowledge cheat sheets (systematic reference).                                                                                       |
| https://github.com/snyk/cli                      | snyk     | Dependency vulnerability/supply-chain scanning (common in engineering practice).                                                               |
| https://owasp.org/www-project-top-ten/           | owasp-top-ten | OWASP Top Ten, a common entry point for web application security risks. |
| https://github.com/google/osv-scanner            | osv-scanner | Open-source vulnerability scanner based on OSV data. |
| https://semgrep.dev/                             | semgrep | Static analysis and security scanning tool. |
| https://codeql.github.com/                       | codeql | GitHub semantic code analysis and security scanning tool. |
| https://trivy.dev/                               | trivy | Vulnerability, misconfiguration, secret, and container scanning tool. |
| https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Crypto_API | web-crypto | Browser-native cryptography API documentation. |

[How to Secure Anything](https://github.com/veeral-patel/how-to-secure-anything)

[crypto-js front-end data encryption tool](https://github.com/brix/crypto-js)

[Front-end Security](https://cloud.tencent.com/developer/article/1136202)

[Revisiting Front-end Security](http://blog.michealwayne.cn/2020/04/19/safety/%E3%80%90%E6%80%BB%E7%BB%93%E3%80%91%E5%86%8D%E8%B0%88%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8/)

[8 Major Front-end Security Issues](https://mawei.blog/post/frontend-security-vulnerabilities-part1/)

[Front-end Encryption Matters](https://juejin.cn/post/6844903764973846542)

[What Does HTTPS Encrypt?](https://zhuanlan.zhihu.com/p/38278311)

[Web-side Anti-crawling Technical Solutions](https://juejin.cn/post/6844903654810468359)

[Front-end Encryption Methods We Should Discuss](https://juejin.cn/post/6844903695428091918)

### 1.10.3 Debug

| Address                                 | Tag              | Description                                                              |
| --------------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| https://github.com/Tencent/vConsole     | vconsole         | Known as a web developer tool for mobile devices, Tencent.               |
| https://eruda.liriliri.io/              | eruda            | Similar to vConsole's mobile web debugging tool, relatively lightweight. |
| https://www.fundebug.com/               | FunDebug         | A simple project debug monitoring tool, with a free version.             |
| http://www.webfunny.cn/                 | webfunny_monitor | A unified front-end exception monitoring solution.                       |
| https://github.com/typicode/json-server | json-server      | A fast mock tool that runs locally.                                      |
| https://www.pagespy.org/                | Page spy         | A set of higher degree of remote web debugging tools, Huolala tech.      |

### 1.10.4 Quality Check

| Address                                     | Tag           | Description                                                                                                                       |
| ------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| https://www.jslint.com/                     | jslint        | Historical reference: early JavaScript validation tool; modern projects should prefer ESLint/typescript-eslint/Biome.              |
| https://jshint.com/                         | jshint        | Historical reference: early JavaScript code checking tool; modern projects should prefer ESLint/typescript-eslint/Biome.           |
| https://eslint.org/                         | eslint        | A JavaScript validation tool                                                                                                      |
| http://csslint.net/                         | csslint       | Historical reference: early CSS checking tool; modern projects should prefer Stylelint/Biome.                                      |
| https://validator.w3.org/                   | validator     | Online HTML validation website                                                                                                    |
| https://flow.org/                           | flow          | Historical/specialized reference: JavaScript static type checker; modern frontend projects usually prefer TypeScript.              |
| https://www.sonarlint.org/vscode/           | sonarlint     | VSCode plugin for code quality validation of js/ts projects                                                                       |
| https://github.com/google/eng-practices     | eng-practices | Google engineering practices documentation                                                                                        |
| https://github.com/cheeriojs/cheerio#readme | cheerio       | A tool for web scraping                                                                                                           |
| https://pptr.dev/                           | puppeteer     | A headless browser based on Chromium, used for web automation including web crawling                                              |
| https://www.selenium.dev/                   | selenium      | A powerful tool for testing web applications                                                                                      |
| https://github.com/GoogleChrome/lighthouse  | lighthouse    | Google's standard web performance testing tool, built into Chrome                                                                 |
| https://github.com/nolanlawson/fuite        | fuite         | A tool for web memory detection, based on Puppeteer                                                                               |
| https://github.com/chaitin/xray             | xray          | A comprehensive security assessment tool that supports common web security issue scanning and custom PoC, but is not open source. |
| https://typescript-eslint.io/               | typescript-eslint | ESLint parser and rule set for TypeScript projects. |
| https://github.com/oxc-project/oxc          | oxlint        | High-performance JavaScript/TypeScript lint toolchain. |
| https://knip.dev/                           | knip          | Tool for detecting unused files, dependencies, and exports. |
| https://github.com/webpro-nl/size-limit     | size-limit    | Bundle size checking and CI gate tool. |
| https://github.com/ai/size-limit            | bundle-size   | Reference collection for build output size analysis and gates. |

### 1.11 AI Artificial Intelligence Library

#### 1.11.1 Large Language Model and Agent Application Frameworks

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://ai-sdk.dev/ | ai-sdk | TypeScript AI SDK by Vercel for building streaming chat, AI UI, tool calling, and multi-model applications |
| https://github.com/openai/openai-agents-js | openai-agents-js | Official OpenAI JavaScript/TypeScript Agents SDK for lightweight multi-agent workflows, handoffs, tool calling, and tracing |
| https://github.com/openai/openai-agents-python | openai-agents-python | Official OpenAI Python Agents SDK for multi-agent workflows, tool calling, evaluation, and tracing |
| https://github.com/langchain-ai/langchain | langchain | LLM application framework with a broad ecosystem; often used together with LangGraph for complex agent orchestration |
| https://github.com/langchain-ai/langgraph | langgraph | Mainstream framework for stateful, resumable, long-running agent workflows |
| https://llamaindex.ai/ | llamaindex | Data and RAG framework for LLM applications, focused on knowledge bases, document QA, and retrieval-augmented generation |
| https://github.com/run-llama/llama_deploy | llamadeploy | Agentic workflow deployment framework to deploy and scale workflows as services |
| https://github.com/microsoft/semantic-kernel | semantic-kernel | Microsoft open-source AI orchestration SDK for enterprise .NET, Python, and Java scenarios |
| https://github.com/microsoft/autogen | autogen | Microsoft multi-agent conversation and workflow framework for research and complex collaborative agents |
| https://github.com/crewAIInc/crewAI | crewai | Multi-agent framework centered on roles, tasks, teams, collaboration, and engineering controllability |
| https://github.com/google/adk-python | google-adk | Google Agent Development Kit for code-first agent development, evaluation, and deployment |
| https://github.com/mastra-ai/mastra | mastra | TypeScript-native agent framework covering agents, workflows, RAG, memory, and observability |
| https://github.com/agno-agi/agno | agno | Production-oriented agent platform evolved from the Phidata direction, emphasizing tracing, scheduling, RBAC, and control plane capabilities |
| https://github.com/strands-agents | strands-agents | AWS-related open-source agent SDK ecosystem supporting Python and TypeScript for production-grade agent development |
| https://github.com/pydantic/pydantic-ai | pydantic-ai | Python agent framework in the Pydantic ecosystem, emphasizing type safety, structured outputs, and engineering reliability |
| https://github.com/huggingface/smolagents | smolagents | Hugging Face minimal agent library with few abstractions, suitable for fast experiments and code-style actions |
| https://github.com/camel-ai/camel | camel | Multi-agent research and engineering framework for role-play, social simulation, collaborative tasks, and data generation |
| https://github.com/agentscope-ai/agentscope | agentscope | Multi-agent application framework for distributed, multi-role, and complex agent systems |
| https://github.com/stanfordnlp/dspy | dspy | Framework for programming rather than hand-writing prompts, useful for optimizable RAG, classification, and agent pipelines |

#### 1.11.2 Model API SDKs and Model Routing

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://github.com/openai/openai-node | openai-node | Official OpenAI Node.js/TypeScript SDK |
| https://github.com/openai/openai-python | openai-python | Official OpenAI Python SDK |
| https://github.com/anthropics/anthropic-sdk-typescript | anthropic-sdk-ts | Anthropic Claude API TypeScript/JavaScript SDK |
| https://github.com/anthropics/anthropic-sdk-python | anthropic-sdk-python | Anthropic Claude API Python SDK |
| https://github.com/googleapis/js-genai | google-genai-js | New Google Gen AI JavaScript SDK for Gemini and Gen AI APIs |
| https://github.com/googleapis/python-genai | google-genai-python | New Google Gen AI Python SDK for Gemini and Gen AI APIs |
| https://github.com/cohere-ai/cohere-typescript | cohere | Cohere API TypeScript SDK |
| https://github.com/mistralai/client-js | mistral | Mistral AI API JavaScript SDK |
| https://github.com/replicate/replicate-javascript | replicate | Replicate API JavaScript SDK |
| https://github.com/BerriAI/litellm | litellm | Unified multi-model API proxy and gateway for model routing, cost tracking, rate limiting, and OpenAI API compatibility |
| https://github.com/Portkey-AI/gateway | portkey-gateway | Open-source AI gateway supporting multi-model routing, fallback, logging, and governance |
| https://github.com/Helicone/helicone | helicone | Open-source LLM observability and gateway platform for logs, cost tracking, caching, and monitoring |
| https://github.com/run-llama/LlamaIndexTS | llamaindex-ts | TypeScript version of LlamaIndex for JavaScript/TypeScript RAG applications |

#### 1.11.3 Agent Task Management and Human-Agent Collaboration Platforms

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://www.multica.ai/ | multica | Human + coding agent task collaboration platform for assigning tasks, tracking progress, and managing agent workforces |
| https://github.com/multica-ai/multica | multica-open | Open-source Multica repository for studying agent task management, runtime, skill reuse, and team collaboration patterns |
| https://slock.ai/ | slock | Platform for real-time human-agent collaboration in channels and DMs, similar to an agent-oriented Slack layer |
| https://www.taskade.com/ | taskade | AI workspace covering projects, tasks, agents, automation, memory, and business app generation |
| https://github.com/OpenBMB/ChatDev | chatdev | Multi-agent software company simulation project, useful as a reference for agent collaboration workflows |
| https://github.com/geekan/MetaGPT | metagpt | Multi-agent software development framework that turns requirements into PRDs, designs, tasks, and code |
| https://github.com/OpenBMB/IoA | ioa | Internet of Agents project focused on multi-agent collaboration and communication research |
| https://github.com/taskforcesh/bullmq | bullmq | Node.js queue infrastructure that can be used as a foundation for agent task scheduling and asynchronous execution |
| https://github.com/temporalio/temporal | temporal | Reliable workflow engine for long-running agent tasks, retries, compensation, and resumable execution |

#### 1.11.4 AI Coding and Development Tools

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://openai.com/codex/ | codex | OpenAI coding agent supporting CLI and cloud task workflows |
| https://github.com/openai/codex | codex-cli | OpenAI Codex command-line tool for local repository editing, code generation, debugging, and task execution |
| https://docs.anthropic.com/en/docs/claude-code/overview | claude-code | Anthropic AI coding assistant for local codebase understanding, generation, refactoring, and debugging |
| https://opencode.ai/ | opencode | Open-source terminal AI coding assistant with pluggable multi-model and multi-provider support |
| https://github.com/google-gemini/gemini-cli | gemini-cli | Google Gemini CLI, an open-source command-line AI coding assistant |
| https://github.com/OpenHands/OpenHands | openhands | Open-source AI software engineer and coding agent runtime for autonomous fixes, task execution, and sandboxed running |
| https://github.com/OpenHands/software-agent-sdk | openhands-sdk | SDK for building custom code-writing agents |
| https://github.com/SWE-agent/SWE-agent | swe-agent | Open-source coding agent for GitHub issue fixing and SWE-bench style tasks |
| https://github.com/paul-gauthier/aider | aider | Terminal AI pair programming tool designed around Git workflows and small-step commits |
| https://github.com/cline/cline | cline | Open-source VSCode agent extension supporting file editing, command execution, browser actions, and tool use |
| https://github.com/RooVetGit/Roo-Code | roo-code | Active VSCode agent tool from the Cline ecosystem, supporting multiple modes and complex tasks |
| https://github.com/continuedev/continue | continue | Open-source AI IDE extension for VSCode and JetBrains, supporting multi-model, local model, and custom context workflows |
| https://github.com/sourcegraph/amp | amp | Sourcegraph-related AI coding agent/development tool for codebase-level agent workflows |
| https://www.cursor.com/ | cursor | Mainstream AI IDE for professional developers, supporting code generation, understanding, refactoring, and multi-file edits |
| https://windsurf.com/ | windsurf | Mainstream AI IDE emphasizing agentic coding and beginner-friendly onboarding |
| https://www.trae.ai/ | trae | AI IDE from ByteDance, useful for observing Chinese AI coding product patterns |
| https://github.com/features/copilot | copilot | GitHub official AI coding assistant, evolving from completion into agent and task workflows |
| https://bolt.new/ | bolt | AI agent platform for web application generation and deployment |
| https://github.com/stackblitz/bolt.new | bolt-open | Open-source version of Bolt.new, useful for studying browser-based full-stack generation and WebContainer workflows |
| https://v0.dev/ | v0 | Vercel UI/frontend generation tool, useful for React, Next.js, and shadcn scenarios |
| https://lovable.dev/ | lovable | AI development platform for turning product ideas and prototypes into full-stack applications |
| https://github.com/PatrickJS/awesome-cursorrules | cursorrules | Collection of Cursor rules, useful as references for project-level AI coding standards |
| https://github.com/SchneiderSam/awesome-windsurfrules | windsurfrules | Collection of Windsurf rules, useful as references for agent rule governance |

#### 1.11.5 MCP and Tool Ecosystem

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://modelcontextprotocol.io/ | mcp | Open protocol initiated by Anthropic for connecting AI applications to external data sources, tools, and workflows |
| https://github.com/modelcontextprotocol | mcp-github | Official MCP GitHub organization containing specifications, SDKs, servers, and related projects |
| https://registry.modelcontextprotocol.io/ | mcp-registry | Official MCP registry for discovering public MCP server metadata |
| https://smithery.ai/ | smithery | MCP server discovery, hosting, connection, and commercialization platform |
| https://glama.ai/mcp/servers | glama-mcp | MCP server registry and search platform covering a large number of community servers |
| https://mcp.so/ | mcp-so | MCP tools and server collection site |
| https://github.com/modelcontextprotocol/servers | mcp-servers | Official and community MCP server collection entry point |
| https://github.com/microsoft/playwright-mcp | playwright-mcp | Microsoft Playwright MCP server enabling LLMs to operate browsers through structured page snapshots |
| https://github.com/browserbase/mcp-server-browserbase | browserbase-mcp | Browserbase MCP server for browser automation |
| https://github.com/upstash/context7 | context7 | Tool and MCP ecosystem project that provides up-to-date documentation context to LLMs and agents |
| https://github.com/github/github-mcp-server | github-mcp | Official GitHub MCP server for repository, issue, PR, and code context operations |
| https://github.com/redis/mcp-redis | redis-mcp | Official Redis MCP server for data access and caching scenarios |
| https://github.com/postgres-mcp/postgres-mcp | postgres-mcp | PostgreSQL MCP server for database querying and data context access |

#### 1.11.6 Agent Skills

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://skills.sh/ | skills-sh | Agent Skills directory and browsing site for discovering and installing skills |
| https://lobehub.com/skills | lobehub-skills | Agent Skills marketplace supporting SKILL.md format for Claude Code, Codex CLI, ChatGPT, and others |
| https://skillsllm.com/ | skillsllm | Open-source Agent Skills aggregation site for Claude Code, Codex CLI, and ChatGPT |
| https://agentskills.io/home | agentskills-io | Entry point for Agent Skills concepts, specifications, and integration guides |
| https://agentskills.io/specification | skills-spec | SKILL.md specification defining frontmatter, instructions, resources, and related structure |
| https://github.com/agentskills/agentskills | skills-spec-repo | Agent Skills specification and documentation repository |
| https://github.com/anthropics/skills | anthropics-skills | Official Anthropic example skills collection |
| https://github.com/vercel-labs/agent-skills | vercel-agent-skills | Official Vercel agent skills collection |
| https://github.com/vercel-labs/skills | skills-cli | Skills CLI for installing, discovering, checking, and updating skills |
| https://github.com/softaworks/agent-toolkit | agent-toolkit | Popular community skills collection covering development workflows, planning, documentation, architecture, and communication |

#### 1.11.7 RAG, Knowledge Bases, and Data Ingestion

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://github.com/run-llama/llama_index | llamaindex-rag | Core RAG and data indexing framework for documents, databases, and knowledge-base applications |
| https://github.com/langchain-ai/langchain | langchain-rag | LangChain retrieval, document loader, text splitter, and vector store ecosystem |
| https://github.com/mendableai/firecrawl | firecrawl | Converts websites into LLM-ready Markdown and structured data for crawling and RAG preparation |
| https://github.com/unclecode/crawl4ai | crawl4ai | Open-source web crawling and content extraction tool for AI and RAG use cases |
| https://github.com/infiniflow/ragflow | ragflow | Open-source RAG engine emphasizing document parsing, workflows, and enterprise knowledge bases |
| https://github.com/deepset-ai/haystack | haystack | Open-source LLM, RAG, and search pipeline framework for enterprise retrieval QA systems |
| https://github.com/weaviate/Verba | verba | Weaviate open-source RAG chatbot template for knowledge-base QA |
| https://github.com/embedchain/embedchain | embedchain | Framework for quickly creating ChatGPT/RAG applications from data sources |
| https://github.com/run-llama/llama_parse | llama-parse | LlamaIndex ecosystem document parsing tool/service for PDFs, tables, and complex documents |
| https://github.com/DS4SD/docling | docling | Document parsing tool for converting PDFs, Office files, HTML, and other formats into structured data |
| https://github.com/Unstructured-IO/unstructured | unstructured | Document ETL toolkit for transforming complex files into searchable text chunks |

#### 1.11.8 Vector Databases and Retrieval Engines

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://github.com/chroma-core/chroma | chromadb | Open-source vector database suitable for lightweight RAG and local prototypes |
| https://github.com/milvus-io/milvus | milvus | High-performance open-source vector database for scalable similarity search |
| https://github.com/qdrant/qdrant | qdrant | Rust-based vector search engine with strong engineering experience |
| https://github.com/weaviate/weaviate | weaviate | Open-source vector search engine with a mature ecosystem for knowledge bases and semantic search |
| https://github.com/pgvector/pgvector | pgvector | PostgreSQL vector extension for adding vector retrieval to existing Postgres systems |
| https://github.com/timescale/pgvectorscale | pgvectorscale | Timescale open-source PostgreSQL vector extension for higher-performance vector search |
| https://github.com/supabase/vecs | supabase-vecs | Supabase vector client |
| https://github.com/pinecone-io/pinecone-ts-client | pinecone | Pinecone vector database TypeScript client |
| https://github.com/vespa-engine/vespa | vespa | Large-scale search, recommendation, and vector retrieval engine |
| https://github.com/typesense/typesense | typesense | Open-source search engine supporting hybrid keyword, semantic, and vector retrieval scenarios |
| https://github.com/meilisearch/meilisearch | meilisearch | Lightweight search engine that can be combined with vector and semantic search capabilities |

#### 1.11.9 Prompt Engineering, Evaluation, Observability, and Experiment Management

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://github.com/langfuse/langfuse | langfuse | Open-source LLM engineering platform covering tracing, prompts, evals, debugging, and monitoring |
| https://github.com/Arize-ai/phoenix | phoenix | Open-source AI observability and evaluation tool for tracing, LLM evaluation, and RAG analysis |
| https://github.com/traceloop/openllmetry | openllmetry | LLM tracing and observability solution based on OpenTelemetry |
| https://github.com/promptfoo/promptfoo | promptfoo | Prompt and model output testing and regression evaluation tool, suitable for CI gates |
| https://github.com/confident-ai/deepeval | deepeval | LLM application evaluation framework for RAG, agents, and conversation quality |
| https://github.com/explodinggradients/ragas | ragas | RAG evaluation framework covering faithfulness, context precision, context recall, and related metrics |
| https://github.com/openai/evals | openai-evals | OpenAI open-source evaluation framework for custom model and task evaluations |
| https://github.com/microsoft/promptflow | promptflow | Microsoft open-source tool for LLM application development, evaluation, and flow orchestration |
| https://github.com/dair-ai/Prompt-Engineering-Guide | prompt-guide | Prompt engineering guide and resource repository |
| https://github.com/openai/tiktoken | tiktoken | OpenAI tokenizer for token counting and cost estimation |
| https://github.com/dqbd/tiktoken | js-tiktoken | JavaScript/WASM version of tiktoken for frontend and Node.js cost estimation |

#### 1.11.10 AI Application Development Platforms and Chat UI

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://github.com/langgenius/dify | dify | Open-source LLM application development platform covering workflows, RAG, agents, model management, and app publishing |
| https://github.com/langflow-ai/langflow | langflow | Visual LLM, agent, and RAG application building platform |
| https://github.com/FlowiseAI/Flowise | flowise | Drag-and-drop LLM application builder for quickly creating flows and tool-calling applications |
| https://github.com/n8n-io/n8n | n8n | Open-source automation workflow platform with broad AI node and agent workflow support |
| https://github.com/vercel/ai-chatbot | ai-chatbot | Vercel open-source full-stack AI chatbot template |
| https://github.com/danny-avila/LibreChat | librechat | Open-source multi-model ChatGPT-like application supporting plugins, agents, tools, and multiple providers |
| https://github.com/ChatGPTNextWeb/NextChat | nextchat | Formerly ChatGPT-Next-Web, a lightweight cross-platform ChatGPT-like application |
| https://github.com/lobehub/lobe-chat | lobe-chat | Modern open-source AI chat application supporting multi-models, plugins, and knowledge bases |
| https://github.com/open-webui/open-webui | open-webui | Self-hosted AI chat UI commonly used with Ollama, local models, and multi-model setups |
| https://github.com/mckaywrigley/chatbot-ui | chatbot-ui | Open-source ChatGPT UI useful as a lightweight UI reference |
| https://www.coze.cn/ | coze | ByteDance AI bot and workflow platform; not fully open-source, but useful for observing Chinese productized AI workflow patterns |

#### 1.11.11 Browser Agents, Computer Use, and Automation

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://github.com/browser-use/browser-use | browser-use | Open-source browser agent framework that lets LLMs control browsers to complete web tasks |
| https://github.com/browserbase/stagehand | stagehand | Browserbase open-source browser automation SDK combining natural-language actions with Playwright code |
| https://github.com/microsoft/playwright-mcp | playwright-mcp | Playwright MCP server suitable for allowing AI coding assistants to operate real browsers |
| https://github.com/vercel-labs/agent-browser | agent-browser | Browser automation CLI for AI agents |
| https://github.com/openinterpreter/open-interpreter | open-interpreter | Local computer-use and automation agent that can execute commands, file operations, and scripts |
| https://github.com/OpenInterpreter/01 | 01 | Local voice and computer assistant project in the Open Interpreter ecosystem |
| https://github.com/Significant-Gravitas/AutoGPT | autogpt-history | Early representative autonomous agent project; better kept as a historical case or design reference than a first-choice engineering framework |
| https://github.com/BuilderIO/ai-shell | ai-shell | CLI tool that converts natural language into shell commands for lightweight command-generation scenarios |

#### 1.11.12 Machine Learning, Browser-Side Models, Speech, and Vision AI

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://tensorflow.google.cn/js | tensorflow-js | Library for running machine learning and deep learning models in the browser or Node.js |
| https://github.com/tensorflow/tfjs-models | tfjs-models | Collection of TensorFlow.js pretrained models covering pose, detection, text, and more |
| https://github.com/ml5js/ml5-library | ml5 | Friendly machine learning library for creative coding and web developers, built on TensorFlow.js |
| https://github.com/mljs/ml | mljs | JavaScript machine learning algorithm collection |
| https://github.com/huggingface/transformers.js | transformersjs | Hugging Face Transformer model runtime for browser and Node.js |
| https://github.com/microsoft/onnxruntime | onnxruntime-web | ONNX Runtime Web capabilities for browser-side model inference |
| https://github.com/openai/whisper | whisper | OpenAI open-source speech recognition model |
| https://github.com/ggerganov/whisper.cpp | whisper-cpp | High-performance C/C++ implementation of Whisper for local and edge speech recognition |
| https://github.com/ricky0123/vad | vad | Real-time browser voice activity detection library |
| https://github.com/microsoft/cognitive-services-speech-sdk-js | azure-speech | Microsoft Azure Speech Service JavaScript SDK |
| https://github.com/opencv/opencv.js | opencvjs | JavaScript version of OpenCV for browser-side computer vision |
| https://github.com/google-ai-edge/mediapipe | mediapipe | Google cross-platform media AI and vision task framework for pose, gesture, face, and related scenarios |


### 1.12 WebAssembly

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://webassembly.org/ | wasm | Official WebAssembly entry point for learning about the Wasm standard, ecosystem, and basic resources. |
| https://developer.mozilla.org/en-US/docs/WebAssembly | wasm/mdn | MDN WebAssembly documentation, useful for frontend developers learning and checking Web API integration. |
| https://developer.mozilla.org/zh-CN/docs/WebAssembly | wasm/mdn-cn | MDN WebAssembly Chinese documentation. |
| https://www.assemblyscript.org/ | assemblyscript | TypeScript-like language for WebAssembly; useful for frontend/TS developers writing Wasm with TypeScript-like syntax, but it does not compile full TypeScript directly to Wasm. |
| https://rustwasm.github.io/docs/wasm-pack/ | wasm-pack | Common Rust to Wasm build, packaging, and npm publishing tool; replaces the old drager/wasm-pack link with the current Rust/Wasm ecosystem entry. |
| https://rustwasm.github.io/docs/wasm-bindgen/ | wasm-bindgen | Core Rust and JS/Wasm bindings and glue-code toolchain, often used with wasm-pack. |
| https://wasmtime.dev/ | wasmtime | Fast and secure Wasm runtime led by Bytecode Alliance, suitable for server-side, plugin-system, and edge-computing scenarios. |
| https://github.com/wasmerio/wasmer | wasmer | Mainstream Wasm runtime for running WebAssembly on servers, edge, embedded environments, and more. |
| https://wasi.dev/ | wasi | WebAssembly System Interface, the system interface specification for non-browser Wasm runtimes. |
| https://component-model.bytecodealliance.org/ | wasm-component-model | WebAssembly Component Model for building composable and interoperable Wasm components, an important direction for server-side and plugin ecosystems. |
| https://github.com/bytecodealliance/wit-bindgen | wit-bindgen | Language binding generator for the WebAssembly Component Model, using WIT to describe imports/exports and generate multi-language bindings. |
| https://www.npmjs.com/package/@bytecodealliance/jco | jco | Bytecode Alliance JavaScript WebAssembly Component toolchain for handling Wasm Components in the JS ecosystem. |
| https://github.com/WebAssembly/wabt | wabt | WebAssembly Binary Toolkit, including low-level conversion and analysis tools such as wat2wasm and wasm2wat. |
| https://github.com/WebAssembly/binaryen | binaryen | WebAssembly compiler and optimization toolchain library, commonly used for Wasm optimization, generation, and analysis. |
| https://emscripten.org/ | emscripten | Classic toolchain for compiling C/C++ to WebAssembly, useful for porting existing C/C++ libraries to the Web or Wasm runtimes. |
| https://wasmedge.org/ | wasmedge | WebAssembly runtime in the CNCF ecosystem, often used for cloud-native, edge, and lightweight service scenarios. |
| https://github.com/WebAssembly/wasi-sdk | wasi-sdk | C/C++ toolchain targeting WASI, used to compile C/C++ programs to the WASI target. |
| https://github.com/extism/extism | extism | WebAssembly-based plugin system framework for building multi-language, sandboxed plugin capabilities. |
| https://github.com/suborbital/reactr | reactr | Historical/reference WebAssembly function runtime and plugin framework, useful for studying server-side Wasm plugin-system exploration. |
| https://mbebenita.github.io/WasmExplorer/ | WasmExplorer | Historical online Wasm playground; modern projects should usually start with MDN, wasm-pack, WABT, Emscripten, and related toolchains. |

### 1.13 IDE Plugins

#### 1.13.1 VS Code

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://marketplace.visualstudio.com/ | marketplace | VS Code extension marketplace homepage. |
| https://vscode.dev/ | VSCode | Online VS Code, suitable for lightweight editing, remote repository viewing, and temporary development. |
| https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode | prettier | Official Prettier VS Code extension, commonly used for formatting in modern frontend projects; recommended over older formatters such as Beautify/stylefmt. |
| https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint | eslint | JS/TS code quality checking extension commonly used in modern frontend projects. |
| https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint | stylelint | CSS/Less/SCSS style checking extension. |
| https://marketplace.visualstudio.com/items?itemName=Vue.volar | volar/vue-official | Official Vue VS Code extension, preferred for Vue 3 projects and a replacement for Vetur in new projects. |
| https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin | typescript-vue-plugin | Vue + TypeScript support extension for Vue 3/TS projects. |
| https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss | tailwindcss | Tailwind CSS IntelliSense, completion, and lint extension commonly used in Tailwind projects. |
| https://marketplace.visualstudio.com/items?itemName=antfu.unocss | unocss | UnoCSS VS Code extension for atomic CSS projects. |
| https://marketplace.visualstudio.com/items?itemName=biomejs.biome | biome | Official Biome VS Code extension for projects using Biome for formatting and linting. |
| https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig | editorconfig | EditorConfig support extension for unifying indentation, line endings, and other basic formatting across editors. |
| https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens | error-lens | Shows errors and warnings inline in code, improving development feedback. |
| https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker | code-spell-checker | Code word spell checker for docs, variable names, and comments. |
| https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks | bookmarks | Code bookmark extension for reading and locating code in large projects. |
| https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens | gitlens | Git source-control enhancement for blame, commit history, authorship, and related information. |
| https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager | project-manager | Local project management extension for switching between multiple projects. |
| https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph | git-graph | Visual Git branch and commit history viewer for multi-branch projects. |
| https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github | github-pr | GitHub PR and Issue management extension for code review and collaboration inside VS Code. |
| https://marketplace.visualstudio.com/items?itemName=humao.rest-client | rest-client | Sends HTTP requests directly in VS Code, useful for API debugging and saved API examples. |
| https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client | thunder-client | VS Code-native API debugging client, useful as a lightweight Postman alternative. |
| https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker | docker | Official Docker VS Code extension for containers, images, Compose files, and debugging. |
| https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers | dev-containers | VS Code Dev Containers extension for unifying team development environments. |
| https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright | playwright | Official Playwright VS Code extension for writing, debugging, and running E2E tests. |
| https://marketplace.visualstudio.com/items?itemName=vitest.explorer | vitest | Vitest testing extension for modern Vite/Vitest projects. |
| https://marketplace.visualstudio.com/items?itemName=GitHub.copilot | copilot | GitHub official AI coding assistant for completion, explanation, and assisted generation. |
| https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat | copilot-chat | Conversational coding assistant for GitHub Copilot. |
| https://marketplace.visualstudio.com/items?itemName=Continue.continue | continue | Open-source AI coding assistant extension supporting multiple models and local/remote code context. |
| https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview | svg-preview | SVG graphics preview extension. |
| https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight | color-highlight | Color preview extension. |
| https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code | dart-code | Dart language development support. |
| https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter | Flutter | Flutter development support. |
| https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint | markdownlint | Markdown linting extension. |
| https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets | html-snippets | Historical reference: quick HTML snippet extension; modern VS Code already has substantial built-in completion. |
| https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify | beautify | Historical reference: JS/JSON/CSS/Sass/HTML formatter; modern projects should usually use Prettier. |
| https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets | rainbow-brackets | Historical reference: bracket coloring extension; VS Code has built-in bracket pair colorization, so this is usually unnecessary. |
| https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-stylefmt | stylefmt | Historical reference: CSS formatter; modern projects should usually use Prettier + Stylelint. |
| https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome | debugger-for-chrome | Historical reference: VS Code and Chrome debugging extension, now deprecated; modern VS Code has built-in JavaScript Debugger. |
| https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin | typescript-tslint-plugin | Historical reference: TSLint is deprecated; modern TypeScript projects should use typescript-eslint. |
| https://marketplace.visualstudio.com/items?itemName=octref.vetur | vetur | Maintenance reference for Vue 2/Vetur projects; Vue 3 projects should use Vue - Official / Volar. |
| https://marketplace.visualstudio.com/items?itemName=maximetinu.identical-sublime-monokai-csharp-theme-colorizer | identical-sublime-monokai | Sublime Monokai-style theme, kept for personal preference. |
| https://marketplace.visualstudio.com/items?itemName=HookyQR.minify | minify | Historical reference: direct JS/CSS minification extension; modern projects usually handle minification through Vite/Webpack/Rollup/Rspack and similar build tools. |
| https://marketplace.visualstudio.com/items?itemName=pnp.polacode | polacode | Code screenshot extension for sharing code snippets. |
| https://marketplace.visualstudio.com/items?itemName=sburg.vscode-javascript-booster | javascript-booster | JS/TS quick refactoring and optimization tool, such as changing var to const/let. |

### 1.14 Web3/Blockchain

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://ethereum.org/developers/ | ethereum | Official Ethereum developer entry point for wallets, smart contracts, nodes, toolchains, and DApp basics. |
| https://docs.soliditylang.org/ | solidity | Official documentation for the Ethereum smart contract programming language. |
| https://github.com/OpenZeppelin/openzeppelin-contracts | openzeppelin | Secure smart contract standard library with common ERC20/ERC721/ERC1155 implementations. |
| https://github.com/ethers-io/ethers.js/ | ethers | Classic Ethereum JavaScript/TypeScript library for wallets, contract calls, signing, transactions, and related scenarios; Viem is also worth evaluating for modern new projects. |
| https://viem.sh/ | viem | Modern, TypeScript-first Ethereum interface library that is lightweight, modular, and type-friendly. |
| https://wagmi.sh/ | wagmi | React Hooks for Ethereum, currently based on Viem, suitable for wallet connections, contract reads/writes, account state, and transaction state in React DApps. |
| https://rainbowkit.com/ | rainbowkit | React wallet connection component library for quickly building a polished wallet connection experience. |
| https://connectkit.family/ | connectkit | Beautiful, modern Web3 wallet connection components. |
| https://reown.com/appkit | reown-appkit | New entry point in the WalletConnect/Web3Modal direction, covering wallet connection, account login, embedded wallets, and Onchain App experience capabilities. |
| https://docs.family.co/web3modal | web3modal | Maintenance/historical reference: Ethereum wallet connection library; new projects should also look at Reown AppKit. |
| https://metamask.io/sdk/ | metamask-sdk | Official MetaMask SDK. |
| https://walletconnect.com/ | walletconnect | Open protocol for connecting decentralized applications and mobile wallets. |
| https://thirdweb.com/ | thirdweb | Complete Web3 application development platform with SDKs, contracts, wallets, infrastructure, and related capabilities. |
| https://moralis.io/ | moralis | Web3 development platform providing APIs, indexing, and infrastructure capabilities. |
| https://www.alchemy.com/ | alchemy | Blockchain development platform and API provider commonly used for RPC, NFT, token, transaction, and related data services. |
| https://infura.io/ | infura | Ethereum, IPFS, and related infrastructure API gateway service. |
| https://www.quicknode.com/ | quicknode | Blockchain infrastructure API service supporting multi-chain RPC and data services. |
| https://hardhat.org/ | hardhat | Mainstream Ethereum smart contract development environment for compilation, testing, deployment, and debugging. |
| https://book.getfoundry.sh/ | foundry | High-performance Ethereum smart contract development toolchain written in Rust, including forge, cast, and anvil. |
| https://book.getfoundry.sh/anvil/ | anvil | Local blockchain node in the Foundry ecosystem, suitable for local smart contract development and testing. |
| https://github.com/scaffold-eth/scaffold-eth-2 | scaffold-eth | Modern Ethereum DApp starter template, commonly combining Hardhat/Foundry, Viem, Wagmi, RainbowKit, and Next.js. |
| https://trufflesuite.com/ | truffle | Historical reference: classic Ethereum development framework; Truffle/Ganache have been sunset and archived, so new projects should prefer Hardhat or Foundry. |
| https://tenderly.co/ | tenderly | Smart contract debugging, simulation, monitoring, and on-chain analysis platform. |
| https://thegraph.com/docs/ | the-graph | Blockchain data indexing protocol for building on-chain data query services. |
| https://docs.chain.link/ | chainlink | Decentralized oracle network commonly used for prices, randomness, automation, and on-chain/off-chain data interaction. |
| https://docs.safe.global/ | safe | Multisig wallet and smart account infrastructure for DAOs, team treasury management, and account abstraction scenarios. |
| https://eips.ethereum.org/EIPS/eip-1193 | eip-1193 | Ethereum Provider JavaScript API standard, the basis for wallet injection and DApp interaction. |
| https://eips.ethereum.org/EIPS/eip-6963 | eip-6963 | Multi-wallet injection discovery standard, solving discovery and selection when multiple wallet extensions inject providers at the same time. |
| https://docs.optimism.io/ | optimism | Official Optimism / OP Stack documentation for learning Ethereum L2 and Rollup ecosystems. |
| https://docs.arbitrum.io/ | arbitrum | Official Arbitrum documentation for Arbitrum L2, contract deployment, and frontend integration. |
| https://docs.polygon.technology/ | polygon | Official Polygon documentation for Polygon PoS, zkEVM, and related developer tools. |
| https://docs.base.org/ | base | Official Base developer documentation for Base chain, contract deployment, and Onchain App development. |
| https://docs.ipfs.tech/ | ipfs | Decentralized storage documentation covering content addressing, file storage, and distribution. |
| https://docs.ceramic.network/ | ceramic | Decentralized data network for DID, user data, and composable data scenarios. |
| https://gun.eco/ | gun | Decentralized data synchronization protocol for experimental P2P data sync and offline-first applications. |

### 1.15 Life

| Address | Tag | Description |
| ---- | ---- | ---- |
| https://github.com/Anduin2017/HowToCook | HowToCook | A programmer's guide to cooking at home, useful for learning cooking in an engineering-oriented way. |
| https://github.com/geekan/HowToLiveLonger | HowToLiveLonger | Programmer health and lifestyle resource collection; useful for habits, risk factors, and lifestyle references, but not a replacement for professional medical advice. |
| https://github.com/awesome-selfhosted/awesome-selfhosted | awesome-selfhosted | Collection of self-hosted open-source services for personal tools, home servers, and private services. |
| https://github.com/Kickball/awesome-selfhosted | awesome-selfhosted-archive | Historical reference: early self-hosted service collection; some content may have moved or become outdated. |
| https://github.com/pluja/awesome-privacy | awesome-privacy | Privacy tools and privacy-friendly service collection for understanding personal data protection and alternatives. |
| https://github.com/trimstray/the-book-of-secret-knowledge | secret-knowledge | Collection of command-line, system, networking, security, and productivity tips for engineers. |
| https://github.com/sindresorhus/awesome | awesome | Main entry point for GitHub Awesome lists, useful as navigation across many technical and lifestyle resource collections. |
| https://github.com/jlevy/the-art-of-command-line | command-line | Command-line tips collection for improving day-to-day programmer productivity. |
| https://github.com/yangshun/tech-interview-handbook | interview | Technical interview preparation resource collection for candidates, interviewer question banks, and structured review. |
| https://github.com/jwasham/coding-interview-university | coding-interview | Long-term computer science fundamentals and algorithm interview study plan, useful for systematic foundations. |

---

## 2. fe-tools Method/Utility Libraries

### 2.1 utils

Common utility methods for frontend development, suitable for browser and Node.js. Documentation: [https://blog.michealwayne.cn/fe-tools/stable/](https://blog.michealwayne.cn/fe-tools/stable/)

#### Modules

- [env](./utils/packages/env/): environment detection constants.
- [utils](./utils/packages/utils/): basic environment-independent utility methods.
- [web-utils](./utils/packages/web-utils/): browser-side DOM, CSS, event handling, and other web utility wrappers.
- [node-utils](./utils/packages/node-utils/): Node.js file, event handling, and related wrappers.
- [node-img-build](./utils/packages/node-img-build/): webp/base64 and other image processing wrappers based on gm.
- [canvas-utils](./utils/packages/canvas-utils/): Canvas drawing wrappers for web and node-canvas.
- [ai-utils](./utils/packages/ai-utils/): AI large-model related wrappers, including code checking and related applications.

#### Start the utils project

Run these commands from `./utils`:

- `pnpm install`
- Build: `npm run build:prod`
- Build docs: `npm run docs`

> TODO: Mini Program wrappers and build wrappers.

#### 2.2 project-templates

`frontend` templates:

- [webpack](./project-templates/frontend/webpack/)
- [webpack + ts](./project-templates/frontend/webpack%2Bts/)
- [vite + vue3](./project-templates/frontend/vite-vue3+ts/)
- [vue2](./project-templates/frontend/vue/)
- [vite + react 17](./project-templates/frontend/vite-react+ts/)
- [react16](./project-templates/frontend/react/)

`backend` templates:

- [koa2](./project-templates/backend/koa2/)

#### 2.3 ~~styles base style library~~

Moved to CSS recommended convention [MooCSS](https://github.com/MichealWayne/Moo-CSS), common style library [moo-css-base npm](https://www.npmjs.com/package/moo-css-base), and [moo-css-base GitHub](https://github.com/MichealWayne/Moo-CSS/tree/master/moo-css-base).

---

## FE-Tools - Chrome Extension

> Project and source: [https://github.com/MichealWayne/fe-tools-chrome-plugin](https://github.com/MichealWayne/fe-tools-chrome-plugin)

![chrome-ext.png](https://blog.michealwayne.cn/images/fe-tools/chrome-ext.png)

A small extension that assists frontend development.

### Features

- Tool website search
- Local bookmark website search
- CSS property/Moo-CSS search
- URL to QR code and SVG vector image
- Image compression and base64 conversion
- px/rem/vw conversion calculator
- rgb/hsb/hex color conversion
- Multi-language translation
- Simple Postman
- Common regex lookup
- JSON formatting and validation
- SVG online editor
- Date/timestamp conversion
- Linux command lookup
- Page screenshot (full page/node screenshot and save)
- Utility function library search
- Custom search extension
- Chinese/English switching

[Go to extension](https://github.com/MichealWayne/fe-tools/tree/master/chrome-extension)

### Installation

Clone this repository locally, open the browser extensions page, click "Load unpacked", and select the `chrome-extension` directory in this repository.
