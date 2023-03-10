import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
	@Prop({
		required: true,
	})
	name: String;

	@Prop({
		required: true,
	})
	qty: Number;

	@Prop({
		required: true,
	})
	price: Number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
