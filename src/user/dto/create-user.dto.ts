export class UserCreateDto {
	name: string;
	email: string;
	password: string;
	pepperVersion: number;

	constructor(name: string, email: string, password: string, pepperVersion: number) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.pepperVersion = pepperVersion;
	}
}
