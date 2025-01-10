// lib/sync.ts
import sequelize from "./sequelize";
import User from "../models/user";
import Company from "../models/company";
import ContactUs from "@/models/contactus";
import Steps from "@/models/steps";
import StepsTaken from "@/models/stepsTaken";
// import { DataTypes } from "sequelize";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await Company.sync({alter:true})
    Company.belongsTo(User, { foreignKey: "userId", as: "userData" });
    User.hasOne(Company, { foreignKey: "userId", as: "companyData" });
    await ContactUs.sync({ alter: false });
    await Steps.sync({ alter: false });
    await StepsTaken.sync({ alter: false });
    // Sync all models
    await sequelize.sync({ alter: false }); // use { : true } to drop and recreate tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    // console.error("Unable to connect to the database:", error);
  }
  // const queryInterface = sequelize.getQueryInterface();

  // try {
  //   await queryInterface.addColumn("users", "profilePic", {
  //     type: DataTypes.STRING,
  //     allowNull: true,
  //     unique: true,
  //   });

  //   console.log("Column profilePic added successfully.");
  // } catch (error) {
  //   console.error("Error adding column profilePic:", error);
  // }
};

export default syncDatabase;
