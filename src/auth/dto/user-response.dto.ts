export class UserResponseDto {
	email!: string;
	name!: string;
	id!: string;
	createdAt!: Date;
}

export class UserResponseWithCredentialsDto {
	email!: string;
	name!: string;
	id!: string;
	createdAt!: Date;
	pepperVersion!: number;
	password!: string;
}
