const router = require('express-promise-router')();
const authController = require('../controllers/auth.controllers');

router.post('/login', authController.login);

module.exports = router;
