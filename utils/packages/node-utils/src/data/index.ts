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
export function parseCSV(csv: string, delimiter = ','): string[][] {
  const lines = csv.split('\n').filter(line => line.trim());
  return lines.map(line => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    values.push(current.trim());
    return values;
  });
}

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
export function arrayToCSV(data: any[][], delimiter = ','): string {
  return data
    .map(row =>
      row
        .map(cell => {
          const cellStr = String(cell);
          // Escape quotes and wrap in quotes if contains delimiter, quote, or newline
          if (cellStr.includes(delimiter) || cellStr.includes('"') || cellStr.includes('\n')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        })
        .join(delimiter)
    )
    .join('\n');
}

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
export function stringifyCSV(data: Record<string, unknown>[], delimiter = ','): string {
  if (!data.length) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]));
  return arrayToCSV([headers, ...rows], delimiter);
}

const escapeXML = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const buildXML = (key: string, value: unknown): string => {
  if (Array.isArray(value)) {
    return value.map(item => buildXML(key, item)).join('');
  }
  if (value && typeof value === 'object') {
    const inner = Object.entries(value as Record<string, unknown>)
      .map(([childKey, childValue]) => buildXML(childKey, childValue))
      .join('');
    return `<${key}>${inner}</${key}>`;
  }
  const text = value === undefined || value === null ? '' : escapeXML(String(value));
  return `<${key}>${text}</${key}>`;
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
export function stringifyXML(
  data: Record<string, unknown> | unknown[],
  rootName = 'root'
): string {
  const inner = Array.isArray(data)
    ? data.map(item => buildXML('item', item)).join('')
    : Object.entries(data).map(([key, value]) => buildXML(key, value)).join('');
  return `<${rootName}>${inner}</${rootName}>`;
}

/**
 * @function parseXML
 * @description 简单的XML解析器(需要DOMParser)。Simple XML parser (requires DOMParser)
 * @param {string} xmlString - XML字符串。XML string
 * @returns {object} 解析后的对象。Parsed object
 * @example
 * const xml = '<root><item>value</item></root>';
 * const data = parseXML(xml);
 */
export function parseXML(xmlString: string): any {
  // This is a simplified version for Node.js
  // For production use, consider using libraries like xml2js or fast-xml-parser
  const result: any = {};

  // Remove XML declaration and comments
  const cleaned = xmlString.replace(/<\?xml[^?]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '');

  // Simple tag matching (does not handle all XML features)
  const tagRegex = /<([a-zA-Z0-9]+)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g;
  let match;

  while ((match = tagRegex.exec(cleaned)) !== null) {
    const tagName = match[1];
    const content = match[2].trim();

    // Check if content contains nested tags
    if (/<[a-zA-Z0-9]+/.test(content)) {
      result[tagName] = parseXML(content);
    } else {
      result[tagName] = content;
    }
  }

  return result;
}

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
export function convertFormat(data: any, fromFormat: string, toFormat: string): any {
  if (fromFormat === 'csv' && toFormat === 'json') {
    const rows = parseCSV(data as string);
    if (rows.length === 0) return [];

    const headers = rows[0];
    return rows.slice(1).map(row => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
  }

  if (fromFormat === 'json' && toFormat === 'csv') {
    const jsonData = Array.isArray(data) ? data : [data];
    if (jsonData.length === 0) return '';

    const headers = Object.keys(jsonData[0]);
    const rows = jsonData.map(obj => headers.map(header => obj[header]));
    return arrayToCSV([headers, ...rows]);
  }

  if (fromFormat === 'json' && toFormat === 'xml') {
    return stringifyXML(data as Record<string, unknown>);
  }

  if (fromFormat === 'xml' && toFormat === 'json') {
    return parseXML(data as string);
  }

  if (fromFormat === 'csv' && toFormat === 'xml') {
    const jsonData = convertFormat(data, 'csv', 'json');
    return stringifyXML(jsonData as Record<string, unknown>[]);
  }

  if (fromFormat === 'xml' && toFormat === 'csv') {
    const jsonData = parseXML(data as string);
    const arrayData = Array.isArray(jsonData) ? jsonData : [jsonData];
    return stringifyCSV(arrayData as Record<string, unknown>[]);
  }

  throw new Error(`Unsupported conversion: ${fromFormat} to ${toFormat}`);
}

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
export function groupData(data: any[], key: string): Record<string, any[]> {
  return data.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}
