import "dotenv/config"; // load env first
import app from "./index.js"; // import app
import { connectDB } from "./config/connection.js";
import "./models/index.js"; // load models
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
import verifyRouter from "./routes/verify.routes.js";
import CommentRouter from "./routes/comment.routes.js";
import LikeRouter from "./routes/like.routes.js";
const port = process.env.PORT || 5000;

// 1 Connect DB
await connectDB();

// 2 Attach routes AFTER middleware initialized

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/verify", authMiddleware, verifyRouter);
app.use("/api/v1/post", authMiddleware, postRouter);
app.use("/api/v1/comment", authMiddleware, CommentRouter);
app.use("/api/v1/like", authMiddleware, LikeRouter);
// Global Error Handler
app.use((err, req, res, next) => {
  return res.status(err.status ?? 500).json({
    status: false,
    message: err.message || "Something went wrong",
  });
});

//  Start server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
