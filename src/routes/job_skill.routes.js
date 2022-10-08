const router = require('express-promise-router')();
const jobSkillController = require('../controllers/job_skill.controllers');
const auth = require('../middlewares/auth.middleware');

router.post('/job-skills', auth, jobSkillController.createJobSkills);
router.delete('/job-skills/:id', auth, jobSkillController.deleteJobSkills);

module.exports = router;