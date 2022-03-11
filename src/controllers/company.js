import { CompanyService } from '@services';
import { ExceptionUtils, PermissionUtils } from '@utils';
import BaseController from './base';

export default class CompanyController extends BaseController {
	constructor() {
		super();

		this.companyService = new CompanyService();

		this.bindActions(['store', 'destroy', 'list']);
	}

	async store(req, res) {
		await PermissionUtils.verifyRootPermission(req.auth);

		try {
			const company = await this.companyService.store({
				...req.data
			});

			this.successHandler(company, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async list(req, res) {
		await PermissionUtils.verifyRootPermission(req.auth);

		try {
			const company = await this.companyService.list({
				id: req.auth.user_id
			});

			this.successHandler(company, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async destroy(req, res) {
		await PermissionUtils.verifyRootPermission(req.auth);

		try {
			const company = await this.companyService.destroy({
				...req.auth,
				id: req.params.id
			});

			this.successHandler(company, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
