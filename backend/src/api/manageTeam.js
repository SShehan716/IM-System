const express = require('express');
const cors = require('cors');
const User = require('../models/user');
const InternProfile = require('../models/InternProfile');
const MentorProfile = require('../models/MentorProfile');
const EvaluatorProfile = require('../models/EvaluatorProfile');
const ManagementProfile = require('../models/managemnetProfile');
const AdminProfile = require('../models/AdminProfile');


const router = express.Router();
router.use(cors());

//get all user data
router.get('/get-all-user-data', async (req, res) => {
  try {
    // Retrieve all users from the database
    const allUsers = await User.findAll({
      attributes: ['UserID', 'FullName', 'Email', 'UserRole'],
      include: [
        {
          model: InternProfile,
          attributes: ['University', 'Status'],
          required: false,
        },
      ],
    });

    res.json({ users: allUsers });
  } catch (err) {
    console.error('Error: ', err);
    return res.status(500).json({ error: err });
  }
});

//get user by id
router.get('/get-user-by-id/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve a specific user from the database by UserId
    const user = await User.findOne({
      where: { UserID: userId },
      attributes: ['UserID', 'FullName', 'Email', 'UserRole'],
      include: [
        {
          model: InternProfile,
          attributes: ['University', 'Status', 'InterviewScore', 'InterviewFeedback', 'Evolution1Score', 'Evolution1Feedback', 'Evolution2Score', 'Evolution2Feedback', 'Accomplishments', 'GPA', 'ProjectDetails', 'AssignedTeam'],
          required: false,
        },
        {
          model: MentorProfile,
          attributes: ['Designation'],
          required: false,
        },
        {
          model: EvaluatorProfile,
          attributes: ['Designation'],
          required: false,
        },
        {
          model: ManagementProfile,
          attributes: ['Designation'],
          required: false,
        },
        {
          model: AdminProfile,
          attributes: ['Designation'],
          required: false,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Error: ', err);
    return res.status(500).json({ error: err.message });
  }
});

//update user details
router.put('/update-user/:userId', async (req, res) => {
  const {
    FullName,
    Email,
    UserRole,
    University,
    Designation,
    InterviewScore,
    InterviewFeedback,
    Evolution1Score,
    Evolution1Feedback,
    Evolution2Score,
    Evolution2Feedback,
    Accomplishments,
    GPA,
    ProjectDetails,
    AssignedTeam,
    Status,
  } = req.body;

  try {
    const userId = req.params.userId;
    const user = await User.findOne({ where: { UserID: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user information
    user.FullName = FullName;
    user.Email = Email;
    user.UserRole = UserRole;

    // If the user is an intern,mentor, evaluator, management or admin update their profile information
    if (UserRole === 'Intern') {
      const internProfile = await InternProfile.findOne({ where: { UserID: userId } });
      if (internProfile) {
        internProfile.University = University;
        internProfile.InterviewScore = InterviewScore;
        internProfile.InterviewFeedback = InterviewFeedback;
        internProfile.Evolution1Score = Evolution1Score;
        internProfile.Evolution1Feedback = Evolution1Feedback;
        internProfile.Evolution2Score = Evolution2Score;
        internProfile.Evolution2Feedback = Evolution2Feedback;
        internProfile.Accomplishments = Accomplishments;
        internProfile.GPA = GPA;
        internProfile.ProjectDetails = ProjectDetails;
        internProfile.AssignedTeam = AssignedTeam;
        internProfile.Status = Status;
        await internProfile.save();
      }
    } else if (UserRole === 'Mentor') {
      const mentorProfile = await MentorProfile.findOne({ where: { UserID: userId } });
      if (mentorProfile) {
        mentorProfile.Designation = Designation;
        await mentorProfile.save();
      }
    } else if (UserRole === 'Evaluator') {
      const evaluatorProfile = await EvaluatorProfile.findOne({ where: { UserID: userId } });
      if (evaluatorProfile) {
        evaluatorProfile.Designation = Designation;
        await evaluatorProfile.save();
      }
    } else if (UserRole === 'Management') {
      const managementProfile = await ManagementProfile.findOne({ where: { UserID: userId } });
      if (managementProfile) {
        managementProfile.Designation = Designation;
        await managementProfile.save();
      }
    } else if (UserRole === 'Admin') {
      const adminProfile = await AdminProfile.findOne({ where: { UserID: userId } });
      if (adminProfile) {
        adminProfile.Designation = Designation;
        await adminProfile.save();
      }
    }

    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error: ', err);
    return res.status(500).json({ error: err });
  }
});

//fetch all mentors Name, MentorId
router.get('/get-all-mentors', async (req, res) => {
  try {
    const allMentors = await User.findAll({
      attributes: ['UserID', 'FullName'],
      include: [
        {
          model: MentorProfile,
          attributes: ['Designation'],
          required: true,
        },
      ],
    });

    res.json({ mentors: allMentors });
  } catch (err) {
    console.error('Error: ', err);
    return res.status(500).json({ error: err });
  }
});

//fetch all evaluators Name, EvaluatorId
router.get('/get-all-evaluators', async (req, res) => {
  try {
    const allEvaluators = await User.findAll({
      attributes: ['UserID', 'FullName'],
      include: [
        {
          model: EvaluatorProfile,
          attributes: ['Designation'],
          required: true,
        },
      ],
    });

    res.json({ evaluators: allEvaluators });
  } catch (err) {
    console.error('Error: ', err);
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
