const router = require('express-promise-router')();
const profileControllers = require('../controllers/profile.controllers');
const auth = require('../middlewares/auth.middleware');

router.post('/profiles', auth, profileControllers.createProfile);
router.put('/profiles/:id', auth, profileControllers.updateProfile);

module.exports = router;