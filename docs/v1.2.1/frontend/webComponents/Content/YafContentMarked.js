import { YafHTMLElement } from '../../index.js';
import { makeLinkElement } from '../../yafElement.js';
export class YafContentMarked extends YafHTMLElement {
    onConnect() {
        this.classList.add('markdown-body');
        this.innerHTML = this.props || '';
        const HTMLLinks = this.querySelectorAll('a');
        HTMLLinks.forEach((link) => {
            var _a;
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#'))
                return;
            const yafLink = makeLinkElement(href);
            yafLink.innerHTML = link.innerHTML;
            (_a = link.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(yafLink, link);
        });
    }
}
const yafContentMarked = 'yaf-content-marked';
customElements.define(yafContentMarked, YafContentMarked);
//# sourceMappingURL=YafContentMarked.js.map