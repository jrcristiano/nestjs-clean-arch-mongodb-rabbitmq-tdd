import { Injectable } from '@nestjs/common';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { UserRepository } from 'src/@core/infra/databases/mongodb/repositories/users/user.repository';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class UserService {
	private readonly QUEUE_NAME = 'users_queue';

	constructor(
		private readonly userRepository: UserRepository,
		private readonly rabbitmqService?: RabbitmqService,
	) {}

	async getAll() {
		return await this.userRepository.getAll();
	}

	async findById(id: string) {
		return await this.userRepository.findById(id);
	}

	async findByEmail(email: string) {
		return await this.userRepository.findByEmail(email);
	}

	async create(data: User) {
		const createUser = { ...data, action: 'CREATE_USER' };

		await this.rabbitmqService.publishInQueue(
			this.QUEUE_NAME,
			JSON.stringify(createUser),
		);

		return await this.userRepository.create(data);
	}

	async update(id: string, data: User) {
		const updateUser = { ...data, action: 'UPDATE_USER' };

		await this.rabbitmqService.publishInQueue(
			this.QUEUE_NAME,
			JSON.stringify(updateUser),
		);

		return await this.userRepository.update(id, data);
	}

	async destroy(id: string) {
		const deleteUser = { id, action: 'DELETE_USER' };

		await this.rabbitmqService.publishInQueue(
			this.QUEUE_NAME,
			JSON.stringify(deleteUser),
		);

		return await this.userRepository.destroy(id);
	}
}
