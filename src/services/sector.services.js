const db = require('../config/database');

// create sector
const createSector = async (body) => {
  const { name, image } = body;
  const { rows } = await db.query(
    'INSERT INTO sectors (name, image) VALUES ($1, $2) RETURNING *',
    [name, image]
  );

  return rows[0];
};

// get all sectors
const getAllSectors = async () => {
  const { rows } = await db.query('SELECT * FROM sectors');

  return rows;
};

// delete sector
const deleteSector = async (id) => {
  // check if sector id exists
  const { rows } = await db.query('SELECT * FROM sectors WHERE id = $1', [id]);
  if (!rows[0]) {
    throw new Error(`Sector not found`);
  }

  const record = await db.query('DELETE FROM sectors WHERE id = $1 RETURNING *', [id]);

  return record.rows[0];
};

// edit sector
const editSector = async (id, body) => {
  // check if sector id exists
  const { rows } = await db.query('SELECT * FROM sectors WHERE id = $1', [id]);
  if (!rows[0]) {
    throw new Error(`Sector not found`);
  }

  // edit sector
  const { name, image } = body;
  const { rows: record } = await db.query(
    'UPDATE sectors SET name = $1, image = $2 WHERE id = $3 RETURNING *',
    [name, image, id]
  );

  return record[0];
};



// export module
module.exports = {
  createSector,
  getAllSectors,
  deleteSector,
  editSector,
};