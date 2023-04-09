import { UserService } from '../../services/users/user.service';

export class FindByEmailUseCase {
	constructor(private readonly userService: UserService) {}

	async execute(email: string) {
		return await this.userService.findByEmail(email);
	}
}
