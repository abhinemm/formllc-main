import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";

export interface StepsAttributes {
  id?: number;
  title?: string;
  description?: string;
  position?: number;
}


interface StepsCreationAttributes extends Optional<StepsAttributes, "id"> {}

class Steps
  extends Model<StepsAttributes, StepsCreationAttributes>
  implements StepsAttributes
{
  public id?: number;
  public title?: string;
  public description?: string;
  public position?: number;
}

Steps.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Steps",
    tableName: "steps",
  }
);

export default Steps;
