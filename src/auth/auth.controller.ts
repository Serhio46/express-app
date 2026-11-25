import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import type { UserRegisterDto } from './dto/user-register.dto';
import type { UserLoginDto } from './dto/user-login.dto';
import type AuthService from './auth.service';
import type { AuthResult } from './auth.types';
import { UserResponseDto } from './dto/user-response.dto';
import { setCookie } from '../common/helpers/cookie.helper/cookie.helper';
import { REFRESH_COOKIE, REFRESH_COOKIE_OPTIONS } from './auth.constants';

type AuthBody = Omit<AuthResult, 'refreshToken'>;
type ResponseType = UserResponseDto | UserResponseDto[] | { message: string } | UserRegisterDto | AuthBody;

class AuthController {
	service: AuthService;

	constructor(service: AuthService) {
		this.service = service;
		this.registerUser = this.registerUser.bind(this);
		this.loginUser = this.loginUser.bind(this);
	}

	async registerUser(req: Request, res: Response<ResponseType>): Promise<void> {
		const dto = matchedData<UserRegisterDto>(req);
		const candidate = await this.service.registerUser(dto);

		if (candidate) {
			const { refreshToken, ...body } = candidate;
			setCookie(res, REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
			res.status(201).json(body);
			return;
		}

		res.status(400).json({ message: 'Failed to create user' });
	}

	async loginUser(req: Request, res: Response<ResponseType>): Promise<void> {
		const dto = matchedData<UserLoginDto>(req);
		const candidate = await this.service.loginUser(dto);

		if (candidate) {
			const { refreshToken, ...body } = candidate;
			setCookie(res, REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
			res.status(200).json(body);
			return;
		}

		res.status(400).json({ message: 'Failed to login. Wrong email password' });
	}
}

export default AuthController;
