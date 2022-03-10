export default class NFSeUtils {
	static mountDBData({ invoiceData, company }) {
		const invoiceDB = {};

		invoiceDB.webservice_status = 'PROCESSANDO';
		invoiceDB.competencia = invoiceDB.attendance_start_date || moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss');
		invoiceDB.inscricao_municipal = company.fiscal_inscricao_municipal;

		//Prestador
		invoiceDB.prestador_servico_identificacao_cpf_cnpj = company.cnpj;
		invoiceDB.prestador_servico_identificacao_inscricao_municipal = company.fiscal_inscricao_municipal;
		invoiceDB.prestador_servico_razao_social = company.fiscal_razao_social;
		invoiceDB.prestador_servico_endereco_endereco = company.fiscal_endereco_endereco;
		invoiceDB.prestador_servico_endereco_numero = company.fiscal_endereco_numero;
		invoiceDB.prestador_servico_endereco_complemento = company.fiscal_endereco_complemento;
		invoiceDB.prestador_servico_endereco_bairro = company.fiscal_endereco_bairro;
		invoiceDB.prestador_servico_endereco_codigo_municipio = company.fiscal_endereco_codigo_municipio;
		invoiceDB.prestador_servico_endereco_uf = company.fiscal_endereco_uf;
		invoiceDB.prestador_servico_endereco_cep = company.fiscal_endereco_cep;
		invoiceDB.prestador_servico_contato_telefone = company.fiscal_contato_telefone;
		invoiceDB.prestador_servico_contato_email = company.fiscal_contato_email;

		invoiceDB.user_id;
		invoiceDB.company_id = companyId;
		invoiceDB.source = `Finance_${invoiceData.finance_id}`;

		//Serviço
		invoiceDB.servico_valores_base_calculo = invoiceData.valor;
		invoiceDB.servico_codigo_municipio = company.fiscal_servico_codigo_municipio;
		invoiceDB.servico_valores_valor_servicos = invoiceData.valor;
		invoiceDB.servico_valores_aliquota = invoiceData.valor;
		invoiceDB.servico_valores_valor_liquido_nfse = invoiceData.valor;
		invoiceDB.servico_item_lista_servico = invoiceData.item;
		invoiceDB.servico_codigo_tributacao_municipio = invoiceData.cnae;
		invoiceDB.servico_discriminacao = invoiceData.discriminacao;

		//Tomador
		invoiceDB.tomador_servico_identificacao_cpf_cnpj = invoiceData.tomador_cpf_cnpj;
		invoiceDB.tomador_servico_razao_social = invoiceData.tomador_razao_social;
		invoiceDB.tomador_servico_identificacao_inscricao_municipal = invoiceData.tomador_ie;
		invoiceDB.tomador_servico_endereco_complemento = invoiceData.tomador_endereco_complemento;
		invoiceDB.tomador_servico_endereco_endereco = invoiceData.tomador_endereco_endereco;
		invoiceDB.tomador_servico_endereco_numero = invoiceData.tomador_endereco_numero;
		invoiceDB.tomador_servico_endereco_bairro = invoiceData.tomador_endereco_bairro;
		invoiceDB.tomador_servico_endereco_codigo_municipio = invoiceData.tomador_endereco_ibge;
		invoiceDB.tomador_servico_endereco_uf = invoiceData.tomador_endereco_uf;
		invoiceDB.tomador_servico_endereco_cep = invoiceData.tomador_endereco_cep;
		invoiceDB.tomador_servico_contato_telefone = invoiceData.tomador_contato_telefone;
		invoiceDB.tomador_servico_contato_email = invoiceData.tomador_contato_email;

		return invoiceDB;
	}

	static mountWebServiceData({ invoiceData, company }) {
		const invoice = {};

		invoice.prestador = {
			cpfCnpj: company.cnpj
		};

		invoice.tomador = {
			cpfCnpj: invoiceData.tomador_cpf_cnpj,
			razaoSocial: invoiceData.tomador_razao_social,
			endereco: {
				cep: invoiceData.tomador_endereco_cep,
				tipoLogradouro: invoiceData.fiscal_tipo_logradouro,
				logradouro: invoiceData.tomador_endereco_endereco,
				numero: invoiceData.tomador_endereco_numero,
				codigoCidade: invoiceData.tomador_endereco_ibge,
				estado: invoiceData.tomador_endereco_uf,
				bairro: invoiceData.tomador_endereco_bairro
			}
		};

		invoice.servico = [{
			codigo: company.fiscal_servico_codigo_municipio,
			discriminacao: invoiceData.discriminacao,
			cnae: invoiceData.cnae,
			iss: {
				retido: invoiceData.iss_retido,
				aliquota: invoiceData.fiscal_iss_retido_aliquota //servico_valores_aliquota? verificar. Provavelmente essa property está errada.
			},
			valor: {
				servico: invoiceData.valor
			}
		}];

		return [invoice];
	}
}
