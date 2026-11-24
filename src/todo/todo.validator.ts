import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';
import { uuidValidator } from '../middlewares/validate-request.middleware';

const titleValidator: ValidationChain = body('title')
	.isString()
	.withMessage('Title should be a string')
	.bail()
	.trim()
	.isLength({ min: 1, max: 200 })
	.withMessage('Title should be between 1 and 200 characters');

export const createTodoValidator: ValidationChain[] = [titleValidator];
export const updateTodoTitleValidator: ValidationChain[] = [...uuidValidator, titleValidator];
export const todoIdValidator: ValidationChain[] = uuidValidator;
