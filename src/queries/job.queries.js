const db = require('../config/database');

const jobQuery = async (params, whereClause='', statements=[]) => {
  const { user_id, limit=10, page=1 } = params;

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
    `+ whereClause +`
    GROUP BY jobs.id
    ORDER BY jobs.created_at DESC
    LIMIT $2
    OFFSET $3
    `,
    [user_id, limit, offset, ...statements]
  );

  return rows;
}

module.exports = {
  jobQuery,
}