const { Client } = require('pg');

async function getConnection() {
	const client = new Client({
		host: 'localhost',
		port: 5432,
		user: 'eligarc',
		password: 'admin12345',
		database: 'my_store'
	});
	await client.connect();
	return client;
}

module.exports = getConnection;

