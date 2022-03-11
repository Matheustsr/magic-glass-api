'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await Promise.all([
				queryInterface.addColumn('departments', 'manager_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'employees'
						},
						key: 'id'
					},
					allowNull: true
			}, { transaction }),
				queryInterface.addColumn('employees', 'department_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'departments'
						},
						key: 'id'
					},
					allowNull: true
				}, { transaction })
			]);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	down: async queryInterface => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await Promise.all([queryInterface.removeColumn('departments', 'manager_id', { transaction }), queryInterface.removeColumn('employees', 'department_id', { transaction })]);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	}
};
