import type { UserResponseDto, UserResponseWithCredentialsDto } from './dto/user-response.dto';

export interface UsersPort {
	getAllUsers(): Promise<UserResponseDto[]>;
	getUserWithCredentialsByEmail(email: string): Promise<UserResponseWithCredentialsDto | null>;
	createUser(data: {
		name: string;
		email: string;
		password: string;
		pepperVersion: number;
	}): Promise<UserResponseDto | null>;
	updatePassword(id: string, hash: string, pepperVersion: number): Promise<UserResponseDto | null>;
}

export interface PasswordHasher {
	hash(plain: string): Promise<{ hash: string; pepperVersion: number }>;
	verify(
		plain: string,
		stored: { hash: string; pepperVersion: number },
	): Promise<{ valid: boolean; needsRehash: boolean }>;
}
