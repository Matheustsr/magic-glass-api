import BaseController from './base';
import NFSeService from '../services/nfse';

export default class NFSeController extends BaseController {
	constructor() {
		super();

		this.nfseService = new NFSeService();

		this.bindActions(['create']);
	}

	async create(req, res) {
		try {
			const invoice = await this.nfseService.create({
				...req.data,
				company_id: req.auth.company_id
			});

			this.successHandler(invoice, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
