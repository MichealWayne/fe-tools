var _a;
import appState from '../../handlers/AppState.js';
import { YafElementDrawers } from '../../YafElementDrawers.js';
import { makeElement, normaliseFlags, makeLinkElement, makeNameSpan, makeIconSpan, } from '../../yafElement.js';
import { YafNavigationMenu } from './index.js';
import { YafHTMLElement } from '../../index.js';
import { events } from '../../handlers/index.js';
const { trigger } = events;
/**
 *
 */
export class YafNavigationMenuBranch extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.eventsList = () => {
            var _b, _c;
            return [
                [trigger.menu.rollMenuDown, (_b = this.drawers) === null || _b === void 0 ? void 0 : _b.openDrawer],
                [trigger.menu.rollMenuUp, (_c = this.drawers) === null || _c === void 0 ? void 0 : _c.closeDrawer],
            ];
        };
    }
    onConnect() {
        const { children } = this.props.branch;
        const { kind, id } = this.props.link;
        const { parentDrawerElement } = this.props;
        const { factory } = YafNavigationMenuBranch;
        this.id = `menu_${id}`;
        this.classList.add(appState.reflectionKind[kind].toLowerCase());
        const childCount = Object.keys(children).length;
        const drawerTriggerHTMLElement = makeElement('span', 'trigger');
        const drawerHeaderHTMLElement = factory.makeDrawerheader(this.props.link, 'span', drawerTriggerHTMLElement, childCount);
        if (childCount) {
            const drawerHTMLElement = makeElement('ul');
            drawerHTMLElement.replaceChildren(...factory.makeDrawerChildrenArray(drawerTriggerHTMLElement, childCount, this));
            this.appendChildren([drawerHeaderHTMLElement, drawerHTMLElement]);
            this.drawers = new YafElementDrawers(this, drawerHTMLElement, drawerTriggerHTMLElement, `menu_${id}`, parentDrawerElement);
            /**
             * NOTE: `drawers.renderDrawers()` is called from `YafNavigationMenu`.
             * That is the root of the menu tree and propagates downwards to branches
             * from within the `renderDrawers` method itself.
             */
            drawerHTMLElement.prepend(factory.makeDrawerTagToggles(this.drawers));
        }
        else {
            this.appendChild(drawerHeaderHTMLElement);
        }
        this.eventsList().forEach((event) => events.on(...event));
    }
    disconnectedCallback() {
        this.drawers.drawerHasDisconnected();
        this.eventsList().forEach((event) => events.off(...event));
    }
}
_a = YafNavigationMenuBranch;
YafNavigationMenuBranch.factory = {
    makeDrawerChildrenArray: (drawerTrigger, childCount, self) => {
        if (!childCount)
            return [];
        const { children } = self.props.branch;
        const sortedBranches = YafNavigationMenu.treeBranchSort(children);
        const { links, tree } = sortedBranches;
        const newMenuElements = links.map((link) => {
            const childCount = Object.keys(tree[link.id].children).length;
            const menuLiHTMLElement = _a.factory.makeDrawerheader(link, 'li', drawerTrigger, childCount);
            if (childCount) {
                return _a.factory.makeBranch(tree[link.id], link, self, menuLiHTMLElement);
            }
            menuLiHTMLElement.id = `menu_${link.id}`;
            return menuLiHTMLElement;
        });
        return newMenuElements;
    },
    makeBranch: (branch, link, self, liHTMLElement) => {
        //const liHTMLElement = makeElement<HTMLLIElement>('li');
        const branchHTMLElement = makeElement('yaf-navigation-menu-branch', normaliseFlags(self.props.link.flags).join(' '), null, { branch, link, parentDrawerElement: self });
        liHTMLElement.appendChild(branchHTMLElement);
        return liHTMLElement;
    },
    makeDrawerheader: (reflectionLink, wrapper, drawerTriggerHTMLElement, childCount) => {
        const { query, hash, name, kind, flags } = reflectionLink;
        const flagClasses = normaliseFlags(flags).join(' ').trim();
        const isBranchList = wrapper === 'li' && childCount;
        let href = `?page=${query}`;
        if (hash)
            href += `#${hash}`;
        const classes = isBranchList
            ? flagClasses
            : childCount
                ? 'header parent'
                : `header ${flagClasses}`;
        const headerHTMLElement = makeElement(wrapper, classes);
        if (isBranchList)
            return headerHTMLElement;
        const headerLinkHTMLElement = makeLinkElement(href);
        const nameHTMLElement = makeNameSpan(name);
        const linkSymbolHTMLElement = makeElement('yaf-widget-kind', null, null, { kind: String(kind) });
        headerLinkHTMLElement.appendChild(nameHTMLElement);
        headerHTMLElement.appendChildren([
            linkSymbolHTMLElement,
            headerLinkHTMLElement,
        ]);
        if (!childCount)
            return headerHTMLElement;
        return childCount
            ? _a.factory.extendHeader(headerHTMLElement, drawerTriggerHTMLElement, childCount)
            : headerHTMLElement;
    },
    extendHeader: (header, drawerTrigger, childCount) => {
        const countWidget = makeElement('yaf-widget-counter', null, null, {
            count: childCount,
            fontSize: '.8rem',
        });
        const icon = makeElement('span', 'icon');
        icon.appendChild(makeIconSpan('expand_less'));
        drawerTrigger.appendChild(countWidget);
        drawerTrigger.appendChild(icon);
        header.appendChild(drawerTrigger);
        return header;
    },
    makeDrawerTagToggles: (drawers) => {
        const toggleHTMLElement = makeElement('yaf-widget-tag-toggle', 'tagtoggles', null, {
            flagCounts: drawers.flagCounts,
        });
        const liHTMLElement = makeElement('li');
        liHTMLElement.appendChild(toggleHTMLElement);
        return liHTMLElement;
    },
};
const yafNavigationBranch = 'yaf-navigation-menu-branch';
customElements.define(yafNavigationBranch, YafNavigationMenuBranch);
//# sourceMappingURL=YafNavigationMenuBranch.js.map