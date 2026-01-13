import imageUtils from '../src/index';

describe('node-img-build index', () => {
  it('should expose expected APIs', () => {
    expect(typeof imageUtils.getImgList).toBe('function');
    expect(typeof imageUtils.getGmStream).toBe('function');
    expect(typeof imageUtils.toWebpImg).toBe('function');
    expect(typeof imageUtils.toBlurImg).toBe('function');
    expect(typeof imageUtils.toBase64).toBe('function');
    expect(typeof imageUtils.resizeImg).toBe('function');
    expect(typeof imageUtils.generate1xFrom2x).toBe('function');
    expect(typeof imageUtils.config).toBe('object');
  });
});
