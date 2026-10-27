import { YafHTMLElement } from '../index.js';
/**
 * This is the highest level component of the theme, parent container to all other custom theme elements
 */
export declare class TypedocThemeYaf extends YafHTMLElement {
    onConnect(): void;
    disconnectedCallback(): void;
    private setTitle;
    private initVersions;
    private toggleMenu;
    private events;
}
