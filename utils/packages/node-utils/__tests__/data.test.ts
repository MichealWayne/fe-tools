import {
  parseCSV,
  arrayToCSV,
  stringifyCSV,
  stringifyXML,
  parseXML,
  convertFormat,
  groupData,
} from '../src/data';

describe('data utils', () => {
  it('parseCSV should parse rows', () => {
    const csv = 'name,age\nJohn,25\nJane,30';
    expect(parseCSV(csv)).toEqual([
      ['name', 'age'],
      ['John', '25'],
      ['Jane', '30'],
    ]);
  });

  it('arrayToCSV should escape values', () => {
    const data = [['name', 'note'], ['John', 'a,b'], ['Jane', 'c"d']];
    expect(arrayToCSV(data)).toBe('name,note\nJohn,"a,b"\nJane,"c""d"');
  });

  it('arrayToCSV should preserve a single empty field when parsed again', () => {
    const csv = arrayToCSV([['']]);
    expect(csv).toBe('""');
    expect(parseCSV(csv)).toEqual([['']]);
  });

  it('parseCSV should round-trip escaped quotes, CRLF, and quoted newlines', () => {
    const csv = 'name,note\r\nJane,"a, ""quoted""\r\nline"';
    expect(parseCSV(csv)).toEqual([['name', 'note'], ['Jane', 'a, "quoted"\r\nline']]);
    expect(parseCSV(arrayToCSV([['note'], ['a "quote"']]))).toEqual([
      ['note'],
      ['a "quote"'],
    ]);
  });

  it('arrayToCSV should quote bare carriage returns for round trips', () => {
    const data = [['note'], ['before\rafter']];
    expect(parseCSV(arrayToCSV(data))).toEqual(data);
  });

  it('parseCSV should reject unterminated quoted fields', () => {
    expect(() => parseCSV('name,note\nJane,"unfinished')).toThrow(SyntaxError);
  });

  it('parseCSV should preserve a quoted empty single-field record and drop blank records', () => {
    expect(parseCSV('""')).toEqual([['']]);
    expect(parseCSV('\n')).toEqual([]);
    expect(parseCSV('')).toEqual([]);
  });

  it('stringifyCSV should build header rows', () => {
    const data = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }];
    expect(stringifyCSV(data)).toBe('name,age\nJohn,25\nJane,30');
  });

  it('stringifyXML should build XML with root', () => {
    const xml = stringifyXML({ name: 'John', age: 25 }, 'person');
    expect(xml).toBe('<person><name>John</name><age>25</age></person>');
  });

  it('parseXML should parse simple XML', () => {
    const xml = '<root><item>value</item></root>';
    expect(parseXML(xml)).toEqual({ root: { item: 'value' } });
  });

  it('parseXML should allow greater-than characters inside quoted attribute values', () => {
    expect(parseXML('<root title="a > b"/>')).toEqual({
      root: { '@attributes': { title: 'a > b' } },
    });
  });

  it('parseXML should skip a DOCTYPE with an internal subset', () => {
    expect(parseXML('<!DOCTYPE root [<!ELEMENT root (#PCDATA)>]><root/>')).toEqual({
      root: '',
    });
  });

  it('parseXML should preserve order in mixed text and child content', () => {
    expect(parseXML('<p>before<b/>after</p>')).toEqual({
      p: {
        b: '',
        '#text': 'beforeafter',
        '#content': [
          { type: 'text', value: 'before' },
          { type: 'element', name: 'b', value: '' },
          { type: 'text', value: 'after' },
        ],
      },
    });
  });

  it('parseXML should reuse nested child values in mixed content', () => {
    const parsed = parseXML('<a>before<b>inside<c>deep</c></b>after</a>');
    expect(parsed).toEqual({
      a: {
        b: {
          c: 'deep',
          '#text': 'inside',
          '#content': [
            { type: 'text', value: 'inside' },
            { type: 'element', name: 'c', value: 'deep' },
          ],
        },
        '#text': 'beforeafter',
        '#content': [
          { type: 'text', value: 'before' },
          {
            type: 'element',
            name: 'b',
            value: {
              c: 'deep',
              '#text': 'inside',
              '#content': [
                { type: 'text', value: 'inside' },
                { type: 'element', name: 'c', value: 'deep' },
              ],
            },
          },
          { type: 'text', value: 'after' },
        ],
      },
    });
  });

  it('parseXML should preserve nested and repeated elements, attributes, and entities', () => {
    const xml = '<root id="main"><item><item>A &amp; B</item></item><item>second</item></root>';
    expect(parseXML(xml)).toEqual({
      root: {
        '@attributes': { id: 'main' },
        item: [{ item: 'A & B' }, 'second'],
      },
    });
  });

  it('parseXML should reject mismatched or incomplete tags', () => {
    expect(() => parseXML('<root><item></root>')).toThrow(SyntaxError);
    expect(() => parseXML('<root><item>value</item>')).toThrow(SyntaxError);
  });

  it('convertFormat should convert CSV to JSON', () => {
    const csv = 'name,age\nJohn,25';
    expect(convertFormat(csv, 'csv', 'json')).toEqual([{ name: 'John', age: '25' }]);
  });

  it('convertFormat should convert JSON to XML', () => {
    const xml = convertFormat({ name: 'John' }, 'json', 'xml');
    expect(xml).toBe('<root><name>John</name></root>');
  });

  it('groupData should group by key', () => {
    const users = [
      { name: 'John', city: 'NYC' },
      { name: 'Jane', city: 'LA' },
      { name: 'Bob', city: 'NYC' },
    ];
    expect(groupData(users, 'city')).toEqual({
      NYC: [
        { name: 'John', city: 'NYC' },
        { name: 'Bob', city: 'NYC' },
      ],
      LA: [{ name: 'Jane', city: 'LA' }],
    });
  });
});
