const userServices = require('../services/user.services');

// create a new user
const createUser = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    return res.status(201).send({message: 'User created', user});
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

// export all the functions
module.exports = {
  createUser,
};