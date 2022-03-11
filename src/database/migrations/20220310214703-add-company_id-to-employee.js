'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.addColumn('employees', 'company_id', {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: null,
				references: { model: 'companies', key: 'id' }
			}, { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	down: async (queryInterface) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.removeColumn('employees', 'company_id', { transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
