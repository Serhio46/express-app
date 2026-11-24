import { type DbSchema } from './user.helpers';
import FileHelper from '../common/helpers/file.helper/file.helper';
import type { User } from './entities/user.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { removeUser, replaceUser } from './user.helpers';

export class UsersRepository {
	private readonly dbUrl: string;
	constructor(dbUrl: string) {
		this.dbUrl = dbUrl;
	}

	private async read() {
		return FileHelper.readFilePromise<DbSchema>(this.dbUrl);
	}

	private write(db: DbSchema) {
		return FileHelper.writeFile<DbSchema>(this.dbUrl, db);
	}

	async findById(id: string): Promise<User | null> {
		try {
			const { users } = await this.read();
			return users.find(u => u.id === id) ?? null;
		} catch (error) {
			throw error;
		}
	}

	async findByEmail(email: string): Promise<User | null> {
		try {
			const { users } = await this.read();
			return users.find(u => u.email === email) ?? null;
		} catch (error) {
			throw error;
		}
	}

	async findAll(): Promise<User[]> {
		try {
			return (await this.read()).users;
		} catch (error) {
			throw error;
		}
	}

	async create(data: User): Promise<User | null> {
		try {
			const db = await this.read();

			if (db.users.some(u => u.email === data.email)) return null;

			await this.write({ ...db, users: [...db.users, data] });
			return data;
		} catch (error: unknown) {
			throw error;
		}
	}

	async updateUser(id: string, updateData: Partial<UserCreateDto>): Promise<User | null> {
		try {
			const db = await this.read();
			const existing = db.users.find(u => u.id === id);

			if (!existing) {
				return null;
			}

			const updated: User = {
				...existing,
				name: updateData.name ?? existing.name,
				email: updateData.email ?? existing.email,
			};

			await this.write(replaceUser(db, updated));
			return updated;
		} catch (error) {
			throw error;
		}
	}

	async updatePassword(id: string, password: string, pepperVersion: number) {
		try {
			const db = await this.read();
			const existing = db.users.find(u => u.id === id);

			if (!existing) {
				return null;
			}

			const updated: User = { ...existing, password, pepperVersion };

			await this.write(replaceUser(db, updated));
			return updated;
		} catch (error) {
			throw error;
		}
	}

	async delete(id: string): Promise<User | null> {
		try {
			const db = await this.read();
			const user = db.users.find(u => u.id === id);

			if (!user) {
				return null;
			}

			await this.write(removeUser(db, id));
			return user;
		} catch (error) {
			throw error;
		}
	}
}

export default UsersRepository;
