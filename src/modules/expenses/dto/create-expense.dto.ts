import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
	@IsNotEmpty()
	@IsString()
	@Type(() => String)
	item: string;
}
