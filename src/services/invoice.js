import { ExceptionUtils } from '@utils';

export default class InvoiceService {
	async getCompanyData(companyId) {
		const company = await Company.findOne({
			where: {
				id: companyId
			},
			attributes: ['webservice_is_active_nfe', 'fiscal_inscricao_municipal', 'cnpj', 'fiscal_inscricao_municipal',
				'fiscal_razao_social', 'fiscal_endereco_endereco', 'fiscal_endereco_numero', 'fiscal_endereco_complemento',
				'fiscal_endereco_bairro', 'fiscal_endereco_codigo_municipio', 'fiscal_endereco_uf', 'fiscal_endereco_cep',
				'fiscal_contato_telefone', 'fiscal_contato_email', 'fiscal_servico_codigo_municipio', 'fiscal_iss_retido_aliquota']
		});

		if (!company) {
			throw new ExceptionUtils('Ambiente não encontrado para emissão da nota');
		}

		if (!company.webservice_is_active_nfe) {
			throw new ExceptionUtils('Ambiente não habilitado para emissão de nota fiscal, contate o seu contador.');
		}

		return company;
	}
}
