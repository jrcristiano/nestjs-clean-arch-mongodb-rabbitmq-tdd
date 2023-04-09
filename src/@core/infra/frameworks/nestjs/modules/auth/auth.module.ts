import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { LoginUseCase } from 'src/@core/application/use-cases/login/login.usecase';
import { AuthController } from 'src/@core/presentation/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { FindByEmailUseCase } from 'src/@core/application/use-cases/users/find-by-email.usecase';
import { UserRepository } from 'src/@core/infra/databases/mongodb/repositories/users/user.repository';
import { AuthorizationStrategy } from './strategies/authorization/authorization.strategy';
import { AuthenticationStrategy } from './strategies/authentication/authentication.strategy';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/@core/application/services/users/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import User from 'src/@core/infra/databases/mongodb/schemas/users/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: User,
			},
		]),
		PassportModule,
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: env.JWT_EXPIRES_IN },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthenticationStrategy,
		AuthorizationStrategy,
		UserRepository,
		{
			provide: UserService,
			useFactory: (userRepository: UserRepository) => {
				return new UserService(userRepository);
			},
			inject: [UserRepository],
		},
		{
			provide: LoginUseCase,
			useFactory: (userService: UserService, jwtService: JwtService) => {
				return new LoginUseCase(userService, jwtService);
			},
			inject: [UserService, JwtService],
		},
		{
			provide: FindByEmailUseCase,
			useFactory: (userService: UserService) => {
				return new FindByEmailUseCase(userService);
			},
			inject: [UserService],
		},
	],
})
export class AuthModule {}
