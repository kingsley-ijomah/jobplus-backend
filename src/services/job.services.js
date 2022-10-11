const db = require('../config/database');
const notificationServices = require('./notification.services');

// create a new job
const createJob = async (body) => {
  const { title, salary_type, salary, job_types, description, company_id, sector_id, category_id } = body;

  const { rows } = await db.query(
    'INSERT INTO jobs (title, salary_type, salary, job_types, description, company_id, sector_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [title, salary_type, salary, job_types, description, company_id, sector_id, category_id],
  );

  // send notification to all matching profiles
  await notificationServices.sendNotification(rows[0]);

  return rows[0];
}

// get all jobs
const getAllJobs = async () => {
  const { rows } = await db.query('SELECT * FROM jobs');

  return rows;
}

// update a job
const updateJob = async (id, body) => {
  const { title, salary_type, salary, job_types, description, company_id, sector_id, category_id } = body;

  const { rows } = await db.query(
    'UPDATE jobs SET title = $1, salary_type = $2, salary = $3, job_types = $4, description = $5, company_id = $6, sector_id = $7, category_id = $8 WHERE id = $9 RETURNING *',
    [title, salary_type, salary, job_types, description, company_id, sector_id, category_id, id],
  );

  return rows[0];
}

// delete a job
const deleteJob = async (id) => {
  const { rows } = await db.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);

  return rows[0];
}

// search jobs
const searchJobs = async (params) => {
  const { user_id, limit=10, page=1, what, where } = params;

  const offset = (page - 1) * limit;

  const { rows } = await db.query(
    `
    SELECT
      jobs.*,
      json_agg(DISTINCT companies) AS company,
      json_agg(DISTINCT sectors) AS sector,
      json_agg(DISTINCT skills) AS skills,
      json_agg(DISTINCT saved) AS user_saved,
      json_agg(DISTINCT notification) AS user_notification,
      json_agg(DISTINCT application) AS user_application
    FROM jobs
      LEFT JOIN companies ON jobs.company_id = companies.id
      LEFT JOIN sectors ON jobs.sector_id = sectors.id
      LEFT JOIN job_skills ON jobs.id = job_skills.job_id
      LEFT JOIN skills ON job_skills.skill_id = skills.id
      LEFT JOIN user_jobs AS saved ON jobs.id = saved.job_id AND saved.type = 'Saved' AND saved.user_id = $1
      LEFT JOIN user_jobs AS notification ON jobs.id = notification.job_id AND notification.type = 'Notification' AND notification.user_id = $1
      LEFT JOIN user_jobs AS application ON jobs.id = application.job_id AND application.type = 'Application' AND application.user_id = $1
    WHERE 
    (
      jobs.title ILIKE $4
      OR companies.name ILIKE $4
      OR jobs.id IN (
        SELECT job_id FROM job_skills WHERE skill_id IN (
          SELECT id FROM skills WHERE name ILIKE $4
        )
      )
    )
    AND
    (
      companies.city ILIKE $5
      OR companies.district ILIKE $5
    )
    GROUP BY jobs.id
    ORDER BY jobs.created_at DESC
    LIMIT $3
    OFFSET $4
    `,
    [user_id, limit, offset, what, where]
  );

  return rows;
}

// export all functions
module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
};
