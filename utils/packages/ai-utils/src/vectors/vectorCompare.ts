/**
 * @author Wayne
 * @Date 2023-07-14 15:12:59
 * @LastEditTime 2024-08-25 14:03:04
 */
import mlDistance from 'ml-distance';

const cosineSimilarity = mlDistance.similarity.cosine;

/**
 * @function vectorCompare
 * @description 向量相似度比较(余弦相似度)
 * @param {number[]} vector1 向量数组1
 * @param {number[]} vector2 向量数组2
 * @returns {number} 返回相似度值
 */
export default function vectorCompare(vector1: number[], vector2: number[]) {
  return cosineSimilarity(vector1, vector2);
}
