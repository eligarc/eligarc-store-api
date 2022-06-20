const { Pool } = require('pg');
const { config } = require('./../config/config');
let URI = '';
if (config.isProd) {
	URI = config.dbUrl;
} else {
	const USER = encodeURIComponent(config.dbUser);
	const PASSWORD = encodeURIComponent(config.dbPassword);
	URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const pool = new Pool({
	connectionString: URI,
	...(config.isProd && {
		ssl: {
			rejectUnauthorized: false
		}
	})
});

module.exports = pool;
