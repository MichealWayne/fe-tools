var _a;
import appState from '../../../handlers/AppState.js';
import { makeLinkElement, makeElement, makeTypeSpan, } from '../../../yafElement.js';
import { YafHTMLElement } from '../../../index.js';
/**
 *
 */
export class YafSignatureReference extends YafHTMLElement {
    onConnect() {
        const { externalUrl, id, name: typeName, typeArguments } = this.props;
        const { factory } = YafSignatureReference;
        const fileLink = id ? appState.reflectionMap[id] : undefined;
        const fileLinkName = fileLink ? fileLink.query : undefined;
        const typeHTMLElement = externalUrl
            ? factory.externalUrl(externalUrl, typeName)
            : fileLinkName
                ? factory.fileLinkName(fileLinkName, typeName)
                : makeTypeSpan(typeName);
        const HTMLElements = [
            typeHTMLElement,
            factory.typeArguments(typeArguments),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
_a = YafSignatureReference;
YafSignatureReference.factory = {
    renderTypeArguments: (args) => makeElement('yaf-type-arguments', null, null, {
        args,
        context: 'referenceTypeArgument',
    }),
    externalUrl: (externalUrl, typeName) => {
        const linkHTMLElement = makeLinkElement(externalUrl);
        linkHTMLElement.setAttribute('target', '_blank');
        linkHTMLElement.appendChild(makeTypeSpan(typeName));
        return linkHTMLElement;
    },
    fileLinkName: (fileLinkName, typeName) => {
        const linkHTMLElement = makeLinkElement(`?page=${fileLinkName}`);
        linkHTMLElement.appendChild(makeTypeSpan(typeName));
        return linkHTMLElement;
    },
    typeArguments: (typeArguments) => typeArguments && typeArguments.length
        ? _a.factory.renderTypeArguments(typeArguments)
        : undefined,
};
const componentName = 'yaf-signature-reference';
customElements.define(componentName, YafSignatureReference);
//# sourceMappingURL=YafSignatureReference.js.map