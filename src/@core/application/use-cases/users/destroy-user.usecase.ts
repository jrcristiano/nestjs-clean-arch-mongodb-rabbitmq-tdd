import { UserService } from '../../services/user.service';

export class DestroyUserUseCase {
	constructor(private readonly userService: UserService) {}

	async execute(id: string) {
		return await this.userService.destroy(id);
	}
}
