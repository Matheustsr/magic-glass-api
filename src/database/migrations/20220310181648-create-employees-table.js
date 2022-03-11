'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('employees', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.DataTypes.INTEGER
				},
				name: {
					type: Sequelize.DataTypes.STRING,
				},
				email: {
					type: Sequelize.DataTypes.STRING
				},
				password: {
					type: Sequelize.DataTypes.STRING
				},
				user_type: {
					type: Sequelize.DataTypes.STRING
				},
				birth_date: {
					type: Sequelize.DataTypes.STRING
				},
				gender: {
					type: Sequelize.DataTypes.STRING
				},
				hire_date: {
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
			}, { transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	down: async queryInterface => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('employees', { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
