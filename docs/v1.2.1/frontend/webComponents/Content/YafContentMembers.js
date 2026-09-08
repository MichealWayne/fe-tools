var _a;
import { YafMember } from '../Member/YafMember.js';
import errorHandlers from '../../handlers/ErrorHandlers.js';
import { YafMemberGroupReflection, } from '../Member/index.js';
import appState from '../../handlers/AppState.js';
import { makeElement } from '../../yafElement.js';
import { YafHTMLElement } from '../../index.js';
/**
 *
 */
export class YafContentMembers extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.linkReferencPageTypes = [
            'Namespace',
            'Module',
            'Project',
        ].map((kindString) => appState.reflectionKind[kindString]);
    }
    onConnect() {
        var _b, _c;
        const { groups, children, id, kind } = this.props;
        const { factory } = YafContentMembers;
        const isLinkList = this.linkReferencPageTypes.includes(kind);
        const constructorGroup = groups === null || groups === void 0 ? void 0 : groups.find((group) => group.title === 'Constructors');
        const hasConstructor = constructorGroup && ((_b = constructorGroup.children) === null || _b === void 0 ? void 0 : _b.length) === 1;
        const HTMLElements = [
            hasConstructor
                ? factory.constructorElement(constructorGroup, children || [])
                : undefined,
            groups
                ? (_c = [...groups]) === null || _c === void 0 ? void 0 : _c.sort((a, b) => a.title.localeCompare(b.title)).map((group) => {
                    var _b;
                    const isConstructorGroup = group.title === 'Constructors' &&
                        hasConstructor;
                    if (isConstructorGroup || !((_b = group.children) === null || _b === void 0 ? void 0 : _b.length))
                        return undefined;
                    return isLinkList
                        ? factory.linkGroup(group, children || [])
                        : factory.reflectionGroup(group, children || [], String(id));
                })
                : undefined,
        ].flat();
        this.appendChildren(HTMLElements);
        YafMemberGroupReflection.renderDrawersFromRoot(this);
    }
}
_a = YafContentMembers;
YafContentMembers.factory = {
    /**
     * Returns a HTMLElement for the consructor member
     * @param constructorGroup
     * @param children
     * @returns
     */
    constructorElement: (constructorGroup, children) => {
        const childId = constructorGroup.children[0];
        const data = children.find((child) => child.id === childId);
        if (data) {
            const HTMLElement = makeElement('yaf-member', null, null, { data, idPrefix: '' });
            HTMLElement.id = 'constructor';
            return HTMLElement;
        }
        else {
            errorHandlers.notFound(`Could not find reflection id: ${childId} in group ${constructorGroup.title}`);
        }
    },
    linkGroup: (group, children) => {
        const serialisedChildren = _a.serialiseLinkGroup(group, children);
        return makeElement('yaf-member-group-link', null, null, {
            title: group.title,
            children: serialisedChildren,
        });
    },
    reflectionGroup: (group, children, pageId) => {
        const serialisedGroup = YafMember.serialiseReflectionGroup(group, children);
        return makeElement('yaf-member-group-reflection', null, null, {
            title: group.title,
            children: serialisedGroup.children,
            pageId,
        });
    },
};
YafContentMembers.serialiseLinkGroup = (group, children) => {
    var _b;
    return ((_b = group.children) === null || _b === void 0 ? void 0 : _b.map((id) => {
        const child = children.find((child) => child.id == id) ||
            appState.reflectionMap[id];
        const childClone = Object.assign({}, child);
        childClone.id = id;
        return childClone;
    }).filter((child) => !!child)) || [];
};
const yafContentMembers = 'yaf-content-members';
customElements.define(yafContentMembers, YafContentMembers);
//# sourceMappingURL=YafContentMembers.js.map