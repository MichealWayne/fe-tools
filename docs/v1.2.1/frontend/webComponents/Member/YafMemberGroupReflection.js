var _a;
import { YafElementDrawers } from '../../YafElementDrawers.js';
import { makeElement, makeTitleSpan, makeIconSpan, normaliseFlags, makeSymbolSpan, makeLinkElement, } from '../../yafElement.js';
import { YafHTMLElement } from '../../index.js';
import { events } from '../../handlers/index.js';
const { action } = events;
/**
 *
 */
export class YafMemberGroupReflection extends YafHTMLElement {
    onConnect() {
        const { title, children, pageId, nested, idPrefix } = this.props;
        const { factory } = YafMemberGroupReflection;
        this.id = `member_${pageId}_${title}`;
        const drawerHTMLElement = makeElement(`ul`);
        const drawerTriggerHTMLElement = makeElement('span', 'trigger');
        const groupHeaderHTMLElement = makeElement(nested ? 'h3' : 'h2');
        const groupTitleHTMLElement = factory.makeNestedTitleSpan(title, idPrefix, this.pageId, drawerTriggerHTMLElement);
        const groupCountHTMLElement = factory.counterWidget(children.length);
        const drawerLiHTMLElements = factory.drawerListChildren(children, idPrefix);
        groupHeaderHTMLElement.appendChildren([
            groupTitleHTMLElement,
            groupCountHTMLElement,
        ]);
        drawerHTMLElement.appendChildren(drawerLiHTMLElements);
        this.appendChildren([groupHeaderHTMLElement, drawerHTMLElement]);
        this.drawers = new YafElementDrawers(this, drawerHTMLElement, drawerTriggerHTMLElement, this.id);
        drawerHTMLElement.prepend(factory.tagToggles(this.drawers));
        /**
         * NOTE: `drawers.renderDrawers()` is called from `YafMemberDeclaration` or `YafContentMembers`.
         * That is the root of the drawer tree and propagates downwards to branches
         * from within the `renderDrawers` method itself.
         */
    }
    disconnectedCallback() {
        this.drawers.drawerHasDisconnected();
    }
    get pageId() {
        let id;
        events.dispatch(action.content.getPageId((pageId) => {
            id = pageId;
        }));
        return id;
    }
}
_a = YafMemberGroupReflection;
YafMemberGroupReflection.factory = {
    drawerListChildren: (children, idPrefix = '') => children.map((child) => {
        const liHTMLElement = _a.factory.listItem(child.flags);
        const id = `${idPrefix ? idPrefix + '.' : ''}${child.name}`;
        liHTMLElement.id = id;
        liHTMLElement.appendChild(_a.factory.member(child, id));
        return liHTMLElement;
    }),
    listItem: (flags) => makeElement('li', flags ? normaliseFlags(flags).join(' ') : ''),
    member: (data, idPrefix) => makeElement('yaf-member', null, null, { data, idPrefix }),
    tagToggles: (drawers) => {
        const toggleHTMLElement = makeElement('yaf-widget-tag-toggle', 'tagtoggles', null, {
            flagCounts: drawers.flagCounts,
        });
        const liHTMLElement = makeElement('li');
        liHTMLElement.appendChild(toggleHTMLElement);
        return liHTMLElement;
    },
    counterWidget: (count) => makeElement('yaf-widget-counter', null, null, {
        count,
    }),
    makeNestedTitleSpan: (titleString, idPrefix, pageId, drawerTriggerHTMLElement) => {
        const { makeDrawerToggle } = _a.factory;
        const wrapperHTMLElement = makeElement('span', 'wrapper');
        if (!idPrefix) {
            wrapperHTMLElement.appendChild(makeDrawerToggle(titleString, drawerTriggerHTMLElement));
            return wrapperHTMLElement;
        }
        const fragments = idPrefix.split('.');
        const fragmentHTMLElements = [];
        fragments.forEach((fragment, i) => {
            const linkHTMLElement = makeLinkElement(`#${fragments.slice(0, i + 1).join('.')}`, undefined, fragment);
            /*
            makeElement('a', undefined, fragment);
            linkHTMLElement.setAttribute(
                'href',
                `#${fragments.slice(0, i + 1).join('.')}`
            );
            */
            fragmentHTMLElements.push(linkHTMLElement);
            if (i < fragments.length - 1)
                fragmentHTMLElements.push(makeSymbolSpan(' : '));
        });
        wrapperHTMLElement.appendChildren([
            ...fragmentHTMLElements,
            makeDrawerToggle(titleString, drawerTriggerHTMLElement),
        ]);
        return wrapperHTMLElement;
    },
    makeDrawerToggle: (title, drawerTriggerHTMLElement) => {
        const handleIconHTMLElement = makeIconSpan('expand_less');
        const iconHTMLElement = makeElement('span', 'icon');
        iconHTMLElement.appendChild(handleIconHTMLElement);
        drawerTriggerHTMLElement.appendChildren([
            iconHTMLElement,
            makeTitleSpan(title),
        ]);
        return drawerTriggerHTMLElement;
    },
};
/**
 * Calls `renderDrawers()` from the root of the drawer tree only.
 * @param parent
 */
YafMemberGroupReflection.renderDrawersFromRoot = (parent) => {
    const drawerHTMLElements = [...parent.children].filter((child) => 'drawers' in child);
    drawerHTMLElements.forEach((drawer) => drawer.drawers.renderDrawers());
};
const yafMemberGroupReflection = 'yaf-member-group-reflection';
customElements.define(yafMemberGroupReflection, YafMemberGroupReflection);
//# sourceMappingURL=YafMemberGroupReflection.js.map