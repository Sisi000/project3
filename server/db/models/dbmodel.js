const { MongoClient } = require("mongodb");
const mongoose = require("../mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  // user_id: String,
});

const photoSchema = new Schema({
  user_id: String,
  picture: String,
});

const User = model("User", userSchema);
// const Photo = model("Photo", photoSchema);

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

module.exports = {
  addUser,
  allUsers,
  findUsersbyid,
};
