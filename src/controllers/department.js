import { DepartmentService } from '@services';
import { PermissionUtils } from '@utils';
import BaseController from './base';

export default class DepartmentController extends BaseController {
	constructor() {
		super();

		this.departmentService = new DepartmentService();

		this.bindActions(['store', 'destroy', 'list', 'updateManager', 'updateCompany', 'listEmployees']);
	}

	async store(req, res) {
		await PermissionUtils.verifyRootPermission(req.auth);

		try {
			const department = await this.departmentService.store({
				...req.data
			});

			this.successHandler(department, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async updateManager(req, res) {
		await PermissionUtils.verifyRootPermission(req.auth);

		try {
			const department = await this.departmentService.updateManager({
				...req.params,
				...req.data
			});

			this.successHandler(department, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async updateCompany(req, res) {
		await PermissionUtils.verifyRootPermission(req.auth);

		try {
			const department = await this.departmentService.updateCompany({
				...req.params
			});

			this.successHandler(department, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}

	}

	async destroy(req, res) {
		await PermissionUtils.verifyRootPermission(req.auth);

		try {
			const department = await this.departmentService.destroy({
				...req.auth,
				id: req.params.id
			});

			this.successHandler(department, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async list(req, res) {
		await PermissionUtils.verifyManagerPermission(req.auth);

		try {
			const departments = await this.departmentService.list({
				id: req.auth.user_id
			});

			this.successHandler(departments, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async listEmployees(req, res) {
		await PermissionUtils.verifyManagerPermission(req.auth);

		try {
			const departments = await this.departmentService.listEmployees({
				id: req.params.id
			});

			this.successHandler(departments, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
