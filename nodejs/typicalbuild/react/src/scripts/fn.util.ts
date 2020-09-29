import {BALANCE_CLASS, DOWN_ClASS, SAFE_SYMBOEL, UP_CLASS} from "./const";

/**
 * 数字前面补0
 * @param value
 */
export function addZero(value: number | string) {
    return value < 10 ? `0${value}` : value
}

/**
 * 保留小数位
 * @param value
 * @param count
 */
export function toFixed(value: number | string, count: number = 2) {
    let dealValue = Number(value);
    if (!isNaN(dealValue)) {
        return dealValue.toFixed(count)
    } else {
        return value;
    }
}

/**
 * 安全显示
 * @value 检查是否需要安全显示的值
 */
export function safeValueShow(value: any) {
    return !value && !equal(value, 0) ? SAFE_SYMBOEL : value;
}

/**
 * 数字增加加号
 * @value 需要增加+的值
 */
export function addPlus(value: string | number) {
    return greaterThan(value, 0) ? `+${value}` : value

}

/**
 * 判断是否小于
 * @param value
 * @param compare
 */
export function lessThan(value: number | string, compare = 0) {
    return value < compare
}

/**
 * 判断是否相等
 */
export function equal(value: string, compare = 0) {
    return parseInt(value) === compare
}

/**
 * 判断是否大于
 */
export function greaterThan(value: number | string, compare = 0) {
    return value > compare
}

/**
 * 颜色判断
 * @param value 涨幅值
 */
export function getProfitClass(value: string | number) {
    if (lessThan(value, 0)) {
        return DOWN_ClASS
    } else if (greaterThan(value, 0)) {
        return UP_CLASS
    } else {
        return BALANCE_CLASS
    }
}

/**
 * 循环定时器
 * @param callback
 * @param time
 */
const intervalTable: any = {};
let intervalIndex = 0;

export function intervalTime(callback: () => boolean | void, time = 1000, id: void | number) {
    let intervalId = id;
    if (!intervalId) {
        intervalId = ++intervalIndex;
    }
    intervalTable[intervalId] = setTimeout(() => {
        if (callback() !== false) {
            intervalTime(callback, time, intervalId)
        }
    }, time);

    if (!id) {
        return () => {
            clearTimeout(intervalTable[(intervalId as number)])
        }
    }
}

/**
 * 点击防止抖动
 * @param callback 防止抖动的函数
 * @param time 防抖间隔时间
 *
 */
export function preventShake(callback: any, time = 500) {
    let flag = true;
    return (...argument) => {
        if (flag) {
            flag = false;
            callback(...argument);
            setTimeout(() => {
                flag = true
            }, time)
        }
    }
}

/**
 * 获取指定区间内随机数
 * @param max 随机数最大值
 * @param min 随机数最小值
 */
export function random(max: number = 1, min: number = 0) {
    return Math.random() * max + min
}

/**
 * 格式化服务器的时间字符串
 */
export function dealServerTime(time: string) {
    return [time.slice(0, 4), time.slice(4, 6), time.slice(6, 8), time.slice(8, 10), time.slice(10, 12), time.slice(12)].filter(item => item)
}

/**
 * 图片加载
 * @param images
 * @param each
 * @param down
 */
export function preloadImage(images: Array<string>, each: (index: number) => void, down: () => void) {
    let i = 0;
    for (let src of images) {
        let img = new Image();
        img.src = src;
        img.onload = () => {
            each(++i);
            if (i === images.length) {
                down()
            }
        }
    }
}

/**
 * 随机数组顺序
 */
export function randomOrderArr(arr: Array<any>) {
    for (let i = 0, len = Math.ceil(arr.length / 2); i <= len; i++) {
        let _first = Math.floor(random(arr.length, 0));
        let _second = Math.floor(random(arr.length, 0));
        let _firstValue = arr[_first];
        arr[_first] = arr[_second];
        arr[_second] = _firstValue;
    }
    return arr;
}
