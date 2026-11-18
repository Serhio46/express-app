import { Router } from 'express';
import BookController from './book.controller';
import BookService from './book.service';
import { loggerMiddleware } from '../middlewares/logger.middleware';

export function createBooksModule() {
	const service = new BookService();
	const controller = new BookController(service);
	const router = Router();
	const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = controller;

	router.use(loggerMiddleware);

	router.post(`/`, createBook);
	router.get(`/`, getAllBooks);
	router.get(`/:id`, getBookById);
	router.put(`/:id`, updateBook);
	router.delete(`/:id`, deleteBook);

	return { router, service };
}
