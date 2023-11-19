const express = require('express');
const cors = require('cors');
const User = require('../models/user');
const InternProfile = require('../models/InternProfile');
const Role = require('../models/role');

const router = express.Router();
router.use(cors());

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
            attributes: ['University', 'Status'],
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
  
module.exports = router;
