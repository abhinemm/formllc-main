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

  public company?: Company;
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
        UserTypesEnum.manager
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
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
