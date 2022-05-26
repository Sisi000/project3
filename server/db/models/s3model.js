require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const { MongoClient } = require("mongodb");
const mongoose = require("../mongoose");

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});


const { Schema, model } = mongoose;

const photoSchema = new Schema({
  // user_id: String,
  location: String,
});


const Photo = model("Photo", photoSchema);

const addPhotoLocation = async (location) => {
  const addedPhotoLocation = await Photo.create(location);
  console.log("Photo location added successfully", addedPhotoLocation);
  return addedPhotoLocation;
};

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}

module.exports = { addPhotoLocation, getFileStream }
