import { makeFlags, makeElement, makeLinkElement } from '../../yafElement.js';
import appState from '../../handlers/AppState.js';
import errorHandlers from '../../handlers/ErrorHandlers.js';
import { YafHTMLElement } from '../../index.js';
import { events } from '../../handlers/index.js';
const { action } = events;
export class YafMember extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.focusMember = () => {
            events.dispatch(action.menu.scrollTo(String(this.props.data.id)));
            //events.dispatch(action.content.setLocation());
        };
        this.factory = {
            signatures: (signatures) => makeElement('yaf-member-signatures', null, null, signatures),
            getterOrSetter: () => makeElement('yaf-member-getter-setter', null, null, this.props.data),
            memberDeclaration: (idPrefix) => makeElement('yaf-member-declaration', null, null, { data: this.props.data, idPrefix }),
        };
    }
    onConnect() {
        const { name, kind, signatures, flags, comment, groups, getSignature, setSignature, id, } = this.props.data;
        const { idPrefix } = this.props;
        const { query, hash } = appState.reflectionMap[id];
        let href = `?page=${query}`;
        if (hash)
            href += `#${hash}`;
        const flagsElement = flags ? makeFlags(flags, comment) : undefined;
        const headerElement = makeElement('h3', 'header');
        headerElement.onclick = this.focusMember;
        const linkHTMLElement = makeLinkElement(href, 'name', name);
        //const nameElement = linkHTMLElement.querySelector('a');
        const inner = makeElement('div', 'inner');
        const hasGetterOrSetter = !!getSignature || !!setSignature;
        const isReferenceReflection = kind && appState.reflectionKind[kind] === 'Reference';
        //nameElement!.appendChildren([makeNameSpan(name), makeIconSpan('link')]);
        headerElement.appendChildren([
            linkHTMLElement,
            flagsElement ? flagsElement : undefined,
        ]);
        const memberType = signatures
            ? 'signatures'
            : hasGetterOrSetter
                ? 'getterOrSetter'
                : isReferenceReflection
                    ? 'referenceReflection'
                    : 'memberDeclaration';
        switch (memberType) {
            case 'signatures':
                inner.appendChild(this.factory.signatures(signatures));
                break;
            case 'getterOrSetter':
                inner.appendChild(this.factory.getterOrSetter());
                break;
            case 'referenceReflection':
                console.error('TODO: is this ever hit?', this.props);
                break;
            case 'memberDeclaration':
                inner.appendChild(this.factory.memberDeclaration(idPrefix));
        }
        this.appendChildren([headerElement, inner]);
        if (groups)
            console.warn('TODO', groups);
    }
}
YafMember.serialiseReflectionGroup = (group, children) => {
    var _a;
    if (!group.children)
        return { title: group.title, children: [] };
    const mappedChildren = (_a = group.children) === null || _a === void 0 ? void 0 : _a.map((id) => (children === null || children === void 0 ? void 0 : children.find((child) => child.id === id)) ||
        appState.reflectionMap[id] ||
        id).filter((child) => {
        if (typeof child === 'number')
            errorHandlers.notFound(`Did not find reflection id: ${child}`);
        return !!child;
    });
    return { title: group.title, children: mappedChildren || [] };
};
const yafMember = 'yaf-member';
customElements.define(yafMember, YafMember);
//# sourceMappingURL=YafMember.js.map