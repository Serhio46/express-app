import jwt from 'jsonwebtoken';
import { createHash, randomBytes } from 'node:crypto';

export type AuthUser = { id: string };

interface Payload {
	sub: string;
}

class TokenService {
	private readonly accessSecret: string;

	constructor(accessSecret: string | undefined) {
		if (!accessSecret) {
			throw new Error('TOKEN_SECRET is not configured');
		}
		this.accessSecret = accessSecret;
	}

	signAccess(user: AuthUser): string {
		return jwt.sign({ sub: user.id } satisfies Payload, this.accessSecret, {
			algorithm: 'HS256',
			expiresIn: '15m',
		});
	}

	verifyAccess(token: string): AuthUser {
		const payload = jwt.verify(token, this.accessSecret, { algorithms: ['HS256'] }) as Payload;
		return { id: payload.sub };
	}

	generateRefresh(): string {
		return randomBytes(32).toString('base64url');
	}

	hashRefresh(token: string): string {
		return createHash('sha256').update(token).digest('hex');
	}

	async revokeAllForUser(_userId: string) {
		// reemove from db/Redis
	}
}

export default TokenService;
