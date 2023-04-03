import { ArgumentsHost, Inject } from '@nestjs/common';
import { ExceptionLogger } from './exception-logger.filter';

export class ExceptionFilter implements ExceptionFilter {
  @Inject()
  private readonly exceptionLogger: ExceptionLogger;
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    response.status(exception['response'].statusCode || 400).json({
      statusCode: exception['response'].statusCode || 400,
      timeStamp: new Date().toISOString(),
      path: request.url,
      body: request.body,
      reason: exception.message,
    });
  }
}
