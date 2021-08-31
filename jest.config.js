module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
