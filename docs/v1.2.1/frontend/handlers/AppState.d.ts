import { yafDisplayOptions } from '../../types/frontendTypes.js';
import { reflectionMap, kindSymbols, treeMenuRoot, YAFDataObject, needsParenthesis } from '../../types/types.js';
/**
 *
 */
export declare class AppState {
    private state;
    private static defaultDataDir;
    private static defaultOptions;
    constructor();
    initCache(): Promise<void>;
    get reflectionMap(): reflectionMap;
    get reflectionKind(): typeof import("typedoc").ReflectionKind;
    get kindSymbols(): kindSymbols;
    get needsParenthesis(): needsParenthesis;
    get navigationMenu(): treeMenuRoot;
    get options(): {
        display: {
            inherited: import("../../types/frontendTypes.js").displayStates;
            private: import("../../types/frontendTypes.js").displayStates;
        };
    };
    get openDrawers(): {
        [key: string]: import("../../types/frontendTypes.js").drawerState;
    };
    get scrollTops(): {
        [key: string]: number;
    };
    set openDrawer(id: string);
    set closeDrawer(id: string);
    get callTypes(): number[];
    get projectName(): string;
    toggleDisplayOption: (flag: yafDisplayOptions) => "show" | "hide";
    setScrollTop: (id: string, position: number) => number;
    getPageData: (fileName: string) => Promise<YAFDataObject>;
    getBreadcrumb: (id: number, crumbArray?: number[]) => number[] | undefined;
    private flushStateCache;
    private static fetchDataFromFile;
    private static fetchFile;
    private static getLocalStorageItem;
    private static saveToLocalStorage;
    private static deepFreeze;
}
declare const appState: AppState;
export default appState;
