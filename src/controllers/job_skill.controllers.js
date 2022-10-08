const jobSkillServices = require('../services/job_skill.services');

// create job_skills
const createJobSkills = async (req, res) => {
  try {
    const body = req.body;
    const jobSkills = await jobSkillServices.createJobSkills(body);
    return res.status(201).json({ jobSkills });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

// delete job_skills
const deleteJobSkills = async (req, res) => {
  try {
    const id = req.params.id;
    const jobSkills = await jobSkillServices.deleteJobSkills(id);
    return res.status(200).json({message: 'Deleted successfully', jobSkills });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}

// return all functions
module.exports = {
  createJobSkills,
  deleteJobSkills,
};