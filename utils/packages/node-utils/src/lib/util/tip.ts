/**
 * @module tip
 * @author Wayne
 * @Date 2022-06-21 14:16:08
 * @LastEditTime 2022-07-05 09:50:40
 */
import Colors from './colors';
import { getTimeStr } from './util';

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
  log: tipFunHoc('log'),
  error: tipFunHoc('error'),
  strongError: tipFunHoc('strongError'),
  warn: tipFunHoc('warn'),
  strongWarn: tipFunHoc('strongWarn'),
};

export default Tip;
