import type { UserCreateDto } from './dto/create-user.dto';
import type { UserResponseDto } from './dto/user-response.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import FileHelper from '../common/helpers/file.helper/file.helper';
import { toUserResponse as toResponse } from '../common/helpers/mappers/user.mapper';
import { removeUser, replaceUser, type DbSchema } from './user.helpers';

const DB_URL = new URL('../../db.json', import.meta.url);

class UserService {
	async createUser({ name, email, password }: UserCreateDto): Promise<UserResponseDto> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);

		const user = new User(name, email, uuidv4(), password, new Date());
		await FileHelper.writeFile<DbSchema>(DB_URL, { ...db, users: [...db.users, user] });

		return toResponse(user);
	}

	async getAllUsers(): Promise<UserResponseDto[]> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		return db.users.map(toResponse);
	}

	async getUserById(id: string): Promise<UserResponseDto | null> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		const user = db.users.find(u => u.id === id);
		return user ? toResponse(user) : null;
	}

	async updateUser(id: string, updateData: Partial<UserCreateDto>): Promise<UserResponseDto | null> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		const existing = db.users.find(u => u.id === id);

		if (!existing) {
			return null;
		}

		const updated: User = {
			...existing,
			name: updateData.name ?? existing.name,
			email: updateData.email ?? existing.email,
		};

		await FileHelper.writeFile<DbSchema>(DB_URL, replaceUser(db, updated));

		return toResponse(updated);
	}

	async updatePassword(id: string, password: string): Promise<UserResponseDto | null> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		const existing = db.users.find(u => u.id === id);

		if (!existing) {
			return null;
		}

		const updated: User = { ...existing, password };

		await FileHelper.writeFile<DbSchema>(DB_URL, replaceUser(db, updated));

		return toResponse(updated);
	}

	async deleteUser(id: string): Promise<UserResponseDto | null> {
		const db = await FileHelper.readFilePromise<DbSchema>(DB_URL);
		const user = db.users.find(u => u.id === id);

		if (!user) {
			return null;
		}

		await FileHelper.writeFile<DbSchema>(DB_URL, removeUser(db, id));

		return toResponse(user);
	}
}

export default UserService;
