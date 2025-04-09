import Sequelize from 'sequelize';
import config from '../config/database.js';

import Customer from '../app/models/Customer.js';
import Contact from '../app/models/Contact.js';
import User from '../app/models/User.js';

    const models = [Customer, Contact, User]

class Database {
    constructor(){
        this.connection = new Sequelize();
    }

    init(){
        models.forEach(model => model.init(this.connection));
    }
}