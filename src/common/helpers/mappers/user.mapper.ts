import type { UserResponseDto, UserResponseWithCredentialsDto } from '../../../user/dto/user-response.dto';
import type { User } from '../../../user/entities/user.entity';

export const toUserResponse = (user: User): UserResponseDto => ({
	id: user.id,
	name: user.name,
	email: user.email,
	createdAt: user.createdAt,
});

export const toUserWithCredentialsResponse = ({
	id,
	name,
	email,
	createdAt,
	pepperVersion,
	password,
}: User): UserResponseWithCredentialsDto => ({
	id,
	name,
	email,
	createdAt,
	pepperVersion,
	password,
});
