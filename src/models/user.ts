import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";
import Company from "./company";
import { UserTypesEnum } from "@/utils/constants";

export interface UserAttributes {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  password?: string;
  type?: string;
  currency?: string;
  gid?: string;
  profilePic?: string;
  commission?: string;
  status?: number;
  // paymentStatus?: boolean;
  // paymentLink?: string;
  // plan?: string;
  // subsriptionPaymentStatus?: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id?: number;
  public firstName!: string;
  public lastName?: string;
  public middleName?: string;
  public email!: string;
  public password?: string;
  public type?: string;
  public currency?: string;
  public gid?: string;
  public profilePic?: string;
  public company?: Company;
  public commission?: string;
  // public paymentStatus?: boolean;
  // public paymentLink?: string;
  // public plan?: string;
  // public subsriptionPaymentStatus?: boolean;
  public status?: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(
        UserTypesEnum.admin,
        UserTypesEnum.customer,
        UserTypesEnum.manager,
        UserTypesEnum.member
      ),
      allowNull: true,
      defaultValue: UserTypesEnum.customer,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    commission: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },

    // paymentStatus: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true,
    //   defaultValue: false,
    // },
    // subsriptionPaymentStatus: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true,
    //   defaultValue: false,
    // },
    // paymentLink: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // plan: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
