/*
 * @author Wayne
 * @Date 2022-04-12 10:40:18
 * @LastEditTime 2024-04-09 14:30:52
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// only run tests for someone API that config from environment
let { TEST_API } = process.env;
TEST_API = TEST_API || '';

module.exports = {
  verbose: false,
  rootDir: path.join(__dirname),
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'es6',
        sourceMap: true,
      },
    },
  },
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    // env: `<rootDir>/packages/env/__tests__/webEnv.mock.ts`,
    // utils: '<rootDir>/packages/utils/src/index.ts',
  },
  testMatch: [
    TEST_API ? `**/${TEST_API}/__tests__/*.test.{ts,tsx}` : '**/__tests__/**/*.test.{ts,tsx}',
  ],
  collectCoverage: !TEST_API,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
    '!packages/**/src/types.{ts,tsx}',
    '!packages/env/**/*.{ts,tsx}',
    '!packages/**/device/**/*.{ts,tsx}',
    '!packages/**/dist/**/*',
    '!packages/interactive/{background,keyboard}/**/*.{ts,tsx}',
  ],
};
