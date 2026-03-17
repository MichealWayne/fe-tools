var _a;
import appState from '../../handlers/AppState.js';
import { YafElementDrawers } from '../../YafElementDrawers.js';
import { makeIconSpan, makeElement, makeLinkElement, makeNameSpan, } from '../../yafElement.js';
import { YafHTMLElement } from '../../index.js';
import { events } from '../../handlers/index.js';
const { action } = events;
/**
 *
 */
export class YafNavigationHeader extends YafHTMLElement {
    constructor() {
        super(...arguments);
        this.id = 'yafNavigationHeader';
        this.keyKinds = [
            appState.reflectionKind.Property,
            appState.reflectionKind.Method,
            appState.reflectionKind.Accessor,
            appState.reflectionKind.Variable,
            appState.reflectionKind.TypeAlias,
            appState.reflectionKind.Constructor,
            appState.reflectionKind.Function,
            appState.reflectionKind.Class,
            appState.reflectionKind.Namespace,
            appState.reflectionKind.Interface,
            appState.reflectionKind.Namespace,
            appState.reflectionKind.Enum,
            appState.reflectionKind.Reference,
        ];
    }
    onConnect() {
        const { factory } = YafNavigationHeader;
        const drawerTriggerHTMLElement = makeElement('span', 'info');
        const navigationControlsHTMLElement = factory.navigationControls(drawerTriggerHTMLElement);
        const drawerHTMLElement = factory.infoDrawer(this.keyKinds, appState.kindSymbols);
        drawerTriggerHTMLElement.appendChildren([
            makeIconSpan('question_mark', 18),
            makeIconSpan('highlight_off'),
        ]);
        this.appendChildren([
            factory.projectTitle(),
            navigationControlsHTMLElement,
            drawerHTMLElement,
        ]);
        this.drawers = new YafElementDrawers(this, drawerHTMLElement, drawerTriggerHTMLElement, this.id);
        this.drawers.renderDrawers(true);
    }
    disconnectedCallback() {
        this.drawers.drawerHasDisconnected();
    }
}
_a = YafNavigationHeader;
YafNavigationHeader.factory = {
    projectTitle: () => {
        const homeLinkHTMLElement = makeLinkElement('/', 'button');
        const titleHTMLElement = makeElement('div');
        titleHTMLElement.id = 'projectTitle';
        homeLinkHTMLElement.appendChild(makeIconSpan('home'));
        titleHTMLElement.appendChildren([
            homeLinkHTMLElement,
            makeElement('span', 'title', appState.projectName),
        ]);
        return titleHTMLElement;
    },
    navigationControls: (drawerTriggerHTMLElement) => {
        const navigationControlsHTMLElement = makeElement('div', 'controls-navigation');
        navigationControlsHTMLElement.appendChildren([
            makeElement('yaf-navigation-searchbar'),
            _a.factory.menuRollControls(drawerTriggerHTMLElement),
        ]);
        return navigationControlsHTMLElement;
    },
    menuRollControls: (drawerTriggerHTMLElement) => {
        const openAllHTMLElement = makeElement('span', 'open button');
        const closeAllHTMLElement = makeElement('span', 'close button');
        const drawerControlsHTMLElement = makeElement('span', 'controls-drawers');
        openAllHTMLElement.appendChild(makeIconSpan('expand_more'));
        closeAllHTMLElement.appendChild(makeIconSpan('expand_less'));
        drawerControlsHTMLElement.appendChildren([
            drawerTriggerHTMLElement,
            openAllHTMLElement,
            closeAllHTMLElement,
        ]);
        openAllHTMLElement.onclick = () => events.dispatch(action.menu.rollMenuDown());
        closeAllHTMLElement.onclick = () => events.dispatch(action.menu.rollMenuUp());
        return drawerControlsHTMLElement;
    },
    infoDrawer: (keyKinds, kindSymbols) => {
        const infoDrawerHTMLElement = makeElement('div', 'drawers-info');
        const innerHTMLElement = makeElement('span', 'inner');
        const keySymbolHTMLElements = keyKinds.map((keyKind) => {
            let nameString = kindSymbols[keyKind].className;
            nameString =
                nameString.charAt(0).toUpperCase() + nameString.slice(1);
            const widgetHTMLElement = makeElement('span', 'widget');
            const nameHTMLElement = makeNameSpan(nameString);
            const kindIconHTMLElement = _a.factory.kindIcon(String(keyKind));
            widgetHTMLElement.appendChildren([
                kindIconHTMLElement,
                nameHTMLElement,
            ]);
            return widgetHTMLElement;
        });
        innerHTMLElement.appendChildren(keySymbolHTMLElements);
        infoDrawerHTMLElement.appendChild(innerHTMLElement);
        return infoDrawerHTMLElement;
    },
    kindIcon: (kind) => makeElement('yaf-widget-kind', null, null, { kind }),
};
const yafNavigationHeader = 'yaf-navigation-header';
customElements.define(yafNavigationHeader, YafNavigationHeader);
//# sourceMappingURL=YafNavigationHeader.js.map