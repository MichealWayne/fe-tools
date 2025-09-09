/**
 * @fileoverview Vector similarity comparison utilities using cosine similarity for AI embeddings and machine learning applications.
 *
 * This module provides vector comparison functionality using cosine similarity calculations.
 * It's particularly useful for comparing AI embeddings, document similarities, and other
 * high-dimensional vector comparisons in natural language processing and machine learning tasks.
 *
 * @module VectorCompare
 * @author Wayne
 * @since 1.0.0
 */
import mlDistance from 'ml-distance';

const cosineSimilarity = mlDistance.similarity.cosine;

/**
 * @function vectorCompare
 * @description 向量相似度比较（余弦相似度）。Compares two vectors using cosine similarity to measure their directional similarity in high-dimensional space.
 * @param {number[]} vector1 - 第一个向量数组。First vector array for comparison (must be same length as vector2)
 * @param {number[]} vector2 - 第二个向量数组。Second vector array for comparison (must be same length as vector1)
 * @returns {number} 相似度值（0-1之间）。Similarity value between 0 and 1 (1 = identical direction, 0 = orthogonal)
 * @example
 * // Compare two document embeddings
 * const doc1Embedding = [0.1, 0.2, 0.3, 0.4, 0.5];
 * const doc2Embedding = [0.2, 0.3, 0.4, 0.5, 0.6];
 * const similarity = vectorCompare(doc1Embedding, doc2Embedding);
 * console.log(`Documents similarity: ${similarity.toFixed(3)}`); // e.g., 0.998
 *
 * @example
 * // Find most similar vector from a collection
 * const queryVector = [1, 0, 1, 0];
 * const candidates = [
 *   [1, 1, 0, 0],
 *   [0, 1, 1, 0],
 *   [1, 0, 1, 1]
 * ];
 * const similarities = candidates.map(candidate => 
 *   vectorCompare(queryVector, candidate)
 * );
 * const mostSimilarIndex = similarities.indexOf(Math.max(...similarities));
 *
 * @example
 * // Semantic search with embeddings
 * const searchQuery = getEmbedding('machine learning');
 * const documents = [
 *   getEmbedding('artificial intelligence algorithms'),
 *   getEmbedding('cooking recipes'),
 *   getEmbedding('neural networks training')
 * ];
 * const scores = documents.map(doc => vectorCompare(searchQuery, doc));
 * // Higher scores indicate more semantic similarity
 *
 * @see {@link https://en.wikipedia.org/wiki/Cosine_similarity} - Cosine similarity explanation
 */
export default function vectorCompare(vector1: number[], vector2: number[]) {
  return cosineSimilarity(vector1, vector2);
}
