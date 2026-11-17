import express, { type RequestHandler, type Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { cookieValidatorMiddleware } from './cookieValidator.middleware';

export const setupMiddlewares = (app: Express) => {
	app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser(process.env.COOKIE_SECRET));
	app.use(cookieValidatorMiddleware);
};
