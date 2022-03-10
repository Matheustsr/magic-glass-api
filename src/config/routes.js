import { Router } from 'express';

import { AuthMiddleware } from '@middlewares';
import { NFSeRoutes } from '@routes';

export default class Routes {
	constructor() {
		this.routes = new Router();

		this.NFSeRoutes = new NFSeRoutes();
	}

	setup() {
		this.routes.use('/nfse', AuthMiddleware.isAuthorized, this.NFSeRoutes.setup());
		this.routes.get('/health', (req, res) => res.status(200).send('OK'));

		return this.routes;
	}
}
