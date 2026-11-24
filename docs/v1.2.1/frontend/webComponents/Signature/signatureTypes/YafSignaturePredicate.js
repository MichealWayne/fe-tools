import { YafHTMLElement } from '../../../index.js';
import { makeSymbolSpan, makeNameSpan, renderSignatureType, } from '../../../yafElement.js';
export class YafSignaturePredicate extends YafHTMLElement {
    onConnect() {
        const { name, asserts, targetType } = this.props;
        const { factory } = YafSignaturePredicate;
        const HTMLElements = [
            factory.asserts(asserts),
            makeNameSpan(name),
            factory.targetType(targetType),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
YafSignaturePredicate.factory = {
    asserts: (asserts) => asserts ? makeSymbolSpan('asserts ') : undefined,
    targetType: (targetType) => targetType
        ? [
            makeSymbolSpan(' is '),
            renderSignatureType(targetType, 'predicateTarget'),
        ]
        : undefined,
};
const yafSignaturePredicate = 'yaf-signature-predicate';
customElements.define(yafSignaturePredicate, YafSignaturePredicate);
//# sourceMappingURL=YafSignaturePredicate.js.map