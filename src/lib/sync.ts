// lib/sync.ts
import sequelize from "./sequelize";
import User from "../models/user";
import Company from "../models/company";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    Company.belongsTo(User, { foreignKey: "userId", as: "userData" });
    User.hasOne(Company, { foreignKey: "userId", as: "companyData" });

    // Sync all models
    await sequelize.sync({ alter: true }); // use { force: true } to drop and recreate tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default syncDatabase;
