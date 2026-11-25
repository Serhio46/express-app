import type { CookieOptions, Request, Response } from 'express';

export const buildCookieOptions = (overrides: CookieOptions = {}): CookieOptions => ({
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'strict',
	path: '/',
	...overrides,
});

export const setCookie = (res: Response, name: string, value: string, overrides: CookieOptions = {}): void => {
	res.cookie(name, value, buildCookieOptions(overrides));
};

export const clearCookie = (res: Response, name: string, overrides: CookieOptions = {}): void => {
	res.clearCookie(name, buildCookieOptions(overrides));
};

export const getCookie = (req: Request, name: string): string | undefined => {
	const value = req.cookies?.[name];
	return typeof value === 'string' ? value : undefined;
};
