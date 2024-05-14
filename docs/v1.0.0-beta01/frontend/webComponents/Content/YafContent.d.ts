import { YafHTMLElement } from '../../index.js';
export declare class YafContent extends YafHTMLElement {
    onConnect(): void;
    disconnectedCallback(): void;
    private initPageData;
    private renderPageContent;
    private saveScrollTop;
    private returnPageId;
    /**
     * @event
     */
    private events;
    private static factory;
}
