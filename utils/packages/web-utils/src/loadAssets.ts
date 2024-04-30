/**
 * @module loadAssets
 * @author Wayne
 * @Date 2024-04-07 13:45:27
 * @LastEditTime 2024-04-29 17:25:32
 */

import { runPromisesInSeries } from 'utils';

/**
 * @function loadScript
 * @description 动态加载js
 * @param {string} url
 * @param {boolean} isCrossOrigin
 * @returns {Promise<any>}
 * @example
 * loadScript('https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js').then(()=>{
 *   // use echart api
 *   echarts.init(document.getElementById('main'));
 * })
 */
export function loadScript(url: string, isCrossOrigin = true) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = err => reject({ err, url });
    script.setAttribute('type', 'text/javascript');
    if (isCrossOrigin) {
      script.setAttribute('crossorigin', 'anonymous');
    }
    document.body.appendChild(script);
  });
}

/**
 * @function loadScriptList
 * @description 动态加载js列表
 * @param {string[]} urls
 * @param {boolean} isCrossOrigin
 * @param {boolean} isAsync
 * @returns {Promise<any[]>}
 * @example
 * loadScriptList(['a.js', 'b.js', 'c.js']).then(() => {
 *   // use a.js, b.js, c.js
 * })
 */
export function loadScriptList(urls: string[], isCrossOrigin = true, isAsync = true) {
  if (isAsync) return Promise.all(urls.map(url => loadScript(url, isCrossOrigin)));
  return runPromisesInSeries(urls.map(url => () => loadScript(url, isCrossOrigin)));
}

/**
 * @function loadCss
 * @description 动态加载css
 * @param {string} url
 * @returns {Promise<void>}
 * @example
 * loadCss('a.css').then(() => {
 *   // use bootstrap css
 * }
 */
export function loadCss(cssPath: string) {
  return new Promise((resolve, reject) => {
    const head = document.querySelector('head');

    if (!head) {
      return reject('no head element');
    }
    const css = document.createElement('link');
    css.href = cssPath;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    head.appendChild(css);

    function loadCB() {
      css.removeEventListener('load', loadCB);

      resolve(true);
    }

    css.addEventListener('load', loadCB);
    return true;
  });
}

/**
 * @function loadCssList
 * @description 动态加载css列表
 * @param {string[]} cssList
 * @returns {Promise<any>}
 * @example
 * loadCssList(['a.css', 'b.css', 'c.css']).then(() => {
 *   // use a.css, b.css, c.css
 * }
 */
export function loadCssList(cssList: string[]): Promise<any> {
  return Promise.all(cssList.map(item => loadCss(item)));
}

/**
 * @function loadImage
 * @description 动态加载图片资源（常用于预加载）
 * @param {string} imgUrl
 * @returns {Promise<HTMLImageElement>}
 * @example
 * loadImage('a.png').then(img => {
 *   // use img
 * }
 */
export function loadImage(imgUrl: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

/**
 * @function loadImageList
 * @description 动态加载图片资源列表（常用于预加载）
 * @param {string[]} imageUrls
 * @returns {Promise<HTMLImageElement[]>}
 * @example
 * loadImageList(['a.png', 'b.png', 'c.png']).then(imgs => {
 *   // use imgs
 * }
 */
export function loadImageList(imageUrls: string[]) {
  return Promise.all(imageUrls.map(item => loadImage(item)));
}

/**
 * @function loadCsv
 * @description 前端下载csv数据表(可以配置utils里arrayToCSV)
 * @param {string} csvStr
 * @param {string} name
 * @param {string} type
 */
export function loadCSV(csvStr: string, name = 'data', type = 'csv') {
  let blobContent = new Blob(['\ufeff' + csvStr], {
    type: `text/plain,charset=utf-8`,
  });

  let blobUrl = window.URL.createObjectURL(blobContent);
  let eleLink = document.createElement('a');

  eleLink.download = `${name}.${type}`;
  eleLink.style.display = 'none';
  eleLink.href = blobUrl;

  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}
