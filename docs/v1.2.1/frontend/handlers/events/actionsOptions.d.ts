import { yafDisplayOptions } from '../../../types/frontendTypes.js';
type display = {
    key: yafDisplayOptions;
    value: 'show' | 'hide';
};
export declare const display: (key: display['key'], value: display['value']) => CustomEvent<display>;
export interface options {
    display: display;
}
export {};
