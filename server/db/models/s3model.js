require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const getAllImages = async () =>  {
// (async function () {
  try {

    const response = await s3.listObjectsV2({
      Bucket: "project3inc"
    }).promise();
    // console.log(response)

  } catch (err) {
    console.error(err)
  }
  debugger;
}

// function getAllImages() {
//   const downloadParams = {
//     // Key: "",
//     Bucket: bucketName,
//   };
//   return s3.getObject(downloadParams).createReadStream();
// }

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}

module.exports = { getAllImages, getFileStream }
