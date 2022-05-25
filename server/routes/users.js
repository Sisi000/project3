const express = require("express");
const router = express.Router();
const debug = require("debug")("server:routes");
const { addUser, allUsers } = require("../db/models/userModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// add user
router.post("/add", async (req, res) => {
  const newUser = req.body;
  try {
    const addedUser = await addUser(newUser);
    console.log("Added user", addedUser);
    res.send(addedUser);
  } catch (err) {
    debug(`failed to add new user: ${newUser.username}`);
    debug(err.message);
  }
});

// get all users
router.get("/allusers", async (req, res) => {
  try {
    debug("getting all users");
    const userArray = await allUsers();
    res.send(userArray);
  } catch (err) {
    debug(err.message);
  }
});

module.exports = router;
