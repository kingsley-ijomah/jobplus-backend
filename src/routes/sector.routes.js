const router = require('express-promise-router')();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const sectorController = require('../controllers/sector.controllers');

router.post('/sectors', upload.single('image'), sectorController.createSector);

module.exports = router;