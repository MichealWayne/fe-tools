/**
 * @fileoverview DOM manipulation utilities for canvas elements, including canvas creation and sizing for web environments.
 *
 * This module provides utilities for working with canvas elements in web browsers,
 * including automatic canvas creation, sizing based on parent elements, and proper DOM integration.
 * These functions are specifically designed for web environments and handle responsive canvas setup.
 *
 * @module Doms
 * @author Wayne
 * @since 1.0.0
 */

import { getElementSize } from 'web-utils';

import { DEFAULT_CANVAS_SIZE } from '../constants';

/**
 * @function createCanvasElem
 * @description 创建新的HTML画布元素并将其附加到指定的父元素。Creates a new HTML canvas element and appends it to the specified parent element. Automatically sizes the canvas based on the parent element's dimensions or provided options.
 * @param {HTMLElement} elem - 要附加画布的父DOM元素。The parent DOM element to append the canvas to
 * @param {Object} options - 画布的配置选项。Configuration options for the canvas
 * @param {string} options.id - 画布的唯一标识符（将添加'Canvas'后缀）。Unique identifier for the canvas (will have 'Canvas' suffix added)
 * @param {number} [options.width] - 画布宽度（像素）（默认为父元素宽度或回退值）。Canvas width in pixels (defaults to parent element width or fallback)
 * @param {number} [options.height] - 画布高度（像素）（默认为父元素高度或回退值）。Canvas height in pixels (defaults to parent element height or fallback)
 * @returns {HTMLCanvasElement} 创建并配置的画布元素。The created and configured canvas element
 * @example
 * // Basic canvas creation
 * const container = document.getElementById('chart-container');
 * const canvas = createCanvasElem(container, {
 *   id: 'myChart'
 * });
 * // Creates canvas with id="myChartCanvas" sized to fit container
 *
 * @example
 * // Custom dimensions
 * const canvas = createCanvasElem(document.body, {
 *   id: 'customChart',
 *   width: 800,
 *   height: 600
 * });
 * // Creates 800x600 canvas regardless of parent size
 *
 * @example
 * // Responsive chart setup
 * function createResponsiveChart(containerId, chartId) {
 *   const container = document.getElementById(containerId);
 *
 *   // Canvas will automatically size to container
 *   const canvas = createCanvasElem(container, {
 *     id: chartId
 *   });
 *
 *   const ctx = canvas.getContext('2d');
 *
 *   // Set up responsive behavior
 *   window.addEventListener('resize', () => {
 *     const newWidth = container.clientWidth;
 *     const newHeight = container.clientHeight;
 *
 *     canvas.width = newWidth;
 *     canvas.height = newHeight;
 *
 *     // Redraw chart with new dimensions
 *     redrawChart(ctx, newWidth, newHeight);
 *   });
 *
 *   return { canvas, ctx };
 * }
 *
 * @example
 * // Multiple charts in a dashboard
 * const chartConfigs = [
 *   { containerId: 'chart1', id: 'sales', width: 400, height: 300 },
 *   { containerId: 'chart2', id: 'users', width: 400, height: 300 },
 *   { containerId: 'chart3', id: 'revenue' } // Auto-sized
 * ];
 *
 * const charts = chartConfigs.map(config => {
 *   const container = document.getElementById(config.containerId);
 *   return createCanvasElem(container, {
 *     id: config.id,
 *     width: config.width,
 *     height: config.height
 *   });
 * });
 *
 * @since 1.0.0
 * @see {@link DEFAULT_CANVAS_SIZE} - Default canvas dimensions when parent sizing fails
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
