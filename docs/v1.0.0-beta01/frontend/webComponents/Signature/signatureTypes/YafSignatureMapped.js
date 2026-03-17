import { YafHTMLElement } from '../../../index.js';
import { makeSymbolSpan, makeTypeSpan, renderSignatureType, } from '../../../yafElement.js';
export class YafSignatureMapped extends YafHTMLElement {
    onConnect() {
        const { parameter, parameterType, templateType, nameType, optionalModifier, readonlyModifier, } = this.props;
        const { factory } = YafSignatureMapped;
        const readonlyModifierHTMLElement = factory.readonlyModifier(readonlyModifier);
        const nameTypeHTMLElements = factory.nameType(nameType);
        const HTMLElements = [
            makeSymbolSpan('{'),
            readonlyModifierHTMLElement,
            makeSymbolSpan('['),
            makeTypeSpan(parameter),
            makeSymbolSpan(' in '),
            renderSignatureType(parameterType, 'mappedParameter'),
            nameTypeHTMLElements,
            makeSymbolSpan(']'),
            makeSymbolSpan(factory.colon(optionalModifier)),
            renderSignatureType(templateType, 'mappedTemplate'),
            makeSymbolSpan('}'),
        ];
        this.appendChildren(HTMLElements.flat());
    }
}
YafSignatureMapped.factory = {
    readonlyModifier: (readonlyModifier) => readonlyModifier
        ? makeSymbolSpan(readonlyModifier === '+' ? 'readonly ' : '-readonly ')
        : undefined,
    nameType: (nameType) => nameType
        ? [
            makeSymbolSpan(' as '),
            renderSignatureType(nameType, 'mappedName'),
        ]
        : undefined,
    colon: (optionalModifier) => {
        let colon = ': ';
        if (optionalModifier)
            colon = optionalModifier === '+' ? '?: ' : '-?: ';
        return colon;
    },
};
const yafSignatureMapped = 'yaf-signature-mapped';
customElements.define(yafSignatureMapped, YafSignatureMapped);
//# sourceMappingURL=YafSignatureMapped.js.map