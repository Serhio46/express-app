export class UserResponseDto {
	id!: string;
	name!: string;
	email!: string;
	createdAt!: Date;
}

export class UserResponseWithCredentialsDto {
	id!: string;
	name!: string;
	email!: string;
	createdAt!: Date;
	pepperVersion!: number;
	password!: string;
}
