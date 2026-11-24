import type { UserRegisterDto } from './dto/user-register.dto';
import type { UserResponseDto } from './dto/user-response.dto';
import type { UserLoginDto } from './dto/user-login.dto';
import type { UsersPort, PasswordHasher } from './auth.types';

type TokenService = any;

export interface AuthUserRecord {
	email: string;
	password: string;
	name: string;
}

class AuthService {
	tokenService: TokenService;
	userService: UsersPort;
	passwordService: PasswordHasher;

	constructor(tokenService: TokenService, userService: UsersPort, passwordService: PasswordHasher) {
		this.tokenService = tokenService;
		this.userService = userService;
		this.passwordService = passwordService;
	}

	async registerUser(data: UserRegisterDto): Promise<UserResponseDto | null> {
		try {
			const { hash, pepperVersion } = await this.passwordService.hash(data.password);
			const user = await this.userService.createUser({ ...data, password: hash, pepperVersion });
			return user || null;
		} catch (error) {
			throw error;
		}
	}

	async loginUser(data: UserLoginDto): Promise<UserResponseDto | null> {
		try {
			const user = await this.userService.getUserWithCredentialsByEmail(data.email);

			if (!user) {
				return null;
			}

			const { valid, needsRehash } = await this.passwordService.verify(data.password, {
				hash: user.password,
				pepperVersion: user.pepperVersion,
			});

			if (!valid) return null;

			if (needsRehash) {
				const fresh = await this.passwordService.hash(data.password);
				await this.userService.updatePassword(user.id, fresh.hash, fresh.pepperVersion);
			}

			return {
				name: user.name,
				email: user.email,
				id: user.id,
				createdAt: user.createdAt,
			};
		} catch (error) {
			throw error;
		}
	}
}

export default AuthService;
