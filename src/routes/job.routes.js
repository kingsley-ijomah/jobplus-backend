const router = require('express-promise-router')();
const jobController = require('../controllers/job.controllers');
const auth = require('../middlewares/auth.middleware');

router.post('/jobs', auth, jobController.createJob);
router.get('/jobs', auth, jobController.getAllJobs);
router.put('/jobs/:id', auth, jobController.updateJob);
router.delete('/jobs/:id', auth, jobController.deleteJob);

module.exports = router;