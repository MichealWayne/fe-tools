var _a;
import { appState, events } from '../../handlers/index.js';
import { makeElement, makeLinkElement, makeNameSpan, makeSymbolSpan, normaliseFlags, } from '../../yafElement.js';
import YafHTMLElement from '../../YafHTMLElement.js';
const { trigger, action } = events;
/**
 *
 */
export class YafNavigationSearch extends YafHTMLElement {
    constructor() {
        super();
        this.resultsHTMLElement = makeElement('ul', 'results');
        this.search = ({ detail }) => {
            clearTimeout(this.debouncer);
            this.debouncer = setTimeout(() => {
                const { resultLink, tagToggles } = YafNavigationSearch.factory;
                const { searchString } = detail;
                const results = [];
                this.dictionary.forEach((reflection) => {
                    if (!this.match(results, searchString, reflection)) {
                        this.match(results, searchString, reflection, 'query', 100);
                    }
                });
                const resultHTMLListItems = results
                    .sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0))
                    .map((result) => resultLink(result[1], searchString));
                this.resultsHTMLElement.replaceChildren();
                this.resultsHTMLElement.appendChildren(resultHTMLListItems);
                const tagToggleHTMLElement = tagToggles(this.resultsHTMLElement);
                this.resultsHTMLElement.prepend(tagToggleHTMLElement);
                this.scrollTop = 0;
            }, 600);
        };
        this.match = (results, searchString, reflection, target = 'name', offset = 0) => {
            searchString = searchString.trim();
            let targetString = reflection[target];
            if (searchString === targetString) {
                results.push([0 + offset, reflection]);
                return true;
            }
            if (targetString.startsWith(searchString)) {
                results.push([1 + offset, reflection]);
                return true;
            }
            if (targetString.includes(searchString)) {
                results.push([2 + offset, reflection]);
                return true;
            }
            searchString = searchString.toLocaleLowerCase();
            targetString = targetString.toLocaleLowerCase();
            if (searchString === targetString) {
                results.push([3 + offset, reflection]);
                return true;
            }
            if (targetString.startsWith(searchString)) {
                results.push([4 + offset, reflection]);
                return true;
            }
            if (targetString.includes(searchString)) {
                results.push([5 + offset, reflection]);
                return true;
            }
            return false;
        };
        this.eventsList = [
            [trigger.menu.search, this.search],
            [
                trigger.options.display,
                ({ detail }) => {
                    const { key, value } = detail;
                    this.setAttribute(key, value);
                },
            ],
        ];
        const { SignatureContainer, SetSignature, GetSignature, SomeSignature, CallSignature, IndexSignature, ConstructorSignature, ContainsCallSignatures, } = appState.reflectionKind;
        const excluded = [
            SignatureContainer,
            SetSignature,
            GetSignature,
            SomeSignature,
            CallSignature,
            IndexSignature,
            ConstructorSignature,
            ContainsCallSignatures,
        ];
        this.dictionary = Object.keys(appState.reflectionMap)
            .map((id) => appState.reflectionMap[id])
            .filter((reflection) => excluded.indexOf(reflection.kind) === -1);
    }
    onConnect() {
        const { display } = appState.options;
        Object.keys(display).forEach((key) => {
            this.setAttribute(key, appState.options.display[key]);
        });
        this.eventsList.forEach((event) => events.on(...event));
        this.appendChild(this.resultsHTMLElement);
    }
    disconnectedCallback() {
        this.eventsList.forEach((event) => events.off(...event));
    }
}
_a = YafNavigationSearch;
YafNavigationSearch.factory = {
    resultLink: (reflectionLink, searchString) => {
        const { highlight } = _a.factory;
        const { query, hash, name, kind, flags } = reflectionLink;
        const flagClasses = normaliseFlags(flags).join(' ').trim();
        const listHTMLElement = makeElement('li', flagClasses);
        let href = `?page=${query}`;
        if (hash)
            href += `#${hash}`;
        const linkHTMLElement = makeLinkElement(href);
        const nameHTMLElement = highlight(makeNameSpan(name), searchString);
        const queryHTMLElement = highlight(makeSymbolSpan(query), searchString);
        const linkSymbolHTMLElement = makeElement('yaf-widget-kind', null, null, { kind: String(kind) });
        linkHTMLElement.appendChildren([nameHTMLElement, queryHTMLElement]);
        listHTMLElement.appendChildren([
            linkSymbolHTMLElement,
            linkHTMLElement,
        ]);
        return listHTMLElement;
    },
    highlight: (span, searchString, anycase) => {
        searchString = anycase
            ? searchString.toLocaleLowerCase()
            : searchString;
        const resultString = anycase
            ? span.innerText.toLocaleLowerCase()
            : span.innerText;
        if (resultString === searchString) {
            span.classList.add('lit');
            return span;
        }
        if (resultString.includes(searchString)) {
            const regexString = `(${searchString})`;
            const regex = anycase
                ? new RegExp(regexString, 'ig')
                : new RegExp(regexString, 'g');
            const spanHTMLElements = span.innerText
                .split(regex)
                .map((part) => {
                return makeElement('span', (anycase ? part.toLocaleLowerCase() : part) ===
                    searchString
                    ? 'lit'
                    : undefined, part);
            });
            span.innerText = '';
            span.appendChildren(spanHTMLElements);
            return span;
        }
        return anycase
            ? span
            : _a.factory.highlight(span, searchString, true);
    },
    tagToggles: (resultsHTMLElement) => {
        const flagCounts = {
            private: resultsHTMLElement.querySelectorAll('.private').length,
            inherited: resultsHTMLElement.querySelectorAll('.inherited').length,
        };
        const wrapperHTMLElement = makeElement('li');
        wrapperHTMLElement.appendChild(makeElement('yaf-widget-tag-toggle', undefined, undefined, { flagCounts }));
        return wrapperHTMLElement;
    },
};
const yafNavigationSearch = 'yaf-navigation-search';
customElements.define(yafNavigationSearch, YafNavigationSearch);
//# sourceMappingURL=YafNavigationSearch.js.map