/**
* 基础方法
* @module fn(util)
*/

/**
* @function type
* @description **_.fn.type(val)**。获取类型
* @param val 变量；
* @return {String} 类型
* @example
* var test1 = [1, 2, 3],
*     test2 = { a: 1, b: '2' },
*     test3 = 'abc',
*     test4;
* _.fn.type(test1);  // 'Array'
* _.fn.type(test2);  // 'Object'
* _.fn.type(test3);  // 'String'
* _.fn.type(test4);  // 'Undefined'
*/
export let type = val => {
    return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, '')
};

/**
* @function isArray
* @description **_.fn.isArray(val)**。判断变量是否为数组类型
* @param val 变量
* @return {Boolean} true | false
* @example
* var test1 = [1, 2, 3],
*     test2 = { a: 1, b: '2' };
* _.fn.isArray(test1);  // true
* _.fn.isArray(test2);  // false
*/
export let isArray = val => {
    return type(val) === 'Array'
};

/**
* @function isString
* @description **_.fn.isString(val)**。判断变量是否为字符串类型
* @param val 变量
* @return {Boolean} true | false
* @example
* var test1 = [1, 2, 3],
*     test2 = 'abc';
* _.fn.isString(test1);  // false
* _.fn.isString(test2);  // true
*/
export let isString = val => {
    return type(val) === 'String'
};

/**
* @function isObject
* @description **_.fn.isObject(val)**。判断变量是否为对象
* @param val 变量
* @return {Boolean} true | false
* @example
* var test1 = [1, 2, 3],
*     test2 = { a: 1, b: '2' };
* _.fn.isObject(test1);  // false
* _.fn.isObject(test2);  // true
*/
export let isObject = val => {
    return type(val) === 'Object'
};

/*
* @function isFunction
* @description **_.fn.isFunction(val)**。判断变量是否为函数
* @param val 变量
* @return {Boolean} true | false
* @example
* var test1 = [1, 2, 3],
*     test2 = function () { alert(1) };
* _.fn.isFunction(test1);  // false
* _.fn.isFunction(test2);  // true
*/
export let isFunction = val => {
    return type(val) === 'Function'
};

/**
* @function each
* @description **_.fn.each(array, fn)**。循环遍历数组执行函数（for ie）
* @param {Array} array 数组；
* @param {Function} fn 函数；
* @example
* var arr = [1, 2, 3];
* _.fn.each(arr, function (i) {console.log(i)});
* // 1
* // 2
* // 3
*/
export let each = (array, fn) => {
    for (let i = 0, len = array.length; i < len; i++) {
        fn(array[i], i)
    }
};

/**
* @function cloneObj
* @description **_.fn.cloneObj(fromobj, toobj)**。拷贝对象
* @param {Object} fromobj 从该对象复制内容
* @param {Object} toobj 原对象
* @return {Object} copied object
* @example
* var obj1 = {
*    a: 1,
*    b: {
*        c: 2,
*        d: 3
*    },
*    e: 4
* };
* var obj2 = {
*    a: 'a',
*    f: 'f'
* };
*
* var obj3 = _.fn.cloneObj(obj1, obj2);
* // obj3 == obj2 : {"a":"a","f":"f","b":{"c":2,"d":3},"e":4}
*/
export let cloneObj = (fromobj, toobj) => {
    if (!isObject(fromobj) || !isObject(toobj)) return false;

    for (let i in fromobj) {
        if (toobj[i]) continue;
        if (isObject(fromobj[i]) && toobj[i] && isObject(toobj[i])) {
            cloneObj(fromobj[i], toobj[i]);
        } else if (isArray(fromobj[i]) && toobj[i] && isArray(toobj[i])) {
            cloneArray(fromobj[i], toobj[i]);
        } else {
            toobj[i] = fromobj[i];
        }
    }

    return toobj;
};

/**
* @function cloneObjDeep
* @description **_.fn.cloneObjDeep(fromobj, toobj)**。深拷贝对象（弥补cloneObj不能拷贝属性值为对象时的情况）
* @param {Object} fromobj 从该对象复制内容
* @param {Object} toobj 原对象
* @return {Object} copied object
* @example
* var obj1 = {
*    a: 1,
*    b: {
*        c: 2,
*        d: 3
*    },
*    e: 4
* };
* var obj2 = {
*    a: 'a',
*    f: 'f'
* };
*
* var obj3 = _.fn.cloneObjDeep(obj1, obj2);
* // obj3 == obj2 : {"a":"a","f":"f","b":{"c":2,"d":3},"e":4}
*/
export let cloneObjDeep = (fromobj, toobj) => {
	if (!isObject(fromobj) || !isObject(toobj)) return false;

	for (let i in fromobj) {
		if (isObject(toobj[i]) && !isEmptyObj[i]) {	// obj
			cloneObjDeep(fromobj[i], toobj[i]);
			continue;
		}
			
		toobj[i] = toobj[i] || fromobj[i];
	}

	return toobj;
};

/**
* @function cloneArray
* @description **_.fn.cloneArray(fromarr, toarr)**。拷贝数组
* @param {Array} fromobj 从该对象复制内容
* @param {Array} toobj 原对象
* @return {Array} copied array
* @example
* var arr1 = [1,2,3,4,5,6];
* var arr2 = [7];
* var arr3 = _.fn.cloneArray(arr1, arr2);
* // arr2 == arr3 : [1, 2, 3, 4, 5, 6]
*/
export let cloneArray = (fromarr, toarr) => {
    fromarr.map((item, index) => {
        toarr[index] = item;
    });

    return toarr;
};



/**
* @function isEmptyObj
* @description **_.fn.isEmptyObj(obj)**。判断对象是否为空
* @param obj 对象
* @return {Boolean} 是否为空对象
* @example
* var obj1 = { a: 1 };
* var obj2 = {};
* _.fn.isEmptyObj(obj1);    // false
* _.fn.isEmptyObj(obj2);    // true
*/
export let isEmptyObj = obj => {
  if (!obj) return false;
  for (let key in obj) {
      return false;
  }
  return true;
};

export default {
    type,
    isArray,
    isString,
    isObject,
    isFunction,
    each,
    cloneObj,
	cloneObjDeep,
    cloneArray,
    isEmptyObj
}