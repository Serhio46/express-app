import type { UserCreateDto } from './dto/create-user.dto';
import type { UserResponseDto, UserResponseWithCredentialsDto } from './dto/user-response.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { toUserResponse as toResponse, toUserWithCredentialsResponse } from '../common/helpers/mappers/user.mapper';
import type UsersRepository from './user.repository';

class UserService {
	repository: UsersRepository;

	constructor(repository: UsersRepository) {
		this.repository = repository;
	}

	async createUser({ name, email, password, pepperVersion }: UserCreateDto): Promise<UserResponseDto | null> {
		const candidate = new User(name, email, uuidv4(), password, new Date(), pepperVersion);
		const user = await this.repository.create(candidate);
		return user ? toResponse(user) : null;
	}

	async getAllUsers(): Promise<UserResponseDto[]> {
		const users = await this.repository.findAll();
		return users.map(toResponse);
	}

	async getUserById(id: string): Promise<UserResponseDto | null> {
		const user = await this.repository.findById(id);
		return user ? toResponse(user) : null;
	}

	async getUserWithCredentialsByEmail(email: string): Promise<UserResponseWithCredentialsDto | null> {
		const user = await this.repository.findByEmail(email);
		return user ? toUserWithCredentialsResponse(user) : null;
	}

	async updateUser(id: string, updateData: Partial<UserCreateDto>): Promise<UserResponseDto | null> {
		const updatedUser = await this.repository.updateUser(id, updateData);
		return updatedUser ? toResponse(updatedUser) : null;
	}

	async updatePassword(id: string, password: string, pepperVersion: number): Promise<UserResponseDto | null> {
		const updatedUser = await this.repository.updatePassword(id, password, pepperVersion);
		return updatedUser ? toResponse(updatedUser) : null;
	}

	async deleteUser(id: string): Promise<UserResponseDto | null> {
		const user = await this.repository.delete(id);
		return user ? toResponse(user) : null;
	}
}

export default UserService;
