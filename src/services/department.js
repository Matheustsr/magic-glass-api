import { ExceptionUtils } from '@utils';
import { Department, Employee, Company } from '@models';


export default class DepartmentService {
	async findDepartment(departmentId) {
		return await Department.findOne({
            where: { id: departmentId },
			attributes: ['id', 'name']
        });
	}

	async findCompany(companyId) {
		return await Company.findOne({
            where: { id: companyId }
        });
	}

	async getEmployee(userId) {
		return await Employee.findOne({
            where: { id: userId }
        });
	}

	async store(departmentData) {
		const departmentExists = await Department.findOne({ where: { name: departmentData.name } });

        if (departmentExists) {
			throw new ExceptionUtils('Este departamento ja existe!');
        }

        await Department.create(departmentData);
	}

	async destroy(departmentData) {
		const departmentExists = await this.findDepartment(departmentData.id)

        if (!departmentExists) {
			throw new ExceptionUtils('Este departamento não existe!');
        }

        await Department.destroy({ where: { id: departmentData.id } });
	}

	async list({ id }) {
		return await Department.findAll({
			where: { manager_id: id },
			attributes: ['id', 'name']
		});
	}

	async listEmployees({ id }) {
		return await Employee.findAll({
			where: { department_id: id }
		});
	}

	async updateManager(data) {
		const departmentExists = await this.findDepartment(data.id)
		const employeeData = await this.getEmployee(data.manager_id)

        if (!departmentExists) {
			throw new ExceptionUtils('Este departamento não existe!');
        }

		if (employeeData.user_type !== 'MANAGER') {
			throw new ExceptionUtils('Este usuário não pode ser gestor de um setor!');
		}

		await Department.update({
			manager_id: data.manager_id
		}, {
			where: {
				id: data.id
			}
		});
	}

	async updateCompany(data) {
		const companyExists = await this.findCompany(data.id)

		if (!companyExists) {
			throw new ExceptionUtils('Esta empresa não existe!');
        }
		await Department.update({
			company_id: data.id
		}, {
			where: {
				id: data.department_id
			}
		});
	}
}
