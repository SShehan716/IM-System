const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const router = express.Router();
router.use(cors());

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try{
    const userWithEmail = await User.findOne({ where: { Email } })
      .catch(
        (err) => {
          console.log('Error: ', err);
        }
      );

    if (!userWithEmail) {
      return res.json({ message: 'Email doesn\'t exist' });
    }


    // Use bcrypt to compare the hashed password
    const isPasswordValid = await bcrypt.compare(Password, userWithEmail.Password);

    if (!isPasswordValid) {
      return res.json({ message: 'Email or password does not match' });
    }

/*
    // Fetch the user's roles using the association
    const userRoles = await userWithEmail.getRoles();

    // Extract role names from userRoles
    const roleNames = userRoles.map(role => role.RoleName);
*/



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
  }catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: 'Server Error', err });  }
});

module.exports = router;
