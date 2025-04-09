import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class Contact extends Model { }

Contact.init(
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
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contact',
  }
);

Contact.associate = (models) => {
  Contact.belongsTo(models.Customer, {
    foreignKey: 'customer_id',
    as: 'customer',
  });
};

export default Contact;