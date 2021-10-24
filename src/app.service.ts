import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Filippo';
  }
  getHelloPrivate(): string {
    return 'Hello World! Filippo Private';
  }
}
