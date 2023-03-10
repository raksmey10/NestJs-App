import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
	@IsNotEmpty()
	@IsString()
	@Type(() => String)
	item: string;

	@IsOptional()
	@IsString()
	@Type(() => String)
	note: string;
}
