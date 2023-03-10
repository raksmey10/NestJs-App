import { Type } from "class-transformer"
import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateProductDto {
    @IsOptional()
    @Type(() => Types.ObjectId)
    id: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    name: String

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Type(() => Number)
    qty: Number

    @IsNotEmpty()
    @IsDecimal()
    @Type(() => IsDecimal)
    price: Number
}
