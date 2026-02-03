import { makeSymbolSpan, makeNameSpan, renderSignatureType, makeElement, } from '../../../yafElement.js';
import { YafHTMLElement } from '../../../index.js';
/**
 *
 */
export class YafSignatureReflection extends YafHTMLElement {
    onConnect() {
        var _a, _b, _c;
        const { declaration } = this.props;
        const { factory } = YafSignatureReflection;
        const HTMLElementGroups = [];
        let i = 0;
        for (const child of (declaration === null || declaration === void 0 ? void 0 : declaration.children) || []) {
            if (child.getSignature && child.setSignature) {
                HTMLElementGroups.push(factory.getAndSetSignatures(child));
                continue;
            }
            if (child.getSignature) {
                HTMLElementGroups.push(factory.getSignature(child));
                continue;
            }
            if (child.setSignature) {
                HTMLElementGroups.push(factory.setSignature(child));
                continue;
            }
            if (child.signatures) {
                HTMLElementGroups.push(factory.signatures(child, i));
                continue;
            }
            HTMLElementGroups.push([
                makeNameSpan(!i ? child.name : `\n${child.name}`),
                makeSymbolSpan(child.flags.isOptional ? '?: ' : ': '),
                renderSignatureType(child.type, 'none'),
            ]);
            i++;
        }
        if (declaration === null || declaration === void 0 ? void 0 : declaration.indexSignature) {
            const index = declaration.indexSignature;
            HTMLElementGroups.push([
                makeSymbolSpan('['),
                makeNameSpan(index.parameters[0].name),
                makeSymbolSpan(':'),
                renderSignatureType(index.parameters[0].type, 'none'),
                makeSymbolSpan(']'),
                makeSymbolSpan(':'),
                renderSignatureType(index.type, 'none'),
            ]);
        }
        if (!HTMLElementGroups.length &&
            ((_a = declaration === null || declaration === void 0 ? void 0 : declaration.signatures) === null || _a === void 0 ? void 0 : _a.length) === 1) {
            return this.appendChild(factory.signatureTitle(declaration));
        }
        if (declaration)
            HTMLElementGroups.push(factory.declarationSignatures(declaration).flat());
        if (HTMLElementGroups.length) {
            const openBrace = makeSymbolSpan('{ ');
            const closeBrace = makeSymbolSpan('}');
            this.classList.add('block');
            (_b = this.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(openBrace, this);
            HTMLElementGroups.forEach((elements) => {
                const HTMLElements = factory.mapElementGroups(elements, this.tagName);
                this.appendChildren(HTMLElements.flat());
            });
            (_c = this.parentElement) === null || _c === void 0 ? void 0 : _c.insertBefore(closeBrace, this.nextSibling);
        }
    }
}
YafSignatureReflection.factory = {
    mapElementGroups: (elements, tagName) => elements.map((element, i) => {
        const hasSemicolon = i === elements.length - 1 && element.tagName !== tagName;
        return [
            element,
            hasSemicolon ? makeSymbolSpan('; ') : undefined,
        ];
    }),
    declarationSignatures: (declaration) => {
        var _a;
        return ((_a = declaration === null || declaration === void 0 ? void 0 : declaration.signatures) === null || _a === void 0 ? void 0 : _a.map((signature) => [
            makeElement('yaf-signature-title', null, null, Object.assign(Object.assign({}, signature), { hideName: true })),
        ])) || [];
    },
    signatureTitle: (declaration) => makeElement('yaf-signature-title', null, null, Object.assign(Object.assign({}, declaration.signatures[0]), { hideName: true, arrowStyle: true })),
    getAndSetSignatures: (child) => [
        makeNameSpan(child.name),
        makeSymbolSpan(': '),
        renderSignatureType(child.getSignature.type, 'none'),
    ],
    getSignature: (child) => [
        makeSymbolSpan('get '),
        makeNameSpan(child.name),
        makeSymbolSpan('(): '),
        renderSignatureType(child.getSignature.type, 'none'),
    ],
    setSignature: (child) => {
        var _a;
        const HTMLElements = [
            makeSymbolSpan('set '),
            makeNameSpan(child.name),
            makeSymbolSpan('('),
        ];
        (_a = child.setSignature.parameters) === null || _a === void 0 ? void 0 : _a.forEach((parameter) => {
            HTMLElements.push(makeNameSpan(parameter.name));
            HTMLElements.push(renderSignatureType(parameter.type, 'none'));
        });
        HTMLElements.push(makeSymbolSpan(')'));
        return HTMLElements;
    },
    signatures: (child, i) => {
        return child.signatures
            .map((signature) => {
            return [
                makeNameSpan(!i ? child.name : `\n${child.name}`),
                makeSymbolSpan(child.flags.isOptional ? '?: ' : ': '),
                makeElement('yaf-signature-title', null, null, Object.assign(Object.assign({}, signature), { hideName: true, arrowStyle: false })),
            ];
        })
            .flat();
    },
};
const yafSignatureReflection = 'yaf-signature-reflection';
customElements.define(yafSignatureReflection, YafSignatureReflection);
//# sourceMappingURL=YafSignatureReflection.js.map