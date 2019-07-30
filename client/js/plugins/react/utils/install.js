/*
 * install component
 */

const _install = function (Vue) {
    Vue.component(this.name, this);
};

const install = function (sfc) {
    sfc.name = 'v-' + sfc.name;
    sfc.install = sfc.install || _install;
    sfc.mixins = sfc.mixins || [];
    sfc.methods = sfc.methods || {};

    return sfc;
};

export default install;