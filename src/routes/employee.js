import { EmployeeSchema } from '@schemas';
import { EmployeeController } from '@controllers';

import BaseRoutes from './base';

export default class EmployeeRoutes extends BaseRoutes {
	constructor() {
		super();

		this.employeeController = new EmployeeController();
	}

	setup() {
		this.router.post('/', this.SchemaValidator.validate(EmployeeSchema.store), this.employeeController.store);
		this.router.delete('/:id', this.SchemaValidator.validate(EmployeeSchema.find), this.employeeController.destroy);
		this.router.put('/:id', this.SchemaValidator.validate(EmployeeSchema.updateRole), this.employeeController.updateRole);
		this.router.put('/:user_id/company/:company_id', this.SchemaValidator.validate(EmployeeSchema.updateCompany), this.employeeController.updateCompany);
		this.router.put('/:user_id/department/:department_id', this.SchemaValidator.validate(EmployeeSchema.updateDepartment), this.employeeController.updateDepartment);

		return this.router;
	}
}
