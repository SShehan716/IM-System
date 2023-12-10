const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const router = express.Router();
router.use(cors());

// In-memory set to store revoked tokens
const tokenBlacklist = new Set();

//login user
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const userWithEmail = await User.findOne({ where: { Email } })
      .catch(
        (err) => {
          console.log('Error: ', err);
        }
      );

    if (!userWithEmail) {
      return res.json({ message: 'Email doesn\'t exist' });
    }


    const isPasswordValid = await bcrypt.compare(Password, userWithEmail.Password);

    if (!isPasswordValid) {
      return res.json({ message: 'Email or password does not match' });
    }

    const jwtToken = jwt.sign({
      id: userWithEmail.UserID,
      Email: userWithEmail.Email,
      Role: userWithEmail.UserRole,
    },
      process.env.JWT_SECRET,
      { expiresIn: '2h' });

    res.json({
      message: 'Login Successful',
      jwtToken
    });
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: 'Server Error', err });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Check if the token is in the blacklist
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({ message: 'Token has already been revoked' });
    }

    // Add the token to the blacklist
    tokenBlacklist.add(token);

    // Respond with a success message
    return res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Server error during logout' });
  }
});



module.exports = router;
