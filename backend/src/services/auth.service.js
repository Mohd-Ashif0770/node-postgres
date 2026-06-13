import pool from "../config/db.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import appError from "../utils/appError.js";

dotenv.config();

export const registerUserService = async (name, email, password) => {
  const existingUser = await pool.query(
    `
     SELECT * FROM users
     WHERE email = $1
     `,
    [email],
  );

  const user = existingUser.rows[0];

  if (user) {
    throw appError(409, "Email already exist");
  }

  //hash password
  const hashed = await bcrypt.hash(password, 10);

  //create user
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email
        `,
    [name, email, hashed],
  );

  return result.rows[0];
};

export const loginUserService = async (email, password) => {
  const existingUser = await pool.query(
    `
        SELECT * FROM users
        WHERE email = $1
        `,
    [email],
  );

  const user = existingUser.rows[0];

  if (!user) {
    throw appError(404, "User not found")
  }
  //verify password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw appError(400, "Invalid credentials");
  }

  //generate token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getProfileService = async (id) => {
  const result = await pool.query(
    `
        SELECT * FROM users
        WHERE id = $1
        `,
    [id],
  );

  const user = result.rows[0];

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
