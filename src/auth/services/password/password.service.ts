import * as argon2 from 'argon2';
import type { ArgonParams, PasswordModuleParams, StoredPassword, VerifyResult } from './password.types';

const DEFAULT_PARAMS: ArgonParams = {
	memoryCost: 64 * 1024,
	timeCost: 3,
	parallelism: 1,
};

const MIN_PEPPER_BYTES = 32;

class PasswordService {
	private readonly peppers: ReadonlyMap<number, Buffer>;
	private readonly current: number;
	private readonly params: ArgonParams;
	private readonly maxLength: number;
	private dummyHash?: Promise<string>;

	constructor({ peppers, currentPepperVersion, params, maxLength }: PasswordModuleParams) {
		this.peppers = peppers;
		this.current = currentPepperVersion;
		this.params = { ...DEFAULT_PARAMS, ...params };
		this.maxLength = maxLength ?? 128;

		// Падаем на старте, а не при первом логине
		if (!this.peppers.has(this.current)) {
			throw new Error(`Pepper v${this.current} is not configured`);
		}
		for (const [v, p] of this.peppers) {
			if (p.length < MIN_PEPPER_BYTES) throw new Error(`Pepper v${v} must be ≥ ${MIN_PEPPER_BYTES} bytes`);
		}
	}

	async hash(plain: string): Promise<StoredPassword> {
		this.assertLength(plain);
		const hash = await argon2.hash(plain, {
			type: argon2.argon2id,
			...this.params,
			secret: this.pepper(this.current), // перец; соль argon2 генерирует сам
		});
		return { hash, pepperVersion: this.current };
	}

	async verify(plain: string, stored: StoredPassword): Promise<VerifyResult> {
		if (plain.length > this.maxLength) return { valid: false, needsRehash: false };

		const pepper = this.peppers.get(stored.pepperVersion);
		if (!pepper) {
			return { valid: false, needsRehash: false };
		}

		let valid: boolean;
		try {
			valid = await argon2.verify(stored.hash, plain, { secret: pepper });
		} catch {
			return { valid: false, needsRehash: false };
		}

		if (!valid) return { valid: false, needsRehash: false };

		const needsRehash = stored.pepperVersion !== this.current || argon2.needsRehash(stored.hash, { ...this.params });

		return { valid: true, needsRehash };
	}

	private pepper(version: number): Buffer {
		const p = this.peppers.get(version);
		if (!p) throw new Error(`Unknown pepper v${version}`);
		return p;
	}

	private assertLength(plain: string) {
		if (plain.length === 0 || plain.length > this.maxLength) {
			throw new RangeError(`Password length must be 1..${this.maxLength}`);
		}
	}
}

export default PasswordService;
