import { Router } from 'express';
import UserController from './user.controller';
import UserService from './user.service';
import { loggerMiddleware } from '../middlewares/logger.middleware';

export function createUsersModule() {
	const service = new UserService();
	const controller = new UserController(service);
	const router = Router();
	const { createUser, getAllUsers, getUserById, updateUser, updatePassword, deleteUser } = controller;

	router.use(loggerMiddleware);

	router.post(`/`, createUser);
	router.get(`/`, getAllUsers);
	router.get(`/:id`, getUserById);
	router.put(`/:id`, updateUser);
	router.patch(`/:id`, updatePassword);
	router.delete(`/:id`, deleteUser);

	return { router, service };
}
