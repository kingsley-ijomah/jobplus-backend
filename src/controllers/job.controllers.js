const jobServices = require('../services/job.services');

// create a new job
const createJob = async (req, res) => {
  try {
    const job = await jobServices.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobServices.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update a job
const updateJob = async (req, res) => {
  try {
    const job = await jobServices.updateJob(req.params.id, req.body);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await jobServices.deleteJob(req.params.id);
    res.status(200).json({'message': 'Deleted Successfully', job});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// export all functions
module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
};