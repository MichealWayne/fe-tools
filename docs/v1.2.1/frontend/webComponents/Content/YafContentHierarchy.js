import { YafHTMLElement } from '../../index.js';
import appState from '../../handlers/AppState.js';
import { makeElement, makeIconSpan, makeLinkElement, } from '../../yafElement.js';
import { YafElementDrawers } from '../../YafElementDrawers.js';
export class YafContentHierarchy extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.drawer = makeElement('ul');
        this.initDrawers = (pageId) => {
            this.drawerTrigger = makeElement('h5');
            this.drawerTrigger.appendChild(makeElement('span', null, 'Hierarchy'));
            this.drawerTrigger.appendChild(makeIconSpan('expand_less'));
            this.appendChild(this.drawerTrigger);
            this.drawers = new YafElementDrawers(this, this.drawer, this.drawerTrigger, `hierarchy_${pageId}`);
        };
        this.factory = {
            li: (item) => makeElement('li', item.isTarget ? 'target' : null, item.name),
            linkLi: (item) => {
                const linkData = appState.reflectionMap[item.linkId];
                const parentLi = makeElement('li');
                parentLi.appendChild(makeLinkElement(`?page=${linkData.query}#${linkData.hash}`, undefined, item.name));
                return parentLi;
            },
            hierarchy: (item) => makeElement('yaf-content-hierarchy', null, null, {
                hierarchy: item.children,
            }),
        };
    }
    onConnect() {
        var _a;
        const { hierarchy, pageId, init } = this.props;
        const HTMLElements = hierarchy === null || hierarchy === void 0 ? void 0 : hierarchy.map((item) => {
            const isLink = !(item.isTarget || !item.linkId);
            const hasChildren = !(!item.children || !item.children.length);
            const parentLi = isLink
                ? this.factory.linkLi(item)
                : this.factory.li(item);
            if (!hasChildren)
                return parentLi;
            const childrenLi = makeElement('li');
            childrenLi.appendChild(this.factory.hierarchy(item));
            return [parentLi, childrenLi];
        });
        if (init)
            this.initDrawers(pageId);
        this.drawer.appendChildren(HTMLElements === null || HTMLElements === void 0 ? void 0 : HTMLElements.flat());
        init
            ? this.appendChild(this.drawer)
            : (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(this.drawer, this);
    }
    get isOrphan() {
        const { hierarchy, init } = this.props;
        if (!hierarchy || !hierarchy.length)
            return true;
        return (init &&
            hierarchy &&
            hierarchy.length === 1 &&
            (!hierarchy[0].children || !hierarchy[0].children.length));
    }
}
const yafContentHierarchy = 'yaf-content-hierarchy';
customElements.define(yafContentHierarchy, YafContentHierarchy);
//# sourceMappingURL=YafContentHierarchy.js.map