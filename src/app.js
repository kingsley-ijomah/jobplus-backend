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
const categoryRoutes = require('./routes/category.routes');
const companyRoutes = require('./routes/company.routes');
const jobRoutes = require('./routes/job.routes');
const skillRoutes = require('./routes/skill.routes');
const jobSkillRoutes = require('./routes/job_skill.routes');

app.use('/api/', userRoutes);
app.use('/api/', authRoutes);
app.use('/api/', sectorRoutes);
app.use('/api/', profileRoutes);
app.use('/api/', categoryRoutes);
app.use('/api/', companyRoutes);
app.use('/api/', jobRoutes);
app.use('/api/', skillRoutes);
app.use('/api/', jobSkillRoutes);

module.exports = app;
