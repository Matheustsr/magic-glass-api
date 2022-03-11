module.exports = {
    dialect: 'postgres',
	dialectOptions: {
		ssl: {
		  require: true,
		  rejectUnauthorized: false
		}
	},
    host: '',
    username: '',
    password: '',
    database: '',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
