import { Router } from 'express';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import PasswordService from './services/password/password.service';
import { readPeppers } from './services/password/password.helpers';
import TokenService from './services/token/token.service';
import type { UsersPort } from './auth.types';

import { loggerMiddleware } from '../middlewares/logger.middleware';
import { registerUserValidator, loginUserValidator } from './auth.validator';

import { validateRequestMiddleware } from '../middlewares/validate-request.middleware';

export function createAuthModule(userService: UsersPort) {
	const router = Router();

	const passwordService = new PasswordService({
		peppers: readPeppers(process.env),
		currentPepperVersion: Number(process.env.PEPPER),
	});

	const tokenService = new TokenService(process.env.TOKEN_SECRET);
	const authService = new AuthService(tokenService, userService, passwordService);
	const authController = new AuthController(authService);

	router.use(loggerMiddleware);

	router.post('/register', registerUserValidator, validateRequestMiddleware, authController.registerUser);
	router.post('/login', loginUserValidator, validateRequestMiddleware, authController.loginUser);

	return { router, tokenService };
}
