import { JSONOutput } from 'typedoc';
import { YafHTMLElement } from '../../../index.js';
export declare class YafSignatureIndexedAccess extends YafHTMLElement<JSONOutput.IndexedAccessType> {
    onConnect(): void;
    private static factory;
}
/**
 * With reference to typedoc definitions: \
 * `JSONOutput.IndexedAccessType['objectType']` has an untyped `id?` property \
 * which carries from a `reference` objectType.
 *
 * This type is a hack to work with the `id` to determine the frontend url link.
 *
 * @see https://typedoc.org/api/interfaces/JSONOutput.IndexedAccessType.html
 */
export type objectWithId = JSONOutput.IndexedAccessType['objectType'] & {
    id?: number;
};
