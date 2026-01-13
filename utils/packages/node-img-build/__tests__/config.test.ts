import config from '../src/config';

describe('config', () => {
  it('should expose default image config values', () => {
    expect(config.quality).toBe(90);
    expect(config.webpQuality).toBe(80);
    expect(config.blur).toEqual({ color: 8, radius: 7, sigma: 3 });
    expect(typeof config.dirname).toBe('string');
  });

  it('should allow runtime mutation of config', () => {
    const originalQuality = config.quality;
    config.quality = 95;
    expect(config.quality).toBe(95);
    config.quality = originalQuality;
  });
});
