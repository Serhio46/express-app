import { v4 as uuidv4 } from 'uuid';
import { Todo } from './entities/todo.entity';
import type { TodoResponseDto } from './dto/todo-response.dto';
import type TodoRepository from './todo.repository';

const toResponse = ({ id, title, isCompleted, createdAt, updatedAt }: Todo): TodoResponseDto => ({
	id,
	title,
	isCompleted,
	createdAt,
	updatedAt,
});

class TodoService {
	repository: TodoRepository;

	constructor(repository: TodoRepository) {
		this.repository = repository;
	}

	async getAll(userId: string): Promise<TodoResponseDto[]> {
		const todos = await this.repository.findAllByUser(userId);
		return todos.map(toResponse);
	}

	async create(userId: string, title: string): Promise<TodoResponseDto> {
		const todo = new Todo(uuidv4(), userId, title, new Date().toISOString());
		await this.repository.create(todo);
		return toResponse(todo);
	}

	async updateTitle(userId: string, id: string, title: string): Promise<TodoResponseDto | null> {
		const todo = await this.repository.findByIdForUser(id, userId);
		if (!todo) return null;

		todo.title = title;
		todo.updatedAt = new Date().toISOString();
		await this.repository.save(todo);
		return toResponse(todo);
	}

	async toggleCompleted(userId: string, id: string): Promise<TodoResponseDto | null> {
		const todo = await this.repository.findByIdForUser(id, userId);
		if (!todo) return null;

		todo.isCompleted = !todo.isCompleted;
		todo.updatedAt = new Date().toISOString();
		await this.repository.save(todo);
		return toResponse(todo);
	}

	async delete(userId: string, id: string): Promise<boolean> {
		const todo = await this.repository.findByIdForUser(id, userId);
		if (!todo) return false;

		await this.repository.delete(id);
		return true;
	}
}

export default TodoService;
