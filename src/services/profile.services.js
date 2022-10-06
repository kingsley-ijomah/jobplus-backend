const db = require('../config/database');

// create profile
const createProfile = async (body) => {
  const { job_title, min_salary, job_type, experience, sector_id, user_id } = body;

  // check user profile exists
  const checkProfile = await db.query('SELECT * FROM profiles WHERE user_id = $1', [user_id]);
  if (checkProfile.rows.length > 0) {
    throw new Error('Profile already exists');
  }

  // create profile
  const createProfile = await db.query(
    'INSERT INTO profiles (job_title, min_salary, job_type, experience, sector_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [job_title, min_salary, job_type, experience, sector_id, user_id]
  );

  return createProfile.rows[0];
}

// export module
module.exports = {
  createProfile
};