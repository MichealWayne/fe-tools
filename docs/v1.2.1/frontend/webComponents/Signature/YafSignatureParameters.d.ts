import { YafParameterReflection } from '../../../types/types.js';
import { YafHTMLElement } from '../../index.js';
export declare class YafSignatureParameters extends YafHTMLElement<YafParameterReflection[] | undefined> {
    onConnect(): void;
    makeFlags: (parameter: YafParameterReflection) => HTMLElement & import("../../../types/frontendTypes.js").yafHTMLExtension;
    makeName: (parameter: YafParameterReflection) => HTMLElement & import("../../../types/frontendTypes.js").yafHTMLExtension;
    makeType: (parameter: YafParameterReflection) => HTMLElement & import("../../../types/frontendTypes.js").yafHTMLExtension;
    makeDefault: (parameter: YafParameterReflection) => HTMLElement & import("../../../types/frontendTypes.js").yafHTMLExtension;
    /**
     * Places parameter comments into the table cell. \
     * Because links in these comments are stringified by the BackEnd as `<a>` HTML elements, the string is regexed to replace `a` with `yaf-navigation-link` elements.
     *
     * @param parameter A meta example of `yaf-navigation-link` parsed correctly: {@link types.common.YafParameterReflection}
     * @returns
     */
    makeComment: (parameter: YafParameterReflection) => HTMLElement & import("../../../types/frontendTypes.js").yafHTMLExtension;
}
