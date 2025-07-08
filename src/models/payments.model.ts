import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";

export interface PaymentsAttributes {
  id?: number;
  companyId?: number;
  invoice?: string;
  paymentDate?: string;
  plan?: string;
  paymentMethod?: string;
  status?: string;
  description?: string;
  invoicePDF?: string;
  amountPaid?: number;
}

interface PaymentsCreationAttributes
  extends Optional<PaymentsAttributes, "id"> {}

class Payments
  extends Model<PaymentsAttributes, PaymentsCreationAttributes>
  implements PaymentsAttributes
{
  public id?: number;
  public companyId?: number;
  public invoice?: string;
  public paymentDate?: string;
  public plan?: string;
  public paymentMethod?: string;
  public status?: string;
  public description?: string;
  public invoicePDF?: string;
  public amountPaid?: number;
}

Payments.init(
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
    invoice: {
      type: DataTypes.STRING,

      allowNull: true,
    },
    paymentDate: {
      type: DataTypes.DATE,

      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,

      allowNull: true,
    },
    plan: {
      type: DataTypes.STRING,

      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,

      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,

      allowNull: true,
    },
    invoicePDF: {
      type: DataTypes.STRING,

      allowNull: true,
    },
    amountPaid: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Payments",
    tableName: "payments",
  }
);

export default Payments;
