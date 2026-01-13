import {
  arrayMax,
  arrayMin,
  arrayAverage,
  arraySum,
  allEqual,
  arrayToCSV,
  castArray,
  chunk,
  compact,
  countOccurrences,
  deepFlatten,
  digitize,
  flatten,
  difference,
  differenceBy,
  drop,
  dropWhile,
  indexOfAll,
  intersection,
  intersectionBy,
  intersectionWith,
  negate,
  size,
  getStringByteLength,
  sample,
  sampleSize,
  shuffle,
  everyNth,
  unique,
  filterNonUnique,
  initializeArrayWithValues,
  remove,
  fibonacci,
  median,
} from '../src/array';

/**
 * array
 */
test('arrayMax test', () => {
  expect(arrayMax([1, 2, 3])).toBe(3);
  expect(arrayMax([5, 5, 5])).toBe(5);
  expect(arrayMax([-5, -1, -3])).toBe(-1);
  expect(arrayMax([1])).toBe(1);
  expect(arrayMax([])).toBe(-Infinity);
});

test('arrayMin test', () => {
  expect(arrayMin([1, 2, 3])).toBe(1);
  expect(arrayMin([5, 5, 5])).toBe(5);
  expect(arrayMin([-5, -1, -3])).toBe(-5);
  expect(arrayMin([1])).toBe(1);
  expect(arrayMin([])).toBe(Infinity);
});

test('arrayAverage test', () => {
  expect(arrayAverage([1, 2, 3])).toBe(2);
  expect(arrayAverage([5, 5, 5])).toBe(5);
  expect(arrayAverage([-5, -1, -3])).toBe(-3);
  expect(arrayAverage([1])).toBe(1);
  expect(arrayAverage([])).toBe(NaN);
});

test('arraySum test', () => {
  expect(arraySum([1, 2, 3])).toBe(6);
  expect(arraySum([5, 5, 5])).toBe(15);
  expect(arraySum([-5, -1, -3])).toBe(-9);
  expect(arraySum([1])).toBe(1);
  expect(arraySum([])).toBe(0);
});

test('allEqual test', () => {
  expect(allEqual([1, 2, 3])).toBe(false);
  expect(allEqual([5, 5, 5])).toBe(true);
  expect(allEqual([-5, -1, -3])).toBe(false);
  expect(allEqual([-3, -3, -3])).toBe(true);
  expect(allEqual([1])).toBe(true);
  expect(allEqual([0, +0, -0])).toBe(true);
  expect(allEqual([NaN, NaN])).toBe(false);
  expect(allEqual([Infinity, Infinity])).toBe(true);
  expect(allEqual([NaN])).toBe(false);
  expect(allEqual([10e8889, 10e888])).toBe(true); // over limit
  expect(allEqual([])).toBe(true);
});

test('arrayToCSV test', () => {
  expect(
    arrayToCSV([
      [1, 2, 3],
      [3, 4, 5],
    ])
  ).toBe(`"1","2","3"
"3","4","5"`);
  expect(arrayToCSV([[1], [2], [3]])).toBe(`"1"
"2"
"3"`);
  expect(arrayToCSV([['a"b', 'c']])).toBe(`"a""b","c"`);
});

test('castArray test', () => {
  expect(JSON.stringify(castArray([1, 2, 3]))).toBe('[1,2,3]');
  expect(JSON.stringify(castArray(1))).toBe('[1]');
  expect(JSON.stringify(castArray(undefined))).toBe('[null]');
  expect(JSON.stringify(castArray({}))).toBe('[{}]');
});

test('chunk test', () => {
  expect(JSON.stringify(chunk([1, 2, 3], 2))).toBe('[[1,2],[3]]');
  expect(JSON.stringify(chunk([1, 2, 3, 4, 5], 2))).toBe('[[1,2],[3,4],[5]]');
  expect(JSON.stringify(chunk([1, 2, 3], 5))).toBe('[[1,2,3]]');
});

test('compact test', () => {
  expect(JSON.stringify(compact([1, 2, 3]))).toBe('[1,2,3]');
  expect(JSON.stringify(compact([1, false, 3, null, 5, undefined, 7, '', 9, NaN, 11]))).toBe(
    '[1,3,5,7,9,11]'
  );
  expect(JSON.stringify(compact([]))).toBe('[]');
});

