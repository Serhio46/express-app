import express, { type Express, type Request, type Response } from 'express';
import { createUsersModule } from './user/user.module';
import { BASE_PATH } from './common/constants/router.constants';
import { setupMiddlewares } from './middlewares';

export function createApp() {
	const app: Express = express();

	setupMiddlewares(app);
	app.use(`${BASE_PATH}/users`, createUsersModule().router);
	//errorMiddleware

	return app;
}
