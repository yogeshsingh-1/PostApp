import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Like = sequelize.define("Like", likeSchema, {
    timestamps: true,
    tableName: "Like",
    indexes: [
      {
        unique: true,
        fields: ["userId", "postId"],
      },
    ],
  });
  return Like;
};
const likeSchema = {
  likeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};
