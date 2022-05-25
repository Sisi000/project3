const express = require('express');
const router = express.Router();
// const { addUser } = require('../db/dbmodel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post("/add", async (req, res, next) => {
//   const user = req.body;
//   try {
//     const addedUser = await addUser(user);
//     console.log("Added user", addedUser);
//     res.send("User added");
//   } catch (err) {
//     debug(err.message);
//   }
// });

module.exports = router;

