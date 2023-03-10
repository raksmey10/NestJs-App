import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class AuthDto {
	@IsNotEmpty()
	@IsEmail()
	@MaxLength(255)
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	password: string;
}
