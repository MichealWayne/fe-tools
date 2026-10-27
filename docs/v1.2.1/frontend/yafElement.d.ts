import { componentName, materialIcon, TypeContext, yafHTMLExtension } from '../types/frontendTypes.js';
import { JSONOutput } from 'typedoc';
import { YAFDataObject } from '../types/types';
import { YafNavigationLink } from './webComponents/Navigation/index.js';
import { YafWidgetFlags } from './webComponents/Widget/index.js';
export declare const appendChildren: (element: HTMLElement) => yafHTMLExtension['appendChildren'];
export declare const makeElement: <T = HTMLElement, P = string | Record<string, unknown>>(tagName: string, className?: string | null, innerText?: string | null, props?: P | undefined) => T & yafHTMLExtension;
export declare const makeSymbolSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeNameSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeTypeSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeTitleSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeParameterSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeIntrinsicSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeKindSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeValueSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeParametersSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeLiteralSpan: (text: string) => HTMLElement & yafHTMLExtension;
export declare const makeIconSpan: (iconInnerHtml: materialIcon, size?: 18 | 24 | 36 | 48) => HTMLElement;
export declare const makeLinkElement: (href: string, className?: string, innerText?: string) => YafNavigationLink & yafHTMLExtension;
export declare const makeFlags: (flags: JSONOutput.ReflectionFlags, comment: JSONOutput.Comment | undefined) => YafWidgetFlags & yafHTMLExtension;
/**
 * Converts a ReflectionFlags Record object into an array of flags
 * @param flags
 * @returns
 */
export declare const normaliseFlags: (flags: JSONOutput.ReflectionFlags | undefined) => string[];
/**
 * Fetches the given document template from `index.html`.
 * @param id The DOM id of the template
 * @returns
 */
export declare const getHtmlTemplate: (id: componentName) => DocumentFragment;
export declare const needsParenthesis: (element: HTMLElement) => boolean;
export declare const renderSignatureType: (type: YAFDataObject['type'], context: TypeContext) => HTMLElement & yafHTMLExtension;
export declare const initCap: (text: string) => string;
export declare const getTransitionDuration: (drawer: HTMLElement) => number;
export declare const scrollToAnchor: (container: HTMLElement, anchor: string | number) => 0 | undefined;
export declare const flashElementBackground: (element: HTMLElement) => void;
export declare const stringify: (value: unknown) => string;
