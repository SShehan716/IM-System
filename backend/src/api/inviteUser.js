const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../models/user');
const InternProfile = require('../models/InternProfile');
const MentorProfile = require('../models/mentorprofile');
const EvaluatorProfile = require('../models/evaluatorprofile');
const ManagementProfile = require('../models/managemnetProfile');
const AdminProfile = require('../models/adminProfile');

const router = express.Router();
router.use(cors());

router.post('/invite-user', async (req, res) => {
  const {
    FullName,
    Email,
    Password,
    UserRole,
    University,
    Designation,
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

    if (UserRole === 'Intern') {
      // Create an intern profile associated with the user
      const internProfileData = {
        University,
        Status: "Pending",
        UserID: newUser.UserID,
      };
      await InternProfile.create(internProfileData);
    } else if(UserRole === 'Mentor'){
      const mentorProfileData = {
        Designation,
        UserID: newUser.UserID,
      };
      await MentorProfile.create(mentorProfileData);
    } else if(UserRole === 'Evaluator'){
      const evaluatorProfileData = {
        Designation,
        UserID: newUser.UserID,
      };
      await EvaluatorProfile.create(evaluatorProfileData);
    } else if(UserRole === 'Management'){
      const managementProfileData = {
        Designation,
        UserID: newUser.UserID,
      };
      await ManagementProfile.create(managementProfileData);
    } else if(UserRole === 'Admin'){
      const adminProfileData = {
        Designation,
        UserID: newUser.UserID,
      };
      await AdminProfile.create(adminProfileData);
    }

    res.json({ message: 'User Invited' });
  } catch (err) {
    console.error('Error: ', err);
    return res.status(500).json({ error: err });
  }
});


module.exports = router;

