/**
 * /src/pages/index/main.js -> index.html
 */

import 'moo-css-base/mobile.less';
import '@/less/index.less';

const HelloWorld = <T>(param: T) => {
  const prefix = 'hello';
  return `${prefix} ${param} ${new Date()}`;
};
const str = 'TypeScript';
console.log(HelloWorld(str));
console.log(str);
