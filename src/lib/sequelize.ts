// lib/sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  (process.env.DATABASE_NAME || process.env.DB_NAME) as string,
  (process.env.DATABASE_USER || process.env.DB_USER) as string,
  (process.env.DATABASE_PASSWORD || process.env.DB_PASSWORD) as string,
  {
    host: process.env.DATABASE_HOST || process.env.DB_HOST,
    port: Number(process.env.DATABASE_PORT || process.env.DB_PORT || 5432),
    dialect: "postgres",
    logging: false,
    dialectOptions:
      process.env.NODE_ENV === "production"
        ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
        : {},
  }
);

export default sequelize;
