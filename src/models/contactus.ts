import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../lib/sequelize";

export interface ContactUsAttributes {
  id?: number;
  email?: string;
  subject?: string;
  description?: string;
}


interface ContactUsCreationAttributes extends Optional<ContactUsAttributes, "id"> {}

class ContactUs
  extends Model<ContactUsAttributes, ContactUsCreationAttributes>
  implements ContactUsAttributes
{
  public id?: number;
  public email?: string;
  public subject?: string;
  public description?: string;
}

ContactUs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ContactUs",
    tableName: "contactUs",
  }
);

export default ContactUs;
