import { YafHTMLElement } from '../../index.js';
import { YafElementDrawers } from '../../YafElementDrawers.js';
import { yafContentHierarchyProps } from '../../../types/frontendTypes.js';
export declare class YafContentHierarchy extends YafHTMLElement<yafContentHierarchyProps> {
    drawers?: YafElementDrawers;
    drawerTrigger: HTMLElement;
    drawer: HTMLElement & import("../../../types/frontendTypes.js").yafHTMLExtension;
    onConnect(): void;
    private initDrawers;
    private get isOrphan();
    private factory;
}
