/**
 * @module loadAssets
 * @author Wayne
 * @Date 2024-04-07 13:45:27
 * @LastEditTime 2024-08-25 10:14:05
 */
/**
 * @function loadScript
 * @description 动态加载JavaScript文件。Dynamically loads JavaScript files
 * @param {string} url - JavaScript文件地址。The JavaScript file URL
 * @param {boolean} isCrossOrigin - 是否跨域。Whether it's cross-origin
 * @returns {Promise<any>} JavaScript加载完成后的Promise。Promise that resolves when JavaScript loading is complete
 * @example
 * loadScript('https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js').then(()=>{
 *   // use echart api
 *   echarts.init(document.getElementById('main'));
 * })
 */
export declare function loadScript(url: string, isCrossOrigin?: boolean): Promise<unknown>;
/**
 * @function loadScriptList
 * @description 动态加载JavaScript文件列表。Dynamically loads a list of JavaScript files
 * @param {string[]} urls - JavaScript文件地址列表。List of JavaScript file URLs
 * @param {boolean} isCrossOrigin - 是否跨域。Whether it's cross-origin
 * @param {boolean} isAsync - 是否异步加载。Whether to load asynchronously
 * @returns {Promise<any[]>} JavaScript加载完成后的Promise数组。Promise array that resolves when JavaScript loading is complete
 * @example
 * loadScriptList(['a.js', 'b.js', 'c.js']).then(() => {
 *   // use a.js, b.js, c.js
 * })
 */
export declare function loadScriptList(urls: string[], isCrossOrigin?: boolean, isAsync?: boolean): Promise<void> | Promise<unknown[]>;
/**
 * @function loadCss
 * @description 动态加载css
 * @param {string} url css地址
 * @returns {Promise<void>} css加载完成后的回调
 * @example
 * loadCss('a.css').then(() => {
 *   // use bootstrap css
 * }
 */
export declare function loadCss(cssPath: string): Promise<unknown>;
/**
 * @function loadCssList
 * @description 动态加载css列表
 * @param {string[]} cssList css地址列表
 * @returns {Promise<any>} css加载完成后的回调
 * @example
 * loadCssList(['a.css', 'b.css', 'c.css']).then(() => {
 *   // use a.css, b.css, c.css
 * }
 */
export declare function loadCssList(cssList: string[]): Promise<any>;
/**
 * @function loadImage
 * @description 动态加载图片资源（常用于预加载）
 * @param {string} imgUrl 图片地址
 * @returns {Promise<HTMLImageElement>} 图片加载完成后的回调
 * @example
 * loadImage('a.png').then(img => {
 *   // use img
 * }
 */
export declare function loadImage(imgUrl: string): Promise<unknown>;
/**
 * @function loadImageList
 * @description 动态加载图片资源列表（常用于预加载）
 * @param {string[]} imageUrls 图片地址列表
 * @returns {Promise<HTMLImageElement[]>}   图片加载完成后的回调
 * @example
 * loadImageList(['a.png', 'b.png', 'c.png']).then(imgs => {
 *   // use imgs
 * }
 */
export declare function loadImageList(imageUrls: string[]): Promise<unknown[]>;
/**
 * @function loadCsv
 * @description 前端下载csv数据表(可以配置utils里arrayToCSV)
 * @param {string} csvStr csv字符串
 * @param {string} name 文件名
 * @param {string} type 文件类型
 */
export declare function loadCSV(csvStr: string, name?: string, type?: string): void;
