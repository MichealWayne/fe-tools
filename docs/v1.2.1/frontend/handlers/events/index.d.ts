export * as content from './actionsContent.js';
export * as menu from './actionsMenu.js';
export * as drawers from './actionsDrawers.js';
export * as options from './actionsOptions.js';
/**
 * Notifies the content or menu DOM that it needs to scroll to the given location
 * @param target
 * @param context
 * @returns
 */
export type scrollTo = {
    target: number | string;
};
export declare const scrollTo: (context: 'menu' | 'content', target: scrollTo['target']) => CustomEvent<scrollTo>;
