'use strict';

const startCMD = require('./lib/process/process');
const FS = require('./lib/fs/fsFuncs');
const colors = require('./lib/util/colors');
const path = require('path');

var config = require('./config');

const Fetch = {
    reg: {
        css: /<style>(([\s\S])*?)<\/style>/gi,
        js: /<script>(([\s\S])*?)<\/script>/gi
    },

    // fetch file data with regular expression
    // @param {String} data: file content;
    // @param {reg value} reg: regular expression
    // @return {Array} file data array;
    fetchData: (data, reg) => {
        let styleArr = data.match(reg, (matchs, m1) => {
            return m1;
        });

        if (!styleArr) return '';

        styleArr = styleArr.unique();

        let styleArrLength = styleArr.length;
        for (let i = 0; i < styleArrLength; i++) {
            styleArr[i] = styleArr[i].replace(reg, (matchs, m1) => {
                return m1;
            });
        }

        return styleArr;
    }
};

let Builder = {}

// build css, js, html files
// @param {String} data: original html data;
Builder.buildFiles = (data) => {
    let THIS = this;
    let _HTML = data;

    // build css
    let cssArr = Fetch.fetchData(_HTML, Fetch.reg.css);

    cssArr = cssArr ? cssArr.join('') : cssArr;
    FS.buildCssFile(cssArr, THIS.dist);

    // build js
    let jsArr = Fetch.fetchData(_HTML, Fetch.reg.js);
    FS.buildJsFile(jsArr, THIS.dist);

    // build html
    let htmlData = _HTML.replace(Fetch.reg.css, '').replace(Fetch.reg.js, '');
    FS.setFile(path.join(THIS.dist, THIS.filename), htmlData);
};

// initialize function
// @param {Object} options: set options;
Builder.init = (options) => {
    if (!options.folder || !options.filename || !options.buildname) {
        console.log(colors.get('FgRed'), 'Error! The input is wrong');
        return false;
    }

    let _dist = this.dist = path.join(config.dist, options.folder);
    let _filename = this.filename = options.filename;
    let _buildname = this.buildname = options.buildname;

    FS.setFolder(config.dist);
    FS.setFolder(_dist);

    FS.renderTemplates(path.join(config.src, _filename), Builder.buildFiles);
};


module.exports = {
    init: (configData) => {
        if (configData) {
            if (configData.src) config.src = configData.src;
            if (configData.dist) config.dist = configData.dist;
        }

        startCMD(Builder.init);
    }
};