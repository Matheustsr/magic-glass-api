'use strict';

module.exports = {
  	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await Promise.all([
				queryInterface.createTable('departments', {
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: Sequelize.DataTypes.INTEGER
					},
					name: {
						type: Sequelize.DataTypes.STRING
					},
					created_at: {
						type: Sequelize.DATE,
						defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
					},
					updated_at: {
						type: Sequelize.DATE,
						defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
					},
					deleted_at: {
						type: Sequelize.DataTypes.DATE
					}
				}, { transaction }),
				queryInterface.createTable('companies', {
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: Sequelize.DataTypes.INTEGER
					},
					name: {
						type: Sequelize.DataTypes.STRING,
						allowNull: false
					},
					address: {
						type: Sequelize.DataTypes.STRING,
						allowNull: false
					},
					created_at: {
						type: Sequelize.DATE,
						defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
					},
					updated_at: {
						type: Sequelize.DATE,
						defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
					},
					deleted_at: {
						type: Sequelize.DataTypes.DATE
					}
				}, { transaction })
			]);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	down: async (queryInterface) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await Promise.all([queryInterface.dropTable('departments', { transaction }), queryInterface.dropTable('companies', { transaction })]);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	}
};
