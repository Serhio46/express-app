import type { BookResponseDto } from '../../../book/dto/book-response.dto';
import type { Book } from '../../../book/entities/book.entity';

export const toBookResponse = (book: Book): BookResponseDto => ({
	id: book.id,
	title: book.title,
	author: book.author,
	genre: book.genre,
});