test('countOccurrences test', () => {
  expect(countOccurrences([1, 2, 3], 1)).toBe(1);
  expect(countOccurrences([1, 2, 3, 4, 2, 2, 3, 4], 2)).toBe(3);
  expect(countOccurrences([1, false, 3, null, 5, undefined, 7, '', 9, NaN, 11], undefined)).toBe(1);
  expect(countOccurrences([], undefined)).toBe(0);
});

test('deepFlatten test', () => {
  expect(JSON.stringify(deepFlatten([1, [2, 3]]))).toBe('[1,2,3]');
  expect(JSON.stringify(deepFlatten([1, [2, [3, [4]]]]))).toBe('[1,2,3,4]');
  expect(JSON.stringify(deepFlatten([]))).toBe('[]');
});

test('flatten test', () => {
  expect(JSON.stringify(flatten([1, [2, 3]]))).toBe('[1,2,3]');
  expect(JSON.stringify(flatten([1, [2, [3, [4]]]]))).toBe('[1,2,[3,[4]]]');
  expect(JSON.stringify(flatten([1, [2, [3, [4]]]], 2))).toBe('[1,2,3,[4]]');
  expect(JSON.stringify(flatten([1, [2, [3, [4]]]], 3))).toBe('[1,2,3,4]');
  expect(JSON.stringify(flatten([1, [2, [3, [4]]]], Infinity))).toBe('[1,2,3,4]');
  expect(JSON.stringify(flatten([]))).toBe('[]');
});

test('difference test', () => {
  expect(JSON.stringify(difference([1, 2, 3], [2, 3, 4]))).toBe('[1]');
  expect(JSON.stringify(difference([null, undefined, NaN], ['', undefined]))).toBe('[null,null]'); // NaN special
});

test('differenceBy test', () => {
  expect(JSON.stringify(differenceBy([null, undefined, NaN], ['', undefined], a => !a))).toBe('[]');
  expect(JSON.stringify(differenceBy([1, 2, 3], [2, 3, 4], a => a))).toBe('[1]');
});

test('drop test', () => {
  expect(JSON.stringify(drop([1, 2, 3, 4, 5], 2))).toBe('[3,4,5]');
  expect(JSON.stringify(drop([1, 2, 3, 4, 5], 0))).toBe('[1,2,3,4,5]');
  expect(JSON.stringify(drop([1, 2, 3, 4, 5], 5))).toBe('[]');
});

test('dropWhile test', () => {
  expect(JSON.stringify(dropWhile([1, 2, 3, 4, 5], (a: any) => a > 3))).toBe('[4,5]');
  expect(JSON.stringify(dropWhile([1, 2, 3, 4, 5], (a: any) => a > 5))).toBe('[]');
  expect(JSON.stringify(dropWhile(['', null, undefined, NaN, 0, 1], a => Boolean(a)))).toBe(
    '[1]'
  );
});

test('indexOfAll test', () => {
  expect(JSON.stringify(indexOfAll([1, 2, 3, 4, 5, 3], 3))).toBe('[2,5]');
  expect(JSON.stringify(indexOfAll([1, 2, 3, 4, 5], 6))).toBe('[]');
  expect(JSON.stringify(indexOfAll([1, 2, 3, 4, 5], 2))).toBe('[1]');
});

test('intersection test', () => {
  expect(JSON.stringify(intersection([1, 2, 3], [2, 3, 4]))).toBe('[2,3]');
  expect(JSON.stringify(intersection([1, 3], [2, 4]))).toBe('[]');
  expect(JSON.stringify(intersection([null, undefined], ['', NaN]))).toBe('[]');
});

