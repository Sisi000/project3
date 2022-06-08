const mongoose = require("../mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
});

const User = model("User", userSchema);

const urlSchema = new Schema({
  URL: String,
});

const Url = model("Url", urlSchema);

const addUser = async (newUser) => {
  const addedUser = await User.create(newUser);
  console.log("User added successfully");
  return addedUser;
};

const allUsers = async () => {
  const usersArray = await User.find();
  return usersArray;
};

const findUsersbyid = async (id) => {
  let userid = await User.findById(id);
  console.log(userid);
  return userid;
};

const addUrl = async (newUrl) => {
  const addedUrl = await Url.create(newUrl);
  console.log("Url added successfully");
  return addedUrl;
};

module.exports = {
  addUser,
  allUsers,
  findUsersbyid,
  addUrl,
};
