export const getUserId = (id: string | string[]): string => (Array.isArray(id) ? (id[0] ?? '') : id);
