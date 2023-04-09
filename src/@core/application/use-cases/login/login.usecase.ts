import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { AccessTokenResponseDto } from '../../dto/responses/jwt/access-token-response.dto';
import { UserResponseDto } from '../../dto/responses/users/user.dto';
import { comparePassword } from 'src/@core/infra/utils/password-hash/password-hash.util';
import { UserService } from '../../services/users/user.service';

export class LoginUseCase {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async execute(
		email: string,
		password: string,
	): Promise<AccessTokenResponseDto> {
		const user = await this.userService.findByEmail(email);
		if (!user) {
			return null;
		}

		const validatedPassword = comparePassword(password, user.password);
		if (!validatedPassword) {
			return null;
		}

		delete user.password;
		return this.getAccessToken(user);
	}

	private getAccessToken(user: UserResponseDto): AccessTokenResponseDto {
		return {
			access_token: this.jwtService.sign(user),
			expires_in: env.JWT_EXPIRES_IN,
		};
	}
}
