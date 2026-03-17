import errorHandlers from './handlers/ErrorHandlers.js';
import { YafElementDrawers } from './YafElementDrawers.js';
const iconClass = 'material-icons-sharp';
export const appendChildren = (element) => (children = []) => {
    children.forEach((child) => {
        if (child)
            element.appendChild(child);
    });
};
export const makeElement = (tagName, className, innerText, props) => {
    const element = document.createElement(tagName);
    if (className)
        className.split(' ').forEach((c) => {
            if (c.length)
                element.classList.add(c);
        });
    if (innerText)
        element.innerText = innerText;
    element.props = props ? props : {};
    element.appendChildren =
        appendChildren(element);
    return element;
};
export const makeSymbolSpan = (text) => makeElement('span', 'symbol', text);
export const makeNameSpan = (text) => makeElement('span', 'name', text);
export const makeTypeSpan = (text) => makeElement('span', 'type', text);
export const makeTitleSpan = (text) => makeElement('span', 'title', text);
export const makeParameterSpan = (text) => makeElement('span', 'parameter', text);
export const makeIntrinsicSpan = (text) => makeElement('span', 'intrinsic', text);
export const makeKindSpan = (text) => makeElement('span', 'kind', text);
export const makeValueSpan = (text) => makeElement('span', 'value', text);
export const makeParametersSpan = (text) => makeElement('span', 'parameters', text);
export const makeLiteralSpan = (text) => makeElement('span', 'literal', text);
export const makeIconSpan = (iconInnerHtml, size = 24) => {
    return makeElement('span', `${iconClass} md-${size} yaficon`, iconInnerHtml);
};
export const makeLinkElement = (href, className, innerText) => {
    const link = makeElement('yaf-navigation-link', className, innerText, undefined);
    link.setAttribute('href', href);
    return link;
};
export const makeFlags = (flags, comment) => {
    const normalisedFlags = normaliseFlags(flags);
    const flagElement = makeElement('yaf-widget-flags', null, null, {
        flags: normalisedFlags,
        comment,
    });
    return flagElement;
};
/**
 * Converts a ReflectionFlags Record object into an array of flags
 * @param flags
 * @returns
 */
export const normaliseFlags = (flags) => {
    if (!flags)
        return [];
    const flagsArray = Object.keys(flags)
        .map((flag) => flag.replace('is', '').replace('has', '').toLowerCase().trim())
        .filter((flag) => !!flag);
    return flagsArray;
};
/**
 * Fetches the given document template from `index.html`.
 * @param id The DOM id of the template
 * @returns
 */
export const getHtmlTemplate = (id) => {
    const template = document.getElementById(id);
    return template
        ? template.content
        : errorHandlers.notFound(`Could not find the HTMLTemplate for "#${id}".`);
};
export const needsParenthesis = (element) => {
    return element.hasAttribute('needsParenthesis');
};
export const renderSignatureType = (type, context) => {
    if (!type)
        return makeElement('span', null, 'null');
    return makeElement('yaf-signature', null, null, {
        type,
        context,
    });
};
export const initCap = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
export const getTransitionDuration = (drawer) => {
    const animationDelay = getComputedStyle(drawer).getPropertyValue('transition-duration');
    return parseFloat(animationDelay) * 1000;
};
export const scrollToAnchor = (container, anchor) => {
    if (typeof anchor === 'number')
        return (container.scrollTop = 0);
    const targetElement = document.getElementById(anchor);
    if (targetElement) {
        const drawerParents = YafElementDrawers.findParentDrawers(targetElement);
        const scrollIntoView = () => {
            container.scrollTop = targetElement.offsetTop;
            hackFixMobileScrolling();
            flashElementBackground(targetElement);
        };
        if (!YafElementDrawers.hasClosedDrawers(drawerParents)) {
            scrollIntoView();
        }
        else if (drawerParents.length) {
            drawerParents.forEach((element) => element.drawers.openDrawer());
            setTimeout(() => scrollIntoView(), getTransitionDuration(drawerParents[0].drawers.drawer) / 2);
        }
    }
    else {
        return errorHandlers.notFound(`Could not find element for "#${anchor}"`);
    }
    function hackFixMobileScrolling() {
        const containerHTMLElements = document.querySelectorAll('html, body, typedoc-theme-yaf, yaf-chrome-left, yaf-chrome-right');
        [...containerHTMLElements].forEach((containerHTMLElement) => {
            if (containerHTMLElement)
                containerHTMLElement.scrollTop = 0;
        });
    }
};
export const flashElementBackground = (element) => {
    element.classList.add('flash');
    setTimeout(() => element.classList.remove('flash'), 1000);
};
export const stringify = (value) => {
    if (typeof value === 'bigint') {
        return String(value) + 'n';
    }
    return JSON.stringify(value).replace(/^"|"$/g, '');
};
//# sourceMappingURL=yafElement.js.map