const express = require('express');
const RegisterApi = require('./inviteUser');
const LoginApi = require('./login');
const AuthCheck = require('./authcheck');

const router = express.Router();

router.use(RegisterApi);
router.use(LoginApi);
router.use(AuthCheck);

module.exports = router;
