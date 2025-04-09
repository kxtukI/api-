import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class Customer extends Model { }

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'ARCHIVED'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    }
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
  }
);

Customer.associate = (models) => {
  Customer.hasMany(models.Contact, {
    foreignKey: 'customer_id',
    as: 'contacts',
  });
};

export default Customer;