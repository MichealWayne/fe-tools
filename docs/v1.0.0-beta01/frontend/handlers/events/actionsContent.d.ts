import { scrollTo } from './index.js';
/**
 * Notifies that the URL location for content has changed
 *
 * The actual value is later taken from the browser location, this is purely a trigger.
 * @returns
 */
export declare const setLocation: () => Event;
export type scrollTop = {
    scrollTop: number;
};
export declare const scrollTop: (scrollTop: number) => CustomEvent<scrollTop>;
export type getPageId = {
    callBack: (pageId: number) => void;
};
export declare const getPageId: (callBack: getPageId['callBack']) => CustomEvent<getPageId>;
export type breadcrumb = {
    id: number;
};
export declare const breadcrumb: (id: breadcrumb['id']) => CustomEvent<breadcrumb>;
export interface content {
    scrollTo: scrollTo;
    scrollTop: scrollTop;
    getPageId: getPageId;
    breadcrumb: breadcrumb;
}
