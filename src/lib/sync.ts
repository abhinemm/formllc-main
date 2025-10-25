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
import CheckoutSessions from "@/models/checkoutsessions";
// import { DataTypes } from "sequelize";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await Payments.sync({ alter:true });
    await CheckoutSessions.sync({ alter: true });
    await Company.sync({ alter: true });
    await User.sync({ alter: true });
    await ContactUs.sync({ alter: false });
    await Steps.sync({ alter: false });
    await StepsTaken.sync({ alter: false });
    await CompanyDocuments.sync({ alter: false });
    // Sync all models
    await sequelize.sync({ alter: false }); // use { : true } to drop and recreate tables
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default syncDatabase;
