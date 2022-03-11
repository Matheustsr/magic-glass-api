import BaseModel from './base';

export default class Department extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'department',
			tableName: 'departments',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
	}

	static associate(models) {
		this.belongsTo(models.Employee, { foreignKey: 'manager_id' });
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
	}
}
