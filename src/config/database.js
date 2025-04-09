import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('project', 'root', null, {
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
    timestamps: true,
  },
});

export default sequelize;