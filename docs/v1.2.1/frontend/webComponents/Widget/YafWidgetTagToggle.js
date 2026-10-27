import { YafHTMLElement } from '../../index.js';
import appState from '../../handlers/AppState.js';
import { makeElement, flashElementBackground } from '../../yafElement.js';
import { events } from '../../handlers/index.js';
const { action, trigger } = events;
export class YafWidgetTagToggle extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.eventList = [
            [
                trigger.options.display,
                ({ detail }) => {
                    const { key, value } = detail;
                    this.setAttribute(key, value);
                },
            ],
        ];
    }
    static get observedAttributes() {
        return ['inherited', 'private'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (!oldValue || oldValue === newValue)
            return;
        const HTMLElement = this.querySelector(`.${name}`);
        if (HTMLElement === null || HTMLElement === void 0 ? void 0 : HTMLElement.textContent)
            HTMLElement.textContent = HTMLElement.textContent.replace(newValue, oldValue);
    }
    onConnect() {
        const { factory } = YafWidgetTagToggle;
        const { flagCounts } = this.props;
        Object.keys(flagCounts).forEach((flag) => {
            const count = flagCounts[flag];
            if (!count)
                return;
            let display = appState.options.display[flag];
            this.setAttribute(flag, display);
            display = display === 'hide' ? 'show' : 'hide';
            this.appendChild(makeElement('span', flag, `${display} [ ${count} ] ${flag}`)).onclick = (e) => {
                const newState = appState.toggleDisplayOption(flag);
                events.dispatch(action.options.display(flag, newState));
                events.dispatch(action.drawers.resetHeight());
                factory.handleClickAnimations(e);
            };
            this.eventList.forEach((event) => events.on(...event));
        });
    }
    disconnectedCallback() {
        this.eventList.forEach((event) => events.off(...event));
    }
}
YafWidgetTagToggle.factory = {
    handleClickAnimations: (e) => {
        setTimeout(() => {
            const target = e.target;
            const container = getScrollContainer(target);
            container.classList.add('instant');
            container.scrollTop = target.offsetTop;
            container.classList.remove('instant');
            flashElementBackground(e.target);
        });
        function getScrollContainer(target) {
            return target.classList.contains('scroller')
                ? target
                : getScrollContainer(target.parentElement);
        }
    },
};
const yafWidgetTagToggle = 'yaf-widget-tag-toggle';
customElements.define(yafWidgetTagToggle, YafWidgetTagToggle);
//# sourceMappingURL=YafWidgetTagToggle.js.map