"use strict";
/**
 * @module Data
 * @description Data processing utilities for Node.js
 * @author Wayne
 * @Date 2025-01-18
 * @LastEditTime 2025-11-18 10:25:41
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupData = exports.convertFormat = exports.parseXML = exports.stringifyXML = exports.stringifyCSV = exports.arrayToCSV = exports.parseCSV = void 0;
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
function parseCSV(csv, delimiter) {
    if (delimiter === void 0) { delimiter = ','; }
    var lines = csv.split('\n').filter(function (line) { return line.trim(); });
    return lines.map(function (line) {
        var values = [];
        var current = '';
        var inQuotes = false;
        for (var i = 0; i < line.length; i++) {
            var char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            }
            else if (char === delimiter && !inQuotes) {
                values.push(current.trim());
                current = '';
            }
            else {
                current += char;
            }
        }
        values.push(current.trim());
        return values;
    });
}
exports.parseCSV = parseCSV;
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
function arrayToCSV(data, delimiter) {
    if (delimiter === void 0) { delimiter = ','; }
    return data
        .map(function (row) {
        return row
            .map(function (cell) {
            var cellStr = String(cell);
            // Escape quotes and wrap in quotes if contains delimiter, quote, or newline
            if (cellStr.includes(delimiter) || cellStr.includes('"') || cellStr.includes('\n')) {
                return "\"".concat(cellStr.replace(/"/g, '""'), "\"");
            }
            return cellStr;
        })
            .join(delimiter);
    })
        .join('\n');
}
exports.arrayToCSV = arrayToCSV;
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
function stringifyCSV(data, delimiter) {
    if (delimiter === void 0) { delimiter = ','; }
    if (!data.length)
        return '';
    var headers = Object.keys(data[0]);
    var rows = data.map(function (row) { return headers.map(function (header) { return row[header]; }); });
    return arrayToCSV(__spreadArray([headers], __read(rows), false), delimiter);
}
exports.stringifyCSV = stringifyCSV;
var escapeXML = function (value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};
var buildXML = function (key, value) {
    if (Array.isArray(value)) {
        return value.map(function (item) { return buildXML(key, item); }).join('');
    }
    if (value && typeof value === 'object') {
        var inner = Object.entries(value)
            .map(function (_a) {
            var _b = __read(_a, 2), childKey = _b[0], childValue = _b[1];
            return buildXML(childKey, childValue);
        })
            .join('');
        return "<".concat(key, ">").concat(inner, "</").concat(key, ">");
    }
    var text = value === undefined || value === null ? '' : escapeXML(String(value));
    return "<".concat(key, ">").concat(text, "</").concat(key, ">");
};
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
function stringifyXML(data, rootName) {
    if (rootName === void 0) { rootName = 'root'; }
    var inner = Array.isArray(data)
        ? data.map(function (item) { return buildXML('item', item); }).join('')
        : Object.entries(data).map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return buildXML(key, value);
        }).join('');
    return "<".concat(rootName, ">").concat(inner, "</").concat(rootName, ">");
}
exports.stringifyXML = stringifyXML;
/**
 * @function parseXML
 * @description 简单的XML解析器(需要DOMParser)。Simple XML parser (requires DOMParser)
 * @param {string} xmlString - XML字符串。XML string
 * @returns {object} 解析后的对象。Parsed object
 * @example
 * const xml = '<root><item>value</item></root>';
 * const data = parseXML(xml);
 */
function parseXML(xmlString) {
    // This is a simplified version for Node.js
    // For production use, consider using libraries like xml2js or fast-xml-parser
    var result = {};
    // Remove XML declaration and comments
    var cleaned = xmlString.replace(/<\?xml[^?]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '');
    // Simple tag matching (does not handle all XML features)
    var tagRegex = /<([a-zA-Z0-9]+)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g;
    var match;
    while ((match = tagRegex.exec(cleaned)) !== null) {
        var tagName = match[1];
        var content = match[2].trim();
        // Check if content contains nested tags
        if (/<[a-zA-Z0-9]+/.test(content)) {
            result[tagName] = parseXML(content);
        }
        else {
            result[tagName] = content;
        }
    }
    return result;
}
exports.parseXML = parseXML;
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
function convertFormat(data, fromFormat, toFormat) {
    if (fromFormat === 'csv' && toFormat === 'json') {
        var rows = parseCSV(data);
        if (rows.length === 0)
            return [];
        var headers_1 = rows[0];
        return rows.slice(1).map(function (row) {
            var obj = {};
            headers_1.forEach(function (header, index) {
                obj[header] = row[index];
            });
            return obj;
        });
    }
    if (fromFormat === 'json' && toFormat === 'csv') {
        var jsonData = Array.isArray(data) ? data : [data];
        if (jsonData.length === 0)
            return '';
        var headers_2 = Object.keys(jsonData[0]);
        var rows = jsonData.map(function (obj) { return headers_2.map(function (header) { return obj[header]; }); });
        return arrayToCSV(__spreadArray([headers_2], __read(rows), false));
    }
    if (fromFormat === 'json' && toFormat === 'xml') {
        return stringifyXML(data);
    }
    if (fromFormat === 'xml' && toFormat === 'json') {
        return parseXML(data);
    }
    if (fromFormat === 'csv' && toFormat === 'xml') {
        var jsonData = convertFormat(data, 'csv', 'json');
        return stringifyXML(jsonData);
    }
    if (fromFormat === 'xml' && toFormat === 'csv') {
        var jsonData = parseXML(data);
        var arrayData = Array.isArray(jsonData) ? jsonData : [jsonData];
        return stringifyCSV(arrayData);
    }
    throw new Error("Unsupported conversion: ".concat(fromFormat, " to ").concat(toFormat));
}
exports.convertFormat = convertFormat;
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
function groupData(data, key) {
    return data.reduce(function (acc, item) {
        var groupKey = item[key];
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {});
}
exports.groupData = groupData;
