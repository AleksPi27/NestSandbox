import { Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionLogger {
  printRequestAndResponse(request, response) {
    console.group('request');
    console.log(request);
    console.groupEnd();

    console.group('response');
    console.log(response);
    console.groupEnd();
  }
}
