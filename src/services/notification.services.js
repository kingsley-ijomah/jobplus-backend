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

// send notification to all matching profiles
const sendNotification = async (job) => {
  const profiles = await getMatchingProfiles(job);
  const type = 'Notification';

  // check if not profiles found
  if (!profiles.length) {
    return;
  }

  const notifications = profiles.map((profile) => {
    return `('${profile.user_id}', '${job.id}', '${type}')`;
  });

  await db.query(
    `
    INSERT INTO user_jobs (user_id, job_id, type)
    VALUES ${notifications.join(',')}
    `
  );
}

// export module
module.exports = {
  getMatchingProfiles,
  sendNotification,
};