import * as nodeUtils from '../src/index';

describe('node-utils index', () => {
  it('should export core modules', () => {
    expect(typeof nodeUtils.runAsync).toBe('function');
    expect(typeof nodeUtils.parseArgs).toBe('function');
    expect(typeof nodeUtils.copyStream).toBe('function');
    expect(typeof nodeUtils.getTimeStr).toBe('function');
  });
});
