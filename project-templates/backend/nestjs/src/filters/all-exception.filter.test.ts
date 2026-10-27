import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { describe, expect, it, jest } from '@jest/globals';

import { AllExceptionsFilter } from './all-exception.filter';

jest.mock('../controllers/logger', () => ({
  __esModule: true,
  default: { error: jest.fn() },
}));

describe('AllExceptionsFilter', () => {
  const createHost = () => {
    const reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const request = { method: 'GET', url: '/resource' };
    const host = {
      switchToHttp: () => ({
        getResponse: () => reply,
        getRequest: () => request,
      }),
    } as unknown as ArgumentsHost;

    return { host, reply };
  };

  it('preserves client error status and message', () => {
    const filter = new AllExceptionsFilter();
    const { host, reply } = createHost();

    filter.catch(new BadRequestException('invalid request'), host);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith({ success: false, msg: 'invalid request' });
  });

  it('hides internal error details from 5xx responses', () => {
    const filter = new AllExceptionsFilter();
    const { host, reply } = createHost();

    filter.catch(new Error('database password should not be returned'), host);

    expect(reply.status).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith({
      success: false,
      msg: 'Internal Server Error',
    });
  });
});
