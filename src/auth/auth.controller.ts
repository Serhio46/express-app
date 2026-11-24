import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import type { UserRegisterDto } from './dto/user-register.dto';
import type { UserLoginDto } from './dto/user-login.dto';
import type AuthService from './auth.service';
import { UserResponseDto } from './dto/user-response.dto';

type ResponseType = UserResponseDto | UserResponseDto[] | { message: string } | UserRegisterDto;

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
			res.status(201).json(candidate);
			return;
		}

		res.status(400).json({ message: 'Failed to create user' });
	}

	async loginUser(req: Request, res: Response<ResponseType>): Promise<void> {
		const dto = matchedData<UserLoginDto>(req);
		const candidate = await this.service.loginUser(dto);

		if (candidate) {
			res.status(200).json(candidate);
			return;
		}

		res.status(400).json({ message: 'Failed to login. Wrong email password' });
	}
}

export default AuthController;
