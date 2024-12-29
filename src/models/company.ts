import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";
import User, { UserAttributes } from "./user";

export interface CompanyAttributes {
  id?: number;
  type?: string;
  registrationState: string;
  userId?: number;
  ownerFname?: string;
  ownerLname?: string;
  companyName?: string;
  companyEmail?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;

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

  public ownerFname?: string;
  public ownerLname?: string;
  public companyName?: string;
  public companyEmail?: string;
  public streetAddress?: string;
  public city?: string;
  public state?: string;
  public zipCode?: string;
  public country?: string;

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
    ownerFname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerLname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:true,
    },
    streetAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Company",
    tableName: "companies",
    paranoid: true,
  }
);

export default Company;
