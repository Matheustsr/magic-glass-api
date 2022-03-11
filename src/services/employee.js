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
            where: { email: userEmail },
        });

        if (userExists) {
			throw new ExceptionUtils('Este usuário já existe!');
        }

        await Employee.create(userData);
	}

	async destroy(userData) {
		const userExists = await this.findUser(userData.id)

        if (!userExists) {
			throw new ExceptionUtils('Este usuário não existe!');
        }

        await Employee.destroy({ where: { id: userData.id } });
	}

	async updateCompany(data) {
		//TODO
		//verificar se o usuario logado e gestor e se ele pertence a company
		const userExists = await this.findUser(data.user_id)

		if (!userExists) {
			throw new ExceptionUtils('Este usuário não existe!');
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
			throw new ExceptionUtils('Você precisa ser gestor do setor!');
		}

        if (!userExists) {
			throw new ExceptionUtils('Este usuário não existe!');
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
			throw new ExceptionUtils('Essa empresa não existe!');
		}

        if (!userExists) {
			throw new ExceptionUtils('Este usuário não existe!');
        }

        await Employee.update({
			company_id: data.company_id
		}, {
			where: {
				id: data.user_id
			}
		});
	}
}
