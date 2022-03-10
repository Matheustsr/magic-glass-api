import * as yup from 'yup';
import moment from 'moment';
import { sanitizeValue } from './utils';

const schema = {
	create: {
		body: yup.object({
			valor: yup.number().nullable(),
			user_id: yup.number().min(1).nullable(),
			finance_id: yup.number().min(1).nullable(),
			patient_id: yup.number().min(1).nullable(),
			custom_iss_retention: yup.number().nullable(),
			attendance_id: yup.number().min(1).nullable(),
			iss_retido: yup.boolean().default(false).nullable(),
			item: yup.string().transform(sanitizeValue).nullable(),
			cnpj: yup.string().transform(sanitizeValue).nullable(),
			cnae: yup.string().transform(sanitizeValue).nullable(),
			disable_nfse_value: yup.boolean().default(false).nullable(),
			bsb_nfse_already_emitted: yup.boolean().default(false).nullable(),
			item_description: yup.string().transform(sanitizeValue).nullable(),
			inscricao_municipal: yup.string().transform(sanitizeValue).nullable(),
			attendance_start_date: yup.string().transform(sanitizeValue).nullable(),
			tomador_contato_email: yup.string().transform(sanitizeValue).nullable(),
			informacoes_adicionais: yup.string().transform(sanitizeValue).nullable(),
			discriminacao: yup.string().transform(sanitizeValue).max(255).required(),
			tomador_contato_telefone: yup.string().transform(sanitizeValue).nullable(),
			tomador_cpf_cnpj: yup.string().transform(sanitizeValue).max(255).required(),
			tomador_endereco_ibge_name: yup.string().transform(sanitizeValue).nullable(),
			tomador_endereco_uf: yup.string().transform(sanitizeValue).max(255).required(),
			tomador_endereco_complemento: yup.string().transform(sanitizeValue).nullable(),
			tomador_endereco_cep: yup.string().transform(sanitizeValue).max(255).required(),
			tomador_razao_social: yup.string().transform(sanitizeValue).max(255).required(),
			fiscal_servico_codigo_municipio: yup.string().transform(sanitizeValue).max(255),
			tomador_endereco_ibge: yup.string().transform(sanitizeValue).max(255).required(),
			tomador_endereco_bairro: yup.string().transform(sanitizeValue).max(255).required(),
			tomador_endereco_numero: yup.string().transform(sanitizeValue).max(255).required(),
			tomador_endereco_endereco: yup.string().transform(sanitizeValue).max(255).required()
		}).noUnknown(),
	},
	find: {
		body: yup.object({
			webservice_id: yup.string().transform(sanitizeValue).required()
		}).noUnknown(),
	},
	list: {
		body: yup.object({
			start_date: yup.string().transform(sanitizeValue).test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD').isValid()),
			end_date: yup.string().test('invalidFormat', null, value => !value || moment(value, 'YYYY-MM-DD').isValid())
		}).noUnknown(),
	},
	update: {
		body: yup.object({
			lote: yup.number().nullable(),
			numero: yup.number().nullable(),
			valorServico: yup.number().nullable(),
			id: yup.string().transform(sanitizeValue).max(255).nullable(),
			pdf: yup.string().transform(sanitizeValue).max(255).nullable(),
			xml: yup.string().transform(sanitizeValue).max(255).nullable(),
			emissao: yup.string().transform(sanitizeValue).max(255).nullable(),
			serie: yup.string().transform(sanitizeValue).max(255).nullable(),
			tomador: yup.string().transform(sanitizeValue).max(255).nullable(),
			situacao: yup.string().transform(sanitizeValue).max(255).nullable(),
			mensagem: yup.string().transform(sanitizeValue).max(255).nullable(),
			documento: yup.string().transform(sanitizeValue).max(255).nullable(),
			prestador: yup.string().transform(sanitizeValue).max(255).nullable(),
			numeroNfse: yup.string().transform(sanitizeValue).max(255).nullable(),
			autorizacao: yup.string().transform(sanitizeValue).max(255).nullable(),
			tipoAutorizacao: yup.string().transform(sanitizeValue).max(255).nullable(),
			codigoVerificacao: yup.string().transform(sanitizeValue).max(255).nullable(),
			cancelamento: yup.string().transform(sanitizeValue).test('invalidFormat', null, value => !value || moment(value, 'DD-MM-YYYY').isValid())
		}).noUnknown(),
	}
};

export default {
	list: schema.list,
	find: schema.find,
	remove: schema.find,
	create: schema.create,
	update: schema.update
};
