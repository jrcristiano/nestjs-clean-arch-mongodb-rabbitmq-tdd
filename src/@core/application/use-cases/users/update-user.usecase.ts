import { UpdateUserDto } from '../../dto/requests/users/update-user.dto';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { UserService } from '../../services/user.service';

export class UpdateUserUseCase {
	constructor(private readonly userService: UserService) {}

	async execute(id: string, updateUserDto: UpdateUserDto) {
		const user = User.create(updateUserDto).getUser();
		return await this.userService.update(id, user);
	}
}
