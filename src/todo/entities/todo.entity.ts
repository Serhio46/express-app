export class Todo {
	readonly id: string;
	readonly userId: string;
	title: string;
	isCompleted: boolean;
	readonly createdAt: string;
	updatedAt: string;

	constructor(id: string, userId: string, title: string, createdAt: string) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.isCompleted = false;
		this.createdAt = createdAt;
		this.updatedAt = createdAt;
	}
}
