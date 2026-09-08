import { YafHTMLElement } from '../../../index.js';
import { makeSymbolSpan, renderSignatureType } from '../../../yafElement.js';
export class YafSignatureTypeOperator extends YafHTMLElement {
    onConnect() {
        const { operator, target } = this.props;
        const HTMLElements = [
            makeSymbolSpan(`${operator} `),
            renderSignatureType(target, 'typeOperatorTarget'),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
const yafSignatureTypeOperator = 'yaf-signature-type-operator';
customElements.define(yafSignatureTypeOperator, YafSignatureTypeOperator);
//# sourceMappingURL=YafSignatureTypeOperator.js.map