import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { GetCurrentUserById } from './utils';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	// @UseGuards(JwtAuthGuard)
	@Get()
	getHello(@GetCurrentUserById() userId: number): string {
		// console.log('hello user');
		Logger.debug('hello world');
		// console.log('gethello() contoller => user ID: ', userId);
		return this.appService.getHello();
	}
}
