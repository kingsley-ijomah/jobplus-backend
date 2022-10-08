const router = require('express-promise-router')();
const skillControllers = require('../controllers/skill.controllers');
const auth = require('../middlewares/auth.middleware');

router.post('/skills', auth, skillControllers.createSkill);
router.get('/skills', auth, skillControllers.getAllSkills);
router.put('/skills/:id', auth, skillControllers.updateSkill);
router.delete('/skills/:id', auth, skillControllers.deleteSkill);

module.exports = router;