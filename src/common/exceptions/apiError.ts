class ApiError extends Error {
	status: number;
	errors: never[];

	constructor(status: number, message: string, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
		this.name = this.constructor.name;
	}

	static UnauthorizedError() {
		return new ApiError(401, 'User is not authorized');
	}

	static BadRequest(message: string, errors = []) {
		return new ApiError(400, message, errors);
	}

	static ForbiddenError(message = 'forbidden', errors = []) {
		return new ApiError(403, message, errors);
	}
}

export default ApiError;
