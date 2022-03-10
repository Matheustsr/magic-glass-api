import BaseModel from './base';

export default class FinanceNFSe extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			numero: DataTypes.STRING,
			rps: DataTypes.INTEGER,
			codigo_verificacao: DataTypes.STRING,
			data_emissao: DataTypes.STRING,
			natureza_operacao: DataTypes.STRING,
			optante_simples_nacional: DataTypes.STRING,
			incentivador_cultural: DataTypes.STRING,
			competencia: DataTypes.STRING,
			inscricao_municipal: DataTypes.STRING,
			servico_valores_valor_servicos: DataTypes.STRING,
			servico_valores_base_calculo: DataTypes.STRING,
			servico_valores_aliquota: DataTypes.STRING,
			servico_valores_valor_liquido_nfse: DataTypes.STRING,
			servico_valores_iss: DataTypes.STRING,
			servico_valores_iss_retido: DataTypes.STRING,
			servico_valores_pis: DataTypes.STRING,
			servico_valores_pis_retido: DataTypes.STRING,
			servico_valores_cofins: DataTypes.STRING,
			servico_valores_cofins_retido: DataTypes.STRING,
			servico_valores_inss: DataTypes.STRING,
			servico_valores_ir: DataTypes.STRING,
			servico_valores_ir_retido: DataTypes.STRING,
			servico_valores_csll: DataTypes.STRING,
			servico_valores_csll_retido: DataTypes.STRING,
			servico_item_lista_servico: DataTypes.STRING,
			servico_codigo_tributacao_municipio: DataTypes.STRING,
			servico_discriminacao: DataTypes.TEXT,
			servico_codigo_municipio: DataTypes.STRING,
			prestador_servico_identificacao_cpf_cnpj: DataTypes.STRING,
			prestador_servico_identificacao_inscricao_municipal: DataTypes.STRING,
			prestador_servico_razao_social: DataTypes.STRING,
			prestador_servico_endereco_endereco: DataTypes.STRING,
			prestador_servico_endereco_numero: DataTypes.STRING,
			prestador_servico_endereco_complemento: DataTypes.STRING,
			prestador_servico_endereco_bairro: DataTypes.STRING,
			prestador_servico_endereco_codigo_municipio: DataTypes.STRING,
			prestador_servico_endereco_uf: DataTypes.STRING,
			prestador_servico_endereco_cep: DataTypes.STRING,
			prestador_servico_contato_telefone: DataTypes.STRING,
			prestador_servico_contato_email: DataTypes.STRING,
			tomador_servico_identificacao_cpf_cnpj: DataTypes.STRING,
			tomador_servico_identificacao_inscricao_municipal: DataTypes.STRING,
			tomador_servico_razao_social: DataTypes.STRING,
			tomador_servico_endereco_endereco: DataTypes.STRING,
			tomador_servico_endereco_numero: DataTypes.STRING,
			tomador_servico_endereco_complemento: DataTypes.STRING,
			tomador_servico_endereco_bairro: DataTypes.STRING,
			tomador_servico_endereco_codigo_municipio: DataTypes.STRING,
			tomador_servico_endereco_uf: DataTypes.STRING,
			tomador_servico_endereco_cep: DataTypes.STRING,
			tomador_servico_contato_telefone: DataTypes.STRING,
			tomador_servico_contato_email: DataTypes.STRING,
			tomador_servico_natureza_rentencao: DataTypes.STRING,
			meta_imported: DataTypes.BOOLEAN,
			meta_active: DataTypes.BOOLEAN,
			meta_source: DataTypes.STRING, // BANK | CASH
			meta_paid: DataTypes.BOOLEAN,
			danfe_url: DataTypes.STRING,
			servico_codigo_cfop: DataTypes.INTEGER,
			source: DataTypes.STRING,
			protocol: DataTypes.STRING,
			unutilization_number: DataTypes.STRING,
			tax_burden_value: {
				type: DataTypes.FLOAT,
				defaultValue: null,
				allowNull: true
			},
			tax_burden_percentage: {
				type: DataTypes.FLOAT,
				defaultValue: null,
				allowNull: true
			},
			tax_burden_source: {
				type: DataTypes.STRING(10),
				defaultValue: null,
				allowNull: true
			},
			webservice_id: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true
			},
			webservice_status: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true
			},
			pdf_url: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true
			},
			xml_url: {
				type: DataTypes.STRING(255),
				defaultValue: null,
				allowNull: true
			}
		}, {
			timestamps: true,
			sequelize,
			modelName: 'finance_nfse',
			tableName: 'finance_nfses',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			paranoid: true
		});
	}

	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
	}
}
