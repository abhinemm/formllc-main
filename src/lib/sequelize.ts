// lib/sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    dialect: 'postgres',
    logging: true, // Set to true if you want to see SQL queries
  }
);

export default sequelize;
