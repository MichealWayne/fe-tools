// render dom tag
import _ from './util';

export default class DomRender{
    constructor(obj) {
        this.dom = obj
    }

    renderTag(domobj) {
        let THIS = this;

        if (_.isString(domobj)) return document.createTextNode(domobj)
        if (!domobj.tagName) return false;

        let _dom = document.createElement(domobj.tagName);

        // attributes
        if (domobj.attrs) {
            for (let i in domobj.attrs) {
                _.setAttr(_dom, i, domobj.attrs[i]);
            }
        }

        // children
        let _child = domobj.children;
        if (_child) {
            if (_.isArray(_child)) {
                _child.map(function (item) {
                    _dom.appendChild(THIS.renderTag(item));
                });
            } else if (_.isObject(_child)) {
                _dom.appendChild(THIS.renderTag(_child));
            } else if (_.isString(_child)) {
                _dom.appendChild(document.createTextNode(_child))
            }
        }

        return _dom
    }
}