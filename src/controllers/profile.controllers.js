const profileServices = require('../services/profile.services');

// create profile
const createProfile = async (req, res) => {
  const body = {...req.body, user_id: req.user.id};
  try {
    const profile = await profileServices.createProfile(body);
    res.status(201).send(profile);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// export module
module.exports = {
  createProfile
};