import { DataTypes } from "sequelize";
export default (sequelize) => {
  const post = sequelize.define("Post", postSchema, {
    timestamps: true,
    tableName: "Posts",
    indexes: [{ fields: ["userId"] }, { fields: ["isActive"] }],
  });
  return post;
};
const postSchema = {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  likeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
};
