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

// logout user
const logout = async (req, res) => {
  req.session = null;
  res.status(200).json({ message: 'Logout successful' });
};

// get active user
const active = async (req, res) => {
  try {
    const user = await authServices.active(req.session.token);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export all the functions
module.exports = {
  login,
  logout,
  active,
};