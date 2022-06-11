const mongoose = require("../mongoose");

const { Schema, model } = mongoose;

const urlSchema = new Schema({
    URL: String,
  });
  
  const Url = model("Url", urlSchema);

  const addUrl = async (newUrl) => {
    const addedUrl = await Url.create(newUrl);
    console.log("Url added successfully");
    return addedUrl;
  };

  module.exports = addUrl;