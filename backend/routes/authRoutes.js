const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { signupUser, loginUser, forgotPassword, resetPassword } = require('../controllers/authController');

// 1. Standard Auth
router.post('/signup', signupUser);
router.post('/login', loginUser);

// 2. Password Reset Flow
router.post('/forgotpassword', forgotPassword); // User sends email here
router.put('/resetpassword/:resetToken', resetPassword); // User sends new password here

// 3. Google Auth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const targetPage = req.user.isOnboarded ? '/dashboard' : '/onboarding/step-1';
    res.redirect(`http://localhost:5173${targetPage}?token=${token}`); 
  }
);

module.exports = router;