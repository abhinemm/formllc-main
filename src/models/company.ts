import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";
import User, { UserAttributes } from "./user";

export interface CompanyAttributes {
  id?: number;
  type?: string;
  registrationState: string;
  userId?: number;
  document?: string;
}
export interface CompanyWithUserAttributes
  extends UserAttributes,
    CompanyAttributes {
  companyType: string;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, "id"> {}

class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  public id?: number;
  public type!: string;
  public registrationState!: string;
  public userId?: number;
  public document?: string;

  public user?: User;
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    registrationState: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Company",
    tableName: "companies",
    paranoid:true
  }
);

export default Company;
