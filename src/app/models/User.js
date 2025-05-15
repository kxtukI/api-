import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.VIRTUAL,
                    allowNull: true,
                    set(value) {
                        if (value) this.setDataValue('password', value);
                    }
                },
                password_hash: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                hooks: {
                    beforeValidate: async (user) => {
                        if (user.password) {
                            user.password_hash = await bcrypt.hash(user.password, 8);
                        }
                    }
                }
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.File, {
            foreignKey: "file_id",
            as: "file"
        })
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;