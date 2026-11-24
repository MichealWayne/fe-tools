import { YafHTMLElement } from '../../index.js';
import router from '../../handlers/Router.js';
import { makeElement } from '../../yafElement.js';
import appState from '../../handlers/AppState.js';
import { events } from '../../handlers/index.js';
export class YafNavigationLink extends YafHTMLElement {
    onConnect() {
        this.aHTMLElement = makeElement('a');
        this.classList.forEach((className) => {
            this.aHTMLElement.classList.add(className);
            this.classList.remove(className);
        });
        const Href = this.getAttribute('href');
        if (Href === '/')
            this.setAttribute('href', router.baseUrl);
        if (Href === null || Href === void 0 ? void 0 : Href.startsWith('#'))
            this.setAttribute('href', window.location.search + Href);
        let targetURL = router.getTargetURL(this);
        if (!isNaN(Number(Href))) {
            const reflectionLink = appState.reflectionMap[Href];
            if (!reflectionLink)
                return;
            const { query, hash } = reflectionLink;
            this.setAttribute('href', hash ? `?page=${query}#${hash}` : `?page=${query}`);
            targetURL = router.getTargetURL(this);
        }
        if (targetURL.origin !== window.location.origin) {
            this.setAttribute('target', '_blank');
        }
        this.setAttribute('href', encodeURI(targetURL.href));
        this.getAttributeNames().forEach((name) => {
            const value = this.getAttribute(name);
            if (value) {
                this.aHTMLElement.setAttribute(name, value);
            }
        });
        this.aHTMLElement.replaceChildren(...[...this.childNodes]);
        this.replaceChildren(this.aHTMLElement);
        events.on('click', (e) => router.route(this, e), this.aHTMLElement);
    }
    disconnectedCallback() {
        events.off('click', (e) => router.route(this, e), this.aHTMLElement);
    }
}
const yafNavigationLink = 'yaf-navigation-link';
customElements.define(yafNavigationLink, YafNavigationLink);
//# sourceMappingURL=YafNavigationLink.js.map