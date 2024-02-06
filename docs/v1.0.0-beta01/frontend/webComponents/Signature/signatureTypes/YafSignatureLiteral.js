import { needsParenthesis, makeElement, makeSymbolSpan, stringify, } from '../../../yafElement.js';
import { YafHTMLElement } from '../../../index.js';
export class YafContentSignatureLiteral extends YafHTMLElement {
    onConnect() {
        const { value } = this.props;
        const HTMLElements = [makeElement('span', null, stringify(value))];
        if (needsParenthesis(this)) {
            HTMLElements.unshift(makeSymbolSpan('('));
            HTMLElements.push(makeSymbolSpan(')'));
        }
        this.appendChildren(HTMLElements.flat());
    }
}
const componentName = 'yaf-signature-literal';
customElements.define(componentName, YafContentSignatureLiteral);
//# sourceMappingURL=YafSignatureLiteral.js.map