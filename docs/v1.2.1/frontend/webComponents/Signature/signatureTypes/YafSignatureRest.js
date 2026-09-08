import { YafHTMLElement } from '../../../index.js';
import { makeSymbolSpan, renderSignatureType } from '../../../yafElement.js';
export class YafSignatureRest extends YafHTMLElement {
    onConnect() {
        const { elementType } = this.props;
        const HTMLElements = [
            makeSymbolSpan('...'),
            renderSignatureType(elementType, 'restElement'),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
const yafSignatureRest = 'yaf-signature-rest';
customElements.define(yafSignatureRest, YafSignatureRest);
//# sourceMappingURL=YafSignatureRest.js.map