const sectorServices = require('../services/sector.services');

// create sector
const createSector = async (req, res) => {
  try {
    const body = req.body;
    const sector = await sectorServices.createSector(body);
    return res.status(201).json({ sector });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// export module
module.exports = {
  createSector,
};