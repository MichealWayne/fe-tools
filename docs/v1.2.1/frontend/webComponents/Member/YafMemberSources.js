import { YafHTMLElement } from '../../index.js';
import { makeElement, makeLinkElement } from '../../yafElement.js';
export class YafMemberSources extends YafHTMLElement {
    onConnect() {
        const { sources } = this.props;
        const headerHTMLElement = makeElement('h5', null, 'Defined in:');
        const ulHTMLElement = makeElement('ul', 'references');
        const sourcelistHTMLElements = sources === null || sources === void 0 ? void 0 : sources.map((source) => {
            const { fileName, line, url } = source;
            const liHTMLElement = makeElement('li');
            url
                ? liHTMLElement.appendChild(makeLinkElement(url, undefined, `${fileName}:${line}`))
                : (liHTMLElement.innerText = `${fileName}:${line}`);
            return liHTMLElement;
        });
        ulHTMLElement.appendChildren(sourcelistHTMLElements);
        this.appendChildren([headerHTMLElement, ulHTMLElement]);
    }
}
const yafMemberSources = 'yaf-member-sources';
customElements.define(yafMemberSources, YafMemberSources);
//# sourceMappingURL=YafMemberSources.js.map