// lib/sync.ts
import sequelize from "./sequelize";
import User from "../models/user";
import Company from "../models/company";
import ContactUs from "@/models/contactus";
import Steps from "@/models/steps";
import StepsTaken from "@/models/stepsTaken";
import { DataTypes } from "sequelize";
import Payments from "@/models/payments.model";
import CompanyDocuments from "@/models/companyDocuments";
// import { DataTypes } from "sequelize";

const alter = process.env.dbAlter === 'true' ? true : false

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await CompanyDocuments.sync({alter:alter})
    await Payments.sync({ alter: alter });

    await Company.sync({ alter: alter });
    await User.sync({ alter: alter });
    await Company.belongsTo(User, { foreignKey: "userId", as: "userData" });
    await User.hasOne(Company, { foreignKey: "userId", as: "companyData" });
    await ContactUs.sync({ alter: alter });
    await Steps.sync({ alter: alter });
    await StepsTaken.sync({ alter: alter });
    // Sync all models
    await sequelize.sync({ alter: alter }); // use { : true } to drop and recreate tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  const queryInterface = sequelize.getQueryInterface();

  try {
    await queryInterface.addColumn("companies", "regPaymentStatus", {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  } catch (error) {
    
  }
  try {
    await queryInterface.addColumn("companies", "paymentLink", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  } catch (error) {
    
  }
  try {
    await queryInterface.addColumn("companies", "subsriptionPaymentStatus", {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  } catch (error) {
    
  }
  try {
    await queryInterface.addColumn("companies", "plan", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  } catch (error) {
    
  }
};

export default syncDatabase;
