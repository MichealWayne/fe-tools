'use strict';

const colors = require('./colors');
const util = require('./util');
let getTimeStr = util.getTimeStr;

/*
* tip log show
* @param {String} info : log info string;
* @param {Boolean} timebool: Whether to show time, optional;
*/
let Tip = {
    safe: (info, timebool) => {
        if (!info) return false;

        console.log(colors.get('FgGreen'), (timebool ? getTimeStr() + ':' : '') + info);
    },
    log: (info, timebool) => {     // normal log
        if (!info) return false;

        console.log(timebool ? getTimeStr() + ':' : '' + info);
    },
    error: (info, timebool) => {    // error log
        if (!info) return false;

        console.log(colors.get('FgRed'), (timebool ? getTimeStr() + ':' : '') + info);
    },
    strongError: (info, timebool) => {  // strong error log
        if (!info) return false;

        console.log(colors.get('BgRed'), (timebool ? getTimeStr() + ':' : '') + info);
    },
    warn: (info, timebool) => {     // warn log
        if (!info) return false;

        console.log(colors.get('FgYellow'), (timebool ? getTimeStr() + ':' : '') + info);
    },
    strongWarn: (info, timebool) => {   // strong warn log
        if (!info) return false;

        console.log(colors.get('BgYellow'), (timebool ? getTimeStr() + ':' : '') + info);
    }
};

module.exports = Tip