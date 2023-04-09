import { Injectable } from '@nestjs/common';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { FindByEmailUseCase } from 'src/@core/application/use-cases/users/find-by-email.usecase';

@ValidatorConstraint({ name: 'EmailAlreadyUsedRule' })
@Injectable()
export class EmailAlreadyUsedRule implements ValidatorConstraintInterface {
	constructor(private findByEmailUseCase: FindByEmailUseCase) {}

	async validate(email: string) {
		const user = await this.findByEmailUseCase.execute(email);
		if (user) {
			return false;
		}

		return true;
	}

	defaultMessage() {
		return 'User already registered.';
	}
}
