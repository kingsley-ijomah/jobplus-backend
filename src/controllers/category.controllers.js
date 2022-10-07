const categoryServices = require('../services/category.services');

// create category
const createCategory = async (req, res) => {
  try {
    const category = await categoryServices.createCategory(req.body);
    res.status(201).send(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryServices.getAllCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update category
const updateCategory = async (req, res) => {
  try {
    const category = await categoryServices.updateCategory(req.params.id, req.body);
    res.status(200).send(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await categoryServices.deleteCategory(req.params.id);
    res.status(200).send({message: 'Deleted successfully', category});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
};