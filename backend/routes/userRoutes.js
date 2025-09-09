const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use env variable for JWT secret

// Middleware to authenticate using JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

router.post(
  '/login',
  [
    body('email').isString().withMessage('Email must be a string'),
    body('password').isString().withMessage('Password must be a string'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });

      // ✅ Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '10h',
      });

      return res.status(200).json({
        message: 'Login successful',
        token,               // Important: send token here
        userType: user.type || 'user',
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

module.exports = router;