/**
 * @author Wayne
 * @Date 2023-07-14 15:12:59
 * @LastEditTime 2023-07-17 15:07:54
 */
import mlDistance from 'ml-distance';

const cosineSimilarity = mlDistance.similarity.cosine;

/**
 * @function vectorCompare
 * @param vector1
 * @param vector2
 * @returns
 */
export default function vectorCompare(vector1: number[], vector2: number[]) {
  return cosineSimilarity(vector1, vector2);
}
