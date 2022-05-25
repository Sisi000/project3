var express = require('express');
var router = express.Router();
var debug = require("debug")("server:routes");

const { addUser, allUsers } = require('../db/dbmodel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


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
