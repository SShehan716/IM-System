const express = require('express');
const cors = require('cors');
const User = require('../models/user');
const InternProfile = require('../models/InternProfile');
const Role = require('../models/role');

const router = express.Router();
router.use(cors());

router.get('/manage-team', async (req, res) => {
    try {
      // Retrieve all users from the database
      const allUsers = await User.findAll({
        attributes: ['FullName', 'Email', 'UserRole'],
        include: [
            {
              model: InternProfile,
              attributes: ['University'],
              where: { Status: 'Pending' }, // Add conditions as needed
              required: false, // Use left join to include users without intern profiles
            },
          ],
      });
  
      res.json({ users: allUsers });
    } catch (err) {
      console.error('Error: ', err);
      return res.status(500).json({ error: err });
    }
  });

module.exports = router;
