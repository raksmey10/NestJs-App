import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port = parseInt(process.env.PORT, 10);
  await app.listen(config.get<number>('port'), () =>
    console.log(`Running on port ${port}...`),
  );
  // await app.listen(3000, () => console.log(`Running on port 3000...`));
}
bootstrap().then(() => console.log('Success'));
