/**
 * @author Wayne
 * @Date 2025-06-02 14:17:10
 * @LastEditTime 2025-06-02 17:31:52
 */
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { config } from '../config';

// Import route modules
import healthRoutes from './health.routes';
import userRoutes from './user.routes';

// Define route options interface
export interface RouteOptions {
  prefix: string;
}

// Array of route modules with their options
const routes: Array<{ plugin: FastifyPluginAsync; options?: RouteOptions }> = [
  { plugin: healthRoutes, options: { prefix: '/health' } },
  { plugin: userRoutes, options: { prefix: '/users' } },
];

/**
 * Register all routes with their respective prefixes
 */
export async function registerRoutes(app: FastifyInstance): Promise<void> {
  // Register each route module
  for (const route of routes) {
    const prefix = route.options?.prefix
      ? `${config.apiPrefix}${route.options.prefix}`
      : config.apiPrefix;

    await app.register(route.plugin, { prefix });
  }

  // Add a test route
  app.get(`${config.apiPrefix}/test`, async () => {
    return { message: 'API is working!' };
  });
}

export default registerRoutes;
