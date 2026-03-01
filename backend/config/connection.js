import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME ?? "demo",
  process.env.DB_USER ?? "postgres",
  process.env.DB_PASSWORD ?? "MyGSTCafe@9088",
  {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT) ?? 5432,
    dialect: "postgres",
    logging: false, // true karoge toh SQL queries console me dikhegi
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to database:", error);
    process.exit(1);
  }
};

export default sequelize;
