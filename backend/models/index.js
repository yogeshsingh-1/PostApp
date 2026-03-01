import sequelize from "../config/connection.js";
import UserModel from "./user.js";
import PostModel from "./post.js";
import CommentModel from "./comment.js";
import LikeModel from "./like.js";
const db = {};

db.sequelize = sequelize;
db.models = {};

db.models.User = UserModel(sequelize);
db.models.Post = PostModel(sequelize);
db.models.Comment = CommentModel(sequelize);
db.models.Like = LikeModel(sequelize);
// post table association
db.models.User.hasMany(db.models.Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
db.models.Post.belongsTo(db.models.User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
// comment table association
db.models.User.hasMany(db.models.Comment, {
  foreignKey: "userId",
});

db.models.Comment.belongsTo(db.models.User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

db.models.Post.hasMany(db.models.Comment, {
  foreignKey: "postId",
});

db.models.Comment.belongsTo(db.models.Post, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

// like table association
db.models.User.hasMany(db.models.Like, {
  foreignKey: "userId",
});
db.models.Like.belongsTo(db.models.User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
db.models.Post.hasMany(db.models.Like, {
  foreignKey: "postId",
});
db.models.Like.belongsTo(db.models.Post, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});
db.sequelize
  .sync({ alter: true })
  .then(() => console.log("models created"))
  .catch((e) => console.log(e));
export default db;
