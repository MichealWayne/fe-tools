describe('parseArgs', () => {
  const originalArgv = process.argv;

  afterEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it('should parse command line arguments', () => {
    process.argv = ['node', 'script.js', '--port', '3000', '--debug', '--', 'file.txt'];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { parseArgs } = require('../src/process/env');
    const args = parseArgs();
    expect(args.port).toBe(3000);
    expect(args.debug).toBe(true);
    expect(args._).toEqual(['file.txt']);
  });

  it('should export default parsed args', () => {
    process.argv = ['node', 'script.js', '--name', 'wayne'];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const envModule = require('../src/process/env');
    expect(envModule.default.name).toBe('wayne');
  });
});
