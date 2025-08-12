module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  // Configure module name mapping for mocks
  moduleNameMapper: {
    '^@pipcook/boa$': '<rootDir>/__tests__/__mocks__/@pipcook/boa.js'
  },
};