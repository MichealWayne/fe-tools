import appState from '../../handlers/AppState.js';
import { makeSymbolSpan, makeTitleSpan, makeElement, makeParameterSpan, makeValueSpan, renderSignatureType, stringify, } from '../../yafElement.js';
import { YafSignature } from './YafSignature.js';
import { YafHTMLElement } from '../../index.js';
export class YafSignatureTitle extends YafHTMLElement {
    onConnect() {
        const { name, kind, flags, typeParameter, parameters, type, hideName, arrowStyle, defaultValue, wrappedInPre, } = this.props;
        const { factory } = YafSignatureTitle;
        const isConstructorSignature = kind === appState.reflectionKind.ConstructorSignature;
        const isCallSignature = YafSignature.isCallSignature(kind);
        const HTMLElements = [];
        const preHTMLElement = wrappedInPre
            ? makeElement('pre', 'highlight scroller horizontal pre')
            : undefined;
        if (!hideName) {
            HTMLElements.push(factory.name(name));
        }
        else if (isConstructorSignature) {
            HTMLElements.push(factory.constructor(flags));
        }
        HTMLElements.push([
            factory.typeParameter(typeParameter),
            isCallSignature ? makeSymbolSpan('(') : undefined,
        ]);
        const parameterWrapperHTMLElements = parameters === null || parameters === void 0 ? void 0 : parameters.map((parameter, i) => {
            const isRest = parameter.flags.isRest;
            const isOptional = parameter.flags.isOptional;
            const defaultValue = parameter.defaultValue;
            const parameterWrapperHTMLElement = makeElement('span', 'wrapper');
            const paramterHTMLElements = [
                isRest ? makeSymbolSpan('...') : undefined,
                makeParameterSpan(parameter.name),
                isOptional ? makeSymbolSpan('?') : undefined,
                defaultValue ? makeSymbolSpan('?') : undefined,
                makeSymbolSpan(':'),
                renderSignatureType(parameter.type, 'none'),
                i < parameters.length - 1 ? makeSymbolSpan(', ') : undefined,
            ];
            parameterWrapperHTMLElement.appendChildren(paramterHTMLElements);
            return parameterWrapperHTMLElement;
        });
        HTMLElements.push(parameterWrapperHTMLElements);
        if (isCallSignature)
            HTMLElements.push(makeSymbolSpan(')'));
        if (type) {
            HTMLElements.push([
                makeSymbolSpan(`${arrowStyle ? ' => ' : ': '}`),
                renderSignatureType(type, 'none'),
                factory.defaultValue(defaultValue),
            ].flat());
        }
        preHTMLElement
            ? preHTMLElement.appendChildren(HTMLElements.flat())
            : this.appendChildren(HTMLElements.flat());
        if (preHTMLElement)
            this.appendChild(preHTMLElement);
    }
}
YafSignatureTitle.factory = {
    name: (name) => {
        const nameParts = name.split(' ');
        const signatureName = nameParts.pop();
        const signatureNameConstructor = nameParts.join(' ');
        return [
            signatureNameConstructor.length
                ? makeSymbolSpan(`${signatureNameConstructor} `)
                : undefined,
            makeTitleSpan(signatureName),
        ];
    },
    constructor: (flags) => makeSymbolSpan(`${flags.isAbstract ? 'abstract new ' : 'new '}`),
    typeParameter: (typeParameter) => typeParameter
        ? makeElement('yaf-type-parameters', null, null, typeParameter)
        : undefined,
    defaultValue: (defaultValue) => defaultValue
        ? [
            makeSymbolSpan(' = '),
            makeValueSpan(stringify(defaultValue)),
        ]
        : undefined,
};
const yafSignatureTitle = 'yaf-signature-title';
customElements.define(yafSignatureTitle, YafSignatureTitle);
//# sourceMappingURL=YafSignatureTitle.js.map