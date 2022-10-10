const router = require('express-promise-router')();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const sectorController = require('../controllers/sector.controllers');
const auth = require('../middlewares/auth.middleware');

router.post('/sectors', auth, upload.single('image'), sectorController.createSector);
router.get('/sectors', auth, sectorController.getAllSectors);
router.delete('/sectors/:id', auth, sectorController.deleteSector);
router.put('/sectors/:id', auth, upload.single('image'), sectorController.editSector);
router.get('/sectors/categories', auth, sectorController.getSectorsCategories);

module.exports = router;