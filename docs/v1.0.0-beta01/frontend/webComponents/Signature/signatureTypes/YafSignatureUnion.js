import { renderSignatureType, makeSymbolSpan } from '../../../yafElement.js';
import { YafHTMLElement } from '../../../index.js';
export class YafSignatureUnion extends YafHTMLElement {
    onConnect() {
        const { types } = this.props;
        const HTMLElements = types.map((type, i) => [
            renderSignatureType(type, 'unionElement'),
            i < types.length - 1 ? makeSymbolSpan(' | ') : undefined,
        ]);
        this.appendChildren(HTMLElements.flat());
    }
}
const componentName = 'yaf-signature-union';
customElements.define(componentName, YafSignatureUnion);
//# sourceMappingURL=YafSignatureUnion.js.map