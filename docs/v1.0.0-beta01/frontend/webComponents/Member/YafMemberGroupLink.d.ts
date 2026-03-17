import { yafMemberGroupLinkProps } from '../../../types/frontendTypes';
import { YafHTMLElement } from '../../index.js';
export declare class YafMemberGroupLink extends YafHTMLElement<yafMemberGroupLinkProps> {
    onConnect(): void;
    /**
     * If the link is to a `Reference` kind, this modifies the name
     * to indicate how the original target has been modified.
     * @param child
     * @returns
     */
    private serialiseReferencedChild;
}
