import { DepartmentSchema } from '@schemas';
import { DepartmentController } from '@controllers';
import BaseRoutes from './base';

export default class DepartmentRoutes extends BaseRoutes {
	constructor() {
		super();

		this.departmentController = new DepartmentController();
	}

	setup() {
		this.router.post('/', this.SchemaValidator.validate(DepartmentSchema.store), this.departmentController.store);
		this.router.delete('/:id', this.SchemaValidator.validate(DepartmentSchema.find), this.departmentController.destroy);
		this.router.put('/manager/:id/', this.SchemaValidator.validate(DepartmentSchema.updateManager), this.departmentController.updateManager);
		this.router.put('/:department_id/company/:id/', this.SchemaValidator.validate(DepartmentSchema.updateCompany), this.departmentController.updateCompany);

		this.router.get('/', this.departmentController.list);

		return this.router;
	}
}
