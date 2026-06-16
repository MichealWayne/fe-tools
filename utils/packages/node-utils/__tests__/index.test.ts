import * as nodeUtils from '../src/index';

describe('node-utils index', () => {
  it('should export core modules', () => {
    expect(typeof nodeUtils.runAsync).toBe('function');
    expect(typeof nodeUtils.parseArgs).toBe('function');
    expect(typeof nodeUtils.copyStream).toBe('function');
    expect(typeof nodeUtils.getTimeStr).toBe('function');
    expect(typeof nodeUtils.isValidSQL).toBe('function');
  });

  it('should expose default-exported modules through named entry exports', () => {
    expect(typeof nodeUtils.Cache).toBe('function');
    expect(typeof nodeUtils.startServer).toBe('function');
    expect(typeof nodeUtils.Tip).toBe('object');
    expect(typeof nodeUtils.Colors).toBe('object');
    expect(typeof nodeUtils.run).toBe('object');
    expect(typeof nodeUtils.os).toBe('object');
    expect(typeof nodeUtils.fsFuncs).toBe('object');
    expect(typeof nodeUtils.parsedArgs).toBe('object');
  });
});
