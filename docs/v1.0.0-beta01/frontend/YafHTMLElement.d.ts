/**
 * A base class extension for all custom HTML WebComponents.
 *
 * It provides:
 *  - The often used `appendChildren` utility as a convenience to all Yaf components.
 *  - overrides the default `connectedCallback` with the purpose of providing a de-bouncer.\
 *    For inexplicable reasons, some nested custom WebComponents get multiple connected signals.
 */
export default class YafHtmlElement<T = Record<string, never>> extends HTMLElement {
    props: T;
    appendChildren: (children: (HTMLElement | undefined)[] | undefined) => void;
    private debounceCount;
    /**
     * The standard Web Component connect entry.
     *
     * This debounces or triggers the new `onConnect` trigger used in all ancestor Yaf theme components.
     */
    connectedCallback(): void;
}
