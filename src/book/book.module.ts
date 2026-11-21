import { Router } from 'express';
import BookController from './book.controller';
import BookService from './book.service';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import {
	getBookByIdValidator,
	createBookValidator,
	getAllBooksValidator,
	deleteBookValidator,
	updateBookValidator,
} from './book.validator';
import { validateRequestMiddleware } from '../middlewares/validate-request.middleware';

export function createBooksModule() {
	const service = new BookService();
	const controller = new BookController(service);
	const router = Router();
	const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = controller;

	router.use(loggerMiddleware);

	router.post(`/`, createBookValidator, validateRequestMiddleware, createBook);
	router.get(`/`, getAllBooksValidator, validateRequestMiddleware, getAllBooks);
	router.get(`/:id`, getBookByIdValidator, validateRequestMiddleware, getBookById);
	router.put(`/:id`, updateBookValidator, validateRequestMiddleware, updateBook);
	router.delete(`/:id`, deleteBookValidator, validateRequestMiddleware, deleteBook);

	return { router, service };
}
