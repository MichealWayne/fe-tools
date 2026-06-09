import { YafHTMLElement } from '../../../index.js';
import { makeSymbolSpan, makeTypeSpan, renderSignatureType, } from '../../../yafElement.js';
export class YafSignatureInferred extends YafHTMLElement {
    onConnect() {
        const { name, constraint } = this.props;
        const HTMLElements = [
            makeSymbolSpan('infer '),
            makeTypeSpan(name),
        ];
        if (constraint) {
            HTMLElements.push([
                makeSymbolSpan(' extends '),
                renderSignatureType(constraint, 'inferredConstraint'),
            ]);
        }
        this.appendChildren(HTMLElements.flat());
    }
}
const yafSignatureinferred = 'yaf-signature-inferred';
customElements.define(yafSignatureinferred, YafSignatureInferred);
//# sourceMappingURL=YafSignatureInferred.js.map