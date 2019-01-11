'use strict';

const fsFuncs = require('./lib/fs/fsFuncs'),
    fn = require('./lib/util/util'),
    colors = require('./lib/util/colors'),
    tip = require('./lib/util/tip'),
    env = require('./lib/process/env');


/*
 * FS: file work
 * Fn: useful functions
 * Colors: console colors
 * Tip: console type
 * Env: process word
 */
module.exports = {
    FS: fsFuncs,
    Fn: fn,
    Colors: colors,
    Tip: tip,
    Env: env
};