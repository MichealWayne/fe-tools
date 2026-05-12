/**
 * 全局异常过滤器，统一 JSON 返回
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../controllers/logger';

function getExceptionMessage(exception: unknown): string {
  if (exception instanceof HttpException) {
    const response = exception.getResponse();
    if (typeof response === 'object' && response !== null && 'message' in response) {
      const message = (response as { message?: unknown }).message;
      return Array.isArray(message) ? message.join(', ') : String(message || exception.message);
    }
    return exception.message;
  }

  return exception instanceof Error ? exception.message : 'Unknown Internal Server Error';
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg = getExceptionMessage(exception);

    logger.error(`[${request.method}] ${request.url} - ${msg}`);

    void response.status(status).send({
      success: false,
      msg,
    });
  }
}
