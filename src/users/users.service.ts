import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const checkUser = await this.userModel
			.findOne({ email: createUserDto.email })
			.exec();
		if (checkUser) throw new BadRequestException('Email already exists');

		const user = new this.userModel(createUserDto);
		const password = createUserDto.password;
		const saltRounds = 10;
		const hash = await bcrypt.hash(password, saltRounds);

		user.email = createUserDto.email; // user.password = password;
		user.password = hash;
		const save = await user.save();

		if (!save)
			throw new BadRequestException('Something bad happened while saving');

		return save;
	}

	async findByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email: email }).exec();
	}

	findAll() {
		return `This action returns all users`;
	}

	async findOne(id: string) {
		if (!Types.ObjectId.isValid(id))
			throw new BadRequestException(`Invalid id: ${id}`);
		const user = await this.userModel
			.findOne({ _id: id })
			.select('_id, email')
			.exec();
		if (!user) throw new NotFoundException(`User ${id} not found`);
		return user;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
