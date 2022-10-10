const db = require('../config/database');

// get all matching profiles
const getMatchingProfiles = async (job) => {
  const { job_types, title, salary, sector_id } = job;

  const  { rows } = await db.query(
    `
    SELECT * FROM profiles
    WHERE job_type @> $1 
    AND job_title iLIKE $2
    AND min_salary <= $3 
    AND sector_id = $4
    `,
    [job_types, title, salary, sector_id]
  );

  return rows;
}

// export module
module.exports = {
  getMatchingProfiles,
};