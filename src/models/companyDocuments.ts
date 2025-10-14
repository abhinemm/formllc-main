import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";
import Steps from "./steps";
import Company from "./company";
import { CompanyStatus } from "@/utils/constants";

export interface CompanyDocumentsAttributes {
  id?: number;
  stepId?: number;
  companyId?: number;
  documentUrl?: string;
  value?: string;
  action?: string;
  actiontype?: string;
  status?: number;
}

interface CompanyDocumentsCreationAttributes
  extends Optional<CompanyDocumentsAttributes, "id"> {}

class CompanyDocuments
  extends Model<CompanyDocumentsAttributes, CompanyDocumentsCreationAttributes>
  implements CompanyDocumentsAttributes
{
  public id?: number;
  public stepId?: number;
  public companyId?: number;
  public documentUrl?: string;
  public value?: string;
  public action?: string;
  public actiontype?: string;
  public status?: number;
}

CompanyDocuments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stepId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Steps,
        key: "id",
      },
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Company,
        key: "id",
      },
    },
    documentUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: CompanyStatus.active,
    },
    actiontype: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "CompanyDocuments",
    tableName: "companyDocuments",
  }
);

export default CompanyDocuments;
