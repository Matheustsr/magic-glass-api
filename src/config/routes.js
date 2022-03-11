import { Router } from 'express';

import { AuthMiddleware } from '@middlewares';
import { SessionRoutes, EmployeeRoutes, CompanyRoutes, DepartmentRoutes, UtilitiesRoutes } from '@routes';

export default class Routes {
	constructor() {
		this.routes = new Router();

		this.sessionRoutes = new SessionRoutes();
		this.employeeRoutes = new EmployeeRoutes();
		this.companyRoutes = new CompanyRoutes();
		this.departmentRoutes = new DepartmentRoutes();
		this.utilitiesRoutes = new UtilitiesRoutes();
	}

	setup() {
		this.routes.use('/session', this.sessionRoutes.setup());

		this.routes.use('/company', AuthMiddleware.isAuthorized, this.companyRoutes.setup());
		this.routes.use('/employee', AuthMiddleware.isAuthorized, this.employeeRoutes.setup());
		this.routes.use('/department', AuthMiddleware.isAuthorized, this.departmentRoutes.setup());

		this.routes.use('/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', this.utilitiesRoutes.setup());
		this.routes.get('/health-check', (req, res) => res.status(200).send('OK'));

		return this.routes;
	}
}
