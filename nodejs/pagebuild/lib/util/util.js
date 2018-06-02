'use strict';

// extend Array function
// array unique function
Array.prototype.unique = function () {
    let res = [],
        json = {};

    for (let i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
};