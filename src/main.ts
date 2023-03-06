import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
// import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10);
  await app.listen(port, () => console.log(`Running on port ${port}...`));
}
bootstrap().then(() => console.log('Success'));
