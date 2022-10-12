const db = require('../config/database');

// get all sectors with count of jobs
const getSectorsWithJobCount = async () => {
  const query = `
    SELECT s.name, s.image, COUNT(j.id) AS job_count
    FROM sectors s
    JOIN  jobs j ON s.id = j.sector_id
    GROUP BY s.id
  `;
  const { rows } = await db.query(query);
  return rows;
}

// get all companies with count of jobs
const getCompaniesWithJobCount = async () => {
  const query = `
    SELECT c.name, c.district, c.city, COUNT(j.id) AS job_count
    FROM companies c
    JOIN  jobs j ON c.id = j.company_id
    GROUP BY c.id
  `;
  const { rows } = await db.query(query);
  return rows;
}

// export all functions
module.exports = {
  getSectorsWithJobCount,
  getCompaniesWithJobCount,
};