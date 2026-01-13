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
