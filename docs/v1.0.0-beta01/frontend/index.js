/**
 * `typedoc-theme-yaf` Is a data driven single page application (SPA).\
 * You are hopefully looking at it right now.
 *
 * This frontend is a zero dependency construct of native [Web Components](https://en.wikipedia.org/wiki/Web_Components),
 * all being ancestors of {@link frontend.webComponents.TypedocThemeYaf}.
 *
 * Much of the frontend architecture is {@link frontend.handlers.Events event driven}.
 *
 * The {@link frontend.handlers.AppState application state} is generally immutable, and persisted across sessions using `localstorage`.
 *
 * @module frontend
 */
export { default as YafHTMLElement } from './YafHTMLElement.js';
export * from './YafElementDrawers.js';
import * as yafElement_1 from './yafElement.js';
export { yafElement_1 as yafElement };
import * as handlers_1 from './handlers/index.js';
export { handlers_1 as handlers };
import * as webComponents_1 from './webComponents/index.js';
export { webComponents_1 as webComponents };
//# sourceMappingURL=index.js.map