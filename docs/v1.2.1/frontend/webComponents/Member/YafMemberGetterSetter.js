import { makeElement, makeSymbolSpan, makeNameSpan } from '../../yafElement.js';
import { YafHTMLElement } from '../../index.js';
export class YafMemberGetterSetter extends YafHTMLElement {
    onConnect() {
        const { getSignature, setSignature } = this.props;
        const { factory } = YafMemberGetterSetter;
        if (getSignature) {
            this.appendChildren([
                factory.makeSignature('get', getSignature),
                factory.makeBody(getSignature),
            ]);
        }
        if (setSignature) {
            this.appendChildren([
                factory.makeSignature('set', setSignature),
                factory.makeBody(setSignature),
            ]);
        }
        if (this.props.sources)
            this.appendChild(factory.makeBody({
                sources: this.props.sources,
            }));
    }
}
YafMemberGetterSetter.factory = {
    makeSignature: (prefix, data) => {
        const title = makeElement('yaf-signature-title', null, null, Object.assign(Object.assign({}, data), { hideName: true }));
        const preHTMLElement = makeElement('pre', 'highlight');
        preHTMLElement.appendChildren([
            makeSymbolSpan(`${prefix} `),
            makeNameSpan(data.name),
            title,
        ]);
        return preHTMLElement;
    },
    makeBody: (data) => makeElement('yaf-signature-body', null, null, data),
};
const yafMemberGetterSetter = 'yaf-member-getter-setter';
customElements.define(yafMemberGetterSetter, YafMemberGetterSetter);
//# sourceMappingURL=YafMemberGetterSetter.js.map