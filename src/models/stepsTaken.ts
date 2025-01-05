import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";
import Steps from "./steps";
import Company from "./company";
import User from "./user";

export interface StepsTakenAttributes {
  id?: number;
  stepId?: number;
  content?: string;
  companyId?: number;
  userId?: number;
  status?: string;
  action?: string;
}

interface StepsTakenCreationAttributes
  extends Optional<StepsTakenAttributes, "id"> {}

class StepsTaken
  extends Model<StepsTakenAttributes, StepsTakenCreationAttributes>
  implements StepsTakenAttributes
{
  public id?: number;
  public stepId?: number;
  public companyId?: number;
  public userId?: number;
  public status?: string;
  public action?: string;
  public content?: string;
}

StepsTaken.init(
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
        model: Steps, // References the Step model
        key: "id", // Key in Step model that this foreign key references
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "StepsTaken",
    tableName: "stepsTaken",
  }
);

export default StepsTaken;
