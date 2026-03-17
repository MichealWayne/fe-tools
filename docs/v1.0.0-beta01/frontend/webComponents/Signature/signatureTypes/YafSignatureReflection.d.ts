import { JSONOutput } from 'typedoc';
import { YafSignatureTitle } from '../index.js';
import { YafHTMLElement } from '../../../index.js';
/**
 *
 */
export declare class YafSignatureReflection extends YafHTMLElement<JSONOutput.ReflectionType> {
    onConnect(): (YafSignatureTitle & import("../../../../types/frontendTypes").yafHTMLExtension) | undefined;
    private static factory;
}
