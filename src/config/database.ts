// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   process.env.DB_NAME!,
//   process.env.DB_USER!,
//   process.env.DB_PASSWORD!,
//   {
//     host: process.env.DB_HOST!,
//     dialect: "postgres",
//     logging: true,
//   }
// );

// export default sequelize;

import { Pool } from "pg";

const pool = new Pool({
  database: process.env.DATABASE_NAME || process.env.DB_NAME,
  user: process.env.DATABASE_USER || process.env.DB_USER,
  password: process.env.DATABASE_PASSWORD || process.env.DB_PASSWORD,
  host: process.env.DATABASE_HOST || process.env.DB_HOST,
  port: Number(process.env.DATABASE_PORT || process.env.DB_PORT || 5432),
  ssl:
    process.env.NODE_ENV === "production"
      ? {
        rejectUnauthorized: false,
      }
      : undefined,
});

export default pool;
