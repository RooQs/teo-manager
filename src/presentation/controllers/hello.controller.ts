import { Controller, Get, Req, Request } from "@nestjs/common";

@Controller()
export class HelloController {
  @Get()
  getHello(@Req() request: Request): Headers {
    return request.headers;
  }
}
