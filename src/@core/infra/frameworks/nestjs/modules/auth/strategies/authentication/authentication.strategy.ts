import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUseCase } from 'src/@core/application/use-cases/login/login.usecase';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
	constructor(private loginUseCase: LoginUseCase) {
		super({
			usernameField: 'email',
			passwordField: 'password',
		});
	}

	async validate(username: string, password: string): Promise<any> {
		const user = await this.loginUseCase.execute(username, password);
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
