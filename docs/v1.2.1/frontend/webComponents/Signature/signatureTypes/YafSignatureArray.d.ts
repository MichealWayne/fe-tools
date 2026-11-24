import { JSONOutput } from 'typedoc';
import { YafHTMLElement } from '../../../index.js';
export declare class YafSignatureArray extends YafHTMLElement<JSONOutput.ArrayType> {
    array: string;
    onConnect(): void;
}
