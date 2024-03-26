import { YafHTMLElement } from '../../index.js';
import { treeMenuRoot } from '../../../types/types.js';
/**
 *
 */
export declare class YafNavigationMenu extends YafHTMLElement {
    onConnect(): void;
    disconnectedCallback(): void;
    private recordScrollTop;
    private focusIndex;
    private eventsList;
    static treeBranchSort: (tree: treeMenuRoot) => {
        links: import("../../../types/types.js").YAFReflectionLink[];
        tree: treeMenuRoot;
    };
}
