import type { Request, Response } from 'express';
import UserService from './user.service';
import { getUserId } from '../common/utils/request.utils';
import type { UserResponseDto } from './dto/user-response.dto';

type ResponseType = UserResponseDto | UserResponseDto[] | { message: string };

class UserController {
	service: UserService;

	constructor(userService: UserService) {
		this.service = userService;
		this.createUser = this.createUser.bind(this);
		this.getAllUsers = this.getAllUsers.bind(this);
		this.getUserById = this.getUserById.bind(this);
		this.updateUser = this.updateUser.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}

	async createUser(req: Request, res: Response<ResponseType>): Promise<void> {
		const result = await this.service.createUser(req.body);

		if (result) {
			res.status(201).json(result);
			return;
		}

		res.status(400).json({ message: 'Failed to create user' });
	}

	async getAllUsers(req: Request, res: Response<ResponseType>): Promise<void> {
		const result = await this.service.getAllUsers();

		if (!result?.length) {
			res.status(404).json({ message: 'Users not found' });
			return;
		}

		res.status(200).json(result);
	}

	async getUserById(req: Request, res: Response<ResponseType>): Promise<void> {
		const { id } = req.params;
		const userId = getUserId(id);
		const result = await this.service.getUserById(userId);

		if (result) {
			res.status(200).json(result);
			return;
		}

		res.status(404).json({ message: 'User not found' });
	}

	async updateUser(req: Request, res: Response<ResponseType>): Promise<void> {
		const { id } = req.params;
		const userId = getUserId(id);

		const result = await this.service.updateUser(userId, req.body);

		if (result) {
			res.status(200).json(result);
			return;
		}

		res.status(404).json({ message: 'User not found' });
	}

	async updatePassword(req: Request, res: Response<ResponseType>): Promise<void> {
		const { id } = req.params;
		const userId = getUserId(id);

		const result = await this.service.updatePassword(userId, req.body);

		if (result) {
			res.status(200).json(result);
			return;
		}

		res.status(404).json({ message: 'User not found' });
	}

	async deleteUser(req: Request, res: Response<ResponseType>): Promise<void> {
		const { id } = req.params;
		const userId = getUserId(id);

		const result = await this.service.deleteUser(userId);

		if (result) {
			res.status(200).json(result);
			return;
		}

		res.status(404).json({ message: 'User not found' });
	}
}

export default UserController;
