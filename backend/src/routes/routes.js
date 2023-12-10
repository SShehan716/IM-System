// modules and middleware
const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJwt = require('passport-jwt');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

//models
const User = require('../models/user');
const AdminProfile = require('../models/AdminProfile');
const Company = require('../models/company');
const EvaluatorAssign = require('../models/evaluatorAssign');
const EvaluatorProfile = require('../models/EvaluatorProfile');
const InternProfile = require('../models/InternProfile');
const ManagementProfile = require('../models/managemnetProfile');
const MentorAssign = require('../models/mentorAssign');
const MentorProfile = require('../models/MentorProfile');

 

const login = require('../api/login');
const inviteUser = require('../api/inviteUser');
const manageTeam = require('../api/manageTeam');


router.get('/', (req, res) => {
  res.json({ message: 'server running on port 5000' });
});

//routes
router.post('/login', login);
router.post('/logout', login);
router.post('/invite-user', inviteUser);
router.get('/get-all-user-data', manageTeam);
router.get('/get-user-by-id/:userId', manageTeam);
router.put('/update-user/:userId', manageTeam);

module.exports = router;
