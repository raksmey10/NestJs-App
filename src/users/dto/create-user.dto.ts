import { Type } from 'class-transformer';
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	@MaxLength(50)
	@Type(() => String)
	email: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(20)
	@Type(() => String)
	username: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@Type(() => String)
	password: string;
}
