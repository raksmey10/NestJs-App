import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Res,
	HttpStatus,
	UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetCurrentUserById } from 'src/utils';
import { JwtAuthGuard } from 'src/utils/guards/JwtGuard.guard';
import express, { Request, Response } from 'express';
import { Express } from 'express';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('create')
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.usersService.create(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getAuthUser(
		@GetCurrentUserById() userId: string,
		@Res() res: Response,
	): Promise<any> {
		const user = await this.usersService.findOne(userId);
		return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, user });
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	//   return this.usersService.findOne(+id);
	// }

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id);
	}

	@Post('upload/avatar')
	// @UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		// console.log(file);
		return 'here';
	}
}
