/**
 * @author Wayne
 * @Date 2022-06-21 14:05:00
 * @LastEditTime 2022-08-30 10:33:05
 */
import Fn from './lib/util/util';
import FsFuncs from './lib/fs/fsFuncs';
import OS from './lib/util/os';
import Run from './lib/util/run';
import Colors from './lib/util/colors';
import Tip from './lib/util/tip';
import Env from './lib/process/env';

/**
 * FS: file work
 * Fn: useful functions
 * Colors: console colors
 * Tip: console type
 * Env: process word
 */
export default {
  Fs: FsFuncs,
  OS,
  Run,
  Fn,
  Colors,
  Tip,
  Env,
};
