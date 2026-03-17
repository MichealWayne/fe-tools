import { YafHTMLElement } from '../../index.js';
import { getHtmlTemplate } from '../../yafElement.js';
import { events } from '../../handlers/index.js';
const { trigger, action } = events;
/**
 *
 */
export class YafChromeLeft extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.toggleSearch = ({ detail, }) => {
            const { searchString } = detail;
            searchString.length >= 3
                ? this.classList.add('activeSearch')
                : this.classList.remove('activeSearch');
        };
        this.eventsList = [
            [trigger.menu.search, this.toggleSearch],
        ];
    }
    onConnect() {
        this.appendChild(getHtmlTemplate(yafChromeLeft));
        this.eventsList.forEach((event) => events.on(...event));
    }
    disconnectedCallback() {
        this.eventsList.forEach((event) => events.off(...event));
    }
}
const yafChromeLeft = 'yaf-chrome-left';
customElements.define(yafChromeLeft, YafChromeLeft);
//# sourceMappingURL=YafChromeLeft.js.map