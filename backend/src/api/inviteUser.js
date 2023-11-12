const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../models/user');
const InternProfile = require('../models/InternProfile');
const Role = require('../models/role');

const router = express.Router();
router.use(cors());

router.post('/invite-user', async (req, res) => {
  const {
    FullName,
    Email,
    Password,
    UserRole,
    University,
  } = req.body;

  try {
    // Check if the user with the given email already exists
    const alreadyExistsUser = await User.findOne({ where: { Email } });

    if (alreadyExistsUser) {
      return res.json({ message: 'User with email already exists!' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user
    const newUser = await User.create({ FullName, Email, Password: hashedPassword, UserRole });

/*
    if (UserRole) {
      // Find the role by name
      const role = await Role.findOne({ where: { RoleName: UserRole } });

      if (role) {
        // Add the role to the user
        await newUser.addRole(role);
      } else {
        return res.json({ message: 'Role does not exist!' });
      }
    }
*/

    if (UserRole === 'Intern') {
      // Create an intern profile associated with the user
      const internProfileData = {
        University,
        Status: "Pending",
        UserID: newUser.UserID,
      };
      await InternProfile.create(internProfileData);
    }

    res.json({ message: 'User Invited' });
  } catch (err) {
    console.error('Error: ', err);
    return res.status(500).json({ error: err });
  }
});


module.exports = router;

