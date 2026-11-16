export class User {
	public name: string;
	public email: string;
	readonly id: string;
	readonly password: string;
	readonly createdAt: Date;

	constructor(name: string, email: string, id: string, password: string, createdAt: Date) {
		this.name = name;
		this.email = email;
		this.id = id;
		this.password = password;
		this.createdAt = createdAt;
	}
}
