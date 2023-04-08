import { UserService } from '../../services/user.service';

export class GetAllUseCase {
	constructor(private readonly userService: UserService) {}

	async execute() {
		return await this.userService.getAll();
	}
}
