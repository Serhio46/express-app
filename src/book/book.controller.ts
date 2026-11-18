import type { Request, Response } from 'express';
import BookService from './book.service';
import { getParam } from '../common/helpers/request.helper/request.helper';
import type { BookResponseDto } from './dto/book-response.dto';

type ResponseType = BookResponseDto | BookResponseDto[] | { message: string };

class BookController {
	service: BookService;

	constructor(bookService: BookService) {
		this.service = bookService;
		this.createBook = this.createBook.bind(this);
		this.getAllBooks = this.getAllBooks.bind(this);
		this.getBookById = this.getBookById.bind(this);
		this.updateBook = this.updateBook.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
	}

	async createBook(req: Request, res: Response<ResponseType>): Promise<void> {
		const result = await this.service.createBook(req.body);

		res.status(201).json(result);
	}

	async getAllBooks(req: Request, res: Response<ResponseType>): Promise<void> {
		const result = await this.service.getAllBooks();

		res.status(200).json(result);
	}

	async getBookById(req: Request, res: Response<ResponseType>): Promise<void> {
		const id = getParam(req.params.id);
		const result = await this.service.getBookById(id);

		if (result) {
			res.status(200).json(result);
			return;
		}

		res.status(404).json({ message: 'Book not found' });
	}

	async updateBook(req: Request, res: Response<ResponseType>): Promise<void> {
		const id = getParam(req.params.id);
		const result = await this.service.updateBook(id, req.body);

		if (result) {
			res.status(200).json(result);
			return;
		}

		res.status(404).json({ message: 'Book not found' });
	}

	async deleteBook(req: Request, res: Response<ResponseType>): Promise<void> {
		const id = getParam(req.params.id);
		const result = await this.service.deleteBook(id);

		if (result) {
			res.status(200).json(result);
			return;
		}

		res.status(404).json({ message: 'Book not found' });
	}
}

export default BookController;
