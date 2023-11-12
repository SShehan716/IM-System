const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/authcheck", passport.authenticate("jwt", { session: false}), (req, res) => {
  res.send("you have pay 2000$");
});


module.exports = router;
