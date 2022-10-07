const router = require('express-promise-router')();
const categoryController = require('../controllers/category.controllers');
const auth = require('../middlewares/auth.middleware');

router.post('/categories', auth, categoryController.createCategory);
router.get('/categories', auth, categoryController.getAllCategories);
router.put('/categories/:id', auth, categoryController.updateCategory);
router.delete('/categories/:id', auth, categoryController.deleteCategory);

module.exports = router;