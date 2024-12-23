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
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST,
  port: 5432, // Change this if your port is different
});

export default pool;
