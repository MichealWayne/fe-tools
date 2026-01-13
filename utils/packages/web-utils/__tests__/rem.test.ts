describe('rem module', () => {
  const originalUserAgent = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent, configurable: true });
    delete (window as any).flexible;
    delete (window as any).norem;
    jest.resetModules();
  });

  it('should initialize flexible for mobile user agent', () => {
    Object.defineProperty(navigator, 'userAgent', { value: 'iphone', configurable: true });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../src/rem');
    expect((window as any).flexible).toBeDefined();
    expect(typeof (window as any).flexible.rem2px).toBe('function');
  });

  it('should skip flexible setup when no rem flag set', () => {
    Object.defineProperty(navigator, 'userAgent', { value: 'iphone', configurable: true });
    (window as any).norem = true;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../src/rem');
    expect((window as any).flexible).toBeUndefined();
  });

  it('should set font size for PC environment', () => {
    Object.defineProperty(navigator, 'userAgent', { value: 'Mozilla/5.0', configurable: true });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../src/rem');
    expect(document.documentElement.style.fontSize).toBe('54px');
  });
});
