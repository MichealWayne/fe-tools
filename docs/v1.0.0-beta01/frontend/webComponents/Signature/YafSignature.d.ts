import { yafSignatureProps } from '../../../types/frontendTypes.js';
import { YafHTMLElement } from '../../index.js';
/**
 * A factory class that produces Yaf theme HTMLCustomElements for the given props.type and props.context. \
 * The class replaces itself (`this`) in the DOM with the appropriate signature type CustomElement.
 *
 * This class is best used with the helper {@link frontend.yafElement}.renderSignatureType
 *
 */
export declare class YafSignature extends YafHTMLElement<yafSignatureProps> {
    onConnect(): (HTMLElement & import("../../../types/frontendTypes.js").yafHTMLExtension) | undefined;
    /**
     * Transforms a TypeDoc camelCased "type name" string into a hyphen separated lowercase string
     *
     * @param name
     * @returns
     */
    private static parseTypeName;
    static isCallSignature: (kind: number) => boolean;
}
