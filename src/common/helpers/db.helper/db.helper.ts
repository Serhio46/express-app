export const replaceEntry = <D extends Record<string, unknown>, T extends { id: string }>(
	db: D,
	entry: T,
	field: string,
): D => {
	const entries = (db[field] as T[] | undefined) ?? [];
	return { ...db, [field]: entries.map(e => (e.id === entry.id ? entry : e)) };
};

export const removeEntry = <D extends Record<string, unknown>, T extends { id: string }>(
	db: D,
	id: string,
	field: string,
): D => {
	const entries = (db[field] as T[] | undefined) ?? [];
	return { ...db, [field]: entries.filter(e => e.id !== id) };
};
