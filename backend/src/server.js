import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import pool from "./config/db.js";
import GlobalErrorhandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import taskRoutes from "./routes/task.routes.js"
import initDB from "./data/initDB.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}));

//health route
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "Database connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

//routes
app.use("/api/auth", authRoutes) 
app.use("/api/category", categoryRoutes) 
app.use("/api/task", taskRoutes) 

//Error handler
app.use(GlobalErrorhandler)

//init Database
await initDB()

//server connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
