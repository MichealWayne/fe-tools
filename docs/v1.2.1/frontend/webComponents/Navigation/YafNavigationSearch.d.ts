import YafHTMLElement from '../../YafHTMLElement.js';
/**
 *
 */
export declare class YafNavigationSearch extends YafHTMLElement {
    private resultsHTMLElement;
    private debouncer;
    private dictionary;
    constructor();
    onConnect(): void;
    disconnectedCallback(): void;
    private search;
    private match;
    private eventsList;
    private static factory;
}
