import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getJsonMessage(): { message: string } {
    return { message: 'Hello World!' };
  }
}
