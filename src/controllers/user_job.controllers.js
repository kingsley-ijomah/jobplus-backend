const userJobServices = require('../services/user_job.services');

// create user job
const createUserJob = async (req, res) => {
  const body  = {...req.body, user_id: req.user.id};
  try {
    const userJob = await userJobServices.createUserJob(body);
    res.status(201).send(userJob);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// delete user job
const deleteUserJob = async (req, res) => {
  try {
    const userJob = await userJobServices.deleteUserJob(req.params.id);
    res.status(200).send(userJob);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// delete all user jobs by user_id and type
const deleteUserJobsByUserAndType = async (req, res) => {
  const body  = {...req.body, user_id: req.user.id};
  try {
    const userJobs = await userJobServices.deleteUserJobsByUserAndType(body);
    res.status(200).send(userJobs);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// get all user jobs for a user_id and type
const getUserJobsByUserAndType = async (req, res) => {
  const body  = {...req.body, user_id: req.user.id};
  try {
    const userJobs = await userJobServices.getUserJobsByUserAndType(body);
    res.status(200).send(userJobs);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// return all functions
module.exports = {
  createUserJob,
  deleteUserJob,
  deleteUserJobsByUserAndType,
  getUserJobsByUserAndType
}