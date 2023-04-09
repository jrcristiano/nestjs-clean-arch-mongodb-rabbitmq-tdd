import { UserService } from '../../services/users/user.service';

export class DestroyUserUseCase {
	constructor(private readonly userService: UserService) {}

	async execute(id: string) {
		return await this.userService.destroy(id);
	}
}
