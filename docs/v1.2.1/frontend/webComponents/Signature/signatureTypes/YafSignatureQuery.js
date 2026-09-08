import { YafHTMLElement } from '../../../index.js';
import { makeSymbolSpan, renderSignatureType } from '../../../yafElement.js';
export class YafSignatureQuery extends YafHTMLElement {
    onConnect() {
        const { queryType } = this.props;
        const HTMLElements = [
            makeSymbolSpan('typeof '),
            renderSignatureType(queryType, 'queryTypeTarget'),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
const yafSignatureQuery = 'yaf-signature-query';
customElements.define(yafSignatureQuery, YafSignatureQuery);
//# sourceMappingURL=YafSignatureQuery.js.map