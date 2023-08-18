import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
  id: number;
  username?: string;
  fullname: string;
  town: string;
  avatar?: string;
  quotes?: string;
  background?: string;
  friends?: number[];
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "username" | "avatar" | "quotes" | "background" | "friends";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  username?: string;
  fullname!: string;
  town!: string;
  avatar?: string;
  quotes?: string;
  background?: string;
  friends?: number[];


  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "users_username_key"
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    town: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quotes: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: ""
    },
    background: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    friends: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  }
}
