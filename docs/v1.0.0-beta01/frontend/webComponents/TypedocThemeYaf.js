import { getHtmlTemplate } from '../yafElement.js';
import appState from '../handlers/AppState.js';
import { YafHTMLElement } from '../index.js';
import { events } from '../handlers/index.js';
const { trigger } = events;
/**
 * This is the highest level component of the theme, parent container to all other custom theme elements
 */
export class TypedocThemeYaf extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.setTitle = () => {
            const titleHTMLElement = document.querySelector('title');
            titleHTMLElement.innerText = appState.projectName;
        };
        this.initVersions = () => {
            const versionHTMLElement = document.getElementById('plugin-versions-select');
            const footerHTMLElement = document.querySelector('yaf-navigation-footer');
            footerHTMLElement === null || footerHTMLElement === void 0 ? void 0 : footerHTMLElement.appendChild(versionHTMLElement);
            document.querySelector('body').classList.remove('init');
        };
        this.toggleMenu = ({ detail, }) => {
            const { state } = detail;
            if (state === 'close' || this.classList.contains('menuOpen')) {
                this.classList.remove('menuOpen');
            }
            else {
                this.classList.add('menuOpen');
            }
        };
        this.events = [[trigger.menu.toggle, this.toggleMenu]];
    }
    onConnect() {
        appState
            .initCache()
            .then(this.setTitle)
            .then(() => this.appendChild(getHtmlTemplate(typedocThemeYaf)))
            .then(this.initVersions);
        this.events.forEach((event) => events.on(...event));
    }
    disconnectedCallback() {
        this.events.forEach((event) => events.off(...event));
    }
}
const typedocThemeYaf = 'typedoc-theme-yaf';
customElements.define(typedocThemeYaf, TypedocThemeYaf);
//# sourceMappingURL=TypedocThemeYaf.js.map