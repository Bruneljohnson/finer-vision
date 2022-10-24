import { Model, DataTypes } from 'sequelize';
import db from '../config/database.config';
import { ISQL3FormSchema } from '../types/FormTypes.model';

export class FormInstance extends Model<ISQL3FormSchema> {}

FormInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: 'First name must be longer than 2 characters',
        },
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: 'Surname must be longer than 2 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [11, 15],
          msg: 'contact number must be longer than 10 characters',
        },
      },
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female', 'prefer-not-to-say'],
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'forms',
    timestamps: true,
  }
);
