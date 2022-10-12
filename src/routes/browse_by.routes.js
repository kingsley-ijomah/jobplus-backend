const router = require('express-promise-router')();
const BrowseByControllers = require('../controllers/browse_by.controllers');
const auth = require('../middlewares/auth.middleware');

router.get('/browse-by-sectors', auth, BrowseByControllers.getSectorsWithJobCount);
router.get('/browse-by-companies', auth, BrowseByControllers.getCompaniesWithJobCount);

module.exports = router;