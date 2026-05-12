import { trigger } from './triggers.js';
/**
 * Notifies that the URL location for content has changed
 *
 * The actual value is later taken from the browser location, this is purely a trigger.
 * @returns
 */
export const setLocation = () => new Event(trigger.content.setLocation);
export const scrollTop = (scrollTop) => new CustomEvent(trigger.content.scrollTop, {
    detail: { scrollTop },
});
export const getPageId = (callBack) => new CustomEvent(trigger.content.getPageId, {
    detail: { callBack },
});
export const breadcrumb = (id) => new CustomEvent(trigger.content.breadcrumb, { detail: { id } });
//# sourceMappingURL=actionsContent.js.map