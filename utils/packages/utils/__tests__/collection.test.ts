/**
 * Collection utilities test
 */
import {
  groupBy,
  partition,
  zip,
  unzip,
  cartesianProduct,
  sortBy,
  mergeSorted,
} from '../src/collection';

describe('collection test', () => {
  describe('groupBy', () => {
    it('should group array elements by key function', () => {
      const users = [
        { name: 'John', age: 25, dept: 'IT' },
        { name: 'Jane', age: 30, dept: 'HR' },
        { name: 'Bob', age: 25, dept: 'IT' },
        { name: 'Alice', age: 30, dept: 'IT' },
      ];

      const byDept = groupBy(users, (u) => u.dept);
      expect(byDept.IT).toHaveLength(3);
      expect(byDept.HR).toHaveLength(1);

      const byAge = groupBy(users, (u) => u.age.toString());
      expect(byAge['25']).toHaveLength(2);
      expect(byAge['30']).toHaveLength(2);
    });

    it('should handle empty array', () => {
      expect(groupBy([], (x) => x)).toEqual({});
    });

    it('should group numbers', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const grouped = groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'));
      expect(grouped.even).toEqual([2, 4, 6]);
      expect(grouped.odd).toEqual([1, 3, 5]);
    });
  });

  describe('partition', () => {
    it('should partition array by predicate', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const [even, odd] = partition(numbers, (n) => n % 2 === 0);
      expect(even).toEqual([2, 4, 6]);
      expect(odd).toEqual([1, 3, 5]);
    });

    it('should handle empty array', () => {
      const [truthy, falsy] = partition([], () => true);
      expect(truthy).toEqual([]);
      expect(falsy).toEqual([]);
    });

    it('should partition objects', () => {
      const users = [
        { name: 'John', active: true },
        { name: 'Jane', active: false },
        { name: 'Bob', active: true },
      ];
      const [active, inactive] = partition(users, (u) => u.active);
      expect(active).toHaveLength(2);
      expect(inactive).toHaveLength(1);
    });
  });

  describe('zip', () => {
    it('should zip arrays together', () => {
      const result = zip([1, 2, 3], ['a', 'b', 'c'], [true, false, true]);
      expect(result).toEqual([
        [1, 'a', true],
        [2, 'b', false],
        [3, 'c', true],
      ]);
    });

    it('should handle arrays of different lengths', () => {
      const result = zip([1, 2, 3], ['a', 'b']);
      expect(result).toEqual([
        [1, 'a'],
        [2, 'b'],
        [3, undefined],
      ]);
    });

    it('should handle empty arrays', () => {
      expect(zip([], [])).toEqual([]);
      const result = zip([1, 2], []);
      expect(result).toEqual([[1, undefined], [2, undefined]]);
    });

    it('should handle single array', () => {
      expect(zip([1, 2, 3])).toEqual([[1], [2], [3]]);
    });
  });

  describe('unzip', () => {
    it('should unzip array of tuples', () => {
      const zipped = [
        [1, 'a', true],
        [2, 'b', false],
        [3, 'c', true],
      ];
      const result = unzip(zipped);
      expect(result).toEqual([[1, 2, 3], ['a', 'b', 'c'], [true, false, true]]);
    });

    it('should handle empty array', () => {
      expect(unzip([])).toEqual([]);
    });

    it('should handle single element', () => {
      expect(unzip([[1, 'a']])).toEqual([[1], ['a']]);
    });
  });

  describe('cartesianProduct', () => {
    it('should compute cartesian product of two arrays', () => {
      const result = cartesianProduct([1, 2], ['a', 'b']);
      expect(result).toEqual([
        [1, 'a'],
        [1, 'b'],
        [2, 'a'],
        [2, 'b'],
      ]);
    });

    it('should compute cartesian product of three arrays', () => {
      const result = cartesianProduct([1, 2], ['a'], [true, false]);
      expect(result).toEqual([
        [1, 'a', true],
        [1, 'a', false],
        [2, 'a', true],
        [2, 'a', false],
      ]);
    });

    it('should handle empty array', () => {
      expect(cartesianProduct([], [1, 2])).toEqual([]);
      expect(cartesianProduct([1, 2], [])).toEqual([]);
    });

    it('should handle single array', () => {
      expect(cartesianProduct([1, 2, 3])).toEqual([[1], [2], [3]]);
    });
  });

  describe('sortBy', () => {
    it('should sort by single field', () => {
      const users = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 35 },
      ];
      const sorted = sortBy(users, (u) => u.age);
      expect(sorted[0].age).toBe(25);
      expect(sorted[1].age).toBe(30);
      expect(sorted[2].age).toBe(35);
    });

    it('should sort by multiple fields', () => {
      const users = [
        { name: 'John', age: 30, dept: 'IT' },
        { name: 'Jane', age: 25, dept: 'HR' },
        { name: 'Bob', age: 30, dept: 'HR' },
        { name: 'Alice', age: 25, dept: 'IT' },
      ];
      const sorted = sortBy(
        users,
        (u) => u.age,
        (u) => u.dept
      );
      expect(sorted[0].name).toBe('Jane');
      expect(sorted[1].name).toBe('Alice');
      expect(sorted[2].name).toBe('Bob');
      expect(sorted[3].name).toBe('John');
    });

    it('should handle empty array', () => {
      expect(sortBy([], (x: any) => x.id)).toEqual([]);
    });

    it('should handle string sorting', () => {
      const items = [{ name: 'Zebra' }, { name: 'Apple' }, { name: 'Banana' }];
      const sorted = sortBy(items, (i) => i.name);
      expect(sorted[0].name).toBe('Apple');
      expect(sorted[1].name).toBe('Banana');
      expect(sorted[2].name).toBe('Zebra');
    });

    it('should handle nested property sorting', () => {
      const data = [
        { user: { age: 30 } },
        { user: { age: 20 } },
        { user: { age: 25 } },
      ];
      const sorted = sortBy(data, (d) => d.user.age);
      expect(sorted[0].user.age).toBe(20);
      expect(sorted[2].user.age).toBe(30);
    });
  });

  describe('mergeSorted', () => {
    it('should merge two sorted arrays', () => {
      const arr1 = [1, 3, 5, 7];
      const arr2 = [2, 4, 6, 8];
      const result = mergeSorted(arr1, arr2);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should merge multiple sorted arrays', () => {
      const arr1 = [1, 5, 9];
      const arr2 = [2, 6, 10];
      const arr3 = [3, 7, 11];
      const result = mergeSorted(arr1, arr2, arr3);
      expect(result).toEqual([1, 2, 3, 5, 6, 7, 9, 10, 11]);
    });

    it('should handle arrays with duplicates', () => {
      const arr1 = [1, 3, 5];
      const arr2 = [3, 5, 7];
      const result = mergeSorted(arr1, arr2);
      expect(result).toEqual([1, 3, 3, 5, 5, 7]);
    });

    it('should handle empty arrays', () => {
      expect(mergeSorted([], [1, 2, 3])).toEqual([1, 2, 3]);
      expect(mergeSorted([1, 2, 3], [])).toEqual([1, 2, 3]);
      expect(mergeSorted([], [])).toEqual([]);
    });

    it('should handle single array', () => {
      expect(mergeSorted([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should handle arrays of different sizes', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [6];
      const result = mergeSorted(arr1, arr2);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
