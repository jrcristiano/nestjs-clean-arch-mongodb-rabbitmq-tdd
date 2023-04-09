import {
	Module,
	NestModule,
	RequestMethod,
	MiddlewareConsumer,
} from '@nestjs/common';
import { UsersController } from 'src/@core/presentation/controllers/users/users.controller';
import { FindUserMiddleware } from './middlewares/find-user/find-user.middleware';
import { UserRepository } from 'src/@core/infra/databases/mongodb/repositories/users/user.repository';
import { EmailAlreadyUsedRule } from 'src/@core/infra/validations/rules/email-already-used';
import { GetAllUseCase } from 'src/@core/application/use-cases/users/get-all.usecase';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';
import { FindByEmailUseCase } from 'src/@core/application/use-cases/users/find-by-email.usecase';
import { CreateUserUseCase } from 'src/@core/application/use-cases/users/create-user.usecase';
import { UpdateUserUseCase } from 'src/@core/application/use-cases/users/update-user.usecase';
import { DestroyUserUseCase } from 'src/@core/application/use-cases/users/destroy-user.usecase';
import { UserService } from 'src/@core/application/services/users/user.service';
import User from 'src/@core/infra/databases/mongodb/schemas/users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqService } from 'src/@core/application/services/rabbitmq/rabbitmq.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: User,
			},
		]),
	],
	controllers: [UsersController],
	providers: [
		RabbitmqService,
		FindUserMiddleware,
		{
			provide: GetAllUseCase,
			useFactory: (userRepository: UserRepository) => {
				return new GetAllUseCase(new UserService(userRepository));
			},
			inject: [UserRepository],
		},
		{
			provide: CreateUserUseCase,
			useFactory: (
				userRepository: UserRepository,
				rabbitmqService: RabbitmqService,
			) => {
				return new CreateUserUseCase(
					new UserService(userRepository, rabbitmqService),
				);
			},
			inject: [UserRepository, RabbitmqService],
		},
		{
			provide: UpdateUserUseCase,
			useFactory: (
				userRepository: UserRepository,
				rabbitmqService: RabbitmqService,
			) => {
				return new UpdateUserUseCase(
					new UserService(userRepository, rabbitmqService),
				);
			},
			inject: [UserRepository, RabbitmqService],
		},
		{
			provide: FindByIdUseCase,
			useFactory: (userRepository: UserRepository) => {
				return new FindByIdUseCase(new UserService(userRepository));
			},
			inject: [UserRepository],
		},
		{
			provide: FindByEmailUseCase,
			useFactory: (userRepository: UserRepository) => {
				return new FindByEmailUseCase(new UserService(userRepository));
			},
			inject: [UserRepository],
		},
		{
			provide: DestroyUserUseCase,
			useFactory: (userRepository: UserRepository) => {
				return new DestroyUserUseCase(new UserService(userRepository));
			},
			inject: [UserRepository],
		},
		UserRepository,
		EmailAlreadyUsedRule,
	],
	exports: [
		GetAllUseCase,
		FindByEmailUseCase,
		FindByIdUseCase,
		CreateUserUseCase,
		UpdateUserUseCase,
		DestroyUserUseCase,
	],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(FindUserMiddleware)
			.forRoutes({ path: 'users/:id', method: RequestMethod.GET })
			.apply(FindUserMiddleware)
			.forRoutes({ path: 'users/:id', method: RequestMethod.PUT })
			.apply(FindUserMiddleware)
			.forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
	}
}
