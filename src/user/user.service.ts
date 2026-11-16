import type { Request, Response } from 'express';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UserResponseDto } from './dto/user-response.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

class UserService {
	async createUser({ name, email, password }: CreateUserDto): Promise<UserResponseDto> {
		const id = uuidv4();
		const createdAt = new Date();

		const newUser: User = new User(name, email, id, password, createdAt);

		return {
			id,
			name: newUser.name,
			email: newUser.email,
			createdAt,
		};
	}

	async getAllUsers(): Promise<UserResponseDto[]> {
		//fetch all users from the database or any other data source
		return [];
	}

	async getUserById(id: string): Promise<UserResponseDto | null> {
		//fetch user by id from the database or any other data source
		return null;
	}

	async updateUser(id: string, updateData: Partial<CreateUserDto>): Promise<UserResponseDto | null> {
		//update user by id in the database or any other data source
		return null;
	}

	async updatePassword(id: string, updateData: Partial<CreateUserDto>): Promise<UserResponseDto | null> {
		//partially update user by id in the database or any other data source
		return null;
	}

	async deleteUser(id: string): Promise<UserResponseDto | null> {
		//delete user by id from the database or any other data source
		return null;
	}
}

export default UserService;
