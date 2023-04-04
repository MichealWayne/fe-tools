/**
 * @module Others
 * @author Wayne
 * @Date 2023-02-06 21:17:44
 * @LastEditTime 2023-04-03 20:54:03
 */

// 复杂比较请见https://github.com/omichelsen/compare-versions
/* Compare version strings.
 *
 * |Name  |Desc              |
 * |------|------------------|
 * |v1    |Version to compare|
 * |v2    |Version to compare|
 * |return|Comparison result |
 */

/* example
 * compareVersion('1.1.8', '1.0.4'); // -> 1
 * compareVersion('1.0.2', '1.0.2'); // -> 0
 * compareVersion('2.0', '2.0.0'); // -> 0
 * compareVersion('3.0.1', '3.0.0.2'); // -> 1
 * compareVersion('1.1.1', '1.2.3'); // -> -1
 */

/**
 * @function compareVersion
 * @param {string} v1Str
 * @param {string} v2Str
 * @return {1|0|-1}
 */
export function compareVersion(v1Str: string, v2Str: string) {
  const v1 = v1Str.split('.');
  const v2 = v2Str.split('.');

  const len = Math.max(v1.length, v2.length);

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

/**
 * pc keycode map
 */
const keyCodeMap = {
  8: 'Backspace',
  9: 'Tab',
  13: 'Enter',
  16: 'Shift',
  17: 'Ctrl',
  18: 'Alt',
  19: 'Pause',
  20: 'Caps Lock',
  27: 'Escape',
  32: 'Space',
  33: 'Page Up',
  34: 'Page Down',
  35: 'End',
  36: 'Home',
  37: 'Left',
  38: 'Up',
  39: 'Right',
  40: 'Down',
  42: 'Print Screen',
  45: 'Insert',
  46: 'Delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',
  91: 'Windows',
  93: 'Right Click',
  96: 'Numpad 0',
  97: 'Numpad 1',
  98: 'Numpad 2',
  99: 'Numpad 3',
  100: 'Numpad 4',
  101: 'Numpad 5',
  102: 'Numpad 6',
  103: 'Numpad 7',
  104: 'Numpad 8',
  105: 'Numpad 9',
  106: 'Numpad *',
  107: 'Numpad +',
  109: 'Numpad -',
  110: 'Numpad .',
  111: 'Numpad /',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  144: 'Num Lock',
  145: 'Scroll Lock',
  182: 'My Computer',
  183: 'My Calculator',
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  220: '\\',
  221: ']',
  222: "'",
};

/**
 * @function getKeyName
 * @param  {number} keycode
 * @return {string}
 */
export function getKeyName(keycode: keyof typeof keyCodeMap) {
  if (keyCodeMap[keycode]) {
    return keyCodeMap[keycode];
  }

  console.warn(`Unknow Key(Key Code:${keycode})`);
  return '';
}

/**
 * @function digitUppercase
 * @description 数字金额转中文
 * @param  {number} num
 * @return {string}
 * @example
 * digitUppercase(1000); // '壹仟元整'
 * digitUppercase(-123.45); // '欠壹佰贰拾叁元肆角伍分'
 */
export function digitUppercase(num: number) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  const head = num < 0 ? '欠' : '';
  num = Math.abs(num);

  let resStr = '';
  for (let i = 0, len = fraction.length; i < len; i++) {
    resStr += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  resStr = resStr || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i++) {
    let str = '';
    for (let j = 0; j < unit[1].length && num > 0; j++) {
      str = digit[num % 10] + unit[1][j] + str;
      num = Math.floor(num / 10);
    }
    resStr = str.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + resStr;
  }

  return (
    head +
    resStr
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
}
