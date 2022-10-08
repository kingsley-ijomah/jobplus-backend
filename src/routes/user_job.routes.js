const router = require('express-promise-router')();
const userJobControllers = require('../controllers/user_job.controllers');
const auth  = require('../middlewares/auth.middleware');

router.post('/user-jobs', auth, userJobControllers.createUserJob);
router.delete('/user-jobs/:id', auth, userJobControllers.deleteUserJob);
router.delete('/user-jobs', auth, userJobControllers.deleteUserJobsByUserAndType);

module.exports = router;