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
 * @param {string} delimiter - 单字符分隔符(默认: ',')。Single-character delimiter (default: ',')
 * @returns {string[][]} 二维数组。2D array
 * @remarks 支持单字符分隔符、双引号转义、CRLF 和引号内换行；字段会 trim，纯空白记录会被丢弃。This parser supports a single-character delimiter, escaped double quotes, CRLF, and newlines inside quoted fields. Fields are trimmed and blank records are discarded, while a quoted empty field is preserved.
 * @example
 * ```ts
 * const csv = 'name,age,city\nJohn,25,NYC\nJane,30,LA';
 * const data = parseCSV(csv);
 * // -> [['name', 'age', 'city'], ['John', '25', 'NYC'], ['Jane', '30', 'LA']]
 * ```
 */
export function parseCSV(csv: string, delimiter = ','): string[][] {
  if (delimiter.length !== 1 || delimiter === '"' || /[\r\n]/.test(delimiter)) {
    throw new TypeError('CSV delimiter must be a single non-quote character');
  }

  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let rowHasQuotedField = false;

  const pushField = () => {
    row.push(field.trim());
    field = '';
  };
  const pushRow = () => {
    pushField();
    if (row.length > 1 || row.some(value => value.length > 0) || rowHasQuotedField) rows.push(row);
    row = [];
    rowHasQuotedField = false;
  };

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      if (inQuotes && csv[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        if (!inQuotes) rowHasQuotedField = true;
        inQuotes = !inQuotes;
      }
    } else if (!inQuotes && char === delimiter) {
      pushField();
    } else if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && csv[i + 1] === '\n') i++;
      pushRow();
    } else {
      field += char;
    }
  }

  if (inQuotes) throw new SyntaxError('CSV contains an unterminated quoted field');
  if (field.length > 0 || row.length > 0 || rowHasQuotedField) pushRow();
  return rows;
}

/**
 * @function arrayToCSV
 * @description 将二维数组转换为CSV字符串。Converts 2D array to CSV string
 * @param {any[][]} data - 二维数组。2D array
 * @param {string} delimiter - 分隔符(默认: ',')。Delimiter (default: ',')
 * @returns {string} CSV字符串。CSV string
 * @example
 * ```ts
 * const data = [['name', 'age'], ['John', 25], ['Jane', 30]];
 * const csv = arrayToCSV(data);
 * // -> 'name,age\nJohn,25\nJane,30'
 * ```
 */
