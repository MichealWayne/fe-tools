import { YafHTMLElement } from '../../../index.js';
import appState from '../../../handlers/AppState.js';
import { renderSignatureType, makeLinkElement, makeSymbolSpan, } from '../../../yafElement.js';
export class YafSignatureIndexedAccess extends YafHTMLElement {
    onConnect() {
        const { indexType, objectType } = this.props;
        const { factory } = YafSignatureIndexedAccess;
        const referenceId = objectType.id;
        const linkTheSignature = !!referenceId && objectType.type !== 'reference';
        const indexTypeHTMLElement = renderSignatureType(indexType, 'indexedIndex');
        const indexSignatureHTMLElement = linkTheSignature
            ? factory.wrapSignatureInLink(String(referenceId), indexTypeHTMLElement)
            : indexTypeHTMLElement;
        const HTMLElements = [
            renderSignatureType(objectType, 'indexedObject'),
            makeSymbolSpan('['),
            indexSignatureHTMLElement,
            makeSymbolSpan(']'),
        ];
        this.appendChildren(HTMLElements);
    }
}
YafSignatureIndexedAccess.factory = {
    wrapSignatureInLink: (referenceId, indexTypeElement) => {
        const linkElement = makeLinkElement(`?page=${appState.reflectionMap[referenceId].query}`);
        linkElement.appendChild(indexTypeElement);
        return linkElement;
    },
};
const yafSignatureIndexedAccess = 'yaf-signature-indexed-access';
customElements.define(yafSignatureIndexedAccess, YafSignatureIndexedAccess);
//# sourceMappingURL=YafSignatureIndexedAccess.js.map