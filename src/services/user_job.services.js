const db = require('../config/database');

const createUserJob = async (body) => {
  const { user_id, job_id, type } = body;

  // check if user already applied for this job
  const checkUserJob = await db.query(
    'SELECT * FROM user_jobs WHERE user_id = $1 AND job_id = $2 AND type = $3',
    [user_id, job_id, type]
  );

  if (checkUserJob.rows.length > 0) {
    throw new Error('User already applied for this job');
  }

  const { rows } = await db.query(
    'INSERT INTO user_jobs (user_id, job_id, type) VALUES ($1, $2, $3) RETURNING *',
    [user_id, job_id, type]
  );
  return rows[0];
}

// delete user jobs
const deleteUserJob = async (id) => {
  const { rows } = await db.query('DELETE FROM user_jobs WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

// delete all user jobs by user_id and type
const deleteUserJobsByUserAndType = async (body) => {
  const { user_id, type } = body;
  const { rows } = await db.query('DELETE FROM user_jobs WHERE user_id = $1 AND type = $2 RETURNING *', [user_id, type]);
  return rows;
}

// get all user jobs for a user_id and type
const getUserJobsByUserAndType = async (body) => {
  const { user_id, type } = body;

  const { rows } = await db.query(
    `
    SELECT
      jobs.*,
      json_agg(companies.*) AS company,
      json_agg(sectors.*) AS sector,
      json_agg(skills.*) AS skills,
      json_agg(application.*) AS application,
      json_agg(saved.*) AS saved,
      json_agg(notification.*) AS notification
    FROM jobs
      LEFT JOIN companies ON jobs.company_id = companies.id
      LEFT JOIN sectors ON jobs.sector_id = sectors.id
      LEFT JOIN job_skills ON jobs.id = job_skills.job_id
      LEFT JOIN skills ON job_skills.skill_id = skills.id
      LEFT JOIN user_jobs AS application ON jobs.id = application.job_id AND application.user_id = $1 AND application.type = 'Application'
      LEFT JOIN user_jobs AS saved ON jobs.id = saved.job_id AND saved.user_id = $1 AND saved.type = 'Saved'
      LEFT JOIN user_jobs AS notification ON jobs.id = notification.job_id AND notification.user_id = $1 AND notification.type = 'Notification'
    WHERE jobs.id IN (
      SELECT job_id
      FROM user_jobs
      WHERE user_id = $1 AND type = $2
    )
    GROUP BY jobs.id
    `,
    [user_id, type]
  );

  return rows;
}

// return all functions
module.exports = {
  createUserJob,
  deleteUserJob,
  deleteUserJobsByUserAndType,
  getUserJobsByUserAndType
}