var _ = exports;

// 获取类型
// @param obj: 变量；
// @return {String} 类型
_.type = function (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
};

// 判断变量是否为对象类型
// @param list: 变量
// @return {Boolean} true | false
_.isObject = function isObject (object) {
  return _.type(object) === 'Object'
};

// 判断变量是否为数组类型
// @param list: 变量
// @return {Boolean} true | false
_.isArray = function isArray (list) {
  return _.type(list) === 'Array'
};

// 判断变量是否为字符串类型
// @param list: 变量
// @return {Boolean} true | false
_.isString = function isString (list) {
  return _.type(list) === 'String'
};

// 循环遍历数组执行函数
// @param {Array} array: 数组；
// @param {Function} fn: 函数；
_.each = function each (array, fn) {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
};

_.toArray = function toArray (listLike) {
  if (!listLike) {
    return []
  }

  var list = []

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }

  return list
}

_.setAttr = function setAttr (node, key, value) {
  switch (key) {
    case 'style':
      node.style.cssText = value
      break
    case 'value':
      var tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (
        tagName === 'input' || tagName === 'textarea'
      ) {
        node.value = value
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value)
      }
      break
    default:
      node.setAttribute(key, value)
      break
  }
}