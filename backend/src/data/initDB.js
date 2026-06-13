import pool from "../config/db.js";
import fs from "fs";
import path from "path";

const initDB = async () => {
  try {
    
    const sqlPath = path.join(process.cwd(), "src/data/schema.sql"); //cwd:current working directory
    const sql = await fs.readFileSync(sqlPath, "utf-8");

    await pool.query(sql);

    console.log("Database initialization completed");
  } catch (error) {
    console.error("Database initialization failed : ", error);
  }
};

export default initDB;