export function arrayToCSV(data: any[][], delimiter = ','): string {
  return data
    .map(row =>
      row
        .map(cell => {
          const cellStr = String(cell);
          // Escape quotes and wrap in quotes if contains delimiter, quote, or newline
          if (
            cellStr.length === 0 ||
            cellStr.includes(delimiter) ||
            cellStr.includes('"') ||
            cellStr.includes('\r') ||
            cellStr.includes('\n')
          ) {
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
 * ```ts
 * const data = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];
 * const csv = stringifyCSV(data);
 * // -> 'name,age\nJohn,25\nJane,30'
 *
 * ```
 * @example
 * ```ts
 * const data = [{ id: 1, active: true }];
 * stringifyCSV(data, ';');
 * // -> 'id;active\n1;true'
 * ```
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
 * ```ts
 * const xml = stringifyXML({ name: 'John', age: 25 });
 * // -> '<root><name>John</name><age>25</age></root>'
 *
 * ```
 * @example
 * ```ts
 * const xml = stringifyXML([{ id: 1 }, { id: 2 }], 'items');
 * // -> '<items><item><id>1</id></item><item><id>2</id></item></items>'
 * ```
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
 * @description 解析基础 XML 元素、属性、重复子节点和实体引用。Parses basic XML elements, attributes, repeated children, and entity references.
 * @param {string} xmlString - XML字符串。XML string
 * @returns {object} 以根元素名为键的对象；属性放在`@attributes`，混合文本放在`#text`和有序的`#content`。Object keyed by the root element name; attributes use `@attributes`, and mixed text uses `#text` plus ordered `#content`.
 * @remarks 支持普通元素、属性、注释、处理指令、CDATA 和预定义/数字实体；不解析 DTD 或自定义实体。Repeated child elements are returned as arrays. DTDs and custom entities are not resolved.
 * @example
 * ```ts
 * const xml = '<root><item>value</item></root>';
 * const data = parseXML(xml);
 * ```
 */
export function parseXML(xmlString: string): any {
  type XmlNode = {
    name: string;
    attributes: Record<string, string>;
    children: XmlNode[];
    text: string;
    content: Array<{ type: 'text'; value: string } | { type: 'element'; node: XmlNode }>;
  };
  const appendText = (node: XmlNode, value: string) => {
    node.text += value;
    const lastContent = node.content[node.content.length - 1];
    if (lastContent?.type === 'text') lastContent.value += value;
    else node.content.push({ type: 'text', value });
  };
  const findDoctypeEnd = (xml: string, start: number): number => {
    let bracketDepth = 0;
    let quote = '';
    let inComment = false;

    for (let index = start + 9; index < xml.length; index++) {
      if (inComment) {
        if (xml.startsWith('-->', index)) {
          inComment = false;
          index += 2;
        }
        continue;
      }

      const char = xml[index];
      if (quote) {
        if (char === quote) quote = '';
      } else if (xml.startsWith('<!--', index)) {
        inComment = true;
        index += 3;
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === '[') {
        bracketDepth++;
      } else if (char === ']' && bracketDepth > 0) {
        bracketDepth--;
      } else if (char === '>' && bracketDepth === 0) {
        return index + 1;
      }
    }

    return -1;
  };
  const setOwnValue = (target: Record<string, unknown>, key: string, value: unknown) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    });
  };

  const decodeEntities = (value: string): string =>
    value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, name: string) => {
      if (name[0] !== '#') {
        const entities: Record<string, string> = {
          amp: '&',
          lt: '<',
          gt: '>',
          quot: '"',
          apos: "'",
        };
        return entities[name.toLowerCase()];
      }
      const codePoint = name[1].toLowerCase() === 'x'
        ? Number.parseInt(name.slice(2), 16)
        : Number.parseInt(name.slice(1), 10);
      return codePoint >= 0 && codePoint <= 0x10ffff && !(codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? String.fromCodePoint(codePoint)
        : entity;
    });

  const rootNodes: XmlNode[] = [];
  const stack: XmlNode[] = [];
  const tokens = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[[\s\S]*?\]\]>|<(?:[^>"']|"[^"]*"|'[^']*')*>|[^<]+/gi;
  let consumed = 0;
  let match: RegExpExecArray | null;

  while (consumed < xmlString.length) {
    if (/^<!DOCTYPE\b/i.test(xmlString.slice(consumed))) {
      const doctypeEnd = findDoctypeEnd(xmlString, consumed);
      if (doctypeEnd < 0) throw new SyntaxError('Unterminated XML DOCTYPE');
      consumed = doctypeEnd;
      tokens.lastIndex = consumed;
      continue;
    }

    match = tokens.exec(xmlString);
    if (!match) break;
    if (match.index !== consumed) throw new SyntaxError('Invalid XML markup');
    consumed = tokens.lastIndex;
    const token = match[0];

    if (token.startsWith('<!--') || token.startsWith('<?')) continue;
    if (token.startsWith('<![CDATA[')) {
      if (!stack.length) throw new SyntaxError('CDATA must be inside the root element');
      appendText(stack[stack.length - 1], token.slice(9, -3));
      continue;
    }
    if (token.startsWith('</')) {
      const closingName = token.slice(2, -1).trim();
      const current = stack.pop();
      if (!current || current.name !== closingName) {
        throw new SyntaxError(`Mismatched XML closing tag: ${closingName}`);
      }
      continue;
    }
    if (token.startsWith('<')) {
      const opening = token.match(/^<([A-Za-z_][\w:.-]*)([\s\S]*?)>$/);
      if (!opening) throw new SyntaxError('Invalid XML opening tag');
      const name = opening[1];
      const selfClosing = /\/\s*>$/.test(token);
      const attributeText = opening[2].replace(/\/\s*$/, '').trim();
      const attributes: Record<string, string> = {};
      const attributePattern = /([A-Za-z_][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
      let attributeMatch: RegExpExecArray | null;
      while ((attributeMatch = attributePattern.exec(attributeText)) !== null) {
        setOwnValue(
          attributes,
          attributeMatch[1],
          decodeEntities(attributeMatch[2] ?? attributeMatch[3] ?? '')
        );
      }
      if (attributeText.replace(attributePattern, '').trim()) {
        throw new SyntaxError(`Invalid XML attributes on <${name}>`);
      }

      const node: XmlNode = { name, attributes, children: [], text: '', content: [] };
      const parent = stack[stack.length - 1];
      if (parent) {
        parent.children.push(node);
        parent.content.push({ type: 'element', node });
      }
      else rootNodes.push(node);
      if (!selfClosing) stack.push(node);
      continue;
    }

    if (stack.length) appendText(stack[stack.length - 1], decodeEntities(token));
    else if (token.trim()) throw new SyntaxError('Text must be inside the root element');
  }

  if (consumed !== xmlString.length || stack.length || rootNodes.length !== 1) {
    throw new SyntaxError('XML must contain one complete root element');
  }

  const toValue = (node: XmlNode): unknown => {
    const output: Record<string, unknown> = {};
    const childValues = new Map<XmlNode, unknown>();
    if (Object.keys(node.attributes).length) output['@attributes'] = node.attributes;
    node.children.forEach(child => {
      const value = toValue(child);
      childValues.set(child, value);
      if (Object.prototype.hasOwnProperty.call(output, child.name)) {
        const existing = output[child.name];
        setOwnValue(output, child.name, Array.isArray(existing) ? [...existing, value] : [existing, value]);
      } else {
        setOwnValue(output, child.name, value);
      }
    });
    const text = node.text.trim();
    if (node.children.length) {
      if (text) output['#text'] = text;
      if (node.content.some(content => content.type === 'text' && content.value.length > 0)) {
        output['#content'] = node.content.map(content =>
          content.type === 'text'
            ? { type: 'text', value: content.value }
            : { type: 'element', name: content.node.name, value: childValues.get(content.node) }
        );
      }
    } else if (!Object.keys(node.attributes).length) return text;
    else if (text) output['#text'] = text;
    return output;
  };

  const root = rootNodes[0];
  return { [root.name]: toValue(root) };
}

/**
 * @function convertFormat
 * @description 转换数据格式(CSV/JSON/XML)。Converts data format (CSV/JSON/XML)
 * @param {string | object} data - 输入数据。Input data
 * @param {string} fromFormat - 源格式('csv'|'json'|'xml')。Source format ('csv'|'json'|'xml')
 * @param {string} toFormat - 目标格式('csv'|'json'|'xml')。Target format ('csv'|'json'|'xml')
 * @returns {string | object} 转换后的数据。Converted data
 * @example
 * ```ts
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
 * ```
 * @example
 * ```ts
 * // JSON to XML
 * const xml = convertFormat({ name: 'John' }, 'json', 'xml');
 * // -> '<root><name>John</name></root>'
 * ```
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
 * ```ts
 * const users = [
 *   { name: 'John', city: 'NYC' },
 *   { name: 'Jane', city: 'LA' },
 *   { name: 'Bob', city: 'NYC' }
 * ];
 * groupData(users, 'city');
 * // -> { NYC: [{...}, {...}], LA: [{...}] }
 * ```
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
