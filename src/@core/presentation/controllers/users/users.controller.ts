import { Controller } from '@nestjs/common';
import {
	Body,
	Delete,
	Get,
	Param,
	Post,
	Put,
	// Req,
	Res,
	// UseGuards,
} from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';
import { UpdateUserDto } from 'src/@core/application/dto/requests/users/update-user.dto';
import { CreateUserUseCase } from 'src/@core/application/use-cases/users/create-user.usecase';
import { DestroyUserUseCase } from 'src/@core/application/use-cases/users/destroy-user.usecase';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';
import { GetAllUseCase } from 'src/@core/application/use-cases/users/get-all.usecase';
import { UpdateUserUseCase } from 'src/@core/application/use-cases/users/update-user.usecase';
import { HttpStatus } from '@nestjs/common/enums';
import { Request, Response } from 'express';
// import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';

@Controller('users')
export class UsersController {
	constructor(
		private readonly getAllUseCase: GetAllUseCase,
		private readonly findByIdUseCase: FindByIdUseCase,
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly updateUserUseCase: UpdateUserUseCase,
		private readonly destroyUserUseCase: DestroyUserUseCase,
	) {}

	@Get()
	// @UseGuards(AuthorizationGuard)
	async index(@Res() res: Response) {
		try {
			const data = await this.getAllUseCase.execute();
			return res.status(HttpStatus.OK).json({
				data,
			});
		} catch ({ message }) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				message,
			});
		}
	}

	@Get(':id')
	// @UseGuards(AuthorizationGuard)
	async show(@Param('id') id: string, @Res() res: Response) {
		try {
			const data = await this.findByIdUseCase.execute(id);
			return res.status(HttpStatus.OK).json({
				data,
			});
		} catch ({ message }) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				message,
			});
		}
	}

	@Post()
	// @UseGuards(AuthorizationGuard)
	async store(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
		try {
			await this.createUserUseCase.execute(createUserDto);
			return res.status(HttpStatus.CREATED).json({
				message: 'User created successfully!',
			});
		} catch ({ message }) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				message,
			});
		}
	}

	@Put(':id')
	// @UseGuards(AuthorizationGuard)
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
		@Res() res: Response,
	) {
		try {
			return await this.updateUserUseCase.execute(id, updateUserDto);
		} catch ({ message }) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				message,
			});
		}
	}

	@Delete(':id')
	// @UseGuards(AuthorizationGuard)
	async destroy(@Param('id') id: string, @Res() res: Response) {
		try {
			return await this.destroyUserUseCase.execute(id);
		} catch ({ message }) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				message,
			});
		}
	}
}
