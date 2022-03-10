import { NFSeSchema } from '@schemas';
import { NFSeController } from '@controllers';
import BaseRoutes from './base';

export default class NFSeRoutes extends BaseRoutes {
	constructor() {
		super();
		this.nfseController = new NFSeController();
	}

	setup() {
		this.router.post('/', this.SchemaValidator.validate(NFSeSchema.create), this.nfseController.create);

		return this.router;
	}
}
