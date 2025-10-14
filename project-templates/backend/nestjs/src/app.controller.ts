import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SERVER_NAME } from './constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return `hello ${SERVER_NAME}.`;
  }

  @Get('/readiness')
  readiness(): string {
    return `hello ${SERVER_NAME}.`;
  }

  @Get('/getTest')
  getTest(@Query() query: Record<string, any>): any {
    return {
      result: 'get',
      name: query?.name,
      param: query,
    };
  }

  @Post('/postTest')
  postTest(@Body() body: Record<string, any>): any {
    return {
      result: 'post',
      name: body?.name,
      param: body,
    };
  }
}
