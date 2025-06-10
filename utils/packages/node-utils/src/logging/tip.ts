/**
 * @module tip
 * @author Wayne
 * @Date 2022-06-21 14:16:08
 * @LastEditTime 2025-06-09 19:18:34
 */
import Colors from './colors';
import { getTimeStr } from '../common';

/**
 * @param {String} info : log info string;
 * @param {Boolean} timebool: Whether to show time, optional;
 */

const TIP_MAP = {
  safe: 'FgGreen',
  error: 'FgRed',
  strongError: 'BgRed',
  warn: 'FgYellow',
  strongWarn: 'BgYellow',
};

/**
 * @function tipFunHoc
 * @param key
 * @returns
 */
const tipFunHoc = (key: string) => {
  const useColor = TIP_MAP[key as keyof typeof TIP_MAP];
  return (info: string | Error, timeFlag?: boolean) => {
    if (info) {
      const str = (timeFlag ? `${getTimeStr()}:` : '') + info;
      if (useColor) {
        console.log(Colors.get(useColor), str);
      } else {
        console.log(str);
      }
    }
  };
};

const Tip = {
  safe: tipFunHoc('safe'),
  success: tipFunHoc('safe'),
  log: tipFunHoc('log'),
  info: tipFunHoc('log'),
  err: tipFunHoc('error'),
  error: tipFunHoc('error'),
  strongError: tipFunHoc('strongError'),
  warn: tipFunHoc('warn'),
  strongWarn: tipFunHoc('strongWarn'),
};

export default Tip;
