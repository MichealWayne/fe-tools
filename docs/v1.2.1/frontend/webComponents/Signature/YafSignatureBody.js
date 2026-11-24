var _a;
import { YafSignature, } from './index.js';
import { makeElement, makeLinkElement, renderSignatureType, } from '../../yafElement.js';
import { YafHTMLElement } from '../../index.js';
import appState from '../../handlers/AppState.js';
export class YafSignatureBody extends YafHTMLElement {
    onConnect() {
        const { text, typeParameter, parameters, type, kind, inheritedFrom, overwrites, implementationOf, } = this.props;
        const { factory } = YafSignatureBody;
        const isCallSignature = YafSignature.isCallSignature(kind);
        const HTMLElements = [
            factory.textComment(text),
            factory.sources(this.props),
            factory.typeParameters(typeParameter),
            factory.parameters(parameters),
            factory.modifier(implementationOf, 'Implementation of:'),
            factory.modifier(inheritedFrom, 'Inherited from:'),
            factory.modifier(overwrites, 'Overrides:'),
            factory.returns(type, isCallSignature),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
_a = YafSignatureBody;
YafSignatureBody.factory = {
    makeElement: (element, props) => makeElement(element, null, null, props),
    textComment: (text) => (text === null || text === void 0 ? void 0 : text.comment)
        ? _a.factory.makeElement('yaf-content-marked', text.comment)
        : undefined,
    typeParameters: (typeParameter) => typeParameter && typeParameter.length
        ? _a.factory.makeElement('yaf-signature-parameters-type', typeParameter)
        : undefined,
    parameters: (parameters) => parameters && parameters.length
        ? _a.factory.makeElement('yaf-signature-parameters', parameters)
        : undefined,
    sources: (reflection) => {
        var _b;
        if (!((_b = reflection.sources) === null || _b === void 0 ? void 0 : _b.length))
            return undefined;
        return _a.factory.makeElement('yaf-member-sources', reflection);
    },
    returns: (type, isCallSignature) => {
        if (!(type && isCallSignature))
            return undefined;
        const ulHTMLElement = makeElement('ul', 'references');
        const liHTMLElement = makeElement('li');
        liHTMLElement.appendChild(renderSignatureType(type, 'none'));
        ulHTMLElement.appendChild(liHTMLElement);
        return [makeElement('h5', null, 'Returns:'), ulHTMLElement];
    },
    modifier: (modifierData, modifierHeading) => {
        if (!modifierData)
            return undefined;
        let data;
        if (modifierData.id) {
            const reflection = appState.reflectionMap[modifierData.id];
            let name = reflection.name.split(' ').pop();
            const refName = reflection.query.split('.').pop();
            const isConstructor = name === refName;
            name = isConstructor
                ? `${refName}.constructor`
                : `${refName}.${name}`;
            data = {
                name,
                link: isConstructor
                    ? `?page=${reflection.query}#constructor`
                    : `?page=${reflection.query}#${name}`,
            };
        }
        else {
            data = { name: modifierData.name, link: null };
        }
        const headingEHTMLElement = makeElement('h5', null, modifierHeading);
        const ulHTMLElement = makeElement('ul', 'references');
        const liHTMLElement = makeElement('li', null, data.link ? '' : data.name);
        if (data.link)
            liHTMLElement.appendChild(makeLinkElement(data.link, undefined, data.name));
        ulHTMLElement.appendChild(liHTMLElement);
        return [headingEHTMLElement, ulHTMLElement];
    },
};
const yafSignatureBody = 'yaf-signature-body';
customElements.define(yafSignatureBody, YafSignatureBody);
//# sourceMappingURL=YafSignatureBody.js.map