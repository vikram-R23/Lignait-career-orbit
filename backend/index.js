const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const passport = require('passport');
const session = require('express-session');

// Load environment variables (Best to do this at the top)
dotenv.config();

// Import Configuration & Routes
require('./config/passport'); // Import the Google Strategy config
const authRoutes = require('./routes/authRoutes');

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// ============================================
// ✅ ADDED THIS MISSING SECTION
// ============================================
// 1. Session Config (Required for Google Auth to work)
app.use(session({
  secret: process.env.SESSION_SECRET || 'career_orbit_secret_key', // Use env var or fallback
  resave: false,
  saveUninitialized: false
}));

// 2. Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// ============================================

// --- USE ROUTES ---
// This must come AFTER passport.session()
app.use('/api/auth', authRoutes);

// Test DB Connection and Sync Models
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected successfully.');
    
    // Keep force: false unless you need to reset the DB
    await sequelize.sync({ force: true});
    console.log('✅ Database Synced.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

startServer();