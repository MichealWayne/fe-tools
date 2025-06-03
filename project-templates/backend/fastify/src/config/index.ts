import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

// Constants
const DEFAULT_PORT = 3000;
const DEFAULT_HOST = '0.0.0.0';
const DEFAULT_API_PREFIX = '/api';

// Enums
export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Trace = 'trace',
}

// Schema Definitions
const LoggingSchema = z.object({
  dir: z.string().default('logs'),
  maxFileSize: z.number().default(10 * 1024 * 1024), // 10MB
  maxFiles: z.number().default(7),
  errorLogFile: z.string().default('error.log'),
  appLogFile: z.string().default('app.log'),
  errorLogLevel: z.nativeEnum(LogLevel).default(LogLevel.Error),
});

const CorsSchema = z.object({
  origin: z.union([z.string(), z.array(z.string())]).default('*'),
});

const RateLimitSchema = z.object({
  enabled: z.boolean().default(true),
  max: z.number().default(100),
  timeWindow: z.number().default(60000), // 1 minute in ms
});

const SwaggerSchema = z.object({
  enabled: z.boolean().default(true),
});

const JwtSchema = z.object({
  secret: z.string().min(32, 'JWT secret must be at least 32 characters long'),
  expiresIn: z.string().default('1h'),
});

const DatabaseSchema = z.object({
  url: z.string().url('Invalid database URL'),
});

const ConfigSchema = z.object({
  env: z.nativeEnum(Environment).default(Environment.Development),
  port: z.number().min(1).max(65535).default(DEFAULT_PORT),
  host: z.string().default(DEFAULT_HOST),
  apiPrefix: z.string().startsWith('/').default(DEFAULT_API_PREFIX),
  logLevel: z.nativeEnum(LogLevel).default(LogLevel.Info),
  logging: LoggingSchema.default({}),
  cors: CorsSchema.default({}),
  rateLimit: RateLimitSchema.default({}),
  swagger: SwaggerSchema.default({}),
  jwt: JwtSchema.default({
    secret: 'dev-secret-key-that-is-32-characters-long',
  }),
  database: DatabaseSchema.default({ url: 'postgres://user:password@localhost:5432/fastify_db' }),
});

type Config = z.infer<typeof ConfigSchema>;

// Helper functions
const parseBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

const parseNumber = (value: string | undefined, defaultValue: number): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Configuration Builder
class ConfigBuilder {
  private config: Partial<Config> = {};

  constructor() {
    this.config.env = (process.env.NODE_ENV as Environment) || Environment.Development;
  }

  private loadFromEnv(): void {
    this.config = {
      ...this.config,
      port: parseNumber(process.env.PORT, DEFAULT_PORT),
      host: process.env.HOST || DEFAULT_HOST,
      apiPrefix: process.env.API_PREFIX || DEFAULT_API_PREFIX,
      logLevel: (process.env.LOG_LEVEL as LogLevel) || LogLevel.Info,
      logging: {
        dir: process.env.LOG_DIR || 'logs',
        maxFileSize: parseNumber(process.env.LOG_MAX_FILE_SIZE, 10 * 1024 * 1024),
        maxFiles: parseNumber(process.env.LOG_MAX_FILES, 7),
        errorLogFile: process.env.ERROR_LOG_FILE || 'error.log',
        appLogFile: process.env.APP_LOG_FILE || 'app.log',
        errorLogLevel: (process.env.ERROR_LOG_LEVEL as LogLevel) || LogLevel.Error,
      },
      cors: {
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
      },
      rateLimit: {
        enabled: parseBoolean(process.env.RATE_LIMIT_ENABLED, true),
        max: parseNumber(process.env.RATE_LIMIT_MAX, 100),
        timeWindow: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 60000),
      },
      swagger: {
        enabled: parseBoolean(process.env.SWAGGER_ENABLED, true),
      },
      jwt: {
        secret: process.env.JWT_SECRET || 'your-jwt-secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      },
      database: {
        url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/fastify_db',
      },
    };
  }

  private validate(): void {
    if (this.config.env === Environment.Production) {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is required in production');
      }
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is required in production');
      }
    }
  }

  public build(): Config {
    this.loadFromEnv();
    this.validate();

    const result = ConfigSchema.safeParse(this.config);

    if (!result.success) {
      const errors = result.error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('\n');
      throw new Error(`Invalid configuration:\n${errors}`);
    }

    return result.data;
  }
}

// Create and export the config instance
const config = new ConfigBuilder().build();

export { config, Config };
export default config;
