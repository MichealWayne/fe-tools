import { YafHTMLElement } from '../../index.js';
import { makeElement, renderSignatureType } from '../../yafElement.js';
export class YafSignatureParametersType extends YafHTMLElement {
    onConnect() {
        if (!this.props)
            return;
        this.classList.add('scroller');
        this.classList.add('horizontal');
        this.appendChild(makeElement('h5', null, 'Type Parameters:'));
        const table = makeElement('table');
        const thead = makeElement('thead');
        const headers = makeElement('tr');
        ['name', 'modifier', 'extends', 'default', 'comment'].forEach((heading) => headers.appendChild(makeElement('th', null, heading)));
        thead.appendChild(headers);
        table.appendChild(thead);
        const tbody = makeElement('tbody');
        this.props.forEach((parameter) => {
            const { varianceModifier, name, type, text } = parameter;
            const defaultValue = parameter.default;
            const row = makeElement('tr');
            let td = makeElement('td', null, name);
            row.appendChild(td);
            td = makeElement('td', null, varianceModifier);
            row.appendChild(td);
            td = makeElement('td');
            if (type)
                td.appendChild(renderSignatureType(type, 'none'));
            row.appendChild(td);
            td = makeElement('td');
            if (defaultValue)
                td.appendChild(renderSignatureType(defaultValue, 'none'));
            row.appendChild(td);
            td = makeElement('td');
            if (text === null || text === void 0 ? void 0 : text.comment)
                td.innerHTML = text.comment;
            row.appendChild(td);
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        this.appendChild(table);
    }
}
const yafSignatureParametersType = 'yaf-signature-parameters-type';
customElements.define(yafSignatureParametersType, YafSignatureParametersType);
//# sourceMappingURL=YafSignatureParametersType.js.map