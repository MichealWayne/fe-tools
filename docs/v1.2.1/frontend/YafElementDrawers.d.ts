import { drawerState, flagCounts } from '../types/frontendTypes.js';
export type DrawerElement = HTMLElement & YafElementDrawers;
/**
 * Utility class for folding, hierarchical drawers
 */
export declare class YafElementDrawers {
    drawer: HTMLElement;
    drawerParent: DrawerElement;
    drawerTrigger: HTMLElement;
    drawerId: string;
    parentDrawerElement?: DrawerElement;
    debounceResize: ReturnType<typeof setTimeout> | null;
    isDrawer: boolean;
    hasContent: boolean;
    drawers: YafElementDrawers;
    childDrawers: DrawerElement[];
    constructor(drawerParent: DrawerElement, drawer: HTMLElement, drawerTrigger: HTMLElement, id: string, parentDrawerElement?: DrawerElement);
    drawerHasDisconnected: () => void;
    private eventsList;
    renderDrawers: (init?: boolean) => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    toggleDrawerState: () => void;
    heightControl: {
        initDataHeight: (clientHeight: number) => void;
        setMaxHeightStyle: () => void;
        updateHeightAbove: (height: number) => void;
        reRenderDrawers: (init?: boolean) => void;
        resetHeights: (init?: boolean) => void;
        debounceReset: () => void;
    };
    get dataHeight(): number;
    set dataHeight(height: number);
    get dataExtraHeight(): number;
    set dataExtraHeight(height: number);
    set dataExtraReset(height: number);
    get maxHeightPixels(): string;
    get drawerState(): drawerState;
    get childDrawerElements(): DrawerElement[];
    get isRoot(): boolean;
    get isBranch(): boolean;
    get isLeaf(): boolean;
    get flagCounts(): flagCounts;
    static findParentDrawers: (child: HTMLElement, parents?: DrawerElement[]) => DrawerElement[];
    static hasClosedDrawers: (drawers: DrawerElement[]) => boolean | 0;
}
