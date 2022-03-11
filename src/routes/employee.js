import { EmployeeSchema } from '@schemas';
import { EmployeeController } from '@controllers';

import BaseRoutes from './base';

export default class EmployeeRoutes extends BaseRoutes {
	constructor() {
		super();
		this.employeeController = new EmployeeController();
	}

	setup() {
		this.router.post('/', this.SchemaValidator.validate(EmployeeSchema.store), this.employeeController.store); //criar um novo funcionário
		this.router.delete('/:id', this.SchemaValidator.validate(EmployeeSchema.find), this.employeeController.destroy); //Deletar
		this.router.put('/:user_id/department/:department_id', this.SchemaValidator.validate(EmployeeSchema.updateDepartment), this.employeeController.updateDepartment); //Vincular departamento
		this.router.put('/:user_id/company/:company_id', this.SchemaValidator.validate(EmployeeSchema.updateCompany), this.employeeController.updateCompany); //Vincular empresa

		// this.router.get('/find/:id', this.SchemaValidator.validate(EmployeeSchema.store), this.employeeController.store); //Listar um
		// this.router.get('/list-all', this.SchemaValidator.validate(EmployeeSchema.store), this.employeeController.store); //Listar todos
		return this.router;
	}
}
