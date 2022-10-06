const router = require('express-promise-router')();
const authController = require('../controllers/auth.controllers');
const auth = require('../middlewares/auth.middleware');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/active', auth, authController.active);

module.exports = router;
