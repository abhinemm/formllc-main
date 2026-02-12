// lib/sequelize.ts
import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const dialectOptions =
  process.env.NODE_ENV === "production"
    ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
    : {};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    dialectOptions,
  })
  : new Sequelize(
    (process.env.DATABASE_NAME || process.env.DB_NAME) as string,
    (process.env.DATABASE_USER || process.env.DB_USER) as string,
    (process.env.DATABASE_PASSWORD || process.env.DB_PASSWORD) as string,
    {
      host: process.env.DATABASE_HOST || process.env.DB_HOST,
      port: Number(process.env.DATABASE_PORT || process.env.DB_PORT || 5432),
      dialect: "postgres",
      dialectModule: pg,
      logging: false,
      dialectOptions,
    }
  );

export default sequelize;
