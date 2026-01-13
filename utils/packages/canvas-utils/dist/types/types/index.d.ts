/**
 * @author Wayne
 * @Date 2022-06-06 09:40:04
 * @LastEditTime 2022-06-07 15:22:45
 */
export interface PointPosition {
    x: number;
    y: number;
}
export type PointsMap = PointPosition[];
export type ListExtremum = {
    max: number;
    min: number;
};
export type SimpleObj = {
    [propName: string]: unknown;
};
