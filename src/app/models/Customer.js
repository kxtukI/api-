import { Model, DataTypes } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    return super.init(
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
  }

  static associate(models) {
    this.hasMany(models.Contact, {
      foreignKey: 'customer_id',
    });
  }
}

export default Customer;