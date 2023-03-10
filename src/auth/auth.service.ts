import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateLoginUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findByEmail(email);

		if (!user) throw new BadRequestException('Invalid credentials');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new BadRequestException('Incorrect password');

		return user;
	}

	async singinLocal(authDto: AuthDto) {
		// retrieve the user
		const user = await this.validateLoginUser(authDto.email, authDto.password);
		return this.signUser(user.id, user.email);
	}

	signUser(userId: string, email: string) {
		return this.jwtService.sign({ sub: userId, email: email });
	}
}
