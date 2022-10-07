const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// login a user
const login = async (body) => {
  const { email, password } = body;

  // get user from db
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (rows.length === 0) {
    throw new Error('Username or password incorrect');
  }

  // compare password
  const isMatch = await bcrypt.compare(password, rows[0].password);
  if (!isMatch) {
    throw new Error('Username or password incorrect');
  }

  // create token
  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  return token;
};

// get active user
const active = async (token) => {
  // decode token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // get user from db
  const { rows } = await db.query(`
  SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    json_agg(p.*) AS profile
  FROM users u
  LEFT JOIN profiles p ON u.id = p.user_id 
  WHERE u.id = $1
  GROUP BY u.id
  `, [decoded.id]);

  return rows[0];
}

module.exports = {
  login,
  active,
};