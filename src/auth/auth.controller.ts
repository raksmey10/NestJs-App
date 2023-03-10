import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import AuthService from './auth.service';
import { AuthDto } from './dto';
import express, { Request, Response } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// Override default configuration for Rate limiting and duration.
	@Throttle(3, 60) // allow rate limiting: 3 requests within 60 seconds
	@Post('local/signin')
	async signinLocal(
		@Body() authDto: AuthDto,
		@Res() res: Response,
	): Promise<any> {
		const token = await this.authService.singinLocal(authDto);
		return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, token });
	}
}
