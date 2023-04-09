import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto } from 'src/@core/application/dto/responses/users/user.dto';
import { User } from 'src/@core/domain/entities/users/user.entity';

const columns = {
	name: true,
	lastname: true,
	email: true,
	created_at: true,
	updated_at: true,
};

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel('User') private readonly user: Model<UserResponseDto>,
	) {}

	async getAll() {
		return await this.user.find().select(columns).exec();
	}

	async findById(id: string) {
		return await this.user.findById(id).select(columns).exec();
	}

	async findByEmail(email: string) {
		return await this.user
			.findOne({
				email,
			})
			.select(columns)
			.exec();
	}

	async create(data: User) {
		return await this.user.create(data);
	}

	async update(id: string, data: User) {
		return await this.user.updateOne({ _id: id }, data);
	}

	async destroy(id: string) {
		return await this.user.deleteOne({ _id: id });
	}
}
