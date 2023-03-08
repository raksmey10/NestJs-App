import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // return 'Hello World!';
    const port = parseInt(process.env.PORT);
    return `app service running on port ${port}...`;
  }
}
