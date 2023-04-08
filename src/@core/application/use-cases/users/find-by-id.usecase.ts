import { UserService } from '../../services/user.service';

export class FindByIdUseCase {
	constructor(private readonly userService: UserService) {}

	async execute(id: string) {
		return await this.userService.findById(id);
	}
}
