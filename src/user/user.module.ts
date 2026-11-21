import { Router } from 'express';
import UserController from './user.controller';
import UserService from './user.service';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import {
	createUserValidator,
	getUserByIdValidator,
	getUsersValidator,
	deleteUserValidator,
	updateUserValidator,
	updatePasswordValidator,
} from './user.validators';
import { validateRequestMiddleware } from '../middlewares/validate-request.middleware';

export function createUsersModule() {
	const service = new UserService();
	const controller = new UserController(service);
	const router = Router();
	const { createUser, getAllUsers, getUserById, updateUser, updatePassword, deleteUser } = controller;

	router.use(loggerMiddleware);

	router.post(`/`, createUserValidator, validateRequestMiddleware, createUser);
	router.get(`/`, getUsersValidator, validateRequestMiddleware, getAllUsers);
	router.get(`/:id`, getUserByIdValidator, validateRequestMiddleware, getUserById);
	router.put(`/:id`, updateUserValidator, validateRequestMiddleware, updateUser);
	router.patch(`/:id`, updatePasswordValidator, validateRequestMiddleware, updatePassword);
	router.delete(`/:id`, deleteUserValidator, validateRequestMiddleware, deleteUser);

	return { router, service };
}
