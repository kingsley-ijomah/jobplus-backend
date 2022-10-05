const sectorServices = require('../services/sector.services');

// create sector
const createSector = async (req, res) => {
  try {
    const body = {name: req.body.name, image: req.file.filename};
    const sector = await sectorServices.createSector(body);
    return res.status(201).json({ sector });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// get all sectors
const getAllSectors = async (req, res) => {
  try {
    const sectors = await sectorServices.getAllSectors();
    return res.status(200).json({ sectors });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// delete sector
const deleteSector = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await sectorServices.deleteSector(id);
    return res.status(200).json({message:'Deleted successfully', sector });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// export module
module.exports = {
  createSector,
  getAllSectors,
  deleteSector,
};