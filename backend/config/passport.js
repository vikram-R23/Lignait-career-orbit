const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user already exists in our DB
      let user = await User.findOne({ where: { googleId: profile.id } });

      if (user) {
        return done(null, user);
      }

      // 2. If not, check if email exists (Link accounts)
      user = await User.findOne({ where: { email: profile.emails[0].value } });

      if (user) {
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }

      // 3. Create new user
      // ✅ FIX: We added "|| 'User'" to the lastName field
      const newUser = await User.create({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName || 'User', // <--- THE FIX: Use 'User' if Google sends nothing
        email: profile.emails[0].value,
        password: '', // No password needed for Google users
        role: 'student'
      });

      done(null, newUser);
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  }
));

// Serialize/Deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});