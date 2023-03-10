import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as mongoose from 'mongoose';
async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const PREFIX = process.env.GLOBAL_PREFIX;
	app.setGlobalPrefix(PREFIX);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	mongoose.set('debug', true);
	const port = parseInt(process.env.PORT);
	await app.listen(port, () => console.log(`Running on port ${port}...`));
}
bootstrap().then(() => console.log('Success'));
