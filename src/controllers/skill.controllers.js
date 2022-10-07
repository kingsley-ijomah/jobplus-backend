const skillServices = require('../services/skill.services');

// create skill
const createSkill = async (req, res) => {
  try {
    const skill = await skillServices.createSkill(req.body);
    res.status(201).json({ skill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// get all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await skillServices.getAllSkills();
    res.status(200).json({ skills });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update skill
const updateSkill = async (req, res) => {
  try {
    const skill = await skillServices.updateSkill(req.params.id, req.body);
    res.status(200).json({ skill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete skill
const deleteSkill = async (req, res) => {
  try {
    const skill = await skillServices.deleteSkill(req.params.id);
    res.status(200).json({ message: 'Successfully deleted', skill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill
}