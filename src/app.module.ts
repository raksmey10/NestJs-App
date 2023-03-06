import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import mongodbConfig from './config/database/mongodb.config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://raksmey:lBzwRHZG6Yr333FN@cluster0.dhjzjhp.mongodb.net/myapp',
    ),
  ],
  // ConfigModule.forRoot({
  //   load: [mongodbConfig],
  //   isGlobal: true,
  //   envFilePath: '.env',
  // }),
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
