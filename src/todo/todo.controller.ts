import type { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import TodoService from './todo.service';
import { getParam } from '../common/helpers/request.helper/request.helper';
import type { TodoResponseDto } from './dto/todo-response.dto';

type ResponseType = TodoResponseDto | TodoResponseDto[] | { message: string };

class TodoController {
	service: TodoService;

	constructor(service: TodoService) {
		this.service = service;
		this.getAll = this.getAll.bind(this);
		this.create = this.create.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.toggleCompleted = this.toggleCompleted.bind(this);
		this.delete = this.delete.bind(this);
	}

	private userId(res: Response): string {
		return res.locals.userId as string;
	}

	async getAll(req: Request, res: Response<ResponseType>): Promise<void> {
		const todos = await this.service.getAll(this.userId(res));
		res.status(200).json(todos);
	}

	async create(req: Request, res: Response<ResponseType>): Promise<void> {
		const { title } = matchedData<{ title: string }>(req);
		const todo = await this.service.create(this.userId(res), title);
		res.status(201).json(todo);
	}

	async updateTitle(req: Request, res: Response<ResponseType>): Promise<void> {
		const id = getParam(req.params.id);
		const { title } = matchedData<{ title: string }>(req);
		const todo = await this.service.updateTitle(this.userId(res), id, title);

		if (todo) {
			res.status(200).json(todo);
			return;
		}

		res.status(404).json({ message: 'Todo not found' });
	}

	async toggleCompleted(req: Request, res: Response<ResponseType>): Promise<void> {
		const id = getParam(req.params.id);
		const todo = await this.service.toggleCompleted(this.userId(res), id);

		if (todo) {
			res.status(200).json(todo);
			return;
		}

		res.status(404).json({ message: 'Todo not found' });
	}

	async delete(req: Request, res: Response<ResponseType>): Promise<void> {
		const id = getParam(req.params.id);
		const deleted = await this.service.delete(this.userId(res), id);

		if (deleted) {
			res.status(204).end();
			return;
		}

		res.status(404).json({ message: 'Todo not found' });
	}
}

export default TodoController;
