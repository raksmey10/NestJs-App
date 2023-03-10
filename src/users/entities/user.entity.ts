import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true, select: false })
	password: string;

	@Prop({ default: false, comment: '1: delete, 0: not delete' })
	isDelete: boolean;

	@Prop({ default: true, comment: '1: active, 0: inactive' })
	isActive: boolean;

	@Prop({ nullable: true })
	createdAt: Date;

	@Prop({ nullable: true })
	updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
