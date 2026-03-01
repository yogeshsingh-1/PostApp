import { DataTypes } from "sequelize";
export default (sequelize) => {
  const Comment = sequelize.define("Comment", commentSchema, {
    timestamps: true,
    tableName: "Comment",
    indexes: [{ fields: ["postId"] }, { fields: ["userId"] }],
  });
  return Comment;
};
const commentSchema = {
  commentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};
