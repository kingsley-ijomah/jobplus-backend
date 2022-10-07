const db = require('../config/database');

// create company
const createCompany = async (body) => {
  const { name, district, city } = body;

  const { rows } = await db.query(
    'INSERT INTO companies (name, district, city) VALUES ($1, $2, $3) RETURNING *',
    [name, district, city]
  );

  return rows[0];
}

// get all companies
const getAllCompanies = async () => {
  const { rows } = await db.query('SELECT * FROM companies');

  return rows;
}

// update company
const updateCompany = async (id, body) => {
  const { name, district, city } = body;

  const { rows } = await db.query(
    'UPDATE companies SET name = $1, district = $2, city = $3 WHERE id = $4 RETURNING *',
    [name, district, city, id]
  );

  return rows[0];
}

// delete company
const deleteCompany = async (id) => {
  const { rows } = await db.query(
    'DELETE FROM companies WHERE id = $1 RETURNING *',
    [id]
  );

  return rows[0];
}

module.exports = {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany
};