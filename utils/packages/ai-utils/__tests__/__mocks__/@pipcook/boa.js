// __tests__/__mocks__/@pipcook/boa.js
// Mock implementation for @pipcook/boa

// Mock the import function
const mockImport = jest.fn((moduleName) => {
  if (moduleName === 'os') {
    return {
      getpid: jest.fn(() => 12345), // Mock process ID
    };
  }
  // Return a generic mock for other modules if needed
  return {};
});

module.exports = {
  import: mockImport,
};