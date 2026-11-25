import { BASE_PATH } from '../common/constants/router.constants';

export const REFRESH_COOKIE = 'refreshToken';
export const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export const REFRESH_COOKIE_OPTIONS = { path: `${BASE_PATH}/auth`, maxAge: REFRESH_TTL_MS };
