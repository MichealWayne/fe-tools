import { YafHTMLElement } from '../../index.js';
import appState from '../../handlers/AppState.js';
import { makeElement, makeNameSpan } from '../../yafElement.js';
/**
 * A factory class that produces Yaf theme HTMLCustomElements for the given props.type and props.context. \
 * The class replaces itself (`this`) in the DOM with the appropriate signature type CustomElement.
 *
 * This class is best used with the helper {@link frontend.yafElement}.renderSignatureType
 *
 */
export class YafSignature extends YafHTMLElement {
    onConnect() {
        var _a;
        const { context, type } = this.props;
        if (!type || type.type === 'unknown')
            return this.appendChild(makeNameSpan(type ? type.name : 'unknown'));
        const parenthesis = appState.needsParenthesis[type.type][context];
        const typeSignature = makeElement(`yaf-signature-${YafSignature.parseTypeName(type.type)}`);
        typeSignature.props = type;
        if (parenthesis)
            typeSignature.setAttribute('needsParenthesis', '');
        (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(typeSignature, this);
    }
}
/**
 * Transforms a TypeDoc camelCased "type name" string into a hyphen separated lowercase string
 *
 * @param name
 * @returns
 */
YafSignature.parseTypeName = (name) => name.replace(/[A-Z]/g, (s) => `-${s.toLowerCase()}`);
YafSignature.isCallSignature = (kind) => {
    return appState.callTypes.includes(kind);
};
const yafSignature = 'yaf-signature';
customElements.define(yafSignature, YafSignature);
//# sourceMappingURL=YafSignature.js.map