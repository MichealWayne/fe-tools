import appState from '../../handlers/AppState.js';
import { makeFlags, makeElement } from '../../yafElement.js';
import { YafHTMLElement } from '../../index.js';
export class YafMemberSignatures extends YafHTMLElement {
    onConnect() {
        this.props.forEach((signature) => {
            const { flags, comment } = signature;
            const { factory } = YafMemberSignatures;
            const flagsHTMLElement = this.props.length > 1 ? makeFlags(flags, comment) : undefined;
            const titleHTMLElement = factory.signatureTitle(signature);
            const bodyHTMLElement = factory.signatureBody(signature);
            this.appendChildren([
                flagsHTMLElement,
                titleHTMLElement,
                bodyHTMLElement,
            ]);
        });
    }
}
YafMemberSignatures.factory = {
    signatureTitle: (signature) => makeElement('yaf-signature-title', null, null, Object.assign(Object.assign({}, signature), { hideName: false, arrowStyle: signature.kind ===
            appState.reflectionKind.CallSignature, wrappedInPre: true })),
    signatureBody: (signature) => makeElement('yaf-signature-body', null, null, signature),
};
const yafMemberSignatures = 'yaf-member-signatures';
customElements.define(yafMemberSignatures, YafMemberSignatures);
//# sourceMappingURL=YafMemberSignatures.js.map