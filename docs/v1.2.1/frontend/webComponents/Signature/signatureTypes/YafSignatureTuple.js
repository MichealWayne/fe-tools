import { makeSymbolSpan, renderSignatureType } from '../../../yafElement.js';
import { YafHTMLElement } from '../../../index.js';
export class YafSignatureTuple extends YafHTMLElement {
    onConnect() {
        const { elements: tupleTypes } = this.props;
        const { factory } = YafSignatureTuple;
        const HTMLElements = [
            makeSymbolSpan('['),
            factory.tupleTypes(tupleTypes),
            makeSymbolSpan(']'),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
YafSignatureTuple.factory = {
    tupleTypes: (tupleTypes) => tupleTypes === null || tupleTypes === void 0 ? void 0 : tupleTypes.map((type, i) => [
        renderSignatureType(type, 'tupleElement'),
        i < tupleTypes.length - 1
            ? makeSymbolSpan(', ')
            : undefined,
    ]).flat(),
};
const yafSignatureTuple = 'yaf-signature-tuple';
customElements.define(yafSignatureTuple, YafSignatureTuple);
//# sourceMappingURL=YafSignatureTuple.js.map