import { Sequelize } from 'sequelize';

const db = new Sequelize('Finer Visions App', '', '', {
  storage: './database.sqlite',
  dialect: 'sqlite',
  logging: false,
});
export default db;
