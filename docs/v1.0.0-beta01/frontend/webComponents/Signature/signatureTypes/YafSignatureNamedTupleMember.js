import { makeNameSpan, makeSymbolSpan, renderSignatureType, } from '../../../yafElement.js';
import { YafHTMLElement } from '../../../index.js';
export class YafSignatureNamedTupleMember extends YafHTMLElement {
    onConnect() {
        const { name, isOptional, element } = this.props;
        const HTMLElements = [
            makeNameSpan(name),
            makeSymbolSpan(isOptional ? '?:' : ':'),
            renderSignatureType(element, 'tupleElement'),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
const yafSignatureNamedTupleMember = 'yaf-signature-named-tuple-member';
customElements.define(yafSignatureNamedTupleMember, YafSignatureNamedTupleMember);
//# sourceMappingURL=YafSignatureNamedTupleMember.js.map