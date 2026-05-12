import * as actions from './index.js';
import { trigger } from './triggers.js';
export class Events {
    constructor() {
        this.trigger = trigger;
        this.action = {
            content: {
                setLocation: actions.content.setLocation,
                scrollTo: actions.scrollTo.bind(null, 'content'),
                scrollTop: actions.content.scrollTop,
                getPageId: actions.content.getPageId,
                breadcrumb: actions.content.breadcrumb,
            },
            menu: {
                rollMenuDown: actions.menu.rollMenuDown,
                rollMenuUp: actions.menu.rollMenuUp,
                scrollTo: actions.scrollTo.bind(null, 'menu'),
                toggle: actions.menu.toggle,
                search: actions.menu.search,
            },
            drawers: {
                resetHeight: actions.drawers.resetDrawerHeight,
            },
            options: {
                display: actions.options.display,
            },
        };
        this.dispatch = (action, element = Events.body) => element.dispatchEvent(action);
        this.on = (trigger, callBack, element = Events.body) => {
            element.addEventListener(trigger, callBack);
        };
        this.off = (trigger, callBack, element = Events.body) => {
            element.removeEventListener(trigger, callBack);
        };
    }
}
Events.body = document.querySelector('body');
const events = new Events();
export default events;
//# sourceMappingURL=Events.js.map