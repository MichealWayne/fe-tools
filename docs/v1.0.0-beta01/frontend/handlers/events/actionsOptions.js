import { trigger } from './triggers.js';
export const display = (key, value) => new CustomEvent(trigger.options.display, {
    detail: { key, value },
});
//# sourceMappingURL=actionsOptions.js.map