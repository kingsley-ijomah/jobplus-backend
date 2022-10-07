const router = require('express-promise-router')();
const companyController = require('../controllers/company.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/companies', auth, companyController.createCompany);
router.get('/companies', auth, companyController.getAllCompanies);
router.put('/companies/:id', auth, companyController.updateCompany);
router.delete('/companies/:id', auth, companyController.deleteCompany);

module.exports = router;