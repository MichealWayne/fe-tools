/**
 * @jest-environment node
 */

describe('SSR-safe module imports', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('should import platform without browser globals', () => {
    expect(() => require('../src/platform')).not.toThrow();
  });

  it('should import storage without browser globals', () => {
    expect(() => require('../src/storage')).not.toThrow();
  });

  it('should import rem without browser globals', () => {
    expect(() => require('../src/rem')).not.toThrow();
  });
});
