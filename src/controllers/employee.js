import { EmployeeService } from '@services';
import { PermissionUtils } from '@utils';
import BaseController from './base';

export default class EmployeeController extends BaseController {
	constructor() {
		super();

		this.employeeService = new EmployeeService();

		this.bindActions(['store', 'destroy', 'updateDepartment', 'updateCompany']);
	}

	async store(req, res) {
		await PermissionUtils.verifyManagerPermission(req.auth);

		try {
			const employee = await this.employeeService.store({
				...req.data
			});

			this.successHandler(employee, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async destroy(req, res) {
		await PermissionUtils.verifyManagerPermission(req.auth);

		try {
			const employee = await this.employeeService.destroy({
				...req.auth,
				id: req.params.id
			});

			this.successHandler(employee, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async updateDepartment(req, res) {
		await PermissionUtils.verifyManagerPermission(req.auth);

		try {
			const employee = await this.employeeService.updateDepartment({
				id: req.auth.user_id,
				user_id: req.params.user_id,
				department_id: req.params.department_id
			});

			this.successHandler(employee, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async updateCompany(req, res) {
		await PermissionUtils.verifyManagerPermission(req.auth);

		try {
			const employee = await this.employeeService.updateCompany({
				...req.params
			});

			this.successHandler(employee, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