test('intersectionBy test', () => {
  expect(JSON.stringify(intersectionBy([1, 2, 3], [2, 3, 4], a => a))).toBe('[2,3]');
  expect(JSON.stringify(intersectionBy([1, 2, 3], [2, 3, 4], a => !a))).toBe('[1,2,3]');
  expect(JSON.stringify(intersectionBy([1, 3], [2, 4], a => a))).toBe('[]');
  expect(JSON.stringify(intersectionBy([1, 3], [2, 4], a => !a))).toBe('[1,3]');
  expect(JSON.stringify(intersectionBy([null, undefined], ['', NaN], a => a))).toBe('[]');
  expect(JSON.stringify(intersectionBy([null, undefined], ['', NaN], a => !a))).toBe('[null,null]'); // undefined
});

test('negate test', () => {
  expect(JSON.stringify([1, 2, 3, 4, 5].filter(negate(n => (n as number) % 2 === 0)))).toBe(
    '[1,3,5]'
  );
});

test('unique test', () => {
  expect(JSON.stringify(unique([1, 2, 3, 4, 5, 3, 2, 1]))).toBe('[1,2,3,4,5]');
  expect(JSON.stringify(unique([null, undefined, NaN, '', 0, 1, 0, 1]))).toBe(
    '[null,null,null,"",0,1]'
  );
  expect(JSON.stringify(unique([]))).toBe('[]');
});

test('size test', () => {
  expect(size([1, 2, 3])).toBe(3);
  expect(size(new Map([['a', 1]]))).toBe(1);
  expect(size(new Set([1, 2]))).toBe(2);
  expect(size('abc')).toBe(3);
});

test('getStringByteLength test', () => {
  expect(getStringByteLength('abc')).toBe(3);
});

test('digitize test', () => {
  expect(JSON.stringify(digitize(123))).toBe('[1,2,3]');
  expect(JSON.stringify(digitize(-12.34))).toBe('[1,2,3,4]');
});

test('intersectionWith test', () => {
  const arr1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
  const arr2 = [{ x: 2 }, { x: 4 }];
  const result = intersectionWith(arr1, arr2, (a: any, b: any) => a.x === b.x);
  expect(result).toEqual([{ x: 2 }]);
});

test('sample test', () => {
  const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
  expect(sample([10, 20, 30])).toBe(10);
  randomSpy.mockRestore();
});

test('sampleSize test', () => {
  const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0);
  const result = sampleSize([1, 2, 3, 4], 2);
  expect(result).toHaveLength(2);
  result.forEach(item => {
    expect([1, 2, 3, 4]).toContain(item);
  });
  randomSpy.mockRestore();
});

test('shuffle test', () => {
  const arr = [1, 2, 3, 4];
  const result = shuffle(arr);
  expect(result).not.toBe(arr);
  expect(
    [...result].sort((a, b) => (a as number) - (b as number))
  ).toEqual([1, 2, 3, 4]);
});

test('everyNth test', () => {
  expect(JSON.stringify(everyNth([1, 2, 3, 4, 5, 6], 2))).toBe('[1,3,5]');
  expect(JSON.stringify(everyNth([1, 2, 3], 5))).toBe('[1]');
});

test('filterNonUnique test', () => {
  expect(JSON.stringify(filterNonUnique([1, 2, 2, 3, 4, 4, 5]))).toBe('[1,3,5]');
  expect(JSON.stringify(filterNonUnique([1, 1, 2, 2]))).toBe('[]');
});

test('initializeArrayWithValues test', () => {
  expect(JSON.stringify(initializeArrayWithValues(3, 2))).toBe('[2,2,2]');
  expect(JSON.stringify(initializeArrayWithValues(0))).toBe('[]');
});

test('remove test', () => {
  const arr = [1, 2, 3, 4, 5];
  const removed = remove(arr, v => v % 2 === 0);
  expect(removed).toEqual([2, 4]);
  expect(arr).toEqual([1, 3, 5]);
});

test('fibonacci test', () => {
  expect(JSON.stringify(fibonacci(0))).toBe('[]');
  expect(JSON.stringify(fibonacci(1))).toBe('[0]');
  expect(JSON.stringify(fibonacci(5))).toBe('[0,1,1,2,3]');
});

test('median test', () => {
  expect(median([1, 2, 3, 4, 5])).toBe(3);
  expect(median([1, 2, 3, 4])).toBe(2.5);
  expect(Number.isNaN(median([]))).toBe(true);
});
