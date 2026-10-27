import { YafDeclarationReflection } from '../../../types/types';
import { YafHTMLElement } from '../../index.js';
/**
 *
 */
export declare class YafMemberDeclaration extends YafHTMLElement<{
    data: YafDeclarationReflection;
    idPrefix: string;
}> {
    onConnect(): void;
    private static factory;
}
