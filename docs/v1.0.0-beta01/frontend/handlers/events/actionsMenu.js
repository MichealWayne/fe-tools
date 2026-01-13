import { trigger } from './triggers.js';
export const rollMenuDown = () => new Event(trigger.menu.rollMenuDown);
export const rollMenuUp = () => new Event(trigger.menu.rollMenuUp);
export const toggle = (state) => new CustomEvent(trigger.menu.toggle, {
    detail: { state },
});
export const search = (searchString) => new CustomEvent(trigger.menu.search, { detail: { searchString } });
//# sourceMappingURL=actionsMenu.js.map