import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';
import { uuidValidator, createPaginationValidator } from '../middlewares/validate-request.middleware';

const emailValidator = body('email')
	.isString()
	.withMessage('Email must be a string')
	.bail()
	.trim()
	.isEmail()
	.withMessage('Email must be a valid email address')
	.toLowerCase();

const nameValidator = body('name')
	.isString()
	.withMessage('Name must be a string')
	.bail()
	.trim()
	.isLength({ min: 3, max: 50 })
	.withMessage('Name must be between 3 and 50 characters');

const passwordValidator = body('password')
	.isString()
	.withMessage('Password must be a string')
	.bail()
	.isLength({ max: 72 })
	.withMessage('Password must be at most 72 characters')
	.bail()
	.isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
	.withMessage(
		'Password must be at least 8 characters and include a lowercase letter, an uppercase letter, a number and a symbol',
	);

export const registerUserValidator = [emailValidator, nameValidator, passwordValidator];
export const loginUserValidator = [emailValidator, passwordValidator];
