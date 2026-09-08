import { YafHTMLElement } from '../../index.js';
import { makeSymbolSpan, makeElement } from '../../yafElement.js';
export class YafTypeArguments extends YafHTMLElement {
    onConnect() {
        const { args } = this.props;
        const { factory } = YafTypeArguments;
        if (!args || !args.length)
            return;
        const HTMLElements = [
            makeSymbolSpan('<'),
            factory.mapArguments(args),
            makeSymbolSpan('>'),
        ].flat();
        this.appendChildren(HTMLElements);
    }
}
YafTypeArguments.factory = {
    mapArguments: (args = []) => args
        .map((argument, i) => {
        const signature = makeElement('yaf-signature', null, null, {
            type: argument,
            context: 'referenceTypeArgument',
        });
        if (i >= args.length - 1)
            return signature;
        return [signature, makeSymbolSpan(', ')];
    })
        .flat(),
};
const yafTypeArguments = 'yaf-type-arguments';
customElements.define(yafTypeArguments, YafTypeArguments);
//# sourceMappingURL=YafTypeArguments.js.map