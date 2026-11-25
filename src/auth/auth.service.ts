import type { UserRegisterDto } from './dto/user-register.dto';
import type { UserLoginDto } from './dto/user-login.dto';
import type { UsersPort, PasswordHasher, AuthResult } from './auth.types';
import type TokenService from './services/token/token.service';

class AuthService {
	tokenService: TokenService;
	userService: UsersPort;
	passwordService: PasswordHasher;

	constructor(tokenService: TokenService, userService: UsersPort, passwordService: PasswordHasher) {
		this.tokenService = tokenService;
		this.userService = userService;
		this.passwordService = passwordService;
	}

	async registerUser(data: UserRegisterDto): Promise<AuthResult | null> {
		try {
			const { hash, pepperVersion } = await this.passwordService.hash(data.password);
			const user = await this.userService.createUser({ ...data, password: hash, pepperVersion });
			if (!user) return null;

			return {
				...user,
				accessToken: this.tokenService.signAccess({ id: user.id }),
				refreshToken: this.tokenService.generateRefresh(),
			};
		} catch (error) {
			throw error;
		}
	}

	async loginUser(data: UserLoginDto): Promise<AuthResult | null> {
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
				accessToken: this.tokenService.signAccess({ id: user.id }),
				refreshToken: this.tokenService.generateRefresh(),
			};
		} catch (error) {
			throw error;
		}
	}
}

export default AuthService;
