import * as actions from './index.js';
export declare class Events {
    trigger: {
        content: {
            setLocation: string;
            scrollTo: string;
            scrollTop: string;
            getPageId: string;
            breadcrumb: string;
        };
        menu: {
            rollMenuDown: string;
            rollMenuUp: string;
            scrollTo: string;
            toggle: string;
            search: string;
        };
        drawers: {
            resetHeight: string;
        };
        options: {
            display: string;
        };
    };
    action: {
        content: {
            setLocation: () => Event;
            scrollTo: (target: string | number) => CustomEvent<actions.scrollTo>;
            scrollTop: (scrollTop: number) => CustomEvent<actions.content.scrollTop>;
            getPageId: (callBack: (pageId: number) => void) => CustomEvent<actions.content.getPageId>;
            breadcrumb: (id: number) => CustomEvent<actions.content.breadcrumb>;
        };
        menu: {
            rollMenuDown: () => Event;
            rollMenuUp: () => Event;
            scrollTo: (target: string | number) => CustomEvent<actions.scrollTo>;
            toggle: (state?: "open" | "close" | undefined) => CustomEvent<actions.menu.toggle>;
            search: (searchString: string) => CustomEvent<actions.menu.search>;
        };
        drawers: {
            resetHeight: () => Event;
        };
        options: {
            display: (key: "private" | "inherited", value: "show" | "hide") => CustomEvent<{
                key: "private" | "inherited";
                value: "show" | "hide";
            }>;
        };
    };
    dispatch: (action: CustomEvent | Event, element?: HTMLElement) => boolean;
    on: (trigger: string, callBack: unknown, element?: HTMLElement | Window) => void;
    off: (trigger: string, callBack: unknown, element?: HTMLElement | Window) => void;
    private static body;
}
declare const events: Events;
export default events;
