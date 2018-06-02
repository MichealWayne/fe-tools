'use strict';

const Steps = require('./step');
let Result = {},
    _resArr = [];

// get key words
for (var i in Steps) {
    Result[i] = null;
    _resArr.push(i);
}

// deal with process result
// @param {Stream} result: process return;
// @param {Function} callback: callback function
function dealCMD (result, callback) {
    let _result = result.toString().trim();
    if (!_result) {     // no process in
        console.log(Steps[_resArr[0]]);
        return false;
    }

    Result[_resArr.shift()] = _result;
    if (_resArr.length) {
        console.log(Steps[_resArr[0]]);
    } else {
        process.stdin.pause();
        callback(Result);   
    }
}

// start process
// @param {Function} callback: callback function;
function startCMD (callback) {
    console.log(Steps[_resArr[0]]);

    process.stdin.setEncoding('utf8');

    process.stdin.resume();
    process.stdin.on('data', (chunk) => {
        dealCMD(chunk, callback);
    });
}

module.exports = startCMD;

// test
/*startCMD(function (data) {
    console.log(data);
});*/
// test end