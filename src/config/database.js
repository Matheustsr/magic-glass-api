module.exports = {
    dialect: 'postgres',
	dialectOptions: {
		ssl: {
		  require: true,
		  rejectUnauthorized: false
		}
	},
    host: 'ec2-44-192-245-97.compute-1.amazonaws.com',
    username: 'walzhflwrxpdzz',
    password: '398ac8611b281ab90454a24ff410ce1548f847f9d42459e7f90fef29911e2793',
    database: 'df0hn3beifgtg2',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
