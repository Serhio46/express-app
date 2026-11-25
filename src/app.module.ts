import express, { type Express } from 'express';
import { createUsersModule } from './user/user.module';
import { createBooksModule } from './book/book.module';
import { createAuthModule } from './auth/auth.module';
import { BASE_PATH } from './common/constants/router.constants';
import { setupMiddlewares } from './middlewares';
import { createTodosModule } from './todo/todo.module';

export function createApp() {
	const app: Express = express();
	const userModule = createUsersModule();
	const bookModule = createBooksModule();
	const authModule = createAuthModule(userModule.service);
	const todosModule = createTodosModule(authModule.tokenService);

	setupMiddlewares(app);
	app.use(`${BASE_PATH}/users`, userModule.router);
	app.use(`${BASE_PATH}/books`, bookModule.router);
	app.use(`${BASE_PATH}/auth`, authModule.router);
	app.use(`${BASE_PATH}/todos`, todosModule.router);
	//errorMiddleware

	return app;
}
