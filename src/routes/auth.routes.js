const router = require('express-promise-router')();
const authController = require('../controllers/auth.controllers');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/active', authController.active);

module.exports = router;
