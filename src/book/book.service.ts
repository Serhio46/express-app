import type { BookCreateDto } from './dto/create-book.dto';
import type { BookResponseDto } from './dto/book-response.dto';
import { v4 as uuidv4 } from 'uuid';
import { Book } from './entities/book.entity';
import FileHelper from '../common/helpers/file.helper/file.helper';
import { toBookResponse as toResponse } from '../common/helpers/mappers/book.mapper';
import { removeBook, replaceBook, type DbSchema } from './book.helpers';

const DB_URL = new URL('../../db.json', import.meta.url);

class BookService {
	async createBook({ title, author, genre }: BookCreateDto): Promise<BookResponseDto> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);

		const book = new Book(title, author, genre, uuidv4());

		await FileHelper.writeFile<DbSchema>(DB_URL, { ...db, books: [...db.books, book] });

		return toResponse(book);
	}

	async getAllBooks(): Promise<BookResponseDto[]> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		return db.books.map(toResponse);
	}

	async getBookById(id: string): Promise<BookResponseDto | null> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		const book = db.books.find(b => b.id === id);
		return book ? toResponse(book) : null;
	}

	async updateBook(id: string, updateData: Partial<BookCreateDto>): Promise<BookResponseDto | null> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		const existing = db.books.find(b => b.id === id);

		if (!existing) {
			return null;
		}

		const updated: Book = {
			...existing,
			...updateData,
		};

		await FileHelper.writeFile<DbSchema>(DB_URL, replaceBook(db, updated));

		return toResponse(updated);
	}

	async deleteBook(id: string): Promise<BookResponseDto | null> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		const book = db.books.find(b => b.id === id);

		if (!book) {
			return null;
		}

		await FileHelper.writeFile<DbSchema>(DB_URL, removeBook(db, id));

		return toResponse(book);
	}
}

export default BookService;
