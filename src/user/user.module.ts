import { Router } from 'express';
import UserController from './user.controller';
import UserService from './user.service';

export function createUsersModule() {
	const service = new UserService();
	const controller = new UserController(service);
	const router = Router();

	console.log('User module initialized');

	const { createUser, getAllUsers, getUserById, updateUser, updatePassword, deleteUser } = controller;

	router.post(`/`, controller.createUser);
	router.get(`/`, getAllUsers);
	router.get(`/:id`, getUserById);
	router.put(`/:id`, updateUser);
	router.patch(`/:id`, updatePassword);
	router.delete(`/:id`, deleteUser);

	return { router, service };
}
