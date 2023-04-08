import { CreateUserDto } from '../../dto/requests/users/create-user.dto';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { UserService } from '../../services/user.service';

export class CreateUserUseCase {
	constructor(private readonly userService: UserService) {}

	async execute(createUserDto: CreateUserDto) {
		const user = User.create(createUserDto).getUser();
		return await this.userService.create(user);
	}
}
