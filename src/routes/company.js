import { CompanySchema } from '@schemas';
import { CompanyController } from '@controllers';
import BaseRoutes from './base';

export default class CompanyRoutes extends BaseRoutes {
	constructor() {
		super();

		this.companyController = new CompanyController();
	}

	setup() {
		this.router.post('/', this.SchemaValidator.validate(CompanySchema.store), this.companyController.store);
		this.router.delete('/:id', this.SchemaValidator.validate(CompanySchema.find), this.companyController.destroy);
		this.router.get('/', this.companyController.list);

		return this.router;
	}
}
