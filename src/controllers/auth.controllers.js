const authServices = require('../services/auth.services');

// login user
const login = async (req, res) => {
  try {
    const token = await authServices.login(req.body);
    req.session = { token: token };
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export all the functions
module.exports = {
  login,
};