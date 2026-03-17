import { YafDeclarationReflection, YafSignatureReflection } from '../../../types/types.js';
import { YafHTMLElement } from '../../index.js';
export declare class YafMemberSources extends YafHTMLElement<YafSignatureReflection | YafDeclarationReflection> {
    onConnect(): void;
}
