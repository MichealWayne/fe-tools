/**
 * @module Data
 * @description Data processing utilities for Node.js
 * @author Wayne
 * @Date 2025-01-18
 * @LastEditTime 2025-11-18 10:25:41
 */
/**
 * @function parseCSV
 * @description 解析CSV字符串为二维数组。Parses CSV string to 2D array
 * @param {string} csv - CSV字符串。CSV string
 * @param {string} delimiter - 分隔符(默认: ',')。Delimiter (default: ',')
 * @returns {string[][]} 二维数组。2D array
 * @example
 * const csv = 'name,age,city\nJohn,25,NYC\nJane,30,LA';
 * const data = parseCSV(csv);
 * // -> [['name', 'age', 'city'], ['John', '25', 'NYC'], ['Jane', '30', 'LA']]
 */
export declare function parseCSV(csv: string, delimiter?: string): string[][];
/**
 * @function arrayToCSV
 * @description 将二维数组转换为CSV字符串。Converts 2D array to CSV string
 * @param {any[][]} data - 二维数组。2D array
 * @param {string} delimiter - 分隔符(默认: ',')。Delimiter (default: ',')
 * @returns {string} CSV字符串。CSV string
 * @example
 * const data = [['name', 'age'], ['John', 25], ['Jane', 30]];
 * const csv = arrayToCSV(data);
 * // -> 'name,age\nJohn,25\nJane,30'
 */
export declare function arrayToCSV(data: any[][], delimiter?: string): string;
/**
 * @function stringifyCSV
 * @description 将对象数组转换为CSV字符串。Converts an array of objects to CSV string
 * @param {Record<string, unknown>[]} data - 对象数组。Array of objects
 * @param {string} delimiter - 分隔符(默认: ',')。Delimiter (default: ',')
 * @returns {string} CSV字符串。CSV string
 * @example
 * const data = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];
 * const csv = stringifyCSV(data);
 * // -> 'name,age\nJohn,25\nJane,30'
 *
 * @example
 * const data = [{ id: 1, active: true }];
 * stringifyCSV(data, ';');
 * // -> 'id;active\n1;true'
 */
export declare function stringifyCSV(data: Record<string, unknown>[], delimiter?: string): string;
/**
 * @function stringifyXML
 * @description 将对象转换为XML字符串。Converts an object to XML string
 * @param {Record<string, unknown> | unknown[]} data - 输入对象或数组。Input object or array
 * @param {string} [rootName='root'] - 根节点名称。Root node name
 * @returns {string} XML字符串。XML string
 * @example
 * const xml = stringifyXML({ name: 'John', age: 25 });
 * // -> '<root><name>John</name><age>25</age></root>'
 *
 * @example
 * const xml = stringifyXML([{ id: 1 }, { id: 2 }], 'items');
 * // -> '<items><item><id>1</id></item><item><id>2</id></item></items>'
 */
export declare function stringifyXML(data: Record<string, unknown> | unknown[], rootName?: string): string;
/**
 * @function parseXML
 * @description 简单的XML解析器(需要DOMParser)。Simple XML parser (requires DOMParser)
 * @param {string} xmlString - XML字符串。XML string
 * @returns {object} 解析后的对象。Parsed object
 * @example
 * const xml = '<root><item>value</item></root>';
 * const data = parseXML(xml);
 */
export declare function parseXML(xmlString: string): any;
/**
 * @function convertFormat
 * @description 转换数据格式(CSV/JSON/XML)。Converts data format (CSV/JSON/XML)
 * @param {string | object} data - 输入数据。Input data
 * @param {string} fromFormat - 源格式('csv'|'json'|'xml')。Source format ('csv'|'json'|'xml')
 * @param {string} toFormat - 目标格式('csv'|'json'|'xml')。Target format ('csv'|'json'|'xml')
 * @returns {string | object} 转换后的数据。Converted data
 * @example
 * // CSV to JSON
 * const csv = 'name,age\nJohn,25\nJane,30';
 * const json = convertFormat(csv, 'csv', 'json');
 * // -> [{ name: 'John', age: '25' }, { name: 'Jane', age: '30' }]
 *
 * // JSON to CSV
 * const data = [{ name: 'John', age: 25 }];
 * const csvOutput = convertFormat(data, 'json', 'csv');
 * // -> 'name,age\nJohn,25'
 *
 * @example
 * // JSON to XML
 * const xml = convertFormat({ name: 'John' }, 'json', 'xml');
 * // -> '<root><name>John</name></root>'
 */
export declare function convertFormat(data: any, fromFormat: string, toFormat: string): any;
/**
 * @function groupData
 * @description 对数据数组进行分组。Groups data array
 * @param {any[]} data - 数据数组。Data array
 * @param {string} key - 分组键。Grouping key
 * @returns {object} 分组后的对象。Grouped object
 * @example
 * const users = [
 *   { name: 'John', city: 'NYC' },
 *   { name: 'Jane', city: 'LA' },
 *   { name: 'Bob', city: 'NYC' }
 * ];
 * groupData(users, 'city');
 * // -> { NYC: [{...}, {...}], LA: [{...}] }
 */
export declare function groupData(data: any[], key: string): Record<string, any[]>;
