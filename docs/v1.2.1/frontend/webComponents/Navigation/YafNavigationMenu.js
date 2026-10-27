import appState from '../../handlers/AppState.js';
import { makeElement, scrollToAnchor } from '../../yafElement.js';
import { YafHTMLElement } from '../../index.js';
import ErrorHandlers from '../../handlers/ErrorHandlers.js';
import { events } from '../../handlers/index.js';
const { trigger, action } = events;
/**
 *
 */
export class YafNavigationMenu extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.recordScrollTop = () => {
            appState.setScrollTop('menu', this.scrollTop);
        };
        this.focusIndex = ({ detail, }) => {
            events.dispatch(action.menu.search(''));
            events.dispatch(action.menu.toggle('open'));
            setTimeout(() => {
                scrollToAnchor(this, `menu_${detail.target}`);
            });
        };
        this.eventsList = [
            ['scroll', this.recordScrollTop, this],
            [trigger.menu.scrollTo, this.focusIndex],
        ];
    }
    onConnect() {
        const menuData = appState.navigationMenu;
        const navHTMLElement = makeElement('nav');
        const menuHTMLElement = makeElement('menu');
        const sortedBranches = YafNavigationMenu.treeBranchSort(menuData);
        const { links, tree } = sortedBranches;
        const listHTMLElements = links.map((link) => {
            if (link.kind === appState.reflectionKind.Project)
                return undefined;
            const liHTMLElement = makeElement('li');
            const menuItemHTMLElement = makeElement('yaf-navigation-menu-branch', null, null, {
                link,
                branch: tree[link.id],
            });
            menuItemHTMLElement.setAttribute('root', '');
            liHTMLElement.appendChild(menuItemHTMLElement);
            return liHTMLElement;
        });
        menuHTMLElement.appendChildren(listHTMLElements);
        navHTMLElement.appendChild(menuHTMLElement);
        this.appendChild(navHTMLElement);
        /**
         * NOTE: Calls `renderDrawers()` from the root of the drawer tree only.
         */
        [...menuHTMLElement.children].forEach((menuItem) => {
            const drawer = [...menuItem.children].find((child) => 'drawers' in child);
            drawer === null || drawer === void 0 ? void 0 : drawer.drawers.renderDrawers();
        });
        this.scrollTop = appState.scrollTops['menu'] || 0;
        this.eventsList.forEach((event) => events.on(...event));
    }
    disconnectedCallback() {
        this.eventsList.forEach((event) => events.off(...event));
    }
}
YafNavigationMenu.treeBranchSort = (tree) => {
    const branchLinkList = Object.keys(tree)
        .map((id) => {
        const reflectionLink = appState.reflectionMap[id];
        if (!reflectionLink)
            ErrorHandlers.notFound(`id "${id}" not found on reflectionMap`);
        return reflectionLink;
    })
        .filter((reflectionLink) => !!reflectionLink);
    const sortedBranchLinkList = branchLinkList
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => (a.kind > b.kind ? -1 : a.kind === b.kind ? 0 : 1));
    return { links: sortedBranchLinkList, tree };
};
const yafNavigationMenu = 'yaf-navigation-menu';
customElements.define(yafNavigationMenu, YafNavigationMenu);
//# sourceMappingURL=YafNavigationMenu.js.map