import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { SortOrder } from 'mongoose';

export class PaginationParamProductDto {
	@Type(() => Number)
	@IsOptional()
	@IsNumber()
	page?: number;

	@Type(() => Number)
	@IsOptional()
	@IsNumber()
	limit?: number;

	@Type(() => String)
	@IsOptional()
	@IsString()
	search?: string;

	@Type(() => String)
	@IsOptional()
	@IsString()
	sort?: SortOrder;
}
