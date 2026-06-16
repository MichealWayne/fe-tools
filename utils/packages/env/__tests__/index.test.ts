describe('env index', () => {
  function loadEnvModule() {
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('../src');
  }

  it('should expose runtime metadata consistently', () => {
    const envModule = loadEnvModule();
    const env = envModule.default;

    expect(env.ENV_MAP).toBe(envModule.ENV_MAP);
    expect(typeof envModule.isReactNative).toBe('boolean');
    expect(Object.values(envModule.RunTimeIdMap)).toContain(envModule.RUNTIME_NAME);
  });

  it('should keep default export aligned with named exports', () => {
    const envModule = loadEnvModule();
    const env = envModule.default;

    expect(env.GLOBAL).toBe(envModule.GLOBAL);
    expect(env.__DEV__).toBe(envModule.__DEV__);
    expect(env.isWeb).toBe(envModule.isWeb);
    expect(env.isNode).toBe(envModule.isNode);
    expect(env.isReactNative).toBe(envModule.isReactNative);
    expect(env.RunTimeIdMap).toBe(envModule.RunTimeIdMap);
    expect(env.RUNTIME_NAME).toBe(envModule.RUNTIME_NAME);
  });

  it('should expose Weex only on the default export', () => {
    const envModule = loadEnvModule();

    expect(typeof envModule.default.isWeex).toBe('boolean');
    expect(Object.prototype.hasOwnProperty.call(envModule, 'isWeex')).toBe(false);
  });
});
