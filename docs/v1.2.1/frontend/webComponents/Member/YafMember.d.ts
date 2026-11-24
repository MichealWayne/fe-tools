import { YAFDataObject, YAFReflectionLink } from '../../../types/types.js';
import { yafReflectionGroup } from '../../../types/frontendTypes.js';
import { JSONOutput } from 'typedoc';
import { YafHTMLElement } from '../../index.js';
export declare class YafMember extends YafHTMLElement<{
    data: Omit<YAFDataObject & YAFReflectionLink, 'query'>;
    idPrefix: string;
}> {
    onConnect(): void;
    private focusMember;
    private factory;
    static serialiseReflectionGroup: (group: JSONOutput.ReflectionGroup, children: YAFDataObject[]) => yafReflectionGroup;
}
