import { Router } from 'express';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
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
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DB_URL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../db.json');

export function createUsersModule() {
	const repository = new UserRepository(DB_URL);
	const service = new UserService(repository);
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
