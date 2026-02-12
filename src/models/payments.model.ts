import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";

export interface PaymentsAttributes {
  id?: number;
  companyId?: number;
  paymentId?: string;
  transactionID?: string;
  paymentDate?: string;
  plan?: string;
  registrationState?: string;
  status?: string;
  description?: string;
  invoicePDF?: string;
  amountPaid?: number;
  type?: string;
  buyerInfo?: string;
  currency?: string;
  webhookId?: string;
  createdBy?: number;
}

interface PaymentsCreationAttributes
  extends Optional<PaymentsAttributes, "id"> {}

class Payments
  extends Model<PaymentsAttributes, PaymentsCreationAttributes>
  implements PaymentsAttributes
{
  public id?: number;
  public companyId?: number;
  public paymentId?: string;
  public transactionID?: string;
  public paymentDate?: string;
  public plan?: string;
  public registrationState?: string;
  public status?: string;
  public description?: string;
  public invoicePDF?: string;
  public amountPaid?: number;
  public type?: string;
  public buyerInfo?: string;
  public currency?: string;
  public webhookId?: string;
  public createdBy?: number;
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
    paymentId: {
      type: DataTypes.STRING,

      allowNull: true,
    },
    transactionID: {
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
    registrationState: {
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
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    buyerInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    webhookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "1 = auto created, 2 = manual created",
    },
  },
  {
    sequelize,
    modelName: "Payments",
    tableName: "payments",
  }
);

export default Payments;
