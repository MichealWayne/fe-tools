import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

const getHealthStatus = () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  uptime: process.uptime(),
});

@Controller('health')
export class HealthController {
  @Get()
  health() {
    return getHealthStatus();
  }

  @Get('live')
  live() {
    return getHealthStatus();
  }

  @Get('ready')
  ready() {
    const isReady = true;

    if (!isReady) {
      throw new HttpException(
        {
          status: 'unavailable',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return getHealthStatus();
  }
}
