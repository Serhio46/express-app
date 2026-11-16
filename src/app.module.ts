import express, { type Express, type Request, type Response } from 'express';
import { createUsersModule } from './user/user.module';
import { BASE_PATH } from './common/constants/router.constants';

export function createApp() {
	const app: Express = express();
	app.use(express.json());

	app.use(`${BASE_PATH}/users`, createUsersModule().router);

	return app;
}
