const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express({ type: 'application/vnd.api+json' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use('/uploads', express.static('uploads'));

// routes
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const sectorRoutes = require('./routes/sector.routes');
const profileRoutes = require('./routes/profile.routes');

app.use('/api/', userRoutes);
app.use('/api/', authRoutes);
app.use('/api/', sectorRoutes);
app.use('/api/', profileRoutes);

module.exports = app;
