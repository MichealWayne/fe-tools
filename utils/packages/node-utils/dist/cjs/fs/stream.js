"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyStream = void 0;
/**
 * @fileoverview File system stream utilities for Node.js applications, providing efficient file operations using streams for large file handling and transformations.
 *
 * This module provides stream-based file operations for efficient handling of large files.
 * It includes file copying with optional transformations, stream pipelines, and memory-efficient
 * file processing capabilities that are particularly useful for large file operations.
 *
 * @module Stream
 * @author Wayne
 * @since 1.0.0
 */
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var stream_1 = require("stream");
var util_1 = require("util");
var pipelineAsync = (0, util_1.promisify)(stream_1.pipeline);
/**
 * @function copyStream
 * @description Asynchronously copies a file using streams with optional transformation. Copies a file from source to target using streams for memory-efficient handling of large files, with optional data transformation during the copy process.
 * @param {string} source - The source file path to copy from. Source file path for the copy operation
 * @param {string} target - The target file path to copy to. Target file path for the copy operation
 * @param {object} [options] - Optional configuration for the copy operation. Configuration options for the copy operation
 * @param {Transform} [options.transform] - Optional transform stream to modify data during copy. Transform stream to modify data during copy process
 * @param {string} [options.flags='w'] - File system flags for the write stream. File system flags for the write stream (default: 'w')
 * @param {number} [options.mode=0o666] - File permissions for the target file. File permissions for the target file (default: 0o666)
 * @returns {Promise<void>} Promise that resolves when copy operation completes. Promise that resolves when the copy operation completes successfully
 * @throws {Error} Throws if source file doesn't exist or copy operation fails. Error if source file doesn't exist or copy operation fails
 * @example
 * // Simple file copy
 * await copyStream('./source.txt', './backup/source.txt');
 * console.log('File copied successfully');
 *
 * @example
 * // Copy with transformation (uppercase content)
 * import { Transform } from 'stream';
 * const upperTransform = new Transform({
 *   transform(chunk, encoding, callback) {
 *     callback(null, chunk.toString().toUpperCase());
 *   }
 * });
 * await copyStream('./input.txt', './output.txt', { transform: upperTransform });
 *
 * @example
 * // Copy with custom permissions
 * await copyStream('./script.sh', './bin/script.sh', {
 *   mode: 0o755, // Make executable
 *   flags: 'w'
 * });
 *
 * @example
 * // Copy large files efficiently
 * try {
 *   await copyStream('./large-video.mp4', './backup/large-video.mp4');
 *   console.log('Large file copied using streams');
 * } catch (error) {
 *   console.error('Copy failed:', error.message);
 * }
 *
 * @since 1.0.0
 * @see {@link https://nodejs.org/api/stream.html#stream_stream_pipeline_source_transforms_destination_callback} - Node.js pipeline documentation
 */
function copyStream(source, target, options) {
    return __awaiter(this, void 0, void 0, function () {
        var targetDir, readStream, writeStream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetDir = path_1.default.dirname(target);
                    if (!fs_1.default.existsSync(targetDir)) {
                        fs_1.default.mkdirSync(targetDir, { recursive: true });
                    }
                    readStream = fs_1.default.createReadStream(source);
                    writeStream = fs_1.default.createWriteStream(target, {
                        flags: (options === null || options === void 0 ? void 0 : options.flags) || 'w',
                        mode: (options === null || options === void 0 ? void 0 : options.mode) || 438,
                    });
                    if (!(options === null || options === void 0 ? void 0 : options.transform)) return [3 /*break*/, 2];
                    return [4 /*yield*/, pipelineAsync(readStream, options.transform, writeStream)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, pipelineAsync(readStream, writeStream)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.copyStream = copyStream;
