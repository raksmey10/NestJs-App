import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import mongodbConfig from './config/database/mongodb.config';
import { environments } from './config/environments';
// import { mongodbModule } from './config/database/mongodb.module';
// import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule, ConfigService } from "nestjs-dotenv";
// import { MongodbModule } from './config/database/mongodb.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ConfigService } from 'nestjs-dotenv';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.CONNECTION_STRING,
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ConfigModule.forRoot({
//   envFilePath: environments[process.env.NODE_ENV] || '.env',
//   load: [mongodbConfig],
//   isGlobal: true,
//   // validationSchema: Joi.object({
//   //   uri: Joi.string().required(),
//   // }),
// }),
// mongodbModule,
// MongooseModule.forRootAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (config: ConfigService) => ({
//     uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
//   }),
// }),
