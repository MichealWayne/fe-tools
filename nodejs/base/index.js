'use strict';

const fsFuncs = require('./lib/fs/fsFuncs');
const fn = require('./lib/util/util');
const colors = require('./lib/util/colors');
const tip = require('./lib/util/tip');
const env = require('./lib/process/env');

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
  Env: env,
};
