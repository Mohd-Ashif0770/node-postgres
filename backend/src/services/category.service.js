import pool from "../config/db.js";

export const createCategoryService = async (name) => {
  const result = await pool.query(
    `
        INSERT INTO categories(name)
        VALUES($1)
        RETURNING *
        `,
    [name],
  );
  return result.rows[0];
};

export const getAllCategoryService = async () => {
  const result = await pool.query(
    `
        SELECT * FROM categories
        `,
  );

  return result.rows;
};
