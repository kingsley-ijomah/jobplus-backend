const companyServices = require('../services/company.services');

// create company
const createCompany = async (req, res) => {
  try {
    const company = await companyServices.createCompany(req.body);
    res.status(201).send(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyServices.getAllCompanies();
    res.status(200).send(companies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update company
const updateCompany = async (req, res) => {
  try {
    const company = await companyServices.updateCompany(req.params.id, req.body);
    res.status(200).send(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete company
const deleteCompany = async (req, res) => {
  try {
    const company = await companyServices.deleteCompany(req.params.id);
    res.status(200).send({message: 'Deleted successfully', company});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany
};