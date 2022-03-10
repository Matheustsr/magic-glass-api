
import FinanceNFSe from '@models';
import { ExceptionUtils, NFSeUtils, PlugNotasUtils } from '@utils';
import { InvoiceService } from '@services';
import { get } from 'lodash';

export default class NFSeService extends InvoiceService {
	async create(data) {
		const company = await this.getCompanyData(data.company_id);
		const dbData = NFSeUtils.mountDBData({ invoiceData: data, company });
		const webServiceData = NFSeUtils.mountWebServiceData({ invoiceData: data, company });

		const transaction = await FinanceNFSe.sequelize.transaction();

		try {
			const dbNFSe = await FinanceNFSe.create(dbData);
			const response = await PlugNotasUtils.createNFSe({
				idIntegracao: dbNFSe.id,
				...webServiceData
			});

			const webServiceInvoice = get(response, 'documents[0]');

			if (!webServiceInvoice) {
				throw new ExceptionUtils('Não foi possível emitir a nota fiscal, tente novamente ou entre em contato com o suporte');
			}

			// TODO: PROMISE.ALL([])
			// update do new_finance com o nfse_id
			// criação do log do paciente que ficará dentro do invoice service

			await transaction.commit();

			return true;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
}
