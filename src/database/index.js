import Sequelize from 'sequelize';
import config from '../config/database.js';

import Customer from '../app/models/Customer.js';
import Contact from '../app/models/Contact.js';
import User from '../app/models/User.js';
import File from '../app/models/File.js';

const models = [Customer, Contact, User, File];

class Database {
    constructor() {
        this.connection = new Sequelize(
            config.database,
            config.username,
            config.password,
            {
                host: config.host,
                dialect: config.dialect,
                define: config.define,
            }
        );
        this.init();
        this.associate();
    }

    init() {
        models.forEach(model => model.init(this.connection));
    }

    associate() {
        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

export default new Database();