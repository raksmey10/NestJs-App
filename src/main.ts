import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT);
  await app.listen(port, () => console.log(`Running on port ${port}...`));
}
bootstrap().then(() => console.log('Success'));
