import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		const port = parseInt(process.env.PORT);
		return `hello! app service is successfully running on port ${port}...`;
	}
}
