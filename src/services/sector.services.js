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

// export module
module.exports = {
  createSector,
};