/**
 * JSON utilities test
 */
import {
  safeJSONParse,
  flattenJSON,
  unflattenJSON,
  compareJSON,
  mergeJSON,
  cloneJSON,
} from '../src/json';

describe('json test', () => {
  describe('safeJSONParse', () => {
    it('should parse valid JSON strings', () => {
      expect(safeJSONParse('{"name": "John"}')).toEqual({ name: 'John' });
      expect(safeJSONParse('[1, 2, 3]')).toEqual([1, 2, 3]);
      expect(safeJSONParse('true')).toBe(true);
      expect(safeJSONParse('null')).toBe(null);
    });

    it('should return default value for invalid JSON', () => {
      expect(safeJSONParse('invalid', { default: true })).toEqual({ default: true });
      expect(safeJSONParse('{invalid}', [])).toEqual([]);
      expect(safeJSONParse('', null)).toBe(null);
    });

    it('should use null as default when not specified', () => {
      expect(safeJSONParse('invalid')).toBeNull();
    });
  });

  describe('cloneJSON', () => {
    it('should deep clone objects', () => {
      const original = { name: 'John', address: { city: 'NYC' } };
      const cloned = cloneJSON(original);
      cloned.address.city = 'LA';
      expect(original.address.city).toBe('NYC');
      expect(cloned.address.city).toBe('LA');
    });

    it('should clone arrays', () => {
      const original = [1, 2, { a: 3 }];
      const cloned = cloneJSON(original);
      (cloned[2] as any).a = 4;
      expect((original[2] as any).a).toBe(3);
    });

    it('should handle nested structures', () => {
      const original = {
        users: [{ name: 'John', tags: ['a', 'b'] }],
      };
      const cloned = cloneJSON(original);
      cloned.users[0].tags.push('c');
      expect(original.users[0].tags).toEqual(['a', 'b']);
      expect(cloned.users[0].tags).toEqual(['a', 'b', 'c']);
    });
  });

  describe('flattenJSON', () => {
    it('should flatten nested objects', () => {
      const nested = {
        user: {
          name: 'John',
          address: {
            city: 'NYC',
            zip: '10001',
          },
        },
      };
      const flattened = flattenJSON(nested);
      expect(flattened).toEqual({
        'user.name': 'John',
        'user.address.city': 'NYC',
        'user.address.zip': '10001',
      });
    });

    it('should handle arrays as values', () => {
      const obj = {
        items: [1, 2, 3],
      };
      const flattened = flattenJSON(obj);
      expect(flattened).toEqual({
        items: [1, 2, 3],
      });
    });

    it('should handle empty objects', () => {
      expect(flattenJSON({})).toEqual({});
    });

    it('should handle primitive values', () => {
      const obj = { name: 'John', age: 30, active: true };
      expect(flattenJSON(obj)).toEqual({
        name: 'John',
        age: 30,
        active: true,
      });
    });
  });

  describe('unflattenJSON', () => {
    it('should unflatten objects', () => {
      const flattened = {
        'user.name': 'John',
        'user.address.city': 'NYC',
        'user.address.zip': '10001',
      };
      const unflattened = unflattenJSON(flattened);
      expect(unflattened).toEqual({
        user: {
          name: 'John',
          address: {
            city: 'NYC',
            zip: '10001',
          },
        },
      });
    });

    it('should handle empty objects', () => {
      expect(unflattenJSON({})).toEqual({});
    });

    it('should handle simple keys', () => {
      const flattened = { name: 'John', age: 30 };
      expect(unflattenJSON(flattened)).toEqual({ name: 'John', age: 30 });
    });
  });

  describe('compareJSON', () => {
    it('should return empty object for equal objects', () => {
      const obj1 = { name: 'John', age: 30 };
      const obj2 = { name: 'John', age: 30 };
      expect(compareJSON(obj1, obj2)).toEqual({});
    });

    it('should return differences for different objects', () => {
      const obj1 = { name: 'John', age: 30 };
      const obj2 = { name: 'Jane', age: 30 };
      const diff = compareJSON(obj1, obj2);
      expect(diff.name).toEqual({ old: 'John', new: 'Jane' });
    });

    it('should detect nested differences', () => {
      const obj1 = { user: { name: 'John', age: 30 } };
      const obj2 = { user: { name: 'John', age: 31 } };
      const diff = compareJSON(obj1, obj2);
      expect(diff['user.age']).toEqual({ old: 30, new: 31 });
    });

    it('should detect added and removed keys', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, c: 3 };
      const diff = compareJSON(obj1, obj2);
      expect(diff.b).toEqual({ old: 2, new: undefined });
      expect(diff.c).toEqual({ old: undefined, new: 3 });
    });
  });

  describe('mergeJSON', () => {
    it('should merge simple objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { c: 3 };
      expect(mergeJSON(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should deeply merge nested objects', () => {
      const obj1 = { user: { name: 'John', age: 30 } };
      const obj2 = { user: { city: 'NYC' } };
      expect(mergeJSON(obj1, obj2)).toEqual({
        user: { name: 'John', age: 30, city: 'NYC' },
      });
    });

    it('should override primitive values', () => {
      const obj1 = { name: 'John', age: 30 };
      const obj2 = { age: 31 };
      expect(mergeJSON(obj1, obj2)).toEqual({ name: 'John', age: 31 });
    });

    it('should merge multiple objects', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const obj3 = { c: 3 };
      expect(mergeJSON(obj1, obj2, obj3)).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should handle arrays by replacing', () => {
      const obj1 = { items: [1, 2] };
      const obj2 = { items: [3, 4] };
      expect(mergeJSON(obj1, obj2)).toEqual({ items: [3, 4] });
    });

    it('should handle empty objects', () => {
      expect(mergeJSON({}, { a: 1 })).toEqual({ a: 1 });
      expect(mergeJSON({ a: 1 }, {})).toEqual({ a: 1 });
    });

    it('should not mutate original objects', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      mergeJSON(obj1, obj2);
      expect(obj1).toEqual({ a: 1 });
      expect(obj2).toEqual({ b: 2 });
    });
  });
});
