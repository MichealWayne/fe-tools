/**
 * @module DOM
 * @description dom operate
 * @author Wayne
 * @Date 2022-06-06 10:08:50
 * @LastEditTime 2023-01-31 10:45:43
 */

import { getElementSize } from 'web-utils';

import { DEFAULT_CANVAS_SIZE } from '../constants';

/**
 * @function createCanvasElem
 * @description (web)创建并填充canvas元素
 * @param {HTMLElement} elem
 * @param {Options} options
 * @returns {HTMLCanvasElement}
 * @example
 *  const canvas = createCanvasElem(document.querySelector('body'), {
 *    id: 'demo'
 *  })
 */
export function createCanvasElem(
  elem: HTMLElement,
  {
    id,
    width,
    height,
  }: {
    id: string;
    width?: number;
    height?: number;
  }
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.id = `${id}Canvas`;

  canvas.width = width || getElementSize(elem, 'width') || DEFAULT_CANVAS_SIZE.width;
  canvas.height = height || getElementSize(elem, 'height') || DEFAULT_CANVAS_SIZE.height;

  elem.appendChild(canvas);
  return canvas;
}
