const router = require('express-promise-router')();
const sectorController = require('../controllers/sector.controllers');

router.post('/sectors', sectorController.createSector);

module.exports = router;