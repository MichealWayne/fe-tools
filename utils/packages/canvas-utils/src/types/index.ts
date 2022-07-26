/**
 * @author Wayne
 * @Date 2022-06-06 09:40:04
 * @LastEditTime 2022-06-07 15:22:45
 */
// 坐标位置
export interface PointPosition {
  x: number;
  y: number;
}

// 坐标集
export type PointsMap = PointPosition[];

// 列表极值
export type ListExtremum = {
  max: number;
  min: number;
};

export type SimpleObj = {
  [propName: string]: unknown;
};
