export function readPeppers(env: NodeJS.ProcessEnv): Map<number, Buffer> {
	const peppers = new Map<number, Buffer>();
	for (const [key, value] of Object.entries(env)) {
		const m = /^PEPPER_V(\d+)$/.exec(key);
		if (m && value) peppers.set(Number(m[1]), Buffer.from(value, 'base64'));
	}
	return peppers;
}
