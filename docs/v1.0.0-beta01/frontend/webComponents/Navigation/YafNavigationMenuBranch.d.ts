import { treeMenuBranch, YAFReflectionLink } from '../../../types/types.js';
import { YafElementDrawers } from '../../YafElementDrawers.js';
import { YafHTMLElement } from '../../index.js';
/**
 *
 */
export declare class YafNavigationMenuBranch extends YafHTMLElement<{
    link: YAFReflectionLink;
    branch: treeMenuBranch;
    parentDrawerElement?: HTMLElement;
}> {
    drawers: YafElementDrawers;
    onConnect(): void;
    disconnectedCallback(): void;
    private eventsList;
    private static factory;
}
