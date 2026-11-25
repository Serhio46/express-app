import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import TodoController from './todo.controller';
import TodoService from './todo.service';
import TodoRepository from './todo.repository';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import { validateRequestMiddleware } from '../middlewares/validate-request.middleware';
import { createAuthMiddleware } from '../auth/auth.middleware';
import type TokenService from '../auth/services/token/token.service';
import { createTodoValidator, updateTodoTitleValidator, todoIdValidator } from './todo.validator';

const DB_URL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../db.json');

export function createTodosModule(tokenService: TokenService) {
	const repository = new TodoRepository(DB_URL);
	const service = new TodoService(repository);
	const controller = new TodoController(service);
	const router = Router();
	const { getAll, create, updateTitle, toggleCompleted, delete: deleteTodo } = controller;

	router.use(loggerMiddleware);
	router.use(createAuthMiddleware(tokenService));

	router.get(`/`, getAll);
	router.post(`/`, createTodoValidator, validateRequestMiddleware, create);
	router.patch(`/:id`, updateTodoTitleValidator, validateRequestMiddleware, updateTitle);
	router.patch(`/:id/isCompleted`, todoIdValidator, validateRequestMiddleware, toggleCompleted);
	router.delete(`/:id`, todoIdValidator, validateRequestMiddleware, deleteTodo);

	return { router, service };
}
