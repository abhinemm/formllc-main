import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";

export interface CheckoutSessionsAttributes {
  id?: number;
  companyId?: number | null;
  regSessionId?: number | null;
  regSessionLink?: string | null;
  subSessionId?: number | null;
  subSessionLink?: string | null;
  status?: number;
}

interface CheckoutSessionsCreationAttributes
  extends Optional<CheckoutSessionsAttributes, "id"> {}

class CheckoutSessions
  extends Model<CheckoutSessionsAttributes, CheckoutSessionsCreationAttributes>
  implements CheckoutSessionsAttributes
{
  public id?: number;
  public companyId?: number;
  public regSessionId?: number | null;
  public regSessionLink?: string | null;
  public subSessionId?: number | null;
  public subSessionLink?: string | null;
  public status?: number;
}

CheckoutSessions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    regSessionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    regSessionLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subSessionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subSessionLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "checkoutSessions",
    tableName: "checkoutSessions",
  }
);

export default CheckoutSessions;
