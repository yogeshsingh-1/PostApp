import { DataTypes, Op } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define("User", userSchema, {
    tableName: "Users",
    timestamps: true,
    indexes: [
      {
        name: "uq_users_email", //  custom constraint name
        unique: true,
        fields: ["email"],
      },
      {
        name: "uq_users_googleId_not_null", //  custom partial index name
        unique: true,
        fields: ["googleId"],
        where: {
          googleId: {
            [Op.ne]: null,
          },
        },
      },
    ],
  });

  return User;
};
const userSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: "uq_users_email",
    },
    set(value) {
      this.setDataValue("email", value.toLowerCase());
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true, // nullable for Google users
  },

  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};
