export type StoredPassword = {
	hash: string;
	pepperVersion: number;
};

export type VerifyResult = {
	valid: boolean;
	needsRehash: boolean;
};

export type ArgonParams = {
	memoryCost: number;
	timeCost: number;
	parallelism: number;
};

export type PasswordModuleParams = {
	peppers: ReadonlyMap<number, Buffer>;
	currentPepperVersion: number;
	params?: Partial<ArgonParams>;
	maxLength?: number;
};
