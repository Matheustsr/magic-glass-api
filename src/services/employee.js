import { Employee, Department, Company } from '@models';
import { ExceptionUtils } from '@utils';


export default class EmployeeService {
	async findUser(userId) {
		return await Employee.findOne({
            where: { id: userId },
			attributes: ['id', 'name', 'email', 'company_id', 'user_type']
        });
	}

	async findCompany(CompanyId) {
		return await Company.findOne({
            where: { id: CompanyId }
        });
	}

	async checkDepartmentOwner(userId) {
		return await Department.findOne({
            where: { manager_id: userId }
        });
	}

	async store(userData) {
		const userExists = await Employee.findOne({
            where: { email: userData.email },
        });

        if (userExists) {
			throw new ExceptionUtils('USER_ALREADY_EXISTS');
        }

        await Employee.create(userData);
	}

	async destroy(userData) {
		const userExists = await this.findUser(userData.id)

        if (!userExists) {
			throw new ExceptionUtils('INVALID_USER');
        }

        await Employee.destroy({ where: { id: userData.id } });
	}

	async updateCompany(data) {
		const isManagerLogged = await this.checkDepartmentOwner(data.id)
		const userExists = await this.findUser(data.user_id)

		if (!isManagerLogged) {
			throw new ExceptionUtils('NOT_AUTHORIZED');
		}

		if (!userExists) {
			throw new ExceptionUtils('INVALID_USER');
		}

		await Employee.update({
			company_id: data.company_id
		}, {
			where: {
				id: data.user_id
			}
		});
	}

	async updateDepartment(data) {
		const userExists = await this.findUser(data.user_id)
		const isManagerLogged = await this.checkDepartmentOwner(data.id)

		if (!isManagerLogged) {
			throw new ExceptionUtils('NOT_AUTHORIZED');
		}

        if (!userExists) {
			throw new ExceptionUtils('INVALID_USER');
        }

        await Employee.update({
			department_id: data.department_id,
			company_id: isManagerLogged.company_id
		}, {
			where: {
				id: data.user_id
			}
		});
	}

	async updateCompany(data) {
		const userExists = await this.findUser(data.user_id)
		const companyExists = await this.findCompany(data.company_id)

		if (!companyExists) {
			throw new ExceptionUtils('INVALID_COMPANY');
		}

        if (!userExists) {
			throw new ExceptionUtils('INVALID_USER');
        }

        await Employee.update({
			company_id: data.company_id
		}, {
			where: {
				id: data.user_id
			}
		});
	}

	async updateRole(data) {
		const userExists = await this.findUser(data.id)

        if (!userExists) {
			throw new ExceptionUtils('INVALID_USER');
        }

        await Employee.update({
			user_type: data.user_role
		}, {
			where: {
				id: data.id
			}
		});
	}
}
