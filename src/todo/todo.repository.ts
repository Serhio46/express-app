import FileHelper from '../common/helpers/file.helper/file.helper';
import { replaceEntry, removeEntry } from '../common/helpers/db.helper/db.helper';
import type { Todo } from './entities/todo.entity';

export type TodoDbSchema = { todos?: Todo[] } & Record<string, unknown>;

class TodoRepository {
	private readonly dbUrl: string;

	constructor(dbUrl: string) {
		this.dbUrl = dbUrl;
	}

	private async read(): Promise<TodoDbSchema> {
		return FileHelper.readFilePromise<TodoDbSchema>(this.dbUrl);
	}

	private async write(db: TodoDbSchema): Promise<void> {
		await FileHelper.writeFile<TodoDbSchema>(this.dbUrl, db);
	}

	async findAllByUser(userId: string): Promise<Todo[]> {
		const db = await this.read();
		return (db.todos ?? []).filter(t => t.userId === userId);
	}

	async findByIdForUser(id: string, userId: string): Promise<Todo | null> {
		const db = await this.read();
		return (db.todos ?? []).find(t => t.id === id && t.userId === userId) ?? null;
	}

	async create(todo: Todo): Promise<Todo> {
		const db = await this.read();
		await this.write({ ...db, todos: [...(db.todos ?? []), todo] });
		return todo;
	}

	async save(todo: Todo): Promise<Todo> {
		const db = await this.read();
		await this.write(replaceEntry(db, todo, 'todos'));
		return todo;
	}

	async delete(id: string): Promise<void> {
		const db = await this.read();
		await this.write(removeEntry(db, id, 'todos'));
	}
}

export default TodoRepository;
