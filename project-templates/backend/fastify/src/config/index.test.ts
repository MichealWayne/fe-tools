const configEnvKeys = [
  'NODE_ENV',
  'PORT',
  'HOST',
  'API_PREFIX',
  'LOG_LEVEL',
  'LOG_DIR',
  'LOG_MAX_FILE_SIZE',
  'LOG_MAX_FILES',
  'ERROR_LOG_FILE',
  'ERROR_LOG_LEVEL',
  'CORS_ORIGIN',
  'CORS_CREDENTIALS',
  'RATE_LIMIT_ENABLED',
  'RATE_LIMIT_MAX',
  'RATE_LIMIT_WINDOW_MS',
  'SWAGGER_ENABLED',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'DATABASE_URL',
];

const originalConfigEnv = Object.fromEntries(configEnvKeys.map(key => [key, process.env[key]]));

jest.mock('dotenv', () => ({
  __esModule: true,
  default: { config: jest.fn() },
}));

const loadConfig = () => {
  let loaded: typeof import('./index') | undefined;
  jest.isolateModules(() => {
    loaded = require('./index');
  });
  return loaded!.config;
};

describe('Fastify configuration', () => {
  beforeEach(() => {
    configEnvKeys.forEach(key => delete process.env[key]);
    jest.resetModules();
  });

  afterEach(() => {
    configEnvKeys.forEach(key => {
      const value = originalConfigEnv[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
    jest.resetModules();
  });

  it('requires a unique JWT secret in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/app';

    expect(() => loadConfig()).toThrow('Set a unique JWT_SECRET before starting in production');
  });

  it('requires a database URL in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_SECRET = 'test-production-secret-with-more-than-32-chars';

    expect(() => loadConfig()).toThrow('DATABASE_URL is required in production');
  });

  it('rejects credentialed wildcard CORS', () => {
    process.env.CORS_ORIGIN = '*';
    process.env.CORS_CREDENTIALS = 'true';

    expect(() => loadConfig()).toThrow(
      'CORS_CREDENTIALS=true requires explicit CORS_ORIGIN values, not *'
    );
  });

  it('disables Swagger by default in production and enables it in development', () => {
    process.env.NODE_ENV = 'production';
    process.env.JWT_SECRET = 'test-production-secret-with-more-than-32-chars';
    process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/app';
    expect(loadConfig().swagger.enabled).toBe(false);

    process.env.NODE_ENV = 'development';
    expect(loadConfig().swagger.enabled).toBe(true);
  });
});
