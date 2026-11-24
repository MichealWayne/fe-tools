import { yafMemberGroupReflectionProps } from '../../../types/frontendTypes.js';
import { YafElementDrawers } from '../../YafElementDrawers.js';
import { YafHTMLElement } from '../../index.js';
/**
 *
 */
export declare class YafMemberGroupReflection extends YafHTMLElement<yafMemberGroupReflectionProps> {
    drawers: YafElementDrawers;
    onConnect(): void;
    disconnectedCallback(): void;
    get pageId(): number;
    private static factory;
    /**
     * Calls `renderDrawers()` from the root of the drawer tree only.
     * @param parent
     */
    static renderDrawersFromRoot: (parent: HTMLElement) => void;
}
