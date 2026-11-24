import { YafMember, YafMemberGroupReflection, } from './index.js';
import { makeElement } from '../../yafElement.js';
import { YafHTMLElement } from '../../index.js';
/**
 *
 */
export class YafMemberDeclaration extends YafHTMLElement {
    onConnect() {
        var _a, _b;
        const { type, id } = this.props.data;
        const { idPrefix } = this.props;
        const { factory } = YafMemberDeclaration;
        const isReflection = (type === null || type === void 0 ? void 0 : type.type) === 'reflection';
        const isReflectionSignature = isReflection && !!((_a = type.declaration) === null || _a === void 0 ? void 0 : _a.signatures);
        const isReflectionGroup = isReflection && !!((_b = type.declaration) === null || _b === void 0 ? void 0 : _b.groups);
        const HTMLElements = [
            !isReflectionSignature
                ? factory.memberSignatures(this.props.data)
                : undefined,
            isReflectionGroup
                ? factory.memberGroups(type, id, idPrefix)
                : undefined,
            isReflectionSignature ? factory.memberSignatures(type) : undefined,
        ]
            .filter((element) => !!element)
            .flat();
        this.appendChildren(HTMLElements);
        YafMemberGroupReflection.renderDrawersFromRoot(this);
    }
}
YafMemberDeclaration.factory = {
    memberGroups: (type, parentId, idPrefix) => {
        var _a;
        if (!type.declaration ||
            !type.declaration.children ||
            !((_a = type.declaration.children) === null || _a === void 0 ? void 0 : _a.length))
            return undefined;
        const { groups, children, id } = type.declaration;
        const serialisedGroups = groups === null || groups === void 0 ? void 0 : groups.map((group) => YafMember.serialiseReflectionGroup(group, children || []));
        return ((serialisedGroups === null || serialisedGroups === void 0 ? void 0 : serialisedGroups.map((group) => {
            return makeElement('yaf-member-group-reflection', null, null, {
                title: group.title,
                children: group.children,
                pageId: String(id),
                nested: true,
                idPrefix,
            });
        })) || undefined);
    },
    memberSignatures: (member) => {
        const declaration = member.declaration;
        const signatures = declaration
            ? declaration.signatures
            : undefined;
        return makeElement('yaf-member-signatures', null, null, signatures || [member]);
    },
};
const yafMemberDeclaration = 'yaf-member-declaration';
customElements.define(yafMemberDeclaration, YafMemberDeclaration);
//# sourceMappingURL=YafMemberDeclaration.js.map