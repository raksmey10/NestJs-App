import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mongodbConfig from './config/database/mongodb.config';
import { environments } from './config/environments';
import { ConfigModule } from '@nestjs/config';
import { mongodbModule } from './config/database/mongodb.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [mongodbConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    mongodbModule,
  ],

  // MongooseModule.forRootAsync({
  //   imports: [ConfigModule],
  //   inject: [ConfigService],
  //   useFactory: async (config: ConfigService) => ({
  //     uri: config.get<string>('mongodb.uri'), // Loaded from .ENV
  //   }),
  // }),
  // MongooseModule.forRootAsync({
  //   imports: [ConfigModule],
  //   inject: [ConfigService],
  //   useFactory: async (config: ConfigService) => ({
  //     uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
  //   }),
  // }),

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
