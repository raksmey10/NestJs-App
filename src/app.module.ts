import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import mongodbConfig from './config/database/mongodb.config';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ExpensesModule } from './modules/expenses/expenses.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			load: [mongodbConfig]
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('mongodb.uri')
			}),
			inject: [ConfigService]
		}),
		ThrottlerModule.forRoot({
			ttl: 10, // time to live: 60 seconds
			limit: 3 // number of requests allowed every ttl
		}),
		ProductsModule,
		AuthModule,
		UsersModule,
		ExpensesModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			// global configuration throttler
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	]
})
export class AppModule {}
