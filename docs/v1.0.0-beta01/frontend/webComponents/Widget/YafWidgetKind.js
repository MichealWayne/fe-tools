import { YafHTMLElement } from '../../index.js';
import appState from '../../handlers/AppState.js';
export class YafWidgetKind extends YafHTMLElement {
    onConnect() {
        var _a;
        const { kind } = this.props;
        if (kind) {
            const data = appState.kindSymbols[Number(kind)];
            this.classList.add(data.className || 'notfound');
            this.innerHTML = `<span>${data.symbol || '*'}</span>`;
        }
        else {
            (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this);
        }
    }
}
const yafWidgetKind = 'yaf-widget-kind';
customElements.define(yafWidgetKind, YafWidgetKind);
//# sourceMappingURL=YafWidgetKind.js.map