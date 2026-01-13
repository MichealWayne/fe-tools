import { YafElementDrawers } from '../../YafElementDrawers.js';
import { YafHTMLElement } from '../../index.js';
/**
 *
 */
export declare class YafNavigationHeader extends YafHTMLElement {
    drawers: YafElementDrawers;
    id: string;
    onConnect(): void;
    disconnectedCallback(): void;
    private static factory;
    private keyKinds;
}
