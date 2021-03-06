require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function uploadFile(file) {
  console.log("file is", file);
  // console.log("file body is", file.body);
  const fileName = Date.now() + file.originalname;

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from S3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}

module.exports = {
  uploadFile,
  getFileStream,
};
