import { Company } from '@models';
import { ExceptionUtils } from '@utils';


export default class CompanyService {
	async findCompany(companyId) {
		return await Company.findOne({
            where: { id: companyId },
			attributes: ['id', 'name', 'address']
        });
	}

	async list() {
		return await Company.findAll();
	}

	async store(companyData) {
		const companyExists = await Company.findOne({ where: { name: companyData.name } });

        if (companyExists) {
			throw new ExceptionUtils('Esta empresa ja existe!');
        }

        await Company.create(companyData);
	}

	async destroy(companyData) {
		const companyExists = await this.findCompany(companyData.id)

        if (!companyExists) {
			throw new ExceptionUtils('Esta empresa não existe!');
        }

        await Company.destroy({ where: { id: companyData.id } });
	}
}
