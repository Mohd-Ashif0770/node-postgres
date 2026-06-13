import pool from "../config/db.js";

export const createTaskService = async (title, description, category_id) => {
  const result = await pool.query(
    `
        INSERT INTO tasks(title, description, category_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
    [title, description, category_id],
  );

  return result.rows[0];
};

export const getAllTaskService = async () => {
  const result = await pool.query(
    `
        SELECT t.*, c.name AS category_name
        FROM tasks t
        INNER JOIN categories c
        ON t.category_id = c.id
        `,
  );
  return result.rows;
};

export const getTaskByIdService = async (id) => {
  const result = await pool.query(
    `
        SELECT * FROM tasks
        WHERE id=$1
        `,
    [id],
  );

  return result.rows[0];
};

export const updateTaskService = async (
  id,
  title,
  description,
  status,
  category_id,
) => {
  const result = await pool.query(
    `
        UPDATE tasks
        SET
           title = $1,
           description = $2,
           status = $3,
           category_id = $4,
           updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING *   
        `,
    [title, description, status, category_id, id],
  );

  return result.rows[0];
};

export const updateTaskStatusService = async (id, status) => {
  const result = await pool.query(
    `
    UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING *
    `, [status, id]
  )

  return result.rows[0];
}

export const deleteTaskService = async (id) => {
  const result = await pool.query(
    `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *
        `,
    [id],
  );
  return result.rows[0];
};
