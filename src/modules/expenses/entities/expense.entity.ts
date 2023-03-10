import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Expense {
	@Prop({ required: true }) item: string;
	@Prop({ type: 'string' }) note: string;
	@Prop({
		required: true,
		type: 'boolean',
		default: false,
		description: 'true: delete, false: not delete'
	})
	isDelete: boolean;
	@Prop({ default: Date.now }) createdAt: Date;
	@Prop({ default: Date.now }) updatedAt: Date;
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
