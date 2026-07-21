import { displayStates, flagCounts, yafDisplayOptions } from '../../../types/frontendTypes.js';
import { YafHTMLElement } from '../../index.js';
export declare class YafWidgetTagToggle extends YafHTMLElement<{
    flagCounts: flagCounts;
}> {
    static get observedAttributes(): string[];
    attributeChangedCallback(name: yafDisplayOptions, oldValue: displayStates, newValue: displayStates): void;
    onConnect(): void;
    disconnectedCallback(): void;
    private eventList;
    private static factory;
}
