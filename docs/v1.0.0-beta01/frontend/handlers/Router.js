var _a;
import { events } from './index.js';
const { action } = events;
export default class Router {
}
_a = Router;
Router.baseUrl = `${window.location.origin}${window.location.pathname}`;
Router.route = (link, e) => {
    const href = link.getAttribute('href');
    const hrefOrigin = href ? href.split('?')[0] : href;
    const target = link.getAttribute('target') || undefined;
    const isExternalLink = !href ||
        target === '_blank' ||
        (hrefOrigin && !window.location.href.startsWith(hrefOrigin)) ||
        e.ctrlKey;
    if (isExternalLink)
        return;
    e.preventDefault();
    const linkIsOnCurrentPage = Router.getHrefWithoutHash(window.location.href) ===
        Router.getHrefWithoutHash(href);
    if (linkIsOnCurrentPage) {
        const hash = _a.getHash(href);
        events.dispatch(action.content.scrollTo(hash));
        if (hash) {
            history.pushState('', '', `#${hash}`);
        }
        else {
            history.pushState({ path: href }, '', href);
        }
    }
    else {
        history.pushState({ path: href }, '', href);
        events.dispatch(action.content.setLocation());
    }
};
Router.getTargetURL = (link) => new URL(link.getAttribute('href') || '', _a.baseUrl);
Router.getHrefWithoutHash = (href) => href ? href.split('#')[0] : href;
Router.getHash = (href) => {
    if (!href)
        return 0;
    const hash = href.split('#')[1];
    return hash || 0;
};
//# sourceMappingURL=Router.js.map