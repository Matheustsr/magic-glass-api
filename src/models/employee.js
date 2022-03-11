import BaseModel from './base';
import bcrypt from 'bcryptjs';

export default class Employee extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			user_type: DataTypes.STRING,
			birth_date: DataTypes.STRING,
			gender: DataTypes.STRING,
			hire_date: DataTypes.STRING
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'employee',
			tableName: 'employees',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		}),
		this.addHook('beforeSave', async (user) => {
            if (user.dataValues.password) {
                user.password = await bcrypt.hash(user.dataValues.password, 8);
            }
        });
	}

	static associate(models) {
		this.belongsTo(models.Department, { foreignKey: 'department_id' });
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
	}

	static checkPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}
