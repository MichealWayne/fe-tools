import { YafHTMLElement } from '../../index.js';
/**
 * **The app chrome wrapping around the main content portal.**
 *
 * This component deals primarily with opening drawers and scrolling to content.\
 * It reacts to location input events.
 */
export declare class YafChromeContent extends YafHTMLElement {
    scrollTimer: ReturnType<typeof setTimeout>;
    onConnect(): void;
    disconnectedCallback(): void;
    private focusContent;
    private emitScroll;
    private events;
}
