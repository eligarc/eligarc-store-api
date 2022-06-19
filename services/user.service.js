const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres');
const { models } = require('./../libs/sequelize');
class UserService {
	constructor() {}

	async create(data) {
		const newUser = await models.User.create(data);
		return newUser;
	}

	async find() {
		// const client = await getConnection();
		const rows = await models.User.findAll();
		// const response = await client.query('SELECT * FROM public.task ORDER BY id ASC');
		// return response.rows;
		return rows;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound('user not found');
		}
		return user;
	}

	async update(id, changes) {
		const user = await this.findOne(id);
		const rta = await user.update(changes);
		return rta;
	}

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
