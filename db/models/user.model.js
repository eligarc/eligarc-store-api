const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

/**
 * @description description of each field in the table
 * @typedef {Object} field definition
 * @property {boolean} allowNull - false=NOT NULL
 * @property {boolean} autoIncrement - each insert, increase the counter
 * @property {boolean} primaryKey - define is primary key
 * @property {boolean} type - expresion to match SQL type
 * @property {boolean} unique - difne as unique the field
 * @property {boolean} field - rename the field
 */
 const UserSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	email: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: true,
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING
	},
	role: {
		allowNull: false,
		type: DataTypes.STRING,
		defaultValue: 'customer'
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'create_at',
		defaultValue: Sequelize.NOW
	}
}

class User extends Model {
	static associate(models) {
		this.hasOne(models.Customer, {
			as: 'customer',
			foreignKey: 'userId'
		});
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: 'User',
			timestamps: false
		}
	}
}


module.exports = { USER_TABLE, UserSchema, User }