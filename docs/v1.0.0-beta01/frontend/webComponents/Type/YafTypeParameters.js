import { YafHTMLElement } from '../../index.js';
import { makeElement, makeSymbolSpan } from '../../yafElement.js';
export class YafTypeParameters extends YafHTMLElement {
    onConnect() {
        const { factory } = YafTypeParameters;
        const HTMLElements = [
            makeSymbolSpan('<'),
            factory.mapParams(factory.makeParams(this.props)),
            makeSymbolSpan('>'),
        ].flat();
        this.appendChildren(HTMLElements);
    }
}
YafTypeParameters.factory = {
    makeParams: (params) => (params || []).flatMap((param) => {
        const span = makeElement('span', `type ${param.kindString ? ` ${param.kindString}` : ''}`, param.name);
        return param.varianceModifier
            ? [
                makeElement('span', 'modifier', `${param.varianceModifier}`),
                span,
            ]
            : span;
    }),
    mapParams: (params) => params
        .map((param, i) => {
        if (i >= params.length - 1)
            return param;
        return [param, makeSymbolSpan(',')];
    })
        .flat(),
};
const yafTypeParameters = 'yaf-type-parameters';
customElements.define(yafTypeParameters, YafTypeParameters);
//# sourceMappingURL=YafTypeParameters.js.map