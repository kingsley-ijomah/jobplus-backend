const db = require('../config/database');

// create job_skills
const createJobSkills = async (body) => {
  const { job_id, skill_id } = body;
  const { rows } = await db.query(
    'INSERT INTO job_skills (job_id, skill_id) VALUES ($1, $2) RETURNING *',
    [job_id, skill_id]
  );
  return rows[0];
}

// delete job_skills
const deleteJobSkills = async (id) => {
  await db.query('DELETE FROM job_skills WHERE id = $1', [id]);
}

// return all functions
module.exports = {
  createJobSkills,
  deleteJobSkills,
};