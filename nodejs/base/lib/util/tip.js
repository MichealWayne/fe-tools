const colors = require('./colors');
const { getTimeStr } = require('./util');

/*
 * tip log show
 * @param {String} info : log info string;
 * @param {Boolean} timebool: Whether to show time, optional;
 */

const TipMap = {
  safe: 'FgGreen',
  error: 'FgRed',
  strongError: 'BgRed',
  warn: 'FgYellow',
  strongWarn: 'BgYellow',
};

const tipFunHoc = key => {
  const useColor = TipMap[key];
  return (info, timebool) => {
    if (info) {
      const str = (timebool ? `${getTimeStr()}:` : '') + info;
      if (useColor) {
        console.log(colors.get(useColor), str);
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

module.exports = Tip;
