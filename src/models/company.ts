import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";
import User, { UserAttributes } from "./user";
import { CompanyPaymentStatus, CompanyStatus } from "@/utils/constants";

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
  status?: number;
  paymentStatus?: number;
  mailingAdress?: string;
  countryCode?: string;
  phone?: string;
  paymentLink?: string;
  plan?: string;
  subsriptionPaymentStatus?: boolean;
  regPaymentStatus?: boolean;
  stripeEmailId?: string;

  document?: string;
  referId?: number;
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

  public status?: number;
  public paymentStatus?: number;

  public mailingAdress?: string;
  public countryCode?: string;
  public phone?: string;

  public paymentLink?: string;
  public plan?: string;
  public subsriptionPaymentStatus?: boolean;
  public regPaymentStatus?: boolean;
  public stripeEmailId?: string;
  public referId?: number;
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
      unique: true,
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
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: CompanyStatus.inActive,
    },
    paymentStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: CompanyPaymentStatus.notPaid,
    },
    mailingAdress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subsriptionPaymentStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    regPaymentStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    paymentLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripeEmailId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referId: {
      type: DataTypes.INTEGER,
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
