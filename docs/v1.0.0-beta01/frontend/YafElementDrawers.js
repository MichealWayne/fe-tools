import appState from './handlers/AppState.js';
import { events } from './handlers/index.js';
const { trigger } = events;
/**
 * Utility class for folding, hierarchical drawers
 */
export class YafElementDrawers {
    constructor(drawerParent, drawer, drawerTrigger, id, parentDrawerElement) {
        this.debounceResize = null;
        this.isDrawer = true;
        this.hasContent = false;
        this.drawerHasDisconnected = () => {
            this.eventsList.forEach((event) => events.off(...event));
        };
        this.eventsList = [
            ['resize', () => this.heightControl.debounceReset(), window],
            [
                trigger.drawers.resetHeight,
                () => this.heightControl.resetHeights(true),
            ],
            [
                trigger.options.display,
                ({ detail }) => {
                    const { key, value } = detail;
                    this.drawerParent.setAttribute(key, value);
                },
            ],
        ];
        this.renderDrawers = (init = false) => {
            if (init && !this.isRoot)
                return;
            this.hasContent = !!this.drawer.innerHTML;
            this.heightControl.initDataHeight(this.drawer.clientHeight);
            this.drawerParent.classList.add('closed');
            appState.openDrawers[this.drawerId]
                ? this.openDrawer()
                : this.closeDrawer();
            this.childDrawerElements.forEach((child) => {
                child.drawers.renderDrawers();
            });
            setTimeout(() => this.drawerParent.classList.add('rendered'));
        };
        this.openDrawer = () => {
            if (this.drawerState === 'open' || !this.hasContent)
                return;
            this.heightControl.updateHeightAbove(this.dataHeight);
            this.drawerParent.classList.remove('closed');
            this.drawerParent.classList.add('open');
            appState.openDrawer = this.drawerId;
        };
        this.closeDrawer = () => {
            if (this.drawerState === 'closed' || !this.hasContent)
                return;
            this.heightControl.updateHeightAbove(this.dataHeight * -1);
            this.drawerParent.classList.remove('open');
            this.drawerParent.classList.add('closed');
            appState.closeDrawer = this.drawerId;
        };
        this.toggleDrawerState = () => {
            this.drawerState === 'open' ? this.closeDrawer() : this.openDrawer();
        };
        this.heightControl = {
            initDataHeight: (clientHeight) => {
                this.dataHeight = this.dataHeight + clientHeight;
                this.heightControl.setMaxHeightStyle();
            },
            setMaxHeightStyle: () => {
                this.drawer.setAttribute('style', `max-height: ${this.maxHeightPixels};`);
            },
            updateHeightAbove: (height) => {
                this.dataExtraHeight = height;
                this.heightControl.setMaxHeightStyle();
                if (this.parentDrawerElement)
                    this.parentDrawerElement.drawers.heightControl.updateHeightAbove(height);
            },
            reRenderDrawers: (init = false) => {
                if (init && !this.isLeaf)
                    return;
                if (init)
                    this.renderDrawers(true);
                if (this.parentDrawerElement)
                    this.parentDrawerElement.drawers.heightControl.reRenderDrawers();
            },
            resetHeights: (init = false) => {
                if (init && !this.isRoot)
                    return;
                this.dataHeight = 0;
                this.dataExtraReset = 0;
                this.drawer.removeAttribute('style');
                ['rendered', 'open', 'closed'].forEach((className) => {
                    if (this.drawerParent.classList.contains(className))
                        this.drawerParent.classList.remove(className);
                });
                this.childDrawerElements.forEach((child) => {
                    child.drawers.heightControl.resetHeights();
                });
                this.renderDrawers(true);
            },
            debounceReset: () => {
                this.debounceResize && clearTimeout(this.debounceResize);
                this.debounceResize = setTimeout(() => {
                    this.heightControl.resetHeights(true);
                }, 100);
            },
        };
        this.drawer = drawer;
        this.drawerParent = drawerParent;
        this.drawerTrigger = drawerTrigger;
        this.drawerId = id;
        this.parentDrawerElement = parentDrawerElement;
        this.drawerParent.isDrawer = true;
        this.drawerParent.classList.add('yaf-parent-drawer');
        this.drawer.classList.add('yaf-drawer');
        this.drawerParent.setAttribute('data-height', '0');
        this.drawerParent.setAttribute('data-height-extra', '0');
        Object.keys(appState.options.display).forEach((key) => {
            this.drawerParent.setAttribute(key, appState.options.display[key]);
        });
        this.drawerTrigger.onclick = () => this.toggleDrawerState();
        this.eventsList.forEach((event) => events.on(...event));
    }
    get dataHeight() {
        return parseFloat(this.drawerParent.getAttribute('data-height') || '0');
    }
    set dataHeight(height) {
        this.drawerParent.setAttribute('data-height', String(height));
    }
    get dataExtraHeight() {
        return parseFloat(this.drawerParent.getAttribute('data-height-extra') || '0');
    }
    set dataExtraHeight(height) {
        this.drawerParent.setAttribute('data-height-extra', String(this.dataExtraHeight + height));
    }
    set dataExtraReset(height) {
        this.drawerParent.setAttribute('data-height-extra', String(height));
    }
    get maxHeightPixels() {
        return String(this.dataHeight + this.dataExtraHeight) + 'px';
    }
    get drawerState() {
        return this.drawerParent.classList.contains('open') ? 'open' : 'closed';
    }
    get childDrawerElements() {
        if (this.childDrawers)
            return this.childDrawers;
        this.childDrawers = [...this.drawer.children]
            .map((element) => {
            if ('drawers' in element)
                return element;
            const nestedDrawer = [...element.children].find((childElement) => 'drawers' in childElement);
            return nestedDrawer || undefined;
        })
            .filter((element) => !!element);
        return this.childDrawers;
    }
    get isRoot() {
        return !this.parentDrawerElement;
    }
    get isBranch() {
        return !!this.parentDrawerElement;
    }
    get isLeaf() {
        return !this.childDrawerElements.length;
    }
    get flagCounts() {
        return {
            private: this.drawer.querySelectorAll(':scope > .private').length,
            inherited: this.drawer.querySelectorAll(':scope > .inherited')
                .length,
        };
    }
}
YafElementDrawers.findParentDrawers = (child, parents = []) => {
    const parent = child.parentElement;
    if (parent && parent.isDrawer)
        parents.push(parent);
    if (parent)
        return YafElementDrawers.findParentDrawers(parent, parents);
    return parents;
};
YafElementDrawers.hasClosedDrawers = (drawers) => {
    return (drawers.length &&
        !!drawers.find((drawer) => drawer.drawers.drawerState === 'closed'));
};
//# sourceMappingURL=YafElementDrawers.js.map