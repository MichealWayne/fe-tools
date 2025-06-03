import { FastifyPluginAsync } from 'fastify';
import { Type } from '@sinclair/typebox';

const userRoutes: FastifyPluginAsync = async fastify => {
  // Get all users
  fastify.get('/', {
    schema: {
      tags: ['users'],
      description: 'Get all users',
      response: {
        200: Type.Array(
          Type.Object({
            id: Type.String({ format: 'uuid' }),
            name: Type.String(),
            email: Type.String({ format: 'email' }),
          })
        ),
      },
    },
    handler: async () => {
      // In a real app, this would fetch users from a database
      return [
        { id: '550e8400-e29b-41d4-a716-446655440000', name: 'John Doe', email: 'john@example.com' },
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Jane Smith',
          email: 'jane@example.com',
        },
      ];
    },
  });

  // Get user by ID
  fastify.get<{ Params: { id: string } }>('/:id', {
    schema: {
      tags: ['users'],
      description: 'Get user by ID',
      params: Type.Object({
        id: Type.String({ format: 'uuid' }),
      }),
      response: {
        200: Type.Object({
          id: Type.String({ format: 'uuid' }),
          name: Type.String(),
          email: Type.String({ format: 'email' }),
        }),
        404: Type.Object({
          statusCode: Type.Number(),
          error: Type.String(),
          message: Type.String(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      // In a real app, this would fetch a user from the database
      if (id === '550e8400-e29b-41d4-a716-446655440000') {
        return {
          id,
          name: 'John Doe',
          email: 'john@example.com',
        };
      }
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'User not found',
      });
    },
  });

  // Create a new user
  fastify.post<{
    Body: {
      name: string;
      email: string;
      password: string;
    };
  }>('/', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: Type.Object({
        name: Type.String({ minLength: 2 }),
        email: Type.String({ format: 'email' }),
        password: Type.String({ minLength: 6 }),
      }),
      response: {
        201: Type.Object({
          id: Type.String({ format: 'uuid' }),
          name: Type.String(),
          email: Type.String({ format: 'email' }),
        }),
      },
    },
    handler: async (request, reply) => {
      const { name, email } = request.body;
      // In a real app, this would create a user in the database
      const newUser = {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name,
        email,
      };
      return reply.status(201).send(newUser);
    },
  });
};

export default userRoutes;
