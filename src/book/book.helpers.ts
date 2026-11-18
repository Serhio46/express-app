import { removeEntry, replaceEntry } from '../common/helpers/db.helper/db.helper';
import type { Book } from './entities/book.entity';

export type DbSchema = { books: Book[] } & Record<string, unknown>;

export const replaceBook = (db: DbSchema, book: Book): DbSchema => replaceEntry(db, book, 'books');
export const removeBook = (db: DbSchema, id: string): DbSchema => removeEntry<DbSchema, Book>(db, id, 'books');
