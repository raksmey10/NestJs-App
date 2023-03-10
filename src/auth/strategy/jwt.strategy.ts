import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'JWT_ACCESS_TOKEN_SECRET',
			//   secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: any) {
		return payload;
		// return { userId: payload.sub, email: payload.email };
	}
}
