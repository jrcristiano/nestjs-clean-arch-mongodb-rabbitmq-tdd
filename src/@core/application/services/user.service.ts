import { Injectable } from '@nestjs/common';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { UserRepository } from 'src/@core/infra/databases/mongodb/repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

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
		return await this.userRepository.create(data);
	}

	async update(id: string, data: User) {
		return await this.userRepository.update(id, data);
	}

	async destroy(id: string) {
		return await this.userRepository.destroy(id);
	}
}
