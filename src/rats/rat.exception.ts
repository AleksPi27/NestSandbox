import { HttpException, HttpStatus } from '@nestjs/common';

export class PayloadTooLargeException extends HttpException {
  constructor() {
    super('Response should not contain cars', HttpStatus.PAYLOAD_TOO_LARGE);
  }
}
