import { yafEventList } from '../../../types/frontendTypes.js';
import { YafHTMLElement } from '../../index.js';
/**
 * **The app chrome wrapping around the main content portal.**
 *
 * This component deals primarily with opening drawers and scrolling to content.\
 * It reacts to location input events.
 */
export declare class YafChromeHeader extends YafHTMLElement {
    breadcrumbHTMLElement: HTMLElement;
    onConnect(): HTMLElement | undefined;
    disconnectedCallback(): void;
    private toggleMenu;
    private makeBreadcrumb;
    eventsList: yafEventList;
}
