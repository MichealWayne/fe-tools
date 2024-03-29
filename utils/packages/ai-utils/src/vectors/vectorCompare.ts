/**
 * @author Wayne
 * @Date 2023-07-14 15:12:59
 * @LastEditTime 2024-02-04 20:15:39
 */
import mlDistance from 'ml-distance';

const cosineSimilarity = mlDistance.similarity.cosine;

/**
 * @function vectorCompare
 * @description 向量相似度比较(余弦相似度)
 * @param {number[]} vector1
 * @param {number[]} vector2
 * @returns {number}
 */
export default function vectorCompare(vector1: number[], vector2: number[]) {
  return cosineSimilarity(vector1, vector2);
}
